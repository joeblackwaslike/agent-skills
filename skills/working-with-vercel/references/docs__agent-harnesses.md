---
title: Running Agent Harnesses Durably on Vercel
product: vercel
url: /docs/agent-harnesses
canonical_url: "https://vercel.com/docs/agent-harnesses"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/agent-harnesses/pi
  - /docs/queues
  - /docs/functions/limitations
  - /docs/agent-harnesses/self-hosting
  - /docs/agent-harnesses/fx
summary: Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a crash, a function timeout, or a redeploy resumes the agent instead of losing its...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/agent-harnesses.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "637e730b001d041430c8dac5e19f937de1e24fdad56e40869078a98bb6470fd0"
---

# Running Agent Harnesses Durably on Vercel

## Run agent harnesses that resume after a crash (Beta)

Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel. When a crash, a function timeout, or a redeploy stops a turn, a new function resumes it from the session's log.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Workflow SDK 5: built for production](https://vercel.com/blog/workflow-sdk-5)
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Scheduling Work for Agents](https://vercel.com/docs/schedules/agents) — Give an agent a tool that creates dynamic schedules, so it can do work for a user later or on a recurring basis.
- [Scheduling Work with Pi](https://vercel.com/docs/schedules/agents/pi) — Give a Pi agent on durable-harness a tool that creates schedules, and send each run back into the session that created i
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.
- [Glossary](https://vercel.com/docs/glossary) — Learn about the terms and concepts used in Vercel's products and documentation.

Full cross-link map for this page: [/docs/agent-harnesses.graph.md](/docs/agent-harnesses.graph.md)
<!-- /docsgraph:related -->

#### Pi

```ts filename="lib/agent.ts"
import { pi } from 'durable-harness/pi';

export const agent = pi({
  model: 'anthropic/claude-fable-5.2',
});
```

#### fx

```ts filename="lib/agent.ts"
import { createFxAgent } from 'libfx';

export const agent = createFxAgent({
  model: 'anthropic/claude-fable-5.2',
});
```

#### OpenCode

```ts filename="lib/agent.ts"
import { opencode } from 'durable-harness/opencode';

export const agent = opencode({
  model: 'anthropic/claude-sonnet-5.5',
});
```

#### eve

```ts filename="agent/agent.ts"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'anthropic/claude-fable-5.2',
});
```

#### Claude Code

```ts filename="lib/agent.ts"
import { claudeCode } from 'durable-harness/claude-code';

export const agent = claudeCode({
  model: 'anthropic/claude-fable-5.2',
});
```

#### Codex

```ts filename="lib/agent.ts"
import { codex } from 'durable-harness/codex';

export const agent = codex({
  model: 'openai/gpt-6.1-terra',
});
```

An agent harness is the loop around a model: its prompts, its tools, and how it manages context. Each example creates an agent with one harness. To finish the setup, follow that harness's guide in [Choose a harness](#choose-a-harness). The Pi example uses `durable-harness/pi`, which runs Pi's agent loop. To run Pi 1.0's full Harness, the [Pi guide](/docs/agent-harnesses/pi) recommends `durable-harness/pi-durable`.

## How it works

Most harnesses keep a turn in the memory of the process running it, so when that process dies mid-turn, the turn dies with it. Run the same turn without durability and with `durable-harness`, then kill the function to compare how each recovers:

Each session lives in a durable log: the conversation, the turn in flight, and every model call and tool call. Each turn has a message on [Vercel Queues](/docs/queues) behind it, so when its function dies, a new function reads the log and continues where the first one stopped:

[Video: A support agent refunds an order. Its function dies mid-reply, and a new function resumes the turn from the session's log.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/agent-harnesses/durable-harness-recovery.mp4)

*A support agent refunds an order, and its function dies while it writes the
reply. A new function reads the session's log, runs only the interrupted
model call again, and the customer is refunded once.*

A turn can also outlive one function's [maximum duration](/docs/functions/limitations#max-duration), and a client that disconnects reconnects to a turn that's still running.

You keep your harness, its options, and its tools. The log lives behind a **World**, the storage interface of the open-source [Workflow SDK](https://workflow-sdk.dev): Vercel's World on Vercel, files on your machine, or another World, such as Postgres, on your own servers. See [Self-hosting](/docs/agent-harnesses/self-hosting).

## Choose a harness

| Harness                                                         | Package                               | Runs in                                                       |
| --------------------------------------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| [Pi](/docs/agent-harnesses/pi)                                  | `durable-harness/pi-durable` or `/pi` | Your function, with files in a virtual workspace or a Sandbox |
| [fx](/docs/agent-harnesses/fx)                                  | `libfx`                               | Your function, with files in a virtual workspace or a Sandbox |
| [OpenCode](/docs/agent-harnesses/opencode)                      | `durable-harness/opencode`            | Your function, with files in a virtual workspace or a Sandbox |
| [eve](/docs/agent-harnesses/eve)                                | `eve`                                 | An eve app, durable by default                                |
| [Claude Code](/docs/agent-harnesses/claude-code) (experimental) | `durable-harness/claude-code`         | A Vercel Sandbox                                              |
| [Codex](/docs/agent-harnesses/codex) (experimental)             | `durable-harness/codex`               | A Vercel Sandbox                                              |

The `durable-harness` guides share one setup: the agent, a chat route, and the route that [Vercel Queues](/docs/queues) delivers turns to. Each guide shows this set up for Next.js and other frameworks. fx and eve are durable on their own, so their guides use `libfx` and `eve` directly. Each guide uses [AI Gateway](/docs/ai-gateway) for model calls. On Vercel, the harnesses authenticate with the deployment's [OIDC token](/docs/oidc). Locally, run `vercel link` and `vercel env pull`. For model calls alone, `AI_GATEWAY_API_KEY` also works, but a Sandbox needs the linked project.

## What's durable

The session is durable: the conversation, the turn in flight, and recovery after a crash. Every harness starts with no tools. Your own tools run in your function, and each has a replay rule that says what happens to a call a crash interrupts. Commands and files that the model picks never run on your function's disk: they run in a virtual workspace that the session's log keeps, or in a Vercel Sandbox with a Drive. Claude Code and Codex run only in a Sandbox. See [Security](/docs/agent-harnesses/security) and [Tools, files, and documents](/docs/agent-harnesses/tools).

## Recovery

If the function running a turn fails with an error, another function resumes the turn right away. If the function disappears without a trace, for example when it runs out of memory or its instance is lost, the queue redelivers the turn once its message lease runs out. Either way, the turn resumes from the log:

- **A model call that was running** runs again.
- **A tool call that was running** runs again or not, by its [replay rule](/docs/agent-harnesses/tools#what-happens-to-a-tool-call-after-a-crash): Pi reruns a `'safe'` tool. Claude Code, Codex, and OpenCode tell the model it is safe to repeat. Other interrupted calls come back to the model as possibly run.
- **Between calls**, nothing runs again. Every call the log has an outcome for is read back from it, and the turn goes on from the next step. A call that finished just before the crash may not be in the log yet, and then it counts as running.

## Frequently asked questions

### What is an agent harness?

An agent harness is the code that runs the loop around a model. It builds the prompts, calls the model, runs the tools the model asks for, and manages the conversation's context. Pi, fx, OpenCode, eve, Claude Code, and Codex are all harnesses. In these guides, each harness sends its model calls through [AI Gateway](/docs/ai-gateway), and `durable-harness`, libfx, or eve keeps its sessions durable.

### What happens to an AI agent when its Vercel Function crashes or times out?

Without durability, the turn in flight is lost, because most harnesses keep it in the memory of the process running it. With a durable harness, every session lives in a log, and [Vercel Queues](/docs/queues) holds a message for each turn. When the function dies, a new function reads the log and continues the turn. Model and tool calls that already finished are read back from the log instead of running again. See [Recovery](#recovery).

### Can an agent turn run longer than a function's maximum duration?

Yes. A turn can continue across several functions, so it isn't limited to one function's [maximum duration](/docs/functions/limitations#max-duration), which depends on your plan. Each model call and tool call still runs inside one function, so it has to finish within that function's maximum duration. A client that disconnects can reconnect to a turn that's still running.

### Do I need to write Vercel Workflows code to make an agent durable?

No. You keep your harness and its tools, and `durable-harness` stores each session as a run in a World, the storage interface of the open-source [Workflow SDK](https://workflow-sdk.dev). On Vercel, that's Vercel's World, so sessions live in [Vercel Workflows](/docs/workflows) storage and Vercel Queues delivers each turn. On your machine, sessions live in local files. On your own servers, you can use another World, such as Postgres. See [Self-hosting](/docs/agent-harnesses/self-hosting).

### How much does it cost to run a durable agent harness on Vercel?

`durable-harness` and libfx are open source under the Apache 2.0 license, so you pay for the Vercel resources your agent uses rather than for the harness. Turns run on [Vercel Functions](/docs/functions/usage-and-pricing), sessions live in [Vercel Workflows](/docs/workflows/pricing) storage, and [Vercel Queues](/docs/queues/pricing) delivers each turn. Model tokens go through [AI Gateway](/docs/ai-gateway/pricing), which adds no markup to provider prices. Tools that run in a [Vercel Sandbox](/docs/sandbox/pricing) add Sandbox usage, and [Agent Runs](/docs/agent-harnesses/observability) bills at Tracing rates during beta. To cap model spend, set an [AI Gateway budget](/docs/ai-gateway/observability-and-spend/budgets).

## More resources

- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [Observability for durable agent harnesses](/docs/agent-harnesses/observability)
- [Security for durable agent harnesses](/docs/agent-harnesses/security)
- [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting)
- [Vercel Workflows](/docs/workflows)
- [Workflow SDK Worlds](https://workflow-sdk.dev/worlds)

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
