---
title: vercel crons
product: vercel
url: /docs/cli/crons
canonical_url: "https://vercel.com/docs/cli/crons"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cron-jobs
  - /docs/cron-jobs/manage-cron-jobs
  - /docs/cli/global-options
summary: "Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/crons.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "36eac0e1359d72153b806b9625c9756e9a563e9e8c4fa328fa6f3d8079e835cd"
---

# vercel crons

Cron Jobs are a legacy feature and will be migrated to


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Cron Jobs](https://vercel.com/blog/cron-jobs)
- [Cron Jobs](https://vercel.com/docs/schedules/cron-jobs) — Learn about cron jobs, how they work, and how to use them on Vercel.
- [Getting started with cron jobs](https://vercel.com/docs/schedules/cron-jobs/quickstart) — Learn how to schedule cron jobs to run at specific times or intervals.
- [vercel schedules](https://vercel.com/docs/cli/schedules) — Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a loca
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel vcr](https://vercel.com/docs/cli/vcr) — Manage Vercel Container Registry from the Vercel CLI: build and push images, manage repositories, tags, and images, and

Full cross-link map for this page: [/docs/cli/crons.graph.md](/docs/cli/crons.graph.md)
<!-- /docsgraph:related -->

Schedules

in the future. Schedules include timezones, private function and queue targets. You can also create schedules at runtime.

Migrate your Cron Jobs to Schedules

.

> **💡 Note:** `vercel crons` is currently in beta. Subcommands and flags may change before
> general availability. In `vercel --help` the command appears tagged with
> `[beta]`.

The `vercel crons` command manages [Cron Jobs](/docs/cron-jobs) for your project. Use it to add cron entries to `vercel.json`, list configured crons, and trigger a cron job to run immediately for testing.

## Usage

```bash filename="terminal"
vercel crons [subcommand]
```

*Using the \`vercel crons\` command to manage cron jobs for the current project.
When called without a subcommand, \`vercel crons\` runs \`list\`.*

## Commands

### add

Adds a cron job to your project's `vercel.json`. When called without flags, the command prompts for the path and schedule.

```bash filename="terminal"
vercel crons add
vercel crons add --path /api/cron --schedule "0 10 * * *"
```

*Add a cron job. Provide \`--path\` and \`--schedule\` to skip the interactive
prompts.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--path <PATH>` | String | API route path for the cron job (must start with `/`) |
| `--schedule <EXPRESSION>` | String | Cron schedule expression (for example, `"0 10 * * *"`) |

### list

Lists all cron jobs configured for the current project. This is the default subcommand.

```bash filename="terminal"
vercel crons
vercel crons list
vercel crons list --json
```

*List configured cron jobs. Use \`--json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `--json` | Boolean | Output as JSON |
| `-p, --project <NAME_OR_ID>` | String | Project name or ID to list cron jobs for (defaults to the linked project) |

### run

Triggers a cron job that is already deployed to production. Useful for testing a cron handler without waiting for the schedule. The command reads cron definitions from your deployed project, not from your local `vercel.json`, so you must `vercel deploy --prod` (or otherwise deploy `vercel.json` with the cron) before `vercel crons run` can find it.

```bash filename="terminal"
vercel crons run /api/cron
```

*Trigger a cron job to run immediately by its API path.*

#### Arguments

| Argument | Required | Description |
| --- | --- | --- |
| `path` | No | API route path of the cron job to trigger (defaults to interactive selection when omitted) |

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-p, --project <NAME_OR_ID>` | String | Name or ID of the project that has the cron job (defaults to the linked project) |

## Examples

### Add a daily cron job

```bash filename="terminal"
vercel crons add --path /api/cron/daily --schedule "0 9 * * *"
```

*Add a job that runs \`/api/cron/daily\` every day at 09:00 UTC.*

### List configured crons as JSON

```bash filename="terminal"
vercel crons list --json
```

*Useful for diffing cron configuration against an external schedule registry.*

### Trigger a cron job manually

```bash filename="terminal"
vercel crons run /api/cron/daily
```

*Trigger the configured handler without waiting for the schedule. Useful for
iterating on cron logic during development.*

## Related

- [Cron Jobs overview](/docs/cron-jobs)
- [Cron Jobs reference](/docs/cron-jobs/manage-cron-jobs)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel crons` command:

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
