---
title: cancel_deployment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use cancel_deployment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "552acd69bd29a25b86a39ea6a52acba58fc7c39835bad3e484903d494c004336"
---

# cancel_deployment

Cancel a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Delete a Deployment](https://vercel.com/docs/rest-api/deployments/delete-a-deployment) — DELETE /v13/deployments/{id} — This API allows you to delete a deployment, either by supplying its \\`id\\` in the URL or
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [request_rollback](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback) — Use request_rollback with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `id`          | string  | Yes      | The unique identifier of the deployment.                    |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
