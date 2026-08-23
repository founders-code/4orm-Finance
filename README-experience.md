# 4orm — the product experience

This replaces the homepage. Three files, no build step.

    index.html                -> repo root, replaces the current index.html
    assets/experience.css     -> assets/
    assets/experience.js      -> assets/
    overview.html             -> the previous homepage, kept and reachable

Your existing `assets/logo.png`, favicons and `og-image.png` are used unchanged
and are included here so the folder can be dropped in whole. Nothing else in the
repo is touched, and `vercel.json` does not need editing.

## What it is

One transaction, three views. The visitor plays with the product before they
read anything about it.

    PERSONAL        Understand it.
    PROFESSIONAL    Prove it.
    REGULATOR       Reconstruct it.

    Same transaction. Same evidence. Different view.

### The path through it

1. **Personal.** Tap "Buy a home", pick a timing, say yes. Then tap the four
   readiness items. The panel on the right builds while you do: readiness climbs
   from 12 per cent, identity and income flip to verified, the evidence list
   fills, and thin blue lines draw in behind the phone. Those lines are the
   evidence graph forming.
2. **Share with a mortgage professional.** The view changes itself. Sarah's file
   arrives prepared rather than empty.
3. **Change the income figure.** $118,000 animates to $136,000, the line flashes,
   an evidence exception opens on the broker's side, and a second later the phone
   lights up on the consumer's side. One event, two people, one record. Answer
   "I do not" and both sides update.
4. **Regulator.** The phone drops away, the transaction becomes a timeline, and
   "Reconstruct the transaction" assembles the package.

## Design

The language is the first demo: white, the soft blue and gold wash, Inter and
JetBrains Mono, generous air, the phone as the hero object. The nav is a floating
dark pill, which is how the first demo carried the logo, so your existing white
wordmark reads without a new asset.

The brand system governs the words on the page, not the look. Every visible line
passed the written-word gate: zero hard hits, no em or en dashes, no banned
claims, no reference to AI.

## Cache

Assets carry `?v=YYYYMMDD` from the build date, so a returning visitor cannot be
served a stale file from the one-year immutable cache on `/assets/*`.

## Still open

- The industry layer under the three views (Mortgage, Auto, Insurance, Lending)
  is not built. Mortgage only for now.
- The thirteen institutional pages are untouched and still in the old structure.
  Whether they get rebuilt in this language, or stay as the research layer
  underneath, is the next decision.
- Every name, figure, document and decision in the experience is invented.
