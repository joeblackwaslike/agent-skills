---
title: Vercel CI
product: vercel
url: /docs/agent-resources/vercel-mcp/tools/vercel-ci
canonical_url: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/agent-resources/vercel-mcp/tools
  - /docs/agent-resources/vercel-mcp
related:
  []
summary: Vercel MCP tools for CI invocations, jobs, tasks, and logs.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-resources/vercel-mcp/tools/vercel-ci.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "eb9c0c8309209468c7584b021b50c15977892bdfef0cda03fa29bcf6f284a407"
---

# Vercel CI

Inspect Vercel CI invocations, attempts, jobs, tasks, and logs for your team. Use `retry_vercel_ci_invocation` to retry an invocation.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get log lines for the tasks of an invocation attempt](https://vercel.com/docs/rest-api/vercel-ci/get-log-lines-for-the-tasks-of-an-invocation-attempt) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/task-logs — Returns log lines for the tasks of an invoca
- [Get log lines for a specific task run attempt](https://vercel.com/docs/rest-api/vercel-ci/get-log-lines-for-a-specific-task-run-attempt) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task
- [Search the task logs of several invocation attempts](https://vercel.com/docs/rest-api/vercel-ci/search-the-task-logs-of-several-invocation-attempts) — GET /v1/vercel-ci/log-search — Searches the task logs of up to 50 invocation attempts at once, for example the most rece
- [Get an invocation with its jobs and tasks](https://vercel.com/docs/rest-api/vercel-ci/get-an-invocation-with-its-jobs-and-tasks) — GET /v1/vercel-ci/invocations/{invocationId}/tree — Returns an invocation attempt together with every job definition, it
- [List task runs for a job run](https://vercel.com/docs/rest-api/vercel-ci/list-task-runs-for-a-job-run) — GET /v1/vercel-ci/invocations/{invocationId}/attempts/{attempt}/job-definitions/{jobDefinitionId}/runs/{runAttempt}/task

Full cross-link map for this page: [/docs/agent-resources/vercel-mcp/tools/vercel-ci.graph.md](/docs/agent-resources/vercel-mcp/tools/vercel-ci.graph.md)
<!-- /docsgraph:related -->

## `get_vercel_ci_invocation`

Inspect a Vercel CI invocation attempt, including its status and conclusion.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string | Yes      | The invocation attempt number.                              |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_vercel_ci_invocation_logs`

Read logs for a Vercel CI invocation attempt.

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                   |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId` | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`      | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `level`        | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`       | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |

## `get_vercel_ci_invocation_tree`

Returns an invocation attempt together with every job definition, its latest job run, and the task definitions and active task runs of that job run. Defaults to the latest attempt when `attempt` is omitted. With `follow=1` the response is a newline-delimited JSON stream: a `{"type":"tree", ...}` event with the full tree is sent immediately and again whenever it changes, and a final `{"type":"end","reason":...}` event is sent when the attempt finishes (`completed`) or the stream reaches its maximum duration (`timeout`), after which clients should reconnect.

## Parameters

| Parameter      | Type   | Required | Description                                                                                             |
| -------------- | ------ | -------- | ------------------------------------------------------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                                                            |
| `attempt`      | string | No       | Invocation attempt to return. Defaults to the latest attempt.                                           |
| `follow`       | number | No       | When 1, stream the tree as newline-delimited JSON until the attempt finishes. Allowed values: `0`, `1`. |
| `teamId`       | string | No       | Team ID to use for this operation.                                                                      |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId.                                             |

## `get_vercel_ci_job_definition`

Inspect a job definition within a Vercel CI invocation attempt.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_vercel_ci_job_run`

Inspect a job run within a Vercel CI invocation attempt.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `runAttempt`      | string | Yes      | The job run attempt number.                                 |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `get_vercel_ci_job_run_logs`

Read logs for a Vercel CI job run.

## Parameters

| Parameter         | Type             | Required | Description                                                                                                                                                   |
| ----------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId`    | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`         | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `jobDefinitionId` | string           | Yes      | The job definition ID.                                                                                                                                        |
| `runAttempt`      | string           | Yes      | The job run attempt number.                                                                                                                                   |
| `follow`          | number           | No       | Allowed values: `0`, `1`.                                                                                                                                     |
| `since`           | number           | No       | -                                                                                                                                                             |
| `level`           | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`          | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`            | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |

## `get_vercel_ci_task_logs`

Returns log lines for the tasks of an invocation attempt in a single request, grouped by task. Tasks can be narrowed by name and by conclusion, for example `conclusion=failed` to fetch only the logs of failed tasks.

## Parameters

| Parameter      | Type             | Required | Description                                                                                                                                                   |
| -------------- | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId` | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`      | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `task`         | Array\<string> | No       | Only return tasks with one of these names (e.g., "web#test").                                                                                                 |
| `conclusion`   | Array\<string> | No       | Only return completed tasks with one of these conclusions. Allowed values: `"succeeded"`, `"cached"`, `"failed"`, `"skipped"`.                                |
| `level`        | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `limit`        | number           | No       | Maximum number of tasks to return (default: 10, max: 25).                                                                                                     |
| `teamId`       | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`         | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |

## `get_vercel_ci_task_run_logs`

Get Task Run Logs With `follow=1` the response is a newline-delimited JSON stream of log lines that ends once the task run has finished and its logs are flushed, or when the stream reaches its maximum duration.

## Parameters

| Parameter          | Type             | Required | Description                                                                                                                                                   |
| ------------------ | ---------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `invocationId`     | string           | Yes      | The Vercel CI invocation ID.                                                                                                                                  |
| `attempt`          | string           | Yes      | The invocation attempt number.                                                                                                                                |
| `jobDefinitionId`  | string           | Yes      | The job definition ID.                                                                                                                                        |
| `runAttempt`       | string           | Yes      | The job run attempt number.                                                                                                                                   |
| `taskDefinitionId` | string           | Yes      | The task definition ID.                                                                                                                                       |
| `taskRunAttempt`   | string           | Yes      | The task run attempt number.                                                                                                                                  |
| `follow`           | number           | No       | When 1, stream log lines as newline-delimited JSON until the task run finishes. Allowed values: `0`, `1`.                                                     |
| `since`            | number           | No       | -                                                                                                                                                             |
| `level`            | Array\<string> | No       | Only return log lines with one of these levels. Allowed values: `"trace"`, `"debug"`, `"command"`, `"info"`, `"warn"`, `"error"`, `"systemError"`, `"fatal"`. |
| `teamId`           | string           | No       | Team ID to use for this operation.                                                                                                                            |
| `slug`             | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                   |

## `list_vercel_ci_invocation_attempts`

List the attempts for a Vercel CI invocation.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_vercel_ci_invocations`

List Vercel CI invocations for your team. Filter by repository, branch, status, or conclusion.

## Parameters

| Parameter        | Type             | Required | Description                                                                                                                                                                                                                                                                   |
| ---------------- | ---------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`       | string           | No       | Repository provider (e.g., "github"). Allowed values: `"github"`, `"gitlab"`, `"bitbucket"`, `"vercel"`.                                                                                                                                                                      |
| `repository`     | string           | No       | Repository slug (e.g., "vercel/next.js").                                                                                                                                                                                                                                     |
| `branchName`     | string           | No       | Branch name (e.g., "main").                                                                                                                                                                                                                                                   |
| `snapshot`       | string           | No       | Snapshot/commit hash.                                                                                                                                                                                                                                                         |
| `status`         | Array\<string> | No       | Allowed values: `"new"`, `"skipped"`, `"bootstrapping"`, `"bootstrapping_failed"`, `"snapshotted"`, `"sandbox_named"`, `"jobs_on_hive_clone_dispatched"`, `"jobs_on_hive_dispatched"`, `"jobs_on_hive_completed"`, `"jobs_on_hive_failed"`, `"awaiting_jobs"`, `"completed"`. |
| `conclusion`     | Array\<string> | No       | Allowed values: `"succeeded"`, `"failed"`, `"skipped"`.                                                                                                                                                                                                                       |
| `source`         | Array\<string> | No       | Allowed values: `"vercel-ci"`, `"vercel-native-checks"`.                                                                                                                                                                                                                      |
| `authorGitHubId` | string           | No       | -                                                                                                                                                                                                                                                                             |
| `author`         | string           | No       | GitHub author login.                                                                                                                                                                                                                                                          |
| `createdAfter`   | number           | No       | -                                                                                                                                                                                                                                                                             |
| `createdBefore`  | number           | No       | -                                                                                                                                                                                                                                                                             |
| `limit`          | number           | No       | Number of results per page (default: 20, max: 100).                                                                                                                                                                                                                           |
| `cursor`         | string           | No       | Pagination cursor from a previous response.                                                                                                                                                                                                                                   |
| `teamId`         | string           | No       | Team ID to use for this operation.                                                                                                                                                                                                                                            |
| `slug`           | string           | No       | Team slug to use for this operation. Use instead of teamId.                                                                                                                                                                                                                   |

## `list_vercel_ci_job_definitions`

List job definitions for a Vercel CI invocation attempt.

## Parameters

| Parameter      | Type   | Required | Description                                                 |
| -------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId` | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string | Yes      | The invocation attempt number.                              |
| `teamId`       | string | No       | Team ID to use for this operation.                          |
| `slug`         | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_vercel_ci_job_runs`

List runs of a job definition within a Vercel CI invocation attempt.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_vercel_ci_task_definitions`

List Task Definitions

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `runAttempt`      | string | Yes      | The job run attempt number.                                 |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `list_vercel_ci_task_runs`

List task runs within a Vercel CI job run.

## Parameters

| Parameter         | Type   | Required | Description                                                 |
| ----------------- | ------ | -------- | ----------------------------------------------------------- |
| `invocationId`    | string | Yes      | The Vercel CI invocation ID.                                |
| `attempt`         | string | Yes      | The invocation attempt number.                              |
| `jobDefinitionId` | string | Yes      | The job definition ID.                                      |
| `runAttempt`      | string | Yes      | The job run attempt number.                                 |
| `taskRunAttempt`  | string | No       | The task run attempt number.                                |
| `teamId`          | string | No       | Team ID to use for this operation.                          |
| `slug`            | string | No       | Team slug to use for this operation. Use instead of teamId. |

## `retry_vercel_ci_invocation`

Retry a terminal Vercel CI invocation attempt identified by invocationId and attempt. Starts another attempt. inspect its state to determine whether it completes successfully.

Retry support depends on the invocation source and terminal state. Native-check invocations can return `retry_not_supported`. A successful retry starts another attempt. Inspect its status and logs before reporting the outcome.

## Parameters

| Parameter      | Type    | Required | Description                                                 |
| -------------- | ------- | -------- | ----------------------------------------------------------- |
| `invocationId` | string  | Yes      | The Vercel CI invocation ID.                                |
| `attempt`      | string  | Yes      | The invocation attempt number.                              |
| `teamId`       | string  | No       | Team ID to use for this operation.                          |
| `slug`         | string  | No       | Team slug to use for this operation. Use instead of teamId. |
| `requestBody`  | unknown | No       | Request body for this tool.                                 |


---

[View full sitemap](/docs/sitemap)
