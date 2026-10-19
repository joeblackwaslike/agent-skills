---
title: get_project_deletion_link
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_project_deletion_link with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a8480866803789fc4766f19ab4c9f0d68084b13ec621cc993223386692a6bbc8"
---

# get_project_deletion_link

Get a link to the Delete Project section in the Vercel dashboard. This tool verifies project ownership and returns `requires_user_action`. You must review and confirm deletion in the dashboard. The tool does not delete the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [Delete a Project](https://vercel.com/docs/rest-api/projects/delete-a-project) — DELETE /v9/projects/{idOrName} — Delete a specific project by passing either the project \\`id\\` or \\`name\\` in the URL.
- [get_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_domain) — Use get_project_domain with Vercel MCP.
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name |
| `teamId`   | string | Yes      | Team ID to use for this operation.                |


---

[View full sitemap](/docs/sitemap)
