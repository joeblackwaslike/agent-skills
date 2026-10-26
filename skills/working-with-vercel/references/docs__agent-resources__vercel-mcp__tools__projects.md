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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "2ad21ac1a6f1c8f2c3e06f9ffe915483ff38f4493ba9df1c63a75a66ab4449b7"
---

# Projects

Create projects from scratch or connect an existing Git repository to Vercel. You can inspect and update project settings, manage domains and deployment protection, or pause and resume a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing projects](https://vercel.com/docs/projects/managing-projects) — Learn how to manage your projects through the Vercel Dashboard.
- [Deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments) — Vercel MCP tools for deployments.
- [Pause a project](https://vercel.com/docs/rest-api/projects/pause-a-project) — POST /v1/projects/{projectId}/pause — Pause a project by passing its project \\`id\\` in the URL. If the project does not
- [Teams and Users](https://vercel.com/docs/agent-resources/vercel-mcp/tools/teams) — Vercel MCP tools for teams and users.
- [Unpause a project](https://vercel.com/docs/rest-api/projects/unpause-a-project) — POST /v1/projects/{projectId}/unpause — Unpause a project by passing its project \\`id\\` in the URL. If the project does

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/projects.graph.md](/docs/agent-resources/vercel-mcp/tools/projects.graph.md)
<!-- /docsgraph:related -->

## `accept_project_transfer_request`

Accept project transfer request.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `code`        | string | Yes      | The code of the project transfer request.                   |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `add_project_domain`

Add a domain to a project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `create_git_project`

Create or reuse a Vercel project linked to an accessible Git repository. By default, it creates a preview deployment from the repository's production branch.

| Parameter       | Type    | Required | Default | Description                                                                                                                                                                                                                                                                                 |
| --------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `repo`          | string  | Yes      | -       | Repository as "owner/name", or a repository URL such as https://github.com/owner/name or https://origin.cursor.com/owner/name.                                                                                                                                                              |
| `teamId`        | string  | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                                                                   |
| `provider`      | string  | No       | -       | Git provider to link. Inferred from recognized repository URLs. Otherwise defaults to "github". Use "cursor-origin" for Cursor-hosted repositories at origin.cursor.com. Ignored when the project already exists. Allowed values: `"github"`, `"gitlab"`, `"bitbucket"`, `"cursor-origin"`. |
| `projectName`   | string  | No       | -       | Vercel project to create or reuse. Defaults to the lowercased repository name.                                                                                                                                                                                                              |
| `rootDirectory` | string  | No       | -       | Root-relative directory to build in a monorepo. Only applied when creating the project.                                                                                                                                                                                                     |
| `deploy`        | boolean | No       | `true`  | Whether to create a preview deployment from the linked repository's production branch. Defaults to true. Set false only when the user explicitly requests link-only behavior.                                                                                                               |

**Sample prompt:** "Create a Vercel project for my team's GitHub repository and deploy a preview"

## `create_project`

Create a new project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `get_project`

Get a [project](/docs/projects) by ID or name, including its configuration.

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name           |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

**Sample prompt:** "Get details about my next-js-blog project"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |

## `get_project_deletion_link`

Get a link to the Delete Project section in the Vercel dashboard. This tool verifies project ownership and returns `requires_user_action`. You must review and confirm deletion in the dashboard. The tool does not delete the project.

## Parameters

| Parameter  | Type   | Required | Description                                       |
| ---------- | ------ | -------- | ------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name |
| `teamId`   | string | Yes      | Team ID to use for this operation.                |

## `get_project_deployment_protection`

Get the effective password protection, Vercel Authentication, and Trusted IP settings for a Vercel project. Password values are never returned.

## Parameters

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |

## `get_project_domain`

Get project domain by project id/name and domain name.

## Parameters

| Parameter  | Type   | Required | Description                                                 |
| ---------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name           |
| `domain`   | string | Yes      | The project domain name                                     |
| `teamId`   | string | No       | Team ID to use for this operation.                          |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `git_namespaces`

Lists git namespaces for a supported provider. Supported providers are `github`, `gitlab` and `bitbucket`. If the provider is not provided, it will try to obtain it from the user that authenticated the request.

## Parameters

| Parameter        | Type    | Required | Description                                                                                        |
| ---------------- | ------- | -------- | -------------------------------------------------------------------------------------------------- |
| `host`           | string  | No       | The custom Git host if using a custom Git provider, like GitHub Enterprise Server                  |
| `provider`       | string  | No       | Allowed values: `"github"`, `"github-limited"`, `"github-custom-host"`, `"gitlab"`, `"bitbucket"`. |
| `viewerMetadata` | boolean | No       | When true, includes the viewer object for each namespace.                                          |

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
| `teamId`              | string | No       | Team ID to use for this operation.                                                                                                                               |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                      |

## `list_projects`

List [projects](/docs/projects) in your account or selected team. The tool also supports repository and project-setting filters.

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

## `pause_project`

Pause a project.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier                               |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |

## `unpause_project`

Unpause a project.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `projectId`   | string  | Yes      | The unique project identifier                               |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                                                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |

## `update_project`

Update an existing project.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `update_project_deployment_protection`

Partially update password protection, Vercel Authentication, and Trusted IPs for a Vercel project. Can replace passwords or IP allowlists, restrict access, or disable protection and expose deployments. Omitted settings are preserved. Availability depends on the Vercel team plan and caller permissions.

## Parameters

| Parameter            | Type   | Required | Default | Description                                                                                   |
| -------------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `projectId`          | string | Yes      | -       | The project ID or slug. Find the project ID in `.vercel/project.json` or use `list_projects`. |
| `teamId`             | string | Yes      | -       | The team ID or slug. Use the team that owns the resource.                                     |
| `passwordProtection` | object | No       | -       | Enable or disable password protection. Omit to preserve the current setting.                  |
| `ssoProtection`      | object | No       | -       | Enable or disable Vercel Authentication. Omit to preserve the current setting.                |
| `trustedIps`         | object | No       | -       | Enable or disable Trusted IPs. Omit to preserve the current setting.                          |

## `update_project_protection_bypass`

Update Protection Bypass for Automation.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `verify_project_domain`

Attempts to verify a project domain with `verified = false` by checking the correctness of the project domain's `verification` challenge.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string  | Yes      | The unique project identifier or the project name           |
| `domain`      | string  | Yes      | The domain name you want to verify                          |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
