# 4orm Finance website, build rules

Read this in full before touching anything, and list its section titles
back before you start. If any step here fails, **stop and report. Do not
work around it.**

---

## 1. What this package is, and what it is not

The pages in `deploy/` are **finished output**, not a specification. They
were designed, rendered, measured and approved before this package was
built. Your job is to copy them into place and prove they arrived intact.

**You are not rebuilding or reinterpreting anything.** There is no
freedom here to improve a layout, rename a class, reformat the HTML,
run a prettier pass, change a colour or adjust a spacing value. A single
byte changed in `deploy/` makes the pre-flight fail.

`deploy/` is also generated output on the authoring side. It is rebuilt
from source by `_src/build.py`, which is not in this repo. **Edits made
directly in `deploy/` will be overwritten by the next build.** If
something needs to change, report it rather than patching it here.

## 2. Pre-flight, which is the whole point

`design-reference/MANIFEST.json` lists every file in `deploy/` with its
exact byte count and sha256.

Run this from the repo root **after the merge and before you commit**:

```bash
node -e '
const c=require("crypto"),f=require("fs");
const m=JSON.parse(f.readFileSync("design-reference/MANIFEST.json","utf8"));
let bad=0,missing=0;
for(const e of m.files){
  if(!f.existsSync(e.path)){console.log("MISSING  "+e.path);missing++;continue}
  const b=f.readFileSync(e.path);
  const h=c.createHash("sha256").update(b).digest("hex");
  if(h!==e.sha256||b.length!==e.bytes){console.log("CHANGED  "+e.path);bad++}
}
console.log(`\n${m.files.length} files checked, ${missing} missing, ${bad} changed`);
process.exit(missing+bad?1:0)'
```

**All three numbers must read zero before you commit.** If any file is
missing, the merge did not land where you think it did. If any file
changed, something rewrote it: an editor on save, a formatter, a lint
hook, or a line-ending conversion. Find it and undo it.

## 3. Where the files go, and why

| | |
|---|---|
| Repo | `founders-code/4orm-Finance`, branch `main` |
| Host | Vercel project `4orm-finance`, team `cre8iv-mind` |
| **Vercel Root Directory** | **`deploy`** |

Vercel serves **only** `deploy/`. Anything committed to the repo root is
invisible to the live site. This has gone wrong three times, so after you
commit, run:

```bash
git show --stat HEAD
```

Every changed path must begin with `deploy/` or `design-reference/`. If
the paths have no prefix, or git reports nothing changed, the files went
to the root and the live site will not move.

`design-reference/` sits at the repo root on purpose. It is the approved
design and the verification harness, and it is **not served** because it
is outside `deploy/`.

## 4. Seeing the design

`design-reference/screens/` holds a PNG of every screen that was
approved, captured at 1440x900 at device scale 1. `MANIFEST.json`
describes what each one shows in a line.

**Open them.** They are the only way for you to see what this is meant to
look like. If what you deploy does not match them, something is wrong
regardless of what the pre-flight said.

## 5. Visual check

Belt and braces for the case where the files are correct but a visitor
still sees something different: a stale CDN asset, a font that failed to
load, a Vercel rewrite.

```bash
cd design-reference/verify && npm install && cd ../..
node design-reference/verify/visual-check.mjs                     # local deploy/
node design-reference/verify/visual-check.mjs https://www.4ormfinance.com
```

PASS is under 0.5% of pixels different, and no horizontal overflow at
1280 or 1440. Paste the results table. Failures write the rendered image
and a diff into `design-reference/verify/results/`.

Run it locally before pushing, and against the deployment afterwards.

## 6. Layout rules, which the harness enforces

- No horizontal overflow at 1280 or 1440 (`scrollWidth <= clientWidth`).
- One `h1` per page.
- Every control at least 24 x 24 CSS px.
- The two-column heads collapse to one column below 900px, in reading order.

## 7. Standing rules for this site

These are not preferences. Breaking one is a defect.

1. **No screen shows that AI sits behind the product.** All 22 pages were
   scanned on this build: zero references. Do not reintroduce one.
2. **Never "form". Always "4orm".**
3. **No em or en dashes anywhere**, including HTML entities.
4. **Never "the problem". Always "the challenge".**
5. **Never regenerate, trace, recolour or substitute a brand asset.** Use
   the supplied logo and favicon files exactly as they are.
6. **No pricing, market sizing, revenue targets or investor returns** on
   the public site.
7. **No unsigned relationship is named**, and no vendor logos or partner
   language for one.
8. Every figure keeps its publisher, date, scope and limit. If a source
   line goes missing, the figure comes off the page.

## 8. How to finish

Report, in this order:

1. The section titles of this file, to show you read it.
2. The pre-flight output: files checked, missing, changed.
3. `git show --stat HEAD`, trimmed to the first lines, showing the prefix.
4. The visual-check table, local.
5. The Vercel deployment URL and its state.
6. The visual-check table again, against the deployment.
7. Anything you could not do, stated plainly rather than worked around.
