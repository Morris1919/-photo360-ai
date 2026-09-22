import express from "express";
import path from "path";
import {fileURLToPath} from "url";
const app=express();
const __dirname=path.dirname(fileURLToPath(import.meta.url));
app.use((req,res,next)=>{
  res.setHeader("Cross-Origin-Opener-Policy","same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy","require-corp");
  res.setHeader("Cross-Origin-Resource-Policy","cross-origin");
  next();
});
app.use(express.static(path.join(__dirname,"dist"),{setHeaders:(res)=>res.setHeader("Cache-Control","public, max-age=3600")}));
app.use((req,res)=>res.sendFile(path.join(__dirname,"dist","index.html")));
app.listen(process.env.PORT||3000,"0.0.0.0");