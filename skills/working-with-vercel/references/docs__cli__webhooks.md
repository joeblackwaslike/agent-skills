---
title: vercel webhooks
product: vercel
url: /docs/cli/webhooks
canonical_url: "https://vercel.com/docs/cli/webhooks"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/webhooks
  - /docs/headers/request-headers
  - /docs/webhooks/webhooks-api
  - /docs/cli/global-options
summary: Learn how to manage webhooks for your Vercel account using the vercel webhooks CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/webhooks.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d0fe21d34e236e0727718efe8c322fdd4c48973713b8f767e6f9fa40ba94022a"
---

# vercel webhooks

> **💡 Note:** The `vercel webhooks` command is currently in beta. Features and behavior may change.

The `vercel webhooks` command is used to manage [webhooks](/docs/webhooks) for your Vercel account, providing functionality to list, inspect, create, and remove webhooks. Webhooks allow you to receive HTTP POST requests when events occur in your Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy-hooks](https://vercel.com/docs/cli/deploy-hooks?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=related) — Manage Deploy Hooks for Git-triggered builds from the Vercel CLI: list, create, and remove deploy hook URLs that trigger
- [vercel api](https://vercel.com/docs/cli/api?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Get a list of webhooks](https://vercel.com/docs/rest-api/webhooks/get-a-list-of-webhooks?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=related) — GET /v1/webhooks — Get a list of webhooks
- [Get a webhook](https://vercel.com/docs/rest-api/webhooks/get-a-webhook?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=related) — GET /v1/webhooks/{id} — Get a webhook
- [vercel crons](https://vercel.com/docs/cli/crons?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=related) — Manage Cron Jobs from the Vercel CLI: add cron entries to your vercel.json, list them, and trigger them on demand.

Full cross-link map for this page: [/docs/cli/webhooks.graph.md](/docs/cli/webhooks.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fwebhooks&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

For more information about webhooks and their supported events, see the [Webhooks documentation](/docs/webhooks).

## Usage

The `vercel webhooks` command supports the following subcommands:

- [`list`](#vercel-webhooks-list) - List all webhooks
- [`get`](#vercel-webhooks-get) - Get details of a specific webhook
- [`create`](#vercel-webhooks-create) - Create a new webhook
- [`rm`](#vercel-webhooks-rm) - Remove a webhook

## vercel webhooks list

The `vercel webhooks list` command lists all webhooks configured for your account.

```bash filename="terminal"
vercel webhooks list
```

*Using the \`vercel webhooks list\` command to list all webhooks.*

You can also use the `ls` alias:

```bash filename="terminal"
vercel webhooks ls
```

*Using the \`vercel webhooks ls\` alias to list all webhooks.*

### JSON output

Use the `--format` option to output the list as JSON:

```bash filename="terminal"
vercel webhooks ls --format json
```

*Using the \`--format json\` option to output webhooks as JSON.*

## vercel webhooks get

The `vercel webhooks get` command displays detailed information about a specific webhook.

```bash filename="terminal"
vercel webhooks get <id>
```

*Using the \`vercel webhooks get\` command to retrieve information about a webhook.*

You can also use the `inspect` alias:

```bash filename="terminal"
vercel webhooks inspect <id>
```

*Using the \`vercel webhooks inspect\` alias to retrieve information about a webhook.*

### JSON output

Use the `--format` option to output the webhook details as JSON:

```bash filename="terminal"
vercel webhooks get <id> --format json
```

*Using the \`--format json\` option to output webhook details as JSON.*

## vercel webhooks create

The `vercel webhooks create` command creates a new webhook for your account.

```bash filename="terminal"
vercel webhooks create <url> --event <event>
```

*Using the \`vercel webhooks create\` command to create a new webhook.*

You can also use the `add` alias:

```bash filename="terminal"
vercel webhooks add <url> --event <event>
```

*Using the \`vercel webhooks add\` alias to create a new webhook.*

### Specifying events

At least one event is required when creating a webhook. Use the `--event` option (shorthand `-e`) to specify which events the webhook should listen for. You can specify multiple events by using the option multiple times:

```bash filename="terminal"
vercel webhooks create https://example.com/webhook --event deployment.created --event deployment.ready
```

*Creating a webhook that listens for deployment created and ready events.*

### Specifying projects

By default, webhooks listen to events from all projects in your account. Use the `--project` option (shorthand `-p`) to limit the webhook to specific projects. You must provide the **project ID** (for example, `prj_abc123`), not the project name. To find a project ID, open the project in the [Vercel dashboard](/dashboard), go to **Settings** → **General**, or run `vercel project ls` in the CLI.

```bash filename="terminal"
vercel webhooks create https://example.com/webhook --event deployment.created --project prj_abc123
```

*Creating a webhook that only listens for events from a specific project.*

You can specify multiple projects:

```bash filename="terminal"
vercel webhooks create https://example.com/webhook --event deployment.created --project prj_abc123 --project prj_def456
```

*Creating a webhook that listens for events from multiple projects.*

> **💡 Note:** When a webhook is created, a secret is displayed. Save this secret because it
> will not be shown again. You can use this secret to verify webhook signatures
> using the [x-vercel-signature](/docs/headers/request-headers#x-vercel-signature) header.

## vercel webhooks rm

The `vercel webhooks rm` command removes a webhook from your account.

```bash filename="terminal"
vercel webhooks rm <id>
```

*Using the \`vercel webhooks rm\` command to remove a webhook.*

You can also use the `remove` or `delete` aliases:

```bash filename="terminal"
vercel webhooks remove <id>
vercel webhooks delete <id>
```

*Using the \`vercel webhooks remove\` or \`vercel webhooks delete\` aliases to remove a webhook.*

By default, the command prompts for confirmation before removing the webhook. Use the `--yes` option to skip the confirmation:

```bash filename="terminal"
vercel webhooks rm <id> --yes
```

*Using the \`--yes\` option to skip the confirmation prompt.*

## Unique options

These are options that only apply to the `vercel webhooks` command.

### Format

The `--format` option can be used with the `list` and `get` subcommands to output results as JSON. The only supported value is `json`.

```bash filename="terminal"
vercel webhooks ls --format json
```

*Using the \`vercel webhooks ls\` command with the \`--format\` option.*

### Event

The `--event` option (shorthand `-e`) specifies which events the webhook should listen for when using the `create` subcommand. This option can be used multiple times to subscribe to multiple events.

```bash filename="terminal"
vercel webhooks create https://example.com/webhook --event deployment.created
```

*Using the \`vercel webhooks create\` command with the \`--event\` option.*

See the [supported event types](/docs/webhooks/webhooks-api#supported-event-types) for a complete list of available events.

### Project

The `--project` option (shorthand `-p`) limits the webhook to specific projects when using the `create` subcommand. Provide the project ID (for example, `prj_abc123`). You can find it in the project's **Settings** → **General** in the [dashboard](/dashboard), or by running `vercel project ls`. This option can be used multiple times to include multiple projects.

```bash filename="terminal"
vercel webhooks create https://example.com/webhook --event deployment.created --project prj_abc123
```

*Using the \`vercel webhooks create\` command with the \`--project\` option.*

### Yes

The `--yes` option can be used with the `rm` subcommand to skip the confirmation prompt when removing a webhook.

```bash filename="terminal"
vercel webhooks rm <id> --yes
```

*Using the \`vercel webhooks rm\` command with the \`--yes\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel webhooks` command:

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

- [Setting up webhooks](/docs/webhooks)
- [Webhooks API reference](/docs/webhooks/webhooks-api)


---

[View full sitemap](/docs/sitemap)
