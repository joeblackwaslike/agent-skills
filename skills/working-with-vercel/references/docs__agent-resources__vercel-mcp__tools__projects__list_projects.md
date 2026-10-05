---
title: list_projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects/list_projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools/projects
  - /docs/agent-resources/vercel-mcp/tools
related:
  - /docs/projects
summary: Use list_projects with Vercel MCP.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_projects.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "8296d40b06888d3744d63c28b7e4f9bc5ab22bff740c55f69e3d193f3789f458"
---

# list_projects

List [projects](/docs/projects) in your account or selected team. The tool also supports repository and project-setting filters.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Find Vercel Projects](https://v0.app/docs/api/v1/reference/integrations/find?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Retrieves Vercel projects available to the authenticated user or team scope.
- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Use list_access_group_projects with Vercel MCP.
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Use list_agent_run_projects with Vercel MCP.
- [list_microfrontends_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/microfrontends/list_microfrontends_group_projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Use list_microfrontends_group_projects with Vercel MCP.
- [list_project_routes](https://vercel.com/docs/agent-resources/vercel-mcp/tools/routing/list_project_routes?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Use list_project_routes with Vercel MCP.
- [list_project_domains](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/list_project_domains?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=related) — Use list_project_domains with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/list_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/list_projects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects%2Flist_projects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

| Parameter                   | Type    | Required | Description                                                                                                                                                                                     |
| --------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                      | string  | No       | Query only projects updated after the given timestamp or continuation token.                                                                                                                    |
| `gitForkProtection`         | string  | No       | Specifies whether PRs from Git forks should require a team member's authorization before it can be deployed Allowed values: `"1"`, `"0"`.                                                       |
| `limit`                     | string  | No       | Limit the number of projects returned                                                                                                                                                           |
| `search`                    | string  | No       | Search projects by the name field                                                                                                                                                               |
| `repo`                      | string  | No       | Filter results by repo. Also used for project count                                                                                                                                             |
| `repoId`                    | string  | No       | Filter results by Repository ID.                                                                                                                                                                |
| `repoUrl`                   | string  | No       | Filter results by Repository URL.                                                                                                                                                               |
| `excludeRepos`              | string  | No       | Filter results by excluding those projects that belong to a repo                                                                                                                                |
| `edgeConfigId`              | string  | No       | Filter results by connected Global Config ID                                                                                                                                                    |
| `edgeConfigTokenId`         | string  | No       | Filter results by connected Global Config Token ID                                                                                                                                              |
| `deprecated`                | boolean | No       | -                                                                                                                                                                                               |
| `elasticConcurrencyEnabled` | string  | No       | Filter results by projects with elastic concurrency enabled Allowed values: `"1"`, `"0"`.                                                                                                       |
| `staticIpsEnabled`          | string  | No       | Filter results by projects with Static IPs enabled Allowed values: `"0"`, `"1"`.                                                                                                                |
| `buildMachineTypes`         | string  | No       | Filter results by effective build machine types. Accepts comma-separated values. Use "elastic" for projects with elastic selection and "default" for projects without a build machine type set. |
| `buildQueueConfiguration`   | string  | No       | Filter results by build queue configuration. SKIP\_NAMESPACE\_QUEUE includes projects without a configuration set. Allowed values: `"SKIP_NAMESPACE_QUEUE"`, `"WAIT_FOR_NAMESPACE_QUEUE"`.        |
| `teamId`                    | string  | No       | Team ID.                                                                                                                                                                                        |
| `slug`                      | string  | No       | Team slug.                                                                                                                                                                                      |

**Sample prompt:** "Show me projects in my team"


---

[View full sitemap](/docs/sitemap)
