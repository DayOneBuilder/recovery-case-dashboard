# Recovery Case Refresh Workflow

Use this workflow when refreshing an existing recovery case. The goal is to validate the current known state and add only deltas when something changed. Do not perform a full re-research pass unless the case data is missing, internally inconsistent, or explicitly marked for rebuild.

## Inputs

- Case id from `config/cases.json`.
- Current case data file, for example `data/iotex-iotube.js`.
- Existing dashboard facts: stolen assets, fund locations, classifications, priority actions, workstreams, timeline, notes, and sources.
- Recovery-hook facts: `recoveryCommand`, `recoveryOpportunities`, `contacts`, `outreachQueue`, `authorities`, `recoveryPackets`, and `outreach/ledger/`.
- Current public sources and explorer views needed to validate the existing claims.

## Refresh Rules

1. Treat the checked-in case data as the baseline, not as a draft to rewrite.
2. Validate each current material claim against its cited source or current explorer state.
3. Add or edit data only when there is a concrete delta: new movement, changed balance, changed venue/freeze state, stronger attribution, disproven lead, new source, or changed next action.
4. Leave stable wording, chart structure, and UI-facing labels unchanged when the underlying fact did not change.
5. Preserve the distinction between `confirmed-stolen-path`, `investigative-lead`, and `context`. Do not promote a lead without direct supporting evidence.
6. Keep public-mode safety: do not add private victim communications, sealed legal process, API keys, or sensitive unreleased attribution.
7. Prefer source-specific updates over broad rewrites. A one-line timeline delta is better than a rewritten case narrative when only one fact changed.
8. Optimize for recovery hooks, not activity volume. A useful update changes who can act, what packet should be sent, what value is live, or why a previous claim is now wrong.
9. Do not send external outreach. Update `outreachQueue`, record reply state in `outreach/ledger/`, and regenerate drafts when the action path changes, then let the user approve sending.
10. Do not run broad general research every refresh. Check only important changes: balance changed; freeze or blacklist status changed; a CEX, bridge, issuer, or venue touchpoint appeared; an opportunity became stronger or died; a new outreach draft is needed; or a reply arrived.

## Material Delta Gate

Do not edit or commit the case when the only observed change is volatile background activity on a high-volume service-like address. Examples of non-material changes:

- Transaction count changed on a service-like BTC cluster.
- Lifetime funded volume changed on a service-like BTC cluster.
- Crawler-derived cluster size changed without a new stolen-tail link.
- Explorer formatting, labels, or rendering changed without a factual case delta.
- Repeated internal churn on a service-like BTC cluster without a new venue, new stolen-tail linkage, or stronger attribution.

Commit only when the change can affect recovery work:

- A tracked stolen-tail address moves funds or receives a meaningful new transaction.
- A tracked balance, blacklist, freeze, venue, bridge, or custody status changes.
- A new destination, landing address, deposit venue, or recovery contact target is confirmed.
- Attribution confidence changes because a source, label, or direct linkage changed.
- A current claim is disproven or becomes stale enough to lower confidence.
- A priority action, branch score, timeline event, or source list must change because of the new fact.
- A recovery opportunity, authority, or evidence packet changes because a new action path appeared or disappeared.
- The command-center state changes between urgent owner ping, clarifying question, and watch-only.
- A contact route, send condition, follow-up date, or reward-protection draft changes because the recovery path changed.

## Procedure

1. Load the registry entry for the case id and open the referenced data file.
2. Build a short baseline from the existing case:
   - `case.lastReview` and `case.nextReview`.
   - Top summary values.
   - Each `fundLocations` row.
   - Priority actions and workstream next actions.
   - Recovery command state, opportunities, contacts, outreach statuses, authorities, and packet statuses.
   - Flow/evidence graph claims that depend on balances, services, or venue labels.
   - Timeline items and source references.
3. Re-check only the sources needed to validate those baseline claims.
4. Classify the result for each claim:
   - `unchanged`: no data edit, but it may be mentioned in the refresh note.
   - `changed`: update the relevant case fields and source refs.
   - `new-delta`: add a focused timeline/source/action entry.
   - `stale-or-unverified`: lower confidence, add a caveat, or create a next action.
   - `disproven`: correct the claim and preserve a short explanation in notes or timeline.
5. Update the data file only for changed facts and their dependent summaries. Do not add one source per high-volume service churn transaction.
6. If an outreach item, contact route, packet, or reward-protection wording changes, regenerate affected drafts with `scripts/generate-outreach <outreach-id> --force`.
7. If a new outreach draft is needed, generate the approval text with `scripts/generate-approval-request <case-id> <outreach-id> --write`. Do not send the underlying email.
8. If a reply arrived, record it with `scripts/record-outreach-reply` and classify it as one of: `replied`, `needs_more_evidence`, `already_handled`, `actionable`, `rejected`, `bounty_discussion`, or `wrong_route`. Do not answer the reply automatically.
9. Set `case.lastReview` to the refresh date. Adjust `case.nextReview` only if the review cadence changed.
10. Run `scripts/validate-case` and verify the static page renders after the data update.
11. Produce a concise refresh summary with:
   - Case id and review date.
   - Sources checked.
   - Deltas applied.
   - Claims validated with no data change.
   - Any blocked checks or follow-up actions.

## Delivery

For scheduled OpenClaw isolated cron jobs, return the refresh summary as plain text and let the cron runner deliver it via `announce`. Do not call Slack or the generic message tool from inside the scheduled cron agent turn. Direct Slack sending from the manual fallback path is disabled unless the operator runs `scripts/case-refresh --notify`.

The scheduled agent must always return a visible summary, even when nothing changed. Do not return `NO_REPLY` from scheduled cron runs because `NO_REPLY` is treated as silent delivery.

## Non-Goals

- Do not rebuild the case from scratch.
- Do not add a backend, package manager, build step, or live crawler.
- Do not touch unrelated UI files for a data-only refresh.
- Do not infer exchange, mixer, or owner identity from a service-like pattern alone.
- Do not expand a case into broad re-research unless a specific recovery hook needs verification.
- Do not auto-send emails, DMs, or compliance reports to outside parties.
