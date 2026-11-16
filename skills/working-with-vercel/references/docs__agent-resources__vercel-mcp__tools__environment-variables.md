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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/environment-variables.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "61c15b1555af78234edabc5345110ed311016c196f8345100a0e6b2bbb7ba192"
---

# Environment Variables

Read and update project environment variables, inspect custom environments, and read shared environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Environment variables](https://vercel.com/docs/environment-variables) — Learn more about environment variables on Vercel.
- [Shared environment variables](https://vercel.com/docs/environment-variables/shared-environment-variables) — Learn how to use Shared environment variables, which are environment variables that you define at the Team level and can
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [Managing environment variables](https://vercel.com/docs/environment-variables/managing-environment-variables) — Learn how to create and manage environment variables for Vercel.
- [Retrieve the environment variables of a project by id or name](https://vercel.com/docs/rest-api/projects/retrieve-the-environment-variables-of-a-project-by-id-or-name) — GET /v10/projects/{idOrName}/env — Retrieve the environment variables for a given project by passing either the project

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/environment-variables.graph.md](/docs/agent-resources/vercel-mcp/tools/environment-variables.graph.md)
<!-- /docsgraph:related -->

## `create_project_env`

Create one or more environment variables.

## Parameters

| Parameter     | Type                       | Required | Description                                                 |
| ------------- | -------------------------- | -------- | ----------------------------------------------------------- |
| `idOrName`    | string                     | Yes      | The unique project identifier or the project name           |
| `upsert`      | string                     | No       | Allow override of environment variable if it already exists |
| `teamId`      | string                     | No       | Team ID to use for this operation.                          |
| `slug`        | string                     | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object \| Array\<object> | Yes      | Request body for this tool.                                 |

## `edit_project_env`

Edit an environment variable.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`    | string | Yes      | The unique project identifier or the project name           |
| `id`          | string | Yes      | The unique environment variable identifier                  |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

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
| `teamId`                | string | No       | Team ID to use for this operation.                                                                      |
| `slug`                  | string | No       | Team slug to use for this operation. Use instead of teamId.                                             |

## `get_custom_environment`

Retrieve a custom environment.

## Parameters

| Parameter             | Type   | Required | Description                                                 |
| --------------------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`            | string | Yes      | The unique project identifier or the project name           |
| `environmentSlugOrId` | string | Yes      | The unique custom environment identifier within the project |
| `teamId`              | string | No       | Team ID to use for this operation.                          |
| `slug`                | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_project_env`

Retrieve the decrypted value of an environment variable of a project by id.

## Parameters

| Parameter  | Type   | Required | Description                                                            |
| ---------- | ------ | -------- | ---------------------------------------------------------------------- |
| `idOrName` | string | Yes      | The unique project identifier or the project name                      |
| `id`       | string | Yes      | The unique ID for the environment variable to get the decrypted value. |
| `teamId`   | string | No       | Team ID to use for this operation.                                     |
| `slug`     | string | No       | Team slug to use for this operation. Use instead of teamId.            |

## `get_shared_env_var`

Retrieve the decrypted value of a Shared Environment Variable by id.

## Parameters

| Parameter | Type   | Required | Description                                                                   |
| --------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `id`      | string | Yes      | The unique ID for the Shared Environment Variable to get the decrypted value. |
| `teamId`  | string | No       | Team ID to use for this operation.                                            |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId.                   |

## `list_project_custom_environments`

Retrieve custom environments.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `idOrName`  | string | Yes      | The unique project identifier or the project name           |
| `gitBranch` | string | No       | Fetch custom environments for a specific git branch         |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

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
