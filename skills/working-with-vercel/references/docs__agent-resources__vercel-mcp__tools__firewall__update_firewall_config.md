---
title: update_firewall_config
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_firewall_config with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "46b131e7805c8e300f29e944940692d490d2c959f45774144c0d1af04eb67b50"
---

# update_firewall_config

Update Firewall Configuration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [put_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/put_firewall_config) — Use put_firewall_config with Vercel MCP.
- [get_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_firewall_config) — Use get_firewall_config with Vercel MCP.
- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [Update Firewall Configuration](https://vercel.com/docs/rest-api/security/update-firewall-configuration) — PATCH /v1/security/firewall/config — Process updates to modify the existing firewall config for a project
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config) — Use update_rolling_release_config with Vercel MCP.
- [update_attack_challenge_mode](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode) — Use update_attack_challenge_mode with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `projectId`   | string | Yes      | The project ID.                                             |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
