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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "c1433058c44841e7068fcf90338e7fd88eadd49b8905319c92f35c83c20824ae"
---

# upload_file

Upload Deployment Files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=related) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [upload_cert](https://vercel.com/docs/agent-resources/vercel-mcp/tools/domains/upload_cert?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=related) — Use upload_cert with Vercel MCP.
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=related) — Use upload_artifact with Vercel MCP.
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=related) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [get_deployment_file_contents](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_deployment_file_contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=related) — Use get_deployment_file_contents with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments%2Fupload_file&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter       | Type   | Required | Description                                         |
| --------------- | ------ | -------- | --------------------------------------------------- |
| `contentLength` | number | No       | The file size in bytes                              |
| `xVercelDigest` | string | No       | The file SHA1 used to check the integrity           |
| `xNowDigest`    | string | No       | The file SHA1 used to check the integrity           |
| `xNowSize`      | number | No       | The file size as an alternative to `Content-Length` |
| `teamId`        | string | No       | Team ID.                                            |
| `slug`          | string | No       | Team slug.                                          |
| `requestBody`   | string | No       | Provide this binary value as a base64 string.       |


---

[View full sitemap](/docs/sitemap)
