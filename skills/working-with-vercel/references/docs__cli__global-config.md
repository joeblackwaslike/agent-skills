---
title: vercel global-config
product: vercel
url: /docs/cli/global-config
canonical_url: "https://vercel.com/docs/cli/global-config"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/global-config
  - /docs/global-config/migration-guide
  - /docs/rest-api/global-config/update-global-config-items-in-batch
  - /docs/global-config/global-config-dashboard
  - /docs/rest-api/global-config
summary: "Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, and backups."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/global-config.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "64117d73bc06d73ab522b059c27e7c9c13037e4e5db55412f8870625ec95aee9"
---

# vercel global-config

The `vercel global-config` command manages [Global Config](/docs/global-config) stores from the CLI. It mirrors the dashboard API surface: create stores, inspect metadata, patch items in batch, list items, manage read tokens, and restore backups. For an overview of Global Config and how to read from it at runtime, see [Vercel Global Config](/docs/global-config).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Global Config](https://vercel.com/docs/global-config/using-global-config) — Learn how to use Global Configs in your projects.
- [Managing Global Configs with Vercel REST API](https://vercel.com/docs/global-config/vercel-api) — Learn how to use the Vercel REST API to create and update Global Configs. You can also read data stored in Global Config
- [Global Config](https://vercel.com/docs/agent-resources/vercel-mcp/tools/global-config) — Vercel MCP tools for Global Config.
- [vercel blob](https://vercel.com/docs/cli/blob) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
- [Get Global Config items](https://vercel.com/docs/rest-api/global-config/get-global-config-items) — GET /v1/global-config/{edgeConfigId}/items — Returns all items of a Global Config.

Full cross-link map for this page: [/docs/cli/global-config.graph.md](/docs/cli/global-config.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** `vercel edge-config` continues to work as an alias for `vercel global-config`
> following the [rename from Edge Config to Global
> Config](/docs/global-config/migration-guide).

## Usage

```bash filename="terminal"
vercel global-config [subcommand]
```

*Using the \`vercel global-config\` command to manage Global Config stores.*

## Commands

### list (ls)

Lists Global Config stores for the current team. Running `vercel global-config` with no subcommand runs `list`.

```bash filename="terminal"
vercel global-config
vercel global-config list
vercel global-config list --format json
```

*List stores. Use \`--format json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### create

`add` is a supported alias.

Creates a new Global Config store with the given slug. Optionally seeds it with initial items.

```bash filename="terminal"
vercel global-config create flags
vercel global-config create flags --items '{"betaUiEnabled":true,"region":"sfo1"}'
```

*Create a store with slug \`flags\`, optionally with seed items.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `slug` | Yes | Slug for the new Global Config store |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--items <JSON>` | String | Optional JSON object of initial items (`{ "key": <value>, ... }`) |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### inspect

`get` remains a supported alias, but prints a deprecation warning. Use `inspect` for new commands.

Shows metadata for a Global Config store. Accepts either the store ID (starts with `ecfg_`) or the slug.

```bash filename="terminal"
vercel global-config inspect flags
vercel global-config inspect ecfg_abc123 --format json
```

*Inspect a store by ID or slug.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID (e.g. `ecfg_abc123`) or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### update

Renames a Global Config store (`--slug`) and/or patches its items (`--patch`). For complex updates, use the [batch items API](/docs/rest-api/global-config/update-global-config-items-in-batch) shape.

```bash filename="terminal"
vercel global-config update flags --slug feature-flags
vercel global-config update flags --patch '{"items":[{"operation":"upsert","key":"betaUiEnabled","value":true}]}'
```

*Rename a store and/or patch items in batch.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--slug <SLUG>` | String | New slug for the store |
| `--patch <JSON>` | String | Batch items payload (`{"items":[...]}` or a bare array). Each item needs `operation` (`create`, `update`, `upsert`, or `delete`), `key`, and usually `value` |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### remove (rm, delete)

Deletes a Global Config store.

```bash filename="terminal"
vercel global-config remove flags --yes
```

*Delete a store. Use \`--yes\` to skip the confirmation prompt.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-y, --yes` | Boolean | Skip the confirmation prompt |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### items

Lists items in a Global Config store, or fetches one item with `--key`.

```bash filename="terminal"
vercel global-config items flags
vercel global-config items flags --key betaUiEnabled
```

*List all items, or fetch a single item by key.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-k, --key <KEY>` | String | When set, fetch a single item by key |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### tokens

Lists, creates (`--add`), or revokes (`--remove`) read tokens for a Global Config store. Read tokens authenticate Global Config reads from your application at runtime.

```bash filename="terminal"
vercel global-config tokens flags
vercel global-config tokens flags --add "Production read"
vercel global-config tokens flags --remove tok_abc123 --yes
```

*List, create, or revoke read tokens for a store.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--add <LABEL>` | String | Create a new read token with this label (1-52 characters) |
| `--remove <ID_OR_TOKEN>` | String\[] | Revoke one or more tokens by ID or plaintext token (repeatable). Requires `--yes` in non-interactive mode |
| `-y, --yes` | Boolean | Skip the confirmation prompt |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### backups

Lists backups for a Global Config store, fetches a single backup version with `--backup-version`, or restores items from a backup with `--restore`.

```bash filename="terminal"
vercel global-config backups flags
vercel global-config backups flags --backup-version backup_version_abc123 --format json
vercel global-config backups flags --restore backup_version_abc123 --yes
```

*List, inspect, or restore backups for a store.*

> **💡 Note:** Restoring a backup updates live Global Config items immediately. Use `--yes` to
> skip the confirmation prompt in non-interactive environments.

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--backup-version <VERSION_ID>` | String | Fetch a single backup version by ID |
| `--restore <VERSION_ID>` | String | Restore items from a backup version. Cannot be used with `--backup-version` |
| `--limit <NUMBER>` | Number | Maximum number of backups to list (`0` to `50`) |
| `--next <CURSOR>` | String | Pagination cursor from a previous backup list response |
| `-y, --yes` | Boolean | Skip the confirmation prompt when restoring |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

## Examples

### Create a store and seed initial items

```bash filename="terminal"
vercel global-config create flags --items '{"betaUiEnabled":false,"region":"sfo1"}'
```

*Create a store with two initial items.*

### Patch items in batch

```bash filename="terminal"
vercel global-config update flags --patch '{"items":[
  {"operation":"upsert","key":"betaUiEnabled","value":true},
  {"operation":"delete","key":"oldFlag"}
]}'
```

*Apply a batch of item operations in one call. See the batch items REST API
reference.*

### Create a read token for production

```bash filename="terminal"
vercel global-config tokens flags --add "Production read"
```

*Create a labeled read token. The CLI prints the plaintext token (and its ID)
once; capture it before it scrolls away.*

### Restore a backup

```bash filename="terminal"
vercel global-config backups flags --restore backup_version_abc123 --yes
```

*Restore \`flags\` from a backup version and skip the confirmation prompt.*

The Global Config SDK reads from a `GLOBAL_CONFIG` environment variable (falling back to `EDGE_CONFIG`) that contains a full **connection string**, not just the token. The connection string format is:

```text filename="connection string"
https://global-config.vercel.com/<globalConfigId>?token=<token>
```

Use `vercel global-config inspect <id-or-slug>` to look up the Global Config ID, then combine it with the token. See [Global Config dashboard](/docs/global-config/global-config-dashboard) for details on the connection string format.

## Related

- [Global Config overview](/docs/global-config)
- [Global Config REST API reference](/docs/rest-api/global-config)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel global-config` command:

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
