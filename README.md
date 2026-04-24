# Recovery Case Dashboard

Static product dashboard for presenting the recovery state of a single crypto incident.

The first case is `IoTeX ioTube`. The dashboard is intentionally static: analysis is performed manually, then the case data file is updated and committed. This keeps the first version simple enough to host on GitHub Pages while still preserving the case-board structure used by professional recovery work.

## Product Direction

The v2 dashboard is oriented around the four questions a recovery stakeholder asks first:

- What was stolen?
- Where are funds now?
- What is confirmed versus only an investigative lead?
- What actions should happen now?

Charts remain useful, but they are no longer the primary interface. The top of the page now contains the exploit/theft brief, separated recovery buckets, priority actions, and a scannable funds-location table before the graph and timeline sections.

## What It Shows

- Exploit/theft brief with the stolen assets and claim boundaries
- Top summary buckets for stolen total, visible on-chain value, constrained value, venue-dependent value, and best lead
- Priority actions with owner, target, and reason
- Where-funds-are-now table with asset, location, amount, status, confidence, classification, and next action
- Money-flow graph with confirmed paths visually separated from leads
- Evidence graph
- Branch-level recovery, owner-ID, actionability, and confidence scores
- Timeline with confirmed/lead labels
- Manual notes from the analyst and user
- Source links
- Next action per branch

## Case Data Schema

`data/iotex-iotube.js` exposes `window.RECOVERY_CASE` with `schemaVersion: "2.0"`. The shape is intentionally generator-friendly so a future LLM/tool loop can update one case object after a review:

- `case`: stable case metadata, review dates, and public/private mode.
- `exploit`: theft summary, vector, stolen total, and `whatWasStolen` rows.
- `topSummary`: five product buckets shown near the top of the page.
- `priorityActions`: ordered actions with owner, target, and rationale.
- `fundLocations`: the scannable current-location table. Each row carries `classification`, `confidence`, and `evidenceRefs`.
- `visuals.flow` and `visuals.network`: curated chart nodes and links. Links use `classification` to render confirmed paths differently from leads.
- `workstreams`: selectable branch/workstream cards with scores, details, and next action.
- `timeline`, `notes`, and `sources`: supporting context and source links.

Use `classification: "confirmed-stolen-path"` only when the path is supported as stolen-funds movement. Use `classification: "investigative-lead"` for unresolved service, venue, owner-ID, or peel-chain hypotheses.

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
3. Keep `fundLocations`, `priorityActions`, `workstreams`, and chart classifications in sync.
4. Update any source case notes outside this repo if needed.
5. Open the static page locally and verify the top blocks, table, and charts render.
6. Commit and push to GitHub Pages.

## Data Safety

This MVP is meant for public or redacted case presentation. Do not put private victim communications, sealed legal process, API keys, or sensitive unreleased attribution into `data/*.js`.
