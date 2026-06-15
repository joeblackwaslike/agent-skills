---
source: "https://raw.githubusercontent.com/openai/codex/main/docs/agents_md.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "fe9c918a09a3573bf6428f4da0322750900760ef709ac1fd13d07358c702aaa1"
---

# AGENTS.md

For information about AGENTS.md, see [this documentation](https://developers.openai.com/codex/guides/agents-md).

## Hierarchical agents message

When the `child_agents_md` feature flag is enabled (via `[features]` in `config.toml`), Codex appends additional guidance about AGENTS.md scope and precedence to the user instructions message and emits that message even when no AGENTS.md is present.
