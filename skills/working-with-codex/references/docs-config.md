---
source: "https://raw.githubusercontent.com/openai/codex/main/docs/config.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "745768b4da6cd73e414fc49c5c6ef3d6bf8a0c08289fab23a7dd79776ab31d9d"
---

# Configuration

For basic configuration instructions, see [this documentation](https://developers.openai.com/codex/config-basic).

For advanced configuration instructions, see [this documentation](https://developers.openai.com/codex/config-advanced).

For a full configuration reference, see [this documentation](https://developers.openai.com/codex/config-reference).

## Lifecycle hooks

Admins can set top-level `allow_managed_hooks_only = true` in
`requirements.toml` to ignore user, project, and session hook configs while
still allowing managed hooks from requirements and managed config layers. This
setting is only supported in `requirements.toml`; putting it in `config.toml`
does not enable managed-hooks-only mode.
