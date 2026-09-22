export const defaultSettings=()=>({
  volume:1,pan:0,mute:false,solo:false,low:0,mid:0,high:0,comp:.25,
  chorus:0,flanger:0,phaser:0,drive:0,delay:0,reverb:0
});

function makeImpulse(ctx,seconds=2.1,decay=2.7){
  const len=Math.max(1,Math.floor(ctx.sampleRate*seconds));
  const b=ctx.createBuffer(2,len,ctx.sampleRate);
  for(let c=0;c<2;c++){
    const d=b.getChannelData(c);
    for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay);
  }
  return b;
}

function rootPc(name){
  const m=String(name||'C').trim().match(/^([A-Ga-g])([#b]?)/);
  if(!m) return 0;
  const base={C:0,D:2,E:4,F:5,G:7,A:9,B:11}[m[1].toUpperCase()];
  return (base+(m[2]==='#'?1:m[2]==='b'?-1:0)+12)%12;
}
function chordNotes(name){
  const s=String(name||'C').trim();
  const root=rootPc(s);
  const minor=/^[A-Ga-g][#b]?m(?!aj)/.test(s);
  const notes=[60+root,60+root+(minor?3:4),60+root+7];
  if(/maj7/i.test(s)) notes.push(60+root+11);
  else if(/7/.test(s)) notes.push(60+root+10);
  while(notes[0]>66) for(let i=0;i<notes.length;i++) notes[i]-=12;
  return notes;
}
const midiHz=m=>440*Math.pow(2,(m-69)/12);

function scheduleTone(ctx,dest,midi,start,duration,volume,type='sine',attack=.012,release=.12){
  if(start<ctx.currentTime-.02 && !(ctx instanceof OfflineAudioContext)) return [];
  const osc=ctx.createOscillator(),g=ctx.createGain();
  osc.type=type; osc.frequency.value=midiHz(midi);
  const a=Math.max(start,ctx.currentTime||0), end=a+Math.max(.04,duration);
  g.gain.setValueAtTime(.0001,a);
  g.gain.exponentialRampToValueAtTime(Math.max(.0002,volume),a+Math.min(attack,duration*.25));
  g.gain.setValueAtTime(Math.max(.0002,volume),Math.max(a+attack,end-release));
  g.gain.exponentialRampToValueAtTime(.0001,end);
  osc.connect(g).connect(dest); osc.start(a); osc.stop(end+.03);
  return [osc,g];
}

function scheduleKeyboard(ctx,dest,kb,offset,totalDuration,baseWhen=0){
  const nodes=[];
  if(!kb?.enabled) return nodes;
  const bpm=Math.max(50,Math.min(220,Number(kb.bpm)||120));
  const bar=240/bpm, beat=60/bpm;
  const chords=(kb.chords||[]).filter(Boolean);
  if(!chords.length) return nodes;
  const human=Math.max(0,Math.min(.08,Number(kb.humanize)||0));
  const intensity=Math.max(0,Math.min(1,Number(kb.intensity)||.4));
  const firstBar=Math.floor(offset/bar);
  const lastBar=Math.ceil(totalDuration/bar);
  const style=kb.style||'Pad';
  for(let bi=firstBar;bi<lastBar;bi++){
    const chord=chords[bi%chords.length], notes=chordNotes(chord);
    const barSec=bi*bar;
    const relBase=barSec-offset;
    const jitter=()=> (Math.random()-.5)*2*human;
    if(style==='Pad'){
      const start=baseWhen+Math.max(0,relBase)+jitter();
      for(const n of notes) nodes.push(...scheduleTone(ctx,dest,n,start,bar*.95,.028*intensity,'triangle',.12,.28));
    }else if(style==='Piano'){
      for(let q=0;q<4;q++){
        const event=barSec+q*beat; if(event<offset) continue;
        const start=baseWhen+(event-offset)+jitter();
        for(const n of notes) nodes.push(...scheduleTone(ctx,dest,n,start,beat*.42,.027*intensity,'triangle',.006,.14));
      }
    }else if(style==='Rhodes'){
      for(let q=0;q<2;q++){
        const event=barSec+q*beat*2; if(event<offset) continue;
        const start=baseWhen+(event-offset)+jitter();
        for(const n of notes) nodes.push(...scheduleTone(ctx,dest,n,start,beat*1.45,.023*intensity,'sine',.015,.25));
      }
    }else if(style==='Synth'){
      for(let q=0;q<8;q++){
        const event=barSec+q*beat/2; if(event<offset) continue;
        const start=baseWhen+(event-offset)+jitter();
        for(const n of notes) nodes.push(...scheduleTone(ctx,dest,n-12,start,beat*.27,.010*intensity,'sawtooth',.004,.07));
      }
    }else{
      for(let q=0;q<8;q++){
        const event=barSec+q*beat/2; if(event<offset) continue;
        const start=baseWhen+(event-offset)+jitter();
        const n=notes[q%notes.length]+(q>=4?12:0);
        nodes.push(...scheduleTone(ctx,dest,n,start,beat*.36,.03*intensity,'triangle',.004,.08));
      }
    }
  }
  return nodes;
}

function makeDriveCurve(){
  const n=4096,curve=new Float32Array(n),k=18;
  for(let i=0;i<n;i++){
    const x=i*2/n-1;
    curve[i]=((1+k)*x)/(1+k*Math.abs(x));
  }
  return curve;
}

function buildTrackGraph(ctx,master,settings,impulse,offline=false){
  const input=ctx.createGain();
  const low=ctx.createBiquadFilter(); low.type='lowshelf';low.frequency.value=120;
  const mid=ctx.createBiquadFilter(); mid.type='peaking';mid.frequency.value=1000;mid.Q.value=.85;
  const high=ctx.createBiquadFilter(); high.type='highshelf';high.frequency.value=7000;
  const comp=ctx.createDynamicsCompressor();
  const level=ctx.createGain();
  const pan=ctx.createStereoPanner();
  const dry=ctx.createGain(); dry.gain.value=1;
  input.connect(low).connect(mid).connect(high).connect(comp).connect(level).connect(pan);
  pan.connect(dry).connect(master);

  const delaySend=ctx.createGain(),delay=ctx.createDelay(2),feedback=ctx.createGain(),delayWet=ctx.createGain();
  delay.delayTime.value=.32; feedback.gain.value=.28; delayWet.gain.value=1;
  pan.connect(delaySend).connect(delay).connect(delayWet).connect(master); delay.connect(feedback).connect(delay);

  const revSend=ctx.createGain(),convolver=ctx.createConvolver(),revWet=ctx.createGain();
  convolver.buffer=impulse; revWet.gain.value=1;
  pan.connect(revSend).connect(convolver).connect(revWet).connect(master);

  // CHORUS, parallel modulated short delay.
  const chorusSend=ctx.createGain(),chorusDelay=ctx.createDelay(.06),chorusWet=ctx.createGain();
  chorusDelay.delayTime.value=.018; chorusWet.gain.value=.9;
  pan.connect(chorusSend).connect(chorusDelay).connect(chorusWet).connect(master);
  const chorusLfo=ctx.createOscillator(),chorusDepth=ctx.createGain();
  chorusLfo.frequency.value=.78; chorusDepth.gain.value=.0055;
  chorusLfo.connect(chorusDepth).connect(chorusDelay.delayTime); chorusLfo.start(0);

  // FLANGER, shorter delay and slower modulation.
  const flSend=ctx.createGain(),flDelay=ctx.createDelay(.05),flWet=ctx.createGain(),flFeedback=ctx.createGain();
  flDelay.delayTime.value=.0045; flWet.gain.value=.9; flFeedback.gain.value=.18;
  pan.connect(flSend).connect(flDelay).connect(flWet).connect(master);
  flDelay.connect(flFeedback).connect(flDelay);
  const lfo=ctx.createOscillator(),depth=ctx.createGain(); lfo.frequency.value=.24;depth.gain.value=.0035;
  lfo.connect(depth).connect(flDelay.delayTime); lfo.start(0);

  // PHASER, two modulated all-pass stages.
  const phaseSend=ctx.createGain(),phase1=ctx.createBiquadFilter(),phase2=ctx.createBiquadFilter(),phaseWet=ctx.createGain();
  phase1.type='allpass';phase1.frequency.value=650;phase1.Q.value=.8;
  phase2.type='allpass';phase2.frequency.value=1450;phase2.Q.value=.8;phaseWet.gain.value=.8;
  pan.connect(phaseSend).connect(phase1).connect(phase2).connect(phaseWet).connect(master);
  const phaseLfo=ctx.createOscillator(),phaseDepth1=ctx.createGain(),phaseDepth2=ctx.createGain();
  phaseLfo.frequency.value=.34;phaseDepth1.gain.value=420;phaseDepth2.gain.value=820;
  phaseLfo.connect(phaseDepth1).connect(phase1.frequency);
  phaseLfo.connect(phaseDepth2).connect(phase2.frequency);phaseLfo.start(0);

  // DRIVE/SATURATION, parallel so the knob behaves as a wet amount.
  const driveSend=ctx.createGain(),shaper=ctx.createWaveShaper(),driveWet=ctx.createGain();
  shaper.curve=makeDriveCurve();shaper.oversample='2x';driveWet.gain.value=.75;
  pan.connect(driveSend).connect(shaper).connect(driveWet).connect(master);

  const n={input,low,mid,high,comp,level,pan,dry,
    delaySend,delay,feedback,delayWet,revSend,convolver,revWet,
    chorusSend,chorusDelay,chorusWet,chorusLfo,chorusDepth,
    flSend,flDelay,flWet,flFeedback,lfo,depth,
    phaseSend,phase1,phase2,phaseWet,phaseLfo,phaseDepth1,phaseDepth2,
    driveSend,shaper,driveWet};
  applyNodes(n,settings,1,false,false);
  return n;
}

function applyNodes(n,s,volumeMultiplier=1,mute=false,soloMuted=false){
  n.low.gain.value=Number(s.low)||0;n.mid.gain.value=Number(s.mid)||0;n.high.gain.value=Number(s.high)||0;
  const ca=Math.max(0,Math.min(1,Number(s.comp)||0));
  n.comp.threshold.value=-6-ca*34;n.comp.ratio.value=1+ca*7;n.comp.attack.value=.006;n.comp.release.value=.18;
  n.pan.pan.value=Math.max(-1,Math.min(1,Number(s.pan)||0));
  n.level.gain.value=(mute||soloMuted)?0:(Number(s.volume)||0)*volumeMultiplier;
  n.chorusSend.gain.value=Math.max(0,Number(s.chorus)||0);
  n.flSend.gain.value=Math.max(0,Number(s.flanger)||0);
  n.phaseSend.gain.value=Math.max(0,Number(s.phaser)||0);
  n.driveSend.gain.value=Math.max(0,Number(s.drive)||0);
  n.delaySend.gain.value=Math.max(0,Number(s.delay)||0);
  n.revSend.gain.value=Math.max(0,Number(s.reverb)||0);
}

export class MixerEngine{
  constructor(ctx){
    this.ctx=ctx;this.tracks=[];this.sources=[];this.keyboardNodes=[];this.playing=false;this.offset=0;this.startCtx=0;this.duration=0;
    this.masterInput=ctx.createGain();this.limiter=ctx.createDynamicsCompressor();this.masterGain=ctx.createGain();
    this.limiter.threshold.value=-1.2;this.limiter.knee.value=0;this.limiter.ratio.value=18;this.limiter.attack.value=.002;this.limiter.release.value=.12;
    this.masterInput.connect(this.limiter).connect(this.masterGain).connect(ctx.destination);this.masterGain.gain.value=.9;
    this.impulse=makeImpulse(ctx);
    this.keyboard={enabled:false,bpm:120,style:'Pad',intensity:.38,humanize:.015,chords:[]};
  }
  setMaster(v){this.masterGain.gain.value=Math.max(0,Math.min(1.5,Number(v)||0));}
  addTrack(name,buffer,kind='stem',settings=null){
    const t={id:crypto.randomUUID(),name,buffer,kind,settings:{...defaultSettings(),...(settings||{})},nodes:null};
    t.nodes=buildTrackGraph(this.ctx,this.masterInput,t.settings,this.impulse);
    this.tracks.push(t);this.duration=Math.max(this.duration,buffer.duration);this.refreshSolo();return t;
  }
  clear(){
    this.stop();for(const t of this.tracks){
      for(const mod of [t.nodes.lfo,t.nodes.chorusLfo,t.nodes.phaseLfo]){try{mod?.stop()}catch{}}
    }
    this.tracks=[];this.duration=0;
  }
  update(track,patch){
    Object.assign(track.settings,patch);this.refreshSolo();
  }
  refreshSolo(){
    const any=this.tracks.some(t=>t.settings.solo);
    for(const t of this.tracks) applyNodes(t.nodes,t.settings,1,t.settings.mute,any&&!t.settings.solo);
  }
  setKeyboard(kb){this.keyboard={...this.keyboard,...kb};if(this.playing){const p=this.position();this.seek(p);}}
  position(){return this.playing?Math.min(this.duration,this.offset+(this.ctx.currentTime-this.startCtx)):this.offset;}
  async play(){
    if(this.playing||!this.tracks.length)return; await this.ctx.resume();
    if(this.offset>=this.duration-.03)this.offset=0;
    const when=this.ctx.currentTime+.035;this.startCtx=when;this.sources=[];
    for(const t of this.tracks){
      const s=this.ctx.createBufferSource();s.buffer=t.buffer;s.connect(t.nodes.input);s.start(when,Math.min(this.offset,Math.max(0,t.buffer.duration-.001)));this.sources.push(s);
    }
    this.keyboardNodes=scheduleKeyboard(this.ctx,this.masterInput,this.keyboard,this.offset,this.duration,when);
    this.playing=true;
  }
  pause(){
    if(!this.playing)return;this.offset=this.position();this.stopNodes();this.playing=false;
  }
  stop(){this.stopNodes();this.playing=false;this.offset=0;}
  stopNodes(){
    for(const s of this.sources){try{s.stop()}catch{}}this.sources=[];
    for(const n of this.keyboardNodes){if(n&&typeof n.stop==='function'){try{n.stop()}catch{}}}this.keyboardNodes=[];
  }
  seek(sec){
    const was=this.playing;if(was){this.offset=this.position();this.stopNodes();this.playing=false;}
    this.offset=Math.max(0,Math.min(this.duration,Number(sec)||0));if(was)this.play();
  }
  async renderMix(){
    const sr=44100,tail=2.5,len=Math.ceil((this.duration+tail)*sr);
    const off=new OfflineAudioContext(2,len,sr);
    const master=off.createGain(),lim=off.createDynamicsCompressor();lim.threshold.value=-1.2;lim.knee.value=0;lim.ratio.value=18;lim.attack.value=.002;lim.release.value=.12;
    master.connect(lim).connect(off.destination);master.gain.value=this.masterGain.gain.value;
    const impulse=makeImpulse(off);
    const any=this.tracks.some(t=>t.settings.solo);
    for(const t of this.tracks){
      const src=off.createBufferSource();src.buffer=t.buffer;
      const n=buildTrackGraph(off,master,t.settings,impulse,true);
      applyNodes(n,t.settings,1,t.settings.mute,any&&!t.settings.solo);
      src.connect(n.input);src.start(0);
    }
    scheduleKeyboard(off,master,this.keyboard,0,this.duration,0);
    return await off.startRendering();
  }
}

export function bufferToWavBlob(buffer,maxDuration=null){
  const sr=buffer.sampleRate,seconds=maxDuration==null?buffer.duration:Math.min(buffer.duration,maxDuration);
  const length=Math.floor(seconds*sr),channels=Math.min(2,buffer.numberOfChannels);
  const bytes=44+length*channels*2,ab=new ArrayBuffer(bytes),view=new DataView(ab);
  const write=(o,s)=>{for(let i=0;i<s.length;i++)view.setUint8(o+i,s.charCodeAt(i));};
  write(0,'RIFF');view.setUint32(4,36+length*channels*2,true);write(8,'WAVE');write(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,channels,true);view.setUint32(24,sr,true);view.setUint32(28,sr*channels*2,true);view.setUint16(32,channels*2,true);view.setUint16(34,16,true);write(36,'data');view.setUint32(40,length*channels*2,true);
  let off=44;const data=[];for(let c=0;c<channels;c++)data[c]=buffer.getChannelData(c);
  for(let i=0;i<length;i++)for(let c=0;c<channels;c++){let s=Math.max(-1,Math.min(1,data[c][i]||0));view.setInt16(off,s<0?s*0x8000:s*0x7fff,true);off+=2;}
  return new Blob([view],{type:'audio/wav'});
}

export function downloadBlob(blob,name){
  const a=document.createElement('a');const url=URL.createObjectURL(blob);a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);
}
