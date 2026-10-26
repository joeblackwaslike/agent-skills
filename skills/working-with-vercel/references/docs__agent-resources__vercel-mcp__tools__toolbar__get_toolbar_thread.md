---
title: get_toolbar_thread
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_toolbar_thread with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a329022c67c975606f0e3469c52bd4ae3ff1ede1a25ffbca8a6dc50d54c7d6cf"
---

# get_toolbar_thread

Get a specific toolbar thread by ID, including all messages and context.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads) — Use list_toolbar_threads with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [edit_toolbar_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message) — Use edit_toolbar_message with Vercel MCP.
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction) — Use add_toolbar_reaction with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread.graph.md)
<!-- /docsgraph:related -->

| Parameter  | Type   | Required | Default | Description                                               |
| ---------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to retrieve                                 |
| `teamId`   | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |

**Sample prompt:** "Show me the full conversation on toolbar thread tbt\_123"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
