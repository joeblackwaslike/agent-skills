---
title: Workflow Data Retention
product: workflows
url: /docs/workflows/retention
canonical_url: "https://vercel.com/docs/workflows/retention"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/workflows
related:
  - /docs/workflows
  - /docs/workflows/pricing
  - /docs/queues
  - /docs/logs/runtime
  - /docs/eve/agent-runs
summary: Learn how long Vercel Workflows keeps run data, when Vercel deletes it, where Vercel stores it, and how to delete it sooner.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/retention.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "5d85dbe2823ecbfd96d9595b9d18177f9344b0240862b454cf1835cb00ba1687"
---

# Workflow Data Retention

Vercel Workflows stores the inputs, outputs, event log, and streams of every workflow run so that the run can pause, resume, and replay. Use this reference to look up how long you can read a run's data after it finishes, when Vercel deletes it, where Vercel stores it, and how to delete it sooner.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to migrate from Cloudflare Workflows to Vercel Workflows](https://vercel.com/kb/guide/migrate-cloudflare-workflows-to-vercel-workflows) — Migrate from Cloudflare Workflows to Vercel Workflows by mapping WorkflowEntrypoint, step.do, and waitForEvent to workfl
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [How to run background jobs in Next.js](https://vercel.com/kb/guide/how-to-run-background-jobs-in-nextjs-on-vercel) — Learn the durable way to run background jobs in Next.js on Vercel with the Workflow SDK, and when to reach for Queues or
- [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution)
- [Versioning](https://workflow-sdk.dev/docs/foundations/versioning) — Keep in-flight runs stable by default, then choose explicit upgrade boundaries when you need them.
- [Worlds](https://workflow-sdk.dev/docs/configuration/worlds) — Select and configure Local, Postgres, Vercel, or custom Worlds.
- [How to handle order-ahead traffic spikes on Vercel](https://vercel.com/kb/guide/handle-order-ahead-traffic-spikes-on-vercel) — Order-ahead traffic spikes hit the same routes every lunch hour. Learn how to scale, cache, queue, and test a restaurant
- [Workflow Concepts](https://vercel.com/docs/workflows/concepts) — Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
- [Runtimes](https://vercel.com/docs/functions/runtimes) — Runtimes transform your source code into Functions, which are served by our CDN. Learn about the official runtimes suppo

Full cross-link map for this page: [/docs/workflows/retention.graph.md](/docs/workflows/retention.graph.md)
<!-- /docsgraph:related -->

## What a workflow run stores

Vercel stores two kinds of data for each run:

| Data             | What it includes                                                                                                                                                                                                                                             | Encrypted                                                                                |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- |
| **Run payloads** | The workflow's input, return value, and error. Each step's input, return value, and error. Hook metadata and the payloads that hooks and webhooks receive. The payloads recorded on the event log. Stream contents.                                           | Yes, with [end-to-end encryption](https://workflow-sdk.dev/docs/how-it-works/encryption) |
| **Run metadata** | IDs, workflow and step names, statuses, timestamps, error codes, sizes, deployment and region, [attributes](https://workflow-sdk.dev/docs/observability/attributes) you set on the run, and hook tokens. The dashboard uses metadata to show a run's timeline. | No                                                                                       |

Vercel keeps run payloads in **run storage**. Run metadata powers the dashboard, run listings, analytics, and billing, and has its own [retention](#how-long-vercel-keeps-run-metadata).

> **💡 Note:** Don't put personal or sensitive data in run metadata, such as attributes or
> hook tokens. Metadata isn't encrypted, and Vercel can keep it longer than run
> payloads.

To control who on your team can read decrypted run payloads, see [Roles and permissions](/docs/workflows#roles-and-permissions).

## How long Vercel keeps run payloads

Vercel gives two guarantees for the payloads of every finished workflow run, a retention period and a maximum time that Vercel keeps them:

- **Retention period**: You can read the run's payloads for this period after the run finishes. Once the retention period ends, the payloads are no longer accessible, and Vercel may delete them at any time.
- **Kept for up to**: Vercel deletes every copy of the payloads no later than this time after the run finishes.

| Plan       | Retention period               | Kept for up to                  |
| ---------- | ------------------------------ | ------------------------------- |
| Hobby      | 1 day after the run finishes   | 66 days after the run finishes  |
| Pro        | 7 days after the run finishes  | 96 days after the run finishes  |
| Enterprise | 30 days after the run finishes | 126 days after the run finishes |

Vercel decides when to delete payloads between the end of the retention period and the end of the **Kept for up to** period. Don't rely on payloads still existing after the retention period ends, or on them being gone before the **Kept for up to** period ends. On Pro and Enterprise, Vercel bills [Workflow Data Retained](/docs/workflows/pricing) based on the retention period.

These rules apply to every run:

- **All finished runs follow the same rules**: Completed, failed, and cancelled runs all get the same retention period and **Kept for up to** period.
- **Active runs keep all their data**: While a run is running, sleeping, or waiting on a hook, Vercel keeps all of its data with no time limit. The retention period only starts once the run finishes.
- **Cancelling a run doesn't delete its data**: Cancelling finishes the run, which starts its retention period. To stop retaining data for a run you no longer need, cancel it.
- **Vercel fixes a run's retention period when the run finishes**: Vercel records the retention period on the run as soon as the run finishes. If you later change plans, the change applies to runs that finish afterward. Runs that already finished keep the period they finished with.
- **Environment and SDK version don't matter**: Production and preview runs, and runs created by the 4.x and 5.x releases of the `workflow` package, follow the same rules.
- **Frameworks built on Workflows**: If you use eve, see eve's code or documentation for when it terminates a run. After that, the regular Workflows retention rules on this page apply.

Once a run finishes, its `expiredAt` field records the exact time its retention period ends. See [Check whether run payloads have expired](#check-whether-run-payloads-have-expired).

## How long Vercel keeps run metadata

Vercel keeps run metadata for at least your plan's observability lookback period, and may keep it for up to one year. The payload retention periods don't apply to run metadata:

| Plan                                      | Kept for at least           | Kept for up to             |
| ----------------------------------------- | --------------------------- | -------------------------- |
| Hobby                                     | 1 day after it's recorded   | 1 year after it's recorded |
| Pro                                       | 2 days after it's recorded  | 1 year after it's recorded |
| Enterprise                                | 3 days after it's recorded  | 1 year after it's recorded |
| Pro or Enterprise with Observability Plus | 30 days after it's recorded | 1 year after it's recorded |

During the minimum period, you can always look up a run's metadata in the dashboard. After the minimum period, Vercel may delete the metadata at any time, and deletes it no later than one year after recording it.

Because run metadata outlives run payloads, the dashboard and run listings can show runs whose payloads have already expired. **A listed run doesn't mean that its payloads are still readable.** A run that doesn't appear in a dashboard view can also still have readable payloads, so use [`expiredAt`](#check-whether-run-payloads-have-expired) rather than run listings to decide whether a run's payloads are available.

## What happens when the retention period ends

After a run's `expiredAt` passes, you can't read its payloads through the dashboard, the Workflow command-line interface (CLI), or any API. Reads respond as follows:

| What you read                                   | Result after the retention period ends                                                                                             |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `await run.returnValue`                         | Throws [`RunExpiredError`](https://workflow-sdk.dev/docs/errors/run-expired), which includes `runId`, `runStatus`, and `expiredAt` |
| Run, step, hook, or event payloads              | Return an expired placeholder instead of the data. The dashboard shows **Data expired** and the CLI shows `<data expired>`                                     |
| Stream chunks                                   | Return HTTP 410 with code `stream-expired` (`StreamExpiredError` in the SDK)                                                       |
| A run whose run record Vercel has deleted       | Returns HTTP 404 (`WorkflowRunNotFoundError` in the SDK)                                                                           |
| A run you don't have access to                  | Returns HTTP 401 or 403, regardless of expiry                                                                                      |

**Rerun on latest** needs the run's original input, which isn't available once the run's payloads expire. Retrying a read doesn't bring expired payloads back.

## Where Vercel stores run data

Vercel pins each run to a single region when the run starts. See [Multi-region](/docs/workflows#multi-region) for how Vercel picks the region. Runs created by the 4.x release line of the `workflow` package always live in `iad1`.

A run's payloads, run records, and streams stay in the run's region, including every copy Vercel keeps of them. Within that region, Vercel stores data redundantly across multiple data centers for durability. Apart from the cases below, Vercel doesn't copy run data to other regions.

Some data leaves the run's region:

- **Hook records**: Vercel stores hook records in `iad1` by default, unless you choose a different region. A hook record includes the hook's token and can include the encrypted metadata you pass to `createHook()`. Storing hook records in a known region, rather than in each run's region, lets [`getHookByToken()`](https://workflow-sdk.dev/docs/api-reference/workflow-api/get-hook-by-token) and [`resumeHook()`](https://workflow-sdk.dev/docs/api-reference/workflow-api/resume-hook) resolve a token from any region. The payloads that a hook receives stay in the run's region. Vercel deletes a hook record when its run finishes, or when its [`experimental_minRetention`](https://workflow-sdk.dev/docs/api-reference/workflow/create-hook#keep-a-token-unavailable-after-the-run-ends) period ends, whichever is later.
- **Observability metadata**: Vercel processes run metadata, including attributes, in its observability systems, which aren't pinned to the run's region. These systems never receive run payloads.
- **Requests from other regions**: When you read a run, resume a hook, or consume a stream from another region, Vercel routes the request to the run's region. The data travels over Vercel's network to the caller, but Vercel doesn't store it outside the run's region.

Vercel dispatches the [Vercel Queues](/docs/queues) messages that orchestrate a run from the run's region, and those messages expire within 7 days.

## Delete run data sooner

### Zero retention for new runs

To delete a run's payloads as soon as it finishes, pass `experimental_retention: 0` when you start the run:

```typescript filename="app/api/start-workflow/route.ts"
import { start } from 'workflow/api';
import { processProfile } from '@/workflows/process-profile';

const run = await start(processProfile, [profileId], {
  experimental_retention: 0,
});
```

With zero retention:

- When the run completes, fails, or you cancel it, its payloads stop being readable immediately. Vercel keeps them for up to 36 days after the run finishes.
- Run metadata follows the normal [run metadata retention](#how-long-vercel-keeps-run-metadata), so the run still appears in the dashboard with its payloads shown as expired.
- You can't read the run's return value. `await run.returnValue` usually throws `RunExpiredError` because deletion happens as soon as the run finishes. If you need the result, write it to your own storage from a step before the run finishes.
- Vercel doesn't bill Workflow Data Retained for the run's payloads.

Zero retention requires `workflow` 5.0.0 or later, and applies to the run you pass it to. The option is experimental, so its name and accepted values can change. For details, see [Data retention](https://workflow-sdk.dev/docs/observability/retention) in the Workflow SDK documentation.

### Runs that have already finished

You can't delete the data of a run that has already finished. There's no API, CLI command, or dashboard action that deletes specific runs, or all runs created before a date. This applies to runs created by every SDK version, including 4.x.

Payload access always ends at the run's `expiredAt`, and Vercel deletes the payloads by the end of the [**Kept for up to** period](#how-long-vercel-keeps-run-payloads). To make sure future runs don't keep payloads, start them with [zero retention](#zero-retention-for-new-runs).

### Deleting a project or team

Deleting a project or a team doesn't immediately delete its workflow run data. The data of existing runs follows the same retention rules as for any other run.

## Check whether run payloads have expired

Every finished run records when its payloads expire in its `expiredAt` field. You can look up `expiredAt` in the Vercel dashboard or with the Workflow CLI. Neither one decrypts the run's payloads unless you explicitly ask it to.

### Check expiry in the Vercel dashboard

To see when a run's payloads expire in the dashboard:

1. Open your project in the [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fworkflows\&title=Vercel+Workflows).
2. Select **Observability**, then **Workflows**.
3. Select the run.

The **Expiry** field in the run details shows how long until the run's payloads expire, or how long ago they expired. Hover over the value to see the exact time. The dashboard shows encrypted payloads as locked until you select **Decrypt**, so viewing the run details doesn't decrypt them.

### Check expiry with the Workflow CLI

To print a run's record, including `expiredAt`, run the following command from your linked project directory after you sign in with `vercel login`:

```bash filename="Terminal"
npx workflow inspect run your_run_id_here --backend vercel
```

Add `--json` to get the run record as JSON. Without the `--decrypt` flag, the CLI doesn't decrypt payloads. When the run's payloads have expired, the CLI prints a warning that the run's data has expired and shows its payloads as `<data expired>`.

A run can be missing from the dashboard because it falls outside your plan's observability lookback period or the selected filters, even while its run record and payloads still exist. A not found response from the CLI's run-storage lookup means the run record is unavailable, but doesn't confirm that Vercel has deleted every copy of the run's data. Run payloads and run metadata follow the schedules on this page.

Run records can include other lifecycle fields, such as byte counts and internal retention settings. Vercel uses them for billing and storage management, and they can change. Rely on `expiredAt` to know when payload access ends.

## Data outside run retention

Run retention only applies to the data that Workflows stores for a run. Copies of the same data elsewhere follow their own rules:

- **Logs**: Anything your workflow or step code logs follows [runtime logs retention](/docs/logs/runtime#limits).
- **Traces**: Spans that your code or framework exports follow the retention of the destination, such as [Agent Runs](/docs/eve/agent-runs) for eve or your [tracing](/docs/tracing) provider.
- **Drains**: Data you forward with [Drains](/docs/drains) follows the retention of the receiving service.
- **Your own systems**: Data that your steps write to databases, APIs, or other services isn't affected by run retention.

## Common questions

- **Why can I still see runs older than my retention period?** Run metadata has its own retention. See [Run metadata](#how-long-vercel-keeps-run-metadata).
- **Do completed, failed, and cancelled runs differ?** No. See [Run payloads](#how-long-vercel-keeps-run-payloads).
- **Does cancelling a run delete its data?** No. Cancelling starts the retention period.
- **If I upgrade my plan, do runs that already finished keep their data longer?** No. A run keeps the retention period it finished with.
- **Can an expired run still be read or resumed?** No. A finished run can't resume, and its payloads can't be read after `expiredAt`.
- **When is every copy of a run's payloads gone?** By the end of the **Kept for up to** period. See [How long Vercel keeps run payloads](#how-long-vercel-keeps-run-payloads).
- **Is data from runs in `iad1` stored outside `iad1`?** Vercel stores run payloads only in `iad1`, but processes run metadata in its observability systems, which aren't pinned to a region. See [Where Vercel stores run data](#where-vercel-stores-run-data).
- **How do I delete specific runs?** See [Delete run data sooner](#delete-run-data-sooner).

## Related

- [Workflow pricing and limits](/docs/workflows/pricing)
- [Data retention in the Workflow SDK](https://workflow-sdk.dev/docs/observability/retention)
- [Workflow SDK encryption](https://workflow-sdk.dev/docs/how-it-works/encryption)
- [Observability Plus](/docs/observability/observability-plus)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
