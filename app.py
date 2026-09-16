from __future__ import annotations
import asyncio, re, shutil, tempfile, threading, time, uuid
from pathlib import Path
from typing import Any
from urllib.parse import urlparse
from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
import imageio_ffmpeg

BASE=Path(__file__).resolve().parent
STATIC=BASE/"static"
ROOT=Path(tempfile.gettempdir())/"morris_downloader"
ROOT.mkdir(parents=True,exist_ok=True)
app=FastAPI(title="Morris Downloader",version="1.1.0")

ALLOWED={
"youtube.com","www.youtube.com","m.youtube.com","youtu.be",
"instagram.com","www.instagram.com",
"facebook.com","www.facebook.com","m.facebook.com","fb.watch",
"dailymotion.com","www.dailymotion.com","dai.ly",
"tiktok.com","www.tiktok.com","vm.tiktok.com",
"x.com","www.x.com","twitter.com","www.twitter.com",
"vimeo.com","www.vimeo.com"
}
jobs:dict[str,dict[str,Any]]={}
lock=threading.Lock()

class InfoReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)

class DownloadReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)
    quality:int|None=Field(default=1080,ge=144,le=4320)
    media_format:str=Field(default="mp4",pattern="^(mp4|mp3)$")

def validate(raw:str)->str:
    raw=raw.strip()
    p=urlparse(raw)
    if p.scheme not in {"http","https"} or not p.hostname:
        raise HTTPException(400,"Inserisci un link http/https valido.")
    if p.hostname.lower().rstrip(".") not in ALLOWED:
        raise HTTPException(400,"Piattaforma non supportata. Usa YouTube, Instagram, Facebook, Dailymotion, TikTok, X o Vimeo.")
    return raw

def is_youtube(url:str)->bool:
    h=(urlparse(url).hostname or "").lower()
    return h in {"youtube.com","www.youtube.com","m.youtube.com","youtu.be"}

def cleanup(age:int=3600):
    now=time.time()
    with lock:
        stale=[k for k,v in jobs.items() if now-v.get("created",now)>age]
        for k in stale:
            d=jobs.pop(k,None)
            if d and d.get("dir"): shutil.rmtree(d["dir"],ignore_errors=True)

def ydl_mod():
    import yt_dlp
    return yt_dlp

def yt_profiles(url:str):
    if not is_youtube(url):
        return [None]
    return [
        {"player_client":["tv","web_embedded"],"player_skip":["webpage"]},
        {"player_client":["web_embedded"],"player_skip":["webpage","configs"]},
        {"player_client":["web_safari","web_embedded"],"player_skip":["webpage"]},
    ]

def base_opts(url:str)->dict:
    o={"quiet":True,"no_warnings":True,"noplaylist":True,"socket_timeout":30,"force_ipv4":True}
    if is_youtube(url):
        o["http_headers"]={"User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Mobile/15E148 Safari/604.1"}
    return o

def extract_info(url:str):
    y=ydl_mod()
    last=None
    for profile in yt_profiles(url):
        opts={**base_opts(url),"skip_download":True}
        if profile: opts["extractor_args"]={"youtube":profile}
        try:
            with y.YoutubeDL(opts) as dl:
                info=dl.extract_info(url,download=False)
            if info: break
        except Exception as e:
            last=e
            info=None
    else:
        raise last or RuntimeError("Impossibile leggere questo contenuto.")
    if info.get("entries"):
        info=next((x for x in info["entries"] if x),info)
    heights=sorted({int(f["height"]) for f in (info.get("formats") or []) if f.get("vcodec")!="none" and isinstance(f.get("height"),(int,float))},reverse=True)
    standards=[4320,2160,1440,1080,720,480,360,240,144]
    available=[s for s in standards if any(h>=s for h in heights)]
    if not available: available=heights[:8] or [1080,720,480,360]
    return {
        "title":info.get("title") or "Video",
        "thumbnail":info.get("thumbnail"),
        "duration":info.get("duration"),
        "uploader":info.get("uploader") or info.get("channel"),
        "platform":info.get("extractor_key") or info.get("extractor") or "Web",
        "resolutions":sorted(set(available),reverse=True),
    }

@app.get("/api/health")
def health(): return {"ok":True,"app":"Morris Downloader","version":"1.1.0"}

@app.post("/api/info")
async def info(req:InfoReq):
    cleanup()
    url=validate(req.url)
    try:
        return await asyncio.to_thread(extract_info,url)
    except Exception as e:
        msg=str(e)
        if is_youtube(url) and ("confirm you're not a bot" in msg or "Sign in" in msg):
            raise HTTPException(422,"YouTube sta temporaneamente bloccando il server. Riprova tra poco.")
        raise HTTPException(422,"Non riesco a leggere questo contenuto in questo momento.")

def safe(name:str,ext:str)->str:
    name=re.sub(r'[\\/:*?"<>|\x00-\x1f]',' ',name)
    name=re.sub(r'\s+',' ',name).strip(' .') or "video"
    return f"{name[:120]}.{ext}"

def clear_dir(d:Path):
    for p in d.iterdir():
        try:
            if p.is_dir(): shutil.rmtree(p,ignore_errors=True)
            else: p.unlink(missing_ok=True)
        except Exception: pass

def worker(jid:str,url:str,q:int|None,fmt:str):
    y=ydl_mod()
    with lock:
        jobs[jid].update(status="starting",message="Preparo il download…")
    d=Path(jobs[jid]["dir"])
    def hook(x):
        with lock:
            j=jobs.get(jid)
            if not j:return
            if x.get("status")=="downloading":
                total=x.get("total_bytes") or x.get("total_bytes_estimate") or 0
                got=x.get("downloaded_bytes") or 0
                j.update(status="downloading",progress=round((got/total*100) if total else 0,1),message="Sto scaricando…")
            elif x.get("status")=="finished":
                j.update(status="processing",progress=99,message="Finalizzo il file…")
    common={
        **base_opts(url),
        "ffmpeg_location":imageio_ffmpeg.get_ffmpeg_exe(),
        "outtmpl":str(d/"media.%(ext)s"),
        "progress_hooks":[hook],"retries":3,"fragment_retries":3
    }
    if fmt=="mp3":
        media={"format":"bestaudio/best","postprocessors":[{"key":"FFmpegExtractAudio","preferredcodec":"mp3","preferredquality":"192"}]}
    else:
        q=int(q or 1080)
        media={"format":f"bestvideo[height<={q}]+bestaudio/best[height<={q}]/best","merge_output_format":"mp4"}
    last=None
    inf=None
    for i,profile in enumerate(yt_profiles(url),start=1):
        clear_dir(d)
        opts={**common,**media}
        if profile: opts["extractor_args"]={"youtube":profile}
        if i>1:
            with lock:
                if jid in jobs: jobs[jid].update(status="starting",message="Provo un canale YouTube alternativo…",progress=0)
        try:
            with y.YoutubeDL(opts) as dl:
                inf=dl.extract_info(url,download=True)
            files=[p for p in d.iterdir() if p.is_file() and p.suffix.lower() not in {".part",".ytdl",".json"}]
            if files: break
            raise RuntimeError("Il file finale non è stato creato.")
        except Exception as e:
            last=e
            files=[]
    if not files:
        msg=str(last or "Download non riuscito.")
        if is_youtube(url) and ("confirm you're not a bot" in msg or "Sign in" in msg or "403" in msg):
            msg="YouTube ha bloccato temporaneamente questo server. Riprova tra qualche minuto."
        with lock:
            if jid in jobs: jobs[jid].update(status="error",message=msg,progress=0)
        return
    p=max(files,key=lambda z:z.stat().st_size)
    ext=p.suffix.lower().lstrip(".") or fmt
    with lock:
        jobs[jid].update(status="ready",progress=100,message="Pronto!",file=str(p),filename=safe((inf or {}).get("title") or "video",ext),media_type=("audio/mpeg" if ext=="mp3" else "video/mp4"))

@app.post("/api/download")
def download(req:DownloadReq):
    cleanup()
    url=validate(req.url)
    jid=uuid.uuid4().hex
    d=ROOT/jid
    d.mkdir(parents=True,exist_ok=True)
    with lock:
        jobs[jid]={"status":"queued","progress":0,"message":"In coda…","created":time.time(),"dir":str(d)}
    threading.Thread(target=worker,args=(jid,url,req.quality,req.media_format),daemon=True).start()
    return {"job_id":jid}

@app.get("/api/jobs/{jid}")
def status(jid:str):
    cleanup()
    with lock:
        j=jobs.get(jid)
        if not j: raise HTTPException(404,"Download non trovato o scaduto.")
        return {"status":j["status"],"progress":j.get("progress",0),"message":j.get("message",""),"filename":j.get("filename"),"media_type":j.get("media_type"),"file_url":f"/api/jobs/{jid}/file" if j["status"]=="ready" else None}

@app.get("/api/jobs/{jid}/file")
def file(jid:str):
    with lock:
        j=jobs.get(jid)
        if not j or j.get("status")!="ready" or not j.get("file"): raise HTTPException(404,"File non disponibile.")
        p=Path(j["file"]); name=j.get("filename") or p.name; mt=j.get("media_type") or "application/octet-stream"
    if not p.exists(): raise HTTPException(404,"Il file è scaduto.")
    return FileResponse(p,media_type=mt,filename=name)

app.mount("/",StaticFiles(directory=STATIC,html=True),name="static")
