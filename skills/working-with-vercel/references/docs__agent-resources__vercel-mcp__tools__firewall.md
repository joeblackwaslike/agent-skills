---
title: Firewall and Security
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for firewall and security.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "27ca987b2d3139f5f84fb27f242722d4b2d0922fa7bcfe0c442f2fdca3a1b9c5"
---

# Firewall and Security

Inspect your firewall configuration and active attack data to understand how Vercel protects your projects. You can update firewall rules or change Attack Challenge mode to respond to unwanted traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Vercel Firewall](https://vercel.com/docs/vercel-firewall?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Update Firewall Configuration](https://vercel.com/docs/rest-api/security/update-firewall-configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related) — PATCH /v1/security/firewall/config — Process updates to modify the existing firewall config for a project
- [Read Firewall Actions Summary by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-summary-by-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=related) — GET /v1/security/firewall/events/summary — Aggregate counts over the firewall actions matched by the same filters as \\`G

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `get_active_attack_status`

Read active attack data.

## Parameters

| Parameter   | Type   | Required | Description     |
| ----------- | ------ | -------- | --------------- |
| `projectId` | string | Yes      | The project ID. |
| `since`     | number | No       | -               |
| `teamId`    | string | Yes      | Team ID.        |
| `slug`      | string | No       | Team slug.      |

## `get_bypass_ip`

Read System Bypass.

## Parameters

| Parameter      | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `projectId`    | string  | Yes      | The project ID.                                              |
| `limit`        | number  | No       | -                                                            |
| `sourceIp`     | string  | No       | Filter by source IP                                          |
| `domain`       | string  | No       | Filter by domain                                             |
| `projectScope` | boolean | No       | Filter by project scoped rules                               |
| `offset`       | string  | No       | Used for pagination. Retrieves results after the provided id |
| `teamId`       | string  | No       | Team ID.                                                     |
| `slug`         | string  | No       | Team slug.                                                   |

## `get_firewall_config`

Read Firewall Configuration.

## Parameters

| Parameter       | Type   | Required | Description                                                                      |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| `projectId`     | string | Yes      | The project ID.                                                                  |
| `teamId`        | string | No       | Team ID.                                                                         |
| `slug`          | string | No       | Team slug.                                                                       |
| `configVersion` | string | Yes      | The firewall configuration version. Use `active` for the deployed configuration. |

## `put_firewall_config`

Put Firewall Configuration.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |

## `update_attack_challenge_mode`

Update Attack Challenge mode.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |

## `update_firewall_config`

Update Firewall Configuration.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
