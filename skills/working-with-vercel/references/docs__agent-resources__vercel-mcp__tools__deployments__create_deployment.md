---
title: create_deployment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/create_deployment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployments
summary: Use create_deployment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "20cf42a7596294f85379b78364fa816729a642785fbff57cb5f3c567715ceb03"
---

# create_deployment

Create a [deployment](/docs/deployments) from a Git source or files. Put `name`, `project`, `gitSource` or `files`, and `projectSettings` inside `requestBody`. Use `requestBody.target: "production"` for production, or omit `target` for a preview. Follow the tool's input schema for file formats and build settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create Deployment](https://v0.app/docs/api/v1/reference/deployments/create?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Create a new deployment for a specific chat and version. This will trigger a deployment to Vercel.
- [create_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Use create_deployment_check_run with Vercel MCP.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Use cancel_deployment with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=related) — Use request_promote with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcreate_deployment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Sample prompt:** "Create a preview deployment of my project's main branch"

## Parameters

| Parameter                       | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forceNew`                      | string | No       | Forces a new deployment even if there is a previous similar deployment. Set to `1` to bypass deployment deduplication and always trigger a fresh build. Allowed values: `"0"`, `"1"`.                                                                                                               |
| `skipAutoDetectionConfirmation` | string | No       | Set to `1` to skip framework auto-detection and proceed without confirmation. By default, if Vercel detects a framework that differs from the project setting, the API returns a `400` asking you to confirm. Use this to suppress that check in automated pipelines. Allowed values: `"0"`, `"1"`. |
| `teamId`                        | string | No       | Team ID.                                                                                                                                                                                                                                                                                            |
| `slug`                          | string | No       | Team slug.                                                                                                                                                                                                                                                                                          |
| `requestBody`                   | object | Yes      | Request body for this tool.                                                                                                                                                                                                                                                                         |


---

[View full sitemap](/docs/sitemap)
