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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "74f2b3033629d77a633777acdde4f8bf556933559da0c657dd096201542d0b5d"
---

# get_deployment

Get a [deployment](/docs/deployments) by ID or hostname.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Deployment](https://v0.app/docs/api/v1/reference/deployments/get-by-id?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Get a deployment by ID. This will return the details of the deployment, including the inspector URL, chat ID, project ID
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Use get_deployment_file_contents with Vercel MCP.
- [get_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Use get_deployment_check_run with Vercel MCP.
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Use list_deployment_files with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Use list_deployments with Vercel MCP.
- [get_git_deployment_context](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_git_deployment_context?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=related) — Use get_git_deployment_context with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter         | Type   | Required | Description                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`         | string | Yes      | The unique identifier or hostname of the deployment.                                                                                                |
| `withGitRepoInfo` | string | No       | When `true`, the response includes the `gitSource` object with the commit SHA, branch name, and connected repository metadata. Defaults to `false`. |
| `teamId`          | string | No       | Team ID.                                                                                                                                            |
| `slug`            | string | No       | Team slug.                                                                                                                                          |

**Sample prompt:** "Get details about my latest production deployment"


---

[View full sitemap](/docs/sitemap)
