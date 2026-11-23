---
title: get_edge_config_backup
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_edge_config_backup with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "6a63ebf24c7826a9bad3d689b3c7fb1c0b5214d14f1b99e7f02925c8a3711355"
---

# get_edge_config_backup

Retrieves a specific version of a Global Config from backup storage.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_backups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups) — Use get_edge_config_backups with Vercel MCP.
- [restore_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup) — Use restore_edge_config_backup with Vercel MCP.
- [Backups now available for Vercel Edge Config](https://vercel.com/changelog/backups-now-available-for-vercel-edge-config)
- [get_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config) — Use get_edge_config with Vercel MCP.
- [get_edge_configs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_configs) — Use get_edge_configs with Vercel MCP.
- [get_edge_config_items](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_items) — Use get_edge_config_items with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                   | Type   | Required | Description                                                 |
| --------------------------- | ------ | -------- | ----------------------------------------------------------- |
| `edgeConfigId`              | string | Yes      | The Global Config ID.                                       |
| `edgeConfigBackupVersionId` | string | Yes      | The Global Config backup version ID.                        |
| `teamId`                    | string | No       | Team ID to use for this operation.                          |
| `slug`                      | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
