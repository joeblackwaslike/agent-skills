---
title: vercel alerts
product: vercel
url: /docs/cli/alerts
canonical_url: "https://vercel.com/docs/cli/alerts"
last_updated: 2026-06-06
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/alerts
  - /docs/agent/investigation
summary: List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alerts.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "bbc24166337cb113fdfee2d510cff2bf6b9f821cc387c38bec7c95ae0e0360a2"
---

# vercel alerts

The `vercel alerts` command lists recent [alerts](/docs/alerts) for the linked project, a specific project, or an entire team. The `inspect` subcommand shows details for a single alert group, and the `rules` subcommand tree manages alert notification rules from the terminal.

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
vercel alerts --type custom_alert
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

Create, list, update, or delete alert notification rules from the terminal. It mirrors the rules surface in the dashboard's **Alerts** settings.

Use `vercel alerts rules --help` to see the rules command tree.

Rule IDs are returned by `rules add` and shown by `rules ls`. Use those IDs with `rules inspect`, `rules update`, and `rules rm`.

| Command | Aliases | Description |
| --- | --- | --- |
| `rules ls` | `list` | List alert rules for the current scope. |
| `rules add` | `create` | Create an alert rule from a JSON body file. |
| `rules inspect` | `get` | Show one alert rule by ID. |
| `rules rm` | `remove`, `delete` | Delete an alert rule. |
| `rules update` | `patch` | Patch an alert rule from a JSON body file. |

#### `rules ls`

List alert rules for the current scope.

Aliases: `list`.

```bash filename="terminal"
vercel alerts rules ls
```

##### Options

| Option | Description |
| --- | --- |
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. Overrides the linked project. Requires team context. |
| `-a, --all` | Team-wide rules only. Omits the project filter and ignores the linked project. |
| `--type` | Filter by alert rule type. Repeatable and comma-separated, for example `--type custom_alert` or `--type usage_anomaly,error_anomaly`. |
| `--format` | Output format. Supports `json`. |

##### List rule examples

```bash filename="terminal"
# List rules for the linked project
vercel alerts rules ls

# List team-wide rules
vercel alerts rules ls --all

# List rules for a specific project
vercel alerts rules ls --project my-app

# List custom alert rules
vercel alerts rules ls --type custom_alert

# List usage and error anomaly rules
vercel alerts rules ls --type usage_anomaly,error_anomaly

# JSON output
vercel alerts rules ls --format json
```

#### `rules add`

Create an alert rule from a JSON body file. Do not include `id` or `teamId` in the body; the API assigns them.

Aliases: `create`.

```bash filename="terminal"
vercel alerts rules add --body ./rule.json
```

##### Options

| Option | Description |
| --- | --- |
| `--body` | Path to a JSON file containing the new rule. |
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | Team-wide. |
| `--format` | Output format. Supports `json`. |

##### Create rule body examples

Create a JSON file for the rule body, then pass it with `--body`.

In the examples below, replace `team_123` and `prj_123` with your team and project values.

Rule-level filters use OData expressions, as shown in the `projectId` and `filter` fields below.

```json filename="usage-rule.json"
{
  "name": "Production usage anomalies",
  "alertTypes": [{ "type": "usage_anomaly" }],
  "projectId": "projectId in ('prj_123')",
  "sensitivityLevel": 3,
  "autosubscribeOwnersInKnock": true
}
```

```bash filename="terminal"
vercel alerts rules add --body ./usage-rule.json
```

Create a built-in 4xx error anomaly rule by filtering the `error_anomaly` alert type:

```json filename="4xx-error-rule.json"
{
  "name": "Production 4xx error anomalies",
  "alertTypes": [
    {
      "type": "error_anomaly",
      "filter": "statusGroup eq '4xx'"
    }
  ],
  "projectId": "projectId in ('prj_123')",
  "sensitivityLevel": 3
}
```

```bash filename="terminal"
vercel alerts rules add --body ./4xx-error-rule.json
```

Custom alert rules use the raw project ID in `projectId`. The `queryJsonString` value is an escaped JSON string that describes the Observability query.

```json filename="custom-threshold-rule.json"
{
  "name": "Checkout error rate",
  "projectId": "prj_123",
  "alertTypes": [{ "type": "custom_alert" }],
  "customAlert": {
    "queryJsonString": "{\"scope\":{\"type\":\"project\",\"ownerId\":\"team_123\",\"projectIds\":[\"prj_123\"]},\"event\":\"incomingRequest\",\"rollups\":{\"errors\":{\"measure\":\"count\",\"aggregation\":\"sum\",\"filter\":\"httpStatus ge 500\"},\"requests\":{\"measure\":\"count\",\"aggregation\":\"sum\"}},\"granularity\":{\"hours\":1}}",
    "triggerType": "threshold",
    "triggerOperator": "gt",
    "triggerThreshold": 0.05,
    "formula": { "operator": "divide", "left": "errors", "right": "requests" },
    "minThreshold": 20
  }
}
```

```bash filename="terminal"
vercel alerts rules add --body ./custom-threshold-rule.json
```

Create a custom anomaly rule for route-level edge request volume:

```json filename="custom-anomaly-rule.json"
{
  "name": "Edge request volume anomaly",
  "projectId": "prj_123",
  "alertTypes": [{ "type": "custom_alert" }],
  "customAlert": {
    "queryJsonString": "{\"scope\":{\"type\":\"project\",\"ownerId\":\"team_123\",\"projectIds\":[\"prj_123\"]},\"event\":\"incomingRequest\",\"rollups\":{\"requests\":{\"measure\":\"count\",\"aggregation\":\"sum\"}},\"groupBy\":[\"route\"],\"granularity\":{\"minutes\":5}}",
    "triggerType": "anomaly",
    "triggerOperator": "gt",
    "triggerThreshold": 3
  }
}
```

```bash filename="terminal"
vercel alerts rules add --body ./custom-anomaly-rule.json
```

#### `rules inspect`

Show one alert rule by ID.

Aliases: `get`.

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
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | Team-wide. |
| `--format` | Output format. Supports `json`. |

##### Inspect rule examples

```bash filename="terminal"
vercel alerts rules inspect ar_abc123
vercel alerts rules inspect ar_abc123 --format json
```

#### `rules rm`

Delete an alert rule.

Aliases: `remove`, `delete`.

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
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | Team-wide. |
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

Patch an alert rule from a JSON body file. The body is a partial document; only the fields you want to change need to be present.

Aliases: `patch`.

```bash filename="terminal"
vercel alerts rules update <ruleId> --body ./patch.json
```

##### Arguments

| Name | Description |
| --- | --- |
| `ruleId` | Required. ID of the rule to update. |

##### Options

| Option | Description |
| --- | --- |
| `--body` | Path to a JSON file with fields to update. |
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | Team-wide. |
| `--format` | Output format. Supports `json`. |

##### Rename rule examples

Save the fields you want to change in a JSON file:

```json filename="rename-rule.json"
{
  "name": "Production usage anomalies - critical",
  "sensitivityLevel": 4,
  "autosubscribeOwnersInKnock": false
}
```

```bash filename="terminal"
# Patch a rule
vercel alerts rules update ar_abc123 --body ./rename-rule.json

# Patch by using the patch alias
vercel alerts rules patch ar_abc123 --body ./rename-rule.json

# Patch and return JSON
vercel alerts rules update ar_abc123 --body ./rename-rule.json --format json
```

## Related resources

- To learn how to configure and receive alerts, see [Alerts](/docs/alerts).
- If you want to automatically investigate alerts with AI, see [Agent Investigation](/docs/agent/investigation).


---

[View full sitemap](/docs/sitemap)
