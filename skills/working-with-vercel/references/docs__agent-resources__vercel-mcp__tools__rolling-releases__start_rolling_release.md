---
title: start_rolling_release
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/rolling-releases
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use start_rolling_release with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "919befc31a2aabfa5b73853f16969a3f69fb7b0221d624e687ec6d3feb3cc580"
---

# start_rolling_release

Start a rolling release for the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [complete_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/complete_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=related) — Use complete_rolling_release with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=related) — Use update_rolling_release_config with Vercel MCP.
- [get_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=related) — Use get_rolling_release_config with Vercel MCP.
- [approve_rolling_release_stage](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=related) — Use approve_rolling_release_stage with Vercel MCP.
- [get_rolling_release](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/get_rolling_release?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=related) — Use get_rolling_release with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release.graph.md](/docs/agent-resources/vercel-mcp/tools/rolling-releases/start_rolling_release.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frolling-releases%2Fstart_rolling_release&source_site=vercel-docs&relationship=graph)
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
