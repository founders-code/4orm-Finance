/* =====================================================================
   GET /api/admin/list
   Returns the current allow-list (emails, domains) from Vercel KV plus the
   read-only env-var fallback. Requires an admin session.

   Response: { kv: { emails: [...], domains: [...] },
               envFallback: { emails: [...], domains: [...] },
               kvConfigured: boolean }
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
  if(!url || !tok) return { configured: false, error: 'kv_not_configured' };
  const r = await fetch(url, {
    method: 'POST',
    headers: { Authorization: 'Bearer '+tok, 'Content-Type': 'application/json' },
    body: JSON.stringify(cmd)
  });
  const data = await r.json().catch(()=>({}));
  return { configured: true, ...data };
}

export default async function handler(req){
  const secret = process.env.SESSION_SECRET;
  if(!secret) return json({ error: 'server_not_configured' }, 500);
  const session = await verify(readCookie(req,'4orm_session'), secret);
  if(!session) return json({ error: 'unauthenticated' }, 401);
  if(!isAdmin(session.e)) return json({ error: 'not_admin' }, 403);

  const emailsResp = await kv(['SMEMBERS','allowlist:emails']);
  const domainsResp = await kv(['SMEMBERS','allowlist:domains']);
  const kvConfigured = emailsResp.configured !== false;

  return json({
    kvConfigured: kvConfigured,
    kv: {
      emails: Array.isArray(emailsResp.result) ? emailsResp.result.sort() : [],
      domains: Array.isArray(domainsResp.result) ? domainsResp.result.sort() : []
    },
    envFallback: {
      emails: list(process.env.ALLOWED_EMAILS),
      domains: list(process.env.ALLOWED_DOMAINS)
    },
    you: session.e
  });
}
