---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/core/templates/search_tool/tool_description.md"
fetched_at: "2026-06-15T05:54:26.964Z"
sha256: "0e4029b9b5d23b400e76a0051b9df878f28153ae2de126a77b90b80b64cd3d6b"
---

# Apps (Connectors) tool discovery

Searches over apps/connectors tool metadata with BM25 and exposes matching tools for the next model call.

You have access to all the tools of the following apps/connectors:
{{app_descriptions}}
Some of the tools may not have been provided to you upfront, and you should use this tool (`tool_search`) to search for the required tools and load them for the apps mentioned above. For the apps mentioned above, always use `tool_search` instead of `list_mcp_resources` or `list_mcp_resource_templates` for tool discovery.
