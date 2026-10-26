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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "48326a91cbb977ecc02bba4072575a39bc82aa01c824397d37cf07ebac741cc5"
---

# create_sdk_key

Create an SDK key.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [create_kms_signing_key](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_signing_key) — Use create_kms_signing_key with Vercel MCP.
- [list_feature_flag_sdk_keys](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_feature_flag_sdk_keys) — Use list_feature_flag_sdk_keys with Vercel MCP.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [Create an SDK key](https://vercel.com/docs/rest-api/feature-flags/create-an-sdk-key) — PUT /v1/projects/{projectIdOrName}/feature-flags/sdk-keys — Creates an SDK key.
- [create_kms_issuer](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/create_kms_issuer) — Use create_kms_issuer with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/create_sdk_key.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectIdOrName` | string | Yes      | The project id or name                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`     | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
