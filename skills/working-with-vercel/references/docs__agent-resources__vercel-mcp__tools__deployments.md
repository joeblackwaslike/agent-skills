---
title: Deployments
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/deployments
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  - /docs/deployments
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Vercel MCP tools for deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b0b02dec627a28ade240dc9a34d54a26292c28e0e9704157cf420663a78c9d7b"
---

# Deployments

Create and inspect deployments for your projects, including their files and build output. You can cancel a deployment or access a protected deployment to verify its content.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [Get deployment events](https://vercel.com/docs/rest-api/deployments/get-deployment-events) — GET /v3/deployments/{idOrUrl}/events — Get the build logs of a deployment by deployment ID and build ID. It can work as
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments.graph.md)
<!-- /docsgraph:related -->

## `cancel_deployment`

Cancel a deployment.

## Parameters

| Parameter     | Type    | Required | Description                                                 |
| ------------- | ------- | -------- | ----------------------------------------------------------- |
| `id`          | string  | Yes      | The unique identifier of the deployment.                    |
| `teamId`      | string  | No       | Team ID to use for this operation.                          |
| `slug`        | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody` | unknown | No       | Request body for this tool.                                 |

## `create_deployment`

Create a [deployment](/docs/deployments) from a Git source or files. Put `name`, `project`, `gitSource` or `files`, and `projectSettings` inside `requestBody`. Use `requestBody.target: "production"` for production, or omit `target` for a preview. Follow the tool's input schema for file formats and build settings.

**Sample prompt:** "Create a preview deployment of my project's main branch"

## Parameters

| Parameter                       | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forceNew`                      | string | No       | Forces a new deployment even if there is a previous similar deployment. Set to `1` to bypass deployment deduplication and always trigger a fresh build. Allowed values: `"0"`, `"1"`.                                                                                                               |
| `skipAutoDetectionConfirmation` | string | No       | Set to `1` to skip framework auto-detection and proceed without confirmation. By default, if Vercel detects a framework that differs from the project setting, the API returns a `400` asking you to confirm. Use this to suppress that check in automated pipelines. Allowed values: `"0"`, `"1"`. |
| `teamId`                        | string | No       | Team ID to use for this operation.                                                                                                                                                                                                                                                                  |
| `slug`                          | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                                         |
| `requestBody`                   | object | Yes      | Request body for this tool.                                                                                                                                                                                                                                                                         |

## `deploy_to_vercel`

Deploy a small, simple project from inline file contents only when the Vercel CLI is unavailable and no usable remote git repository exists, or the user explicitly requests an inline file deployment. Prefer the Vercel CLI for local projects. It reads and uploads files directly without reproducing source as model output. If the intended source is pushed to a repository's production branch, use create\_git\_project. Do not reconstruct medium or large projects, binary assets, or dependency trees in tool arguments. This remote tool cannot read local paths or attachments. Files with actual contents are required. Limits: 300 files, 3 MiB per file, 4 MiB total encoded contents. Creation is asynchronous. Poll get\_deployment until READY, ERROR, or CANCELED before reporting the build outcome.

## Parameters

| Parameter         | Type             | Required | Default | Description                                                                                                                                                                                                                |
| ----------------- | ---------------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `target`          | string           | Yes      | -       | Required. "preview" for a shareable non-production URL, or "production" to go live. Allowed values: `"preview"`, `"production"`.                                                                                           |
| `name`            | string           | Yes      | -       | Project name. Vercel creates the project if it does not already exist.                                                                                                                                                     |
| `files`           | Array\<object> | Yes      | -       | Required non-empty array of source files with their actual contents. A project name or local path alone cannot deploy. Do not include node\_modules, .git, .env files, or secrets. Vercel installs dependencies and builds. |
| `teamId`          | string           | No       | -       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                  |
| `projectSettings` | object           | No       | -       | Optional build settings. Omit to let Vercel auto-detect the framework.                                                                                                                                                     |

This workflow is available on root connections that expose `deploy_to_vercel`. Project-scoped connections do not register it. Use `create_deployment` when your scoped connection exposes that tool.

## `get_access_to_vercel_url`

Create a temporary [shareable link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that grants access to protected Vercel deployments.

| Parameter | Type   | Required | Default | Description                                                              |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------ |
| `teamId`  | string | No       | -       | The team ID or slug. Use the team that owns the resource.                |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment (e.g. "https://myapp.vercel.app"). |

**Sample prompt:** "myapp.vercel.app is protected by auth. Please create a shareable link for it"

## `get_deployment`

Get a [deployment](/docs/deployments) by ID or hostname.

| Parameter         | Type   | Required | Description                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`         | string | Yes      | The unique identifier or hostname of the deployment.                                                                                                |
| `withGitRepoInfo` | string | No       | When `true`, the response includes the `gitSource` object with the commit SHA, branch name, and connected repository metadata. Defaults to `false`. |
| `teamId`          | string | No       | Team ID to use for this operation.                                                                                                                  |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId.                                                                                         |

**Sample prompt:** "Get details about my latest production deployment"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter | Type   | Required | Default | Description                                               |
| --------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `idOrUrl` | string | Yes      | -       | The unique identifier or hostname of the deployment.      |
| `teamId`  | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |

## `get_deployment_build_logs`

Get the build logs for a deployment by ID or URL, to investigate why a build failed. Returns the most recent lines by default (where build errors appear). Use errorsOnly to see just the failing lines. Omit since and until for latest logs. Use since to narrow the window, and omit until when the end should be the current time.

## Parameters

| Parameter    | Type    | Required | Default  | Description                                                                                                                                                                             |
| ------------ | ------- | -------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`    | string  | Yes      | -        | The unique identifier or hostname of the deployment.                                                                                                                                    |
| `direction`  | string  | No       | `"tail"` | Which end of the build log to return. "tail" (default) returns the most recent lines, where build errors appear. "head" returns the earliest lines. Allowed values: `"tail"`, `"head"`. |
| `errorsOnly` | boolean | No       | `false`  | Return only error, stderr, exit, and fatal events.                                                                                                                                      |
| `limit`      | number  | No       | `100`    | Maximum number of log lines to return.                                                                                                                                                  |
| `since`      | string  | No       | -        | Start of the window as an ISO date or relative lookback from now (e.g. "1h", "30m").                                                                                                    |
| `until`      | string  | No       | -        | Optional end of the window as an ISO date, relative lookback, or "now". Omit this when the end should be the current time.                                                              |
| `buildId`    | string  | No       | -        | Filter to a specific build ID (bld\_...) for multi-build deployments.                                                                                                                   |
| `teamId`     | string  | Yes      | -        | The team ID or slug. Use the team that owns the resource.                                                                                                                               |

## `get_deployment_feature_flags`

Retrieve the feature flags of a deployment.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `deploymentId` | string | Yes      | The deployment ID.                                          |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_deployment_file_contents`

Get Deployment File Contents.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                            |
| `fileId`  | string | Yes      | The unique file identifier                                  |
| `path`    | string | No       | Path to the file to fetch (only for Git deployments)        |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_git_deployment_context`

List your teams, their plans, linked Git projects, and connected Cursor Origin workspaces. This tool takes no parameters and is available on the root MCP connection.

**Sample prompt:** "Which of my Git repositories already have Vercel projects?"

This tool is available on the root connection. Project-scoped connections already bind a team and project and do not register this discovery tool.

## `import-claude-design-from-url`

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.

| Parameter                  | Type   | Required | Default | Description                                                                                   |
| -------------------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------- |
| `url`                      | string | Yes      | -       | Public HTTPS URL to the design file. Valid for ~1 hour. Fetched server-side.                  |
| `title`                    | string | No       | -       | Suggested title for the imported design.                                                      |
| `claude_design_project_id` | string | No       | -       | Stable Claude Design project identifier. Reuse it to update the same imported Vercel project. |

**Sample prompt:** "Import this Claude Design into Vercel: https://claudeusercontent.com/example"

## `list_deployment_events`

Get deployment events, including build output. Use `direction: "backward"` for recent events and numeric timestamps for `since` and `until`.

| Parameter    | Type             | Required | Description                                                                                                           |
| ------------ | ---------------- | -------- | --------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`    | string           | Yes      | The unique identifier or hostname of the deployment.                                                                  |
| `direction`  | string           | No       | Order of the returned events based on the timestamp. Allowed values: `"backward"`, `"forward"`. Default: `"forward"`. |
| `follow`     | number           | No       | When enabled, this endpoint will return live events as they happen. Allowed values: `0`, `1`.                         |
| `limit`      | number           | No       | Maximum number of events to return. Provide `-1` to return all available logs.                                        |
| `name`       | string           | No       | Deployment build ID.                                                                                                  |
| `since`      | number           | No       | Timestamp for when build logs should be pulled from.                                                                  |
| `until`      | number           | No       | Timestamp for when the build logs should be pulled up until.                                                          |
| `statusCode` | number \| string | No       | HTTP status code range to filter events by.                                                                           |
| `delimiter`  | number           | No       | Allowed values: `0`, `1`.                                                                                             |
| `builds`     | number           | No       | Allowed values: `0`, `1`.                                                                                             |
| `teamId`     | string           | No       | Team ID to use for this operation.                                                                                    |
| `slug`       | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                           |

**Sample prompt:** "Show me the latest build logs for the failed deployment"

## `list_deployment_files`

List Deployment Files.

## Parameters

| Parameter | Type   | Required | Description                                                 |
| --------- | ------ | -------- | ----------------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                            |
| `teamId`  | string | No       | Team ID to use for this operation.                          |
| `slug`    | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_deployments`

List [deployments](/docs/deployments), optionally filtered by project.

| Parameter           | Type             | Required | Description                                                                                                             |
| ------------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------- |
| `app`               | string           | No       | Name of the deployment.                                                                                                 |
| `from`              | number           | No       | Gets the deployment created after this Date timestamp. (default: current time)                                          |
| `limit`             | number           | No       | Maximum number of deployments to list from a request.                                                                   |
| `projectId`         | string           | No       | Filter deployments from the given ID or name.                                                                           |
| `projectIds`        | Array\<string> | No       | Filter deployments from the given project IDs. Cannot be used when projectId is specified.                              |
| `target`            | string           | No       | Filter deployments based on the environment.                                                                            |
| `to`                | number           | No       | Gets the deployment created before this Date timestamp. (default: current time)                                         |
| `users`             | string           | No       | Filter out deployments based on users who have created the deployment.                                                  |
| `since`             | number           | No       | Get Deployments created after this JavaScript timestamp.                                                                |
| `until`             | number           | No       | Get Deployments created before this JavaScript timestamp.                                                               |
| `state`             | string           | No       | Filter deployments based on their state (`BUILDING`, `ERROR`, `INITIALIZING`, `QUEUED`, `READY`, `CANCELED`, `BLOCKED`) |
| `rollbackCandidate` | boolean          | No       | Filter deployments based on their rollback candidacy                                                                    |
| `branch`            | string           | No       | Filter deployments based on the branch name                                                                             |
| `sha`               | string           | No       | Filter deployments based on the SHA                                                                                     |
| `teamId`            | string           | No       | Team ID to use for this operation.                                                                                      |
| `slug`              | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                             |

**Sample prompt:** "Show me deployments for my blog project"

## Workflow connection parameters

If your connection exposes the smaller workflow tool list, use these parameters instead. Follow your connection's tool schema.

| Parameter   | Type   | Required | Default | Description                                               |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to list deployments for.                   |
| `teamId`    | string | Yes      | -       | The team ID or slug. Use the team that owns the resource. |
| `since`     | number | No       | -       | Get deployments created after this timestamp.             |
| `until`     | number | No       | -       | Get deployments created before this timestamp.            |

## `open_deployments`

Show deployments in a live card with expandable build logs. In clients without app support, receive the deployment state, preview URL, and commit as text. Track the latest deployment for a branch or commit until the build finishes.

This tool appears when your connection enables deployment cards. Pass a project ID or name, a repository URL, or a commit SHA. `teamId` can be omitted when the project identifies its team. Use `branch` and `sha` to track the source you just pushed. For repositories linked to multiple projects, select a project in the card. Calling the tool again refreshes the card.

The `view` parameter only accepts `"preview"`. `target` filters production or preview deployments. A missing deployment is a separate state from a successful build.

**Sample prompt:** "Show the deployment for the branch and commit I just pushed."

## Parameters

| Parameter   | Type   | Required | Description                                                                                                                                                                                                                                 |
| ----------- | ------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `view`      | string | No       | The deployment card view. Value: `"preview"`.                                                                                                                                                                                               |
| `teamId`    | string | No       | The team ID or slug. Use the team that owns the resource.                                                                                                                                                                                   |
| `projectId` | string | No       | The project ID or name. Read projectId from .vercel/project.json when the repository has one. Without it, pass repo for a preview instead of guessing, or use a project name the user gave. Required unless a preview call has repo or sha. |
| `branch`    | string | No       | The git branch name.                                                                                                                                                                                                                        |
| `sha`       | string | No       | The full git commit SHA.                                                                                                                                                                                                                    |
| `repo`      | string | No       | Preview only. The git remote URL or owner/name (git remote get-url origin). Finds the linked project when projectId is unknown, even before the deployment exists.                                                                          |
| `target`    | string | No       | Only consider deployments for this environment. Allowed values: `"production"`, `"preview"`.                                                                                                                                                |

## `ui_get_build_log_excerpt`

The deployments card uses this app-only tool to read its latest build-log lines. App-capable clients expose it to the card. Use `get_deployment_build_logs` for the standalone workflow when your connection exposes it.

This tool appears with the deployments card. Its response includes log entries and `latestAt`. Pass the previous `latestAt` as `since` to fetch newer events. Build logs are separate from runtime logs.

## Parameters

| Parameter | Type    | Required | Description                                                                                                                 |
| --------- | ------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `teamId`  | string  | Yes      | The team ID or slug. Use the team that owns the resource.                                                                   |
| `idOrUrl` | string  | Yes      | The unique identifier or hostname of the deployment.                                                                        |
| `limit`   | integer | No       | How many of the most recent log lines to return. Defaults to 120. Minimum: 1. Maximum: 1000.                                |
| `since`   | number  | No       | Only events after this timestamp (ms), oldest first, so a live view can fetch just what is new. Pass the previous latestAt. |

## `upload_file`

Upload Deployment Files.

## Parameters

| Parameter       | Type   | Required | Description                                                 |
| --------------- | ------ | -------- | ----------------------------------------------------------- |
| `contentLength` | number | No       | The file size in bytes                                      |
| `xVercelDigest` | string | No       | The file SHA1 used to check the integrity                   |
| `xNowDigest`    | string | No       | The file SHA1 used to check the integrity                   |
| `xNowSize`      | number | No       | The file size as an alternative to `Content-Length`         |
| `teamId`        | string | No       | Team ID to use for this operation.                          |
| `slug`          | string | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`   | string | No       | Provide this binary value as a base64 string.               |

## `web_fetch_vercel_url`

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g. "https://myapp.vercel.app/my-page"). |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
