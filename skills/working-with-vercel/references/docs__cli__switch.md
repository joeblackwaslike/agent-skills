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
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "f480bd6997867215f92cb114bf69cd17204dd746b2324c944cc263b4c0e01829"
---

# vercel switch

The `vercel switch` command is used to switch to a different team scope when logged in with Vercel CLI. You can choose to select a team from a list of all those you are part of or specify a team when entering the command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel teams](https://vercel.com/docs/cli/teams) — Learn how to list, create, switch, invite, and manage your teams with the vercel teams CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel link](https://vercel.com/docs/cli/link) — Learn how to link a local directory to a Vercel Project using the vercel link CLI command.
- [vercel whoami](https://vercel.com/docs/cli/whoami) — Learn how to display the username of the currently logged in user with the vercel whoami CLI command.
- [vercel upgrade](https://vercel.com/docs/cli/upgrade) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.

Full cross-link map for this page: [/docs/cli/switch.graph.md](/docs/cli/switch.graph.md)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel switch
```

*Using the \`vercel switch\` command to change team scope with Vercel CLI.*

## Extended Usage

To switch to a specific team without choosing from the list, pass the team's slug (if your team's URL is `vercel.com/acme`, then `acme` is the slug):

```bash filename="terminal"
vercel switch [team-slug]
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
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
