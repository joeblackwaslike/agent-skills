---
title: eve on Vercel
product: vercel
url: /docs/frameworks/agents/eve
canonical_url: "https://vercel.com/docs/frameworks/agents/eve"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/frameworks/agents
  - /docs/frameworks
related:
  - /docs/functions
  - /docs/workflows
  - /docs/ai-gateway
  - /docs/daemons
  - /docs/sandbox
summary: Create and deploy an eve agent on Vercel with AI Gateway model access, durable sessions, and authenticated requests.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/frameworks/agents/eve.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "5ae7a6bc2707aa8440bd70942a4baa7ad5c6acdda1be6646c49c345abfbf2100"
---

# eve on Vercel

Deploy an [eve](/eve) agent to Vercel to run conversations that persist across interruptions and wait for tools or human input. eve compiles your agent's files into an application that uses [Vercel Functions](/docs/functions), [Vercel Workflows](/docs/workflows), and [AI Gateway](/docs/ai-gateway).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel Drives with an eve agent](https://vercel.com/kb/guide/vercel-drives-eve-agent) — Mount Vercel Drives in an eve agent's sandbox to give each user a persistent workspace and share read-only reference dat
- [How to use subagents with eve](https://vercel.com/kb/guide/how-to-use-eve-subagents) — Learn how to use subagents with eve, including the built-in agent tool, declared specialist subagents, the isolation bou
- [Introducing eve](https://vercel.com/blog/introducing-eve)
- [Build AI agents with AI Gateway and AI SDK](https://vercel.com/kb/guide/ai-gateway-and-ai-sdk) — Build AI agents on Vercel with AI Gateway and AI SDK, then make them reliable, capable, and durable with Sandbox, Chat S
- [Draft documentation fixes from reader feedback with Sanity and eve](https://vercel.com/kb/guide/sanity-eve-agent) — Build an autonomous agent that drafts fixes in Sanity, stages them for human review, and calls the model through AI Gate
- [Deployment](https://eve.dev/docs/guides/deployment) — How an eve agent runs in production, and the backends you choose on Vercel or your own infrastructure.
- [Give your software factory a browser](https://vercel.com/kb/guide/software-factory-browser) — Add a KERNEL cloud browser to the eve software factory template so Foreman can reproduce flow bugs, sign in through mana
- [Next.js](https://eve.dev/docs/guides/frontend/nextjs) — Add an eve chat to a Next.js app, from setup and authentication to saved conversations and deployment.
- [eve (HTTP & web)](https://eve.dev/docs/channels/eve) — The default HTTP API for an agent, covering session routes, auth, and customization.
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an
- [Agent Skills](https://vercel.com/docs/agent-resources/skills) — Install skills to enhance AI coding agents with specialized capabilities for React, Next.js, deployment, and more.

Full cross-link map for this page: [/docs/frameworks/agents/eve.graph.md](/docs/frameworks/agents/eve.graph.md)
<!-- /docsgraph:related -->

To decide whether you need eve's built-in sessions and channels or an agent loop within your app, see [Choosing between eve, AI SDK agents, and `WorkflowAgent`](/kb/guide/eve-vs-ai-sdk-agents-vs-workflowagent).

To start from a working agent instead of an empty project, deploy a template for a [business agent](#build-business-agents-with-eve) or a [personal agent](#build-personal-agents-with-eve).

**Agent prompt**

```text
Build a working eve agent for my project's use case, verify it locally, and prepare it for deployment on Vercel.

Use https://vercel.com/docs/frameworks/agents/eve.md as the framework setup reference.

1. Define the outcome. Inspect the project and its repository instructions. Identify the task the agent should perform, the tools or data it needs, and one representative input with an expected result. Ask me about requirements you can't determine from the project before implementing them.

2. Prepare the environment. Check the guide's prerequisites and my Vercel setup. Check whether the Vercel Plugin is installed in your coding tool. If it's missing, install it using the tool-specific instructions at https://vercel.com/docs/agent-resources/vercel-plugin.md.

3. Implement the agent. Create or extend the eve project with instructions for my use case, an AI Gateway model, and the tools needed to complete the task. Reuse existing code and conventions, preserve unrelated work, and keep optional integrations out of scope unless the task needs them.

4. Verify the outcome. Run the agent with the representative input and compare its response and tool results with the expected outcome. Run relevant existing project checks and fix failures introduced by your changes. A server starting or a model returning text alone doesn't establish that the task works.

5. Prepare deployment. Follow the guide's eve-specific linking and deployment requirements. Identify the environment variables, storage, and connections this implementation needs, and provide the commands to deploy it. Keep this task scoped to implementation, local verification, and deployment preparation.

Finish with a concise handoff: the implementation, commands you actually ran and their results, an example input and observed output, and the remaining deployment steps. If credentials, tools, or services block a check, mark it as unverified, explain what's missing, and give the command to rerun it.
```

## How eve uses Vercel

Use Vercel's services to run, connect, and inspect your eve agent:

- [**AI Gateway**](/docs/ai-gateway) routes model requests and handles provider fallbacks.
- [**Vercel Workflows**](/docs/workflows) persists session state and resumes interrupted work.
- [**Vercel Daemons**](/docs/daemons) can run separate workers that poll queues or external APIs and forward work to your hosted agent.
- [**Vercel Sandbox**](/docs/sandbox) isolates code execution.
- [**Vercel Blob**](/docs/vercel-blob#store-eve-agent-memory) stores persistent memory for eve's built-in file memory provider.
- [**Vercel Services**](/docs/services) deploys agents alongside frontends and backends in one project.
- [**Vercel Connect**](/docs/connect/frameworks/eve) manages OAuth tokens and API keys for eve connections and channels.
- [**Agent Runs**](/docs/agent-runs) in Vercel Observability shows conversations, tool calls, token usage, and performance.

## Prerequisites

- Node.js 24 or later and [pnpm](https://pnpm.io/installation)
- A Vercel account and team with [AI Gateway access](/docs/ai-gateway)
- The [Vercel CLI](/docs/cli) installed

## Create an agent

Initialize a project from your terminal:

```bash filename="Terminal"
pnpm dlx eve@latest init my-agent
```

The command creates `my-agent`, installs dependencies, initializes Git, and opens eve's terminal UI. If no model connection is available, eve opens `/login`. Choose your Vercel account, complete the browser sign-in, and select the team to use for AI Gateway requests.

To add eve to an existing app with a `package.json`, run `pnpm dlx eve@latest init .` from its root before creating any `agent/` files.

Send a message such as `Explain what you can help me with in two sentences`. The agent should respond in the terminal. Use `/login` again if you need to change the account, team, or credentials.

The project keeps the agent's model configuration in `agent/agent.ts`. Edit `agent/instructions.md` to change its behavior:

```md filename="agent/instructions.md"
You help developers plan small software projects.
Ask for missing requirements before suggesting an implementation.
Keep answers concise and include a concrete next step.
```

eve reloads changes during development. Send another message to check that the agent follows your instructions. To reopen the terminal UI after exiting, run:

```bash filename="Terminal"
cd my-agent
pnpm dev
```

## Link the Vercel project

Exit the terminal UI and run the following from the project root:

```bash filename="Terminal"
pnpm exec eve link
```

Select or create a project in the team you want to deploy to. The command links the directory and pulls the project's environment variables.

The model string in `agent/agent.ts` routes requests through AI Gateway. On Vercel, eve authenticates with the project's [OpenID Connect (OIDC) identity](/docs/oidc), so you don't need to copy your local login credentials or add a provider API key. Local model connections and deployed model access are separate.

Add any secrets your tools or direct model providers require to the project's [environment variables](/docs/environment-variables) before deploying.

### Use ChatGPT or Claude API credits for your agent

To use API credits from an eligible ChatGPT or Claude subscription, claim the credits in your provider organization and add that organization's key to [AI Gateway Bring Your Own Key (BYOK)](/docs/ai-gateway/authentication-and-byok/byok). Your deployed eve agent continues to authenticate to AI Gateway with OIDC.

Follow the [ChatGPT credits walkthrough](/i/chatgpt-api-credits-ai-gateway) or [Claude credits walkthrough](/i/claude-api-credits-ai-gateway) to check eligibility and claim credits. In `agent/agent.ts`, choose a model from the credited provider and set `modelOptions.providerOptions.gateway.only` to `['openai']` or `['anthropic']`. Apply the same routing to separately configured subagent or compaction models.

Deploy and send a message, then [verify the provider and credential source in AI Gateway Logs](/docs/ai-gateway/observability-and-spend/logs#verify-the-billing-route-for-provider-credits). The provider filter doesn't prevent fallback to Vercel's provider keys if your key fails. Those requests can charge AI Gateway Credits, and Vercel infrastructure charges still apply. See [provider credits and billing](/docs/ai-gateway/pricing#api-credits-from-provider-subscriptions).

## Configure who can call the agent

Model access authenticates the agent to AI Gateway. Route authentication controls who can send messages to your agent.

For the terminal UI and callers using this Vercel project's OIDC identity, configure the built-in HTTP channel:

**agent/channels/eve.ts**

```typescript filename="agent/channels/eve.ts"
import { localDev, vercelOidc } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';

export default eveChannel({
  auth: [vercelOidc(), localDev()],
});
```

**agent/channels/eve.js**

```javascript filename="agent/channels/eve.js"
import { localDev, vercelOidc } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';

export default eveChannel({
  auth: [vercelOidc(), localDev()],
});
```

`vercelOidc()` verifies Vercel bearer tokens and accepts tokens from the current project by default. `localDev()` permits local development requests and doesn't authenticate production callers. Requests that neither helper accepts receive a `401` response.

These helpers don't verify your application's browser session cookies. Before adding a browser interface, [add an authenticator for your application's users](https://eve.dev/docs/guides/auth-and-route-protection#the-ordered-auth-walk). Use the `subjects` option on `vercelOidc()` to explicitly permit callers from other Vercel projects.

### Identify browser users with Vercel Passport

For an internal browser agent, [Vercel Passport](/docs/passport) authenticates visitors with your identity provider before requests reach the deployment. Passport requires an Enterprise plan. [Set up Passport](/docs/passport/set-up-identity-provider) for the environment serving your browser UI and agent, then install the helper:

```bash filename="Terminal"
pnpm add @vercel/passport
```

Set `PASSPORT_AUDIENCE` in your project's environment variables to the expected Passport audience for this deployment. During setup, [read a verified identity](/docs/passport/read-identity) after signing in and use its `identity.payload.aud` value. Pin that value in configuration; don't take the expected audience from each incoming request. Keep `VERCEL_PROJECT_ID` and `VERCEL_ENV` available so the helper also verifies the project and environment.

Replace `agent/channels/eve.ts` with this visitor-only policy:

**agent/channels/eve.ts**

```typescript filename="agent/channels/eve.ts"
import { getIdentity } from '@vercel/passport';
import type { AuthFn } from 'eve/channels/auth';
import { eveChannel } from 'eve/channels/eve';

const passportAuth: AuthFn<Request> = async (request) => {
  try {
    const audience = process.env.PASSPORT_AUDIENCE;
    if (!audience) return null;
    const identity = await getIdentity(request, {
      development: false,
      verifyOptions: { audience },
    });
    if (!identity?.verified || !identity.payload.iss) return null;

    return {
      authenticator: 'passport',
      principalType: 'user',
      issuer: identity.payload.iss,
      principalId: identity.subject,
      attributes: {},
    };
  } catch {
    return null;
  }
};

export default eveChannel({ auth: passportAuth });
```

**agent/channels/eve.js**

```javascript filename="agent/channels/eve.js"
import { getIdentity } from '@vercel/passport';
import { eveChannel } from 'eve/channels/eve';

/** @type {import('eve/channels/auth').AuthFn<Request>} */
const passportAuth = async (request) => {
  try {
    const audience = process.env.PASSPORT_AUDIENCE;
    if (!audience) return null;
    const identity = await getIdentity(request, {
      development: false,
      verifyOptions: { audience },
    });
    if (!identity?.verified || !identity.payload.iss) return null;

    return {
      authenticator: 'passport',
      principalType: 'user',
      issuer: identity.payload.iss,
      principalId: identity.subject,
      attributes: {},
    };
  } catch {
    return null;
  }
};

export default eveChannel({ auth: passportAuth });
```

This policy rejects missing, invalid, and unverified development identities. It keeps the verified issuer and subject as the visitor's identity, so `byPrincipal` memory stays consistent across conversations. Email addresses and browser-supplied user IDs don't determine the memory scope.

Redeploy, sign in through the browser, and save a preference. Start another conversation as the same visitor to check recall, then sign in as a different visitor and confirm their memory is separate. This policy requires a Passport session; the terminal UI's project OIDC login alone doesn't satisfy it. It also doesn't link Passport users to Slack or Discord accounts. See [verified account linking](/docs/chat-sdk/integrations/passport#share-history-with-other-chat-platforms) before sharing memory across channels.

## Deploy to Vercel

Keep the scaffold's `build` script, which runs `eve build`. During a hosted Vercel build, eve writes the deployment bundle to `.vercel/output`.

From the project root, deploy the agent:

```bash filename="Terminal"
pnpm exec eve deploy
```

This command deploys to **Production**. It installs dependencies, runs the Vercel deployment, and displays build logs. After the deployment completes, use the resulting URL to check the agent.

For subsequent deployments, you can also [connect the project to Git](/docs/git). To deploy an agent alongside a frontend or backend in the same project, see [eve with Vercel Services](https://eve.dev/docs/guides/deployment/vercel#compose-agents-with-other-vercel-services).

## Verify the deployment

For the service-caller setup without Deployment Protection, replace `your_agent.vercel.app` with the deployment's domain and check the built-in health route:

```bash filename="Terminal"
curl --fail https://your_agent.vercel.app/eve/v1/health
```

A successful health response confirms that the service is reachable. The health route doesn't check model access or session permissions. Connect the terminal UI and send a message to verify both:

```bash filename="Terminal"
pnpm exec eve remote connect --url https://your_agent.vercel.app
```

Follow any authentication prompts and confirm that the agent responds. For [Deployment Protection](/docs/deployment-protection), set `VERCEL_AUTOMATION_BYPASS_SECRET` locally before connecting. Direct health requests need the [automation bypass header](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) too. A protection bypass doesn't replace eve's route authentication or provide a Passport visitor identity.

For the Passport setup, sign in through the browser, visit `/eve/v1/health` on the protected deployment, and send a message through your browser interface. Passport protects the health route before requests reach eve, so an unauthenticated `curl` request can return a sign-in redirect instead of a health response.

Open [Agent Runs](/docs/agent-runs) in the project dashboard to inspect conversations, tool calls, and token usage. For existing projects, check [trace sampling](/docs/agent-runs#configure-tracing-for-existing-deployments) if no runs appear. Use [runtime logs](/docs/logs/runtime) to investigate failed requests.

Follow [Trace and debug eve agent runs](/kb/guide/trace-and-debug-eve-agent-runs) to investigate an incorrect answer, configure trace exports, and test the fix with a regression eval.

## Run durable sessions with Vercel Workflows

On Vercel, each eve session runs on [Vercel Workflows](/docs/workflows). eve checkpoints progress between steps and resumes pending work after interruptions. Waiting for approval or user input suspends the workflow until that input arrives. You don't need to add a workflow wrapper or configure a separate database or queue.

Completed steps reuse their recorded results, but an interrupted step can execute again. Make tool actions that send emails, create records, or charge customers idempotent so a retry doesn't repeat the external action. See [Running eve Agents Durably on Vercel](/docs/agent-harnesses/eve) for more about session durability.

### Use background workers with Vercel Daemons

Use a [Vercel Daemon](/docs/daemons) when a separate worker needs to poll a queue or external API continuously, then send work to your hosted eve agent. The daemon runs the ingestion loop; eve's HTTP endpoints stay on Vercel Functions and its sessions stay on Vercel Workflows.

Your agent can also publish a job to [Vercel Queues](/docs/queues) and wait while a daemon processes it. The worker sends the result back through eve's session API. Follow [Use Vercel Daemons with eve agents](/kb/guide/vercel-daemons-eve-agents) for both patterns, including authentication, retries, and shutdown handling.

Authenticate worker calls with an explicit [service-caller policy](https://eve.dev/docs/guides/auth-and-route-protection#verceloidc) and the daemon's [OIDC identity](/docs/daemons#environment-variables-and-oidc). The visitor-only Passport policy above doesn't admit workers. Keep background credentials separate from visitors' Passport sessions.

## Remember preferences with Vercel Blob

Use eve's `fileMemory()` provider to retain selected facts and preferences across conversations. From the linked project, install file memory:

```bash filename="Terminal"
pnpm exec eve add memory/file
```

Choose **Install and set up**. eve creates `agent/memory/file.ts`, creates or reuses a private [Vercel Blob](/docs/vercel-blob) store, and connects it to the project with OIDC. The generated memory definition scopes each document to the authenticated caller.

Redeploy with `pnpm exec eve deploy` to use the new storage configuration. Ask the agent to remember a preference, confirm that it calls its memory save tool, then start another conversation with the same identity to check recall.

During `eve dev`, the default memory backend keeps data in the development process and loses it on restart. For setup details and a deployable example, see [Store eve agent memory](/docs/vercel-blob#store-eve-agent-memory).

## Share datasets with Vercel Drives

Use [Vercel Drives](/docs/sandbox/concepts/drives) when an agent needs datasets or working files that persist independently of its sandbox. For concurrent sessions reading the same dataset, mount a read-only drive snapshot.

First, [create a drive](/docs/sandbox/concepts/drives#creating-or-retrieving-a-drive) named `agent-data` in `iad1`, in the same Vercel project as your agent. Mount it read-write in a separate sandbox, write your dataset, and stop that sandbox. The drive must contain at least one file before you can mount a snapshot.

Add this sandbox definition to mount the prepared dataset at `/data`:

**agent/sandbox.ts**

```typescript filename="agent/sandbox.ts"
import { defineSandbox } from 'eve/sandbox';
import { VercelSandbox } from 'eve/sandbox/vercel';

export const environment = VercelSandbox.environment({ region: 'iad1' });

export default defineSandbox(() =>
  environment.open({
    mounts: {
      '/data': { drive: 'agent-data', mode: 'snapshot' },
    },
  }),
);
```

**agent/sandbox.js**

```javascript filename="agent/sandbox.js"
import { defineSandbox } from 'eve/sandbox';
import { VercelSandbox } from 'eve/sandbox/vercel';

export const environment = VercelSandbox.environment({ region: 'iad1' });

export default defineSandbox(() =>
  environment.open({
    mounts: {
      '/data': { drive: 'agent-data', mode: 'snapshot' },
    },
  }),
);
```

Keep the sandbox and drive in the same region, and keep mounts outside eve's managed `/workspace` directory. Add the dataset paths to `agent/instructions.md`, redeploy, and start a new session to read them. Each snapshot shows the drive's contents when mounted; existing mounts don't receive later writes.

For mutable workspaces, use `mode: 'read-write'` and coordinate access. A drive supports only one active read-write mount, while each eve session has its own sandbox. See [Mounting a drive](/docs/sandbox/concepts/drives#mounting-a-drive) for access modes and sharing constraints.

## Build business agents with eve

A business agent is an eve agent that handles recurring work for a team, such as drafting marketing content or answering questions about company data. Employees send requests from a tool they already use, like Slack. You choose which systems the agent can reach and which actions wait for a person's approval.

Deploy one of these templates to start with a working business agent:

| Template | What the agent does | Works with | Safeguards |
| --- | --- | --- | --- |
| [eve Marketing Team](/templates/eve/eve-marketing-team) | A lead agent routes each request to one of five specialists, which draft blog posts, social posts, and email campaigns. | Slack, Notion, Typefully, and Resend | Sends, deletes, and scheduled posts wait for approval. |
| [eve Data Analyst](/templates/eve/eve-data-analyst) | Answers questions about your business from a Postgres database, with charts, tables, and the SQL it ran. | Slack and Postgres | Queries are read-only, and expensive queries wait for approval. |

### Run an AI marketing team from Slack

The [eve Marketing Team template](/templates/eve/eve-marketing-team) deploys a lead agent and five specialists: a product marketer, a content marketer, a social media coordinator, a search engine optimization (SEO) specialist, and an email specialist. You brief the lead in Slack. The lead routes the request to a specialist and returns a link to the result: a blog draft in Notion, social posts in Typefully, or an email campaign in Resend.

Each specialist is an [eve subagent](https://eve.dev/docs/subagents) with its own instructions, skills, and connections. To add a specialist, add a directory under `agent/subagents/`. Every specialist reads the same brand context document, which keeps product claims consistent across blog posts, social posts, and email.

The template sets an [approval policy](https://eve.dev/docs/human-in-the-loop) on actions you can't undo. Sending a Resend campaign, deleting a Typefully draft, or scheduling a post pauses until someone approves it in Slack. Saving a draft needs no approval. Notion and Resend sign in each person through [Vercel Connect](/docs/connect), so the agent acts with that person's permissions.

To understand the architecture, setup steps, and approval gates, read [How do I build an AI marketing team?](/i/how-to-build-an-ai-marketing-team). For a code walkthrough, follow [Run a marketing team from Slack with eve](/kb/guide/marketing-team-eve).

### Answer business data questions from Slack

The [eve Data Analyst template](/templates/eve/eve-data-analyst) deploys an agent that answers questions about your business from a Postgres database. Ask "What was our monthly recurring revenue last month?" in Slack. The agent replies with the number, the exact period, and the time zone, and adds a chart or table when one helps.

The eve Data Analyst agent can read your database but can't change it:

- Every query runs in a read-only transaction with a time limit.
- Each person queries through a Postgres role, so your database permissions decide what that person can see.
- Expensive queries wait for approval from the person who asked.
- Each answer includes the SQL queries the agent ran.

Metric definitions live in `agent/skills/metric-definitions.md`, so terms like "churn" follow your team's rules. The template needs Postgres 14 or later. It can load demo data, so you can test the agent before you connect your own tables.

### Choose a first business agent

Start with a recurring task where a colleague can check the agent's work before anyone acts on it. Give the agent a narrow set of sources, and use read-only access where possible.

[7 internal AI agents teams can build](/i/internal-ai-agent-examples) describes seven internal agents, with the access boundaries, review points, and pilot measurements for each one. Four of the seven have an eve template you can deploy:

- **Content drafts from approved sources**: [eve Content Agent](/templates/eve/eve-content-agent)
- **Data analysis with inspectable queries**: [eve Data Analyst](/templates/eve/eve-data-analyst)
- **Evidence for incident response**: [eve Incident Response Agent](/templates/eve/eve-incident-response-agent)
- **Software changes for engineering review**: [eve Software Factory](/templates/eve/eve-software-factory)

### Govern a business agent

Before more employees rely on a business agent, name an owner. Then decide who can use the agent, what data it reads, what it can change, and what it can spend. [How do you govern AI apps and agents built by employees?](/i/govern-employee-built-ai-apps-and-agents) explains each decision and the evidence to check before a wider rollout.

Use these Vercel and eve features to enforce each decision:

| Decision | How to enforce it for an eve agent |
| --- | --- |
| Who can use the agent | [Configure who can call the agent](#configure-who-can-call-the-agent) in `agent/channels/eve.ts`. On Enterprise plans, [Vercel Passport](#identify-browser-users-with-vercel-passport) signs browser users in through your identity provider. |
| What data the agent reads | Add only the connections the task needs. [Vercel Connect](/docs/connect/frameworks/eve) manages each connection's OAuth tokens and API keys. |
| What the agent can change | Set an [approval policy](https://eve.dev/docs/human-in-the-loop) on tools that send, delete, or publish. eve runs a tool call without approval unless you set a policy. |
| What the agent can spend | Set a project budget with [AI Gateway budgets](/docs/ai-gateway/observability-and-spend/budgets), and configure [Spend Management](/docs/spend-management) for your team. |
| What the agent did | Review conversations, tool calls, and token usage in [Agent Runs](/docs/agent-runs). |

## Build personal agents with eve

A personal agent is an eve agent that works for one person. You deploy it to your own Vercel project, so you control its instructions, model, tools, and memory.

Deploy one of these templates to start with a working personal agent:

| Template | Interface | What the agent does | Sign-in |
| --- | --- | --- | --- |
| [eve Personal Agent](/templates/nuxt/eve-personal-agent) | Nuxt web chat, Slack, and iMessage | Shares one memory across every interface, and answers questions about your GitHub and Linear work. | Email and password accounts |
| [eve TanStack Agent](/templates/eve/eve-tanstack-agent) | TanStack Start web chat | Searches the web, reads pages, and presents answers as cards, sortable tables, and metrics. | One shared password |

Choose the eve Personal Agent template for an assistant that remembers your context across web chat, Slack, and iMessage. Choose the eve TanStack Agent template for a web chat that renders answers with your own React components.

### Deploy a personal agent with memory you control

The [eve Personal Agent template](/templates/nuxt/eve-personal-agent) deploys a Nuxt web app and an eve agent as two [Vercel Services](/docs/services) from one repository. The web chat keeps your threads across sessions. Link your Slack account to reach the same agent from direct messages, or add your phone number to text the agent over iMessage.

The eve Personal Agent template gives you control over what the agent remembers:

- Memory has five categories: work context, personal context, active focus, instructions and preferences, and project history.
- The agent proposes each new memory as an approval card in chat, and you approve or skip it.
- You can edit or delete any memory entry from your profile.
- An import flow brings in the context you've built up in ChatGPT or Claude.

Connect GitHub and Linear through [Vercel Connect](/docs/connect) to ask about repositories, pull requests, issues, and cycles. Actions that write to GitHub wait for your approval. To change the agent's name, instructions, model, or tools, follow the template's [customization guide](https://github.com/vercel/eve/blob/main/apps/templates/personal-agent-template/docs/CUSTOMIZATION.md).

### Build a personal research assistant with TanStack Start

The [eve TanStack Agent template](/templates/eve/eve-tanstack-agent) connects an eve agent to a TanStack Start React frontend. Both deploy together in one Vercel project through [Vercel Services](/docs/services). The included agent searches the web, reads pages, and asks follow-up questions when it needs more information.

[json-render](https://json-render.dev/) turns the agent's structured responses into React components you define, such as result cards, sortable tables, and metrics. Each conversation has a URL, so you can return to a session after you reload the page.

The template protects the chat with one shared password, which you set in the `EVE_ACCESS_PASSWORD` environment variable. Before you share the agent with other people, [add an authenticator for your application's users](https://eve.dev/docs/guides/auth-and-route-protection#the-ordered-auth-walk). See [Build an agent chat with eve](/docs/frameworks/full-stack/tanstack-start#build-an-agent-chat-with-eve) for more about the template.

### Build a personal agent from an empty project

To build a personal agent without a template, [create an agent](#create-an-agent) and deploy it. Then [add file memory with Vercel Blob](#remember-preferences-with-vercel-blob) so the agent keeps your preferences across conversations. To reach the agent from Slack and other chat platforms, [connect it to Chat SDK](/docs/chat-sdk/eve).

## Pricing and limits

eve uses the billing and limits of the Vercel resources your agent consumes. Review the relevant product documentation when estimating usage:

- [Vercel Functions usage and pricing](/docs/functions/usage-and-pricing) and [limits](/docs/functions/limitations) for agent routes and tool execution.
- [Vercel Workflows pricing and limits](/docs/workflows/pricing) for durable sessions.
- [Vercel Sandbox pricing and limits](/docs/sandbox/pricing) for isolated code execution.
- [AI Gateway pricing](/docs/ai-gateway/pricing) for model calls and BYOK.
- [Vercel Blob usage and pricing](/docs/vercel-blob/usage-and-pricing) for persistent file memory.
- [Tracing usage and pricing](/docs/tracing/configure-tracing#usage-and-pricing) for indexed Agent Runs spans.

Use [Agent Runs](/docs/agent-runs) to inspect a representative task's model and tool calls, and configure [Spend Management](/docs/spend-management) for your team.

## Next steps

- [Build a software factory](/docs/agent-resources/software-factory/eve) that investigates issues, checks changes, and prepares draft pull requests.
- [Connect eve to external services](/docs/connect/frameworks/eve) with Vercel Connect.
- [Add MCP servers to your agent](/docs/mcp/integrations/eve).
- [Give your agent GitHub tools](/docs/connect/frameworks/eve#give-the-agent-github-tools) that request tokens from a GitHub connector and ask for approval before each write.
- [Answer from your content](/docs/integrations/sanity-context) by connecting your agent to Sanity Context, which reads from Sanity datasets, websites, and files.
- [Bring your agent to chat platforms](/docs/chat-sdk/eve) with Chat SDK.
- [Configure OpenTelemetry](https://eve.dev/docs/observability/otel) to control trace content and export destinations.
- [Explore eve's execution model](https://eve.dev/docs/concepts/execution-model-and-durability) for sessions, turns, and durability.

**Agent checklist** [→](/docs/agent-checklist?framework=eve)

Check access, tools, reliability, observability, and cost before you launch
your eve agent.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
