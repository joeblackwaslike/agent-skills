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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "018b83407a53694f00b73bafefc15c190eb67dd665a5e853ec6fc9462257963e"
---

# update_session_network_policy

Update network policy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_network](https://vercel.com/docs/agent-resources/vercel-mcp/tools/networking/update_network?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=related) — Use update_network with Vercel MCP.
- [extend_session_timeout](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=related) — Use extend_session_timeout with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=related) — Use create_session_directory with Vercel MCP.
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=related) — Use update_kms_issuer_policy with Vercel MCP.
- [update_firewall_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/update_firewall_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=related) — Use update_firewall_config with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fsandboxes%2Fupdate_session_network_policy&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                            |
| ------------- | ------ | -------- | ---------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to update the network policy for. |
| `teamId`      | string | No       | Team ID.                                                               |
| `slug`        | string | No       | Team slug.                                                             |
| `requestBody` | object | No       | Request body for this tool.                                            |


---

[View full sitemap](/docs/sitemap)
