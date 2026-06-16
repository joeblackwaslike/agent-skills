---
title: Workflow Concepts
product: workflows
url: /docs/workflows/concepts
canonical_url: "https://vercel.com/docs/workflows/concepts"
last_updated: 2026-04-16
type: conceptual
prerequisites:
  - /docs/workflows
related:
  []
summary: Learn how workflows, steps, sleeps, and hooks work together to build durable applications.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows/concepts.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3e87496c58e3bf6ec29b41110fac67b46f2571d7f853b18eb6ba5a3d84effe1b"
---

# Workflow Concepts

Workflow introduces two directives (`"use workflow"` and `"use step"`) that turn ordinary async functions into durable workflows.
You write async/await code as usual, and the framework handles queues, retry logic, and state persistence automatically.

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
const approvalHook = defineHook<{
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
