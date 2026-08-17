---
title: Session tracing
product: vercel
url: /docs/tracing/session-tracing
canonical_url: "https://vercel.com/docs/tracing/session-tracing"
last_updated: 2026-07-06
type: how-to
prerequisites:
  - /docs/tracing
related:
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/cli/curl
  - /docs/cli/traces
  - /docs/logs/runtime
  - /docs/tracing
summary: Learn how to trace your sessions to understand performance and infrastructure details.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/tracing/session-tracing.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "798be58ca2154bf23c1acd0434c4e4022183e832507b623787a3b796e23991ea"
---

# Session tracing

With session tracing, you can use the Vercel toolbar to trace **your** sessions and view the corresponding spans in the logs dashboard. This is useful for debugging and monitoring performance, and identifying bottlenecks.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Debug routing on Vercel](https://vercel.com/kb/guide/debug-routing-on-vercel?from=related) — Learn how to debug how Vercel decides where to route your request
- [Traces](https://vercel.com/docs/drains/reference/traces?from=related) — Learn about Trace Drains - OpenTelemetry-compliant distributed tracing data formats and configuration.
- [Instrumentation](https://vercel.com/docs/tracing/instrumentation?from=related) — Learn how to instrument your application to understand performance and infrastructure details.
- [Create a trace session token for a deployment](https://vercel.com/docs/rest-api/projects/create-a-trace-session-token-for-a-deployment?from=related)
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Insights](https://vercel.com/docs/observability/insights?from=related) — List of available data sources that you can view and monitor with Observability on Vercel.

Full cross-link map for this page: [/docs/tracing/session-tracing.graph.md](/docs/tracing/session-tracing.graph.md)
<!-- /docsgraph:related -->

A session trace is initiated through the Vercel toolbar, either through a [Page Trace](/docs/tracing/session-tracing#run-a-page-trace) or a [Session Trace](/docs/tracing/session-tracing#run-a-session-trace). It is active for the person who initiated the trace on their browser indefinitely, until it is stopped or cookies are cleared.

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project that is deployed to preview or production. You cannot create and run a session trace for a local deployment.
- [The toolbar enabled](/docs/vercel-toolbar/in-production-and-localhost) in your preview or production environment.

## Run a session trace

1. In the Vercel toolbar on your deployment, click (or search for) **Tracing**.
2. Select **Start Tracing Session**. Once enabled, the page will reload to activate the session trace.
3. From the toolbar, you can then using the **Tracing** icon to select any of the following options:
   - **View Page Trace**: View the trace for the current page. Selecting this option will open the trace for the current page in a new tab. This is the same as [running a page trace](/docs/tracing/session-tracing#run-a-page-trace).
   - **View Session Traces**: View all traced requests from your active session. Selecting this option will open the dashboard to the **Logs** section in the sidebar, filtered to the session ID, and the tracing filter applied.
   - **Stop Tracing Session**: Stop tracing the current session.
   - **Restart Tracing Session**: Restart tracing the current session.

![Image](https://vercel.com/front/docs/observability/session-trace-options-light.png)

## Run a page trace

To run a trace on a specific page, you can run a **Page Trace**:

1. In your deployment, open the Vercel toolbar and scroll down to **Tracing**.
2. Select **Run Page Trace**.
3. The page will reload, and a toast will indicate the status of the trace. Once the trace has propagated, the toast will indicate that the trace is complete and ready to view.
4. Click the toast to view the trace in a new browser section in the sidebar under the **Logs** section in the sidebar of the dashboard.

## Run a trace from the Vercel CLI

To capture a trace for a single request from the terminal, use the [`vercel curl`](/docs/cli/curl) command with the `--trace` option. This is helpful for debugging API endpoints from scripts or capturing traces from CI workflows:

```bash filename="terminal"
vercel curl --trace /api/hello
```

Once the request completes, the CLI prints a `vercel traces get` command with the trace's request ID. Run it to inspect the trace in your terminal, or add `--open` to view it in the dashboard:

```bash filename="terminal"
vercel traces get req_1234567890
vercel traces get req_1234567890 --open
```

See the [`vercel curl`](/docs/cli/curl) and [`vercel traces`](/docs/cli/traces) reference pages for all available options.

## View previous session traces

1. In the Vercel toolbar on your deployment, click (or search for) **Tracing**.
2. Select **View Previous Session Traces**.
3. The dashboard will open to the **Logs** section in the sidebar, filtered to the session ID, and the tracing filter applied - indicated by the Traces icon  in the filter bar.

You can filter traces using [all the same filters available](/docs/logs/runtime#log-filters) in the **Logs** section in the sidebar of the dashboard. To view traces for requests to your browser, press the user icon next to the Traces icon.

![Image](https://vercel.com/front/docs/observability/previous-session-traces-light.png?lightbox)

## Usage and pricing

Tracing is available on all plans with a limit up to **1 million spans per month, per team**.

| Plan       | Monthly span limit per team |
| ---------- | --------------------------- |
| Hobby      | 1 million                   |
| Pro        | 1 million                   |
| Enterprise | 1 million                   |

## Attribute truncation

Session Tracing follows the shared [attribute truncation behavior](/docs/tracing#attribute-truncation).

## Limitations

Session Tracing follows the shared [Tracing limitations](/docs/tracing#limitations).

## More resources

- [Learn about the Vercel toolbar](/docs/vercel-toolbar)
- [Explore Observability on Vercel](/docs/observability)


---

[View full sitemap](/docs/sitemap)
