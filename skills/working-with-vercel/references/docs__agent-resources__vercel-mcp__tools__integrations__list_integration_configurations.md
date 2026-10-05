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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "b66c7ec31db2ce159d7a17cb9401ec877dcc9f2edba1c382c79bbefba21fc2fe"
---

# list_integration_configurations

Get configurations for the authenticated user or team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=related) — Use list_integration_configuration_products with Vercel MCP.
- [list_integration_billing_plans](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=related) — Use list_integration_billing_plans with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=related) — Use get_configuration with Vercel MCP.
- [Get configurations for the authenticated user or team](https://vercel.com/docs/rest-api/integrations/get-configurations-for-the-authenticated-user-or-team?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=related) — GET /v1/integrations/configurations — Allows to retrieve all configurations for an authenticated integration. When the \\
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=related) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_configurations&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter             | Type   | Required | Description                                                                                                          |
| --------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `view`                | string | Yes      | Whether to list account-level or project-level integration configurations. Allowed values: `"account"`, `"project"`. |
| `installationType`    | string | No       | Allowed values: `"marketplace"`, `"external"`, `"provisioning"`.                                                     |
| `integrationIdOrSlug` | string | No       | ID of the integration                                                                                                |
| `teamId`              | string | No       | Team ID.                                                                                                             |
| `slug`                | string | No       | Team slug.                                                                                                           |


---

[View full sitemap](/docs/sitemap)
