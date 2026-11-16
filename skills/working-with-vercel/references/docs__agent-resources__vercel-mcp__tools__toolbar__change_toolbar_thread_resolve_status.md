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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "633ccc0b6decad0f8e89f86431f41f99d1154df02e1d8b327b24e38311ecf92f"
---

# change_toolbar_thread_resolve_status

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_toolbar_threads](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/list_toolbar_threads) — Use list_toolbar_threads with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [Easier toolbar setup for SvelteKit and other Vite-based frameworks](https://vercel.com/changelog/easier-toolbar-setup-for-sveltekit-and-other-vite-based-frameworks)
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [Improvements to Vercel Toolbar: Shrinking when inactive, removal of avatars, and more](https://vercel.com/changelog/improvements-to-vercel-toolbar)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status.graph.md)
<!-- /docsgraph:related -->

| Parameter  | Type    | Required | Default | Description                                               |
| ---------- | ------- | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                   |
| `teamId`   | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `resolved` | boolean | Yes      | -       | Set to true to resolve the thread, false to unresolve it  |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"

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
