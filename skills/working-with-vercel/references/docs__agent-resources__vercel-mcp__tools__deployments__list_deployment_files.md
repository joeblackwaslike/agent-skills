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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "73148c93bb7ff7c4d696c34d4a2e7864b7052bc002777f81c0cd95dba137efe5"
---

# list_deployment_files

List Deployment Files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=related) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=related) — Use list_deployment_aliases with Vercel MCP.
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=related) — Use get_deployment_file_contents with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=related) — Use list_deployments with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Flist_deployment_files&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier |
| `teamId`  | string | No       | Team ID.                         |
| `slug`    | string | No       | Team slug.                       |


---

[View full sitemap](/docs/sitemap)
