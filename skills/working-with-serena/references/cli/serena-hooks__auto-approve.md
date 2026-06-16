---
source: "serena-hooks auto-approve --help @ serena-agent 1.5.3"
fetched_at: "2026-06-16T12:24:33.275Z"
sha256: "64690369a183ca0cfcd804527b7fc337ae2dee45ebeea425c702d0b812aa9d64"
---

Usage: serena-hooks auto-approve [OPTIONS]

  Set this as hook at PreToolUse to auto-approve Serena tool calls while the
  client is in a permissive permission mode (acceptEdits or auto, Claude
  Code).

Options:
  --client [claude-code|vscode|codex]
                                  The client application that triggered the
                                  hook.  [default: claude-code]
  --help                          Show this message and exit.
