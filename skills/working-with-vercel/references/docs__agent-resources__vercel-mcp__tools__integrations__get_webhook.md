---
title: get_webhook
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/get_webhook
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhook"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_webhook with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhook.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "dc673f039d005add815b23db2e133b438bc6d9541e1a2b12bf1e5253c24ec1cc"
---

# get_webhook

Get a webhook.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Webhook](https://v0.app/docs/api/v2/reference/webhooks/get-webhook?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — Retrieves the details of a specific webhook using its ID.
- [Get Hook](https://v0.app/docs/api/v1/reference/hooks/get-by-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — Retrieves the details of a specific webhook using its ID.
- [Get a webhook](https://vercel.com/docs/rest-api/webhooks/get-a-webhook?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — GET /v1/webhooks/{id} — Get a webhook
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — Use get_team with Vercel MCP.
- [Get a list of webhooks](https://vercel.com/docs/rest-api/webhooks/get-a-list-of-webhooks?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — GET /v1/webhooks — Get a list of webhooks
- [Deletes a webhook](https://vercel.com/docs/rest-api/webhooks/deletes-a-webhook?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — DELETE /v1/webhooks/{id} — Deletes a webhook
- [Creates a webhook](https://vercel.com/docs/rest-api/webhooks/creates-a-webhook?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=related) — POST /v1/webhooks — Creates a webhook

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/get_webhook.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/get_webhook.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Fget_webhook&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| `id`      | string | Yes      | The webhook ID. |
| `teamId`  | string | No       | Team ID.        |
| `slug`    | string | No       | Team slug.      |


---

[View full sitemap](/docs/sitemap)
