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
  []
summary: Enable or disable guidance messages in the Vercel CLI using the vercel guidance command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/guidance.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f9ffb64760b8b72755849640d012326f0bfb1e7b722020a57b43590f6d572168"
---

# vercel guidance

The `vercel guidance` command allows you to enable or disable guidance messages. Guidance messages are helpful suggestions shown after certain CLI commands complete, such as recommended next steps after a deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel help](https://vercel.com/docs/cli/help?from=related) — Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
- [vercel deploy](https://vercel.com/docs/cli/deploy?from=related) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the
- [vercel list](https://vercel.com/docs/cli/list?from=related) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [Global Options](https://vercel.com/docs/cli/global-options?from=related) — Global options are commonly available to use with multiple Vercel CLI commands. Learn about Vercel CLI's global options

Full cross-link map for this page: [/docs/cli/guidance.graph.md](/docs/cli/guidance.graph.md)
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


---

[View full sitemap](/docs/sitemap)
