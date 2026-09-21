(()=>{
  "use strict";
  const SYMBOLS=[
    {id:"circle",name:"Cerchio"},
    {id:"cross",name:"Croce"},
    {id:"waves",name:"Onde"},
    {id:"square",name:"Quadrato"},
    {id:"star",name:"Stella"}
  ];
  const KEY="morris_esp_settings_final_20260921";
  const defaults={forced:"star",sound:true,showAll:true};
  let saved={};
  try{ saved=JSON.parse(localStorage.getItem(KEY)||"{}"); }catch(e){ saved={}; }
  let settings=Object.assign({},defaults,saved);
  if(!SYMBOLS.some(s=>s.id===settings.forced)) settings.forced="star";
  let state="idle";
  let deck=[];
  let selected=null;
  let audioCtx=null;
  let pressTimer=null;
  let manualOverride=false;
  let timers=[];
  function later(fn,ms){ timers.push(window.setTimeout(fn,ms)); }

  const $=id=>document.getElementById(id);
  const home=$("home"),game=$("game"),cards=$("cards"),predCard=$("predCard"),reading=$("reading"),modal=$("modal");
  const promptMain=$("promptMain"),promptSub=$("promptSub"),showAllBtn=$("showAllBtn"),againBtn=$("againBtn");
  const picker=$("picker"),soundSwitch=$("soundSwitch"),allSwitch=$("allSwitch");

  function save(){ try{ localStorage.setItem(KEY,JSON.stringify(settings)); }catch(e){} }
  function symbolName(id){ return (SYMBOLS.find(s=>s.id===id)||{}).name||id; }
  function symbolHTML(id){
    const common='viewBox="8 8 84 84" class="zener" aria-hidden="true"';
    if(id==="circle") return `<svg ${common}><circle cx="50" cy="50" r="29" fill="none" stroke="currentColor" stroke-width="8"/></svg>`;
    if(id==="cross") return `<svg ${common}><path d="M46 18h8v28h28v8H54v28h-8V54H18v-8h28z" fill="currentColor"/></svg>`;
    if(id==="waves") return `<svg ${common}><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"><path d="M12 28c12-14 24 14 38 0s26 14 38 0"/><path d="M12 50c12-14 24 14 38 0s26 14 38 0"/><path d="M12 72c12-14 24 14 38 0s26 14 38 0"/></g></svg>`;
    if(id==="square") return `<svg ${common}><rect x="22" y="22" width="56" height="56" fill="none" stroke="currentColor" stroke-width="8"/></svg>`;
    return `<svg ${common}><polygon points="50,15 59,39 85,40 64,56 71,82 50,67 29,82 36,56 15,40 41,39" fill="currentColor"/></svg>`;
  }

  function showScreen(which){
    home.classList.toggle("active",which==="home");
    home.inert=which!=="home";
    game.inert=which!=="game";
    game.classList.toggle("active",which==="game");
  }
  function setPrompt(main,sub){ promptMain.textContent=main; promptSub.textContent=sub; }
  function renderPrediction(){
    predCard.innerHTML=symbolHTML(settings.forced);
    predCard.setAttribute("aria-label","Previsione di Morris: "+symbolName(settings.forced));
  }
  function renderCards(){
    cards.innerHTML="";
    for(let i=0;i<5;i++){
      const b=document.createElement("button");
      b.type="button";
      b.className="card";
      b.dataset.index=String(i);
      b.setAttribute("aria-label","Carta "+(i+1)+", coperta");
      b.innerHTML='<span class="card-back">ESP</span>';
      b.addEventListener("click",()=>chooseCard(i));
      cards.appendChild(b);
    }
  }
  function shuffle(arr){
    const a=arr.slice();
    for(let i=a.length-1;i>0;i--){
      const j=Math.floor(Math.random()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a;
  }
  function assignDeck(index){
    const rest=shuffle(SYMBOLS.map(s=>s.id).filter(id=>id!==settings.forced));
    deck=new Array(5);
    deck[index]=settings.forced;
    let p=0;
    for(let i=0;i<5;i++) if(i!==index) deck[i]=rest[p++];
  }
  function frontMarkup(id){
    return `<span class="card-front" data-symbol="${id}" aria-label="${symbolName(id)}">${symbolHTML(id)}</span>`;
  }
  function revealCard(index){
    const card=cards.children[index];
    if(!card) return;
    card.innerHTML=frontMarkup(deck[index]);
    card.classList.add("revealed");
    card.setAttribute("aria-label","Carta "+(index+1)+": "+symbolName(deck[index]));
  }
  function primeAudio(){
    if(!settings.sound) return;
    try{
      if(!audioCtx){
        const A=window.AudioContext||window.webkitAudioContext;
        if(A) audioCtx=new A();
      }
      if(audioCtx && audioCtx.state==="suspended") audioCtx.resume();
    }catch(e){}
  }
  function tone(){
    if(!settings.sound || !audioCtx) return;
    try{
      const now=audioCtx.currentTime;
      const o=audioCtx.createOscillator();
      const g=audioCtx.createGain();
      o.type="sine";
      o.frequency.setValueAtTime(420,now);
      o.frequency.exponentialRampToValueAtTime(760,now+.34);
      g.gain.setValueAtTime(.0001,now);
      g.gain.exponentialRampToValueAtTime(.045,now+.025);
      g.gain.exponentialRampToValueAtTime(.0001,now+.55);
      o.connect(g);g.connect(audioCtx.destination);o.start(now);o.stop(now+.58);
    }catch(e){}
  }
  function chooseRandomPrediction(){
    const pool=SYMBOLS.map(s=>s.id).filter(id=>id!==settings.forced);
    settings.forced=pool[Math.floor(Math.random()*pool.length)];
    save();
  }
  function beginNewTest(){
    if(manualOverride){
      manualOverride=false;
    }else{
      chooseRandomPrediction();
    }
    reset();
  }
  function reset(){
    timers.forEach(clearTimeout); timers=[];
    state="idle"; deck=[]; selected=null;
    reading.classList.remove("show"); reading.setAttribute("aria-hidden","true");
    setPrompt("Scegli una carta","La posizione è completamente libera.");
    showAllBtn.classList.add("hidden");
    againBtn.classList.add("hidden");
    renderPrediction();
    renderCards();
  }
  function chooseCard(index){
    if(state!=="idle") return;
    state="reading";
    selected=index;
    assignDeck(index);
    primeAudio();
    [...cards.children].forEach((card,i)=>{
      card.disabled=true;
      card.classList.toggle("selected",i===index);
    });
    setPrompt("Scelta registrata","Morris si sta concentrando sulla tua carta.");
    $("readTitle").textContent="Morris si concentra...";
    reading.classList.add("show"); reading.setAttribute("aria-hidden","false");
    later(()=>{ if(state==="reading") $("readTitle").textContent="Sta percependo il simbolo..."; },720);
    later(()=>{
      if(state!=="reading") return;
      reading.classList.remove("show"); reading.setAttribute("aria-hidden","true");
      revealCard(index);
      tone();
      try{ if(navigator.vibrate) navigator.vibrate(25); }catch(e){}
      state="revealed";
      setPrompt("Coincide.","Morris l'aveva previsto prima della tua scelta.");
      againBtn.classList.remove("hidden");
      if(settings.showAll) showAllBtn.classList.remove("hidden");
    },1750);
  }
  function revealAll(){
    if(state!=="revealed" && state!=="all") return;
    [...cards.children].forEach((card,i)=>{
      if(i===selected) return;
      later(()=>revealCard(i),110*(i+1));
    });
    state="all";
    showAllBtn.classList.add("hidden");
    setPrompt("Cinque simboli, una sola volta ciascuno.","La carta scelta coincide con la previsione di Morris.");
  }
  function renderSettings(){
    picker.innerHTML="";
    SYMBOLS.forEach(s=>{
      const b=document.createElement("button");
      b.type="button";
      b.className="pick"+(settings.forced===s.id?" active":"");
      b.title=s.name;
      b.setAttribute("aria-label",s.name);
      b.innerHTML=symbolHTML(s.id);
      b.addEventListener("click",()=>{
        settings.forced=s.id;
        manualOverride=true;
        save();
        renderSettings();
        renderPrediction();
      });
      picker.appendChild(b);
    });
    soundSwitch.classList.toggle("on",!!settings.sound);
    allSwitch.classList.toggle("on",!!settings.showAll);
    soundSwitch.setAttribute("aria-pressed",String(!!settings.sound));
    allSwitch.setAttribute("aria-pressed",String(!!settings.showAll));
  }
  function openSecret(){
    renderSettings();
    home.inert=true;
    modal.classList.add("show");
    modal.setAttribute("aria-hidden","false");
    try{ if(navigator.vibrate) navigator.vibrate(20); }catch(e){}
  }
  function closeSecret(){ home.inert=false; modal.classList.remove("show"); modal.setAttribute("aria-hidden","true"); }

  $("startBtn").addEventListener("click",()=>{ beginNewTest(); showScreen("game"); });
  $("exitBtn").addEventListener("click",()=>{ closeSecret(); reset(); showScreen("home"); });
  againBtn.addEventListener("click",beginNewTest);
  showAllBtn.addEventListener("click",revealAll);
  $("closeBtn").addEventListener("click",closeSecret);
  modal.addEventListener("click",e=>{ if(e.target===modal) closeSecret(); });
  soundSwitch.addEventListener("click",()=>{ settings.sound=!settings.sound; save(); renderSettings(); });
  allSwitch.addEventListener("click",()=>{ settings.showAll=!settings.showAll; save(); renderSettings(); });

  const hotspot=$("secretHotspot");
  function clearPress(){ if(pressTimer){ clearTimeout(pressTimer); pressTimer=null; } }
  hotspot.addEventListener("pointerdown",e=>{
    e.preventDefault();
    clearPress();
    pressTimer=window.setTimeout(()=>{ pressTimer=null; openSecret(); },1200);
  });
  ["pointerup","pointercancel","pointerleave"].forEach(ev=>hotspot.addEventListener(ev,clearPress));
  hotspot.addEventListener("contextmenu",e=>e.preventDefault());
  hotspot.addEventListener("dragstart",e=>e.preventDefault());

  if("serviceWorker" in navigator){
    navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister())).catch(()=>{});
  }
  if("caches" in window){
    caches.keys().then(keys=>Promise.all(keys.map(k=>caches.delete(k)))).catch(()=>{});
  }

  showScreen("home");
  renderPrediction();
  renderCards();
  renderSettings();

})();
