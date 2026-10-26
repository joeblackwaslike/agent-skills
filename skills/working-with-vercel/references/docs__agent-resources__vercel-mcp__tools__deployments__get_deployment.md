---
title: get_deployment
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/deployments
summary: Use get_deployment with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "fe94b4c2768649388c75a84ff5639172f79d58cafa7c0cfafa85772fcff0a160"
---

# get_deployment

Get a [deployment](/docs/deployments) by ID or hostname.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.
- [get_deployment_feature_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags) — Use get_deployment_feature_flags with Vercel MCP.
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context) — Use get_git_deployment_context with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md)
<!-- /docsgraph:related -->

| Parameter         | Type   | Required | Description                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`         | string | Yes      | The unique identifier or hostname of the deployment.                                                                                                |
| `withGitRepoInfo` | string | No       | When `true`, the response includes the `gitSource` object with the commit SHA, branch name, and connected repository metadata. Defaults to `false`. |
| `teamId`          | string | No       | Team ID to use for this operation.                                                                                                                  |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                         |

**Sample prompt:** "Get details about my latest production deployment"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `idOrUrl` | string | Yes      | -       | The unique identifier or hostname of the deployment.      |
| `teamId`  | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
