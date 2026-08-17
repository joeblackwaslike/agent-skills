---
title: vercel rollback
product: vercel
url: /docs/cli/rollback
canonical_url: "https://vercel.com/docs/cli/rollback"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/instant-rollback
  - /docs/cli/promote
summary: Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/rollback.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7bb3fac920c013ef7c0ea796dbf535ccfdb35ad23e70d4658dbbe37eabf54a7b"
---

# vercel rollback

The `vercel rollback` command is used to [roll back production deployments](/docs/instant-rollback) to previous deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Rollback Production](https://vercel.com/docs/deployments/rollback-production-deployment?from=related) — Recover from a bad production deployment by rolling back, investigating the root cause, and redeploying a fix.
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release?from=related) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [Rolling Release Deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment?from=related) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel remove](https://vercel.com/docs/cli/remove?from=related) — Learn how to remove a deployment using the vercel remove CLI command.

Full cross-link map for this page: [/docs/cli/rollback.graph.md](/docs/cli/rollback.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel rollback [deployment-id or url]
```

*Using \`vercel rollback\` rolls back to a previous
deployment.*

> **💡 Note:** On the hobby plan, you can only [roll
> back](/docs/instant-rollback#who-can-roll-back-deployments) to the previous
> production deployment. If you attempt to pass in a deployment id or url from
> an earlier deployment, you will be given an error:
> `To roll back further than the previous production deployment, upgrade to pro`.

## Commands

### `status`

Show the status of any current pending rollbacks.

```bash filename="terminal"
vercel rollback status [project]
```

*Using \`vercel rollback status\` to check the status of
pending rollbacks.*

**Examples:**

```bash filename="terminal"
# Check status for the linked project
vercel rollback status

# Check status for a specific project
vercel rollback status my-project

# Check status with a custom timeout
vercel rollback status --timeout 30s
```

## Unique Options

These are options that only apply to the `vercel rollback` command.

### Timeout

The `--timeout` option is the time that the `vercel rollback` command will wait for the rollback to complete. It does not affect the actual rollback which will continue to proceed.

When rolling back a deployment, a timeout of `0` will immediately exit after requesting the rollback.

```bash filename="terminal"
vercel rollback https://example-app-6vd6bhoqt.vercel.app
```

*Using the \`vercel rollback\` command to the
\`https://example-app-6vd6bhoqt.vercel.app\` deployment.*

## Undo a rollback

To undo a rollback, promote a deployment using [`vercel promote`](/docs/cli/promote):

```bash filename="terminal"
vercel promote [deployment-id or url]
```

This promotes the specified deployment to production and re-enables auto-assignment of production domains. For more details, see [Undo a rollback](/docs/instant-rollback#undo-a-rollback).


---

[View full sitemap](/docs/sitemap)
