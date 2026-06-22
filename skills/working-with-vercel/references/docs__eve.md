---
title: Eve
product: vercel
url: /docs/eve
canonical_url: "https://vercel.com/docs/eve"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/functions
  - /docs/workflows
  - /docs/sandbox
  - /docs/ai-gateway
  - /docs/connect
summary: Eve is a filesystem-first framework for building durable backend AI agents that run on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "e4f96a395c7c1c435dc37b09f63a96de1d26b3d7ba234cd90334a5a871f12f0a"
---

# eve

[eve](https://eve.dev/) is a filesystem-first framework for durable backend AI agents. You define each agent with files
under an `agent/` directory. eve discovers those files and compiles them into an app that runs on
[Vercel Functions](/docs/functions).

> **💡 Note:** eve is currently in beta and subject to the
> .
> The framework, APIs, documentation, and behavior may change before general availability.

eve uses these Vercel services:

- [Vercel Workflows](/docs/workflows) persist session state and resume interrupted work.
- [Vercel Sandbox](/docs/sandbox) isolates code execution.
- [AI Gateway](/docs/ai-gateway) routes model requests and handles provider fallbacks.
- [Vercel Connect](/docs/connect) manages OAuth tokens and API keys for external services.
- [Vercel Observability](/docs/observability) shows agent runs, token usage, and performance.

## Getting started

The fastest path is the eve CLI. Run the published package with `npx` to scaffold a new
agent project, install dependencies, initialize Git, and start the development server:

```bash
npx eve@latest init my-agent
```

To add eve to an existing app, follow the [quickstart steps](https://eve.dev/docs/getting-started#quick-start).

Follow the generated README for the project-specific dev command, or run the agent locally with the
standard script from the scaffold:

```bash
pnpm dev
```

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

```bash
curl -X POST http://127.0.0.1:3000/eve/v1/session \
  -H 'content-type: application/json' \
  -d '{"message":"What is the weather in Brooklyn?"}'
```

The response returns a `continuationToken` in the body and an `x-eve-session-id` header. Attach to
the session stream to receive NDJSON lifecycle events:

```bash
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

## Resources

**Concepts**: Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together. [Learn more →](/docs/eve/concepts)

**Pricing and Limits**: Understand how eve usage maps to Vercel resources and inherited platform limits. [Learn more →](/docs/eve/pricing)

**Observability**: Inspect agent runs in the Vercel dashboard with no setup, and optionally export AI SDK spans through OpenTelemetry. [Learn more →](/docs/eve/observability)


---

[View full sitemap](/docs/sitemap)
