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
  - /docs/security/deployment-retention
  - /docs/deployments/environments
summary: Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/list.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "a61bf01a9da658fd87574f4ae33ba86a57993b7977c5735298bf454d1c4d9f5c"
---

# vercel list

The `vercel list` command, which can be shortened to `vercel ls`, provides a list of recent deployments for the currently-linked Vercel Project.

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

The `--policy` option, shorthand `-p`, can be used to display expiration based on [Vercel project deployment retention policy](/docs/security/deployment-retention).

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
