---
title: Workflow Concepts
product: workflows
url: /docs/workflows/concepts
canonical_url: "https://vercel.com/docs/workflows/concepts"
last_updated: 2026-07-14
type: conceptual
prerequisites:
  - /docs/workflows
related:
  []
summary: Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/concepts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "64dbf692cda8e0f0afbd223c165c8a891cfc12dfc4296decd165bba45cc8d9c0"
---

# Workflow Concepts

Workflow introduces two directives (`"use workflow"` and `"use step"`) that turn ordinary async functions into durable workflows.
You write async/await code as usual, and the framework handles queues, retry logic, and state persistence automatically.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel?from=related) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [Workflows and Steps](https://workflow-sdk.dev/docs/foundations/workflows-and-steps?from=related) — Understand the two function types that make up a workflow.
- [Building stateful Slack bots with Vercel Workflow](https://vercel.com/kb/guide/stateful-slack-bots-with-vercel-workflow?from=related) — Learn how to build Slack bots that maintain state and handle long-running processes without managing queues, databases,
- [Hooks & Webhooks](https://workflow-sdk.dev/docs/foundations/hooks?from=related) — Pause workflows and resume them with external data or HTTP requests.
- [Building a Slack agent with durable workflows](https://vercel.com/kb/guide/building-a-slack-agent-with-durable-workflows?from=related) — Build an AI-powered Slack bot that gathers team data, drafts a summary, and refines it through conversation.
- [Versioning](https://workflow-sdk.dev/docs/foundations/versioning?from=related) — Keep in-flight runs stable by default, then choose explicit upgrade boundaries when you need them.
- [workflow](https://workflow-sdk.dev/docs/api-reference/workflow?from=related) — Explore the core workflow package for steps, streaming, hooks, and error handling.
- [Idempotency](https://workflow-sdk.dev/docs/foundations/idempotency?from=related) — Use step IDs for retry-safe external calls, and route duplicate workflow-start requests through deterministic hook token
- [Human-in-the-Loop with Chat SDK and Workflow SDK](https://vercel.com/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk?from=related) — Combine Chat SDK and Workflow SDK to suspend workflows on approval cards in a chat platform, then resume on click via cr
- [Python](https://vercel.com/docs/workflows/python?from=related) — Build durable workflows and AI agents in Python with the Vercel SDK.

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

## Skew Protection

By default, Workflows keep running on the deployment they were created on, so you can deploy new versions of your
Workflows without affecting existing runs.


---

[View full sitemap](/docs/sitemap)
