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
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "81741b93b0de8db27f58a4d8abc5345d5cb8166ac0b4a77d17a87cbf8a3f9eb7"
---

# cancel_deployment

Cancel a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [Delete a Deployment](https://vercel.com/docs/rest-api/deployments/delete-a-deployment) — DELETE /v13/deployments/{id} — This API allows you to delete a deployment, either by supplying its \\`id\\` in the URL or
- [request_rollback](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback) — Use request_rollback with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.

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


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
