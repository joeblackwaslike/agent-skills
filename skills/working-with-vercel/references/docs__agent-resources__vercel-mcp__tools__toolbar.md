---
title: Toolbar
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/toolbar
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/vercel-toolbar
summary: Vercel MCP tools for toolbar.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "5a16e92b6298d3475ac629b0f68ef912df07c2463ad8f30b3c9184a9af2421b0"
---

# Toolbar

Review feedback on your deployments through Vercel Toolbar comment threads. You can reply to messages, edit comments, add reactions, and resolve threads when you address the feedback.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production)
- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)
- [Improvements to Vercel Toolbar: Shrinking when inactive, removal of avatars, and more](https://vercel.com/changelog/improvements-to-vercel-toolbar)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost) — Learn how to use the Vercel Toolbar in production and local environments.
- [Add the Vercel Toolbar to your production environment](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar.graph.md)
<!-- /docsgraph:related -->

## `add_toolbar_reaction`

Add an emoji reaction to a message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                      |
| `messageId` | string | Yes      | -       | The message ID to react to                                |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `emoji`     | string | Yes      | -       | The emoji to add as a reaction (e.g. 👍)                  |

**Sample prompt:** "Add a 👍 reaction to message msg\_456 on toolbar thread tbt\_123"

## `change_toolbar_thread_resolve_status`

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.

| Parameter  | Type    | Required | Default | Description                                               |
| ---------- | ------- | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                   |
| `teamId`   | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `resolved` | boolean | Yes      | -       | Set to true to resolve the thread, false to unresolve it  |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"

## `edit_toolbar_message`

Edit an existing message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                      |
| `messageId` | string | Yes      | -       | The message ID to edit                                    |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format            |

**Sample prompt:** "Update my last toolbar message to clarify the fix"

## `get_toolbar_thread`

Get a specific toolbar thread by ID, including all messages and context.

| Parameter  | Type   | Required | Default | Description                                               |
| ---------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to retrieve                                 |
| `teamId`   | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |

**Sample prompt:** "Show me the full conversation on toolbar thread tbt\_123"

## `list_toolbar_threads`

List [Vercel Toolbar](/docs/vercel-toolbar) comment threads for a team. Returns unresolved threads by default.

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

## `reply_to_toolbar_thread`

Add a reply message to an existing toolbar thread.

| Parameter  | Type   | Required | Default | Description                                               |
| ---------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to reply to                                 |
| `teamId`   | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `markdown` | string | Yes      | -       | The message content in markdown format                    |

**Sample prompt:** "Reply to toolbar thread tbt\_123 with 'Fixed in the latest deploy'"

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
