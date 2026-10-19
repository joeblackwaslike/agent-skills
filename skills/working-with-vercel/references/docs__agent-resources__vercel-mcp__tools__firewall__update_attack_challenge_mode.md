---
title: update_attack_challenge_mode
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_attack_challenge_mode with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "45eada12db27ccc04d194828357c6a1a7b5a33fd60803edddb8410def1d67929"
---

# update_attack_challenge_mode

Update Attack Challenge mode.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update Attack Challenge mode](https://vercel.com/docs/rest-api/security/update-attack-challenge-mode) — POST /v1/security/attack-mode — Update the setting for determining if the project has Attack Challenge mode enabled.
- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config) — Use update_firewall_config with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config) — Use update_rolling_release_config with Vercel MCP.
- [get_active_attack_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status) — Use get_active_attack_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
