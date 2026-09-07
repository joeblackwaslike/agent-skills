---
title: eve
product: vercel
url: /docs/eve
canonical_url: "https://vercel.com/docs/eve"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  []
related:
  - /docs/release-phases/public-beta-agreement
  - /docs/functions
  - /docs/workflows
  - /docs/sandbox
  - /docs/ai-gateway
summary: Build and deploy durable backend AI agents with eve, an open-source, filesystem-first framework.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "2999e029ef49353fe45c5668bf3221c0f48c1b868aef04853c016aee23c3cd7b"
---

# eve

## Build durable backend agents with eve (Beta)

Build durable backend AI agents with eve, an open-source, filesystem-first framework. Agent files compile into an app that runs locally or on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing eve, an open-source agent framework](https://vercel.com/changelog/introducing-eve-an-open-source-agent-framework?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related)
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Give your eve agent secure access to your private AWS RDS database](https://vercel.com/kb/guide/give-eve-agent-secure-access-to-aws-rds-database?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Connect an eve agent to a private AWS RDS database using Vercel Secure Compute and VPC peering, with a read-only query t
- [How to run a multi-step research agent on Vercel](https://vercel.com/kb/guide/how-to-run-a-multi-step-research-agent-on-vercel?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — An end-to-end architecture for production research agents on Vercel using Sandbox, Workflows, and AI Gateway with isolat
- [The Agent Stack](https://vercel.com/blog/agent-stack?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related)
- [Deployment](https://eve.dev/docs/guides/deployment/overview?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Choose a deployment strategy and prepare an eve agent for production.
- [Next.js](https://eve.dev/docs/guides/frontend/nextjs?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Run an eve agent and a Next.js app as one project with withEve.
- [Draft content in your voice from Slack with eve](https://vercel.com/kb/guide/eve-content-agent?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Deploy the eve content agent template, a Slack bot that drafts blog posts, LinkedIn posts, release notes, and newsletter
- [How to add tools to your eve agent](https://vercel.com/kb/guide/how-to-add-eve-tools?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Add tools to an eve agent by creating a TypeScript file under agent/tools/ with defineTool, and gate sensitive ones on h
- [Build your first Slack agent with eve](https://vercel.com/kb/guide/eve-slack-agent-starter?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Deploy the eve Slack agent template: a starter Slack bot built on the eve framework with an example tool and skill.
- [Terminal UI](https://eve.dev/docs/guides/dev-tui?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Use eve locally or connect to a deployed agent from an interactive terminal UI.
- [Ship It](https://eve.dev/docs/tutorial/ship-it?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=related) — Part 9 of the Build an Agent tutorial. Put a web dashboard on the agent with useEveAgent, replace placeholderAuth, and d

Full cross-link map for this page: [/docs/eve.graph.md](/docs/eve.graph.md?from=related&source_path=%2Fdocs%2Feve&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

#### Define an agent

```md filename="agent/instructions.md"
You are a concise assistant. Use tools when they are available.
```

```typescript filename="agent/agent.ts"
import { defineAgent } from 'eve';

export default defineAgent({
  model: 'openai/gpt-5.4-mini',
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
- [AI Gateway](/docs/ai-gateway) routes model requests and handles provider fallbacks.
- [Vercel Connect](/docs/connect/frameworks/eve) manages OAuth tokens and API keys for eve connections and channels.
- [Vercel Observability](/docs/observability) shows agent runs, token usage, and performance.

## Getting started

The eve CLI scaffolds a new agent project, installs dependencies, initializes Git, and starts the development server.

```bash filename="terminal"
npx eve@latest init my-agent
```

To add eve to an existing app, follow the [quickstart steps](https://eve.dev/docs/getting-started#quick-start).

Follow the generated README for the project-specific dev command, or run the agent locally with the
standard script from the scaffold:

```bash filename="terminal"
pnpm dev
```

See the [eve Getting Started guide](https://eve.dev/docs/getting-started) for the complete setup,
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
  model: 'openai/gpt-5.4-mini',
});
```

eve resolves model strings such as `openai/gpt-5.4-mini` through [AI Gateway](/docs/ai-gateway), so
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

## Features

- [**Agent project**](/docs/eve/concepts#agent-project): Author an agent from files under
  `agent/`, including instructions, runtime config, tools, skills, channels, connections, and a
  sandbox.
- [**Durable sessions**](/docs/eve/concepts#sessions-and-turns): Create sessions that stream
  incremental output and resume after cold starts, deploys, or long pauses.
- [**Tools and skills**](/docs/eve/concepts#tools-and-skills): Give the model typed actions and
  load larger procedures only when relevant.
- [**Agent Runs**](/docs/eve/observability): Inspect sessions, turns, tools, reasoning, timing, and
  token usage in the Vercel dashboard.

## Start with a template

Deploy an eve template to start building AI agents that use Vercel Connect to
securely access third-party services and APIs:

## Resources

**eve documentation**: Explore the complete framework documentation, including guides, channels, tools, skills, and API references. [Learn more →](https://eve.dev/docs)

**Concepts**: Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together. [Learn more →](/docs/eve/concepts)

**Pricing and Limits**: Understand how eve usage maps to Vercel resources and inherited platform limits. [Learn more →](/docs/eve/pricing)

**Observability**: Inspect agent runs in the Vercel dashboard with no setup, and optionally export AI SDK spans through OpenTelemetry. [Learn more →](/docs/eve/observability)


---

[View full sitemap](/docs/sitemap)
