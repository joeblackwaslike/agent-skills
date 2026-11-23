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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "67a70d1a69bf7e9f7db82983c1fd6f6c73eb8cb710e8d0aef2fd3980825ad430"
---

# list_toolbar_threads

List [Vercel Toolbar](/docs/vercel-toolbar) comment threads for a team. Returns unresolved threads by default.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads.graph.md)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                                                             |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------- |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                               |
| `projectId` | string | No       | -       | Filter by project ID                                                                    |
| `branch`    | string | No       | -       | Filter by branch name                                                                   |
| `status`    | string | No       | -       | Filter by status. Defaults to unresolved. Allowed values: `"resolved"`, `"unresolved"`. |
| `page`      | string | No       | -       | Filter by page path (e.g. /docs) or glob (e.g. /docs\*)                                 |
| `search`    | string | No       | -       | Search text in comments                                                                 |
| `limit`     | number | No       | -       | Maximum number of results to return. Defaults to 20.                                    |
| `offset`    | number | No       | -       | Pagination offset                                                                       |

**Sample prompt:** "Show me unresolved toolbar comments on my blog project"

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
