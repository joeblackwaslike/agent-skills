---
title: get_webhooks
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_webhooks with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "db63213c669df06e24a4e9ee49cd808c4d2c09c3edc874d181e606e9e780e884"
---

# get_webhooks

Get a list of webhooks


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a list of webhooks](https://vercel.com/docs/rest-api/webhooks/get-a-list-of-webhooks) — GET /v1/webhooks — Get a list of webhooks
- [Get a webhook](https://vercel.com/docs/rest-api/webhooks/get-a-webhook) — GET /v1/webhooks/{id} — Get a webhook
- [Setting Up Webhooks](https://vercel.com/docs/webhooks) — Learn how to set up webhooks and use them with Vercel Integrations.
- [vercel webhooks](https://vercel.com/docs/cli/webhooks) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.
- [Creates a webhook](https://vercel.com/docs/rest-api/webhooks/creates-a-webhook) — POST /v1/webhooks — Creates a webhook

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | No       | The project ID.                                             |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
