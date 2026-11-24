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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "8a27627ac658963921b61270d62830681773aaaaeb1bef5c14cb87d354cf217d"
---

# get_project_deletion_link

Get a link to the Delete Project section in the Vercel dashboard. This tool verifies project ownership and returns `requires_user_action`. You must review and confirm deletion in the dashboard. The tool does not delete the project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [Delete a Project](https://vercel.com/docs/rest-api/projects/delete-a-project) — DELETE /v9/projects/{idOrName} — Delete a specific project by passing either the project \\`id\\` or \\`name\\` in the URL.
- [Delete an access group project](https://vercel.com/docs/rest-api/access-groups/delete-an-access-group-project) — DELETE /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows deletion of an access group project
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.
- [get_access_to_vercel_url](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/get_access_to_vercel_url) — Use get_access_to_vercel_url with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/get_project_deletion_link.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name |
| `teamId`   | string | Yes      | Team ID to use for this operation.                |

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
