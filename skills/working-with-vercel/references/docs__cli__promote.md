---
title: vercel promote
product: vercel
url: /docs/cli/promote
canonical_url: "https://vercel.com/docs/cli/promote"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/cli
related:
  []
summary: Learn how to promote an existing deployment using the vercel promote CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/promote.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c62e9f0633a168cf19e4dd027337a43a0676cf20978f70fd98fceda51af7865f"
---

# vercel promote

The `vercel promote` command is used to promote an existing deployment to be the current deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Stage and manually promote deployments to production](https://vercel.com/changelog/stage-and-manually-promote-deployments-to-production?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related)
- [Promoting a preview deployment to production](https://vercel.com/docs/deployments/promote-preview-to-production?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related) — Test a preview deployment and promote it to production using the CLI.
- [Promoting Deployments](https://vercel.com/docs/deployments/promoting-a-deployment?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related) — Learn how to promote deployments to production on Vercel.
- [Deploying Projects from Vercel CLI](https://vercel.com/docs/cli/deploying-from-cli?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel Projects from Vercel CLI using the vercel or vercel deploy commands.
- [vercel rollback](https://vercel.com/docs/cli/rollback?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related) — Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=related) — Learn how to redeploy your project using the vercel redeploy CLI command.

Full cross-link map for this page: [/docs/cli/promote.graph.md](/docs/cli/promote.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fpromote&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** Deployments built for the Production environment are the typical promote
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
