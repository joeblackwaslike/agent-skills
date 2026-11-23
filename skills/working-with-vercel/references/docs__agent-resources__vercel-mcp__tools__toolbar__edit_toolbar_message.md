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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5f818926f3cf2949ae9e5db31e2f03f8378a19c96cedfd3e98eebaac157af313"
---

# edit_toolbar_message

Edit an existing message in a toolbar thread.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [reply_to_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/reply_to_toolbar_thread) — Use reply_to_toolbar_thread with Vercel MCP.
- [Improvements to Vercel Toolbar: Shrinking when inactive, removal of avatars, and more](https://vercel.com/changelog/improvements-to-vercel-toolbar)
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production)
- [add_toolbar_reaction](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/add_toolbar_reaction) — Use add_toolbar_reaction with Vercel MCP.
- [get_toolbar_thread](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar/get_toolbar_thread) — Use get_toolbar_thread with Vercel MCP.
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) — Learn how to use the Vercel Toolbar in production and local environments.
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar/edit_toolbar_message.graph.md)
<!-- /docsgraph:related -->

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                      |
| `messageId` | string | Yes      | -       | The message ID to edit                                    |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format            |

**Sample prompt:** "Update my last toolbar message to clarify the fix"

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
