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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "d43f5602d8ca4e348da0d27d21cb63c921c3cd94e3816ae52adc723de00954af"
---

# list_projects

List [projects](/docs/projects) in your account or selected team. The tool also supports repository and project-setting filters.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [list_access_group_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/access-groups/list_access_group_projects) — Use list_access_group_projects with Vercel MCP.
- [get_project](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/get_project) — Use get_project with Vercel MCP.
- [get_observability_configuration_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/observability/get_observability_configuration_projects) — Use get_observability_configuration_projects with Vercel MCP.
- [list_agent_run_projects](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs/list_agent_run_projects) — Use list_agent_run_projects with Vercel MCP.
- [list_deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments/list_deployments) — Use list_deployments with Vercel MCP.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects/list_projects.graph.md](/docs/agent-resources/vercel-mcp/tools/projects/list_projects.graph.md)
<!-- /docsgraph:related -->

| Parameter                   | Type    | Required | Description                                                                                                                                                                                     |
| --------------------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `from`                      | string  | No       | Query only projects updated after the given timestamp or continuation token.                                                                                                                    |
| `gitForkProtection`         | string  | No       | Specifies whether PRs from Git forks should require a team member's authorization before it can be deployed Allowed values: `"0"`, `"1"`.                                                       |
| `limit`                     | string  | No       | Limit the number of projects returned                                                                                                                                                           |
| `search`                    | string  | No       | Search projects by the name field                                                                                                                                                               |
| `repo`                      | string  | No       | Filter results by repo. Also used for project count                                                                                                                                             |
| `repoId`                    | string  | No       | Filter results by Repository ID.                                                                                                                                                                |
| `repoUrl`                   | string  | No       | Filter results by Repository URL.                                                                                                                                                               |
| `excludeRepos`              | string  | No       | Filter results by excluding those projects that belong to a repo                                                                                                                                |
| `edgeConfigId`              | string  | No       | Filter results by connected Global Config ID                                                                                                                                                    |
| `edgeConfigTokenId`         | string  | No       | Filter results by connected Global Config Token ID                                                                                                                                              |
| `deprecated`                | boolean | No       | -                                                                                                                                                                                               |
| `elasticConcurrencyEnabled` | string  | No       | Filter results by projects with elastic concurrency enabled Allowed values: `"0"`, `"1"`.                                                                                                       |
| `staticIpsEnabled`          | string  | No       | Filter results by projects with Static IPs enabled Allowed values: `"0"`, `"1"`.                                                                                                                |
| `buildMachineTypes`         | string  | No       | Filter results by effective build machine types. Accepts comma-separated values. Use "elastic" for projects with elastic selection and "default" for projects without a build machine type set. |
| `buildQueueConfiguration`   | string  | No       | Filter results by build queue configuration. SKIP\_NAMESPACE\_QUEUE includes projects without a configuration set. Allowed values: `"SKIP_NAMESPACE_QUEUE"`, `"WAIT_FOR_NAMESPACE_QUEUE"`.        |
| `teamId`                    | string  | No       | Team ID to use for this operation.                                                                                                                                                              |
| `slug`                      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                     |

**Sample prompt:** "Show me projects in my team"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `teamId`  | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |


---

[View full sitemap](/docs/sitemap)
