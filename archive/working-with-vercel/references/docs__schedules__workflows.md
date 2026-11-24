---
title: Starting Workflows from Schedules
product: vercel
url: /docs/schedules/workflows
canonical_url: "https://vercel.com/docs/schedules/workflows"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/schedules
related:
  - /docs/workflows
  - /docs/functions/configuring-functions/duration
  - /docs/workflows/concepts
  - /docs/workflows/pricing
  - /docs/functions/usage-and-pricing
summary: Start a durable Vercel Workflow each time a schedule fires, so long or multi-step scheduled jobs retry failed steps and survive crashes and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/schedules/workflows.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "8e4f06394306c591c5421c86493540f2298b0aec9871611d7f66d71cc773ac4e"
---

# Starting Workflows from Schedules

Start a [Vercel Workflow](/docs/workflows) each time a schedule fires. The schedule decides when work begins. The workflow runs the work in durable steps that retry on failure and resume after crashes and deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Workflow SDK vs Inngest](https://workflow-sdk.dev/docs/comparisons/workflow-sdk-vs-inngest) — Inngest is an event-driven durable-functions platform that invokes your code over HTTP and memoizes step results. The Wo
- [How to migrate from Cloudflare Workflows to Vercel Workflows](https://vercel.com/kb/guide/migrate-cloudflare-workflows-to-vercel-workflows) — Migrate from Cloudflare Workflows to Vercel Workflows by mapping WorkflowEntrypoint, step.do, and waitForEvent to workfl
- [Schedules Configuration Reference](https://vercel.com/docs/schedules/configuration) — Reference for static schedules in vercel.json and the Build Output API, including targets, function identifiers, cron sy
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [Chat SDK with Vercel Workflows](https://vercel.com/docs/chat-sdk/integrations/workflows) — Use Vercel Workflows to pause Chat SDK tasks for human approval, resume after a decision, and inspect runs in the Vercel
- [Background Workers on Vercel](https://vercel.com/docs/background-workers) — Run background jobs on Vercel, from continuous workers with Daemons to queued tasks, scheduled jobs, and durable workflo
- [Vercel Queues](https://vercel.com/docs/queues) — Publish agent events and background work to durable topics with independent consumers, automatic retries, and at-least-o

Full cross-link map for this page: [/docs/schedules/workflows.graph.md](/docs/schedules/workflows.graph.md)
<!-- /docsgraph:related -->

The schedule's handler only calls `start()` and returns. The job itself runs in the workflow, outside the handler's request.

## Why start a workflow instead of running the job in the handler

A scheduled run that does all of its work inside the handler is one function invocation. If that invocation fails, times out, or is interrupted by a deployment, the progress is lost. A workflow records each step's result, so a failure only repeats the step that failed.

| | Job runs in the schedule handler | Schedule handler starts a workflow |
| --- | --- | --- |
| **Duration** | Limited to the function's [maximum duration](/docs/functions/configuring-functions/duration) | Each step is its own function invocation. A run can last minutes to months. |
| **Failure partway through** | Function and path targets don't retry. Queue targets retry the whole job from the beginning. | The failed step retries, up to 3 times by default. Completed steps don't run again. |
| **Crash or deployment mid-run** | Work in progress is lost | The run resumes from its last completed step, on the deployment that started it |
| **Waiting** | The function keeps running while it waits, within its maximum duration | [`sleep()`](/docs/workflows/concepts#sleep) and [hooks](/docs/workflows/concepts#hook) pause the run without using compute |
| **Visibility** | Function logs and the schedule's execution history | Also a trace of every step, input, output, and error in [Workflows observability](/docs/workflows#observability) |

Run the job in the handler when it's short, finishes well within the function's maximum duration, and is safe to skip if a run fails. Start a workflow when the job has several steps, calls external services that can fail, takes longer than one function invocation, or must finish once it starts.

Workflows bills for [Events, Data Written, and Data Retained](/docs/workflows/pricing). Each step's function invocation is billed at the usual [compute rates](/docs/functions/usage-and-pricing).

## Start a workflow from a schedule

This example sends a nightly report. A static schedule publishes to a [queue topic](/docs/schedules/handle-runs#queue-targets) every night at 02:00, and the topic's consumer starts a workflow for that night's run.

Use a queue target to start workflows. If `start()` throws, the queue retries the consumer, so a transient error doesn't skip that night's report. Function and path targets don't retry a failed run. A queue target also works with [dynamic schedules](/docs/schedules#static-and-dynamic-schedules) and their payloads.

1. Install the Workflow SDK, the Queues SDK, and the Schedules SDK, then follow the [Workflow SDK getting started guide](https://workflow-sdk.dev/docs/getting-started) to set up your framework:

   ```bash package-manager
   npm i workflow @vercel/queue @vercel/schedules
   ```

2. Write the workflow. Each `'use step'` function runs as its own invocation and retries on its own:

   ```ts filename="workflows/nightly-report.ts"
   import { buildReport, emailReport, listAccountIds } from '@/lib/reports';

   export async function nightlyReport(scheduledAt: string) {
     'use workflow';

     const accountIds = await getAccountIds();

     for (const accountId of accountIds) {
       const report = await createReport(accountId, scheduledAt);
       await sendReport(accountId, report);
     }
   }

   async function getAccountIds() {
     'use step';
     return listAccountIds();
   }

   async function createReport(accountId: string, scheduledAt: string) {
     'use step';
     return buildReport(accountId, new Date(scheduledAt));
   }

   async function sendReport(accountId: string, report: string) {
     'use step';
     await emailReport(accountId, report);
   }
   ```

   If sending one account's email fails, only that step retries. The run doesn't rebuild the reports it has already sent.

3. Create a queue consumer that starts the workflow:

   ```ts filename="app/api/nightly-report/route.ts"
   import { handleCallback } from '@vercel/queue';
   import type { ScheduleQueueMessage } from '@vercel/schedules';
   import { start } from 'workflow/api';
   import { nightlyReport } from '@/workflows/nightly-report';

   export const POST = handleCallback<ScheduleQueueMessage>(async (message) => {
     await start(nightlyReport, [message.scheduledAt]);
   });
   ```

   `start()` returns as soon as Vercel accepts the run. It doesn't wait for the workflow to finish, so the consumer acknowledges the message in milliseconds, however long the report takes.

4. Subscribe the consumer to a topic and point a schedule at the same topic:

   ```json filename="vercel.json"
   {
     "functions": {
       "app/api/nightly-report/route.ts": {
         "experimentalTriggers": [
           { "type": "queue/v2beta", "topic": "nightly-report" }
         ]
       }
     },
     "schedules": {
       "nightly-report": {
         "schedule": "0 2 * * *",
         "timezone": "America/New_York",
         "topic": "nightly-report"
       }
     }
   }
   ```

To test it, run `vercel dev` and invoke the schedule with `vercel schedules invoke nightly-report --local`. See [Testing schedules locally](/docs/schedules/local-development).

To start a workflow from a dynamic schedule, create the schedule with [`Schedules.create()`](/docs/schedules/sdk#create-a-schedule) and `target: { topic: 'nightly-report' }`. Read the schedule's payload from `message.payload` and pass it to `start()` as an argument.

## Start one workflow run per scheduled run

A schedule run can be [delivered more than once](/docs/schedules/concepts#duplicate-runs), and a queue retries its consumer after an error. Without a check, each delivery starts another workflow run, and the report goes out twice.

To start at most one run per occurrence, pass the run's `executionId` as a start token. The `executionId` is the same for every delivery of an occurrence. A second `start()` with the same token throws `HookConflictError` instead of creating a run:

```ts filename="app/api/nightly-report/route.ts"
import { handleCallback } from '@vercel/queue';
import type { ScheduleQueueMessage } from '@vercel/schedules';
import { start } from 'workflow/api';
import { HookConflictError } from 'workflow/errors';
import { nightlyReport } from '@/workflows/nightly-report';

export const POST = handleCallback<ScheduleQueueMessage>(async (message) => {
  try {
    await start(nightlyReport, [message.scheduledAt], {
      experimental_hook: {
        token: `nightly-report:${message.executionId}`,
        experimental_minRetention: '7 days',
      },
    });
  } catch (error) {
    // Another delivery of this occurrence already started the run
    if (HookConflictError.is(error)) return;
    throw error;
  }
});
```

- **Acknowledge the duplicate.** Return normally on `HookConflictError` so the queue doesn't keep redelivering the message.
- **Rethrow other errors.** The queue retries the consumer, and the retry uses the same token, so it either starts the run or finds the run that already started.
- **Keep the token after the run ends.** Without `experimental_minRetention`, Vercel releases the token when the run finishes, and a late duplicate would start a new run. Queue messages are retained for up to 7 days, so a 7-day retention covers any redelivery.

Steps can also retry, so make each step's side effects safe to repeat. To learn how to use a step's ID as an idempotency key, and how start tokens work, see [Idempotency](https://workflow-sdk.dev/docs/foundations/idempotency) in the Workflow SDK docs.

### Use a function or path target

You can call `start()` the same way from a [function or path target](/docs/schedules/handle-runs#choosing-a-target), inside `handleSchedule`, and use `metadata.executionId` in the token. Those targets don't retry a run, so if `start()` throws, that occurrence doesn't start a workflow. The error status shows in the schedule's [execution history](/docs/schedules/manage#check-execution-history), and you can [run the schedule manually](/docs/schedules/manage#run-a-schedule-now) to try again.

## Resume a waiting workflow from a schedule

A schedule can also wake a workflow run that's already in progress, instead of starting a new one. The run waits on a [hook](/docs/workflows/concepts#hook), and the schedule's consumer resumes the hook when the schedule fires.

Use this when the wake-up time comes from outside the run and can change. For example, a trial workflow waits until the trial ends, and a user can extend their trial. To change when the run wakes, you [update the schedule](/docs/schedules/sdk#update-a-schedule). The run itself doesn't change.

If the wake-up time is known when the run starts and doesn't change, call `sleep()` with a `Date` in the workflow instead. It doesn't need a schedule.

1. Wait on a hook in the workflow. Use a token your server code can rebuild, such as one based on the user ID, and export the function that builds it so every file uses the same token:

   ```ts filename="workflows/trial.ts"
   import { defineHook } from 'workflow';
   import { downgradeIfUnpaid, sendWelcomeEmail } from '@/lib/billing';

   export const trialEnded = defineHook<{ executionId: string }>();
   export const trialEndToken = (userId: string) => `trial-end:${userId}`;

   export async function trialWorkflow(userId: string) {
     'use workflow';

     await welcome(userId);

     // Pauses without using compute until the trial-end schedule fires
     await trialEnded.create({ token: trialEndToken(userId) });

     await endTrial(userId);
   }

   async function welcome(userId: string) {
     'use step';
     await sendWelcomeEmail(userId);
   }

   async function endTrial(userId: string) {
     'use step';
     await downgradeIfUnpaid(userId);
   }
   ```

2. When the trial starts, start the workflow with the hook's token as its start token, then create a one-time dynamic schedule for the trial's end:

   ```ts filename="app/api/trials/route.ts"
   import { Schedules } from '@vercel/schedules';
   import { start } from 'workflow/api';
   import { trialEndToken, trialWorkflow } from '@/workflows/trial';

   export async function POST(request: Request) {
     const { userId, trialEndsAt, timezone } = await request.json();

     await start(trialWorkflow, [userId], {
       experimental_hook: { token: trialEndToken(userId) },
     });
     await Schedules.create({
       name: `trial-end-${userId}`,
       target: { topic: 'trial-ends' },
       expression: { type: 'single', at: trialEndsAt },
       timezone,
       payload: { userId },
     });

     return new Response(null, { status: 201 });
   }
   ```

   The start token creates the hook in the same step that admits the run, before any workflow code runs. If the schedule fires before the workflow reaches `trialEnded.create()`, the resume is kept and delivered when it does, so the run can't miss the trial's end. The token also allows one trial workflow per user: a second `start()` with the same token throws `HookConflictError`. See [Run idempotency](https://workflow-sdk.dev/docs/foundations/idempotency#run-idempotency) in the Workflow SDK docs.

   Authenticate the request and take `userId` from the session rather than the request body in your app. The example omits that check for brevity.

3. Resume the hook in the topic's consumer:

   ```ts filename="app/api/trial-ends/route.ts"
   import { handleCallback } from '@vercel/queue';
   import type { ScheduleQueueMessage } from '@vercel/schedules';
   import { HookNotFoundError } from 'workflow/errors';
   import { trialEnded, trialEndToken } from '@/workflows/trial';

   type TrialEndMessage = ScheduleQueueMessage<{ userId: string }>;

   export const POST = handleCallback<TrialEndMessage>(
     async ({ executionId, payload }) => {
       if (!payload) return;

       try {
         await trialEnded.resume(trialEndToken(payload.userId), { executionId });
       } catch (error) {
         // The run already ended, for example because the user upgraded
         if (HookNotFoundError.is(error)) return;
         throw error;
       }
     },
   );
   ```

   Subscribe the consumer to the `trial-ends` topic with a `queue/v2beta` trigger in `vercel.json`, as in [Start a workflow from a schedule](#start-a-workflow-from-a-schedule).

To extend the trial, call `Schedules.update()` with the new `expression`. To end the trial early, resume the hook from your own code, then delete the schedule with `Schedules.delete()`.

Keep these points in mind when you resume a hook from a schedule:

- **Build the token from values your code controls.** `resume()` doesn't check who calls it. The consumer above is only invoked by the queue, and the payload comes from your server code, not from a user.
- **Expect duplicate resumes.** A schedule run can be delivered more than once, and a retried `resume()` can deliver the payload twice. A run that awaits the hook once, like the one above, ignores later payloads. If your run reads the hook in a loop, include the `executionId` in the payload and skip one it has already handled.
- **Prefer a new run for each occurrence of recurring work.** A run that a cron schedule wakes repeatedly keeps growing its event log and stays on the deployment that started it. Starting a new run per occurrence keeps each run small and runs the code of the deployment that's current when the schedule fires.

To learn about hook tokens, timeouts, and securing resumes, see [Hooks](https://workflow-sdk.dev/docs/foundations/hooks) in the Workflow SDK docs.

> **💡 Note:** Schedules are in beta. Behavior, APIs, and limits may change before general
> availability.

## Related

- [Handling scheduled runs](/docs/schedules/handle-runs): Choose a target and write the code a schedule runs.
- [Workflow concepts](/docs/workflows/concepts): Learn how workflows, steps, sleeps, and hooks work together.
- [Starting workflows](https://workflow-sdk.dev/docs/foundations/starting-workflows): See every way to start a run with the Workflow SDK.
- [Scheduling work for agents](/docs/schedules/agents): Let an agent create schedules that bring work back to its session.

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
