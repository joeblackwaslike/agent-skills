---
title: Running Pi Durably on Vercel
product: vercel
url: /docs/agent-harnesses/pi
canonical_url: "https://vercel.com/docs/agent-harnesses/pi"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses
  - /docs/ai-gateway
  - /docs/agent-harnesses/security
  - /docs/queues
  - /docs/functions/limitations
summary: Make a Pi agent durable on Vercel so a crashed turn resumes in a new function instead of starting over.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/pi.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "bc2459fee21066821ec13c2e5a830cd8427cda4c01412464cdcb0bde10cdec5f"
---

# Running Pi Durably on Vercel

[Pi](https://github.com/earendil-works/pi) is an open-source agent harness. `durable-harness` makes it durable on Vercel in one of two ways, and in both, a turn that loses its function continues in a new one. We recommend `durable-harness/pi-durable`. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Build an AI agent chat UI with useEveAgent](https://eve.dev/docs/guides/frontend/overview) — Put an eve agent behind a browser chat UI with useEveAgent.
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [Build a Claude Managed Agent with Vercel Sandbox](https://vercel.com/kb/guide/run-claude-managed-agent-tools-with-vercel-sandbox) — Build a Claude Managed Agent with Vercel Sandbox: each session runs in a fresh microVM with credential brokering and a w
- [Execution Model and Durability](https://eve.dev/docs/concepts/execution-model-and-durability) — How an eve session runs. Durable conversations, turns that checkpoint at steps, and parked work that resumes later.
- [Build an agent with OpenAI Agents API on Vercel](https://vercel.com/kb/guide/openai-agents-api-vercel) — Build and deploy an agent with OpenAI Agents API, Vercel Functions, Queues, and Sandbox for isolated code execution.
- [Running OpenCode Durably on Vercel](https://vercel.com/docs/agent-harnesses/opencode) — Run OpenCode v2 inside a Vercel Function with its session in a durable log, so a crashed turn resumes in a new function.
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.

Full cross-link map for this page: [/docs/agent-harnesses/pi.graph.md](/docs/agent-harnesses/pi.graph.md)
<!-- /docsgraph:related -->

## Choose a variant

- **`durable-harness/pi-durable`** (recommended) runs Pi 1.0's `Harness`, from `@earendil-works/pi-durable`, on a storage in the log, so each of Pi's commits is an event in the log. You write Pi's own code.
- **`durable-harness/pi`** runs Pi's agent loop, `Agent` from `@earendil-works/pi-agent-core`, and records each model call and tool call as a step in the log.

|                | `durable-harness/pi-durable` (recommended)                     | `durable-harness/pi`                     |
| -------------- | -------------------------------------------------------------- | ---------------------------------------- |
| Best for       | Most Pi agents                                                 | Agents that need only Pi's agent loop    |
| What you write | Your Pi code, on `openWorldStorage()`                          | `pi({ model, tools })`                   |
| Pi features    | Pi's full Harness, including extensions, compaction, and forks | Pi's agent loop and tools                |
| Speed          | Each step waits for the log, so turns are slower               | Durability adds little latency           |
| Steering       | Steering from another request takes the session over           | Redirect a running turn from any request |
| Reconnecting   | The stream resends the response in progress from its start     | The stream continues from the last event |

Pick `durable-harness/pi-durable`. It's Pi 1.0's full Harness, so your agent gets Pi's extensions, compaction, and forks, and if you already have Pi code, only the storage changes. Pick `durable-harness/pi` for Pi's agent loop alone: durability adds less latency, and it works like every other harness in these guides.

## Get started with `durable-harness/pi-durable`

- ### Install the packages
  ```bash package-manager
  npm i durable-harness @earendil-works/pi-durable @earendil-works/chord @earendil-works/pi-ai
  ```

- ### Register your Harness
  Write your Pi code as Pi's documentation shows, or keep the code you have. In a module of its own, pass the function that opens your Harness to `resumeWith`, so the queue route can reopen a session after a crash:
  ```ts {10} filename="lib/pi.ts"
  import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
  import { createRegistry, Harness, type Storage } from '@earendil-works/pi-durable';
  import { gatewayModels, GATEWAY_PROVIDER, resumeWith } from 'durable-harness/pi-durable';

  const models = gatewayModels(); // or your own pi-ai models
  const registry = createRegistry(); // your tools and extensions

  export { ctx };
  export const agent = { model: { provider: GATEWAY_PROVIDER, modelId: 'anthropic/claude-sonnet-5.5' } };
  export const open = resumeWith((storage: Storage) => Harness.open(storage, { models, registry }, ctx));
  ```
  `gatewayModels()` gives Pi its models through [AI Gateway](/docs/ai-gateway) with the deployment's credentials. A build on Vercel fails if the app opens pi-durable sessions and no module calls `resumeWith`.

- ### Open sessions on the World
  Where Pi would open SQLite, JSONL, or memory storage, open the session's storage on the World:
  ```ts {4}
  import { openWorldStorage } from 'durable-harness/pi-durable';
  import { open } from './pi';

  const storage = await openWorldStorage(sessionId);
  const harness = await open(storage);
  ```
  Without an ID, `openWorldStorage` starts a new session, and `storage.sessionId` is its ID. Everything after that is Pi's own API: `harness.root()`, `root.submit()`, `submission.wait()`, and `watchEvents()`.

- ### Add the chat route
  Your app sends each message to a chat route and reads the turn back from it. `chatRoute` is that route, ready-made: `POST` submits a message to Pi and streams the turn as server-sent events, `GET` reconnects to a turn that's still running, and it keeps the request alive until Pi's work is done. It has the same events and `authorize` rule as every chat route in these guides:
  ```ts filename="app/api/chat/route.ts" framework=nextjs-app
  import { chatRoute, openWorldStorage } from 'durable-harness/pi-durable';
  import { withSessionOwnership } from '@/lib/session-ownership';
  import { agent, ctx, open } from '@/lib/pi';

  export const { GET, POST } = withSessionOwnership({
    createRoute: (authorize) => chatRoute({ open, agent, authorize }),
    start: async () => {
      const storage = await openWorldStorage(undefined, { traceAudience: 'unknown' });
      const sessionId = storage.sessionId;
      await storage.close(ctx);
      return { sessionId };
    },
  });
  ```
  ```ts filename="api/chat.ts" framework=other
  import { chatRoute, openWorldStorage } from 'durable-harness/pi-durable';
  import { withSessionOwnership } from '../lib/session-ownership.js';
  import { agent, ctx, open } from '../lib/pi.js';

  export const { GET, POST } = withSessionOwnership({
    createRoute: (authorize) => chatRoute({ open, agent, authorize }),
    start: async () => {
      const storage = await openWorldStorage(undefined, { traceAudience: 'unknown' });
      const sessionId = storage.sessionId;
      await storage.close(ctx);
      return { sessionId };
    },
  });
  ```
  Add the [`withSessionOwnership` helper](/docs/agent-harnesses/security#check-session-ownership) to `lib/session-ownership.ts` and implement its authentication and persistent ownership store. It records the owner before submitting a session's first message, and checks ownership on later messages and reconnects.
  > **⚠️ Warning:** In production (`NODE_ENV=production`, which includes every Vercel deployment),
  > a chat route without `authorize` refuses every request with a 401. To serve
  > anyone, pass `authorize: 'public'`. With `env: sandboxEnv()`, every session
  > starts a Sandbox, so a public route also needs `allowPublicSandbox: true` and a
  > finite `sandboxEnv({ budget: { sessionUsd } })`, which doesn't count Pi's own
  > model calls.
  > Whoever can use the route runs the agent on your AI Gateway credits. See
  > [Security](/docs/agent-harnesses/security#chat-routes).
  POST `{ "text": "..." }` to start a session, and read its ID from the `x-session-id` header. Send `{ "sessionId": "...", "text": "..." }` for the next message. To redirect a running turn or reconnect to one, see [Steer a running turn](#steer-a-running-turn) and [Reconnect to a running turn](#reconnect-to-a-running-turn).

  If your app already has a route that runs Pi, you can keep it instead: open the session with `openWorldStorage`, submit with Pi's `root.submit()`, and close the Harness once the submission finishes. Closing with work left hands it to the queue route.

- ### Add the queue route
  [Vercel Queues](/docs/queues) delivers each turn to a queue route that runs it, with your plan's [maximum duration](/docs/functions/limitations#max-duration). Set it up in `vercel.json`, or let `durable-harness` write the same settings with `harnessFunctions()` in `vercel.ts` or with `withDurableHarness` on Next.js:
  #### vercel.json
  ```ts {3,6} filename="api/flow.ts"
  // A Vercel Function in your api directory. It imports the module that
  // calls resumeWith, so it can run the agent's turns.
  import '../lib/pi.js';
  import { flowHandler } from 'durable-harness';

  export const POST = flowHandler();
  ```
  ```json filename="vercel.json"
  {
    "functions": {
      "api/flow.ts": {
        "maxDuration": "max",
        "experimentalTriggers": [
          {
            "type": "queue/v2beta",
            "topic": "__harness_wkf_workflow_*",
            "retryAfterSeconds": 5,
            "initialDelaySeconds": 0
          }
        ]
      }
    }
  }
  ```
  The trigger subscribes `api/flow.ts` to the queue. `npx durable-harness vercel-json --write` writes this entry into your `vercel.json`.
  #### vercel.ts
  ```ts {3,6} filename="api/flow.ts"
  // A Vercel Function in your api directory. It imports the module that
  // calls resumeWith, so it can run the agent's turns.
  import '../lib/pi.js';
  import { flowHandler } from 'durable-harness';

  export const POST = flowHandler();
  ```
  ```ts {8} filename="vercel.ts"
  // The same settings as in vercel.json, worked out from the packages you
  // installed when the project builds. Install @vercel/config as a dev
  // dependency.
  import type { VercelConfig } from '@vercel/config/v1';
  import { harnessFunctions } from 'durable-harness/vercel';

  export const config: VercelConfig = {
    functions: harnessFunctions(),
  };
  ```
  #### Next.js
  ```ts {10} filename="next.config.ts"
  // Writes the queue route and its trigger, and keeps the harness packages
  // out of the server bundle. You don't add a queue route or a vercel.json.
  import type { NextConfig } from 'next';
  import { withDurableHarness } from 'durable-harness/next';

  const nextConfig: NextConfig = {
    // your existing config
  };

  export default withDurableHarness(nextConfig);
  ```
  If the app also uses the Workflow SDK, wrap both, as in `withWorkflow(withDurableHarness(nextConfig))`. The queue route then moves to `/.well-known/durable-harness/v1/flow` and needs one `vercel.json` entry, which `npx durable-harness vercel-json --write` adds, or `harnessFunctions()` in `vercel.ts`. Without it, the build on Vercel fails and prints the entry.

- ### Deploy
  ```bash
  vercel deploy
  ```
  On your machine, run `vercel link` and `vercel env pull` first, so model calls, and a Sandbox if your tools use one, authenticate with your project's OIDC token. For model calls alone, `AI_GATEWAY_API_KEY` also works. `next dev` (or `vercel dev` for other frameworks) keeps sessions in `.workflow-data`, so add it to `.gitignore`. On its first request, it resumes the sessions a stopped server left mid-turn.

### Differences from Pi's own storage

- **A request that opens a session takes it over.** The request that had it open stops at its next write: the World refuses the write, so nothing more of that request lands. The new request continues the turn from where the agent was. If two requests open a session at the same time, the first to write keeps it. `chatRoute` handles both: the first request's stream follows the session's log to the end, and a request that lost retries once with the same `requestId`. In a route of your own, open the session again after a refused write, and submit again with the same `requestId`.
- **Background work finishes after you close.** `submission.wait()` and `waitForIdle()` don't wait for background work, such as compaction or a background subagent. When you close the Harness, the queue route finishes that work. `chatRoute` waits for it.
- **A request stays alive while its work runs.** It ends when the work is done, or after `recoverAfterMs` (120 seconds by default) with no commit.
- **A long silence can look like a crash.** If a session commits nothing for `recoverAfterMs` while it has unfinished work, another function can take it over. A tool that writes no output or a model call that streams nothing can do that, so raise the limit for them with `openWorldStorage(sessionId, { recoverAfterMs })`.
- **Give Pi's tools a workspace, not your function.** Pi's `env`, where its tools run, isn't saved with the session. Don't give it your function's directory or processes, such as a `NodeExecutionEnv`: other sessions on the same instance could reach them, and a resumed turn can run on another instance without them. Use `virtualEnv()`, a [virtual workspace](/docs/agent-harnesses/tools#a-virtual-workspace-in-the-log), or `sandboxEnv()`, the session's Vercel Sandbox, as [Tools](#tools) shows. See [Security](/docs/agent-harnesses/security).

## Get started with `durable-harness/pi`

- ### Install the packages
  ```bash package-manager
  npm i durable-harness @earendil-works/pi-agent-core @earendil-works/pi-ai
  ```

- ### Create the agent
  Make the agent with an [AI Gateway](/docs/ai-gateway) model. To give it tools, see [Tools](#tools):
  ```ts {3} filename="lib/agent.ts"
  import { pi } from 'durable-harness/pi';

  export const agent = pi({ model: 'anthropic/claude-sonnet-5.5' });
  ```

- ### Add the chat route
  `POST` sends a message and streams its turn as server-sent events, and `GET` reconnects to a turn that's still running:
  ```ts filename="app/api/chat/route.ts" framework=nextjs-app
  import { agent } from '@/lib/agent';
  import { withSessionOwnership } from '@/lib/session-ownership';

  export const { GET, POST } = withSessionOwnership({
    createRoute: (authorize) => agent.chatRoute({ authorize }),
    start: () => agent.sessions.start({ config: { traceAudience: 'unknown' } }),
  });
  ```
  ```ts filename="api/chat.ts" framework=other
  import { agent } from '../lib/agent.js';
  import { withSessionOwnership } from '../lib/session-ownership.js';

  export const { GET, POST } = withSessionOwnership({
    createRoute: (authorize) => agent.chatRoute({ authorize }),
    start: () => agent.sessions.start({ config: { traceAudience: 'unknown' } }),
  });
  ```
  Add the [`withSessionOwnership` helper](/docs/agent-harnesses/security#check-session-ownership) to `lib/session-ownership.ts` and implement its authentication and persistent ownership store. It records the owner before submitting a session's first message, and checks ownership on later messages and reconnects.
  > **⚠️ Warning:** In production (`NODE_ENV=production`, which includes every Vercel deployment),
  > a chat route without `authorize` refuses every request with a 401. To serve
  > anyone, pass `authorize: 'public'`. With `createCodingTools(sandbox())`, every
  > session starts a Sandbox, so a public route also needs `allowPublicSandbox: true`
  > and a finite `sandbox({ budget: { sessionUsd } })`, which doesn't count Pi's own
  > model calls.
  > Whoever can use the route runs the agent on your AI Gateway credits. See
  > [Security](/docs/agent-harnesses/security#chat-routes).
  POST `{ "text": "..." }` to start a session, and read its ID from the `x-session-id` header. Send `{ "sessionId": "...", "text": "..." }` for the next message. To redirect a running turn or reconnect to one, see [Steer a running turn](#steer-a-running-turn) and [Reconnect to a running turn](#reconnect-to-a-running-turn).

- ### Add the queue route
  [Vercel Queues](/docs/queues) delivers each turn to a queue route that runs it, with your plan's [maximum duration](/docs/functions/limitations#max-duration). Set it up in `vercel.json`, or let `durable-harness` write the same settings with `harnessFunctions()` in `vercel.ts` or with `withDurableHarness` on Next.js:
  #### vercel.json
  ```ts {3,6} filename="api/flow.ts"
  // A Vercel Function in your api directory. It imports the module that
  // makes your agent, so it can run the agent's turns.
  import '../lib/agent.js';
  import { flowHandler } from 'durable-harness';

  export const POST = flowHandler();
  ```
  ```json filename="vercel.json"
  {
    "functions": {
      "api/flow.ts": {
        "maxDuration": "max",
        "experimentalTriggers": [
          {
            "type": "queue/v2beta",
            "topic": "__harness_wkf_workflow_*",
            "retryAfterSeconds": 5,
            "initialDelaySeconds": 0
          }
        ]
      }
    }
  }
  ```
  The trigger subscribes `api/flow.ts` to the queue. `npx durable-harness vercel-json --write` writes this entry into your `vercel.json`.
  #### vercel.ts
  ```ts {3,6} filename="api/flow.ts"
  // A Vercel Function in your api directory. It imports the module that
  // makes your agent, so it can run the agent's turns.
  import '../lib/agent.js';
  import { flowHandler } from 'durable-harness';

  export const POST = flowHandler();
  ```
  ```ts {8} filename="vercel.ts"
  // The same settings as in vercel.json, worked out from the packages you
  // installed when the project builds. Install @vercel/config as a dev
  // dependency.
  import type { VercelConfig } from '@vercel/config/v1';
  import { harnessFunctions } from 'durable-harness/vercel';

  export const config: VercelConfig = {
    functions: harnessFunctions(),
  };
  ```
  #### Next.js
  ```ts {10} filename="next.config.ts"
  // Writes the queue route and its trigger, and keeps the harness packages
  // out of the server bundle. You don't add a queue route or a vercel.json.
  import type { NextConfig } from 'next';
  import { withDurableHarness } from 'durable-harness/next';

  const nextConfig: NextConfig = {
    // your existing config
  };

  export default withDurableHarness(nextConfig);
  ```
  If the app also uses the Workflow SDK, wrap both, as in `withWorkflow(withDurableHarness(nextConfig))`. The queue route then moves to `/.well-known/durable-harness/v1/flow` and needs one `vercel.json` entry, which `npx durable-harness vercel-json --write` adds, or `harnessFunctions()` in `vercel.ts`. Without it, the build on Vercel fails and prints the entry.

- ### Deploy
  ```bash
  vercel deploy
  ```
  On your machine, run `vercel link` and `vercel env pull` first, so model calls, and a Sandbox if your tools use one, authenticate with your project's OIDC token. For model calls alone, `AI_GATEWAY_API_KEY` also works. `next dev` (or `vercel dev` for other frameworks) keeps sessions in `.workflow-data`, so add it to `.gitignore`. On its first request, it resumes the sessions a stopped server left mid-turn.

## Steer a running turn

Send a message with `"kind": "steer"` while a turn runs to redirect it. From the browser, post it to the chat route:

```ts {4}
await fetch('/api/chat', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ sessionId, text: 'Use TypeScript instead', kind: 'steer' }),
});
```

The response streams the turn, like any other message.

#### pi-durable

Pi takes the steer after the tool calls that are running. A steer from another request takes the session over, and that request continues the turn. From server code, such as a webhook, submit with Pi's `whenBusy: 'steer'`:

```ts {7}
import { openWorldStorage } from 'durable-harness/pi-durable';
import { agent, ctx, open } from './pi';

const harness = await open(await openWorldStorage(sessionId));
const root = await harness.root(ctx, { agent });
await root.submit(
  { type: 'input', content: 'Use TypeScript instead', requestId: crypto.randomUUID(), whenBusy: 'steer' },
  ctx,
);
await harness.close(ctx); // the queue route finishes the turn
```

#### pi

The steer reaches the model at the turn's next model call, whichever request sends it. From server code, such as a webhook, call `agent.sessions.send`:

```ts {3}
import { agent } from './agent';

await agent.sessions.send(sessionId, 'Use TypeScript instead', 'steer');
```

## Reconnect to a running turn

If the stream drops, the turn keeps running.

#### pi-durable

With `chatRoute`, reconnect without a cursor. The response starts again from the beginning of the model response in progress, so replace the text you showed for it. A `rewind` event means a model call restarted, so drop its text. When the session is idle, `GET` answers 204:

```ts {1}
const source = new EventSource(`/api/chat?sessionId=${sessionId}`);

source.onmessage = (event) => render(JSON.parse(event.data)); // your own UI
source.addEventListener('end', () => source.close());
```

#### pi

Reconnect with `GET /api/chat?sessionId=...&cursor=...`, where the cursor is the last event `id` you read. The stream continues with the next event, with nothing lost or repeated. An `EventSource` on that URL reconnects by itself if its connection drops, and the stream ends with an `end` event when the turn is done:

```ts {1,7}
const source = new EventSource(`/api/chat?sessionId=${sessionId}&cursor=${lastEventId}`);

source.onmessage = (event) => {
  lastEventId = event.lastEventId;
  render(JSON.parse(event.data)); // your own UI
};
source.addEventListener('end', () => source.close());
```

## Run more than one agent

An app can make several agents, each with its own chat route. The queue route serves them all.

#### pi-durable

Give each Pi setup a `name`, and pass it to `resumeWith`:

```ts {3-4} filename="lib/pi.ts"
const openHarness = (storage: Storage) => Harness.open(storage, { models, registry }, ctx);

export const openReviewer = resumeWith(openHarness, { name: 'reviewer' });
export const openFixer = resumeWith(openHarness, { name: 'fixer' });
```

Open each one's sessions with the same name, as in `openWorldStorage(sessionId, { name: 'reviewer' })`, or `chatRoute({ open: openReviewer, agent, name: 'reviewer', authorize })`. Keep each name stable, because sessions that already started carry it.

#### pi

Give each agent a `name`:

```ts {3-4} filename="lib/agents.ts"
import { pi } from 'durable-harness/pi';

export const reviewer = pi({ name: 'reviewer', model: 'anthropic/claude-opus-5.5' });
export const fixer = pi({ name: 'fixer', model: 'anthropic/claude-sonnet-5.5' });
```

Keep each name stable, because sessions that already started carry it. Two agents with the same name throw when their module loads, so the build fails.

## Tools

#### pi-durable

A Harness has no tools until you install them in your registry. Install Pi's own `read`, `write`, `edit`, and `bash` with `CodingTools` from `durable-harness/pi-durable`, and give them a workspace with `virtualEnv()`. Add tools of your own with Pi's `defineTool()`:

```ts {7-16,20-21,26} filename="lib/pi.ts"
import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
import { Type } from '@earendil-works/pi-ai';
import { createRegistry, defineExtension, defineTool, Harness, type Storage } from '@earendil-works/pi-durable';
import { CodingTools, gatewayModels, GATEWAY_PROVIDER, resumeWith, virtualEnv } from 'durable-harness/pi-durable';
import { getOrder } from './orders'; // your own code

const getOrderTool = defineTool({
  name: 'get_order',
  description: 'Looks up an order',
  replay: 'safe', // safe to run again after a crash
  parameters: Type.Object({ id: Type.String() }),
  execute: async (args, api) => {
    api.output(JSON.stringify(await getOrder(args.id)));
    return {};
  },
});

const models = gatewayModels();
const registry = createRegistry();
registry.install(CodingTools); // Pi's read, write, edit, and bash
registry.install(defineExtension({ name: 'orders', tools: [getOrderTool] }));

export { ctx };
export const agent = { model: { provider: GATEWAY_PROVIDER, modelId: 'anthropic/claude-sonnet-5.5' } };
export const open = resumeWith((storage: Storage) =>
  Harness.open(storage, { models, registry, env: virtualEnv() }, ctx),
);
```

`virtualEnv()` is a [virtual workspace](/docs/agent-harnesses/tools#a-virtual-workspace-in-the-log) at `/workspace`. Each call's file changes commit with its result in the session's log, so the files follow the session to any function. Also install `just-bash`. After a crash, a `'safe'` tool runs again, and any other comes back to the model as interrupted.

To run the same tools in the session's own [Vercel Sandbox](/docs/sandbox), pass `sandboxEnv()` instead, and install `@vercel/sandbox`:

```ts {1,4}
import { sandboxEnv } from 'durable-harness/pi-durable';

export const open = resumeWith((storage: Storage) =>
  Harness.open(storage, { models, registry, env: sandboxEnv() }, ctx),
);
```

The files are on a [Drive](/docs/sandbox/concepts/drives) at `/workspace` that lasts across turns, and the Sandbox starts at the first tool call. Pi itself stays in your function. A command that a crash interrupts may have partly run, so it comes back to the model as interrupted and never runs again. On your machine, run `vercel link` and `vercel env pull` first: the Sandbox starts on Vercel, under the linked project.

#### pi

`durable-harness/pi` starts with no tools. Pass Pi `AgentTool`s or `HostTool`s as `tools`, each with a `replay` rule. `createCodingTools(virtual())` adds Pi's own `read`, `bash`, `edit`, and `write` on a [virtual workspace](/docs/agent-harnesses/tools#a-virtual-workspace-in-the-log):

```ts {5-11,15} filename="lib/agent.ts"
import { virtual, type HostTool } from 'durable-harness';
import { createCodingTools, pi } from 'durable-harness/pi'; // also install just-bash
import { getOrder } from './orders'; // your own code

const getOrderTool: HostTool = {
  name: 'get_order',
  description: 'Looks up an order',
  replay: 'safe', // safe to run again after a crash
  inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  execute: async ({ id }) => JSON.stringify(await getOrder(id)),
};

export const agent = pi({
  model: 'anthropic/claude-sonnet-5.5',
  tools: [...createCodingTools(virtual()), getOrderTool],
});
```

After a crash, a `'safe'` tool runs again, and any other comes back to the model as interrupted.

To run Pi's tools in the session's own [Vercel Sandbox](/docs/sandbox), pass `sandbox()` instead, and install `@vercel/sandbox`:

```ts {1,4}
import { sandbox } from 'durable-harness';
import { createCodingTools, pi } from 'durable-harness/pi';

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools: createCodingTools(sandbox()) });
```

The files are on a [Drive](/docs/sandbox/concepts/drives) at `/workspace` that lasts across turns, and the Sandbox starts at the first tool call. Pi itself stays in your function. What a call wrote stays on the Drive even if a crash interrupts it, so after a crash `read` runs again, and `bash`, `edit`, and `write` come back to the model as interrupted. On your machine, run `vercel link` and `vercel env pull` first: the Sandbox starts on Vercel, under the linked project. A long command early in a turn can be cut off: see [A Vercel Sandbox with a Drive](/docs/agent-harnesses/tools#a-vercel-sandbox-with-a-drive).

For files, documents, and how to write tools safely, see [Tools, files, and documents](/docs/agent-harnesses/tools).

## What happens when a function crashes

Both variants read finished steps back from the log, run the model calls and `'safe'` tools that were running again, and return an interrupted `'never'` tool to the model as possibly run. If the function running a turn fails with an error, another function resumes the turn right away. If it disappears without a trace, for example when it runs out of memory, the queue redelivers the turn once its message lease runs out, and the turn resumes from the log. With `durable-harness/pi-durable`, the storage stands behind its own commits: a turn that dies silently resumes within `recoverAfterMs` of its last commit, and right away if the Harness closed with work left.

## Self-host on another World

Both variants keep sessions on the environment's World: Vercel's World on Vercel, and `.workflow-data` on your machine. To keep them in another [World](https://workflow-sdk.dev/worlds), such as Postgres on your own servers, install it and set `WORKFLOW_TARGET_WORLD`:

```bash filename=".env"
WORKFLOW_TARGET_WORLD="@workflow/world-postgres"
WORKFLOW_POSTGRES_URL="postgres://user:password@host:5432/database"
```

To use a World you create, pass it to `durable-harness` and start it yourself:

#### pi-durable

```ts {10,12,14-15} filename="lib/pi.ts"
import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
import { createRegistry, Harness, type Storage } from '@earendil-works/pi-durable';
import { createWorld } from '@workflow/world-postgres';
import { registerQueue } from 'durable-harness';
import { gatewayModels, GATEWAY_PROVIDER, resumeWith } from 'durable-harness/pi-durable';

const models = gatewayModels();
const registry = createRegistry();

export const world = createWorld({ connectionString: process.env.WORKFLOW_POSTGRES_URL! });
export const agent = { model: { provider: GATEWAY_PROVIDER, modelId: 'anthropic/claude-sonnet-5.5' } };
export const open = resumeWith((storage: Storage) => Harness.open(storage, { models, registry }, ctx), { world });

registerQueue(world); // before start: deliver durable-harness's queue to this process
await world.start();
```

Open its sessions on the same World, with `openWorldStorage(sessionId, { world })` or `chatRoute({ open, agent, world, authorize })`.

#### pi

```ts {6,8,10} filename="lib/agent.ts"
import { createWorld } from '@workflow/world-postgres';
import { recoverSessions, registerQueue } from 'durable-harness';
import { pi } from 'durable-harness/pi';

export const world = createWorld({ connectionString: process.env.WORKFLOW_POSTGRES_URL! });
export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', world });

registerQueue(world); // before start: deliver durable-harness's queue to this process
await world.start();
await recoverSessions(world); // resume the sessions a stopped server left mid-turn
```

An agent with its own World takes its queue deliveries through `agent.handler`, so mount `agent.handler` instead of `flowHandler()` at the queue route.

For the tables, the server, and recovery at startup, see [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting).

## More resources

- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [Pi](https://github.com/earendil-works/pi)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
