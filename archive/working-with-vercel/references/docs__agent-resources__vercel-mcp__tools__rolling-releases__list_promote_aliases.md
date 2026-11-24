---
title: list_promote_aliases
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use list_promote_aliases with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "52d43a81416e41df00db5c2cc9ef99ce0114a40731d14fe4de1ecb515ea76e4c"
---

# list_promote_aliases

Gets a list of aliases with status for the current promote.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_aliases) — Use list_aliases with Vercel MCP.
- [Gets a list of aliases with status for the current promote](https://vercel.com/docs/rest-api/projects/gets-a-list-of-aliases-with-status-for-the-current-promote) — GET /v1/projects/{projectId}/promote/aliases — Get a list of aliases related to the last promote request with their mapp
- [list_deployment_aliases](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_deployment_aliases) — Use list_deployment_aliases with Vercel MCP.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote) — Use request_promote with Vercel MCP.
- [vercel promote](https://vercel.com/docs/cli/promote) — Learn how to promote an existing deployment using the vercel promote CLI command.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/list_promote_aliases.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter    | Type    | Required | Description                                                                   |
| ------------ | ------- | -------- | ----------------------------------------------------------------------------- |
| `projectId`  | string  | Yes      | The project ID.                                                               |
| `limit`      | number  | No       | Maximum number of aliases to list from a request (max 100). Maximum: 100.     |
| `since`      | number  | No       | Get aliases created after this epoch timestamp.                               |
| `until`      | number  | No       | Get aliases created before this epoch timestamp.                              |
| `failedOnly` | boolean | No       | Filter results down to aliases that failed to map to the requested deployment |
| `teamId`     | string  | No       | Team ID to use for this operation.                                            |
| `slug`       | string  | No       | Team slug to use for this operation. Use instead of teamId.                   |

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
