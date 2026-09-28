---
source: "https://ai-sdk.dev/providers/observability/latitude.md"
fetched_at: "2026-09-28T10:43:29.656Z"
sha256: "4eb229a8f7cf51528de0b2b90a72dead7a31f4c3a4373750820b012b6254d2df"
---

# Latitude Observability

[Latitude](https://latitude.so) ([GitHub](https://github.com/latitude-dev/latitude-llm)) is an open-source MIT-licensed platform for AI agent observability with semantic trace search and issue tracking. It integrates with the AI SDK to capture:

- Traces of every `generateText`, `streamText`, and tool call
- Token usage and latency per call
- Errors and failure patterns grouped as recurring issues

## Setup

Latitude's SDK registers a global OpenTelemetry tracer. Once you register the AI SDK's telemetry integration, every AI SDK call emits spans automatically.

Install both packages:

<InstallPackages packages="@latitude-data/telemetry @ai-sdk/otel" />

Sign in at [app.latitude.so](https://app.latitude.so) and grab your API key and project slug from the dashboard. Set them in your environment:

```bash filename=".env"
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
