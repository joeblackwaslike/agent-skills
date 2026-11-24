---
title: vercel docs
product: vercel
url: /docs/cli/docs
canonical_url: "https://vercel.com/docs/cli/docs"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Search and read the Vercel docs from your terminal using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/docs.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "a052baaae944b6717ef7fd06cd2a43979a1b82a6bc129f903b19e5ca3aeff44e"
---

# vercel docs

The `vercel docs` command searches the Vercel docs and prints docs pages as Markdown. Use `vercel docs search` to find pages by keyword and `vercel docs inspect` to read a page. You don't need to log in or link a project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel kb](https://vercel.com/docs/cli/kb) — Browse, search, and read Vercel Knowledge Base guides from your terminal using the Vercel CLI.
- [vercel logs](https://vercel.com/docs/cli/logs) — View and filter runtime logs or CDN request records for your Vercel project.
- [vercel changelog](https://vercel.com/docs/cli/changelog) — Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/docs.graph.md](/docs/cli/docs.graph.md)
<!-- /docsgraph:related -->

## Usage

Run `vercel docs search` with a search query to find docs pages:

```bash filename="terminal"
vercel docs search "environment variables"
```

*Search the Vercel docs for pages about environment variables.*

Running `vercel docs` without a command shows its help.

## Search

Search returns one result per page, best match first. Each result displays the page title, URL, and description. When the best match is a section of the page, the result also displays the section heading, and its URL links to that section. The results go to stdout. Use [JSON output](#json-output) to pipe results to another program.

The search query is required. Multiple words form one query, so `vercel docs search edge config` and `vercel docs search "edge config"` use the same query. The query can be up to 200 characters. Search returns up to five pages by default.

When no pages match, the command suggests searching Knowledge Base guides with `vercel kb search` instead.

## Inspect

Pass a docs page's path or its full URL to print the page as Markdown:

```bash filename="terminal"
vercel docs inspect functions
vercel docs inspect /docs/routing/rewrites
vercel docs inspect https://vercel.com/docs/routing/rewrites
```

*Print a page by its path, or by its URL.*

The path is the part of the URL after `/docs/`. A section anchor or `.md` suffix in the URL is ignored, so you can pass a URL from search results as is. Use `/docs` or `https://vercel.com/docs` for the docs home page.

The Markdown includes the page's frontmatter and body, and goes to stdout. Redirect it to save the page to a file:

```bash filename="terminal"
vercel docs inspect functions > functions.md
```

*Save a docs page as a Markdown file.*

## Unique options

### Limit

Use `--limit`, or its shorthand `-n`, to set the number of search results. The value must be a whole number of 1 or more and defaults to 5. Values above 20 use 20 and print a warning. This option applies to search only:

```bash filename="terminal"
vercel docs search "rewrites" --limit 10
vercel docs search "function timeout" -n 3
```

*Return up to 10 or three search results.*

### JSON output

Use `--json` to write structured JSON to stdout for scripts and agents. `--format=json` produces the same output:

```bash filename="terminal"
vercel docs search "function timeout" --limit 3 --json
vercel docs inspect functions --json
```

*Get search results or a single page as JSON.*

Each command returns a different shape:

| Command | Output |
| --- | --- |
| `vercel docs search` | An object with a `docs` array of matching pages. |
| `vercel docs inspect` | An object with a `page` that has `path`, `url`, and Markdown `content` fields. |

Each item in the `docs` array has these fields:

| Field | Description |
| --- | --- |
| `title` | The page's title. |
| `url` | The URL of the page. |
| `path` | The page's path after `/docs/`, which `vercel docs inspect` accepts. The docs home page has an empty path. |
| `description` | A short description of the page, or `null`. |
| `section` | The matching section, with `title` and `url` fields, or `null` when the match is the page itself. |

## Examples

### Extract search result URLs

With [jq](https://jqlang.org/) installed, list the URLs of the best matches:

```bash filename="terminal"
vercel docs search "environment variables" --limit 2 --json | jq -r '.docs[].url'
```

*Print the URL of each search result, one per line.*

The output depends on the current docs, for example:

```text filename="output"
https://vercel.com/docs/environment-variables
https://vercel.com/docs/functions/runtimes/edge
```

### Read the best match

Search, then print the best-matching page as Markdown:

```bash filename="terminal"
vercel docs inspect "$(vercel docs search "environment variables" --limit 1 --json | jq -r '.docs[0].url')"
```

*Print the top search result as Markdown.*

## Exit status and errors

The command exits successfully when it completes a search, including when no pages match. It exits with code 1 when it can't reach the Vercel docs, is rate limited, or can't find the page you pass to `inspect`. It exits with code 2 for invalid input, such as a missing search query, a query longer than 200 characters, an invalid `--limit` value, or a value that isn't a docs path or Vercel docs URL.

With `--json`, errors are JSON objects on stderr containing a `reason`, a `message`, and, when one applies, a `next` command to recover.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel docs` command:

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
