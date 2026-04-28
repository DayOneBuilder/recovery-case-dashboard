# Architecture Decisions

## 1. Static Page First

Decision: keep the dashboard as a static GitHub Pages site.

Reasoning: the current workflow is manual. The analyst is triggered from the console/chat, performs checks, then updates data. A backend, database, auth layer, and live workers would add maintenance before the case presentation format is proven.

Tradeoff: the site does not do live blockchain monitoring, private data storage, or automated RPC calls.

## 2. Product Questions Before Charts

Decision: make the first screen answer the recovery product questions before showing graphs.

Reasoning: the dashboard should immediately separate stolen total, visible on-chain value, constrained value, venue-dependent value, and best investigative lead. Stakeholders need to know what happened, where funds are now, what is confirmed, and what actions to take before reading a chart.

Tradeoff: the page is denser than the original chart-first MVP, but it is more useful for action review and handoff.

## 3. Use ECharts For Static Visuals

Decision: use Apache ECharts from a CDN for Sankey and graph visualizations.

Reasoning: the dashboard needs funds-flow and evidence-map visuals immediately. ECharts gives graph layouts, responsive SVG rendering, and tooltips without a build system.

Tradeoff: ECharts is not a forensic engine. It visualizes curated data; it does not cluster addresses or identify services.

## 4. Do Not Use GraphSense As The First Runtime

Decision: borrow GraphSense-style concepts, but do not run GraphSense for the MVP.

Reasoning: GraphSense is the closest open-source crypto tracing platform, but its full deployment is heavier than the current need. The MVP is a recovery presentation board, not an indexing or tracing engine.

Tradeoff: later integration with GraphSense, Blockscout, mempool.space, or a custom backend will require a data adapter.

## 5. Case Data Is A Versioned JS File

Decision: store case data in `data/iotex-iotube.js` as `window.RECOVERY_CASE` with `schemaVersion: "2.0"`.

Reasoning: GitHub Pages can load it without a build step or CORS issue. The file is easy to update manually and review in diffs.

Tradeoff: this is not ideal for large multi-case data. When there are many cases, move to JSON plus a small loader or build step.

## 6. Generator-Friendly Schema

Decision: organize the case file by product sections rather than by UI widgets.

The v2 schema uses these primary groups:

- `case`: metadata and review dates.
- `exploit`: theft facts and what was stolen.
- `topSummary`: the five top buckets.
- `priorityActions`: ordered action queue.
- `fundLocations`: current-location rows with asset, amount, status, confidence, classification, and next action.
- `visuals`: chart nodes and links.
- `workstreams`: selectable recovery branches.
- `timeline`, `notes`, and `sources`: support material.

Reasoning: future LLM/tool-loop output should be able to update facts and actions without reverse-engineering chart-specific state. The renderer can derive the page from explicit case facts.

Tradeoff: the case object is more verbose, and some facts appear in both `fundLocations` and `workstreams` for readability. The duplication is intentional so each section can be reviewed independently in a diff.

## 7. Confirmed Path Versus Lead

Decision: every fund row, workstream, chart node/link, and relevant timeline item should carry a `classification`.

Allowed public classifications today:

- `confirmed-stolen-path`: evidence supports the row as stolen-funds movement or a confirmed stolen-funds location.
- `investigative-lead`: useful but unresolved hypothesis, service lead, venue lead, or peel-chain branch.
- `context`: source or supporting node, not itself a fund path.

Reasoning: the dashboard must not imply that an unlabeled cluster is a confirmed exchange or that a mixed-use address balance is fully stolen proceeds.

Tradeoff: analysts must maintain classification discipline when updating the case.

## 8. Score Types

Decision: score each branch on four independent axes.

- `recovery`: chance of getting value frozen, returned, or otherwise controlled.
- `ownerId`: chance of learning the service/operator/real-world controller.
- `actionability`: whether there is a useful next step now.
- `confidence`: how strongly the evidence supports the claim.

Reasoning: a high recovery chance and a high attribution chance are different. For example, `bc1q7t4v...` is a good owner-ID lead but not yet a high-confidence recovery target.

## 9. Public By Default, Sensitive By Exception

Decision: keep the MVP safe for public hosting.

Reasoning: GitHub Pages is easiest for quick review. Sensitive live leads, private victim comments, legal documents, or non-public source claims should stay out of this repo until there is auth and access control.

Tradeoff: the first dashboard is a public-facing board, not an internal confidential workspace.

## 10. First Case: IoTeX ioTube

Decision: use IoTeX ioTube for the first dashboard.

Reasoning: it exercises the main visual model: reserve drain, bridge, BTC landing set, visible tail, spent peel branch, service-like cluster, CIOTX tail, and off-chain exchange branch.

Tradeoff: Stellar-specific and stablecoin-freeze workflows are not represented yet. Those can be added with `YieldBlox` and `FoomCash` once the case schema is stable.

## 11. Refresh Cases Incrementally

Decision: refresh existing cases by validating the checked-in current state and applying only concrete deltas.

Reasoning: recovery stakeholders need continuity and clean diffs. A full re-research pass risks rewriting stable claims, blurring claim boundaries, and making it harder to see what actually changed since the last review.

Tradeoff: analysts must be disciplined about checking the existing source trail and recording unchanged validations separately from data edits.

Implementation: `config/cases.json` maps dashboard case ids to OpenClaw cron job names, and `scripts/case-refresh` queues the matching external cron job. The static site remains static; the operator command only starts the refresh workflow.

## 12. Recovery Hooks Before Transaction Churn

Decision: rank and display recovery opportunities before detailed fund-flow charts.

Reasoning: a transaction trace is only valuable when it creates an action path. The dashboard now separates three concepts:

- `fundLocations`: where value or leads are currently represented.
- `recoveryOpportunities`: ranked chances to create a freeze, preservation, attribution, or official escalation.
- `recoveryPackets`: concrete evidence bundles that can be sent to an authority.

Tradeoff: this is less like a block explorer and more like an action board. That is intentional. The product should help find overlooked recovery hooks, not reward agents for committing every service-cluster churn transaction.

## 13. Churn-Only Updates Are Invalid

Decision: repeated internal activity on a high-volume service-like cluster is not a material dashboard delta by itself.

Reasoning: service churn can create many commits without increasing recovery probability. A refresh may mention unchanged or noisy checks in Slack, but it should not mutate case data unless the update changes actionability: new venue landing, balance/freeze status, stronger attribution, disproven claim, new authority, packet status, or score/action change.

Implementation: `scripts/validate-case` rejects unbounded `btc-service-touch-tx-N` sources so the IoTeX case does not regress into a raw tx log.

## 14. Human-Approved Outreach, Not Auto-Send

Decision: the system may generate evidence packets and outreach drafts, but it must not automatically contact victims, issuers, venues, or analytics vendors.

Reasoning: recovery outreach touches legal/compliance processes and researcher reputation. Automatic pings can become spam, overclaim an unresolved lead, or weaken reward positioning. The safer workflow is: generate packet, generate draft, validate claim boundaries, then let the user approve recipient and wording.

Implementation: `recoveryCommand.externalAutoSend` is false, `outreachQueue` items carry send conditions and reward-protection wording, and `scripts/generate-outreach` writes drafts only.

## 15. Google Analytics Is Required On Public Pages

Decision: the public dashboard includes Google Analytics tag `G-ZR415HX0B2`.

Reasoning: outreach links need basic visit telemetry so the user can tell whether a shared dashboard or packet page was opened. The dashboard is public, so this is acceptable for the MVP.

Implementation: `index.html` includes the Google tag, and `scripts/validate-case` fails if it is removed.
