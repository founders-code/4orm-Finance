const { chromium } = require('playwright');
const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=require('path').join(__dirname,'..','deploy');
const MIME={'.html':'text/html','.css':'text/css','.js':'application/javascript','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.svg':'image/svg+xml'};
const srv=http.createServer((q,s)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p==='/')p='/index.html';
let f=path.join(ROOT,p);if(!fs.existsSync(f)&&fs.existsSync(f+'.html'))f=f+'.html';
if(fs.existsSync(f)&&fs.statSync(f).isDirectory()&&fs.existsSync(path.join(f,'index.html')))f=path.join(f,'index.html');
if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){s.writeHead(404);s.end('nf');return;}
s.writeHead(200,{'Content-Type':MIME[path.extname(f)]||'text/plain'});s.end(fs.readFileSync(f));});
const ign=t=>/fonts\.(googleapis|gstatic)|ERR_TUNNEL|ERR_PROXY|net::ERR/.test(t);
(async()=>{await new Promise(r=>srv.listen(9301,r));
const b=await chromium.launch(); const fail=[];
for (const [w,h,lab,red] of [[1440,900,'desk',false],[390,844,'mob',false],[1440,900,'reduced',true]]){
  const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:red?'reduce':'no-preference',deviceScaleFactor:lab==='desk'?2:2});
  const p=await ctx.newPage(); const errs=[];
  p.on('console',m=>{if(m.type()==='error'&&!ign(m.text()))errs.push(m.text())}); p.on('pageerror',e=>errs.push('PE '+e.message));
  await p.goto('http://localhost:9301/',{waitUntil:'domcontentloaded'}); await p.waitForTimeout(1500);
  if(lab==='desk') await p.screenshot({path:'./hero.png'});
  // sector seg
  for (const k of ['ins','inv','work','mtg']){ await p.click(`[data-seg="ch"] button[data-key="${k}"]`); await p.waitForTimeout(150);
    const on=await p.evaluate(k=>document.querySelector(`[data-swap="ch"][data-key="${k}"]`).classList.contains('on'),k);
    if(!on) fail.push(lab+': sector '+k+' did not show'); }
  // record
  await p.click('#recChange'); const pre=await p.textContent('#recK');
  await p.click('#recWalk'); await p.waitForTimeout(red?300:7600);
  await p.click('#recChange'); await p.waitForTimeout(red?300:7600);
  const st=await p.evaluate(()=>({k:document.querySelector('#recK').textContent,n:document.querySelectorAll('#recLog li').length,
     old:document.querySelectorAll('#recLog li.old').length,chg:document.querySelectorAll('#recLog li.chg').length,
     last:document.querySelector('#rsteps li.last').className}));
  if(st.n!==13||st.old!==1||st.chg!==1) fail.push(lab+': record state '+JSON.stringify(st));
  if(lab==='desk'){ await p.evaluate(()=>document.querySelector('#rec').scrollIntoView({block:'center'})); await p.waitForTimeout(500); await p.screenshot({path:'./rec.png'}); }
  await p.click('#recReset'); 
  // scroll all
  await p.evaluate(async()=>{document.documentElement.style.scrollBehavior='auto';for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight*.4){scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}await new Promise(r=>setTimeout(r,400));});
  const o=await p.evaluate(()=>({ov:document.documentElement.scrollWidth-document.documentElement.clientWidth,
    unrev:[...document.querySelectorAll('.rv')].filter(e=>e.offsetParent!==null&&!e.classList.contains('in')).length,
    h1:document.querySelectorAll('h1').length, bcin:(document.querySelector('#bcin')||{}).textContent,
    small:[...document.querySelectorAll('.front a,.front button')].filter(e=>e.offsetParent!==null).map(e=>{const r=e.getBoundingClientRect();return r.width<24||r.height<24?(e.className||e.tagName)+' '+Math.round(r.width)+'x'+Math.round(r.height):null}).filter(Boolean)}));
  if(o.ov>0) fail.push(lab+': overflow '+o.ov); if(o.unrev) fail.push(lab+': unrevealed '+o.unrev);
  if(o.h1!==1) fail.push(lab+': h1 x'+o.h1); if(o.small.length) fail.push(lab+': small '+o.small);
  const snap=await p.accessibility.snapshot(); const find=n=>{if(n.role==='heading'&&n.level===1)return n;for(const c of n.children||[]){const r=find(c);if(r)return r;}};
  const hn=find(snap); 
  console.log(lab,'| h1:',hn&&hn.name,'| pre-walk change says:',pre,'| bc:',o.bcin,'| record:',JSON.stringify(st));
  if(errs.length) fail.push(lab+': errors '+errs.join(' | '));
  // phone experience still opens
  await p.evaluate(()=>scrollTo(0,0)); await p.goto('http://localhost:9301/#personal'); await p.waitForTimeout(1600);
  const dest=await p.evaluate(()=>document.getElementById('d-you').classList.contains('on'));
  if(!dest) fail.push(lab+': #personal did not open the phone');
  if(lab==='mob'){ await p.goto('http://localhost:9301/'); await p.waitForTimeout(1500); await p.screenshot({path:'./mob.png'}); }
  await ctx.close();
}
await b.close(); srv.close();
console.log(fail.length?'FAIL\n  '+fail.join('\n  '):'ALL PASS');})();
