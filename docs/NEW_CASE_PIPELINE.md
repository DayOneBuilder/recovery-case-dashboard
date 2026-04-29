# New Recovery Case Pipeline

The new-case pipeline is a triage step, not an outreach sender.

## Inputs

- Local markdown cases from `find_stolen_money/cases/*.md`, when present.
- Current public sources checked by the operator or a supervised agent.
- Existing project folders: `contacts/`, `opportunities/`, `packets/`, `outreach/`, and `outreach/ledger/`.

## Fields To Extract

For each candidate case, extract:

- stolen amount;
- asset;
- chain;
- exploiter addresses;
- current balances;
- freeze-capable assets;
- venue, bridge, issuer, or CEX touchpoints;
- victim contacts;
- bounty or reward route;
- confidence;
- reward probability.

## Opportunity Score

Increase score when:

- money is currently visible on-chain;
- the asset can be frozen or blacklisted by an issuer;
- a specific actor can act now;
- there is an official contact or disclosure route;
- the public report is old enough to have missed current state;
- a short evidence packet can be prepared from public facts;
- the next action does not require private access.

Decrease score when:

- no exploiter address is available;
- no actor can freeze, preserve, identify, or authorize;
- the evidence is only service churn or a mixed-use cluster;
- outreach would require private victim, venue, KYC, or legal data.

## Autoresearch Factory Policy

The new-case pipeline feeds the recovery autoresearch factory in `docs/RECOVERY_AUTORESEARCH_FACTORY_SPEC.md`.

The factory does not optimize for case count. It optimizes for:

```text
paid_or_committed_reward_usd / total_research_cost_usd
```

Capacity is budget-based, not a fixed number of cases:

- Deep verification budget is tunable by token/cost burn and observed yield.
- Approval requests are not capped by count; they are ranked by expected reward and actionability.
- Event-watch can be unlimited when checks are deterministic and cheap.
- Backlog can be unlimited and silent.
- Expensive research starts only after reward-route validation or a cheap reward-route probe.

Definitions:

- Candidate: a case or signal that may have stolen value, an actor who can act, and a possible payer.
- Qualified reward opportunity: a candidate with evidence of a credible reward, bounty, claims, DAO, counsel, foundation, insurer, or victim-team payment route.
- Event-watch: cheap deterministic trigger checks, such as balance movement, freeze status, official update, or reply arrival.
- Backlog: candidates with no current reward route or exact action. Backlog is indexed, not monitored with LLM.
- Active: a short-lived task state where the agent is preparing a packet, approval request, reply summary, or commitment/payment update.

## Intake Thresholds

Spend expensive verification on a new case only when all of these are true:

- `opportunityScore >= 75`;
- `confidence >= 65`;
- `reward_probability >= 55`;
- at least one currently visible balance, freeze-capable asset, venue/bridge/issuer touchpoint, or fresh reply exists;
- there is a specific `who_can_act`;
- there is an official contact, disclosure route, bounty/reward route, or victim/project-owner route;
- a short public evidence packet can be prepared without private data.

Use only a cheap reward-route probe when the recovery facts look strong but the payer route is unknown.

Put a case in event-watch when:

- `opportunityScore` is 50-74; or
- one required expensive-verification element is missing but could appear later; or
- funds are visible but there is no immediate actor who can freeze, preserve, identify, authorize, or pay.

Park or reject a case when:

- `opportunityScore < 50`;
- no exploiter address or live balance can be verified from public sources;
- no actor can act or pay from public evidence;
- the route depends on private victim, venue, KYC, or legal data the project does not have;
- the public record says the case is already handled, compensated, rejected, or closed;
- the only change is background churn that does not create a new recovery hook.

## Demotion Rules

Move an active task back to event-watch when:

- three consecutive 3-hour checks find no material delta and there is no pending reply, approval request, or live movement;
- the only remaining work is passive balance/watch monitoring;
- an outreach thread is sent and awaiting reply, with no current follow-up approved by the user.

Park an event-watch case when:

- seven days pass with no material delta and no near-term public signal to check;
- a reply classifies the route as `already_handled`, `wrong_route`, or `rejected`;
- the opportunity loses its actor who can act, official route, or live/freeze-capable balance.

Re-activate a parked or event-watch case only on a material event: balance movement, freeze/blacklist status change, new official contact/reward route, useful reply, written commitment, or a new public source that changes actionability.

## 3-Hour Intake Behavior

The 3-hour cron must not do broad public research every time. It may run a bounded factory pass:

1. Read this policy and `docs/RECOVERY_AUTORESEARCH_FACTORY_SPEC.md`.
2. Run local discovery from available case markdown with `scripts/discover-recovery-cases --markdown`.
3. Select at most one candidate for expensive verification unless the configured token/cost budget allows more.
4. Prefer candidates with reward-route evidence over larger but payerless hacks.
5. Report to Slack only when a candidate becomes a qualified reward opportunity, needs an approval request, or produces a written commitment/payment event. Start discovery messages with `Найден reward route.`
6. If no candidate qualifies, return `NO_REPLY`; do not send "no new cases" reports.

## Priority Development Queue

1. FoomCash: check current USDT balance, blacklist/freeze status, and prepare a Tether packet. Do not send without approval.
2. YieldBlox: check Stellar live tail and issuer/bridge recovery route.
3. IoTeX ioTube: maintain the already-sent IoTeX thread and keep the CIOTX packet freshly checked.
4. KelpDAO: continue THORChain, Umbra, and bridge landing map only if a current actionable outreach hook exists.

## Local Command

```bash
scripts/discover-recovery-cases --source-dir /path/to/find_stolen_money/cases --markdown
```

The command does not browse, send messages, or mutate case files. It emits candidates and scoring reasons for the next supervised research pass.
