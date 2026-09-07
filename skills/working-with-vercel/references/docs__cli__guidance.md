---
title: vercel guidance
product: vercel
url: /docs/cli/guidance
canonical_url: "https://vercel.com/docs/cli/guidance"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Enable or disable guidance messages in the Vercel CLI using the vercel guidance command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/guidance.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "e936145b5353e47655171bf7d03312ad80bce9b0eaf2b6ae5697f9caf77edfce"
---

# vercel guidance

The `vercel guidance` command allows you to enable or disable guidance messages. Guidance messages are helpful suggestions shown after certain CLI commands complete, such as recommended next steps after a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel help](https://vercel.com/docs/cli/help?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=related) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel list](https://vercel.com/docs/cli/list?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel upgrade](https://vercel.com/docs/cli/upgrade?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=related) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.

Full cross-link map for this page: [/docs/cli/guidance.graph.md](/docs/cli/guidance.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Fguidance&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Usage

```bash filename="terminal"
vercel guidance <subcommand>
```

*Using the \`vercel guidance\` command to manage guidance
message settings.*

## Subcommands

### enable

Enable guidance messages to receive command suggestions after operations complete.

```bash filename="terminal"
vercel guidance enable
```

*Using \`vercel guidance enable\` to turn on guidance
messages.*

### disable

Disable guidance messages if you prefer a quieter CLI experience.

```bash filename="terminal"
vercel guidance disable
```

*Using \`vercel guidance disable\` to turn off guidance
messages.*

### status

Check whether guidance messages are currently enabled or disabled.

```bash filename="terminal"
vercel guidance status
```

*Using \`vercel guidance status\` to see the current
guidance setting.*

## Examples

### Enable guidance after deployment

```bash filename="terminal"
vercel guidance enable
vercel deploy
```

*After enabling guidance, deployments will show suggested next steps.*

### Check current status

```bash filename="terminal"
vercel guidance status
```

*Shows whether guidance messages are enabled or disabled.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel guidance` command:

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
