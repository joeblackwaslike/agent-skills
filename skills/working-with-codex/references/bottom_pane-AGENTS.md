---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/tui/src/bottom_pane/AGENTS.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "d6e6791a55c1536f5e3ffe85ed33b28e3f7bae5f59145007ecb9ef8638730a51"
---

# TUI bottom pane (state machines)

When changing the paste-burst or chat-composer state machines in this folder, keep the docs in sync:

- Update the relevant module docs (`chat_composer.rs` and/or `paste_burst.rs`) so they remain a
  readable, top-down explanation of the current behavior.
- Keep implementations/docstrings aligned unless a divergence is intentional and documented.

Practical check:

- After edits, sanity-check that docs mention only APIs/behavior that exist in code (especially the
  Enter/newline paths and `disable_paste_burst` semantics).
