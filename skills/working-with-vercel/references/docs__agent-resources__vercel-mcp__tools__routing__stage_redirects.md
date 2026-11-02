---
title: stage_redirects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/stage_redirects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use stage_redirects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "93dedeb9c77713b54f523424040870160f23da8e99a020fdb617b9a0b664f9fb"
---

# stage_redirects

Stages new redirects for a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [stage_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/stage_routes) — Use stage_routes with Vercel MCP.
- [restore_redirects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/restore_redirects) — Use restore_redirects with Vercel MCP.
- [Stages new redirects for a project.](https://vercel.com/docs/rest-api/bulk-redirects/stages-new-redirects-for-a-project) — PUT /v1/bulk-redirects — Stages new redirects for a project and returns the new version.
- [update_bulk_redirect_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_bulk_redirect_version) — Use update_bulk_redirect_version with Vercel MCP.
- [approve_rolling_release_stage](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/approve_rolling_release_stage) — Use approve_rolling_release_stage with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/stage_redirects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
