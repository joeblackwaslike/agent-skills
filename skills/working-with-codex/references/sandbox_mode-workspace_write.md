---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/prompts/templates/permissions/sandbox_mode/workspace_write.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "d259f1a50ea2bfcf5a142a5e653faaf556da10bb0b8303d8841891de28c5196a"
---

Filesystem sandboxing defines which files can be read or written. `sandbox_mode` is `workspace-write`: The sandbox permits reading files, and editing files in `cwd` and `writable_roots`. Editing files in other directories requires approval. Network access is {{network_access}}.
