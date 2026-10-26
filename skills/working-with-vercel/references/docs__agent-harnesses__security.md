---
title: Security for Durable Agent Harnesses
product: vercel
url: /docs/agent-harnesses/security
canonical_url: "https://vercel.com/docs/agent-harnesses/security"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/agent-harnesses
related:
  - /docs/fluid-compute
  - /docs/sandbox
  - /docs/oidc
  - /docs/agent-harnesses/pi
  - /docs/agent-harnesses/fx
summary: What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, and how to write tools that a...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent-harnesses/security.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "beb5a9475230e926eff397ad4477562f51db8c0d6f60653c54703c7d3d32848a"
---

# Security for Durable Agent Harnesses

An agent harness runs what a model decides. On Vercel, the harness runs in your function, and with [Fluid compute](/docs/fluid-compute) one instance serves many requests at once, including turns of other sessions and other users. This page covers what may run in your function, where everything else runs, and how to write tools that a model calls safely. It applies to every harness in these guides.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Making every harness durable](https://vercel.com/blog/making-every-harness-durable)
- [Using TanStack AI with Vercel Sandbox](https://vercel.com/kb/guide/tanstack-ai-vercel-sandbox) — Run coding agents in isolated Vercel Sandbox microVMs with the @tanstack/ai-sandbox-vercel provider, with durable resume
- [Security Model](https://eve.dev/docs/concepts/security-model) — eve's trust boundaries, where secrets live, how credentials reach hosts, and what fails closed by default.
- [UI](https://ai-sdk.dev/docs/ai-sdk-harnesses/ui) — Use AI SDK harnesses with useChat.
- [Agent Harnesses You Can Run Durably on Vercel](https://vercel.com/docs/agent-harnesses/harnesses) — Guides for running Pi, fx, OpenCode, eve, Claude Code, and Codex durably on Vercel, so a crash or a timeout resumes the
- [Self-Hosting Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/self-hosting) — Keep durable agent harness sessions in another World, such as Postgres, and run Pi, Claude Code, Codex, OpenCode, and fx
- [Coding Agents and Chat Platforms with AI Gateway](https://vercel.com/docs/ai-gateway/coding-agents) — Connect coding agents and chat platforms to AI Gateway. Configure Claude Code, Codex, Chatbox, Open WebUI, and more.

Full cross-link map for this page: [/docs/agent-harnesses/security.graph.md](/docs/agent-harnesses/security.graph.md)
<!-- /docsgraph:related -->

## The rule

Your function runs only code you wrote. The model chooses arguments, never code that runs in your function. Commands and files that the model picks run in a virtual workspace or a [Vercel Sandbox](/docs/sandbox), never on your function's disk, in its processes, or with its environment.

A tool that runs a real shell or uses the real disk in your function would let one session's model read another session's files, and your function's environment variables, such as `AI_GATEWAY_API_KEY` and the deployment's [OIDC token](/docs/oidc). A prompt injection in a web page, a file, or a message can steer a model to try.

## Where each harness runs

| Harness                                          | Runs in               | Commands and files                                                       |
| ------------------------------------------------ | --------------------- | ------------------------------------------------------------------------ |
| [Pi](/docs/agent-harnesses/pi), both variants    | Your function         | Your own tools, a virtual workspace, or a Vercel Sandbox                 |
| [fx](/docs/agent-harnesses/fx)                   | Your function         | Your own tools, a virtual workspace, or a Vercel Sandbox                 |
| [OpenCode](/docs/agent-harnesses/opencode)       | Your function         | Your own tools, a virtual workspace, or a Vercel Sandbox                 |
| [Claude Code](/docs/agent-harnesses/claude-code) | A Vercel Sandbox only | Your own tools, or its own with `builtins: true`, on the session's Drive |
| [Codex](/docs/agent-harnesses/codex)             | A Vercel Sandbox only | Your own tools, or its own with `builtins: true`, on the session's Drive |

Every harness starts with no tools, so an agent can do only what you give it. For eve, see the [eve documentation](/docs/eve).

### Why Claude Code and Codex run only in a Sandbox

Pi, fx, and OpenCode are libraries built to serve many sessions in one process. OpenCode ships an embedded server and a profile that replaces its process spawner and its access to the host's files, and `durable-harness` replaces them the same way. Claude Code and Codex are command-line tools built for one user, and they keep their state on disk. Today's versions can be kept apart, but they ship often, and nothing promises that the next version won't keep state that one session leaves behind for another.

So Claude Code and Codex run only in a Vercel Sandbox, one per session, where their own tools, once you turn them on with `builtins: true`, work on the session's [Drive](/docs/sandbox/concepts/drives). `durable-harness` refuses to run them anywhere else, including in a function or on a server of your own.

### What runs in the Sandbox

The Sandbox holds no secrets: no World credential, no AI Gateway key, and no OIDC token. Your function still drives the turn and writes the session's log:

- **Your function makes the model calls.** The CLI's requests go to your function, which sends them to AI Gateway with your deployment's credentials.
- **Your app reads the log.** Your app's browser streams the turn from the session's log, as it does for every harness, so a new Sandbox doesn't interrupt it.
- **Only your function reaches the CLI.** The Sandbox's port accepts a connection only with a token your function arms for each attach.
- **Sandbox time has a cap.** A session's Sandbox runs for at most 4 hours by default. Model spend has no cap unless you set one with `sandbox({ budget })`, per turn or per session.
- **Files live on the Drive.** A session that moves to a new Sandbox keeps its files and resumes its conversation. The Drive isn't transactional: a command that a crash interrupts may have partly run, and the model is told.

> **💡 Note:** With Vercel Sandbox, set `AI_GATEWAY_API_KEY` to a key that can only call
> AI Gateway. Without it, your function authenticates model calls with the
> project's OIDC token, which also opens the session's World and the Sandbox
> API.

## Your own tools

A tool you write, a `HostTool`, runs in your function, with its environment variables and its access to your systems. Your tool's code is trusted. Its arguments aren't: the model writes them, and a prompt injection can steer them.

- **Validate every argument** against what the tool allows. A JSON schema tells the model what to send, but it doesn't stop it from sending something else.
- **Authorize from the session, never from an argument.** Find the session's user from your own records, not from an argument such as `userId`.
- **Keep arguments out of a shell, `eval`, and file paths.** To give the model a shell or files, use a [virtual workspace or a Sandbox](/docs/agent-harnesses/tools#files). Don't give a harness a tool or environment that spawns a process or touches the real disk in your function, such as Pi's `NodeExecutionEnv`.
- **Be careful what a result returns.** It reaches the model, the person using the session (it streams to their browser), the session's log, and the session's trace in [Agent Runs](/docs/agent-harnesses/observability). With Claude Code and Codex, it also reaches the session's Sandbox, where the CLI keeps its transcript and the model's commands can read it.
- **Make side effects run once.** For a tool that changes something, such as a refund or an email, use `replay: 'never'`, so a call never runs again after a crash, and pass the system it calls an idempotency key, so a call the model repeats doesn't repeat the effect.

This tool checks that the order belongs to the session's user before it returns anything, and returns only the fields the model needs:

```ts {10-11,13} filename="lib/tools.ts"
import type { HostTool } from 'durable-harness';
import { getOrder, ownerOfSession } from './orders'; // your own code

export const getOrderTool: HostTool<{ id: string }> = {
  name: 'get_order',
  description: "Looks up one of the signed-in user's orders",
  replay: 'safe',
  inputSchema: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
  async execute({ id }, io) {
    const userId = await ownerOfSession(io.ctx.runId); // from your records, not the arguments
    const order = typeof id === 'string' ? await getOrder(id) : undefined;
    if (!order || order.userId !== userId) return 'No order with that ID.';
    return JSON.stringify({ id: order.id, status: order.status }); // only what the model needs
  },
};
```

## Commands and files the model picks

Give the model a shell and files in one of two places. [Files](/docs/agent-harnesses/tools#files) compares them:

- **A virtual workspace** runs [just-bash](https://www.npmjs.com/package/just-bash) on a virtual filesystem in your function. Its commands can't reach your function's files, processes, or environment. It isn't a virtual machine, so give work that needs one, such as installing packages or running a build, a Sandbox.
- **A Vercel Sandbox** is a virtual machine for the session, with its files on a Drive. Its commands run apart from your function and from every other session.

## What these controls don't cover

- **A Sandbox allows all outbound traffic by default.** A prompt-injected model can send its own session's files to the internet. To block it, pass `network: 'deny-all'` to `sandbox()`, or allow only the hosts your agent needs with `network: { allow: ['registry.npmjs.org'] }`.
- **Codex can fall back to full access in its Sandbox.** With `builtins: true`, Codex runs commands under its own sandbox inside the Sandbox when it can start one. When it can't, its commands run with full access to the Sandbox. The Sandbox still holds no secrets, but the model's commands can then make model calls through your function directly, on your AI Gateway credits, within any `budget` you set.
- **Provider-hosted tools ignore the Sandbox's network.** Tools that the model provider runs, such as web search, reach the internet from the provider, whatever the Sandbox allows.
- **Images in your UI are a channel too.** If your UI renders a remote image from model output, such as a markdown image, the browser requests a URL the model chose, without a click. Render no remote images from model output, or load them on click.
- **Settings you pass are visible to the model.** Every environment variable you give a Sandbox can be read by the model's commands, so pass none that's secret.

## Chat routes

Whoever can use a chat route runs your agent, on your AI Gateway credits. In production (`NODE_ENV=production`, which includes every Vercel deployment), a chat route without `authorize` refuses every request with a 401. `authorize` checks that the caller may use the session. `authorize: 'public'` serves anyone, so pass it only for an agent whose tools anyone may use.

Every session of Claude Code or Codex starts a Sandbox, and so does every session of Pi or OpenCode whose tools run in one, so anyone who can use a public route can make you pay for Sandboxes. For an agent whose sessions start a Sandbox, `authorize: 'public'` also needs `allowPublicSandbox: true` and a finite `sandbox({ budget: { sessionUsd } })`. Without them, the route throws when it's created. Each session checks again before its Sandbox starts, so a route built some other way can't skip the check. pi-durable's `chatRoute` takes the same options, and checks them before each session's Sandbox starts.

`sessionUsd` caps model spend only for Claude Code and Codex, whose model calls go through `durable-harness`. Pi's and OpenCode's model calls run in your function, so `sessionUsd` doesn't count them: cap each session's Sandbox time with `sandbox({ budget: { vmSeconds } })`, and limit model spend in your `authorize`, or with an [AI Gateway budget](/docs/ai-gateway/observability-and-spend/budgets) on the project.

An fx agent's chat route is your own, so with `fxTools(sandbox())`, check who's calling yourself. Its model calls are libfx's own, so `sessionUsd` doesn't count them: cap each session's Sandbox time with `sandbox({ budget: { vmSeconds } })`.

### Check session ownership

Signing in doesn't grant access to every session. The chat routes in these guides use `withSessionOwnership` to authenticate each request, save a new session's owner before submitting its first message, and reject requests for sessions owned by someone else. It accepts `POST { "text": "..." }` for a new session and preserves the chat route's streaming response and `x-session-id` header.

Add this helper to `lib/session-ownership.ts`. Implement `getUser`, `ownsSession`, and `saveSession` in your app's `lib/auth.ts`: `getUser(request)` returns the authenticated user or no user, `saveSession(user, sessionId)` persists ownership, and `ownsSession(user, sessionId)` checks that record. Use persistent storage shared by all your app's instances, and derive the user from authentication, never from the request body:

```ts filename="lib/session-ownership.ts"
import type { ChatAuthorize, ChatRoute } from 'durable-harness';
import { getUser, ownsSession, saveSession } from './auth';

export function withSessionOwnership({ createRoute, start }: {
  createRoute: (authorize: ChatAuthorize) => ChatRoute;
  start: () => Promise<{ sessionId: string }>;
}): ChatRoute {
  const chat = createRoute(async (request, sessionId) => {
    const user = await getUser(request);
    if (!user) throw new Response('Unauthorized', { status: 401 });
    if (!sessionId || !(await ownsSession(user, sessionId))) {
      throw new Response('Not found', { status: 404 });
    }
  });

  return {
    GET: chat.GET,
    async POST(request) {
      const user = await getUser(request);
      if (!user) return new Response('Unauthorized', { status: 401 });

      let input: unknown;
      try {
        input = await request.json();
      } catch {
        return new Response('Expected a JSON body', { status: 400 });
      }
      if (!input || typeof input !== 'object' || Array.isArray(input)) {
        return new Response('Expected a JSON object', { status: 400 });
      }
      const body = input as Record<string, unknown>;
      if (typeof body.text !== 'string' || !body.text) {
        return new Response('text is required', { status: 400 });
      }
      if (body.sessionId !== undefined && typeof body.sessionId !== 'string') {
        return new Response('sessionId must be a string', { status: 400 });
      }
      if (body.kind !== undefined && (
        typeof body.kind !== 'string' ||
        !['prompt', 'steer', 'followUp'].includes(body.kind)
      )) {
        return new Response('Invalid message kind', { status: 400 });
      }
      if (body.requestId !== undefined && typeof body.requestId !== 'string') {
        return new Response('requestId must be a string', { status: 400 });
      }

      if (body.sessionId === undefined) {
        const { sessionId } = await start();
        await saveSession(user, sessionId);
        body.sessionId = sessionId;
      }

      const headers = new Headers(request.headers);
      headers.set('content-type', 'application/json');
      headers.delete('content-length');
      return chat.POST(new Request(request.url, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
        signal: request.signal,
      }));
    },
  };
}
```

`start()` must create an empty session without submitting a prompt or opening the Harness. If saving ownership fails, the helper doesn't submit the message. Authentication remains required during local development. For a custom World or a named Pi setup, use the same World and name when creating the session and the chat route.

## More resources

- [Tools, files, and documents](/docs/agent-harnesses/tools)
- [Vercel Sandbox](/docs/sandbox)
- [Fluid compute](/docs/fluid-compute)
- [just-bash](https://www.npmjs.com/package/just-bash)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
