---
title: Workflow Pricing and Limits
product: workflows
url: /docs/workflows/pricing
canonical_url: "https://vercel.com/docs/workflows/pricing"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/workflows
related:
  - /docs/functions/usage-and-pricing
  - /docs/fluid-compute
  - /docs/queues/pricing
  - /docs/functions/limitations
  - /docs/observability
summary: Understand how Vercel Workflows billing works and the limits that apply to runs, streams, and platform resources.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/pricing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "116ebcac73558d4ea6fa914222a366a2710999d0e905842496f4e37ac3a1707a"
---

# Workflow Pricing and Limits

Vercel bills Workflows usage across three resources:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [Workflow SDK vs AWS Bedrock AgentCore](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-aws-agentcore?from=related) — AgentCore hosts and operates AI agents in isolated microVMs but is not a durable-execution engine. The Workflow SDK prov
- [Workflow SDK vs AWS Step Functions](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-aws-step-functions?from=related) — AWS Step Functions is a managed state-machine orchestrator authored in declarative ASL JSON. The Workflow SDK expresses
- [Workflow SDK vs Cloudflare Workflows](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-cloudflare-workflows?from=related) — Cloudflare Workflows is a durable engine on Workers and Durable Objects. It and the Workflow SDK both replay, but differ
- [Workflow SDK vs Inngest](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-inngest?from=related) — Inngest is an event-driven durable-functions platform that invokes your code over HTTP and memoizes step results. The Wo
- [Workflow SDK vs Temporal](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-temporal?from=related) — Temporal is a mature, language-agnostic durable-execution platform where you run the workers. The Workflow SDK runs in y
- [Vercel vs Webflow Cloud](https://vercel.com/kb/guide/vercel-vs-webflow-cloud?from=related) — Compare Vercel and Webflow Cloud for deploying Next.js and Astro apps, including runtime, framework support, storage, pr
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Limits](https://vercel.com/docs/limits?from=related) — Look up account limits, usage summaries, rate limits, and resource constraints for every Vercel plan.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Pricing](https://vercel.com/docs/vercel-blob/usage-and-pricing?from=related) — Learn about the pricing for Vercel Blob.

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

Storage for managed persistence is retained based on your team plan:

| Plan       | Retention after run completion |
| ---------- | ------------------------------ |
| Hobby      | 1 day                          |
| Pro        | 7 days                         |
| Enterprise | 30 days                        |

Storage retention is not configurable by default. You can request a custom retention period by contacting support.

## Workflow run limits

The following limits apply to all Workflow runs.

| Limit                                   | Value                                                      | Details                                                                                                                                                                                                              |
| --------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run creations per second                          | 1,000 |                                                                                                                                                         |
| Events per run                          | 25,000 limit                                               |                                                                                                                                                         |
| Steps per run                           | 10,000                                                     |                                                                                                                                                         |
| Event creations per run per second      | 200                                                        |                                                                                                                                                          |
| Hook creations per second               | 200                                                        |                                                                                                                                                          |
| Max payload size                        | 50 MB                                                      |                                                  |
| Maximum total entity storage per run    | 2 GB                                                       |                                                                                      |
| Max workflow replay duration            | 240s                                                       |  |
| Maximum run duration                    | No limit                                                   |                                                                                                                                                                                                                      |
| Maximum `sleep` duration                | No limit                                                   |                                                                                                                                                                                                                      |
| Max runtime of individual step          | see [Vercel Functions limits](/docs/functions/limitations) |                                                                                                                                                                                                                      |
| Max stream storage size                 | Unlimited                                                  |                                                                                                                                                                                                                      |
| Max stream chunk size                   | 10 MB                                                      |                                                                                                                                                                                                                      |
| Max stream chunks per second per stream | 1,000                                                      |                                                                                                                                                                                                                      |
| Hook token size                         | 255 bytes                                                  |                                                                                                                                                                                                                      |
| Workflow name                           | 255 bytes                                                  |                                                                                                                              |
| Step name                               | 255 bytes                                                  |                                                                                                                                  |

> **💡 Note:** Runs that exceed 2,000 events or 1 GB of total entity storage have slower replay times. To maintain high performance, we recommend [creating child workflows](https://workflow-sdk.dev/docs/foundations/starting-workflows) to break long-running workflows into smaller pieces.

### Vercel platform limits

| Limit                     | Value                                                               | Details                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Concurrency               | up to 100,000, see [Vercel Functions limits](/docs/functions/limitations) |                                                                                                                                               |
| Queued runs               | No limit, see [Vercel Queues limits](/docs/queues/pricing#limits)   |                                                                                                                                               |
| Schedules/cron            | No limit                                                            |                                                                                                                                               |
| Projects                  | Unlimited                                                           |                                                                                                                                               |
| Real-time connections     | No limit                                                            |                                                                                                                                               |
| Observability retention   | See [Observability](/docs/observability)                            |  |
| Compute resources         | See [Vercel Functions limits](/docs/functions/limitations)          |                                                                                                                                               |
| Maximum total bundle size | 250MB, see [Vercel Functions limits](/docs/functions/limitations)   |                                                                                                                                               |

### Rate limits

Requests include any event creation or stream write operation, as well as any operation for reading events, stream chunks, metadata, or event data.
For any request made from your deployment, exceeding the rate limit will automatically re-try with backoff. This includes the initial request to start the workflow. If the call to `start()` does not throw an error, the workflow will eventually start and run to completion or failure.
This means hitting the rate limit will not cause your workflow to fail, but it will slow down the rate at which your workflows run.

| Plan       | Requests per minute |
| ---------- | ------------------- |
| Hobby      | 100,000             |
| Pro        | 1,000,000           |
| Enterprise | 5,000,000           |


---

[View full sitemap](/docs/sitemap)
