const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const state={url:"",quality:1080,format:"mp4",busy:false};
const el={url:$("#urlInput"),paste:$("#pasteBtn"),analyze:$("#analyzeBtn"),hero:$("#morrisHero"),img:$("#previewImage"),title:$("#videoTitle"),meta:$("#videoMeta"),badge:$("#platformBadge"),grid:$("#qualityGrid"),download:$("#downloadBtn"),photos:$("#photosBtn"),pw:$("#progressWrap"),pb:$("#progressBar"),pt:$("#progressText"),pp:$("#progressPct"),toast:$("#toast")};

function toast(m,ms=2800){el.toast.textContent=m;el.toast.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.toast.classList.remove("show"),ms)}
function busy(v){state.busy=v;[el.paste,el.analyze,el.download,el.photos].forEach(x=>x.disabled=v)}
function progress(p,m){el.pw.classList.remove("hidden");p=Math.max(0,Math.min(100,Number(p||0)));el.pb.style.width=p+"%";el.pp.textContent=Math.round(p)+"%";el.pt.textContent=m||"Lavoro…"}
function platformFor(url){
  try{
    const h=new URL(url).hostname.toLowerCase();
    if(h.includes("youtu"))return"YOUTUBE";
    if(h.includes("instagram"))return"INSTAGRAM";
    if(h.includes("facebook")||h==="fb.watch")return"FACEBOOK";
    if(h.includes("dailymotion")||h==="dai.ly")return"DAILYMOTION";
    if(h.includes("tiktok"))return"TIKTOK";
    if(h==="x.com"||h.endsWith(".x.com")||h.includes("twitter"))return"X";
    if(h.includes("vimeo"))return"VIMEO";
  }catch(e){}
  return"WEB"
}
function youtubeId(url){
  try{
    const u=new URL(url);
    if(u.hostname==="youtu.be")return u.pathname.split("/").filter(Boolean)[0]||"";
    if(u.hostname.includes("youtube.com"))return u.searchParams.get("v")||((u.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)||[])[1]||"");
  }catch(e){}
  return""
}

async function loadMorris(){
  try{
    const r=await fetch("https://raw.githubusercontent.com/Morris1919/-photo360-ai/main/index.html",{cache:"no-store"});
    const t=await r.text();
    const m=t.match(/<img id="morris" src="(data:image\/jpeg;base64,[^"]+)"/);
    if(m){el.hero.src=m[1];el.img.src=m[1];state.morris=m[1]}
  }catch(e){}
}
loadMorris();

function renderQualities(){
  const list=[2160,1440,1080,720,480,360];
  el.grid.innerHTML="";
  for(const q of list){
    const b=document.createElement("button");
    b.className="quality"+(q===state.quality?" active":"");
    const lab=q>=2160?"4K":q>=1440?"QHD":q>=1080?"Full HD":q>=720?"HD":"SD";
    b.innerHTML="<strong>"+q+"p</strong><small>"+lab+"</small>";
    b.onclick=()=>{$$(".quality").forEach(x=>x.classList.remove("active"));b.classList.add("active");state.quality=q};
    el.grid.appendChild(b);
  }
}
renderQualities();

function analyze(){
  const url=el.url.value.trim();
  if(!url)return toast("Incolla prima il link del video.");
  let u;
  try{u=new URL(url)}catch(e){return toast("Questo non sembra un link valido.")}
  if(!["http:","https:"].includes(u.protocol))return toast("Usa un link http o https.");
  state.url=url;
  const p=platformFor(url);
  el.badge.textContent=p;
  el.title.textContent=p==="WEB"?"Contenuto web":"Video "+p.charAt(0)+p.slice(1).toLowerCase();
  el.meta.textContent="Scegli qualità e formato, poi premi Scarica.";
  const id=youtubeId(url);
  if(id)el.img.src="https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";
  else if(state.morris)el.img.src=state.morris;
  toast("Pronto. Ora scegli qualità e formato.");
}
el.analyze.onclick=analyze;

async function resolveDownload(){
  const url=el.url.value.trim();
  if(!url)throw new Error("Incolla prima il link del video.");
  if(state.url!==url)analyze();
  progress(18,"Cerco il percorso migliore…");
  const r=await fetch("/api/resolve",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({url,quality:state.quality,media_format:state.format})});
  let d;
  try{d=await r.json()}catch(e){throw new Error("Il motore non ha risposto correttamente.")}
  if(!r.ok)throw new Error(d.detail||"Non riesco a preparare questo link.");
  progress(100,d.status==="handoff"?"Apro il motore web…":"Pronto!");
  return d;
}

function openUrl(url,filename){
  const a=document.createElement("a");
  a.href=url;
  a.rel="noopener";
  if(filename)a.download=filename;
  document.body.appendChild(a);a.click();a.remove();
}

async function start(toPhotos=false){
  if(state.busy)return;
  busy(true);
  try{
    const d=await resolveDownload();
    if(d.status==="ready"){
      if(toPhotos){
        try{
          const r=await fetch(d.url);
          if(!r.ok)throw new Error();
          const blob=await r.blob();
          const f=new File([blob],d.filename||("video."+(state.format==="mp3"?"mp3":"mp4")),{type:blob.type||(state.format==="mp3"?"audio/mpeg":"video/mp4")});
          if(navigator.share&&navigator.canShare&&navigator.canShare({files:[f]})){
            await navigator.share({files:[f],title:"Morris Downloader"});
            toast(state.format==="mp4"?"Nel foglio iOS scegli “Salva video”.":"Nel foglio iOS scegli dove salvare il file.",4200);
          }else openUrl(d.url,d.filename);
        }catch(e){
          openUrl(d.url,d.filename);
          toast("File pronto. Usa Condividi per salvarlo su iPhone.",4200);
        }
      }else{
        openUrl(d.url,d.filename);
        toast("Download avviato.");
      }
    }else if(d.status==="picker"){
      location.href="https://cobalt.tools/#"+encodeURIComponent(el.url.value.trim());
    }else if(d.status==="handoff"){
      location.href=d.url;
    }else throw new Error("Risposta non riconosciuta.");
  }catch(e){
    toast(e.message||"Non riesco a preparare il download.",4800);
  }finally{
    busy(false);
    setTimeout(()=>el.pw.classList.add("hidden"),1800);
  }
}
el.download.onclick=()=>start(false);
el.photos.onclick=()=>start(true);

el.paste.onclick=async()=>{
  try{
    const t=await navigator.clipboard.readText();
    if(t){el.url.value=t.trim();analyze()}
  }catch(e){el.url.focus();toast("Tieni premuto nel campo e scegli Incolla.")}
};
el.url.onkeydown=e=>{if(e.key==="Enter")analyze()};

$$(".format").forEach(b=>b.onclick=()=>{
  $$(".format").forEach(x=>x.classList.remove("active"));
  b.classList.add("active");
  state.format=b.dataset.format;
  el.grid.style.opacity=state.format==="mp3"?".42":"1";
  el.grid.style.pointerEvents=state.format==="mp3"?"none":"auto";
});