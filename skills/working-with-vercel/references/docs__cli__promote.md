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
  - /docs/cli/global-options
summary: Learn how to promote an existing deployment using the vercel promote CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/promote.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "1d37ffe73408651e9c5e880f3b5512f0cbc4a28202158f061addeca7212a578b"
---

# vercel promote

The `vercel promote` command is used to promote an existing deployment to be the current deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Promoting a preview deployment to production](https://vercel.com/docs/deployments/promote-preview-to-production) — Test a preview deployment and promote it to production using the CLI.
- [Promoting Deployments](https://vercel.com/docs/deployments/promoting-a-deployment) — Learn how to promote deployments to production on Vercel.
- [request_promote](https://vercel.com/docs/agent-resources/vercel-mcp/tools/rolling-releases/request_promote) — Use request_promote with Vercel MCP.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.

Full cross-link map for this page: [/docs/cli/promote.graph.md](/docs/cli/promote.graph.md)
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

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel promote` command:

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
