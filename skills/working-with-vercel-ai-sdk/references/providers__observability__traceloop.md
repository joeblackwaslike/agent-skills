---
source: "https://ai-sdk.dev/providers/observability/traceloop.md"
fetched_at: "2026-09-28T10:43:29.656Z"
sha256: "abb16327d6658ee7cbbdf1429db405d49bc15b70d0eaf5c5a1411ec6adb12357"
---

# Traceloop

[Traceloop](https://www.traceloop.com/) is a development platform for building reliable AI applications.
After integrating with the AI SDK, you can use Traceloop to trace, monitor, and experiment with LLM providers, prompts and flows.

## Setup

Traceloop supports [AI SDK telemetry data](/docs/ai-sdk-core/telemetry) through [OpenTelemetry](https://opentelemetry.io/docs/).
You'll need to sign up at https://app.traceloop.com and get an API Key.

### Next.js

To use the AI SDK to send telemetry data to Traceloop, set these environment variables in your Next.js app's `.env` file:

```bash
OTEL_EXPORTER_OTLP_ENDPOINT=https://api.traceloop.com
OTEL_EXPORTER_OTLP_HEADERS="Authorization=Bearer <Your API Key>"
```

Install `@ai-sdk/otel` and register the `LegacyOpenTelemetry` in your `instrumentation.ts` file:

```typescript filename="instrumentation.ts"
import { registerTelemetry } from 'ai';
import { LegacyOpenTelemetry } from '@ai-sdk/otel';

registerTelemetry(new LegacyOpenTelemetry());
```

You can then use the `telemetry` option to enable telemetry on supported AI SDK function calls:

```typescript highlight="7-12"
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


## Navigation

- [Arize AX](/providers/observability/arize-ax)
- [Axiom](/providers/observability/axiom)
- [Braintrust](/providers/observability/braintrust)
- [Confident AI](/providers/observability/confident-ai)
- [Helicone](/providers/observability/helicone)
- [Laminar](/providers/observability/laminar)
- [Langfuse](/providers/observability/langfuse)
- [LangSmith](/providers/observability/langsmith)
- [LangWatch](/providers/observability/langwatch)
- [Latitude](/providers/observability/latitude)
- [Maxim](/providers/observability/maxim)
- [MLflow](/providers/observability/mlflow)
- [Patronus](/providers/observability/patronus)
- [PostHog](/providers/observability/posthog)
- [Raindrop](/providers/observability/raindrop)
- [Respan](/providers/observability/respan)
- [Scorecard](/providers/observability/scorecard)
- [Sentry](/providers/observability/sentry)
- [SigNoz](/providers/observability/signoz)
- [Traceloop](/providers/observability/traceloop)
- [Weave](/providers/observability/weave)


[Full Sitemap](/sitemap.md)
