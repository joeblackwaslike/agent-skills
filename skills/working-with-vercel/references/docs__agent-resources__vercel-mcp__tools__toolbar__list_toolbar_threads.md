---
title: list_toolbar_threads
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/vercel-toolbar
summary: Use list_toolbar_threads with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d7def87a7a4fb10be9dd076e5c97fef8a71b5c213b7c3a06876a962476c441d3"
---

# list_toolbar_threads

List [Vercel Toolbar](/docs/vercel-toolbar) comment threads for a team. Returns unresolved threads by default.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related)
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related) — Use get_toolbar_thread with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related) — Use reply_to_toolbar_thread with Vercel MCP.
- [vercel comments](https://vercel.com/docs/cli/comments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
- [list_teams](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/list_teams?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=related) — Use list_teams with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar%2Flist_toolbar_threads&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default      | Description                                                                                                                                                                                    |
| ----------- | ------ | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`    | string | Yes      | -            | The team ID to list threads for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `projectId` | string | No       | -            | Filter by project ID                                                                                                                                                                           |
| `branch`    | string | No       | -            | Filter by branch name                                                                                                                                                                          |
| `status`    | string | No       | `unresolved` | Filter by status: `resolved` or `unresolved`                                                                                                                                                   |
| `page`      | string | No       | -            | Filter by page path (e.g. `/docs`) or glob (e.g. `/docs*`)                                                                                                                                     |
| `search`    | string | No       | -            | Search text in comments                                                                                                                                                                        |
| `limit`     | number | No       | 20           | Maximum number of results to return                                                                                                                                                            |
| `offset`    | number | No       | -            | Pagination offset                                                                                                                                                                              |

**Sample prompt:** "Show me unresolved toolbar comments on my blog project"


---

[View full sitemap](/docs/sitemap)
