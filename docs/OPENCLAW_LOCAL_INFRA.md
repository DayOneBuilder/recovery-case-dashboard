# Local OpenClaw / Mail Infrastructure

Checked on 2026-04-29 UTC after freezing recovery monitoring on this machine.

## Current State

- OpenClaw CLI: `/usr/bin/openclaw`, version `2026.4.8`.
- Gateway: user systemd service `openclaw-gateway.service`, running on `ws://127.0.0.1:18789`.
- Default OpenClaw model: `openai-codex/gpt-5.4` with default thinking `xhigh`.
- Configured Slack mode: Socket Mode.
- Slack bot probe passes for bot `molt3` in team `Yauheni`.
- Allowlisted Slack channels in OpenClaw config: `C0APHKX5LVA` (`autobuilder`) and `C0AKB50Q12P` (`general`).
- Project registry notification target: `C0APHKX5LVA` (`#autobuilder`), no thread.
- Slack bot `molt3` is a member of `#autobuilder`.
- OpenClaw cron store: `~/.openclaw/cron/jobs.json`.
- Recovery monitoring is paused by operator request. The OpenClaw cron job `Recovery case refresh: iotex-iotube`, id `5b336c8e-73b6-42af-af68-49929b375fb3`, is disabled and has no active next run.
- The disabled job was configured for every 3 hours, model `openai-codex/gpt-5.3-codex-spark`, delivery `slack channel:C0APHKX5LVA`.
- Gateway logs: `journalctl --user -u openclaw-gateway.service`.
- OpenClaw local logs: `~/.openclaw/logs/`.
- Direct-agent fallback logs from this repo: `/tmp/case-refresh/<case>-<timestamp>.log`.

## Slack Delivery

Recovery Slack delivery is currently frozen. The repo registry sets `monitoringPaused: true`, so `scripts/case-refresh iotex-iotube` exits without queuing OpenClaw, starting a fallback agent, sending Slack, or sending email unless an operator uses `--force` for a one-off manual override.

Historical install command, kept only for reactivation reference:

Scheduled recovery refreshes should be installed as OpenClaw isolated cron jobs with cron-owned `announce` delivery:

```bash
openclaw cron add \
  --name "Recovery case refresh: iotex-iotube" \
  --every 3h \
  --session isolated \
  --message "$(scripts/case-refresh --print-cron-message iotex-iotube)" \
  --model "openai-codex/gpt-5.3-codex-spark" \
  --thinking xhigh \
  --announce \
  --channel slack \
  --to "channel:C0APHKX5LVA"
```

The current `scripts/case-refresh` fallback starts a direct agent and writes a log. It does not send Slack unless run with `--notify`, because this project requires explicit approval before outward delivery. Scheduled cron runs are silent on routine no-change checks: the agent returns `NO_REPLY` unless there is an operator-actionable event such as a reply, approval request, material recovery delta, qualified reward opportunity, written commitment/payment event, or blocker.

## Mail Access

Mailbox secrets exist at `~/.secrets/ben-mail.env`; values must stay out of this repo.

Available local mail helpers in `~/.openclaw/workspace/scripts/`:

- `check_ben_mail.sh`: IMAP triage and archive flow. Use `--dry-run` for read-only checks.
- `archive_ben_mail.sh`: archives specific INBOX UIDs to the `Done` folder.
- `send_ben_email.py`: SMTP sender used by older outreach flows. Do not use it for recovery outreach without explicit approval.

The mailbox auth probe in `~/.openclaw/workspace/assets/dayonebuilder-mail-auth-latest.json` showed SPF and DMARC passing, DKIM absent as of 2026-04-24.

## Recovery Project Implications

- The expected 3-hour OpenClaw cron job exists on this machine as `5b336c8e-73b6-42af-af68-49929b375fb3`, but it is disabled.
- `config/cases.json` marks `iotex-iotube` as `monitoringPaused: true`; manual refresh commands will refuse to start monitoring without `--force`.
- `scripts/generate-outreach` only writes drafts. It does not send email.
- `scripts/generate-approval-request` creates the operator approval message.
- `scripts/record-outreach-reply` records replies in `outreach/ledger/` and never sends a response.
