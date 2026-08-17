---
title: vercel alerts
product: vercel
url: /docs/cli/alerts
canonical_url: "https://vercel.com/docs/cli/alerts"
last_updated: 2026-07-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/alerts
  - /docs/agent/investigation
summary: List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/alerts.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "5fd94fe5ec78fbe4ff97514b95060eaf67b93cbdb2520131f4599c0b71be617b"
---

# vercel alerts

The `vercel alerts` command lists recent [alerts](/docs/alerts) for the linked project, a specific project, or an entire team. The `inspect` subcommand shows details for a single alert group, and the `rules` subcommand tree manages alert notification rules from the terminal.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Monitor uptime for AI-native apps with Vercel Alerts](https://vercel.com/kb/guide/monitor-uptime-for-ai-native-apps-with-vercel-alerts?from=related) — Learn how to use Vercel Anomaly Alerts as an early-warning system for AI-powered apps, helping you catch 5xx spikes and
- [Configure Alerts](https://vercel.com/docs/alerts/configure-alerts?from=related) — Configure alert rules and notification destinations for Vercel Observability alerts.
- [vercel project](https://vercel.com/docs/cli/project?from=related) — Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, update settings, rename,
- [vercel routes](https://vercel.com/docs/cli/routes?from=related) — Learn how to manage project-level routing rules using the vercel routes CLI command.
- [vercel activity](https://vercel.com/docs/cli/activity?from=related) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related) — Query observability metrics and inspect available metrics, dimensions, and aggregations using the Vercel CLI.

Full cross-link map for this page: [/docs/cli/alerts.graph.md](/docs/cli/alerts.graph.md)
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

Use [rule schemas](#rules-schema), then create, list, update, or delete alert notification rules from the terminal. The command mirrors the rules surface in the dashboard's **Alerts** settings.

Use `vercel alerts rules --help` to see the rules command tree.

Rule IDs are returned by `rules add` and shown by `rules ls`. Use those IDs with `rules inspect`, `rules update`, and `rules rm`.

| Command | Aliases | Description |
| --- | --- | --- |
| `rules ls` | `list` | List alert rules for the current scope. |
| `rules schema` | None | Show supported rule types, fields, and body examples. |
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

#### `rules schema`

Show supported alert rule types. Pass `--type` to see one type's fields, allowed filter values, and body examples.

```bash filename="terminal"
vercel alerts rules schema
```

##### Options

| Option | Description |
| --- | --- |
| `--type` | Rule type to describe. Supports `usage_anomaly`, `error_anomaly`, and `custom_alert`. |
| `--format` | Output format. Supports `json`. |

##### Alert rule schema examples

```bash filename="terminal"
# Show the fields and examples for a built-in usage anomaly rule
vercel alerts rules schema --type usage_anomaly

# Show the fields and examples for a built-in error anomaly rule
vercel alerts rules schema --type error_anomaly

# Show the fields and examples for a custom alert rule
vercel alerts rules schema --type custom_alert

# Return a schema as JSON
vercel alerts rules schema --type custom_alert --format json
```

For custom alerts, run `vercel metrics schema <metric-or-prefix>` to discover metrics, aggregations, and dimensions. Public metric IDs use the `vercel.` namespace. The alert query uses the corresponding event and measure names in `queryJsonString`:

| Public metric | Query event | Query measure |
| --- | --- | --- |
| `vercel.request.count` | `incomingRequest` | `count` |
| `vercel.function_invocation.count` | `serverlessFunctionInvocation` | `count` |
| `vercel.external_api_request.count` | `outgoingRequest` | `count` |
| `vercel.sandbox.cpu_total_time_ms` | `sandboxUsage` | `cpuTotalTimeMs` |

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
| `-p, --project` | Project name or ID. Supplies the project target when the body omits `projectId`. |
| `-a, --all` | Team-wide. |
| `--format` | Output format. Supports `json`. |

##### Create rule body examples

Create a JSON file for the rule body, then pass it with `--body`.

In the examples below, replace `prj_123` with your project ID.

Rule-level filters use OData expressions, as shown in the `projectId` and `filter` fields below.

For built-in rules, pass `--project` or set `projectId` in the body to target a project. The CLI does not infer built-in rule targeting from the linked project.

```json filename="usage-rule.json"
{
  "name": "Production usage anomalies",
  "alertTypes": [{ "type": "usage_anomaly" }],
  "projectId": "projectId in ('prj_123')",
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
  "projectId": "projectId in ('prj_123')"
}
```

```bash filename="terminal"
vercel alerts rules add --body ./4xx-error-rule.json
```

Custom alert rules target one project. Set the raw project ID in `projectId`, pass `--project`, or run the command from a linked project.

The `queryJsonString` value is an escaped JSON string that describes the Observability query. Choose a descriptive name for each `rollups` key. For a ratio, `formula.left` and `formula.right` must reference those exact keys.

```json filename="custom-threshold-rule.json"
{
  "name": "Checkout error rate",
  "alertTypes": [{ "type": "custom_alert" }],
  "customAlert": {
    "queryJsonString": "{\"event\":\"incomingRequest\",\"rollups\":{\"errors\":{\"measure\":\"count\",\"aggregation\":\"sum\",\"filter\":\"httpStatus ge 500\"},\"requests\":{\"measure\":\"count\",\"aggregation\":\"sum\"}},\"granularity\":{\"hours\":1}}",
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
  "alertTypes": [{ "type": "custom_alert" }],
  "customAlert": {
    "queryJsonString": "{\"event\":\"incomingRequest\",\"rollups\":{\"requests\":{\"measure\":\"count\",\"aggregation\":\"sum\"}},\"groupBy\":[\"route\"],\"granularity\":{\"minutes\":5}}",
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

Patch an alert rule from a JSON body file. Omitted fields remain unchanged. Set a supported optional field to `null` to clear it.

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
| `--body` | Path to a partial JSON file with fields to update. |
| `-p, --project` | Project name or ID, for example `my-app` or `prj_abc123`. |
| `-a, --all` | Team-wide. |
| `--format` | Output format. Supports `json`. |

##### Rename rule examples

Save the fields you want to change in a JSON file:

```json filename="rename-rule.json"
{
  "name": "Production usage anomalies - critical",
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
