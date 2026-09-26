const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=require('path').join(__dirname,'..','deploy');
const MIME={'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml'};
const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
let f=path.join(ROOT,p);if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f=f+'.html';
if(fs.existsSync(f)&&fs.statSync(f).isDirectory()&&fs.existsSync(path.join(f,'index.html')))f=path.join(f,'index.html');
if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);s.end('nf');return;}
s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});s.end(fs.readFileSync(f));});
(async()=>{await new Promise(r=>srv.listen(9302,r));
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
await p.goto('http://localhost:9302/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1200);
await p.evaluate(()=>{document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))});
await p.waitForTimeout(900);
const H=await p.evaluate(()=>document.documentElement.scrollHeight);
for(let i=0,y=0;y<H;i++,y+=2200){await p.screenshot({path:`./full${i}.png`,clip:{x:0,y,width:1440,height:Math.min(2200,H-y)},fullPage:true});}
console.log('height',H);
// site regression: all pages overflow + links
const PAGES=['/','/personal','/professional','/how-it-works','/why-4orm','/the-standard','/check-a-firm','/research','/contact','/team','/privacy','/terms','/intelligence','/industries','/industries/mortgage'];
const bad=[],links=new Set();
for(const w of [1440,390]){const q=await b.newPage({viewport:{width:w,height:900}});const errs=[];q.on('pageerror',e=>errs.push(e.message));
 for(const u of PAGES){const r=await q.goto('http://localhost:9302'+u,{waitUntil:'domcontentloaded'});if(!r||r.status()>=400){bad.push(u+' '+(r&&r.status()));continue;}
  await q.waitForTimeout(500);const o=await q.evaluate(()=>({ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,h:[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}));
  if(o.ov>0)bad.push(w+u+' overflow '+o.ov); o.h.forEach(h=>{if(h.startsWith('/'))links.add(h.split('#')[0]||'/')});}
 if(errs.length)bad.push(w+' errors '+errs.join('|'));await q.close();}
const q=await b.newPage();for(const l of links){const r=await q.goto('http://localhost:9302'+l).catch(()=>null);if(!r||r.status()>=400)bad.push('broken '+l);}
console.log(bad.length?'ISSUES '+bad.join('\n'):'SITE OK '+PAGES.length+' pages, '+links.size+' links');
await b.close();srv.close();})();
