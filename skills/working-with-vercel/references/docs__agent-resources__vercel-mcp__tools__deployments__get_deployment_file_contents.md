---
title: get_deployment_file_contents
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_deployment_file_contents with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "5d8994c6258253798a1e4a5b1846a2bb5b6a53c999496271c707ae75c1e2f08d"
---

# get_deployment_file_contents

Get Deployment File Contents.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=related) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=related) — Use list_deployment_files with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=related) — Use get_deployment with Vercel MCP.
- [get_deployment_check_run](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/get_deployment_check_run?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=related) — Use get_deployment_check_run with Vercel MCP.
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=related) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fget_deployment_file_contents&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                          |
| --------- | ------ | -------- | ---------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                     |
| `fileId`  | string | Yes      | The unique file identifier                           |
| `path`    | string | No       | Path to the file to fetch (only for Git deployments) |
| `teamId`  | string | No       | Team ID.                                             |
| `slug`    | string | No       | Team slug.                                           |


---

[View full sitemap](/docs/sitemap)
