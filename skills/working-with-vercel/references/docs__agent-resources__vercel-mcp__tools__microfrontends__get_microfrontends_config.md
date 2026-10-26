---
title: get_microfrontends_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/microfrontends
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_microfrontends_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d83a4578784a683f73dc2773dfe56a3634bb746addff59f2557a487d25f189c8"
---

# get_microfrontends_config

Get microfrontends config for a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project) — Use get_microfrontends_config_for_project with Vercel MCP.
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration) — Use get_configuration with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `deploymentId` | string | Yes      | The unique deployment identifier                            |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
