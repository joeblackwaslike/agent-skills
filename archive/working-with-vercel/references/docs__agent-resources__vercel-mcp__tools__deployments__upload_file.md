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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/upload_file.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0f991260b373a6177290f633f91970b5177e51078a6e982d47127143d7e51675"
---

# upload_file

Upload Deployment Files.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [upload_artifact](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact) — Use upload_artifact with Vercel MCP.
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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
