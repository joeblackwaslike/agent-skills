---
title: Observability for Durable Agent Harnesses
product: vercel
url: /docs/agent-harnesses/observability
canonical_url: "https://vercel.com/docs/agent-harnesses/observability"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/eve/agent-runs
  - /docs/agent-harnesses/pi
  - /docs/agent-harnesses/fx
  - /docs/agent-harnesses/opencode
  - /docs/agent-harnesses/claude-code
summary: See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and control which content it...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/observability.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "8926e55e20b0c592fbdfe74c7f17f5baecf790d7f447396d8a179005a18de96a"
---

# Observability for Durable Agent Harnesses

> Agent Runs are available in Beta on all plans

Agent Runs shows each session of a durable agent in the Vercel dashboard, with its turns, every model and tool call, timing, and token usage. `durable-harness` sends it a trace with `agentRuns()`, the same integration [eve uses](/docs/eve/agent-runs). This page applies to the guides for [Pi](/docs/agent-harnesses/pi), with either variant, [fx](/docs/agent-harnesses/fx), [OpenCode](/docs/agent-harnesses/opencode), [Claude Code](/docs/agent-harnesses/claude-code), and [Codex](/docs/agent-harnesses/codex).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [OpenTelemetry](https://eve.dev/docs/observability/otel) — Configure OpenTelemetry destinations, content capture, and third-party exports.
- [Tools, Files, and Documents in Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/tools) — What tools do when a durable agent harness resumes after a crash, where its files live, and how to keep typed state with
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Agent Runs](https://vercel.com/docs/agent-resources/vercel-mcp/tools/agent-runs) — Vercel MCP tools for agent runs.
- [Observability](https://vercel.com/docs/eve/observability) — Configure process-wide OpenTelemetry settings, third-party destinations, filtering, and built-in exports for eve agents.

Full cross-link map for this page: [/docs/agent-harnesses/observability.graph.md](/docs/agent-harnesses/observability.graph.md)
<!-- /docsgraph:related -->

Here's a Pi session in Agent Runs. Select a span to see its timing, tokens, input, and output, and open the Conversation and Metadata tabs:

*A Pi session in Agent Runs, with made-up values. Its second model call was
interrupted when its function died, and ran again on a new function.*

Agent Runs usage is billed at [Always-on Tracing rates](/docs/tracing/always-on-tracing#usage-and-pricing) during beta.

## Set up Agent Runs

- ### Install the tracing packages
  `durable-harness` records traces with `@vercel/agent-runs` and sends them with OpenTelemetry's SDK. It loads them only for Agent Runs. Install the versions it's tested with:
  ```bash package-manager
  npm i @vercel/agent-runs@0.0.1 @opentelemetry/sdk-trace-base@2.2.0 @opentelemetry/resources@2.2.0 @opentelemetry/otlp-transformer@0.208.0
  ```
  Without them, `agentRuns()` throws with this list. Agent Runs needs Node.js 24. The rest of `durable-harness` runs on Node.js 22 or later.

- ### Declare the integration
  Declare the integration in `agent-runs.ts`:
  ```ts {3} filename="agent-runs.ts"
  import { agentRuns } from 'durable-harness/instrumentation/otel';

  export default agentRuns();
  ```
  A public session's trace records its model and tool inputs and outputs, and any other session's records only metadata, such as its models, tools, timing, and token usage. To change that, see [Control what Agent Runs receives](#control-what-agent-runs-receives).

  Importing the module makes no network requests, and it doesn't replace your app's global OpenTelemetry provider.

- ### Register it
  Call `register()` once per process, before the agent runs a turn. On Next.js, call it from `instrumentation.ts`. With Vercel Functions in `api/`, call it in the module that makes your agent, so every function that runs turns registers it:
  ```ts {4} filename="instrumentation.ts" framework=nextjs-app
  export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;
    const { default: runs } = await import('./agent-runs');
    runs.register();
  }
  ```
  ```ts {4} filename="lib/agent.ts" framework=other
  import { pi } from 'durable-harness/pi';
  import runs from '../agent-runs.js';

  runs.register(); // once per process, before the agent runs a turn

  export const agent = pi({ model: 'anthropic/claude-sonnet-5.5' });
  ```
  For an fx agent, also pass `agentRunsHooks()` from `durable-harness/fx` to `createFxAgent`, and make sure `register()` runs before you create the agent. libfx checks for Agent Runs once, when you create the agent, so an agent created before `register()` records only metadata, even for public sessions.

  On Next.js, `instrumentation.ts` already runs before your modules. With Vercel Functions in `api/`, call `register()` above `createFxAgent`:
  ```ts {2,5} filename="lib/agent.ts" framework=nextjs-app
  import { createFxAgent } from 'libfx';
  import { agentRunsHooks } from 'durable-harness/fx';
  import { tools } from './tools'; // your tools, each with idempotent set

  export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools, hooks: agentRunsHooks() });
  ```
  ```ts {2-3,6,8} filename="lib/agent.ts" framework=other
  import { createFxAgent } from 'libfx';
  import { agentRunsHooks } from 'durable-harness/fx';
  import runs from '../agent-runs.js';
  import { tools } from './tools.js'; // your tools, each with idempotent set

  runs.register(); // before the agent is created

  export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools, hooks: agentRunsHooks() });
  ```
  For an fx agent with its own World, as in `durability: world(sessions)`, pass that World to `agentRunsHooks({ world: sessions })` too.

- ### Turn on tracing
  Vercel collects traces only for an environment with a sampling rule. Open [**Settings → Tracing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Ftracing\&title=Go+to+Tracing+settings) for your project:
  1. Select **Add Sampling Rule**.
  2. Choose **All Environments**, **Production**, or **Preview**.
  3. Set **Rate** to `100%`, so a trace holds every span of its session.
  4. Select **Save**.
  You can also manage sampling rules with [`vercel traces config`](/docs/cli/traces#manage-trace-sampling-rules), in Vercel CLI 62.5 or later. Without a sampling rule, Agent Runs still lists each session, but without its trace, model, or token usage.

- ### Deploy and open a session
  ```bash
  vercel deploy
  ```
  Send a message to the chat route, then open [**Observability → Agent Runs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fagent-runs\&title=Agent+Runs) and select the session.

  The list shows each session's status and token usage. A session whose turn has finished shows as **Waiting**, ready for its next message. The session's page shows the model, timing, model and tool call spans, and token usage. By default, authenticated sessions have an unknown audience, so their traces don't record titles, messages, replies, or tool inputs and outputs. To capture content intentionally, see [Control what Agent Runs receives](#control-what-agent-runs-receives).

## What a trace shows

Each session is one trace, across every function that drives it:

- Each turn is an `invoke_agent` span, with an `agent.step` span for each step and the model and tool calls nested in it. A turn that continues in a later function, after a crash or when its function runs out of time, stays one turn.
- Model calls carry token usage, including cached input when the provider reports it, and cost when the provider supplies it.
- A turn that resumes after a crash reads its finished calls back from the log, so they don't appear twice. A function that finds nothing to do adds no spans.

## Control what Agent Runs receives

A session's audience decides what its trace records. A public session's trace records its title and its model and tool inputs and outputs. A private or unknown session's trace records only metadata, and the content it leaves out is never recorded, saved, or exported. A session's audience comes from:

- **The chat route.** A route with `authorize: 'public'` makes its sessions public. Any other route leaves them unknown.

- **The agent.** Set `traceAudience` to `'public'` or `'private'` to decide for every session of the agent:

  ```ts {1} filename="lib/agent.ts"
  export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', traceAudience: 'private' });
  ```

- **The storage, with `durable-harness/pi-durable`.** Pass `traceAudience` to `openWorldStorage` when it starts a session. The session keeps it, including in the turns the queue route resumes. On a session that exists, it applies to that storage only. `resumeWith(open, { traceAudience })` sets it for the turns the queue route drives in a session that has none.

- **The fx agent.** `agentRunsHooks({ audience })` sets it for every session of that agent.

- **The integration.** `agentRuns({ audience })` sets the audience of sessions that have none.

To change what an audience records, pass `capture` to `agentRuns()`. It gets a session's audience and returns `{ emit, recordInputs, recordOutputs }`. This one keeps the default for public and private sessions, and sends no trace for a session whose audience is unknown:

```ts {4-8} filename="agent-runs.ts"
import { agentRuns } from 'durable-harness/instrumentation/otel';

export default agentRuns({
  capture: (audience) => ({
    emit: audience !== 'unknown', // no trace at all
    recordInputs: audience === 'public',
    recordOutputs: audience === 'public',
  }),
});
```

> **⚠️ Warning:** A public audience shows the session's model and tool content to every project
> member who can read traces. If your agent processes personal, sensitive, or
> regulated data, you may need to disclose this capture under applicable laws
> and in your privacy materials.

To send the same traces to another OpenTelemetry destination, pass its span processors as `spanProcessors`. They get the same spans, with the same content. A tracing failure never fails a turn. It's logged as a warning, or passed to `onError`. In a script or a test, call `forceFlush()` before the process exits.

## Limitations

- Claude Code and Codex run in separate processes in a Sandbox. OpenCode runs an embedded server in your function. Model request and response capture for these harnesses has size limits; larger content is left out or truncated.
- A subagent's calls don't show as a run of their own.
- Agent Runs is shared with eve, and some of its views may not list `durable-harness` sessions yet, even when their traces are recorded. Open the session from the table of runs.

## More resources

- [Agent Runs for eve](/docs/eve/agent-runs)
- [Tracing](/docs/tracing)
- [Vercel Observability](/docs/observability)
- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
