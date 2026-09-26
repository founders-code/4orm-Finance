const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=require('path').join(__dirname,'..','deploy');
const MIME={'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.xml':'application/xml','.txt':'text/plain'};
const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
let f=path.join(ROOT,p);if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f=f+'.html';
if(fs.existsSync(f)&&fs.statSync(f).isDirectory()&&fs.existsSync(path.join(f,'index.html')))f=path.join(f,'index.html');
if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);s.end('nf');return;}
s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});s.end(fs.readFileSync(f));});
const PAGES=['/','/personal','/professional','/how-it-works','/why-4orm','/the-standard','/check-a-firm','/research','/contact','/team','/privacy','/terms','/website-privacy','/intelligence','/industries','/industries/mortgage','/industries/auto','/industries/insurance','/industries/investing','/industries/banking','/industries/lending','/industries/real-estate'];
(async()=>{await new Promise(r=>srv.listen(9333,r));
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});
const bad=[],miss=[];
for(const u of PAGES){const r=await p.goto('http://localhost:9333'+u,{waitUntil:'domcontentloaded'});
 if(!r||r.status()>=400){bad.push(u+' '+(r&&r.status()));continue;}
 await p.waitForTimeout(400);
 const t=await p.evaluate(()=>{const e=document.querySelector('.ftri,.ftri2');return e?e.textContent.replace(/\s+/g,' ').trim():null;});
 if(t!=='People · Trust · Clear outcomes') miss.push(u+' -> '+JSON.stringify(t));
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
 if(ov>0) bad.push(u+' overflow '+ov);
}
console.log('pages checked:',PAGES.length);
console.log(miss.length?'MISSING LINE:\n  '+miss.join('\n  '):'line present on every page');
console.log(bad.length?'ISSUES: '+bad.join(', '):'no page issues');
await b.close();srv.close();})();
