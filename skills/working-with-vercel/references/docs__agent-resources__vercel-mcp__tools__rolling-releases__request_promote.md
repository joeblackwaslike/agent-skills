---
title: request_promote
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use request_promote with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a40513d140fe3690dd04d08703a554cc66b8230ea866f47f67db94e6b5645abf"
---

# request_promote

Point production traffic to a given deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel promote](https://vercel.com/docs/cli/promote) — Learn how to promote an existing deployment using the vercel promote CLI command.
- [Point production traffic to a given deployment](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-given-deployment) — POST /v10/projects/{projectId}/promote/{deploymentId} — Allows users to promote a deployment to production. Note: This d
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment) — Use create_deployment with Vercel MCP.
- [accept_project_transfer_request](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request) — Use accept_project_transfer_request with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`    | string  | Yes      | The project ID.                                             |
| `deploymentId` | string  | Yes      | The deployment ID.                                          |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
