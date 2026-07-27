---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/prompts/templates/permissions/sandbox_mode/workspace_write.md"
fetched_at: "2026-07-27T07:33:15.954Z"
sha256: "763661195d613a48173638af6227d480d70ab0a6898d3a81ff075155e82f7555"
---

Filesystem sandboxing defines which files can be read or written. `sandbox_mode` is `workspace-write`: The sandbox permits reading files, and editing files in `cwd` and `writable_roots`. Editing files in other directories requires approval. Network access is {{ network_access }}.
