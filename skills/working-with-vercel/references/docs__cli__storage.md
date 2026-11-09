---
title: vercel storage
product: vercel
url: /docs/cli/storage
canonical_url: "https://vercel.com/docs/cli/storage"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-blob
  - /docs/global-config
  - /docs/integrations
  - /docs/cli/login
  - /docs/cli/global-options
summary: List, create, inspect, and delete storage resources, and manage their project connections with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/storage.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "57c99eb266abfed122b82224a405193dc519e8396df2b694cdb667f985ec3ea4"
---

# vercel storage

The `vercel storage` command manages storage resources and their project connections. You can create and delete [Vercel Blob](/docs/vercel-blob) stores and [Global Config](/docs/global-config) stores, and connect existing resources from the [Marketplace](/docs/integrations).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel blob](https://vercel.com/docs/cli/blob) — Learn how to interact with Vercel Blob storage using the vercel blob CLI command.
- [Managing Vercel Blob storage from the CLI](https://vercel.com/docs/vercel-blob/manage-blob-storage) — Create blob stores, upload files, list contents, and manage storage using the CLI.
- [vercel global-config](https://vercel.com/docs/cli/global-config) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, delete, and manage items, read tokens, a
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/storage.graph.md](/docs/cli/storage.graph.md)
<!-- /docsgraph:related -->

## Usage

Choose a storage subcommand:

```bash filename="terminal"
vercel storage list
vercel storage status
```

*List storage resources, then inspect the linked project's connections.*

[Log in](/docs/cli/login) before running storage commands, or authenticate with a [token](/docs/cli/global-options#token). Store operations use the linked project's team when available, or your current account scope otherwise. Use the global [`--scope` option](/docs/cli/global-options#scope) to select a team.

Connection commands use the linked project by default. Pass `--project <name-or-id>` to target a project without linking the current directory. The `--auth` option described below controls the credentials your project receives, not how you authenticate to the CLI.

## Commands

### list

List stores in the current scope. Use `--type` to filter by store type, such as `blob`, `global-config`, or `integration`:

```bash filename="terminal"
vercel storage list
vercel storage list --type global-config --json
```

*List all stores, or return only Global Config stores as JSON.*

The table shows each store's name, ID, product, status, and connected projects. JSON output contains a `stores` array with `id`, `name`, `type`, `product`, `status`, and `projects` fields for each store.

### create

Create a Blob or Global Config store. Creation does not connect the store to a project; run [`connect`](#connect) afterward:

```bash filename="terminal"
vercel storage create my-uploads --type blob --access private
vercel storage create feature-config --type global-config --items '{"enabled":true}'
```

*Create a private Blob store or a Global Config store with initial items.*

| Option | Description |
| --- | --- |
| `--type <type>` | `blob` or `global-config`. Required without interactive prompts; otherwise the CLI prompts you to choose. |
| `--access <access>` | Blob access level, `public` or `private`. Required for Blob creation without interactive prompts. |
| `--region <region>` | Blob region. Defaults to `iad1`. |
| `--items <JSON>` | Initial Global Config items as a JSON object. |
| `--json` | Return the created store's details as JSON. |

To create a Marketplace database, use [`vercel install`](/docs/cli/install). Use [`vercel integration discover --category storage`](/docs/cli/integration#vercel-integration-discover) to find storage integrations.

### inspect

Inspect a store by name or ID. If multiple stores share a name, pass a store ID or narrow the match with `--type`:

```bash filename="terminal"
vercel storage inspect my-uploads
vercel storage inspect feature-config --type global-config --json
```

*Inspect a store's metadata and project connections.*

JSON output includes the store's metadata, product-specific `details`, and `connections`. The older `get` alias still works but prints a deprecation warning.

### connect

Connect a store to a project and add the connection's environment variables. Preview the changes before applying them:

```bash filename="terminal"
vercel storage connect my-uploads --project my-app --dry-run --json
vercel storage connect my-uploads --project my-app --yes
```

*Preview a connection, then apply it without a confirmation prompt.*

By default, the connection covers production, preview, and development. Repeat `--environment` to select specific environments:

```bash filename="terminal"
vercel storage connect my-uploads --environment production --environment preview
```

*Connect a store only to production and preview.*

Blob connections default to OpenID Connect (OIDC) credentials without a static read-write token. Other store types use credentials issued by their provider. To explicitly add a static Blob token, pass `--add-rw-token`. Combine it with `--auth token` to use only static credentials:

```bash filename="terminal"
vercel storage connect my-uploads --auth token --add-rw-token --dry-run
```

*Preview a Blob connection that uses a static read-write token.*

See [connection options](#connection-options) for the full option list.

### status

Show connections, environments, credential modes, and environment variable names:

```bash filename="terminal"
vercel storage status
vercel storage status my-uploads
vercel storage status --all --json
```

*Inspect connections for the linked project, one store, or the current scope.*

Without a store argument, `status` uses the linked project or `--project <name-or-id>`. A named store shows its connected projects. Use `--all`, or `-a`, to show every store in the current scope without a linked project. You can't combine `--all` and `--project`.

JSON output contains a `stores` array. Each store's `connections` includes its project, environments, prefix, credential mode, and environment variable names.

### update

Change an existing connection's environments, prefix, or Blob credential mode. Omitted options preserve the connection's current values, so changing a prefix does not switch credentials:

```bash filename="terminal"
vercel storage update my-uploads --prefix UPLOADS --dry-run --json
vercel storage update my-uploads --environment production --yes
vercel storage update my-uploads --auth oidc --yes
```

*Preview a prefix change, change environments, or switch a Blob connection to OIDC.*

If a project has multiple connections to the same store, pass `--environment` values that overlap only the connection you want to update. Those values also become its new environment set. See [connection options](#connection-options) for the full option list.

### disconnect

Disconnect a store from the linked project or the project selected with `--project`. This removes the connection's environment variables. Use `--all` to disconnect every project from the store:

```bash filename="terminal"
vercel storage disconnect my-uploads --dry-run --json
vercel storage disconnect my-uploads
vercel storage disconnect my-uploads --all
```

*Preview a disconnection, disconnect one project, or disconnect every project.*

Applying a disconnection always requires confirmation in an interactive terminal. There is no `--yes` bypass. Scripts and agents can preview changes with `--dry-run`; `--json` requires `--dry-run` for this subcommand.

### delete

Permanently delete a Blob or Global Config store and remove its project connections:

```bash filename="terminal"
vercel storage delete my-uploads
vercel storage delete feature-config --type global-config
```

*Delete a store after reviewing and confirming the operation in a terminal.*

Deletion cannot be undone and always requires interactive confirmation. The command does not support `--yes`, `--dry-run`, or JSON output. Use `--type` to disambiguate stores with the same name. The `rm` and `del` aliases also work.

To delete a Marketplace resource, use [`vercel integration resource delete`](/docs/cli/integration#vercel-integration-resource-delete). To remove a project connection while retaining the store, use [`disconnect`](#disconnect).

## Connection options

The following options apply to both `connect` and `update`:

| Option | Description |
| --- | --- |
| `--project <name-or-id>`, `-p` | Target project. Defaults to the linked project. |
| `--environment <environment>`, `-e` | Repeatable. Accepts `production`, `preview`, and `development`. `connect` defaults to all three; `update` preserves the current environments. |
| `--auth <mode>` | Blob credential mode, `oidc` or `token`. `connect` defaults to `oidc`; `update` preserves the current mode. Other store types use provider-managed credentials. |
| `--add-rw-token` | Explicitly include a static Blob read-write token. Required with `--auth token`; with OIDC, adds the token alongside OIDC credentials. |
| `--prefix <prefix>` | Prefix for generated environment variable names. For example, `UPLOADS` produces `UPLOADS_STORE_ID` for an OIDC Blob connection. |
| `--dry-run` | Preview changes without applying them. Provider-managed variable names may be unavailable until a connection exists. |
| `--yes`, `-y` | Skip the confirmation prompt. Required when applying changes non-interactively. |
| `--json` | Return JSON. Requires `--yes` or `--dry-run` for these subcommands. |

A dry run returns a change plan with `action`, `store`, `projects`, `environments`, and `envVars` fields. The `envVars` object lists variable names to add, remove, or keep. JSON output sets `dryRun` to `true` and `applied` to `false` for a preview.

After changing a connection that affects development, run [`vercel env pull`](/docs/cli/env) to refresh your local environment variables.

## JSON output

Use `--json` to write machine-readable output to stdout. The `list`, `create`, `inspect`, and `status` commands support JSON directly. For `connect`, `update`, and `disconnect`, follow the confirmation and dry-run requirements above.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel storage` command:

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
