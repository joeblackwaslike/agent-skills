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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "72297fc0dac84eb0e258ab6a096ba61dbcf5a9ed9b0d21559c3954edf176277d"
---

# cancel_deployment

Cancel a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Delete Deployment](https://v0.app/docs/api/v1/reference/deployments/delete?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — Delete a deployment by ID. This will delete the deployment from Vercel.
- [Delete a Deployment](https://vercel.com/docs/rest-api/deployments/delete-a-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — DELETE /v13/deployments/{id} — This API allows you to delete a deployment, either by supplying its \\`id\\` in the URL or
- [request_rollback](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — Use request_rollback with Vercel MCP.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — Use create_deployment with Vercel MCP.
- [create_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/create_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — Use create_deployment_check_run with Vercel MCP.
- [update_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=related) — Use update_deployment_check_run with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fcancel_deployment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type    | Required | Description                              |
| ------------- | ------- | -------- | ---------------------------------------- |
| `id`          | string  | Yes      | The unique identifier of the deployment. |
| `teamId`      | string  | No       | Team ID.                                 |
| `slug`        | string  | No       | Team slug.                               |
| `requestBody` | unknown | No       | Request body for this tool.              |


---

[View full sitemap](/docs/sitemap)
