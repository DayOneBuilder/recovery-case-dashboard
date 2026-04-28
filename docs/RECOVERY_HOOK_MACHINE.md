# Recovery Hook Machine

This project should not optimize for prettier tracing. It should optimize for finding missed or underworked actions that can move stolen funds closer to recovery.

## Core Definition

A recovery hook is a case fact that creates a concrete action path.

Examples:

- A live balance on an address controlled by a freeze-capable issuer.
- A bridge, CEX, OTC, or service landing that can preserve records.
- A public victim report that is older than current on-chain state.
- A current holder that is not blacklisted, frozen, or already documented.
- A small branch with strong operator-identification value.
- A cross-chain landing that public reports stop short of connecting.

A lead is not a recovery hook until it has:

- Value or attribution relevance.
- Evidence linking it to the incident.
- A party with power to act.
- A specific next step.
- A blocker list that explains what is still missing.

## Agent Pipeline

The useful agent loop is not "watch every tx". It is:

```text
case sources
  -> extract known stolen assets, addresses, txs, venues, and public claims
  -> validate current balances / freeze / blacklist / movement state
  -> split value into tranches
  -> score recovery opportunities
  -> generate authority-specific packets
  -> QA the claim boundaries
  -> update dashboard only when actionability changes
```

## Opportunity Score

Each opportunity should be scored from 0 to 100 using these axes:

- Live value: is value still visible or controllable?
- Authority: is there a real party who can freeze, preserve, identify, or authorize?
- Evidence strength: is the link to stolen funds source-backed?
- Novelty: is this likely missed or underworked compared with public reports?
- Urgency: can the opportunity disappear quickly?
- Contact barrier: can a third party send useful evidence, or is victim/counsel required?
- Ambiguity penalty: could this be mixed-use, unrelated, or overclaimed?

## Dashboard Priority

The first screen should answer:

1. Which hook is most likely to create recovery value?
2. Who can act?
3. What should be sent?
4. What is blocked?
5. Why might this be a missed opportunity?
6. When was this last verified?

Charts are supporting evidence. They should not be the main product surface.

## Refresh Gate

Do not mutate case data for:

- Service-cluster tx count changes.
- Lifetime volume changes.
- Repeated internal churn.
- Explorer rendering differences.
- Another tx source that does not change the action path.

Mutate case data only for:

- New venue, bridge, or issuer touchpoint.
- Balance, freeze, blacklist, or custody-status change.
- Stronger or weaker attribution.
- Disproven public claim.
- New or closed recovery packet.
- Changed opportunity score, authority, blocker, or next action.

## Packet Standard

Every packet should include:

- Target authority.
- Exact ask.
- Current value and location.
- Source-backed incident link.
- Claim boundary.
- Missing private facts.
- Suggested owner for outreach.

The public dashboard may describe packet status, but private emails, legal records, API keys, and non-public attribution stay out of `data/*.js`.
