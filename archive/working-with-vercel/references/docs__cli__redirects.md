---
title: vercel redirects
product: vercel
url: /docs/cli/redirects
canonical_url: "https://vercel.com/docs/cli/redirects"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to manage project-level redirects using the vercel redirects CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/redirects.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "0b406f3324f2374ae50c23a698469e7fb129d243d160d38bc480997c502d7a6a"
---

# vercel redirects

The `vercel redirects` command lets you manage redirects for a project. Redirects managed at the project level apply to all deployments and environments and take effect immediately after being created and promoted to production.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern
- [Redirects](https://vercel.com/docs/routing/redirects) — Learn how to use redirects on Vercel to instruct Vercel's platform to redirect incoming requests to a new URL.
- [Edit a project-level redirect.](https://vercel.com/docs/rest-api/bulk-redirects/edit-a-project-level-redirect) — PATCH /v1/bulk-redirects — Edits a single redirect identified by its source path. Stages a new change with the modified

Full cross-link map for this page: [/docs/cli/redirects.graph.md](/docs/cli/redirects.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Redirects can also be defined and managed in source control using
> `vercel.json`. Project-level redirects are updated without a need for a new
> deployment.

## Usage

```bash filename="terminal"
vercel redirects list
```

*Using the \`vercel redirects\` command to list all
redirects for the current project.*

## Commands

The `vercel redirects` command includes several subcommands for managing redirects. Each subcommand uses the linked project unless you pass [`--project`](/docs/cli/global-options#project) with a project name or ID.

### `list`

List all redirects for the current project. These redirects apply to all deployments and environments.

```bash filename="terminal"
vercel redirects list [options]
```

**Options:**

- `--next <CURSOR>`: Show the next page, using the cursor that the CLI prints with the previous page
- `--limit <NUMBER>`: Number of redirects per page (default: 50)
- `-q, --query <TEXT>`: Search for redirects by source or destination
- `--staging`: List redirects from the staging version
- `--redirects-version <VERSION_ID>`: List redirects from a specific version ID

**Examples:**

```bash filename="terminal"
# List all redirects
vercel redirects list

# Search for redirects
vercel redirects list --query "/old-path"

# Show the next page, using the cursor from the previous page
vercel redirects list --next 2

# List redirects with custom page size
vercel redirects list --limit 25

# List redirects from staging version
vercel redirects list --staging

# List redirects from a specific version
vercel redirects list --redirects-version ver_abc123
```

### `list-versions`

List all versions of redirects for the current project.

```bash filename="terminal"
vercel redirects list-versions
```

*View the history of all redirect versions for your project.*

### `add`

Add a new redirect to your project.

```bash filename="terminal"
vercel redirects add [source] [destination] [options]
```

**Options:**

- `--case-sensitive`: Make the redirect case sensitive
- `--name <NAME>`: Version name for this redirect (max 256 characters)
- `--preserve-query-params`: Preserve query parameters when redirecting
- `--status <CODE>`: HTTP status code (301, 302, 307, or 308)
- `-y, --yes`: Skip prompts and use default values

**Examples:**

```bash filename="terminal"
# Add a new redirect interactively
vercel redirects add

# Add a new redirect with arguments
vercel redirects add /old-path /new-path

# Add a redirect with all options
vercel redirects add /old-path /new-path --status 301 --case-sensitive --preserve-query-params --name "My redirect"

# Add a redirect non-interactively
vercel redirects add /old-path /new-path --yes
```

### `import`

Import redirects from a CSV or JSON file.

```bash filename="terminal"
vercel redirects import file [options]
```

**Options:**

- `--force`: Replace all existing redirects
- `-y, --yes`: Skip confirmation prompt

**Examples:**

```bash filename="terminal"
# Import redirects from CSV file
vercel redirects import redirects.csv

# Import redirects from JSON file
vercel redirects import redirects.json

# Import and replace all existing redirects
vercel redirects import redirects.csv --force

# Import without confirmation
vercel redirects import redirects.csv --yes
```

#### File Formats

**CSV Format:**

```csv filename="redirects.csv"
source,destination,statusCode,caseSensitive,preserveQueryParams
/old-path,/new-path,301,false,true
/legacy/page,/modern/page,308,false,false
/old-blog,/blog,302,false,false
```

**JSON Format:**

```json filename="redirects.json"
[
  {
    "source": "/old-path",
    "destination": "/new-path",
    "statusCode": 301,
    "caseSensitive": false,
    "preserveQueryParams": true
  },
  {
    "source": "/legacy/page",
    "destination": "/modern/page",
    "statusCode": 308,
    "caseSensitive": false,
    "preserveQueryParams": false
  }
]
```

### `remove`

Remove a redirect from your project.

```bash filename="terminal"
vercel redirects remove source [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt when removing a redirect

**Example:**

```bash filename="terminal"
# Remove a redirect
vercel redirects remove /old-path
```

### `promote`

Promote a staged redirects version to production.

```bash filename="terminal"
vercel redirects promote version-id [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt when promoting

**Example:**

```bash filename="terminal"
# Promote a redirect version
vercel redirects promote <version-id>
```

### `restore`

Restore a previous redirects version.

```bash filename="terminal"
vercel redirects restore version-id [options]
```

**Options:**

- `-y, --yes`: Skip the confirmation prompt when restoring

**Example:**

```bash filename="terminal"
# Restore a redirects version
vercel redirects restore <version-id>
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel redirects` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
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
