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
  - /docs/rest-api/global-config/update-global-config-items-in-batch
  - /docs/global-config/global-config-dashboard
  - /docs/rest-api/global-config
  - /docs/cli/global-options
summary: "Manage Global Config stores from the Vercel CLI: list, create, inspect, update, delete, and manage items, read tokens, and backups."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/global-config.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "ad66c2014606d4934dc1142940a866c791fc84625e54a9ea767c39f9f55ad9e2"
---

# vercel global-config

The `vercel global-config` command manages [Global Config](/docs/global-config) stores from the CLI. It mirrors the dashboard API surface: create stores, inspect metadata, patch items in batch, list items, manage read tokens, and restore backups. For an overview of Global Config and how to read from it at runtime, see [Vercel Global Config](/docs/global-config).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Global Config](https://vercel.com/docs/global-config/using-global-config) — Learn how to use Global Configs in your projects.
- [Managing Global Configs with Vercel REST API](https://vercel.com/docs/global-config/vercel-api) — Learn how to use the Vercel REST API to create and update Global Configs. You can also read data stored in Global Config
- [vercel storage](https://vercel.com/docs/cli/storage) — List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.
- [vercel blob](https://vercel.com/docs/cli/blob) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
- [Create a Global Config](https://vercel.com/docs/rest-api/global-config/create-a-global-config) — POST /v1/global-config — Creates a Global Config.

Full cross-link map for this page: [/docs/cli/global-config.graph.md](/docs/cli/global-config.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel global-config [subcommand]
```

*Using the \`vercel global-config\` command to manage Global Config stores.*

## Commands

### list

Lists Global Config stores for the current team. Running `vercel global-config` with no subcommand runs `list`.

```bash filename="terminal"
vercel global-config
vercel global-config list
vercel global-config list --json
```

*List stores. Use \`--json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |

### create

`add` remains a supported alias, but prints a deprecation warning. Use `create` for new commands.

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
| `--json` | Boolean | Output as JSON |

### inspect

`get` remains a supported alias, but prints a deprecation warning. Use `inspect` for new commands.

Shows metadata for a Global Config store. Accepts either the store ID (starts with `ecfg_`) or the slug.

```bash filename="terminal"
vercel global-config inspect flags
vercel global-config inspect ecfg_abc123 --json
```

*Inspect a store by ID or slug.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `id-or-slug` | Yes | Store ID (e.g. `ecfg_abc123`) or slug |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |

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
| `--json` | Boolean | Output as JSON |

### delete

Deletes a Global Config store.

```bash filename="terminal"
vercel global-config delete flags --yes
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
| `--json` | Boolean | Output as JSON |

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
| `--key <KEY>` | String | When set, fetch a single item by key |
| `--json` | Boolean | Output as JSON |

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
| `--json` | Boolean | Output as JSON |

### backups

Lists backups for a Global Config store, fetches a single backup version with `--backup-version`, or restores items from a backup with `--restore`.

```bash filename="terminal"
vercel global-config backups flags
vercel global-config backups flags --backup-version backup_version_abc123 --json
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
| `--json` | Boolean | Output as JSON |

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

The Global Config SDK reads from a `GLOBAL_CONFIG` environment variable (falling back to `EDGE_CONFIG`) that contains a full **connection string**, not just the token. The connection string format is:

```text filename="connection string"
https://global-config.vercel.com/<globalConfigId>?token=<token>
```

Use `vercel global-config inspect <id-or-slug>` to look up the Global Config ID, then combine it with the token. See [Global Config dashboard](/docs/global-config/global-config-dashboard) for details on the connection string format.

### Restore a backup

```bash filename="terminal"
vercel global-config backups flags --restore backup_version_abc123 --yes
```

*Restore \`flags\` from a backup version and skip the confirmation prompt.*

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
