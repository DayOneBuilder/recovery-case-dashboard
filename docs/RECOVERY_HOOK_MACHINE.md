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
  -> decide urgent ping vs clarifying question vs watch-only
  -> generate authority-specific packets
  -> generate human-approved outreach drafts
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

## Outreach Decision

The machine should interrupt the user only when it can say one of three things:

- Urgent owner ping: there is a live balance or venue/issuer hook where a real actor may still preserve or recover value.
- Clarifying question: the public evidence is strong, but the owner may already have frozen, preserved, or settled the branch privately.
- Watch only: there is value or attribution relevance, but no current external action path exists.

External auto-send is disabled. The system prepares packets and drafts, then the user approves the recipient and wording.

The approval request must include:

- case;
- recipient route;
- why the message matters now;
- amount, asset, and address or branch;
- tracked dashboard, packet, and draft links using `/packet.html?file=...`;
- explicit approve/reject text, or buttons if the chat runtime supports them.

Only after approval can a separate sender send the email.

## Reply Tracking

If a victim team, issuer, bridge, venue, or exchange replies:

- do not answer automatically;
- save a reply summary in `outreach/ledger/`;
- classify the reply as `replied`, `needs_more_evidence`, `already_handled`, `actionable`, `rejected`, `bounty_discussion`, or `wrong_route`;
- update dashboard opportunity or outreach status only when actionability changes;
- send the operator a concise summary with the proposed next step.

## Contact Standard

Every contact route must include:

- Organization and role.
- Channel or official route verification.
- Permitted use.
- "Do not use for" boundary.
- Next ask.
- Source references for the route or the public claim.

Victim/project-owner contact comes before venue-side outreach unless a public bounty/safe-harbor program explicitly says otherwise.

## Reward-Protection Language

Every outreach draft should preserve the researcher position without becoming a threat or ransom:

- Independent researcher acting in good faith.
- Public-source analysis only.
- No request for access to funds, systems, private data, or account information.
- Value-first lead with an exact ask.
- Request for standard researcher credit or reward only if the information materially contributes to recovery, preservation, enforcement action, or owner identification.

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

## Generated Files

`scripts/generate-outreach` converts `outreachQueue` entries into drafts in `outreach/drafts/`. Regenerate drafts after changing an opportunity, contact, packet, or reward-protection wording.
