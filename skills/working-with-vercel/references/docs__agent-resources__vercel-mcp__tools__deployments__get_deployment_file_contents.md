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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a7b4b40e24ee1cd8473c27b7138ffb0b30c17c0a90a22a4c8d702052a7df03f7"
---

# get_deployment_file_contents

Get Deployment File Contents.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [list_deployment_files](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployment_files) — Use list_deployment_files with Vercel MCP.
- [get_deployment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment) — Use get_deployment with Vercel MCP.
- [get_deployment_feature_flags](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_feature_flags) — Use get_deployment_feature_flags with Vercel MCP.
- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                            |
| `fileId`  | string | Yes      | The unique file identifier                                  |
| `path`    | string | No       | Path to the file to fetch (only for Git deployments)        |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)
