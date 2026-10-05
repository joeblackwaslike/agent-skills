---
title: Latitude
description: Monitor and debug your AI SDK application with Latitude
url: "https://ai-sdk.dev/providers/observability/latitude"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/observability/latitude.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "3806f2fe3ec172add4f7721af0abd1aef36e85e36222aececee46ba4e1e1e5da"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Latitude](https://latitude.so) ([GitHub](https://github.com/latitude-dev/latitude-llm)) is an open-source MIT-licensed platform for AI agent observability with semantic trace search and issue tracking. It integrates with the AI SDK to capture:

- Traces of every `generateText`, `streamText`, and tool call
- Token usage and latency per call
- Errors and failure patterns grouped as recurring issues

## Setup

Latitude's SDK registers a global OpenTelemetry tracer. Once you register the AI SDK's telemetry integration, every AI SDK call emits spans automatically.

Install both packages:

**Packages:** `@latitude-data/telemetry`, `@ai-sdk/otel`

Sign in at [app.latitude.so](https://app.latitude.so) and grab your API key and project slug from the dashboard. Set them in your environment:

```bash title=".env"
LATITUDE_API_KEY="..."
LATITUDE_PROJECT_SLUG="..."
```

Initialize Latitude and register telemetry once at startup. After that, every AI SDK call emits traces automatically:

```ts
import { Latitude } from '@latitude-data/telemetry';
import { registerTelemetry, generateText } from 'ai';
import { OpenTelemetry } from '@ai-sdk/otel';
import { openai } from '@ai-sdk/openai';

const latitude = new Latitude({
  apiKey: process.env.LATITUDE_API_KEY!,
  project: process.env.LATITUDE_PROJECT_SLUG!,
});

registerTelemetry(new OpenTelemetry());

const { text } = await generateText({
  model: openai('gpt-6-astra'),
  prompt: 'Hello',
});

await latitude.shutdown();
```

For named traces and per-call metadata (tags, user IDs, session IDs), wrap calls in Latitude's `capture()` helper:

```ts
import { capture } from '@latitude-data/telemetry';

await capture('generate-support-reply', async () => {
  const { text } = await generateText({
    model: openai('gpt-6-astra'),
    prompt: 'Hello',
  });
  return text;
});
```

## Resources

- [Latitude Vercel AI SDK guide](https://docs.latitude.so/telemetry/frameworks/vercel-ai-sdk)
- [Latitude documentation](https://docs.latitude.so)
- [GitHub repository](https://github.com/latitude-dev/latitude-llm)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)