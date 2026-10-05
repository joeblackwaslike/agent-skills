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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "140da0c21b08308c0f48fa5ea863f44bc7732c13de70f12f9ced28daac68fd71"
---

# request_promote

Point production traffic to a given deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Point production traffic to a given deployment](https://vercel.com/docs/rest-api/projects/point-production-traffic-to-a-given-deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=related) — POST /v10/projects/{projectId}/promote/{deploymentId} — Allows users to promote a deployment to production. Note: This d
- [vercel promote](https://vercel.com/docs/cli/promote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=related) — Learn how to promote an existing deployment using the vercel promote CLI command.
- [accept_project_transfer_request](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=related) — Use accept_project_transfer_request with Vercel MCP.
- [create_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/create_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=related) — Use create_deployment with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Frequest_promote&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                 |
| -------------- | ------- | -------- | --------------------------- |
| `projectId`    | string  | Yes      | The project ID.             |
| `deploymentId` | string  | Yes      | The deployment ID.          |
| `teamId`       | string  | No       | Team ID.                    |
| `slug`         | string  | No       | Team slug.                  |
| `requestBody`  | unknown | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
