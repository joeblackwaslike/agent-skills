---
title: restore_edge_config_backup
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/global-config
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use restore_edge_config_backup with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fa8c51b27ff1f2fad76841c69be59fee908c97605bb39a74668d0eb769e36b64"
---

# restore_edge_config_backup

Restores a Global Config backup.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_edge_config_backup](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backup) — Use get_edge_config_backup with Vercel MCP.
- [get_edge_config_backups](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/get_edge_config_backups) — Use get_edge_config_backups with Vercel MCP.
- [Restore Global Config backup](https://vercel.com/docs/rest-api/global-config/restore-global-config-backup) — POST /v1/global-config/{edgeConfigId}/backups/{edgeConfigBackupVersionId}/restore — Restores a Global Config backup.
- [update_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/update_edge_config) — Use update_edge_config with Vercel MCP.
- [create_edge_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config/create_edge_config) — Use create_edge_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup.graph.md](/docs/agent-resources/vercel-mcp/tools/global-config/restore_edge_config_backup.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter                   | Type    | Required | Description                                                 |
| --------------------------- | ------- | -------- | ----------------------------------------------------------- |
| `edgeConfigId`              | string  | Yes      | The Global Config ID.                                       |
| `edgeConfigBackupVersionId` | string  | Yes      | The Global Config backup version ID.                        |
| `teamId`                    | string  | No       | Team ID to use for this operation.                          |
| `slug`                      | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`               | unknown | No       | Request body for this tool.                                 |

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
