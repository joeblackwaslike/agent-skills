---
title: vercel traces
product: vercel
url: /docs/cli/traces
canonical_url: "https://vercel.com/docs/cli/traces"
last_updated: 2026-05-27
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Inspect a request trace in the terminal or open it in the Vercel Dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/traces.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "23a98f9ac28740c4f8da67c53b9fec2e011372d60e075e1688058cae9cb7974a"
---

# vercel traces

The `vercel traces` command helps you inspect request traces for a linked project or a specific project.

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
