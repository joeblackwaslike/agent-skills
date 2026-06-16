---
title: vercel promote
product: vercel
url: /docs/cli/promote
canonical_url: "https://vercel.com/docs/cli/promote"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to promote an existing deployment using the vercel promote CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/promote.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "597ba9e75eeb680ef646dd7d574fcef6952b63005cfd846c81ffd35b8c6416c9"
---

# vercel promote

The `vercel promote` command is used to promote an existing deployment to be the current deployment.

> **⚠️ Warning:** Deployments built for the Production environment are the typical promote
> target. You can promote Deployments built for the Preview environment, but you
> will be asked to confirm that action and will result in a new production
> deployment. You can bypass this prompt by using the `--yes` option.

## Usage

```bash filename="terminal"
vercel promote [deployment-id or url]
```

*Using \`vercel promote\` will promote an existing
deployment to be current.*

## Commands

### `status`

Show the status of any current pending promotions.

```bash filename="terminal"
vercel promote status [project]
```

*Using \`vercel promote status\` to check the status of
pending promotions.*

**Examples:**

```bash filename="terminal"
# Check status for the linked project
vercel promote status

# Check status for a specific project
vercel promote status my-project

# Check status with a custom timeout
vercel promote status --timeout 30s
```

## Unique Options

These are options that only apply to the `vercel promote` command.

### Timeout

The `--timeout` option is the time that the `vercel promote` command will wait for the promotion to complete. When a timeout occurs, it does not affect the actual promotion which will continue to proceed.

When promoting a deployment, a timeout of `0` will immediately exit after requesting the promotion. The default timeout is `3m`.

```bash filename="terminal"
vercel promote https://example-app-6vd6bhoqt.vercel.app --timeout=5m
```

*Using the \`vercel promote\` command with the
\`--timeout\` option.*


---

[View full sitemap](/docs/sitemap)
