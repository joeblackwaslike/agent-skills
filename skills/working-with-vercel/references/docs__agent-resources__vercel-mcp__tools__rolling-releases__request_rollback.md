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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_rollback.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "90985e515d431d538130fd3df54f0f79bc180495111f4b3051ece05cff03827c"
---

# request_rollback

Point production traffic to a previous production deployment by ID.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel rollback](https://vercel.com/docs/cli/rollback) — Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.
- [Updates the description for a rollback](https://vercel.com/docs/rest-api/projects/updates-the-description-for-a-rollback) — PATCH /v1/projects/{projectId}/rollback/{deploymentId}/update-description — Updates the reason for a rollback, without c
- [Point production traffic to a previous production deployment by ID](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-previous-production-deployment-by-id) — POST /v1/projects/{projectId}/rollback/{deploymentId} — Allows users to rollback to a deployment.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.
- [cancel_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/cancel_deployment) — Use cancel_deployment with Vercel MCP.

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
