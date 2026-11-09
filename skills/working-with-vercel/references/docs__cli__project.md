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
  - /docs/project-configuration/general-settings
  - /docs/cli/login
  - /docs/cli/global-options
  - /docs/fluid-compute
  - /docs/functions/configuring-functions/memory
summary: "Perform the following commands from the terminal for your Vercel Projects: list, create, inspect, update settings, rename, delete, and configure..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/project.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "0fe669f655394cdad19977e5ab3ed3cbedafa05359300d5b777f657d839f7143"
---

# vercel project

The `vercel project` command manages your Vercel Projects from the terminal: list, create, inspect, update, rename, and delete projects, pause and resume production traffic, plus configure framework and build settings, deployment checks, deployment protection, access groups, project members, Web Analytics, Speed Insights, Observability Plus, and project-scoped OIDC tokens.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agents can now enable Web Analytics and Observability Plus with Vercel CLI](https://vercel.com/changelog/agents-can-now-enable-web-analytics-and-observability-plus-with-vercel-cli)
- [Update Project Settings from the Vercel CLI](https://vercel.com/changelog/update-project-settings-from-the-vercel-cli)
- [Vercel CLI can now set new projects to expire](https://vercel.com/changelog/vercel-cli-can-now-set-new-projects-to-expire)
- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [Audit Logs](https://vercel.com/docs/audit-log) — Learn how to track and analyze your team members' activities.
- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and triage
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel curl](https://vercel.com/docs/cli/curl) — Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel

Full cross-link map for this page: [/docs/cli/project.graph.md](/docs/cli/project.graph.md)
<!-- /docsgraph:related -->

`vercel projects` is an alias for the same command.

## Usage

```bash filename="terminal"
vercel project list
```

*Using the \`vercel project list\` command to list projects in the current scope.*

## Subcommands

Subcommands that take a project argument (shown as `[name]`, `[project]`, or `<name>`) accept the project name (the name shown in the dashboard and `vercel project list`) or its ID, for example `my-app` or `prj_abc123`. When the argument is optional and you omit it, the linked project is used.

### `list`

Show all projects in the selected scope. This is the default subcommand, so `vercel project` and `vercel project list` behave the same way.

```bash filename="terminal"
vercel project list [options]
```

#### Options

| Option              | Description                                                                       |
| ------------------- | --------------------------------------------------------------------------------- |
| `--next`            | Show the next page of results. Pass the cursor that the previous page prints.     |
| `--limit`           | Number of projects to return per page. The default is 20, and the maximum is 100. |
| `--json`            | Output the result as JSON.                                                        |
| `--update-required` | Filter to projects affected by an upcoming Node.js runtime deprecation.           |
| `--paused`          | Show only projects whose production traffic is [paused](#pause).                  |
| `-q, --query`       | Filter projects by name (substring match).                                        |

#### Examples

```bash filename="terminal"
# Paginate results
vercel project list --next 1584722256178

# Projects affected by an upcoming Node.js deprecation, as JSON
vercel project list --update-required --json

# Substring filter
vercel project list --query my-app

# Projects whose production traffic is paused
vercel project list --paused
```

### `create`

Create a new project. The `name` argument is required; `vercel project create` with no name (or with more than one positional) prints a usage error and exits.

```bash filename="terminal"
vercel project create <name>
```

Project names must be lowercase and can include letters, digits, `.`, `_`, and `-`. They can't contain spaces. See [Project name](/docs/project-configuration/general-settings#project-name) for the full rules.

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

### `keep`

Keep a temporary project by removing its scheduled automatic deletion:

```bash filename="terminal"
vercel project keep [project]
```

Omit the project argument to keep the linked project, or pass a project name or ID. [Sign in](/docs/cli/login) or [authenticate with a token](/docs/cli/global-options#token) before running the command. When you name a project outside a linked directory in [non-interactive mode](/docs/cli/global-options#non-interactive), pass `--scope` explicitly to select its team.

The command applies the change without a confirmation prompt. If the project has no scheduled deletion, it reports that no change is needed and exits successfully.

#### Examples

```bash filename="terminal"
# Keep the linked project
vercel project keep

# Keep a named project on a specific team
vercel project keep my-project --scope my-team

# Return the result as JSON
vercel project keep my-project --scope my-team --json
```

*Remove a project's scheduled automatic deletion.*

Use `--json`, or `--format=json`, to write the result to stdout:

```json filename="output"
{
  "id": "prj_example",
  "name": "my-project",
  "kept": true
}
```

`kept` is `true` when the command removes a scheduled deletion and `false` when the project wasn't scheduled for deletion. Both outcomes exit successfully. Missing projects and insufficient permissions return a nonzero exit code.

### `update`

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
| `--root-directory <DIR>`      | Set the project root directory.                                                                                                    |
| `--auto-detect <SETTING>`     | Reset a setting to automatic detection: `build-command`, `dev-command`, `install-command`, `output-directory`, or `root-directory`. Repeat the flag or pass a comma-separated list. Can't be combined with the explicit flag for the same setting. |
| `--fluid-compute`             | Turn on [Fluid compute](/docs/fluid-compute) for the project. To turn it off, pass `--no-fluid-compute`. |
| `--function-cpu <TIER>`       | Set the default [function CPU and memory](/docs/functions/configuring-functions/memory) tier, for example `standard` or `performance`. Changing this setting requires a Pro or Enterprise plan. |
| `--build-machine <TYPE>`      | Set the [build machine type](/docs/builds/managing-builds#build-machines): `basic`, `standard`, `enhanced`, `turbo`, or `elastic`. Changing this setting requires a Pro or Enterprise plan. |
| `--elastic-concurrency`       | Turn on [on-demand concurrent builds](/docs/builds/managing-builds#on-demand-concurrent-builds) for the project. To turn them off, pass `--no-elastic-concurrency`. Turning them on requires a Pro or Enterprise plan. |
| `--node-version <VERSION>`    | Set the Node.js version, for example `24.x` or `22.x`. |
| `--sandbox-region <REGION>`   | Set the default [region](/docs/sandbox/concepts/regions) for sandboxes created in the project. Use `""` to clear.                  |
| `--sandbox-failover-regions <REGIONS>` | Set the comma-separated [failover regions](/docs/sandbox/concepts/regions#failover-regions) for sandboxes created in the project. Must not include the main region. Use `""` to clear. Available on Pro and Enterprise plans, excluding [Pro trials](/docs/plans/pro-plan/trials). |
| `-y, --yes`                   | Apply the changes without a confirmation prompt. Settings that can affect charges (`--function-cpu`, `--build-machine`, and `--elastic-concurrency`) always ask for confirmation in an interactive terminal. |
| `--json`                      | Output the result as JSON.                                                                                                         |

#### Examples

```bash filename="terminal"
vercel project update --framework nextjs

vercel project update my-project --framework vite

vercel project update my-project --build-command "pnpm build" --output-directory dist

vercel project update my-project --auto-detect build-command --auto-detect output-directory

vercel project update my-project --sandbox-region sfo1 --sandbox-failover-regions cle1,iad1

vercel project update my-project --framework other --json
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

### `delete`

Delete a project and all of its deployments. You can't undo this operation. In a terminal, the command shows the project's team and asks you to type the project name to confirm.

```bash filename="terminal"
vercel project delete <name>
```

To delete a project without the prompt, for example from a script, pass `--confirm-name` with the project name and `--scope` with the team:

```bash filename="terminal"
vercel project delete my-app --confirm-name my-app --scope my-team
```

### `dangerously-delete-immutable-static-asset`

Permanently delete an immutable static asset from storage. Unlike [cache
deletion](/docs/cli/cache), which flushes cached content that regenerates on
the next request, this deletes the stored asset itself for both the production
and preview environments: its URL serves a `410 Gone` response for seven days,
then a `404`, and the project's build hash salt rotates so your next deployment
emits different asset URLs. You cannot undo this operation.

The command only runs interactively and asks you to type the asset path to
confirm. The path must exactly match the stored asset path, start with
`_vercel/immutable/` or `_next/static/immutable/`, and contain no leading
slash. See [Deleting immutable static
assets](/docs/caching/cdn-cache#deleting-immutable-static-assets) for details,
including why deleting the asset does not delete the content.

```bash filename="terminal"
vercel project dangerously-delete-immutable-static-asset _next/static/immutable/chunks/example.js
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

Activating [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) for a project without it can incur charges. Review [Password Protection pricing](/docs/deployment-protection/methods-to-protect-deployments/password-protection#password-protection-pricing) before activating it. Run the command in an interactive terminal and type the project name to confirm, or enable it in the dashboard. Updating an existing password and disabling protection don't require this activation confirmation. Scripts and agents must hand activation to a person.

For project-priced Pro teams, disabling Password Protection stops future charges for that project. Run `vercel project protection disable [name] --password --scope my-team` to disable it.

```bash filename="terminal"
vercel project protection [action] [name] [options]
```

#### Options

| Option                                | Description                                                                                                |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `--sso`                               | Apply the action to SSO protection.                                                                        |
| `--password`                          | Apply the action to password protection. Requires an eligible plan.                                        |
| `--protection-password <PASSWORD>`    | When enabling `--password`, set the password value. Maximum 72 characters.                                 |
| `--customer-support-code-visibility`  | Apply the action to customer support code visibility protection.                                           |
| `--skew`                              | Apply the action to skew protection.                                                                       |
| `--skew-max-age <SECONDS>`            | When enabling `--skew`, set the max age in seconds. Defaults to 2592000 (30 days).                         |
| `--protection-bypass`                 | Apply the action to automation protection bypass secrets.                                                  |
| `--protection-bypass-secret <SECRET>` | Optional bypass secret value. Required when disabling bypass.                                              |
| `--git-fork-protection`               | Apply the action to Git fork protection.                                                                   |
| `--json`                              | Output the result as JSON.                                                                                 |

#### Examples

```bash filename="terminal"
# Show protection settings for the linked project
vercel project protection

# Named project as JSON
vercel project protection my-app --json

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

For `add` and `remove`, both arguments are required and `<member>` can be an email address, username, or user ID. Adding a member requires a Pro or Enterprise team, and the member must already be a confirmed member of the team. Invite them first with `vercel teams invite` if needed. The available project roles also depend on the member's team role: Contributors can hold any project role, Developers can only be added as `ADMIN`, Security members as `ADMIN` or `PROJECT_DEVELOPER`, and team Members and Owners already have access to every project.

Both `add` and `remove` ask for confirmation and have no flag to skip it, so run them in an interactive terminal.

#### Options

| Option        | Description                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------- |
| `-q, --query` | Filter project members by name, username, or email (`list` only).                                              |
| `--next`      | Show the next page of results (`list` only). Pass the cursor that the previous page prints.                    |
| `--limit`     | Limit number of project members returned (1-100) (`list` only).                                                |
| `--role`      | Required for `add`. Project role to grant: `ADMIN`, `PROJECT_DEVELOPER`, `PROJECT_VIEWER`, or `PROJECT_GUEST`. |
| `--json`      | Output the result as JSON.                                                                                     |

#### Examples

```bash filename="terminal"
# List members for the linked project
vercel project members

# List members for a named project as JSON
vercel project members my-project --json

# Add a member to a project by email
vercel project members add my-project user@example.com --role PROJECT_VIEWER

# Add a member by username (the role is case-insensitive)
vercel project members add my-project octocat --role admin

# Remove a member from a project
vercel project members remove my-project user@example.com

# Remove a member by username
vercel project members remove my-project octocat
```

### `access-groups`

List access groups for a project. Here `[name]` is the project (name or ID), not an access group; omit it to use the linked project.

```bash filename="terminal"
vercel project access-groups [name] [options]
```

#### Options

| Option        | Description                                                                   |
| ------------- | ----------------------------------------------------------------------------- |
| `-q, --query` | Search access groups by name.                                                 |
| `--limit`     | Limit number of access groups returned (1-100).                               |
| `--next`      | Show the next page of results. Pass the cursor that the previous page prints. |
| `--json`      | Output the result as JSON.                                                    |

#### Examples

```bash filename="terminal"
# List access groups for the linked project
vercel project access-groups

# List access groups for a named project as JSON
vercel project access-groups my-project --json
```

### `access-summary`

Show member counts by team role for project access. Requires the access groups entitlement.

```bash filename="terminal"
vercel project access-summary [name] [options]
```

#### Options

| Option   | Description                |
| -------- | -------------------------- |
| `--json` | Output the result as JSON. |

#### Examples

```bash filename="terminal"
# Summary for the linked project
vercel project access-summary

# Summary for a named project as JSON
vercel project access-summary my-app --json
```

### `web-analytics`

Enable or disable [Web Analytics](/docs/analytics) for a project. The `action` can be `enable` or `disable`. When omitted, the command enables Web Analytics. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project web-analytics [action] [name] [options]
```

`enable` runs without a confirmation prompt. On Hobby, Web Analytics is free within the [documented limits](/docs/analytics/limits-and-pricing). On Pro and Enterprise, enabling incurs charges.

`disable` stops data collection for the project and asks for confirmation. To skip the prompt, pass `--yes`. For a project on a Pro or Enterprise team, also pass `--scope` with the team. The `--json` option only changes the output format and doesn't skip the confirmation.

#### Options

| Option      | Description                                 |
| ----------- | ------------------------------------------- |
| `-y, --yes` | Skip the confirmation prompt for `disable`. |
| `--json`    | Output the result as JSON.                  |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project web-analytics

# Enable for a named project
vercel project web-analytics enable my-project

# Disable for a named project
vercel project web-analytics disable my-project

# Disable without a prompt and print the result as JSON
vercel project web-analytics disable my-project --yes --scope my-team --json
```

### `speed-insights`

Upgrade a project to [Speed Insights Plus](/docs/speed-insights/limits-and-pricing), or downgrade to the Speed Insights free tier. The `action` can be `enable` or `disable`. When omitted, the command upgrades the project to Speed Insights Plus. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project speed-insights [action] [name] [options]
```

Both `enable` and `disable` ask for confirmation and have no flag to skip it, so run the command in an interactive terminal. `enable` upgrades the project to Speed Insights Plus. Vercel bills Speed Insights Plus usage on Pro and Enterprise. Teams on Hobby must upgrade to Pro before continuing. `disable` downgrades the project to the Speed Insights free tier.

Data collection continues under the free tier, subject to your team's [allocation limits](/docs/speed-insights/limits-and-pricing#limitations). To stop automatic collection from new visits to the updated deployment, [remove Speed Insights instrumentation and redeploy](/docs/speed-insights/using-speed-insights#stopping-data-collection).

The `--json` option only changes the output format, and the confirmation comes first. The JSON `enabled` field reports the project's Plus status. Data collection can continue when this field is `false`.

#### Options

| Option   | Description                |
| -------- | -------------------------- |
| `--json` | Output the result as JSON. |

#### Examples

```bash filename="terminal"
# Upgrade the linked project to Plus
vercel project speed-insights

# Upgrade a named project to Plus
vercel project speed-insights enable my-project

# Downgrade a named project to the free tier
vercel project speed-insights disable my-project

# Downgrade to the free tier and print the result as JSON
vercel project speed-insights disable my-project --json
```

### `observability`

Enable or disable [Observability Plus](/docs/observability) for a project. The `action` argument is required and must be `enable` or `disable`. When `name` is omitted, the command uses the linked project.

```bash filename="terminal"
vercel project observability <action> [name] [options]
```

Enabling Observability Plus incurs charges on your account and requires a Pro or Enterprise team. `enable` runs without a confirmation prompt. `disable` asks for confirmation. To skip the prompt, pass `--yes`, and for a team project also pass `--scope` with the team.

#### Options

| Option      | Description                                 |
| ----------- | ------------------------------------------- |
| `-y, --yes` | Skip the confirmation prompt for `disable`. |
| `--json`    | Output the result as JSON.                  |

#### Examples

```bash filename="terminal"
# Enable for the linked project
vercel project observability enable

# Disable for a named project
vercel project observability disable my-project

# Disable without a prompt and print the result as JSON
vercel project observability disable my-project --yes --scope my-team --json
```

### `pause`

Pause production traffic for a project. While paused, the production deployment stops serving traffic and visitors see an error page. Defaults to the linked project.

Because pausing takes production offline, the command always asks you to type the project name to confirm. There is no flag to skip the confirmation, so run the command in an interactive terminal.

```bash filename="terminal"
vercel project pause [project] [options]
```

#### Options

| Option   | Description                |
| -------- | -------------------------- |
| `--json` | Output the result as JSON. |

#### Examples

```bash filename="terminal"
# Pause the linked project
vercel project pause

# Pause a project by name
vercel project pause my-project

# Pause a project and print the result as JSON
vercel project pause my-project --json
```

### `resume`

Resume production traffic for a paused project. Defaults to the linked project. Resuming a single project doesn't ask for confirmation.

```bash filename="terminal"
vercel project resume [project...] [options]
```

To resume several projects at once, name each project, or pass `--all` to resume every paused project in the team. With `--all`, or when more than one of the named projects is paused, the command asks for confirmation once before it resumes them. The command skips projects that aren't paused. To see which projects are paused, run `vercel project list --paused`.

#### Options

| Option      | Description                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------------------- |
| `--all`     | Resume every paused project in the team. Can't be combined with project names.                                  |
| `-y, --yes` | Skip the confirmation prompt when you resume several projects. With `--all`, also pass `--scope` with the team. |
| `--json`    | Output the result as JSON.                                                                                      |

#### Examples

```bash filename="terminal"
# Resume the linked project
vercel project resume

# Resume a project by name
vercel project resume my-project

# Resume every paused project in the team
vercel project resume --all

# Resume every paused project in a team without a prompt
vercel project resume --all --yes --scope my-team

# Resume a project and print the result as JSON
vercel project resume my-project --json
```

### `token`

Get a development [OIDC token](/docs/oidc) for a project. Useful when you need a project-scoped token from a script or CI environment without going through the dashboard.

```bash filename="terminal"
vercel project token [name] [options]
```

#### Options

| Option      | Description                   |
| ----------- | ----------------------------- |
| `-y, --yes` | Skip the confirmation prompt. |
| `--json`    | Output the result as JSON.    |

#### Examples

```bash filename="terminal"
# Token for the linked project
vercel project token

# Token for a named project
vercel project token my-project

# Token as JSON
vercel project token my-project --json
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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
