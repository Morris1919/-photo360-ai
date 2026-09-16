const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={url:"",quality:1080,format:"mp4",busy:false,info:null,morris:null,configured:false};
const el={url:$("#urlInput"),paste:$("#pasteBtn"),analyze:$("#analyzeBtn"),hero:$("#morrisHero"),img:$("#previewImage"),title:$("#videoTitle"),meta:$("#videoMeta"),badge:$("#platformBadge"),grid:$("#qualityGrid"),download:$("#downloadBtn"),photos:$("#photosBtn"),pw:$("#progressWrap"),pb:$("#progressBar"),pt:$("#progressText"),pp:$("#progressPct"),toast:$("#toast"),engine:$("#engineStatus"),hint:$("#formatHint"),files:$("#fileList")};

function toast(m,ms=3200){el.toast.textContent=m;el.toast.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.toast.classList.remove("show"),ms)}
function busy(v){state.busy=v;[el.paste,el.analyze,el.download,el.photos].forEach(x=>x.disabled=v)}
function progress(p,m){el.pw.classList.remove("hidden");p=Math.max(0,Math.min(100,Number(p||0)));el.pb.style.width=p+"%";el.pp.textContent=Math.round(p)+"%";el.pt.textContent=m||"Lavoro…"}
function fmtSize(n){if(!n)return"";const u=["B","KB","MB","GB"];let i=0,x=Number(n);while(x>=1024&&i<u.length-1){x/=1024;i++}return x.toFixed(i?1:0)+" "+u[i]}
function platformFor(url){try{const h=new URL(url).hostname.toLowerCase();if(h.includes("youtu"))return"YOUTUBE";if(h.includes("instagram"))return"INSTAGRAM";if(h.includes("facebook")||h==="fb.watch")return"FACEBOOK";if(h.includes("dailymotion")||h==="dai.ly")return"DAILYMOTION";if(h.includes("tiktok"))return"TIKTOK";if(h==="x.com"||h.endsWith(".x.com")||h.includes("twitter"))return"X";if(h.includes("vimeo"))return"VIMEO";if(h.includes("reddit"))return"REDDIT";return"WEB"}catch(e){return"WEB"}}
function youtubeId(url){try{const u=new URL(url);if(u.hostname==="youtu.be")return u.pathname.split("/").filter(Boolean)[0]||"";if(u.hostname.includes("youtube.com"))return u.searchParams.get("v")||((u.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)||[])[1]||"")}catch(e){}return""}

async function loadMorris(){try{const r=await fetch("https://raw.githubusercontent.com/Morris1919/-photo360-ai/main/index.html",{cache:"no-store"});const t=await r.text();const m=t.match(/<img id="morris" src="(data:image\/jpeg;base64,[^"]+)"/);if(m){state.morris=m[1];el.hero.src=m[1];el.img.src=m[1]}}catch(e){}}
loadMorris();

async function checkEngine(){try{const r=await fetch("/api/v4/status",{cache:"no-store"});const d=await r.json();state.configured=!!d.configured;el.engine.textContent=state.configured?"ATTIVO":"DA ATTIVARE";el.engine.classList.toggle("off",!state.configured)}catch(e){el.engine.textContent="OFFLINE";el.engine.classList.add("off")}}
checkEngine();

function showAvailable(formats){
  const allowed=new Set((formats||[]).map(f=>String(f.format||"").replace("p","")));
  const youtube=platformFor(el.url.value.trim())==="YOUTUBE";
  $$(".quality").forEach(b=>{
    if(!youtube){b.disabled=true;b.style.opacity=".4";return}
    const ok=!allowed.size||allowed.has(b.dataset.quality);
    b.disabled=!ok;b.style.opacity=ok?"1":".35";
    if(!ok&&b.classList.contains("active"))b.classList.remove("active");
  });
  if(youtube){
    const current=$(".quality.active");
    if(!current){
      const first=$$(".quality").find(b=>!b.disabled);
      if(first){first.classList.add("active");state.quality=Number(first.dataset.quality)}
    }
    el.hint.textContent="YouTube: scegli una delle qualità realmente disponibili.";
  }else{
    el.hint.textContent="Altre piattaforme: SaverAPI scarica automaticamente la qualità migliore disponibile.";
  }
}

async function analyze(){
  const url=el.url.value.trim();
  if(!url)return toast("Incolla prima il link del video.");
  try{new URL(url)}catch(e){return toast("Questo non sembra un link valido.")}
  busy(true);progress(20,"Analizzo il contenuto…");el.files.classList.add("hidden");el.files.innerHTML="";
  try{
    const r=await fetch("/api/v4/info",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url})});
    const d=await r.json();
    if(!r.ok)throw new Error(d.detail||"Non riesco ad analizzare questo contenuto.");
    state.url=url;state.info=d;
    el.badge.textContent=(d.platform||platformFor(url)).toUpperCase();
    el.title.textContent=d.title||"Contenuto pronto";
    const bits=[];if(d.author)bits.push(d.author);if(d.duration){const m=Math.floor(d.duration/60),s=Math.round(d.duration%60);bits.push(m+":"+String(s).padStart(2,"0"))}
    el.meta.textContent=bits.join(" • ")||"Pronto per il download.";
    if(d.thumbnail)el.img.src=d.thumbnail;else{const id=youtubeId(url);if(id)el.img.src="https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";else if(state.morris)el.img.src=state.morris}
    showAvailable(d.formats);
    progress(100,"Pronto!");
    toast("Pronto. Scegli formato e premi Scarica.");
  }catch(e){toast(e.message||"Errore durante l'analisi.",5000)}
  finally{busy(false);setTimeout(()=>el.pw.classList.add("hidden"),1000)}
}

async function resolveDownload(){
  const url=el.url.value.trim();
  if(!url)throw new Error("Incolla prima il link.");
  progress(15,"Preparo il file…");
  const r=await fetch("/api/v4/download",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,quality:state.quality,media_format:state.format})});
  const d=await r.json();
  if(!r.ok)throw new Error(d.detail||"Download non disponibile.");
  progress(100,"File pronto!");
  return d;
}

function openFile(file){const a=document.createElement("a");a.href=file.url;a.download=file.filename||"download";a.rel="noopener";document.body.appendChild(a);a.click();a.remove()}
async function shareFile(file){
  const r=await fetch(file.url);
  if(!r.ok)throw new Error("Non riesco a preparare il file.");
  const blob=await r.blob();
  const f=new File([blob],file.filename||"video.mp4",{type:blob.type||file.media_type||"video/mp4"});
  if(navigator.share&&navigator.canShare&&navigator.canShare({files:[f]})){
    await navigator.share({files:[f],title:"Morris Downloader"});
    toast((blob.type||"").startsWith("video/")?"Nel foglio iOS scegli “Salva video”.":"Scegli dove salvare il file.",4500);
  }else openFile(file);
}
function renderFiles(files){
  el.files.innerHTML="";el.files.classList.remove("hidden");
  files.forEach((f,i)=>{const row=document.createElement("div");row.className="fileitem";const txt=document.createElement("div");txt.innerHTML="<strong>File "+(i+1)+"</strong><div class='size'>"+(f.media_type||"")+"</div>";const b=document.createElement("button");b.textContent="Scarica";b.onclick=()=>openFile(f);row.append(txt,b);el.files.appendChild(row)})
}

async function start(toPhotos=false){
  if(state.busy)return;busy(true);el.files.classList.add("hidden");el.files.innerHTML="";
  try{
    if(state.url!==el.url.value.trim())await analyze();
    const d=await resolveDownload();
    if(d.status==="picker"&&Array.isArray(d.files)){renderFiles(d.files);toast("Ci sono più file. Scegli quello da scaricare.");return}
    if(!d.file)throw new Error("Il file non è disponibile.");
    if(toPhotos)await shareFile(d.file);else{openFile(d.file);toast("Download avviato.")}
  }catch(e){toast(e.message||"Non riesco a scaricare questo contenuto.",5200)}
  finally{busy(false);setTimeout(()=>el.pw.classList.add("hidden"),1200)}
}

el.analyze.onclick=analyze;el.download.onclick=()=>start(false);el.photos.onclick=()=>start(true);
el.url.onkeydown=e=>{if(e.key==="Enter")analyze()};
el.paste.onclick=async()=>{try{const t=await navigator.clipboard.readText();if(t){el.url.value=t.trim();await analyze()}}catch(e){el.url.focus();toast("Tieni premuto nel campo e scegli Incolla.")}};
$$(".quality").forEach(b=>b.onclick=()=>{if(b.disabled)return;$$(".quality").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.quality=Number(b.dataset.quality)});
$$(".format").forEach(b=>b.onclick=()=>{$$(".format").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.format=b.dataset.format;el.grid.style.opacity=state.format==="mp3"?".38":"1";el.grid.style.pointerEvents=state.format==="mp3"?"none":"auto"});
