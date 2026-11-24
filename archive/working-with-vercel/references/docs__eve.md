---
title: eve
product: vercel
url: /docs/eve
canonical_url: "https://vercel.com/docs/eve"
last_updated: 2026-09-21
type: conceptual
prerequisites:
  []
related:
  - /docs/release-phases/public-beta-agreement
  - /docs/functions
  - /docs/workflows
  - /docs/sandbox
  - /docs/vercel-blob
summary: Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "595701a56d38e9b32647ebcf52f3e5c54c442f1e4bac60db2eaae3df45b7fb95"
---

# eve

## Build durable backend agents with eve (Beta)

Build durable backend AI agents with eve, an open-source, filesystem-first framework. Agent files compile into an app that runs locally or on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [How to build a GitHub agent with eve and GitHub Tools](https://vercel.com/kb/guide/github-agent-eve) — Build a GitHub agent with eve, GitHub Tools, and Vercel Connect. Register AI-callable GitHub tools, gate writes behind d
- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework)
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [The Agent Stack](https://vercel.com/blog/agent-stack)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [How to use subagents with eve](https://vercel.com/kb/guide/how-to-use-eve-subagents) — Learn how to use subagents with eve, including the built-in agent tool, declared specialist subagents, the isolation bou
- [Ship It](https://eve.dev/docs/tutorial/ship-it) — Part 8 of the Build an Agent tutorial. Put a web dashboard on the agent with useEveAgent, replace placeholderAuth, and d
- [Running eve Agents Durably on Vercel](https://vercel.com/docs/agent-harnesses/eve) — eve agents are durable out of the box on Vercel, with no extra configuration.
- [Security for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/security) — What a durable agent harness may run in your Vercel Function, where the commands and files a model picks run instead, an
- [Agent Skills](https://vercel.com/docs/agent-resources/skills) — Install skills to enhance AI coding agents with specialized capabilities for React, Next.js, deployment, and more.

Full cross-link map for this page: [/docs/eve.graph.md](/docs/eve.graph.md)
<!-- /docsgraph:related -->

#### Define an agent

```md filename="agent/instructions.md"
You are a concise assistant. Use tools when they are available.
```

```typescript filename="agent/agent.ts"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'openai/gpt-6-astra',
});
```

#### Add a tool

```typescript filename="agent/tools/get_weather.ts"
import { defineTool } from 'eve/tools';
import { z } from 'zod';

export default defineTool({
  description: 'Get the current weather for a city.',
  inputSchema: z.object({ city: z.string() }),
  async execute({ city }) {
    return { city, condition: 'Sunny', temperatureF: 72 };
  },
});
```

#### Start a durable session

```bash filename="terminal"
# Run against a local eve agent
curl -X POST http://127.0.0.1:3000/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"What is the weather in Brooklyn?"}'
```

> **💡 Note:** eve is currently in beta and subject to the [Vercel beta terms](/docs/release-phases/public-beta-agreement).
> The framework, APIs, documentation, and behavior may change before general availability.

These docs cover deploying and running eve on Vercel. In this environment, the compiled app runs on
[Vercel Functions](/docs/functions) and integrates with these services:

- [Vercel Workflows](/docs/workflows) persist session state and resume interrupted work.
- [Vercel Sandbox](/docs/sandbox) isolates code execution.
- [Vercel Blob](/docs/vercel-blob#store-eve-agent-memory) stores persistent memory for eve's built-in file memory provider.
- [Vercel Services](/docs/services) deploys agents alongside frontends and backends in one project.
- [AI Gateway](/docs/ai-gateway) routes model requests and handles provider fallbacks.
- [Vercel Connect](/docs/connect/frameworks/eve) manages OAuth tokens and API keys for eve connections and channels.
- [Vercel Observability](/docs/observability) shows agent runs, token usage, and performance.

eve sessions are durable out of the box on Vercel, so you don't need to install `durable-harness` or configure a queue. To learn how durability works or run agents built with another framework, see [Running Agent Harnesses Durably](/docs/agent-harnesses).

## Getting started

The eve CLI scaffolds a new agent project, installs dependencies, initializes Git, and opens the terminal UI.

```bash filename="terminal"
npx eve@latest init my-agent
```

To add eve to an existing app, follow the [quickstart steps](/docs/eve/getting-started#initialize-the-project).

Follow the generated README for the project-specific dev command, or run the agent locally with the
standard script from the scaffold:

```bash filename="terminal"
pnpm dev
```

See [Getting started with eve](/docs/eve/getting-started) for the complete setup,
local development, and first-session walkthrough.

## Define an agent

A minimal agent is two files. `agent/instructions.md`:

```md
You are a concise assistant. Use tools when they are available.
```

And `agent/agent.ts`:

```ts
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'openai/gpt-6-astra',
});
```

eve resolves model strings such as `openai/gpt-6-astra` through [AI Gateway](/docs/ai-gateway), so
on Vercel you authenticate with OIDC and don't need to manage provider API keys.

### Add a tool

Each file in `agent/tools/` is one tool. Create `agent/tools/get_weather.ts`:

```ts
import { defineTool } from 'eve/tools';
import { z } from 'zod';

// The runtime tool name comes from the filename, so the model sees `get_weather`.
export default defineTool({
  description: 'Get the current weather for a city.',
  inputSchema: z.object({
    city: z.string(),
  }),
  async execute(input) {
    return { city: input.city, condition: 'Sunny', temperatureF: 72 };
  },
});
```

## Start a session

Start a durable session and stream its output:

```bash filename="terminal"
curl -X POST http://127.0.0.1:3000/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"What is the weather in Brooklyn?"}'
```

The response returns a `continuationToken` in the body and an `x-eve-session-id` header. Attach to
the session stream to receive NDJSON lifecycle events:

```bash filename="terminal"
curl http://127.0.0.1:3000/eve/v1/session/<sessionId>/stream
```

## Remember context across conversations

Durable sessions preserve conversation state so work can resume. Memory lets an agent recall selected facts and preferences in future conversations. Each memory slot has a scope that controls who shares it, such as an authenticated user or a Slack channel.

The built-in `fileMemory()` provider stores a small document per scope in a private Vercel Blob store on Vercel. The agent recalls the document before each turn and updates it through memory tools. Follow [Store eve agent memory](/docs/vercel-blob#store-eve-agent-memory) to set it up, or read [Choose an eve memory provider](/kb/guide/choose-an-eve-memory-provider) to compare storage and retrieval options.

Deploy the [eve Memory Agent template](/templates/eve/eve-memory-agent) for a Slack assistant that keeps personal preferences separate from shared channel conventions.

## Deploy an agent with your application

Follow [Deploying eve to Vercel](/docs/eve/deploying) to link a project, configure access, deploy, and verify your agent.

Use [Vercel Services](/docs/services) to deploy an eve agent alongside a frontend and backend in one Vercel project. [Service bindings](/docs/services/bindings) let services call each other privately, so a backend can serve the agent and frontend without a public route.

The [eve Agent with Python template](/templates/eve/eve-agent-with-python) combines an eve agent, a Next.js frontend, and a FastAPI backend. The agent and frontend use the same backend for a shared task list, and the agent calls Python tools for statistics and text analysis. See the [template repository](https://github.com/vercel-labs/eve-agent-python-template) for the service configuration and setup instructions.

## Features

- [**Agent project**](/docs/eve/concepts#agent-project): Author an agent from files under
  `agent/`, including instructions, runtime config, tools, skills, channels, connections, and a
  sandbox.
- [**Durable sessions**](/docs/eve/concepts#sessions-and-turns): Create sessions that stream
  incremental output and resume after cold starts, deploys, or long pauses.
- [**Memory**](#remember-context-across-conversations): Recall facts and preferences across conversations, with scopes that control who shares them.
- [**Tools and skills**](/docs/eve/concepts#tools-and-skills): Give the model typed actions and
  load larger procedures only when relevant.
- [**Agent Runs**](/docs/eve/agent-runs): Inspect sessions, turns, tools, reasoning, timing, and
  token usage in the Vercel dashboard.

## Start with a template

Choose a recurring task with a result your team can review before expanding an agent's access. Explore [seven internal AI agents teams can build](/i/internal-ai-agent-examples) for use cases, access boundaries, and ways to evaluate a first pilot.

Deploy an eve template to start building AI agents that use Vercel Connect to
securely access third-party services and APIs:

## Resources

**How software factories work**: Learn when to use a software factory and how eve coordinates work from issue to review. [Learn more →](/docs/eve/software-factory)

**eve documentation**: Explore the complete framework documentation, including guides, channels, tools, skills, and API references. [Learn more →](https://eve.dev/docs)

**Getting Started**: Create an agent, connect a model, and send your first message. [Learn more →](/docs/eve/getting-started)

**Deploying to Vercel**: Deploy an agent on its own or alongside your application. [Learn more →](/docs/eve/deploying)

**Authentication**: Verify service callers and browser users before they access your agent. [Learn more →](/docs/eve/authentication)

**Concepts**: Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together. [Learn more →](/docs/eve/concepts)

**Pricing and Limits**: Understand how eve usage maps to Vercel resources and inherited platform limits. [Learn more →](/docs/eve/pricing)

**Agent Runs**: Inspect eve sessions, configure trace sampling, and control the content Agent Runs receives. [Learn more →](/docs/eve/agent-runs)

**Observability**: Configure process-wide OpenTelemetry settings, built-in exports, and third-party destinations. [Learn more →](/docs/eve/observability)

**Automatically approve tool calls with Jev**: Use Jev to review tool calls, approve routine actions, and request human approval when needed. [Learn more →](/kb/guide/auto-approve-tool-calls-eve-jev)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
