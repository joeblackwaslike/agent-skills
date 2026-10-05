---
title: reply_to_toolbar_thread
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use reply_to_toolbar_thread with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0baf732eebe4fc071aba5ffe5a3fd35668168263f46186147383cf16d3e4367c"
---

# reply_to_toolbar_thread

Add a reply message to an existing toolbar thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [edit_toolbar_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related) — Use edit_toolbar_message with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related) — Use get_toolbar_thread with Vercel MCP.
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related) — Use add_toolbar_reaction with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related)
- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=related) — Use list_toolbar_threads with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Freply_to_toolbar_thread&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter  | Type   | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to reply to                                                                                                                                                              |
| `teamId`   | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown` | string | Yes      | -       | The message content in markdown format                                                                                                                                                 |

**Sample prompt:** "Reply to toolbar thread tbt\_123 with 'Fixed in the latest deploy'"


---

[View full sitemap](/docs/sitemap)
