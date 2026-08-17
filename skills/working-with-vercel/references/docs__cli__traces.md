---
title: vercel traces
product: vercel
url: /docs/cli/traces
canonical_url: "https://vercel.com/docs/cli/traces"
last_updated: 2026-06-22
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Inspect a request trace in the terminal or open it in the Vercel Dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/traces.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "fb8cd9117a4f7103bd15d6fb4d8e1abe9e9a747a9f7b9eff5cd78962cea5882f"
---

# vercel traces

The `vercel traces` command helps you inspect request traces for a linked project or a specific project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Get a project trace by request ID](https://vercel.com/docs/rest-api/projects/get-a-project-trace-by-request-id?from=related)
- [Session Tracing](https://vercel.com/docs/tracing/session-tracing?from=related) — Learn how to trace your sessions to understand performance and infrastructure details.
- [vercel logs](https://vercel.com/docs/cli/logs?from=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [Tracing](https://vercel.com/docs/tracing?from=related) — Learn how to trace your application to understand performance and infrastructure details.
- [vercel activity](https://vercel.com/docs/cli/activity?from=related) — View activity events for your Vercel project or team, filtered by type, date range, and project.

Full cross-link map for this page: [/docs/cli/traces.graph.md](/docs/cli/traces.graph.md)
<!-- /docsgraph:related -->

Use `vercel traces get <request-id>` to inspect a request trace.

## Usage

```bash filename="terminal"
# Get a specific trace
vercel traces get req_1234567890

# `get` is the default subcommand
vercel traces req_1234567890

# Open a trace in the Vercel Dashboard
vercel traces get req_1234567890 --open
```

*Using the \`vercel traces\` command to inspect request traces.*

## Subcommand

The `get` subcommand returns details for a single trace by request ID.

```bash filename="terminal"
vercel traces get req_1234567890
vercel traces get req_1234567890 --json
```

## Unique options

These options apply to `vercel traces get`.

### Project

The `--project` option, shorthand `-p`, specifies the project name or ID.

```bash filename="terminal"
vercel traces get req_1234567890 --project my-app
```

### JSON

The `--json` option, shorthand `-j`, returns machine-readable output.

```bash filename="terminal"
vercel traces get req_1234567890 --json
```

### Open

The `--open` option opens the trace in the Vercel Dashboard instead of printing the trace in the terminal.

```bash filename="terminal"
vercel traces get req_1234567890 --open
```

`--open` cannot be combined with `--json`.

## Examples

Fetch a trace from a specific team and project:

```bash filename="terminal"
vercel traces get req_1234567890 --scope my-team --project my-app
```

Get JSON output for automation:

```bash filename="terminal"
vercel traces get req_1234567890 --json
```


---

[View full sitemap](/docs/sitemap)
