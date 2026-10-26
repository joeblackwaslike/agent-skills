---
title: get_microfrontends_config_for_project
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/microfrontends
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_microfrontends_config_for_project with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e25bfc5857d4d0f68efdae3ee566361251f8ca2b1e6e72d1d3166490f3bee12f"
---

# get_microfrontends_config_for_project

Get microfrontends config for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_microfrontends_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config) — Use get_microfrontends_config with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [Get microfrontends config for a project](https://vercel.com/docs/rest-api/microfrontends/get-microfrontends-config-for-a-project) — GET /v1/microfrontends/projects/{projectIdOrName}/production-mfe-config — Get the microfrontends config for a project by
- [get_project_env](https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables/get_project_env) — Use get_project_env with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project.graph.md](/docs/agent-resources/vercel-mcp/tools/microfrontends/get_microfrontends_config_for_project.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The name or ID of the project                               |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
