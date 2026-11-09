---
title: Workflow Concepts
product: workflows
url: /docs/workflows/concepts
canonical_url: "https://vercel.com/docs/workflows/concepts"
last_updated: 2026-09-10
type: conceptual
prerequisites:
  - /docs/workflows
related:
  - /docs/functions/limitations
  - /docs/workflows/pricing
  - /docs/chat-sdk
  - /docs/frameworks/agents/eve
summary: Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/concepts.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b70ba5d9d9ee4681d2b5e020bbcc9ac2db4a70a2803f879a73ff13a233bc7f03"
---

# Workflow Concepts

Workflow introduces two directives (`"use workflow"` and `"use step"`) that turn ordinary async functions into durable workflows.
You write async/await code as usual, and the framework handles queues, retry logic, and state persistence automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running background workers on Vercel](https://vercel.com/kb/guide/background-workers-on-vercel) — Run background jobs on Vercel with waitUntil, Cron Jobs, Queues, Workflows, Daemons, or Sandbox. Compare the options and
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [How to migrate from Cloudflare Workflows to Vercel Workflows](https://vercel.com/kb/guide/migrate-cloudflare-workflows-to-vercel-workflows) — Migrate from Cloudflare Workflows to Vercel Workflows by mapping WorkflowEntrypoint, step.do, and waitForEvent to workfl
- [Run a research workspace on Vercel](https://vercel.com/kb/guide/run-research-workspace-vercel) — Plan a durable research workspace on Vercel's Agentic Infrastructure with Workflows, internal API tools, Vercel Sandbox
- [Python](https://workflow-sdk.dev/docs/getting-started/python) — Set up the Workflow Python SDK in your Python application.
- [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution)
- [Built-in durability: Introducing Workflow Development Kit](https://vercel.com/blog/introducing-workflow)
- [The best workflow engine is a programming language](https://vercel.com/blog/the-best-workflow-engine-is-a-programming-language)
- [Next.js](https://workflow-sdk.dev/docs/getting-started/next) — Set up Workflow SDK in a Next.js app.
- [Workflow SDK adds idempotent starts](https://vercel.com/changelog/atomic-start-hooks-in-the-workflow-sdk)
- [CLI Workflows](https://vercel.com/docs/agent-resources/workflows) — End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sess

Full cross-link map for this page: [/docs/workflows/concepts.graph.md](/docs/workflows/concepts.graph.md)
<!-- /docsgraph:related -->

Workflow development centers around four core abstractions:

- [Workflow](#workflow): A stateful function that coordinates multi-step logic over time.
- [Step](#step): A stateless function that runs a unit of durable work inside a workflow.
- [Sleep](#sleep): A function that pauses a workflow for a specified duration without consuming compute resources.
- [Hook](#hook): A function that lets a workflow wait for external events such as user actions, webhooks, or third-party API responses.

These abstractions work together to build durable applications.

## Workflow

A workflow is a stateful function that coordinates multi-step
logic over time. The `'use workflow'` directive marks a function as durable,
which means it remembers its progress and can resume exactly where it left off,
even after pausing, restarting, or deploying new code.

Use a workflow when your logic needs to pause, resume, or span minutes to months:

```typescript filename="app/workflows/ai-content-workflow.ts" {2}
export async function aiContentWorkflow(topic: string) {
  'use workflow';

  const draft = await generateDraft(topic);

  const summary = await summarizeDraft(draft);

  return { draft, summary };
}
```

Under the hood, the workflow function compiles into a route that orchestrates execution.
All inputs and outputs are recorded in an event log. If a deploy or crash happens,
the system replays execution deterministically from where it stopped.

To learn how workflows suspend and resume, and how to structure workflow files, see [Workflows and Steps](https://workflow-sdk.dev/docs/foundations/workflows-and-steps) in the Workflow SDK docs.

## Step

A step is a stateless function that runs a unit of durable work inside a workflow.
The `'use step'` directive marks a function as a step, which gives
it built-in retries and makes it survive failures like network errors or process crashes.

Use a step when calling external APIs or performing isolated operations:

```typescript filename="app/steps/generate-draft.ts" {2,12}
async function generateDraft(topic: string) {
  'use step';

  const draft = await aiGenerate({
    prompt: `Write a blog post about ${topic}`,
  });

  return draft;
}

async function summarizeDraft(draft: string) {
  'use step';

  const summary = await aiSummarize({ text: draft });

  // Simulate a transient error — the step will automatically retry
  if (Math.random() < 0.3) {
    throw new Error('Transient AI provider error');
  }

  return summary;
}
```

Each step compiles into an isolated API route. While the step executes,
the workflow suspends without consuming resources. When the step
completes, the workflow resumes automatically right where it left off.

To learn how to customize retries, throw errors that skip retrying, and roll back failed steps, see [Errors & Retrying](https://workflow-sdk.dev/docs/foundations/errors-and-retries) in the Workflow SDK docs.

## Sleep

Sleep pauses a workflow for a specified duration without consuming compute resources.
This is useful when you need to wait for hours or days before continuing,
like delaying a follow-up email or waiting to issue a reward.

Use sleep to delay execution without keeping any infrastructure running:

```typescript filename="app/workflows/ai-refine.ts" {8}
import { sleep } from 'workflow';

export async function aiRefineWorkflow(draftId: string) {
  'use workflow';

  const draft = await fetchDraft(draftId);

  await sleep('7 days'); // Wait 7 days to gather more signals; no resources consumed

  const refined = await refineDraft(draft);

  return { draftId, refined };
}
```

The sleep call will pause the workflow and consume no resources, resuming automatically when the time expires.

To sleep until a specific date instead of for a duration, see [`sleep()`](https://workflow-sdk.dev/docs/api-reference/workflow/sleep) in the Workflow SDK docs.

## Hook

A hook lets a workflow wait for external events such as user actions, webhooks,
or third-party API responses. This is useful for human-in-the-loop workflows
where you need to pause until someone approves, confirms, or provides input.

Use hooks to pause execution until external data arrives:

```typescript filename="app/workflows/approval.ts" {4,15-17}
import { defineHook } from 'workflow';

// Human approval for AI-generated drafts
export const approvalHook = defineHook<{
  decision: 'approved' | 'changes';
  notes?: string;
}>();

export async function aiApprovalWorkflow(topic: string) {
  'use workflow';

  const draft = await generateDraft(topic);

  // Wait for human approval events
  const events = approvalHook.create({
    token: 'draft-123',
  });

  for await (const event of events) {
    if (event.decision === 'approved') {
      await publishDraft(draft);
      break;
    } else {
      const revised = await refineDraft(draft, event.notes);
      await publishDraft(revised);
    }
  }
}
```

```typescript filename="app/api/resume/route.ts" {5}
import { approvalHook } from '../../workflows/approval';

// Resume the workflow when an approval is received
export async function POST(req: Request) {
  const data = await req.json();

  await approvalHook.resume('draft-123', {
    decision: data.decision,
    notes: data.notes,
  });

  return new Response('OK');
}
```

When a hook receives data, the workflow resumes automatically. You don't need polling, message queues, or manual state management.

To learn about custom tokens, webhooks, timeouts, and securing hook resumes, see [Hooks](https://workflow-sdk.dev/docs/foundations/hooks) in the Workflow SDK docs.

For human review, authenticate the reviewer and check their authority for the specific action before resuming the workflow. Confirm that the request still matches the version they reviewed, and record the approval separately from execution. See [Designing human review for enterprise AI decisions](/i/human-review-enterprise-ai-decisions) for review patterns that account for changed requests and failed actions.

## Skew Protection

By default, Workflows keep running on the deployment they were created on, so you can deploy new versions of your
Workflows without affecting existing runs.

The same pinning means a rollback does not stop runs on the deployment you rolled back from. A run whose steps keep failing on that deployment is retried there, and each retry is a function invocation on it, until the run fails or is cancelled.

To stop runs on a deployment you no longer want executing, cancel them from the [Workflows observability tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fworkflows\&title=Vercel+Workflows) or the CLI. Deleting the deployment also stops its functions from being invoked, but runs pinned to a deleted deployment never complete or fail on their own, so cancel them as well. To see which deployments are consuming compute, open the Observability **Query** tab with [function duration grouped by deployment](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fquery%3Fmetric%3DserverlessFunctionInvocation.functionDurationGbhr%26aggregation%3Dsum%26by%3DdeploymentId\&title=Function+duration+by+deployment).

To learn how to fix in-flight runs or move a run onto newer code, see [Versioning](https://workflow-sdk.dev/docs/foundations/versioning) in the Workflow SDK docs.

## Frequently asked questions

### What's the difference between a workflow and a step?

A workflow function, marked with `'use workflow'`, orchestrates the run. It calls steps, sleeps, and waits on hooks. It runs in a sandbox without full Node.js access and must be deterministic, because it replays from the event log each time it resumes. A step function, marked with `'use step'`, does the work, such as calling an API or writing to a database, with full Node.js and npm access. Vercel records each step's result, and a failed step retries automatically. See [Workflows and Steps](https://workflow-sdk.dev/docs/foundations/workflows-and-steps).

### How many times does a step retry by default?

A step that throws an error retries up to three times by default, for four attempts in total. Set `maxRetries` on the step function to change the count, throw `FatalError` to fail without retrying, or throw `RetryableError` with `retryAfter` to set the delay before the next attempt. A step can run more than once, so make side effects such as payments and emails idempotent. See [Errors & Retrying](https://workflow-sdk.dev/docs/foundations/errors-and-retries).

### How long can a workflow run or sleep?

Vercel doesn't limit how long a run lasts or how long `sleep()` waits. A suspended workflow uses no compute while it sleeps or waits on a hook. Each step still runs inside a function invocation, so it must finish within your [Vercel Functions duration limit](/docs/functions/limitations). See [Workflow run limits](/docs/workflows/pricing#workflow-run-limits) for the caps on events, payload size, and storage per run.

### What happens to running workflows when I deploy new code?

Each run stays on the deployment that created it, so a new deployment doesn't change the code that in-progress runs execute. Runs you start after the deployment use the new code. A rollback doesn't stop runs on the deployment you rolled back from, so cancel those runs from the Workflows dashboard or the CLI if they shouldn't continue. See [Skew Protection](#skew-protection).

### How do I pause a workflow for human approval?

Create a hook or webhook in the workflow and await it. The workflow suspends until your app calls `resumeHook()` with the hook's token, or an HTTP request reaches the webhook's URL. A token routes the payload to the right run but doesn't authenticate the sender, so authorize the reviewer before you resume the run. For approvals in Slack and other chat platforms, use [`requestApproval`](https://chat-sdk.dev/docs/approvals) from [Chat SDK](/docs/chat-sdk). It posts the approval card, creates the webhook, and verifies each click for you. In [eve](/docs/frameworks/agents/eve), add `approval: always()` to a tool definition, and the agent's session waits for a decision before the tool runs.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
