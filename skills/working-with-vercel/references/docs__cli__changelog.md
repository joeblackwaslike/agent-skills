---
title: vercel changelog
product: vercel
url: /docs/cli/changelog
canonical_url: "https://vercel.com/docs/cli/changelog"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/changelog.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "ad71fee8d04bb22f8a4223555d1e1e07cd0232ded9883b79237cbe57d657a6ca"
---

# vercel changelog

The `vercel changelog` command lists recent Vercel product updates with their full Markdown content. Use `vercel changelog search` to find updates by keyword. You don't need to log in or link a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [You can now read and search changelogs from the CLI](https://vercel.com/changelog/you-can-now-read-and-search-changelogs-from-the-cli)
- [vercel docs](https://vercel.com/docs/cli/docs) — Search and read the Vercel docs from your terminal using the Vercel CLI.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel upgrade](https://vercel.com/docs/cli/upgrade) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel ci](https://vercel.com/docs/cli/ci) — Enable or disable Vercel CI for repositories, inspect runs, search logs, and rerun jobs from the command line.

Full cross-link map for this page: [/docs/cli/changelog.graph.md](/docs/cli/changelog.graph.md)
<!-- /docsgraph:related -->

## Usage

Run the command to read the five latest updates:

```bash filename="terminal"
vercel changelog
```

*Read the latest Vercel product updates.*

Each entry displays its publication date, title, URL, and Markdown content when available. Human-readable output goes to stderr. Use [JSON output](#json-output) to pipe results to another program.

## Search

Pass a search query to find relevant updates:

```bash filename="terminal"
vercel changelog search "AI SDK"
```

*Search the Vercel changelog for AI SDK updates.*

The search query is required. Multiple words form one query, so `vercel changelog search AI SDK` and `vercel changelog search "AI SDK"` use the same query. Search accepts the same options as listing updates and returns up to five results by default.

## Unique options

### Limit

Use `--limit`, or its shorthand `-n`, to set the number of results. The value must be an integer from 1 to 20 and defaults to 5. This option applies to both listing and search:

```bash filename="terminal"
vercel changelog --limit 10
vercel changelog search "AI SDK" -n 2
```

*Read up to 10 recent updates or two search results.*

### JSON output

Use `--json` to write structured JSON to stdout for scripts and agents. `--format=json` produces the same output:

```bash filename="terminal"
vercel changelog --json
vercel changelog search "AI SDK" --limit 2 --json
vercel changelog --limit 1 --format=json
```

*Get recent updates or search results as JSON.*

The output is an object with an `items` array. Each item has the following fields:

| Field | Description |
| --- | --- |
| `title` | The update's title. |
| `url` | The URL of the full announcement. |
| `slug` | The announcement's URL slug. |
| `publishedAt` | The publication timestamp. |
| `authors` | An array of author names. |
| `summary` | A summary or search excerpt, or `null`. |
| `content` | The announcement's Markdown content, when available. |

For example, with [jq](https://jqlang.org/) installed, extract titles and URLs:

```bash filename="terminal"
vercel changelog --limit 1 --json | jq '.items[] | {title, url}'
```

*Extract an update's title and URL from the JSON output.*

The result has this shape, with values that depend on the latest update:

```json filename="output"
{
  "title": "DeepSeek V4.1 Flash 1017 Ultrafast now available on AI Gateway",
  "url": "https://vercel.com/changelog/deepseek-v4-1-flash-1017-ultrafast-now-available-on-ai-gateway"
}
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel changelog` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

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
