---
title: request_rollback
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use request_rollback with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "9788cd1b8117bc8d9bf24d8389af1f5ae14e9e8a245e88b3a1aece4c50b34726"
---

# request_rollback

Point production traffic to a previous production deployment by ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Point production traffic to a previous production deployment by ID](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-previous-production-deployment-by-id) — POST /v1/projects/{projectId}/rollback/{deploymentId} — Allows users to rollback to a deployment.
- [vercel rollback](https://vercel.com/docs/cli/rollback) — Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment) — Use cancel_deployment with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.
- [Updates the description for a rollback](https://vercel.com/docs/rest-api/projects/updates-the-description-for-a-rollback) — PATCH /v1/projects/{projectId}/rollback/{deploymentId}/update-description — Updates the reason for a rollback, without c

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                                             |
| `deploymentId` | string  | Yes      | The ID of the deployment to rollback *to*                   |
| `description`  | string  | No       | The reason for the rollback                                 |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
