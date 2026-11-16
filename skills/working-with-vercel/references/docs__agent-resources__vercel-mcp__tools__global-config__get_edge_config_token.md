---
title: get_edge_config_token
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_token with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "e274cca350ac56ff8ace5cd0e6156c465b8a2675090215bb8e75cb5b45e5580f"
---

# get_edge_config_token

Return meta data about a Global Config token.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_tokens](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_tokens) — Use get_edge_config_tokens with Vercel MCP.
- [create_edge_config_token](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config_token) — Use create_edge_config_token with Vercel MCP.
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [Get Global Config token meta data](https://vercel.com/docs/rest-api/global-config/get-global-config-token-meta-data) — GET /v1/global-config/{edgeConfigId}/token/{token} — Return meta data about a Global Config token.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_token.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId` | string | Yes      | The Global Config ID.                                       |
| `token`        | string | Yes      | The Global Config token.                                    |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
