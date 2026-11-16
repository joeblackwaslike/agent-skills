---
title: create_observability_query
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/create_observability_query
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use create_observability_query with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "ae5a070ace888ca791215f86e4bd577ddcf828ee2201a5766db0d8e37cbf1e11"
---

# create_observability_query

Query observability data.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [artifact_query](https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/artifact_query) — Use artifact_query with Vercel MCP.
- [get_observability_schema](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_schema) — Use get_observability_schema with Vercel MCP.
- [Query](https://vercel.com/docs/query) — Query and visualize your Vercel usage, traffic, and more in observability.
- [create_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/create_project) — Use create_project with Vercel MCP.
- [search_repo](https://vercel.com/docs/agent-resources/vercel-mcp/tools/integrations/search_repo) — Use search_repo with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/create_observability_query.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                        |
| ------------- | ------ | -------- | ---------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation. |
| `requestBody` | object | Yes      | Request body for this tool.        |

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
