---
title: Self-Hosting Durable Agent Harnesses
product: vercel
url: /docs/agent-harnesses/self-hosting
canonical_url: "https://vercel.com/docs/agent-harnesses/self-hosting"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/workflows
  - /docs/ai-gateway/authentication-and-byok/api-keys
  - /docs/agent-harnesses/security
  - /docs/agent-harnesses/claude-code
summary: Keep durable agent harness sessions in another World, such as Postgres, and run Pi, Claude Code, Codex, OpenCode, and fx on your own servers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/self-hosting.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "c1b40e15982d5828a766736b202879da5eab2fd93b1d1d8ec419fd6588e58a66"
---

# Self-Hosting Durable Agent Harnesses

A durable harness keeps its sessions behind a World, the storage and queue interface of the open-source [Workflow SDK](https://workflow-sdk.dev). On Vercel, that's Vercel's World. To run the harnesses on your own servers, or to keep sessions in your own database, choose another World. This page covers Pi, Claude Code, Codex, and OpenCode with `durable-harness`, and fx with `libfx`. For eve, see [Self-host eve](https://eve.dev/docs/guides/deployment/self-hosting).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Worlds](https://workflow-sdk.dev/docs/configuration/worlds) — Select and configure Local, Postgres, Vercel, or custom Worlds.
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [What is WorkflowAgent?](https://vercel.com/kb/guide/what-is-workflowagent) — Build durable AI agents with WorkflowAgent: tool calls that retry as workflow steps, suspend for human approval, and res
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Running Codex Durably on Vercel](https://vercel.com/docs/agent-harnesses/codex) — Run Codex in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn resumes
- [Running OpenCode Durably on Vercel](https://vercel.com/docs/agent-harnesses/opencode) — Run OpenCode v2 inside a Vercel Function with its session in a durable log, so a crashed turn resumes in a new function.
- [Tools, Files, and Documents in Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/tools) — What tools do when a durable agent harness resumes after a crash, where its files live, and how to keep typed state with
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the

Full cross-link map for this page: [/docs/agent-harnesses/self-hosting.graph.md](/docs/agent-harnesses/self-hosting.graph.md)
<!-- /docsgraph:related -->

> **⚠️ Warning:** These integrations are experimental: `durable-harness` is in beta. Package
> names and APIs can change before they're stable.

## How the World is chosen

`durable-harness` chooses the World the way the Workflow SDK does:

| Where the app runs                         | World                                                                                  | Sessions live in                                                |
| ------------------------------------------ | -------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| On Vercel                                  | `@workflow/world-vercel`                                                               | [Vercel Workflows](/docs/workflows) storage                     |
| Anywhere else                              | `@workflow/world-local`                                                                | Files in `WORKFLOW_LOCAL_DATA_DIR`, by default `.workflow-data` |
| Anywhere, with `WORKFLOW_TARGET_WORLD` set | The World it names: `vercel`, `local`, or a package such as `@workflow/world-postgres` | That World's storage                                            |

The local World keeps sessions in files on one machine. It suits development, and a single server whose disk persists. To run more than one server, or to keep sessions in a database, use the [Postgres World](https://workflow-sdk.dev/worlds/postgres). fx chooses its World on its own: see [fx](#fx).

## Self-host with Postgres

Use Node.js 22 or later and a Postgres database.

- ### Install the Postgres World
  ```bash package-manager
  npm i @workflow/world-postgres
  ```
  Use `@workflow/world-postgres` 5.0.4 or later.

- ### Create its tables
  ```bash
  WORKFLOW_POSTGRES_URL="postgres://user:password@host:5432/database" npx --package=@workflow/world-postgres bootstrap
  ```
  It's safe to run again. Run it again after you upgrade the package.

- ### Point your app at it
  ```bash filename=".env"
  WORKFLOW_TARGET_WORLD="@workflow/world-postgres"
  WORKFLOW_POSTGRES_URL="postgres://user:password@host:5432/database"
  AI_GATEWAY_API_KEY="your-ai-gateway-api-key"
  ```
  Without `WORKFLOW_POSTGRES_URL`, the World reads `DATABASE_URL`. Create an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/api-keys) for model calls outside Vercel. This key does not authenticate Vercel Sandbox requests; those need separate [Sandbox credentials](#claude-code-codex-and-opencode).

- ### Start the World with your server
  #### Next.js
  `withDurableHarness` already serves the queue route. To resume the sessions a stopped server left mid-turn as soon as the server starts, rather than on its first request, start the World in `instrumentation.ts`. Import every module that makes an agent first, so the World's deliveries reach it:
  ```ts {3,5} filename="instrumentation.ts"
  export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;
    await import('./lib/agent'); // every module that makes an agent
    const { getWorld } = await import('durable-harness');
    await getWorld();
  }
  ```
  #### Your own server
  Serve the chat route and the queue route from any server that takes a Fetch API `Request`. `vercel.json` and `vercel.ts` don't apply on your own server, so it mounts the queue route itself. This one uses Hono's Node.js server and the [session ownership helper](/docs/agent-harnesses/security#check-session-ownership) to authenticate callers and save each new session's owner before submitting a message:
  ```bash package-manager
  npm i hono @hono/node-server
  ```
  ```ts filename="server.ts"
  import { serve } from '@hono/node-server';
  import { FLOW_ROUTE, flowHandler, getWorld } from 'durable-harness';
  import { agent } from './lib/agent.js';
  import { withSessionOwnership } from './lib/session-ownership.js';

  const chat = withSessionOwnership({
    createRoute: (authorize) => agent.chatRoute({ authorize }),
    start: () => agent.sessions.start({ config: { traceAudience: 'unknown' } }),
  });
  const flow = flowHandler();

  await getWorld(); // start the World before the first request

  serve({
    port: Number(process.env.PORT ?? 3000),
    fetch(request) {
      const { pathname } = new URL(request.url);
      if (pathname === '/api/chat') return request.method === 'POST' ? chat.POST(request) : chat.GET(request);
      if (pathname === FLOW_ROUTE) return flow(request); // the queue route
      return new Response('Not found', { status: 404 });
    },
  });
  ```
  `await getWorld()` creates the World, consumes the queue in this process, and resumes the sessions a stopped server left mid-turn. Without it, that happens on the first request that reaches an agent.
  > **⚠️ Warning:** In production (`NODE_ENV=production`, which includes every Vercel deployment),
  > a chat route without `authorize` refuses every request with a 401. To serve
  > anyone, pass `authorize: 'public'`. Whoever can use the route runs the agent
  > on your AI Gateway credits.

- ### Run it
  #### Next.js
  ```bash
  next build && next start
  ```
  #### Your own server
  In an ES module project (`"type": "module"` in `package.json`), run it with your `.env` loaded. For example, install [tsx](https://www.npmjs.com/package/tsx) with `npm i -D tsx` and run `node --env-file=.env --import tsx server.ts`, or compile it first.

  You can run several servers on one database: each one consumes the queue, and the World lets one server at a time drive a session.

## Pass a World yourself

Every `durable-harness` factory takes a `world`, so you can create the World in your own code. A World you create is yours to start: register `durable-harness`'s queue on it, start it, and resume the sessions a stopped server left:

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

An agent with its own World takes its queue deliveries through its own `agent.handler`, so mount `agent.handler` instead of `flowHandler()` at the queue route.

## Run more than one server

Every process that starts the World on your database does one of two things before `world.start()`, which re-enqueues every open session:

- **It makes your agents.** It imports the module that creates them and starts the World with `getWorld()`, or with `registerQueue(world)` for a World you pass in, so it runs their turns itself.
- **It forwards the queue.** A process that makes no agents, such as a queue worker of its own or the Workflow SDK's worker, calls `forwardQueue(world)`. It sends `durable-harness`'s queue to your app's queue route, and runs none of it:

```ts {5} filename="worker.ts"
import { createWorld } from '@workflow/world-postgres';
import { forwardQueue } from 'durable-harness';

const world = createWorld(); // reads WORKFLOW_POSTGRES_URL
forwardQueue(world); // before start(), which re-enqueues every open session
await world.start();
```

Set `WORKFLOW_LOCAL_BASE_URL` in the worker to your app's base URL, or `PORT` when the app runs on the same machine. A process that starts the World and does neither sends open sessions to the Workflow SDK's queue route, which refuses them.

- **Mount the queue route where the worker sends it.** Your app serves `flowHandler()` at `/.well-known/durable-harness/v1/flow` (`FLOW_ROUTE`), as the server above does, or `agent.handler` for an agent with its own World. On Next.js without the Workflow SDK, `withDurableHarness` serves it at `/.well-known/workflow/v1/flow`, so pass that path: `forwardQueue(world, { route: '/.well-known/workflow/v1/flow' })`. For a path of your own, pass `{ route }`, or set `DURABLE_HARNESS_FLOW_ROUTE` in both processes.
- **A worker can start before your app.** Its deliveries fail and are retried, so open sessions resume late, once the app is back.
- **Protect the queue route.** The Postgres World doesn't authenticate its deliveries. Restrict the route at your network edge, such as a reverse proxy or firewall, and leave `/.well-known/durable-harness/` out of middleware matchers.
- **One server drives a session at a time.** When a second server starts driving a session, the World refuses the first one's next write, so the first one stops.

## Each harness on another World

### Pi

`durable-harness/pi-durable` uses the environment's World, as above. To pass your own, give it to both `resumeWith` and `openWorldStorage`. `durable-harness/pi` works as above:

```ts {5,7}
import { createWorld } from '@workflow/world-postgres';
import { openWorldStorage, resumeWith } from 'durable-harness/pi-durable';

export const world = createWorld({ connectionString: process.env.WORKFLOW_POSTGRES_URL! });
export const open = resumeWith((storage: Storage) => Harness.open(storage, { models, registry }, ctx), { world });

const storage = await openWorldStorage(sessionId, { world });
```

### Claude Code, Codex, and OpenCode

OpenCode works as above. Its own tools work only on a virtual workspace or a Vercel Sandbox, never on your server's disk. Claude Code and Codex run only in a Vercel Sandbox, on your own server too: your server drives the turn and writes the session's log, and the CLI runs in a Sandbox with the session's files on a Drive. Give `sandbox()` a Vercel access token and the team and project its Sandboxes belong to, as the [Claude Code guide](/docs/agent-harnesses/claude-code#self-host-on-another-world) shows. See [Security](/docs/agent-harnesses/security#why-claude-code-and-codex-run-only-in-a-sandbox).

### fx

libfx chooses where sessions live by itself: Vercel's World on Vercel, and files in `FX_SESSIONS_DIR`, by default `$TMPDIR/libfx/sessions`, in Node.js elsewhere. It doesn't read `WORKFLOW_TARGET_WORLD`. To keep sessions in another World, pass it to `world()` from `libfx/durable-world`:

```ts {7,13} filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { world } from 'libfx/durable-world';
import { createWorld } from '@workflow/world-postgres';
import { tools } from './tools';

// libfx's own queue topics and jobs, apart from the rest of the app.
const sessions = createWorld({ connectionString: process.env.WORKFLOW_POSTGRES_URL!, namespace: 'libfx', jobPrefix: 'libfx_' });
await sessions.start();

export const agent = createFxAgent({
  model: 'anthropic/claude-sonnet-5.5',
  tools,
  durability: world(sessions, { queueDurable: true }),
});
```

libfx never starts or closes a World you pass in, so start it before the agent's first prompt, and close it after `agent.close()`. The Postgres World delivers to the agent in its process. For a World that delivers over HTTP, mount `agent.wakeHandler()` where it delivers.

### eve

eve selects its World in `agent.ts`. See [Self-host eve](https://eve.dev/docs/guides/deployment/self-hosting).

## Limitations

- Give each app its own database or data directory, and its own worker. A server that starts resumes every open session it finds, so apps that share one would run each other's sessions with their own agents. A separate `WORKFLOW_POSTGRES_JOB_PREFIX` doesn't keep two apps apart.
- The Postgres World is a reference implementation. It doesn't authenticate its routes or encrypt its data, and it isn't tuned for scale. Read [its documentation](https://workflow-sdk.dev/worlds/postgres) before you run it in production.
- The Postgres World runs its queue worker in a long-lived process, so it doesn't run in Vercel Functions. On Vercel, use Vercel's World.

## More resources

- [Workflow SDK Worlds](https://workflow-sdk.dev/worlds)
- [Postgres World](https://workflow-sdk.dev/worlds/postgres)
- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [`libfx` on npm](https://www.npmjs.com/package/libfx)


---

[View full sitemap](/docs/sitemap)
