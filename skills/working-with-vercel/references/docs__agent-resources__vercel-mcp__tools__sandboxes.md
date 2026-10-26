---
title: Sandboxes
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/sandboxes
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for sandboxes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/sandboxes.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d10f06979fd541d106882b02c8fa814b8da3a4bb6240eb219c0956b9813ee683"
---

# Sandboxes

Create sandboxes to run commands and work with files in isolated environments. You can inspect command output, save snapshots, and manage session timeouts or network access.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Persistence](https://vercel.com/docs/sandbox/concepts/persistent-sandboxes) — Sandboxes automatically save their filesystem state when stopped and restore it when resumed. No manual snapshot managem
- [Get a named sandbox](https://vercel.com/docs/rest-api/sandboxes/get-a-named-sandbox) — GET /v2/sandboxes/{name} — Retrieves a named sandbox by name, including its current sandbox and routes. If the sandbox i
- [Python SDK Reference](https://vercel.com/docs/sandbox/python-sdk-reference) — Reference for the Vercel Sandbox Python SDK, including sandbox lifecycle, processes, files, drives, snapshots, persisten
- [JS SDK Reference](https://vercel.com/docs/sandbox/sdk-reference) — A comprehensive reference for the Vercel Sandbox JavaScript SDK, which lets you run code in a secure, isolated environme
- [Working with Sandbox](https://vercel.com/docs/sandbox/working-with-sandbox) — Task-oriented examples for common Vercel Sandbox operations in TypeScript, Python, and the Sandbox CLI.

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/sandboxes.graph.md](/docs/agent-resources/vercel-mcp/tools/sandboxes.graph.md)
<!-- /docsgraph:related -->

## `create_sandboxes_sessions_by_session_id_snapshot_v2`

Create a snapshot.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to snapshot.           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_sandboxes_sessions_by_session_id_snapshot_v3`

Create a snapshot.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to snapshot.           |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_sandboxes_v2`

Create a named sandbox.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `create_sandboxes_v3`

Create a named sandbox.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_sandboxes_v4`

Create a named sandbox.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | No       | Request body for this tool.                                 |

## `create_session_directory`

Create a directory.

## Parameters

| Parameter     | Type   | Required | Description                                                      |
| ------------- | ------ | -------- | ---------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to create the directory in. |
| `teamId`      | string | No       | Team ID to use for this operation.                               |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.      |
| `requestBody` | object | No       | Request body for this tool.                                      |

## `extend_session_timeout`

Extend session timeout.

## Parameters

| Parameter     | Type   | Required | Description                                                     |
| ------------- | ------ | -------- | --------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to extend the timeout for. |
| `teamId`      | string | No       | Team ID to use for this operation.                              |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.     |
| `requestBody` | object | No       | Request body for this tool.                                     |

## `get_named_sandbox`

Get a named sandbox.

## Parameters

| Parameter   | Type    | Required | Description                                                                                                             |
| ----------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `name`      | string  | Yes      | Name for the sandbox. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).                     |
| `projectId` | string  | No       | The project ID or name (required when not using OIDC token).                                                            |
| `resume`    | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Default: `false`. |
| `teamId`    | string  | No       | Team ID to use for this operation.                                                                                      |
| `slug`      | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                             |

## `get_session`

Get a session.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId` | string | Yes      | The unique identifier of the session to retrieve.           |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_session_command`

Get a command.

## Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                                                      |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command.                                                                                                                                     |
| `cmdId`     | string | Yes      | The unique identifier of the command to retrieve.                                                                                                                                                |
| `wait`      | string | No       | If set to "true", the request will block until the command finishes execution. Useful for synchronously waiting for command completion. Allowed values: `"true"`, `"false"`. Default: `"false"`. |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                                                                                               |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                      |

## `get_session_command_logs`

Stream command logs.

## Parameters

| Parameter   | Type   | Required | Description                                                  |
| ----------- | ------ | -------- | ------------------------------------------------------------ |
| `sessionId` | string | Yes      | The unique identifier of the session containing the command. |
| `cmdId`     | string | Yes      | The unique identifier of the command to stream logs for.     |
| `teamId`    | string | No       | Team ID to use for this operation.                           |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.  |

## `get_session_snapshot`

Get a snapshot.

## Parameters

| Parameter    | Type   | Required | Description                                                 |
| ------------ | ------ | -------- | ----------------------------------------------------------- |
| `snapshotId` | string | Yes      | The unique identifier of the snapshot to retrieve.          |
| `teamId`     | string | No       | Team ID to use for this operation.                          |
| `slug`       | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `kill_session_command`

Kill a command.

## Parameters

| Parameter     | Type   | Required | Description                                                  |
| ------------- | ------ | -------- | ------------------------------------------------------------ |
| `cmdId`       | string | Yes      | The unique identifier of the command to terminate.           |
| `sessionId`   | string | Yes      | The unique identifier of the session containing the command. |
| `teamId`      | string | No       | Team ID to use for this operation.                           |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.  |
| `requestBody` | object | No       | Request body for this tool.                                  |

## `list_named_sandboxes`

List named sandboxes for a project. This tool corresponds to the `listNamedSandboxes` catalog operation. Use `list_sessions` to list Sandbox sessions.

## Parameters

| Parameter    | Type                       | Required | Description                                                                                                                    |
| ------------ | -------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `project`    | string                     | Yes      | The unique identifier or name of the project to list named sandboxes for.                                                      |
| `limit`      | number                     | No       | Maximum number of named sandboxes to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`.      |
| `sortBy`     | string                     | No       | Field to sort by. Allowed values: `"createdAt"`, `"name"`, `"statusUpdatedAt"`, `"currentSnapshotId"`. Default: `"createdAt"`. |
| `namePrefix` | string                     | No       | Filter named sandboxes whose name starts with this prefix. Only valid when sortBy=name.                                        |
| `cursor`     | string                     | No       | Opaque pagination cursor from a previous response.                                                                             |
| `sortOrder`  | string                     | No       | Sort direction. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                                                          |
| `status`     | string                     | No       | Filter named sandboxes by status. Only valid when sortBy is createdAt. Allowed values: `"running"`, `"stopping"`, `"stopped"`. |
| `tags`       | string \| Array\<string> | No       | Filter sandboxes by tag. Format: "key:value". Only one tag filter is supported at a time.                                      |
| `teamId`     | string                     | No       | Team ID to use for this operation.                                                                                             |
| `slug`       | string                     | No       | Team slug to use for this operation. Use instead of teamId.                                                                    |

## `list_session_commands`

List commands.

## Parameters

| Parameter   | Type   | Required | Description                                                 |
| ----------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId` | string | Yes      | The unique identifier of the session to list commands for.  |
| `teamId`    | string | No       | Team ID to use for this operation.                          |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_session_snapshots`

List snapshots.

## Parameters

| Parameter   | Type   | Required | Description                                                                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `project`   | string | Yes      | The unique identifier or name of the project to list snapshots for.                                                 |
| `name`      | string | No       | Name for the sandbox. Must be unique per project and URL-safe (alphanumeric, hyphens, underscores).                 |
| `limit`     | number | No       | Maximum number of snapshots to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`. |
| `cursor`    | string | No       | Opaque pagination cursor from a previous response.                                                                  |
| `sortOrder` | string | No       | Sort direction for results by creation time. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                  |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                  |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                         |

## `list_sessions`

List sessions.

## Parameters

| Parameter   | Type   | Required | Description                                                                                                        |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `project`   | string | Yes      | The unique identifier or name of the project to list sessions for.                                                 |
| `name`      | string | No       | Filter sessions by sandbox name. Only sessions belonging to the specified sandbox are returned.                    |
| `limit`     | number | No       | Maximum number of sessions to return in the response. Used for pagination. Minimum: 1. Maximum: 50. Default: `20`. |
| `cursor`    | string | No       | Opaque pagination cursor from a previous response.                                                                 |
| `sortOrder` | string | No       | Sort direction for results by creation time. Allowed values: `"asc"`, `"desc"`. Default: `"desc"`.                 |
| `teamId`    | string | No       | Team ID to use for this operation.                                                                                 |
| `slug`      | string | No       | Team slug to use for this operation. Use instead of teamId.                                                        |

## `read_session_file`

Read a file.

## Parameters

| Parameter     | Type   | Required | Description                                                 |
| ------------- | ------ | -------- | ----------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to read the file from. |
| `teamId`      | string | No       | Team ID to use for this operation.                          |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | object | Yes      | Request body for this tool.                                 |

## `run_session_command`

Execute a command.

## Parameters

| Parameter     | Type   | Required | Description                                                           |
| ------------- | ------ | -------- | --------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session in which to execute the command. |
| `teamId`      | string | No       | Team ID to use for this operation.                                    |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.           |
| `requestBody` | object | No       | Request body for this tool.                                           |

## `stop_session`

Stop a session.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `sessionId`   | string  | Yes      | The unique identifier of the session to stop.               |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

## `update_sandbox`

Update a sandbox.

## Parameters

| Parameter     | Type    | Required | Description                                                                                                             |
| ------------- | ------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `name`        | string  | Yes      | The sandbox to update.                                                                                                  |
| `projectId`   | string  | No       | The project ID that owns the named sandbox. When provided, takes precedence over OIDC project context.                  |
| `resume`      | boolean | No       | Whether to automatically resume a stopped named sandbox by creating a new instance from its snapshot. Default: `false`. |
| `teamId`      | string  | No       | Team ID to use for this operation.                                                                                      |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId.                                                             |
| `requestBody` | object  | No       | Request body for this tool.                                                                                             |

## `update_session_network_policy`

Update network policy.

## Parameters

| Parameter     | Type   | Required | Description                                                            |
| ------------- | ------ | -------- | ---------------------------------------------------------------------- |
| `sessionId`   | string | Yes      | The unique identifier of the session to update the network policy for. |
| `teamId`      | string | No       | Team ID to use for this operation.                                     |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.            |
| `requestBody` | object | No       | Request body for this tool.                                            |

## `write_session_files`

Write files.

## Parameters

| Parameter     | Type   | Required | Description                                                                                                                             |
| ------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `xCwd`        | string | No       | The target directory where the tarball contents will be extracted. If not specified, files are extracted to the sandbox home directory. |
| `sessionId`   | string | Yes      | The unique identifier of the session to write files to.                                                                                 |
| `teamId`      | string | No       | Team ID to use for this operation.                                                                                                      |
| `slug`        | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                             |
| `requestBody` | string | Yes      | A base64-encoded gzipped tarball to extract. Provide this binary value as a base64 string.                                              |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
