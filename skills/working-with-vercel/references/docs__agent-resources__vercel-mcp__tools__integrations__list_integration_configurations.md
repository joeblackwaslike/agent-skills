---
title: list_integration_configurations
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_integration_configurations with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "dd04ff7c1be569d193a280d4c57a2f930cc362095b7ce4c605ad2e0cbfe0e264"
---

# list_integration_configurations

Get configurations for the authenticated user or team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products) — Use list_integration_configuration_products with Vercel MCP.
- [list_integration_billing_plans](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans) — Use list_integration_billing_plans with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration) — Use get_configuration with Vercel MCP.
- [Get configurations for the authenticated user or team](https://vercel.com/docs/rest-api/integrations/get-configurations-for-the-authenticated-user-or-team) — GET /v1/integrations/configurations — Allows to retrieve all configurations for an authenticated integration. When the \\
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                                                                          |
| --------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `view`                | string | Yes      | Whether to list account-level or project-level integration configurations. Allowed values: `"account"`, `"project"`. |
| `installationType`    | string | No       | Allowed values: `"marketplace"`, `"external"`, `"provisioning"`.                                                     |
| `integrationIdOrSlug` | string | No       | ID of the integration                                                                                                |
| `teamId`              | string | No       | Team ID to use for this operation.                                                                                   |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId.                                                          |


---

[View full sitemap](/docs/sitemap)
