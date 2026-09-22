const DB_NAME='morris-stem-lab';
const DB_VERSION=1;

function openDB(){
  return new Promise((resolve,reject)=>{
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{
      const db=req.result;
      if(!db.objectStoreNames.contains('projects')) db.createObjectStore('projects',{keyPath:'id'});
      if(!db.objectStoreNames.contains('meta')) db.createObjectStore('meta',{keyPath:'id'});
    };
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error);
  });
}

function txDone(tx){return new Promise((resolve,reject)=>{tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('Transazione annullata'));});}

export function serializeBuffer(buffer){
  const channels=[];
  for(let c=0;c<buffer.numberOfChannels;c++) channels.push(new Float32Array(buffer.getChannelData(c)));
  return {sampleRate:buffer.sampleRate,length:buffer.length,channels};
}

export function deserializeBuffer(ctx,data){
  const b=ctx.createBuffer(data.channels.length,data.length,data.sampleRate);
  data.channels.forEach((ch,i)=>b.copyToChannel(ch,i));
  return b;
}

export async function saveProject(record){
  const db=await openDB();
  const tx=db.transaction(['projects','meta'],'readwrite');
  tx.objectStore('projects').put(record);
  tx.objectStore('meta').put({id:record.id,name:record.name,updatedAt:record.updatedAt,duration:record.duration});
  await txDone(tx); db.close();
}

export async function listProjects(){
  const db=await openDB();
  const tx=db.transaction('meta','readonly');
  const req=tx.objectStore('meta').getAll();
  const data=await new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result||[]);req.onerror=()=>reject(req.error);});
  db.close();
  return data.sort((a,b)=>(b.updatedAt||0)-(a.updatedAt||0));
}

export async function loadProject(id){
  const db=await openDB();
  const tx=db.transaction('projects','readonly');
  const req=tx.objectStore('projects').get(id);
  const data=await new Promise((resolve,reject)=>{req.onsuccess=()=>resolve(req.result);req.onerror=()=>reject(req.error);});
  db.close(); return data;
}

export async function deleteProject(id){
  const db=await openDB();
  const tx=db.transaction(['projects','meta'],'readwrite');
  tx.objectStore('projects').delete(id); tx.objectStore('meta').delete(id);
  await txDone(tx); db.close();
}
