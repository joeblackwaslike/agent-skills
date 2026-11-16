---
title: update_attack_challenge_mode
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/firewall
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_attack_challenge_mode with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "16cde89434401c28ab788e1e1b5d2e7d363017282c8287464590718d8fe98ae5"
---

# update_attack_challenge_mode

Update Attack Challenge mode.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update Attack Challenge mode](https://vercel.com/docs/rest-api/security/update-attack-challenge-mode) — POST /v1/security/attack-mode — Update the setting for determining if the project has Attack Challenge mode enabled.
- [Prevent malicious traffic with Attack Challenge Mode for the Vercel Firewall](https://vercel.com/changelog/prevent-malicious-traffic-with-attack-challenge-mode-for-vercel-firewall)
- [get_active_attack_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status) — Use get_active_attack_status with Vercel MCP.
- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config) — Use update_firewall_config with Vercel MCP.
- [update_project_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass) — Use update_project_protection_bypass with Vercel MCP.
- [update_session_network_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy) — Use update_session_network_policy with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.graph.md](/docs/agent-resources/vercel-mcp/tools/firewall/update_attack_challenge_mode.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
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
