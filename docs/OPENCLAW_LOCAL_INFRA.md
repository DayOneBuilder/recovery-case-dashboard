# Local OpenClaw / Mail Infrastructure

Checked on 2026-04-28 UTC after cloning the project onto this machine.

## Current State

- OpenClaw CLI: `/usr/bin/openclaw`, version `2026.4.8`.
- Gateway: user systemd service `openclaw-gateway.service`, running on `ws://127.0.0.1:18789`.
- Default OpenClaw model: `openai-codex/gpt-5.4` with default thinking `xhigh`.
- Configured Slack mode: Socket Mode.
- Slack bot probe passes for bot `molt3` in team `Yauheni`.
- Allowlisted Slack channel in OpenClaw config: `C0APHKX5LVA` (`autobuilder` in gateway logs).
- Project registry notification target: `C0AKB50Q12P`, thread `1777022743.951349`.
- OpenClaw cron store: `~/.openclaw/cron/jobs.json`.
- Current OpenClaw cron jobs: none. `openclaw cron list --json` returned an empty `jobs` list.
- Gateway logs: `journalctl --user -u openclaw-gateway.service`.
- OpenClaw local logs: `~/.openclaw/logs/`.
- Direct-agent fallback logs from this repo: `/tmp/case-refresh/<case>-<timestamp>.log`.

## Slack Delivery

Scheduled recovery refreshes should be installed as OpenClaw isolated cron jobs with cron-owned `announce` delivery:

```bash
openclaw cron add \
  --name "Recovery case refresh: iotex-iotube" \
  --every 3h \
  --session isolated \
  --message "$(scripts/case-refresh --print-cron-message iotex-iotube)" \
  --model "openai-codex/gpt-5.4" \
  --thinking xhigh \
  --announce \
  --channel slack \
  --to "channel:C0AKB50Q12P"
```

The current `scripts/case-refresh` fallback starts a direct agent and writes a log. It does not send Slack unless run with `--notify`, because this project requires explicit approval before outward delivery.

## Mail Access

Mailbox secrets exist at `~/.secrets/ben-mail.env`; values must stay out of this repo.

Available local mail helpers in `~/.openclaw/workspace/scripts/`:

- `check_ben_mail.sh`: IMAP triage and archive flow. Use `--dry-run` for read-only checks.
- `archive_ben_mail.sh`: archives specific INBOX UIDs to the `Done` folder.
- `send_ben_email.py`: SMTP sender used by older outreach flows. Do not use it for recovery outreach without explicit approval.

The mailbox auth probe in `~/.openclaw/workspace/assets/dayonebuilder-mail-auth-latest.json` showed SPF and DMARC passing, DKIM absent as of 2026-04-24.

## Recovery Project Implications

- The expected 3-hour OpenClaw cron job is not currently installed on this machine.
- The configured Slack target in `config/cases.json` is not the same as the only allowlisted Slack channel visible in OpenClaw config. Verify `C0AKB50Q12P` before enabling announce delivery.
- `scripts/generate-outreach` only writes drafts. It does not send email.
- `scripts/generate-approval-request` creates the operator approval message.
- `scripts/record-outreach-reply` records replies in `outreach/ledger/` and never sends a response.
