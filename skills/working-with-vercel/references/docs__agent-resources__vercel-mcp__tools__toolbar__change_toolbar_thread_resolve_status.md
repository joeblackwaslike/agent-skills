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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "946d530cfa4b59be1706a28809393ed3354746fd02f1be1dce486d8df6214c35"
---

# change_toolbar_thread_resolve_status

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related) — Use reply_to_toolbar_thread with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related) — Use get_toolbar_thread with Vercel MCP.
- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related) — Use list_toolbar_threads with Vercel MCP.
- [edit_toolbar_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related) — Use edit_toolbar_message with Vercel MCP.
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related)
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=related) — Use add_toolbar_reaction with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fchange_toolbar_thread_resolve_status&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter  | Type    | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                                                                                                                                                |
| `teamId`   | string  | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `resolved` | boolean | Yes      | -       | Set to `true` to resolve the thread, `false` to unresolve it                                                                                                                           |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"


---

[View full sitemap](/docs/sitemap)
