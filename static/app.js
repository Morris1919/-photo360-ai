const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={url:"",info:null,quality:1080,format:"mp4",busy:false};
const el={url:$("#urlInput"),paste:$("#pasteBtn"),analyze:$("#analyzeBtn"),hero:$("#morrisHero"),img:$("#previewImage"),title:$("#videoTitle"),meta:$("#videoMeta"),badge:$("#platformBadge"),grid:$("#qualityGrid"),download:$("#downloadBtn"),photos:$("#photosBtn"),pw:$("#progressWrap"),pb:$("#progressBar"),pt:$("#progressText"),pp:$("#progressPct"),toast:$("#toast")};

function toast(m,ms=2800){el.toast.textContent=m;el.toast.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.toast.classList.remove("show"),ms)}
function busy(v){state.busy=v;[el.paste,el.analyze,el.download,el.photos].forEach(x=>x.disabled=v)}
function duration(s){if(!s||!Number.isFinite(s))return"";const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=Math.floor(s%60);return h?(h+":"+String(m).padStart(2,"0")+":"+String(x).padStart(2,"0")):(m+":"+String(x).padStart(2,"0"))}
function platform(s="WEB"){s=String(s).toLowerCase();if(s.includes("youtube"))return"YOUTUBE";if(s.includes("instagram"))return"INSTAGRAM";if(s.includes("facebook"))return"FACEBOOK";if(s.includes("dailymotion"))return"DAILYMOTION";if(s.includes("tiktok"))return"TIKTOK";if(s.includes("twitter")||s==="x")return"X";if(s.includes("vimeo"))return"VIMEO";return s.toUpperCase()}

async function loadMorris(){
  try{
    const r=await fetch("https://raw.githubusercontent.com/Morris1919/-photo360-ai/main/index.html",{cache:"force-cache"});
    const t=await r.text();
    const m=t.match(/<img id="morris" src="(data:image\/jpeg;base64,[^"]+)"/);
    if(m){el.hero.src=m[1];if(!state.info)el.img.src=m[1]}
  }catch(e){}
}
loadMorris();

function qualities(a){
  const list=(a&&a.length?a:[1080,720,480]).slice(0,8);
  state.quality=list.includes(1080)?1080:list[0];
  el.grid.innerHTML="";
  for(const q of list){
    const b=document.createElement("button");b.className="quality"+(q===state.quality?" active":"");b.dataset.quality=q;
    const lab=q>=4320?"8K":q>=2160?"4K":q>=1440?"QHD":q>=1080?"Full HD":q>=720?"HD":"SD";
    b.innerHTML="<strong>"+q+"p</strong><small>"+lab+"</small>";
    b.onclick=()=>{$$(".quality").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.quality=Number(q)};
    el.grid.appendChild(b)
  }
}

async function analyze(){
  const url=el.url.value.trim();if(!url)return toast("Incolla prima il link del video.");
  busy(true);el.analyze.textContent="Analizzo…";
  try{
    const r=await fetch("/api/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
    const d=await r.json();if(!r.ok)throw new Error(d.detail||"Non riesco ad analizzare il link.");
    state.url=url;state.info=d;el.title.textContent=d.title||"Video";el.meta.textContent=[d.uploader,duration(d.duration)].filter(Boolean).join(" • ")||"Qualità disponibili rilevate.";el.badge.textContent=platform(d.platform);if(d.thumbnail)el.img.src=d.thumbnail;qualities(d.resolutions);toast("Video trovato. Scegli qualità e formato.")
  }catch(e){toast(e.message||"Errore durante l’analisi.",4800)}
  finally{el.analyze.textContent="Analizza video";busy(false)}
}

function progress(p,m){el.pw.classList.remove("hidden");p=Math.max(0,Math.min(100,Number(p||0)));el.pb.style.width=p+"%";el.pp.textContent=Math.round(p)+"%";el.pt.textContent=m||"Lavoro…"}
const sleep=ms=>new Promise(r=>setTimeout(r,ms));

async function ensure(){const u=el.url.value.trim();if(!u)throw new Error("Incolla prima il link del video.");if(!state.info||state.url!==u)await analyze();if(!state.info||state.url!==u)throw new Error("Prima analizza il video.");return u}

async function start(toPhotos=false){
  if(state.busy)return;let url;try{url=await ensure()}catch(e){return toast(e.message)}
  busy(true);progress(0,"Preparo il download…");
  try{
    const r=await fetch("/api/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,quality:state.quality,media_format:state.format})});
    const d=await r.json();if(!r.ok)throw new Error(d.detail||"Download non avviato.");
    let j;
    for(;;){await sleep(950);const x=await fetch("/api/jobs/"+d.job_id);j=await x.json();if(!x.ok)throw new Error(j.detail||"Download interrotto.");progress(j.progress||0,j.message);if(j.status==="ready")break;if(j.status==="error")throw new Error(j.message||"Errore nel download.")}
    progress(100,"Pronto!");
    if(toPhotos)await shareFile(j.file_url,j.filename,j.media_type);else{download(j.file_url,j.filename);toast("Download pronto.")}
  }catch(e){toast(e.message||"Qualcosa è andato storto.",5200)}
  finally{busy(false);setTimeout(()=>el.pw.classList.add("hidden"),2600)}
}

function download(url,name){const a=document.createElement("a");a.href=url;if(name)a.download=name;document.body.appendChild(a);a.click();a.remove()}
async function shareFile(url,name="video.mp4",type="video/mp4"){
  try{
    const r=await fetch(url);if(!r.ok)throw new Error();const blob=await r.blob();const f=new File([blob],name,{type:blob.type||type});
    if(navigator.canShare&&navigator.share&&navigator.canShare({files:[f]})){await navigator.share({files:[f],title:"Salva in Foto"});toast("Nel foglio iOS scegli “Salva video”.",3600);return}
    download(url,name);toast("Apro il download. Poi usa Condividi e Salva video.",4300)
  }catch(e){if(e?.name==="AbortError")return;download(url,name);toast("Apro il file. Usa Condividi e Salva video.",4300)}
}

el.paste.onclick=async()=>{try{const t=await navigator.clipboard.readText();if(t){el.url.value=t.trim();toast("Link incollato.")}}catch(e){el.url.focus();toast("Tieni premuto nel campo e scegli Incolla.")}};
el.analyze.onclick=analyze;el.url.onkeydown=e=>{if(e.key==="Enter")analyze()};el.download.onclick=()=>start(false);el.photos.onclick=()=>start(true);
$$(".format").forEach(b=>b.onclick=()=>{$$(".format").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.format=b.dataset.format;el.grid.style.opacity=state.format==="mp3"?".42":"1";el.grid.style.pointerEvents=state.format==="mp3"?"none":"auto"});
if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js").catch(()=>{}));