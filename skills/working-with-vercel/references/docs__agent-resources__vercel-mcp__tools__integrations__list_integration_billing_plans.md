---
title: list_integration_billing_plans
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/integrations
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_integration_billing_plans with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c7fa6c78abacdc208b915d1fca4f749d4985ac4b6f79b71ab03c35cb6e856704"
---

# list_integration_billing_plans

List integration billing plans.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List integration billing plans](https://vercel.com/docs/rest-api/integrations/list-integration-billing-plans) — GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans — Get a list of billing plans fo
- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products) — Use list_integration_configuration_products with Vercel MCP.
- [list_integration_configurations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations) — Use list_integration_configurations with Vercel MCP.
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [list_contract_commitments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_contract_commitments) — Use list_contract_commitments with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                    | Type   | Required | Description                                                                                                                                                                               |
| ---------------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `integrationIdOrSlug`        | string | Yes      | The integration ID or slug.                                                                                                                                                               |
| `integrationConfigurationId` | string | No       | -                                                                                                                                                                                         |
| `productIdOrSlug`            | string | Yes      | The integration product ID or slug.                                                                                                                                                       |
| `metadata`                   | string | No       | -                                                                                                                                                                                         |
| `source`                     | string | No       | Allowed values: `"marketplace"`, `"deploy-button"`, `"external"`, `"v0"`, `"resource-claims"`, `"cli"`, `"oauth"`, `"backoffice"`, `"import-recommended-integrations"`, `"organization"`. |
| `teamId`                     | string | No       | Team ID to use for this operation.                                                                                                                                                        |
| `slug`                       | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                               |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
