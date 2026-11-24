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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "88748d4f2e3f41e7a184c4c2f96680f3dc50a03246b27efb995dab48cb8d23e5"
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
