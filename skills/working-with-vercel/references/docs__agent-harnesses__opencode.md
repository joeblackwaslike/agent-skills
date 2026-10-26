---
title: Running OpenCode Durably on Vercel
product: vercel
url: /docs/agent-harnesses/opencode
canonical_url: "https://vercel.com/docs/agent-harnesses/opencode"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses
  - /docs/agent-harnesses/security
  - /docs/queues
  - /docs/functions/limitations
  - /docs/agent-harnesses/tools
summary: Run OpenCode v2 inside a Vercel Function with its session in a durable log, so a crashed turn resumes in a new function.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/opencode.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "93340015ebe7e847f443bcbe80bab13b36cf04d8bb02b7d1f55fa8aebcae9381"
---

# Running OpenCode Durably on Vercel

[OpenCode](https://opencode.ai) v2 keeps every change to a session as an event. `durable-harness` mirrors those events into a durable log, so any function can rebuild the session and continue it. On Vercel, OpenCode runs inside the function that runs the turn. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Running Claude Code Durably on Vercel](https://vercel.com/docs/agent-harnesses/claude-code) — Run Claude Code in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn r
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [Running Codex Durably on Vercel](https://vercel.com/docs/agent-harnesses/codex) — Run Codex in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn resumes
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Running Pi Durably on Vercel](https://vercel.com/docs/agent-harnesses/pi) — Make a Pi agent durable on Vercel so a crashed turn resumes in a new function instead of starting over.

Full cross-link map for this page: [/docs/agent-harnesses/opencode.graph.md](/docs/agent-harnesses/opencode.graph.md)
<!-- /docsgraph:related -->

## Get started

- ### Install the packages
  ```bash package-manager
  npm i durable-harness @opencode/client@2.0.22 @opencode/core@2.0.22 @opencode/schema@2.0.22 @opencode/server@2.0.22
  ```
  `durable-harness` supports one OpenCode version at a time, so install the one it pins, and keep it exact in `package.json`, with no `^`. It checks the installed versions before each turn. You don't install `effect`: OpenCode's packages bring the version they need.

- ### Create the agent
  ```ts {3} filename="lib/agent.ts"
  import { opencode } from 'durable-harness/opencode';

  export const agent = opencode({ model: 'anthropic/claude-sonnet-5.5' });
  ```
  The model must be in the model catalog of the OpenCode version `durable-harness` pins.

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
  > anyone, pass `authorize: 'public'`. With `workspace: sandbox()`, every session
  > starts a Sandbox, so a public route also needs `allowPublicSandbox: true` and a
  > finite `sandbox({ budget: { sessionUsd } })`, which doesn't count OpenCode's
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
        ],
        "includeFiles": "node_modules/{web-tree-sitter,tree-sitter-{bash,powershell}}/*.wasm"
      },
      "api/chat.ts": {
        "includeFiles": "node_modules/{web-tree-sitter,tree-sitter-{bash,powershell}}/*.wasm"
      }
    }
  }
  ```
  The trigger subscribes `api/flow.ts` to the queue. `includeFiles` adds OpenCode's parser files, which Vercel's file tracing doesn't find, to the functions that run turns: the queue route and the chat route. These paths are for npm. `npx durable-harness vercel-json --write` writes these entries into your `vercel.json`, with the paths of your install.
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
  ```ts {11} filename="next.config.ts"
  // Writes the queue route and its trigger, includes OpenCode's parser files
  // in the routes that run turns, and keeps the harness packages out of the
  // server bundle. You don't add a queue route or a vercel.json.
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

Send a message with `"kind": "steer"` while a turn runs to redirect it. OpenCode adds it to the running turn at its next step. From the browser, post it to the chat route:

```ts {4}
await fetch('/api/chat', {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({ sessionId, text: 'Use TypeScript instead', kind: 'steer' }),
});
```

The response streams the turn, like any other message. From server code, such as a webhook, call `agent.sessions.send(sessionId, text, 'steer')`.

## Reconnect to a running turn

If the stream drops, the turn keeps running. Reconnect with `GET /api/chat?sessionId=...&cursor=...`, where the cursor is the last event `id` you read. The stream continues with the next event, with nothing lost or repeated. An `EventSource` on that URL reconnects by itself if its connection drops, and the stream ends with an `end` event when the turn is done:

```ts {1,7}
const source = new EventSource(`/api/chat?sessionId=${sessionId}&cursor=${lastEventId}`);

source.onmessage = (event) => {
  lastEventId = event.lastEventId;
  render(JSON.parse(event.data)); // your own UI
};
source.addEventListener('end', () => source.close());
```

If a crash cut off the turn, the turn resumes and the model starts its reply over. Before the new reply, the stream sends a `{ type: 'restart', text }` event: show its `text` in place of the turn's text so far, then append what streams after it.

## Run more than one agent

An app can make several agents, each with its own chat route. The queue route serves them all. Two agents of the same harness need a `name` each:

```ts {3-4} filename="lib/agents.ts"
import { opencode } from 'durable-harness/opencode';

export const reviewer = opencode({ name: 'reviewer', model: 'anthropic/claude-opus-5.5' });
export const fixer = opencode({ name: 'fixer', model: 'anthropic/claude-sonnet-5.5' });
```

Keep each name stable, because sessions that already started carry it. Two agents with the same name throw when their module loads, so the build fails.

## Tools

OpenCode starts with no tools: the model can call only the tools you pass in `tools`. To give it OpenCode's own shell, read, write, edit, patch, glob, and grep, pass a `workspace`. They run OpenCode's own code on the workspace, never on your function's disk or in its processes, which other sessions on the instance share:

#### Virtual workspace

```bash package-manager
npm i just-bash
```

```ts {1,4} filename="lib/agent.ts"
import { virtual } from 'durable-harness';
import { opencode } from 'durable-harness/opencode';

export const agent = opencode({ model: 'anthropic/claude-sonnet-5.5', workspace: virtual() });
```

The tools run on a [virtual workspace](/docs/agent-harnesses/tools#a-virtual-workspace-in-the-log) in your function, where commands can't reach the function's files, processes, or environment. Each call's file changes commit with its result in the session's log, so the files follow the session to any function, and a call that a crash interrupts changed nothing.

#### Vercel Sandbox

```bash package-manager
npm i @vercel/sandbox
```

```ts {1,4} filename="lib/agent.ts"
import { sandbox } from 'durable-harness';
import { opencode } from 'durable-harness/opencode';

export const agent = opencode({ model: 'anthropic/claude-sonnet-5.5', workspace: sandbox() });
```

The tools run in the session's own [Vercel Sandbox](/docs/sandbox), with its files on a [Drive](/docs/sandbox/concepts/drives) at `/workspace` that lasts across turns. OpenCode itself stays in your function, and the Sandbox starts at the first tool call. A call that changes files or runs a command never runs twice: if a crash interrupts it, the model is told it may have partly run. On your machine, run `vercel link` and `vercel env pull` first: the Sandbox starts on Vercel, under the linked project. A long command early in a turn can be cut off: see [A Vercel Sandbox with a Drive](/docs/agent-harnesses/tools#a-vercel-sandbox-with-a-drive).

To give it only some of OpenCode's tools, pass `builtins`, as in `builtins: ['read', 'grep']`. Pass tools you write in `tools`, next to them. See [Tools, files, and documents](/docs/agent-harnesses/tools) and [Security](/docs/agent-harnesses/security).

## What happens when a function crashes

If the function running a turn fails with an error, another function resumes the turn right away. If it disappears without a trace, for example when it runs out of memory, the queue redelivers the turn once its message lease runs out, and the turn resumes from the log.

## Self-host on another World

On Vercel, sessions live in Vercel's World, and on your machine in `.workflow-data`. To keep them in another [World](https://workflow-sdk.dev/worlds), such as Postgres on your own servers, install it and set `WORKFLOW_TARGET_WORLD`:

```bash filename=".env"
WORKFLOW_TARGET_WORLD="@workflow/world-postgres"
WORKFLOW_POSTGRES_URL="postgres://user:password@host:5432/database"
```

To use a World you create, pass it as `opencode({ model, world })`, and start it yourself, as [Pass a World yourself](/docs/agent-harnesses/self-hosting#pass-a-world-yourself) shows.

For the tables, the server, and recovery at startup, see [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting).

## Limitations

- A running OpenCode session uses a lot of memory, so give the functions that run turns enough of it.
- OpenCode needs `effect` 4.0.0-rc.112, so an app that already depends on another version of `effect` can't use it yet.
- With other versions of OpenCode's packages or `effect`, a turn fails with a message that names the versions to install. The session is kept, and the next message works once they're installed.

## More resources

- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [OpenCode](https://opencode.ai)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
