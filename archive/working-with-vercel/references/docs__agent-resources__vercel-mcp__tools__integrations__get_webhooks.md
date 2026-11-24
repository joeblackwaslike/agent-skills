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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_webhooks.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "c77060aa2d52df135b04eb61f1075e125ee99b5d7c38df87da21fc3e1d460e71"
---

# get_webhooks

Get a list of webhooks


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Webhooks are now generally available](https://vercel.com/changelog/webhooks-are-now-generally-available)
- [Configurable webhooks ](https://vercel.com/changelog/configurable-webhooks)
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
