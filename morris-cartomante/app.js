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
