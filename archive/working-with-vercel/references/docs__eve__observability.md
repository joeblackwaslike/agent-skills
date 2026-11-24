---
title: Observability
product: vercel
url: /docs/eve/observability
canonical_url: "https://vercel.com/docs/eve/observability"
last_updated: 2026-06-24
type: conceptual
prerequisites:
  - /docs/eve
related:
  - /docs/eve/agent-runs
  - /docs/eve/concepts
  - /docs/observability
summary: Configure process-wide OpenTelemetry settings, third-party destinations, filtering, and built-in exports for eve agents.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/eve/observability.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "a4b948bdfcbbaf726897cb5c7ff0298d4c1965f6bfd64aecabecad7ce8fc7282"
---

# Observability

eve configures its built-in OpenTelemetry destinations automatically. `eve dev` records local
traces, while preview and production deployments export to
[Agent Runs](/docs/eve/agent-runs) by default. Use this page to configure process-wide tracing,
third-party destinations, and export policies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects)
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli)
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Migrate Instrumentation](https://eve.dev/docs/observability/instrumentation-migration) — Move a single instrumentation.ts configuration into lifecycle instrumentation and OpenTelemetry destinations.
- [Instrumentation](https://eve.dev/docs/observability/instrumentation) — Configure lifecycle instrumentation, handle runtime events, and control the content each destination receives.
- [Terminal UI](https://eve.dev/docs/guides/dev-tui) — Use eve locally or connect to a deployed agent from an interactive terminal UI.
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Instrumentation](https://vercel.com/docs/tracing/instrumentation) — Learn how to instrument your application to understand performance and infrastructure details.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [Tracing](https://vercel.com/docs/tracing) — Learn how to trace your application to understand performance and infrastructure details.
- [Using eve with Chat SDK](https://vercel.com/docs/chat-sdk/eve) — Send Chat SDK messages to an eve agent with a channel, persistent state, and Vercel Connect.

Full cross-link map for this page: [/docs/eve/observability.graph.md](/docs/eve/observability.graph.md)
<!-- /docsgraph:related -->

## Configure OpenTelemetry

OpenTelemetry configuration uses separate helpers for process-wide settings, built-in destinations,
and third-party destinations:

- Use `otel()` for process-wide settings such as the resource, sampler, propagators, or trace capture
  policy. Declare it at most once.
- Use `localTraces()` to customize local tracing.
- Use `agentRuns()` to customize the built-in
  [Agent Runs integration](/docs/eve/agent-runs).
- Use `otelIntegration()` only to add a third-party OpenTelemetry destination. Declare one file per
  exporter or processor chain.

### Configure process-wide trace content

Add `agent/instrumentation/otel.ts` when you need process-wide OpenTelemetry settings or want to
control the content eve writes to every destination:

```ts filename="agent/instrumentation/otel.ts"
import { otel } from 'eve/instrumentation/otel';

export default otel({
  resource: {
    'deployment.environment': process.env.VERCEL_ENV ?? 'development',
  },
  tracePolicy: ({ audience, environment }) => ({
    emit: true,
    recordInputs: audience === 'public' || environment === 'development',
    recordOutputs: audience === 'public' || environment === 'development',
  }),
});
```

The `tracePolicy` is a capture ceiling shared by every OpenTelemetry destination. A destination
cannot restore content excluded by this policy. The policy does not affect lifecycle instrumentation
created with `defineInstrumentation()`.

To configure content for the built-in Vercel integration, see
[Configure Agent Runs trace content](/docs/eve/agent-runs#configure-agent-runs-trace-content).

### Add a third-party OpenTelemetry destination

Install `@vercel/otel` before using its exporters:

```bash
pnpm add @vercel/otel
```

Create an integration file for the destination:

```ts filename="agent/instrumentation/honeycomb.ts"
import { OTLPHttpProtoTraceExporter } from '@vercel/otel';
import { otelIntegration } from 'eve/instrumentation/otel';

export default otelIntegration({
  exportPolicy: {
    span: () => ({ redact: true, inputs: true, outputs: true }),
  },
  traceExporter: new OTLPHttpProtoTraceExporter({
    url: 'https://api.honeycomb.io/v1/traces',
    headers: {
      'x-honeycomb-team': process.env.HONEYCOMB_API_KEY!,
    },
  }),
});
```

Any OpenTelemetry-compatible backend can receive eve traces. Pass `spanProcessors` to
`otelIntegration()` when a destination needs additional filtering or transformation. The example's
`exportPolicy` preserves span metadata while removing inputs and outputs from this destination.

### Add runtime context to a third-party destination

For a third-party destination, use `runtimeContext` to add JSON values to AI SDK spans for each model
attempt. For typed channel metadata, import the channel definition and narrow with `isChannel`:

```ts filename="agent/instrumentation/support.ts"
import { isChannel } from 'eve/instrumentation';
import { otelIntegration } from 'eve/instrumentation/otel';

import supportChannel from '../channels/support';

export default otelIntegration({
  runtimeContext(input) {
    if (!isChannel(input.channel, supportChannel)) return undefined;

    return {
      'support.channel_id': input.channel.metadata.channelId ?? '',
      'support.user_id': input.channel.metadata.triggeringUserId ?? '',
    };
  },
});
```

The resolver receives the channel, session, final model input, step, and turn. Keys beginning with
`eve.` are reserved. Content excluded by `otel({ tracePolicy })` is not available to the resolver.

### Filter built-in and third-party destinations

Third-party destinations created with `otelIntegration()` and built-in destinations configured with
`localTraces()` or `agentRuns()` accept one `exportPolicy` object or an array applied in order. Each
policy filters spans and attributes before that destination's processors receive them.

Return `{ emit: true }` to retain a span or attribute, and `{ emit: false }` to omit it from this
destination. For attributes, return `{ replace: true, value }` to replace the value. To retain a
span while redacting content, return `{ redact: true }` with `inputs: true`, `outputs: true`, or both.
Policies run in array order, and each policy receives the result of the policies before it.

For an Agent Runs filtering example, see
[Configure Agent Runs trace content](/docs/eve/agent-runs#configure-agent-runs-trace-content).

## Trace topology

OpenTelemetry destinations receive the following trace topology for an ordinary agent turn:

```text
invoke_agent <agent>
  +-- agent.step
        +-- chat <model>
        +-- agent.action
              +-- execute_tool <tool>
```

Each turn starts a new trace. The first subagent trace links to its caller with
`eve.link.type=agent.dispatch`; the link is not an authorization grant. Use
`gen_ai.conversation.id` to find traces for one conversation in your destination's span-search
surface.

## Manage built-in destinations

Instrumentation has two environment-specific defaults:

- **Local traces**: `eve dev` records local traces by default. Omitting
  `agent/instrumentation/local.ts` preserves the default. Export `localTraces(...)` from that file to
  reconfigure it, or export `disableInstrumentation()` to disable it.
- **Vercel Agent Runs**: Preview and production deployments export to
  [Agent Runs](/docs/eve/agent-runs) by default. Omitting `agent/instrumentation/agent-runs.ts`
  preserves the default. Export `agentRuns(...)` from that file to reconfigure it, or export
  `disableInstrumentation()` to disable it.

## Next steps

- [Concepts](/docs/eve/concepts): learn how eve's runtime pieces fit together.
- [Agent Runs](/docs/eve/agent-runs): inspect agent sessions and configure the built-in Vercel
  integration.
- [Vercel Observability](/docs/observability): inspect traces alongside logs and metrics.
- [OpenTelemetry on eve](https://eve.dev/docs/observability/otel): review the full eve
  instrumentation reference.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
