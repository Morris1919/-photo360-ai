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
app=FastAPI(title="Morris Downloader",version="1.0.0")

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

def extract_info(url:str):
    y=ydl_mod()
    opts={"quiet":True,"no_warnings":True,"noplaylist":True,"skip_download":True,"socket_timeout":25}
    with y.YoutubeDL(opts) as dl:
        info=dl.extract_info(url,download=False)
    if not info: raise RuntimeError("Impossibile leggere questo contenuto.")
    if info.get("entries"):
        info=next((x for x in info["entries"] if x),info)
    heights=sorted({int(f["height"]) for f in (info.get("formats") or []) if f.get("vcodec")!="none" and isinstance(f.get("height"),(int,float))},reverse=True)
    standards=[4320,2160,1440,1080,720,480,360,240,144]
    available=[s for s in standards if any(h>=s for h in heights)]
    if not available: available=heights[:8]
    return {
        "title":info.get("title") or "Video",
        "thumbnail":info.get("thumbnail"),
        "duration":info.get("duration"),
        "uploader":info.get("uploader") or info.get("channel"),
        "platform":info.get("extractor_key") or info.get("extractor") or "Web",
        "resolutions":sorted(set(available),reverse=True),
    }

@app.get("/api/health")
def health(): return {"ok":True,"app":"Morris Downloader"}

@app.post("/api/info")
async def info(req:InfoReq):
    cleanup()
    url=validate(req.url)
    try: return await asyncio.to_thread(extract_info,url)
    except Exception as e: raise HTTPException(422,f"Non riesco a leggere il contenuto: {e}")

def safe(name:str,ext:str)->str:
    name=re.sub(r'[\\/:*?"<>|\x00-\x1f]',' ',name)
    name=re.sub(r'\s+',' ',name).strip(' .') or "video"
    return f"{name[:120]}.{ext}"

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
        "ffmpeg_location":imageio_ffmpeg.get_ffmpeg_exe(),
        "outtmpl":str(d/"media.%(ext)s"),
        "noplaylist":True,"quiet":True,"no_warnings":True,
        "progress_hooks":[hook],"socket_timeout":35,"retries":3,"fragment_retries":3
    }
    if fmt=="mp3":
        opts={**common,"format":"bestaudio/best","postprocessors":[{"key":"FFmpegExtractAudio","preferredcodec":"mp3","preferredquality":"192"}]}
    else:
        q=int(q or 1080)
        opts={**common,"format":f"bestvideo[height<={q}]+bestaudio/best[height<={q}]/best","merge_output_format":"mp4"}
    try:
        with y.YoutubeDL(opts) as dl:
            inf=dl.extract_info(url,download=True)
        files=[p for p in d.iterdir() if p.is_file() and p.suffix.lower() not in {".part",".ytdl",".json"}]
        if not files: raise RuntimeError("Il file finale non è stato creato.")
        p=max(files,key=lambda z:z.stat().st_size)
        ext=p.suffix.lower().lstrip(".") or fmt
        with lock:
            jobs[jid].update(status="ready",progress=100,message="Pronto!",file=str(p),filename=safe((inf or {}).get("title") or "video",ext),media_type=("audio/mpeg" if ext=="mp3" else "video/mp4"))
    except Exception as e:
        with lock:
            if jid in jobs: jobs[jid].update(status="error",message=str(e),progress=0)

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
