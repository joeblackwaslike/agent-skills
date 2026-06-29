---
title: Observability
product: vercel
url: /docs/eve/observability
canonical_url: "https://vercel.com/docs/eve/observability"
last_updated: 2026-06-19
type: conceptual
prerequisites:
  - /docs/eve
related:
  - /docs/eve/concepts
  - /docs/observability
summary: View agent runs in the Vercel dashboard with no setup, and optionally export AI SDK spans through OpenTelemetry.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/observability.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "9e5e2fd5baf707e119aaa2870b34d5e6a089a29a95739115367acb0d5d957da4"
---

# Observability

eve gives you two ways to observe an agent:

- **Agent Runs**: the primary view. Every eve project gets a built-in Agent Runs dashboard in
  Vercel. It works by default with no instrumentation or configuration.
- **OpenTelemetry export**: optional. Send AI SDK spans to your own OpenTelemetry backend when you
  want traces alongside the rest of your stack.

## Agent Runs

Open your project in the Vercel dashboard and go to [**Agent Runs**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability%2Fagent-runs\&title=Agent+Runs). This is the
primary observability surface for eve, and it appears automatically for eve projects, with no
instrumentation file required.

The overview shows:

- **Runs** over time, broken down by trigger (such as Slack and HTTP).
- **Token usage** over the same window, split into input, output, and cached tokens.
- A **table of runs** with the triggering message, trigger type, tokens in and out, turn count,
  duration, and time.

Select a run to drill into it. The run detail shows its model, trigger, and deployment, then a
per-turn breakdown with:

- **Timings** for each step in the turn, including skill loads and individual tool calls.
- **Input** and **Output** for the turn.
- **Reasoning** the model produced along the way.
- **Tool Calls** made during the turn, with their arguments and results.
- Input, cached, and output token counts for the turn.

Because this view is always on, it is the fastest way to confirm an agent is running in production
and to inspect what happened on any given session.

As the deployer, where your agent processes personal, sensitive, or regulated data, you may be
required to disclose this capture as required by applicable laws and in your privacy materials.

## Export AI SDK spans with OpenTelemetry

Agent Runs covers most needs on its own. If you also want AI SDK traces in an external backend, eve
can export them through OpenTelemetry.

eve auto-discovers `agent/instrumentation.ts` and runs it at server startup before any agent code.
Its presence enables telemetry, and there is no separate toggle. Register an OpenTelemetry provider in
the `setup` callback, which receives the resolved agent name:

```ts filename="agent/instrumentation.ts"
import { BraintrustExporter } from '@braintrust/otel';
import { defineInstrumentation } from 'eve/instrumentation';
import { registerOTel } from '@vercel/otel';

export default defineInstrumentation({
  setup: ({ agentName }) =>
    registerOTel({
      serviceName: agentName,
      traceExporter: new BraintrustExporter({
        parent: `project_name:${agentName}`,
        filterAISpans: true,
      }),
    }),
});
```

Any OpenTelemetry-compatible backend works, such as Braintrust, Raindrop, Arize, Honeycomb, Datadog, or Jaeger. Install the
exporter you need and configure it in the callback. The agent name is resolved at compile time from
your project, so you never hard-code a service name.

Three optional fields control what the AI SDK records inside those spans:

- `recordInputs`: record full message history on each step span (default `true`). Set to `false`
  for sensitive inputs or smaller payloads.
- `recordOutputs`: record model outputs on spans (default `true`).
- `functionId`: override the function name on spans (defaults to the agent name).

## Trace hierarchy

When telemetry is enabled, each turn produces a trace with a parent span per turn and child spans
for each model call and tool execution:

```text
ai.eve.turn  {eve.session.id}
  +-- ai.streamText                           step 1
  |     +-- ai.streamText.doStream            model call
  |     +-- ai.toolCall  {toolName: search}   tool exec
  +-- ai.streamText                           step 2
  |     +-- ai.streamText.doStream
  |     +-- ai.toolCall  {toolName: read}
  +-- ai.streamText                           step 3 (final text)
```

eve injects session, turn, step, and channel context onto the spans (`eve.version`,
`eve.session.id`, `eve.environment`, `eve.turn.id`, `eve.turn.sequence`, `eve.step.index`,
`eve.channel.kind`). You can attach your own per-call values through the `events["step.started"]`
callback, which returns a `runtimeContext` object that rides onto the model-call span.

## Next steps

- [Concepts](/docs/eve/concepts): learn how eve's runtime pieces fit together.
- [Observability](/docs/observability): the broader Vercel observability surface


---

[View full sitemap](/docs/sitemap)
