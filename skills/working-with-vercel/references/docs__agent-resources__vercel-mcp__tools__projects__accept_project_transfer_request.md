---
title: accept_project_transfer_request
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use accept_project_transfer_request with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4a996e9a220acea49bee0d8b94286789c86ef2542b03a813b424782fe4af2f7d"
---

# accept_project_transfer_request

Accept project transfer request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Accept project transfer request](https://vercel.com/docs/rest-api/projects/accept-project-transfer-request?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=related) — PUT /projects/transfer-request/{code} — Accept a project transfer request initated by another team. \<br/\> The \\`code\\` i
- [Create project transfer request](https://vercel.com/docs/rest-api/projects/create-project-transfer-request?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=related) — POST /projects/{idOrName}/transfer-request — Initiates a project transfer request from one team to another. \<br/\> Return
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=related) — Use create_project with Vercel MCP.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=related) — Use request_promote with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Faccept_project_transfer_request&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| `code`        | string | Yes      | The code of the project transfer request. |
| `teamId`      | string | No       | Team ID.                                  |
| `slug`        | string | No       | Team slug.                                |
| `requestBody` | object | No       | Request body for this tool.               |


---

[View full sitemap](/docs/sitemap)
