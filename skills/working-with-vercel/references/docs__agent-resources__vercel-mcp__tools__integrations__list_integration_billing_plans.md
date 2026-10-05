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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "ded59d1305dfb98624f879ecde99a611a22cd202872f4ee8749d66212cc7f7aa"
---

# list_integration_billing_plans

List integration billing plans.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List integration billing plans](https://vercel.com/docs/rest-api/integrations/list-integration-billing-plans?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=related) — GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans — Get a list of billing plans fo
- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=related) — Use list_integration_configuration_products with Vercel MCP.
- [list_integration_configurations](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=related) — Use list_integration_configurations with Vercel MCP.
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=related) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [list_billing_charges](https://vercel.com/docs/agent-resources/vercel-mcp/tools/billing/list_billing_charges?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=related) — Use list_billing_charges with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations%2Flist_integration_billing_plans&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter                    | Type   | Required | Description                                                                                                                                                             |
| ---------------------------- | ------ | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `integrationIdOrSlug`        | string | Yes      | The integration ID or slug.                                                                                                                                             |
| `integrationConfigurationId` | string | No       | -                                                                                                                                                                       |
| `productIdOrSlug`            | string | Yes      | The integration product ID or slug.                                                                                                                                     |
| `metadata`                   | string | No       | -                                                                                                                                                                       |
| `source`                     | string | No       | Allowed values: `"marketplace"`, `"deploy-button"`, `"external"`, `"v0"`, `"resource-claims"`, `"cli"`, `"oauth"`, `"backoffice"`, `"import-recommended-integrations"`. |
| `teamId`                     | string | No       | Team ID.                                                                                                                                                                |
| `slug`                       | string | No       | Team slug.                                                                                                                                                              |


---

[View full sitemap](/docs/sitemap)
