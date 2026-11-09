---
title: vercel schedules
product: vercel
url: /docs/cli/schedules
canonical_url: "https://vercel.com/docs/cli/schedules"
last_updated: 2026-09-22
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/schedules
  - /docs/schedules/concepts
  - /docs/schedules/local-development
  - /docs/schedules/configuration
  - /docs/schedules/manage
summary: Inspect and manage schedules in production, a custom environment, a Preview branch, CLI deployments by a user, or a local development session with...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/schedules.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "598c1058ae1e56ed476f6da693f41f09d4179ed6b91013854a565f1d17f131d6"
---

# vercel schedules

> **💡 Note:** The `vercel schedules` command is currently in beta. Subcommands and options
> may change before general availability.

The `vercel schedules` command manages [Vercel Schedules](/docs/schedules) for your linked project. Use it to inspect, enable, disable, and run any schedule, and to create, update, and delete dynamic schedules that target a queue topic.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing Vercel Schedules](https://vercel.com/blog/introducing-vercel-schedules)
- [Vercel Schedules is now in public beta](https://vercel.com/changelog/vercel-schedules-is-now-in-public-beta)
- [Vercel Schedules: API Reference](https://vercel.com/docs/schedules/http-api) — Reference for the Vercel Schedules HTTP API: authenticate, choose an environment, and create, list, update, enable, disa
- [vercel crons](https://vercel.com/docs/cli/crons) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.
- [Handling Scheduled Runs](https://vercel.com/docs/schedules/handle-runs) — Write the private function, route, or queue consumer that a schedule runs, and make it safe to run more than once.
- [Migrating from Cron Jobs to Schedules](https://vercel.com/docs/schedules/migrate-from-cron-jobs) — Move Cron Jobs in vercel.json to Schedules without changing your route code, then optionally make the route private.
- [Schedules Limits](https://vercel.com/docs/schedules/limits) — Limits for Vercel Schedules, including schedules per team, run frequency, jitter, Hobby usage, and API requests.

Full cross-link map for this page: [/docs/cli/schedules.graph.md](/docs/cli/schedules.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** Commands manage production schedules by default. To choose another
> environment, pass `--environment`, `--git-branch`, or `--user`. See [Choose
> an environment](#choose-an-environment).

## Usage

```bash filename="terminal"
vercel schedules [subcommand]
```

*Use a subcommand to manage schedules for the current project.*

## Commands

| Command | Description |
| --- | --- |
| `list` | List schedules in a namespace |
| `inspect <name>` | Show a schedule |
| `create <name>` | Create a dynamic schedule |
| `update <name>` | Update a dynamic schedule |
| `executions list <name>` | List execution history for a schedule |
| `enable <name>` | Enable a schedule |
| `disable <name>` | Disable a schedule |
| `invoke <name>` | Invoke a schedule immediately |
| `delete <name>` | Delete a schedule |

You can list, inspect, enable, disable, and invoke static or dynamic schedules. You can only update and delete dynamic schedules. To change or remove a static schedule, edit your project configuration and redeploy.

`get` remains a supported alias for `inspect`, but prints a deprecation warning. Use `inspect` for new commands.

Subcommands support these shared options:

| Option | Description |
| --- | --- |
| `--namespace <NAMESPACE>` | Schedule namespace. Defaults to `default`. |
| `-e, --environment <ENVIRONMENT>` | Use production or a custom environment by name or ID. Defaults to production. |
| `--git-branch <BRANCH>` | Use the schedules of a Preview branch. |
| `--user <USER>` | Use the schedules of CLI deployments by a Vercel user ID. Combine with `--git-branch` for CLI deployments associated with a branch. |
| `--json` | Output as JSON. |
| `--local` | Use the running `vercel dev` session. See [Manage schedules locally](#manage-schedules-locally) for supported commands. |

## Choose an environment

Vercel keeps [separate schedules](/docs/schedules/concepts#environments) for production, each custom environment, each Preview branch, and CLI deployments by each user. Commands use production unless you choose otherwise:

```bash filename="terminal"
vercel schedules list --environment staging
vercel schedules enable cleanup --git-branch feature-x --for 2h
vercel schedules executions list cleanup --git-branch feature-x
vercel schedules list --user user_123
vercel schedules list --user user_123 --git-branch feature-x
```

*Manage schedules in the \`staging\` custom environment, on the \`feature-x\`
Preview branch, and for CLI deployments by \`user\_123\`.*

- `--environment` accepts `production` or the name or ID of a custom environment. Passing `production` selects the same schedules as omitting the option.
- `--git-branch` by itself accepts a branch in your project's linked Git repository.
- `--user` accepts a Vercel user ID and selects that user's CLI deployments. Combine it with `--git-branch` when those deployments include Git branch metadata.
- You can't combine `--environment` with `--git-branch` or `--user`. You can't use any of these options with `--local`.

Every subcommand accepts these options, including `create`, `update`, and `delete` for dynamic schedules. When a command prints a follow-up command, such as the command for the next page of results, it keeps the same non-production environment option.

## Manage schedules locally

Start [`vercel dev`](/docs/schedules/local-development), then pass `--local` to a management subcommand. This option targets the running Schedules session for the current project directory. Local commands require no cloud login or project link. Use `--cwd` to select another project directory.

The command rejects stale or ambiguous sessions and never falls back to cloud requests. You can't combine `--local` with `--scope` or `--token`.

```bash filename="terminal"
vercel schedules list --local
vercel schedules inspect daily-cleanup --local
```

*Manage schedules in the running local development session.*

`executions list` rejects `--local`. Read the `vercel dev` output for local executions.

## Create a schedule

Create a recurring schedule with `--cron` or a one-time schedule with `--at`. You must also provide a queue topic:

```bash filename="terminal"
vercel schedules create daily-cleanup --cron "0 2 * * *" --topic scheduled-cleanup
vercel schedules create send-reminder --at 2027-09-17T10:00 --timezone America/New_York --topic reminders
```

*Create recurring and one-time schedules in the default namespace.*

The `create` subcommand supports these options:

| Option | Description |
| --- | --- |
| `--cron <EXPRESSION>` | Cron expression for a recurring schedule. Can't be combined with `--at`. |
| `--at <DATETIME>` | Local date and time in `YYYY-MM-DDTHH:mm` or `YYYY-MM-DDTHH:mm:00` format. Omitted seconds are stored as `:00`. Can't be combined with `--cron`. |
| `--timezone <TIMEZONE>` | IANA timezone used to evaluate the expression. Defaults to UTC. |
| `--jitter <MINUTES>` | Jitter window from 1 through 15 minutes. |
| `--topic <TOPIC>` | Required queue topic to target. |
| `--payload <JSON>` | JSON payload, up to 16 KB, included in each queue message. With `--local`, the limit is 8 KB. |

The shortest interval between cron firings must be at least as long as the jitter window. On Hobby, omit `--jitter` or set it to `15`. Other values are rejected, and cron schedules can run at most once every 15 minutes.

For the one-time `--at` format, see [One-time expressions](/docs/schedules/configuration#one-time-expressions).

## List and inspect schedules

List schedules in the default namespace, continue from a cursor, or inspect one schedule:

```bash filename="terminal"
vercel schedules list
vercel schedules list --namespace jobs --limit 50
vercel schedules list --next <cursor>
vercel schedules inspect daily-cleanup --json
```

The `list` subcommand supports `--limit <NUMBER>` from 1 through 100, which defaults to 20, and `--next <CURSOR>` for pagination.

## List execution history

List recent executions for a static or dynamic schedule:

```bash filename="terminal"
vercel schedules executions list daily-cleanup
vercel schedules executions list daily-cleanup --execution schx_abc123
vercel schedules executions list daily-cleanup --since 7d --until 1d --json
```

By default, the command lists the last 24 hours in descending order. Select a range of up to 30 days with these options.

| Option | Description |
| --- | --- |
| `-s, --since <TIME>` | Start of the time range. Accepts an ISO 8601 timestamp or a relative duration such as `7d`. When provided alone, the end defaults to now. |
| `-u, --until <TIME>` | End of the time range. Accepts the same formats as `--since` and requires `--since`. |

`--from` and `--to` still accept Unix milliseconds, but print a deprecation warning. Use `--since` and `--until` for new commands.

The `executions list` subcommand also supports `--sort <asc|desc>`, `--limit <NUMBER>`, `--next <CURSOR>`, and `--execution <ID>`, which matches execution IDs that contain the value. `--execution-id` still works as a deprecated alias. JSON output includes function outcomes and metrics for the selected time range. For queue targets, outcomes reflect the function that consumes the scheduled message. An outcome is `unavailable` when Vercel doesn't have a recorded function request.

## Update a dynamic schedule

Pass at least one value to update. The subcommand supports the same expression, timezone, topic, and payload options as `create`:

```bash filename="terminal"
vercel schedules update daily-cleanup --cron "0 3 * * *"
vercel schedules update daily-cleanup --jitter none
vercel schedules update daily-cleanup --payload null
```

For `update`, set `--jitter` to a value from 1 through 15, or use `none` to remove it. On Hobby, only `15` and `none` are accepted, and `none` keeps the effective jitter at 15 minutes. Pass `null` to `--payload` to remove the payload.

You can change an expression only within its existing type. For example, `--cron` can replace another cron expression, but it can't replace a one-time expression. Delete and recreate the schedule to change its expression type.

## Change or invoke a schedule

Enable, disable, or invoke a schedule by name:

```bash filename="terminal"
vercel schedules enable daily-cleanup
vercel schedules enable daily-cleanup --for 2h
vercel schedules enable daily-cleanup --until 2027-10-15T17:00:00Z
vercel schedules disable daily-cleanup
vercel schedules invoke daily-cleanup
```

Use `--for <DURATION>` to enable a schedule for a duration such as `30m` or `5h`. Use `--until <TIME>` to enable it until an ISO 8601 time or Unix timestamp in milliseconds. You can't combine these options.

While the window is open, the schedule is active and has an `activeUntil` timestamp. It becomes inactive automatically when the time passes. Run `enable` again with `--for` or `--until` to replace the end time. Run it without either option to keep the schedule active indefinitely and clear the end time.

If the schedule is already active indefinitely, disable it before enabling it with an end time.

Invoking a schedule runs it immediately without changing its state or cadence.

## Delete a dynamic schedule

Delete a dynamic schedule by name. The command asks for confirmation unless you pass `--yes`. In a non-interactive shell, such as CI, `--yes` is required:

```bash filename="terminal"
vercel schedules delete daily-cleanup
vercel schedules delete daily-cleanup --yes
```

## Related

- [Schedules overview](/docs/schedules)
- [Managing schedules](/docs/schedules/manage)
- [Testing schedules locally](/docs/schedules/local-development)
- [Schedules JS SDK Reference](/docs/schedules/sdk)

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel schedules` command:

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
