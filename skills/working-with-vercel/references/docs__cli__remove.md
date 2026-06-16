---
title: vercel remove
product: vercel
url: /docs/cli/remove
canonical_url: "https://vercel.com/docs/cli/remove"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/projects/overview/
summary: Learn how to remove a deployment using the vercel remove CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/remove.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "4ed3f792d3a63ecfb6f85fe745145b11462e2524556e5362e7223831a6eb55d3"
---

# vercel remove

The `vercel remove` command, which can be shortened to `vercel rm`, is used to remove deployments either by ID or for a specific Vercel Project.

> **💡 Note:** You can also remove deployments from the Project Overview page on the Vercel
> Dashboard.

## Usage

```bash filename="terminal"
vercel remove [deployment-url]
```

*Using the \`vercel remove\` command to remove a
deployment from the Vercel platform.*

## Extended Usage

```bash filename="terminal"
vercel remove [deployment-url-1 deployment-url-2]
```

*Using the \`vercel remove\` command to remove multiple
deployments from the Vercel platform.*

```bash filename="terminal"
vercel remove [project-name]
```

*Using the \`vercel remove\` command to remove all
deployments for a Vercel Project from the Vercel platform.*

> **💡 Note:** By using the [project name](/docs/projects/overview/), the entire Vercel
> Project will be removed from the current scope unless the
> `--safe` is used.

## Unique Options

These are options that only apply to the `vercel remove` command.

### Safe

The `--safe` option, shorthand `-s`, can be used to skip the removal of deployments with an active preview URL or production domain when a Vercel Project is provided as the parameter.

```bash filename="terminal"
vercel remove my-project --safe
```

*Using the \`vercel remove\` command with the
\`--safe\` option.*

### Yes

The `--yes` option, shorthand `-y`, can be used to skip the confirmation step for a deployment or Vercel Project removal.

```bash filename="terminal"
vercel remove my-deployment.com --yes
```

*Using the \`vercel remove\` command with the
\`--yes\` option.*


---

[View full sitemap](/docs/sitemap)
