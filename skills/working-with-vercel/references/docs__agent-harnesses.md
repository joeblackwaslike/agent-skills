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
  - /docs/queues
  - /docs/functions/limitations
  - /docs/agent-harnesses/self-hosting
  - /docs/agent-harnesses/pi
  - /docs/agent-harnesses/fx
summary: Run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a crash, a function timeout, or a redeploy resumes the agent instead of losing its...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "d3cda2cb3cc54984d685c9bd687ea51f50dc2012353d9fc044d4dcf532542374"
---

# Running Agent Harnesses Durably on Vercel

An agent harness is the loop around a model: its prompts, its tools, and how it manages context. These guides show how to run Pi, fx, OpenCode, eve, Claude Code, and Codex on Vercel so a conversation survives a crash, a function timeout, or a redeploy.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Default Harness](https://eve.dev/docs/concepts/default-harness) — How eve manages model context and compaction during an agent turn.
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.
- [eve](https://vercel.com/docs/eve) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.

Full cross-link map for this page: [/docs/agent-harnesses.graph.md](/docs/agent-harnesses.graph.md)
<!-- /docsgraph:related -->

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

## More resources

- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [Observability for durable agent harnesses](/docs/agent-harnesses/observability)
- [Security for durable agent harnesses](/docs/agent-harnesses/security)
- [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting)
- [Vercel Workflows](/docs/workflows)
- [Workflow SDK Worlds](https://workflow-sdk.dev/worlds)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
