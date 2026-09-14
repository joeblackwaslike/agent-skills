---
title: vercel alerts
product: vercel
url: /docs/cli/alerts
canonical_url: "https://vercel.com/docs/cli/alerts"
last_updated: 2026-08-05
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/alerts
  - /docs/agent/investigation
  - /docs/cli/global-options
summary: List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alerts.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "d7e16c07121fde43065399ee179053b006e4dcce8a8d0b6d7f5f98d2521b62b2"
---

# vercel alerts

The `vercel alerts` command lists recent [alerts](/docs/alerts) for the linked project, a specific project, or an entire team. The `inspect` subcommand shows details for a single alert group, and the `rules` subcommand tree manages alert rules from the terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Pull anomaly alert details using the Vercel CLI](https://vercel.com/changelog/pull-anomaly-alert-details-using-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related)
- [vercel traces](https://vercel.com/docs/cli/traces?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related) — Inspect a request trace in the terminal, open it in the Vercel Dashboard, or manage the trace sampling rules for a proje
- [vercel security](https://vercel.com/docs/cli/security?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope t
- [vercel activity](https://vercel.com/docs/cli/activity?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related) — Discover and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/alerts.graph.md](/docs/cli/alerts.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Falerts&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

By default, `vercel alerts` reads alerts for the linked project from the last 24 hours. You can change the scope with `--project` or `--all`, filter by alert type, change the time range, and switch between table, AI investigation, or JSON output.

Use this command when you want to inspect alert activity from the terminal without opening the dashboard.

## Usage

```bash filename="terminal"
# List alerts for the linked project from the last 24 hours
vercel alerts

# List team-wide alerts
vercel alerts --all

# Filter by alert type and time range
vercel alerts --type usage_anomaly --since 2026-03-01T00:00:00.000Z
```

*Using the \`vercel alerts\` command to list recent alerts for a project or team.*

## Unique options

These options only apply to the `vercel alerts` command.

### Project

The `--project` option, shorthand `-p`, lists alerts for a specific project and overrides the linked project. Pass the project name (the name shown in the dashboard and `vercel project ls`) or its ID, for example `my-app` or `prj_abc123`.

```bash filename="terminal"
vercel alerts --project my-app
```

You can't combine `--project` with `--all`.

### All

The `--all` option, shorthand `-a`, lists team-wide alerts instead of using the linked project.

```bash filename="terminal"
vercel alerts --all
```

You must be in team scope to use `--all`.

### Type

The `--type` option filters by alert type. You can repeat the flag or pass comma-separated values.

```bash filename="terminal"
vercel alerts --type usage_anomaly
vercel alerts --type usage_anomaly,error_anomaly
vercel alerts --type usage_anomaly --type error_anomaly
```

### AI

The `--ai` option prints AI investigation sections instead of the default table output.

This view includes the alert title, resolved time, summary, and key findings when that data is available.

```bash filename="terminal"
vercel alerts --ai
```

### Since

The `--since` option sets the start of the time range. Use an ISO 8601 timestamp.

If you don't pass `--since` or `--until`, the command defaults to the last 24 hours.

```bash filename="terminal"
vercel alerts --since 2026-03-01T00:00:00.000Z
```

### Until

The `--until` option sets the end of the time range. Use an ISO 8601 timestamp.

```bash filename="terminal"
vercel alerts --since 2026-03-01T00:00:00.000Z --until 2026-03-02T00:00:00.000Z
```

`--since` must be earlier than `--until`.

### Limit

The `--limit` option sets the maximum number of alert groups to return.

The supported range is 1 through 100.

```bash filename="terminal"
vercel alerts --limit 25
```

### Format

The `--format` option supports `json` output for scripting and automation.

```bash filename="terminal"
vercel alerts --format json
```

When you use `--format json`, the command returns a `groups` array with the alert group payload from the API.

## List alert examples

List alerts for the linked project:

```bash filename="terminal"
vercel alerts
```

List team-wide alerts:

```bash filename="terminal"
vercel alerts --all
```

Filter by usage and error anomalies:

```bash filename="terminal"
vercel alerts --type usage_anomaly --type error_anomaly
```

Print AI investigation summaries for a custom time range:

```bash filename="terminal"
vercel alerts --ai --since 2026-03-01T00:00:00.000Z --until 2026-03-02T00:00:00.000Z
```

Export alerts as JSON:

```bash filename="terminal"
vercel alerts --format json
```

## Subcommands

### `inspect`

Show details for a single alert group.

```bash filename="terminal"
vercel alerts inspect <groupId>
```

#### Arguments

| Name | Description |
| --- | --- |
| `groupId` | Required. ID of the alert group to inspect. |

#### Options

| Option | Description |
| --- | --- |
| `--format` | Output format. Supports `json`. |
| `-p, --project` | Project name or ID to filter by, for example `my-app` or `prj_abc123`. Overrides the auto-detected linked project. |
| `-a, --all` | Use team-wide scope. Ignores linked project auto-scoping. |

#### Inspect alert examples

Inspect a group in the linked project:

```bash filename="terminal"
vercel alerts inspect grp_abc123
```

Inspect as JSON:

```bash filename="terminal"
vercel alerts inspect grp_abc123 --format json
```

### `rules`

Use [rule schemas](#rules-schema) to inspect the fields available to your selected team, then create, list, inspect, update, or delete alert rules.

Use `vercel alerts rules --help` to see the rules command tree.

Rule IDs are returned by `rules add` and shown by `rules ls`. Use those IDs with `rules inspect`, `rules update`, and `rules rm`.

| Command | Aliases | Description |
| --- | --- | --- |
| `rules ls` | `list` | List alert rules for a project or team. |
| `rules schema` | None | Show available rule types, request fields, constraints, and examples. |
| `rules add` | `create` | Create an alert rule from a JSON body file. |
| `rules inspect` | `get` | Show one alert rule by ID. |
| `rules rm` | `remove`, `delete` | Delete an alert rule. |
| `rules update` | `patch` | Patch an alert rule or change its project scope. |

#### `rules ls`

List alert rules that affect the linked project. Use `--project` to select another project or `--all` to list every accessible rule in the selected team.

Aliases: `list`.

```bash filename="terminal"
vercel alerts rules ls
```

##### Options

| Option | Description |
| --- | --- |
| `-p, --project` | List rules that affect a project by name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | List every accessible rule in the selected team. |
| `--type` | Filter by rule type. The option is repeatable and accepts comma-separated values. |
| `--format` | Output format. Supports `json`. |

Use `built-in` to list built-in rules. For compatibility with previous CLI versions, `rules ls --type` also accepts supported built-in trigger types such as `usage_anomaly` and `error_anomaly`. Use `vercel alerts rules schema --type built-in` to inspect the trigger types available to your team.

##### List rule examples

```bash filename="terminal"
# List rules for the linked project
vercel alerts rules ls

# List every rule in the selected team
vercel alerts rules ls --all

# JSON output
vercel alerts rules ls --all --format json
```

`rules ls` retrieves every available page before printing results. JSON output contains a `rules` array with the matching rule objects.

#### `rules schema`

Fetch the API-owned authoring schema for the rule types available to the selected team. Run the command without `--type` to list the available types, or select a type to see its create and update fields, constraints, and examples.

```bash filename="terminal"
vercel alerts rules schema
```

##### Options

| Option | Description |
| --- | --- |
| `--type` | Rule type to describe. |
| `--format` | Output format. Supports `json`. |

##### Alert rule schema examples

```bash filename="terminal"
# Show the fields and examples for built-in rules
vercel alerts rules schema --type built-in
```

#### `rules add`

Create an alert rule from a JSON body file. The create body must set `type`. For a built-in rule, set `type` to `built-in`.

Aliases: `create`.

```bash filename="terminal"
vercel alerts rules add --project my-app --body ./rule.json
```

##### Options

| Option | Description |
| --- | --- |
| `--body` | Path to a JSON file containing the new rule. |
| `-p, --project` | Apply a rule to one project. |
| `-a, --all` | Apply a built-in rule to every project in the selected team. |
| `--format` | Output format. Supports `json`. |

##### Create rule body examples

Create a JSON file for the rule body, then select the rule's project scope in one of these ways:

- Add `ruleScope` to the body.
- Pass `--project <name-or-id>`.
- Pass `--all` for a built-in rule.

Do not combine `ruleScope` with `--project` or `--all`. A linked project does not supply the scope automatically when you create a rule.

Create a built-in error anomaly rule for one project:

```json filename="rule.json"
{
  "type": "built-in",
  "name": "Production server errors",
  "triggers": {
    "mode": "selected",
    "items": [
      {
        "type": "error_anomaly",
        "filter": "statusGroup:5xx AND route:/api/*"
      }
    ]
  },
  "matchMinimumSeverityLevel": "high"
}
```

```bash filename="terminal"
vercel alerts rules add --project my-app --body ./rule.json
```

Use `vercel alerts rules schema --type built-in` for additional validated examples, filter syntax, and current constraints.

##### Migrate previous rule bodies

The current command rejects request bodies that contain the previous `alertTypes` field. Rewrite saved bodies using the current schema:

| Previous shape | Current shape |
| --- | --- |
| `alertTypes` | Top-level `type` and, for built-in rules, `triggers` |
| `projectId` expression or raw project ID | `ruleScope`, `--project`, or `--all` |
| `autosubscribeOwnersInKnock` | `notificationSettings.enableTeamOwnerNotifications` |

Built-in filters use the syntax shown by the current schema. For example, an error anomaly filter uses `statusGroup:5xx` instead of the previous OData expression.

#### `rules inspect`

Show one alert rule by ID.

Aliases: `get`.

Rule IDs are unique within a team. Use the global `--scope <team>` option when the rule belongs to a team other than your current team. The `--project` and `--all` options are deprecated for this subcommand and do not narrow the request by project.

```bash filename="terminal"
vercel alerts rules inspect <ruleId>
```

##### Arguments

| Name | Description |
| --- | --- |
| `ruleId` | Required. ID of the rule to inspect. |

##### Options

| Option | Description |
| --- | --- |
| `--format` | Output format. Supports `json`. |

##### Inspect rule examples

```bash filename="terminal"
vercel alerts rules inspect ar_abc123
vercel alerts rules inspect ar_abc123 --format json
```

#### `rules rm`

Delete an alert rule. The selected team's default rule cannot be deleted.

Aliases: `remove`, `delete`.

Rule IDs are unique within a team. Use the global `--scope <team>` option when the rule belongs to a team other than your current team. The `--project` and `--all` options are deprecated for this subcommand and do not narrow the request by project.

```bash filename="terminal"
vercel alerts rules rm <ruleId>
```

##### Arguments

| Name | Description |
| --- | --- |
| `ruleId` | Required. ID of the rule to delete. |

##### Options

| Option | Description |
| --- | --- |
| `--format` | Output format. Supports `json`. |
| `-y, --yes` | Skip the confirmation prompt. |

##### Delete rule examples

```bash filename="terminal"
# Delete with confirmation
vercel alerts rules rm ar_abc123

# Delete without prompt
vercel alerts rules rm ar_abc123 --yes

# Delete by using the delete alias
vercel alerts rules delete ar_abc123 --yes
```

#### `rules update`

Patch an alert rule from a JSON body file, change its project scope, or do both. Omitted body fields remain unchanged, and `type` is optional because the API infers it from the stored rule.

Aliases: `patch`.

```bash filename="terminal"
vercel alerts rules update <ruleId> --body ./patch.json
vercel alerts rules update <ruleId> --project my-app
```

##### Arguments

| Name | Description |
| --- | --- |
| `ruleId` | Required. ID of the rule to update. |

##### Options

| Option | Description |
| --- | --- |
| `--body` | Path to a partial JSON file with fields to update. |
| `-p, --project` | Apply a rule to one project. |
| `-a, --all` | Apply a built-in rule to every project in the selected team. |
| `--format` | Output format. Supports `json`. |

You must provide `--body`, `--project`, or `--all`. Do not combine a `ruleScope` field in the body with `--project` or `--all`.

##### Update rule examples

Save the fields you want to change in a JSON file:

```json filename="patch.json"
{
  "name": "Critical production errors",
  "matchMinimumSeverityLevel": "critical"
}
```

```bash filename="terminal"
# Update fields from a file
vercel alerts rules update ar_abc123 --body ./patch.json

# Patch by using the patch alias
vercel alerts rules patch ar_abc123 --body ./patch.json

# Change scope without a body file
vercel alerts rules update ar_abc123 --project my-app
```

The authoring schema includes restrictions based on the stored rule. For example, the default rule accepts notification updates only.

#### JSON output for rule commands

Use `--format json` for scripting and automation. Rule commands write only JSON to standard output:

| Command | Output shape |
| --- | --- |
| `rules ls` | `{ "rules": [...] }` |
| `rules schema` | `{ "schemaVersion": number, "ruleTypes": [...] }` |
| `rules add`, `rules inspect`, `rules update` | `{ "rule": {...} }` |
| `rules rm` | `{ "ok": true, "ruleId": "ar_...", "deleted": true }` |

Validation failures return an `error` object with `code` and `message`. When the API identifies individual invalid fields, the object also includes an `issues` array with field paths and messages.

## Related resources

- To learn how to configure and receive alerts, see [Alerts](/docs/alerts).
- If you want to automatically investigate alerts with AI, see [Agent Investigation](/docs/agent/investigation).

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel alerts` command:

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
