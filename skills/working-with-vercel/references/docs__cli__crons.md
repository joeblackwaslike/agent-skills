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
summary: "Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/crons.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9830f6e3495d7fbc950fa5380b755b03b57d9ea8513c804c29bc1a7f0c9a0532"
---

# vercel crons

> **💡 Note:** `vercel crons` is currently in beta. Subcommands and flags may change before
> general availability. In `vercel --help` the command appears tagged with
> `[beta]`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Setup Cron Jobs on Vercel](https://vercel.com/kb/guide/how-to-setup-cron-jobs-on-vercel?from=related) — Learn how to setup and use cron jobs on Vercel
- [Troubleshooting Vercel Cron Jobs](https://vercel.com/kb/guide/troubleshooting-vercel-cron-jobs?from=related) — Learn how to troubleshoot cron jobs that aren't being run or logged when using Vercel Cron Jobs.
- [Getting Started](https://vercel.com/docs/cron-jobs/quickstart?from=related) — Learn how to schedule cron jobs to run at specific times or intervals.
- [vercel vcr](https://vercel.com/docs/cli/vcr?from=related) — Manage Vercel Container Registry from the Vercel CLI: list, inspect, create, and delete repositories, browse tags, and m
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger
- [vercel webhooks](https://vercel.com/docs/cli/webhooks?from=related) — Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.

Full cross-link map for this page: [/docs/cli/crons.graph.md](/docs/cli/crons.graph.md)
<!-- /docsgraph:related -->

The `vercel crons` command (alias `vercel cron`) manages [Cron Jobs](/docs/cron-jobs) for your project. Use it to add cron entries to `vercel.json`, list configured crons, and trigger a cron job to run immediately for testing.

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

### list (ls)

Lists all cron jobs configured for the current project. This is the default subcommand.

```bash filename="terminal"
vercel crons
vercel crons ls
vercel crons ls --format json
```

*List configured cron jobs. Use \`--format json\` for machine-readable output.*

#### Options

| Option | Type | Description |
| --- | --- | --- |
| `-F, --format <FORMAT>` | String | Output format (`json`) |

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

## Examples

### Add a daily cron job

```bash filename="terminal"
vercel crons add --path /api/cron/daily --schedule "0 9 * * *"
```

*Add a job that runs \`/api/cron/daily\` every day at 09:00 UTC.*

### List configured crons as JSON

```bash filename="terminal"
vercel crons ls --format json
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


---

[View full sitemap](/docs/sitemap)
