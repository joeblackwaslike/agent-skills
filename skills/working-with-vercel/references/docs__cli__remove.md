---
title: vercel remove
product: vercel
url: /docs/cli/remove
canonical_url: "https://vercel.com/docs/cli/remove"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/deployments/managing-deployments
  - /docs/projects
  - /docs/cli/global-options
summary: Learn how to remove a deployment using the vercel remove CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/remove.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "aaf22d25fdef61b4afd8ccf412e6af80eaa622b1d69a5a86de5e1271c26eee70"
---

# vercel remove

The `vercel remove` command is used to remove deployments either by ID or for a specific Vercel Project.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel redeploy](https://vercel.com/docs/cli/redeploy) — Learn how to redeploy your project using the vercel redeploy CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel curl](https://vercel.com/docs/cli/curl) — Learn how to make HTTP requests to your Vercel deployments with automatic deployment protection bypass using the vercel
- [vercel rollback](https://vercel.com/docs/cli/rollback) — Learn how to roll back your production deployments to previous deployments using the vercel rollback CLI command.

Full cross-link map for this page: [/docs/cli/remove.graph.md](/docs/cli/remove.graph.md)
<!-- /docsgraph:related -->

> **💡 Note:** You can also remove deployments from the Vercel Dashboard. For the steps, see
> [Delete a deployment](/docs/deployments/managing-deployments#delete-a-deployment).

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

*Using the \`vercel remove\` command to remove a Vercel Project and all of
its deployments from the Vercel platform.*

> **💡 Note:** By using the [project name](/docs/projects), the entire Vercel
> Project will be removed from the current scope unless the
> `--safe` is used.

## Unique Options

These are options that only apply to the `vercel remove` command.

### Safe

The `--safe` option can be used to skip the removal of deployments with an active preview URL or production domain when a Vercel Project is provided as the parameter.

```bash filename="terminal"
vercel remove my-project --safe
```

*Using the \`vercel remove\` command with the
\`--safe\` option.*

### Yes

The `--yes` option, shorthand `-y`, can be used to skip the confirmation step for a deployment or Vercel Project removal.

```bash filename="terminal"
vercel remove example-app-6vd6bhoqt.vercel.app --yes
```

*Using the \`vercel remove\` command with the
\`--yes\` option.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel remove` command:

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
