---
title: Mastra on Vercel
product: vercel
url: /docs/frameworks/agents/mastra
canonical_url: "https://vercel.com/docs/frameworks/agents/mastra"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/frameworks/agents
  - /docs/frameworks
related:
  - /docs/build-output-api
  - /docs/ai-gateway/authentication-and-byok
  - /docs/ai-gateway/observability-and-spend/observability
  - /docs/git
  - /docs/environment-variables
summary: Deploy a Mastra agent as a Vercel Function and route its model requests through AI Gateway.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/frameworks/agents/mastra.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8c0bf924f0b0a807c44fe78ab99e766916b2ce9667c22e59860bf22530cfe3b4"
---

# Mastra on Vercel

[Mastra](https://mastra.ai) is a TypeScript framework for building agents, tools, and workflows. Its Vercel deployer packages a standalone Mastra server using the [Build Output API](/docs/build-output-api), so you can deploy its HTTP endpoints on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Running background workers on Vercel](https://vercel.com/kb/guide/background-workers-on-vercel) — Run background jobs on Vercel with waitUntil, Cron Jobs, Queues, Workflows, Daemons, or Sandbox. Compare the options and
- [How to give agents persistent storage with Vercel Drives](https://vercel.com/kb/guide/persistent-storage-with-vercel-drives) — Give AI SDK and TanStack AI agents persistent storage with Vercel Drives so they can save and reuse research notes acros
- [Running Durable Agents on Vercel](https://vercel.com/kb/guide/durable-ai-agents) — Design durable AI agents on Vercel with patterns for execution recovery, human approval, safe retries, deployment change
- [Vercel for Enterprise](https://vercel.com/blog/vercel-for-enterprise)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent)
- [How to choose between Functions, containers, and Daemons on Vercel](https://vercel.com/kb/guide/vercel-functions-containers-daemons) — Choose Vercel Functions for HTTP requests, container images for custom runtimes, and Daemons for continuous background w
- [How to build a durable AI code agent on Vercel](https://vercel.com/kb/guide/how-to-build-a-durable-ai-code-agent-on-vercel) — Build an AI agent that generates code, writes its own tests, and executes them in an isolated microVM with automatic ret
- [eve on Vercel](https://vercel.com/docs/frameworks/agents/eve) — Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.
- [Agent Resources](https://vercel.com/docs/agent-resources) — Set up AI coding tools with Vercel documentation, reusable skills, and secure access to projects, deployments, and logs.

Full cross-link map for this page: [/docs/frameworks/agents/mastra.graph.md](/docs/frameworks/agents/mastra.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

Before you begin, install Node.js 24 and pnpm, and create a Vercel account. You'll also need an [AI Gateway API key](/docs/ai-gateway/authentication-and-byok#api-keys) for local development.

## Create a project

Create a directory for your agent:

```bash filename="terminal"
mkdir mastra-agent
cd mastra-agent
```

Add a `package.json` with development and build scripts:

```json filename="package.json"
{
  "name": "mastra-agent",
  "private": true,
  "type": "module",
  "engines": {
    "node": "24.x"
  },
  "scripts": {
    "dev": "mastra dev",
    "build": "mastra build"
  }
}
```

Install Mastra, its Vercel deployer, and the AI Gateway provider:

```bash filename="terminal"
pnpm add @mastra/core @mastra/deployer-vercel @ai-sdk/gateway
pnpm add -D mastra typescript @types/node
```

Create a `.env` file with your API key:

```bash filename=".env"
AI_GATEWAY_API_KEY=your_ai_gateway_api_key
```

Keep your credentials and generated build files out of Git:

```text filename=".gitignore"
node_modules/
.env*
.mastra/
.vercel/
```

## Configure your agent

Create `src/mastra/index.ts` (or `index.js`). This registers an agent named `assistant` and configures Mastra to generate a Vercel deployment when you build:

**src/mastra/index.ts**

```ts filename="src/mastra/index.ts" framework=all
import { gateway } from '@ai-sdk/gateway';
import { Agent } from '@mastra/core/agent';
import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';

const assistant = new Agent({
  id: 'assistant',
  name: 'Assistant',
  instructions: 'Answer questions concisely and accurately.',
  model: gateway('openai/gpt-6.1-terra'),
});

export const mastra = new Mastra({
  agents: { assistant },
  deployer: new VercelDeployer(),
});
```

**src/mastra/index.js**

```js filename="src/mastra/index.js" framework=all
import { gateway } from '@ai-sdk/gateway';
import { Agent } from '@mastra/core/agent';
import { Mastra } from '@mastra/core/mastra';
import { VercelDeployer } from '@mastra/deployer-vercel';

const assistant = new Agent({
  id: 'assistant',
  name: 'Assistant',
  instructions: 'Answer questions concisely and accurately.',
  model: gateway('openai/gpt-6.1-terra'),
});

export const mastra = new Mastra({
  agents: { assistant },
  deployer: new VercelDeployer(),
});
```

The `gateway` provider reads `AI_GATEWAY_API_KEY`. On Vercel, it can also authenticate with the deployment's [OIDC token](/docs/ai-gateway/authentication-and-byok#oidc-tokens) when no API key is set.

## Test locally

Start Mastra's development server:

```bash filename="terminal"
pnpm dev
```

Open `http://localhost:4111` to test your agent in Mastra Studio. You can also call the agent from another terminal:

```bash filename="terminal"
curl http://localhost:4111/api/agents/assistant/generate \
  -H 'Content-Type: application/json' \
  -d '{"messages":[{"role":"user","content":"What is a Vercel Function?"}]}'
```

The response contains the agent's generated answer in the `text` field. Requests appear in [AI Gateway observability](/docs/ai-gateway/observability-and-spend/observability).

## Deploy to Vercel

Run the build locally to check your deployment output:

```bash filename="terminal"
pnpm build
```

The deployer generates `.vercel/output`, including routing configuration and your agent's Vercel Function. You don't need to create an `api` directory or a function handler yourself.

To deploy from Git:

1. Commit your project, including the lockfile, and push it to a Git repository.
2. [Import the repository into Vercel](/docs/git). Select **Other** as the **Framework Preset** and set the **Build Command** to `pnpm build`.
3. Add `AI_GATEWAY_API_KEY` to the project's [environment variables](/docs/environment-variables), or use OIDC authentication.
4. Select **Deploy**.

Open `https://your-project.vercel.app/api/agents` to confirm the deployment lists `assistant`. To generate a response, repeat the local `curl` command with your deployment URL. For a protected deployment, use [`vercel curl`](/docs/cli/curl) to make authenticated requests.

The deployed server exposes its API under `/api`. Studio stays local by default. Before making agent endpoints public, configure [Mastra server authentication](https://mastra.ai/docs/auth/overview) to control who can invoke your agents and tools.

## Scope browser requests with Vercel Passport

Use [Vercel Passport](/docs/passport) to sign visitors in through your identity provider, then use their verified identity to scope Mastra memory. Enable Passport for the deployment and install the helper:

```bash filename="terminal"
pnpm add @vercel/passport
```

Set a server-only `PASSPORT_AUDIENCE` environment variable to the expected `aud` claim for your Passport-protected project and environment. Obtain that value from an SDK-verified identity on the intended deployment during setup, following the [token claims reference](/docs/passport/token-claims). Configure it independently of incoming requests. On Vercel, the helper also checks the runtime's project ID and environment.

Create middleware that rejects missing or invalid identities and assigns a server-controlled Mastra resource ID:

**src/mastra/passport.ts**

```ts filename="src/mastra/passport.ts" framework=all
import { getIdentity } from '@vercel/passport';
import { MASTRA_RESOURCE_ID_KEY } from '@mastra/core/request-context';
import type { MiddlewareHandler } from '@mastra/core/server';

export const passportIdentity: MiddlewareHandler = async (c, next) => {
  const audience = process.env.PASSPORT_AUDIENCE;
  if (!audience) return c.json({ error: 'Passport is not configured' }, 503);

  let identity;
  try {
    identity = await getIdentity(c.req.raw, {
      development: false,
      verifyOptions: { audience },
    });
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  if (!identity?.verified) return c.json({ error: 'Unauthorized' }, 401);

  const resource = JSON.stringify([identity.payload.iss, identity.subject]);
  c.get('requestContext').set(MASTRA_RESOURCE_ID_KEY, resource);
  await next();
};
```

**src/mastra/passport.js**

```js filename="src/mastra/passport.js" framework=all
import { getIdentity } from '@vercel/passport';
import { MASTRA_RESOURCE_ID_KEY } from '@mastra/core/request-context';

export const passportIdentity = async (c, next) => {
  const audience = process.env.PASSPORT_AUDIENCE;
  if (!audience) return c.json({ error: 'Passport is not configured' }, 503);

  let identity;
  try {
    identity = await getIdentity(c.req.raw, {
      development: false,
      verifyOptions: { audience },
    });
  } catch {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  if (!identity?.verified) return c.json({ error: 'Unauthorized' }, 401);

  const resource = JSON.stringify([identity.payload.iss, identity.subject]);
  c.get('requestContext').set(MASTRA_RESOURCE_ID_KEY, resource);
  await next();
};
```

Import `passportIdentity` from `./passport.js` in `src/mastra/index.ts` (or `index.js`) and add the middleware to your existing configuration:

```js filename="src/mastra/index.js"
export const mastra = new Mastra({
  agents: { assistant },
  deployer: new VercelDeployer(),
  server: {
    middleware: [{ path: '/api/*', handler: passportIdentity }],
  },
});
```

When you enable [Mastra memory](https://mastra.ai/docs/memory/overview) with a persistent storage adapter, clients supply a thread ID but don't choose the resource owner. Mastra's memory routes use `MASTRA_RESOURCE_ID_KEY` ahead of caller-supplied resource IDs and reject access to another resource's threads. Give existing threads an owner before exposing them; ownerless threads are shared. Custom tools and routes must also check ownership before retrieving files or other user data.

Test with two Passport users and confirm that one can't read or modify the other's threads. `development: false` disables synthetic local identities, so use a [Passport-protected deployment](/docs/passport/read-identity#test-the-real-passport-flow) to test sign-in. This middleware protects browser-facing APIs; the worker configuration below requires a separate machine-authenticated API.

## Runtime and storage

Agent requests run within [Vercel Function duration limits](/docs/functions/configuring-functions/duration). Configure `maxDuration` in `VercelDeployer` and Mastra's `server.timeout` together when increasing request timeouts. See [Mastra's Vercel deployment options](https://mastra.ai/integrations/deploy/vercel#optional-overrides).

This example doesn't configure conversation memory or durable storage. Vercel Functions don't share process memory, and local files don't persist across deployments. For conversation history and workflow state, configure a remote [Mastra storage adapter](https://mastra.ai/docs/storage), such as PostgreSQL. The Vercel deployer rejects `@mastra/libsql`, so remove that dependency if you started from a scaffold that includes it.

## Save agent reports in Vercel Blob

Use [private Vercel Blob storage](/docs/vercel-blob/private-storage) for reports and other files your agent produces. Create a private store and connect it to this Vercel project, then install the Blob SDK:

```bash filename="terminal"
pnpm add @vercel/blob
```

On Vercel, the SDK uses the project's OIDC token and `BLOB_STORE_ID` automatically. For local development, link the project and pull its environment variables:

```bash filename="terminal"
vercel link
vercel env pull .env.local
```

Keep your AI Gateway key in `.env`. The commands below load both files. For environments without OIDC, set `BLOB_READ_WRITE_TOKEN` following [Blob authentication](/docs/vercel-blob/using-blob-sdk#authentication).

Create a script that calls the agent defined above and saves its response as a private Markdown file:

**scripts/create-report.ts**

```ts filename="scripts/create-report.ts" framework=all
import { put } from '@vercel/blob';
import { mastra } from '../src/mastra/index.js';

const report = await mastra.getAgent('assistant').generate(
  'Write a Markdown checklist for reviewing an API before deployment.',
);

const blob = await put('reports/deployment-review.md', report.text, {
  access: 'private',
  addRandomSuffix: true,
  contentType: 'text/markdown; charset=utf-8',
});

console.log(blob.pathname);
```

**scripts/create-report.js**

```js filename="scripts/create-report.js" framework=all
import { put } from '@vercel/blob';
import { mastra } from '../src/mastra/index.js';

const report = await mastra.getAgent('assistant').generate(
  'Write a Markdown checklist for reviewing an API before deployment.',
);

const blob = await put('reports/deployment-review.md', report.text, {
  access: 'private',
  addRandomSuffix: true,
  contentType: 'text/markdown; charset=utf-8',
});

console.log(blob.pathname);
```

Run the TypeScript script with `tsx`, which resolves the `.js` import to your TypeScript entry file:

```bash filename="terminal"
pnpm dlx tsx --env-file=.env --env-file=.env.local scripts/create-report.ts
```

For JavaScript, run `node --env-file=.env --env-file=.env.local scripts/create-report.js`. The script prints a pathname such as `reports/deployment-review-abc123.md`. The random suffix keeps separate reports from overwriting each other.

A private Blob URL isn't a public download link. To deliver reports, [authenticate the user and serve the file from your application](/docs/vercel-blob/private-storage#delivering-private-blobs). Store each report's pathname with its owner so your download route can check access. Blob stores the report file; Mastra conversation memory still needs a storage adapter.

## Keep workspace files on a drive

Use [Vercel Drives](/docs/sandbox/concepts/drives) when an agent needs a working directory that survives sandbox runs. The `@mastra/vercel` adapter doesn't accept a `mounts` option. Create the drive-mounted sandbox with `@vercel/sandbox`, then attach Mastra to it by name:

1. Install `@vercel/sandbox` and `@mastra/vercel`, and configure [Sandbox authentication](/docs/sandbox/concepts/authentication) for the same Vercel project.
2. Call `Drive.getOrCreate()` for the workspace's drive. Create a named sandbox with `Sandbox.create()`, setting `region` to the drive's region and `mounts` to `{ '/data': drive }`.
3. Construct `new VercelSandbox({ sandboxName: sandbox.name, workingDirectory: '/data' })` and pass that adapter as the `sandbox` option to `new Workspace()`. Assign that workspace to your Mastra agent, as in the [Sandbox integration](/docs/sandbox/ecosystem/mastra).
4. Call `workspace.init()` before running the agent and `workspace.stop()` when the session ends. Stop the current sandbox before mounting the same drive read-write in another sandbox.

Mastra retrieves the existing named sandbox when the workspace starts. Keep sandbox names scoped to the authenticated user or session, and create the mounted sandbox before attaching the adapter. If that named sandbox no longer exists, the adapter creates a replacement without drive mounts. For concurrent readers, use [read-only drive snapshots](/docs/sandbox/concepts/drives#snapshots).

## Orchestrate agent tasks with Vercel Workflows

Use [Vercel Workflows](/docs/workflows) to coordinate tasks around your Mastra agent, such as generating a report, waiting for approval, and publishing it. Mastra's workflow engine and Vercel Workflows manage separate execution state; deploying Mastra with `VercelDeployer` doesn't enable Workflow SDK.

Create an orchestrator using a [Workflow SDK framework integration](https://workflow-sdk.dev/docs/getting-started). In a `use step` function, call your authenticated Mastra `/api/agents/assistant/generate` endpoint and return its `text` result. Use separate steps for file storage and publishing, and a [hook or webhook](https://workflow-sdk.dev/docs/foundations/hooks) for approval. Keep network requests and credentials inside steps.

Vercel Workflows persists completed step results, but it doesn't checkpoint the model's progress inside a Mastra call. A failed step can retry the entire agent request, including its tools. Make external writes [idempotent](https://workflow-sdk.dev/docs/foundations/idempotency), and account for both the step's execution limit and the Mastra endpoint's request timeout. See [errors and retries](https://workflow-sdk.dev/docs/foundations/errors-and-retries) to configure retry behavior.

## Run background workers with Vercel Daemons

Use [Vercel Daemons](/docs/daemons) for Mastra's orchestration and background-task workers. Workers pull tasks from a distributed PubSub backend; HTTP requests still go to a separate Mastra API. Daemons run only in production and don't accept inbound application traffic.

First configure Mastra's [split-process worker architecture](https://mastra.ai/docs/deployment/workers#split-processes):

- Use shared remote storage, such as `PostgresStore` from `@mastra/pg`, and a pull-capable PubSub backend, such as `RedisStreamsPubSub` from `@mastra/redis-streams`. Install these packages and configure `DATABASE_URL` and `REDIS_URL` in both processes using the linked setup. Both the API and worker need the same database and PubSub configuration.
- Set `MASTRA_WORKERS=false` on the API process. The worker command below selects `orchestration`; use `backgroundTasks` to run that role instead. Exclude the scheduler, which requires exclusive ownership and can produce duplicates during overlapping deployments.
- Set `MASTRA_STEP_EXECUTION_URL` to the worker-callable API URL including `/api`, and `MASTRA_WORKER_AUTH_TOKEN` to a bearer token accepted by that API's [authentication provider](https://mastra.ai/docs/auth/workers).

Use a separate API deployment with machine authentication for worker callbacks. The Passport middleware above expects a visitor identity, and a worker bearer token doesn't bypass Passport or Deployment Protection. Make sure the callback endpoint is reachable by the worker with its configured authentication.

Build the worker artifact from the same application configuration as that API:

```bash filename="terminal"
pnpm exec mastra worker build --output-dir .mastra/worker
```

The command produces `.mastra/worker/index.mjs` and its dependencies. For a daemon, build that artifact inside the container so dependencies match its Linux runtime. Add this Dockerfile at the application root:

```docker filename="Dockerfile.worker"
FROM node:24-slim AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm exec mastra worker build --output-dir .mastra/worker

FROM node:24-slim
WORKDIR /app
COPY --from=build /app/.mastra/worker/ ./
CMD ["sh", "-c", "MASTRA_WORKERS=orchestration exec node index.mjs"]
```

Exclude `.env*`, `node_modules`, `.mastra`, and `.vercel` in `.dockerignore`. Keep the database, PubSub, and worker authentication credentials in [project environment variables](/docs/environment-variables). Add this daemon to the project's Vercel configuration:

```json filename="vercel.json"
{
  "daemons": {
    "mastra-worker": {
      "root": ".",
      "entrypoint": "Dockerfile.worker",
      "instances": { "iad1": 1 },
      "terminationGracePeriodSeconds": 60
    }
  }
}
```

The generated worker handles `SIGTERM` by stopping its workers before exit. The generated entrypoint uses Mastra's default worker-drain timeout; increasing the daemon's grace period doesn't extend that timeout. Allow enough grace for worker cleanup to finish. Crashes and [liveness-triggered restarts](/docs/daemons#restart-policy) can interrupt work immediately, so use idempotent handlers and follow Mastra's [crash-recovery limitations](https://mastra.ai/docs/deployment/workers#crash-recovery). A daemon restart alone doesn't checkpoint an agent or guarantee completion.

Daemons expose Vercel identity through the rotating `VERCEL_OIDC_TOKEN_FILE`, rather than a request's `VERCEL_OIDC_TOKEN`. Use file-aware SDK authentication as described in [Daemon OIDC](/docs/daemons#environment-variables-and-oidc), or configure an AI Gateway API key where model calls run. Don't copy the file's token into a long-lived environment variable.

## Extend your agent on Vercel

- [Build a software factory](/docs/agent-resources/software-factory/mastra) that investigates issues, checks changes, and prepares draft pull requests.

- Route model requests and inspect usage with [Mastra and AI Gateway](/docs/ai-gateway/ecosystem/framework-integrations/mastra).

- Give your agent isolated command execution with [Mastra and Vercel Sandbox](/docs/sandbox/ecosystem/mastra).

- Connect your deployed agent to Slack, Discord, or Microsoft Teams using Mastra's [Chat SDK integration](/docs/ai-gateway/ecosystem/framework-integrations/mastra#connect-your-agent-on-vercel-to-chat-platforms).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
