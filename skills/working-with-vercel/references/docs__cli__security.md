---
title: vercel security
product: vercel
url: /docs/cli/security
canonical_url: "https://vercel.com/docs/cli/security"
last_updated: 2026-08-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/security/security-dashboard
  - /docs/security
  - /docs/rbac/access-roles
  - /docs/cli/global-options
summary: "Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and scope the report to a project."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/security.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "70f62af14ad9549cc01b52cf3c41d8b8759ad4646779574859124f64d4b769ea"
---

# vercel security

The `vercel security` command runs your team's security checks and prints them in your terminal. It surfaces the same checks as your team's [Security Dashboard](/docs/security/security-dashboard), so you can run every check for your team, list the individual findings behind a check, and pipe the raw report into scripts or have an agent address them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Security Dashboard is now generally available](https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related)
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related) — List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related) — List and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
- [vercel comments](https://vercel.com/docs/cli/comments?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=related) — Review and manage Vercel Toolbar comment threads from the terminal with the vercel comments CLI command.

Full cross-link map for this page: [/docs/cli/security.graph.md](/docs/cli/security.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fsecurity&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Security checks run against the current team, so you need a team scope. If no team is selected, run `vercel switch` to choose one before running the command.

## Usage

```bash filename="terminal"
# Run all checks for the current team
vercel security

# List every finding across all checks
vercel security check --findings

# Deep-dive one check and list its findings
vercel security check [check-name]

# Output the raw report as JSON
vercel security check --json
```

*Using the \`vercel security\` command to review the current team's security
posture.*

## Commands

### check

`check` is the default subcommand, so `vercel security` and `vercel security check` are equivalent. Both run every check for the current team and print a summary table. Pass one or more check slugs to run only those checks and list their findings.

```bash filename="terminal"
vercel security check
vercel security check --findings
vercel security check [check-name]
vercel security check [check-name] [check-name]
```

*Run all checks, or pass one or more check slugs to compute and expand only
those checks.*

The summary table has six columns: `Check`, `Risk`, `Status`, `Violations`, `Muted`, and `Description`. When any check is failing, a footer hint points you to `--findings`.

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--findings` | Boolean | List individual findings under each check, including muted ones. Implied when you pass a check slug |
| `--limit <N>` | Number | Maximum findings returned per check. The default is 100, and the API caps it at 200. Violation counts stay exact even when findings are capped |
| `-p, --project <NAME>` | String | Scope the report to a single project by name or ID |
| `-F, --format <FORMAT>` | String | Output format. The only supported value is `json` |
| `--json` | Boolean | Shorthand for `--format json`. Outputs the raw API response |

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `check` | No | One or more check slugs to run. Only the named checks are computed. Unknown slugs fail immediately with the list of valid slugs |

## Available checks

Each check has a slug, shown as `[check-name]` in the examples above, and a risk level of `high` or `medium`. Pass the slug to `vercel security check` to run just that check.

| Slug | Risk | What it checks |
| --- | --- | --- |
| `members-no-mfa` | high | Team members without multi-factor authentication |
| `members-too-many-owners` | high | Team owners to review |
| `pats-no-expiration` | high | Personal access tokens that never expire |
| `env-vars-creds-instead-of-oidc` | high | Long-lived credentials where OIDC is available |
| `depl-no-git-fork-protection` | high | Projects without Git fork deploy prevention |
| `proj-no-preview-depl-protection` | high | Projects without preview deployment protection |
| `env-vars-non-sensitive` | medium | Environment variables not marked Sensitive |
| `env-vars-non-sensitive-stale` | medium | Environment variables older than 90 days |
| `env-vars-exposed-web-app-fwk` | medium | Environment variables exposed via a web application framework |

## Check status

The `Status` column reports one of the following values for each check. Each value maps to a card state on the [Security Dashboard](/docs/security/security-dashboard):

| Status | Meaning | On the Security Dashboard |
| --- | --- | --- |
| `failing` | The check found one or more violations | A `High` or `Medium` risk badge |
| `passing` | The check found no violations | A blue check-circle |
| `muted` | Every finding for the check is muted | A blue check-circle with a `Check muted` badge when the whole check is muted, or an `N muted` badge when its findings are muted individually |
| `no access` | Your role lacks permission to read the data for this check | A `Data Unavailable` overlay labeled `Insufficient Permissions` |
| `error` | The check could not be computed | A `Data Unavailable` overlay |

## Listing findings

By default, `vercel security check` prints only the summary table. Add `--findings` to expand the individual findings under every check, or pass one or more check slugs to expand just those checks. Muted findings appear dimmed and tagged with `(muted)`.

```bash filename="terminal"
# Expand findings for all checks
vercel security check --findings

# Expand findings for a single check
vercel security check [check-name]
```

When a check has more violations than the number of findings shown, the command prints a `Showing N of M findings` line so you can raise the cap with `--limit`.

## Agent and non-interactive use

In non-interactive environments, `vercel security check` writes the JSON report to stdout automatically, so you don't need to pass `--json`. Every error path emits a structured JSON payload with a machine-readable `reason` and suggested follow-up commands.

The command uses two exit codes:

| Exit code | Meaning |
| --- | --- |
| `0` | The report was produced, including when checks are failing or muted |
| `1` | The command could not run because of an unknown slug, an invalid flag, a missing team scope, or a failed API request |

A failing check still exits `0`, so gate a CI step on the report contents rather than the exit code.

The report lists security findings such as member emails, token names, and project settings. Treat the output as sensitive: it can expose your team's security posture in CI logs or agent context, so don't write it to shared or public logs.

## Examples

### Scope the report to one project

```bash filename="terminal"
vercel security check --project my-app
```

*Run every check against a single project instead of the whole team.*

### Raise the findings limit for one check

```bash filename="terminal"
vercel security check [check-name] --limit 200
```

*List up to 200 findings for a check.*

### Pipe the report to jq

```bash filename="terminal"
vercel security check --json | jq '.report'
```

*Output the raw report as JSON and extract the fields you need.*

## Related

- [Vercel security overview](/docs/security)
- [Vercel security dashboard](/docs/security/security-dashboard)
- [Access roles](/docs/rbac/access-roles)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel security` command:

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
