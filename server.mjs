import https from 'node:https';
import http from 'node:http';
import {readFileSync} from 'node:fs';
import {resolve,dirname,extname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {homedir} from 'node:os';
const root=dirname(fileURLToPath(import.meta.url));
const certs=process.env.SLIDE_TOOLS_CERT_DIR||resolve(homedir(),'.office-addin-dev-certs');
const allowed=new Set(['index.html','app.js','geometry.js','style.css','shortcuts.json','icon.png','install.html','manifest.xml','support.html','privacy.html','terms.html',...([16,20,24,32,40,48,64,80,96,300].map(size=>`icons/icon-${size}.png`))]);
const handler=(req,res)=>{
 const name=new URL(req.url,'https://localhost:3443').pathname.slice(1)||'index.html';
 if(!allowed.has(name)){res.writeHead(404);res.end('Not found');return;}
 try{res.writeHead(200,{'Content-Type':{'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.xml':'application/xml'}[extname(name)],...(name==='manifest.xml'?{'Content-Disposition':'attachment; filename="slide-tools.xml"'}:{}),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'});res.end(readFileSync(resolve(root,name)));}catch{res.writeHead(500);res.end('Unable to read asset');}
};
const hosted=Boolean(process.env.PORT);
const port=hosted?Number(process.env.PORT):3443;
const server=hosted?http.createServer(handler):https.createServer({key:readFileSync(resolve(certs,'localhost.key')),cert:readFileSync(resolve(certs,'localhost.crt'))},handler);
server.listen(port,hosted?'0.0.0.0':'127.0.0.1',()=>console.log(`Slide Tools listening on ${port}`));

