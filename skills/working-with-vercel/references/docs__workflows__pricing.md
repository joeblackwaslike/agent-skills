---
title: Workflow Pricing and Limits
product: workflows
url: /docs/workflows/pricing
canonical_url: "https://vercel.com/docs/workflows/pricing"
last_updated: 2026-09-16
type: reference
prerequisites:
  - /docs/workflows
related:
  - /docs/functions/usage-and-pricing
  - /docs/fluid-compute
  - /docs/queues/pricing
  - /docs/workflows/retention
  - /docs/functions/limitations
summary: Understand how Vercel Workflows billing works and the limits that apply to runs, streams, and platform resources.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/pricing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "b0b63ffc537e588e1db0eb14843c341d83af9f8e64ea47ddbb3c940dde84ecaa"
---

# Workflow Pricing and Limits

Vercel bills Workflows usage across three resources:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [How to migrate from Cloudflare Workflows to Vercel Workflows](https://vercel.com/kb/guide/migrate-cloudflare-workflows-to-vercel-workflows) — Migrate from Cloudflare Workflows to Vercel Workflows by mapping WorkflowEntrypoint, step.do, and waitForEvent to workfl
- [Private enterprise agents on Vercel](https://vercel.com/kb/guide/private-enterprise-agents-vercel) — Design private enterprise agents that call internal APIs and databases with Vercel Functions, Secure Compute, AI Gateway
- [Run a research workspace on Vercel](https://vercel.com/kb/guide/run-research-workspace-vercel) — Plan a durable research workspace on Vercel's Agentic Infrastructure with Workflows, internal API tools, Vercel Sandbox
- [Workflow SDK vs AWS Bedrock AgentCore](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-aws-agentcore) — AgentCore hosts and operates AI agents in isolated microVMs but is not a durable-execution engine. The Workflow SDK prov
- [Workflow SDK vs AWS Step Functions](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-aws-step-functions) — AWS Step Functions is a managed state-machine orchestrator authored in declarative ASL JSON. The Workflow SDK expresses
- [max-events-exceeded](https://workflow-sdk.dev/docs/errors/max-events-exceeded) — Run long-running workflows on the QuickJS VM with snapshotting, which is exempt from the default event limit, or split t
- [Errors & Retrying](https://workflow-sdk.dev/docs/foundations/errors-and-retries) — Control how steps handle failures and customize retry behavior.
- [Worlds](https://workflow-sdk.dev/docs/configuration/worlds) — Select and configure Local, Postgres, Vercel, or custom Worlds.
- [How to run background jobs in Next.js](https://vercel.com/kb/guide/how-to-run-background-jobs-in-nextjs-on-vercel) — Learn the durable way to run background jobs in Next.js on Vercel with the Workflow SDK, and when to reach for Queues or
- [Limits](https://vercel.com/docs/limits) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Workflow Concepts](https://vercel.com/docs/workflows/concepts) — Learn how workflows, steps, sleeps, and hooks work together to build durable applications.

Full cross-link map for this page: [/docs/workflows/pricing.graph.md](/docs/workflows/pricing.graph.md)
<!-- /docsgraph:related -->

- **Workflow Events**: Every state transition in a workflow run is persisted as an event. See [Events](#events) for more details.
- **Workflow Data Written**: The amount of data written to managed persistence for workflow state and event logs, including stream data.
- **Workflow Data Retained**: The amount of data stored per month in managed persistence.

Vercel bills each resource based on usage. Hobby includes monthly allowances for Workflow Events and Workflow Data Written. Workflow Data Retained is not available on Hobby, and Vercel bills Pro usage on demand.

| Resource | Hobby Included | On-demand Rates |
| --- | --- | --- |
| Workflow Events | 50,000 events / month included | $0.02 per 1K events |
| Workflow Data Written | 1 GB | $0.50 per GB |
| Workflow Data Retained | — | $0.50 per GB-month |


You can inspect the amount of Workflow Data Written for a specific workflow run by navigating to the workflow details on the Workflows page in the dashboard. Vercel calculates Workflow Data Retained based on the amount of data written and the retention period. For example, writing 1 GB and having a retention period of 1 month would result in 1 GB-month of retained data.

Functions invoked by Workflows continue to be charged at the [existing compute rates](/docs/functions/usage-and-pricing). We recommend using [Fluid compute](/docs/fluid-compute) with Workflow for reduced costs and higher performance.

Workflow uses Vercel Queues to orchestrate workflow runs. Vercel bills Queues usage at standard rates, see [Vercel Queues pricing](/docs/queues/pricing) for more details.

## Events

Every state transition in a workflow run is persisted as an event. The full list of events is available in the [Workflow SDK documentation](https://workflow-sdk.dev/docs/how-it-works/event-sourcing).

As an example, a normal step function execution produces three events: `step_created`, `step_started`, and `step_completed`. For every time a step re-tries due to a transient error, a `step_retrying` event is also created.

## Storage retention

Vercel bills Workflow Data Retained for the retention period of each run, which depends on your team plan. For retention periods, how long Vercel keeps run data, run metadata retention, and how to delete run data sooner, see [Data Retention](/docs/workflows/retention).

## Workflow run limits

The following limits apply to all Workflow runs. **Events per run** and **Steps per run** are the defaults for the Node.js runtime, and the [QuickJS runtime](#quickjs-runtime) lifts both.

| Limit                                   | Value                                                      | Details                                                                                                                                                                                                              |
| --------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run creations per second                          | 1,000 |                                                                                                                                                         |
| Events per run                          | 25,000 limit                                               | Applies to the default Node.js runtime. [QuickJS](#quickjs-runtime) runs with snapshotting enabled are exempt from this cap.                                                                                        |
| Steps per run                           | 10,000                                                     | Applies to the default Node.js runtime. Steps write events, so [QuickJS](#quickjs-runtime) runs that are exempt from the event cap can execute more steps.                                                          |
| Event creations per run per second      | 200                                                        | (Throttled and re-tried when exceeded)                                                                                                                                                         |
| Hook creations per second               | 200                                                        | (Throttled and re-tried when exceeded)                                                                                                                                                         |
| Max payload size                        | 50 MB                                                      | (Maximum size of any run/step/hook input/output. Streams passed into a run or step do not count towards this limit and have their own limits.)                                                 |
| Maximum total entity storage per run    | 2 GB                                                       | (The total amount of data stored in managed persistence for run state and events, excluding stream data.)                                                                                     |
| Max workflow replay duration            | 240s                                                       | (If a workflow orchestration attempt takes longer than 240 seconds, due to memory pressure, a large amount of events, or complex code within your workflow functions, the run may be aborted.) |
| Maximum run duration                    | No limit                                                   |                                                                                                                                                                                                                      |
| Maximum `sleep` duration                | No limit                                                   |                                                                                                                                                                                                                      |
| Max runtime of individual step          | see [Vercel Functions limits](/docs/functions/limitations) |                                                                                                                                                                                                                      |
| Max stream storage size                 | Unlimited                                                  |                                                                                                                                                                                                                      |
| Max stream chunk size                   | 10 MB                                                      |                                                                                                                                                                                                                      |
| Max stream chunks per second per stream | 1,000                                                      |                                                                                                                                                                                                                      |
| Hook token size                         | 255 bytes                                                  |                                                                                                                                                                                                                      |
| Attributes per run                      | 64                                                         | (Keys are 1-256 characters and values are strings up to 256 bytes. Keys starting with $ are reserved.)                                                                                        |
| Attribute write size                    | 8 KiB                                                      | (Maximum size of the event data written by a single setAttributes call, including keys, values, and writer metadata. Split larger updates across calls.)                                     |
| Workflow name                           | 255 bytes                                                  | (Workflow names are derived from the file path and function name.)                                                                                                                             |
| Step name                               | 255 bytes                                                  | (Step names are derived from the file path and function name.)                                                                                                                                 |
| Dynamic workflow source size            | 128 KiB                                                    | Dynamic workflows only. Experimental. (Maximum size of the source passed to start(). Its step aliases must also fit the 2,048-byte run execution context, which allows roughly 30 aliases.)    |

> **💡 Note:** On the default runtime, runs that exceed 2,000 events or 1 GB of total entity storage can have slower replay times. To keep replay fast, split independent work into [child workflows](https://workflow-sdk.dev/cookbook/advanced/child-workflows), [bundle several items into each step](https://workflow-sdk.dev/cookbook/common-patterns/batching) so a run writes fewer events, or switch to the [QuickJS runtime](#quickjs-runtime), which replays only the events recorded since its last snapshot. Snapshots don't speed up the work inside individual steps.

### QuickJS runtime

Workflow runs your workflow function on the Node.js runtime by default, which caps each run at 25,000 events. Runs that start on the experimental QuickJS runtime with snapshotting enabled are exempt from that cap, so a run can record more events and execute more steps than the table above lists. Every other limit on this page still applies, including payload size, entity storage, replay duration, and the rate limits below.

To opt in:

1. Set the `WORKFLOW_VM` [environment variable](/docs/environment-variables) to `quickjs` for your project.
2. Leave `WORKFLOW_SNAPSHOT_THRESHOLD` unset, or set it to a positive integer. QuickJS snapshots workflow state every 1,000 events by default. A value of `0` turns snapshotting off, and those runs keep the 25,000 event cap.
3. Redeploy your project.

A run records its runtime and snapshot policy when it starts, so the exemption covers only runs that start after you redeploy. Runs already in progress keep the limits they started with, and runs that already failed with `MAX_EVENTS_EXCEEDED` don't resume on their own. Start those runs again.

QuickJS is experimental, and your workflow function sees a different set of globals: `Intl`, `WebAssembly`, and `Atomics` are unavailable, and `crypto.subtle` methods throw. Your step functions are unaffected and keep full Node.js access. For the complete list of differences, see the [QuickJS runtime documentation](https://workflow-sdk.dev/docs/configuration/runtime-tuning#workflow_vm).

### Vercel platform limits

| Limit                     | Value                                                               | Details                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Concurrency               | up to 100,000, see [Vercel Functions limits](/docs/functions/limitations) |                                                                                                                                               |
| Queued runs               | No limit, see [Vercel Queues limits](/docs/queues/pricing#limits)   |                                                                                                                                               |
| Schedules/cron            | No limit                                                            |                                                                                                                                               |
| Projects                  | Unlimited                                                           |                                                                                                                                               |
| Real-time connections     | No limit                                                            |                                                                                                                                               |
| Observability retention   | See [Data Retention](/docs/workflows/retention#how-long-vercel-keeps-run-metadata)        | (Run metadata retention. Run payloads and streams follow the payload retention periods on the same page.) |
| Compute resources         | See [Vercel Functions limits](/docs/functions/limitations)          |                                                                                                                                               |
| Maximum total bundle size | 250MB, see [Vercel Functions limits](/docs/functions/limitations)   |                                                                                                                                               |

### Rate limits

Requests include any event creation or stream write operation, as well as any operation for reading events, stream chunks, metadata, or event data.
For any request made from your deployment, exceeding the rate limit will automatically re-try with backoff. This includes the initial request to start the workflow. If the call to `start()` does not throw an error, the workflow will eventually start and run to completion or failure.
This means hitting the rate limit will not cause your workflow to fail, but it will slow down the rate at which your workflows run.
A rate-limited write that records a step's result is retried for as long as the function invocation runs, so the step doesn't run again or use up one of its retries.

| Plan       | Requests per minute |
| ---------- | ------------------- |
| Hobby      | 50,000              |
| Pro        | 500,000             |
| Enterprise | 2,500,000           |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
