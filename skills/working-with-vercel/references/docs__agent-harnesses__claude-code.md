---
title: Running Claude Code Durably on Vercel
product: vercel
url: /docs/agent-harnesses/claude-code
canonical_url: "https://vercel.com/docs/agent-harnesses/claude-code"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses/security
  - /docs/sandbox
  - /docs/agent-harnesses
  - /docs/queues
  - /docs/functions/limitations
summary: Run Claude Code in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn resumes on a new function.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/claude-code.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8880f2522309e4402750eee31fbae92157092a340008866cab992ce14f665ee2"
---

# Running Claude Code Durably on Vercel

> **⚠️ Warning:** Claude Code support is experimental. Claude Code isn't built to be safe for
> multiple tenants: it's a command-line tool for one user, it keeps its state on
> disk, and its built-in tools run commands and change files on the machine it
> runs on. So `durable-harness` currently runs it only in a Vercel Sandbox. See
> [Security](/docs/agent-harnesses/security#why-claude-code-and-codex-run-only-in-a-sandbox).

Each session of [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) gets its own [Vercel Sandbox](/docs/sandbox), and Claude Code runs only there:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Sandbox to run Claude’s Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk) — Learn how to deploy Claude's Agent SDK in Vercel Sandbox for secure and isolated execution of AI-powered code generation
- [Running Codex Durably on Vercel](https://vercel.com/docs/agent-harnesses/codex) — Run Codex in a Vercel Sandbox, driven by a Vercel Function, with its session in a durable log, so a crashed turn resumes
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Running OpenCode Durably on Vercel](https://vercel.com/docs/agent-harnesses/opencode) — Run OpenCode v2 inside a Vercel Function with its session in a durable log, so a crashed turn resumes in a new function.
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Running Pi Durably on Vercel](https://vercel.com/docs/agent-harnesses/pi) — Make a Pi agent durable on Vercel so a crashed turn resumes in a new function instead of starting over.

Full cross-link map for this page: [/docs/agent-harnesses/claude-code.graph.md](/docs/agent-harnesses/claude-code.graph.md)
<!-- /docsgraph:related -->

- **In the Sandbox:** Claude Code itself: the `claude` CLI, its agent loop, any built-in tools you turn on, and the session's files in `/workspace`.
- **In your function:** none of Claude Code. Your function only drives it: the Claude Agent SDK sends the CLI its messages and reads what it streams back. Your function also sends the CLI's model calls to AI Gateway, runs your own tools, and writes the session's durable log.

The Sandbox holds no secrets. A crashed turn resumes on a new function, and if the Sandbox is gone, on a new one with the same files. To learn how durability works, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

## Get started

- ### Install the packages
  ```bash package-manager
  npm i durable-harness @anthropic-ai/claude-agent-sdk@0.3.296 @vercel/sandbox zod
  ```
  `durable-harness` supports one Agent SDK version at a time, so install the one it pins, and keep it exact in `package.json`, with no `^`. With another version, a turn fails with the version to install, and the session is kept.

- ### Create the agent
  ```ts {3} filename="lib/agent.ts"
  import { claudeCode } from 'durable-harness/claude-code';

  export const agent = claudeCode({ model: 'anthropic/claude-sonnet-5.5' });
  ```
  `claudeCode()` runs Claude Code in a Vercel Sandbox by default, so you don't pass anything to get one. A session's Sandbox starts with its first turn. Model calls go through AI Gateway with the deployment's OIDC token, so you don't need an Anthropic API key.

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
  > a chat route without `authorize` refuses every request with a 401. Every
  > session starts a Sandbox, so to serve anyone, pass `authorize: 'public'` with
  > `allowPublicSandbox: true`, and cap each session's model spend with
  > `sandbox({ budget: { sessionUsd } })`. Whoever can use the route runs the
  > agent on your AI Gateway credits. See
  > [Security](/docs/agent-harnesses/security#chat-routes).
  POST `{ "text": "..." }` to start a session, and read its ID from the `x-session-id` header. Send `{ "sessionId": "...", "text": "..." }` for the next message. To redirect a running turn or reconnect to one, see [Steer a running turn](#steer-a-running-turn) and [Reconnect to a running turn](#reconnect-to-a-running-turn).

- ### Add the queue route
  [Vercel Queues](/docs/queues) delivers each turn to a queue route: a function that drives the turn, with your plan's [maximum duration](/docs/functions/limitations#max-duration), while Claude Code runs in the session's Sandbox. Set it up in `vercel.json`, or let `durable-harness` write the same settings with `harnessFunctions()` in `vercel.ts` or with `withDurableHarness` on Next.js:
  #### vercel.json
  ```ts {3,6} filename="api/flow.ts"
  // A Vercel Function in your api directory. It imports the module that
  // makes your agent, so it can drive the agent's turns.
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
  // makes your agent, so it can drive the agent's turns.
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
  The Sandbox image is built once per project, when the first session starts. To build it ahead of time, run `npx durable-harness sandbox prepare`.

  On your machine, run `vercel link` first. `next dev` (or `vercel dev` for other frameworks) then starts each session's Sandbox on Vercel, since there's no local Sandbox. It keeps sessions in `.workflow-data`, so add that to `.gitignore`. On its first request, it resumes the sessions a stopped server left mid-turn.

## Steer a running turn

Send a message with `"kind": "steer"` while a turn runs to redirect it. Claude Code takes it at its next step, after the tool or model call that is running. From the browser, post it to the chat route:

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

## Run more than one agent

An app can make several agents, each with its own chat route. The queue route serves them all. Two agents of the same harness need a `name` each:

```ts {3-4} filename="lib/agents.ts"
import { claudeCode } from 'durable-harness/claude-code';

export const reviewer = claudeCode({ name: 'reviewer', model: 'anthropic/claude-opus-5.5' });
export const fixer = claudeCode({ name: 'fixer', model: 'anthropic/claude-sonnet-5.5' });
```

Keep each name stable, because sessions that already started carry it. Two agents with the same name throw when their module loads, so the build fails.

## Tools

Claude Code starts with no tools: the model can call only the tools you pass in `tools`, and those run in your function, not in the Sandbox. To write them, see [Tools, files, and documents](/docs/agent-harnesses/tools).

To turn on Claude Code's own tools, pass `builtins: true`. They run in the Sandbox, on the session's files in `/workspace`:

```ts {5} filename="lib/agent.ts"
import { claudeCode } from 'durable-harness/claude-code';

export const agent = claudeCode({
  model: 'anthropic/claude-sonnet-5.5',
  builtins: true,
});
```

`true` turns on Bash, Read, Edit, Write, NotebookEdit, and WebFetch. To turn on fewer, list them, as in `builtins: ['Read', 'Edit']`. Each call is in the session's log before it runs, and none runs again after a crash: the model is told which calls finished and which a crash interrupted. See [Security](/docs/agent-harnesses/security).

## The Sandbox

Each session's `/workspace` is on a [Drive](/docs/sandbox/concepts/drives) that outlives the session's Sandbox, so a session that moves to a new Sandbox keeps its files.

A session's Drive lasts until you delete it: close the session with `agent.sessions.close(sessionId)`, then call `deleteSessionSandbox(sessionId)` from `durable-harness/sandbox`, for example when your user deletes the session. To also delete the Drives of sessions that have been idle for a number of days, call `sandboxCleanup({ idleDays })` from a [cron job](/docs/cron-jobs).

To configure the Sandbox, pass `workspace: sandbox({ ... })`:

```ts {2,6-9} filename="lib/agent.ts"
import { claudeCode } from 'durable-harness/claude-code';
import { sandbox } from 'durable-harness/sandbox';

export const agent = claudeCode({
  model: 'anthropic/claude-sonnet-5.5',
  workspace: sandbox({
    region: 'iad1',
    network: 'deny-all',
  }),
});
```

With `network: 'deny-all'`, the Sandbox can't reach the internet. Claude Code still works, since your function makes its model calls.

| Option | Default | What it sets |
| --- | --- | --- |
| `region` | Your function's region if Sandbox runs there, else `iad1` | Where the Sandbox and its Drive run. An existing Drive keeps its region |
| `vcpus` | `2` | `1`, `2`, `4`, or `8` vCPUs |
| `network` | `'allow-all'` | `'deny-all'`, or `{ allow: [...] }` with the hosts commands can reach |
| `env` | None | Environment variables for commands. The model can read them, so pass none that's secret |
| `idleMs` | 5 minutes | How long the Sandbox stays up after a turn |
| `commandTimeoutMs` | 10 minutes | The longest a command can run |
| `driveSize` | 10 GiB | The Drive's size in bytes, from 1 GiB to 16 TiB. Storage is billed by the bytes used, so this caps a session's storage. An existing Drive keeps its size |
| `budget` | 4 hours of Sandbox time, no spend cap | `{ turnUsd, sessionUsd, vmSeconds }`, per turn and per session |

A turn starts in the chat route's own request, which drives it for up to 60 seconds before the queue route takes over. A command still running at that handover is stopped, not run again, so a long command early in a turn, such as an install or a build, can be cut off. A slow first start of the session's Sandbox can run into the same handover. This is a current limitation of Vercel Queues, and a fix is on the way. Until then, pass `drive: 'queue'` to `agent.chatRoute()` for an agent that runs long commands: the queue route then drives the whole turn, with your plan's [maximum duration](/docs/functions/limitations#max-duration).

## What happens when a function crashes

If the function running a turn fails with an error, another function resumes the turn right away. If it disappears without a trace, for example when it runs out of memory, the queue redelivers the turn once its message lease runs out, and the turn resumes from the log. When the function driving the turn goes away, the Sandbox stops the CLI, and the next function resumes the turn on the same Sandbox or on a new one with the same Drive.

## Self-host on another World

On Vercel, sessions live in Vercel's World, and on your machine in `.workflow-data`. To keep them in another [World](https://workflow-sdk.dev/worlds), such as Postgres on your own servers, install it and set `WORKFLOW_TARGET_WORLD`:

```bash filename=".env"
WORKFLOW_TARGET_WORLD="@workflow/world-postgres"
WORKFLOW_POSTGRES_URL="postgres://user:password@host:5432/database"
```

To use a World you create, pass it as `claudeCode({ model, world })`, and start it yourself, as [Pass a World yourself](/docs/agent-harnesses/self-hosting#pass-a-world-yourself) shows.

For the tables, the server, and recovery at startup, see [Self-hosting durable agent harnesses](/docs/agent-harnesses/self-hosting).

On your own server, `vercel.json` and `vercel.ts` don't apply, and your server mounts the queue route itself. Your server drives each turn, and Claude Code still runs in a Vercel Sandbox. Give `sandbox()` a [Vercel access token](/docs/rest-api#creating-an-access-token) and the team and project its Sandboxes belong to. The token stays on your server and never reaches the Sandbox:

```ts {7-11} filename="lib/agent.ts"
import { claudeCode } from 'durable-harness/claude-code';
import { sandbox } from 'durable-harness/sandbox';

export const agent = claudeCode({
  model: 'anthropic/claude-sonnet-5.5',
  workspace: sandbox({
    credentials: {
      token: process.env.VERCEL_TOKEN!,
      teamId: process.env.VERCEL_TEAM_ID!,
      projectId: process.env.VERCEL_PROJECT_ID!,
    },
  }),
});
```

## Limitations

- `durable-harness` supports only the Agent SDK version it pins, and fails a turn if you installed another. Claude Code's transcript format is internal to the CLI, so the version moves only with a `durable-harness` release.
- Provider-hosted tools, such as the model provider's web search, are off unless you list them in `providerTools`. They reach the internet from the provider, whatever the Sandbox's network allows.
- A Sandbox session can't run past your plan's [maximum session duration](/docs/sandbox/pricing#runtime-limits). Before it would, `durable-harness` replaces the Sandbox between turns, keeping the Drive.
- Every session starts a Sandbox, even with no tools. Sandbox time and Drive storage are billed, as [Sandbox pricing](/docs/sandbox/pricing) shows.
- The Sandbox allows all outbound traffic by default. To restrict it, pass `network: 'deny-all'` or `{ allow: [...] }` to `sandbox()`. See [Security](/docs/agent-harnesses/security#what-these-controls-dont-cover).
- The Agent SDK runs in your function, so it needs the Node.js runtime. It can't run in the Edge runtime or a browser.

## More resources

- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [Claude Agent SDK](https://docs.claude.com/en/docs/agent-sdk/overview)
- [Vercel Sandbox](/docs/sandbox)


---

[View full sitemap](/docs/sitemap)
