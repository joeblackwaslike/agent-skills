---
title: Vercel Workflows
product: workflows
url: /docs/workflows
canonical_url: "https://vercel.com/docs/workflows"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  []
related:
  - /docs/workflows/python
  - /docs/queues
  - /docs/workflows/concepts
  - /docs/workflows/pricing
  - /docs/regions
summary: Vercel Workflows is a fully managed platform for building durable, reliable, and observable applications and AI agents with the Workflow SDK.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "a851f97bb4aa30506ca73b1798d35394cdd610ed677079ae8ddc33d5aaa2be8a"
---

# Vercel Workflows

Vercel Workflows is a fully managed platform for building durable applications
and AI agents in JavaScript, TypeScript, and [Python](/docs/workflows/python).

It builds on the open-source [Workflow SDK](https://workflow-sdk.dev) for
JavaScript and TypeScript, and on workflow support in the
[`vercel` Python SDK](/docs/workflows/python) to let your code pause, resume,
and maintain state.

With Workflows, Vercel manages the infrastructure so you can focus on writing business logic. **Vercel Functions** execute your workflow and step code. **[Vercel Queues](/docs/queues)** enqueue and execute those routes with reliability. **Managed persistence** stores all state and event logs in an optimized database.

Your workflows are:

- **Resumable**: Pause for minutes or months, then resume from the exact point.
- **Durable**: Survive deployments and crashes with deterministic replays.
- **Observable**: Use built-in logs, metrics, and tracing and view them in your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fworkflows\&title=Vercel+Workflows).
- Write async JavaScript, TypeScript, or Python with familiar language primitives. No YAML or state machines.

![Image](https://vercel.com/docs-assets/static/docs/workflow/workflow-diagram-light.avif)

Use a workflow when your logic needs to pause, resume, or span minutes to months:

```typescript filename="app/workflows/ai-content-workflow.ts" {2}
export async function aiContentWorkflow(topic: string) {
  'use workflow';

  const draft = await generateDraft(topic);

  const summary = await summarizeDraft(draft);

  return { draft, summary };
}
```

## Getting started

Install the Workflow SDK package:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i workflow
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i workflow
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i workflow
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i workflow
    ```
  </Code>
</CodeBlock>

Follow the [Workflow SDK getting started guide](https://workflow-sdk.dev/docs/getting-started) to create your first workflow.

## Features

- [**Workflows and steps**](/docs/workflows/concepts): Write durable functions with `'use workflow'` and `'use step'` directives.
- [**Sleep and hooks**](/docs/workflows/concepts#sleep): Pause for minutes to months, or wait for external events.
- [**Observability**](/docs/workflows#observability): Track runs in real time, trace failures, and analyze performance.
- [**Streams**](https://workflow-sdk.dev/docs/foundations/streaming): Stream data in and out of workflows with managed persistence.
- [**Multi-region**](/docs/workflows#multi-region): Run workflows close to your users across all Vercel Function regions.
- [**Skew Protection**](/docs/workflows/concepts#skew-protection): Protect your workflows from version skew.
- [**Usage-based pricing**](/docs/workflows/pricing): Pay only for Events, Data Written, and Data Retained.

## Multi-region

Workflows runs in every [Vercel Function region](/docs/regions). When a run starts, Workflows pins it to a single region and keeps its state, queue dispatch, and streams there for the run's lifetime. This avoids cross-region round trips on the hot path and contains the blast radius of a regional event to the runs pinned there.

Reads, hook resumes, and stream consumers can come from anywhere. The platform routes them to the run's region automatically.

### Automatic region pinning

By default, Workflows pins a run to the region of the function that started it. No configuration needed:

- Deploy your app to a single region and every run lives in that region.
- Deploy your app to multiple regions and each run is pinned to the region that served the user who triggered it.

### Explicit region selection

To pin a run to a specific region, pass the `region` option to `start()`:

```typescript filename="app/api/start-workflow/route.ts"
import { start } from 'workflow/api';
import { myWorkflow } from '@/workflows/my-workflow';

const run = await start(myWorkflow, [input], { region: 'sfo1' });
```

The `region` option controls where the run's data is stored and where its queue messages are dispatched from. It does not deploy your code to that region. For step execution to happen in the selected region, deploy your app there. To do this, [configure Function regions](/docs/functions/configuring-functions/region) through the `regions` key in `vercel.json` or the Function Regions project setting. If you deploy your app to a region other than the requested one, the run's data stays in the requested region while its steps execute in the nearest deployed region.

### Version and migration

Multi-region requires `workflow` version `5.0.0-beta.33` or later. Runs created by the 4.x release line always live in `iad1`. Workflows locks each run's region at creation. To run in a different region, start a new run. Upgrading the SDK does not migrate runs created before the upgrade.

## Observability

Every step, input, output, sleep, and error inside a workflow is recorded automatically.

You can track runs in real time, trace failures, and analyze performance without writing extra code.

To inspect your runs, go to your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fworkflows\&title=Vercel+Workflows)
, select your project and navigate to **Observability**, then **Workflows**.

## Resources

**Pricing and Limits**: Billing, included usage, and service limits. [Learn more →](/docs/workflows/pricing)

**Slack bot guide**: Stateful Slack bots with Vercel Workflows Guide [Learn more →](/kb/guide/stateful-slack-bots-with-vercel-workflow)

**Agent guide**: Build a Claude Managed Agent Guide [Learn more →](/kb/guide/claude-managed-agent-vercel)

**Workflow SDK**: Full SDK documentation, guides, and API reference. [Learn more →](https://workflow-sdk.dev)

**Concepts**: Learn how workflows, steps, sleeps, and hooks work together. [Learn more →](/docs/workflows/concepts)

**Python**: Build workflows in Python with the Vercel SDK. [Learn more →](/docs/workflows/python)

**Vercel Queues**: The durable event streaming system that powers Workflow. [Learn more →](/docs/queues)


---

[View full sitemap](/docs/sitemap)
