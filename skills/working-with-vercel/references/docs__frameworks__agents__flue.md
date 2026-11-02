---
title: Flue with Vercel
product: vercel
url: /docs/frameworks/agents/flue
canonical_url: "https://vercel.com/docs/frameworks/agents/flue"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/frameworks/agents
  - /docs/frameworks
related:
  - /docs/ai-gateway
  - /docs/sandbox
  - /docs/accounts
  - /docs/ai-gateway/authentication-and-byok/authentication
  - /docs/ai-gateway/observability-and-spend/observability
summary: Create a Flue agent that uses Vercel AI Gateway for model requests, then add Vercel Sandbox for isolated code execution.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/agents/flue.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "9d39dcaec47af88dc6e35b0a6fd4ca6904e5b1e1eec6ccec64c94e7dc9f59ebd"
---

# Flue with Vercel

Use [Flue](https://flueframework.com) with [AI Gateway](/docs/ai-gateway) to route model requests through Vercel and track usage. You can also give your agent an isolated workspace with [Vercel Sandbox](/docs/sandbox).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build an agent with Vercel and Flue](https://vercel.com/kb/guide/build-an-agent-with-vercel-and-flue) — Build and deploy an agent with Flue, Vercel Sandbox, and AI Gateway
- [How to ship a Flask app on Vercel](https://vercel.com/kb/guide/ship-a-flask-app-on-vercel) — Deploy a Flask app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and con
- [Build Claude Managed Agents with Vercel Services](https://vercel.com/kb/guide/claude-managed-agents-vercel-services) — Deploy Claude Managed Agents with Vercel Services to run a streaming research analyst in a browser chat, using Anthropic
- [Production architecture for a RAG chatbot on Vercel](https://vercel.com/kb/guide/rag-chatbot-production-architecture-on-vercel) — Architect a production RAG chatbot on Vercel Functions with Fluid compute, AI Gateway, and a region-pinned vector store.
- [eve on Vercel](https://vercel.com/docs/frameworks/agents/eve) — Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.
- [Mastra on Vercel](https://vercel.com/docs/frameworks/agents/mastra) — Deploy a Mastra agent as a Vercel Function and route its model requests through AI Gateway.
- [Running fx Durably on Vercel](https://vercel.com/docs/agent-harnesses/fx) — Deploy an fx agent with libfx so its sessions survive crashes, function timeouts, and redeploys on Vercel.
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an
- [AI Gateway Ecosystem and Integrations](https://vercel.com/docs/ai-gateway/ecosystem) — Connect frameworks, coding tools, and billing integrations to AI Gateway. Configure app attribution and explore integrat

Full cross-link map for this page: [/docs/frameworks/agents/flue.graph.md](/docs/frameworks/agents/flue.graph.md)
<!-- /docsgraph:related -->

This guide runs the Flue runtime locally while AI Gateway handles model requests. Flue's durable Node.js server requires a single process to own each conversation. See [Hosting considerations](#hosting-considerations) before deploying that server to an environment that scales across processes.

## Prerequisites

To follow this guide, you need:

- Node.js 22.19 or later. Use an active long-term support (LTS) release.
- [pnpm](https://pnpm.io/installation).
- A [Vercel account](/docs/accounts) and an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok/authentication).

## Create a Flue project

Create a directory for your agent:

```bash filename="terminal"
mkdir my-flue-agent
cd my-flue-agent
```

Add a `package.json` that enables ECMAScript modules:

```json filename="package.json"
{
  "private": true,
  "type": "module"
}
```

Install the runtime and CLI:

```bash filename="terminal"
pnpm add @flue/runtime
pnpm add -D @flue/cli
```

Configure Flue to use Node.js:

**flue.config.ts**

```ts filename="flue.config.ts" framework=all
import { defineConfig } from '@flue/runtime/config';

export default defineConfig({
  target: 'node',
});
```

**flue.config.js**

```js filename="flue.config.js" framework=all
import { defineConfig } from '@flue/runtime/config';

export default defineConfig({
  target: 'node',
});
```

## Configure AI Gateway

Add your AI Gateway API key to `.env.local`:

```bash filename=".env.local"
AI_GATEWAY_API_KEY=your-api-key-here
```

Keep the key out of version control by adding environment files to `.gitignore`:

```text filename=".gitignore"
node_modules/
.env*
```

Flue's built-in `vercel-ai-gateway` provider reads `AI_GATEWAY_API_KEY`. Your agent doesn't need a separate OpenAI or Anthropic API key.

## Define your agent

Create an agent in `src/agents/assistant.ts`, or use the JavaScript version:

**src/agents/assistant.ts**

```ts filename="src/agents/assistant.ts" framework=all
'use agent';

import { useModel } from '@flue/runtime';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

**src/agents/assistant.js**

```js filename="src/agents/assistant.js" framework=all
'use agent';

import { useModel } from '@flue/runtime';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  return 'Answer questions clearly and concisely.';
}
```

The `'use agent'` directive identifies the module as an agent. `useModel()` selects the provider and model, and the returned string supplies the agent's instructions. In this example, `vercel-ai-gateway` selects Flue's provider and `openai/gpt-6.1-sol` selects the AI Gateway model.

## Run your agent

Load your environment file and send a prompt:

```bash filename="terminal"
pnpm exec flue run src/agents/assistant.ts --env .env.local --message "Explain AI Gateway in one sentence."
```

For JavaScript, replace `src/agents/assistant.ts` with `src/agents/assistant.js`. The CLI prints the agent's activity and final response. Check [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability) in your Vercel dashboard to confirm the request and inspect usage.

To continue a conversation across local runs, provide the same conversation ID:

```bash filename="terminal"
pnpm exec flue run src/agents/assistant.ts --env .env.local --id gateway-demo --message "What does AI Gateway do?"
pnpm exec flue run src/agents/assistant.ts --env .env.local --id gateway-demo --message "How can I inspect those requests?"
```

Without a database adapter, `flue run` stores local conversations in `node_modules/.cache/flue/run.db`. This local CLI storage differs from the deployed Node.js server's default in-memory storage.

## Add isolated code execution

Use Vercel Sandbox when your agent needs to run code or inspect files. The Flue runtime continues to make model requests through AI Gateway, while file and command tools run inside the sandbox's microVM.

Print Flue's Vercel Sandbox adapter blueprint from your project:

```bash filename="terminal"
pnpm exec flue add sandbox vercel --print
```

The command prints implementation instructions; it doesn't create files or install dependencies. Follow [Flue with Vercel Sandbox](/docs/sandbox/ecosystem/flue) to apply the adapter, authenticate, attach it with `useSandbox()`, and clean up your sandbox after the run.

### Keep a workspace across runs

Mount a [Drive](/docs/sandbox/concepts/drives) to preserve working files independently of the sandbox. After applying the adapter above at `src/sandboxes/vercel.ts` and configuring [Sandbox authentication](/docs/sandbox/concepts/authentication), replace your agent with this version:

**src/agents/assistant.ts**

```ts filename="src/agents/assistant.ts" framework=all
'use agent';

import { createHash } from 'node:crypto';
import { useModel, useSandbox } from '@flue/runtime';
import { Drive, Sandbox } from '@vercel/sandbox';
import { vercel } from '../sandboxes/vercel.ts';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  useSandbox(
    {
      async createSandbox(options) {
        const key = createHash('sha256').update(options.id).digest('hex').slice(0, 24);
        const name = `flue-assistant-${key}`;
        const drive = await Drive.getOrCreate({ name, region: 'iad1' });
        const sandbox = await Sandbox.getOrCreate({
          name,
          region: 'iad1',
          runtime: 'node24',
          persistent: true,
          resume: true,
          timeout: 300_000,
          mounts: { '/vercel/sandbox/workspace': drive },
        });
        console.error(`Sandbox and drive name: ${name}`);
        return vercel(sandbox).createSandbox(options);
      },
    },
    { cwd: '/vercel/sandbox/workspace' },
  );
  return 'Save your working files in the current directory and reuse them across requests.';
}
```

**src/agents/assistant.js**

```js filename="src/agents/assistant.js" framework=all
'use agent';

import { createHash } from 'node:crypto';
import { useModel, useSandbox } from '@flue/runtime';
import { Drive, Sandbox } from '@vercel/sandbox';
import { vercel } from '../sandboxes/vercel.ts';

export function Assistant() {
  useModel('vercel-ai-gateway/openai/gpt-6.1-sol');
  useSandbox(
    {
      async createSandbox(options) {
        const key = createHash('sha256').update(options.id).digest('hex').slice(0, 24);
        const name = `flue-assistant-${key}`;
        const drive = await Drive.getOrCreate({ name, region: 'iad1' });
        const sandbox = await Sandbox.getOrCreate({
          name,
          region: 'iad1',
          runtime: 'node24',
          persistent: true,
          resume: true,
          timeout: 300_000,
          mounts: { '/vercel/sandbox/workspace': drive },
        });
        console.error(`Sandbox and drive name: ${name}`);
        return vercel(sandbox).createSandbox(options);
      },
    },
    { cwd: '/vercel/sandbox/workspace' },
  );
  return 'Save your working files in the current directory and reuse them across requests.';
}
```

The factory derives stable resource names from Flue's conversation ID. Reuse `--id` to reconnect to the same sandbox and drive; scope IDs by tenant in multi-user applications. `cwd` puts Flue's relative file operations and commands inside the mounted drive.

Keep one active owner for each conversation and workspace. A drive permits one read-write mount at a time. `Sandbox.getOrCreate()` resumes the named sandbox, while its creation settings, including mounts, apply only when creating it. Use [`sandbox.update()`](/docs/sandbox/sdk-reference#sandboxupdate) to change existing mounts.

[Stop the sandbox](/docs/sandbox/sdk-reference#sandboxstop) after its work settles to release compute while retaining the drive's files. Delete the sandbox and drive when you no longer need them. Drive storage persists until you delete it; see [deleting a drive](/docs/sandbox/concepts/drives#deleting-a-drive).

To verify that the drive preserves files independently, write a file, then stop and remove the sandbox using its printed name. The removal keeps the drive. Run the same conversation again to create a new sandbox that mounts the existing drive:

```bash filename="terminal"
pnpm exec flue run src/agents/assistant.ts --env .env.local --id workspace-demo --message "Write hello to greeting.txt in your working directory."
pnpm dlx sandbox@latest stop your_sandbox_name_here
pnpm dlx sandbox@latest remove your_sandbox_name_here --delete-orphan-snapshots
pnpm exec flue run src/agents/assistant.ts --env .env.local --id workspace-demo --message "Use your file tools to read greeting.txt from your working directory."
```

## Save completed responses to Blob

Use [Vercel Blob](/docs/vercel-blob) for completed reports or other artifacts your application needs to retrieve. Create a [private Blob store](/docs/vercel-blob/private-storage#creating-a-private-blob-store) and add its `BLOB_READ_WRITE_TOKEN` to `.env.local`. Install the SDK:

```bash filename="terminal"
pnpm add @vercel/blob
```

Add a helper that stores each completed response under its submission ID:

**src/save-reply.ts**

```ts filename="src/save-reply.ts" framework=all
import { put } from '@vercel/blob';

export async function saveReply(submissionId: string, text: string) {
  const blob = await put(`flue/replies/${submissionId}.md`, text, {
    access: 'private',
    contentType: 'text/markdown',
    allowOverwrite: true,
  });
  return blob.pathname;
}
```

**src/save-reply.js**

```js filename="src/save-reply.js" framework=all
import { put } from '@vercel/blob';

export async function saveReply(submissionId, text) {
  const blob = await put(`flue/replies/${submissionId}.md`, text, {
    access: 'private',
    contentType: 'text/markdown',
    allowOverwrite: true,
  });
  return blob.pathname;
}
```

In your host code, call `await saveReply(receipt.submissionId, reply.text)` after `const reply = await agent.read(receipt)`. The helper uses Flue's trusted submission ID and the settled text; writing the same result again replaces the same object. Load `.env.local` into that process, or configure the token in your host's environment. On Vercel, you can use [Blob OIDC authentication](/docs/vercel-blob/using-blob-sdk#authentication) with a connected store instead. Retrieve private artifacts through authenticated server code with the [Blob SDK](/docs/vercel-blob/using-blob-sdk#get).

## Orchestrate hosted agents with Workflows

Use [Vercel Workflows](/docs/workflows) to coordinate a separately hosted Flue agent with other application steps. Follow Flue's [durable orchestration pattern](https://flueframework.com/docs/guide/workflows/#durable-workflows) using `@flue/sdk` inside functions marked with `'use step'`:

1. Create a client for an authorized conversation with `createFlueClient()`. Send a message with `client.send()` and return the admission receipt from that step.
2. Read the response in a separate step with `client.read(receipt)`, so a retry reattaches to the recorded submission.
3. Save the settled response to Blob in another step, using its submission ID as the object key.

A completed send step doesn't resend on replay. A crash after Flue accepts a message but before the step records its receipt can still produce a duplicate send. Use Flue's create-only condition (`uid: null`) when each job creates a new conversation, and handle an existing-conversation rejection explicitly. Don't treat the conversation ID alone as an idempotency key.

Individual steps still have [Vercel Function execution limits](/docs/workflows/pricing#limits). Bound each read attempt and retry reads against the same receipt; aborting an SDK read doesn't stop the hosted agent. Workflows preserves the orchestration, while the Flue host remains responsible for durable conversation execution.

## Hosting considerations

AI Gateway and Vercel Sandbox work independently of where you host the Flue runtime. Configure `AI_GATEWAY_API_KEY` in your runtime host's environment when you move beyond local development. Flue also supports [Vercel OIDC authentication through a custom provider](/docs/ai-gateway/ecosystem/framework-integrations/flue#use-vercel-oidc-authentication).

Flue's [Node.js deployment target](https://flueframework.com/docs/guide/node-target/) requires one live process to own each conversation. A shared database preserves state across restarts but doesn't make concurrent ownership safe. The HTTP router also returns a receipt before the agent finishes processing the message.

[Vercel Functions](/docs/functions) can serve requests on different instances and have a [maximum execution duration](/docs/functions/configuring-functions/duration). Don't deploy Flue's durable HTTP router as a Vercel Function assuming that a shared database preserves its execution model. Choose a host and routing strategy that satisfy Flue's conversation ownership requirements. Your Vercel application can then call the hosted agent with the [Flue Agent SDK](https://flueframework.com/docs/sdk/overview/).

## Authenticate visitors with Passport

A [Passport-protected Vercel app](/docs/passport) can forward a visitor's identity to your hosted Flue service. Verify the token at that service and authorize every conversation route before Flue handles the request.

Install Passport in the Flue service:

```bash filename="terminal"
pnpm add @vercel/passport hono
```

Configure `PASSPORT_SOURCE_ISSUER` and `PASSPORT_SOURCE_AUDIENCE` in your Flue host. During setup, obtain the issuer and intended audience from an SDK-verified identity on the known **Passport-protected Vercel app**, then pin those values in the host configuration. Never derive the expected values from the incoming request being authorized.

In `src/app.ts`, protect the entire agent router. Replace the owner, project, and environment below with the source Vercel app's values:

**src/app.ts**

```ts filename="src/app.ts" framework=all
import { createHash } from 'node:crypto';
import { verifyIdentity } from '@vercel/passport';
import { createAgentRouter } from '@flue/runtime/routing';
import { Hono } from 'hono';
import { Assistant } from './agents/assistant.ts';

const app = new Hono();
const mount = '/agents/assistant';
const issuer = process.env.PASSPORT_SOURCE_ISSUER;
const audience = process.env.PASSPORT_SOURCE_AUDIENCE;
if (!issuer || !audience) {
  throw new Error('Configure the source Passport issuer and audience.');
}
const source = {
  ownerId: 'team_your_team_id_here',
  projectId: 'prj_your_project_id_here',
  environment: 'production',
  requiredClaims: ['exp', 'nbf', 'iat'],
  issuer,
  audience,
};

app.use(`${mount}/*`, async (c, next) => {
  let identity;
  try {
    identity = await verifyIdentity(c.req.raw, source);
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const key = JSON.stringify([identity.payload.iss, identity.subject]);
  const id = `passport-${createHash('sha256').update(key).digest('hex')}`;
  const requestedId = c.req.path.slice(mount.length + 1).split('/')[0];
  if (requestedId !== id) {
    return c.json({ error: 'Forbidden' }, 403);
  }
  return next();
});
app.route(mount, createAgentRouter(Assistant));

export default app;
```

**src/app.js**

```js filename="src/app.js" framework=all
import { createHash } from 'node:crypto';
import { verifyIdentity } from '@vercel/passport';
import { createAgentRouter } from '@flue/runtime/routing';
import { Hono } from 'hono';
import { Assistant } from './agents/assistant.js';

const app = new Hono();
const mount = '/agents/assistant';
const issuer = process.env.PASSPORT_SOURCE_ISSUER;
const audience = process.env.PASSPORT_SOURCE_AUDIENCE;
if (!issuer || !audience) {
  throw new Error('Configure the source Passport issuer and audience.');
}
const source = {
  ownerId: 'team_your_team_id_here',
  projectId: 'prj_your_project_id_here',
  environment: 'production',
  requiredClaims: ['exp', 'nbf', 'iat'],
  issuer,
  audience,
};

app.use(`${mount}/*`, async (c, next) => {
  let identity;
  try {
    identity = await verifyIdentity(c.req.raw, source);
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  const key = JSON.stringify([identity.payload.iss, identity.subject]);
  const id = `passport-${createHash('sha256').update(key).digest('hex')}`;
  const requestedId = c.req.path.slice(mount.length + 1).split('/')[0];
  if (requestedId !== id) {
    return c.json({ error: 'Forbidden' }, 403);
  }
  return next();
});
app.route(mount, createAgentRouter(Assistant));

export default app;
```

This example assigns one conversation to each verified issuer and subject pair. The exact conversation ID check covers messages, history, `HEAD` requests, aborts, and attachment downloads. It doesn't trust a conversation ID supplied by the browser. Keep every mount of this agent behind the same authorization boundary.

In your Vercel request handler, read the visitor with [`getIdentity()`](/docs/passport/read-identity) and reject requests without a token. Compute the same ID from `identity.payload.iss` and `identity.subject`, then call `https://your-flue-host.example/agents/assistant/<id>` server-side. [Forward `identity.token` unchanged](/docs/passport/forward-identity) in `Authorization: Bearer <token>` over HTTPS. With `@flue/sdk`, pass the token as the client's `token` option for each server-side request.

Keep the token out of agent messages, tool inputs, logs, and browser responses. Passport authenticates the visitor; the middleware's conversation ownership check controls access to Flue state. Use [Vercel Connect](/docs/connect) when the agent also needs credentials for a third-party service.

## Next steps

- [Build a software factory](/docs/agent-resources/software-factory/flue) that investigates issues, checks changes, and prepares draft pull requests.

- Configure model selection and authentication with [Flue and AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/flue).

- Add file and command tools with [Flue and Vercel Sandbox](/docs/sandbox/ecosystem/flue).

- Monitor model requests with [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
