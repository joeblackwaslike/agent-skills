---
title: Telemetry
product: vercel
url: /docs/cli/about-telemetry
canonical_url: "https://vercel.com/docs/cli/about-telemetry"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/telemetry
summary: Vercel CLI collects telemetry data about general usage.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/about-telemetry.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "95f28eda062851d7ed9e8858493c17dc83bd53e540338757588141cba4e6bab0"
---

# Telemetry

> **💡 Note:** Participation in this program is optional, and you may
> [opt-out](#how-do-i-opt-out-of-vercel-cli-telemetry) if you would prefer not
> to share any telemetry information.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Telemetry](https://turborepo.dev/docs/telemetry?from=related) — Understand what anonymous telemetry data Turborepo collects and how to opt out.
- [telemetry](https://turborepo.dev/docs/reference/telemetry?from=related) — Reference for the `turbo telemetry` command that manages anonymous usage data collection.
- [Using with CLI](https://vercel.com/docs/analytics/accessing-metrics-with-vercel-cli?from=related) — Use the Vercel CLI to query Web Analytics metrics from your terminal.
- [Overview](https://vercel.com/docs/observability?from=related) — Observability on Vercel provides framework-aware insights enabling you to optimize infrastructure and application perfor
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related) — Query observability metrics and inspect available metrics, dimensions, and aggregations using the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.

Full cross-link map for this page: [/docs/cli/about-telemetry.graph.md](/docs/cli/about-telemetry.graph.md)
<!-- /docsgraph:related -->

## Why is telemetry collected?

Vercel CLI Telemetry collects telemetry to improve Vercel's products and services, including the developer experience, platform performance, and AI features. For full details on how Vercel uses the data it collects, see our [Privacy Notice](https://vercel.com/legal/privacy-policy).

## What is being collected?

Vercel takes privacy and security seriously. Vercel CLI Telemetry tracks general usage information, such as commands and arguments used. This includes:

- Command invoked (`vercel build`, `vercel deploy`, `vercel login`, etc.)
- Version of the Vercel CLI
- General machine information (e.g. number of CPUs, macOS/Windows/Linux, whether or not the command was run within CI)
- Identifiers associated with your account

You can view exactly what is being collected by setting the following environment variable: `VERCEL_TELEMETRY_DEBUG=1`.

When this environment variable is set, data will **not be sent to Vercel**.
The data will only be printed out to the [*stderr* stream](https://en.wikipedia.org/wiki/Standard_streams), prefixed with `[telemetry]`.

An example telemetry event looks like this:

```json
{
  "id": "cf9022fd-e4b3-4f67-bda2-f02dba5b2e40",
  "eventTime": 1728421688109,
  "key": "subcommand:ls",
  "value": "ls",
  "teamId": "team_9Cdf9AE0j9ef09FaSdEU0f0s",
  "sessionId": "e29b9b32-3edd-4599-92d2-f6886af005f6"
}
```

## What about sensitive data?

Vercel CLI Telemetry **does not** collect any metrics which may contain sensitive data, including, but not limited to: environment variables, file paths, contents of files, logs, or serialized JavaScript errors.

## How do I opt-out of Vercel CLI telemetry?

You may use the [vercel telemetry](/docs/cli/telemetry) command to manage the telemetry collection status. This sets a global configuration value on your computer.

You may opt-out of telemetry data collection by running `vercel telemetry disable`:

```bash filename="terminal"
vercel telemetry disable
```

You may check the status of telemetry collection at any time by running `vercel telemetry status`:

```bash filename="terminal"
vercel telemetry status
```

You may re-enable telemetry if you'd like to re-join the program by running the following:

```bash filename="terminal"
vercel telemetry enable
```

Alternatively, you may opt-out by setting an environment variable: `VERCEL_TELEMETRY_DISABLED=1`. This will only apply for runs where the environment variable is set and will not change your configured telemetry status.


---

[View full sitemap](/docs/sitemap)
