import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
http.createServer((req,res)=>{
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  const file = path.resolve(root, '.' + (pathname === '/' ? '/index.html' : pathname));
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(error,data)=>{
    if(error) {res.writeHead(404).end();return;}
    res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.css':'text/css','.jpg':'image/jpeg','.png':'image/png'})[path.extname(file)] || 'application/octet-stream');
    res.end(data);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173'));
