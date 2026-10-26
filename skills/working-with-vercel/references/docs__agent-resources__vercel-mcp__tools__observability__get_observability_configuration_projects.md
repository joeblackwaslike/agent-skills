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
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "42e7e08f9ed4c994f91407906dd1d9c78fbafeb24ce96f7f73146088ad305cc1"
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
- [get_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project_deployment_protection) — Use get_project_deployment_protection with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects.graph.md)
<!-- /docsgraph:related -->

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
