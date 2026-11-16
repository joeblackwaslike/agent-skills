---
title: update_flag_settings
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/feature-flags
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_flag_settings with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9af411cbdd0e36245f58e4fd89cc387db49ba88f46e26696be84963374539ca1"
---

# update_flag_settings

Update project flag settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag) — Use update_flag with Vercel MCP.
- [get_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/get_flag_settings) — Use get_flag_settings with Vercel MCP.
- [update_flag_segment](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_segment) — Use update_flag_segment with Vercel MCP.
- [list_team_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/list_team_flag_settings) — Use list_team_flag_settings with Vercel MCP.
- [create_flag](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/create_flag) — Use create_flag with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings.graph.md](/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings.graph.md)
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
