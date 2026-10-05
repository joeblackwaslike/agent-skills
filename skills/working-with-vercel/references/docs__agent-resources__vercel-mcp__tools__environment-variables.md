---
title: Environment Variables
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/environment-variables
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for environment variables.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "0f39543ce808bfee7cf3350ab6f9ab76c3175553895298e22bbe76abb82f5dd5"
---

# Environment Variables

Inspect and update configuration values for your projects and shared environment variables. You can also retrieve custom environment details to understand where your configuration applies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Learn how to create and manage environment variables for Vercel.
- [Environment variables](https://vercel.com/docs/environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — Learn more about environment variables on Vercel.
- [Updates one or more shared environment variables](https://vercel.com/docs/rest-api/environment/updates-one-or-more-shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — PATCH /v1/env — Updates a given Shared Environment Variable for a Team.
- [Create one or more shared environment variables](https://vercel.com/docs/rest-api/environment/create-one-or-more-shared-environment-variables?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=related) — POST /v1/env — Creates shared environment variable\\(s\\) for a team.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fenvironment-variables&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `create_project_env`

Create one or more environment variables.

## Parameters

| Parameter     | Type                       | Required | Description                                                 |
| ------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string                     | Yes      | The unique project identifier or the project name           |
| `upsert`      | string                     | No       | Allow override of environment variable if it already exists |
| `teamId`      | string                     | No       | Team ID.                                                    |
| `slug`        | string                     | No       | Team slug.                                                  |
| `requestBody` | object \| Array\<object> | Yes      | Request body for this tool.                                 |

## `edit_project_env`

Edit an environment variable.

## Parameters

| Parameter     | Type   | Required | Description                                       |
| ------------- | ------ | -------- | ------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name |
| `id`          | string | Yes      | The unique environment variable identifier        |
| `teamId`      | string | No       | Team ID.                                          |
| `slug`        | string | No       | Team slug.                                        |
| `requestBody` | object | Yes      | Request body for this tool.                       |

## `filter_project_envs`

Retrieve the environment variables of a project by id or name.

## Parameters

| Parameter               | Type   | Required | Description                                                                                             |
| ----------------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `idOrName`              | string | Yes      | The unique project identifier or the project name                                                       |
| `gitBranch`             | string | No       | If defined, the git branch of the environment variable to filter the results (must have target=preview) |
| `decrypt`               | string | No       | If true, the environment variable value will be decrypted Allowed values: `"true"`, `"false"`.          |
| `source`                | string | No       | The source that is calling the endpoint.                                                                |
| `customEnvironmentId`   | string | No       | The unique custom environment identifier within the project                                             |
| `customEnvironmentSlug` | string | No       | The custom environment slug (name) within the project                                                   |
| `teamId`                | string | No       | Team ID.                                                                                                |
| `slug`                  | string | No       | Team slug.                                                                                              |

## `get_custom_environment`

Retrieve a custom environment.

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name           |
| `environmentSlugOrId` | string | Yes      | The unique custom environment identifier within the project |
| `teamId`              | string | No       | Team ID.                                                    |
| `slug`                | string | No       | Team slug.                                                  |

## `get_project_env`

Retrieve the decrypted value of an environment variable of a project by id.

## Parameters

| Parameter  | Type   | Required | Description                                                            |
| ---------- | ------ | -------- | ---------------------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name                      |
| `id`       | string | Yes      | The unique ID for the environment variable to get the decrypted value. |
| `teamId`   | string | No       | Team ID.                                                               |
| `slug`     | string | No       | Team slug.                                                             |

## `get_shared_env_var`

Retrieve the decrypted value of a Shared Environment Variable by id.

## Parameters

| Parameter | Type   | Required | Description                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `id`      | string | Yes      | The unique ID for the Shared Environment Variable to get the decrypted value. |
| `teamId`  | string | No       | Team ID.                                                                      |
| `slug`    | string | No       | Team slug.                                                                    |

## `list_project_custom_environments`

Retrieve custom environments.

## Parameters

| Parameter   | Type   | Required | Description                                         |
| ----------- | ------ | -------- | --------------------------------------------------- |
| `idOrName`  | string | Yes      | The unique project identifier or the project name   |
| `gitBranch` | string | No       | Fetch custom environments for a specific git branch |
| `teamId`    | string | No       | Team ID.                                            |
| `slug`      | string | No       | Team slug.                                          |

## `update_shared_env_variable`

Updates one or more shared environment variables.

## Parameters

| Parameter     | Type   | Required | Description                 |
| ------------- | ------ | -------- | --------------------------- |
| `teamId`      | string | No       | Team ID.                    |
| `slug`        | string | No       | Team slug.                  |
| `requestBody` | object | No       | Request body for this tool. |


---

[View full sitemap](/docs/sitemap)
