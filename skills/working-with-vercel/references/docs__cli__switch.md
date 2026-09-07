---
title: vercel switch
product: vercel
url: /docs/cli/switch
canonical_url: "https://vercel.com/docs/cli/switch"
last_updated: 2026-04-10
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to switch between different team scopes using the vercel switch CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/switch.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "7a48bbfad3cb88a3eba6ec2e7de2d9d057f2fbebd481ce7cfbca40b1ceb56fb5"
---

# vercel switch

The `vercel switch` command is used to switch to a different team scope when logged in with Vercel CLI. You can choose to select a team from a list of all those you are part of or specify a team when entering the command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel teams](https://vercel.com/docs/cli/teams?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=related) — Learn how to list, add, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel upgrade](https://vercel.com/docs/cli/upgrade?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=related) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
- [vercel buy](https://vercel.com/docs/cli/buy?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=related) — Learn how to purchase Vercel products like credits, addons, subscriptions, and domains using the vercel buy CLI command.
- [vercel link](https://vercel.com/docs/cli/link?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=related) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.

Full cross-link map for this page: [/docs/cli/switch.graph.md](/docs/cli/switch.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fswitch&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel switch
```

*Using the \`vercel switch\` command to change team scope with Vercel CLI.*

## Extended Usage

```bash filename="terminal"
vercel switch [team-name]
```

*Using the \`vercel switch\` command to change to a specific team scope with
Vercel CLI.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel switch` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)
