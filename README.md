# Recovery Case Dashboard

Static product dashboard for finding and presenting actionable recovery hooks in a crypto incident.

The first case is `IoTeX ioTube`. The dashboard is intentionally static: analysis is performed manually, then the case data file is updated and committed. This keeps the first version simple enough to host on GitHub Pages while still preserving the case-board structure used by professional recovery work.

The product goal is not to redraw public traces. The goal is to surface missed or underworked recovery actions: live balances, freeze-capable authorities, venue handoffs, issuer controls, victim-side asks, and evidence packets that can be sent to someone with power to act.

The operating model is human-approved outreach. The system may identify a lead, prepare a packet, and draft a message, but it does not send external emails automatically.

## Product Direction

The v2 dashboard is oriented around the four questions a recovery stakeholder asks first:

- What was stolen?
- Where are funds now?
- What is confirmed versus only an investigative lead?
- What actions should happen now?
- Who can act, and what exact packet should be sent?

Charts remain useful, but they are no longer the primary interface. The top of the page now contains the exploit/theft brief, separated recovery buckets, ranked recovery hooks, authority constraints, evidence packets, priority actions, and a scannable funds-location table before the graph and timeline sections.

## What It Shows

- Exploit/theft brief with the stolen assets and claim boundaries
- Top summary buckets for stolen total, visible on-chain value, constrained value, venue-dependent value, and best lead
- Ranked recovery opportunities with score, action, blocker, and why the lead may have been missed
- Recovery command center that says whether the current case should interrupt the user, ask a clarifying question, or stay watch-only
- Outreach queue with send conditions, follow-up dates, reward-position language, and links to generated drafts
- Contact routes with permitted use, route confidence, and explicit "do not use for" boundaries
- Authorities that can freeze, preserve, identify, or officially escalate a branch
- Evidence packets that convert research into a concrete ask
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
- `recoveryCommand`: current user-facing decision, manual-send policy, reward posture, and alert rules.
- `recoveryOpportunities`: ranked hooks scored by live value, authority, evidence strength, novelty, urgency, and blockers.
- `contacts`: official or authority-gated contact routes, including permitted use and claim boundaries.
- `outreachQueue`: human-approved messages to draft, send, and follow up.
- `authorities`: parties with power to act, plus what they need and what public data cannot prove.
- `recoveryPackets`: packet definitions that turn evidence into venue, issuer, victim, or analytics-vendor asks.
- `fundLocations`: the scannable current-location table. Each row carries `classification`, `confidence`, and `evidenceRefs`.
- `visuals.flow` and `visuals.network`: curated chart nodes and links. Links use `classification` to render confirmed paths differently from leads.
- `workstreams`: selectable branch/workstream cards with scores, details, and next action.
- `timeline`, `notes`, and `sources`: supporting context and source links.

Use `classification: "confirmed-stolen-path"` only when the path is supported as stolen-funds movement. Use `classification: "investigative-lead"` for unresolved service, venue, owner-ID, or peel-chain hypotheses.

Recovery opportunities are stricter than leads. A lead becomes an opportunity only when there is a plausible actor who can do something now: freeze, preserve records, confirm status, identify an operator, or authorize outreach.

## Project Layout

```text
.
├── index.html
├── packet.html
├── assets/
│   ├── app.js
│   ├── packet.js
│   └── styles.css
├── config/
│   └── cases.json
├── contacts/
│   └── iotex-iotube.md
├── data/
│   └── iotex-iotube.js
├── docs/
│   ├── CASE_REFRESH_WORKFLOW.md
│   ├── DECISIONS.md
│   └── RECOVERY_HOOK_MACHINE.md
├── packets/
│   ├── iotex-btc-service-lead.md
│   ├── iotex-btc-tail-watch.md
│   └── iotex-ciotx-venues.md
├── opportunities/
│   └── iotex-iotube.md
├── outreach/
│   ├── drafts/
│   │   ├── iotex-iotube-btc-service-attribution-question.md
│   │   └── iotex-iotube-ciotx-iotex-status-request.md
│   ├── templates/
│   │   └── recovery-lead-email.md
│   └── iotex-iotube.md
└── scripts/
    ├── case-refresh
    ├── generate-outreach
    ├── refresh-case
    └── validate-case
```

## Local Preview

```bash
python3 -m http.server 4173
```

Then open:

```text
http://localhost:4173/
```

## Case Refresh Command

`scripts/case-refresh` queues the configured OpenClaw cron job for an incremental case refresh. It defaults to `iotex-iotube`.

```bash
scripts/case-refresh
scripts/case-refresh iotex-iotube
scripts/case-refresh --list
scripts/refresh-case iotex-iotube
```

The command reads `config/cases.json`, looks up the case id, and tries to queue the matching cron job by exact name from `openclaw cron list --json`.

If manual `openclaw cron run <job-id>` works in the current OpenClaw build, the refresh is enqueued onto that scheduled job. If manual cron triggering is unavailable, the command falls back to a background `openclaw agent` run using the same validation-only workflow and still posts the result into the configured Slack thread.

The local registry maps case ids to their case data file, refresh workflow, OpenClaw cron job name, and thread-delivery settings. Update `config/cases.json` when adding a new dashboard case, renaming an external cron job, or changing the target thread.

Scheduled OpenClaw cron delivery is runner-owned: the isolated cron agent must return a plain-text summary, and the cron job should use `announce` delivery. The manual fallback is the only path that asks the agent to call Slack directly.

## Validation-Only Refresh Flow

Use `docs/CASE_REFRESH_WORKFLOW.md` for case refreshes. A refresh validates the current checked-in case state and adds only deltas when something changed. It is not a full re-research pass.

1. Treat `data/iotex-iotube.js` as the baseline.
2. Validate current material claims against the relevant current source or explorer state.
3. Update only changed balances, statuses, source refs, timeline events, priority actions, or dependent summaries.
4. Keep `fundLocations`, `priorityActions`, `workstreams`, and chart classifications in sync when a changed fact affects more than one section.
5. Preserve confirmed-path versus investigative-lead boundaries.
6. Open the static page locally and verify the top blocks, table, and charts render.
7. Commit and push to GitHub Pages.

Material-delta gate: do not commit if the only observed change is a volatile aggregate counter on a high-volume service-like address, such as transaction count, lifetime funded volume, or crawler-derived cluster size. Commit only when the change affects recovery actionability: stolen-tail movement, balance/state change on a tracked branch, blacklist/freeze/venue status, stronger or weaker attribution, new landing address, disproven claim, score/action change, or a new source needed for the case.

Run the local case validator before committing:

```bash
scripts/validate-case
```

The validator rejects broken dates, missing source references, missing recovery hooks, broken outreach/contact/packet links, missing outreach drafts, missing Google Analytics, and unbounded churn-only BTC service tx sources.

## Outreach Draft Generation

Use `scripts/generate-outreach` to generate human-approved email drafts from the structured case data. The command never sends email.

```bash
scripts/generate-outreach --list
scripts/generate-outreach ciotx-iotex-status-request --force
scripts/generate-outreach iotex-iotube ciotx-iotex-status-request --stdout
scripts/generate-approval-request iotex-iotube btc-service-attribution-question
scripts/check-recovery-mailbox --case iotex-iotube
scripts/record-outreach-reply iotex-iotube ciotx-iotex-status-request --classification replied --from sender@example.com --subject "Re: ..." --summary "..."
```

Generated drafts live in `outreach/drafts/`. Before sending, re-check the evidence packet, current balances, recipient route, and wording.

Evidence packets are linked through `packet.html?file=...` instead of raw markdown so public packet opens are covered by the same Google Analytics tag as the dashboard.

Approval requests are Slack-ready text only. They include the case, recipient route, reason, value at stake, tracked dashboard/packet/draft links, and explicit `approve ...` / `reject ...` text decisions. They do not send email or Slack by themselves.

Replies are recorded with `scripts/record-outreach-reply`. The allowed reply classifications are `replied`, `needs_more_evidence`, `already_handled`, `actionable`, `rejected`, `bounty_discussion`, and `wrong_route`. The script appends to `outreach/ledger/` and never sends a response automatically.

Mailbox scans use `scripts/check-recovery-mailbox`. It logs into `ben@dayonebuilder.online` through the local IMAP secrets, inspects recent INBOX messages read-only, and prints recovery-related candidates for the agent to classify. It does not archive, mark read, reply, or send.

## New Case Discovery

Use `scripts/discover-recovery-cases` to turn local `find_stolen_money/cases/*.md` files into scored candidate recovery cases:

```bash
scripts/discover-recovery-cases --source-dir ../find_stolen_money/cases --markdown
```

The command is read-only and does not browse or contact anyone. It extracts stolen amount, assets, chains, addresses, touchpoints, victim contacts, reward route hints, confidence, and reward probability. See `docs/NEW_CASE_PIPELINE.md`.

## Data Safety

This MVP is meant for public or redacted case presentation. Do not put private victim communications, sealed legal process, API keys, or sensitive unreleased attribution into `data/*.js`.
