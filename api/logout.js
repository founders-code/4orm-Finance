/* =====================================================================
   GET /api/logout
   Clears the session cookie and returns to the login page.
   ===================================================================== */

export const config = { runtime: 'edge' };

export default async function handler(req) {
  const origin = (process.env.APP_URL || new URL(req.url).origin).replace(/\/+$/, '');
  return new Response(null, {
    status: 302,
    headers: {
      'Location': origin + '/login.html',
      'Set-Cookie': '4orm_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0'
    }
  });
}
