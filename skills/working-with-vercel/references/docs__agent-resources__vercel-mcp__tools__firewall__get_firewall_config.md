---
title: get_firewall_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_firewall_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c4340063b6e9bbdcdbdc08c17eed8886bbb8dbea06877fae88835bda30ee32b9"
---

# get_firewall_config

Read Firewall Configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=related) — Use update_firewall_config with Vercel MCP.
- [put_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=related) — Use put_firewall_config with Vercel MCP.
- [get_microfrontends_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config with Vercel MCP.
- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config_for_project with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=related) — Use get_configuration with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Ffirewall%2Fget_firewall_config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter       | Type   | Required | Description                                                                      |
| --------------- | ------ | -------- | -------------------------------------------------------------------------------- |
| `projectId`     | string | Yes      | The project ID.                                                                  |
| `teamId`        | string | No       | Team ID.                                                                         |
| `slug`          | string | No       | Team slug.                                                                       |
| `configVersion` | string | Yes      | The firewall configuration version. Use `active` for the deployed configuration. |


---

[View full sitemap](/docs/sitemap)
