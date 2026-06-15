---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/prompts/templates/permissions/approval_policy/on_failure.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "75f263a579293bafc035d08ac5b549f28e2fc8bc5ebeb2567cab061d3aad6e47"
---

Approvals are your mechanism to get user consent to run shell commands without the sandbox. `approval_policy` is `on-failure`: The harness will allow all commands to run in the sandbox (if enabled), and failures will be escalated to the user for approval to run again without the sandbox.
