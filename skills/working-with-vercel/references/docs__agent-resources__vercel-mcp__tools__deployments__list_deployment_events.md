---
title: list_deployment_events
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_deployment_events with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ce016b0c2cba0497e100add06403a94afed7499c12fa14ac06d9ad7f8e29895a"
---

# list_deployment_events

Get deployment events, including build output. Use `direction: "backward"` for recent events and numeric timestamps for `since` and `until`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get deployment events](https://vercel.com/docs/rest-api/deployments/get-deployment-events) — GET /v3/deployments/{idOrUrl}/events — Get the build logs of a deployment by deployment ID and build ID. It can work as
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [get_deployment_build_logs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_build_logs) — Use get_deployment_build_logs with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events.graph.md)
<!-- /docsgraph:related -->

| Parameter    | Type             | Required | Description                                                                                                           |
| ------------ | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`    | string           | Yes      | The unique identifier or hostname of the deployment.                                                                  |
| `direction`  | string           | No       | Order of the returned events based on the timestamp. Allowed values: `"backward"`, `"forward"`. Default: `"forward"`. |
| `follow`     | number           | No       | When enabled, this endpoint will return live events as they happen. Allowed values: `0`, `1`.                         |
| `limit`      | number           | No       | Maximum number of events to return. Provide `-1` to return all available logs.                                        |
| `name`       | string           | No       | Deployment build ID.                                                                                                  |
| `since`      | number           | No       | Timestamp for when build logs should be pulled from.                                                                  |
| `until`      | number           | No       | Timestamp for when the build logs should be pulled up until.                                                          |
| `statusCode` | number \| string | No       | HTTP status code range to filter events by.                                                                           |
| `delimiter`  | number           | No       | Allowed values: `0`, `1`.                                                                                             |
| `builds`     | number           | No       | Allowed values: `0`, `1`.                                                                                             |
| `teamId`     | string           | No       | Team ID to use for this operation.                                                                                    |
| `slug`       | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                           |

**Sample prompt:** "Show me the latest build logs for the failed deployment"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
