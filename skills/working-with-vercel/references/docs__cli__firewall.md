---
title: vercel firewall
product: vercel
url: /docs/cli/firewall
canonical_url: "https://vercel.com/docs/cli/firewall"
last_updated: 2026-09-16
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-firewall
  - /docs/observability/observability-plus
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/bot-management
  - /docs/botid
summary: "Learn how to explore firewall traffic and manage your project's custom firewall rules, managed bot rules, IP blocks, system bypass rules, attack..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/firewall.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "3c82fdedb60e0e280ccf185764a46d97e6d7889559e11539353696e9847d6a21"
---

# vercel firewall

The `vercel firewall` command is used to inspect and configure the [Vercel Firewall](/docs/vercel-firewall) from the command line, including traffic, custom rules, managed bot rules, IP blocks, system bypass rules, attack challenge mode, and system mitigations. You can match traffic with [condition parameters](#condition-types) and [actions](#actions), stage updates to rules and IP blocks as drafts, and publish them when you are ready.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related)
- [Protect Sensitive Routes with Vercel WAF: Challenge and Deny Rule Recipes](https://vercel.com/kb/guide/suspicious-traffic-in-specific-countries?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — Use Vercel WAF custom rules to block or challenge unwanted traffic by country, ASN, IP address, user agent, path, or coo
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related)
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [Read Firewall Configuration](https://vercel.com/docs/rest-api/security/read-firewall-configuration?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — GET /v1/security/firewall/config/{configVersion} — Retrieve the specified firewall configuration for a project. The depl
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [Rate Limiting SDK](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how to configure a custom rule with rate limit in your code.
- [vercel flags](https://vercel.com/docs/cli/flags?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=related) — Learn how to manage feature flags for your Vercel project using the vercel flags CLI command.

Full cross-link map for this page: [/docs/cli/firewall.graph.md](/docs/cli/firewall.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Ffirewall&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For more information about Vercel Firewall, see the [Vercel Firewall documentation](/docs/vercel-firewall).

## Usage

The `vercel firewall` command supports the following operations:

- [`overview`](#overview) - Show firewall configuration with the last day of activity
- [`status`](#status) - Show firewall configuration in execution order
- [`traffic`](#traffic) - Explore firewall traffic by action, client, and rule
- [`alerts`](#alerts) - List and inspect firewall alerts
- [`persistent-actions`](#persistent-actions) - List and inspect actions applied to specific clients
- [`rules`](#custom-rules) - Manage custom firewall rules and managed bot rules
- [`bot-management`](#bot-management) - List managed bot rules and unknown bot traffic
- [`ip-blocks`](#ip-blocks) - Manage IP blocks
- [`system-bypass`](#system-bypass) - Manage system bypass rules
- [`attack-mode`](#attack-mode) - Enable or disable Attack Mode
- [`system-mitigations`](#system-mitigations) - Pause or resume automatic DDoS mitigation
- [Staging and publishing](#staging-and-publishing-workflow) - Review, publish, or discard staged changes with `diff`, `publish`, and `discard`

Custom rule, managed bot rule, and IP block changes are staged until you run [`publish`](#publish). System bypass, attack challenge mode, and system mitigations apply immediately.

## Overview

### `overview`

Show your project's firewall configuration together with the last day of activity. The configuration block covers active rules, IP blocks, bypasses, managed rulesets, attack challenge mode status, and unpublished draft changes. Beneath it, the activity window reports traffic by action with a trend for each, the busiest rules resolved to their names, and any alerts raised in the same period.

```bash filename="terminal"
vercel firewall overview
```

*Using the \`vercel firewall overview\` command to show firewall configuration and recent activity.*

Traffic, rule attribution, and alerts are team-scoped. The activity window is the last 24 hours, which every team plan retains, so this command does not need an Observability Plus subscription. See [Traffic](#traffic) for the retention that bounds the other traffic commands. Without a team scope, the command reports the configuration block on its own.

**Options:**

- `--json`: Output as JSON, including the activity period, totals, and the series behind each trend
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

**Examples:**

```bash filename="terminal"
# Show configuration and recent activity
vercel firewall overview

# Report the same data as JSON
vercel firewall overview --json
```

### `status`

Show firewall configuration in the order it is evaluated: bypass, then system mitigations, attack challenge mode, IP blocks, custom rules, and the managed rulesets for Bot Protection, AI Bots, and OWASP.

```bash filename="terminal"
vercel firewall status
```

*Using the \`vercel firewall status\` command to show firewall configuration in execution order.*

Reach for `status` when you need to reason about which check runs first, and [`overview`](#overview) when you also want recent traffic and alerts.

**Options:**

- `--json`: Output as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

## Traffic

Report the requests the firewall acted on. `traffic list` answers what happened across the project. `traffic inspect` takes one value from those lists and shows only its traffic. Both are read-only and need a team scope.

How far back you can read is bounded by your plan's firewall data retention. [Observability Plus](/docs/observability/observability-plus) extends that retention to 30 days.

The CLI allows a query only when `--since` falls inside the data your plan still keeps. Shortening the window with `--until` does not help if `--since` is already too far back.

| Command | What happens |
| --- | --- |
| `vercel firewall traffic list` | Succeeds on every team plan. The default window is the last 24 hours. |
| `vercel firewall traffic list --since 1h` | Succeeds. The window starts inside retention. |
| `vercel firewall traffic list --since 7d` | Fails without Observability Plus. Succeeds with Observability Plus. |
| `vercel firewall traffic list --since 5d --until 4d` | Fails without Observability Plus. The window is one day long, but it starts before retained data. |

Both subcommands describe traffic with the same 10 dimensions: `ip`, `ja4`, `asn`, `user-agent`, `path`, `rule`, `host`, `bot`, `country`, and `action`. Each dimension plays three roles:

- `traffic list` reports it as a top list, which you choose with `--dimension`
- `traffic inspect` takes it as the dimension to inspect, or as `--group-by`
- A flag of the same name narrows either report to matching requests, such as `--ip 1.2.3.4` or `--action deny`

You can combine the narrowing flags with each other and with `--filter`.

`--since` and `--until` both accept a relative offset (`1h`, `24h`, `7d`) or an ISO 8601 date.

### `traffic list`

Aliases: `ls`.

Show requests by firewall action over a window, with a trend and total for each action, followed by a top list per dimension: the busiest client IPs, JA4 TLS fingerprints, autonomous systems, user agents, request paths, rules, hostnames, and verified bots.

```bash filename="terminal"
vercel firewall traffic list
```

*Using the \`vercel firewall traffic list\` command to show requests by firewall action and the top clients behind them.*

The command prints the window, requests by action, then a top list per dimension:

```text filename="stdout"
  Firewall traffic  Sep 6 12:00 – Sep 7 12:00 UTC · 24 points (1h each)

  Requests by Action
  Action   Trend    Total  Peak  Peak at
  Allow    ▁▃▆█▆▃▁  40.0k  2.1k  14:00
  Deny     ▁▃█▆▃▁   2.4k   1.5k  13:00

  Top IPs
  1.2.3.4           1.8k
  5.6.7.8           600

  Rules
  DDoS Mitigation   2.4k

  Verified Bots
  github-hookshot   900

  Break any of these values down further:
  vercel firewall traffic inspect <dimension> <value>
```

The default report also includes top lists for JA4 digests, AS names, user agents, request paths, and hosts.

Each top list is its own query. A dimension your account cannot report marks that list unavailable instead of failing the command. The rule list shows a rule's name where the firewall configuration names it. `--json` keeps the rule id as `value` for [`traffic inspect`](#traffic-inspect).

**Options:**

- `--json`: Output as JSON, including the period, per-action totals and series, and each top list
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--since <time>`: Start of the window. Defaults to 24 hours ago
- `--until <time>`: End of the window. Defaults to now
- `--top <number>`: Rows per top list. Defaults to 5
- `--dimension <dim>`: Top list to include, from the dimensions above. Repeatable, or comma-separated. Defaults to every dimension except `country` and `action`
- `--alert <alert-id>`: Scope the window and rule to one alert from [`alerts list`](#alerts-list)
- `--filter <expr>`: KQL filter expression. Repeatable, ANDed together
- `--ip <ip>`, `--ja4 <digest>`, `--asn <name>`, `--user-agent <ua>`, `--path <path>`, `--rule <rule-id>`, `--host <hostname>`, `--bot <bot>`, `--country <code>`, `--action <action>`: Narrow every top list to requests matching the given dimension value

**Examples:**

```bash filename="terminal"
# Show traffic from the last day
vercel firewall traffic list

# Show the last hour, with the top 20 rows per list
vercel firewall traffic list --since 1h --top 20

# Show which countries and user agents denied traffic came from
vercel firewall traffic list --action deny --dimension country --dimension user-agent

# Scope the report to the period and rule of one alert
vercel firewall traffic list --alert al_abc123
```

### `traffic inspect`

Show one dimension value in detail: its requests by action over the window, and a breakdown of that traffic by a second dimension. Pass one of the dimensions above and one of its values, such as an IP from the `Top IPs` list.

```bash filename="terminal"
vercel firewall traffic inspect <dimension> <value>
```

*Using the \`vercel firewall traffic inspect\` command to show one traffic dimension value in detail.*

The command prints the value, its requests by action, and a breakdown by a second dimension:

```text filename="stdout"
  1.2.3.4  IP Address
  AS Name         EXAMPLE-AS
  AS Number       64500
  Country         DE
  Requests        2.4k

  Requests by Action  Sep 6 12:00 – Sep 6 12:15 UTC · 2 points (15m each)
  Action   Trend  Total  Peak  Peak at
  Deny     ▁█     2.4k   1.5k  12:15

  Breakdown by Request Path  (top 10)
  Request Path  Trend  Total  Peak  Peak at
  /api/login    ▁█     2.0k   1.2k  12:15
  (not set)     █▁     400    400   12:00
```

The breakdown dimension defaults to whichever pairs best with the one being inspected: paths for a client, clients for a path or a rule. Use `--group-by` to choose another, naming any dimension but the one being inspected. Inspecting a rule takes the rule id. [`traffic list`](#traffic-list) shows the rule's name in text output and the id as `value` in `--json`.

**Options:**

- `--json`: Output as JSON, including the period, totals, series, and the breakdown with a series per row
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--since <time>`: Start of the window. Defaults to 24 hours ago
- `--until <time>`: End of the window. Defaults to now
- `--group-by <dim>`: Dimension to break the traffic down by. Defaults to the one that pairs with the inspected dimension
- `--top <number>`: Rows in the breakdown. Defaults to 10
- `--alert <alert-id>`: Scope the window and rule to one alert from [`alerts list`](#alerts-list)
- `--filter <expr>`: KQL filter expression. Repeatable, ANDed together
- `--ip <ip>`, `--ja4 <digest>`, `--asn <name>`, `--user-agent <ua>`, `--path <path>`, `--rule <rule-id>`, `--host <hostname>`, `--bot <bot>`, `--country <code>`, `--action <action>`: Narrow the inspected value further, to requests matching the given dimension value as well

**Examples:**

```bash filename="terminal"
# Inspect one client IP
vercel firewall traffic inspect ip 1.2.3.4

# See which IPs a rule acted on
vercel firewall traffic inspect rule rule_abc123 --group-by ip

# Inspect a path over the last week
vercel firewall traffic inspect path /api/checkout --since 7d

# Narrow one client to what the firewall denied
vercel firewall traffic inspect ip 1.2.3.4 --action deny
```

A value with no traffic in the window returns a not-found error, not an empty report. Otherwise a typo and a quiet client would look the same:

```text filename="stdout"
Error: No firewall traffic for IP Address "9.9.9.9" in this window. Run vercel firewall traffic list to see which values have traffic, or widen the window with `--since`.
```

## Alerts

Firewall alerts record periods when the platform detected and mitigated anomalous traffic, including DDoS mitigation episodes. Alerts are read-only and require a team scope.

### `alerts list`

Aliases: `ls`.

List firewall alerts raised in a window, active ones first. Each row carries the alert's id for use with [`alerts inspect`](#alerts-inspect).

```bash filename="terminal"
vercel firewall alerts list
```

*Using the \`vercel firewall alerts list\` command to list recent firewall alerts.*

**Options:**

- `--json`: Output as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--since <time>`: Start of the window, relative (`24h`, `7d`) or an ISO date. Defaults to 24 hours ago
- `--until <time>`: End of the window. Defaults to now

**Examples:**

```bash filename="terminal"
# List alerts from the last day
vercel firewall alerts list

# List alerts from the last week
vercel firewall alerts list --since 7d
```

### `alerts inspect`

Show one alert in detail: the window it covers, the request rate during it compared with the preceding day, the hosts it affected, and the IPs denied while it was active.

```bash filename="terminal"
vercel firewall alerts inspect <alert-id>
```

*Using the \`vercel firewall alerts inspect\` command to show one alert in detail.*

**Options:**

- `--json`: Output as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

**Examples:**

```bash filename="terminal"
# Inspect an alert by id
vercel firewall alerts inspect al_abc123
```

The chart reaches a day further back than the alert to compare it against. On Pro that lands outside [firewall retention](#traffic), so Pro needs Observability Plus for the traffic and rate figures. Without it, the command reports the alert's own details and notes that the activity window is unavailable.

## Persistent actions

When the firewall keeps applying a decision to a particular client rather than a single request, that decision is a persistent action: a challenge or denial that stays in force against an IP and hostname pair for a period. These are read-only and require a team scope.

### `persistent-actions list`

Aliases: `ls`.

List persistent actions in a window, newest first, with a summary of what is currently in force. Actions still being applied show `Ongoing` in place of an end time, because their recorded end is a projected expiry rather than a time they stopped.

```bash filename="terminal"
vercel firewall persistent-actions list
```

*Using the \`vercel firewall persistent-actions list\` command to list actions applied to specific clients.*

**Options:**

- `--json`: Output as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--since <time>`: Start of the window, relative (`1h`, `6h`) or an ISO date. Defaults to one hour ago
- `--until <time>`: End of the window. Defaults to now
- `--limit <number>`: Number of actions to show. Defaults to 10

**Examples:**

```bash filename="terminal"
# List actions from the last hour
vercel firewall persistent-actions list

# Widen the window and show more rows
vercel firewall persistent-actions list --since 6h --limit 50
```

### `persistent-actions inspect`

Show one persistent action for an IP: its window, the rule kind and mitigation applied, and the traffic from that client broken down by action.

```bash filename="terminal"
vercel firewall persistent-actions inspect <ip>
```

*Using the \`vercel firewall persistent-actions inspect\` command to show one action in detail.*

**Options:**

- `--json`: Output as JSON
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project
- `--host <hostname>`: Narrow to a hostname
- `--action <action>`: Narrow to a mitigation, such as `challenge` or `deny`
- `--since <time>`: Start of the window to search for the action. Defaults to one hour ago
- `--until <time>`: End of the window. Defaults to now
- `--paths`: Include the top request paths

**Examples:**

```bash filename="terminal"
# Inspect the most recent action for an IP
vercel firewall persistent-actions inspect 51.158.168.18

# Pick one of several actions for the same IP
vercel firewall persistent-actions inspect 51.158.168.18 --host vercel.com --action challenge

# Include the paths the client requested
vercel firewall persistent-actions inspect 51.158.168.18 --paths
```

When an IP has more than one matching action, the most recent is shown and the others are noted. Use `--host`, `--action`, `--since`, and `--until` to select a specific one. The chart covers the action's own window, so a recent action charts on any plan. An action older than your [firewall retention](#traffic) needs Observability Plus.

## Custom rules

[Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) let you define traffic policies based on request attributes. Use them to block abusive traffic, rate limit APIs, challenge suspicious requests, redirect legacy paths, or log traffic for monitoring. Rule changes are [staged as drafts and require publishing](#staging-and-publishing-workflow).

### `rules list`

Aliases: `ls`.

List managed bot rules, then custom firewall rules, including any unpublished draft changes. Draft additions, removals, and modifications are annotated in the output. Managed bot rules appear only on a project. `--team-level` lists custom rules alone.

```bash filename="terminal"
vercel firewall rules list
```

*Using the \`vercel firewall rules list\` command to list all rules.*

**Options:**

- `-e, --expand`: Show full condition and action details for each rule
- `--json`: Output as JSON

**Examples:**

```bash filename="terminal"
# List all rules
vercel firewall rules list

# Show full details
vercel firewall rules list --expand
```

### `rules inspect`

Show a custom rule or a managed bot rule. Custom rules include conditions, action, and rate limit settings. Managed bot rules show the current action and IDs.

```bash filename="terminal"
vercel firewall rules inspect <name-or-id>
```

*Using the \`vercel firewall rules inspect\` command to show a rule's full configuration.*

**Options:**

- `--json`: Output as JSON

**Examples:**

```bash filename="terminal"
# Inspect by name
vercel firewall rules inspect "Block bots"

# Inspect by ID
vercel firewall rules inspect rule_abc123

# Inspect a managed bot rule
vercel firewall rules inspect bot-protection
```

### `rules add`

Create a new custom firewall rule. You can create rules using four modes: AI (natural language), interactive wizard, command-line flags, or a JSON payload.

```bash filename="terminal"
vercel firewall rules add [name] [options]
```

*Using the \`vercel firewall rules add\` command to create a new rule.*

> **💡 Note:** The `--ai` and interactive modes require a terminal (TTY). In scripts and CI
> environments, use `--condition` flags or `--json` instead.

**Options:**

- `--ai <PROMPT>`: Generate a rule from natural language (interactive only)
- `--json <PAYLOAD>`: Create a rule from a full JSON payload
- `--condition <JSON>`: Add a condition as a JSON object (repeatable). Multiple conditions are combined with AND
- `--or`: Start a new OR group. Conditions before `--or` are combined with AND, conditions after form a separate group
- `--action <TYPE>`: Action: `deny`, `challenge`, `log`, `bypass`, `rate_limit`, `redirect`
- `--duration <DURATION>`: Action duration: `1m`, `5m`, `15m`, `30m`, `1h`
- `--description <TEXT>`: Rule description (max 256 characters)
- `--disabled`: Create the rule in a disabled state
- `--rate-limit-window <SECONDS>`: Rate limit time window in seconds, 10 to 3,600 (required for `rate_limit`)
- `--rate-limit-requests <NUMBER>`: Max requests per window, 1 to 10,000,000 (required for `rate_limit`)
- `--rate-limit-keys <KEY>`: What to count by: `ip` (default), `ja4`, `header:<name>` (repeatable)
- `--rate-limit-algo <ALGO>`: Algorithm: `fixed_window` (default), `token_bucket`
- `--rate-limit-action <ACTION>`: Action when limit is exceeded: `rate_limit` (default), `deny`, `challenge`, `log`
- `--redirect-url <URL>`: Redirect destination URL or path
- `--redirect-permanent`: Use permanent redirect (301). Default: temporary (307)
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Interactive mode
vercel firewall rules add

# Generate with AI
vercel firewall rules add --ai "Rate limit /api to 100 requests per minute by IP"

# Create with flags
vercel firewall rules add "Block bots" \
  --condition '{"type":"user_agent","op":"sub","value":"crawler"}' \
  --action deny --yes

# Multiple conditions (AND)
vercel firewall rules add "Secure admin" \
  --condition '{"type":"path","op":"pre","value":"/admin"}' \
  --condition '{"type":"geo_country","op":"neq","value":"US"}' \
  --action deny --yes

# OR groups
vercel firewall rules add "Block methods" \
  --condition '{"type":"method","op":"eq","value":"DELETE"}' \
  --or \
  --condition '{"type":"method","op":"eq","value":"PATCH"}' \
  --action challenge --yes

# Rate limit
vercel firewall rules add "Rate limit API" \
  --condition '{"type":"path","op":"pre","value":"/api"}' \
  --action rate_limit \
  --rate-limit-window 60 \
  --rate-limit-requests 100 \
  --rate-limit-keys ip \
  --rate-limit-action deny --yes

# Redirect
vercel firewall rules add "Redirect old path" \
  --condition '{"type":"path","op":"eq","value":"/old"}' \
  --action redirect \
  --redirect-url "/new" \
  --redirect-permanent --yes

# Create from JSON
vercel firewall rules add --json '{"name":"Block bots","conditionGroup":[{"conditions":[{"type":"user_agent","op":"sub","value":"crawler"}]}],"action":{"mitigate":{"action":"deny"}}}' --yes
```

#### Condition format

Each `--condition` flag takes a JSON object with a `type`, `op`, and usually a `value`:

```bash filename="terminal"
# Block POST requests to /api
vercel firewall rules add "Block POST to API" \
  --condition '{"type":"path","op":"pre","value":"/api"}' \
  --condition '{"type":"method","op":"eq","value":"POST"}' \
  --action deny --yes
```

*Two conditions combined with AND: both must match for the rule to apply.*

For `header`, `cookie`, and `query` types, include a `key` field to specify which header, cookie, or query parameter to check. Use `neg: true` to negate a condition:

```bash filename="terminal"
# Challenge requests without an Authorization header
vercel firewall rules add "Require auth" \
  --condition '{"type":"header","op":"ex","key":"Authorization","neg":true}' \
  --action challenge --yes
```

| Field | Required | Description |
| --- | --- | --- |
| `type` | Yes | Condition type (see [condition types](#condition-types)) |
| `op` | Yes | Operator (see [operators](#operators)) |
| `value` | Most operators | Value to compare against. Omit for `ex` and `nex` operators |
| `key` | For `header`, `cookie`, `query` | The header name, cookie name, or query parameter to check |
| `neg` | No | Set to `true` to negate the condition. Default: `false` |

Conditions within a group are combined with AND. Use `--or` between conditions to create separate groups that are combined with OR.

### `rules edit`

Edit an existing custom firewall rule, or change the action on a [managed bot rule](#bot-management). Custom rules accept AI, an interactive editor, command-line flags, or a JSON payload. Managed bot rules accept `--action` only.

```bash filename="terminal"
vercel firewall rules edit <name-or-id> [options]
```

*Using the \`vercel firewall rules edit\` command to modify an existing rule.*

**Options:**

- `--ai <PROMPT>`: Describe changes using natural language (interactive only)
- `--json <PAYLOAD>`: Replace the rule with a full JSON payload
- `--condition <JSON>`: Replace conditions (repeatable, same format as `add`)
- `--or`: Start a new OR group
- `--name <NAME>`: Rename the rule
- `--action <TYPE>`: Change action: `deny`, `challenge`, `log`, `bypass`, `rate_limit`, `redirect`
- `--duration <DURATION>`: Change action duration
- `--description <TEXT>`: Change description (use `""` to clear)
- `--enabled`: Set the rule to enabled (mutually exclusive with `--disabled`)
- `--disabled`: Set the rule to disabled (mutually exclusive with `--enabled`)
- `--rate-limit-window`, `--rate-limit-requests`, `--rate-limit-keys`, `--rate-limit-algo`, `--rate-limit-action`: Rate limit options (same as [`rules add`](#rules-add))
- `--redirect-url`, `--redirect-permanent`: Redirect options (same as [`rules add`](#rules-add))
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Interactive mode
vercel firewall rules edit "My Rule"

# Edit with AI
vercel firewall rules edit "My Rule" --ai "Change action to challenge"

# Change action
vercel firewall rules edit "My Rule" --action challenge --duration 5m --yes

# Rename
vercel firewall rules edit "My Rule" --name "New Name" --yes

# Replace conditions
vercel firewall rules edit "My Rule" \
  --condition '{"type":"path","op":"pre","value":"/new"}' --yes

# Change a managed bot rule action
vercel firewall rules edit ai-bots --action deny --yes
```

### `rules enable`

Enable a disabled custom firewall rule. Stages a draft change that you must publish.

```bash filename="terminal"
vercel firewall rules enable <name-or-id>
```

*Using the \`vercel firewall rules enable\` command to activate a disabled rule.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

### `rules disable`

Disable a custom firewall rule without removing it from your firewall configuration. The rule stops matching requests after you publish the staged changes.

```bash filename="terminal"
vercel firewall rules disable <name-or-id>
```

*Using the \`vercel firewall rules disable\` command to deactivate a rule.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

### `rules remove`

Aliases: `rm`, `delete`.

Remove a custom firewall rule. Stages a draft change that you must publish.

```bash filename="terminal"
vercel firewall rules remove <name-or-id> --yes
```

*Using the \`vercel firewall rules remove\` command to delete a rule.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

### `rules reorder`

Aliases: `move`.

Change the priority order of a custom firewall rule. Rules are evaluated in order from first to last, so position controls which rules match first. Stages a draft change that you must publish.

```bash filename="terminal"
vercel firewall rules reorder <name-or-id> [options]
```

*Using the \`vercel firewall rules reorder\` command to change a rule's priority.*

**Options:**

Pass exactly one of `--position`, `--first`, or `--last`.

- `--position <NUMBER>`: Target position (1-based)
- `--first`: Move to the first position (highest priority)
- `--last`: Move to the last position (lowest priority)
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Move to first position
vercel firewall rules reorder "My Rule" --first --yes

# Move to position 3
vercel firewall rules reorder "My Rule" --position 3 --yes
```

## Bot management

[Bot Protection](/docs/bot-management#bot-protection-managed-ruleset), [AI Bots](/docs/bot-management#ai-bots-managed-ruleset), and [BotID](/docs/botid) are reserved managed rules. They appear at the top of [`rules list`](#rules-list) and in `bot-management`. They are project-only. `--team-level` has no managed bot settings.

Action changes are [staged as drafts and require publishing](#staging-and-publishing-workflow). `rules add`, `remove`, `enable`, `disable`, and `reorder` refuse these slugs. Change the action with [`rules edit --action`](#rules-edit) instead.

### `bot-management`

List the three managed bot rules and the top unknown bot categories over the last 24 hours, matching the Bot Management card in the dashboard.

```bash filename="terminal"
vercel firewall bot-management
```

*Using the \`vercel firewall bot-management\` command to list managed bot rules and unknown bot traffic.*

The command prints the current action for each rule, then unknown bot traffic:

```text filename="stdout"
  Managed

  Name             Action      ID
  Bot Protection   Challenge   bot-protection
  AI Bots          Allow       ai-bots
  BotID            Basic       bot-id

  Unknown Bot Traffic
  ai_scraper          1.2k
  headless_chrome     800

  Next steps:
  Change Bot Protection
  vercel firewall rules edit bot-protection --action log
  Change AI Bots
  vercel firewall rules edit ai-bots --action deny
  Change BotID
  vercel firewall rules edit bot-id --action deep-analysis
  Break unknown bot traffic down further
  vercel firewall traffic inspect unknown-bot <category>
```

Unknown bot traffic is team-scoped and reads request counts rather than the firewall metric, so it needs [Observability Plus](/docs/observability/observability-plus). Without it, the managed rules still print and the unknown-bot panel notes that Observability Plus is required. Without a team scope, the command reports the managed rules on their own.

Drill into a category with `vercel firewall traffic inspect unknown-bot <category>`.

**Options:**

- `--json`: Output as JSON, including `{ managed, unknownBotTraffic }`
- `--project <name-or-id>`: Project name or ID, defaulting to the linked project

**Examples:**

```bash filename="terminal"
# List managed bot rules and unknown bot traffic
vercel firewall bot-management

# Report the same data as JSON
vercel firewall bot-management --json

# Change AI Bots to deny, then publish
vercel firewall rules edit ai-bots --action deny --yes
vercel firewall publish --yes
```

| Rule | ID | Actions |
| --- | --- | --- |
| Bot Protection | `bot-protection` | `off`, `log`, `challenge` |
| AI Bots | `ai-bots` | `allow`, `log`, `challenge`, `deny` |
| BotID | `bot-id` | `basic`, `deep-analysis` |

Inspect also accepts the WAF id that traffic reports, such as `managed_bot_protection`. BotID Deep Analysis is not available on Hobby.

## IP blocks

[IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking) lets you block specific IP addresses or CIDR ranges from accessing your project. Use it for known malicious IPs, abuse sources, or to restrict access to specific networks. IP block changes are [staged as drafts and require publishing](#staging-and-publishing-workflow).

### `ip-blocks list`

Aliases: `ls`.

List all IP blocking rules, including any unpublished draft changes.

```bash filename="terminal"
vercel firewall ip-blocks list
```

*Using the \`vercel firewall ip-blocks list\` command to list all blocked IPs.*

**Options:**

- `--json`: Output as JSON

### `ip-blocks block`

Block an IP address or CIDR range from accessing your project. Stages a draft change that you must publish.

```bash filename="terminal"
vercel firewall ip-blocks block <ip> [options]
```

*Using the \`vercel firewall ip-blocks block\` command to block an IP address.*

**Options:**

- `--hostname <HOST>`: Scope the block to a specific hostname (default: all hosts)
- `--notes <TEXT>`: Add a note to the block rule
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Block an IP
vercel firewall ip-blocks block 1.2.3.4 --yes

# Block a CIDR range with a note
vercel firewall ip-blocks block 10.0.0.0/24 --notes "Abuse range" --yes

# Block scoped to a hostname
vercel firewall ip-blocks block 1.2.3.4 --hostname example.com --yes
```

### `ip-blocks unblock`

Aliases: `rm`. The `rm` alias maps to `unblock`, not to a generic remove command; for example, `vercel firewall ip-blocks rm 1.2.3.4` unblocks that IP.

Remove an IP blocking rule to allow the address to access your project again. Stages a draft change that you must publish.

```bash filename="terminal"
vercel firewall ip-blocks unblock <id-or-ip> [options]
```

*Using the \`vercel firewall ip-blocks unblock\` command to remove an IP block.*

**Options:**

- `--hostname <HOST>`: Narrow the match to a specific hostname (when the same IP is blocked on multiple hosts)
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Unblock by IP
vercel firewall ip-blocks unblock 1.2.3.4 --yes

# Unblock scoped to a hostname
vercel firewall ip-blocks unblock 1.2.3.4 --hostname example.com --yes

# Unblock by rule ID
vercel firewall ip-blocks unblock ip_abc123 --yes
```

## System bypass

[System bypass rules](/docs/vercel-firewall/vercel-waf/system-bypass-rules) ensure that specific IP addresses or CIDR ranges are not blocked by system-level mitigations (such as [automatic DDoS mitigation](/docs/vercel-firewall/ddos-mitigation)). Use them when legitimate traffic from proxies or shared networks is incorrectly flagged. These commands take effect immediately without publishing.

> **💡 Note:** To allow traffic that your own [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) block, use a [custom rule with a bypass action](/docs/vercel-firewall/vercel-waf/managed-rulesets#bypassing-custom-rules) instead. System bypass rules do not replace WAF custom rule logic.Plan limits apply; see [System Bypass Rules limits](/docs/vercel-firewall/vercel-waf/system-bypass-rules#limits).

### `system-bypass list`

Aliases: `ls`.

List all system bypass rules for IPs that skip system-level mitigations.

```bash filename="terminal"
vercel firewall system-bypass list
```

*Using the \`vercel firewall system-bypass list\` command to list all bypass rules.*

**Options:**

- `--json`: Output as JSON

### `system-bypass add`

Add a system bypass rule so a specific IP address or CIDR range is not blocked by system-level mitigations. Takes effect immediately without publishing.

```bash filename="terminal"
vercel firewall system-bypass add <ip> [options]
```

*Using the \`vercel firewall system-bypass add\` command to add a bypass rule.*

**Options:**

- `--domain <DOMAIN>`: Scope the bypass to a specific domain (default: all domains)
- `--notes <TEXT>`: Add a note to the bypass rule
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Bypass for an IP
vercel firewall system-bypass add 10.0.0.1 --yes

# Bypass for a CIDR range
vercel firewall system-bypass add 10.0.0.0/24 --yes

# Bypass scoped to a domain
vercel firewall system-bypass add 10.0.0.1 --domain example.com --yes

# Bypass with wildcard domain
vercel firewall system-bypass add 10.0.0.1 --domain "*.example.com" --yes
```

### `system-bypass remove`

Aliases: `rm`.

Remove a system bypass rule so the IP is no longer exempt from system-level mitigations. Takes effect immediately without publishing.

```bash filename="terminal"
vercel firewall system-bypass remove <ip> [options]
```

*Using the \`vercel firewall system-bypass remove\` command to remove a bypass rule.*

**Options:**

- `--domain <DOMAIN>`: Scope the removal to a specific domain
- `-y, --yes`: Skip the confirmation prompt

## Attack mode

[Attack Mode](/docs/vercel-firewall/attack-mode) adds protection during targeted attacks: visitors must complete a [security challenge](/docs/vercel-firewall/firewall-concepts#challenge) before accessing your site, while [known legitimate bots](/docs/bot-management#verified-bots) (for example search crawlers and many webhook providers) are allowed through without a challenge. These commands take effect immediately without publishing.

### `attack-mode enable`

Enable Attack Mode for your project.

```bash filename="terminal"
vercel firewall attack-mode enable [options]
```

*Using the \`vercel firewall attack-mode enable\` command to challenge browser traffic while known bots are still allowed through.*

**Options:**

- `--duration <DURATION>`: How long to keep attack mode active: `1h` (default), `6h`, or `24h`
- `-y, --yes`: Skip the confirmation prompt

**Examples:**

```bash filename="terminal"
# Enable for 1 hour (default)
vercel firewall attack-mode enable --yes

# Enable for 24 hours
vercel firewall attack-mode enable --duration 24h --yes
```

### `attack-mode disable`

Disable Attack Mode so visitors are no longer challenged at the edge (subject to your custom rules and other firewall layers).

```bash filename="terminal"
vercel firewall attack-mode disable --yes
```

*Using the \`vercel firewall attack-mode disable\` command to turn off Attack Mode.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

## System mitigations

Vercel automatically [mitigates DDoS attacks](/docs/vercel-firewall/ddos-mitigation) and filters malicious traffic. In rare cases, you may need to temporarily pause these protections for debugging, as described in [Bypass System-level Mitigations](/docs/vercel-firewall/ddos-mitigation#bypass-system-level-mitigations). These commands take effect immediately without publishing.

### `system-mitigations pause`

Pause automatic DDoS protection and system-level traffic filtering for 24 hours. Mitigations automatically resume after 24 hours unless you run [`resume`](#system-mitigations-resume) sooner.

> **💡 Note:** Pausing system mitigations removes DDoS protection from your project. Only pause when debugging false positives or during testing. You are responsible for usage fees from traffic that would otherwise have been blocked, including abusive or illegitimate requests.

```bash filename="terminal"
vercel firewall system-mitigations pause --yes
```

*Using the \`vercel firewall system-mitigations pause\` command to temporarily disable DDoS protection.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

### `system-mitigations resume`

Resume automatic DDoS protection and system-level traffic filtering.

```bash filename="terminal"
vercel firewall system-mitigations resume --yes
```

*Using the \`vercel firewall system-mitigations resume\` command to re-enable DDoS protection.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

## Staging and publishing workflow

When you add, edit, or remove custom rules and IP blocks, the CLI stages those updates as drafts first. Drafts do not affect production traffic until you publish them.

```bash filename="terminal"
# Make changes (they are staged automatically)
vercel firewall rules add "Block bots" \
  --condition '{"type":"user_agent","op":"sub","value":"crawler"}' \
  --action deny --yes

# Review staged changes
vercel firewall diff

# Publish to production
vercel firewall publish --yes
```

*Staging a new rule, reviewing changes, and publishing to production.*

To discard staged changes without publishing, run `vercel firewall discard --yes`.

System bypass, Attack Mode, and system mitigations take effect immediately and do not require publishing.

Use these commands to review and publish draft changes:

### `diff`

Review draft changes before publishing to production. Shows what was added, removed, modified, enabled, or disabled, with field-level details for modified rules.

```bash filename="terminal"
vercel firewall diff
```

*Using the \`vercel firewall diff\` command to review unpublished changes.*

**Options:**

- `--json`: Output as JSON

### `publish`

Publish all staged firewall changes to production.

```bash filename="terminal"
vercel firewall publish --yes
```

*Using the \`vercel firewall publish\` command to push staged changes to production.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

### `discard`

Discard all unpublished draft changes, and revert to the current production configuration.

```bash filename="terminal"
vercel firewall discard --yes
```

*Using the \`vercel firewall discard\` command to discard all staged changes.*

**Options:**

- `-y, --yes`: Skip the confirmation prompt

## Custom rules reference

The tables below mirror the [Rule configuration reference](/docs/vercel-firewall/vercel-waf/rule-configuration) for [custom rules](/docs/vercel-firewall/vercel-waf/custom-rules). Use them with the `--condition` and `--action` flags in [`rules add`](#rules-add) and [`rules edit`](#rules-edit).

### Condition types

Each condition specifies a `type`, an `op` (operator), and usually a `value`.

| Type | Description | Needs `key` |
| --- | --- | --- |
| `path` | URL path | No |
| `raw_path` | Pre-rewrite URL path | No |
| `target_path` | Post-rewrite destination path | No |
| `route` | Route pattern (for example, `/blog/[slug]`) | No |
| `server_action` | Next.js Server Action name | No |
| `method` | HTTP method (`GET`, `POST`, etc.) | No |
| `host` | Request hostname | No |
| `protocol` | HTTP protocol version | No |
| `scheme` | `http` or `https` | No |
| `environment` | `preview` or `production` | No |
| `region` | Vercel edge region | No |
| `ip_address` | Client IP or CIDR range | No |
| `user_agent` | User-Agent string | No |
| `geo_country` | Country code (ISO 3166-1 alpha-2) | No |
| `geo_continent` | Continent code (`AF`, `AN`, `AS`, `EU`, `NA`, `OC`, `SA`) | No |
| `geo_country_region` | State or region code | No |
| `geo_city` | City name | No |
| `geo_as_number` | Autonomous System Number | No |
| `header` | HTTP request header | Yes |
| `cookie` | HTTP cookie | Yes |
| `query` | URL query parameter | Yes |
| `ja4_digest` | JA4 TLS fingerprint | No |
| `ja3_digest` | JA3 TLS fingerprint (Enterprise only) | No |
| `rate_limit_api_id` | Rate limit API grouping ID | No |

### Operators

| Operator | Meaning | Value format | Negated form |
| --- | --- | --- | --- |
| `eq` | Equals | String | `neq` or `neg: true` |
| `sub` | Contains | String | `neg: true` |
| `pre` | Starts with | String | `neg: true` |
| `suf` | Ends with | String | `neg: true` |
| `re` | Matches regex | String | `neg: true` |
| `ex` | Exists | None (omit `value`) | `nex` |
| `inc` | Is any of | Array or comma-separated string | `ninc` |
| `gt` | Greater than | Number | `neg: true` |
| `gte` | Greater than or equal | Number | `neg: true` |
| `lt` | Less than | Number | `neg: true` |
| `lte` | Less than or equal | Number | `neg: true` |

### Actions

| Action | Description | Extra options |
| --- | --- | --- |
| `deny` | Block the request with a 403 status | `--duration` |
| `challenge` | Show a verification page | `--duration` |
| `log` | Log the request without blocking | `--duration` |
| `bypass` | Skip remaining custom rules (does not bypass system-level mitigations; use [system bypass](#system-bypass) for that) | `--duration` |
| `rate_limit` | Throttle requests based on a rate limit | `--rate-limit-window`, `--rate-limit-requests`, `--rate-limit-keys`, `--rate-limit-algo`, `--rate-limit-action`, `--duration` |
| `redirect` | Redirect to a URL | `--redirect-url`, `--redirect-permanent` |

The `--duration` option makes the action persistent for the matched client. For example, a `deny` with `--duration 30m` blocks the client for 30 minutes after the first match, rather than evaluating the rule on every request.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel firewall` command:

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

## Related

- [Vercel Firewall overview](/docs/vercel-firewall)
- [Rule configuration reference](/docs/vercel-firewall/vercel-waf/rule-configuration)
- [Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules)
- [Bot Management](/docs/bot-management)
- [BotID](/docs/botid)
- [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)
- [Rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting)
- [System bypass rules](/docs/vercel-firewall/vercel-waf/system-bypass-rules)
- [Attack Mode](/docs/vercel-firewall/attack-mode)
- [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation)


---

[View full sitemap](/docs/sitemap)
