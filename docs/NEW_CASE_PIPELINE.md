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

## Portfolio Capacity

Keep the monitored portfolio small enough that every active case can receive useful attention.

- Active development cases: max 3 at once.
- Pending approval drafts: max 1 at once, unless the user explicitly asks to queue more.
- Watch-only cases: max 6 at once, checked with cheap public signals and kept silent unless they become actionable.
- Parked cases: unlimited, but not checked on the 3-hour cron.

Definitions:

- Active: current public evidence supports a recovery action now, such as a freeze/issuer/bridge/venue contact, a reply to an already-sent thread, or a live balance movement that changes the next action.
- Watch-only: the case has public value or a plausible reward route, but one required element is missing: live funds, actor who can act, official contact, or short evidence packet.
- Parked: the case lacks an actionable public path, appears already handled/rejected, requires private victim/KYC/legal access, or has gone stale without material changes.

## Intake Thresholds

Promote a new case into active development only when all of these are true:

- `opportunityScore >= 75`;
- `confidence >= 65`;
- `reward_probability >= 55`;
- at least one currently visible balance, freeze-capable asset, venue/bridge/issuer touchpoint, or fresh reply exists;
- there is a specific `who_can_act`;
- there is an official contact, disclosure route, bounty/reward route, or victim/project-owner route;
- a short public evidence packet can be prepared without private data;
- adding the case does not exceed the active case cap, unless it clearly beats the weakest active case by 15+ points.

Put a case on watch-only when:

- `opportunityScore` is 50-74; or
- one required active-development element is missing but could appear later; or
- funds are visible but there is no immediate actor who can freeze, preserve, identify, or authorize.

Park or reject a case when:

- `opportunityScore < 50`;
- no exploiter address or live balance can be verified from public sources;
- no actor can act from public evidence;
- the route depends on private victim, venue, KYC, or legal data the project does not have;
- the public record says the case is already handled, compensated, rejected, or closed;
- the only change is background churn that does not create a new recovery hook.

## Demotion Rules

Demote an active case to watch-only when:

- three consecutive 3-hour checks find no material delta and there is no pending reply, approval request, or live movement;
- the only remaining work is passive balance/watch monitoring;
- an outreach thread is sent and awaiting reply, with no current follow-up approved by the user.

Park a watch-only case when:

- seven days pass with no material delta and no near-term public signal to check;
- a reply classifies the route as `already_handled`, `wrong_route`, or `rejected`;
- the opportunity loses its actor who can act, official route, or live/freeze-capable balance.

Re-activate a parked or watch-only case only on a material event: balance movement, freeze/blacklist status change, new official contact/reward route, useful reply, or a new public source that changes actionability.

## 3-Hour Intake Behavior

The 3-hour cron must not do broad public research every time. It may run a bounded intake pass:

1. Read this policy and the current active/watch case list.
2. Run local discovery from available case markdown with `scripts/discover-recovery-cases --markdown`.
3. If there is an active slot and a candidate appears to meet the active thresholds, verify only that candidate with current public sources.
4. Report to Slack only when a candidate qualifies for active development or displaces the weakest active case. Start the message with `Найден recovery case.`
5. If no candidate qualifies, return `NO_REPLY`; do not send "no new cases" reports.

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
