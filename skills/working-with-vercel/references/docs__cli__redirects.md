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
source: "https://vercel.com/docs/cli/redirects.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "b059ed735aa84211ac2d4963a8691d7798f89fa11555b4ef4a3001a7a9dbc2fc"
---

# vercel redirects

The `vercel redirects` command lets you manage redirects for a project. Redirects managed at the project level apply to all deployments and environments and take effect immediately after being created and promoted to production.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing Redirects from your CMS using Vercel Bulk Redirects](https://vercel.com/kb/guide/managing-redirects-from-your-cms-using-vercel-bulk-redirects?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Learn how to sync redirect rules from your CMS to Vercel at build time with vercel.ts, allowing non-technical teams to m
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [vercel routes](https://vercel.com/docs/cli/routes?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Learn how to manage project-level routing rules using the vercel routes CLI command.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Configuration Redirects](https://vercel.com/docs/routing/redirects/configuration-redirects?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=related) — Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern

Full cross-link map for this page: [/docs/cli/redirects.graph.md](/docs/cli/redirects.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fredirects&source_site=vercel-docs&relationship=graph)
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

The `vercel redirects` command includes several subcommands for managing redirects:

### `list`

List all redirects for the current project. These redirects apply to all deployments and environments.

```bash filename="terminal"
vercel redirects list [options]
```

**Options:**

- `--page <NUMBER>`: Page number to display
- `--per-page <NUMBER>`: Number of redirects per page (default: 50)
- `-s, --search <QUERY>`: Search for redirects by source or destination
- `--staging`: List redirects from the staging version
- `--version <VERSION_ID>`: List redirects from a specific version ID

**Examples:**

```bash filename="terminal"
# List all redirects
vercel redirects list

# Search for redirects
vercel redirects list --search "/old-path"

# List redirects on page 2
vercel redirects list --page 2

# List redirects with custom page size
vercel redirects list --per-page 25

# List redirects from staging version
vercel redirects list --staging

# List redirects from a specific version
vercel redirects list --version ver_abc123
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

### `upload`

Upload redirects from a CSV or JSON file.

```bash filename="terminal"
vercel redirects upload file [options]
```

**Options:**

- `--overwrite`: Replace all existing redirects
- `-y, --yes`: Skip confirmation prompt

**Examples:**

```bash filename="terminal"
# Upload redirects from CSV file
vercel redirects upload redirects.csv

# Upload redirects from JSON file
vercel redirects upload redirects.json

# Upload and overwrite existing redirects
vercel redirects upload redirects.csv --overwrite

# Upload without confirmation
vercel redirects upload redirects.csv --yes
```

#### File Formats

**CSV Format:**

```csv filename="redirects.csv"
source,destination,status,caseSensitive,preserveQueryParams
/old-path,/new-path,301,false,true
/legacy/*,/modern/:splat,308,false,false
/old-blog,/blog,302,false,false
```

**JSON Format:**

```json filename="redirects.json"
[
  {
    "source": "/old-path",
    "destination": "/new-path",
    "status": 301,
    "caseSensitive": false,
    "preserveQueryParams": true
  },
  {
    "source": "/legacy/*",
    "destination": "/modern/:splat",
    "status": 308,
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
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
