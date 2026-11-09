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
source: "https://vercel.com/docs/cli/changelog.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "478e9958ae564add662ce5978d897fe1c176a57006ad5a9e221622131749eefb"
---

# vercel changelog

The `vercel changelog` command lists recent Vercel product updates with their full Markdown content. Use `vercel changelog search` to find updates by keyword. You don't need to log in or link a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [You can now read and search changelogs from the CLI](https://vercel.com/changelog/you-can-now-read-and-search-changelogs-from-the-cli)
- [vercel upgrade](https://vercel.com/docs/cli/upgrade) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel comments](https://vercel.com/docs/cli/comments) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

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


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
