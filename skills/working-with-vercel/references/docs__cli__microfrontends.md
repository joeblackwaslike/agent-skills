---
title: vercel microfrontends
product: vercel
url: /docs/cli/microfrontends
canonical_url: "https://vercel.com/docs/cli/microfrontends"
last_updated: 2026-04-01
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects, and pull configuration for...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/microfrontends.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "b0053aa06842d5736e75f6e64f9c7e815ff5ea57db6075bae11a85e1f25d2bd9"
---

# vercel microfrontends

The `vercel microfrontends` command (alias: `vercel mf`) provides utilities for managing Vercel Microfrontends from the CLI.

> **💡 Note:** To learn more about the architecture and config format, see
> .
> For a polyrepo setup walkthrough, see
> .

## Subcommands

| Subcommand                                | Description                                     |
| ----------------------------------------- | ----------------------------------------------- |
| [`create-group`](#create-group)           | Create a new microfrontends group               |
| [`add-to-group`](#add-to-group)           | Add the current project to a group              |
| [`remove-from-group`](#remove-from-group) | Remove the current project from its group       |
| [`delete-group`](#delete-group)           | Delete a microfrontends group                   |
| [`inspect-group`](#inspect-group)         | Inspect a microfrontends group and its projects |
| [`pull`](#pull)                           | Pull remote configuration for local development |

## create-group

Create a new microfrontends group to compose multiple projects into one cohesive application with shared routing. The group is created in the current scope (team or user). The command is interactive if options are omitted.

```bash filename="terminal"
vercel microfrontends create-group [options]
```

### Options

| Option                    | Description                                                                             |
| ------------------------- | --------------------------------------------------------------------------------------- |
| `--name`                  | Name of the microfrontends group                                                        |
| `--project`               | Project name to include (repeatable)                                                    |
| `--default-app`           | Project name for the default application                                                |
| `--default-route`         | Default route for the default application                                               |
| `--project-default-route` | Default route for a non-default project, in the format `<project>=<route>` (repeatable) |
| `-y, --yes`               | Skip creation confirmation prompt                                                       |

### Examples

#### Create a group interactively

```bash filename="terminal"
vercel microfrontends create-group
```

#### Create a group with flags

```bash filename="terminal"
vercel mf create-group --name="My Group" --project=web --project=docs --default-app=web --project-default-route=docs=/docs --yes
```

## add-to-group

Add the current project to a microfrontends group as a child application. The project can then be independently deployed as part of the group. The command is interactive if options are omitted.

To set a project as the default application, use `create-group` with the `--default-app` option or configure it in the dashboard.

```bash filename="terminal"
vercel microfrontends add-to-group [options]
```

### Options

| Option            | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `--group`         | Name of the microfrontends group to add to            |
| `--default-route` | Default route for this project (for example, `/docs`) |

### Examples

#### Add the current project to a group interactively

```bash filename="terminal"
vercel microfrontends add-to-group
```

#### Add the current project to a group with flags

```bash filename="terminal"
vercel mf add-to-group --group="My Group" --default-route=/docs
```

## remove-from-group

Remove the current project from its microfrontends group so it's no longer part of the composed application.

> **💡 Note:** You cannot remove the default application from a group using the CLI. To remove the default application, use the dashboard or delete the entire group with `delete-group`.

```bash filename="terminal"
vercel microfrontends remove-from-group [options]
```

### Options

| Option      | Description                                                           |
| ----------- | --------------------------------------------------------------------- |
| `-y, --yes` | Skip the project-link prompt (does not skip the removal confirmation) |

### Examples

#### Remove the current project from its group

```bash filename="terminal"
vercel microfrontends remove-from-group
```

## delete-group

Delete a microfrontends group and all its settings. This action is not reversible.

```bash filename="terminal"
vercel microfrontends delete-group [options]
```

### Options

| Option      | Description                                                            |
| ----------- | ---------------------------------------------------------------------- |
| `--group`   | Name or ID of the microfrontends group to delete                       |
| `-y, --yes` | Skip the project-link prompt (does not skip the deletion confirmation) |

### Examples

#### Delete a group interactively

```bash filename="terminal"
vercel microfrontends delete-group
```

#### Delete a group with flags

```bash filename="terminal"
vercel mf delete-group --group="My Group"
```

## inspect-group

Inspect a microfrontends group and return metadata about the group and its projects. This command is useful for setup automation and scripts.

If you omit `--group`, the command is interactive and lets you select a group. In non-interactive environments, pass `--group`.

```bash filename="terminal"
vercel microfrontends inspect-group [options]
```

### Options

| Option               | Description                                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `--group`            | Name, slug, or ID of the microfrontends group to inspect                                                         |
| `--config-file-name` | Custom microfrontends config file path/name relative to the default app root (must end with `.json` or `.jsonc`) |
| `-F, --format`       | Output format. Use `json` for machine-readable output                                                            |

### Examples

#### Inspect a group interactively

```bash filename="terminal"
vercel microfrontends inspect-group
```

#### Inspect a group as JSON

```bash filename="terminal"
vercel mf inspect-group --group="My Group" --format=json
```

#### Inspect a group with a custom config filename

```bash filename="terminal"
vercel mf inspect-group --group="My Group" --config-file-name=microfrontends.jsonc --format=json
```

## pull

Pull the remote microfrontends configuration to your local repository for development.

> **💡 Note:** For a polyrepo setup walkthrough, see
> .
> This subcommand requires Vercel CLI 44.2.2 or newer.

```bash filename="terminal"
vercel microfrontends pull [options]
```

### Options

| Option       | Description                                                                       |
| ------------ | --------------------------------------------------------------------------------- |
| `-y, --yes`  | Skip confirmation when linking is required (for example, in non-interactive mode) |
| `--dpl`      | The deployment ID to use for pulling the microfrontends configuration             |

### Examples

#### Pull configuration for the linked project

```bash filename="terminal"
vercel microfrontends pull
```

#### Pull configuration for a specific deployment

```bash filename="terminal"
vercel mf pull --dpl dpl_123xyz
```


---

[View full sitemap](/docs/sitemap)
