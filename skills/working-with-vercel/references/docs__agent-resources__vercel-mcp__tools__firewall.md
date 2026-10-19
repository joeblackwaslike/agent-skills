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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "598578b95f64b9fa9b7fe3ff368b95d913799f0cc60779ea7c62b9077b91fb8b"
---

# Firewall and Security

Inspect your firewall configuration and active attack data to understand how Vercel protects your projects. You can update firewall rules or change Attack Challenge mode to respond to unwanted traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Firewall](https://vercel.com/docs/vercel-firewall) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Update Firewall Configuration](https://vercel.com/docs/rest-api/security/update-firewall-configuration) — PATCH /v1/security/firewall/config — Process updates to modify the existing firewall config for a project
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Get conditional firewall bypasses](https://vercel.com/docs/rest-api/security/get-conditional-firewall-bypasses) — GET /v1/security/firewall/bypass/rules — Retrieve conditional firewall bypass rules for a project.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall.graph.md)
<!-- /docsgraph:related -->

## `get_active_attack_status`

Read active attack data.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID.                                             |
| `since`     | number | No       | Minimum: 1.                                                 |
| `teamId`    | string | Yes      | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_bypass_ip`

Read System Bypass.

## Parameters

| Parameter      | Type    | Required | Description                                                  |
| -------------- | ------- | -------- | ------------------------------------------------------------ |
| `projectId`    | string  | Yes      | The project ID.                                              |
| `limit`        | number  | No       | Maximum: 256.                                                |
| `sourceIp`     | string  | No       | Filter by source IP                                          |
| `domain`       | string  | No       | Filter by domain                                             |
| `projectScope` | boolean | No       | Filter by project scoped rules                               |
| `offset`       | string  | No       | Used for pagination. Retrieves results after the provided id |
| `teamId`       | string  | No       | Team ID to use for this operation.                           |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId.  |

## `get_firewall_config`

Read Firewall Configuration.

## Parameters

| Parameter       | Type   | Required | Description                                                                      |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| `projectId`     | string | Yes      | The project ID.                                                                  |
| `teamId`        | string | No       | Team ID to use for this operation.                                               |
| `slug`          | string | No       | Team slug to use for this operation. Use instead of teamId.                      |
| `configVersion` | string | Yes      | The firewall configuration version. Use `active` for the deployed configuration. |

## `put_firewall_config`

Put Firewall Configuration.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `update_attack_challenge_mode`

Update Attack Challenge mode.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `update_firewall_config`

Update Firewall Configuration.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
