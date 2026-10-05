---
title: get_microfrontends_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/microfrontends
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_microfrontends_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "6056a01f46a0538e03983b5761560c719ed5417c74b01bde3649635c80517e96"
---

# get_microfrontends_config

Get microfrontends config for a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=related) — Use get_microfrontends_config_for_project with Vercel MCP.
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=related) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=related) — Use get_rolling_release_config with Vercel MCP.
- [list_microfrontends_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=related) — Use list_microfrontends_group_projects with Vercel MCP.
- [get_configuration](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/get_configuration?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=related) — Use get_configuration with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fmicrofrontends%2Fget_microfrontends_config&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                      |
| -------------- | ------ | -------- | -------------------------------- |
| `deploymentId` | string | Yes      | The unique deployment identifier |
| `teamId`       | string | No       | Team ID.                         |
| `slug`         | string | No       | Team slug.                       |


---

[View full sitemap](/docs/sitemap)
