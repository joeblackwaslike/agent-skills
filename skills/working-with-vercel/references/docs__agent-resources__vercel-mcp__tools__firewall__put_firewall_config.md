---
title: put_firewall_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use put_firewall_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "1b99630842073fb0c95a0ee654014feb70e2bcbc29697c4e125e199b485e56c2"
---

# put_firewall_config

Put Firewall Configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=related) — Use update_firewall_config with Vercel MCP.
- [get_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=related) — Use get_firewall_config with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=related) — Use update_rolling_release_config with Vercel MCP.
- [Update Firewall Configuration](https://vercel.com/docs/rest-api/security/update-firewall-configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=related) — PATCH /v1/security/firewall/config — Process updates to modify the existing firewall config for a project

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fput_firewall_config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
