import http from "node:http";

const PORT=process.env.PORT||10000;
const ORIGIN=process.env.ALLOWED_ORIGIN||"https://morris-cartomante.onrender.com";
const MODEL=process.env.OPENAI_MODEL||"gpt-5.6-luna";

function json(res,status,data,origin=ORIGIN){
  res.writeHead(status,{
    "content-type":"application/json; charset=utf-8",
    "access-control-allow-origin":origin,
    "access-control-allow-methods":"POST,OPTIONS,GET",
    "access-control-allow-headers":"content-type",
    "cache-control":"no-store"
  });
  res.end(JSON.stringify(data));
}
function extractText(data){
  if(typeof data?.output_text==="string") return data.output_text;
  const parts=[];
  for(const item of data?.output||[]){
    for(const c of item?.content||[]){
      if(c?.type==="output_text" && c?.text) parts.push(c.text);
      else if(typeof c?.text==="string") parts.push(c.text);
    }
  }
  return parts.join("\n").trim();
}
function makePrompt(body){
  const cards=(body.cards||[]).map((x,i)=>
    (i+1)+". "+x.position+": "+x.name+" — "+(x.reversed?"ROVESCIATA":"DRITTA")+
    ". Significato-base: "+x.meaning+
    (x.suit?(". Seme: "+x.suit+"."):"")+
    (x.arcana?(" Arcano: "+x.arcana+"."):"")
  ).join("\n");

  return `DOMANDA DEL CONSULTANTE:
"${body.question}"

STESA: ${body.spreadName||"Tarocchi"}
CARTE:
${cards}

ISTRUZIONI:
Rispondi ESATTAMENTE alla domanda sopra. Non cambiare argomento e non rifugiarti in formule generiche.
Leggi le carte come un insieme: posizione, orientamento, ripetizioni, Arcani Maggiori, semi dominanti, contrasti e progressione della stesa.
Se la domanda ha più parti, rispondi a ogni parte separatamente.
Apri con un responso diretto di 2-4 frasi, poi spiega perché carta per carta e infine fai una sintesi complessiva.
Usa il nome "Morris" come voce del cartomante solo occasionalmente, senza trasformare tutto in una gag.
Tono: cartomante esperto, caldo, suggestivo, concreto, adulto, naturale. Italiano fluido. Niente gergo tecnico da AI.
Non dire "in generale", "quadro equilibrato", "esito condizionato" senza spiegare concretamente COSA significa per questa domanda.
Non inventare fatti esterni alle carte e alla domanda.
Non dichiarare certezze soprannaturali o prove fattuali. Per salute, legge, finanza o accuse di tradimento/crimine, chiarisci brevemente i limiti e resta su una lettura simbolica.
Lunghezza: circa 450-750 parole per Croce Celtica; 250-450 per tre carte; 150-300 per una carta.
Usa paragrafi, non tabelle. Niente markdown con titoli enormi. Puoi usare grassetto leggero.
`;
}

const server=http.createServer(async(req,res)=>{
  const origin=req.headers.origin||ORIGIN;
  if(req.method==="OPTIONS") return json(res,204,{},origin===ORIGIN?ORIGIN:"null");
  if(req.url==="/health"&&req.method==="GET"){
    return json(res,200,{ok:true,aiConfigured:Boolean(process.env.OPENAI_API_KEY),model:MODEL});
  }
  if(req.url!=="/read"||req.method!=="POST") return json(res,404,{error:"not_found"});

  if(origin!==ORIGIN) return json(res,403,{error:"origin_not_allowed"},"null");
  if(!process.env.OPENAI_API_KEY) return json(res,503,{error:"ai_not_configured"});

  let body="";
  req.on("data",c=>{body+=c;if(body.length>50000)req.destroy()});
  req.on("end",async()=>{
    try{
      const payload=JSON.parse(body||"{}");
      if(!payload.question||!Array.isArray(payload.cards)||!payload.cards.length){
        return json(res,400,{error:"invalid_request"});
      }

      const ai=await fetch("https://api.openai.com/v1/responses",{
        method:"POST",
        headers:{
          "authorization":"Bearer "+process.env.OPENAI_API_KEY,
          "content-type":"application/json"
        },
        body:JSON.stringify({
          model:MODEL,
          reasoning:{effort:"low"},
          instructions:"Sei Morris Cartomante, un interprete esperto di tarocchi Rider-Waite-Smith. Devi leggere davvero la domanda e rispondere ad essa usando esclusivamente le carte fornite e la loro posizione. Scrivi in italiano.",
          input:makePrompt(payload),
          max_output_tokens:1800
        })
      });
      const data=await ai.json();
      if(!ai.ok){
        console.error("OpenAI error",ai.status,data?.error?.message||data);
        return json(res,502,{error:"ai_provider_error"});
      }
      const reading=extractText(data);
      if(!reading) return json(res,502,{error:"empty_ai_response"});
      return json(res,200,{reading,model:MODEL});
    }catch(err){
      console.error(err);
      return json(res,500,{error:"server_error"});
    }
  });
});
server.listen(PORT,()=>console.log("Morris AI listening on",PORT));
