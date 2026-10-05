---
title: update_version
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/routing/update_version
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/routing
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_version with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a39fc7865d60503310da600d2518ffec54edbff807695e29d6d9830815790791"
---

# update_version

Promote a staging version to production or restore a previous production version.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [update_route_versions](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_route_versions?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=related) — Use update_route_versions with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [update_rolling_release_config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/update_rolling_release_config?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=related) — Use update_rolling_release_config with Vercel MCP.
- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.
- [update_flag_settings](https://vercel.com/docs/agent-resources/vercel-mcp/tools/feature-flags/update_flag_settings?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=related) — Use update_flag_settings with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/routing/update_version.graph.md](/docs/agent-resources/vercel-mcp/tools/routing/update_version.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Frouting%2Fupdate_version&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `projectId`   | string | Yes      | The project ID.             |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
