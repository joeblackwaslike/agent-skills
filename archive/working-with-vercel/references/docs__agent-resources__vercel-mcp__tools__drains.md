---
title: Drains
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/drains
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for drains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/drains.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d84e6b580b9d8ad3ac45e9b4b547c484c07a853b8e853b39859a46cb03c86726"
---

# Drains

Configure Drains to send your Vercel observability data to an external destination. You can inspect existing Drains, update their configuration, and test delivery before relying on them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Drains](https://vercel.com/docs/drains/using-drains) — Learn how to configure drains to forward observability data to custom HTTP endpoints, dedicated Audit Log destinations,
- [Retrieve a list of all Drains](https://vercel.com/docs/rest-api/drains/retrieve-a-list-of-all-drains) — GET /v1/drains — Allows to retrieve the list of Drains of the authenticated team.
- [Working with Drains](https://vercel.com/docs/drains) — Drains collect logs, traces, speed insights, and analytics from your applications. Forward observability data to custom
- [Delete a drain](https://vercel.com/docs/rest-api/drains/delete-a-drain) — DELETE /v1/drains/{id} — Delete a specific Drain by passing the drain id in the URL.
- [vercel drains](https://vercel.com/docs/cli/drains) — List, inspect, create, update, pause, resume, and delete Vercel Drains from your terminal.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/drains.graph.md](/docs/agent-resources/vercel-mcp/tools/drains.graph.md)
<!-- /docsgraph:related -->

## `create_drain`

Create a new Drain.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_drain`

Find a Drain by id.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The drain ID.                                               |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_drains`

Retrieve a list of all Drains.

## Parameters

| Parameter         | Type    | Required | Description                                                 |
| ----------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`       | string  | No       | The project ID.                                             |
| `includeMetadata` | boolean | No       | Default: `false`.                                           |
| `teamId`          | string  | No       | Team ID to use for this operation.                          |
| `slug`            | string  | No       | Team slug to use for this operation. Use instead of teamId. |

## `test_drain`

Validate Drain delivery configuration.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `update_drain`

Update an existing Drain.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `id`          | string | Yes      | The drain ID.                                               |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

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
