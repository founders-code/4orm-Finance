/* =====================================================================
   POST /api/request-link   { email, next }
   ---------------------------------------------------------------------
   Checks the email against your approved allow-list. If approved, signs a
   short-lived magic-link token and emails a one-time sign-in link via
   Resend. Returns { allowed: true|false }.

   Environment variables:
     SESSION_SECRET   long random string (also used by middleware + verify)
     ALLOWED_EMAILS   comma-separated approved emails (e.g. a@x.ca,b@y.ca)
     ALLOWED_DOMAINS  optional comma-separated approved domains (e.g. atb.com)
     RESEND_API_KEY   Resend API key (https://resend.com)
     MAGIC_FROM       verified sender, e.g. "4orm Finance <login@yourdomain>"
     APP_URL          your site origin, e.g. https://demo.yourdomain.com
   ===================================================================== */

export const config = { runtime: 'edge' };

const enc = new TextEncoder();
function b64url(buf) {
  let s = '';
  const b = new Uint8Array(buf);
  for (let i = 0; i < b.length; i++) s += String.fromCharCode(b[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
async function sign(payload, secret) {
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const key = await crypto.subtle.importKey('raw', enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(body));
  return body + '.' + b64url(sig);
}
function list(v) {
  return String(v || '').split(',').map(function (s) { return s.trim().toLowerCase(); }).filter(Boolean);
}
/* Vercel KV / Upstash REST helper. Returns null if KV is not configured. */
async function kv(cmd) {
  const url = process.env.KV_REST_API_URL;
  const tok = process.env.KV_REST_API_TOKEN;
  if (!url || !tok) return null;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json' },
      body: JSON.stringify(cmd)
    });
    return await r.json();
  } catch (e) { return null; }
}
/* Approved if KV says so OR env-var fallback says so. Lets the admin page be
   the source of truth while keeping env vars as a bootstrap and disaster
   fallback. */
async function isAllowed(email) {
  const dom = email.split('@')[1] || '';
  /* KV check */
  const inEmails = await kv(['SISMEMBER', 'allowlist:emails', email]);
  if (inEmails && inEmails.result === 1) return true;
  if (dom) {
    const inDomains = await kv(['SISMEMBER', 'allowlist:domains', dom]);
    if (inDomains && inDomains.result === 1) return true;
  }
  /* env fallback */
  const emails = list(process.env.ALLOWED_EMAILS);
  const domains = list(process.env.ALLOWED_DOMAINS);
  if (emails.indexOf(email) >= 0) return true;
  if (dom && domains.indexOf(dom) >= 0) return true;
  return false;
}
function json(obj, status) {
  return new Response(JSON.stringify(obj), {
    status: status || 200, headers: { 'Content-Type': 'application/json' }
  });
}

async function sendMagicEmail(email, link) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.MAGIC_FROM || '4orm Finance <onboarding@resend.dev>';
  if (!key) return; // no key configured; link still works if testing, but email will not send
  const html =
    '<div style="font-family:Inter,Arial,sans-serif;max-width:480px;margin:auto;color:#142036">' +
    '<h2 style="color:#15233F">Your 4orm Finance sign-in link</h2>' +
    '<p>Click the button below to sign in. This link is valid for 15 minutes and can be used once.</p>' +
    '<p style="margin:24px 0"><a href="' + link + '" style="background:#2E6BF2;color:#fff;text-decoration:none;' +
    'padding:12px 22px;border-radius:8px;font-weight:700;display:inline-block">Sign in to 4orm Finance</a></p>' +
    '<p style="font-size:13px;color:#5b6b85">If the button does not work, paste this link into your browser:<br>' + link + '</p>' +
    '<p style="font-size:12px;color:#8a97ad">If you did not request this, you can ignore this email.</p></div>';
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': 'Bearer ' + key, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: from, to: [email], subject: 'Your 4orm Finance sign-in link', html: html })
  });
}

export default async function handler(req) {
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);
  const secret = process.env.SESSION_SECRET;
  if (!secret) return json({ error: 'server_not_configured' }, 500);

  let data = {};
  try { data = await req.json(); } catch (e) { data = {}; }
  const email = String(data.email || '').trim().toLowerCase();
  const next = String(data.next || '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: 'invalid_email' }, 400);

  if (!isAllowed(email)) return json({ allowed: false });

  const token = await sign({ e: email, x: Date.now() + 15 * 60 * 1000, t: 'magic', n: next }, secret);
  const base = process.env.APP_URL || new URL(req.url).origin;
  const link = base.replace(/\/+$/, '') + '/api/verify?token=' + encodeURIComponent(token);
  try { await sendMagicEmail(email, link); } catch (e) { /* swallow; still report allowed */ }

  return json({ allowed: true });
}
