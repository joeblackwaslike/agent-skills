---
title: vercel page-integrity
product: vercel
url: /docs/cli/page-integrity
canonical_url: "https://vercel.com/docs/cli/page-integrity"
last_updated: 2026-11-18
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/vercel-firewall/page-integrity
  - /docs/vercel-firewall/priority-projects
  - /docs/cli/project
  - /docs/cli/global-options
summary: Turn Page Integrity monitoring on and off, check its status, and review the scripts, headers, and connections your pages load with the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/page-integrity.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0956920f18a6e7622d5e912613c2acf216c11f5e7d52468ada89b53b95511c88"
---

# vercel page-integrity

The `vercel page-integrity` command manages [Page Integrity](/docs/vercel-firewall/page-integrity) for a project from the terminal. Page Integrity records the scripts, security headers, and outgoing connections your pages load, notifies you when they change, and can block new or changed ones until you approve them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel alerts](https://vercel.com/docs/cli/alerts) — List and inspect alerts, and manage alert rules for projects and teams with the Vercel CLI.
- [vercel security](https://vercel.com/docs/cli/security) — Inspect the security posture of your Vercel team from the terminal: run every security check, list findings, and triage
- [vercel ci](https://vercel.com/docs/cli/ci) — Enable or disable Vercel CI for repositories, inspect runs, search logs, and rerun jobs from the command line.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.

Full cross-link map for this page: [/docs/cli/page-integrity.graph.md](/docs/cli/page-integrity.graph.md)
<!-- /docsgraph:related -->

Page Integrity requires a [Priority project](/docs/vercel-firewall/priority-projects). To upgrade a project to Priority from the CLI, run [`vercel project priority enable`](/docs/cli/project#priority).

## Usage

```bash filename="terminal"
# Show Page Integrity status for the linked project
vercel page-integrity

# Start monitoring everything under /checkout
vercel page-integrity enable --path "/checkout/:path*"
```

*Using the \`vercel page-integrity\` command to check status and turn on
monitoring.*

## Subcommands

| Command | Aliases | Description |
| --- | --- | --- |
| `status` | None | Show monitoring, blocking, and what needs review. This is the default subcommand. |
| `enable` | None | Start monitoring paths in report-only mode. |
| `disable` | None | Stop monitoring and turn off blocking. |
| `scripts` | `script` | List and inspect the scripts your pages load. |
| `headers` | `header` | List and inspect the security headers your pages return. |
| `connections` | `connection` | List and inspect the outgoing connections your pages make. |

Every subcommand accepts `-p, --project` to select a project other than the linked one, and `--json` to print machine-readable output.

### `status`

Show whether Page Integrity monitoring and blocking are on for the project, and how many scripts, headers, and connections need review. Running `vercel page-integrity` with no subcommand runs `status`.

```bash filename="terminal"
# Show status for the linked project
vercel page-integrity

# Show status for a specific project as JSON
vercel page-integrity status --project storefront --json
```

### `enable`

Turn on Page Integrity monitoring for the paths you choose. Monitoring starts in report-only mode, so Vercel records and alerts on changes but doesn't block anything. To block unapproved scripts, [enable blocking](/docs/vercel-firewall/page-integrity#enabling-blocking) from the dashboard.

The first time you enable monitoring on a project, pass at least one path:

```bash filename="terminal"
# Monitor everything under /checkout
vercel page-integrity enable --path "/checkout/:path*"

# Monitor exact pages
vercel page-integrity enable --exact /checkout --exact /cart

# Monitor paths that match a regular expression
vercel page-integrity enable --regex '^/(checkout|cart)(/.*)?$'
```

When you turn monitoring off, Vercel keeps the paths. Run `vercel page-integrity enable` without path options to turn monitoring back on for the saved paths. The CLI shows the saved paths and asks you to confirm. Pass `--yes` to skip the prompt. In a script or other non-interactive terminal, `--yes` is required to reuse the saved paths.

`enable` doesn't change the paths of a project that's already monitored. If monitoring is on and you pass different paths, the command fails without changing anything. If the project isn't a Priority project, the command fails and suggests `vercel project priority enable`.

#### Options

| Option | Description |
| --- | --- |
| `--path <PATTERN>` | Path pattern to monitor, such as `/checkout/:path*`. Repeat the option to monitor more paths. |
| `--exact <PATH>` | Exact path to monitor. Repeat the option to monitor more paths. |
| `--regex <REGEX>` | Regular expression for the paths to monitor. Repeat the option to add more expressions. |
| `-y, --yes` | Reuse the saved paths without asking. |
| `-p, --project` | Project name or ID. Defaults to the linked project. |
| `--json` | Print the result as JSON. |

### `disable`

Turn off Page Integrity monitoring for the project. Disabling monitoring also turns off blocking. Vercel keeps the recorded scripts, headers, and connections, their approvals, and the monitored paths, so you can turn monitoring back on later with `vercel page-integrity enable`.

The CLI shows what will change and asks you to confirm. Pass `--yes` to skip the prompt.

```bash filename="terminal"
# Turn off Page Integrity for the linked project
vercel page-integrity disable

# Turn it off for a specific project without a prompt
vercel page-integrity disable --project storefront --yes
```

#### Options

| Option | Description |
| --- | --- |
| `-y, --yes` | Skip the confirmation prompt. |
| `-p, --project` | Project name or ID. Defaults to the linked project. |
| `--json` | Print the result as JSON. |

### `scripts`, `headers`, and `connections`

Each of these subcommands has `list` (alias `ls`) and `inspect`. Use `list` to see what Page Integrity has recorded for the project, and `inspect` to see the details of one entry.

```bash filename="terminal"
# List scripts for the linked project
vercel page-integrity scripts list

# Include auto-approved scripts
vercel page-integrity scripts list --all

# Inspect a script by the URL that list prints
vercel page-integrity scripts inspect https://js.stripe.com/v3/

# Inspect a header by name (case-insensitive)
vercel page-integrity headers inspect content-security-policy

# Inspect a connection
vercel page-integrity connections inspect https://api.example.com/v1/events
```

`scripts list` and `connections list` hide auto-approved entries unless you pass `--all`. For `headers list`, `--limit` counts header groups, and each value and status prints as a separate row.

#### `list` options

| Option | Description |
| --- | --- |
| `-n, --limit` | Number of results per page. Defaults to 20, maximum 100. |
| `--next <CURSOR>` | Show the next page using the cursor from the previous output. |
| `-a, --all` | Include auto-approved entries. Available for `scripts` and `connections`. |
| `-p, --project` | Project name or ID. Defaults to the linked project. |
| `--json` | Print the result as JSON. |

#### `inspect` options

| Option | Description |
| --- | --- |
| `-p, --project` | Project name or ID. Defaults to the linked project. |
| `--json` | Print the result as JSON. |

## Related resources

- To learn how Page Integrity works and how to turn on alerts and blocking, see [Page Integrity](/docs/vercel-firewall/page-integrity).
- To upgrade a project to Priority, see [`vercel project priority`](/docs/cli/project#priority).

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel page-integrity` command:

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

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
