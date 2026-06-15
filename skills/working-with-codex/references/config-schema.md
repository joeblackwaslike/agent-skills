---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/core/src/config/schema.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "d1fa6b6fc7523f5ff846026d024ff0153602e311de4bfadd6aa5949747c308ac"
---

# Config JSON Schema

We generate a JSON Schema for `~/.codex/config.toml` from the `ConfigToml` type
and commit it at `codex-rs/core/config.schema.json` for editor integration.

When you change any fields included in `ConfigToml` (or nested config types),
regenerate the schema:

```
just write-config-schema
```
