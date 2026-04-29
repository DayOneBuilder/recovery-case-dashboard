# Recovery Autoresearch Factory Spec

This spec adapts the `karpathy/autoresearch` pattern to recovery intelligence.

The original pattern is simple: keep a small program, let an agent propose changes, run a fixed-budget experiment, measure one metric, keep the change only if it beats baseline. For this project the "training run" becomes a recovery-research run, and the metric is dollars, not subjective case quality.

Source pattern: https://github.com/karpathy/autoresearch

## Mission

Build a nonstop factory that finds the cheapest provable paths to victim recovery and attributable reward.

The system does not optimize for interesting cases, charts, or research volume. It optimizes for:

```text
paid_or_committed_reward_usd / total_research_cost_usd
```

`total_research_cost_usd` includes LLM tokens, paid APIs, browser runs, and any other variable research cost.

## Core Thesis

The bottleneck is not "finding hacks." The bottleneck is finding cases where all three are true:

1. money or actionable evidence exists now;
2. a real actor can recover, freeze, preserve, identify, or authorize;
3. someone has a credible route to pay for useful recovery intelligence.

No reward route means no expensive research, except for a cheap reward-route probe.

## Success Metrics

Primary, non-subjective:

```text
paid_reward_usd / total_research_cost_usd
```

Secondary, still dollar-anchored:

```text
written_committed_reward_usd / total_research_cost_usd
```

Creditable events:

- paid reward, bounty, success fee, or retainer;
- signed or written reward commitment;
- written acceptance into an official reward, bounty, claims, counsel, DAO, or foundation process;
- written confirmation that a specific submitted packet will be considered for reward if it contributes.

Not creditable:

- "interesting case";
- "large stolen amount";
- "possible recovery action";
- unverified model confidence;
- private speculation with no payer route.

## State Machine

```text
raw_signal
  -> candidate
  -> reward_route_probe
  -> qualified_reward_opportunity
  -> deep_verified_action
  -> approval_requested
  -> sent_after_user_approval
  -> reply_received
  -> written_commitment
  -> paid_or_recovered
  -> closed
```

Rules:

- LLM-heavy work starts at `qualified_reward_opportunity`, not `raw_signal`.
- Slack is used only at `approval_requested`, `reply_received`, `written_commitment`, `paid_or_recovered`, or blocking errors.
- No external email, DM, report, invoice, or payment request is sent without user approval.

## Research Arms

The factory tests arms continuously. Arms compete for budget by realized dollar pipeline per cost.

- `new_incident_stream`: new hacks and incident updates.
- `old_case_gap_mining`: old public reports versus current on-chain state.
- `freeze_capable_asset_sweep`: USDT, USDC, PYUSD, issuer-controlled or blacklistable assets.
- `venue_bridge_landing`: CEX, bridge, OTC, mixer, and service landing paths where records can be preserved.
- `legal_doc_enrichment`: court, bankruptcy, DOJ, OFAC, regulatory, compensation, and claims documents.
- `public_leak_correlation`: public dumps as signal only, with raw sensitive data excluded.
- `bounty_reward_route_mining`: official bounty, DAO, foundation, insurer, counsel, and claims routes.
- `existing_thread_tracking`: replies and already-approved outreach threads.

## Public Leak Policy

Public leaks can be used as signal sources, but the factory is not a victim-targeting or doxxing engine.

Allowed:

- derived public-safe fact extraction;
- links between entity, address, public handle, official process, or recovery route;
- enriching an existing case or reward-route search.

Disallowed:

- seed phrases, passwords, private keys, KYC documents, SSNs, doxxing bundles, intimate or medical data;
- storing raw leaks in this repo or public dashboard;
- contacting private individuals because their data appeared in a dump;
- claims that imply extortion, threat, or unauthorized access.

## Experiment Protocol

Every self-improvement is a hypothesis, not an explanation.

Required fields:

```json
{
  "hypothesis": "Change X should improve metric Y because Z",
  "baseline": "current program or arm",
  "variant": "proposed program or arm",
  "budget": "same cost/time/input envelope for both",
  "metric": "committed_or_paid_reward_usd_per_cost",
  "safety_checks": ["no external send", "no raw sensitive data", "no payment destination change"],
  "rollback": "how to revert if variant loses"
}
```

The variant is kept only if it beats baseline on the chosen metric and passes safety checks.

Because paid rewards are delayed, use two layers:

1. Replay experiments on archived candidates to test extraction, scoring, dedupe, and safety.
2. Live arm allocation based on written commitments and paid outcomes over time.

Interim non-dollar signals may route attention, but they do not count as success.

## System Components

```text
research/program.md              # factory mission, metrics, and experiment rules
research/arms/*.md               # arm-specific source and scoring playbooks
research/runs.jsonl              # every run, budget, arm, result, and cost
research/candidates.jsonl        # deduped candidate index
research/reward_routes.jsonl     # payer/reward-route evidence
research/actions.jsonl           # deep verified recovery actions
research/commitments.jsonl       # written reward commitments
research/payments.jsonl          # paid rewards / NOWPayments references
research/experiments/*.json      # self-improvement A/B records
outreach/approvals/*.md          # human approval requests
packets/                         # public-safe evidence packets
factory/                         # GitHub Pages public-safe factory dashboard
scripts/research-run             # one fixed-budget factory run
scripts/research-select-arm      # budget allocation / bandit policy
scripts/research-score           # dollar-anchored scorer
scripts/research-self-improve    # proposes and tests program changes
scripts/research-publish         # publishes public-safe dashboard artifacts
```

## Why A Naive Version Will Fail

1. It will optimize subjective proxies like "interesting action" instead of dollars.
2. It will rediscover the same famous incidents without reward routes.
3. It will burn tokens on cases where nobody has budget or authority to pay.
4. It will overfit to stale public reports and service-cluster churn.
5. It will treat leaked PII as opportunity and create legal/reputation risk.
6. It will self-modify prompts to look busy rather than win experiments.
7. It will spam Slack, email, or counterparties without a strict state machine.
8. It will publish sensitive or unverified claims to GitHub Pages.
9. It will compare arms unfairly because live opportunities are non-stationary.
10. It will not learn because paid outcomes are sparse and delayed.

## How To Make It Work

1. Make dollars the only success metric.
2. Use reward-route validation as the first expensive-research gate.
3. Keep raw data ingestion cheap and mostly deterministic.
4. Deep-verify only candidates with a payer, actor, evidence, and exact action path.
5. Store every candidate, run, cost, commitment, and payment in append-only ledgers.
6. Use replay fixtures for fast self-improvement tests and live runs for arm allocation.
7. Require every self-change to beat baseline under a fixed budget.
8. Lock safety, payment destination, secrets, and external-send rules behind human approval.
9. Publish only public-safe derived facts.
10. Send Slack only when there is a decision, reply, written commitment, payment, or blocker.

## First Build Target

Do not start by implementing every arm. Start with the bottleneck:

1. reward-route detector;
2. reward commitment ledger;
3. run/cost ledger;
4. one `research-run` that tests two arms:
   - `bounty_reward_route_mining`;
   - `old_case_gap_mining`;
5. Slack approval only when a qualified reward opportunity has a draft and packet.

If this cannot produce written reward-route evidence, adding more arms will only burn tokens faster.
