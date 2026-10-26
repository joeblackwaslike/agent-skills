---
title: list_deployment_files
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_deployment_files with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e653585679d392612e00d97b54a9aa33d214009dc5b7c781dd38860ac351f25c"
---

# list_deployment_files

List Deployment Files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases) — Use list_deployment_aliases with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [list_deployment_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_events) — Use list_deployment_events with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                            |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
