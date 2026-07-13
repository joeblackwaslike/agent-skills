---
title: Tools
product: vercel
url: /docs/agent-resources/vercel-mcp/tools
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools"
last_updated: 2026-07-02
type: conceptual
prerequisites:
  - /docs/agent-resources/vercel-mcp
  - /docs/agent-resources
related:
  - /docs/accounts
  - /docs/projects
  - /docs/deployments
  - /docs/functions
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
summary: Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, runtime logs, and Agent Runs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools.md"
fetched_at: "2026-07-13T07:00:47.058Z"
sha256: "c498443ec85729949274f30304a2e451dd8d539e0871ab51d08d89381a4a1bb8"
---

# Tools

The Vercel MCP server provides [MCP tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) that let AI assistants search documentation, manage projects, view deployments, and more.

> **💡 Note:** To enhance security, enable human confirmation for tool execution and exercise
> caution when using Vercel MCP alongside other servers to prevent prompt
> injection attacks.

## Documentation tools

### search\_documentation

Search Vercel documentation for specific topics and information.

| Parameter | Type   | Required | Default | Description                                                     |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------- |
| `topic`   | string | Yes      | -       | Topic to focus the search on (e.g., 'routing', 'data-fetching') |
| `tokens`  | number | No       | 2500    | Maximum number of tokens to include in the result               |

**Sample prompt:** "How do I configure custom domains in Vercel?"

## Project Management Tools

### list\_teams

List all [teams](/docs/accounts) that include the authenticated user as a member.

**Sample prompt:** "Show me all the teams I'm part of"

### list\_projects

List all Vercel [projects](/docs/projects) associated with a user.

| Parameter | Type   | Required | Default | Description                                                                                                                                                                                     |
| --------- | ------ | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`  | string | Yes      | -       | The team ID to list projects for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |

**Sample prompt:** "Show me all projects in my personal account"

### get\_project

Get detailed information about a specific [project](/docs/projects) including framework, domains, and latest deployment.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                                         |
| ----------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to get details for. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `teamId`    | string | Yes      | -       | The team ID to get project details for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`.        |

**Sample prompt:** "Get details about my next-js-blog project"

## Deployment Tools

### list\_deployments

List [deployments](/docs/deployments) associated with a specific project with creation time, state, and target information.

| Parameter   | Type   | Required | Default | Description                                   |
| ----------- | ------ | -------- | ------- | --------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to list deployments for        |
| `teamId`    | string | Yes      | -       | The team ID to list deployments for           |
| `since`     | number | No       | -       | Get deployments created after this timestamp  |
| `until`     | number | No       | -       | Get deployments created before this timestamp |

**Sample prompt:** "Show me all deployments for my blog project"

### get\_deployment

Get detailed information for a specific [deployment](/docs/deployments) including build status, regions, and metadata.

| Parameter | Type   | Required | Default | Description                                                                                                                                                                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `idOrUrl` | string | Yes      | -       | The unique identifier or hostname of the deployment                                                                                                                                         |
| `teamId`  | string | Yes      | -       | The team ID to get the deployment for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |

**Sample prompt:** "Get details about my latest production deployment for the blog project"

### get\_deployment\_build\_logs

Get the build logs of a deployment by deployment ID or URL. You can use this to investigate why a deployment failed.

| Parameter | Type   | Required | Default | Description                                                                                                                                                                                      |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `idOrUrl` | string | Yes      | -       | The unique identifier or hostname of the deployment                                                                                                                                              |
| `limit`   | number | No       | 100     | Maximum number of log lines to return                                                                                                                                                            |
| `teamId`  | string | Yes      | -       | The team ID to get the deployment logs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |

**Sample prompt:** "Show me the build logs for the failed deployment"

### get\_runtime\_logs

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, status code, source, time range, and full-text search. This makes it easier to debug runtime issues, monitor application behavior, and investigate production errors.

| Parameter      | Type   | Required | Default | Description                                                                                                                                                                                        |
| -------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`    | string | Yes      | -       | The project ID to get runtime logs for                                                                                                                                                             |
| `teamId`       | string | Yes      | -       | The team ID to get runtime logs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `deploymentId` | string | No       | -       | Filter logs to a specific deployment ID or URL                                                                                                                                                     |
| `environment`  | string | No       | -       | Filter by environment: `production` or `preview`                                                                                                                                                   |
| `level`        | array  | No       | -       | Filter by log level(s). Can specify multiple levels: `error`, `warning`, `info`, `fatal`                                                                                                           |
| `statusCode`   | string | No       | -       | Filter by HTTP status code (e.g., "500", "4xx")                                                                                                                                                    |
| `source`       | array  | No       | -       | Filter by source type(s). Can specify multiple sources: `serverless`, `edge-function`, `edge-middleware`, `static`                                                                                 |
| `since`        | string | No       | 24h ago | Start time - ISO format or relative time (e.g., "1h", "30m", "7d")                                                                                                                                 |
| `until`        | string | No       | now     | End time - ISO format or relative time                                                                                                                                                             |
| `limit`        | number | No       | 50      | Maximum number of log entries to return (max 1000)                                                                                                                                                 |
| `query`        | string | No       | -       | Full-text search query to filter logs                                                                                                                                                              |
| `requestId`    | string | No       | -       | Filter by specific request ID                                                                                                                                                                      |

**Sample prompt:** "Show me the runtime error logs for my project from the last hour"

## Agent Runs Observability Tools

[Agent Runs](https://eve.dev/docs/guides/deployment) are the observability layer for agents built with the eve framework on Vercel. Use these tools to find projects with eve agent activity, list recent runs, inspect one run, and retrieve trace data for debugging agent behavior.

### list\_agent\_run\_projects

List projects in a Vercel team that have Agent Runs observability data for eve agents. The response includes run counts and average duration rollups for each project.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                     |
| ------------- | ------ | -------- | ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID to list projects for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                        |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                          |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                             |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                       |

**Sample prompt:** "Which projects in my team have Agent Runs in the last 24 hours?"

### list\_agent\_runs

List Agent Runs for a Vercel project. The response includes summaries, status, model, trigger, token usage, time series, and pagination metadata for eve agent activity.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                             |
| ------------- | ------ | -------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID to list Agent Runs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`   | string | Yes      | -            | The project ID to list Agent Runs for. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                                |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                                  |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                     |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                               |
| `page`        | number | No       | 1            | Page number                                                                                                                                                                                             |
| `pageSize`    | number | No       | -            | Number of runs per page. The dashboard endpoint caps this at 100.                                                                                                                                       |
| `search`      | string | No       | -            | Server-side title search for Agent Runs                                                                                                                                                                 |

**Sample prompt:** "Show me the latest production Agent Runs for my project"

### get\_agent\_run

Get detailed metadata for a single eve Agent Run, including events, workflow metadata, usage, and subagent breakout data. Use `list_agent_runs` first if you need to find a run ID.

| Parameter     | Type   | Required | Default      | Description                                                                                                                                                                                        |
| ------------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`      | string | Yes      | -            | The team ID for the Agent Run. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`   | string | Yes      | -            | The project ID for the Agent Run. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `runId`       | string | Yes      | -            | The Agent Run ID to inspect                                                                                                                                                                        |
| `environment` | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                           |
| `period`      | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                             |
| `from`        | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                |
| `to`          | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                          |

**Sample prompt:** "Inspect Agent Run wrun\_123 for my project"

### get\_agent\_run\_trace

Get the trace for a single eve Agent Run, including turns, messages, reasoning, tool calls, token usage, and tool input or output when available. Use this tool to debug exact agent behavior in production.

| Parameter        | Type   | Required | Default      | Description                                                                                                                                                                                        |
| ---------------- | ------ | -------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`         | string | Yes      | -            | The team ID for the Agent Run. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.       |
| `projectId`      | string | Yes      | -            | The project ID for the Agent Run. Alternatively the project slug can be used. Project IDs start with 'prj\_'. Can be found by reading `.vercel/project.json` (projectId) or using `list_projects`. |
| `runId`          | string | Yes      | -            | The Agent Run ID to inspect                                                                                                                                                                        |
| `environment`    | string | No       | `production` | Agent run environment, usually `production` or `preview`                                                                                                                                           |
| `period`         | string | No       | -            | Preset time range. Supports `5m`, `15m`, `1h`, `6h`, `12h`, `1d`, `3d`, `7d`, `14d`, `30d`, and `90d`. Ignored when both `from` and `to` are provided.                                             |
| `from`           | string | No       | -            | Start time as ISO 8601, Unix seconds, Unix milliseconds, or a relative duration like `12h`. Must be used with `to`.                                                                                |
| `to`             | string | No       | -            | End time as ISO 8601, Unix seconds, Unix milliseconds, a relative duration like `1h`, or `now`. Must be used with `from`.                                                                          |
| `maxFieldLength` | number | No       | 8000         | Maximum length for individual string fields in the returned trace. Use 0 to disable truncation.                                                                                                    |

**Sample prompt:** "Show me the tool calls and messages from Agent Run wrun\_123"

## Domain Management Tools

### check\_domain\_availability\_and\_price

Check if domain names are available for purchase and get pricing information.

| Parameter | Type  | Required | Default | Description                                                                         |
| --------- | ----- | -------- | ------- | ----------------------------------------------------------------------------------- |
| `names`   | array | Yes      | -       | Array of domain names to check availability for (e.g., \['example.com', 'test.org']) |

**Sample prompt:** "Check if mydomain.com is available"

### buy\_domain

Purchase a domain name with registrant information.

| Parameter       | Type    | Required | Default | Description                                                     |
| --------------- | ------- | -------- | ------- | --------------------------------------------------------------- |
| `name`          | string  | Yes      | -       | The domain name to purchase (e.g., example.com)                 |
| `expectedPrice` | number  | No       | -       | The price you expect to be charged for the purchase             |
| `renew`         | boolean | No       | true    | Whether the domain should be automatically renewed              |
| `country`       | string  | Yes      | -       | The country of the domain registrant (e.g., US)                 |
| `orgName`       | string  | No       | -       | The company name of the domain registrant                       |
| `firstName`     | string  | Yes      | -       | The first name of the domain registrant                         |
| `lastName`      | string  | Yes      | -       | The last name of the domain registrant                          |
| `address1`      | string  | Yes      | -       | The street address of the domain registrant                     |
| `city`          | string  | Yes      | -       | The city of the domain registrant                               |
| `state`         | string  | Yes      | -       | The state/province of the domain registrant                     |
| `postalCode`    | string  | Yes      | -       | The postal code of the domain registrant                        |
| `phone`         | string  | Yes      | -       | The phone number of the domain registrant (e.g., +1.4158551452) |
| `email`         | string  | Yes      | -       | The email address of the domain registrant                      |

**Sample prompt:** "Buy the domain mydomain.com"

## Access Tools

### get\_access\_to\_vercel\_url

Create a temporary [shareable link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) that grants access to protected Vercel deployments.

| Parameter | Type   | Required | Default | Description                                                              |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------ |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment (e.g., 'https://myapp.vercel.app') |

**Sample prompt:** "myapp.vercel.app is protected by auth. Please create a shareable link for it"

### web\_fetch\_vercel\_url

Fetch content directly from a Vercel deployment URL (with [authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) if required).

| Parameter | Type   | Required | Default | Description                                                                                         |
| --------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`     | string | Yes      | -       | The full URL of the Vercel deployment including the path (e.g., 'https://myapp.vercel.app/my-page') |

**Sample prompt:** "Make sure the content from my-app.vercel.app/api/status looks right"

## Toolbar Tools

The Vercel Toolbar lets your team leave [comments](/docs/comments) on deployments. These tools let an agent read and act on those threads.

### list\_toolbar\_threads

List [Vercel Toolbar](/docs/vercel-toolbar) comment threads for a team. Returns unresolved threads by default.

| Parameter   | Type   | Required | Default      | Description                                                                                                                                                                                    |
| ----------- | ------ | -------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`    | string | Yes      | -            | The team ID to list threads for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `projectId` | string | No       | -            | Filter by project ID                                                                                                                                                                           |
| `branch`    | string | No       | -            | Filter by branch name                                                                                                                                                                          |
| `status`    | string | No       | `unresolved` | Filter by status: `resolved` or `unresolved`                                                                                                                                                   |
| `page`      | string | No       | -            | Filter by page path (e.g. `/docs`) or glob (e.g. `/docs*`)                                                                                                                                     |
| `search`    | string | No       | -            | Search text in comments                                                                                                                                                                        |
| `limit`     | number | No       | 20           | Maximum number of results to return                                                                                                                                                            |
| `offset`    | number | No       | -            | Pagination offset                                                                                                                                                                              |

**Sample prompt:** "Show me unresolved toolbar comments on my blog project"

### get\_toolbar\_thread

Get a specific toolbar thread by ID, including all messages and context.

| Parameter  | Type   | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to retrieve                                                                                                                                                              |
| `teamId`   | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |

**Sample prompt:** "Show me the full conversation on toolbar thread tbt\_123"

### change\_toolbar\_thread\_resolve\_status

Change the resolve status of a toolbar thread. Use this to mark a thread as resolved or unresolve a previously resolved thread.

| Parameter  | Type    | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------- | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string  | Yes      | -       | The thread ID to update                                                                                                                                                                |
| `teamId`   | string  | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `resolved` | boolean | Yes      | -       | Set to `true` to resolve the thread, `false` to unresolve it                                                                                                                           |

**Sample prompt:** "Mark toolbar thread tbt\_123 as resolved"

### reply\_to\_toolbar\_thread

Add a reply message to an existing toolbar thread.

| Parameter  | Type   | Required | Default | Description                                                                                                                                                                            |
| ---------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId` | string | Yes      | -       | The thread ID to reply to                                                                                                                                                              |
| `teamId`   | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown` | string | Yes      | -       | The message content in markdown format                                                                                                                                                 |

**Sample prompt:** "Reply to toolbar thread tbt\_123 with 'Fixed in the latest deploy'"

### edit\_toolbar\_message

Edit an existing message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                            |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                                                                                                                                                   |
| `messageId` | string | Yes      | -       | The message ID to edit                                                                                                                                                                 |
| `teamId`    | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `markdown`  | string | Yes      | -       | The updated message content in markdown format                                                                                                                                         |

**Sample prompt:** "Update my last toolbar message to clarify the fix"

### add\_toolbar\_reaction

Add an emoji reaction to a message in a toolbar thread.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                            |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `threadId`  | string | Yes      | -       | The thread ID containing the message                                                                                                                                                   |
| `messageId` | string | Yes      | -       | The message ID to react to                                                                                                                                                             |
| `teamId`    | string | Yes      | -       | The team ID that owns the thread. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `emoji`     | string | Yes      | -       | The emoji to add as a reaction (e.g. 👍)                                                                                                                                               |

**Sample prompt:** "Add a 👍 reaction to message msg\_456 on toolbar thread tbt\_123"

## CLI Tools

### use\_vercel\_cli

Instructs the LLM to use Vercel CLI commands with --help flag for information.

| Parameter | Type   | Required | Default | Description                                 |
| --------- | ------ | -------- | ------- | ------------------------------------------- |
| `command` | string | No       | -       | Specific Vercel CLI command to run          |
| `action`  | string | Yes      | -       | What you want to accomplish with Vercel CLI |

**Sample prompt:** "Help me deploy this project using Vercel CLI"

### deploy\_to\_vercel

Deploy the current project to Vercel.

**Sample prompt:** "Deploy this project to Vercel"


---

[View full sitemap](/docs/sitemap)
