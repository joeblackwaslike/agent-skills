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
fetched_at: "2026-10-12T11:51:15.124Z"
sha256: "2e07da8be0dd9cbe5e561ca1fe8dc1407824b6fa769c59dd13a9037050980e5c"
---

# Observability

eve configures its built-in OpenTelemetry destinations automatically. `eve dev` records local
traces, while preview and production deployments export to
[Agent Runs](/docs/eve/agent-runs) by default. Use this page to configure process-wide tracing,
third-party destinations, and export policies.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs now show subagent activity on eve projects](https://vercel.com/changelog/agent-runs-now-show-subagent-activity-on-eve-projects?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related)
- [Agent Runs now available in the Vercel MCP and CLI](https://vercel.com/changelog/agent-runs-vercel-mcp-cli?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related)
- [Trace and debug eve agent sessions with Vercel Observability](https://vercel.com/changelog/eve-agent-observability?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related)
- [Agent Runs](https://eve.dev/docs/observability/agent-runs?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [Migrate Instrumentation](https://eve.dev/docs/observability/instrumentation-migration?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Move a single instrumentation.ts configuration into lifecycle instrumentation and OpenTelemetry destinations.
- [Instrumentation](https://eve.dev/docs/observability/instrumentation?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Configure lifecycle instrumentation, handle runtime events, and control the content each destination receives.
- [Deploy to Vercel](https://eve.dev/docs/guides/deployment/vercel?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Deploy an eve agent with Vercel Workflow, Sandbox, Cron, and project credentials.
- [Terminal UI](https://eve.dev/docs/guides/dev-tui?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Use eve locally or connect to a deployed agent from an interactive terminal UI.
- [How to set up instrumentation with OpenTelemetry](https://nextjs.org/docs/app/guides/open-telemetry?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to instrument your Next.js app with OpenTelemetry.
- [Instrumentation](https://vercel.com/docs/tracing/instrumentation?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to instrument your application to understand performance and infrastructure details.
- [Tracing](https://vercel.com/docs/tracing?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Learn how to trace your application to understand performance and infrastructure details.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=related) — Understand how eve usage maps to Vercel resources and inherited platform limits.

Full cross-link map for this page: [/docs/eve/observability.graph.md](/docs/eve/observability.graph.md?from=related&source_path=%2Fdocs%2Feve%2Fobservability&source_site=vercel-docs&relationship=graph)
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
