---
title: approve_rolling_release_stage
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use approve_rolling_release_stage with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0dce5759c0b9e5f3c964a68089e2dfeb6f14f2931968837ed70d4d1ae3eb272d"
---

# approve_rolling_release_stage

Update the active rolling release to the next stage for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=related) — Use complete_rolling_release with Vercel MCP.
- [start_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=related) — Use start_rolling_release with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=related) — Use update_rolling_release_config with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=related) — Use get_rolling_release_config with Vercel MCP.
- [get_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=related) — Use get_rolling_release with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fapprove_rolling_release_stage&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                              |
| ------------- | ------ | -------- | ---------------------------------------- |
| `idOrName`    | string | Yes      | Project ID or project name (URL-encoded) |
| `teamId`      | string | No       | Team ID.                                 |
| `slug`        | string | No       | Team slug.                               |
| `requestBody` | object | No       | Request body for this tool.              |


---

[View full sitemap](/docs/sitemap)
