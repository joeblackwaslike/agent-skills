---
title: vercel kb
product: vercel
url: /docs/cli/kb
canonical_url: "https://vercel.com/docs/cli/kb"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Browse, search, and read Vercel Knowledge Base guides from your terminal using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/kb.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "fb331f54d2676e3ccd3c6441e38714fb18c251725505572b01e286fde47c3468"
---

# vercel kb

The `vercel kb` command lists the latest [Vercel Knowledge Base](/kb) guides. Use `vercel kb search` to find guides by keyword and `vercel kb inspect` to read a guide as Markdown. You don't need to log in or link a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel docs](https://vercel.com/docs/cli/docs) — Search and read the Vercel docs from your terminal using the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel kms](https://vercel.com/docs/cli/kms) — Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
- [vercel changelog](https://vercel.com/docs/cli/changelog) — Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.

Full cross-link map for this page: [/docs/cli/kb.graph.md](/docs/cli/kb.graph.md)
<!-- /docsgraph:related -->

## Usage

Run the command to see the five latest guides:

```bash filename="terminal"
vercel kb
```

*List the latest Knowledge Base guides.*

Each guide displays its publication date, title, URL, and summary, newest first. The guides go to stdout. When more guides are available, a `Next page:` command follows on stderr. Use [JSON output](#json-output) to pipe results to another program.

## Search

Pass a search query to find guides, best match first:

```bash filename="terminal"
vercel kb search "rewrites"
```

*Search the Knowledge Base for guides about rewrites.*

The search query is required. Multiple words form one query, so `vercel kb search edge config` and `vercel kb search "edge config"` use the same query. Search returns up to five guides by default and can return fewer than `--limit` when fewer guides match.

## Inspect

Pass a guide's slug or its full URL to print the guide as Markdown:

```bash filename="terminal"
vercel kb inspect ai-sdk-and-evlog
vercel kb inspect https://vercel.com/kb/guide/ai-sdk-and-evlog
```

*Print the same guide by slug or by URL.*

The Markdown includes the guide's frontmatter, body, and related links, and goes to stdout. Redirect it to save the guide to a file:

```bash filename="terminal"
vercel kb inspect ai-sdk-and-evlog > guide.md
```

*Save a guide as a Markdown file.*

## Unique options

### Limit

Use `--limit`, or its shorthand `-n`, to set the number of guides. The value must be a whole number of 1 or more and defaults to 5. Values above 20 use 20 and print a warning. This option applies to listing and search:

```bash filename="terminal"
vercel kb --limit 10
vercel kb search "AI SDK" -n 3
```

*List up to 10 recent guides or three search results.*

### Next

Use `--next` with the cursor from the previous output to list the next page of guides. Keep the same `--limit` across pages:

```bash filename="terminal"
vercel kb --limit 10
vercel kb --next 10 --limit 10
```

*List the 10 latest guides, then the 10 after them.*

The `Next page:` command in the human-readable output includes the cursor. `--next` applies to listing only, because search returns the best matches without pages.

### JSON output

Use `--json` to write structured JSON to stdout for scripts and agents. `--format=json` produces the same output:

```bash filename="terminal"
vercel kb --json
vercel kb search "AI SDK" --limit 3 --json
vercel kb inspect ai-sdk-and-evlog --json
```

*Get guides, search results, or a single guide as JSON.*

Each command returns a different shape:

| Command | Output |
| --- | --- |
| `vercel kb` | An object with a `guides` array and a `pagination` object. `pagination.next` is the cursor for `--next`, or `null` on the last page. |
| `vercel kb search` | An object with a `guides` array. Each guide includes its Markdown `content`. |
| `vercel kb inspect` | An object with a `guide` that has `slug`, `url`, and Markdown `content` fields. |

Each item in a `guides` array has these fields:

| Field | Description |
| --- | --- |
| `title` | The guide's title. |
| `url` | The URL of the guide. |
| `slug` | The guide's URL slug, which `vercel kb inspect` accepts. |
| `publishedAt` | The publication date. |
| `authors` | An array of author names. |
| `summary` | A short description of the guide, or `null`. |
| `content` | The guide's Markdown body. Search results only. |

## Examples

### Extract search result URLs

With [jq](https://jqlang.org/) installed, list the URLs of the best matches:

```bash filename="terminal"
vercel kb search "rewrites" --limit 2 --json | jq -r '.guides[].url'
```

*Print the URL of each search result, one per line.*

The output depends on the current guides, for example:

```text filename="output"
https://vercel.com/kb/guide/enhancing-security-for-redirects-and-rewrites
https://vercel.com/kb/guide/vercel-reverse-proxy-rewrites-external
```

### Read the next page cursor

Extract the cursor to request the following page in a script:

```bash filename="terminal"
vercel kb --limit 3 --json | jq -r '.pagination.next'
```

*Print the cursor for the next page of guides.*

Pass the printed value to `--next`, with the same `--limit`, to continue. The value is `null` on the last page.

## Exit status and errors

The command exits successfully when it retrieves guides, including when a search matches none. It exits with code 1 when it can't reach the Knowledge Base, is rate limited, or can't find the guide you pass to `inspect`. It exits with code 2 for invalid input, such as a missing search query, an invalid `--limit` value, or a value that isn't a guide slug or Knowledge Base guide URL.

With `--json`, errors are JSON objects on stderr containing a `reason`, a `message`, and, when one applies, a `next` command to recover.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel kb` command:

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
