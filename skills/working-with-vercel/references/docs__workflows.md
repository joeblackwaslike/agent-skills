---
title: Vercel Workflows
product: workflows
url: /docs/workflows
canonical_url: "https://vercel.com/docs/workflows"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  []
related:
  - /docs/queues
  - /docs/workflows/concepts
  - /docs/workflows/pricing
  - /docs/regions
  - /docs/functions/configuring-functions/region
summary: Build agents and applications that retry failed steps, wait for external events, and resume across crashes and deployments with Vercel Workflows.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/workflows.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "dfc6b510e2de7cfcfcc5d44e0aa08ea54e5783ecca82829af2b72a064b0092d5"
---

# Vercel Workflows

## Build agents and applications that pause and resume

Vercel Workflows runs multi-step logic as durable code that can retry failed steps, wait for external events, and resume across crashes and deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A new programming model for durable execution](https://vercel.com/blog/a-new-programming-model-for-durable-execution?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [AI Gateway now supports asynchronous video generation](https://vercel.com/changelog/ai-gateway-now-supports-asynchronous-video-generation?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [Configure where run state lives in Vercel Workflows](https://vercel.com/changelog/configure-where-run-state-lives-in-vercel-workflows?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [Expanded search for workflow runs in Vercel Observability](https://vercel.com/changelog/expanded-search-for-workflow-runs-in-vercel-observability?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [Measure time between steps in Vercel Workflows](https://vercel.com/changelog/measure-time-between-steps-in-vercel-workflows?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [Redesigned trace viewer for Vercel Workflows](https://vercel.com/changelog/redesigned-trace-viewer-for-vercel-workflows?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)
- [Durable agent approval workflows on Vercel](https://vercel.com/kb/guide/agent-approval-workflow-stack-guide?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related) — How enterprise architects choose a stack and decide where to run durable, human-in-the-loop agent approval workflows on
- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Building an AI chat app with RAG and source citations on Vercel](https://vercel.com/kb/guide/building-ai-chat-app-with-rag-and-citations-on-vercel?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related) — A production stack for AI chat with retrieval, reranking, source citations, and background ingestion on Vercel using Nex
- [Building human-in-the-loop agents for community moderation with durable workflows](https://vercel.com/kb/guide/building-human-in-the-loop-agents-for-community-moderation-with-durable-workflows?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related) — Learn how to build AI agents that escalate decisions to humans in Slack, pause and resume runs reliably, and stream prog
- [Built-in durability: Introducing Workflow Development Kit](https://vercel.com/blog/introducing-workflow?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/workflows.graph.md](/docs/workflows.graph.md?from=related&source_path=%2Fdocs%2Fworkflows&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

```typescript filename="app/workflows/ai-content-workflow.ts" {2}
export async function aiContentWorkflow(topic: string) {
  'use workflow';

  const draft = await generateDraft(topic);

  const summary = await summarizeDraft(draft);

  return { draft, summary };
}
```

Vercel Workflows builds on the open-source [Workflow SDK](https://workflow-sdk.dev) for
JavaScript and TypeScript, and on workflow support in the
[`vercel` Python SDK](https://workflow-sdk.dev/docs/getting-started/python) to let your code pause, resume,
and maintain state.

With Workflows, Vercel manages the infrastructure so you can focus on writing business logic. **Vercel Functions** execute your workflow and step code. **[Vercel Queues](/docs/queues)** enqueue and execute those routes with reliability. **Managed persistence** stores all state and event logs in an optimized database.

Your workflows are:

- **Resumable**: Pause for minutes or months, then resume from the exact point.
- **Durable**: Survive deployments and crashes with deterministic replays.
- **Observable**: Use built-in logs, metrics, and tracing and view them in your [Vercel dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fworkflows\&title=Vercel+Workflows).
- Write async JavaScript, TypeScript, or Python with familiar language primitives. No YAML or state machines.

![Image](https://vercel.com/docs-assets/static/docs/workflow/workflow-diagram-light.avif)

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

## Roles and permissions

Workflow run data can include recorded inputs, outputs, errors, and state.

Team owners can read decrypted Workflow run data. To grant a non-owner access to
decrypted Workflow run data without granting owner-level access, assign the
**Workflow Run Data Viewer** extended permission. For compatible roles and
assignment details, see [Extended Permissions](/docs/rbac/access-roles/extended-permissions).

## Resources

**Pricing and Limits**: Billing, included usage, and service limits. [Learn more →](/docs/workflows/pricing)

**Concepts**: Learn how workflows, steps, sleeps, and hooks work together. [Learn more →](/docs/workflows/concepts)

**Slack bot guide**: Stateful Slack bots with Vercel Workflows Guide [Learn more →](/kb/guide/stateful-slack-bots-with-vercel-workflow)

**Durable agent guide**: Build an agent with persisted state, retried tool calls, resumable streams, and human approval. [Learn more →](https://workflow-sdk.dev/docs/ai)

**Workflow SDK documentation**: Explore the Workflow SDK API and core primitives. [Learn more →](https://workflow-sdk.dev)

**Workflow SDK guides**: Follow tutorials for common workflow patterns. [Learn more →](/kb/workflow-sdk)

**Python**: Build workflows in Python with the Vercel SDK. [Learn more →](https://workflow-sdk.dev/docs/getting-started/python)

**Vercel Queues**: The durable event streaming system that powers Workflow. [Learn more →](/docs/queues)


---

[View full sitemap](/docs/sitemap)
