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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "474c1dc331073f127d8be5ede2203eddb1ce9eca59c311171c4b7b3da790ac88"
---

# list_deployments

List [deployments](/docs/deployments), optionally filtered by project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Find Deployments](https://v0.app/docs/api/v1/reference/deployments/find?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — Find deployments by project and chat IDs. This will return a list of deployments for the given project and chat IDs.
- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — Use list_deployment_events with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — Use list_deployment_files with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=related) — Use list_deployment_aliases with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployments&source_site=vercel-docs&relationship=graph)
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
| `teamId`            | string           | No       | Team ID.                                                                                                                |
| `slug`              | string           | No       | Team slug.                                                                                                              |

**Sample prompt:** "Show me deployments for my blog project"


---

[View full sitemap](/docs/sitemap)
