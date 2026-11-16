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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "359ea9674612fd19da7ed59ea0c2e041e646a76059d4f416f7a0536bda5f482a"
---

# Firewall and Security

Inspect your firewall configuration and active attack data to understand how Vercel protects your projects. You can update firewall rules or change Attack Challenge mode to respond to unwanted traffic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [Vercel Firewall](https://vercel.com/docs/vercel-firewall) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Update Firewall Configuration](https://vercel.com/docs/rest-api/security/update-firewall-configuration) — PATCH /v1/security/firewall/config — Process updates to modify the existing firewall config for a project
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Read Firewall Actions Summary by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-summary-by-project) — GET /v1/security/firewall/events/summary — Aggregate counts over the firewall actions matched by the same filters as \\`G
- [Read Firewall Actions by Project](https://vercel.com/docs/rest-api/security/read-firewall-actions-by-project) — GET /v1/security/firewall/events — Retrieve firewall actions for a project Rule names are resolved against the project's

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
