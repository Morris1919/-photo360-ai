const $=s=>document.querySelector(s);
const el={url:$("#urlInput"),paste:$("#pasteBtn"),prepare:$("#prepareBtn"),open:$("#openBtn"),hero:$("#morrisHero"),img:$("#previewImage"),title:$("#videoTitle"),meta:$("#videoMeta"),badge:$("#platformBadge"),toast:$("#toast")};
const state={url:"",platform:"WEB",morris:null};

function toast(m,ms=3000){el.toast.textContent=m;el.toast.classList.add("show");clearTimeout(toast.t);toast.t=setTimeout(()=>el.toast.classList.remove("show"),ms)}
function platformFor(url){
  try{
    const h=new URL(url).hostname.toLowerCase();
    if(h.includes("youtu"))return"YOUTUBE";
    if(h.includes("instagram"))return"INSTAGRAM";
    if(h.includes("facebook")||h==="fb.watch")return"FACEBOOK";
    if(h.includes("tiktok"))return"TIKTOK";
    if(h.includes("dailymotion")||h==="dai.ly")return"DAILYMOTION";
    if(h==="x.com"||h.endsWith(".x.com")||h.includes("twitter"))return"X";
  }catch(e){}
  return"WEB";
}
function youtubeId(url){
  try{
    const u=new URL(url);
    if(u.hostname==="youtu.be")return u.pathname.split("/").filter(Boolean)[0]||"";
    if(u.hostname.includes("youtube.com"))return u.searchParams.get("v")||((u.pathname.match(/\/(?:shorts|embed)\/([^/?]+)/)||[])[1]||"");
  }catch(e){}
  return"";
}
function targetFor(p){
  const map={
    YOUTUBE:"https://vidssave.com/it/yt-downloader",
    FACEBOOK:"https://vidssave.com/it/facebook",
    TIKTOK:"https://vidssave.com/it/tiktok",
    DAILYMOTION:"https://vidssave.com/it/dailymotion",
    X:"https://vidssave.com/it/x",
    INSTAGRAM:"https://vidssave.com/it/home",
    WEB:"https://vidssave.com/it/home"
  };
  return map[p]||map.WEB;
}
async function loadMorris(){
  try{
    const r=await fetch("https://raw.githubusercontent.com/Morris1919/-photo360-ai/main/index.html",{cache:"no-store"});
    const t=await r.text();
    const m=t.match(/<img id="morris" src="(data:image\/jpeg;base64,[^"]+)"/);
    if(m){state.morris=m[1];el.hero.src=m[1];el.img.src=m[1]}
  }catch(e){}
}
loadMorris();

function prepare(){
  const url=el.url.value.trim();
  if(!url)return toast("Incolla prima il link.");
  try{new URL(url)}catch(e){return toast("Il link non sembra valido.")}
  state.url=url;
  state.platform=platformFor(url);
  el.badge.textContent=state.platform;
  el.title.textContent=state.platform==="WEB"?"Contenuto web":"Video "+state.platform.charAt(0)+state.platform.slice(1).toLowerCase();
  el.meta.textContent="Pronto per VidsSave. Il link sarà copiato automaticamente.";
  const id=youtubeId(url);
  if(id)el.img.src="https://i.ytimg.com/vi/"+id+"/hqdefault.jpg";
  else if(state.morris)el.img.src=state.morris;
  toast("Pronto. Ora premi Scarica con VidsSave.");
}

async function copyUrl(url){
  try{
    await navigator.clipboard.writeText(url);
    return true;
  }catch(e){
    try{
      el.url.focus();el.url.select();
      return document.execCommand("copy");
    }catch(_){return false}
  }
}

async function openVidsSave(){
  const url=el.url.value.trim();
  if(!url)return toast("Incolla prima il link.");
  if(state.url!==url)prepare();
  const ok=await copyUrl(url);
  toast(ok?"Link copiato. Apro VidsSave…":"Apro VidsSave. Tieni premuto e incolla il link.",1500);
  setTimeout(()=>{location.href=targetFor(state.platform)},450);
}

el.prepare.onclick=prepare;
el.open.onclick=openVidsSave;
el.url.onkeydown=e=>{if(e.key==="Enter")prepare()};
el.paste.onclick=async()=>{
  try{
    const t=await navigator.clipboard.readText();
    if(t){el.url.value=t.trim();prepare()}
  }catch(e){el.url.focus();toast("Tieni premuto nel campo e scegli Incolla.")}
};