---
title: rerequest_check
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks/rerequest_check
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/checks
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use rerequest_check with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c9d6da9034eed1b6ec42c3b60d8c76fc2a8771b1ff194d3ccf022631a7428464"
---

# rerequest_check

Rerequest a check.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update a check](https://vercel.com/docs/rest-api/checks-v2/update-a-check) — PATCH /v2/projects/{projectIdOrName}/checks/{checkId} — Update an existing check.
- [Checks API Reference](https://vercel.com/docs/checks/checks-api) — The Vercel Checks API let you create tests and assertions that run after each deployment has been built, and are powered
- [Delete a check](https://vercel.com/docs/rest-api/checks-v2/delete-a-check) — DELETE /v2/projects/{projectIdOrName}/checks/{checkId} — Delete an existing check and all of its runs.
- [Update a check run](https://vercel.com/docs/rest-api/checks-v2/update-a-check-run) — PATCH /v2/deployments/{deploymentId}/check-runs/{checkRunId} — Update an existing check run for a deployment.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.graph.md](/docs/agent-resources/vercel-mcp/tools/checks/rerequest_check.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `deploymentId` | string  | Yes      | The deployment to rerun the check for.                      |
| `checkId`      | string  | Yes      | The check to rerun                                          |
| `autoUpdate`   | boolean | No       | Mark the check as running                                   |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
