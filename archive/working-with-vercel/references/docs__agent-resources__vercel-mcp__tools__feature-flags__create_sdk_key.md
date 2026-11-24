---
title: create_sdk_key
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_sdk_key with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "2c0027430395877b36f1d36918a56214ae48f0805243691fae6a34f0fc84f9d7"
---

# create_sdk_key

Create an SDK key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [list_feature_flag_sdk_keys](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys) — Use list_feature_flag_sdk_keys with Vercel MCP.
- [Create an SDK key](https://vercel.com/docs/rest-api/feature-flags/create-an-sdk-key) — PUT /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Creates an SDK key.
- [Delete an SDK key](https://vercel.com/docs/rest-api/feature-flags/delete-an-sdk-key) — DELETE /v1/projects/{projectIdOrName}/feature-flags/sdk-keys/{hashKey} — Deletes an SDK key.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |

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
