---
title: Projects
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/projects
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/projects
summary: Vercel MCP tools for projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "481e539b73e71cacba0b113c703a397e94f4e77f7d5f678f3e68d23e28279bb5"
---

# Projects

Create projects from scratch or connect an existing Git repository to Vercel. You can inspect and update project settings, manage domains and deployment protection, or pause and resume a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing projects](https://vercel.com/docs/projects/managing-projects?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=related) — Learn how to manage your projects through the Vercel Dashboard.
- [Unpause a project](https://vercel.com/docs/rest-api/projects/unpause-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/unpause — Unpause a project by passing its project \\`id\\` in the URL. If the project does
- [Pause a project](https://vercel.com/docs/rest-api/projects/pause-a-project?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=related) — POST /v1/projects/{projectId}/pause — Pause a project by passing its project \\`id\\` in the URL. If the project does not
- [Update a project domain](https://vercel.com/docs/rest-api/projects/update-a-project-domain?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=related) — PATCH /v9/projects/{idOrName}/domains/{domain} — Update a project domain's configuration, including the name, git branch
- [Update Protection Bypass for Automation](https://vercel.com/docs/rest-api/projects/update-protection-bypass-for-automation?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=related) — PATCH /v1/projects/{idOrName}/protection-bypass — Update the deployment protection automation bypass for a project

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects.graph.md](/docs/agent-resources/vercel-mcp/tools/projects.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fprojects&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `accept_project_transfer_request`

Accept project transfer request.

## Parameters

| Parameter     | Type   | Required | Description                               |
| ------------- | ------ | -------- | ----------------------------------------- |
| `code`        | string | Yes      | The code of the project transfer request. |
| `teamId`      | string | No       | Team ID.                                  |
| `slug`        | string | No       | Team slug.                                |
| `requestBody` | object | No       | Request body for this tool.               |

## `add_project_domain`

Add a domain to a project.

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |

## `create_git_project`

Create or reuse a Vercel project linked to an accessible Git repository. By default, it creates a preview deployment from the repository's production branch.

| Parameter       | Type    | Required | Default         | Description                                                                |
| --------------- | ------- | -------- | --------------- | -------------------------------------------------------------------------- |
| `repo`          | string  | Yes      | -               | Repository as `owner/name` or a repository URL                             |
| `teamId`        | string  | Yes      | -               | Team ID, or team slug for this tool                                        |
| `provider`      | string  | No       | Inferred        | Git provider; defaults to GitHub when the URL does not identify a provider |
| `projectName`   | string  | No       | Repository name | Project to create or reuse                                                 |
| `rootDirectory` | string  | No       | -               | Directory to build in a monorepo; applies to new projects                  |
| `deploy`        | boolean | No       | `true`          | Create a preview deployment; set `false` to link only                      |

**Sample prompt:** "Create a Vercel project for my team's GitHub repository and deploy a preview"

## `create_project`

Create a new project.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `get_project`

Get a [project](/docs/projects) by ID or name, including its configuration.

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name |
| `teamId`   | string | No       | Team ID.                                          |
| `slug`     | string | No       | Team slug.                                        |

**Sample prompt:** "Get details about my next-js-blog project"

## `get_project_token`

Generate a project OIDC token.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `idOrName`    | string | Yes      | The project ID or name      |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |

## `list_project_domains`

Retrieve project domains by project by id or name.

## Parameters

| Parameter             | Type   | Required | Description                                                                                                                                                      |
| --------------------- | ------ | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name                                                                                                                |
| `production`          | string | No       | Filters only production domains when set to `true`. Allowed values: `"true"`, `"false"`. Default: `"false"`.                                                     |
| `target`              | string | No       | Filters on the target of the domain. Can be either "production", "preview" Allowed values: `"production"`, `"preview"`.                                          |
| `customEnvironmentId` | string | No       | The unique custom environment identifier within the project                                                                                                      |
| `gitBranch`           | string | No       | Filters domains based on specific branch.                                                                                                                        |
| `redirects`           | string | No       | Excludes redirect project domains when "false". Includes redirect project domains when "true" (default). Allowed values: `"true"`, `"false"`. Default: `"true"`. |
| `redirect`            | string | No       | Filters domains based on their redirect target.                                                                                                                  |
| `verified`            | string | No       | Filters domains based on their verification status. Allowed values: `"true"`, `"false"`.                                                                         |
| `limit`               | number | No       | Maximum number of domains to list from a request (max 100).                                                                                                      |
| `since`               | number | No       | Get domains created after this JavaScript timestamp.                                                                                                             |
| `until`               | number | No       | Get domains created before this JavaScript timestamp.                                                                                                            |
| `order`               | string | No       | Domains sort order by createdAt Allowed values: `"ASC"`, `"DESC"`. Default: `"DESC"`.                                                                            |
| `teamId`              | string | No       | Team ID.                                                                                                                                                         |
| `slug`                | string | No       | Team slug.                                                                                                                                                       |

## `list_projects`

List [projects](/docs/projects) in your account or selected team. The tool also supports repository and project-setting filters.

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

## `pause_project`

Pause a project.

## Parameters

| Parameter     | Type    | Required | Description                   |
| ------------- | ------- | -------- | ----------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier |
| `teamId`      | string  | No       | Team ID.                      |
| `slug`        | string  | No       | Team slug.                    |
| `requestBody` | unknown | No       | Request body for this tool.   |

## `unpause_project`

Unpause a project.

## Parameters

| Parameter     | Type    | Required | Description                   |
| ------------- | ------- | -------- | ----------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier |
| `teamId`      | string  | No       | Team ID.                      |
| `slug`        | string  | No       | Team slug.                    |
| `requestBody` | unknown | No       | Request body for this tool.   |

## `update_project`

Update an existing project.

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |

## `update_project_protection_bypass`

Update Protection Bypass for Automation.

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |


---

[View full sitemap](/docs/sitemap)
