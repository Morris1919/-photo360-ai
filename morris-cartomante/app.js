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
function draw(){const pool=shuffle([...deck]);drawn=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.5,position}));revealed=new Set();renderSpread();drawBtn.textContent="Mescola ancora";oracleText.textContent="Una alla volta. Non correre davanti alle carte."}
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
  const nextDraw=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.5,position}));
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
  const nextDraw=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.5,position}));
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



// ===== MORRIS CARTOMANTE V5: exact subject extraction + multi-part questions =====
if(volumeSliderV3) volumeSliderV3.value="95";

function volumeTargetV3(){
  const v=volumeSliderV3?Number(volumeSliderV3.value)/100:.95;
  return Math.max(.45,Math.min(1,.34+v*.72));
}

function extractSubjectV4(raw){
  const s=raw.trim();
  const ordered=[
    /\b([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,})\s+(?:mi\s+ama|mi\s+vuole|mi\s+cercherà|mi\s+cerchera|mi\s+scriverà|mi\s+scrivera|mi\s+contatterà|mi\s+contattera|tornerà|tornera|ritornerà|ritornera|prova|sente|pensa|vede\s+un\s+futuro)/,
    /(?:con|tra\s+me\s+e|io\s+e)\s+([A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,})/i,
    /\b(mio figlio|mia figlia|mio marito|mia moglie|il mio compagno|la mia compagna|il mio ex|la mia ex)\b/i
  ];
  for(const p of ordered){const m=s.match(p);if(m)return m[1]}
  const caps=(s.match(/\b[A-ZÀ-ÖØ-Ý][a-zà-öø-ÿ]{2,}\b/g)||[]).filter(x=>!["Morris","Come","Cosa","Quando","Perché","Perche","Secondo","Dimmi","Vorrei","Voglio","Davvero"].includes(x));
  return caps[0]||"la situazione";
}

function intentsV5(raw){
  const s=normalizeV4(raw),out=[];
  const push=x=>{if(!out.includes(x))out.push(x)};
  if(/mi ama|ama me|innamorat|cosa prova|cosa sente|sentiment|attraz|gli piaccio|le piaccio/.test(s))push("sentimenti");
  if(/vede un futuro|futuro con|staremo insieme|relazione|rapporto|coppia|lascer|separ/.test(s))push("relazione");
  if(/torner|ritorner|riavvicin|tornare insieme/.test(s))push("ritorno");
  if(/mi scriver|mi chiam|mi contatt|mi cercher|si fara sentire|si fara vivo/.test(s))push("contatto");
  if(/tradisc|tradiment|fedele|mentendo|mi mente|nasconde|sincer/.test(s))push("fiducia");
  if(/lavor|carriera|cliente|contratto|assunt|posto|occupaz|profession|progetto/.test(s))push("lavoro");
  if(/sold|denar|econom|finanz|guadagn|incass|entrate|spese|pagamento/.test(s))push("risorse");
  if(/salute|malatt|guarir|medic|diagnos|sintom/.test(s))push("salute");
  if(/devo|dovrei|conviene|scelta|scegli|decision|faccio bene|vale la pena/.test(s))push("decisione");
  if(/quando|quanto tempo|entro quando/.test(s))push("tempo");
  if(/succeder|evolver|svilupp|andra|come finira/.test(s))push("sviluppo");
  return out.length?out:["generale"];
}

function analyseQuestionV4(raw){
  const intents=intentsV5(raw);
  return{raw:raw.trim(),norm:normalizeV4(raw),intent:intents[0],intents,subject:extractSubjectV4(raw),domain:topic(raw),keywords:keywordsV4(raw)};
}

function answerForIntentV5(intent,a,dir,c){
  const s=a.subject==="la situazione"?"questa situazione":a.subject;
  const finalName=c.final?c.final.card.name+(c.final.reversed?" rovesciata":""):"la carta finale";
  const presentName=c.present?c.present.card.name+(c.present.reversed?" rovesciata":""):"la carta del presente";
  const yes=dir.band==="apertura",no=dir.band==="chiusura";
  if(intent==="sentimenti"){
    if(yes)return"<strong>Sui sentimenti:</strong> le carte mostrano un coinvolgimento reale di "+s+" verso di te. "+emotionalNuanceV4()+".";
    if(no)return"<strong>Sui sentimenti:</strong> le carte non mostrano un sentimento libero e pienamente disponibile da parte di "+s+"; prevalgono blocco, distanza o conflitto.";
    return"<strong>Sui sentimenti:</strong> da parte di "+s+" vedo ambivalenza: qualcosa c'è, ma non emerge come semplice, stabile e completamente espresso.";
  }
  if(intent==="relazione"){
    if(yes)return"<strong>Sul futuro insieme:</strong> la stesa sostiene una possibilità concreta di continuità o miglioramento con "+s+". "+finalName+" spinge più verso costruzione che verso chiusura.";
    if(no)return"<strong>Sul futuro insieme:</strong> la stesa non sostiene, nelle condizioni attuali, una continuità serena con "+s+". "+finalName+" pesa verso distanza, ridimensionamento o chiusura.";
    return"<strong>Sul futuro insieme:</strong> la situazione con "+s+" resta aperta ma non definita. Non c'è una conferma piena, e il passaggio fra "+presentName+" e "+finalName+" è decisivo.";
  }
  if(intent==="ritorno"){
    if(yes)return"<strong>Sul ritorno:</strong> la stesa tende al riavvicinamento di "+s+", ma non a una semplice replica del passato.";
    if(no)return"<strong>Sul ritorno:</strong> la stesa non indica un ritorno stabile di "+s+" nelle condizioni attuali.";
    return"<strong>Sul ritorno:</strong> il riavvicinamento di "+s+" è possibile, ma ancora condizionato da un nodo irrisolto.";
  }
  if(intent==="contatto"){
    if(yes)return"<strong>Sul contatto:</strong> le carte favoriscono un'iniziativa di "+s+" verso di te.";
    if(no)return"<strong>Sul contatto:</strong> non vedo un'iniziativa forte o vicina da parte di "+s+".";
    return"<strong>Sul contatto:</strong> un gesto di "+s+" è possibile, ma non lineare o immediato.";
  }
  if(intent==="fiducia"){
    return"<strong>Sulla fiducia:</strong> le carte non possono verificare fatti come bugie o tradimenti. Simbolicamente il quadro "+(yes?"è più trasparente e orientato al chiarimento":"contiene opacità, tensione o incoerenze da verificare nei comportamenti reali")+".";
  }
  if(intent==="lavoro"){
    return"<strong>Sul lavoro:</strong> la stesa è "+(yes?"favorevole e mostra margine di sviluppo o risultato concreto":no?"prudente e segnala ostacoli o rallentamenti":"mista: c'è potenziale, ma il risultato non è ancora acquisito")+".";
  }
  if(intent==="risorse"){
    return"<strong>Sul denaro:</strong> il quadro è "+(yes?"orientato a stabilizzazione o miglioramento":no?"da gestire con prudenza per ritardi o pressione sulle risorse":"equilibrato ma non ancora risolto")+".";
  }
  if(intent==="salute"){
    return"<strong>Sulla salute:</strong> le carte non possono fare diagnosi o dire se guarirai. Simbolicamente descrivono "+(yes?"recupero, energia e riequilibrio":"stress, rallentamento o bisogno di attenzione")+".";
  }
  if(intent==="decisione"){
    return"<strong>Sulla scelta:</strong> la stesa "+(yes?"sostiene più il farla che il rinunciarvi":no?"invita a non forzarla nelle condizioni attuali":"non dà ancora un sì pieno")+".";
  }
  if(intent==="tempo"){
    return"<strong>Sui tempi:</strong> le carte non danno una data affidabile; il ritmo appare "+(yes?"piuttosto attivo":"lento o soggetto a rinvio")+".";
  }
  if(intent==="sviluppo"){
    return"<strong>Sull'evoluzione:</strong> la situazione tende "+(yes?"verso apertura o avanzamento":no?"verso rallentamento o chiusura":"a restare condizionata e ancora aperta")+".";
  }
  return"<strong>In generale:</strong> la stesa è "+(yes?"più favorevole che contraria":no?"più frenata che favorevole":"condizionata e non ancora risolta")+".";
}

function exactAnswerV4(a,dir,c){
  const pieces=a.intents.map(intent=>answerForIntentV5(intent,a,dir,c));
  return"<strong>Alla tua domanda “"+esc(a.raw)+"”:</strong><br><br>"+pieces.join("<br><br>");
}

function cardToQuestionV4(d,a){
  const pos=d.position.label.toLowerCase(),m=meaning(d),s=a.subject==="la situazione"?"la situazione":a.subject;
  let role="aggiunge un elemento alla risposta";
  if(/passato|radice/.test(pos))role="spiega cosa ha creato la dinamica che stai chiedendo";
  else if(/presente/.test(pos))role="descrive ciò che è attivo adesso rispetto a "+s;
  else if(/sfida/.test(pos))role="mostra l'ostacolo che può impedire ciò che stai chiedendo";
  else if(/futuro|esito|possibile/.test(pos))role="mostra dove tende "+s+" rispetto alla tua domanda";
  else if(/prossimo/.test(pos))role="indica il prossimo movimento concreto";
  const intents=a.intents.join(" + ");
  return role+" ("+intents+"): <strong>"+m+"</strong>.";
}

function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question),dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");
  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+cardToQuestionV4(d,a)+'</p>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+a.intents.join(" + ")+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>'+(dir.band==="apertura"?"Apertura":dir.band==="chiusura"?"Cautela o chiusura":"Esito condizionato")+'</h4>'+
    '<p class="answer-direct">'+exactAnswerV4(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '<p class="verdict"><strong>Conclusione:</strong> la risposta riguarda i punti che hai chiesto nella frase originale, non un tema generico.</p></div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+cardToQuestionV4(d,a)+'</p></article>').join("")+'</div>'+
    '<div class="synthesis"><img src="'+MORRIS_IMG+'" alt=""><div><span>Morris</span><p>'+exactAnswerV4(a,dir,c)+'</p><p class="final">È una lettura simbolica, non una certezza fattuale sul futuro.</p></div></div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Adesso rispondo proprio a questo.",1700);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}



// ===== MORRIS CARTOMANTE V6: sexual/intimacy intent + no more generic fallback =====
function intentsV5(raw){
  const s=normalizeV4(raw),out=[];
  const push=x=>{if(!out.includes(x))out.push(x)};
  if(/sesso|sessuale|fare l'amore|intimit|scopare|scopero|scoperò|incontro erotico|desiderio fisico|rapporto fisico/.test(s))push("intimita");
  if(/mi ama|ama me|innamorat|cosa prova|cosa sente|sentiment|attraz|gli piaccio|le piaccio/.test(s))push("sentimenti");
  if(/vede un futuro|futuro con|staremo insieme|relazione|rapporto|coppia|lascer|separ/.test(s))push("relazione");
  if(/torner|ritorner|riavvicin|tornare insieme/.test(s))push("ritorno");
  if(/mi scriver|mi chiam|mi contatt|mi cercher|si fara sentire|si fara vivo/.test(s))push("contatto");
  if(/tradisc|tradiment|fedele|mentendo|mi mente|nasconde|sincer/.test(s))push("fiducia");
  if(/lavor|carriera|cliente|contratto|assunt|posto|occupaz|profession|progetto/.test(s))push("lavoro");
  if(/sold|denar|econom|finanz|guadagn|incass|entrate|spese|pagamento/.test(s))push("risorse");
  if(/salute|malatt|guarir|medic|diagnos|sintom/.test(s))push("salute");
  if(/devo|dovrei|conviene|scelta|scegli|decision|faccio bene|vale la pena/.test(s))push("decisione");
  if(/quando|quanto tempo|entro quando/.test(s))push("tempo");
  if(/succeder|evolver|svilupp|andra|come finira|ancora/.test(s))push("sviluppo");
  return out.length?out:["generale"];
}

function answerForIntentV5(intent,a,dir,c){
  const s=a.subject==="la situazione"?"questa situazione":a.subject;
  const finalName=c.final?c.final.card.name+(c.final.reversed?" rovesciata":""):"la carta finale";
  const presentName=c.present?c.present.card.name+(c.present.reversed?" rovesciata":""):"la carta del presente";
  const yes=dir.band==="apertura",no=dir.band==="chiusura";
  if(intent==="intimita"){
    if(yes)return"<strong>Sì: la stesa indica che la tua vita sessuale non è affatto chiusa.</strong> Le carte mostrano possibilità di un nuovo incontro fisico o di una riattivazione dell'intimità. "+presentName+" descrive come sei messo adesso; "+finalName+" indica che il movimento tende più verso il contatto che verso la rinuncia.";
    if(no)return"<strong>Non leggo una chiusura definitiva della tua vita sessuale, ma nel breve la stesa mostra blocchi, esitazioni o circostanze poco favorevoli.</strong> Il punto non è “mai più”: è che, con le dinamiche attuali, l'intimità tende a ritardare o a non concretizzarsi facilmente. "+finalName+" è la carta che pesa di più su questo.";
    return"<strong>Sì, la possibilità di avere ancora rapporti sessuali c'è, ma la stesa non la mostra come immediata o automatica.</strong> C'è desiderio o potenziale, ma anche un freno. Il passaggio fra "+presentName+" e "+finalName+" indica che l'intimità torna quando cambia la situazione che oggi la blocca.";
  }
  if(intent==="sentimenti"){
    if(yes)return"<strong>Sui sentimenti:</strong> le carte mostrano un coinvolgimento reale di "+s+" verso di te. "+emotionalNuanceV4()+".";
    if(no)return"<strong>Sui sentimenti:</strong> le carte non mostrano un sentimento libero e pienamente disponibile da parte di "+s+"; prevalgono blocco, distanza o conflitto.";
    return"<strong>Sui sentimenti:</strong> da parte di "+s+" vedo ambivalenza: qualcosa c'è, ma non emerge come semplice, stabile e completamente espresso.";
  }
  if(intent==="relazione"){
    if(yes)return"<strong>Sul futuro insieme:</strong> la stesa sostiene una possibilità concreta di continuità o miglioramento con "+s+". "+finalName+" spinge più verso costruzione che verso chiusura.";
    if(no)return"<strong>Sul futuro insieme:</strong> la stesa non sostiene, nelle condizioni attuali, una continuità serena con "+s+". "+finalName+" pesa verso distanza, ridimensionamento o chiusura.";
    return"<strong>Sul futuro insieme:</strong> la situazione con "+s+" resta aperta ma non definita. Non c'è una conferma piena, e il passaggio fra "+presentName+" e "+finalName+" è decisivo.";
  }
  if(intent==="ritorno"){
    if(yes)return"<strong>Sul ritorno:</strong> la stesa tende al riavvicinamento di "+s+", ma non a una semplice replica del passato.";
    if(no)return"<strong>Sul ritorno:</strong> la stesa non indica un ritorno stabile di "+s+" nelle condizioni attuali.";
    return"<strong>Sul ritorno:</strong> il riavvicinamento di "+s+" è possibile, ma ancora condizionato da un nodo irrisolto.";
  }
  if(intent==="contatto"){
    if(yes)return"<strong>Sul contatto:</strong> le carte favoriscono un'iniziativa di "+s+" verso di te.";
    if(no)return"<strong>Sul contatto:</strong> non vedo un'iniziativa forte o vicina da parte di "+s+".";
    return"<strong>Sul contatto:</strong> un gesto di "+s+" è possibile, ma non lineare o immediato.";
  }
  if(intent==="fiducia"){
    return"<strong>Sulla fiducia:</strong> le carte non possono verificare fatti come bugie o tradimenti. Simbolicamente il quadro "+(yes?"è più trasparente e orientato al chiarimento":"contiene opacità, tensione o incoerenze da verificare nei comportamenti reali")+".";
  }
  if(intent==="lavoro"){
    return"<strong>Sul lavoro:</strong> la stesa è "+(yes?"favorevole e mostra margine di sviluppo o risultato concreto":no?"prudente e segnala ostacoli o rallentamenti":"mista: c'è potenziale, ma il risultato non è ancora acquisito")+".";
  }
  if(intent==="risorse"){
    return"<strong>Sul denaro:</strong> il quadro è "+(yes?"orientato a stabilizzazione o miglioramento":no?"da gestire con prudenza per ritardi o pressione sulle risorse":"equilibrato ma non ancora risolto")+".";
  }
  if(intent==="salute"){
    return"<strong>Sulla salute:</strong> le carte non possono fare diagnosi o dire se guarirai. Simbolicamente descrivono "+(yes?"recupero, energia e riequilibrio":"stress, rallentamento o bisogno di attenzione")+".";
  }
  if(intent==="decisione"){
    return"<strong>Sulla scelta:</strong> la stesa "+(yes?"sostiene più il farla che il rinunciarvi":no?"invita a non forzarla nelle condizioni attuali":"non dà ancora un sì pieno")+".";
  }
  if(intent==="tempo"){
    return"<strong>Sui tempi:</strong> le carte non danno una data affidabile; il ritmo appare "+(yes?"piuttosto attivo":"lento o soggetto a rinvio")+".";
  }
  if(intent==="sviluppo"){
    return"<strong>Sull'evoluzione:</strong> la situazione tende "+(yes?"verso apertura o avanzamento":no?"verso rallentamento o chiusura":"a restare condizionata e ancora aperta")+".";
  }
  const k=a.keywords.length?a.keywords.join(", "):"il cuore della domanda";
  if(yes)return"<strong>Rispetto a ciò che hai chiesto, la stesa è favorevole.</strong> I segnali principali collegati a "+k+" vanno più verso apertura, movimento o possibilità concreta che verso chiusura.";
  if(no)return"<strong>Rispetto a ciò che hai chiesto, la stesa è prudente o contraria.</strong> I segnali collegati a "+k+" mostrano più blocco, rinvio o difficoltà che apertura.";
  return"<strong>Rispetto a ciò che hai chiesto, la stesa resta aperta ma condizionata.</strong> I segnali collegati a "+k+" non danno ancora una direzione unica.";
}

function cardToQuestionV4(d,a){
  const pos=d.position.label.toLowerCase(),m=meaning(d),s=a.subject==="la situazione"?"la situazione":a.subject;
  let role="aggiunge un elemento alla risposta";
  if(/passato|radice/.test(pos))role="spiega cosa ha preparato il tema che stai chiedendo";
  else if(/presente/.test(pos))role="descrive la situazione attuale rispetto alla tua domanda";
  else if(/sfida/.test(pos))role="mostra cosa ostacola concretamente ciò che stai chiedendo";
  else if(/futuro|esito|possibile/.test(pos))role="mostra la direzione futura rispetto alla tua domanda";
  else if(/prossimo/.test(pos))role="indica il prossimo movimento concreto";
  let tail="";
  if(a.intents.includes("intimita")){
    if(d.card.suit==="Bastoni")tail=" Sul piano sessuale, i Bastoni aumentano desiderio, impulso e iniziativa.";
    else if(d.card.suit==="Coppe")tail=" Sul piano sessuale, le Coppe legano il contatto fisico a coinvolgimento e apertura emotiva.";
    else if(d.card.suit==="Spade")tail=" Sul piano sessuale, le Spade parlano più di blocchi mentali, dubbi o pensieri che frenano il corpo.";
    else if(d.card.suit==="Denari")tail=" Sul piano sessuale, i Denari chiedono concretezza, occasione reale e disponibilità pratica.";
  }
  return role+": <strong>"+m+"</strong>."+tail;
}



// ===== MORRIS CARTOMANTE V7: hard-route the final answer from the actual question text =====
function classifyDirectV7(raw){
  const s=normalizeV4(raw);
  const intents=[];
  const add=x=>{if(!intents.includes(x))intents.push(x)};
  if(/sesso|sessuale|fare l'amore|intimit|scopare|scopero|incontro erotico|desiderio fisico|rapporto fisico/.test(s))add("intimita");
  if(/mi ama|innamorat|cosa prova|cosa sente|sentiment|attraz|gli piaccio|le piaccio/.test(s))add("sentimenti");
  if(/vede un futuro|futuro con|staremo insieme|relazione|rapporto|coppia|lascer|separ/.test(s))add("relazione");
  if(/torner|ritorner|riavvicin/.test(s))add("ritorno");
  if(/mi scriver|mi chiam|mi contatt|mi cercher|si fara sentire|si fara vivo/.test(s))add("contatto");
  if(/tradisc|tradiment|fedele|mentendo|mi mente|nasconde|sincer/.test(s))add("fiducia");
  if(/lavor|carriera|cliente|contratto|assunt|posto|occupaz|profession|progetto/.test(s))add("lavoro");
  if(/sold|denar|econom|finanz|guadagn|incass|entrate|spese|pagamento/.test(s))add("risorse");
  if(/devo|dovrei|conviene|scelta|scegli|decision|faccio bene|vale la pena/.test(s))add("decisione");
  if(/quando|quanto tempo|entro quando/.test(s))add("tempo");
  if(/succeder|evolver|svilupp|andra|come finira/.test(s))add("sviluppo");
  return intents.length?intents:["generale"];
}

function intimateAnswerV7(dir,c){
  const finalName=c.final?c.final.card.name+(c.final.reversed?" rovesciata":""):"la carta finale";
  const presentName=c.present?c.present.card.name+(c.present.reversed?" rovesciata":""):"la carta del presente";
  if(dir.band==="apertura"){
    return "<strong>Sì: le carte indicano che avrai ancora vita sessuale.</strong> La stesa mostra possibilità concreta di intimità e contatto fisico, non una chiusura. "+presentName+" descrive la fase attuale; "+finalName+" porta la lettura verso riattivazione, incontro o disponibilità maggiore.";
  }
  if(dir.band==="chiusura"){
    return "<strong>La stesa non dice “mai più”, ma in questo momento il sesso appare rallentato o ostacolato.</strong> Quindi alla domanda “Farò ancora sesso?” Morris risponde: <strong>sì, ma non facilmente o non nell'immediato</strong>. "+finalName+" è la carta che spiega il blocco o il ritardo.";
  }
  return "<strong>Sì, la possibilità di avere ancora rapporti sessuali c'è.</strong> La stesa però non la mostra come immediata: c'è desiderio o potenziale, ma anche qualcosa che frena la concretizzazione. Il passaggio fra "+presentName+" e "+finalName+" dice che l'intimità torna quando cambia la situazione attuale.";
}

function directIntentAnswerV7(intent,a,dir,c){
  if(intent==="intimita")return intimateAnswerV7(dir,c);
  return answerForIntentV5(intent,a,dir,c);
}

function renderResult(){
  const question=q.value.trim();
  const intents=classifyDirectV7(question);
  const a={...analyseQuestionV4(question),intents,intent:intents[0]};
  const dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");

  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+cardToQuestionV4(d,a)+'</p>').join("");
  const answers=intents.map(i=>directIntentAnswerV7(i,a,dir,c)).join("<br><br>");

  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+intents.join(" + ")+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>'+(dir.band==="apertura"?"Apertura":dir.band==="chiusura"?"Cautela o ritardo":"Esito condizionato")+'</h4>'+
    '<p class="answer-direct">'+answers+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '<p class="verdict"><strong>Conclusione:</strong> Morris ha risposto al tema reale della tua domanda: <strong>'+intents.join(" + ")+'</strong>. Non viene più usato il fallback generico quando il tema è riconoscibile.</p></div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+cardToQuestionV4(d,a)+'</p></article>').join("")+'</div>'+
    '<div class="synthesis"><img src="'+MORRIS_IMG+'" alt=""><div><span>Morris</span><p>'+answers+'</p><p class="final">È una lettura simbolica, non una certezza fattuale sul futuro.</p></div></div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';

  actorSayV3("Ti rispondo proprio a questo.",1600);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}



// ===== MORRIS CARTOMANTE V6: sexuality/intimacy intent + no generic filler =====
function intentsV5(raw){
  const s=normalizeV4(raw),out=[];
  const push=x=>{if(!out.includes(x))out.push(x)};
  if(/sesso|sessual|fare l amore|fare l'amore|intimit|rapporto fisico|rapporti fisici|scop|desiderio sessuale|vita sessuale|incontro intimo|incontri intimi/.test(s))push("sessualita");
  if(/mi ama|ama me|innamorat|cosa prova|cosa sente|sentiment|attraz|gli piaccio|le piaccio/.test(s))push("sentimenti");
  if(/vede un futuro|futuro con|staremo insieme|relazione|rapporto|coppia|lascer|separ/.test(s))push("relazione");
  if(/torner|ritorner|riavvicin|tornare insieme/.test(s))push("ritorno");
  if(/mi scriver|mi chiam|mi contatt|mi cercher|si fara sentire|si fara vivo/.test(s))push("contatto");
  if(/tradisc|tradiment|fedele|mentendo|mi mente|nasconde|sincer/.test(s))push("fiducia");
  if(/lavor|carriera|cliente|contratto|assunt|posto|occupaz|profession|progetto/.test(s))push("lavoro");
  if(/sold|denar|econom|finanz|guadagn|incass|entrate|spese|pagamento/.test(s))push("risorse");
  if(/salute|malatt|guarir|medic|diagnos|sintom/.test(s))push("salute");
  if(/devo|dovrei|conviene|scelta|scegli|decision|faccio bene|vale la pena/.test(s))push("decisione");
  if(/quando|quanto tempo|entro quando/.test(s))push("tempo");
  if(/succeder|evolver|svilupp|andra|come finira/.test(s))push("sviluppo");
  return out.length?out:["generale"];
}

function answerForIntentV5(intent,a,dir,c){
  const s=a.subject==="la situazione"?"la situazione":a.subject;
  const finalName=c.final?c.final.card.name+(c.final.reversed?" rovesciata":""):"la carta finale";
  const presentName=c.present?c.present.card.name+(c.present.reversed?" rovesciata":""):"la carta del presente";
  const yes=dir.band==="apertura",no=dir.band==="chiusura";

  if(intent==="sessualita"){
    if(yes)return"<strong>Sì: la stesa tende a dire che avrai ancora una vita sessuale attiva o un nuovo incontro intimo.</strong> "+presentName+" descrive la condizione attuale, mentre "+finalName+" apre più al movimento che alla chiusura. Non leggo una fine definitiva della sessualità.";
    if(no)return"<strong>La stesa non mostra un incontro sessuale vicino o facile nelle condizioni attuali.</strong> Questo non significa “mai più”: indica piuttosto una fase di blocco, distanza o poche occasioni adesso. "+finalName+" è la carta che pesa di più su questa cautela.";
    return"<strong>La risposta è: sì, è possibile, ma non emerge come qualcosa di immediato o già in movimento.</strong> La stesa mostra desiderio o possibilità, ma anche un freno concreto. "+presentName+" e "+finalName+" vanno letti insieme.";
  }

  if(intent==="sentimenti"){
    if(yes)return"<strong>Sui sentimenti:</strong> le carte mostrano un coinvolgimento reale di "+s+" verso di te. "+emotionalNuanceV4()+".";
    if(no)return"<strong>Sui sentimenti:</strong> le carte non mostrano un sentimento libero e pienamente disponibile da parte di "+s+"; prevalgono blocco, distanza o conflitto.";
    return"<strong>Sui sentimenti:</strong> da parte di "+s+" vedo ambivalenza: qualcosa c'è, ma non emerge come semplice, stabile e completamente espresso.";
  }
  if(intent==="relazione"){
    if(yes)return"<strong>Sul futuro insieme:</strong> la stesa sostiene una possibilità concreta di continuità o miglioramento con "+s+". "+finalName+" spinge più verso costruzione che verso chiusura.";
    if(no)return"<strong>Sul futuro insieme:</strong> la stesa non sostiene, nelle condizioni attuali, una continuità serena con "+s+". "+finalName+" pesa verso distanza, ridimensionamento o chiusura.";
    return"<strong>Sul futuro insieme:</strong> la situazione con "+s+" resta aperta ma non definita. Non c'è una conferma piena, e il passaggio fra "+presentName+" e "+finalName+" è decisivo.";
  }
  if(intent==="ritorno"){
    if(yes)return"<strong>Sul ritorno:</strong> la stesa tende al riavvicinamento di "+s+", ma non a una semplice replica del passato.";
    if(no)return"<strong>Sul ritorno:</strong> la stesa non indica un ritorno stabile di "+s+" nelle condizioni attuali.";
    return"<strong>Sul ritorno:</strong> il riavvicinamento di "+s+" è possibile, ma ancora condizionato da un nodo irrisolto.";
  }
  if(intent==="contatto"){
    if(yes)return"<strong>Sul contatto:</strong> le carte favoriscono un'iniziativa di "+s+" verso di te.";
    if(no)return"<strong>Sul contatto:</strong> non vedo un'iniziativa forte o vicina da parte di "+s+".";
    return"<strong>Sul contatto:</strong> un gesto di "+s+" è possibile, ma non lineare o immediato.";
  }
  if(intent==="fiducia"){
    return"<strong>Sulla fiducia:</strong> le carte non possono verificare fatti come bugie o tradimenti. Simbolicamente il quadro "+(yes?"è più trasparente e orientato al chiarimento":"contiene opacità, tensione o incoerenze da verificare nei comportamenti reali")+".";
  }
  if(intent==="lavoro"){
    return"<strong>Sul lavoro:</strong> la stesa è "+(yes?"favorevole e mostra margine di sviluppo o risultato concreto":no?"prudente e segnala ostacoli o rallentamenti":"mista: c'è potenziale, ma il risultato non è ancora acquisito")+".";
  }
  if(intent==="risorse"){
    return"<strong>Sul denaro:</strong> il quadro è "+(yes?"orientato a stabilizzazione o miglioramento":no?"da gestire con prudenza per ritardi o pressione sulle risorse":"equilibrato ma non ancora risolto")+".";
  }
  if(intent==="salute"){
    return"<strong>Sulla salute:</strong> le carte non possono fare diagnosi o dire se guarirai. Simbolicamente descrivono "+(yes?"recupero, energia e riequilibrio":"stress, rallentamento o bisogno di attenzione")+".";
  }
  if(intent==="decisione"){
    return"<strong>Sulla scelta:</strong> la stesa "+(yes?"sostiene più il farla che il rinunciarvi":no?"invita a non forzarla nelle condizioni attuali":"non dà ancora un sì pieno")+".";
  }
  if(intent==="tempo"){
    return"<strong>Sui tempi:</strong> le carte non danno una data affidabile; il ritmo appare "+(yes?"piuttosto attivo":"lento o soggetto a rinvio")+".";
  }
  if(intent==="sviluppo"){
    return"<strong>Sull'evoluzione:</strong> la situazione tende "+(yes?"verso apertura o avanzamento":no?"verso rallentamento o chiusura":"a restare condizionata e ancora aperta")+".";
  }
  return"<strong>Rispetto alla tua domanda:</strong> la stesa è "+(yes?"più favorevole che contraria":no?"più frenata che favorevole":"condizionata e non ancora risolta")+".";
}

function cardToQuestionV4(d,a){
  const pos=d.position.label.toLowerCase(),m=meaning(d),s=a.subject==="la situazione"?"la situazione":a.subject;
  const intentText=a.intents.includes("sessualita")?"sesso e intimità":a.intents.join(" + ");
  let role="aggiunge un elemento alla risposta";
  if(/passato|radice/.test(pos))role="spiega cosa ha creato la dinamica che stai chiedendo";
  else if(/presente/.test(pos))role="descrive ciò che è attivo adesso rispetto a "+(a.intents.includes("sessualita")?"desiderio, occasioni e intimità":s);
  else if(/sfida/.test(pos))role="mostra l'ostacolo che può impedire ciò che stai chiedendo";
  else if(/futuro|esito|possibile/.test(pos))role="mostra dove tende "+(a.intents.includes("sessualita")?"la tua vita sessuale":s)+" rispetto alla domanda";
  else if(/prossimo/.test(pos))role="indica il prossimo movimento concreto";
  return role+" ("+intentText+"): <strong>"+m+"</strong>.";
}

function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question),dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");
  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div><span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+cardToQuestionV4(d,a)+'</p>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+a.intents.join(" + ")+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>'+(dir.band==="apertura"?"Apertura":dir.band==="chiusura"?"Cautela o chiusura":"Esito condizionato")+'</h4>'+
    '<p class="answer-direct">'+exactAnswerV4(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '</div>'+
    '<div class="reading">'+drawn.map(d=>'<article><span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+cardToQuestionV4(d,a)+'</p></article>').join("")+'</div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Ti rispondo alla domanda, non in generale.",1700);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}


// ===== MORRIS CARTOMANTE V7: illustrated Major Arcana =====
const MAJOR_ART = {
  matto:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/51a12ac2-6a8e-4e3b-b1f5-1c4c4103802f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYzU2Yjg4NWI4MWY0MWJkNSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA1MDAxMX0.W7G5Lpd0iHZLUFwYmU4zv4Qp7ky0psu6oP_D-_6t_iE",
  mago:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/66f821cb-262d-4185-a4c4-26b17fef111c.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjY1NzA1NTQ2YTIxMTk1OCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAyNjcwOH0.hERqzu-KnGWX681vHHyxpOo7OOrkbALw03xZwR8X90Q",
  papessa:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/33aa33af-be03-44f0-a06e-3762ccf0d41d.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNGMwNDZkYzNmYTA3YmQ0NSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA0MzQ1OX0.8NajeyBqCg02_pVxK6iZ9ijX_1rUANbv9uGCRaSF_Hc",
  imperatrice:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/2b22d264-435b-44f8-9949-d21332e68a13.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDMxNzNhYjU3YzY2MjNjMCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDEwMDUzM30.0-4AB-0_jXgLKfPt_Sh-riYpeHrSpTrRIMW5EXex0ew",
  imperatore:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/8fc534b5-aadb-459d-8f8a-2a01e4ba0caf.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTAzOTBiMmMzODU2N2EzYiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA1MTM3Mn0.bzSGVf7ekMf2duanvVg_jqZMcCvZJ6y_76ytA3vlesk",
  papa:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/b70d9897-3700-472a-8b8e-fe3044d61a3d.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMDljZGQwYjIzNjQzMGUxNCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA5OTI1MH0.z5I9Q7Ns7am9yK___zxyui_BaFcSGbvDsGeDHTu62IY",
  amanti:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/1f4cb66c-3ff3-4799-9c0a-4f1ed564d159.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiM2FjZDE4NGY3YTQ3YjljNSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAzOTYzMX0.J9wrIc899hj42PvBSMnfrx7CpAMaiaLD-Y7Vx3jtLbI",
  carro:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/b594b146-e16d-4ca1-8f7d-fc20e6c1d58f.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGYxMTdlZDZlOTQ3MzMyNCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA4NDk1MH0.LK58-fmHcN2sz_ORhRnF3T-pcot9UBordiCj95vWZII",
  forza:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/0a7e4d04-3410-4041-9c01-e59f4cc5fa9b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiM2U4M2UwN2JhNDA5ZmExZSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA1NTY3NX0.CXCNtM_a-W2BEWotDuGaOmquHEhJ0IL0ptKuzIRvNxQ",
  eremita:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/f4f88345-9064-4c26-9f67-6d8014e049d1.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiM2Y3OGIzMjhkZDc2NDcwNyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAyOTk5Mn0.40dJfhUV2QSP2sJgdJJR8x-YN0tBio-1REo9VzA1C8w",
  ruota:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/9db43c2d-ba10-456f-add2-64c48e01628b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZTNhMDM5MWRmNDllYjg1NyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA4MzYxM30.xXSjUZw355ZpURImr7P20RmgvaVCHZIdfTViXTCL6IA",
  giustizia:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/be03bd0a-cb10-4b38-aeff-e482177b50db.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTdiYjg3MGE1ZTBjMjE4MSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAzMjM5NH0.FeplbNOTSlSKOWDHDudWoQXhYMWPZNlH_2vypOYJkq4",
  appeso:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/18cd941d-bb1c-4d2c-b37a-2ba55dc14caa.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZGIxNjVmZmFhMTNjM2U4NiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA4MzA2Nn0.pbXSxt4YgMLDA9yWsIiI2qaeU4BHJ4s8sqwufC6A_0g",
  morte:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/845e919d-b92c-46ee-a772-f4880f447a17.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTMzNGIwZWY4NWI3MmY5NCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAzMjQ5NX0.UxdhYRP_pz-DTXF0ExI_AYw85rwr_x9PZplFK77B8ss",
  temperanza:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/68e52406-2cc7-4697-b478-a5e47da4cefd.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYjZkYjA1OTAwMWIyODVlYyIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAzNzUyMH0.OXWQmQS_BM1kkejHabRWrtWK_zrsJliVJunHx2chjf0",
  diavolo:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/db6ff715-83cc-4a49-bf49-663a260274c7.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMjIwZDI0M2U1ZWE1NTkyNSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA0NDk5MH0.KYqPjkYADj4SBtfoWfSGShD0UVYY8yGJ3av74RGiUCc",
  torre:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/367670a9-006a-406a-aa03-b237d549b4db.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDM5NzFlMTVkZjgwZTAwMCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDEwMTAxM30.MDPrp1LkaHDblIYKUeX41CzctV5t51LBL8S4jqiRNl8",
  stella:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/ebc56452-c477-4293-952f-723ee15ce30d.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMzA3ZGRmNTg2NDY2NjFiNSIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA0ODM0NH0.7fX2o2aZUW5BICkLXe9FFfCW6KGUov1M3xNK-NOYVZg",
  luna:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/c6fe7c8c-9bf3-4426-b46d-055c001ab96b.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMjg2ZDQ0YjQxMzE1NTc0YiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA0NDg1Mn0.bldlqvJ4q7n-80KHM0k7-_r5fsoscq7w3k4ikoROGWM",
  sole:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/ff6b0469-7818-4c74-af08-3f3e75539295.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiODAyNTY4Y2Y1YTUwYWRiZiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA3OTMxMX0.VTBsLI5QVtoLRryAaBXnCWrEjk1gxVNC6wQiQQ0iRlE",
  giudizio:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/6d4f3f69-cfee-4331-bf54-fbf616bd3be9.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNTkzNmRkODQwMGNhNTAyMiIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDA5NTg3Nn0.nzF0fuVChZtkweN0bi1ChcxB7tON0OlQvN19dj0DX18",
  mondo:"https://d2jqrm6oza8nb6.cloudfront.net/datasets/e0392742-5896-4dfd-a715-09b81ebe8a95.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiYTA1OTljZGFjZmNkMzczNCIsImJ1Y2tldCI6InJ1bndheS1kYXRhc2V0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc5MDAyNTgxOH0.Bm6db7FiU20Mz9ejRgaMv9gu5CLspDaEDAgJVJmA96c"
};

function majorArt(c){ return c && c.arcana==="Maggiore" ? MAJOR_ART[c.id] : null; }

function renderSpread(){
  deckStage.classList.add("hidden");
  spreadArea.className="spread-area "+currentSpread;
  spreadArea.innerHTML="";
  revealNote.classList.remove("hidden");
  result.classList.add("hidden");
  drawn.forEach((d,i)=>{
    const slot=document.createElement("div");
    slot.className="card-slot";
    const art=majorArt(d.card);
    const face = art
      ? '<span class="card-front major-front '+(d.reversed?"reversed":"")+'"><img class="major-art" src="'+art+'" alt="'+d.card.name+'" loading="eager"><span class="major-glow"></span></span>'
      : '<span class="card-front '+(d.reversed?"reversed":"")+'"><em>'+d.card.arcana+'</em><b class="mark">'+mark(d.card)+'</b><strong>'+d.card.name+'</strong><small>'+(d.reversed?"Rovesciata":"Dritta")+'</small></span>';
    slot.innerHTML='<span class="position-label">'+d.position.label+'</span><button class="tarot-card '+(art?'major-card':'')+'" type="button" aria-label="Rivela '+d.position.label+'"><span class="card-inner"><span class="card-back"><b>✦</b><i>☾</i><small>MORRIS</small></span>'+face+'</span></button>';
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

function resultCardThumbV7(d){
  const art=majorArt(d.card);
  return art ? '<img class="result-major-thumb '+(d.reversed?'is-reversed':'')+'" src="'+art+'" alt="'+d.card.name+'">' : '';
}

function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question),dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");
  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div>'+resultCardThumbV7(d)+'<span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+cardToQuestionV4(d,a)+'</p>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+a.intents.join(" + ")+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>'+(dir.band==="apertura"?"Apertura":dir.band==="chiusura"?"Cautela o chiusura":"Esito condizionato")+'</h4>'+
    '<p class="answer-direct">'+exactAnswerV4(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '</div>'+
    '<div class="reading">'+drawn.map(d=>'<article>'+resultCardThumbV7(d)+'<span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+cardToQuestionV4(d,a)+'</p></article>').join("")+'</div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Ti rispondo alla domanda, non in generale.",1700);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}


// ===== MORRIS CARTOMANTE V8: reject vague questions + domain-specific synthesis =====
function vagueQuestionV8(raw){
  const s=normalizeV4(raw).replace(/[^a-z0-9à-ÿ\s]/g," ").trim();
  const words=s.split(/\s+/).filter(Boolean);
  const vagueOnly=/^(soldi|denaro|amore|lavoro|salute|futuro|sesso|relazione|famiglia|fortuna|carriera|economia|finanze)$/;
  if(vagueOnly.test(s)) return true;
  if(words.length<3) return true;
  return false;
}
function vagueExampleV8(intent){
  const map={
    risorse:"La mia situazione economica migliorerà nei prossimi mesi?",
    sentimenti:"Che cosa prova davvero questa persona per me?",
    relazione:"Come evolverà questa relazione nei prossimi mesi?",
    lavoro:"Questo progetto di lavoro ha possibilità concrete di riuscire?",
    sessualita:"La mia vita sessuale tornerà ad essere attiva?",
    salute:"Che cosa posso osservare simbolicamente rispetto al mio benessere?",
    generale:"Che cosa vuoi sapere esattamente e rispetto a quale situazione?"
  };
  return map[intent]||map.generale;
}
function financialLensV8(d){
  const id=d.card.id, m=meaning(d), suit=d.card.suit||"";
  const special={
    morte:"indica una fase economica da chiudere o trasformare: un vecchio modo di guadagnare, spendere o gestire risorse non regge più come prima",
    amanti:"parla di una scelta, un accordo, un contratto o una partnership: sui soldi conta decidere con chi e a quali condizioni impegnarsi",
    diavolo:"segnala attaccamento, debito, spesa compulsiva, dipendenza economica o un accordo che rischia di legarti troppo",
    torre:"indica una rottura improvvisa di equilibrio economico o una spesa/evento che obbliga a rivedere il piano",
    ruota:"indica una fase di cambiamento e variabilità: entrate o opportunità possono muoversi, ma non sono ancora sotto pieno controllo",
    giustizia:"parla di conti, contratti, debiti/crediti, equilibrio fra ciò che entra e ciò che esce e conseguenze di decisioni pregresse",
    imperatore:"favorisce struttura, controllo, budget, disciplina e consolidamento",
    imperatrice:"favorisce crescita e capacità di far rendere risorse, ma chiede di non confondere abbondanza con spesa senza misura",
    mago:"indica capacità di creare un'opportunità economica usando competenze e risorse già disponibili",
    carro:"indica avanzamento possibile se la gestione resta disciplinata e non dispersiva",
    stella:"porta recupero di fiducia e possibilità di ripresa graduale, non denaro facile",
    sole:"è un segnale di chiarezza, riuscita e miglioramento materiale più visibile",
    mondo:"indica completamento di un ciclo con risultato concreto o consolidamento",
    appeso:"suggerisce attesa, liquidità ferma o necessità di cambiare prospettiva prima di muovere denaro",
    eremita:"invita a prudenza, analisi e riduzione del rischio prima di investire o spendere",
    luna:"segnala informazioni incomplete, percezioni distorte o rischio di valutare male una situazione economica",
    giudizio:"indica revisione dei conti e una decisione che può riaprire una fase nuova",
    temperanza:"favorisce riequilibrio, gestione graduale e recupero attraverso misura",
    forza:"parla di controllo degli impulsi e capacità di reggere una fase economica senza mosse emotive",
    papa:"favorisce soluzioni tradizionali, consulenza, istituzioni, regole e accordi formalizzati",
    papessa:"invita a non muovere denaro finché non hai tutte le informazioni",
    imperatore:"favorisce struttura, controllo, budget e consolidamento"
  };
  if(special[id]) return special[id]+".";
  if(suit==="Denari") return "è direttamente legata a risorse, stabilità, lavoro e gestione concreta: "+m+".";
  if(suit==="Bastoni") return "sui soldi parla soprattutto di iniziativa, velocità e rischio: "+m+".";
  if(suit==="Spade") return "sui soldi mette in primo piano decisioni, conflitti, contratti o costi mentali: "+m+".";
  if(suit==="Coppe") return "sui soldi parla di priorità personali, relazioni, soddisfazione e scelte influenzate dall'emotività: "+m+".";
  return m+".";
}
function domainCardLensV8(d,a){
  if(a.intents.includes("risorse")) return financialLensV8(d);
  return cardToQuestionV4(d,a);
}
function moneySynthesisV8(a,c){
  const present=findByLabel("presente")||drawn[0];
  const challenge=findByLabel("sfida");
  const possible=findByLabel("possibile");
  const next=findByLabel("prossimo");
  const outcome=findByLabel("esito")||findByLabel("futuro")||drawn[drawn.length-1];
  const parts=[];
  if(present) parts.push("<strong>Situazione attuale:</strong> "+present.card.name+" "+financialLensV8(present));
  if(challenge) parts.push("<strong>Ostacolo:</strong> "+challenge.card.name+" "+financialLensV8(challenge));
  if(possible) parts.push("<strong>Possibilità:</strong> "+possible.card.name+" "+financialLensV8(possible));
  if(next && next!==outcome) parts.push("<strong>Prossimo passaggio:</strong> "+next.card.name+" "+financialLensV8(next));
  if(outcome) parts.push("<strong>Direzione finale:</strong> "+outcome.card.name+" "+financialLensV8(outcome));
  return parts;
}
function exactAnswerV8(a,dir,c){
  if(a.intents.includes("risorse")){
    const parts=moneySynthesisV8(a,c);
    const headline = dir.band==="apertura"
      ? "La stesa mostra un miglioramento possibile, ma attraverso cambiamenti e decisioni concrete."
      : dir.band==="chiusura"
      ? "La stesa non mostra facilità immediata: prima va corretto un nodo economico concreto."
      : "La stesa non dice semplicemente 'bene' o 'male': mostra una fase di transizione economica con una scelta decisiva.";
    return "<strong>"+headline+"</strong><br><br>"+parts.join("<br><br>");
  }
  return exactAnswerV4(a,dir,c);
}

// override draw: do not allow meaningless one-word questions
function draw(){
  const question=q.value.trim();
  const a=analyseQuestionV4(question);
  if(!question || vagueQuestionV8(question)){
    q.focus();
    q.style.boxShadow="0 0 0 3px #c77d8755";
    setTimeout(()=>q.style.boxShadow="",900);
    oracleText.textContent="Questa domanda è troppo vaga. Morris vuole sapere esattamente cosa vuoi capire.";
    actorSayV3("Dimmi cosa vuoi sapere davvero.",1500);
    const hint=vagueExampleV8(a.intent);
    q.placeholder=hint;
    return;
  }
  if(drawBtn.disabled)return;
  ensureAudio();atmospherePhrase();drawBtn.disabled=true;
  result.classList.add("hidden");spreadArea.classList.add("hidden");spreadArea.innerHTML="";revealNote.classList.add("hidden");
  deckStage.classList.remove("hidden");deckStage.classList.add("shuffling");actorShuffleV3();
  oracleText.textContent="Morris legge la domanda e mescola il mazzo...";
  const pool=shuffle([...deck]);
  const nextDraw=spreads[currentSpread].positions.map((position,i)=>({card:pool[i],reversed:reversals.checked&&rnd()<.5,position}));
  setTimeout(()=>{
    drawn=nextDraw;revealed=new Set();deckStage.classList.remove("shuffling");
    renderSpread();drawBtn.textContent="Mescola ancora";drawBtn.disabled=false;actorIdleV3();
    oracleText.textContent="Le carte sono scelte. Morris le apre una per volta.";
  },1250);
}

function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question),dir=directionV4(),c=coreCardsV3(),notes=synthesis();
  result.classList.remove("hidden");
  const unique=[c.present,c.obstacle,c.final].filter((x,i,arr)=>x&&arr.indexOf(x)===i);
  const evidence=unique.map(d=>'<div>'+resultCardThumbV7(d)+'<span>'+d.position.label+'</span><b>'+d.card.name+(d.reversed?' · rovesciata':' · dritta')+'</b></div>').join("");
  const explanations=unique.map(d=>'<p><strong>'+d.position.label+' · '+d.card.name+':</strong> '+domainCardLensV8(d,a)+'</p>').join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+esc(question)+'”</h3></div><p>Domanda letta come: <strong>'+a.intents.join(" + ")+'</strong></p></div>'+
    '<div class="deep-answer"><span>Risposta diretta</span><h4>Interpretazione della stesa</h4>'+
    '<p class="answer-direct">'+exactAnswerV8(a,dir,c)+'</p>'+
    '<div class="evidence-grid">'+evidence+'</div>'+
    '<div class="why">'+explanations+'</div>'+
    (notes.length?'<p><strong>Incrocio della stesa:</strong> '+notes.join(" ")+'</p>':'')+
    '</div>'+
    '<div class="reading">'+drawn.map(d=>'<article>'+resultCardThumbV7(d)+'<span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+domainCardLensV8(d,a)+'</p></article>').join("")+'</div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Adesso la risposta riguarda davvero ciò che hai chiesto.",1700);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}


// ===== MORRIS CARTOMANTE V9: AI reading based strictly on drawn cards =====
const AI_READING_URL="https://morris-cartomante-ai.onrender.com/read";

function aiPayloadV9(question){
  return {
    question,
    spreadName:spreads[currentSpread]?.name||currentSpread,
    cards:drawn.map(d=>({
      position:d.position.label,
      name:d.card.name,
      reversed:Boolean(d.reversed),
      meaning:meaning(d),
      suit:d.card.suit||null,
      arcana:d.card.arcana||null
    }))
  };
}
function escapeHtmlV9(s){
  return String(s||"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[m]));
}
function renderAiTextV9(text){
  const safe=escapeHtmlV9(text)
    .replace(/\*\*(.+?)\*\*/g,"<strong>$1</strong>")
    .replace(/\n{2,}/g,"</p><p>")
    .replace(/\n/g,"<br>");
  return "<p>"+safe+"</p>";
}
async function requestAiReadingV9(question){
  const res=await fetch(AI_READING_URL,{
    method:"POST",
    headers:{"content-type":"application/json"},
    body:JSON.stringify(aiPayloadV9(question))
  });
  if(!res.ok){
    const e=await res.json().catch(()=>({}));
    throw new Error(e.error||("HTTP "+res.status));
  }
  const data=await res.json();
  if(!data.reading) throw new Error("empty_ai_reading");
  return data.reading;
}
function renderResult(){
  const question=q.value.trim(),a=analyseQuestionV4(question);
  result.classList.remove("hidden");
  const cardsHtml=drawn.map(d=>
    '<article>'+resultCardThumbV7(d)+
    '<span>'+d.position.label+'</span>'+
    '<h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4>'+
    '<p><strong>Significato-base:</strong> '+escapeHtmlV9(meaning(d))+'</p></article>'
  ).join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+escapeHtmlV9(question)+'”</h3></div><p>Stesa: <strong>'+escapeHtmlV9(spreads[currentSpread]?.name||currentSpread)+'</strong></p></div>'+
    '<div class="deep-answer ai-reading-box"><span>Responso di Morris</span><h4 id="aiReadingTitle">Sto leggendo le carte...</h4>'+
    '<div class="ai-loader"><i></i><i></i><i></i></div>'+
    '<div id="aiReadingText"><p>Morris sta collegando la tua domanda alle carte uscite, alla loro posizione e al loro orientamento.</p></div></div>'+
    '<div class="reading">'+cardsHtml+'</div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Ora leggo davvero queste carte.",1700);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
  requestAiReadingV9(question).then(reading=>{
    const title=document.querySelector("#aiReadingTitle"),box=document.querySelector("#aiReadingText"),loader=result.querySelector(".ai-loader");
    if(title)title.textContent="Risposta alla tua domanda";
    if(loader)loader.remove();
    if(box)box.innerHTML=renderAiTextV9(reading);
    actorSayV3("Questa è la lettura delle carte uscite.",1800);
  }).catch(err=>{
    const title=document.querySelector("#aiReadingTitle"),box=document.querySelector("#aiReadingText"),loader=result.querySelector(".ai-loader");
    if(title)title.textContent="Lettura AI non disponibile";
    if(loader)loader.remove();
    if(box)box.innerHTML='<p>Il motore AI non è ancora configurato sul server. Le carte sono state estratte correttamente, ma non voglio sostituire il responso con una frase generica.</p>';
    console.error("Morris AI error",err);
  });
}


// ===== MORRIS CARTOMANTE V10: fully local interpretive engine, no external AI =====
function localQuestionProfileV10(raw){
  const a=analyseQuestionV4(raw);
  const s=normalizeV4(raw);
  let polarity="open";
  if(/^(avro|avrò|faro|farò|tornera|tornerà|mi ama|mi cerchera|mi cercherà|riuscir|migliorera|migliorerà|andra|andrà|succeder)/.test(s)) polarity="yesno";
  return {...a,polarity};
}
function positionWeightV10(label){
  const s=normalizeV4(label);
  if(/esito|futuro|possibile/.test(s)) return 2.2;
  if(/presente/.test(s)) return 1.7;
  if(/sfida/.test(s)) return 1.4;
  if(/prossimo/.test(s)) return 1.9;
  if(/radice|passato/.test(s)) return 1.25;
  return 1;
}
function valenceV10(d){
  const text=normalizeV4(meaning(d));
  const plus=["crescita","successo","gioia","apertura","accordo","armonia","stabilita","opportunita","recupero","guarigione","vittoria","riconoscimento","chiarezza","fiducia","avanzamento","soddisfazione","compimento","sostegno","autonomia","generosita","reciprocita","amore","unione","determinazione","abbondanza","integrazione","equilibrio","rigenerazione"];
  const minus=["paura","dolore","conflitto","perdita","chiusura","rigidita","dipendenza","ansia","rottura","blocco","ritardo","delusione","squilibrio","manipolazione","instabilita","isolamento","stallo","eccesso","aggressivita","imprudenza","scarsita","controllo eccessivo","autoinganno"];
  let n=0; plus.forEach(w=>{if(text.includes(w))n+=1}); minus.forEach(w=>{if(text.includes(w))n-=1});
  if(d.card.arcana==="Maggiore") n*=1.3;
  return n*positionWeightV10(d.position.label);
}
function domainInterpretationV10(d,a){
  const m=meaning(d), id=d.card.id, suit=d.card.suit||"", pos=normalizeV4(d.position.label);
  const prefix=/passato|radice/.test(pos)?"All'origine della situazione":/presente/.test(pos)?"Adesso":/sfida/.test(pos)?"L'ostacolo principale":/futuro|esito|possibile/.test(pos)?"La direzione verso cui tende la situazione":/prossimo/.test(pos)?"Il prossimo movimento":"Questa posizione";
  if(a.intents.includes("risorse")) return prefix+": "+financialLensV8(d);
  if(a.intents.includes("sessualita")){
    const special={
      diavolo:"desiderio fisico forte, magnetismo e pulsione, ma anche rischio di vivere il sesso come compensazione o dipendenza",
      amanti:"attrazione e scelta reciproca; la componente fisica è collegata a una decisione relazionale",
      forza:"energia sessuale presente ma controllata, che cresce più con fiducia che con fretta",
      luna:"desiderio e fantasia ci sono, ma con incertezza o idealizzazione",
      sole:"apertura, vitalità e possibilità concreta di vivere il corpo con maggiore spontaneità",
      temperanza:"ripresa graduale dell'intimità, più lenta che esplosiva",
      eremita:"fase di distanza o scarsa disponibilità all'incontro",
      torre:"rottura di un equilibrio precedente e possibile svolta improvvisa",
      morte:"chiusura di una fase sessuale vecchia e necessità di trasformare il modo in cui vivi l'intimità",
      mondo:"compimento, sicurezza e ritorno a una dimensione fisica più completa"
    };
    if(special[id]) return prefix+": "+special[id]+".";
    if(suit==="Bastoni") return prefix+": prevalgono desiderio, iniziativa e impulso; "+m+".";
    if(suit==="Coppe") return prefix+": l'intimità dipende molto dal coinvolgimento emotivo; "+m+".";
    if(suit==="Spade") return prefix+": pensieri, paure o tensioni mentali interferiscono con il desiderio; "+m+".";
    if(suit==="Denari") return prefix+": contano concretezza, corpo, tempo e occasioni reali; "+m+".";
  }
  if(a.intents.includes("sentimenti")||a.intents.includes("relazione")||a.intents.includes("ritorno")||a.intents.includes("contatto")){
    const special={
      amanti:"c'è un tema forte di attrazione, scelta e compatibilità di valori",
      diavolo:"c'è magnetismo e attaccamento, ma anche il rischio di confondere desiderio con legame sano",
      luna:"ci sono emozioni reali ma anche ambiguità, paura o idealizzazione",
      sole:"chiarezza, calore e disponibilità a mostrarsi senza troppi filtri",
      stella:"apertura sincera, speranza e possibilità di ricostruire fiducia",
      eremita:"distanza, bisogno di stare soli o difficoltà a esprimere ciò che si prova",
      morte:"una vecchia forma del rapporto deve chiudersi perché possa nascere qualcosa di diverso",
      torre:"una verità o una rottura cambia bruscamente il rapporto",
      temperanza:"ricomposizione lenta, dialogo e possibilità di riequilibrio",
      giudizio:"ritorno del passato, resa dei conti o decisione definitiva",
      mondo:"chiusura di un ciclo e possibilità di una relazione più completa o definitivamente conclusa, a seconda del contesto"
    };
    if(special[id]) return prefix+": "+special[id]+".";
    if(suit==="Coppe") return prefix+": la carta parla direttamente di emozioni e legami; "+m+".";
    if(suit==="Spade") return prefix+": prevalgono pensieri, dubbi, comunicazione o conflitto; "+m+".";
    if(suit==="Bastoni") return prefix+": prevalgono attrazione, impulso e iniziativa; "+m+".";
    if(suit==="Denari") return prefix+": conta la concretezza: gesti, continuità, affidabilità; "+m+".";
  }
  if(a.intents.includes("lavoro")){
    if(suit==="Denari") return prefix+": questa carta pesa molto sul piano professionale perché parla di risorse, competenza e risultati concreti; "+m+".";
    if(suit==="Bastoni") return prefix+": indica iniziativa, ambizione, ritmo e capacità di muovere il progetto; "+m+".";
    if(suit==="Spade") return prefix+": parla di decisioni, strategia, conflitto o comunicazione professionale; "+m+".";
    if(suit==="Coppe") return prefix+": segnala soddisfazione, rapporti con colleghi/clienti e motivazione emotiva; "+m+".";
  }
  return prefix+": "+m+".";
}
function localTrendV10(){
  const total=drawn.reduce((s,d)=>s+valenceV10(d),0);
  const threshold=Math.max(1.8,drawn.length*0.65);
  if(total>threshold) return {band:"positive",score:total};
  if(total<-threshold) return {band:"negative",score:total};
  return {band:"mixed",score:total};
}
function conflictsV10(){
  const out=[];
  for(let i=0;i<drawn.length-1;i++){
    const a=drawn[i],b=drawn[i+1];
    if(valenceV10(a)>1 && valenceV10(b)<-1) out.push(a.card.name+" apre, ma "+b.card.name+" frena");
    if(valenceV10(a)<-1 && valenceV10(b)>1) out.push(a.card.name+" mostra il problema, mentre "+b.card.name+" introduce una via d'uscita");
  }
  return out.slice(0,2);
}
function directLocalAnswerV10(a,trend){
  const who=a.subject==="la situazione"?"la situazione":a.subject;
  const future=findByLabel("futuro","esito","possibile")||drawn[drawn.length-1];
  const fName=future?future.card.name+(future.reversed?" rovesciata":""):"la carta finale";
  const pos=trend.band==="positive", neg=trend.band==="negative";
  if(a.intents.includes("risorse")){
    if(pos) return "Sì, la stesa mostra una possibilità concreta di miglioramento economico, ma non come colpo di fortuna: passa da decisioni, disciplina o cambiamenti pratici. "+fName+" è la carta che pesa di più sulla direzione.";
    if(neg) return "Al momento la stesa non mostra un miglioramento economico facile o immediato. Il punto non è 'non avrai soldi', ma che prima va corretto un nodo concreto di gestione, scelta o stabilità.";
    return "La situazione economica può migliorare, ma la stesa non mostra un percorso lineare. Ci sono sia aperture sia freni: conta soprattutto come gestisci la scelta o il passaggio indicato dalle carte finali.";
  }
  if(a.intents.includes("sessualita")){
    if(pos) return "Sì: la stesa indica che la tua vita sessuale può tornare attiva. Non la leggo come una fase chiusa definitivamente; vedo movimento, desiderio o possibilità di incontro.";
    if(neg) return "Non vedo un incontro sessuale vicino nelle condizioni attuali, ma non significa 'mai più'. Le carte parlano di un blocco o di una fase che prima deve cambiare.";
    return "Sì, è possibile, ma non emerge come qualcosa di immediato. C'è desiderio o possibilità, però insieme a un freno che va superato.";
  }
  if(a.intents.includes("sentimenti")){
    if(pos) return "Le carte mostrano un coinvolgimento reale da parte di "+who+", anche se il modo in cui viene espresso può essere diverso da ciò che vorresti vedere.";
    if(neg) return "Le carte non mostrano un sentimento libero e disponibile da parte di "+who+" in questo momento; prevalgono blocco, distanza o conflitto.";
    return "Da parte di "+who+" vedo sentimenti non semplici: qualcosa c'è, ma non è lineare né completamente espresso.";
  }
  if(a.intents.includes("ritorno")){
    if(pos) return "La stesa favorisce un ritorno o un riavvicinamento di "+who+", ma non come semplice ripetizione del passato: qualcosa deve cambiare.";
    if(neg) return "Nelle condizioni attuali la stesa non sostiene un ritorno stabile di "+who+". Può esserci un movimento, ma non abbastanza per parlare di vera ripresa.";
    return "Il ritorno di "+who+" resta possibile, ma dipende da un nodo ancora irrisolto mostrato dalle carte.";
  }
  if(a.intents.includes("contatto")){
    if(pos) return "La stesa favorisce un contatto o un'iniziativa da parte di "+who+".";
    if(neg) return "Non vedo un'iniziativa forte o vicina da parte di "+who+"; la tendenza è più di esitazione o distanza.";
    return "Un contatto è possibile, ma non appare lineare o immediato.";
  }
  if(a.intents.includes("relazione")){
    if(pos) return "La relazione con "+who+" ha una possibilità concreta di continuare o migliorare, purché venga affrontato il nodo mostrato dalla stesa.";
    if(neg) return "Se nulla cambia, la relazione con "+who+" tende più alla distanza o al ridimensionamento che alla stabilità.";
    return "La relazione con "+who+" è in una fase sospesa: non vedo né una chiusura netta né una conferma piena.";
  }
  if(a.intents.includes("lavoro")){
    if(pos) return "La stesa è favorevole sul lavoro: mostra margine per risultato, opportunità o avanzamento.";
    if(neg) return "Sul lavoro vedo ostacoli o rallentamenti che rendono prematuro aspettarsi un risultato facile.";
    return "Sul lavoro c'è potenziale, ma non abbastanza per considerare il risultato già acquisito.";
  }
  if(a.intents.includes("decisione")){
    if(pos) return "La stesa sostiene più il fare questa scelta che il rinunciarvi.";
    if(neg) return "La stesa invita a non forzare questa scelta nelle condizioni attuali.";
    return "La scelta non è sbagliata in assoluto, ma va fatta solo dopo aver chiarito il nodo centrale della stesa.";
  }
  if(a.intents.includes("tempo")){
    return "Le carte non danno una data affidabile, ma il ritmo appare "+(pos?"piuttosto attivo":neg?"lento o soggetto a rinvio":"intermedio, con fasi di accelerazione e stop")+".";
  }
  if(a.intents.includes("salute")){
    return "Le carte non possono fare diagnosi. Simbolicamente, la stesa parla di "+(pos?"recupero e riequilibrio":neg?"stress, rallentamento o bisogno di attenzione":"una fase da osservare senza conclusioni nette")+".";
  }
  if(pos) return "La risposta della stesa è prevalentemente favorevole rispetto a ciò che hai chiesto.";
  if(neg) return "La risposta della stesa è prevalentemente prudente o contraria rispetto a ciò che hai chiesto.";
  return "La stesa non dà un sì o un no netto: mostra una situazione ancora in evoluzione.";
}
function localReadingV10(question){
  const a=localQuestionProfileV10(question),trend=localTrendV10();
  const direct=directLocalAnswerV10(a,trend);
  const details=drawn.map(d=>"<p><strong>"+d.position.label+" — "+d.card.name+(d.reversed?" rovesciata":"")+":</strong> "+domainInterpretationV10(d,a)+"</p>").join("");
  const majors=drawn.filter(d=>d.card.arcana==="Maggiore");
  let synthesis="";
  if(majors.length>=Math.max(2,Math.ceil(drawn.length/3))) synthesis+=" Gli Arcani Maggiori sono numerosi, quindi la stesa parla più di un passaggio importante che di un dettaglio momentaneo.";
  const conflicts=conflictsV10();
  if(conflicts.length) synthesis+=" "+conflicts.join(". ")+".";
  const suits={Bastoni:0,Coppe:0,Spade:0,Denari:0};drawn.forEach(d=>{if(d.card.suit)suits[d.card.suit]++});
  const top=Object.entries(suits).sort((x,y)=>y[1]-x[1])[0];
  if(top&&top[1]>=2){
    const meaningMap={Bastoni:"azione, desiderio e iniziativa",Coppe:"emozioni e relazioni",Spade:"pensiero, comunicazione e tensione",Denari:"concretezza, lavoro e risorse"};
    synthesis+=" Il seme dominante è "+top[0]+", quindi il tema insiste soprattutto su "+meaningMap[top[0]]+".";
  }
  return '<p class="answer-direct"><strong>'+direct+'</strong></p>'+details+(synthesis?'<p class="verdict"><strong>Sintesi:</strong>'+synthesis+'</p>':'');
}
function renderResult(){
  const question=q.value.trim();
  result.classList.remove("hidden");
  const cardsHtml=drawn.map(d=>
    '<article>'+resultCardThumbV7(d)+
    '<span>'+d.position.label+'</span>'+
    '<h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4>'+
    '<p>'+domainInterpretationV10(d,localQuestionProfileV10(question))+'</p></article>'
  ).join("");
  result.innerHTML=
    '<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+escapeHtmlV9(question)+'”</h3></div><p>Stesa: <strong>'+escapeHtmlV9(spreads[currentSpread]?.name||currentSpread)+'</strong></p></div>'+
    '<div class="deep-answer"><span>Responso di Morris</span><h4>Risposta alla tua domanda</h4>'+
    '<div id="aiReadingText">'+localReadingV10(question)+'</div></div>'+
    '<div class="reading">'+cardsHtml+'</div>'+
    '<button class="reset" id="resetBtn">Nuova domanda</button>';
  actorSayV3("Questa è la lettura delle carte uscite.",1800);
  document.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}


// ===== MORRIS CARTOMANTE V12: the user shuffles and chooses the cards =====
let manualDeckV12=[], manualChosenV12=[];

function manualNeedV12(){ return spreads[currentSpread].positions.length; }

function renderManualDeckV12(){
  deckStage.classList.add("hidden");
  spreadArea.className="manual-deck-picker";
  spreadArea.innerHTML="";
  spreadArea.classList.remove("hidden");
  revealNote.classList.remove("hidden");
  const need=manualNeedV12();
  revealNote.textContent="Scegli "+need+" "+(need===1?"carta":"carte")+" dal mazzo. La prima scelta va nella prima posizione della stesa.";
  manualDeckV12.forEach((item,index)=>{
    const b=document.createElement("button");
    b.type="button";
    b.className="manual-card-back";
    b.setAttribute("aria-label","Carta coperta "+(index+1));
    b.innerHTML='<span class="manual-back-inner"><b>✦</b><i>☾</i><small>M</small></span>';
    b.addEventListener("click",()=>chooseManualCardV12(index,b));
    spreadArea.appendChild(b);
  });
}

function chooseManualCardV12(index,button){
  if(button.disabled || manualChosenV12.length>=manualNeedV12()) return;
  const item=manualDeckV12[index];
  const position=spreads[currentSpread].positions[manualChosenV12.length];
  const chosen={card:item.card,reversed:item.reversed,position};
  manualChosenV12.push(chosen);
  button.disabled=true;
  button.classList.add("chosen");
  button.innerHTML='<span class="choice-number">'+manualChosenV12.length+'</span><span class="manual-back-inner"><b>✦</b><i>☾</i><small>M</small></span>';
  actorSayV3("Hai scelto la carta "+manualChosenV12.length+".",850);
  oracleText.textContent="Scelta "+manualChosenV12.length+" di "+manualNeedV12()+". "+(manualChosenV12.length<manualNeedV12()?"Scegli la prossima carta.":"La stesa è completa.");
  if(manualChosenV12.length===manualNeedV12()){
    drawn=manualChosenV12.slice();
    revealed=new Set();
    drawBtn.disabled=false;
    drawBtn.textContent="Mischia un nuovo mazzo";
    setTimeout(()=>{
      renderSpread();
      revealNote.classList.remove("hidden");
      revealNote.textContent="Ora gira le carte che hai scelto, una alla volta.";
      actorSayV3("Adesso girale tu.",1100);
    },500);
  }
}

function draw(){
  if(drawBtn.disabled) return;
  const question=q.value.trim();
  if(typeof vagueQuestionV8==="function" && vagueQuestionV8(question)){
    oracleText.textContent="Fammi una domanda un po’ più precisa prima di mischiare.";
    q.focus();
    return;
  }
  if(!question){
    oracleText.textContent="Prima scrivi la domanda, poi mischia il mazzo.";
    q.focus();
    return;
  }
  if(musicEnabled) ensureAudio();
  result.classList.add("hidden");
  revealed=new Set();
  drawn=[];
  manualChosenV12=[];
  drawBtn.disabled=true;
  spreadArea.classList.add("hidden");
  spreadArea.innerHTML="";
  revealNote.classList.add("hidden");
  deckStage.classList.remove("hidden");
  deckStage.classList.add("shuffling");
  actorShuffleV3();
  oracleText.textContent="Mischia... il mazzo si sta rimescolando.";
  drawBtn.textContent="Sto mischiando…";
  const shuffled=shuffle([...deck]);
  manualDeckV12=shuffled.map(card=>({
    card,
    reversed:reversals.checked && rnd()<.5
  }));
  setTimeout(()=>{
    deckStage.classList.remove("shuffling");
    actorIdleV3();
    renderManualDeckV12();
    drawBtn.disabled=false;
    drawBtn.textContent="Mischia ancora";
    oracleText.textContent="Il mazzo è davanti a te. Scegli tu le carte.";
    actorSayV3("Scegli tu.",1300);
  },950);
}


// ===== MORRIS CARTOMANTE V13: card-specific final answers =====
function cardRoleSentenceV13(d,a){
  const label=normalizeV4(d.position.label);
  const name=d.card.name+(d.reversed?" rovesciata":"");
  const base=domainInterpretationV10(d,a)
    .replace(/^All'origine della situazione:\s*/i,"")
    .replace(/^Adesso:\s*/i,"")
    .replace(/^L'ostacolo principale:\s*/i,"")
    .replace(/^La direzione verso cui tende la situazione:\s*/i,"")
    .replace(/^Il prossimo movimento:\s*/i,"")
    .replace(/^Questa posizione:\s*/i,"")
    .replace(/\.$/,"");
  if(/passato|radice/.test(label)) return name+" mostra da dove nasce il problema: "+base+".";
  if(/presente/.test(label)) return name+" descrive ciò che sta succedendo ora: "+base+".";
  if(/sfida/.test(label)) return name+" è il nodo da superare: "+base+".";
  if(/futuro|esito|possibile/.test(label)) return name+" indica la direzione più probabile: "+base+".";
  if(/prossimo/.test(label)) return name+" mostra il prossimo passaggio: "+base+".";
  return name+": "+base+".";
}

function cardSpecificDirectV13(a,trend){
  const first=drawn[0];
  const present=findByLabel("presente")||drawn[Math.min(1,drawn.length-1)]||first;
  const final=findByLabel("futuro","esito","possibile")||drawn[drawn.length-1];
  const challenge=findByLabel("sfida")||null;
  const pos=trend.band==="positive", neg=trend.band==="negative";
  const finalName=final.card.name+(final.reversed?" rovesciata":"");
  const presentName=present.card.name+(present.reversed?" rovesciata":"");
  const challengeName=challenge?challenge.card.name+(challenge.reversed?" rovesciata":""):null;

  let lead="";
  if(a.intents.includes("risorse")){
    if(pos) lead="La stesa tende al miglioramento economico, ma il modo in cui ci arrivi dipende chiaramente dalle carte uscite.";
    else if(neg) lead="Questa stesa è prudente sul denaro: non mostra un miglioramento semplice nelle condizioni attuali.";
    else lead="Questa stesa sul denaro è mista: c'è margine di miglioramento, ma non senza correggere ciò che le carte stanno segnalando.";
  } else if(a.intents.includes("sessualita")){
    if(pos) lead="Questa stesa apre a una ripresa della vita sessuale.";
    else if(neg) lead="Questa stesa mostra ancora un blocco concreto sul piano sessuale.";
    else lead="Questa stesa non chiude la porta alla vita sessuale, ma la mostra ancora condizionata.";
  } else if(a.intents.includes("sentimenti")){
    if(pos) lead="Questa stesa mostra un coinvolgimento reale.";
    else if(neg) lead="Questa stesa mostra più distanza o blocco che disponibilità emotiva.";
    else lead="Questa stesa mostra sentimenti presenti ma contraddittori.";
  } else if(a.intents.includes("ritorno")){
    if(pos) lead="Questa stesa apre a un ritorno o riavvicinamento.";
    else if(neg) lead="Questa stesa non sostiene un ritorno stabile nelle condizioni attuali.";
    else lead="Questa stesa lascia il ritorno possibile, ma ancora sospeso.";
  } else if(a.intents.includes("contatto")){
    if(pos) lead="Questa stesa favorisce un contatto.";
    else if(neg) lead="Questa stesa non mostra un contatto vicino o spontaneo.";
    else lead="Questa stesa lascia possibile un contatto, ma non immediato.";
  } else if(a.intents.includes("relazione")){
    if(pos) lead="Questa stesa sostiene la possibilità di migliorare la relazione.";
    else if(neg) lead="Questa stesa mostra una relazione in difficoltà.";
    else lead="Questa stesa mostra una relazione ancora aperta ma instabile.";
  } else if(a.intents.includes("lavoro")){
    if(pos) lead="Questa stesa è favorevole sul lavoro.";
    else if(neg) lead="Questa stesa mostra ostacoli o rallentamenti sul lavoro.";
    else lead="Questa stesa mostra potenziale sul lavoro, ma con condizioni da gestire.";
  } else {
    lead=directLocalAnswerV10(a,trend);
  }

  let why=" ";
  if(present===final){
    why+=finalName+" pesa più di tutte perché chiude la stesa: "+meaning(final)+".";
  } else {
    why+=presentName+" descrive il presente come "+meaning(present)+", mentre "+finalName+" porta la direzione verso "+meaning(final)+".";
  }
  if(challenge && challenge!==present && challenge!==final){
    why+=" Il punto critico è "+challengeName+", che introduce "+meaning(challenge)+".";
  }

  // Add one explicit interaction between cards so different spreads produce different answers.
  const vf=valenceV10(final), vp=valenceV10(present);
  if(vp<0 && vf>0) why+=" In altre parole: il problema c'è adesso, ma la carta finale mostra un'apertura reale.";
  else if(vp>0 && vf<0) why+=" Qui il presente è più favorevole dell'esito: senza correzioni, la situazione può peggiorare o perdere slancio.";
  else if(vp>0 && vf>0) why+=" Presente ed esito si sostengono a vicenda, quindi la tendenza è coerentemente favorevole.";
  else if(vp<0 && vf<0) why+=" Presente ed esito vanno nella stessa direzione critica, quindi il blocco non appare momentaneo.";

  return lead+why;
}

function localReadingV10(question){
  const a=localQuestionProfileV10(question),trend=localTrendV10();
  const direct=cardSpecificDirectV13(a,trend);
  const details=drawn.map(d=>"<p><strong>"+d.position.label+" — "+d.card.name+(d.reversed?" rovesciata":"")+":</strong> "+domainInterpretationV10(d,a)+"</p>").join("");
  const majors=drawn.filter(d=>d.card.arcana==="Maggiore");
  let synthesis="";
  if(majors.length>=Math.max(2,Math.ceil(drawn.length/3))) synthesis+=" Gli Arcani Maggiori sono numerosi, quindi la stesa parla più di un passaggio importante che di un dettaglio momentaneo.";
  const conflicts=conflictsV10();
  if(conflicts.length) synthesis+=" "+conflicts.join(". ")+".";
  const suits={Bastoni:0,Coppe:0,Spade:0,Denari:0};drawn.forEach(d=>{if(d.card.suit)suits[d.card.suit]++});
  const top=Object.entries(suits).sort((x,y)=>y[1]-x[1])[0];
  if(top&&top[1]>=2){
    const meaningMap={Bastoni:"azione, desiderio e iniziativa",Coppe:"emozioni e relazioni",Spade:"pensiero, comunicazione e tensione",Denari:"concretezza, lavoro e risorse"};
    synthesis+=" Il seme dominante è "+top[0]+", quindi il tema insiste soprattutto su "+meaningMap[top[0]]+".";
  }
  return '<p class="answer-direct"><strong>'+direct+'</strong></p>'+details+(synthesis?'<p class="verdict"><strong>Sintesi:</strong>'+synthesis+'</p>':'');
}


// ===== MORRIS CARTOMANTE V16: ritual shuffle, fan choice, cinematic reveal, memory =====
let ritualShuffleActiveV16=false, ritualShuffleEnergyV16=0, ritualLastXV16=null, ritualPointerIdV16=null;
const HISTORY_KEY_V16="morris-cartomante-history-v1";

function historyV16(){
  try{return JSON.parse(localStorage.getItem(HISTORY_KEY_V16)||"[]")}catch(e){return[]}
}
function saveHistoryV16(question){
  try{
    const h=historyV16();
    h.unshift({
      t:Date.now(),
      question,
      spread:currentSpread,
      cards:drawn.map(d=>({id:d.card.id,name:d.card.name,arcana:d.card.arcana,suit:d.card.suit||null,reversed:!!d.reversed,position:d.position.label}))
    });
    localStorage.setItem(HISTORY_KEY_V16,JSON.stringify(h.slice(0,40)));
  }catch(e){}
}
function memorySummaryV16(){
  const h=historyV16();
  if(!h.length) return "";
  const recent=h.slice(0,12);
  const counts=new Map(), majors=new Map(), suits={Bastoni:0,Coppe:0,Spade:0,Denari:0};
  recent.forEach(r=>(r.cards||[]).forEach(c=>{
    counts.set(c.name,(counts.get(c.name)||0)+1);
    if(c.arcana==="Maggiore") majors.set(c.name,(majors.get(c.name)||0)+1);
    if(c.suit&&suits[c.suit]!=null) suits[c.suit]++;
  }));
  const top=[...counts.entries()].sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>=2).slice(0,3);
  const topMaj=[...majors.entries()].sort((a,b)=>b[1]-a[1]).filter(x=>x[1]>=2)[0];
  const topSuit=Object.entries(suits).sort((a,b)=>b[1]-a[1])[0];
  let txt="Ho memoria delle ultime "+recent.length+" "+(recent.length===1?"lettura":"letture")+".";
  if(top.length) txt+=" Le carte che tornano di più sono "+top.map(([n,c])=>n+" ("+c+"×)").join(", ")+".";
  if(topMaj) txt+=" Tra gli Arcani Maggiori insiste soprattutto "+topMaj[0]+".";
  if(topSuit&&topSuit[1]>=3) txt+=" Il seme più ricorrente è "+topSuit[0]+".";
  return txt;
}
function renderMemoryPanelV16(){
  let panel=document.querySelector("#memoryPanelV16");
  if(!panel){
    panel=document.createElement("section");
    panel.id="memoryPanelV16";
    panel.className="memory-panel-v16";
    result.insertAdjacentElement("afterend",panel);
  }
  const h=historyV16();
  if(!h.length){panel.classList.add("hidden");return}
  panel.classList.remove("hidden");
  panel.innerHTML='<div class="memory-head-v16"><div><span>Morris ricorda</span><h3>Le carte che ti seguono</h3></div><button type="button" id="clearMemoryV16">Azzera memoria</button></div>'+
    '<p>'+memorySummaryV16()+'</p>'+
    '<div class="memory-strip-v16">'+h.slice(0,6).map(r=>'<div><small>'+new Date(r.t).toLocaleDateString("it-IT",{day:"2-digit",month:"2-digit"})+'</small><b>'+r.cards.map(c=>c.name+(c.reversed?" ↕":"")).join(" · ")+'</b></div>').join("")+'</div>';
  panel.querySelector("#clearMemoryV16")?.addEventListener("click",()=>{
    localStorage.removeItem(HISTORY_KEY_V16);
    renderMemoryPanelV16();
    actorSayV3("Memoria azzerata.",1000);
  });
}

function shuffleProgressV16(){
  const p=Math.max(0,Math.min(100,Math.round(ritualShuffleEnergyV16)));
  let el=document.querySelector("#shuffleMeterV16");
  if(!el){
    el=document.createElement("div");
    el.id="shuffleMeterV16";
    el.className="shuffle-meter-v16";
    el.innerHTML='<span></span><b>0%</b>';
    deckStage.appendChild(el);
  }
  el.querySelector("span").style.width=p+"%";
  el.querySelector("b").textContent=p+"%";
}
function finishRitualShuffleV16(){
  if(!ritualShuffleActiveV16)return;
  ritualShuffleActiveV16=false;
  ritualShuffleEnergyV16=100;
  shuffleProgressV16();
  manualDeckV12=shuffle([...deck]).map(card=>({card,reversed:reversals.checked&&rnd()<.5}));
  oracleText.textContent="Perfetto. Il mazzo è mescolato. Ora si apre davanti a te.";
  actorSayV3("Adesso scegli.",1200);
  setTimeout(()=>{
    deckStage.classList.remove("shuffling","ritual-v16");
    document.querySelector("#shuffleMeterV16")?.remove();
    actorIdleV3();
    renderManualDeckV12();
    spreadArea.classList.add("fan-mode-v16");
    drawBtn.disabled=false;
    drawBtn.textContent="Ricomincia il rituale";
  },480);
}
function beginRitualShuffleV16(){
  ritualShuffleActiveV16=true; ritualShuffleEnergyV16=0; ritualLastXV16=null;
  deckStage.classList.remove("hidden");
  deckStage.classList.add("shuffling","ritual-v16");
  spreadArea.classList.add("hidden");
  spreadArea.innerHTML="";
  revealNote.classList.remove("hidden");
  revealNote.textContent="Passa il dito avanti e indietro sul mazzo per mischiarlo.";
  drawBtn.disabled=true;
  drawBtn.textContent="Mischia col dito…";
  actorShuffleV3();
  oracleText.textContent="Muovi il dito sul mazzo. Più lo mescoli, più il mazzo cambia.";
  shuffleProgressV16();
}
deckStage.addEventListener("pointerdown",e=>{
  if(!ritualShuffleActiveV16)return;
  ritualPointerIdV16=e.pointerId; ritualLastXV16=e.clientX;
  try{deckStage.setPointerCapture(e.pointerId)}catch(_){}
});
deckStage.addEventListener("pointermove",e=>{
  if(!ritualShuffleActiveV16||ritualPointerIdV16!==e.pointerId||ritualLastXV16==null)return;
  const dx=Math.abs(e.clientX-ritualLastXV16); ritualLastXV16=e.clientX;
  if(dx>1){
    ritualShuffleEnergyV16+=Math.min(8,dx/3);
    deckStage.style.setProperty("--shuffle-x",((e.clientX%80)-40)+"px");
    shuffleProgressV16();
    if(ritualShuffleEnergyV16>=100) finishRitualShuffleV16();
  }
});
["pointerup","pointercancel"].forEach(ev=>deckStage.addEventListener(ev,e=>{
  if(ritualPointerIdV16===e.pointerId){ritualPointerIdV16=null;ritualLastXV16=null}
}));

function draw(){
  if(drawBtn.disabled)return;
  const question=q.value.trim();
  if(typeof vagueQuestionV8==="function"&&vagueQuestionV8(question)){
    oracleText.textContent="Fammi una domanda un po’ più precisa prima di iniziare.";q.focus();return;
  }
  if(!question){oracleText.textContent="Prima scrivi la domanda.";q.focus();return}
  if(musicEnabled)ensureAudio();
  result.classList.add("hidden");
  revealed=new Set();drawn=[];manualChosenV12=[];
  beginRitualShuffleV16();
}

// Fan rendering override
function renderManualDeckV12(){
  deckStage.classList.add("hidden");
  spreadArea.className="manual-deck-picker fan-mode-v16";
  spreadArea.innerHTML="";
  spreadArea.classList.remove("hidden");
  revealNote.classList.remove("hidden");
  const need=manualNeedV12();
  revealNote.textContent="Il mazzo è aperto. Scorri il ventaglio e scegli "+need+" "+(need===1?"carta":"carte")+".";
  manualDeckV12.forEach((item,index)=>{
    const b=document.createElement("button");
    b.type="button";b.className="manual-card-back";
    const rot=((index-(manualDeckV12.length-1)/2)/manualDeckV12.length)*16;
    const lift=Math.abs(index-(manualDeckV12.length-1)/2)/(manualDeckV12.length/2)*7;
    b.style.setProperty("--fan-rot",rot+"deg");
    b.style.setProperty("--fan-lift",lift+"px");
    b.setAttribute("aria-label","Carta coperta "+(index+1));
    b.innerHTML='<span class="manual-back-inner"><b>✦</b><i>☾</i><small>M</small></span>';
    b.addEventListener("click",()=>chooseManualCardV12(index,b));
    spreadArea.appendChild(b);
  });
}

// Cinematic spread/reveal override
function renderSpread(){
  deckStage.classList.add("hidden");
  spreadArea.className="spread-area "+currentSpread+" ritual-spread-v16";
  spreadArea.innerHTML="";
  spreadArea.classList.remove("hidden");
  revealNote.classList.remove("hidden");
  result.classList.add("hidden");
  drawn.forEach((d,i)=>{
    const slot=document.createElement("div");slot.className="card-slot";
    const art=majorArt(d.card);
    const face=art
      ?'<span class="card-front major-front '+(d.reversed?"reversed":"")+'"><img class="major-art" src="'+art+'" alt="'+d.card.name+'" loading="eager"><span class="major-glow"></span></span>'
      :'<span class="card-front '+(d.reversed?"reversed":"")+'"><em>'+d.card.arcana+'</em><b class="mark">'+mark(d.card)+'</b><strong>'+d.card.name+'</strong><small>'+(d.reversed?"Rovesciata":"Dritta")+'</small></span>';
    slot.innerHTML='<span class="position-label">'+d.position.label+'</span><button class="tarot-card '+(art?"major-card":"")+'" type="button" aria-label="Rivela '+d.position.label+'"><span class="card-inner"><span class="card-back"><b>✦</b><i>☾</i><small>MORRIS</small></span>'+face+'</span><span class="reveal-aura-v16"></span></button>';
    const btn=slot.querySelector("button");
    btn.addEventListener("click",async()=>{
      if(revealed.has(i)||btn.dataset.busy)return;
      btn.dataset.busy="1";await morrisTouch(btn,d,i);cardWhisper();
      btn.classList.add("cinematic-reveal-v16");
      setTimeout(()=>{revealed.add(i);btn.classList.add("revealed");delete btn.dataset.busy;
        oracleText.textContent=d.card.name+(d.reversed?" rovesciata":" dritta")+": "+meaning(d)+".";
        if(revealed.size===drawn.length){
          revealNote.classList.add("hidden");
          setTimeout(()=>{oracleText.textContent="Ora Morris mette insieme la risposta alla tua domanda.";renderResult()},850);
        }
      },220);
    });
    spreadArea.appendChild(slot);
  });
}

// Final result override adds memory
function renderResult(){
  const question=q.value.trim();
  result.classList.remove("hidden");
  const cardsHtml=drawn.map(d=>'<article>'+resultCardThumbV7(d)+'<span>'+d.position.label+'</span><h4>'+d.card.name+' <small>'+(d.reversed?'rovesciata':'dritta')+'</small></h4><p>'+domainInterpretationV10(d,localQuestionProfileV10(question))+'</p></article>').join("");
  result.innerHTML='<div class="result-head"><div><span>Lettura di Morris</span><h3>“'+escapeHtmlV9(question)+'”</h3></div><p>Stesa: <strong>'+escapeHtmlV9(spreads[currentSpread]?.name||currentSpread)+'</strong></p></div>'+
    '<div class="deep-answer"><span>Responso di Morris</span><h4>Risposta alla tua domanda</h4><div id="aiReadingText">'+localReadingV10(question)+'</div></div>'+
    '<div class="reading">'+cardsHtml+'</div><button class="reset" id="resetBtn">Nuova domanda</button>';
  saveHistoryV16(question);renderMemoryPanelV16();
  actorSayV3("Questa è la lettura delle carte che hai scelto.",1800);
  result.querySelector("#resetBtn").addEventListener("click",()=>{resetTable(true);actorIdleV3();document.querySelector("#lettura").scrollIntoView({behavior:"smooth"})});
  result.scrollIntoView({behavior:"smooth",block:"start"});
}
setTimeout(renderMemoryPanelV16,0);


// ===== MORRIS CARTOMANTE V17: premium suite =====
const DAILY_KEY_V17="morris-cartomante-daily-v1";
let secretModeV17=false, nightModeV17=false, oracleModeV17=false;

function safeJSONV17(key,fallback){
  try{return JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback))}catch(e){return fallback}
}
function todayKeyV17(d=new Date()){
  return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
}
function daysBetweenV17(a,b){
  const [ay,am,ad]=a.split("-").map(Number),[by,bm,bd]=b.split("-").map(Number);
  return Math.round((Date.UTC(by,bm-1,bd)-Date.UTC(ay,am-1,ad))/86400000);
}
function escV17(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}

function ensurePremiumUIV17(){
  const controls=document.querySelector(".controls");
  if(!controls||document.querySelector("#premiumToolsV17"))return;
  const wrap=document.createElement("div");
  wrap.id="premiumToolsV17";
  wrap.className="premium-tools-v17";
  wrap.innerHTML=
    '<div class="premium-title-v17"><span>Esperienze</span><b>Modalità Morris</b></div>'+
    '<div class="premium-grid-v17">'+
      '<button type="button" data-v17="daily">☀ Carta del giorno</button>'+
      '<button type="button" data-v17="oracle">✦ Morris Oracolo</button>'+
      '<button type="button" data-v17="builder">⌘ Crea la tua stesa</button>'+
      '<button type="button" data-v17="stats">◌ Statistiche</button>'+
    '</div>'+
    '<label class="premium-switch-v17"><input type="checkbox" id="secretToggleV17"><span>Domanda segreta</span><small>Si riscopre solo alla fine</small></label>'+
    '<label class="premium-switch-v17"><input type="checkbox" id="nightToggleV17"><span>Rituale notturno</span><small>Più lento, profondo e tattile</small></label>'+
    '<div id="customSpreadBadgeV17" class="custom-spread-badge-v17 hidden"></div>';
  controls.appendChild(wrap);
  wrap.querySelector('[data-v17="daily"]').addEventListener("click",openDailyV17);
  wrap.querySelector('[data-v17="oracle"]').addEventListener("click",runOracleV17);
  wrap.querySelector('[data-v17="builder"]').addEventListener("click",openBuilderV17);
  wrap.querySelector('[data-v17="stats"]').addEventListener("click",openStatsV17);
  wrap.querySelector("#secretToggleV17").addEventListener("change",e=>{
    secretModeV17=e.target.checked;
    q.classList.toggle("secret-ready-v17",secretModeV17);
    actorSayV3(secretModeV17?"La domanda resterà sigillata.":"Domanda visibile.",1100);
  });
  wrap.querySelector("#nightToggleV17").addEventListener("change",e=>{
    nightModeV17=e.target.checked;
    document.body.classList.toggle("night-ritual-v17",nightModeV17);
    actorSayV3(nightModeV17?"Accendo il rituale notturno.":"Torniamo alla luce normale.",1200);
    if(nightModeV17&&navigator.vibrate) navigator.vibrate([20,35,20]);
  });
}

function ensureModalV17(){
  let m=document.querySelector("#morrisModalV17");
  if(m)return m;
  m=document.createElement("div");
  m.id="morrisModalV17";m.className="morris-modal-v17 hidden";
  m.innerHTML='<div class="morris-modal-card-v17"><button type="button" class="morris-modal-close-v17" aria-label="Chiudi">×</button><div id="morrisModalBodyV17"></div></div>';
  document.body.appendChild(m);
  m.querySelector(".morris-modal-close-v17").addEventListener("click",()=>m.classList.add("hidden"));
  m.addEventListener("click",e=>{if(e.target===m)m.classList.add("hidden")});
  return m;
}
function showModalV17(html){
  const m=ensureModalV17();m.querySelector("#morrisModalBodyV17").innerHTML=html;m.classList.remove("hidden");return m;
}

function dailyDataV17(){return safeJSONV17(DAILY_KEY_V17,{entries:[]})}
function getDailyV17(){
  const data=dailyDataV17(),today=todayKeyV17();
  let entry=data.entries.find(x=>x.date===today);
  if(!entry){
    const pool=shuffle([...deck]);
    const card=pool[0],reversed=rnd()<.5;
    entry={date:today,id:card.id,name:card.name,arcana:card.arcana,suit:card.suit||null,reversed};
    data.entries.push(entry);
    data.entries=data.entries.slice(-120);
    localStorage.setItem(DAILY_KEY_V17,JSON.stringify(data));
  }
  return {entry,data};
}
function dailyStreakV17(entries){
  if(!entries.length)return 0;
  const dates=[...new Set(entries.map(e=>e.date))].sort().reverse();
  let streak=1;
  if(dates[0]!==todayKeyV17())return 0;
  for(let i=1;i<dates.length;i++){if(daysBetweenV17(dates[i],dates[i-1])===1)streak++;else break}
  return streak;
}
function openDailyV17(){
  const {entry,data}=getDailyV17(),card=deck.find(c=>c.id===entry.id),art=card?majorArt(card):"";
  const hist=[...data.entries].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,14);
  const streak=dailyStreakV17(data.entries);
  const visual=art?'<img class="daily-art-v17 '+(entry.reversed?'is-reversed':'')+'" src="'+art+'" alt="'+escV17(entry.name)+'">':
    '<div class="daily-minor-v17"><span>'+escV17(card?.arcana||"Arcano")+'</span><b>'+escV17(entry.name)+'</b><small>'+(entry.reversed?"Rovesciata":"Dritta")+'</small></div>';
  showModalV17(
    '<div class="modal-kicker-v17">Carta del giorno</div><h2>'+escV17(entry.name)+(entry.reversed?' · rovesciata':'')+'</h2>'+
    '<div class="daily-layout-v17">'+visual+'<div><p class="daily-meaning-v17">'+escV17(entry.reversed?card?.reversed:card?.upright)+'</p><div class="streak-v17"><b>'+streak+'</b><span>giorni consecutivi</span></div></div></div>'+
    '<h3>Ultimi giorni</h3><div class="daily-history-v17">'+hist.map(x=>'<div><small>'+x.date.slice(5).split("-").reverse().join("/")+'</small><b>'+escV17(x.name)+(x.reversed?' ↕':'')+'</b></div>').join("")+'</div>'
  );
}

function openBuilderV17(){
  const m=showModalV17(
    '<div class="modal-kicker-v17">Spread Builder</div><h2>Crea la tua stesa</h2>'+
    '<p>Scegli quante carte e assegna un significato a ogni posizione.</p>'+
    '<div class="builder-count-v17"><button type="button" data-n="3" class="active">3 carte</button><button type="button" data-n="5">5 carte</button><button type="button" data-n="7">7 carte</button></div>'+
    '<label class="builder-label-v17">Nome della stesa<input id="builderNameV17" value="La mia stesa"></label>'+
    '<div id="builderPositionsV17"></div><button type="button" id="saveBuilderV17" class="modal-primary-v17">Usa questa stesa</button>'
  );
  let n=3;
  const defaults={3:["Radice","Presente","Direzione"],5:["Situazione","Ostacolo","Radice","Consiglio","Esito"],7:["Origine","Passato","Presente","Sfida","Risorsa","Prossimo passo","Esito"]};
  function render(){
    m.querySelector("#builderPositionsV17").innerHTML=defaults[n].map((x,i)=>'<label class="builder-label-v17">Posizione '+(i+1)+'<input class="builder-pos-v17" value="'+escV17(x)+'"></label>').join("");
  }
  render();
  m.querySelectorAll(".builder-count-v17 button").forEach(b=>b.addEventListener("click",()=>{
    n=Number(b.dataset.n);m.querySelectorAll(".builder-count-v17 button").forEach(x=>x.classList.toggle("active",x===b));render();
  }));
  m.querySelector("#saveBuilderV17").addEventListener("click",()=>{
    const name=m.querySelector("#builderNameV17").value.trim()||"Stesa personale";
    const labels=[...m.querySelectorAll(".builder-pos-v17")].map((x,i)=>x.value.trim()||("Posizione "+(i+1)));
    spreads.custom={name,positions:labels.map(label=>({label,focus:"il significato di "+label.toLowerCase()+" rispetto alla domanda"}))};
    currentSpread="custom";
    document.querySelectorAll('input[name="spread"]').forEach(x=>x.checked=false);
    document.querySelectorAll(".spread-option").forEach(x=>x.classList.remove("active"));
    const badge=document.querySelector("#customSpreadBadgeV17");
    badge.textContent="Stesa attiva: "+name+" · "+n+" carte";badge.classList.remove("hidden");
    resetTable(false);m.classList.add("hidden");actorSayV3("Stesa personale pronta.",1200);
  });
}

function statsV17(){
  const h=historyV16(),all=h.flatMap(r=>r.cards||[]);
  const counts={},maj={},suits={Bastoni:0,Coppe:0,Spade:0,Denari:0};let rev=0;
  all.forEach(c=>{counts[c.name]=(counts[c.name]||0)+1;if(c.arcana==="Maggiore")maj[c.name]=(maj[c.name]||0)+1;if(c.suit&&suits[c.suit]!=null)suits[c.suit]++;if(c.reversed)rev++});
  return {h,all,counts,maj,suits,rev};
}
function openStatsV17(){
  const s=statsV17();
  if(!s.all.length){showModalV17('<div class="modal-kicker-v17">Statistiche</div><h2>Ancora nessuna lettura</h2><p>Fai qualche stesa e Morris inizierà a vedere le ricorrenze.</p>');return}
  const top=Object.entries(s.counts).sort((a,b)=>b[1]-a[1]).slice(0,5);
  const topMaj=Object.entries(s.maj).sort((a,b)=>b[1]-a[1])[0];
  const topSuit=Object.entries(s.suits).sort((a,b)=>b[1]-a[1])[0];
  const revPct=Math.round(s.rev/s.all.length*100);
  showModalV17(
    '<div class="modal-kicker-v17">Statistiche del mazzo</div><h2>Il tuo archivio</h2>'+
    '<div class="stats-grid-v17"><div><b>'+s.h.length+'</b><span>letture</span></div><div><b>'+s.all.length+'</b><span>carte estratte</span></div><div><b>'+revPct+'%</b><span>rovesciate</span></div><div><b>'+escV17(topSuit?.[0]||"—")+'</b><span>seme dominante</span></div></div>'+
    (topMaj?'<p class="stat-highlight-v17">Arcano Maggiore più ricorrente: <strong>'+escV17(topMaj[0])+'</strong> ('+topMaj[1]+'×)</p>':'')+
    '<h3>Carte più frequenti</h3><div class="rank-v17">'+top.map(([n,c],i)=>'<div><span>'+(i+1)+'</span><b>'+escV17(n)+'</b><small>'+c+'×</small></div>').join("")+'</div>'
  );
}

async function runOracleV17(){
  oracleModeV17=true;
  if(!q.value.trim())q.value="Qual è il messaggio che Morris ha per me adesso?";
  if(musicEnabled)ensureAudio();
  result.classList.add("hidden");spreadArea.classList.add("hidden");deckStage.classList.remove("hidden","ritual-v16");
  deckStage.classList.add("shuffling");actorShuffleV3();oracleText.textContent="Morris sceglie una carta per te…";
  const item=shuffle([...deck])[0],d={card:item,reversed:reversals.checked&&rnd()<.5,position:{label:"Oracolo",focus:"il messaggio centrale"}};
  drawn=[d];revealed=new Set();
  setTimeout(()=>{
    deckStage.classList.remove("shuffling");deckStage.classList.add("hidden");actorIdleV3();
    spreadArea.className="spread-area one ritual-spread-v16";spreadArea.innerHTML="";spreadArea.classList.remove("hidden");
    const art=majorArt(d.card);
    const face=art?'<span class="card-front major-front '+(d.reversed?"reversed":"")+'"><img class="major-art" src="'+art+'" alt="'+d.card.name+'"><span class="major-glow"></span></span>':
      '<span class="card-front '+(d.reversed?"reversed":"")+'"><em>'+d.card.arcana+'</em><b class="mark">'+mark(d.card)+'</b><strong>'+d.card.name+'</strong><small>'+(d.reversed?"Rovesciata":"Dritta")+'</small></span>';
    spreadArea.innerHTML='<div class="card-slot"><span class="position-label">Morris Oracolo</span><button class="tarot-card oracle-card-v17" type="button"><span class="card-inner"><span class="card-back"></span>'+face+'</span><span class="reveal-aura-v16"></span></button></div>';
    const btn=spreadArea.querySelector("button");revealNote.classList.remove("hidden");revealNote.textContent="Tocca la carta.";
    btn.addEventListener("click",()=>{
      if(btn.classList.contains("revealed"))return;
      btn.classList.add("cinematic-reveal-v16");majorReactionV17(d);
      setTimeout(()=>{btn.classList.add("revealed");revealed.add(0);revealNote.classList.add("hidden");setTimeout(renderResult,650)},nightModeV17?650:260);
    });
  },800);
}

function majorReactionV17(d){
  if(!d)return;
  if(navigator.vibrate) navigator.vibrate(nightModeV17?[35,40,60]:[18,24,18]);
  if(d.card.arcana!=="Maggiore")return;
  const phrases={
    torre:"La Torre. Questa si sente.",
    morte:"La Morte: qui qualcosa cambia davvero.",
    diavolo:"Il Diavolo. Guarda bene cosa ti lega.",
    sole:"Il Sole. Questa apre la stanza.",
    amanti:"Gli Amanti. Qui c'è una scelta vera.",
    luna:"La Luna. Non tutto è come sembra.",
    stella:"La Stella. C'è spazio per respirare.",
    giudizio:"Il Giudizio. Questa chiama una decisione.",
    mondo:"Il Mondo. Un ciclo arriva al suo punto.",
    eremita:"L'Eremita. Questa chiede silenzio.",
    forza:"La Forza. Non serve spingere.",
    appeso:"L'Appeso. Guarda la cosa al contrario."
  };
  actorSayV3(phrases[d.card.id]||("Un Arcano Maggiore: "+d.card.name+"."),1700);
  document.querySelector(".table")?.classList.add("major-event-v17");
  setTimeout(()=>document.querySelector(".table")?.classList.remove("major-event-v17"),1000);
  if(audioCtx&&musicEnabled){
    const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type="sine";o.frequency.value=d.card.id==="torre"?88:174.61;
    g.gain.setValueAtTime(.0001,audioCtx.currentTime);g.gain.exponentialRampToValueAtTime(nightModeV17?.11:.07,audioCtx.currentTime+.03);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+1.2);
    o.connect(g);g.connect(masterGain);o.start();o.stop(audioCtx.currentTime+1.25);
  }
}
spreadArea.addEventListener("click",e=>{
  const btn=e.target.closest(".tarot-card");if(!btn)return;
  if(nightModeV17&&navigator.vibrate)navigator.vibrate([12,18,12]);
  const buttons=[...spreadArea.querySelectorAll(".tarot-card")],idx=buttons.indexOf(btn),d=drawn[idx];
  if(d&&!btn.dataset.reactedV17){btn.dataset.reactedV17="1";setTimeout(()=>majorReactionV17(d),nightModeV17?720:420)}
});

drawBtn.addEventListener("click",()=>{
  if(secretModeV17){
    q.classList.add("secret-active-v17");
    setTimeout(()=>actorSayV3("Domanda sigillata.",900),50);
  }
},true);

function canvasWrapV17(ctx,text,x,y,maxWidth,lineHeight,maxLines=5){
  const words=text.split(/\s+/);let line="",lines=[];
  for(const w of words){const test=line?line+" "+w:w;if(ctx.measureText(test).width>maxWidth&&line){lines.push(line);line=w}else line=test}
  if(line)lines.push(line);lines=lines.slice(0,maxLines);
  lines.forEach((l,i)=>ctx.fillText(l,x,y+i*lineHeight));
  return y+lines.length*lineHeight;
}
async function shareReadingV17(){
  if(!drawn.length)return;
  const c=document.createElement("canvas");c.width=1080;c.height=1350;const x=c.getContext("2d");
  const g=x.createLinearGradient(0,0,0,c.height);g.addColorStop(0,"#08152a");g.addColorStop(1,"#111f38");x.fillStyle=g;x.fillRect(0,0,c.width,c.height);
  x.strokeStyle="#c8ae72";x.lineWidth=4;x.strokeRect(44,44,992,1262);
  x.fillStyle="#d9c184";x.font="700 34px Georgia";x.fillText("MORRIS CARTOMANTE",80,110);
  x.fillStyle="#f1ede5";x.font="700 58px Georgia";let y=190;y=canvasWrapV17(x,q.value.trim(),80,y,920,70,4)+24;
  x.fillStyle="#9fb0c8";x.font="28px sans-serif";x.fillText("La tua stesa",80,y);y+=55;
  x.fillStyle="#f1ede5";x.font="700 34px sans-serif";
  drawn.forEach(d=>{y=canvasWrapV17(x,d.position.label+" — "+d.card.name+(d.reversed?" (rovesciata)":""),80,y,920,45,2)+18});
  const answer=document.querySelector("#aiReadingText .answer-direct")?.innerText||document.querySelector("#aiReadingText")?.innerText||"";
  y+=20;x.fillStyle="#d9c184";x.font="700 30px Georgia";x.fillText("Responso di Morris",80,y);y+=52;
  x.fillStyle="#e3e6ec";x.font="29px sans-serif";canvasWrapV17(x,answer.replace(/\s+/g," "),80,y,920,42,9);
  x.fillStyle="#8291a8";x.font="22px sans-serif";x.fillText("morris-cartomante.onrender.com",80,1270);
  const blob=await new Promise(r=>c.toBlob(r,"image/png",.95));if(!blob)return;
  const file=new File([blob],"morris-cartomante-lettura.png",{type:"image/png"});
  if(navigator.share&&navigator.canShare?.({files:[file]})){try{await navigator.share({files:[file],title:"Morris Cartomante",text:"La mia lettura di Morris"});return}catch(e){}}
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=file.name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),2000);
}

const renderResultV17Base=renderResult;
renderResult=function(){
  q.classList.remove("secret-active-v17");
  renderResultV17Base();
  const btns=document.createElement("div");btns.className="result-actions-v17";
  btns.innerHTML='<button type="button" id="shareReadingV17">▣ Salva / condividi</button><button type="button" id="statsReadingV17">◌ Statistiche</button>';
  result.appendChild(btns);
  btns.querySelector("#shareReadingV17").addEventListener("click",shareReadingV17);
  btns.querySelector("#statsReadingV17").addEventListener("click",openStatsV17);
  if(oracleModeV17){
    const trend=localTrendV10();
    const label=trend.band==="positive"?"APERTURA":trend.band==="negative"?"CAUTELA":"SVOLTA";
    const d=drawn[0];
    result.querySelector(".deep-answer")?.insertAdjacentHTML("afterbegin",'<div class="oracle-verdict-v17">'+label+' · '+escV17(d.card.name)+(d.reversed?' ROVESCIATA':'')+'</div>');
    oracleModeV17=false;
  }
};

setTimeout(ensurePremiumUIV17,0);
