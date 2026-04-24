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
