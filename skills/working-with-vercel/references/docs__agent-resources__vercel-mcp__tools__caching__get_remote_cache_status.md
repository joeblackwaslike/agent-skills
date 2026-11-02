---
title: get_remote_cache_status
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/caching
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_remote_cache_status with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "fa43c9237810956a523dd1f1005089762286658c4279dd60efe9181ad70771d5"
---

# get_remote_cache_status

Get the status of Remote Caching for this principal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get remote caching status](https://turborepo.dev/docs/openapi/artifacts/status) — Check the status of Remote Caching for the authenticated user or team. Returns a JSON-encoded status indicating if Remot
- [Get status of Remote Caching for this principal](https://vercel.com/docs/rest-api/artifacts/get-status-of-remote-caching-for-this-principal) — GET /v8/artifacts/status — Check the status of Remote Caching for this principal. Returns a JSON-encoded status indicati
- [get_team](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams/get_team) — Use get_team with Vercel MCP.
- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.
- [Check if a cache artifact exists](https://vercel.com/docs/rest-api/artifacts/check-if-a-cache-artifact-exists) — HEAD /v8/artifacts/{hash} — Check that a cache artifact with the given \\`hash\\` exists. This request returns response he
- [get_active_attack_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/firewall/get_active_attack_status) — Use get_active_attack_status with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status.graph.md](/docs/agent-resources/vercel-mcp/tools/caching/get_remote_cache_status.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
