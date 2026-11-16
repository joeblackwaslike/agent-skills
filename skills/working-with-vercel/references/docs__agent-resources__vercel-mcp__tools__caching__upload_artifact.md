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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/upload_artifact.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0a46edefadb15389f1c3faf442206b5347328360697bb5551314d2144149f61a"
---

# upload_artifact

Upload a cache artifact.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload a cache artifact](https://vercel.com/docs/rest-api/artifacts/upload-a-cache-artifact) — PUT /v8/artifacts/{hash} — Uploads a cache artifact identified by the \\`hash\\` specified on the path. The cache artifact
- [Download a cache artifact](https://vercel.com/docs/rest-api/artifacts/download-a-cache-artifact) — GET /v8/artifacts/{hash} — Downloads a cache artifact indentified by its \\`hash\\` specified on the request path. The art
- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [Query information about an artifact](https://vercel.com/docs/rest-api/artifacts/query-information-about-an-artifact) — POST /v8/artifacts — Query information about an array of artifacts.
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he

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
