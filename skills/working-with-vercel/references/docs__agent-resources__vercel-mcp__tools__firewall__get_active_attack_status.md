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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d6bb2dab4799f1e98b9749709778d67ce31e34fc90d3cfa4c498e8dae897351e"
---

# get_active_attack_status

Read active attack data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Read active attack data](https://vercel.com/docs/rest-api/security/read-active-attack-data?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=related) — GET /v1/security/firewall/attack-status — Retrieve active attack data within the last N days \\(default: 1 day\\)
- [status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=related) — Use status with Vercel MCP.
- [update_attack_challenge_mode](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=related) — Use update_attack_challenge_mode with Vercel MCP.
- [Update Attack Challenge mode](https://vercel.com/docs/rest-api/security/update-attack-challenge-mode?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=related) — POST /v1/security/attack-mode — Update the setting for determining if the project has Attack Challenge mode enabled.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=related) — Use get_rolling_release_billing_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_active_attack_status&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter   | Type   | Required | Description     |
| ----------- | ------ | -------- | --------------- |
| `projectId` | string | Yes      | The project ID. |
| `since`     | number | No       | -               |
| `teamId`    | string | Yes      | Team ID.        |
| `slug`      | string | No       | Team slug.      |


---

[View full sitemap](/docs/sitemap)
