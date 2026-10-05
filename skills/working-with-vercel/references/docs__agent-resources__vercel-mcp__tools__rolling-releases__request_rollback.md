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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4b9c9f4567ea62aaf270118b0384941e107b34ff137ffdf7dc6fd665ae72224e"
---

# request_rollback

Point production traffic to a previous production deployment by ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Point production traffic to a previous production deployment by ID](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-previous-production-deployment-by-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/rollback/{deploymentId} — Allows users to rollback to a deployment.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=related) — Use cancel_deployment with Vercel MCP.
- [vercel rollback](https://vercel.com/docs/cli/rollback?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=related) — Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=related) — Use start_rolling_release with Vercel MCP.
- [Updates the description for a rollback](https://vercel.com/docs/rest-api/projects/updates-the-description-for-a-rollback?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{projectId}/rollback/{deploymentId}/update-description — Updates the reason for a rollback, without c

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_rollback&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                               |
| -------------- | ------- | -------- | ----------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                           |
| `deploymentId` | string  | Yes      | The ID of the deployment to rollback *to* |
| `description`  | string  | No       | The reason for the rollback               |
| `teamId`       | string  | No       | Team ID.                                  |
| `slug`         | string  | No       | Team slug.                                |
| `requestBody`  | unknown | No       | Request body for this tool.               |


---

[View full sitemap](/docs/sitemap)
