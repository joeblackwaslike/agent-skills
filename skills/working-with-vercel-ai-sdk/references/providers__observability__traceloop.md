---
title: Traceloop
description: Monitoring and evaluating LLM applications with Traceloop
url: "https://ai-sdk.dev/providers/observability/traceloop"
docs_index: /llms.txt
source: "https://ai-sdk.dev/providers/observability/traceloop.md"
fetched_at: "2026-10-05T11:19:46.520Z"
sha256: "867bdecaeb62636e089ef05ba20ced7b1f0ef727665546bc2673f624d8c18657"
---

> For an index of all documentation, see [/llms.txt](/llms.txt).

[Traceloop](https://www.traceloop.com/) is a development platform for building reliable AI applications.
After integrating with the AI SDK, you can use Traceloop to trace, monitor, and experiment with LLM providers, prompts and flows.

## Setup

Traceloop supports [AI SDK telemetry data](/docs/ai-sdk-core/telemetry) through [OpenTelemetry](https://opentelemetry.io/docs/).
You'll need to sign up at [https://app.traceloop.com](https://app.traceloop.com) and get an API Key.

### Next.js

To use the AI SDK to send telemetry data to Traceloop, set these environment variables in your Next.js app's `.env` file:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.traceloop.com
OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <Your API Key>"
```

Install `@ai-sdk/otel` and register the `LegacyOpenTelemetry` in your `instrumentation.ts` file:

```typescript title="instrumentation.ts"
import { registerTelemetry } from 'ai';
import { LegacyOpenTelemetry } from '@ai-sdk/otel';

registerTelemetry(new LegacyOpenTelemetry());
```

You can then use the `telemetry` option to enable telemetry on supported AI SDK function calls:

```typescript {7-12}
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const result = await generateText({
  model: openai('gpt-6-luna'),
  prompt: 'What is 2 + 2?',
  telemetry: {
    metadata: {
      query: 'weather',
      location: 'San Francisco',
    },
  },
});
```

## Resources

- [Traceloop demo chatbot](https://www.traceloop.com/docs/demo)
- [Traceloop docs](https://www.traceloop.com/docs)

---

For a semantic overview of all documentation, see [/sitemap.md](/sitemap.md)

For an index of all available documentation, see [/llms.txt](/llms.txt)

For agent-facing discovery, including API and MCP surfaces, see [/agents.md](/agents.md)