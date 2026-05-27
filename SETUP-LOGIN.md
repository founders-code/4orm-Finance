# 4orm Finance: hard login gate setup (Vercel)

> **GATE IS CURRENTLY DISABLED.** The middleware file has been renamed to
> `middleware.js.disabled` so Vercel does not load it. Every page is
> publicly reachable until you turn it back on. To re-enable the gate:
>
> 1. Rename `middleware.js.disabled` back to `middleware.js`.
> 2. Make sure all of steps 1 to 5 below have been done in Vercel
>    (`SESSION_SECRET`, `ALLOWED_EMAILS`, `ADMIN_EMAILS`, Resend keys, KV).
> 3. Redeploy. The gate engages immediately.
>
> Everything else (login.html, /admin.html, /api/...) is still in the
> codebase and ready; only the edge middleware that enforces sign-in is
> turned off.

This site ships with a true server-side access gate: every page except the
Overview is blocked at the edge unless the visitor has a valid signed
session cookie obtained through a magic-link sign-in. Approved emails (and
optionally approved domains) are managed as Vercel environment variables.

There is **nothing to deploy by hand other than environment variables and a
sender email**. The code is already in the repo:

- `login.html` — the sign-in page
- `middleware.js` — the edge gate that protects every non-public path
- `api/request-link.js` — checks the allow-list and emails the magic link
- `api/verify.js` — verifies the link, sets the session + role cookies, redirects
- `api/logout.js` — clears the session cookie
- `admin.html` — admin-only page to manage the allow-list from the browser
- `api/admin/list.js`, `api/admin/add.js`, `api/admin/remove.js` — back the admin page
  (all check the session AND require the signed-in email to be in `ADMIN_EMAILS`)

The allow-list lives in **two places** and the system unions them:
1. **Vercel KV** (Upstash Redis) — the editable, live source of truth. You add
   and remove emails through `/admin.html` and changes take effect instantly.
2. **`ALLOWED_EMAILS` env var** — a read-only bootstrap fallback. Useful for
   getting the first admin in before KV is connected, and as a disaster
   fallback if KV is ever unreachable.

## 1. Generate a session secret

Pick a long, random string. Any of these work:

```
openssl rand -hex 48
# or in Node:
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Keep this value secret. It signs both the magic links and the session
cookies; if it leaks, rotate it.

## 2. Set up an email sender (Resend)

The shipped code uses [Resend](https://resend.com) because the API is one
fetch. The free tier is enough for low-volume invites.

1. Create a Resend account.
2. Add and verify your domain (e.g. `kcs-capital.com`). You will create a
   couple of DNS records in your DNS host.
3. In Resend, create an API key. Copy the value.
4. Decide on a sender address like `login@kcs-capital.com` or
   `no-reply@kcs-capital.com`.

If you would rather use Postmark, SendGrid, or AWS SES, swap the
`sendMagicEmail` function in `api/request-link.js` for the equivalent
provider call. The rest of the gate is unchanged.

## 3. Connect Vercel KV (the live allow-list store)

This is the database that backs the admin page so you can add/remove emails
from your browser without ever touching env vars.

1. In your Vercel project: **Storage → Create Database → KV**.
2. Pick a region close to your other Vercel resources, give it a name like
   `4orm-allowlist`, click **Create**.
3. On the database page, click **Connect Project** and select your project.
4. Vercel automatically adds the KV env vars to your project
   (`KV_REST_API_URL`, `KV_REST_API_TOKEN`, plus a couple of others). You do
   not need to copy these by hand.

If you skip this step, the site still works using only the env-var
fallback in step 4, but the admin page will show a warning and additions
will fail until KV is connected.

## 4. Set the Vercel environment variables

In your Vercel project: **Settings → Environment Variables**. Add these to
**Production** (and Preview if you want previews gated):

| Name              | Value to paste                                                                                                                                                                |
|-------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `SESSION_SECRET`  | the long random string from step 1                                                                                                                                             |
| `ADMIN_EMAILS`    | `chad@kcs-capital.com,sam@kcs-capital.com,kevin@kcs-capital.com`                                                                                                              |
| `ALLOWED_EMAILS`  | `chad@kcs-capital.com,sam@kcs-capital.com,kevin@kcs-capital.com,founders@kcs-capital.com,zsandeela@yahoo.com,mstephens@fasken.com,miika.j.makela@pm.me,jatherton@jhalaw.co,menchcapital@telus.net` |
| `ALLOWED_DOMAINS` | `kcs-capital.com` (optional; lets anyone with a KCS work email in)                                                                                                            |
| `RESEND_API_KEY`  | the Resend API key                                                                                                                                                            |
| `MAGIC_FROM`      | `4orm Finance <login@kcs-capital.com>`                                                                                                                                        |
| `APP_URL`         | `https://demo.kcs-capital.com` (your final production URL)                                                                                                                    |

**Important:**
- `ADMIN_EMAILS` is the small list of people who can open `/admin.html` and
  edit the allow-list. Today those three are **Chad, Sam and Kevin**.
- `ALLOWED_EMAILS` is the bootstrap list of people who can sign in
  immediately on first deploy (before anything is loaded into KV).
  After the first sign-in, any admin can manage the list at `/admin.html`
  without touching env vars again.
- The KV store you connected in step 3 is the long-term source of truth;
  anything added through the admin page lives there, not in this env var.

After saving, redeploy (Deployments → ... → Redeploy) so the new env vars
are picked up.

## 5. Point your domain at the project

In Vercel: **Project → Settings → Domains** — add the production domain and
follow the DNS instructions. Once the domain is verified and serving, set
`APP_URL` above to the same domain.

## 6. Add or remove approved people (the easy way)

Once steps 1 to 5 are done, go to **`https://yourdomain/admin.html`** and
sign in with one of the admin emails from `ADMIN_EMAILS`. You get a browser
UI with two lists (emails, domains), an add box for each, and a Remove
button on every editable row. Changes are live immediately, no redeploy.

The admin page shows two kinds of rows:
- **editable** (blue badge) — these live in Vercel KV. You can remove them.
- **env-var** (gray badge) — these come from `ALLOWED_EMAILS` /
  `ALLOWED_DOMAINS`. They are read-only here; edit the env vars in Vercel
  to change them.

If you need to revoke access immediately for everyone (e.g. a leaked admin
email), rotate `SESSION_SECRET` in Vercel and redeploy — every existing
session is invalidated instantly.

## 7. How it behaves

- **Public:** `/` (the Overview page) and `/login.html`. Anyone can reach
  these.
- **Gated:** every other page. Unauthenticated requests are redirected to
  `/login.html?next=<the page they wanted>`.
- **Sign-in flow:** visitor enters email → if approved, gets a one-time
  link valid for 15 minutes → clicking the link sets a 30-day session
  cookie (HttpOnly, Secure, SameSite=Lax) → they are sent to the page they
  originally requested.
- **Sign out:** any "Log out" link points to `/api/logout`, which clears
  the cookie.
- **Non-approved emails** see a polite message telling them to email
  `compliance@kcs-capital.com` to request access. The system never reveals
  whether a specific stranger's email is on the list to a third party, but
  the responding visitor does learn whether their own email was approved
  (this is the standard trade-off for a small, controlled allow-list).

## 8. Local development

The gate only engages on a Vercel deployment (the middleware and `api/`
routes need the Vercel runtime). If you open the HTML files directly via
the file system or a plain static server, the gate is inactive and every
page opens. That is fine for local previewing; it engages the moment you
deploy.

## 9. Hardening notes

- This is a true server-side gate, but soft-gate risks remain:
  - If `SESSION_SECRET` leaks, anyone can forge sessions. Rotate it.
  - If `ALLOWED_EMAILS` lists a personal address that gets compromised,
    that person's emailed magic link gets compromised too. Use work emails.
- If you later want multi-factor / SSO / per-session device tracking, swap
  the magic-link step for a managed provider (Clerk, Auth0, Supabase) and
  keep the middleware in place to check the new cookie/JWT.
- Consider adding rate limiting on `/api/request-link` (e.g.
  `@vercel/kv` or Upstash) to make brute-force enumeration costly.
