const majorsRaw=`matto|Il Matto|nuovo inizio, libertà, fiducia, salto nell'ignoto|imprudenza, esitazione, rischio non calcolato
mago|Il Mago|iniziativa, volontà, abilità, risorse|talento disperso, manipolazione, insicurezza
papessa|La Papessa|intuizione, silenzio, conoscenza interiore|intuizione ignorata, segreti, chiusura
imperatrice|L'Imperatrice|crescita, creatività, cura, abbondanza|blocco creativo, dipendenza, trascurarsi
imperatore|L'Imperatore|struttura, autorità, confini, stabilità|rigidità, controllo eccessivo, autoritarismo
papa|Il Papa|tradizione, insegnamento, valori, guida|conformismo, regole da rivedere, via non convenzionale
amanti|Gli Amanti|unione, scelta coerente, attrazione, valori|disallineamento, scelta evitata, conflitto di valori
carro|Il Carro|direzione, determinazione, disciplina, avanzamento|perdita di direzione, fretta, forze in conflitto
forza|La Forza|coraggio calmo, autocontrollo, pazienza|insicurezza, reattività, energia trattenuta
eremita|L'Eremita|ricerca interiore, prudenza, solitudine utile|isolamento, chiusura, fuga dal confronto
ruota|La Ruota della Fortuna|ciclo che cambia, svolta, opportunità|resistenza al cambiamento, ritardo, schema ripetuto
giustizia|La Giustizia|equilibrio, responsabilità, verità, conseguenze|parzialità, negazione, squilibrio
appeso|L'Appeso|pausa necessaria, nuova prospettiva, resa|stallo sterile, sacrificio inutile, resistenza
morte|La Morte|chiusura, trasformazione, rilascio, passaggio|attaccamento, paura di chiudere, transizione rallentata
temperanza|La Temperanza|integrazione, misura, guarigione, mediazione|eccessi, impazienza, squilibrio
diavolo|Il Diavolo|desiderio, attaccamento, dipendenza, impulsi|liberazione, presa di coscienza, autonomia
torre|La Torre|rottura, verità improvvisa, struttura che crolla|crisi evitata, paura del cambiamento, crollo rimandato
stella|La Stella|speranza, autenticità, fiducia, rigenerazione|sfiducia, scoraggiamento, speranza fragile
luna|La Luna|inconscio, ambiguità, sensibilità, nebbia|paure riconosciute, autoinganno che emerge
sole|Il Sole|chiarezza, vitalità, gioia, successo|gioia attenuata, aspettative alte, luce non vissuta
giudizio|Il Giudizio|risveglio, chiamata, revisione, decisione|autocritica, chiamata ignorata, passato non chiuso
mondo|Il Mondo|compimento, integrazione, risultato, chiusura|incompiutezza, ritardo, ultimo passaggio`;

const suitRaw={
Bastoni:`Asso|scintilla, iniziativa, entusiasmo|energia bloccata, partenza rimandata;Due|pianificazione, scelta, orizzonte|timore di esporsi, scelta rinviata;Tre|espansione, primi risultati, prospettiva|ritardi, aspettative deluse;Quattro|stabilità, celebrazione, casa|tensione nel gruppo, base fragile;Cinque|competizione, attrito, confronto|conflitto evitato, tensione interna;Sei|riconoscimento, vittoria, visibilità|bisogno di approvazione, successo fragile;Sette|difesa, fermezza, confini|stanchezza, sentirsi sopraffatti;Otto|velocità, notizie, movimento|ritardi, comunicazioni confuse;Nove|resilienza, prudenza, resistenza|esaurimento, difese troppo alte;Dieci|peso, responsabilità, carico|delegare, alleggerire il carico;Fante|curiosità, messaggio, esplorazione|idea acerba, impazienza;Cavaliere|azione, slancio, avventura|impulsività, irrequietezza;Regina|fiducia, calore, magnetismo|insicurezza, gelosia;Re|visione, leadership, impresa|arroganza, comando senza ascolto`,
Coppe:`Asso|apertura emotiva, amore, intuizione|emozioni trattenute, vulnerabilità negata;Due|reciprocità, incontro, accordo|squilibrio relazionale, distanza;Tre|amicizia, condivisione, festa|eccessi, dinamiche di gruppo confuse;Quattro|apatia, pausa emotiva, occasione non vista|ritorno dell'interesse, nuova apertura;Cinque|perdita, rimpianto, dolore|accettazione, recupero;Sei|nostalgia, memoria, gentilezza|idealizzazione del passato;Sette|possibilità, immaginazione, illusione|scelta che si chiarisce;Otto|distacco, lasciare ciò che non nutre|paura di andarsene, ritorno;Nove|soddisfazione, desiderio realizzato|gratificazione superficiale, eccesso;Dieci|armonia, famiglia, appartenenza|tensione domestica, disconnessione;Fante|sensibilità, messaggio affettivo, intuizione|immaturità emotiva, fantasia;Cavaliere|romanticismo, proposta, idealismo|idealizzazione, promesse vaghe;Regina|empatia, ascolto, profondità|confini emotivi deboli, insicurezza;Re|maturità emotiva, diplomazia, calma|freddezza, manipolazione affettiva`,
Spade:`Asso|chiarezza, verità, decisione|confusione, verità parziale;Due|stallo, scelta difficile, equilibrio precario|informazioni che emergono, scelta inevitabile;Tre|dolore, separazione, delusione|guarigione, rilascio del dolore;Quattro|riposo, recupero, pausa|irrequietezza, stanchezza ignorata;Cinque|conflitto, vittoria amara, tensione|rimorso, riconciliazione possibile;Sei|transizione, passaggio, recupero|bagaglio non lasciato, ritorno;Sette|strategia, discrezione, astuzia|verità scoperta, strategia che non regge;Otto|limitazione percepita, paura, vincolo mentale|liberazione, nuova prospettiva;Nove|ansia, preoccupazione, colpa|sollievo graduale, paura affrontata;Dieci|fine dolorosa, rottura, conclusione|ripresa dopo il fondo, fine rimandata;Fante|curiosità mentale, osservazione, notizia|pettegolezzo, informazione incompleta;Cavaliere|azione decisa, confronto diretto|aggressività, fretta;Regina|discernimento, indipendenza, confini chiari|durezza, cinismo, isolamento;Re|razionalità, strategia, autorità mentale|rigidità, uso freddo del potere`,
Denari:`Asso|opportunità concreta, risorsa, base stabile|occasione persa, ritardo materiale;Due|equilibrio pratico, adattamento, priorità|sovraccarico, disordine;Tre|competenza, collaborazione, mestiere|lavoro poco coordinato, capacità non valorizzata;Quattro|sicurezza, conservazione, controllo|paura della perdita, controllo eccessivo;Cinque|difficoltà, scarsità, bisogno di aiuto|recupero, sostegno disponibile;Sei|generosità, scambio, sostegno|aiuto condizionato, scambio squilibrato;Sette|pazienza, valutazione, investimento|impazienza, rendimento insufficiente;Otto|apprendimento, disciplina, miglioramento|perfezionismo, lavoro meccanico;Nove|autonomia, benessere, risultati|dipendenza materiale, spesa eccessiva;Dieci|stabilità duratura, famiglia, patrimonio|instabilità familiare o finanziaria;Fante|studio, opportunità, progetto|procrastinazione, piano poco pratico;Cavaliere|costanza, affidabilità, metodo|stagnazione, routine sterile;Regina|praticità, cura, gestione delle risorse|ansia materiale, trascurarsi;Re|solidità, gestione, successo concreto|materialismo, rigidità, avidità`
};

const element={Bastoni:"Fuoco",Coppe:"Acqua",Spade:"Aria",Denari:"Terra"};
const majors=majorsRaw.split("\n").map(r=>{const[id,name,upright,reversed]=r.split("|");return{id,name,arcana:"Maggiore",element:"Spirito",upright,reversed}});
const minors=Object.entries(suitRaw).flatMap(([suit,raw])=>raw.split(";").map(r=>{const[rank,upright,reversed]=r.split("|");return{id:suit.toLowerCase()+"-"+rank.toLowerCase(),name:rank+" di "+suit,arcana:"Minore",suit,rank,element:element[suit],upright,reversed}}));
const deck=[...majors,...minors];

const spreads={
one:{name:"Una carta",positions:[{label:"Messaggio",focus:"il nucleo della domanda"}]},
three:{name:"Tre carte",positions:[{label:"Passato",focus:"ciò che ha preparato la situazione"},{label:"Presente",focus:"la dinamica attiva adesso"},{label:"Futuro",focus:"la tendenza se il quadro resta questo"}]},
celtic:{name:"Croce Celtica",positions:[{label:"1. Presente",focus:"il cuore della situazione"},{label:"2. Sfida",focus:"la forza che incrocia o mette alla prova"},{label:"3. Radice",focus:"la base profonda o inconscia"},{label:"4. Passato",focus:"ciò che sta perdendo forza"},{label:"5. Possibile",focus:"ciò che può maturare o l'obiettivo cosciente"},{label:"6. Prossimo passo",focus:"la tendenza immediata"},{label:"7. Tu",focus:"atteggiamento e risorse personali"},{label:"8. Ambiente",focus:"influenze esterne e contesto"},{label:"9. Speranze e timori",focus:"desiderio e paura che convivono"},{label:"10. Esito potenziale",focus:"la direzione se le dinamiche restano invariate"}]}
};

let currentSpread="three",drawn=[],revealed=new Set();
const q=document.querySelector("#question"), reversals=document.querySelector("#reversals"), drawBtn=document.querySelector("#drawBtn"), deckStage=document.querySelector("#deckStage"), spreadArea=document.querySelector("#spreadArea"), revealNote=document.querySelector("#revealNote"), result=document.querySelector("#result"), oracleText=document.querySelector("#oracleText");

document.querySelectorAll('input[name="spread"]').forEach(r=>r.addEventListener("change",e=>{currentSpread=e.target.value;document.querySelectorAll(".spread-option").forEach(x=>x.classList.toggle("active",x.dataset.spreadLabel===currentSpread));resetTable(false)}));
drawBtn.addEventListener("click",draw);
function rnd(){const a=new Uint32Array(1);crypto.getRandomValues(a);return a[0]/4294967296}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function draw(){const pool=shuffle([...deck]);drawn=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.34,position}));revealed=new Set();renderSpread();drawBtn.textContent="Mescola ancora";oracleText.textContent="Una alla volta. Non correre davanti alle carte."}
function resetTable(clearQuestion=true){drawn=[];revealed=new Set();deckStage.classList.remove("hidden");spreadArea.classList.add("hidden");spreadArea.innerHTML="";revealNote.classList.add("hidden");result.classList.add("hidden");result.innerHTML="";drawBtn.textContent="Inizia la lettura";oracleText.textContent="Fammi una domanda chiara. Al resto penso io.";if(clearQuestion)q.value=""}
function mark(c){if(c.arcana==="Maggiore")return"✦";if(c.suit==="Bastoni")return"│";if(c.suit==="Coppe")return"◡";if(c.suit==="Spade")return"†";return"◇"}
function renderSpread(){deckStage.classList.add("hidden");spreadArea.className="spread-area "+currentSpread;spreadArea.innerHTML="";revealNote.classList.remove("hidden");result.classList.add("hidden");drawn.forEach((d,i)=>{const slot=document.createElement("div");slot.className="card-slot";slot.innerHTML=`<span class="position-label">${d.position.label}</span><button class="tarot-card" type="button" aria-label="Rivela ${d.position.label}"><span class="card-inner"><span class="card-back"><b>✦</b><i>☾</i><small>MORRIS</small></span><span class="card-front ${d.reversed?"reversed":""}"><em>${d.card.arcana}</em><b class="mark">${mark(d.card)}</b><strong>${d.card.name}</strong><small>${d.reversed?"Rovesciata":"Dritta"}</small></span></span></button>`;const btn=slot.querySelector("button");btn.addEventListener("click",()=>{if(revealed.has(i))return;revealed.add(i);btn.classList.add("revealed");if(revealed.size===drawn.length){oracleText.textContent="Bene. Adesso guardiamo il disegno completo.";revealNote.classList.add("hidden");setTimeout(renderResult,500)}});spreadArea.appendChild(slot)})}
function meaning(d){return d.reversed?d.card.reversed:d.card.upright}
function topic(s){s=s.toLowerCase();if(/amor|relaz|coppia|sentiment|ex\b/.test(s))return"relazioni";if(/lavor|carriera|client|profession|azienda/.test(s))return"lavoro";if(/sold|denar|econom|finanz/.test(s))return"risorse";if(/famigli|figli|casa|genitor/.test(s))return"famiglia";return"quadro generale"}
function synthesis(){const majors=drawn.filter(x=>x.card.arcana==="Maggiore").length,rev=drawn.filter(x=>x.reversed).length,courts=drawn.filter(x=>["Fante","Cavaliere","Regina","Re"].includes(x.card.rank||"")).length,suits={Bastoni:0,Coppe:0,Spade:0,Denari:0};drawn.forEach(x=>{if(x.card.suit)suits[x.card.suit]++});const dominant=Object.entries(suits).sort((a,b)=>b[1]-a[1])[0],notes=[];if(majors>=Math.max(2,Math.ceil(drawn.length/3)))notes.push("Gli Arcani Maggiori sono numerosi: qui pesano soprattutto scelte di fondo e passaggi strutturali.");if(rev>=Math.ceil(drawn.length/2))notes.push("Molte carte sono rovesciate: molta energia è interna, trattenuta o in revisione, non semplicemente negativa.");if(courts>=2)notes.push("Le figure di corte ricorrono: persone, ruoli o modi di comportarsi incidono molto sul quadro.");if(dominant[1]>=2){const v={Bastoni:"azione e iniziativa",Coppe:"emozioni e legami",Spade:"pensiero e decisioni",Denari:"realtà pratica e risorse"};notes.push("Dominano "+dominant[0]+": la lettura insiste su "+v[dominant[0]]+".")}for(let i=0;i<drawn.length-1;i++){const a=drawn[i].card.element,b=drawn[i+1].card.element,sup=(a==="Fuoco"&&b==="Aria")||(a==="Aria"&&b==="Fuoco")||(a==="Acqua"&&b==="Terra")||(a==="Terra"&&b==="Acqua"),fr=(a==="Fuoco"&&b==="Acqua")||(a==="Acqua"&&b==="Fuoco")||(a==="Aria"&&b==="Terra")||(a==="Terra"&&b==="Aria");if(sup){notes.push("“"+drawn[i].card.name+"” e “"+drawn[i+1].card.name+"” si sostengono sul piano elementale.");break}if(fr){notes.push("“"+drawn[i].card.name+"” e “"+drawn[i+1].card.name+"” creano attrito elementale: serve mediazione.");break}}return notes}
function esc(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]))}
function renderResult(){const notes=synthesis(),question=q.value.trim();result.classList.remove("hidden");result.innerHTML=`<div class="result-head"><div><span>Lettura di Morris</span><h3>${question?"“"+esc(question)+"”":"Il quadro che emerge"}</h3></div><p>Ambito rilevato: <strong>${topic(question)}</strong></p></div><div class="reading">${drawn.map(d=>`<article><span>${d.position.label}</span><h4>${d.card.name} <small>${d.reversed?"rovesciata":"dritta"}</small></h4><p><strong>In questa posizione:</strong> ${d.position.focus}. La carta porta ${meaning(d)}.</p></article>`).join("")}</div><div class="synthesis"><img src="https://d2ol7oe51mr4n9.cloudfront.net/user_3I2R8XV0b9op50LbwH2h8azHhrT/f70cb9d7-d3ae-4161-b7ea-a7c2bab8c6b2.jpg" alt=""><div><span>Morris mette insieme le carte</span>${(notes.length?notes:["La stesa è equilibrata: nessun seme o gruppo domina nettamente, quindi conta soprattutto la sequenza delle singole posizioni."]).map(n=>"<p>"+n+"</p>").join("")}<p class="final">Il punto non è indovinare un futuro fisso. È vedere quale dinamica stai alimentando adesso e dove può portarti.</p></div></div><button class="reset" id="resetBtn">Nuova domanda</button>`;document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});result.scrollIntoView({behavior:"smooth",block:"start"})}



// ===== MORRIS CARTOMANTE V2 =====
const MORRIS_IMG="https://d2ol7oe51mr4n9.cloudfront.net/user_3I2R8XV0b9op50LbwH2h8azHhrT/f70cb9d7-d3ae-4161-b7ea-a7c2bab8c6b2.jpg";
const musicToggle=document.querySelector("#musicToggle");
const musicLabel=document.querySelector("#musicLabel");
const oracle=document.querySelector(".oracle");
let musicEnabled=true,audioCtx=null,masterGain=null,musicTimer=null,droneStarted=false;

function ensureAudio(){
  if(!audioCtx){
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    masterGain=audioCtx.createGain();
    masterGain.gain.value=0.0001;
    masterGain.connect(audioCtx.destination);
  }
  if(audioCtx.state==="suspended") audioCtx.resume();
  if(!droneStarted) startDrone();
  if(musicEnabled && !musicTimer) startMusicLoop();
}

function startDrone(){
  droneStarted=true;
  const filter=audioCtx.createBiquadFilter();
  filter.type="lowpass"; filter.frequency.value=420; filter.Q.value=.7;
  const droneGain=audioCtx.createGain(); droneGain.gain.value=.13;
  filter.connect(droneGain); droneGain.connect(masterGain);
  [73.42,110].forEach((freq,i)=>{
    const o=audioCtx.createOscillator();
    o.type=i===0?"sine":"triangle"; o.frequency.value=freq;
    const g=audioCtx.createGain(); g.gain.value=i===0?.34:.12;
    o.connect(g); g.connect(filter); o.start();
  });
  fadeMaster(musicEnabled?.055:.0001,1.2);
}

function fadeMaster(to,seconds=.6){
  if(!masterGain||!audioCtx)return;
  const t=audioCtx.currentTime;
  masterGain.gain.cancelScheduledValues(t);
  masterGain.gain.setValueAtTime(Math.max(masterGain.gain.value,.0001),t);
  masterGain.gain.exponentialRampToValueAtTime(Math.max(to,.0001),t+seconds);
}

function bell(freq,when,dur=3.2,vol=.12){
  if(!audioCtx||!masterGain)return;
  const o=audioCtx.createOscillator(),g=audioCtx.createGain(),f=audioCtx.createBiquadFilter();
  o.type="sine"; o.frequency.setValueAtTime(freq,when);
  f.type="lowpass"; f.frequency.value=1300;
  g.gain.setValueAtTime(.0001,when);
  g.gain.exponentialRampToValueAtTime(vol,when+.07);
  g.gain.exponentialRampToValueAtTime(.0001,when+dur);
  o.connect(f); f.connect(g); g.connect(masterGain); o.start(when); o.stop(when+dur+.05);
}

function atmospherePhrase(){
  if(!musicEnabled||!audioCtx)return;
  const scale=[146.83,174.61,196,220,261.63,293.66];
  const now=audioCtx.currentTime+.04;
  const root=scale[Math.floor(rnd()*scale.length)];
  bell(root,now,3.8,.09);
  if(rnd()>.45) bell(root*1.5,now+1.35,2.8,.045);
  if(rnd()>.7) bell(scale[Math.floor(rnd()*scale.length)]*2,now+2.4,2.3,.035);
}
function startMusicLoop(){
  if(musicTimer)return;
  atmospherePhrase();
  musicTimer=setInterval(atmospherePhrase,5200);
}
function stopMusicLoop(){if(musicTimer){clearInterval(musicTimer);musicTimer=null}}
function setMusic(on){
  musicEnabled=on;
  if(musicToggle){musicToggle.setAttribute("aria-pressed",String(on));musicLabel.textContent=on?"Atmosfera ON":"Atmosfera OFF";}
  if(on){ensureAudio();fadeMaster(.055,.7);startMusicLoop()}else{fadeMaster(.0001,.5);stopMusicLoop()}
}
musicToggle?.addEventListener("click",e=>{e.stopPropagation();setMusic(!musicEnabled)});
document.addEventListener("pointerdown",()=>{if(musicEnabled)ensureAudio()},{once:true});

function cardWhisper(){
  if(!audioCtx||!musicEnabled)return;
  const now=audioCtx.currentTime;
  const o=audioCtx.createOscillator(),g=audioCtx.createGain();
  o.type="triangle";o.frequency.setValueAtTime(392,now);o.frequency.exponentialRampToValueAtTime(261.63,now+.36);
  g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.05,now+.025);g.gain.exponentialRampToValueAtTime(.0001,now+.42);
  o.connect(g);g.connect(masterGain);o.start(now);o.stop(now+.45);
}

function morrisTouch(target,d,i){
  return new Promise(resolve=>{
    const from=document.querySelector(".oracle img").getBoundingClientRect();
    const to=target.getBoundingClientRect();
    const ghost=document.createElement("div");
    ghost.className="morris-touch";
    ghost.innerHTML='<img src="'+MORRIS_IMG+'" alt=""><span class="paw">🐾</span>';
    ghost.style.left=(from.left+from.width/2)+"px";
    ghost.style.top=(from.top+from.height/2)+"px";
    document.body.appendChild(ghost);
    oracle.classList.add("morris-active");
    target.classList.add("morris-touched");
    const phrases=[
      "Morris sceglie "+d.card.name+".",
      "Zampa sulla carta: "+d.card.name+".",
      "Questa Morris la vuole guardare bene: "+d.card.name+".",
      "Morris ha deciso. Vediamo "+d.card.name+"."
    ];
    oracleText.textContent=phrases[i%phrases.length];
    cardWhisper();
    const dx=(to.left+to.width/2)-(from.left+from.width/2);
    const dy=(to.top+to.height/2)-(from.top+from.height/2);
    const anim=ghost.animate([
      {transform:"translate(-50%,-50%) scale(.72) rotate(-6deg)",opacity:.15},
      {transform:"translate(calc(-50% + "+(dx*.84)+"px),calc(-50% + "+(dy*.84)+"px)) scale(1.04) rotate(4deg)",opacity:1,offset:.82},
      {transform:"translate(calc(-50% + "+dx+"px),calc(-50% + "+dy+"px)) scale(.72) rotate(0deg)",opacity:.1}
    ],{duration:620,easing:"cubic-bezier(.2,.75,.2,1)"});
    anim.onfinish=()=>{ghost.remove();oracle.classList.remove("morris-active");target.classList.remove("morris-touched");resolve()};
  });
}

function cardScore(d){
  const s=meaning(d).toLowerCase();
  const pos=["crescita","successo","gioia","apertura","accordo","armonia","stabilità","opportunità","recupero","guarigione","vittoria","riconoscimento","chiarezza","libertà","fiducia","avanzamento","soddisfazione","compimento","sostegno","autonomia","generosità","reciprocità"];
  const neg=["paura","dolore","conflitto","perdita","chiusura","rigidità","dipendenza","ansia","rottura","blocco","ritardo","delusione","squilibrio","manipolazione","instabilità","isolamento","stallo","eccesso","aggressività","imprudenza","scarsità"];
  let score=0;pos.forEach(w=>{if(s.includes(w))score++});neg.forEach(w=>{if(s.includes(w))score--});
  return score;
}

function questionIntent(text){
  const s=text.toLowerCase();
  if(/torner|ritorn|ricontatt|rivedr/.test(s))return"ritorno";
  if(/ama|amore|prova|sentiment|interess|attraz/.test(s))return"sentimenti";
  if(/trad|fedele|ment|sincer|nascond/.test(s))return"fiducia";
  if(/devo|conviene|scegli|scelta|decid/.test(s))return"decisione";
  if(/lavor|carriera|client|azienda|profession/.test(s))return"lavoro";
  if(/sold|denar|econom|finanz|guadagn/.test(s))return"risorse";
  if(/succeder|futuro|andrà|andra|evolver|svilupp/.test(s))return"sviluppo";
  return"generale";
}

function findByLabel(...parts){
  return drawn.find(d=>parts.some(p=>d.position.label.toLowerCase().includes(p)));
}

function trendLabel(score){
  if(score>=3)return{label:"apertura netta",text:"la stesa tende verso un'evoluzione favorevole, ma chiede coerenza con ciò che le carte indicano"};
  if(score<=-3)return{label:"forte cautela",text:"la stesa concentra parecchi segnali di attrito, blocco o ridimensionamento"};
  return{label:"quadro condizionato",text:"la stesa non dà un sì o un no pulito: mostra una direzione che dipende da come vengono gestiti i nodi presenti"};
}

function domainLens(t,d){
  const m=meaning(d);
  const map={
    relazioni:"sul piano affettivo",
    lavoro:"sul piano professionale",
    risorse:"sul piano economico e concreto",
    famiglia:"nel contesto familiare",
    "quadro generale":"nel quadro complessivo"
  };
  return (map[t]||"nel quadro complessivo")+" questa carta porta "+m;
}

function buildDeepReading(question){
  const t=topic(question),intent=questionIntent(question);
  const present=findByLabel("presente")||drawn[Math.min(1,drawn.length-1)]||drawn[0];
  const future=findByLabel("futuro","esito")||drawn[drawn.length-1];
  const challenge=findByLabel("sfida")||null;
  const root=findByLabel("radice","passato")||drawn[0];
  const next=findByLabel("prossimo")||future;
  const total=drawn.reduce((a,d)=>a+cardScore(d),0);
  const trend=trendLabel(total);
  const directBase=question
    ?"Alla tua domanda “"+esc(question)+"”, le carte non rispondono in astratto. "
    :"Senza una domanda specifica, la stesa descrive soprattutto la dinamica dominante del momento. ";

  let direct=directBase;
  if(intent==="ritorno") direct+="Sul tema di un ritorno, il punto decisivo è se ciò che ha creato distanza viene davvero modificato, non soltanto riattivato.";
  else if(intent==="sentimenti") direct+="Sul tema dei sentimenti, la stesa distingue ciò che si prova da ciò che si riesce concretamente a esprimere o sostenere.";
  else if(intent==="fiducia") direct+="Sul tema della fiducia, la lettura mette al centro coerenza tra parole, comportamenti e ciò che resta non detto.";
  else if(intent==="decisione") direct+="Qui la domanda è una scelta: le carte mostrano soprattutto quale opzione riduce il conflitto e quale invece lo prolunga.";
  else if(intent==="lavoro") direct+="Sul lavoro, la lettura guarda a margine di azione, ostacoli reali e qualità delle risorse disponibili.";
  else if(intent==="risorse") direct+="Sul denaro, la lettura privilegia segnali concreti di stabilità, rischio, prudenza e gestione.";
  else if(intent==="sviluppo") direct+="Per capire come può evolvere la situazione, pesa soprattutto il passaggio tra ciò che è attivo adesso e la carta di direzione finale.";
  else direct+="Il centro della risposta sta nel rapporto fra la carta che descrive il presente e quella che chiude la stesa.";

  const p1=present
    ?"<strong>"+present.position.label+": "+present.card.name+(present.reversed?" rovesciata":"")+".</strong> "+domainLens(t,present)+"."
    :"";
  const p2=challenge
    ?"<strong>Il nodo è "+challenge.card.name+(challenge.reversed?" rovesciata":"")+".</strong> In posizione di sfida indica "+meaning(challenge)+". Questo è il punto che può falsare o rallentare la risposta alla tua domanda."
    :"<strong>Il passaggio decisivo è tra "+root.card.name+" e "+future.card.name+".</strong> La prima spiega da dove nasce la situazione, la seconda mostra dove tende se non cambia nulla di sostanziale.";
  const p3=future
    ?"<strong>La direzione è "+future.card.name+(future.reversed?" rovesciata":"")+".</strong> In questa posizione significa "+meaning(future)+". Non è una sentenza: è la traiettoria più coerente con le dinamiche attuali."
    :"";
  const p4=next && next!==future
    ?"<strong>Il prossimo movimento concreto è "+next.card.name+".</strong> Qui Morris leggerebbe "+meaning(next)+" come il punto da osservare prima di trarre conclusioni definitive."
    :"";

  let verdict="";
  if(total>=3) verdict="Nel complesso, quindi, la risposta tende più verso un'apertura che verso una chiusura. Ma l'apertura non è automatica: funziona solo se il nodo centrale della stesa viene affrontato davvero.";
  else if(total<=-3) verdict="Nel complesso la stesa invita alla cautela. Non vedo un quadro da forzare o interpretare in modo ottimistico: prima viene il nodo indicato dalle carte, poi l'eventuale evoluzione.";
  else verdict="Nel complesso non c'è un verdetto secco. Il responso è condizionato: alcuni elementi aprono, altri frenano. La domanda trova risposta soprattutto in ciò che accadrà quando il nodo centrale verrà messo alla prova.";

  const evidence=[present,challenge||root,future].filter(Boolean).slice(0,3);
  return{
    trend,
    direct,
    paragraphs:[p1,p2,p3,p4].filter(Boolean),
    verdict,
    evidence
  };
}

// override draw: Morris visibly shuffles before the spread appears
function draw(){
  if(drawBtn.disabled)return;
  if(musicEnabled)ensureAudio();
  drawBtn.disabled=true;
  result.classList.add("hidden");
  spreadArea.classList.add("hidden");
  spreadArea.innerHTML="";
  revealNote.classList.add("hidden");
  deckStage.classList.remove("hidden");
  deckStage.classList.add("shuffling");
  oracle.classList.add("morris-active");
  oracleText.textContent="Morris mescola il mazzo e sceglie le carte...";
  const pool=shuffle([...deck]);
  const nextDraw=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.34,position}));
  setTimeout(()=>{
    drawn=nextDraw;revealed=new Set();
    deckStage.classList.remove("shuffling");
    oracle.classList.remove("morris-active");
    renderSpread();
    drawBtn.textContent="Mescola ancora";
    drawBtn.disabled=false;
    oracleText.textContent="Adesso Morris le apre una alla volta.";
  },920);
}

// override spread: Morris touches each chosen card before it turns
function renderSpread(){
  deckStage.classList.add("hidden");
  spreadArea.className="spread-area "+currentSpread;
  spreadArea.innerHTML="";
  revealNote.classList.remove("hidden");
  result.classList.add("hidden");
  drawn.forEach((d,i)=>{
    const slot=document.createElement("div");
    slot.className="card-slot";
    slot.innerHTML='<span class="position-label">'+d.position.label+'</span><button class="tarot-card" type="button" aria-label="Rivela '+d.position.label+'"><span class="card-inner"><span class="card-back"><b>✦</b><i>☾</i><small>MORRIS</small></span><span class="card-front '+(d.reversed?"reversed":"")+'"><em>'+d.card.arcana+'</em><b class="mark">'+mark(d.card)+'</b><strong>'+d.card.name+'</strong><small>'+(d.reversed?"Rovesciata":"Dritta")+'</small></span></span></button>';
    const btn=slot.querySelector("button");
    btn.addEventListener("click",async()=>{
      if(revealed.has(i)||btn.dataset.busy)return;
      btn.dataset.busy="1";
      await morrisTouch(btn,d,i);
      revealed.add(i);
      btn.classList.add("revealed");
      delete btn.dataset.busy;
      oracleText.textContent=d.card.name+(d.reversed?" rovesciata":" dritta")+": "+meaning(d)+".";
      if(revealed.size===drawn.length){
        revealNote.classList.add("hidden");
        setTimeout(()=>{oracleText.textContent="Ora Morris mette insieme la risposta alla tua domanda.";renderResult()},650);
      }
    });
    spreadArea.appendChild(slot);
  });
}

// override final reading: long, question-specific synthesis
function renderResult(){
  const notes=synthesis(),question=q.value.trim(),deep=buildDeepReading(question);
  result.classList.remove("hidden");
  const evidence=deep.evidence.map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>'+(question?'“'+esc(question)+'”':'Il quadro che emerge')+'</h3></div><p>Ambito rilevato: <strong>'+topic(question)+'</strong></p></div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p><strong>In questa posizione:</strong> '+d.position.focus+'. La carta porta '+meaning(d)+'.</p></article>').join("")+'</div>'+
    '<div class="deep-answer"><span>Responso finale</span><h4>'+deep.trend.label+'</h4><p>'+deep.direct+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    deep.paragraphs.map(p=>'<p>'+p+'</p>').join("")+
    (notes.length?'<p><strong>Incrocio delle carte:</strong> '+notes.join(" ")+'</p>':'')+
    '<p class="verdict"><strong>In sintesi:</strong> '+deep.verdict+'</p></div>'+
    '<div class="synthesis"><img src="'+MORRIS_IMG+'" alt=""><div><span>Morris mette insieme le carte</span><p>Questa lettura è costruita sulla tua domanda, sulle posizioni della stesa e sui rapporti fra le carte. Non è una frase pescata da un elenco.</p><p class="final">Usala come lettura simbolica della situazione, non come certezza fattuale sul futuro.</p></div></div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}



// ===== MORRIS CARTOMANTE V3: specific answers, audible score, visible actor =====
const volumeSliderV3=document.querySelector("#volumeSlider");
const morrisActor=document.querySelector("#morrisActor");
const actorSpeech=morrisActor?.querySelector(".actor-speech");

function volumeTargetV3(){
  const v=volumeSliderV3?Number(volumeSliderV3.value)/100:.62;
  return Math.max(.12,Math.min(.62,.12+v*.55));
}
function ensureAudio(){
  if(!audioCtx){
    audioCtx=new (window.AudioContext||window.webkitAudioContext)();
    masterGain=audioCtx.createGain();
    masterGain.gain.value=.0001;
    masterGain.connect(audioCtx.destination);
  }
  if(audioCtx.state==="suspended") audioCtx.resume();
  if(!droneStarted) startDrone();
  if(musicEnabled&&!musicTimer) startMusicLoop();
  if(musicEnabled) fadeMaster(volumeTargetV3(),.35);
}
function startDrone(){
  droneStarted=true;
  const bus=audioCtx.createGain(); bus.gain.value=.20; bus.connect(masterGain);
  const filter=audioCtx.createBiquadFilter();filter.type="lowpass";filter.frequency.value=520;filter.Q.value=.8;filter.connect(bus);
  [[73.42,"sine",.38],[110,"triangle",.18],[146.83,"sine",.08]].forEach(([freq,type,gain])=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(filter);o.start();
  });
  const seconds=2,buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*seconds,audioCtx.sampleRate),data=buffer.getChannelData(0);
  let last=0;
  for(let i=0;i<data.length;i++){const white=Math.random()*2-1;last=(last+.02*white)/1.02;data[i]=last*2.6}
  const noise=audioCtx.createBufferSource(),ng=audioCtx.createGain(),nf=audioCtx.createBiquadFilter();
  noise.buffer=buffer;noise.loop=true;ng.gain.value=.035;nf.type="lowpass";nf.frequency.value=900;
  noise.connect(nf);nf.connect(ng);ng.connect(bus);noise.start();
  fadeMaster(musicEnabled?volumeTargetV3():.0001,.7);
}
function setMusic(on){
  musicEnabled=on;
  musicToggle?.setAttribute("aria-pressed",String(on));
  if(musicLabel)musicLabel.textContent=on?"Musica ON":"Musica OFF";
  if(on){ensureAudio();fadeMaster(volumeTargetV3(),.25);startMusicLoop();atmospherePhrase()}
  else{fadeMaster(.0001,.3);stopMusicLoop()}
}
volumeSliderV3?.addEventListener("input",()=>{if(musicEnabled){ensureAudio();fadeMaster(volumeTargetV3(),.12)}});

function actorSayV3(text,hold=950){
  if(!morrisActor||!actorSpeech)return;
  actorSpeech.textContent=text;
  morrisActor.classList.add("talking");
  clearTimeout(actorSayV3.t);
  actorSayV3.t=setTimeout(()=>morrisActor.classList.remove("talking"),hold);
}
function actorIdleV3(){
  if(!morrisActor)return;
  morrisActor.style.transform="";
  morrisActor.classList.remove("shuffle","choose");
  morrisActor.classList.add("idle");
}
function actorShuffleV3(){
  if(!morrisActor)return;
  morrisActor.classList.remove("idle","choose");
  morrisActor.classList.add("shuffle","talking");
  actorSayV3("Mescolo io.",1100);
}
function morrisTouch(target,d,i){
  return new Promise(resolve=>{
    if(!morrisActor){resolve();return}
    const table=document.querySelector(".table");
    morrisActor.classList.remove("idle","shuffle");
    morrisActor.classList.add("choose","talking");
    const a=morrisActor.getBoundingClientRect(),t=target.getBoundingClientRect(),box=table.getBoundingClientRect();
    let dx=(t.left+t.width/2)-(a.left+a.width/2);
    let dy=(t.top+t.height*.48)-(a.top+a.height/2);
    dx=Math.max(-box.width+130,Math.min(20,dx));
    dy=Math.max(-30,Math.min(box.height-150,dy));
    actorSayV3(i===0?"Questa apre la stesa.":i===drawn.length-1?"Questa chiude il quadro.":"Vediamo questa.",1050);
    morrisActor.style.transform="translate("+dx+"px,"+dy+"px) scale(.88) rotate(-5deg)";
    target.classList.add("morris-touched");
    cardWhisper();
    setTimeout(()=>{
      morrisActor.style.transform="translate("+dx+"px,"+dy+"px) scale(.84) rotate(4deg)";
    },360);
    setTimeout(()=>{
      target.classList.remove("morris-touched");
      morrisActor.style.transform="";
      morrisActor.classList.remove("choose");
      morrisActor.classList.add("idle");
      resolve();
    },760);
  });
}

const positiveIdsV3=new Set(["mago","imperatrice","carro","forza","temperanza","stella","sole","giudizio","mondo"]);
const difficultIdsV3=new Set(["diavolo","torre"]);
function cardScoreV3(d){
  let s=cardScore(d);
  if(d.card.arcana==="Maggiore"){
    if(positiveIdsV3.has(d.card.id))s+=d.reversed?0:1.4;
    if(difficultIdsV3.has(d.card.id))s+=d.reversed?.2:-1.4;
    if(d.card.id==="luna")s-=d.reversed?.2:.8;
    if(d.card.id==="morte")s+=d.reversed?-.6:.1;
  }
  const label=d.position.label.toLowerCase();
  let w=1;
  if(/futuro|esito|possibile/.test(label))w=2.25;
  else if(/presente/.test(label))w=1.55;
  else if(/prossimo/.test(label))w=1.8;
  else if(/sfida/.test(label))w=.8;
  return s*w;
}
function analyseQuestionV3(text){
  const raw=text.trim(),low=raw.toLowerCase();
  let intent="generale";
  if(/torner|ritorn|ritorno|rientrer|riavvicin/.test(low))intent="ritorno";
  else if(/scriver|messagg|contatt|chiamer|cercher/.test(low))intent="contatto";
  else if(/mi ama|ama me|prova per me|cosa prova|sentiment|innamorat|attraz/.test(low))intent="sentimenti";
  else if(/tradisc|tradiment|fedele|mentendo|mente |nasconde|sincer/.test(low))intent="fiducia";
  else if(/lascer|separ|staremo insieme|futuro.*relaz|relaz.*futuro|coppia.*futuro/.test(low))intent="relazione";
  else if(/lavor|carriera|cliente|azienda|assunt|contratto|profession/.test(low))intent="lavoro";
  else if(/sold|denar|econom|finanz|guadagn|entrate|spese/.test(low))intent="risorse";
  else if(/devo|dovrei|conviene|scegl|decision|faccio bene/.test(low))intent="decisione";
  else if(/quando|quanto tempo|entro quando/.test(low))intent="tempo";
  else if(/succeder|evolver|svilupp|andrà|andra|futuro/.test(low))intent="sviluppo";

  const stop=new Set(["Come","Cosa","Quando","Perché","Perche","Secondo","Vorrei","Voglio","Dimmi","Morris","Tarocchi","Carta","Carte","Sarà","Sara","Potrà","Potra","Devo","Dovrei"]);
  const names=(raw.match(/\b[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,}\b/g)||[]).filter(x=>!stop.has(x));
  const subject=names[0]||(/\blui\b|\blo\b|\bsuo\b/.test(low)?"lui":(/\blei\b|\bla\b|\bsua\b/.test(low)?"lei":"la situazione"));
  return{raw,low,intent,subject,domain:topic(raw)};
}
function directionV3(){
  const total=drawn.reduce((sum,d)=>sum+cardScoreV3(d),0);
  const max=Math.max(4,drawn.length*2.1);
  const norm=Math.max(-1,Math.min(1,total/max));
  return{total,norm,band:norm>.24?"apertura":norm<-.24?"chiusura":"incerto"};
}
function coreCardsV3(){
  const final=findByLabel("futuro","esito","possibile")||drawn[drawn.length-1];
  const present=findByLabel("presente")||drawn[Math.min(1,drawn.length-1)]||drawn[0];
  const obstacle=findByLabel("sfida")||null;
  return{present,obstacle,final};
}
function contextualMeaningV3(d,a){
  const who=a.subject==="la situazione"?"questa situazione":a.subject;
  const pos=d.position.label.toLowerCase();
  let lead="";
  if(/passato|radice/.test(pos))lead="Spiega da dove nasce il tema che hai chiesto";
  else if(/presente/.test(pos))lead="Descrive ciò che è attivo adesso rispetto alla tua domanda";
  else if(/sfida/.test(pos))lead="Mostra che cosa ostacola o complica la risposta";
  else if(/futuro|esito|possibile/.test(pos))lead="Mostra la direzione verso cui tende "+who;
  else if(/prossimo/.test(pos))lead="Mostra il prossimo passaggio concreto";
  else lead="Aggiunge un tassello specifico alla tua domanda";
  return lead+": "+meaning(d)+".";
}
function directAnswerV3(a,dir,c){
  const who=a.subject==="la situazione"?"questa situazione":a.subject;
  const end=c.final?c.final.card.name+(c.final.reversed?" rovesciata":" dritta"):"la carta finale";
  const now=c.present?c.present.card.name+(c.present.reversed?" rovesciata":" dritta"):"la carta del presente";
  const yes=dir.band==="apertura",no=dir.band==="chiusura";
  if(a.intent==="ritorno"){
    if(yes)return"Se mi chiedi se "+who+" tornerà o si riavvicinerà, la stesa <strong>tende al sì</strong>, ma non a un ritorno identico a prima. "+now+" descrive il punto attuale, mentre "+end+" spinge verso una riapertura.";
    if(no)return"Se mi chiedi se "+who+" tornerà, la stesa <strong>non mostra al momento un ritorno stabile</strong>. "+end+" pesa più delle carte di apertura e indica che, nelle condizioni attuali, il riavvicinamento resta difficile.";
    return"Se mi chiedi se "+who+" tornerà, la risposta è <strong>condizionata</strong>: c'è un margine di riapertura, ma non abbastanza netto da parlare di ritorno certo. Il passaggio fra "+now+" e "+end+" è il punto decisivo.";
  }
  if(a.intent==="contatto"){
    if(yes)return"Alla domanda se "+who+" ti cercherà o ti contatterà, la stesa <strong>favorisce un contatto</strong>. Non significa necessariamente riconciliazione: "+end+" descrive soprattutto l'esito del movimento.";
    if(no)return"Alla domanda se "+who+" ti contatterà, la stesa <strong>non dà un segnale forte di iniziativa</strong>. "+end+" tende più a trattenere o allontanare il movimento che a riaprirlo.";
    return"Alla domanda se "+who+" ti contatterà, le carte mostrano <strong>possibilità ma poca linearità</strong>: il contatto può esserci, ma dipende da un nodo ancora irrisolto.";
  }
  if(a.intent==="sentimenti"){
    if(yes)return"Se la domanda è ciò che "+who+" prova per te, la stesa mostra <strong>coinvolgimento o apertura emotiva reale</strong>, anche se va distinto da ciò che questa persona riesce poi a fare concretamente. "+end+" è la carta che pesa di più sulla direzione.";
    if(no)return"Se la domanda è ciò che "+who+" prova per te, la stesa mostra <strong>sentimenti bloccati, insufficienti o difficili da esprimere</strong> più che un'apertura limpida. "+end+" rafforza questa cautela.";
    return"Se la domanda è ciò che "+who+" prova per te, le carte mostrano <strong>ambivalenza</strong>: qualcosa c'è, ma non emerge come sentimento semplice, libero e lineare.";
  }
  if(a.intent==="fiducia"){
    return"Le carte <strong>non possono verificare un tradimento o una bugia come fatto</strong>. Simbolicamente, però, la stesa "+(yes?"mostra più apertura e possibilità di chiarimento":"segnala opacità, tensione o elementi da verificare con i fatti")+". "+end+" è la carta più importante per capire il tono finale.";
  }
  if(a.intent==="relazione"){
    if(yes)return"Rispetto al futuro della relazione con "+who+", la stesa mostra <strong>possibilità di continuità o miglioramento</strong>, ma non senza cambiare il nodo che emerge nel presente.";
    if(no)return"Rispetto al futuro della relazione con "+who+", la stesa mostra <strong>una fase di chiusura, distanza o forte ridimensionamento</strong> se le dinamiche restano quelle attuali.";
    return"Rispetto al futuro della relazione con "+who+", la stesa descrive <strong>un equilibrio instabile</strong>: non è una chiusura netta, ma nemmeno una conferma piena.";
  }
  if(a.intent==="lavoro"){
    return"Alla tua domanda sul lavoro, la stesa indica <strong>"+(yes?"margine di sviluppo e possibilità concrete":no?"ostacoli o ridimensionamento da non ignorare":"un risultato possibile ma ancora dipendente da condizioni pratiche")+"</strong>. "+end+" descrive meglio di tutte dove porta il quadro attuale.";
  }
  if(a.intent==="risorse"){
    return"Alla domanda economica, le carte mostrano <strong>"+(yes?"una tendenza a stabilizzazione o crescita":no?"prudenza, ritardo o pressione sulle risorse":"un quadro misto che richiede gestione e verifica")+"</strong>. Qui il valore della stesa è soprattutto capire dove stai assumendo o riducendo rischio.";
  }
  if(a.intent==="decisione"){
    return"Alla domanda se conviene fare questa scelta, la stesa <strong>"+(yes?"la sostiene più di quanto la ostacoli":no?"invita a non forzarla nelle condizioni attuali":"non la boccia, ma chiede prima di sciogliere il nodo centrale")+"</strong>. "+now+" spiega il punto di partenza e "+end+" il costo o beneficio della direzione.";
  }
  if(a.intent==="tempo"){
    return"Se stai chiedendo <strong>quando</strong>, il mazzo non dà una data affidabile. Può però mostrare se il movimento è vicino o rallentato: in questa stesa "+(yes?"la dinamica è relativamente mobile":"la dinamica appare lenta o trattenuta")+", e "+end+" è il segnale principale.";
  }
  if(a.intent==="sviluppo"){
    return"Alla domanda su come evolverà la situazione, la stesa tende verso <strong>"+(yes?"un'apertura o un avanzamento":no?"una chiusura o un rallentamento":"un esito ancora aperto e condizionato")+"</strong>. Il passaggio da "+now+" a "+end+" racconta la traiettoria.";
  }
  return"Rispetto esattamente alla domanda “"+esc(a.raw)+"”, Morris leggerebbe la stesa come <strong>"+(yes?"più favorevole che contraria":no?"più frenata che favorevole":"non ancora risolta")+"</strong>. La risposta nasce soprattutto dal rapporto fra "+now+" e "+end+".";
}
function whyV3(a,c){
  const bits=[];
  if(c.present)bits.push("<strong>"+c.present.position.label+" · "+c.present.card.name+"</strong>: "+contextualMeaningV3(c.present,a));
  if(c.obstacle)bits.push("<strong>"+c.obstacle.position.label+" · "+c.obstacle.card.name+"</strong>: "+contextualMeaningV3(c.obstacle,a));
  if(c.final&&c.final!==c.present)bits.push("<strong>"+c.final.position.label+" · "+c.final.card.name+"</strong>: "+contextualMeaningV3(c.final,a));
  return bits;
}

function draw(){
  const question=q.value.trim();
  if(!question){
    q.focus(); q.style.boxShadow="0 0 0 3px #c77d8755";
    setTimeout(()=>q.style.boxShadow="",700);
    oracleText.textContent="Prima scrivi una domanda precisa. Altrimenti Morris non sa a cosa rispondere.";
    actorSayV3("Prima la domanda.",1200);
    return;
  }
  if(drawBtn.disabled)return;
  ensureAudio();
  atmospherePhrase();
  drawBtn.disabled=true;
  result.classList.add("hidden");
  spreadArea.classList.add("hidden");spreadArea.innerHTML="";revealNote.classList.add("hidden");
  deckStage.classList.remove("hidden");deckStage.classList.add("shuffling");
  actorShuffleV3();
  oracleText.textContent="Morris legge la domanda e mescola il mazzo...";
  const pool=shuffle([...deck]);
  const nextDraw=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.34,position}));
  setTimeout(()=>{
    drawn=nextDraw;revealed=new Set();deckStage.classList.remove("shuffling");
    renderSpread();drawBtn.textContent="Mescola ancora";drawBtn.disabled=false;actorIdleV3();
    oracleText.textContent="Le carte sono scelte. Morris le apre una per volta.";
  },1250);
}

function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV3(question),dir=directionV3(),c=coreCardsV3(),notes=synthesis(),why=whyV3(a,c);
  result.classList.remove("hidden");
  const evidence=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i).map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+a.intent+'</strong></p></div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p><strong>Rispetto alla tua domanda:</strong> '+contextualMeaningV3(d,a)+'</p></article>').join("")+'</div>'+
    '<div class="deep-answer"><span>Risposta alla tua domanda</span><h4>'+(dir.band==="apertura"?"Tendenza favorevole":dir.band==="chiusura"?"Tendenza di chiusura o cautela":"Risposta condizionata")+'</h4>'+
    '<p class="answer-direct">'+directAnswerV3(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+why.map(p=>'<p>'+p+'</p>').join("")+'</div>'+
    (notes.length?'<p><strong>Come si combinano:</strong> '+notes.join(" ")+'</p>':'')+
    '<p class="verdict"><strong>Conclusione di Morris:</strong> questa non è una frase generica sul futuro. È la lettura simbolica di queste carte rispetto alla domanda che hai scritto. Se cambi domanda, cambia anche il criterio con cui vengono interpretate.</p></div>'+
    '<div class="synthesis"><img src="'+MORRIS_IMG+'" alt=""><div><span>Morris</span><p>'+directAnswerV3(a,dir,c)+'</p><p class="final">Le carte mostrano tendenze e dinamiche, non prove o certezze fattuali.</p></div></div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Questa è la mia risposta.",1500);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
actorIdleV3();



// ===== MORRIS CARTOMANTE V4: direct question answering + louder atmosphere =====
if(volumeSliderV3) volumeSliderV3.value="88";

function volumeTargetV3(){
  const v=volumeSliderV3?Number(volumeSliderV3.value)/100:.88;
  return Math.max(.28,Math.min(.92,.24+v*.78));
}
function startDrone(){
  droneStarted=true;
  const bus=audioCtx.createGain(); bus.gain.value=.42; bus.connect(masterGain);
  const filter=audioCtx.createBiquadFilter();filter.type="lowpass";filter.frequency.value=760;filter.Q.value=.7;filter.connect(bus);
  [[73.42,"sine",.44],[110,"triangle",.22],[146.83,"sine",.12],[220,"sine",.045]].forEach(([freq,type,gain])=>{
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();
    o.type=type;o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(filter);o.start();
  });
  const seconds=2,buffer=audioCtx.createBuffer(1,audioCtx.sampleRate*seconds,audioCtx.sampleRate),data=buffer.getChannelData(0);
  let last=0;
  for(let i=0;i<data.length;i++){const white=Math.random()*2-1;last=(last+.018*white)/1.018;data[i]=last*2.1}
  const noise=audioCtx.createBufferSource(),ng=audioCtx.createGain(),nf=audioCtx.createBiquadFilter();
  noise.buffer=buffer;noise.loop=true;ng.gain.value=.06;nf.type="lowpass";nf.frequency.value=1200;
  noise.connect(nf);nf.connect(ng);ng.connect(bus);noise.start();
  fadeMaster(musicEnabled?volumeTargetV3():.0001,.45);
  setTimeout(()=>atmospherePhrase(),180);
}
function atmospherePhrase(){
  if(!musicEnabled||!audioCtx)return;
  const now=audioCtx.currentTime+.03;
  const seq=[146.83,174.61,196,220,261.63,293.66];
  const base=seq[Math.floor(rnd()*seq.length)];
  bell(base,now,3.9,.18);
  bell(base*1.5,now+.9,3.1,.10);
  if(rnd()>.35) bell(seq[Math.floor(rnd()*seq.length)]*2,now+2.05,2.2,.075);
}

function normalizeV4(s){return (s||"").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}
function extractSubjectV4(raw){
  const s=raw.trim();
  const patterns=[
    /(?:se|quando|perche|perché|cosa prova|cosa sente|mi ama|mi cerchera|mi cercherà|tornera|tornerà|ritornera|ritornerà)\s+([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,})/i,
    /\b([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,})\s+(?:mi ama|mi vuole|tornera|tornerà|mi cerchera|mi cercherà|prova|sente|pensa)/,
    /(?:con|tra me e|io e)\s+([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,})/i,
    /\b(mio figlio|mia figlia|mio marito|mia moglie|il mio compagno|la mia compagna|il mio ex|la mia ex)\b/i
  ];
  for(const p of patterns){const m=s.match(p);if(m)return m[1]}
  const caps=(s.match(/\b[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,}\b/g)||[]).filter(x=>!["Morris","Come","Cosa","Quando","Perché","Perche","Secondo","Dimmi","Vorrei","Voglio"].includes(x));
  return caps[0]||"la situazione";
}
function intentV4(raw){
  const s=normalizeV4(raw);
  if(/mi ama|ama me|innamorat|cosa prova|cosa sente|sentiment|attraz|gli piaccio|le piaccio/.test(s))return"sentimenti";
  if(/torner|ritorner|riavvicin|tornare insieme/.test(s))return"ritorno";
  if(/mi scriver|mi chiam|mi contatt|mi cercher|si fara sentire|si fara vivo/.test(s))return"contatto";
  if(/tradisc|tradiment|fedele|mentendo|mi mente|nasconde|sincer/.test(s))return"fiducia";
  if(/staremo insieme|relazione|rapporto|coppia|lascer|separ|futuro con/.test(s))return"relazione";
  if(/lavor|carriera|cliente|contratto|assunt|posto|occupaz|profession|progetto/.test(s))return"lavoro";
  if(/sold|denar|econom|finanz|guadagn|incass|entrate|spese|pagamento/.test(s))return"risorse";
  if(/salute|malatt|guarir|medic|diagnos|sintom/.test(s))return"salute";
  if(/devo|dovrei|conviene|scelta|scegli|decision|faccio bene|vale la pena/.test(s))return"decisione";
  if(/quando|quanto tempo|entro quando/.test(s))return"tempo";
  if(/succeder|evolver|svilupp|andra|futuro|come finira/.test(s))return"sviluppo";
  return"generale";
}
function keywordsV4(raw){
  const stop=new Set(["come","cosa","quando","perche","perché","secondo","dimmi","vorrei","voglio","sapere","sara","sarà","sono","sei","sia","che","con","per","una","uno","del","della","delle","degli","dei","il","lo","la","i","gli","le","mi","ti","si","ci","me","te","lui","lei","mio","mia","miei","mie","suo","sua","suoi","sue","questo","questa","quello","quella","davvero","ancora","poi"]);
  return normalizeV4(raw).replace(/[^a-z0-9à-ÿ\s]/g," ").split(/\s+/).filter(w=>w.length>3&&!stop.has(w)).slice(0,6);
}
function analyseQuestionV4(raw){
  return{raw:raw.trim(),norm:normalizeV4(raw),intent:intentV4(raw),subject:extractSubjectV4(raw),domain:topic(raw),keywords:keywordsV4(raw)}
}
function suitToneV4(){
  const counts={Coppe:0,Spade:0,Bastoni:0,Denari:0};
  drawn.forEach(d=>{if(d.card.suit)counts[d.card.suit]++});
  return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0];
}
function emotionalNuanceV4(){
  const suit=suitToneV4();
  if(suit==="Coppe")return"la componente emotiva è forte: qui contano legame, sensibilità e ciò che viene sentito";
  if(suit==="Spade")return"la componente mentale è dominante: pensieri, dubbi, parole e decisioni pesano più dell'istinto";
  if(suit==="Bastoni")return"la componente impulsiva è dominante: attrazione, iniziativa e desiderio di muoversi sono centrali";
  return"la componente concreta è dominante: contano stabilità, gesti reali, tempi e affidabilità";
}
function directionV4(){
  const raw=drawn.reduce((sum,d)=>sum+cardScoreV3(d),0);
  const denom=Math.max(2.5,drawn.length*1.6);
  const norm=Math.max(-1,Math.min(1,raw/denom));
  return{raw,norm,band:norm>.18?"apertura":norm<-.18?"chiusura":"incerto",strength:Math.abs(norm)>.48?"netta":"moderata"};
}
function exactAnswerV4(a,dir,c){
  const s=a.subject==="la situazione"?"questa situazione":a.subject;
  const finalName=c.final?c.final.card.name+(c.final.reversed?" rovesciata":""):"la carta finale";
  const presentName=c.present?c.present.card.name+(c.present.reversed?" rovesciata":""):"la carta del presente";
  const yes=dir.band==="apertura", no=dir.band==="chiusura";
  const hedge=dir.strength==="netta"?"in modo abbastanza netto":"con qualche condizione";
  switch(a.intent){
    case"sentimenti":
      if(yes)return"<strong>Sì, le carte mostrano un coinvolgimento reale di "+s+" verso di te</strong>, "+hedge+". "+emotionalNuanceV4()+". "+presentName+" descrive ciò che è vivo adesso; "+finalName+" mostra come quel sentimento tende a svilupparsi.";
      if(no)return"<strong>Le carte non mostrano un sentimento libero e pienamente disponibile da parte di "+s+"</strong>. C'è più blocco, distanza o conflitto che apertura lineare. "+finalName+" pesa molto su questa conclusione.";
      return"<strong>Le carte mostrano sentimenti ambivalenti da parte di "+s+"</strong>: qualcosa c'è, ma non emerge come semplice, stabile e completamente espresso. "+presentName+" e "+finalName+" vanno in direzioni diverse.";
    case"ritorno":
      if(yes)return"<strong>La stesa tende al ritorno o al riavvicinamento di "+s+"</strong>, "+hedge+". Non leggo però un semplice ritorno al passato: "+finalName+" indica che qualcosa nel modo di stare in rapporto deve cambiare.";
      if(no)return"<strong>La stesa non indica, nelle condizioni attuali, un ritorno stabile di "+s+"</strong>. Può esserci un ripensamento o un movimento, ma "+finalName+" non sostiene una vera ripresa.";
      return"<strong>Il ritorno di "+s+" è possibile ma non ancora deciso dalle dinamiche attuali</strong>. La stesa mostra apertura e freno insieme: il nodo fra "+presentName+" e "+finalName+" deve prima sciogliersi.";
    case"contatto":
      if(yes)return"<strong>Le carte favoriscono un contatto da parte di "+s+"</strong>. La lettura, però, distingue il gesto del cercarti dalla qualità di ciò che viene dopo: "+finalName+" dice se il contatto può avere seguito.";
      if(no)return"<strong>Non vedo un'iniziativa forte o vicina da parte di "+s+"</strong>. La tendenza è più di esitazione, distanza o rinvio che di contatto concreto.";
      return"<strong>Un contatto di "+s+" è possibile, ma non lineare</strong>: la stesa mostra esitazione o condizioni non ancora mature.";
    case"fiducia":
      return"<strong>Le carte non possono accertare se "+s+" mente, tradisce o nasconde un fatto.</strong> Simbolicamente, però, "+(yes?"il quadro è più trasparente e orientato al chiarimento":"il quadro contiene opacità, tensione o incoerenze che meritano verifica nei comportamenti reali")+". "+finalName+" è il segnale più importante.";
    case"relazione":
      if(yes)return"<strong>La relazione con "+s+" ha una tendenza di continuità o miglioramento</strong>, "+hedge+". "+presentName+" fotografa il presente, mentre "+finalName+" mostra una direzione più costruttiva.";
      if(no)return"<strong>La relazione con "+s+" tende a distanza, ridimensionamento o chiusura se nulla cambia</strong>. "+finalName+" non sostiene una continuità serena nelle condizioni attuali.";
      return"<strong>La relazione con "+s+" è in una fase sospesa</strong>: non vedo né una chiusura netta né una conferma piena. Il punto decisivo è ciò che separa "+presentName+" da "+finalName+".";
    case"lavoro":
      if(yes)return"<strong>Rispetto alla tua domanda sul lavoro, la stesa è favorevole</strong>: mostra margine di sviluppo, risultato o opportunità concreta. "+finalName+" è la carta che porta più peso sull'esito.";
      if(no)return"<strong>Rispetto alla tua domanda sul lavoro, la stesa invita alla cautela</strong>: vedo ostacoli, rallentamenti o condizioni non ancora solide. "+finalName+" spiega perché.";
      return"<strong>Sul lavoro la risposta è condizionata</strong>: c'è potenziale, ma non abbastanza per considerare il risultato già acquisito. "+presentName+" e "+finalName+" mostrano cosa deve cambiare.";
    case"risorse":
      if(yes)return"<strong>Sul piano economico la stesa tende a stabilizzazione o miglioramento</strong>, purché resti attenzione alla gestione concreta. "+finalName+" sostiene questa direzione.";
      if(no)return"<strong>Sul piano economico la stesa chiede prudenza</strong>: segnala ritardi, pressione o rischio di dispersione delle risorse. "+finalName+" è il punto più critico.";
      return"<strong>Sul piano economico il quadro è misto</strong>: non vedo né forte crescita né allarme netto, ma una fase da gestire con precisione.";
    case"salute":
      return"<strong>Questa stesa non può dire se hai una malattia, se guarirai o sostituire un parere medico.</strong> Sul piano simbolico, le carte descrivono "+(yes?"recupero, energia e riequilibrio":"stress, rallentamento o bisogno di attenzione")+". Per sintomi o diagnosi conta la valutazione sanitaria reale.";
    case"decisione":
      if(yes)return"<strong>La stesa sostiene più il fare questa scelta che il rinunciarvi</strong>, "+hedge+". "+finalName+" mostra il beneficio potenziale della direzione.";
      if(no)return"<strong>La stesa sconsiglia di forzare questa scelta nelle condizioni attuali</strong>. "+finalName+" indica un costo, un blocco o una conseguenza che merita più attenzione.";
      return"<strong>La stesa non dà un sì pieno alla scelta</strong>: la rende possibile, ma solo dopo aver chiarito il nodo mostrato dal presente.";
    case"tempo":
      return"<strong>Le carte non danno una data affidabile.</strong> Possono però mostrare il ritmo: in questa stesa il movimento appare "+(yes?"piuttosto attivo e vicino":"lento, trattenuto o soggetto a rinvio")+". "+finalName+" è il principale indicatore del ritmo.";
    case"sviluppo":
      if(yes)return"<strong>La situazione tende a evolvere in senso favorevole</strong>, "+hedge+". "+presentName+" mostra da dove parte; "+finalName+" dove tende.";
      if(no)return"<strong>La situazione tende a rallentare, chiudersi o complicarsi se le dinamiche restano invariate</strong>. "+finalName+" è il segnale principale di questa direzione.";
      return"<strong>L'evoluzione resta aperta e condizionata</strong>: la stesa non conferma ancora un esito unico. Il passaggio fra "+presentName+" e "+finalName+" è decisivo.";
    default:
      return"<strong>Alla domanda “"+esc(a.raw)+"” la stesa risponde in modo "+(yes?"prevalentemente favorevole":no?"prevalentemente contrario o prudente":"condizionato")+"</strong>. I punti della domanda che pesano di più sono: "+(a.keywords.length?a.keywords.join(", "):"la dinamica centrale")+".";
  }
}
function cardToQuestionV4(d,a){
  const pos=d.position.label.toLowerCase(),m=meaning(d),subject=a.subject==="la situazione"?"la situazione":a.subject;
  let role="aggiunge un elemento alla risposta";
  if(/passato|radice/.test(pos))role="spiega cosa ha creato il problema o la possibilità che stai chiedendo";
  else if(/presente/.test(pos))role="descrive ciò che è realmente attivo adesso nella tua domanda";
  else if(/sfida/.test(pos))role="indica l'ostacolo specifico che può cambiare la risposta";
  else if(/futuro|esito|possibile/.test(pos))role="mostra dove tende "+subject+" rispetto a ciò che hai chiesto";
  else if(/prossimo/.test(pos))role="indica il prossimo movimento concreto";
  return role+": <strong>"+m+"</strong>.";
}
function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question),dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");
  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+cardToQuestionV4(d,a)+'</p>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda interpretata come: <strong>'+a.intent+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>'+(dir.band==="apertura"?"Apertura":dir.band==="chiusura"?"Cautela o chiusura":"Esito condizionato")+'</h4>'+
    '<p class="answer-direct">'+exactAnswerV4(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '<p class="verdict"><strong>Conclusione:</strong> la risposta qui sopra è riferita alla domanda che hai scritto. Le carte vengono lette nel ruolo che hanno dentro quella domanda, non come definizioni generiche isolate.</p></div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+cardToQuestionV4(d,a)+'</p></article>').join("")+'</div>'+
    '<div class="synthesis"><img src="'+MORRIS_IMG+'" alt=""><div><span>Morris</span><p>'+exactAnswerV4(a,dir,c)+'</p><p class="final">È una lettura simbolica della domanda, non una certezza fattuale sul futuro.</p></div></div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Adesso ti rispondo alla domanda.",1600);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
