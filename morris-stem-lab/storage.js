const MAGIC='MORRISSTEM1\0';
const HEADER_SIZE=16;

function align4(n){return (n+3)&~3;}

export function deserializeBuffer(ctx,data){
  const b=ctx.createBuffer(data.channels.length,data.length,data.sampleRate);
  data.channels.forEach((ch,i)=>b.copyToChannel(ch,i));
  return b;
}

function encodeTrackPCM(audio){
  const {channels,length}=audio;
  const chCount=channels.length;
  const ab=new ArrayBuffer(length*chCount*2);
  const view=new DataView(ab);
  let o=0;
  for(let i=0;i<length;i++){
    for(let c=0;c<chCount;c++){
      let s=Math.max(-1,Math.min(1,channels[c][i]||0));
      view.setInt16(o,s<0?Math.round(s*32768):Math.round(s*32767),true);
      o+=2;
    }
  }
  return ab;
}

function decodeTrackPCM(buffer,offset,meta){
  const {length,channelCount,sampleRate}=meta;
  const view=new DataView(buffer,offset,length*channelCount*2);
  const channels=Array.from({length:channelCount},()=>new Float32Array(length));
  let o=0;
  for(let i=0;i<length;i++){
    for(let c=0;c<channelCount;c++){
      channels[c][i]=view.getInt16(o,true)/32768;
      o+=2;
    }
  }
  return {sampleRate,length,channels};
}

export async function buildProjectFile(record,onProgress=()=>{}){
  const tracks=[];
  const audioParts=[];
  let byteOffset=0;
  const totalSamples=record.tracks.reduce((s,t)=>s+t.audio.length*t.audio.channels.length,0)||1;
  let doneSamples=0;

  for(let i=0;i<record.tracks.length;i++){
    const t=record.tracks[i];
    const pcm=encodeTrackPCM(t.audio);
    tracks.push({
      name:t.name,kind:t.kind,settings:t.settings,
      audio:{sampleRate:t.audio.sampleRate,length:t.audio.length,channelCount:t.audio.channels.length,byteOffset,byteLength:pcm.byteLength}
    });
    audioParts.push(pcm);
    byteOffset+=pcm.byteLength;
    doneSamples+=t.audio.length*t.audio.channels.length;
    onProgress(Math.min(.92,doneSamples/totalSamples*.92));
    await new Promise(r=>setTimeout(r,0));
  }

  const manifest={
    format:'MORRIS STEM LAB PROJECT',
    version:1,
    createdAt:record.updatedAt||Date.now(),
    id:record.id,
    name:record.name,
    duration:record.duration,
    master:record.master,
    keyboard:record.keyboard,
    tracks
  };
  const enc=new TextEncoder();
  const json=enc.encode(JSON.stringify(manifest));
  const padded=align4(json.length);
  const header=new ArrayBuffer(HEADER_SIZE);
  const hv=new DataView(header);
  const magic=enc.encode(MAGIC);
  new Uint8Array(header,0,12).set(magic.slice(0,12));
  hv.setUint32(12,json.length,true);
  const jsonBlock=new Uint8Array(padded);
  jsonBlock.set(json);
  onProgress(.96);
  return new Blob([header,jsonBlock,...audioParts],{type:'application/x-morrisstem'});
}

export async function saveProjectToPC(record,suggestedBaseName='Morris Project',onProgress=()=>{}){
  const filename=(suggestedBaseName||'Morris Project').replace(/[\\/:*?"<>|]+/g,' ').trim()+'.morrisstem';
  let handle=null;
  if('showSaveFilePicker' in window){
    handle=await window.showSaveFilePicker({
      suggestedName:filename,
      types:[{description:'MORRIS STEM LAB Project',accept:{'application/x-morrisstem':['.morrisstem']}}]
    });
  }
  const blob=await buildProjectFile(record,onProgress);
  if(handle){
    const writable=await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    onProgress(1);
    return {filename,bytes:blob.size,method:'picker'};
  }
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),5000);
  onProgress(1);
  return {filename,bytes:blob.size,method:'download'};
}

export async function loadProjectFromFile(file,onProgress=()=>{}){
  const buffer=await file.arrayBuffer();
  if(buffer.byteLength<HEADER_SIZE)throw new Error('File progetto non valido');
  const dec=new TextDecoder();
  const magic=dec.decode(new Uint8Array(buffer,0,12));
  if(!magic.startsWith('MORRISSTEM1'))throw new Error('Questo non è un progetto MORRIS STEM LAB');
  const hv=new DataView(buffer,0,HEADER_SIZE);
  const jsonLength=hv.getUint32(12,true);
  if(jsonLength<=0||jsonLength>buffer.byteLength-HEADER_SIZE)throw new Error('Manifest progetto danneggiato');
  const manifest=JSON.parse(dec.decode(new Uint8Array(buffer,HEADER_SIZE,jsonLength)));
  if(manifest.version!==1||!Array.isArray(manifest.tracks))throw new Error('Versione progetto non supportata');
  const dataStart=align4(HEADER_SIZE+jsonLength);
  const tracks=[];
  for(let i=0;i<manifest.tracks.length;i++){
    const t=manifest.tracks[i],m=t.audio;
    const abs=dataStart+m.byteOffset;
    if(abs+m.byteLength>buffer.byteLength)throw new Error('Audio progetto incompleto');
    const audio=decodeTrackPCM(buffer,abs,m);
    tracks.push({name:t.name,kind:t.kind,settings:t.settings,audio});
    onProgress((i+1)/manifest.tracks.length);
    await new Promise(r=>setTimeout(r,0));
  }
  return {...manifest,tracks};
}
