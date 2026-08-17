---
title: vercel list
product: vercel
url: /docs/cli/list
canonical_url: "https://vercel.com/docs/cli/list"
last_updated: 2026-05-28
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployment-retention
  - /docs/deployments/environments
summary: Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/list.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d6cccc11001cca3cf7e0272bd8671663017d9f825514a42bf4f40d59f2dee09c"
---

# vercel list

The `vercel list` command, which can be shortened to `vercel ls`, provides a list of recent deployments for the currently-linked Vercel Project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [vercel api](https://vercel.com/docs/cli/api?from=related) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [Deploying from CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel activity](https://vercel.com/docs/cli/activity?from=related) — View activity events for your Vercel project or team, filtered by type, date range, and project.

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

The `--meta` option, shorthand `-m`, can be used to filter results based on Vercel deployment metadata. Repeat the flag to filter by multiple metadata pairs.

```bash filename="terminal"
vercel list -m key1=value1 -m key2=value2
```

*Using the \`vercel list\` command with the
\`--meta\` option. Repeat the flag for each key/value pair.*

A common use case is filtering by the Git commit SHA that created a deployment:

```bash filename="terminal"
vercel ls -m githubCommitSha=de8b89f13b2bc164cf07e735921bf5513e17951d
```

*Find deployments by Git commit SHA using the
\`githubCommitSha\` metadata key.*

> **💡 Note:** To see the meta values for a deployment, use [GET /deployments/{idOrUrl}
> ](https://vercel.com/docs/rest-api/reference/endpoints/deployments/get-a-deployment-by-id-or-url).

### Policy

The `--policy` option, shorthand `-p`, can be used to display expiration based on [Vercel project deployment retention policy](/docs/deployment-retention).

```bash filename="terminal"
vercel list --policy canceled=6m -p errored=6m -p preview=6m -p production=6m
```

*Using the \`vercel list\` command with the
\`--policy\` option.*

### Yes

The `--yes` option can be used to skip questions you are asked when setting up a new Vercel Project.
The questions will be answered with the default scope and current directory for the Vercel Project name and location.

```bash filename="terminal"
vercel list --yes
```

*Using the \`vercel list\` command with the
\`--yes\` option.*

### Status

The `--status` option, shorthand `-s`, can be used to filter deployments by their status.

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

### environment

Use the `--environment` option to list the deployments for a specific environment. This could be production, preview, or a [custom environment](/docs/deployments/environments#custom-environments).

```bash filename="terminal"
vercel list my-app --environment=staging
```

### Next

The `--next` option enables pagination when listing deployments. Pass the timestamp (in milliseconds since the UNIX epoch) from a previous response to get the next page of results.

```bash filename="terminal"
vercel list --next 1584722256178
```

*Using the \`vercel list\` command with the
\`--next\` option for pagination.*

### Prod

The `--prod` option filters the list to show only production deployments.

```bash filename="terminal"
vercel list --prod
```

*Using the \`vercel list\` command with the
\`--prod\` option to show only production deployments.*


---

[View full sitemap](/docs/sitemap)
