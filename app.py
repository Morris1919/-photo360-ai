from __future__ import annotations
import re, time
from urllib.parse import urlparse, quote
from typing import Any
import requests
from fastapi import FastAPI, HTTPException
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field
from pathlib import Path

BASE=Path(__file__).resolve().parent
STATIC=BASE/"static"
app=FastAPI(title="Morris Downloader",version="2.0.0")

ALLOWED={
"youtube.com","www.youtube.com","m.youtube.com","youtu.be",
"instagram.com","www.instagram.com",
"facebook.com","www.facebook.com","m.facebook.com","fb.watch",
"dailymotion.com","www.dailymotion.com","dai.ly",
"tiktok.com","www.tiktok.com","vm.tiktok.com",
"x.com","www.x.com","twitter.com","www.twitter.com",
"vimeo.com","www.vimeo.com"
}

class ResolveReq(BaseModel):
    url:str=Field(min_length=8,max_length=2048)
    quality:int|None=Field(default=1080,ge=144,le=4320)
    media_format:str=Field(default="mp4",pattern="^(mp4|mp3)$")

def validate(raw:str)->str:
    raw=raw.strip()
    p=urlparse(raw)
    if p.scheme not in {"http","https"} or not p.hostname:
        raise HTTPException(400,"Inserisci un link http/https valido.")
    if p.hostname.lower().rstrip(".") not in ALLOWED:
        raise HTTPException(400,"Piattaforma non supportata.")
    return raw

_INSTANCE_CACHE:dict[str,Any]={"at":0.0,"items":[]}

def instance_list()->list[dict[str,Any]]:
    now=time.time()
    if _INSTANCE_CACHE["items"] and now-_INSTANCE_CACHE["at"]<600:
        return _INSTANCE_CACHE["items"]
    urls=[
        "https://instances.cobalt.best/api/instances.json",
    ]
    items=[]
    for u in urls:
        try:
            r=requests.get(u,timeout=8,headers={"User-Agent":"MorrisDownloader/2.0"})
            if r.ok and isinstance(r.json(),list):
                items=r.json()
                break
        except Exception:
            pass
    def score(x):
        online=x.get("online") or {}
        return (
            1 if online.get("api") else 0,
            int(x.get("trust") or 0),
            int(x.get("score") or 0)
        )
    items=[x for x in items if isinstance(x,dict) and str(x.get("api") or "").startswith("https://")]
    items.sort(key=score,reverse=True)
    _INSTANCE_CACHE.update(at=now,items=items[:24])
    return _INSTANCE_CACHE["items"]

def clean_filename(name:str|None,fmt:str)->str:
    name=(name or ("audio.mp3" if fmt=="mp3" else "video.mp4")).strip()
    name=re.sub(r'[\\/:*?"<>|\x00-\x1f]',' ',name)
    name=re.sub(r'\s+',' ',name).strip(' .')
    if fmt=="mp3" and not name.lower().endswith(".mp3"): name+=".mp3"
    if fmt=="mp4" and "." not in name[-6:]: name+=".mp4"
    return name[:160]

def cobalt_payload(url:str,q:int|None,fmt:str)->dict[str,Any]:
    p={
        "url":url,
        "videoQuality":str(q or 1080),
        "downloadMode":"audio" if fmt=="mp3" else "auto",
        "audioFormat":"mp3",
        "audioBitrate":"192",
        "filenameStyle":"pretty",
        "youtubeVideoCodec":"h264",
        "youtubeVideoContainer":"mp4",
        "localProcessing":"disabled",
    }
    return p

def try_instance(api_url:str,payload:dict[str,Any],fmt:str)->dict[str,Any]|None:
    try:
        root=api_url.rstrip("/")+"/"
        r=requests.post(
            root,json=payload,timeout=18,
            headers={
                "Accept":"application/json",
                "Content-Type":"application/json",
                "User-Agent":"MorrisDownloader/2.0"
            }
        )
        if not r.ok:
            return None
        data=r.json()
        status=data.get("status")
        if status in {"tunnel","redirect"}:
            u=data.get("url")
            if isinstance(u,str) and u.startswith("https://"):
                return {
                    "status":"ready",
                    "url":u,
                    "filename":clean_filename(data.get("filename"),fmt),
                    "engine":"cobalt"
                }
        if status=="picker":
            picks=[]
            for item in data.get("picker") or []:
                u=item.get("url") if isinstance(item,dict) else None
                if isinstance(u,str) and u.startswith("https://"):
                    picks.append({
                        "url":u,
                        "type":item.get("type","media"),
                        "thumb":item.get("thumb")
                    })
            if picks:
                return {"status":"picker","items":picks,"engine":"cobalt"}
        return None
    except Exception:
        return None

@app.get("/api/health")
def health():
    return {"ok":True,"app":"Morris Downloader","version":"2.0.0"}

@app.post("/api/resolve")
def resolve(req:ResolveReq):
    url=validate(req.url)
    payload=cobalt_payload(url,req.quality,req.media_format)
    for inst in instance_list():
        api_url=str(inst.get("api") or "")
        out=try_instance(api_url,payload,req.media_format)
        if out:
            return out
    return {
        "status":"handoff",
        "url":"https://cobalt.tools/#"+quote(url,safe=""),
        "message":"Apro il motore web di riserva."
    }

app.mount("/",StaticFiles(directory=STATIC,html=True),name="static")
