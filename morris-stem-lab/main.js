import * as ort from 'https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/ort.all.mjs';
import { DemucsProcessor, CONSTANTS } from './lib/demucs-web/index.js';
import { MixerEngine, bufferToWavBlob, downloadBlob } from './audio-engine.js';
import { analyzeMusic } from './analysis.js';
import { saveProject, listProjects, loadProject, deleteProject, serializeBuffer, deserializeBuffer } from './storage.js';

const $=s=>document.querySelector(s);
const els={
  engineBadge:$('#engineBadge'),dropZone:$('#dropZone'),fileInput:$('#fileInput'),fileCard:$('#fileCard'),fileName:$('#fileName'),fileMeta:$('#fileMeta'),
  separateBtn:$('#separateBtn'),progressBox:$('#progressBox'),progressTitle:$('#progressTitle'),progressPct:$('#progressPct'),progressBar:$('#progressBar'),progressDetail:$('#progressDetail'),statusBox:$('#statusBox'),
  workspace:$('#workspace'),mixer:$('#mixer'),playBtn:$('#playBtn'),pauseBtn:$('#pauseBtn'),stopBtn:$('#stopBtn'),seek:$('#seek'),timeNow:$('#timeNow'),timeTotal:$('#timeTotal'),
  masterVolume:$('#masterVolume'),addTrackBtn:$('#addTrackBtn'),extraFile:$('#extraFile'),saveProjectBtn:$('#saveProjectBtn'),projectsBtn:$('#projectsBtn'),exportBtn:$('#exportBtn'),
  keyboardEnabled:$('#keyboardEnabled'),bpmInput:$('#bpmInput'),keyboardStyle:$('#keyboardStyle'),keyboardIntensity:$('#keyboardIntensity'),keyboardHumanize:$('#keyboardHumanize'),
  chordsInput:$('#chordsInput'),analyzeBtn:$('#analyzeBtn'),analysisNote:$('#analysisNote'),projectsDialog:$('#projectsDialog'),closeProjects:$('#closeProjects'),projectsList:$('#projectsList'),
  trackTemplate:$('#trackTemplate')
};

let ctx=null,mixer=null,sourceBuffer=null,sourceFileName='',processor=null,currentProjectId=null,raf=0,keyboardGridOffset=0;
const isIOS=/iPad|iPhone|iPod/.test(navigator.userAgent)||(/Macintosh/.test(navigator.userAgent)&&navigator.maxTouchPoints>1);

function formatTime(v){v=Math.max(0,Number(v)||0);const m=Math.floor(v/60),s=Math.floor(v%60);return m+':'+String(s).padStart(2,'0');}
function baseName(n){return String(n||'progetto').replace(/\.[^.]+$/,'').replace(/[^\w\- À-ž]/g,' ').trim().slice(0,60)||'Progetto';}
function status(msg,error=false){els.statusBox.textContent=msg;els.statusBox.classList.remove('hidden','error');if(error)els.statusBox.classList.add('error');}
function clearStatus(){els.statusBox.classList.add('hidden');els.statusBox.classList.remove('error');}
function progress(title,pct,detail=''){
  els.progressBox.classList.remove('hidden');els.progressTitle.textContent=title;const p=Math.max(0,Math.min(100,Math.round(pct)));els.progressPct.textContent=p+'%';els.progressBar.style.width=p+'%';if(detail)els.progressDetail.textContent=detail;
}
function hideProgress(){els.progressBox.classList.add('hidden');}
function ensureCtx(){
  if(!ctx){ctx=new (window.AudioContext||window.webkitAudioContext)();mixer=new MixerEngine(ctx);mixer.setMaster(els.masterVolume.value);}
  return ctx;
}

async function detectEngine(){
  let label='WebAssembly • CPU';
  if('gpu' in navigator){
    try{const a=await navigator.gpu.requestAdapter();if(a)label='WebGPU • GPU';}catch{}
  }
  if(isIOS)label+=' • iPhone';
  if(!crossOriginIsolated)label+=' • compat';
  els.engineBadge.textContent=label;
}
detectEngine();

async function decodeAndResample(file){
  const ac=ensureCtx(); await ac.resume();
  const arr=await file.arrayBuffer();
  let b=await ac.decodeAudioData(arr.slice(0));
  if(b.sampleRate===44100 && b.numberOfChannels===2) return b;
  progress('Preparo audio',12,'Conversione locale a 44.1 kHz stereo…');
  const length=Math.ceil(b.duration*44100);
  const off=new OfflineAudioContext(2,length,44100);
  const src=off.createBufferSource();src.buffer=b;src.connect(off.destination);src.start();
  b=await off.startRendering();return b;
}

async function handleFile(file){
  if(!file)return;clearStatus();hideProgress();els.separateBtn.disabled=true;
  try{
    progress('Carico il brano',5,'Decodifica nel browser. Il file non viene inviato a server.');
    sourceBuffer=await decodeAndResample(file);sourceFileName=file.name;currentProjectId=null;
    els.fileName.textContent=file.name;els.fileMeta.textContent=formatTime(sourceBuffer.duration)+' • 44.1 kHz • locale';
    els.fileCard.classList.remove('hidden');els.separateBtn.disabled=false;
    hideProgress();
    if(isIOS && sourceBuffer.duration>300) status('Su iPhone i brani oltre 5 minuti possono superare la memoria disponibile durante la separazione. Su PC il margine è molto maggiore.');
  }catch(e){status('Non riesco a leggere questo file audio: '+(e?.message||e),true);hideProgress();}
}

els.fileInput.addEventListener('change',e=>handleFile(e.target.files?.[0]));
els.dropZone.addEventListener('dragover',e=>{e.preventDefault();els.dropZone.classList.add('drag');});
els.dropZone.addEventListener('dragleave',()=>els.dropZone.classList.remove('drag'));
els.dropZone.addEventListener('drop',e=>{e.preventDefault();els.dropZone.classList.remove('drag');handleFile(e.dataTransfer.files?.[0]);});

function makeProcessor(ep){
  ort.env.wasm.numThreads=crossOriginIsolated?Math.max(1,Math.min(4,navigator.hardwareConcurrency||2)):1;
  ort.env.wasm.wasmPaths='https://cdn.jsdelivr.net/npm/onnxruntime-web@1.30.0/dist/';
  if(ort.env.webgpu)ort.env.webgpu.powerPreference='high-performance';
  return new DemucsProcessor({
    ort,
    sessionOptions:{executionProviders:[ep],graphOptimizationLevel:'all'},
    onDownloadProgress:(loaded,total)=>{
      const f=total?loaded/total:0;progress('Scarico il modello AI',5+f*25,total?((loaded/1048576).toFixed(1)+' / '+(total/1048576).toFixed(1)+' MB'):'Download modello…');
    },
    onProgress:({progress:p,currentSegment,totalSegments})=>progress('Separo gli stem',32+p*67,'Segmento '+currentSegment+' di '+totalSegments+'. Tutto sul tuo dispositivo.'),
    onLog:(phase,msg)=>console.log('[Demucs]',phase,msg)
  });
}

async function initProcessor(){
  if(processor)return processor;
  let webgpu=false;
  if('gpu' in navigator){try{webgpu=!!(await navigator.gpu.requestAdapter());}catch{}}
  if(webgpu){
    try{
      progress('Avvio WebGPU',3,'Preparo il motore grafico…');
      const p=makeProcessor('webgpu');await p.loadModel(CONSTANTS.DEFAULT_MODEL_URL);processor=p;els.engineBadge.textContent='WebGPU • GPU'+(isIOS?' • iPhone':'');return p;
    }catch(e){console.warn('WebGPU non riuscito, passo a WASM',e);processor=null;status('WebGPU non disponibile per questo modello: passo automaticamente alla CPU.');}
  }
  progress('Avvio CPU',3,'Modalità compatibile WebAssembly…');
  const p=makeProcessor('wasm');await p.loadModel(CONSTANTS.DEFAULT_MODEL_URL);processor=p;els.engineBadge.textContent='WebAssembly • CPU'+(isIOS?' • iPhone':'');return p;
}

function stemBuffer(data){
  const ac=ensureCtx(),len=data.left.length,b=ac.createBuffer(2,len,44100);b.copyToChannel(data.left,0);b.copyToChannel(data.right,1);return b;
}

els.separateBtn.addEventListener('click',async()=>{
  if(!sourceBuffer)return;els.separateBtn.disabled=true;clearStatus();
  try{
    const p=await initProcessor();
    progress('Separo gli stem',32,'Il tempo dipende dalla potenza del dispositivo.');
    const res=await p.separate(sourceBuffer.getChannelData(0),sourceBuffer.getChannelData(1));
    mixer.clear();els.mixer.innerHTML='';
    addTrackUI(mixer.addTrack('VOCALS',stemBuffer(res.vocals),'stem'));
    addTrackUI(mixer.addTrack('DRUMS',stemBuffer(res.drums),'stem'));
    addTrackUI(mixer.addTrack('BASS',stemBuffer(res.bass),'stem'));
    addTrackUI(mixer.addTrack('OTHER',stemBuffer(res.other),'stem'));
    showWorkspace();
    progress('Separazione completata',100,'4 stem pronti e perfettamente allineati.');
    setTimeout(hideProgress,900);
    status('Stem pronti. Ora puoi remixare, aggiungere effetti o registrazioni e creare la tastiera automatica.');
    runAnalysis(true);
  }catch(e){
    console.error(e);hideProgress();
    const extra=isIOS?' Su iPhone la causa più comune è il limite di memoria: lo stesso brano può funzionare su PC con Chrome o Edge.':'';
    status('Separazione non completata: '+(e?.message||e)+'.'+extra,true);
  }finally{els.separateBtn.disabled=false;}
});

function showWorkspace(){
  els.workspace.classList.remove('hidden');els.timeTotal.textContent=formatTime(mixer.duration);els.seek.value=0;
  window.scrollTo({top:els.workspace.offsetTop-90,behavior:'smooth'});
}

function drawWave(canvas,buffer){
  const c=canvas.getContext('2d'),w=canvas.width,h=canvas.height;c.clearRect(0,0,w,h);
  const d=buffer.getChannelData(0),step=Math.max(1,Math.floor(d.length/w));c.strokeStyle='#78dfff';c.globalAlpha=.9;c.lineWidth=1;c.beginPath();
  for(let x=0;x<w;x++){
    let min=1,max=-1;const s=x*step,e=Math.min(d.length,s+step);
    for(let i=s;i<e;i++){const v=d[i];if(v<min)min=v;if(v>max)max=v;}
    const y1=(1-max)*h/2,y2=(1-min)*h/2;c.moveTo(x,y1);c.lineTo(x,y2);
  }c.stroke();
}

function addTrackUI(track){
  const node=els.trackTemplate.content.firstElementChild.cloneNode(true);track.el=node;
  node.querySelector('.track-name').textContent=track.name;drawWave(node.querySelector('.waveform'),track.buffer);
  const bind=(cl,key)=>{const i=node.querySelector(cl);i.value=track.settings[key];i.addEventListener('input',()=>mixer.update(track,{[key]:Number(i.value)}));};
  bind('.vol','volume');bind('.pan','pan');bind('.low','low');bind('.mid','mid');bind('.high','high');bind('.comp','comp');
  bind('.chorus','chorus');bind('.flanger','flanger');bind('.phaser','phaser');bind('.drive','drive');bind('.delay','delay');bind('.reverb','reverb');
  const mute=node.querySelector('.mute'),solo=node.querySelector('.solo');
  mute.addEventListener('click',()=>{track.settings.mute=!track.settings.mute;mute.classList.toggle('active',track.settings.mute);mixer.refreshSolo();});
  solo.addEventListener('click',()=>{track.settings.solo=!track.settings.solo;solo.classList.toggle('active',track.settings.solo);mixer.refreshSolo();});
  node.querySelector('.reset-fx').addEventListener('click',()=>{
    const patch={low:0,mid:0,high:0,comp:.25,chorus:0,flanger:0,phaser:0,drive:0,delay:0,reverb:0};
    mixer.update(track,patch);
    for(const [key,val] of Object.entries(patch)){
      const el=node.querySelector('.'+key);if(el)el.value=val;
    }
  });
  node.querySelector('.download-stem').addEventListener('click',()=>downloadBlob(bufferToWavBlob(track.buffer),track.name.toLowerCase().replace(/\s+/g,'-')+'.wav'));
  els.mixer.appendChild(node);
}

els.playBtn.addEventListener('click',()=>mixer?.play());
els.pauseBtn.addEventListener('click',()=>mixer?.pause());
els.stopBtn.addEventListener('click',()=>{mixer?.stop();updateTransport();});
els.seek.addEventListener('input',()=>{if(!mixer)return;mixer.seek(Number(els.seek.value)/1000*mixer.duration);updateTransport();});
els.masterVolume.addEventListener('input',()=>mixer?.setMaster(els.masterVolume.value));

function updateTransport(){
  if(mixer){
    const p=mixer.position(),d=mixer.duration||1;
    els.timeNow.textContent=formatTime(p);els.timeTotal.textContent=formatTime(mixer.duration);els.seek.value=Math.round(p/d*1000);
    if(mixer.playing&&p>=mixer.duration-.03)mixer.stop();
  }
  raf=requestAnimationFrame(updateTransport);
}
raf=requestAnimationFrame(updateTransport);

els.addTrackBtn.addEventListener('click',()=>els.extraFile.click());
els.extraFile.addEventListener('change',async e=>{
  const f=e.target.files?.[0];if(!f)return;
  try{progress('Aggiungo traccia',10,'Decodifica locale…');const b=await decodeAndResample(f);const t=mixer.addTrack(baseName(f.name).toUpperCase(),b,'extra');addTrackUI(t);showWorkspace();hideProgress();status('Traccia aggiunta al mixer.');}
  catch(err){hideProgress();status('Non riesco ad aggiungere la traccia: '+(err?.message||err),true);}finally{e.target.value='';}
});

function parseChords(){return els.chordsInput.value.split(/[|,\n]+/).map(s=>s.trim()).filter(Boolean);}
function syncKeyboard(){
  if(!mixer)return;mixer.setKeyboard({enabled:els.keyboardEnabled.checked,bpm:Number(els.bpmInput.value)||120,style:els.keyboardStyle.value,intensity:Number(els.keyboardIntensity.value),humanize:Number(els.keyboardHumanize.value),gridOffset:keyboardGridOffset,chords:parseChords()});
}
[els.keyboardEnabled,els.bpmInput,els.keyboardStyle,els.keyboardIntensity,els.keyboardHumanize,els.chordsInput].forEach(el=>el.addEventListener('input',syncKeyboard));

async function runAnalysis(auto=false){
  if(!sourceBuffer){if(!auto)status('Per analizzare armonia e BPM serve il brano originale.',true);return;}
  els.analyzeBtn.disabled=true;const old=els.analysisNote.textContent;
  try{
    els.analysisNote.textContent='Aggancio batteria, beat e armonia…';
    const drums=mixer?.tracks?.find(t=>t.name==='DRUMS')?.buffer||sourceBuffer;
    const harmony=mixer?.tracks?.find(t=>t.name==='OTHER')?.buffer||sourceBuffer;
    const out=await analyzeMusic(drums,harmony,p=>{els.analysisNote.textContent='Analisi locale '+Math.round(p*100)+'%';});
    keyboardGridOffset=Number(out.barOffset)||0;
    els.bpmInput.value=out.bpm;els.chordsInput.value=out.chords.join(' | ');
    els.analysisNote.textContent='Agganciata ai DRUMS: '+out.bpm+' BPM • primo downbeat ~'+keyboardGridOffset.toFixed(2)+' s • '+out.chords.length+' battute.';
    syncKeyboard();
    if(auto){els.keyboardEnabled.checked=true;syncKeyboard();}
  }catch(e){console.warn(e);els.analysisNote.textContent='Analisi automatica non riuscita. Puoi inserire BPM e accordi manualmente.';}
  finally{els.analyzeBtn.disabled=false;if(!els.analysisNote.textContent)els.analysisNote.textContent=old;}
}
els.analyzeBtn.addEventListener('click',()=>runAnalysis(false));

els.exportBtn.addEventListener('click',async()=>{
  if(!mixer?.tracks.length)return;els.exportBtn.disabled=true;
  try{progress('Render del remix',10,'Applico mixer, EQ, effetti e tastiera…');const b=await mixer.renderMix();progress('Creo WAV',92,'Finalizzo il file audio…');downloadBlob(bufferToWavBlob(b,mixer.duration+2),baseName(sourceFileName||'morris-remix')+'-REMIX.wav');progress('Remix pronto',100,'Download avviato.');setTimeout(hideProgress,800);}
  catch(e){hideProgress();status('Export non riuscito: '+(e?.message||e),true);}finally{els.exportBtn.disabled=false;}
});

els.saveProjectBtn.addEventListener('click',async()=>{
  if(!mixer?.tracks.length)return;
  els.saveProjectBtn.disabled=true;
  try{
    progress('Salvo progetto',10,'Scrivo stem e impostazioni nella memoria del browser…');
    const id=currentProjectId||crypto.randomUUID(),now=Date.now();
    const rec={id,name:baseName(sourceFileName||'Morris Stem Project'),updatedAt:now,duration:mixer.duration,master:Number(els.masterVolume.value),
      keyboard:{enabled:els.keyboardEnabled.checked,bpm:Number(els.bpmInput.value),style:els.keyboardStyle.value,intensity:Number(els.keyboardIntensity.value),humanize:Number(els.keyboardHumanize.value),gridOffset:keyboardGridOffset,chords:parseChords()},
      tracks:mixer.tracks.map(t=>({name:t.name,kind:t.kind,settings:{...t.settings},audio:serializeBuffer(t.buffer)}))};
    await saveProject(rec);currentProjectId=id;progress('Progetto salvato',100,'Resta su questo dispositivo.');setTimeout(hideProgress,700);status('Progetto salvato nel browser.');
  }catch(e){hideProgress();status('Salvataggio non riuscito, probabilmente per spazio locale insufficiente: '+(e?.message||e),true);}
  finally{els.saveProjectBtn.disabled=false;}
});

async function refreshProjects(){
  els.projectsList.innerHTML='Carico…';
  try{
    const ps=await listProjects();els.projectsList.innerHTML='';
    if(!ps.length){els.projectsList.textContent='Nessun progetto salvato.';return;}
    for(const p of ps){
      const row=document.createElement('div');row.className='project-item';
      const info=document.createElement('div');info.innerHTML='<strong>'+p.name+'</strong><br><small>'+new Date(p.updatedAt).toLocaleString('it-IT')+' • '+formatTime(p.duration)+'</small>';
      const actions=document.createElement('div');const open=document.createElement('button');open.textContent='APRI';const del=document.createElement('button');del.textContent='ELIMINA';
      open.onclick=()=>openProject(p.id);del.onclick=async()=>{await deleteProject(p.id);refreshProjects();};actions.append(open,del);row.append(info,actions);els.projectsList.append(row);
    }
  }catch(e){els.projectsList.textContent='Errore: '+(e?.message||e);}
}
els.projectsBtn.addEventListener('click',async()=>{await refreshProjects();els.projectsDialog.showModal();});
els.closeProjects.addEventListener('click',()=>els.projectsDialog.close());

async function openProject(id){
  try{
    progress('Apro progetto',10,'Ricostruisco le tracce locali…');const rec=await loadProject(id);if(!rec)throw new Error('Progetto non trovato');
    ensureCtx();mixer.clear();els.mixer.innerHTML='';
    for(const tr of rec.tracks){const b=deserializeBuffer(ctx,tr.audio);addTrackUI(mixer.addTrack(tr.name,b,tr.kind,tr.settings));}
    currentProjectId=id;sourceFileName=rec.name;sourceBuffer=null;els.masterVolume.value=rec.master??.9;mixer.setMaster(els.masterVolume.value);
    const k=rec.keyboard||{};keyboardGridOffset=Number(k.gridOffset)||0;els.keyboardEnabled.checked=!!k.enabled;els.bpmInput.value=k.bpm||120;els.keyboardStyle.value=k.style||'Pad';els.keyboardIntensity.value=k.intensity??.38;els.keyboardHumanize.value=k.humanize??.015;els.chordsInput.value=(k.chords||[]).join(' | ');syncKeyboard();
    showWorkspace();els.projectsDialog.close();progress('Progetto aperto',100,'Pronto.');setTimeout(hideProgress,600);
  }catch(e){hideProgress();status('Non riesco ad aprire il progetto: '+(e?.message||e),true);}
}

window.addEventListener('beforeunload',()=>{try{mixer?.stop()}catch{}});
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
