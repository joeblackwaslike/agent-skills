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
  - /docs/agent/security-review
  - /docs/agent/security-review/usage
  - /docs/security
  - /docs/rbac/access-roles
summary: "Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and triage Security Review..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/security.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "11bb20f746668836ae09026eedd946e980b5e3279c9d8dcf9848360b6b3f9740"
---

# vercel security

The `vercel security` command runs your team's security checks and prints them in your terminal. It surfaces the same checks as your team's [Security Dashboard](/docs/security/security-dashboard), so you can run every check for your team, list the individual findings behind a check, and pipe the raw report into scripts or have an agent address them. Its `vulnerabilities` subcommand lists and triages the vulnerabilities [Security Review](/docs/agent/security-review) reports.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Security Dashboard is now generally available](https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available)
- [Introducing Vercel Security Review](https://vercel.com/blog/vercel-security-review)
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel doctor](https://vercel.com/docs/cli/doctor) — Learn how to check your Vercel CLI setup and fix problems with the vercel doctor CLI command.
- [vercel health](https://vercel.com/docs/cli/health) — Read Vercel platform status, active incidents, scheduled maintenance, and recently resolved incidents from your terminal
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/security.graph.md](/docs/cli/security.graph.md)
<!-- /docsgraph:related -->

Both run against the current team, so you need a team scope. If no team is selected, run `vercel switch` to choose one before running the command.

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

# List open Security Review vulnerabilities
vercel security vulnerabilities
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
| `-n, --limit <N>` | Number | Maximum findings returned per check. The default is 100, and the maximum is 200. A higher value fails the command. Violation counts stay exact even when findings are capped |
| `-p, --project <NAME_OR_ID>` | String | Scope the report to a single project by name or ID |
| `--json` | Boolean | Output the raw report as JSON |

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `check` | No | One or more check slugs to run. Only the named checks are computed. Unknown slugs fail immediately with the list of valid slugs |

### vulnerabilities

`vercel security vulnerabilities` lists and triages the vulnerabilities [Security Review](/docs/agent/security-review) reports, the same ones as your team's **Vulnerabilities** dashboard. `list` is the default subcommand, so `vercel security vulnerabilities` lists them.

```bash filename="terminal"
vercel security vulnerabilities
vercel security vulnerabilities inspect my-app/12
vercel security vulnerabilities dismiss my-app/12 --reason false-positive
vercel security vulnerabilities reopen my-app/12
```

*List vulnerabilities, show one in full, and dismiss or reopen it.*

Each vulnerability has a reference, shown in the `Vulnerability` column: `<project>/<number>` for a vulnerability in a project, or `<owner>/<repo>/<number>` for one in a repository. `inspect`, `dismiss`, and `reopen` take its reference or its vulnerability ID. If Security Review isn't enabled for the team, the command fails and says so. Which vulnerabilities you can see and change depends on your [role](/docs/agent/security-review/usage#roles-and-permissions).

#### `list`

Lists the team's vulnerabilities, Production and most severe first. It shows open vulnerabilities by default, 20 at a time. The table has `Vulnerability`, `Severity`, `Title`, `Environment`, and `Branch` columns, plus `Status` when you list more than one status. When there are more vulnerabilities, the command prints the command for the next page.

| Option | Type | Description |
| --- | --- | --- |
| `-p, --project <NAME_OR_ID>` | String | Only list vulnerabilities in this project |
| `-e, --environment <ENVIRONMENT>` | String | Only list vulnerabilities in this environment |
| `--git-branch <BRANCH>` | String | Only list vulnerabilities on this Git branch |
| `--status <STATUS>` | String | Comma-separated statuses to list: `open`, `closed`, or `dismissed`, or `all`. The default is `open` |
| `--severity <SEVERITY>` | String | Comma-separated severities to list: `critical`, `high`, `medium`, or `low` |
| `-q, --query <TEXT>` | String | Search vulnerability titles, summaries, and descriptions |
| `-n, --limit <NUMBER>` | Number | Number of vulnerabilities to return. The default is 20, and the maximum is 100 |
| `--next <CURSOR>` | String | Show the next page, using the cursor from the previous page |
| `--json` | Boolean | Output the vulnerabilities as JSON, without their descriptions and fixes, with a `pagination.next` cursor |

#### `inspect`

Shows one vulnerability in full: its severity, status, class, environment, branch, where it was found and closed, related vulnerabilities, and a link to it in the dashboard, followed by its summary, description, and fix. Pass `--json` to output the whole vulnerability as JSON.

#### `dismiss`

Dismisses a vulnerability as a false positive or an accepted risk. Without `--reason`, the command asks for the reason and an optional message in a terminal, and fails in non-interactive runs or with `--json`.

| Option | Type | Description |
| --- | --- | --- |
| `--reason <REASON>` | String | Why it's dismissed: `false-positive` or `accepted-risk` |
| `--message <TEXT>` | String | A note recorded with the dismissal, up to 500 characters |
| `--json` | Boolean | Output the vulnerability and the outcome as JSON |

Dismissing a vulnerability that's already dismissed changes nothing and exits `0`. With `--json`, the outcome is `unchanged`. If you pass a reason or message that differs from the recorded one, the command fails. To change a dismissed vulnerability's reason or message, reopen it and dismiss it again. Closed vulnerabilities can't be dismissed or reopened.

#### `reopen`

Reopens a dismissed vulnerability, so it's open again. Reopening an open vulnerability changes nothing and exits `0`. Pass `--json` to output the vulnerability and the outcome as JSON.

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
| `muted` | The whole check is muted | A blue check-circle with a `Check muted` badge |
| `no access` | Your role lacks permission to read the data for this check | A `No Access` badge |
| `error` | The check could not be computed | A `Data Unavailable` overlay |

Muting individual findings doesn't change a check's status to `muted`. Muted findings don't count as violations, so the check is `failing` or `passing` based on the rest. The `Muted` column shows how many findings are muted, and the Security Dashboard shows an `N muted` badge.

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

The command uses three exit codes:

| Exit code | Meaning |
| --- | --- |
| `0` | The report was produced, including when checks are failing or muted |
| `1` | The command could not run because of a missing team scope or a failed API request |
| `2` | The command could not run because of an unknown slug or an invalid flag |

A failing check still exits `0`, so gate a CI step on the report contents rather than the exit code.

`vercel security vulnerabilities` outputs JSON only with `--json`. When its output isn't a terminal, `list` prints tab-separated rows instead of a table. With `--json` or in non-interactive runs, errors are JSON with a machine-readable `reason`.

The report lists security findings such as member emails, token names, and project settings. Treat the output as sensitive: it can expose your team's security posture in CI logs or agent context, so don't write it to shared or public logs. Vulnerabilities include source code and how to exploit it, so treat their output the same way.

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

### List critical Production vulnerabilities in one project

```bash filename="terminal"
vercel security vulnerabilities --project my-app --environment production --severity critical
```

*Combine filters to narrow the vulnerability list.*

### Dismiss an accepted risk with a note

```bash filename="terminal"
vercel security vulnerabilities dismiss my-app/12 --reason accepted-risk --message "Internal tool behind SSO"
```

*Record why a vulnerability doesn't need a fix.*

## Related

- [Vercel security overview](/docs/security)
- [Vercel security dashboard](/docs/security/security-dashboard)
- [Security Review](/docs/agent/security-review)
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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
