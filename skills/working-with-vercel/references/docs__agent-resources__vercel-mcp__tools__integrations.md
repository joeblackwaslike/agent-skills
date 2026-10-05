---
title: Integrations
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/integrations
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d0e2512909ab1fce42ce529dd7465698410c2e0623cdd5991b3a179f8e75ab97"
---

# Integrations

Inspect the integrations installed for your account or team, including their products and available billing plans. You can also look up webhook details and find connected Git repositories.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=related) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [List integration billing plans](https://vercel.com/docs/rest-api/integrations/list-integration-billing-plans?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=related) — GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans — Get a list of billing plans fo
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Vercel Integrations](https://vercel.com/docs/integrations?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=related) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=related) — Learn how you can add a product to your Vercel project through a native integration.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fintegrations&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `get_configuration`

Retrieve an integration configuration.

## Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `id`      | string | Yes      | ID of the configuration to check |
| `teamId`  | string | No       | Team ID.                         |
| `slug`    | string | No       | Team slug.                       |

## `get_webhook`

Get a webhook.

## Parameters

| Parameter | Type   | Required | Description     |
| --------- | ------ | -------- | --------------- |
| `id`      | string | Yes      | The webhook ID. |
| `teamId`  | string | No       | Team ID.        |
| `slug`    | string | No       | Team slug.      |

## `list_integration_billing_plans`

List integration billing plans.

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

## `list_integration_configuration_products`

List products for integration configuration.

## Parameters

| Parameter | Type   | Required | Description                         |
| --------- | ------ | -------- | ----------------------------------- |
| `id`      | string | Yes      | ID of the integration configuration |
| `teamId`  | string | No       | Team ID.                            |
| `slug`    | string | No       | Team slug.                          |

## `list_integration_configurations`

Get configurations for the authenticated user or team.

## Parameters

| Parameter             | Type   | Required | Description                                                                                                          |
| --------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `view`                | string | Yes      | Whether to list account-level or project-level integration configurations. Allowed values: `"account"`, `"project"`. |
| `installationType`    | string | No       | Allowed values: `"marketplace"`, `"external"`, `"provisioning"`.                                                     |
| `integrationIdOrSlug` | string | No       | ID of the integration                                                                                                |
| `teamId`              | string | No       | Team ID.                                                                                                             |
| `slug`                | string | No       | Team slug.                                                                                                           |

## `search_repo`

List git repositories linked to namespace by provider.

## Parameters

| Parameter        | Type                     | Required | Description                                                                                                           |
| ---------------- | ------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `query`          | string                   | No       | -                                                                                                                     |
| `namespaceId`    | string \| number \| null | No       | -                                                                                                                     |
| `provider`       | string                   | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`, `"cursor-origin"`. |
| `installationId` | string                   | No       | -                                                                                                                     |
| `host`           | string                   | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                                     |
| `teamId`         | string                   | No       | Team ID.                                                                                                              |
| `slug`           | string                   | No       | Team slug.                                                                                                            |


---

[View full sitemap](/docs/sitemap)
