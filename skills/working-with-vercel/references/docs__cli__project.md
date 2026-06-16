---
title: vercel project
product: vercel
url: /docs/cli/project
canonical_url: "https://vercel.com/docs/cli/project"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/analytics
  - /docs/speed-insights
  - /docs/oidc
summary: "Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, rename, remove, and configure access, checks,..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5d51f830b08bee45eef492afd4b1e54aa9c3014e74d9dc37a276564234075035"
---

# vercel project

The `vercel project` command manages your Vercel Projects from the terminal: list, add, inspect, rename, and remove projects, plus configure deployment checks, deployment protection, access groups, member access, Web Analytics, Speed Insights, and project-scoped OIDC tokens.

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
