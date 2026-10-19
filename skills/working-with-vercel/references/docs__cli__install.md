---
title: vercel install
product: vercel
url: /docs/cli/install
canonical_url: "https://vercel.com/docs/cli/install"
last_updated: 2026-02-27
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/cli/integration
  - /docs/integrations/create-integration/submit-integration
  - /docs/cli/global-options
summary: Learn how to install marketplace native integrations and provision resources with the vercel install CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/install.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "159484e9e22cd37c6d6501909ed2ccad36f527114c25ef617ac4215f2eac8f9c"
---

# vercel install

`vercel install` (alias: `vercel i`) is an alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add). Both commands are fully interchangeable with same flags and same behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Install Marketplace Integrations from the Vercel CLI](https://vercel.com/changelog/install-marketplace-integrations-from-the-vercel-cli)
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [vercel setup](https://vercel.com/docs/cli/setup) — Set up coding agents for Vercel with one command: install the Vercel plugin for Claude Code and Codex, and connect your
- [vercel signup](https://vercel.com/docs/cli/signup) — Learn how to create a new Vercel account using the vercel signup CLI command.
- [vercel init](https://vercel.com/docs/cli/init) — Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.

Full cross-link map for this page: [/docs/cli/install.graph.md](/docs/cli/install.graph.md)
<!-- /docsgraph:related -->

See the [`vercel integration add` reference](/docs/cli/integration#vercel-integration-add) for all options and examples.

## Usage

```bash filename="terminal"
vercel install <integration-name>
```

*Install a marketplace integration and provision a resource.*

For the `<integration-name>` in commands below, use the integration's [URL slug](/docs/integrations/create-integration/submit-integration#url-slug). You can find the slug in the Marketplace URL. For example, for `https://vercel.com/marketplace/neon`, the slug is `neon`. You can also browse available integrations with the [`integration discover`](/docs/cli/integration#vercel-integration-discover) command.

## Examples

```bash filename="terminal"
# Install an integration and provision a resource
vercel install neon
```

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel install` command:

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
