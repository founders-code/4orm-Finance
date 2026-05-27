/* =====================================================================
   POST /api/admin/add  { kind: 'email'|'domain', value }
   Adds an entry to the KV allow-list. Admin only.
   ===================================================================== */

export const config = { runtime: 'edge' };

const enc = new TextEncoder();
function b64urlToBytes(s){ s=String(s||'').replace(/-/g,'+').replace(/_/g,'/'); while(s.length%4)s+='='; const b=atob(s); const u=new Uint8Array(b.length); for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i); return u; }
async function verify(token, secret){
  if(!token || token.indexOf('.')<0) return null;
  const [body,sig] = token.split('.');
  try {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret), {name:'HMAC',hash:'SHA-256'}, false, ['verify']);
    const ok = await crypto.subtle.verify('HMAC', key, b64urlToBytes(sig), enc.encode(body));
    if(!ok) return null;
    const p = JSON.parse(new TextDecoder().decode(b64urlToBytes(body)));
    if(!p.x || Date.now()>p.x) return null;
    if(p.t!=='session') return null;
    return p;
  } catch(e){ return null; }
}
function readCookie(req, name){
  const raw = req.headers.get('cookie') || '';
  const m = raw.match(new RegExp('(?:^|;\\s*)'+name+'=([^;]+)'));
  return m ? decodeURIComponent(m[1]) : '';
}
function list(v){ return String(v||'').split(',').map(s=>s.trim().toLowerCase()).filter(Boolean); }
function isAdmin(email){ return list(process.env.ADMIN_EMAILS).indexOf(String(email||'').toLowerCase()) >= 0; }
function json(o, status){ return new Response(JSON.stringify(o), { status: status||200, headers: { 'Content-Type':'application/json' } }); }

async function kv(cmd){
  const url = process.env.KV_REST_API_URL;
  const tok = process.env.KV_REST_API_TOKEN;
  if(!url || !tok) return { error: 'kv_not_configured' };
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer '+tok, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  return r.json().catch(()=>({}));
}

export default async function handler(req){
  if(req.method !== 'POST') return json({ error:'method_not_allowed' }, 405);
  const secret = process.env.SESSION_SECRET;
  if(!secret) return json({ error: 'server_not_configured' }, 500);
  const session = await verify(readCookie(req,'4orm_session'), secret);
  if(!session) return json({ error: 'unauthenticated' }, 401);
  if(!isAdmin(session.e)) return json({ error: 'not_admin' }, 403);

  let body = {};
  try { body = await req.json(); } catch(e) {}
  const kind = body.kind === 'domain' ? 'domain' : 'email';
  const value = String(body.value||'').trim().toLowerCase();

  if(kind === 'email'){
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) return json({ error: 'invalid_email' }, 400);
  } else {
    if(!/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(value)) return json({ error: 'invalid_domain' }, 400);
  }

  const key = kind === 'email' ? 'allowlist:emails' : 'allowlist:domains';
  const r = await kv(['SADD', key, value]);
  if(r.error) return json({ error: r.error }, 500);
  return json({ ok: true, added: value, kind: kind });
}
