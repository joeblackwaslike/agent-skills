---
title: list_deployments
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/list_deployments
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployments
summary: Use list_deployments with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "872d1344047f9133a1f0fd547717dfb9b7a0d8d731f5e7bf4794970210b01774"
---

# list_deployments

List [deployments](/docs/deployments), optionally filtered by project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events) — Use list_deployment_events with Vercel MCP.
- [open_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/open_deployments) — Use open_deployments with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments.graph.md)
<!-- /docsgraph:related -->

| Parameter           | Type             | Required | Description                                                                                                             |
| ------------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `app`               | string           | No       | Name of the deployment.                                                                                                 |
| `from`              | number           | No       | Gets the deployment created after this Date timestamp. (default: current time)                                          |
| `limit`             | number           | No       | Maximum number of deployments to list from a request.                                                                   |
| `projectId`         | string           | No       | Filter deployments from the given ID or name.                                                                           |
| `projectIds`        | Array\<string> | No       | Filter deployments from the given project IDs. Cannot be used when projectId is specified.                              |
| `target`            | string           | No       | Filter deployments based on the environment.                                                                            |
| `to`                | number           | No       | Gets the deployment created before this Date timestamp. (default: current time)                                         |
| `users`             | string           | No       | Filter out deployments based on users who have created the deployment.                                                  |
| `since`             | number           | No       | Get Deployments created after this JavaScript timestamp.                                                                |
| `until`             | number           | No       | Get Deployments created before this JavaScript timestamp.                                                               |
| `state`             | string           | No       | Filter deployments based on their state (`BUILDING`, `ERROR`, `INITIALIZING`, `QUEUED`, `READY`, `CANCELED`, `BLOCKED`) |
| `rollbackCandidate` | boolean          | No       | Filter deployments based on their rollback candidacy                                                                    |
| `branch`            | string           | No       | Filter deployments based on the branch name                                                                             |
| `sha`               | string           | No       | Filter deployments based on the SHA                                                                                     |
| `teamId`            | string           | No       | Team ID to use for this operation.                                                                                      |
| `slug`              | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                             |

**Sample prompt:** "Show me deployments for my blog project"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to list deployments for.                   |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `since`     | number | No       | -       | Get deployments created after this timestamp.             |
| `until`     | number | No       | -       | Get deployments created before this timestamp.            |


---

[View full sitemap](/docs/sitemap)
