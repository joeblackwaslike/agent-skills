---
title: vercel help
product: vercel
url: /docs/cli/help
canonical_url: "https://vercel.com/docs/cli/help"
last_updated: 2026-03-17
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/global-options
summary: Learn how to use the vercel help CLI command to get information about all available Vercel CLI commands.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/help.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "0bbef853dad7492476a011988ce62c15f6753f4abeeb2eb136200df62c80ccb9"
---

# vercel help

The `vercel help` command generates a list of all available Vercel CLI commands and [options](/docs/cli/global-options) in the terminal. When combined with a second argument - a valid Vercel CLI command - it outputs more detailed information about that command.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [use_vercel_cli](https://vercel.com/docs/agent-resources/vercel-mcp/tools/documentation/use_vercel_cli) — Use use_vercel_cli with Vercel MCP.
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel changelog](https://vercel.com/docs/cli/changelog) — Read recent Vercel product updates and search the changelog from your terminal using the Vercel CLI.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel guidance](https://vercel.com/docs/cli/guidance) — Enable or disable guidance messages in the Vercel CLI using the vercel guidance command.

Full cross-link map for this page: [/docs/cli/help.graph.md](/docs/cli/help.graph.md)
<!-- /docsgraph:related -->

Alternatively, the [`--help` global option](/docs/cli/global-options#help) can be added to commands to get help information about that command.

## Usage

```bash filename="terminal"
vercel help
```

*Using the \`vercel help\` command to generate a list of
Vercel CLI commands and options.*

## Extended Usage

```bash filename="terminal"
vercel help [command]
```

*Using the \`vercel help\` command to generate detailed
information about a specific Vercel CLI command.*

To get help for a subcommand, add the subcommand after the command:

```bash filename="terminal"
vercel help env add
```

*Using the \`vercel help\` command to generate detailed
information about the \`vercel env add\` subcommand.*


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
