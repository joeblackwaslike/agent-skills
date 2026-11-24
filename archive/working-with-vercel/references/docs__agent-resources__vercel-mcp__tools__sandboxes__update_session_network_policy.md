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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0b772a962923e9ff0572f1e887bcec674affad0219cdedbbc9e2128c3390944c"
---

# update_session_network_policy

Update network policy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [extend_session_timeout](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/extend_session_timeout) — Use extend_session_timeout with Vercel MCP.
- [Update network policy](https://vercel.com/docs/rest-api/sandboxes/update-network-policy) — POST /v2/sandboxes/sessions/{sessionId}/network-policy — Replaces the network access policy of a running session. Use th
- [update_kms_issuer_policy](https://vercel.com/docs/agent-resources/vercel-mcp/tools/key-management/update_kms_issuer_policy) — Use update_kms_issuer_policy with Vercel MCP.
- [read_session_file](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/read_session_file) — Use read_session_file with Vercel MCP.
- [create_session_directory](https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes/create_session_directory) — Use create_session_directory with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes/update_session_network_policy.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                            |
| ------------- | ------ | -------- | ---------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to update the network policy for. |
| `teamId`      | string | No       | Team ID to use for this operation.                                     |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.            |
| `requestBody` | object | No       | Request body for this tool.                                            |

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
