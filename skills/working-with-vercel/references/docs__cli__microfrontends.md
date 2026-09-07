---
title: vercel microfrontends
product: vercel
url: /docs/cli/microfrontends
canonical_url: "https://vercel.com/docs/cli/microfrontends"
last_updated: 2026-06-04
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/microfrontends
  - /docs/microfrontends/local-development
  - /docs/cli/global-options
summary: Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects, and pull configuration for...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/microfrontends.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7a8b0bcd38b653ec11cc42b6cc36716fafc7cefc7f879daa44e410bd0507b3cc"
---

# vercel microfrontends

The `vercel microfrontends` command (alias: `vercel mf`) provides utilities for managing Vercel Microfrontends from the CLI.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Microfrontends with AI Agents and the CLI](https://vercel.com/changelog/manage-vercel-microfrontends-with-ai-agents-and-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related)
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel env](https://vercel.com/docs/cli/env?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [vercel connect](https://vercel.com/docs/cli/connect?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=related) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.

Full cross-link map for this page: [/docs/cli/microfrontends.graph.md](/docs/cli/microfrontends.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fmicrofrontends&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** To learn more about the architecture and config format, see
> [Microfrontends on Vercel](/docs/microfrontends).
> For a polyrepo setup walkthrough, see
> [Accessing the configuration file](/docs/microfrontends/local-development#accessing-the-configuration-file).

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
> [Accessing the configuration file](/docs/microfrontends/local-development#accessing-the-configuration-file).
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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel microfrontends` command:

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
