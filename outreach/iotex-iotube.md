# IoTeX ioTube Outreach Queue

Source of truth: `data/iotex-iotube.js`.

Outreach is human-approved. This project prepares evidence and wording; it does not send external messages by itself.

## Queue

| Priority | Outreach Item | Status | Send Condition |
| --- | --- | --- | --- |
| 1 | IoTeX CIOTX status / preservation question | `sent_manual` | Already sent manually on 2026-04-28. Do not follow up until IoTeX replies or the user explicitly approves it. |
| 2 | BTC tail first-spend alert | `needs_more_evidence` | Send only if a tracked BTC address moves and the next hop creates a venue, bridge, mixer, or consolidation lead. |
| 3 | BTC service-like cluster attribution question | `drafted` | Send only to IoTeX or a trusted analytics vendor, with explicit caveats that this is not a named venue claim. |

## Reward Protection Standard

Every draft should:

- State good-faith, public-source research.
- Give enough value to be useful.
- Ask for correct routing and a case/reference ID.
- Ask for standard researcher credit or reward only if the information materially contributes to recovery.
- Avoid threats, payment demands, private-system access, or claims that cannot be publicly supported.
