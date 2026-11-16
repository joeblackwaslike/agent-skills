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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "65c6fa65a647620cf00a4c61af6767e55a497bfcb9f720825d5101fd605a9d4d"
---

# update_project_protection_bypass

Update Protection Bypass for Automation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [patch_url_protection_bypass](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/patch_url_protection_bypass) — Use patch_url_protection_bypass with Vercel MCP.
- [update_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection) — Use update_project_deployment_protection with Vercel MCP.
- [Update Protection Bypass for Automation](https://vercel.com/docs/rest-api/projects/update-protection-bypass-for-automation) — PATCH /v1/projects/{idOrName}/protection-bypass — Update the deployment protection automation bypass for a project
- [update_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project) — Use update_project with Vercel MCP.
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/update_project_protection_bypass.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
