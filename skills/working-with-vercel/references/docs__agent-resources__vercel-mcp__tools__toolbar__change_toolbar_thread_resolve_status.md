---
title: change_toolbar_thread_resolve_status
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use change_toolbar_thread_resolve_status with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "5651052b0cea1119460d6fbe443348b96866fde40f888c2c513f18dbfc086620"
---

# change_toolbar_thread_resolve_status

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads) — Use list_toolbar_threads with Vercel MCP.
- [edit_toolbar_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message) — Use edit_toolbar_message with Vercel MCP.
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction) — Use add_toolbar_reaction with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md)
<!-- /docsgraph:related -->

| Parameter  | Type    | Required | Default | Description                                               |
| ---------- | ------- | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                   |
| `teamId`   | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `resolved` | boolean | Yes      | -       | Set to true to resolve the thread, false to unresolve it  |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"


---

[View full sitemap](/docs/sitemap)
