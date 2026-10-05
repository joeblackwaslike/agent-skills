---
title: edit_toolbar_message
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use edit_toolbar_message with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "68823588d7417b7a868cc9751d91d144658313262401e2502802a213a74afb37"
---

# edit_toolbar_message

Edit an existing message in a toolbar thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=related) — Use reply_to_toolbar_thread with Vercel MCP.
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=related) — Use add_toolbar_reaction with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=related) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=related) — Use get_toolbar_thread with Vercel MCP.
- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=related) — Use list_toolbar_threads with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Fedit_toolbar_message&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                            |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                                                                                                                                                   |
| `messageId` | string | Yes      | -       | The message ID to edit                                                                                                                                                                 |
| `teamId`    | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format                                                                                                                                         |

**Sample prompt:** "Update my last toolbar message to clarify the fix"


---

[View full sitemap](/docs/sitemap)
