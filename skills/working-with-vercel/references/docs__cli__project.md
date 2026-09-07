---
title: vercel project
product: vercel
url: /docs/cli/project
canonical_url: "https://vercel.com/docs/cli/project"
last_updated: 2026-09-01
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/sandbox/concepts/regions
  - /docs/plans/pro-plan/trials
  - /docs/analytics
  - /docs/analytics/limits-and-pricing
  - /docs/speed-insights
summary: "Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, update settings, rename, remove, and configure access,..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "e07d9aa1b40bb28013f498146896cb3356f52dc5806c1f9608f5a11b5af848ea"
---

# vercel project

The `vercel project` command manages your Vercel Projects from the terminal: list, add, inspect, update, rename, and remove projects, pause and resume production traffic, plus configure framework and build settings, deployment checks, deployment protection, access groups, project members, Web Analytics, Speed Insights, Observability Plus, and project-scoped OIDC tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Update Project Settings from the Vercel CLI](https://vercel.com/changelog/update-project-settings-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related)
- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [vercel connect](https://vercel.com/docs/cli/connect?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Learn how to manage Vercel Connect connectors using the vercel connect CLI command.
- [vercel tokens](https://vercel.com/docs/cli/tokens?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Manage your personal Vercel authentication tokens from the CLI: list, create, and remove access tokens for use with the
- [vercel env](https://vercel.com/docs/cli/env?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
- [Managing projects](https://vercel.com/docs/projects/managing-projects?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Learn how to manage your projects through the Vercel Dashboard.
- [vercel integration](https://vercel.com/docs/cli/integration?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=related) — Learn how to manage marketplace native integrations, provision resources, manage individual resources, and discover avai

Full cross-link map for this page: [/docs/cli/project.graph.md](/docs/cli/project.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fproject&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

`vercel projects` is an alias for the same command.

## Usage

```bash filename="terminal"
vercel project ls
```

*Using the \`vercel project ls\` command to list projects in the current scope.*

## Subcommands

Subcommands that take a project argument (shown as `[name]`, `[project]`, or `<name>`) accept the project name (the name shown in the dashboard and `vercel project ls`) or its ID, for example `my-app` or `prj_abc123`. When the argument is optional and you omit it, the linked project is used.

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
| `--sandbox-region <REGION>`   | Set the default [region](/docs/sandbox/concepts/regions) for sandboxes created in the project. Use `""` to clear.                  |
| `--sandbox-failover-regions <REGIONS>` | Set the ordered, comma-separated [failover regions](/docs/sandbox/concepts/regions#failover-regions) for sandboxes created in the project. Must not include the main region. Use `""` to clear. Available on Pro and Enterprise plans, excluding [Pro trials](/docs/plans/pro-plan/trials). |
| `--format`                    | Output format. Supports `json`.                                                                                                    |

#### Examples

```bash filename="terminal"
vercel project update --framework nextjs

vercel project update my-project --framework vite

vercel project update my-project --build-command "pnpm build" --output-directory dist

vercel project update my-project --auto-detect build-command --auto-detect output-directory

vercel project update my-project --sandbox-region sfo1 --sandbox-failover-regions cle1,iad1

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

List, add, or remove project members for a project.

```bash filename="terminal"
vercel project members [project] [options]
vercel project members add <project> <member> --role <role>
vercel project members remove <project> <member>
```

For `add` and `remove`, both arguments are required and `<member>` can be an email address, username, or user ID. `rm` is an alias for `remove`. Adding a member requires a Pro or Enterprise team, and the member must already be a confirmed member of the team. Invite them first with `vercel teams invite` if needed. The available project roles also depend on the member's team role: Contributors can hold any project role, Developers can only be added as `ADMIN`, Security members as `ADMIN` or `PROJECT_DEVELOPER`, and team Members and Owners already have access to every project.

Both `add` and `remove` ask for confirmation and have no flag to skip it, so run them in an interactive terminal.

#### Options

| Option     | Description                                                                                                    |
| ---------- | -------------------------------------------------------------------------------------------------------------- |
| `--search` | Filter project members by name, username, or email (`list` only).                                              |
| `--limit`  | Limit number of project members returned (1-100) (`list` only).                                                |
| `--role`   | Required for `add`. Project role to grant: `ADMIN`, `PROJECT_DEVELOPER`, `PROJECT_VIEWER`, or `PROJECT_GUEST`. |
| `--format` | Output format. Supports `json`.                                                                                |

#### Examples

```bash filename="terminal"
# List members for the linked project
vercel project members

# List members for a named project as JSON
vercel project members my-project --format json

# Add a member to a project by email
vercel project members add my-project user@example.com --role PROJECT_VIEWER

# Add a member by username (the role is case-insensitive)
vercel project members add my-project octocat --role admin

# Remove a member from a project
vercel project members remove my-project user@example.com

# Remove a member using the rm alias
vercel project members rm my-project octocat
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

Enable or disable [Web Analytics](/docs/analytics) for a project. The `action` can be `enable` or `disable`. When omitted, the command enables Web Analytics. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project web-analytics [action] [name] [options]
```

Both `enable` and `disable` ask for confirmation and have no flag to skip it, so run the command in an interactive terminal. On Hobby, Web Analytics is free within the [documented limits](/docs/analytics/limits-and-pricing). On Pro and Enterprise, enabling incurs charges. The `--format json` option only changes the output format and the confirmation will come first.

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project web-analytics

# Enable for a named project
vercel project web-analytics enable my-project

# Disable for a named project
vercel project web-analytics disable my-project

# Disable and print the result as JSON
vercel project web-analytics disable my-project --format json
```

### `speed-insights`

Enable or disable [Speed Insights](/docs/speed-insights) for a project. The `action` can be `enable` or `disable`. When omitted, the command enables Speed Insights. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project speed-insights [action] [name] [options]
```

Both `enable` and `disable` ask for confirmation and have no flag to skip it, so run the command in an interactive terminal. `enable` upgrades the project to [Speed Insights Plus](/docs/speed-insights/limits-and-pricing). Vercel bills Speed Insights Plus usage on Pro and Enterprise. Teams on Hobby must upgrade to Pro before continuing. `disable` downgrades the project back to Speed Insights. The `--format json` option only changes the output format and the confirmation will come first.

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project speed-insights

# Enable for a named project
vercel project speed-insights enable my-project

# Disable for a named project
vercel project speed-insights disable my-project

# Disable and print the result as JSON
vercel project speed-insights disable my-project --format json
```

### `observability`

Enable or disable [Observability Plus](/docs/observability) for a project. The `action` argument is required and must be `enable` or `disable`. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project observability <action> [name] [options]
```

Enabling Observability Plus incurs charges on your account and requires a Pro or Enterprise team. Both `enable` and `disable` ask for confirmation and have no flag to skip it, so run the command in an interactive terminal.

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Enable for the linked project (prompts for confirmation)
vercel project observability enable

# Disable for a named project
vercel project observability disable my-project

# Disable and print the result as JSON
vercel project observability disable my-project --format json
```

### `pause`

Pause production traffic for a project. While paused, the production deployment stops serving traffic and visitors see an error page. Defaults to the linked project.

Because pausing takes production offline, the command always asks you to type the project name to confirm. There is no flag to skip the confirmation, so run the command in an interactive terminal.

```bash filename="terminal"
vercel project pause [project] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Pause the linked project
vercel project pause

# Pause a project by name
vercel project pause my-project

# Pause a project and print the result as JSON
vercel project pause my-project --format json
```

### `resume`

Aliases: `unpause`.

Resume production traffic for a paused project. Defaults to the linked project. The command asks for confirmation before restoring traffic, so run it in an interactive terminal.

```bash filename="terminal"
vercel project resume [project] [options]
```

#### Options

| Option     | Description                     |
| ---------- | ------------------------------- |
| `--format` | Output format. Supports `json`. |

#### Examples

```bash filename="terminal"
# Resume the linked project
vercel project resume

# Resume a project by name
vercel project resume my-project

# Resume a project and print the result as JSON
vercel project resume my-project --format json
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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel project` command:

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
