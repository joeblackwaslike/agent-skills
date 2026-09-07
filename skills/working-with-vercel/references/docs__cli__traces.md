---
title: vercel traces
product: vercel
url: /docs/cli/traces
canonical_url: "https://vercel.com/docs/cli/traces"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/tracing/always-on-tracing
  - /docs/tracing
  - /docs/cli/global-options
summary: Inspect a request trace in the terminal, open it in the Vercel Dashboard, or manage the trace sampling rules for a project.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/traces.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "c7a2bead47c665313796ccd160f7e84b09574723a54e1431f0ddb6e3fbabc25a"
---

# vercel traces

The `vercel traces` command helps you inspect request traces for a linked project or a specific project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel logs](https://vercel.com/docs/cli/logs?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=related) — View and filter request logs for your Vercel project, or stream live runtime logs from a deployment.
- [vercel alerts](https://vercel.com/docs/cli/alerts?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=related) — List recent alerts for a linked project, a specific project, or an entire team with the Vercel CLI.
- [vercel metrics](https://vercel.com/docs/cli/metrics?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=related) — List and query observability metrics, and inspect available dimensions and aggregations using the Vercel CLI.
- [vercel routes](https://vercel.com/docs/cli/routes?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=related) — Learn how to manage project-level routing rules using the vercel routes CLI command.
- [vercel activity](https://vercel.com/docs/cli/activity?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=related) — View activity events for your Vercel project or team, filtered by type, date range, and project.

Full cross-link map for this page: [/docs/cli/traces.graph.md](/docs/cli/traces.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Ftraces&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Use `vercel traces get <request-id>` to inspect a request trace, and `vercel traces config` to manage which requests Vercel traces.

## Usage

```bash filename="terminal"
# Get a specific trace
vercel traces get req_1234567890

# `get` is the default subcommand
vercel traces req_1234567890

# Open a trace in the Vercel Dashboard
vercel traces get req_1234567890 --open

# List the trace sampling rules for the linked project
vercel traces config ls
```

*Using the \`vercel traces\` command to inspect request traces.*

## Subcommands

The `get` subcommand returns details for a single trace by request ID.

```bash filename="terminal"
vercel traces get req_1234567890
vercel traces get req_1234567890 --json
```

The `config` subcommand group reads and writes the sampling rules that decide which requests Vercel traces. See [Manage trace sampling rules](#manage-trace-sampling-rules).

```bash filename="terminal"
vercel traces config ls
```

## Unique options

These options apply to `vercel traces get`.

### Project

The `--project` option specifies the project name or ID.

```bash filename="terminal"
vercel traces get req_1234567890 --project my-app
```

### JSON

The `--json` option returns machine-readable output.

```bash filename="terminal"
vercel traces get req_1234567890 --json
```

### Open

The `--open` option opens the trace in the Vercel Dashboard instead of printing the trace in the terminal.

```bash filename="terminal"
vercel traces get req_1234567890 --open
```

`--open` cannot be combined with `--json`.

### View

Use `--view` with `--open` to set the initial Dashboard view. Supported values are `timeline`, `tree`, and `waterfall`.

```bash filename="terminal"
vercel traces get req_1234567890 --open --view=tree
vercel traces get req_1234567890 --open --view=waterfall
```

`--view` requires `--open`.

## Examples

Fetch a trace from a specific team and project:

```bash filename="terminal"
vercel traces get req_1234567890 --scope my-team --project my-app
```

Open a trace in the dashboard tree view:

```bash filename="terminal"
vercel traces get req_1234567890 --open --view=tree
```

Get JSON output for automation:

```bash filename="terminal"
vercel traces get req_1234567890 --json
```

## Manage trace sampling rules

Sampling rules decide which requests [always-on tracing](/docs/tracing/always-on-tracing) collects a trace for. Each rule pairs an environment and an optional path prefix with a rate, and a project holds at most 10 rules.

The `vercel traces config` subcommands read and write those rules for the linked project, or for the project you name with `--project`. Changing rules requires a role with project update access. Running `vercel traces config` with no subcommand prints help.

| Subcommand                                       | Description                                       |
| ------------------------------------------------ | ------------------------------------------------- |
| [`ls`](#list-the-sampling-rules-for-a-project)   | List every rule on the project                    |
| [`set`](#add-or-replace-a-sampling-rule)         | Add a rule, or change the rate of an existing one  |
| [`rm`](#remove-sampling-rules)                   | Remove one rule, or every rule for an environment  |

`ls` also accepts `list`, and `rm` also accepts `remove` and `delete`.

### How the CLI describes a sampling rule

| Part          | Values                            | Meaning                                                                                      |
| ------------- | --------------------------------- | -------------------------------------------------------------------------------------------- |
| `environment` | `any`, `preview`, or `production` | `any` matches requests in every environment                                                  |
| `rate`        | A whole number from 1 to 100      | The percentage of matching requests to trace                                                 |
| `requestPath` | A path prefix, such as `/api`     | Optional. A rule without one matches every path, and `ls` labels it `(all paths)`             |

Two details differ from the dashboard:

- The dashboard **Rate** field accepts 0, but the CLI accepts whole percentages from 1 to 100 and rejects both `0` and fractions such as `2.5`. To add a 0% rule that matches requests and collects nothing, use the dashboard.
- The dashboard calls a rule that covers every environment **All Environments**. On the command line, that environment is `any`.

Vercel evaluates rules in the order `ls` prints them and applies the first rule that matches a request. Because `set` adds a new rule to the bottom of that list, a broad rule you added earlier still wins over a narrower rule you add later. The CLI cannot reorder rules, so to change the order, remove the rules with `rm` and add them back in the order you want. To learn how overlapping rules are resolved, see [Sampling](/docs/tracing#sampling).

### List the sampling rules for a project

```bash filename="terminal"
vercel traces config ls
```

The command prints one row per rule, along with the count against the 10-rule limit:

```text filename="stdout"
> Trace sampling rules for my-app (3 of 10 rules)

  environment  path         rate
  any          (all paths)  1%
  preview      /api         100%
  production   /api         25%
```

A project with no rules collects no traces. In that case, `ls` says so, names the command that adds a rule, and exits successfully.

| Option      | Description                                          |
| ----------- | ---------------------------------------------------- |
| `--json`    | Print the rules as JSON                              |
| `--project` | Project name or ID (defaults to the linked project)  |

### Add or replace a sampling rule

```bash filename="terminal"
vercel traces config set <environment> <rate> [requestPath]
```

A rule is identified by its environment and path prefix together. Running `set` again with the same pair changes that rule's rate instead of adding a second rule, so changing a rate takes one command. Because the pair includes the environment, `any /api` and `production /api` are two separate rules.

`set` never prompts. Its success message prints the rate the rule held before, so you can put the old value back with one more `set`:

```text filename="stdout"
> Success! Set production /api to 75% (was 10%). 3 of 10 rules.
```

Set a rate for every path in an environment by leaving the path prefix off:

```bash filename="terminal"
# Trace a quarter of production traffic
vercel traces config set production 25

# Trace every preview request to one path prefix
vercel traces config set preview 100 /api

# Trace 1% of traffic in every environment
vercel traces config set any 1
```

When the project already holds 10 rules, `set` refuses the write before it changes anything and names the command that removes a rule.

| Option      | Description                                          |
| ----------- | ---------------------------------------------------- |
| `--json`    | Print the new rule as JSON                           |
| `--project` | Project name or ID (defaults to the linked project)  |

### Remove sampling rules

```bash filename="terminal"
vercel traces config rm <environment> [requestPath]
```

The path prefix decides how many rules the command removes:

| Command                                        | Removes                                              |
| ---------------------------------------------- | ---------------------------------------------------- |
| `vercel traces config rm production /api`      | The one production rule with the `/api` prefix        |
| `vercel traces config rm production --default` | Only the production rule that covers all paths        |
| `vercel traces config rm production`           | Every production rule                                 |

Combining `--default` with a path prefix is an error, because the two select different rules.

`rm any` removes the rules that match every environment, not every rule on the project. To clear a project and turn always-on tracing off, run `rm` once for each of `any`, `preview`, and `production`.

`rm` always asks you to confirm. One command can remove up to 10 rules, and nothing records what those rules held afterwards, so the command lists every rule it matched with its path and rate before it asks:

```text filename="stdout"
> The following 2 rules will be removed from my-app:
  production (all paths) 25%
  production /api 75%
? Remove 2 trace sampling rules? (y/N)
```

No option skips that prompt. A session that cannot show one, such as a CI job or a coding agent, fails without changing the project and prints the command to run in a terminal instead.

When nothing matches the environment and path prefix you passed, `rm` reports that no rule matched and leaves the project unchanged.

| Option      | Description                                                             |
| ----------- | ----------------------------------------------------------------------- |
| `--default` | Remove only the rule that has no path prefix, keeping the per-path rules |
| `--json`    | Print the removed rules as JSON                                          |
| `--project` | Project name or ID (defaults to the linked project)                      |

### JSON output for sampling rules

With `--json`, each subcommand prints only the rules it read or changed, so you can pipe the output into another tool:

```bash filename="terminal"
vercel traces config ls --json
```

```json filename="stdout"
[
  {
    "environment": "production",
    "requestPath": "/api",
    "sampleRate": 25
  }
]
```

Each field maps onto a `set` argument, so a rule from `ls --json` can go straight back in:

```bash filename="terminal"
vercel traces config set production 25 /api
```

With [`--non-interactive`](/docs/cli/global-options#non-interactive), the subcommands print JSON whether or not you pass `--json`, and the object carries the project, a status, a message, and the commands to run next.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel traces` command:

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
