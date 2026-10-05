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
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "d39ab74d26e3d2175411f96a27e80543cf26ed74abba8053eedc1cf95273e7af"
---

# Deployments

Create and inspect deployments for your projects, including their files and build output. You can cancel a deployment or access a protected deployment to verify its content.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [List Deployment Files](https://vercel.com/docs/rest-api/deployments/list-deployment-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=related) — GET /v6/deployments/{id}/files — Allows to retrieve the file structure of the source code of a deployment by supplying t
- [Get Deployment File Contents](https://vercel.com/docs/rest-api/deployments/get-deployment-file-contents?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=related) — GET /v8/deployments/{id}/files/{fileId} — Allows to retrieve the content of a file by supplying the file identifier and
- [List deployments](https://vercel.com/docs/rest-api/deployments/list-deployments?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=related) — GET /v7/deployments — List deployments under the authenticated user or team. If a deployment hasn't finished uploading \\
- [Upload Deployment Files](https://vercel.com/docs/rest-api/deployments/upload-deployment-files?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=related) — POST /v2/files — Before you create a deployment you need to upload the required files for that deployment. To do it, you
- [Get deployment events](https://vercel.com/docs/rest-api/deployments/get-deployment-events?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=related) — GET /v3/deployments/{idOrUrl}/events — Get the build logs of a deployment by deployment ID and build ID. It can work as

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/deployments.graph.md](/docs/agent-resources/vercel-mcp/tools/deployments.graph.md?from=related&source_path=%2Fdocs%2Fagent-resources%2Fvercel-mcp%2Ftools%2Fdeployments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `cancel_deployment`

Cancel a deployment.

## Parameters

| Parameter     | Type    | Required | Description                              |
| ------------- | ------- | -------- | ---------------------------------------- |
| `id`          | string  | Yes      | The unique identifier of the deployment. |
| `teamId`      | string  | No       | Team ID.                                 |
| `slug`        | string  | No       | Team slug.                               |
| `requestBody` | unknown | No       | Request body for this tool.              |

## `create_deployment`

Create a [deployment](/docs/deployments) from a Git source or files. Put `name`, `project`, `gitSource` or `files`, and `projectSettings` inside `requestBody`. Use `requestBody.target: "production"` for production, or omit `target` for a preview. Follow the tool's input schema for file formats and build settings.

**Sample prompt:** "Create a preview deployment of my project's main branch"

## Parameters

| Parameter                       | Type   | Required | Description                                                                                                                                                                                                                                                                                         |
| ------------------------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `forceNew`                      | string | No       | Forces a new deployment even if there is a previous similar deployment. Set to `1` to bypass deployment deduplication and always trigger a fresh build. Allowed values: `"0"`, `"1"`.                                                                                                               |
| `skipAutoDetectionConfirmation` | string | No       | Set to `1` to skip framework auto-detection and proceed without confirmation. By default, if Vercel detects a framework that differs from the project setting, the API returns a `400` asking you to confirm. Use this to suppress that check in automated pipelines. Allowed values: `"0"`, `"1"`. |
| `teamId`                        | string | No       | Team ID.                                                                                                                                                                                                                                                                                            |
| `slug`                          | string | No       | Team slug.                                                                                                                                                                                                                                                                                          |
| `requestBody`                   | object | Yes      | Request body for this tool.                                                                                                                                                                                                                                                                         |

## `get_access_to_vercel_url`

Create a temporary [shareable link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that grants access to protected Vercel deployments.

| Parameter | Type   | Required | Default | Description                                                              |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------ |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment (e.g., 'https://myapp.vercel.app') |

**Sample prompt:** "myapp.vercel.app is protected by auth. Please create a shareable link for it"

## `get_deployment`

Get a [deployment](/docs/deployments) by ID or hostname.

| Parameter         | Type   | Required | Description                                                                                                                                         |
| ----------------- | ------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl`         | string | Yes      | The unique identifier or hostname of the deployment.                                                                                                |
| `withGitRepoInfo` | string | No       | When `true`, the response includes the `gitSource` object with the commit SHA, branch name, and connected repository metadata. Defaults to `false`. |
| `teamId`          | string | No       | Team ID.                                                                                                                                            |
| `slug`            | string | No       | Team slug.                                                                                                                                          |

**Sample prompt:** "Get details about my latest production deployment"

## `get_deployment_file_contents`

Get Deployment File Contents.

## Parameters

| Parameter | Type   | Required | Description                                          |
| --------- | ------ | -------- | ---------------------------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier                     |
| `fileId`  | string | Yes      | The unique file identifier                           |
| `path`    | string | No       | Path to the file to fetch (only for Git deployments) |
| `teamId`  | string | No       | Team ID.                                             |
| `slug`    | string | No       | Team slug.                                           |

## `get_git_deployment_context`

List your teams, their plans, linked Git projects, and connected Cursor Origin workspaces. This tool takes no parameters and is available on the root MCP connection.

**Sample prompt:** "Which of my Git repositories already have Vercel projects?"

## `import-claude-design-from-url`

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.

| Parameter                  | Type   | Required | Default | Description                                                                                  |
| -------------------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------- |
| `url`                      | string | Yes      | -       | Public HTTPS URL to the Claude Design file. The URL is valid for approximately 1 hour        |
| `title`                    | string | No       | -       | Suggested title for the imported design                                                      |
| `claude_design_project_id` | string | No       | -       | Stable Claude Design project identifier. Reuse it to update the same imported Vercel project |

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
| `teamId`     | string           | No       | Team ID.                                                                                                              |
| `slug`       | string           | No       | Team slug.                                                                                                            |

**Sample prompt:** "Show me the latest build logs for the failed deployment"

## `list_deployment_files`

List Deployment Files.

## Parameters

| Parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| `id`      | string | Yes      | The unique deployment identifier |
| `teamId`  | string | No       | Team ID.                         |
| `slug`    | string | No       | Team slug.                       |

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
| `teamId`            | string           | No       | Team ID.                                                                                                                |
| `slug`              | string           | No       | Team slug.                                                                                                              |

**Sample prompt:** "Show me deployments for my blog project"

## `upload_file`

Upload Deployment Files.

## Parameters

| Parameter       | Type   | Required | Description                                         |
| --------------- | ------ | -------- | --------------------------------------------------- |
| `contentLength` | number | No       | The file size in bytes                              |
| `xVercelDigest` | string | No       | The file SHA1 used to check the integrity           |
| `xNowDigest`    | string | No       | The file SHA1 used to check the integrity           |
| `xNowSize`      | number | No       | The file size as an alternative to `Content-Length` |
| `teamId`        | string | No       | Team ID.                                            |
| `slug`          | string | No       | Team slug.                                          |
| `requestBody`   | string | No       | Provide this binary value as a base64 string.       |

## `web_fetch_vercel_url`

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g., 'https://myapp.vercel.app/my-page') |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"


---

[View full sitemap](/docs/sitemap)
