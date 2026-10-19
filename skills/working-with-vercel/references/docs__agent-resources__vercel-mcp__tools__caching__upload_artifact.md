---
title: upload_artifact
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/upload_artifact
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use upload_artifact with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4c5831f87e1a3c6f277dc40331c929ee88729e007f12a5ab441c45bd2d73fb5a"
---

# upload_artifact

Upload a cache artifact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload a cache artifact](https://turborepo.dev/docs/openapi/artifacts/upload-artifact) — Uploads a cache artifact identified by the `hash` specified on the path. The cache artifact can then be downloaded with
- [Upload a cache artifact](https://vercel.com/docs/rest-api/artifacts/upload-a-cache-artifact) — PUT /v8/artifacts/{hash} — Uploads a cache artifact identified by the \\`hash\\` specified on the path. The cache artifact
- [Download a cache artifact](https://vercel.com/docs/rest-api/artifacts/download-a-cache-artifact) — GET /v8/artifacts/{hash} — Downloads a cache artifact indentified by its \\`hash\\` specified on the request path. The art
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [upload_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/upload_file) — Use upload_file with Vercel MCP.
- [record_events](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/record_events) — Use record_events with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                    | Type    | Required | Description                                                                                                                                |
| ---------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `contentLength`              | number  | Yes      | The artifact size in bytes                                                                                                                 |
| `xArtifactDuration`          | number  | No       | The time taken to generate the uploaded artifact in milliseconds.                                                                          |
| `xArtifactClientCi`          | string  | No       | The continuous integration or delivery environment where this artifact was generated.                                                      |
| `xArtifactClientInteractive` | integer | No       | 1 if the client is an interactive shell. Otherwise 0 Minimum: 0. Maximum: 1.                                                               |
| `xArtifactTag`               | string  | No       | The base64 encoded tag for this artifact. The value is sent back to clients when the artifact is downloaded as the header `x-artifact-tag` |
| `xArtifactSha`               | string  | No       | The SHA of the source control revision that generated this artifact.                                                                       |
| `xArtifactDirtyHash`         | string  | No       | A hash representing uncommitted changes in the working directory when this artifact was generated.                                         |
| `hash`                       | string  | Yes      | The artifact hash                                                                                                                          |
| `teamId`                     | string  | No       | Team ID to use for this operation.                                                                                                         |
| `slug`                       | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                                                |
| `requestBody`                | string  | Yes      | Provide this binary value as a base64 string.                                                                                              |


---

[View full sitemap](/docs/sitemap)
