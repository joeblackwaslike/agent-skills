---
title: update_session_network_policy
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/sandboxes
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_session_network_policy with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0ea7705ef62eca99f0dd9e569af208cc8481610a4477dd0382f555ed43735762"
---

# update_session_network_policy

Update network policy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [extend_session_timeout](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout) — Use extend_session_timeout with Vercel MCP.
- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config) — Use update_firewall_config with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy) — Use update_kms_issuer_policy with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config) — Use update_rolling_release_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                            |
| ------------- | ------ | -------- | ---------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to update the network policy for. |
| `teamId`      | string | No       | Team ID to use for this operation.                                     |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.            |
| `requestBody` | object | No       | Request body for this tool.                                            |


---

[View full sitemap](/docs/sitemap)
