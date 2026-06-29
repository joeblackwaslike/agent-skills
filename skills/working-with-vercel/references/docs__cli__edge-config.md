---
title: vercel edge-config
product: vercel
url: /docs/cli/edge-config
canonical_url: "https://vercel.com/docs/cli/edge-config"
last_updated: 2026-06-09
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/edge-config
  - /docs/rest-api/reference/endpoints/edge-config/update-edge-config-items-in-batch
  - /docs/edge-config/edge-config-dashboard
  - /docs/rest-api/reference/endpoints/edge-config
summary: "Manage Edge Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items and read tokens."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/edge-config.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "8260aeaa5ec00c7069571d3e28eae898c8680c0adc3b4b306d4d8537fd956c1d"
---

# vercel edge-config

The `vercel edge-config` command manages [Edge Config](/docs/edge-config) stores from the CLI. It mirrors the dashboard API surface: create stores, inspect metadata, patch items in batch, list items, manage read tokens, and restore backups. For an overview of Edge Config and how to read from it at runtime, see [Vercel Edge Config](/docs/edge-config).

## Usage

```bash filename="terminal"
vercel edge-config [subcommand]
```

*Using the \`vercel edge-config\` command to manage Edge Config stores.*

## Commands

### list (ls)

Lists Edge Config stores for the current team. Running `vercel edge-config` with no subcommand runs `list`.

```bash filename="terminal"
vercel edge-config
vercel edge-config list
vercel edge-config list --format json
```

*List stores. Use \`--format json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### add (create)

Creates a new Edge Config store with the given slug. Optionally seeds it with initial items.

```bash filename="terminal"
vercel edge-config add flags
vercel edge-config add flags --items '{"betaUiEnabled":true,"region":"sfo1"}'
```

*Create a store with slug \`flags\`, optionally with seed items.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `slug` | Yes | Slug for the new Edge Config store |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--items <JSON>` | String | Optional JSON object of initial items (`{ "key": <value>, ... }`) |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

### get (inspect)

Shows metadata for an Edge Config store. Accepts either the store ID (starts with `ecfg_`) or the slug.

```bash filename="terminal"
vercel edge-config get flags
vercel edge-config get ecfg_abc123 --format json
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

Renames an Edge Config store (`--slug`) and/or patches its items (`--patch`). For complex updates, use the [batch items API](/docs/rest-api/reference/endpoints/edge-config/update-edge-config-items-in-batch) shape.

```bash filename="terminal"
vercel edge-config update flags --slug feature-flags
vercel edge-config update flags --patch '{"items":[{"operation":"upsert","key":"betaUiEnabled","value":true}]}'
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

Deletes an Edge Config store.

```bash filename="terminal"
vercel edge-config remove flags --yes
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

Lists items in an Edge Config store, or fetches one item with `--key`.

```bash filename="terminal"
vercel edge-config items flags
vercel edge-config items flags --key betaUiEnabled
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

Lists, creates (`--add`), or revokes (`--remove`) read tokens for an Edge Config store. Read tokens authenticate Edge Config reads from your application at runtime.

```bash filename="terminal"
vercel edge-config tokens flags
vercel edge-config tokens flags --add "Production read"
vercel edge-config tokens flags --remove tok_abc123 --yes
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

Lists backups for an Edge Config store, fetches a single backup version with `--backup-version`, or restores items from a backup with `--restore`.

```bash filename="terminal"
vercel edge-config backups flags
vercel edge-config backups flags --backup-version backup_version_abc123 --format json
vercel edge-config backups flags --restore backup_version_abc123 --yes
```

*List, inspect, or restore backups for a store.*

> **⚠️ Warning:** Restoring a backup updates live Edge Config items immediately. Use `--yes` to
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
vercel edge-config add flags --items '{"betaUiEnabled":false,"region":"sfo1"}'
```

*Create a store with two initial items.*

### Patch items in batch

```bash filename="terminal"
vercel edge-config update flags --patch '{"items":[
  {"operation":"upsert","key":"betaUiEnabled","value":true},
  {"operation":"delete","key":"oldFlag"}
]}'
```

*Apply a batch of item operations in one call. See the batch items REST API
reference.*

### Create a read token for production

```bash filename="terminal"
vercel edge-config tokens flags --add "Production read"
```

*Create a labeled read token. The CLI prints the plaintext token (and its ID)
once; capture it before it scrolls away.*

### Restore a backup

```bash filename="terminal"
vercel edge-config backups flags --restore backup_version_abc123 --yes
```

*Restore \`flags\` from a backup version and skip the confirmation prompt.*

The Edge Config SDK reads from an `EDGE_CONFIG` environment variable that contains a full **connection string**, not just the token. The connection string format is:

```text filename="connection string"
https://edge-config.vercel.com/<edgeConfigId>?token=<token>
```

Use `vercel edge-config get <id-or-slug>` to look up the Edge Config ID, then combine it with the token. See [Edge Config dashboard](/docs/edge-config/edge-config-dashboard) for details on the connection string format.

## Related

- [Edge Config overview](/docs/edge-config)
- [Edge Config REST API reference](/docs/rest-api/reference/endpoints/edge-config)


---

[View full sitemap](/docs/sitemap)
