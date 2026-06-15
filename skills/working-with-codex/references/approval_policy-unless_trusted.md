---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/prompts/templates/permissions/approval_policy/unless_trusted.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "5c7a62d4b7f1d6221715b6d0fe1a3f906b2d03724df912e1a36f751ccdf450dc"
---

 Approvals are your mechanism to get user consent to run shell commands without the sandbox. `approval_policy` is `unless-trusted`: The harness will escalate most commands for user approval, apart from a limited allowlist of safe "read" commands.
