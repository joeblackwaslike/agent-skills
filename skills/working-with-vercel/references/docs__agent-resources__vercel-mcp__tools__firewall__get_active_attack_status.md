---
title: get_active_attack_status
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_active_attack_status with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4ff0fbe988d38c121ebee493c5df8237204698e64139b852c64973ea9d7b277b"
---

# get_active_attack_status

Read active attack data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Read active attack data](https://vercel.com/docs/rest-api/security/read-active-attack-data) — GET /v1/security/firewall/attack-status — Retrieve active attack data within the last N days \\(default: 1 day\\)
- [update_attack_challenge_mode](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode) — Use update_attack_challenge_mode with Vercel MCP.
- [Update Attack Challenge mode](https://vercel.com/docs/rest-api/security/update-attack-challenge-mode) — POST /v1/security/attack-mode — Update the setting for determining if the project has Attack Challenge mode enabled.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [get_remote_cache_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status) — Use get_remote_cache_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId` | string | Yes      | The project ID.                                             |
| `since`     | number | No       | Minimum: 1.                                                 |
| `teamId`    | string | Yes      | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
