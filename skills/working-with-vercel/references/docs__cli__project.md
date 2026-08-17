---
title: vercel project
product: vercel
url: /docs/cli/project
canonical_url: "https://vercel.com/docs/cli/project"
last_updated: 2026-07-07
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/analytics
  - /docs/speed-insights
  - /docs/oidc
summary: "Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, update settings, rename, remove, and configure access,..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7732fd0e5072a78f7126157a4dba9438247ad38333b50ba21b9c53669d6f89b7"
---

# vercel project

The `vercel project` command manages your Vercel Projects from the terminal: list, add, inspect, update, rename, and remove projects, plus configure framework and build settings, deployment checks, deployment protection, access groups, member access, Web Analytics, Speed Insights, and project-scoped OIDC tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project?from=related) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [vercel connect](https://vercel.com/docs/cli/connect?from=related) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.
- [Global Options](https://vercel.com/docs/cli/global-options?from=related) — Global options are commonly available to use with multiple Vercel CLI commands. Learn about Vercel CLI's global options
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel teams](https://vercel.com/docs/cli/teams?from=related) — Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/cli/project.graph.md](/docs/cli/project.graph.md)
<!-- /docsgraph:related -->

`vercel projects` is an alias for the same command.

## Usage

```bash filename="terminal"
vercel project ls
```

*Using the \`vercel project ls\` command to list projects in the current scope.*

## Subcommands

Subcommands that take a project argument (shown as `[name]` or `<name>`) accept the project name (the name shown in the dashboard and `vercel project ls`) or its ID, for example `my-app` or `prj_abc123`. When the argument is optional and you omit it, the linked project is used.

### `list`

Aliases: `ls`.

Show all projects in the selected scope. This is the default subcommand, so `vercel project` and `vercel project ls` behave the same way.

```bash filename="terminal"
vercel project list [options]
```

#### Options

| Option              | Description                                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| `-N, --next`        | Show the next page of results. Pass the timestamp (ms since the UNIX epoch) cursor.                          |
| `--format`          | Output format. Supports `json`.                                                                              |
| `--update-required` | Filter to projects affected by an upcoming Node.js runtime deprecation.                                      |
| `-f, --filter`      | Filter projects by name (substring match).                                                                   |

#### Examples

```bash filename="terminal"
# Paginate results
vercel project ls --next 1584722256178

# Projects affected by an upcoming Node.js deprecation, as JSON
vercel project ls --update-required --format=json

# Substring filter
vercel project ls --filter my-app
```

### `add`

Create a new project. The `name` argument is required; `vercel project add` with no name (or with more than one positional) prints a usage error and exits.

```bash filename="terminal"
vercel project add <name>
```

Wrap names that contain spaces in quotes:

```bash filename="terminal"
vercel project add "My Project"
```

### `inspect`

Show details for a project by name. Defaults to the linked project.

```bash filename="terminal"
vercel project inspect [name]
```

#### Examples

```bash filename="terminal"
# Inspect the linked project
vercel project inspect

# Inspect a project by name
vercel project inspect my-project
```

### `update`

Aliases: `set`.

Update the framework preset and build settings for a project. Only the settings you pass are changed; omitted settings remain unchanged. Defaults to the linked project. At least one setting option is required.

```bash filename="terminal"
vercel project update [name] [options]
```

#### Options

| Option                        | Description                                                                                                                       |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `--framework <SLUG>`          | Set the framework preset by slug (for example `nextjs`). Use `other` to clear the preset.                                          |
| `--build-command <COMMAND>`   | Set the build command.                                                                                                             |
| `--dev-command <COMMAND>`     | Set the development command.                                                                                                       |
| `--install-command <COMMAND>` | Set the install command.                                                                                                           |
| `--output-directory <DIR>`    | Set the output directory.                                                                                                          |
| `--auto-detect <SETTING>`     | Reset a setting to automatic detection: `build-command`, `dev-command`, `install-command`, or `output-directory`. Repeat the flag or pass a comma-separated list. Can't be combined with the explicit flag for the same setting. |
| `--format`                    | Output format. Supports `json`.                                                                                                    |

#### Examples

```bash filename="terminal"
vercel project update --framework nextjs

vercel project update my-project --framework vite

vercel project update my-project --build-command "pnpm build" --output-directory dist

vercel project update my-project --auto-detect build-command --auto-detect output-directory

vercel project update my-project --framework other --format json
```

### `rename`

Rename an existing project.

```bash filename="terminal"
vercel project rename <name> <new-name>
```

#### Examples

```bash filename="terminal"
vercel project rename my-project my-renamed-project
```

### `remove`

Aliases: `rm`.

Remove a project.

```bash filename="terminal"
vercel project rm <name>
```

### `checks`

List, add, or remove deployment checks for a project.

```bash filename="terminal"
vercel project checks [name]
vercel project checks add [name] [options]
vercel project checks remove <id> [name]
```

#### Examples

```bash filename="terminal"
# List checks for the linked project
vercel project checks

# Checks that block production alias assignment
vercel project checks --blocks deployment-alias

# Add a check from a JSON file
vercel project checks add my-app --file ./check.json

# Add a check with flags (requires integration/webhook setup in the body via --file or --source)
vercel project checks add --check-name "CI" --requires deployment-url --blocks deployment-alias

# Remove a check by ID
vercel project checks remove chk_abc123 my-app
```

### `protection`

Show or toggle deployment protection settings for a project. Pass `enable` or `disable` as the action; omit both to show current settings.

```bash filename="terminal"
vercel project protection [action] [name] [options]
```

#### Options

| Option                                | Description                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `--sso`                               | Apply the action to SSO protection.                                                                        |
| `--password`                          | Apply the action to password protection. Requires an eligible plan.                                        |
| `--customer-support-code-visibility`  | Apply the action to customer support code visibility protection.                                           |
| `--skew`                              | Apply the action to skew protection.                                                                       |
| `--skew-max-age <SECONDS>`            | When enabling `--skew`, set the max age in seconds. Defaults to 2592000 (30 days).                         |
| `--protection-bypass`                 | Apply the action to automation protection bypass secrets.                                                  |
| `--protection-bypass-secret <SECRET>` | Optional bypass secret value. Required when disabling bypass.                                              |
| `--git-fork-protection`               | Apply the action to Git fork protection.                                                                   |
| `--format`                            | Output format. Supports `json`.                                                                            |

#### Examples

```bash filename="terminal"
# Show protection settings for the linked project
vercel project protection

# Named project as JSON
vercel project protection my-app --format json

# Toggle individual protections
vercel project protection enable my-app --password
vercel project protection disable my-app --password
vercel project protection enable my-app --customer-support-code-visibility
vercel project protection enable my-app --skew
vercel project protection enable my-app --skew --skew-max-age 604800
vercel project protection enable my-app --sso
vercel project protection enable my-app --git-fork-protection

# Bypass secret
vercel project protection enable my-app --protection-bypass
vercel project protection disable my-app --protection-bypass --protection-bypass-secret <secret>
```

### `members`

Aliases: `member`.

List project members for a project.

```bash filename="terminal"
vercel project members [name] [options]
```

#### Options

| Option     | Description                                                |
| ---------- | ---------------------------------------------------------- |
| `--search` | Filter project members by name, username, or email.        |
| `--limit`  | Limit number of project members returned (1-100).          |
| `--format` | Output format. Supports `json`.                            |

#### Examples

```bash filename="terminal"
# List members for the linked project
vercel project members

# List members for a named project as JSON
vercel project members my-project --format json
```

### `access-groups`

Aliases: `accessgroups`.

List access groups for a project. Here `[name]` is the project (name or ID), not an access group; omit it to use the linked project.

```bash filename="terminal"
vercel project access-groups [name] [options]
```

#### Options

| Option       | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| `--search`   | Search access groups by name.                                                        |
| `--limit`    | Limit number of access groups returned (1-100).                                      |
| `-N, --next` | Show the next page of results. Pass the timestamp (ms since the UNIX epoch) cursor. |
| `--format`   | Output format. Supports `json`.                                                      |

#### Examples

```bash filename="terminal"
# List access groups for the linked project
vercel project access-groups

# List access groups for a named project as JSON
vercel project access-groups my-project --format json
```

### `access-summary`

Aliases: `summary`.

Show member counts by team role for project access. Requires the access groups entitlement.

```bash filename="terminal"
vercel project access-summary [name] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Summary for the linked project
vercel project access-summary

# Summary for a named project as JSON
vercel project access-summary my-app --format json
```

### `web-analytics`

Enable [Web Analytics](/docs/analytics) for a project.

```bash filename="terminal"
vercel project web-analytics [name] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project web-analytics

# Enable for a named project
vercel project web-analytics my-project

# Confirm enablement as JSON (non-interactive)
vercel project web-analytics --format json
```

### `speed-insights`

Enable [Speed Insights](/docs/speed-insights) for a project.

```bash filename="terminal"
vercel project speed-insights [name] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project speed-insights

# Enable for a named project
vercel project speed-insights my-project

# Confirm enablement as JSON (non-interactive)
vercel project speed-insights --format json
```

### `token`

Get a development [OIDC token](/docs/oidc) for a project. Useful when you need a project-scoped token from a script or CI environment without going through the dashboard.

```bash filename="terminal"
vercel project token [name] [options]
```

#### Options

| Option      | Description                                          |
| ----------- | ---------------------------------------------------- |
| `-y, --yes` | Skip the confirmation prompt.                        |
| `--format`  | Output format. Supports `json`.                      |

#### Examples

```bash filename="terminal"
# Token for the linked project
vercel project token

# Token for a named project
vercel project token my-project

# Token as JSON
vercel project token my-project --format=json
```


---

[View full sitemap](/docs/sitemap)
