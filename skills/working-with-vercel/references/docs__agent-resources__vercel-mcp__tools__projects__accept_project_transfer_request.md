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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "7befcbe5e8676fb09d3ae4a12daca0f7ea2f0ed8f60dfec9e6b8f6cda05bc772"
---

# accept_project_transfer_request

Accept project transfer request.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Accept project transfer request](https://vercel.com/docs/rest-api/projects/accept-project-transfer-request) — PUT /projects/transfer-request/{code} — Accept a project transfer request initated by another team. \<br/\> The \\`code\\` i
- [Create project transfer request](https://vercel.com/docs/rest-api/projects/create-project-transfer-request) — POST /projects/{idOrName}/transfer-request — Initiates a project transfer request from one team to another. \<br/\> Return
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote) — Use request_promote with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project) — Use update_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/accept_project_transfer_request.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `code`        | string | Yes      | The code of the project transfer request.                   |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
