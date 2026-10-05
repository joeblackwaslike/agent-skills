---
title: Caching
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for caching.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a4c602c37517b399da89f30aa902fab6d77223f50de038c943311a39f237b3f5"
---

# Caching

Manage cached build artifacts and check Remote Caching status for your account or team. You can also invalidate cached content by tag or source image when it needs to refresh.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Upload a cache artifact](https://vercel.com/docs/rest-api/artifacts/upload-a-cache-artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=related) — PUT /v8/artifacts/{hash} — Uploads a cache artifact identified by the \\`hash\\` specified on the path. The cache artifact
- [Download a cache artifact](https://vercel.com/docs/rest-api/artifacts/download-a-cache-artifact?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=related) — GET /v8/artifacts/{hash} — Downloads a cache artifact indentified by its \\`hash\\` specified on the request path. The art
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=related) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he
- [Record an artifacts cache usage event](https://vercel.com/docs/rest-api/artifacts/record-an-artifacts-cache-usage-event?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=related) — POST /v8/artifacts/events — Records an artifacts cache usage event. The body of this request is an array of cache usage
- [Get status of Remote Caching for this principal](https://vercel.com/docs/rest-api/artifacts/get-status-of-remote-caching-for-this-principal?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=related) — GET /v8/artifacts/status — Check the status of Remote Caching for this principal. Returns a JSON-encoded status indicati

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching.graph.md](/docs/agent-resources/vercel-mcp/tools/caching.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fcaching&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `artifact_query`

Query information about an artifact.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | Yes      | Request body for this tool. |

## `invalidate_by_src_images`

Invalidate by source image.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.     |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |

## `invalidate_by_tags`

Invalidate by tag.

## Parameters

| Parameter         | Type   | Required | Description                 |
| ----------------- | ------ | -------- | --------------------------- |
| `projectIdOrName` | string | Yes      | The project ID or name.     |
| `teamId`          | string | No       | Team ID.                    |
| `slug`            | string | No       | Team slug.                  |
| `requestBody`     | object | No       | Request body for this tool. |

## `record_events`

Record an artifacts cache usage event.

## Parameters

| Parameter                    | Type             | Required | Description                                                                           |
| ---------------------------- | ---------------- | -------- | ------------------------------------------------------------------------------------- |
| `xArtifactClientCi`          | string           | No       | The continuous integration or delivery environment where this artifact is downloaded. |
| `xArtifactClientInteractive` | integer          | No       | 1 if the client is an interactive shell. Otherwise 0                                  |
| `teamId`                     | string           | No       | Team ID.                                                                              |
| `slug`                       | string           | No       | Team slug.                                                                            |
| `requestBody`                | Array\<object> | Yes      | Request body for this tool.                                                           |

## `status`

Get status of Remote Caching for this principal.

## Parameters

| Parameter | Type   | Required | Description |
| --------- | ------ | -------- | ----------- |
| `teamId`  | string | No       | Team ID.    |
| `slug`    | string | No       | Team slug.  |

## `upload_artifact`

Upload a cache artifact.

## Parameters

| Parameter                    | Type    | Required | Description                                                                                                                                |
| ---------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `contentLength`              | number  | No       | The artifact size in bytes                                                                                                                 |
| `xArtifactDuration`          | number  | No       | The time taken to generate the uploaded artifact in milliseconds.                                                                          |
| `xArtifactClientCi`          | string  | No       | The continuous integration or delivery environment where this artifact was generated.                                                      |
| `xArtifactClientInteractive` | integer | No       | 1 if the client is an interactive shell. Otherwise 0                                                                                       |
| `xArtifactTag`               | string  | No       | The base64 encoded tag for this artifact. The value is sent back to clients when the artifact is downloaded as the header `x-artifact-tag` |
| `xArtifactSha`               | string  | No       | The SHA of the source control revision that generated this artifact.                                                                       |
| `xArtifactDirtyHash`         | string  | No       | A hash representing uncommitted changes in the working directory when this artifact was generated.                                         |
| `hash`                       | string  | Yes      | The artifact hash                                                                                                                          |
| `teamId`                     | string  | No       | Team ID.                                                                                                                                   |
| `slug`                       | string  | No       | Team slug.                                                                                                                                 |
| `requestBody`                | string  | Yes      | Provide this binary value as a base64 string.                                                                                              |


---

[View full sitemap](/docs/sitemap)
