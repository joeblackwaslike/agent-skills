---
name: test-tui
description: Guide for testing Codex TUI interactively
source: "https://raw.githubusercontent.com/openai/codex/main/.codex/skills/test-tui/SKILL.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "e81787c2d976a1eb0c6108eb8ff56376e3e2ae4aae77771fd9259c211fc7f230"
---

You can start and use Codex TUI to verify changes. 

Important notes:

Start interactively.
Always set RUST_LOG="trace" when starting the process.
Pass `-c log_dir=<some_temp_dir>` argument to have logs written to a specific directory to help with debugging.
When sending a test message programmatically, send text first, then send Enter in a separate write (do not send text + Enter in one burst).
Use `just codex` target to run - `just codex -c ...`
