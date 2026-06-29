---
title: vercel firewall
product: vercel
url: /docs/cli/firewall
canonical_url: "https://vercel.com/docs/cli/firewall"
last_updated: 2026-06-04
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-firewall
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/ip-blocking
  - /docs/vercel-firewall/vercel-waf/system-bypass-rules
  - /docs/vercel-firewall/ddos-mitigation
summary: "Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and system mitigations using the..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/firewall.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "1ba64efece9c7ab3353919cdfffd63190daca2c5b83353b1bd945297560b1714"
---

# vercel firewall

The `vercel firewall` command is used to configure the [Vercel Firewall](/docs/vercel-firewall) from the command line, including custom rules, IP blocks, system bypass rules, attack challenge mode, and system mitigations. You can match traffic with [condition parameters](#condition-types) and [actions](#actions), stage updates to rules and IP blocks as drafts, and publish them when you are ready.

For more information about Vercel Firewall, see the [Vercel Firewall documentation](/docs/vercel-firewall).

## Usage

The `vercel firewall` command supports the following operations:

- [`overview`](#overview) - Show a summary of your project's firewall configuration
- [`rules`](#custom-rules) - Manage custom firewall rules
- [`ip-blocks`](#ip-blocks) - Manage IP blocks
- [`system-bypass`](#system-bypass) - Manage system bypass rules
- [`attack-mode`](#attack-mode) - Enable or disable Attack Mode
- [`system-mitigations`](#system-mitigations) - Pause or resume automatic DDoS mitigation
- [Staging and publishing](#staging-and-publishing-workflow) - Review, publish, or discard staged changes with `diff`, `publish`, and `discard`

Custom rule and IP block changes are staged until you run [`publish`](#publish). System bypass, attack challenge mode, and system mitigations apply immediately.

## Overview

### `overview`

Show a summary of your project's firewall configuration, including active rules, IP blocks, bypasses, attack challenge mode status, and unpublished draft changes.

```bash filename="terminal"
vercel firewall overview
```

*Using the \`vercel firewall overview\` command to show a summary of your project's firewall configuration.*

**Options:**

- `--json`: Output as JSON

## Custom rules

[Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules) let you define traffic policies based on request attributes. Use them to block abusive traffic, rate limit APIs, challenge suspicious requests, redirect legacy paths, or log traffic for monitoring. Rule changes are [staged as drafts and require publishing](#staging-and-publishing-workflow).

### `rules list`

Aliases: `ls`.

List all custom firewall rules, including any unpublished draft changes. Draft additions, removals, and modifications are annotated in the output.

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

Show the full configuration of a custom firewall rule, including conditions, action, and rate limit settings.

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

Edit an existing custom firewall rule. You can edit using AI, an interactive editor, command-line flags, or a JSON payload.

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

> **⚠️ Warning:** Pausing system mitigations removes DDoS protection from your project. Only pause when debugging false positives or during testing. You are responsible for usage fees from traffic that would otherwise have been blocked, including abusive or illegitimate requests.

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
| `bot_name` | Verified bot name (Security Plus only) | No |
| `bot_category` | Verified bot category (Security Plus only) | No |

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

## Related

- [Vercel Firewall overview](/docs/vercel-firewall)
- [Rule configuration reference](/docs/vercel-firewall/vercel-waf/rule-configuration)
- [Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules)
- [IP blocking](/docs/vercel-firewall/vercel-waf/ip-blocking)
- [Rate limiting](/docs/vercel-firewall/vercel-waf/rate-limiting)
- [System bypass rules](/docs/vercel-firewall/vercel-waf/system-bypass-rules)
- [Attack Mode](/docs/vercel-firewall/attack-mode)
- [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation)


---

[View full sitemap](/docs/sitemap)
