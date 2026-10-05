---
title: update_project_protection_bypass
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use update_project_protection_bypass with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "85bb4e9029b2013fe3ebd6ec66beeeeb69e1415ed760a04dd5e8210ea3d82243"
---

# update_project_protection_bypass

Update Protection Bypass for Automation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [patch_url_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=related) — Use patch_url_protection_bypass with Vercel MCP.
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=related) — Use update_project with Vercel MCP.
- [Update Protection Bypass for Automation](https://vercel.com/docs/rest-api/projects/update-protection-bypass-for-automation?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{idOrName}/protection-bypass — Update the deployment protection automation bypass for a project
- [update_project_check](https://vercel.com/docs/agent-resources/vercel-mcp/tools/checks/update_project_check?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=related) — Use update_project_check with Vercel MCP.
- [update_version](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/update_version?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=related) — Use update_version with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Fupdate_project_protection_bypass&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |


---

[View full sitemap](/docs/sitemap)
