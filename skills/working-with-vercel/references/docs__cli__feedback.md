---
title: vercel feedback
product: vercel
url: /docs/cli/feedback
canonical_url: "https://vercel.com/docs/cli/feedback"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/about-telemetry
  - /docs/cli/telemetry
  - /docs/cli/global-options
summary: Send bugs, friction, and feature requests to the Vercel team using the vercel feedback CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/feedback.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "236f21ea5beb512950f4f2457a786dd1d1885c7b95d1d588cefda57e39011045"
---

# vercel feedback

Use `vercel feedback` to report bugs, friction, and feature requests to the Vercel team. Don't include secrets or personally identifiable information (PII) in feedback.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Send feedback from the Vercel CLI](https://vercel.com/changelog/send-feedback-from-vercel-cli)
- [Send feedback from the Vercel MCP](https://vercel.com/changelog/send-feedback-from-vercel-mcp)
- [submit_feedback](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/submit_feedback) — Send feedback about Vercel or its MCP tools.
- [Documentation, CLI, and Feedback](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation) — Find documentation, use the CLI, and share feedback with Vercel.
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/cli/feedback.graph.md](/docs/cli/feedback.graph.md)
<!-- /docsgraph:related -->

## Usage

You don't need to log in or link a project.

Send a note, quoting text that contains spaces:

```bash filename="terminal"
vercel feedback "The error didn't explain how to fix the issue"
```

When Vercel accepts the feedback, the command prints:

```text
Feedback sent
```

Running `vercel feedback` without a note or fields displays help without submitting feedback.

## Examples

### Read a note from stdin

Pass `-` as the note to read the complete UTF-8 input from stdin:

```bash filename="terminal"
printf '%s\n' "The deployment error didn't explain how to fix the issue" | vercel feedback - -f product=cli
```

You can also pipe a file with `cat notes.md | vercel feedback -`.

### Include context with named fields

Use repeatable `--field` options, or the `-f` shorthand, to describe the task and the result:

```bash filename="terminal"
vercel feedback "The error did not explain the correct command" \
  -f product=cli \
  -f task="deploy a preview" \
  -f expected="Create a Preview deployment" \
  -f actual="Unknown option: --preview" \
  -f type=bug \
  -f impact="Time spent finding the correct syntax"
```

A note is optional when you provide at least one named field:

```bash filename="terminal"
vercel feedback -f product=cli -f type=feature -f expected="Explain how to fix deployment errors"
```

### Submit feedback as an agent

Agents can also use `vercel feedback` to report issues they encounter while completing tasks:

```bash filename="terminal"
vercel feedback "The error did not explain the correct command" \
  -f product=cli -f model="your_model_name" \
  -f task="deploy a preview" \
  -f expected="Create a Preview deployment" \
  -f actual="Unknown option: --preview" \
  -f type=bug
```

## Unique options

### Field

The `--field` option, shorthand `-f`, accepts `key=value` pairs. Keys must be non-empty, and all values are strings. If you repeat a key, the last value wins.

You can use any field name. The following fields are recommended and optional:

| Field      | Description                                                 |
| ---------- | ----------------------------------------------------------- |
| `type`     | A category such as `bug`, `friction`, or `feature`.           |
| `product`  | The Vercel product involved, such as `functions` or `domains`. |
| `model`    | The model name used for the task.                            |
| `task`     | What you were trying to do.                                  |
| `expected` | What you expected to happen.                                 |
| `actual`   | What happened, including the error text.                     |
| `impact`   | Time spent, retries, or workarounds used.                    |

Use one positional note (including `-` for stdin) or `-f note=...`. Combining both causes an error. Repeated `-f note=...` fields use the last value.

## Submission details

The complete submission, including any metadata, must fit within 1 MiB.

When [telemetry](/docs/cli/about-telemetry) is enabled, the CLI includes locally known metadata with your feedback. It preserves the named fields you provide. When [telemetry is disabled](/docs/cli/telemetry), the CLI sends your feedback without metadata.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel feedback` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
