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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configurations.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "87aa9d3ec1cdb2a8761587fa05f418dbdb5007ff7d90329dfbae19a5221d5628"
---

# list_integration_configurations

Get configurations for the authenticated user or team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_integration_configuration_products](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_configuration_products) — Use list_integration_configuration_products with Vercel MCP.
- [list_integration_billing_plans](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/list_integration_billing_plans) — Use list_integration_billing_plans with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration) — Use get_configuration with Vercel MCP.
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing

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
