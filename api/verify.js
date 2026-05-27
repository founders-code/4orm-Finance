/* =====================================================================
   GET /api/verify?token=...
   ---------------------------------------------------------------------
   Verifies a magic-link token, then sets a 30-day signed session cookie
   (HttpOnly, Secure) and redirects into the site. Invalid or expired
   tokens bounce back to /login.html?error=expired.

   Environment variable: SESSION_SECRET (same as middleware + request-link).
   ===================================================================== */

export const config = { runtime: 'edge' };

const enc = new TextEncoder();
function b64url(buf) {
  let s = ''; const b = new Uint8Array(buf);
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function b64urlToBytes(s) {
  s = String(s || '').replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s); const b = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) b[i] = bin.charCodeAt(i);
  return b;
}
async function sign(payload, secret) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  return body + '.' + b64url(sig);
}
async function verify(token, secret) {
  if (!token || token.indexOf('.') < 0) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  try {
    const key = await crypto.subtle.importKey('raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']);
    const ok = await crypto.subtle.verify('HMAC', key, b64urlToBytes(parts[1]), enc.encode(parts[0]));
    if (!ok) return null;
    const payload = JSON.parse(new TextDecoder().decode(b64urlToBytes(parts[0])));
    if (!payload.x || Date.now() > payload.x) return null;
    return payload;
  } catch (e) { return null; }
}

function list(v) {
  return String(v || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
}
function isAdmin(email) {
  return list(process.env.ADMIN_EMAILS).indexOf(String(email || '').toLowerCase()) >= 0;
}

function redirectResp(toUrl, cookies) {
  const headers = new Headers({ 'Location': toUrl });
  (cookies || []).forEach(function (c) { headers.append('Set-Cookie', c); });
  return new Response(null, { status: 302, headers: headers });
}

export default async function handler(req) {
  const secret = process.env.SESSION_SECRET;
  const url = new URL(req.url);
  const origin = (process.env.APP_URL || url.origin).replace(/\/+$/, '');
  const token = url.searchParams.get('token');

  const payload = secret ? await verify(token, secret) : null;
  if (!payload || payload.t !== 'magic') {
    return redirectResp(origin + '/login.html?error=expired');
  }

  const session = await sign({ e: payload.e, x: Date.now() + 30 * 24 * 3600 * 1000, t: 'session' }, secret);
  const cookies = [
    /* HttpOnly session cookie used by middleware and admin APIs */
    '4orm_session=' + session +
      '; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=' + (30 * 24 * 3600)
  ];
  /* non-HttpOnly role hint so the nav can show the Admin link to admins.
     Real authorization is enforced server-side by middleware and the
     admin APIs; this cookie is only a UI affordance. */
  if (isAdmin(payload.e)) {
    cookies.push('4orm_role=admin; Path=/; Secure; SameSite=Lax; Max-Age=' + (30 * 24 * 3600));
  } else {
    cookies.push('4orm_role=; Path=/; Secure; SameSite=Lax; Max-Age=0');
  }

  // Send them to where they were headed, defaulting to the sandbox.
  let next = payload.n || '/sandbox.html';
  if (!next.startsWith('/')) next = '/' + next;
  return redirectResp(origin + next, cookies);
}
