---
title: vercel list
product: vercel
url: /docs/cli/list
canonical_url: "https://vercel.com/docs/cli/list"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployment-retention
  - /docs/deployments/environments
  - /docs/cli/global-options
summary: Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/list.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "789bc71603b1c63d375a8413274ccf2d12562aa5f0f324305f9f0f0d079af05d"
---

# vercel list

The `vercel list` command provides a list of recent deployments for the currently-linked Vercel Project. When the current directory is not linked to a Vercel Project, the command lists deployments across all projects in the current scope.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel activity](https://vercel.com/docs/cli/activity) — View activity events for your Vercel project or team, filtered by type, date range, and project.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel curl](https://vercel.com/docs/cli/curl) — Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel

Full cross-link map for this page: [/docs/cli/list.graph.md](/docs/cli/list.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel list
```

*Using the \`vercel list\` command to retrieve information
about multiple deployments for the currently-linked Vercel Project.*

## Extended Usage

```bash filename="terminal"
vercel list [project-name]
```

*Using the \`vercel list\` command to retrieve information
about deployments for a specific Vercel Project.*

```bash filename="terminal"
vercel list [project-name] [--status READY,BUILDING]
```

*Using the \`vercel list\` command to retrieve information
about deployments filtered by status.*

```bash filename="terminal"
vercel list [project-name] [--meta foo=bar]
```

*Using the \`vercel list\` command to retrieve information
about deployments filtered by metadata.*

```bash filename="terminal"
vercel list [project-name] [--policy errored=6m]
```

*Using the \`vercel list\` command to retrieve information
about deployments including retention policy.*

## Unique Options

These are options that only apply to the `vercel list` command.

### Meta

The `--meta` option can be used to filter results based on Vercel deployment metadata. Repeat the flag to filter by multiple metadata pairs.

```bash filename="terminal"
vercel list --meta key1=value1 --meta key2=value2
```

*Using the \`vercel list\` command with the
\`--meta\` option. Repeat the flag for each key/value pair.*

A common use case is filtering by the Git commit SHA that created a deployment:

```bash filename="terminal"
vercel list --meta githubCommitSha=de8b89f13b2bc164cf07e735921bf5513e17951d
```

*Find deployments by Git commit SHA using the
\`githubCommitSha\` metadata key.*

> **💡 Note:** To see the meta values for a deployment, use [GET /deployments/{idOrUrl}
> ](https://vercel.com/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url).

### Policy

The `--policy` option can be used to display expiration based on [Vercel project deployment retention policy](/docs/deployment-retention).

```bash filename="terminal"
vercel list --policy canceled=6m --policy errored=6m --policy preview=6m --policy production=6m
```

*Using the \`vercel list\` command with the
\`--policy\` option.*

### Status

The `--status` option can be used to filter deployments by their status.

```bash filename="terminal"
vercel list --status READY
```

*Using the \`vercel list\` command with the
\`--status\` option to filter by a single status.*

You can filter by multiple status values using comma-separated values:

```bash filename="terminal"
vercel list --status READY,BUILDING
```

*Using the \`vercel list\` command to filter by multiple
status values.*

The supported status values are:

- `BUILDING` - Deployments currently being built
- `ERROR` - Deployments that failed during build or runtime
- `INITIALIZING` - Deployments in the initialization phase
- `QUEUED` - Deployments waiting to be built
- `READY` - Successfully deployed and available
- `CANCELED` - Deployments that were canceled before completion
- `BLOCKED` - Deployments that Vercel blocked from building

### Environment

Use the `--environment` option to list the deployments for a specific environment. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel list my-app --environment=staging
```

To list only production deployments, pass `production`:

```bash filename="terminal"
vercel list --environment production
```

*Using the \`vercel list\` command with the
\`--environment\` option to show only production deployments.*

### All

Use the `--all` option to list deployments across all projects in the current scope, even when the current directory is linked to a Vercel Project:

```bash filename="terminal"
vercel list --all
```

*Using the \`vercel list\` command with the
\`--all\` option.*

### Limit

Use the `--limit` option to change how many deployments the command lists. The default is `20` and the maximum is `100`:

```bash filename="terminal"
vercel list --limit 100
```

*Using the \`vercel list\` command with the
\`--limit\` option.*

### Next

The `--next` option enables pagination when listing deployments. When more deployments remain, the output ends with the command for the next page, which passes a cursor to `--next`:

```bash filename="terminal"
vercel list --next 1584722256178
```

*Using the \`vercel list\` command with the
\`--next\` option for pagination.*

### JSON

Use the `--json` option to output the list as JSON, for example to read it in a script:

```bash filename="terminal"
vercel list --json
```

*Using the \`vercel list\` command with the
\`--json\` option.*

When more deployments remain, `pagination.next` in the JSON output has the cursor for [`--next`](#next).

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel list` command:

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
