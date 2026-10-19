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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "9db809b277f571cd89fc8df6d9b5f40d043c0996765da803231ec96dbe07208b"
---

# Integrations

Inspect integration configurations and billing plans, search repositories, and list webhooks for your team or project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [List integration billing plans](https://vercel.com/docs/rest-api/integrations/list-integration-billing-plans) — GET /v1/integrations/integration/{integrationIdOrSlug}/products/{productIdOrSlug}/plans — Get a list of billing plans fo
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Get configurations for the authenticated user or team](https://vercel.com/docs/rest-api/integrations/get-configurations-for-the-authenticated-user-or-team) — GET /v1/integrations/configurations — Allows to retrieve all configurations for an authenticated integration. When the \\
- [Vercel Integrations](https://vercel.com/docs/integrations) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/integrations.graph.md](/docs/agent-resources/vercel-mcp/tools/integrations.graph.md)
<!-- /docsgraph:related -->

## `get_configuration`

Retrieve an integration configuration.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | ID of the configuration to check                            |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_webhooks`

Get a list of webhooks

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | No       | The project ID.                                             |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_integration_billing_plans`

List integration billing plans.

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

## `list_integration_configuration_products`

Returns products available for an integration configuration. Each product includes a `metadataSchema` field with the JSON Schema for required and optional metadata fields.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | ID of the integration configuration                         |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_integration_configurations`

Get configurations for the authenticated user or team.

## Parameters

| Parameter             | Type   | Required | Description                                                                                                          |
| --------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------- |
| `view`                | string | Yes      | Whether to list account-level or project-level integration configurations. Allowed values: `"account"`, `"project"`. |
| `installationType`    | string | No       | Allowed values: `"marketplace"`, `"external"`, `"provisioning"`.                                                     |
| `integrationIdOrSlug` | string | No       | ID of the integration                                                                                                |
| `teamId`              | string | No       | Team ID to use for this operation.                                                                                   |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId.                                                          |

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
| `teamId`         | string                   | No       | Team ID to use for this operation.                                                                                    |
| `slug`           | string                   | No       | Team slug to use for this operation. Use instead of teamId.                                                           |


---

[View full sitemap](/docs/sitemap)
