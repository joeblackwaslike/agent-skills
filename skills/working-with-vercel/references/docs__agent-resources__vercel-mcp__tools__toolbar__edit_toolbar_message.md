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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8d82d4fd1279357e99744a9435802c9b1b5a001e70477790adb2b389e84d441e"
---

# edit_toolbar_message

Edit an existing message in a toolbar thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction) — Use add_toolbar_reaction with Vercel MCP.
- [Improvements to Vercel Toolbar: Shrinking when inactive, removal of avatars, and more](https://vercel.com/changelog/improvements-to-vercel-toolbar)
- [The Vercel Toolbar is now more compact and dynamic](https://vercel.com/changelog/the-vercel-toolbar-is-now-more-compact-and-dynamic)
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) — Learn how to use the Vercel Toolbar in production and local environments.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                      |
| `messageId` | string | Yes      | -       | The message ID to edit                                    |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format            |

**Sample prompt:** "Update my last toolbar message to clarify the fix"


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
