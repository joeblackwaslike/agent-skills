---
title: get_rolling_release
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_rolling_release with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "e42d0552fd230c10e0c081f49586283190b2918f89f38b0721589359e926cea9"
---

# get_rolling_release

Get the active rolling release information for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_rolling_release_billing_status](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_billing_status) — Use get_rolling_release_billing_status with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config) — Use get_rolling_release_config with Vercel MCP.
- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release) — Use complete_rolling_release with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release) — Use start_rolling_release with Vercel MCP.
- [Get the active rolling release information for a project](https://vercel.com/docs/rest-api/rolling-release/get-the-active-rolling-release-information-for-a-project) — GET /v1/projects/{idOrName}/rolling-release — Return the Rolling Release for a project, regardless of whether the rollou

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                                                            |
| ---------- | ------ | -------- | -------------------------------------------------------------------------------------- |
| `idOrName` | string | Yes      | Project ID or project name (URL-encoded)                                               |
| `state`    | string | No       | Filter by rolling release state Allowed values: `"ACTIVE"`, `"COMPLETE"`, `"ABORTED"`. |
| `teamId`   | string | No       | Team ID to use for this operation.                                                     |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId.                            |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
