---
title: get_observability_configuration_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/observability
  - /docs/agent-resources/vercel-mcp/tools
related:
  []
summary: Use get_observability_configuration_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0bc771af588b37c4ac0dcdca4c7949e657b17be47316fc6c931420afd82705fd"
---

# get_observability_configuration_projects

Lists the projects that are currently configured as disabled for Observability Plus on a team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Lists disabled Observability Plus projects](https://vercel.com/docs/rest-api/observability/lists-disabled-observability-plus-projects) — GET /v1/observability/manage/configuration/projects — Lists the projects that are currently configured as disabled for O
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects) — Use list_access_group_projects with Vercel MCP.
- [list_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects) — Use list_projects with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) — Use list_agent_run_projects with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
