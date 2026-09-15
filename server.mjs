import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = Number(process.env.PORT || 8080);
const API_KEY = process.env.STABILITY_API_KEY || '';
const DEFAULT_MODEL = process.env.PHOTO360_DEFAULT_MODEL === 'fast3d' ? 'fast3d' : 'spar3d';
const MAX_JSON_BYTES = 16 * 1024 * 1024;

const mime = new Map([
  ['.html','text/html; charset=utf-8'],
  ['.js','text/javascript; charset=utf-8'],
  ['.css','text/css; charset=utf-8'],
  ['.json','application/json; charset=utf-8'],
  ['.webmanifest','application/manifest+json; charset=utf-8'],
  ['.png','image/png'],['.jpg','image/jpeg'],['.jpeg','image/jpeg'],['.webp','image/webp'],
  ['.svg','image/svg+xml'],['.glb','model/gltf-binary'],['.ico','image/x-icon']
]);

function sendJson(res, status, obj) {
  const body = Buffer.from(JSON.stringify(obj));
  res.writeHead(status, {
    'content-type':'application/json; charset=utf-8',
    'content-length': body.length,
    'cache-control':'no-store'
  });
  res.end(body);
}

async function readJson(req) {
  const chunks=[];
  let total=0;
  for await (const chunk of req) {
    total += chunk.length;
    if (total > MAX_JSON_BYTES) throw Object.assign(new Error('Immagine troppo grande.'), {status:413});
    chunks.push(chunk);
  }
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8')); }
  catch { throw Object.assign(new Error('Richiesta JSON non valida.'), {status:400}); }
}

function decodeDataUrl(dataUrl) {
  const m = /^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/.exec(dataUrl || '');
  if (!m) throw Object.assign(new Error('Formato immagine non supportato. Usa JPEG, PNG o WebP.'), {status:400});
  const buffer = Buffer.from(m[2], 'base64');
  if (!buffer.length || buffer.length > 10 * 1024 * 1024) {
    throw Object.assign(new Error('L’immagine deve essere inferiore a 10 MB.'), {status:413});
  }
  const ext = m[1].split('/')[1].replace('jpeg','jpg');
  return { buffer, mimeType:m[1], filename:`photo360-input.${ext}` };
}

function modelEndpoint(model) {
  return model === 'fast3d'
    ? 'https://api.stability.ai/v2beta/3d/stable-fast-3d'
    : 'https://api.stability.ai/v2beta/3d/stable-point-aware-3d';
}

async function generate3D({ imageDataUrl, model, textureResolution, foregroundRatio }) {
  if (!API_KEY) throw Object.assign(new Error('STABILITY_API_KEY non configurata sul server.'), {status:503, code:'NO_API_KEY'});

  const chosen = model === 'fast3d' ? 'fast3d' : 'spar3d';
  const {buffer,mimeType,filename} = decodeDataUrl(imageDataUrl);
  const form = new FormData();
  form.append('image', new Blob([buffer], {type:mimeType}), filename);

  if (chosen === 'fast3d') {
    const texture = ['512','1024','2048'].includes(String(textureResolution)) ? String(textureResolution) : '1024';
    const ratio = Math.min(1, Math.max(0.1, Number(foregroundRatio) || 0.85));
    form.append('texture_resolution', texture);
    form.append('foreground_ratio', String(ratio));
  } else {
    form.append('texture_resolution', ['512','1024','2048'].includes(String(textureResolution)) ? String(textureResolution) : '1024');
    form.append('guidance_scale', '3');
    form.append('target_type', 'none');
  }

  const upstream = await fetch(modelEndpoint(chosen), {
    method:'POST',
    headers:{ Authorization:`Bearer ${API_KEY}` },
    body:form
  });

  if (!upstream.ok) {
    const text = await upstream.text();
    let detail = text;
    try {
      const parsed = JSON.parse(text);
      detail = Array.isArray(parsed.errors) ? parsed.errors.join(' ') : (parsed.message || parsed.name || text);
    } catch {}
    const e = new Error(detail || `Errore Stability AI ${upstream.status}`);
    e.status = upstream.status;
    e.upstream = true;
    throw e;
  }

  const arr = await upstream.arrayBuffer();
  if (arr.byteLength < 100) throw Object.assign(new Error('Il modello 3D restituito è vuoto.'), {status:502});
  return { buffer:Buffer.from(arr), model:chosen };
}

async function serveStatic(req,res) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, `http://${req.headers.host || 'localhost'}`).pathname); }
  catch { pathname='/'; }
  if (pathname === '/') pathname='/index.html';
  const requested = path.normalize(path.join(PUBLIC_DIR, pathname));
  if (!requested.startsWith(PUBLIC_DIR)) return sendJson(res,403,{error:'Percorso non valido.'});
  try {
    const data=await fs.readFile(requested);
    const ext=path.extname(requested).toLowerCase();
    const cache = ['.html','.js','.css','.webmanifest'].includes(ext) ? 'no-cache' : 'public, max-age=86400';
    res.writeHead(200, {'content-type':mime.get(ext)||'application/octet-stream','content-length':data.length,'cache-control':cache});
    res.end(data);
  } catch {
    if (!path.extname(pathname)) {
      try {
        const data=await fs.readFile(path.join(PUBLIC_DIR,'index.html'));
        res.writeHead(200, {'content-type':'text/html; charset=utf-8','cache-control':'no-cache'});
        return res.end(data);
      } catch {}
    }
    sendJson(res,404,{error:'Non trovato.'});
  }
}

const server=http.createServer(async (req,res)=>{
  try {
    const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    if (req.method==='GET' && url.pathname==='/api/health') {
      return sendJson(res,200,{ok:true,apiConfigured:Boolean(API_KEY),defaultModel:DEFAULT_MODEL});
    }
    if (req.method==='POST' && url.pathname==='/api/generate3d') {
      const body=await readJson(req);
      const result=await generate3D({
        imageDataUrl:body.imageDataUrl,
        model:body.model || DEFAULT_MODEL,
        textureResolution:body.textureResolution,
        foregroundRatio:body.foregroundRatio
      });
      res.writeHead(200, {
        'content-type':'model/gltf-binary',
        'content-disposition':'attachment; filename="photo360.glb"',
        'content-length':result.buffer.length,
        'x-photo360-model':result.model,
        'cache-control':'no-store'
      });
      return res.end(result.buffer);
    }
    if (req.method==='GET' && url.pathname==='/api/demo-model') {
      const data=await fs.readFile(path.join(PUBLIC_DIR,'demo.glb'));
      res.writeHead(200,{'content-type':'model/gltf-binary','content-length':data.length,'cache-control':'public, max-age=86400'});
      return res.end(data);
    }
    return serveStatic(req,res);
  } catch (err) {
    const status = Number(err.status) || 500;
    const safe = err.code === 'NO_API_KEY' ? err.message : (status >= 500 && !err.upstream ? 'Errore interno del server.' : err.message);
    sendJson(res,status,{error:safe,code:err.code || undefined});
  }
});

server.listen(PORT,'0.0.0.0',()=>{
  console.log(`Photo360 AI: http://localhost:${PORT}`);
  console.log(API_KEY ? 'Stability AI: configurata' : 'Stability AI: manca STABILITY_API_KEY');
});
