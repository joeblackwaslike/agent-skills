---
title: Tools, Files, and Documents in Durable Agent Harnesses
product: vercel
url: /docs/agent-harnesses/tools
canonical_url: "https://vercel.com/docs/agent-harnesses/tools"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/agent-harnesses/pi
  - /docs/agent-harnesses/claude-code
  - /docs/agent-harnesses/codex
  - /docs/agent-harnesses/opencode
  - /docs/agent-harnesses/security
summary: What tools do when a durable agent harness resumes after a crash, where its files live, and how to keep typed state with a session.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/tools.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "412e8988c22f16c0ab4e836bb97b77fcc0e7447802391552bd8ca450308759b8"
---

# Tools, Files, and Documents in Durable Agent Harnesses

A durable harness keeps each session in a log: the conversation and every model call and tool call. This page covers what tools do after a crash, where an agent's files live, and how to keep typed state with a session. It applies to the `durable-harness` guides: [Pi](/docs/agent-harnesses/pi), [Claude Code](/docs/agent-harnesses/claude-code), [Codex](/docs/agent-harnesses/codex), and [OpenCode](/docs/agent-harnesses/opencode).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Pi](https://ai-sdk.dev/providers/ai-sdk-harnesses/pi) — Learn how to use the Pi harness adapter.
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Self-Hosting Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/self-hosting) — Keep durable agent harness sessions in another World, such as Postgres, and run Pi, Claude Code, Codex, OpenCode, and fx
- [eve](https://vercel.com/docs/eve) — Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.

Full cross-link map for this page: [/docs/agent-harnesses/tools.graph.md](/docs/agent-harnesses/tools.graph.md)
<!-- /docsgraph:related -->

## What happens to a tool call after a crash

After a crash, the harness reads a finished tool call back from the log and never runs it again. What happens to a call that a crash interrupted depends on the tool's replay rule:

| Rule      | A call that a crash interrupts                                                                                 |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `'safe'`  | It's safe to run again. Pi runs it again. Claude Code, Codex, and OpenCode tell the model it's safe to repeat. |
| `'never'` | It never runs twice. The model is told it may or may not have happened, so it can check before it tries again. |

> **💡 Note:** Make tools replay-safe wherever you can. With `durability: 'on'`, a
> replay-safe call starts without waiting for the log to record it. That's the
> default for `durable-harness/pi`. Claude Code, Codex, and OpenCode default to
> `durability: 'strict'`, which waits for the log before every call, so pass
> `durability: 'on'` to their factory to run ahead too. fx starts idempotent
> calls without waiting. Before a `'never'` call, every harness waits until the
> log has recorded it, so it never runs twice on its own.

## Your own tools

An agent has only the tools you give it. Pass your own as `tools`. Each one is a `HostTool` with a [replay rule](#what-happens-to-a-tool-call-after-a-crash). `durable-harness/pi-durable` takes Pi's `defineTool()` tools instead, as the [Pi guide](/docs/agent-harnesses/pi#tools) shows:

```ts {9,16,22} filename="lib/agent.ts"
import { pi } from 'durable-harness/pi';
import type { HostTool } from 'durable-harness';
import { getOrder, refundOrder } from './orders'; // your own code

const tools: HostTool[] = [
  {
    name: 'get_order',
    description: 'Looks up an order',
    replay: 'safe', // safe to run again after a crash
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    execute: async ({ id }) => JSON.stringify(await getOrder(id)),
  },
  {
    name: 'refund_order',
    description: 'Refunds an order',
    replay: 'never', // never runs twice
    inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
    execute: async ({ id }) => JSON.stringify(await refundOrder(id)),
  },
];

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools });
```

Your tools run in your function, with its environment variables, and the model writes their arguments. Before you write one, read [Your own tools](/docs/agent-harnesses/security#your-own-tools) on the Security page.

## Files

The session is durable, and you choose where the agent's commands and files live. They never run on your function's disk, in its processes, or with its environment, which other sessions on the same instance share. See [Security](/docs/agent-harnesses/security). Give the agent a shell and files in one of three places:

|                         | A virtual workspace                                                             | A virtual workspace, not saved                          | A Vercel Sandbox                                                                                |
| ----------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| Where commands run      | just-bash in your function, on a virtual filesystem                             | The same                                                | A virtual machine for the session                                                               |
| What commands can reach | The workspace only, not your function's files, processes, or environment        | The same                                                | The sandbox and its Drive                                                                       |
| Files after a crash     | Kept in the session's log. A call that a crash interrupts leaves nothing behind | Cleared at the end of every turn, and the model is told | Kept on the Drive. A command that a crash interrupts may have partly run, and the model is told |
| Cost and speed          | Your function's CPU time, and the log events and storage each write adds        | Your function's CPU time                                | Sandbox and Drive usage, and a sandbox start on first use                                       |
| Files are deleted       | With the session's log                                                          | At the end of every turn                                | When you delete the session's Sandbox and Drive. Deleting idle ones is opt-in                   |
| Best for                | Short tasks and small workspaces                                                | Scratch work within a turn                              | Real projects and long-running work                                                             |

Claude Code and Codex run in a Vercel Sandbox, where `builtins: true` turns on their own tools, on the session's Drive. See [Why Claude Code and Codex run only in a Sandbox](/docs/agent-harnesses/security#why-claude-code-and-codex-run-only-in-a-sandbox).

### A Vercel Sandbox with a Drive

For long-running work and real projects, run the agent's tools in the session's own [Vercel Sandbox](/docs/sandbox), with `/workspace` on a [Drive](/docs/sandbox/concepts/drives). The session stays durable in the log, and the files live on the Drive, which outlives every Sandbox and every function. The harness stays in your function, and the Sandbox starts at the first tool call. Install `@vercel/sandbox`, and give the harness's own tools `sandbox()`:

#### pi-durable

```ts {3,10} filename="lib/pi.ts"
import { BACKGROUND_CONTEXT as ctx } from '@earendil-works/chord/context';
import { createRegistry, Harness, type Storage } from '@earendil-works/pi-durable';
import { CodingTools, gatewayModels, GATEWAY_PROVIDER, resumeWith, sandboxEnv } from 'durable-harness/pi-durable';

const models = gatewayModels();
const registry = createRegistry();
registry.install(CodingTools); // Pi's read, write, edit, and bash

export { ctx };
export const agent = { model: { provider: GATEWAY_PROVIDER, modelId: 'anthropic/claude-sonnet-5.5' } };
export const open = resumeWith((storage: Storage) =>
  Harness.open(storage, { models, registry, env: sandboxEnv() }, ctx),
);
```

#### Pi

```ts {1,4} filename="lib/agent.ts"
import { sandbox } from 'durable-harness';
import { createCodingTools, pi } from 'durable-harness/pi';

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools: createCodingTools(sandbox()) });
```

#### fx

```ts {2-3,5} filename="lib/agent.ts"
import { createFxAgent } from 'libfx';
import { sandbox } from 'durable-harness';
import { fxTools } from 'durable-harness/fx';

export const agent = createFxAgent({ model: 'anthropic/claude-sonnet-5.5', tools: fxTools(sandbox()) });
```

#### OpenCode

```ts {1,4} filename="lib/agent.ts"
import { sandbox } from 'durable-harness';
import { opencode } from 'durable-harness/opencode';

export const agent = opencode({ model: 'anthropic/claude-sonnet-5.5', workspace: sandbox() });
```

On Vercel, the Sandbox authenticates with the deployment's [OIDC token](/docs/oidc). On your machine, run `vercel link` and `vercel env pull` first: the Sandbox starts on Vercel, under the linked project. The Drive keeps what a command wrote even if a crash interrupts it, so an interrupted call that changes files never runs again, and the model is told it may have partly run. `sandbox({ ... })` sets the Sandbox's region, network, size, and spend caps, as the [Claude Code guide](/docs/agent-harnesses/claude-code#the-sandbox) lists. A chat route that serves anyone needs more for an agent whose sessions start a Sandbox: see [Chat routes](/docs/agent-harnesses/security#chat-routes).

With `durable-harness/pi` and OpenCode, a turn starts in the chat route's own request, which drives it for up to 60 seconds before the queue route takes over. A command still running at that handover is stopped, not run again, so a long command early in a turn, such as an install or a build, can be cut off. A slow first start of the session's Sandbox can run into the same handover. This is a current limitation of Vercel Queues, and a fix is on the way. Until then, pass `drive: 'queue'` to `agent.chatRoute()` for an agent that runs long commands: the queue route then drives the whole turn, with your plan's [maximum duration](/docs/functions/limitations#max-duration).

### A virtual workspace in the log

For short tasks and small workspaces, `virtual()` keeps the files in the session's log, so they move with the session to any machine. It gives an agent files and a shell without the cost and startup time of a sandbox and a Drive. With `durable-harness/pi`, `createCodingTools(virtual())` gives Pi its own coding tools on it:

```ts {4} filename="lib/agent.ts"
import { virtual } from 'durable-harness';
import { createCodingTools, pi } from 'durable-harness/pi'; // also install just-bash

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools: createCodingTools(virtual()) });
```

The agent gets Pi's `read`, `bash`, `edit`, and `write`, with Pi's names, input schemas, and descriptions, on `/workspace`. Add your own tools to the same array. `bash` runs [just-bash](https://www.npmjs.com/package/just-bash), a bash-compatible shell with coreutils, `grep`, `sed`, `awk`, and `jq`: its commands can't reach your function's files, processes, or environment, and it has no network and no real binaries such as `node` or `python`. Each call that changes files commits the change with its own result, so a crash in the middle of a call leaves nothing behind, and the call runs again. Small files are stored in the log, and larger ones as hash-checked blobs next to it.

These tools aren't for large or long-running work. Every write is an event in the log, a resumed turn reads the history back, and a workspace holds about 500 files.

For a loop of your own, such as an AI SDK agent, `workspaceTools(virtual())` from `durable-harness/tools` gives `bash`, `read_file`, `write_file`, `edit_file`, and `list_files` on the same kind of workspace, and `workspaceInstructions(virtual())` returns text for your agent's instructions that says what the workspace is and how long its files last.

### A virtual workspace, not saved

For scratch work within a turn, `virtual({ durable: false })` gives the same tools on files in memory. Nothing goes to the log, the files are cleared at the end of every turn, and the tools' descriptions tell the model:

```ts {4} filename="lib/agent.ts"
import { virtual } from 'durable-harness';
import { createCodingTools, pi } from 'durable-harness/pi';

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools: createCodingTools(virtual({ durable: false })) });
```

## Documents

A document is typed JSON state that lives in the session's log, such as a todo list, a plan, or a form the agent fills in. Because it's in the log, it's as durable as the conversation: it survives a crash and moves with the session, and a tool's edit commits together with the tool's result, so the state always matches what the agent did. Your app reads it without a database of its own, and your UI can follow it as it changes.

Define a document with a name, a schema version, and its initial value:

```ts {3} filename="lib/todos.ts"
import { defineDoc } from 'durable-harness';

export const Todos = defineDoc<{ items: string[] }>({
  kind: 'app.todos',
  version: 1,
  initial: () => ({ items: [] }),
});
```

### Edit a document in a tool

A tool reads and edits documents through `io.docs`. The edit commits with the call's result, so a call that throws or is cut off by a crash changes nothing:

```ts {10} filename="lib/tools.ts"
import type { HostTool } from 'durable-harness';
import { Todos } from './todos';

export const addTodo: HostTool<{ item: string }> = {
  name: 'add_todo',
  description: 'Adds a todo',
  replay: 'safe',
  inputSchema: { type: 'object', properties: { item: { type: 'string' } }, required: ['item'] },
  async execute({ item }, io) {
    const todos = io.docs!.update(Todos, (draft) => {
      draft.items.push(item);
    });
    return `${todos.items.length} todos`;
  },
};
```

Only the tools you pass can use documents. Claude Code's and Codex's own tools don't see them.

### Read and edit a document from your app

App code, such as a route or a webhook, reads and edits documents through `agent.sessions`:

```ts {4,6}
import { agent } from '@/lib/agent';
import { Todos } from '@/lib/todos';

const { value, revision } = await agent.sessions.doc(sessionId, Todos);

await agent.sessions.updateDoc(sessionId, Todos, (draft) => {
  draft.items.push('Buy milk');
});
```

`updateDoc` applies only on the revision it read. If another edit landed first, it reads the document again and runs your function again. Pass `{ expectRevision }` to throw a `DocConflict` instead.

### Show a document in your UI

List documents in the chat route to stream them to the browser. Each response starts with the current value of each listed document, then sends a `doc` event with the whole value and its `revision` after every change:

```ts {5} filename="app/api/chat/route.ts"
import { agent } from '@/lib/agent';
import { authorize } from '@/lib/auth'; // your own check, as in the chat route step
import { Todos } from '@/lib/todos';

export const { GET, POST } = agent.chatRoute({ authorize, docs: [Todos] });
```

Show the highest `revision` you've seen of each document.

### Let the model read documents

The model doesn't see documents unless you give it tools for them. `docTools()` makes a read tool and an update tool for each document:

```ts {5} filename="lib/agent.ts"
import { pi } from 'durable-harness/pi';
import { docTools } from 'durable-harness/tools';
import { Todos } from './todos';

export const agent = pi({ model: 'anthropic/claude-sonnet-5.5', tools: docTools([Todos]) }); // read_todos, update_todos
```

With `durable-harness/pi`, `promptDocs: [Todos]` also puts the listed documents in the instructions of every model call.

### Limits

- A document holds at most 64 KB of JSON. A write that grows it past that throws `DocTooLarge`.
- To change a document's shape, bump its `version` and give `migrate(value, fromVersion)`, which runs when an older document is read. A document stored at a newer version than your code's throws `DocVersionError`.
- Documents work with `durable-harness/pi`, Claude Code, Codex, and OpenCode. `durable-harness/pi-durable` keeps Pi's own documents.

## More resources

- [Security](/docs/agent-harnesses/security)
- [`durable-harness` on GitHub](https://github.com/vercel-labs/durable-harness)
- [Vercel Sandbox](/docs/sandbox)
- [Drives](/docs/sandbox/concepts/drives)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
