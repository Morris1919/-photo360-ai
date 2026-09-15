const $ = id => document.getElementById(id);
const uploadPanel=$('uploadPanel'), workingPanel=$('workingPanel'), viewerPanel=$('viewerPanel'), errorPanel=$('errorPanel');
const fileInput=$('fileInput'), dropzone=$('dropzone'), previewWrap=$('previewWrap'), photoPreview=$('photoPreview');
const generateBtn=$('generateBtn'), modelSelect=$('modelSelect'), textureSelect=$('textureSelect');
const ratio=$('foregroundRatio'), ratioValue=$('ratioValue'), ratioSetting=$('ratioSetting');
const modelViewer=$('modelViewer');
let normalizedDataUrl=null, objectUrl=null, deferredPrompt=null, currentController=null;
function show(panel){[uploadPanel,workingPanel,viewerPanel,errorPanel].forEach(p=>p.classList.add('hidden'));panel.classList.remove('hidden')}
function setStep(n,text){for(let i=1;i<=4;i++){const el=$(`step${i}`);el.classList.toggle('done',i<n);el.classList.toggle('active',i===n)}$('workingText').textContent=text}
function revokeModel(){if(objectUrl){URL.revokeObjectURL(objectUrl);objectUrl=null}}
async function health(){const badge=$('serverBadge');try{const r=await fetch('/api/health',{cache:'no-store'});const j=await r.json();if(j.apiConfigured){badge.textContent='Motore AI pronto';badge.className='server-badge ready'}else{badge.textContent='Server pronto, manca la chiave Stability AI';badge.className='server-badge offline'}}catch{badge.textContent='Server AI non raggiungibile';badge.className='server-badge offline'}}
function loadImage(file){return new Promise((resolve,reject)=>{const u=URL.createObjectURL(file);const im=new Image();im.onload=()=>{URL.revokeObjectURL(u);resolve(im)};im.onerror=()=>{URL.revokeObjectURL(u);reject(new Error('Non riesco a leggere questa immagine.'))};im.src=u})}
async function normalizeImage(file){const img=await loadImage(file);const maxPixels=3700000;let w=img.naturalWidth,h=img.naturalHeight;const scale=Math.min(1,Math.sqrt(maxPixels/(w*h)));w=Math.max(64,Math.round(w*scale));h=Math.max(64,Math.round(h*scale));const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d',{alpha:false});x.fillStyle='#fff';x.fillRect(0,0,w,h);x.drawImage(img,0,0,w,h);return c.toDataURL('image/jpeg',0.93)}
fileInput.addEventListener('change',async()=>{const f=fileInput.files?.[0];if(!f)return;generateBtn.disabled=true;try{normalizedDataUrl=await normalizeImage(f);photoPreview.src=normalizedDataUrl;dropzone.classList.add('hidden');previewWrap.classList.remove('hidden');generateBtn.disabled=false}catch(e){showError(e.message)}});
$('removePhotoBtn').onclick=()=>{normalizedDataUrl=null;fileInput.value='';previewWrap.classList.add('hidden');dropzone.classList.remove('hidden');generateBtn.disabled=true};
ratio.oninput=()=>ratioValue.textContent=`${Math.round(Number(ratio.value)*100)}%`;
modelSelect.onchange=()=>ratioSetting.classList.toggle('hidden',modelSelect.value!=='fast3d');modelSelect.dispatchEvent(new Event('change'));
async function generate(){if(!normalizedDataUrl)return;show(workingPanel);setStep(1,'Ottimizzo la foto per il modello 3D…');currentController=new AbortController();try{await new Promise(r=>setTimeout(r,250));setStep(2,modelSelect.value==='spar3d'?'SPAR3D sta ricostruendo anche le parti non visibili…':'Stable Fast 3D sta costruendo la geometria…');const resp=await fetch('/api/generate3d',{method:'POST',headers:{'content-type':'application/json'},signal:currentController.signal,body:JSON.stringify({imageDataUrl:normalizedDataUrl,model:modelSelect.value,textureResolution:textureSelect.value,foregroundRatio:Number(ratio.value)})});if(!resp.ok){let msg=`Errore ${resp.status}`;try{const j=await resp.json();msg=j.error||msg;if(j.code==='NO_API_KEY')msg='Manca la chiave Stability AI sul server. Inserisci STABILITY_API_KEY nell’ambiente di hosting.'}catch{}throw new Error(msg)}setStep(3,'Ricevo mesh e texture dal motore AI…');const blob=await resp.blob();if(blob.size<100)throw new Error('Il file 3D ricevuto è vuoto.');revokeModel();objectUrl=URL.createObjectURL(blob);setStep(4,'Carico il modello nel viewer 360°…');modelViewer.src=objectUrl;$('modelLabel').textContent=(resp.headers.get('x-photo360-model')==='fast3d'?'Stable Fast 3D':'SPAR3D')+' • '+(blob.size/1024/1024).toFixed(1)+' MB';$('downloadGlbBtn').onclick=()=>{const a=document.createElement('a');a.href=objectUrl;a.download='Photo360_AI_model.glb';a.click()};await new Promise(resolve=>setTimeout(resolve,1200));show(viewerPanel)}catch(e){if(e.name==='AbortError'){show(uploadPanel)}else showError(e.message)}finally{currentController=null}}
generateBtn.onclick=generate;$('cancelBtn').onclick=()=>currentController?.abort();
function showError(msg){$('errorText').textContent=msg;show(errorPanel)}
$('retryBtn').onclick=()=>show(uploadPanel);
$('newPhotoBtn').onclick=()=>{revokeModel();modelViewer.src='';normalizedDataUrl=null;fileInput.value='';previewWrap.classList.add('hidden');dropzone.classList.remove('hidden');generateBtn.disabled=true;show(uploadPanel)};
$('resetViewBtn').onclick=()=>{modelViewer.cameraOrbit='0deg 75deg 105%';modelViewer.jumpCameraToGoal?.()};
$('autoRotateBtn').onclick=()=>{const on=modelViewer.hasAttribute('auto-rotate');modelViewer.toggleAttribute('auto-rotate',!on);$('autoRotateBtn').textContent=on?'Auto rotazione':'Ferma rotazione'};
$('fullBtn').onclick=()=>modelViewer.requestFullscreen?.();
modelViewer.addEventListener('progress',e=>{$('mvProgress').style.width=`${Math.round((e.detail?.totalProgress||0)*100)}%`});
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('installBtn').hidden=false});
$('installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('installBtn').hidden=true};
if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js');
health();
