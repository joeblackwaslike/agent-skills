---
title: Running fx Durably on Vercel
product: vercel
url: /docs/agent-harnesses/fx
canonical_url: "https://vercel.com/docs/agent-harnesses/fx"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses
  - /docs/queues
  - /docs/agent-harnesses/security
  - /docs/functions/limitations
  - /docs/sandbox
summary: Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/fx.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6e550f597ee56426e1f4a4b15af21493693a10a2aa7833e2346efff95b2e2980"
---

# Running fx Durably on Vercel

[fx](https://github.com/vercel-labs/fx) is an agent harness with its kernel written in Zig. Its JavaScript package, `libfx`, is durable by default: it saves each step of a turn as it runs, and the same code runs on your machine and on Vercel. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Running OpenCode Durably on Vercel](https://vercel.com/docs/agent-harnesses/opencode) — Run OpenCode v2 inside a Vercel Function with its session in a durable log, so a crashed turn resumes in a new function.
- [Running Claude Code Durably on Vercel](https://vercel.com/docs/agent-harnesses/claude-code) — Run Claude Code in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn r
- [Running Codex Durably on Vercel](https://vercel.com/docs/agent-harnesses/codex) — Run Codex in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn resumes
- [Running Pi Durably on Vercel](https://vercel.com/docs/agent-harnesses/pi) — Make a Pi agent durable on Vercel so a crashed turn resumes in a new function instead of starting over.
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the

Full cross-link map for this page: [/docs/agent-harnesses/fx.graph.md](/docs/agent-harnesses/fx.graph.md)
<!-- /docsgraph:related -->

## Get started

- ### Install libfx
  `libfx` includes its native addon and Vercel's World, so you don't install anything else:
  ```bash package-manager
  npm i libfx
  ```

- ### Create the agent
  Create the agent, and set `idempotent` on every tool:
  ```ts {8,15,18-19,23} filename="lib/agent.ts"
  import { createFxAgent } from 'libfx';
  import { getOrder, refundOrder } from './orders'; // your own code

  const tools = [
    {
      name: 'get_order',
      description: 'Looks up an order',
      idempotent: true, // safe to run again after a crash
      inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      execute: (input: { id: string }) => getOrder(input.id),
    },
    {
      name: 'refund_order',
      description: 'Refunds an order',
      idempotent: false, // never runs twice
      inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
      // executionId is the same each time this call runs: use it as an idempotency key
      execute: (input: { id: string }, { executionId }: { executionId: string }) =>
        refundOrder(input.id, { idempotencyKey: executionId }),
    },
  ];

  export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools });
  ```

- ### Add the chat route
  `POST` stores the prompt and streams the turn. When no other function holds the session, the same function runs the turn, and [Vercel Queues](/docs/queues) keeps the prompt in case that function stops. `GET` reconnects from a `cursor`:
  ```ts {5-14,21-22} filename="app/api/chat/route.ts" framework=nextjs-app
  import { agent } from '@/lib/agent';
  import { getUser, ownsSession, saveSession } from '@/lib/auth'; // your own auth and session store

  export async function POST(request: Request) {
    const user = await getUser(request);
    if (!user) return new Response('Unauthorized', { status: 401 });
    let sessionId = new URL(request.url).searchParams.get('sessionId');
    if (sessionId) {
      if (!(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
    } else {
      sessionId = await agent.newSessionId();
      await saveSession(user, sessionId); // so this user can use it later
    }
    const turn = agent.session(sessionId).prompt(await request.text());
    return new Response(turn.readable);
  }

  export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const sessionId = params.get('sessionId');
    const user = await getUser(request);
    if (!user || !sessionId || !(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
    const stream = agent.session(sessionId).stream(Number(params.get('cursor') ?? 0));
    return new Response(stream);
  }
  ```
  ```ts {5-14,21-22} filename="api/chat.ts" framework=other
  import { agent } from '../lib/agent.js';
  import { getUser, ownsSession, saveSession } from '../lib/auth.js'; // your own auth and session store

  export async function POST(request: Request) {
    const user = await getUser(request);
    if (!user) return new Response('Unauthorized', { status: 401 });
    let sessionId = new URL(request.url).searchParams.get('sessionId');
    if (sessionId) {
      if (!(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
    } else {
      sessionId = await agent.newSessionId();
      await saveSession(user, sessionId); // so this user can use it later
    }
    const turn = agent.session(sessionId).prompt(await request.text());
    return new Response(turn.readable);
  }

  export async function GET(request: Request) {
    const params = new URL(request.url).searchParams;
    const sessionId = params.get('sessionId');
    const user = await getUser(request);
    if (!user || !sessionId || !(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
    const stream = agent.session(sessionId).stream(Number(params.get('cursor') ?? 0));
    return new Response(stream);
  }
  ```
  Every route checks who's calling, and that the session is theirs: a route that serves anyone runs turns on your AI Gateway credits, and lets anyone with a session ID read or steer it. See [Security](/docs/agent-harnesses/security).

  The response streams the turn as JSON lines. The first line, `turn_start`, carries the session's ID, and every line has a `cursor`. To redirect a running turn or reconnect to one, see [Steer a running turn](#steer-a-running-turn) and [Reconnect to a running turn](#reconnect-to-a-running-turn).

- ### Add the queue route
  Vercel Queues delivers every turn the chat route doesn't run, and the rest of any turn it couldn't finish, to a queue route that runs it, with your plan's [maximum duration](/docs/functions/limitations#max-duration). Set it up in `vercel.json` or `vercel.ts`, or let `withDurableHarness` write it on Next.js:
  #### vercel.json
  ```ts {3} filename="api/libfx.ts"
  import { agent } from '../lib/agent.js';

  export const POST = agent.wakeHandler();
  ```
  ```json filename="vercel.json"
  {
    "functions": {
      "api/libfx.ts": {
        "maxDuration": "max",
        "experimentalTriggers": [{ "type": "queue/v2beta", "topic": "__libfx_wkf_workflow_session" }]
      }
    }
  }
  ```
  The trigger subscribes `api/libfx.ts` to the queue. On Next.js, you can put the route in `app/api/libfx/route.ts` instead, and use that path as the key.
  #### vercel.ts
  ```ts {3} filename="api/libfx.ts"
  import { agent } from '../lib/agent.js';

  export const POST = agent.wakeHandler();
  ```
  ```ts {5-8} filename="vercel.ts"
  // Install @vercel/config as a dev dependency.
  import type { VercelConfig } from '@vercel/config/v1';

  export const config: VercelConfig = {
    functions: {
      'api/libfx.ts': {
        maxDuration: 'max',
        experimentalTriggers: [{ type: 'queue/v2beta', topic: '__libfx_wkf_workflow_session' }],
      },
    },
  };
  ```
  The trigger subscribes `api/libfx.ts` to the queue. On Next.js, you can put the route in `app/api/libfx/route.ts` instead, and use that path as the key.
  #### Next.js
  If your app uses Next.js, `durable-harness` can write the queue route for you. Install it next to `libfx`:
  ```bash package-manager
  npm i durable-harness
  ```
  ```ts {10} filename="next.config.ts"
  // Writes the queue route and its trigger, and keeps libfx's native addon
  // out of the server bundle. You don't add a queue route or a vercel.json.
  import type { NextConfig } from 'next';
  import { withDurableHarness } from 'durable-harness/next';

  const nextConfig: NextConfig = {
    // your existing config
  };

  export default withDurableHarness(nextConfig);
  ```
  The route reaches each agent through its module's exports, so export every agent at the top level of its module, as `lib/agent.ts` does. If your `vercel.json` or `vercel.ts` already subscribes a route to libfx's topic, `withDurableHarness` leaves that route in place. In an app that also uses the Workflow SDK's `withWorkflow`, wrap both, and add the `vercel.json` entries that `npx durable-harness vercel-json --write` prints.

- ### Deploy
  ```bash
  vercel deploy
  ```

On your machine, run `vercel link` and `vercel env pull`, or set `AI_GATEWAY_API_KEY`, so model calls can authenticate. The same code keeps sessions in files under `$TMPDIR/libfx/sessions`. To keep them in another World, such as Postgres, see [Self-host on another World](#self-host-on-another-world).

> **💡 Note:** Make tools `idempotent: true` wherever you can. A harness runs them without waiting for
> the log, and reruns them after a crash. Before an `idempotent: false` tool, it waits until
> the log has recorded the call, so the tool never runs twice.

## Steer a running turn

`session.steer(text)` steers the running turn: it cuts a streaming reply short, or waits for a running tool, and the turn continues with it. With no turn running, the steer starts one. Any server can steer a session:

```ts {6-7} filename="app/api/chat/steer/route.ts" framework=nextjs-app
import { agent } from '@/lib/agent';
import { getUser, ownsSession } from '@/lib/auth'; // your own auth and session store

export async function POST(request: Request) {
  const { sessionId, text } = await request.json();
  const user = await getUser(request);
  if (!user || !(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
  await agent.session(sessionId).steer(text);
  return new Response(null, { status: 204 });
}
```

```ts {6-7} filename="api/chat/steer.ts" framework=other
import { agent } from '../../lib/agent.js';
import { getUser, ownsSession } from '../../lib/auth.js'; // your own auth and session store

export async function POST(request: Request) {
  const { sessionId, text } = await request.json();
  const user = await getUser(request);
  if (!user || !(await ownsSession(user, sessionId))) return new Response('Not found', { status: 404 });
  await agent.session(sessionId).steer(text);
  return new Response(null, { status: 204 });
}
```

## Reconnect to a running turn

If the response ends before the turn does, the turn keeps running. Reconnect with `GET /api/chat?sessionId=...&cursor=...`, with the last `cursor` you read. The `GET` handler in the chat route streams the session from just after that cursor and stays open for its next turns, so stop reading at the turn's `turn_end`.

## Run more than one agent

An app can make several agents, each with its own chat route. Give each one a `name`:

```ts {4-5} filename="lib/agents.ts"
import { createFxAgent } from 'libfx';
import { tools } from './tools'; // your tools, each with idempotent set

export const support = createFxAgent({ name: 'support', model: 'anthropic/claude-sonnet-5.5', tools });
export const coding = createFxAgent({ name: 'coding', model: 'anthropic/claude-opus-5.5', tools });
```

A session's turns run only on an agent with the name of the agent that created it. Keep each name stable, because sessions that already started carry it. An agent without a `name` is named `default`.

One queue route serves every agent. Import every module that creates one, and mount libfx's `wakeHandler()`:

```ts {1-2,4} filename="api/libfx.ts"
import { wakeHandler } from 'libfx';
import '../lib/agents.js'; // every module that creates an agent

export const POST = wakeHandler();
```

On Next.js, `withDurableHarness` imports every module that exports an agent, so you don't write this route.

## Tools

An fx agent has only the tools you give it. To give it fx's own `read_file`, `glob_files`, `grep_files`, `edit_file`, `write_file`, and `shell`, add `fxTools()` from `durable-harness/fx` to its tools, with a workspace for them. They never run on your function's disk, in its processes, or with its environment, which other sessions on the instance share:

#### Virtual workspace

```bash package-manager
npm i durable-harness just-bash
```

```ts {2-3,6} filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { virtual } from 'durable-harness';
import { fxTools } from 'durable-harness/fx';
import { tools } from './tools'; // your tools, each with idempotent set

export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools: [...fxTools(virtual()), ...tools] });
```

The tools run on a virtual workspace at `/workspace` in your function, where `shell` is [just-bash](https://www.npmjs.com/package/just-bash), whose commands can't reach the function's files, processes, or environment. Each call that changes files records the change in the session's log, so the files follow the session to any function, and a call that a crash interrupts runs again without changing anything twice.

#### Vercel Sandbox

```bash package-manager
npm i durable-harness @vercel/sandbox
```

```ts {2-3,6} filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { sandbox } from 'durable-harness';
import { fxTools } from 'durable-harness/fx';
import { tools } from './tools'; // your tools, each with idempotent set

export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools: [...fxTools(sandbox()), ...tools] });
```

The tools run in the session's own [Vercel Sandbox](/docs/sandbox), with its files on a [Drive](/docs/sandbox/concepts/drives) at `/workspace` that lasts across turns. The agent stays in your function, and the Sandbox starts at the first tool call. What a call wrote stays on the Drive even if a crash interrupts it, so libfx never runs an interrupted call again, and tells the model it may have partly run. On your machine, run `vercel link` and `vercel env pull` first: the Sandbox starts on Vercel, under the linked project.

Every session can start a Sandbox, and the chat route is your own, so check who's calling, as the chat route above does, and cap each session's Sandbox time with `sandbox({ budget: { vmSeconds } })`. A Sandbox runs for at most 4 hours a session by default. See [Security](/docs/agent-harnesses/security#chat-routes).

If you pass the agent a World of your own, as [Self-host on another World](#self-host-on-another-world) shows, pass it to `fxTools()` too, as in `fxTools(virtual(), { world: sessions })`. For tools you write, see [Tools, files, and documents](/docs/agent-harnesses/tools) and [Security](/docs/agent-harnesses/security).

## What happens when a function crashes

After a crash, Vercel Queues redelivers the turn, and a new function continues it from its last saved step. An `idempotent: true` tool that was running runs again. An `idempotent: false` tool returns an error that tells the model it may have partly run, so the model can check before it calls it again.

Turns aren't limited to one function. Shortly before the function's deadline, libfx saves the turn and continues it in a new invocation.

## Self-host on another World

libfx chooses where sessions live by itself: Vercel's World on Vercel, and files in `FX_SESSIONS_DIR`, by default `$TMPDIR/libfx/sessions`, in Node.js elsewhere. It doesn't read `WORKFLOW_TARGET_WORLD`. To keep sessions in another [World](https://workflow-sdk.dev/worlds), such as Postgres on your own servers, install it and pass it to `world()` from `libfx/durable-world`:

```ts {7,12} filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { world } from 'libfx/durable-world';
import { createWorld } from '@workflow/world-postgres';
import { tools } from './tools'; // your tools, each with idempotent set

// libfx's own queue topics and jobs, apart from the rest of the app.
const sessions = createWorld({ connectionString: process.env.WORKFLOW_POSTGRES_URL!, namespace: 'libfx', jobPrefix: 'libfx_' });
await sessions.start();

export const agent = createFxAgent({
  model: 'anthropic/claude-sonnet-5.5',
  tools,
  durability: world(sessions, { queueDurable: true }),
});
```

libfx never starts or closes a World you pass in, so start it before the agent's first prompt, and close it after `agent.close()`. The Postgres World delivers to the agent in its process. For a World that delivers over HTTP, mount `agent.wakeHandler()` where it delivers. For the Postgres tables and connection string, see [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting).

## See sessions in Agent Runs

To see each session in Agent Runs, pass `hooks: agentRunsHooks()` from `durable-harness/fx` to `createFxAgent`, and set up Agent Runs as [Observability](/docs/agent-harnesses/observability#set-up-agent-runs) shows.

## Limitations

- While a turn can run for much longer, a single model request or tool call can't run longer than the [maximum duration](/docs/functions/limitations#max-duration) of the function running it, the chat route or the queue route.
- Renaming an agent, or naming one that had no `name`, leaves its sessions with no agent to run them. A function that gets a turn for an agent it doesn't create refuses it, and the queue delivers it again.
- On your machine or on the Postgres World, a server that's killed or restarted mid-turn leaves the turn open until the session's next message, or until you call `session.resume()`. The next message's response streams only its own turn: read the resumed one with `GET` from your last cursor.

## More resources

- [`libfx` README](https://www.npmjs.com/package/libfx)
- [fx](https://github.com/vercel-labs/fx)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
