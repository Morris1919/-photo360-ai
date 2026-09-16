from __future__ import annotations
import os, re, secrets, time
from pathlib import Path
from typing import Any
from urllib.parse import quote, urlparse

import requests
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

BASE=Path(__file__).resolve().parent
STATIC=BASE/"static"
app=FastAPI(title="Morris Downloader",version="4.0.0")

ALLOWED={
    "youtube.com","www.youtube.com","m.youtube.com","youtu.be",
    "instagram.com","www.instagram.com",
    "facebook.com","www.facebook.com","m.facebook.com","fb.watch",
    "dailymotion.com","www.dailymotion.com","dai.ly",
    "tiktok.com","www.tiktok.com","vm.tiktok.com",
    "x.com","www.x.com","twitter.com","www.twitter.com",
    "vimeo.com","www.vimeo.com",
    "reddit.com","www.reddit.com","redd.it",
    "threads.net","www.threads.net",
    "pinterest.com","www.pinterest.com","pin.it",
    "snapchat.com","www.snapchat.com",
    "soundcloud.com","www.soundcloud.com"
}

SAVER_BASE="https://saverapi.net"
_DOWNLOADS:dict[str,dict[str,Any]]={}

class ResolveReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)
    quality:int|None=Field(default=1080,ge=144,le=4320)
    media_format:str=Field(default="mp4",pattern="^(mp4|mp3)$")

class InfoReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)

class DownloadReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)
    quality:int|None=Field(default=1080,ge=144,le=1080)
    media_format:str=Field(default="mp4",pattern="^(mp4|mp3)$")

def validate(raw:str)->str:
    raw=raw.strip()
    p=urlparse(raw)
    if p.scheme not in {"http","https"} or not p.hostname:
        raise HTTPException(400,"Inserisci un link http/https valido.")
    if p.hostname.lower().rstrip(".") not in ALLOWED:
        raise HTTPException(400,"Piattaforma non supportata.")
    return raw

def host_of(url:str)->str:
    return (urlparse(url).hostname or "").lower().rstrip(".")

def is_youtube(url:str)->bool:
    return host_of(url) in {"youtube.com","www.youtube.com","m.youtube.com","youtu.be"}

def platform_name(url:str)->str:
    h=host_of(url)
    if "youtu" in h:return "YouTube"
    if "instagram" in h:return "Instagram"
    if "facebook" in h or h=="fb.watch":return "Facebook"
    if "dailymotion" in h or h=="dai.ly":return "Dailymotion"
    if "tiktok" in h:return "TikTok"
    if h in {"x.com","www.x.com","twitter.com","www.twitter.com"}:return "X"
    if "vimeo" in h:return "Vimeo"
    if "reddit" in h or h=="redd.it":return "Reddit"
    if "threads" in h:return "Threads"
    if "pinterest" in h or h=="pin.it":return "Pinterest"
    if "snapchat" in h:return "Snapchat"
    if "soundcloud" in h:return "SoundCloud"
    return "Web"

def clean_filename(name:str|None,fmt:str)->str:
    name=(name or ("audio.mp3" if fmt=="mp3" else "video.mp4")).strip()
    name=re.sub(r'[\\/:*?"<>|\x00-\x1f]',' ',name)
    name=re.sub(r'\s+',' ',name).strip(' .') or ("audio" if fmt=="mp3" else "video")
    if fmt=="mp3" and not name.lower().endswith(".mp3"): name+=".mp3"
    if fmt=="mp4" and "." not in name[-6:]: name+=".mp4"
    return name[:180]

def saver_key()->str:
    key=(os.getenv("SAVERAPI_KEY") or "").strip()
    if not key:
        raise HTTPException(503,"Il motore SaverAPI è pronto ma non è ancora attivato.")
    return key

def saver_get(path:str,params:dict[str,Any])->dict[str,Any]:
    try:
        r=requests.get(
            SAVER_BASE+path,
            params=params,
            timeout=120,
            headers={
                "x-api-key":saver_key(),
                "Accept":"application/json",
                "Content-Type":"application/json",
                "User-Agent":"MorrisDownloader/4.0"
            }
        )
    except HTTPException:
        raise
    except Exception as exc:
        raise HTTPException(502,"Il motore di download non risponde in questo momento.") from exc
    try:
        data=r.json()
    except Exception as exc:
        raise HTTPException(502,"Risposta non valida dal motore di download.") from exc
    if r.status_code in {401,403}:
        raise HTTPException(503,"La chiave SaverAPI deve essere attivata o rinnovata.")
    if r.status_code>=400:
        msg=data.get("message") if isinstance(data,dict) else None
        raise HTTPException(502,msg or "SaverAPI non ha potuto elaborare questo contenuto.")
    if not isinstance(data,dict):
        raise HTTPException(502,"Risposta inattesa dal motore di download.")
    return data

def cleanup_downloads()->None:
    now=time.time()
    for token,item in list(_DOWNLOADS.items()):
        if item.get("expires",0)<now:
            _DOWNLOADS.pop(token,None)

def mint_file(url:str,filename:str,media_type:str)->dict[str,str]:
    if not isinstance(url,str) or not url.startswith(("https://","http://")):
        raise HTTPException(502,"Il motore non ha restituito un file valido.")
    cleanup_downloads()
    token=secrets.token_urlsafe(24)
    _DOWNLOADS[token]={
        "url":url,
        "filename":filename,
        "media_type":media_type,
        "expires":time.time()+1800
    }
    return {"url":f"/api/v4/file/{token}","filename":filename,"media_type":media_type}

# ---------- old V2 compatibility ----------
_INSTANCE_CACHE:dict[str,Any]={"at":0.0,"items":[]}

def instance_list()->list[dict[str,Any]]:
    now=time.time()
    if _INSTANCE_CACHE["items"] and now-_INSTANCE_CACHE["at"]<600:
        return _INSTANCE_CACHE["items"]
    items=[]
    try:
        r=requests.get("https://instances.cobalt.best/api/instances.json",timeout=8,headers={"User-Agent":"MorrisDownloader/2.0"})
        if r.ok and isinstance(r.json(),list):items=r.json()
    except Exception:
        pass
    def score(x):
        online=x.get("online") or {}
        return (1 if online.get("api") else 0,int(x.get("trust") or 0),int(x.get("score") or 0))
    items=[x for x in items if isinstance(x,dict) and str(x.get("api") or "").startswith("https://")]
    items.sort(key=score,reverse=True)
    _INSTANCE_CACHE.update(at=now,items=items[:24])
    return _INSTANCE_CACHE["items"]

def cobalt_payload(url:str,q:int|None,fmt:str)->dict[str,Any]:
    return {
        "url":url,"videoQuality":str(q or 1080),
        "downloadMode":"audio" if fmt=="mp3" else "auto",
        "audioFormat":"mp3","audioBitrate":"192",
        "filenameStyle":"pretty","youtubeVideoCodec":"h264",
        "youtubeVideoContainer":"mp4","localProcessing":"disabled"
    }

def try_instance(api_url:str,payload:dict[str,Any],fmt:str)->dict[str,Any]|None:
    try:
        r=requests.post(api_url.rstrip("/")+"/",json=payload,timeout=18,headers={
            "Accept":"application/json","Content-Type":"application/json","User-Agent":"MorrisDownloader/2.0"})
        if not r.ok:return None
        data=r.json();status=data.get("status")
        if status in {"tunnel","redirect"}:
            u=data.get("url")
            if isinstance(u,str) and u.startswith("https://"):
                return {"status":"ready","url":u,"filename":clean_filename(data.get("filename"),fmt),"engine":"cobalt"}
        return None
    except Exception:return None

@app.get("/api/health")
def health():
    return {"ok":True,"app":"Morris Downloader","version":"4.0.0","saverapi":bool((os.getenv("SAVERAPI_KEY") or "").strip())}

@app.post("/api/resolve")
def resolve(req:ResolveReq):
    url=validate(req.url)
    payload=cobalt_payload(url,req.quality,req.media_format)
    for inst in instance_list():
        out=try_instance(str(inst.get("api") or ""),payload,req.media_format)
        if out:return out
    return {"status":"handoff","url":"https://cobalt.tools/#"+quote(url,safe=""),"message":"Apro il motore web di riserva."}

# ---------- V4 SaverAPI ----------
@app.get("/api/v4/status")
def v4_status():
    return {"ok":True,"configured":bool((os.getenv("SAVERAPI_KEY") or "").strip()),"engine":"SaverAPI"}

@app.post("/api/v4/info")
def v4_info(req:InfoReq):
    url=validate(req.url)
    if not is_youtube(url):
        return {
            "ok":True,"platform":platform_name(url),"title":"Contenuto "+platform_name(url),
            "thumbnail":None,"duration":None,
            "formats":[{"type":"video","format":"best","filesize":None}]
        }
    data=saver_get("/api/youtube-info-v2",{"url":url})
    if data.get("ok") is False:
        raise HTTPException(422,"SaverAPI non riesce a leggere questo video.")
    formats=[]
    for f in data.get("formats") or []:
        if not isinstance(f,dict):continue
        fmt=str(f.get("format") or "").strip()
        if fmt:
            formats.append({"type":f.get("type") or ("audio" if "mp3" in fmt.lower() else "video"),"format":fmt,"filesize":f.get("filesize")})
    return {
        "ok":True,"platform":"YouTube","title":data.get("title") or "Video YouTube",
        "author":data.get("author"),"thumbnail":data.get("thumbnail") or (data.get("thumbnails") or {}).get("max"),
        "duration":data.get("duration"),"formats":formats
    }

@app.post("/api/v4/download")
def v4_download(req:DownloadReq):
    url=validate(req.url)
    fmt="mp3" if req.media_format=="mp3" else str(int(req.quality or 1080))
    if is_youtube(url):
        data=saver_get("/api/youtube-telegram-base",{"url":url,"farmat":fmt})
        dl=data.get("url") or data.get("download_url")
        if not dl:
            raise HTTPException(502,"SaverAPI non ha restituito il file richiesto.")
        title=data.get("title") or "YouTube"
        filename=clean_filename(data.get("filename") or title,req.media_format)
        media="audio/mpeg" if req.media_format=="mp3" else "video/mp4"
        file=mint_file(dl,filename,media)
        return {"ok":True,"status":"ready","platform":"YouTube","title":title,"file":file}

    data=saver_get("/api/all-in-one-downloader-api",{"url":url})
    if data.get("error"):
        raise HTTPException(422,data.get("message") or "Questo contenuto non può essere scaricato.")
    hosting=data.get("hosting") or platform_name(url)
    medias=data.get("medias") or []
    if isinstance(medias,list) and medias:
        files=[]
        for i,m in enumerate(medias[:20],1):
            if not isinstance(m,dict):continue
            dl=m.get("download_url") or m.get("url")
            if not dl:continue
            typ=(m.get("type") or "video").lower()
            ext="jpg" if typ=="image" else "mp4"
            media="image/jpeg" if typ=="image" else "video/mp4"
            files.append(mint_file(dl,clean_filename(f"{hosting}-{i}.{ext}","mp4" if ext=="mp4" else "jpg"),media))
        if files:
            return {"ok":True,"status":"picker","platform":hosting,"files":files,"thumbnail":data.get("thumb")}
    dl=data.get("download_url") or data.get("url")
    if not dl:
        raise HTTPException(502,"SaverAPI non ha restituito un file scaricabile.")
    typ=(data.get("type") or "video").lower()
    media="audio/mpeg" if typ=="audio" else ("image/jpeg" if typ=="image" else "video/mp4")
    ext="mp3" if typ=="audio" else ("jpg" if typ=="image" else "mp4")
    filename=clean_filename(data.get("filename") or f"{hosting}.{ext}","mp3" if ext=="mp3" else ("mp4" if ext=="mp4" else "jpg"))
    return {"ok":True,"status":"ready","platform":hosting,"title":data.get("caption") or hosting,"thumbnail":data.get("thumb"),"file":mint_file(dl,filename,media)}

@app.get("/api/v4/file/{token}")
def v4_file(token:str):
    cleanup_downloads()
    item=_DOWNLOADS.get(token)
    if not item:
        raise HTTPException(404,"File scaduto o non disponibile.")
    try:
        remote=requests.get(item["url"],stream=True,timeout=(15,180),headers={"User-Agent":"Mozilla/5.0"})
    except Exception as exc:
        raise HTTPException(502,"Non riesco a recuperare il file dal server remoto.") from exc
    if remote.status_code>=400:
        remote.close()
        raise HTTPException(502,"Il file remoto non è più disponibile.")
    filename=item["filename"]
    headers={
        "Content-Disposition":f"attachment; filename*=UTF-8''{quote(filename)}",
        "Cache-Control":"private, max-age=300"
    }
    if remote.headers.get("Content-Length"):
        headers["Content-Length"]=remote.headers["Content-Length"]
    ctype=remote.headers.get("Content-Type") or item["media_type"]
    def body():
        try:
            for chunk in remote.iter_content(chunk_size=1024*256):
                if chunk:yield chunk
        finally:
            remote.close()
    return StreamingResponse(body(),media_type=ctype,headers=headers)

app.mount("/",StaticFiles(directory=STATIC,html=True),name="static")
