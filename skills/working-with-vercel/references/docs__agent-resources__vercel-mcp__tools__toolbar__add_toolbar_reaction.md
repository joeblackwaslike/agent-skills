---
title: add_toolbar_reaction
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/toolbar
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use add_toolbar_reaction with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "ae41bc1666f1483a61eb9d888cda881761297803f0cb04fc0a12fd80e8ec5af9"
---

# add_toolbar_reaction

Add an emoji reaction to a message in a toolbar thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [edit_toolbar_message](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message) — Use edit_toolbar_message with Vercel MCP.
- [Emoji reactions now available in Preview Deployment comments ](https://vercel.com/changelog/emoji-reactions-now-available-in-preview-deployment-comments)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production)
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [change_toolbar_thread_resolve_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/change_toolbar_thread_resolve_status) — Use change_toolbar_thread_resolve_status with Vercel MCP.
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) — Learn how to use the Vercel Toolbar in production and local environments.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction.graph.md)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                      |
| `messageId` | string | Yes      | -       | The message ID to react to                                |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `emoji`     | string | Yes      | -       | The emoji to add as a reaction (e.g. 👍)                  |

**Sample prompt:** "Add a 👍 reaction to message msg\_456 on toolbar thread tbt\_123"


---

[View full sitemap](/docs/sitemap)
