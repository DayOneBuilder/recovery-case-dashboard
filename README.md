# Recovery Case Dashboard

Static MVP for presenting the recovery state of a single crypto incident.

The first case is `IoTeX ioTube`. The dashboard is intentionally static: analysis is performed manually, then the case data file is updated and committed. This keeps the first version simple enough to host on GitHub Pages while still preserving the case-board structure used by professional recovery work.

## What It Shows

- Stolen / visible / constrained / off-chain value buckets
- Money-flow Sankey chart
- Evidence graph
- Branch-level recovery, owner-ID, actionability, and confidence scores
- Timeline
- Manual notes from the analyst and user
- Source links
- Next action per branch

## Project Layout

```text
.
├── index.html
├── assets/
│   ├── app.js
│   └── styles.css
├── data/
│   └── iotex-iotube.js
└── docs/
    └── DECISIONS.md
```

## Local Preview

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Manual Update Flow

1. Re-run analysis for the case.
2. Update `data/iotex-iotube.js`.
3. Update any source case notes outside this repo if needed.
4. Open the static page locally and verify the charts render.
5. Commit and push to GitHub Pages.

## Data Safety

This MVP is meant for public or redacted case presentation. Do not put private victim communications, sealed legal process, API keys, or sensitive unreleased attribution into `data/*.js`.
