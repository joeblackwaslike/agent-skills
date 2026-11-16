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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "d626fff37dec35458a72d6d67958379d3a0e08d891f6bb6b3e5f6bc56b4dd613"
---

# get_microfrontends_config

Get microfrontends config for a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config_for_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project) — Use get_microfrontends_config_for_project with Vercel MCP.
- [Get microfrontends config for a deployment](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-deployment) — GET /v1/microfrontends/{deploymentId}/config — Get the microfrontends config for a deployment.
- [Get microfrontends config for a project](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-project) — GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config — Get the microfrontends config for a project by
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `deploymentId` | string | Yes      | The unique deployment identifier                            |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
