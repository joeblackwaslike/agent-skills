---
title: Tracing in Daemons
product: vercel
url: /docs/daemons/tracing
canonical_url: "https://vercel.com/docs/daemons/tracing"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/daemons
related:
  - /docs/tracing
  - /docs/tracing/instrumentation
  - /docs/tracing/configure-tracing
  - /docs/drains/reference/traces
  - /docs/daemons
summary: Instrument a daemon using OpenTelemetry traces.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/daemons/tracing.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "041bc471d192d7422350bb280c831620886c0f3667706b716a3c9793bc37c15e"
---

# Tracing in Daemons

Every daemon runs an [OpenTelemetry](https://opentelemetry.io/) OTLP trace collector over a Unix socket. Vercel sets the `VERCEL_OTEL_SOCKET_PATH` environment variable to its path. Traces you export to that socket are stored alongside the rest of your project's [traces](/docs/tracing), so you can view them in the same place as traces from your deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Daemons can now send traces to Vercel Tracing](https://vercel.com/changelog/vercel-daemons-can-now-send-traces-to-vercel-tracing)
- [Always-on tracing for production and preview traffic](https://vercel.com/changelog/always-on-tracing-for-production-and-preview-traffic)
- [Vercel Tracing is now generally available](https://vercel.com/changelog/vercel-tracing-is-now-generally-available)
- [Session Tracing](https://vercel.com/docs/tracing/session-tracing) — Learn how to trace your sessions to understand performance and infrastructure details.
- [Managing Daemons](https://vercel.com/docs/daemons/managing-daemons) — Deploy, scale, stop, and monitor Vercel Daemons with vercel.json and the dashboard.
- [Observability for Durable Agent Harnesses](https://vercel.com/docs/agent-harnesses/observability) — See each durable agent session in Vercel Agent Runs, with its turns, model and tool calls, timing, and token usage, and
- [vercel daemons](https://vercel.com/docs/cli/daemons) — List and inspect production daemons, override regional instance counts, and inspect or restart individual instances with
- [Daemons](https://vercel.com/docs/build-output-api/daemons) — Learn how Vercel Daemons are represented in the Build Output API.

Full cross-link map for this page: [/docs/daemons/tracing.graph.md](/docs/daemons/tracing.graph.md)
<!-- /docsgraph:related -->

This page covers exporting traces from a Node.js daemon, exporting from other languages, how the socket works, how to export somewhere else, and the export limits that apply during the beta.

## Send traces from a Node.js daemon

The [`@vercel/otel`](/docs/tracing/instrumentation) package handles the socket export for you. When `VERCEL_OTEL_SOCKET_PATH` is set, its `'auto'` exporter sends traces over that Unix socket using an OTLP/HTTP protobuf exporter, with no endpoint configuration on your side. Unix-socket export in `@vercel/otel` is Node.js-only.

1. **Install the OpenTelemetry API and `@vercel/otel`.**

   Use `@vercel/otel` 2.3.0 or later, which adds the Unix-socket exporter.

   ```bash filename="Terminal"
   pnpm add @opentelemetry/api @vercel/otel@latest
   ```

2. **Call `registerOTel` at the top of your worker's entry file.**

   For a plain long-running process, call `registerOTel` before any other work so instrumentation is in place for the rest of the process.

   ```ts filename="worker/worker.ts"
   import { registerOTel } from '@vercel/otel';

   registerOTel({ serviceName: 'my-daemon' });

   // The rest of your worker runs after instrumentation is registered.
   async function main() {
     // add spans here...
   }

   main();
   ```

   For `registerOTel` options and how to record custom spans, see [Instrumentation](/docs/tracing/instrumentation).

3. **Deploy the daemon.**

   On the next deployment, traces flow to Vercel over the socket with no further configuration. They appear with the rest of your project's traces in [Observability](/docs/tracing/configure-tracing).

## Send traces from other languages

Point any OpenTelemetry SDK or exporter that supports Unix sockets at the path in `VERCEL_OTEL_SOCKET_PATH`. The socket accepts `POST /v1/traces` with protobuf or JSON OTLP bodies, optionally gzip-compressed. OTLP/gRPC is not supported.

To confirm the socket is reachable from inside the container, post an OTLP body to it with `curl`, replacing `trace.json` with an OTLP/HTTP JSON trace payload:

```bash filename="Terminal"
curl --unix-socket "$VERCEL_OTEL_SOCKET_PATH" \
  -X POST http://localhost/v1/traces \
  -H 'Content-Type: application/json' \
  --data-binary @trace.json
```

A successful export returns a `200` response. If any spans are dropped, the response body reports them as an OTLP partial success with a count of rejected spans.

## How it works

Vercel sets `VERCEL_OTEL_SOCKET_PATH` in the daemon's container to the socket's path. This value cannot be overridden.

Vercel reserves the following resource attributes and sets them on every resource, so values your code sets are ignored:

- `vercel.owner_id`
- `vercel.project_id`
- `vercel.deployment_id`

Everything else in your spans and resource is preserved.

Traces sent through the socket are stored with the rest of your project's traces and count toward your tracing usage. For viewing traces, sampling, and plan details, see [Configure tracing](/docs/tracing/configure-tracing).

## Send traces somewhere else

To send traces to a destination other than the local socket, configure an endpoint explicitly. The socket is used only when no OTLP endpoint is otherwise configured. Any of the following opts out of the socket:

- Setting `OTEL_EXPORTER_OTLP_TRACES_ENDPOINT`.
- Setting `OTEL_EXPORTER_OTLP_ENDPOINT`.
- Passing a custom `traceExporter` to `registerOTel`.

To forward traces that are already stored with Vercel to an external OTLP/HTTP endpoint, use [Trace Drains](/docs/drains/reference/traces) instead of changing the daemon's exporter.

## Limits

These limits apply during the beta. Vercel may change them as the beta progresses.

| Limit                             | Value      | What to know                                                                                   |
| --------------------------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| Span size                         | 192 KiB    | Serialized, including the span's share of resource and scope attributes. Oversized spans are dropped |
| Resource and scope attribute size | 32 KiB     | Protobuf size, excluding spans. Spans of a larger resource or scope are dropped                 |
| Concurrent exports                | 4          | Per instance. Additional exports get `429 Too Many Requests` with `Retry-After: 1`, which OTLP exporters retry |
| Read timeout                      | 10 seconds | An export request must be read within this time                                                 |

Prefer the default batch processor settings in your OpenTelemetry SDK, which stay well under these limits.

## Learn more

- [Daemons](/docs/daemons)
- [Daemon configuration reference](/docs/daemons/config-reference)
- [Daemons limits](/docs/daemons/limits)
- [Tracing](/docs/tracing)
- [Instrumentation](/docs/tracing/instrumentation)
- [Configure tracing](/docs/tracing/configure-tracing)
- [Trace Drains](/docs/drains/reference/traces)
- [Runtime logs](/docs/logs/runtime)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
