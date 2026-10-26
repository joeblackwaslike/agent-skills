---
title: Checks
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/checks
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for checks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e4c341c050abaf258512301dedda64bfd0883059365868532f89ba5ed5459891"
---

# Checks

Request another run of a legacy deployment check. MCP does not create checks or manage the newer deployment check-run API.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Checks API Reference](https://vercel.com/docs/checks/checks-api) — The Vercel Checks API let you create tests and assertions that run after each deployment has been built, and are powered
- [Create a check run](https://vercel.com/docs/rest-api/checks-v2/create-a-check-run) — POST /v2/deployments/{deploymentId}/check-runs — Creates a new check run for a deployment.
- [List runs for a check](https://vercel.com/docs/rest-api/checks-v2/list-runs-for-a-check) — GET /v2/projects/{projectIdOrName}/checks/{checkId}/runs — List all runs associated with a given check.
- [List check runs for a deployment](https://vercel.com/docs/rest-api/checks-v2/list-check-runs-for-a-deployment) — GET /v2/deployments/{deploymentId}/check-runs — List all check runs for a deployment.
- [Get a check run](https://vercel.com/docs/rest-api/checks-v2/get-a-check-run) — GET /v2/deployments/{deploymentId}/check-runs/{checkRunId} — Return a detailed response for a single check run.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/checks.graph.md](/docs/agent-resources/vercel-mcp/tools/checks.graph.md)
<!-- /docsgraph:related -->

## `rerequest_check`

Rerequest a check.

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
