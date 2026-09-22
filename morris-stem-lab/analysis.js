import { fft, getHannWindow } from './lib/demucs-web/fft.js';

const NOTE_NAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

function monoAt(buffer,i){
  const a=buffer.getChannelData(0)[i]||0;
  if(buffer.numberOfChannels<2) return a;
  return (a+(buffer.getChannelData(1)[i]||0))*0.5;
}

export async function detectTempo(buffer,onProgress=()=>{}){
  const sr=buffer.sampleRate;
  const frame=2048, hop=1024;
  const n=Math.max(2,Math.floor((buffer.length-frame)/hop));
  const env=new Float32Array(n);
  let prev=0;
  const ch0=buffer.getChannelData(0), ch1=buffer.numberOfChannels>1?buffer.getChannelData(1):null;
  for(let f=0;f<n;f++){
    const start=f*hop;
    let e=0;
    for(let i=0;i<frame;i+=4){
      const s=ch1?(ch0[start+i]+ch1[start+i])*0.5:ch0[start+i];
      e+=s*s;
    }
    e=Math.sqrt(e/(frame/4));
    env[f]=Math.max(0,e-prev);
    prev=e;
    if((f&255)===0){ onProgress(Math.min(.45,f/n*.45)); await new Promise(r=>setTimeout(r,0)); }
  }
  let mean=0; for(const v of env) mean+=v; mean/=env.length||1;
  for(let i=0;i<env.length;i++) env[i]=Math.max(0,env[i]-mean*.55);
  const fps=sr/hop;
  let bestBpm=120,best=-Infinity;
  for(let bpm=60;bpm<=180;bpm++){
    const lag=Math.round(fps*60/bpm);
    let sum=0,normA=0,normB=0;
    for(let i=lag;i<env.length;i++){
      const a=env[i],b=env[i-lag];
      sum+=a*b; normA+=a*a; normB+=b*b;
    }
    const score=sum/(Math.sqrt(normA*normB)+1e-9);
    if(score>best){best=score;bestBpm=bpm;}
  }
  // Prefer a musically plausible half/double relation when scores are close.
  if(bestBpm>150) bestBpm=Math.round(bestBpm/2);
  if(bestBpm<70 && bestBpm*2<=180) bestBpm*=2;
  onProgress(.5);
  return {bpm:Math.round(bestBpm),confidence:Math.max(0,Math.min(1,best))};
}

function chordFromChroma(chroma){
  let total=chroma.reduce((a,b)=>a+b,0)||1;
  for(let i=0;i<12;i++) chroma[i]/=total;
  let best={score:-1,name:'C'};
  for(let root=0;root<12;root++){
    const maj=chroma[root]*1.0+chroma[(root+4)%12]*.86+chroma[(root+7)%12]*.76;
    const min=chroma[root]*1.0+chroma[(root+3)%12]*.86+chroma[(root+7)%12]*.76;
    const maj7=maj+chroma[(root+11)%12]*.38;
    const min7=min+chroma[(root+10)%12]*.38;
    const candidates=[
      {score:maj,name:NOTE_NAMES[root]},
      {score:min,name:NOTE_NAMES[root]+'m'},
      {score:maj7,name:NOTE_NAMES[root]+'maj7'},
      {score:min7,name:NOTE_NAMES[root]+'m7'}
    ];
    for(const c of candidates) if(c.score>best.score) best=c;
  }
  return best;
}

function accumulateChroma(buffer,startSample,endSample){
  const sr=buffer.sampleRate;
  const N=4096;
  const window=getHannWindow(N);
  const re=new Float32Array(N),im=new Float32Array(N),input=new Float32Array(N);
  const chroma=new Float32Array(12);
  const ch0=buffer.getChannelData(0), ch1=buffer.numberOfChannels>1?buffer.getChannelData(1):null;
  const span=Math.max(N,endSample-startSample);
  const positions=4;
  for(let p=0;p<positions;p++){
    let pos=Math.floor(startSample+(span-N)*(p+.5)/positions);
    pos=Math.max(0,Math.min(buffer.length-N,pos));
    for(let i=0;i<N;i++){
      const s=ch1?(ch0[pos+i]+ch1[pos+i])*.5:ch0[pos+i];
      input[i]=s*window[i];
    }
    fft(re,im,input,N);
    const minBin=Math.max(1,Math.floor(55*N/sr));
    const maxBin=Math.min(N/2-1,Math.ceil(1800*N/sr));
    for(let k=minBin;k<=maxBin;k++){
      const freq=k*sr/N;
      const midi=69+12*Math.log2(freq/440);
      const pc=((Math.round(midi)%12)+12)%12;
      const mag=Math.sqrt(re[k]*re[k]+im[k]*im[k]);
      chroma[pc]+=mag/(1+freq/1400);
    }
  }
  return chroma;
}

export async function detectChords(buffer,bpm,onProgress=()=>{}){
  const barSec=240/Math.max(50,Math.min(220,bpm||120));
  const bars=Math.min(64,Math.max(1,Math.floor(buffer.duration/barSec)));
  const chords=[];
  let last='';
  for(let b=0;b<bars;b++){
    const s=Math.floor(b*barSec*buffer.sampleRate);
    const e=Math.min(buffer.length,Math.floor((b+1)*barSec*buffer.sampleRate));
    const c=chordFromChroma(accumulateChroma(buffer,s,e)).name;
    chords.push(c||last||'C');
    last=c||last;
    if((b&3)===0){ onProgress(.5+.5*(b/bars)); await new Promise(r=>setTimeout(r,0)); }
  }
  onProgress(1);
  return chords;
}

export async function analyzeMusic(buffer,onProgress=()=>{}){
  const tempo=await detectTempo(buffer,onProgress);
  const chords=await detectChords(buffer,tempo.bpm,onProgress);
  return {bpm:tempo.bpm,tempoConfidence:tempo.confidence,chords};
}
