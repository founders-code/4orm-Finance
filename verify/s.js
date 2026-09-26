const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=require('path').join(__dirname,'..','deploy');
const MIME={'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml'};
const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
let f=path.join(ROOT,p);if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f=f+'.html';
if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);s.end('nf');return;}
s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});s.end(fs.readFileSync(f));});
const ign=t=>/fonts\.(googleapis|gstatic)|ERR_TUNNEL|net::ERR_/.test(t);
(async()=>{await new Promise(r=>srv.listen(9310,r));
const b=await chromium.launch();const fail=[];
for(const [w,h,lab] of [[1440,900,'desk'],[390,844,'mob']]){
 const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});const errs=[];
 p.on('console',m=>{if(m.type()==='error'&&!ign(m.text()))errs.push(m.text())});p.on('pageerror',e=>errs.push('PE '+e.message));
 const missing=[];p.on('response',r=>{if(r.status()>=400&&!ign(r.url()))missing.push(r.status()+' '+r.url())});
 await p.goto('http://localhost:9310/',{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 const n=await p.evaluate(()=>document.querySelectorAll('#shwRail [role="tab"]').length);
 if(n!==7) fail.push(lab+': rail has '+n+' tabs');
 const seen=new Set();
 for(let i=0;i<n;i++){await p.click(`#shwtab${i}`);await p.waitForTimeout(260);
   const st=await p.evaluate(()=>({src:document.getElementById('shwImg').getAttribute('src'),alt:document.getElementById('shwImg').alt,t:document.getElementById('shwT').textContent,
     nat:document.getElementById('shwImg').naturalWidth}));
   seen.add(st.src); if(!st.alt||st.alt.length<40) fail.push(lab+': thin alt at '+i);
   if(!st.nat) fail.push(lab+': image '+i+' did not load ('+st.src+')');}
 if(seen.size!==7) fail.push(lab+': only '+seen.size+' distinct images');
 await p.focus('#shwtab0'); await p.keyboard.press('ArrowDown'); await p.waitForTimeout(200);
 if(!(await p.evaluate(()=>document.getElementById('shwtab1').getAttribute('aria-selected')==='true'))) fail.push(lab+': arrow key on rail');
 if(lab==='desk'){await p.evaluate(()=>document.querySelector('#screens').scrollIntoView({block:'start'}));await p.waitForTimeout(600);
   await p.screenshot({path:'./screens.png'});}
 await p.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight*.4){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}await new Promise(r=>setTimeout(r,500));});
 const o=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,
   unrev:[...document.querySelectorAll('.rv')].filter(e=>e.offsetParent!==null&&!e.classList.contains('in')).length,
   small:[...document.querySelectorAll('.front a,.front button')].filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return r.width<24||r.height<24?e.className+' '+Math.round(r.width)+'x'+Math.round(r.height):null}).filter(Boolean)}));
 if(o.ov>0)fail.push(lab+': overflow '+o.ov); if(o.unrev)fail.push(lab+': unrevealed '+o.unrev);
 if(o.small.length)fail.push(lab+': small '+o.small);
 if(missing.length)fail.push(lab+': 404s '+missing.slice(0,3));
 if(errs.length)fail.push(lab+': '+errs.join('|'));
 if(lab==='mob'){await p.evaluate(()=>document.querySelector('#screens').scrollIntoView({block:'start'}));await p.waitForTimeout(500);await p.screenshot({path:'./screens-m.png'});}
 await p.close();}
await b.close();srv.close();console.log(fail.length?'FAIL\n  '+fail.join('\n  '):'SCREENS PASS');})();
