---
source: "https://ai-sdk.dev/providers/observability/latitude.md"
fetched_at: "2026-06-11T15:39:44.005Z"
sha256: "dbe61f99209d7aeb3d55b74cfc2092b66c8c12182e8f7c02ac5ac97dc4de9acb"
---

# Latitude Observability

[Latitude](https://latitude.so) ([GitHub](https://github.com/latitude-dev/latitude-llm)) is an open-source MIT-licensed platform for AI agent observability with semantic trace search and issue tracking. It integrates with the AI SDK to capture:

- Traces of every `generateText`, `streamText`, and tool call
- Token usage and latency per call
- Errors and failure patterns grouped as recurring issues

## Setup

Latitude ships an SDK that wires up OpenTelemetry under the hood. The AI SDK emits spans through its `experimental_telemetry` flag and Latitude collects them.

Install the SDK:

<Tabs items={['pnpm', 'npm', 'yarn', 'bun']}>
  <Tab>
    <Snippet text="pnpm add @latitude-data/telemetry" dark />
  </Tab>
  <Tab>
    <Snippet text="npm install @latitude-data/telemetry" dark />
  </Tab>
  <Tab>
    <Snippet text="yarn add @latitude-data/telemetry" dark />
  </Tab>
  <Tab>
    <Snippet text="bun add @latitude-data/telemetry" dark />
  </Tab>
</Tabs>

Sign in at [app.latitude.so](https://app.latitude.so) and grab your API key and project slug from the dashboard. Set them in your environment:

```bash filename=".env"
LATITUDE_API_KEY="..."
LATITUDE_PROJECT_SLUG="..."
```

Initialize Latitude once at startup and set `experimental_telemetry.isEnabled` to `true` on AI SDK calls:

```ts
import { Latitude, capture } from '@latitude-data/telemetry';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

const latitude = new Latitude({
  apiKey: process.env.LATITUDE_API_KEY!,
  project: process.env.LATITUDE_PROJECT_SLUG!,
});

await capture('generate-support-reply', async () => {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    prompt: 'Hello',
    experimental_telemetry: {
      isEnabled: true,
    },
  });
  return text;
});

await latitude.shutdown();
```

The `capture()` wrapper groups all AI SDK calls inside the callback under a single named trace. `shutdown()` flushes pending spans before the process exits.

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
- [Respan](/providers/observability/respan)
- [Scorecard](/providers/observability/scorecard)
- [SigNoz](/providers/observability/signoz)
- [Traceloop](/providers/observability/traceloop)
- [Weave](/providers/observability/weave)


[Full Sitemap](/sitemap.md)
