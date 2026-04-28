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
