---
title: upload_file
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments/upload_file
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/upload_file"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/deployments
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use upload_file with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "46d51b8c1e18a3f931361e93c991b8b853e81644a0a77795e3baed3aa254fd04"
---

# upload_file

Upload Deployment Files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents) — Use get_deployment_file_contents with Vercel MCP.
- [Upload a blob chunk](https://vercel.com/docs/rest-api/vcr/upload-a-blob-chunk) — PATCH /v2/{teamSlug}/{projectSlug}/{repositoryName}/blobs/uploads/{uuid} — PATCH /v2/:teamSlug/:projectSlug/:repositoryN

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter       | Type   | Required | Description                                                 |
| --------------- | ------ | -------- | ----------------------------------------------------------- |
| `contentLength` | number | No       | The file size in bytes                                      |
| `xVercelDigest` | string | No       | The file SHA1 used to check the integrity                   |
| `xNowDigest`    | string | No       | The file SHA1 used to check the integrity                   |
| `xNowSize`      | number | No       | The file size as an alternative to `Content-Length`         |
| `teamId`        | string | No       | Team ID to use for this operation.                          |
| `slug`          | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`   | string | No       | Provide this binary value as a base64 string.               |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
