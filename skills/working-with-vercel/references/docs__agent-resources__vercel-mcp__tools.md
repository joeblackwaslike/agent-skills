---
title: Tools
product: vercel
url: /docs/agent-resources/vercel-mcp/tools
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools"
last_updated: 2026-07-23
type: conceptual
prerequisites:
  - /docs/agent-resources/vercel-mcp
  - /docs/agent-resources
related:
  - /docs/agent-resources/vercel-mcp
  - /docs/accounts
  - /docs/projects
  - /docs/deployments
  - /docs/functions
summary: Available tools in Vercel MCP for searching docs, managing teams, projects, deployments, Web Analytics, runtime logs and errors, Agent Runs, design...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "9cb56fb497eaca0bae4a9b17ded64ed4f97e40a6b0998eebe3b3ccf044e3c8cd"
---

# Tools

The Vercel MCP server provides [MCP tools](https://modelcontextprotocol.io/specification/2025-06-18/server/tools) that let AI assistants search documentation, manage projects, query Web Analytics, view deployments, and more.

Each tool below includes a sample prompt: a message you can send to your AI assistant (such as Claude Code, Cursor, or ChatGPT) after [connecting it to Vercel MCP](/docs/agent-resources/vercel-mcp). The assistant selects and calls the appropriate tools for you.

> **💡 Note:** To enhance security, enable human confirmation for tool execution and exercise
> caution when using Vercel MCP alongside other servers to prevent prompt
> injection attacks.

## Documentation tools

### search\_vercel\_documentation

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

Get build logs for a deployment by deployment ID or URL. The tool returns the most recent lines by default, where build errors usually appear. Use `errorsOnly` to return only failing lines.

| Parameter    | Type    | Required | Default | Description                                                                                                                                                                                      |
| ------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `idOrUrl`    | string  | Yes      | -       | The unique identifier or hostname of the deployment                                                                                                                                              |
| `direction`  | string  | No       | `tail`  | End of the build log to return. Use `tail` for the most recent lines or `head` for the earliest lines                                                                                             |
| `errorsOnly` | boolean | No       | false   | Return only error, stderr, exit, and fatal events                                                                                                                                                 |
| `limit`      | number  | No       | 100     | Maximum number of log lines to return                                                                                                                                                             |
| `since`      | string  | No       | -       | Start of the window as an ISO date or relative lookback from now (e.g., `1h` or `30m`)                                                                                                           |
| `until`      | string  | No       | -       | End of the window as an ISO date, relative lookback, or `now`. Omit this when the end should be the current time                                                                                   |
| `buildId`    | string  | No       | -       | Build ID to filter by for deployments with multiple builds                                                                                                                                       |
| `teamId`     | string  | Yes      | -       | The team ID to get the deployment logs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |

**Sample prompt:** "Show me the build logs for the failed deployment"

### get\_runtime\_logs

Get runtime logs for a project or deployment. Runtime logs include application output such as console.log messages, errors, and other execution details from [Vercel Functions](/docs/functions) during requests. You can filter logs by environment, log level, status code, source, time range, and full-text search. Use `group_by` to return counts instead of individual lines. For production errors, start with `get_runtime_errors`.

| Parameter      | Type   | Required | Default | Description                                                                                                                                                                                        |
| -------------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId`    | string | Yes      | -       | The project ID to get runtime logs for                                                                                                                                                             |
| `teamId`       | string | Yes      | -       | The team ID to get runtime logs for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `deploymentId` | string | No       | -       | Filter logs to a specific deployment ID or URL                                                                                                                                                     |
| `environment`  | string | No       | -       | Filter by environment: `production` or `preview`                                                                                                                                                   |
| `level`        | array  | No       | -       | Filter by log level(s). Can specify multiple levels: `error`, `warning`, `info`, `fatal`                                                                                                           |
| `statusCode`   | string | No       | -       | Filter by HTTP status code (e.g., "500", "4xx")                                                                                                                                                    |
| `source`       | array  | No       | -       | Filter by source type(s). Can specify multiple sources: `serverless`, `edge-function`, `edge-middleware`, `static`                                                                                 |
| `since`        | string | No       | 24h ago | Start of the window as an ISO date or relative lookback from now (e.g., `1h`, `30m`, or `7d`)                                                                                                     |
| `until`        | string | No       | now     | End of the window as an ISO date, relative lookback, or `now`. Omit this when the end should be the current time                                                                                   |
| `limit`        | number | No       | 50      | Maximum number of log entries to return (max 1000)                                                                                                                                                 |
| `query`        | string | No       | -       | Full-text search query to filter logs                                                                                                                                                              |
| `requestId`    | string | No       | -       | Filter by specific request ID                                                                                                                                                                      |
| `group_by`     | string | No       | -       | Return counts grouped by `statusCode`, `requestPath`, `route`, `level`, `source`, `deploymentId`, or `branch` instead of individual log lines                                                    |

**Sample prompt:** "Show me the runtime error logs for my project from the last hour"

### get\_runtime\_errors

Get grouped runtime error clusters for a project. Each cluster includes the error name, occurrence count, affected routes, sample messages, and when the error was first and last seen. Use this tool to investigate production errors before querying individual entries with `get_runtime_logs`. Time ranges can span up to 7 days.

| Parameter   | Type   | Required | Default | Description                                                                                                                                                                                        |
| ----------- | ------ | -------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `projectId` | string | Yes      | -       | The project ID to get runtime errors for                                                                                                                                                            |
| `teamId`    | string | Yes      | -       | The team ID to get runtime errors for. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `since`     | string | No       | 24h ago | Start of the window as an ISO date or relative lookback from now (e.g., `1h`, `24h`, or `7d`). The maximum lookback is 7 days                                                                        |
| `until`     | string | No       | now     | End of the window as an ISO date, relative lookback, or `now`. Omit this when the end should be the current time                                                                                     |
| `routes`    | string | No       | -       | Comma-separated route paths to filter by (e.g., `/api/checkout`)                                                                                                                                    |

**Sample prompt:** "Why is my production app throwing errors?"

### deploy\_to\_vercel

Deploy files directly to a new Vercel project without a Git repository or the Vercel CLI. Provide the file tree and a deployment target. Vercel creates the project if needed, detects the framework, and starts the build.

| Parameter         | Type   | Required | Default | Description                                                                                                                                                                                      |
| ----------------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `target`          | string | Yes      | -       | Deployment target: `preview` for a shareable non-production URL or `production` to deploy to production                                                                                          |
| `name`            | string | Yes      | -       | Project name. Vercel creates the project if it does not already exist                                                                                                                             |
| `files`           | array  | Yes      | -       | File tree to deploy. Provide source files only; Vercel installs dependencies and builds the project                                                                                              |
| `teamId`          | string | No       | -       | The team ID to deploy to. Alternatively the team slug can be used. Team IDs start with 'team\_'. Can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool.          |
| `projectSettings` | object | No       | -       | Build settings including `framework`, `buildCommand`, `installCommand`, `outputDirectory`, and `rootDirectory`. Omit this parameter to let Vercel detect the framework and settings automatically |

Each object in the `files` array supports the following fields:

| Field      | Type   | Required | Default | Description                                                        |
| ---------- | ------ | -------- | ------- | ------------------------------------------------------------------ |
| `file`     | string | Yes      | -       | Root-relative POSIX path (e.g., `app/page.tsx`)                    |
| `data`     | string | Yes      | -       | File contents as plain text or base64                              |
| `encoding` | string | No       | `utf-8` | Content encoding: `utf-8` for text files or `base64` for binaries |

**Sample prompt:** "Deploy this generated app to a Vercel preview"

## Web Analytics tools

Use the Web Analytics tool to query visitors, page views, and custom events for a project. It reads from the same aggregated data as the [Web Analytics dashboard](/docs/analytics) and requires Web Analytics to be enabled for the project.

### get\_web\_analytics

Query [Web Analytics](/docs/analytics/web-analytics-api) in one of two modes:

- `count` returns one total. For the `visits` dataset, it returns `visitors` and `pageviews`. For the `events` dataset, it returns `visitors` and `count`.
- `aggregate` returns rows grouped by one or two dimensions. Use it for traffic trends, top routes, countries, referrers, devices, custom events, feature flags, or custom event data.

Count queries can cover data since Web Analytics was enabled. Aggregate queries require `since`, `until`, and `by`, and can only query data within your plan's [reporting window](/docs/analytics/limits-and-pricing#what-is-the-reporting-window).

| Parameter   | Type             | Required | Default  | Description                                                                                                                                                                                                                                                        |
| ----------- | ---------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `projectId` | string           | Yes      | -        | Project ID or slug to query. Project IDs start with `prj_`. You can find it in `.vercel/project.json` or with `list_projects`.                                                                                                                                       |
| `teamId`    | string           | No       | -        | Team ID or slug that owns the project. Omit it for a project in your personal account. Team IDs start with `team_`. You can find it in `.vercel/project.json` or with `list_teams`.                                                                                  |
| `dataset`   | string           | No       | `visits` | Data to query: `visits` for automatically tracked page views, or `events` for custom events sent with `track()`.                                                                                                                                                    |
| `mode`      | string           | No       | `count`  | Query mode: `count` for one total, or `aggregate` for grouped results.                                                                                                                                                                                              |
| `since`     | string or number | No       | -        | Start of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Use it together with `until`. Required in `aggregate` mode.                                                                                                        |
| `until`     | string or number | No       | -        | End of the date range as a date string, ISO 8601 timestamp, or Unix timestamp in milliseconds. Use it together with `since`. Required in `aggregate` mode.                                                                                                          |
| `by`        | array of strings | No       | -        | One or two dimensions for `aggregate` mode. Time dimensions include `hour`, `day`, `week`, `month`, and `year`. Other dimensions include `route`, `requestPath`, `country`, `referrerHostname`, `deviceType`, `eventName`, `flags/<name>`, and `eventData/<property>`. |
| `filter`    | string           | No       | -        | [OData filter](/docs/analytics/web-analytics-api#dimensions-filters-and-groups), such as `requestPath eq '/pricing' and country eq 'US'`, `eventName eq 'signup'`, or `eventData/plan eq 'pro'`.                                                                     |
| `limit`     | number           | No       | 10       | Maximum number of distinct results in `aggregate` mode, from 1 to 100. The response groups remaining values into `Others`.                                                                                                                                          |

**Sample prompt:** "Show me the visitors and page views for my nuxt.com project from July 16 through July 22"

## Agent Runs Observability Tools

[Agent Runs](https://eve.dev/docs/guides/deployment/vercel#inspect-agent-runs) are the observability layer for agents built with the eve framework on Vercel. Use these tools to find projects with eve agent activity, list recent runs, inspect one run, and retrieve trace data for debugging agent behavior.

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

To purchase a domain, see [`buy_domain`](#buy_domain) below.

## Purchase tools

These tools make purchases on behalf of a team. Charges go to the team's payment method immediately and are non-refundable. Purchase tools are being rolled out gradually and may not yet be available on your connection.

> **💡 Note:** Purchase tools execute real, non-refundable charges. Enable confirmation
> prompts in your MCP client for any tool call that includes `confirm: true`.

### How purchases work

Every purchase uses the same quote-then-confirm flow:

1. **Quote**: Call [`get_purchase_quote`](#get_purchase_quote) with the product and its parameters. This tool is read-only and nothing is charged. The response includes the cost (when Vercel can quote one), the applicable spend limit, and an `idempotencyKey` that encodes the quoted terms. Quoting is required before the `buy_*` tools can be used.
2. **Review**: Review the quote and approve it. Charges are immediate and non-refundable.
3. **Confirm**: Call the matching `buy_*` tool with `confirm: true`, the same parameters, and the `idempotencyKey` from the quote. Quotes expire after 5 minutes: an expired or mismatched key is rejected and you must quote again.

The flow provides these guarantees:

- Submitting the same `idempotencyKey` twice does not create a second charge.
- The `idempotencyKey` is a signed token of the quoted terms. The server rejects a confirmation call whose parameters don't exactly match the quote.
- Purchases require a valid payment method on the team. If no payment method is on file, nothing is charged and the response includes a `billingUrl` where you can add one before retrying.
- Your MCP client may prompt you before executing a `confirm: true` call (see the note above). Declining the prompt never triggers a charge.
- A successful confirmation returns a `billingUrl` (team billing settings, where the charge appears) and a `proofUrl` showing the purchase. Billing history may take a few minutes to update.

### get\_purchase\_quote

Get a price quote for any purchase. This is a read-only action that never charges. It is the only source of an `idempotencyKey`, so it is the required first step before any `buy_*` tool usage. For products with no API price (add-ons, Pro), the quote includes a `priceNote` and a billing or pricing URL to review instead of a number.

You typically won't invoke this tool directly. Your AI client calls it automatically as the first step of any purchase and presents the quote for your approval.

| Parameter      | Type    | Required      | Default     | Description                                                                                                                                                                     |
| -------------- | ------- | ------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `product`      | string  | Yes           | -           | Which purchase to quote: `credits`, `domain`, `addon`, or `pro`                                                                                                                 |
| `teamId`       | string  | Yes           | -           | The team ID the purchase is for. Alternatively, the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `creditType`   | string  | For `credits` | -           | Which credit balance to top up: `v0`, `gateway` (AI Gateway), or `agent` (Vercel Agent)                                                                                         |
| `amount`       | number  | For `credits` | -           | Amount to purchase, in whole US dollars (1–1000)                                                                                                                                |
| `domain`       | string  | For `domain`  | -           | The domain to register (e.g., example.com)                                                                                                                                     |
| `years`        | number  | No            | TLD minimum | For `domain` — registration term in years (max 10)                                                                                                                             |
| `autoRenew`    | boolean | No            | true        | For `domain` — whether to auto-renew at the end of the term                                                                                                                     |
| `productAlias` | string  | For `addon`   | -           | The add-on to quote. Only `siem` is available today                                                                                                                             |
| `quantity`     | number  | For `addon`   | -           | Number of units                                                                                                                                                                 |

**Sample prompt:** "How much would it cost to register example.com for 3 years?"

### buy\_pro

Upgrade a team to a Vercel Pro subscription. This starts recurring Pro billing immediately at the standard Pro price. Vercel's API doesn't return the Pro subscription price, so the quote includes a `pricingUrl` pointing to [current Pro pricing](https://vercel.com/pricing) to review before confirming.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                           |
| ---------------- | ------- | -------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `teamId`         | string  | Yes      | -       | The team ID to upgrade. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using the `list_teams` tool. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the upgrade                                                                                                                                                     |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                 |

**Sample prompt:** "Upgrade my team to Vercel Pro"

### buy\_credits

Purchase prepaid credits for [v0](https://v0.dev), [AI Gateway](/docs/ai-gateway), or [Vercel Agent](/docs/agent). The amount is quoted directly, since credits cost exactly what you buy.

Some credit types have plan prerequisites: Vercel Agent credits require the team to be on [Vercel Pro](/docs/plans/pro) (upgrade first with `buy_pro`), and v0 credits require a paid v0 plan. AI Gateway credits have no prerequisite. If a required plan is missing, the purchase is rejected with guidance and nothing is charged.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                    |
| ---------------- | ------- | -------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `creditType`     | string  | Yes      | -       | Which credit balance to top up: `v0`, `gateway` (AI Gateway), or `agent` (Vercel Agent)                                                                                                        |
| `amount`         | number  | Yes      | -       | Amount to purchase, in whole US dollars (1–1000)                                                                                                                                               |
| `teamId`         | string  | Yes      | -       | The team ID to purchase credits for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`.      |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                               |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                          |

**Sample prompt:** "Buy $25 of AI Gateway credits for my team"

### buy\_addon

Purchase a Vercel add-on for a team, by integer quantity. Currently only the `siem` add-on ([SIEM log drains](/docs/drains)) is available, and the team must be on the Flex plan.

Vercel's API doesn't return a price for add-ons, so the quote includes a `priceNote` and a link to the team's billing settings where you can review the unit price before confirming.

| Parameter        | Type    | Required | Default | Description                                                                                                                                                                                  |
| ---------------- | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `productAlias`   | string  | Yes      | -       | The add-on to purchase. Only `siem` is available today                                                                                                                                       |
| `quantity`       | number  | Yes      | -       | Number of units to purchase                                                                                                                                                                  |
| `teamId`         | string  | Yes      | -       | The team ID to purchase the add-on for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes      | -       | Set `true` to execute the charge                                                                                                                                                             |
| `idempotencyKey` | string  | Yes      | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                        |

**Sample prompt:** "Buy 2 units of the SIEM add-on for my team"

### buy\_domain

Register (purchase) a single [domain](/docs/domains) for a team. The quote (`get_purchase_quote` with `product: domain`) checks availability and returns the live `purchasePrice` for the requested term. The **confirm** step must echo that price back as `expectedPrice`, and the order is rejected if the live price no longer matches, so you are never charged more than the amount you saw quoted.

The registration term (`years`) is priced in the quote and required at the **confirm** step. The server never guesses the term, so TLDs with multi-year minimum registrations work correctly. Vercel stores no reusable registrant profile: the full WHOIS `contact` must be supplied on every confirm, and it is passed through to the registrar without being logged or stored by the MCP server.

Domain registration completes asynchronously: a successful **confirm** step returns an `orderId` that you can use with [`get_domain_order`](#get_domain_order) to check whether the registration completed.

| Parameter        | Type    | Required            | Default | Description                                                                                                                                                                              |
| ---------------- | ------- | ------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `domain`         | string  | Yes                 | -       | The domain to register (e.g., example.com)                                                                                                                                              |
| `years`          | number  | Yes                 | -       | Registration term in years (max 10). Must match the term shown in the quote                                                                                                              |
| `autoRenew`      | boolean | No                  | true    | Whether to auto-renew at the end of the term                                                                                                                                             |
| `expectedPrice`  | number  | Yes                 | -       | The `purchasePrice` (USD) from the quote. The order is rejected if it no longer matches the live price                                                                                   |
| `contact`        | object  | Yes                 | -       | Registrant (WHOIS) contact: see the fields below                                                                                                                                        |
| `teamId`         | string  | Yes                 | -       | The team ID to register the domain for. Alternatively the team slug can be used. Team IDs start with 'team\_' and can be found by reading `.vercel/project.json` (orgId) or using `list_teams`. |
| `confirm`        | boolean | Yes                 | -       | Set `true` to execute the purchase                                                                                                                                                       |
| `idempotencyKey` | string  | Yes                 | -       | The `idempotencyKey` returned by `get_purchase_quote`                                                                                                                                    |

The `contact` object requires the following fields with an optional `companyName`:

| Field         | Type   | Description                                                  |
| ------------- | ------ | ------------------------------------------------------------ |
| `firstName`   | string | The first name of the domain registrant                      |
| `lastName`    | string | The last name of the domain registrant                       |
| `email`       | string | The email address of the domain registrant                   |
| `phone`       | string | The phone number in E.164 format (e.g., +14155550123)        |
| `address1`    | string | The street address of the domain registrant                  |
| `city`        | string | The city of the domain registrant                            |
| `state`       | string | The state/province of the domain registrant                  |
| `zip`         | string | The postal code of the domain registrant                     |
| `country`     | string | Two-letter ISO country code (e.g., US)                       |
| `companyName` | string | The company name of the domain registrant (optional)         |

**Sample prompt:** "Buy the domain mydomain.com"

### get\_domain\_order

Get the status of a domain purchase order returned by `buy_domain`, to confirm whether the asynchronous registration completed. It is read-only action.

| Parameter | Type   | Required | Default | Description                                                                                       |
| --------- | ------ | -------- | ------- | ------------------------------------------------------------------------------------------------- |
| `orderId` | string | Yes      | -       | The `orderId` returned by `buy_domain`                                                            |
| `teamId`  | string | No       | -       | The team ID the domain was purchased for. Alternatively the team slug can be used.                |

**Sample prompt:** "Did my domain purchase go through?"

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

## Design import tools

### import-claude-design-from-url

Import a self-contained HTML bundle from Claude Design and deploy it to Vercel. The bundle must use a public HTTPS `claudeusercontent.com` URL and include all images, fonts, and styles.

| Parameter                  | Type   | Required | Default | Description                                                                                         |
| -------------------------- | ------ | -------- | ------- | --------------------------------------------------------------------------------------------------- |
| `url`                      | string | Yes      | -       | Public HTTPS URL to the Claude Design file. The URL is valid for approximately 1 hour               |
| `title`                    | string | No       | -       | Suggested title for the imported design                                                            |
| `claude_design_project_id` | string | No       | -       | Stable Claude Design project identifier. Reuse it to update the same imported Vercel project       |

**Sample prompt:** "Import this Claude Design into Vercel: https://claudeusercontent.com/example"

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


---

[View full sitemap](/docs/sitemap)
