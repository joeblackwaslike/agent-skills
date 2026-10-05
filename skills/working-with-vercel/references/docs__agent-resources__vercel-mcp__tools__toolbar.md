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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c6c218d9926843f176d5a03e1468fd31a42b1d452abcce6fed132bc6cb9817d5"
---

# Toolbar

Review feedback on your deployments through Vercel Toolbar comment threads. You can reply to messages, edit comments, add reactions, and resolve threads when you address the feedback.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related)
- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Add the Vercel Toolbar to local and production environments](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel Toolbar in production and local environments.
- [Add the Vercel Toolbar to your production environment](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t
- [vercel comments](https://vercel.com/docs/cli/comments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=related) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/toolbar.graph.md](/docs/agent-resources/vercel-mcp/tools/toolbar.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ftoolbar&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `add_toolbar_reaction`

Add an emoji reaction to a message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                            |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                                                                                                                                                   |
| `messageId` | string | Yes      | -       | The message ID to react to                                                                                                                                                             |
| `teamId`    | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `emoji`     | string | Yes      | -       | The emoji to add as a reaction (e.g. 👍)                                                                                                                                               |

**Sample prompt:** "Add a 👍 reaction to message msg\_456 on toolbar thread tbt\_123"

## `change_toolbar_thread_resolve_status`

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.

| Parameter  | Type    | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                                                                                                                                                |
| `teamId`   | string  | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `resolved` | boolean | Yes      | -       | Set to `true` to resolve the thread, `false` to unresolve it                                                                                                                           |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"

## `edit_toolbar_message`

Edit an existing message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                            |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                                                                                                                                                   |
| `messageId` | string | Yes      | -       | The message ID to edit                                                                                                                                                                 |
| `teamId`    | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format                                                                                                                                         |

**Sample prompt:** "Update my last toolbar message to clarify the fix"

## `get_toolbar_thread`

Get a specific toolbar thread by ID, including all messages and context.

| Parameter  | Type   | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to retrieve                                                                                                                                                              |
| `teamId`   | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |

**Sample prompt:** "Show me the full conversation on toolbar thread tbt\_123"

## `list_toolbar_threads`

List [Vercel Toolbar](/docs/vercel-toolbar) comment threads for a team. Returns unresolved threads by default.

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

## `reply_to_toolbar_thread`

Add a reply message to an existing toolbar thread.

| Parameter  | Type   | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to reply to                                                                                                                                                              |
| `teamId`   | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown` | string | Yes      | -       | The message content in markdown format                                                                                                                                                 |

**Sample prompt:** "Reply to toolbar thread tbt\_123 with 'Fixed in the latest deploy'"


---

[View full sitemap](/docs/sitemap)
