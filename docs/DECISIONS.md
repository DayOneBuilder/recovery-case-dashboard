# Architecture Decisions

## 1. Static Page First

Decision: build the MVP as a static GitHub Pages site.

Reasoning: the current workflow is manual. The analyst is triggered from the console/chat, performs checks, then updates data. A backend, database, auth layer, and live workers would add maintenance before the case presentation format is proven.

Tradeoff: the site does not do live blockchain monitoring, private data storage, or automated RPC calls.

## 2. Use ECharts For The MVP

Decision: use Apache ECharts from a CDN for Sankey and graph visualizations.

Reasoning: the dashboard needs funds-flow and evidence-map visuals immediately. ECharts gives Sankey, force graph, responsive SVG rendering, and tooltips without a build system.

Tradeoff: ECharts is not a forensic engine. It visualizes curated data; it does not cluster addresses or identify services.

## 3. Do Not Use GraphSense As The First Runtime

Decision: borrow GraphSense-style concepts, but do not run GraphSense for the MVP.

Reasoning: GraphSense is the closest open-source crypto tracing platform, but its full deployment is heavier than the current need. The MVP is a recovery presentation board, not an indexing or tracing engine.

Tradeoff: later integration with GraphSense, Blockscout, mempool.space, or a custom backend will require a data adapter.

## 4. Case Data Is A Versioned JS File

Decision: store case data in `data/iotex-iotube.js` as `window.RECOVERY_CASE`.

Reasoning: GitHub Pages can load it without a build step or CORS issue. The file is easy to update manually and review in diffs.

Tradeoff: this is not ideal for large multi-case data. When there are many cases, move to JSON plus a small loader or build step.

## 5. Score Types

Decision: score each branch on four independent axes.

- `recovery`: chance of getting value frozen, returned, or otherwise controlled.
- `ownerId`: chance of learning the service/operator/real-world controller.
- `actionability`: whether there is a useful next step now.
- `confidence`: how strongly the evidence supports the claim.

Reasoning: a high recovery chance and a high attribution chance are different. For example, `bc1q7t4v...` is a good owner-ID lead but not yet a high-confidence recovery target.

## 6. Public By Default, Sensitive By Exception

Decision: keep the MVP safe for public hosting.

Reasoning: GitHub Pages is easiest for quick review. Sensitive live leads, private victim comments, legal documents, or non-public source claims should stay out of this repo until there is auth and access control.

Tradeoff: the first dashboard is a public-facing board, not an internal confidential workspace.

## 7. First Case: IoTeX ioTube

Decision: use IoTeX ioTube for the first dashboard.

Reasoning: it exercises the main visual model: reserve drain, bridge, BTC landing set, visible tail, spent peel branch, service-like cluster, CIOTX tail, and off-chain exchange branch.

Tradeoff: Stellar-specific and stablecoin-freeze workflows are not represented yet. Those can be added with `YieldBlox` and `FoomCash` once the case schema is stable.
