---
title: get_configuration
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/get_configuration
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_configuration with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "75f631619ab83c472dd0e51d9a79a4ca4a2e8a70aa0a71af805de9f4301bf99f"
---

# get_configuration

Retrieve an integration configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.
- [list_integration_configurations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations) — Use list_integration_configurations with Vercel MCP.
- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products) — Use list_integration_configuration_products with Vercel MCP.
- [get_microfrontends_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config) — Use get_microfrontends_config with Vercel MCP.
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | ID of the configuration to check                            |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
