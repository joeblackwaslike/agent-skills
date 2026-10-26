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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e0bec06a21a0ab521c6dca243ce3e92ddca3fd17f8c003e86995e913883d6cbc"
---

# create_deployment

Create a [deployment](/docs/deployments) from a Git source or files. Put `name`, `project`, `gitSource` or `files`, and `projectSettings` inside `requestBody`. Use `requestBody.target: "production"` for production, or omit `target` for a preview. Follow the tool's input schema for file formats and build settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Create Deployment](https://v0.app/docs/api/v1/reference/deployments/create) — Create a new deployment for a specific chat and version. This will trigger a deployment to Vercel.
- [deploy_to_vercel](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/deploy_to_vercel) — Use deploy_to_vercel with Vercel MCP.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment) — Use cancel_deployment with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote) — Use request_promote with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment.graph.md)
<!-- /docsgraph:related -->

**Sample prompt:** "Create a preview deployment of my project's main branch"

## Parameters

| Parameter                       | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forceNew`                      | string | No       | Forces a new deployment even if there is a previous similar deployment. Set to `1` to bypass deployment deduplication and always trigger a fresh build. Allowed values: `"0"`, `"1"`.                                                                                                               |
| `skipAutoDetectionConfirmation` | string | No       | Set to `1` to skip framework auto-detection and proceed without confirmation. By default, if Vercel detects a framework that differs from the project setting, the API returns a `400` asking you to confirm. Use this to suppress that check in automated pipelines. Allowed values: `"0"`, `"1"`. |
| `teamId`                        | string | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                  |
| `slug`                          | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                         |
| `requestBody`                   | object | Yes      | Request body for this tool.                                                                                                                                                                                                                                                                         |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
