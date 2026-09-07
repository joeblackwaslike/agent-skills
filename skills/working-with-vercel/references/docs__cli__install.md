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
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "4ae6337de6a0e8c6145cf54e7b3f0182b1704648bc4f8c835474ef0cc4685f74"
---

# vercel install

`vercel install` (alias: `vercel i`) is an alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add). Both commands are fully interchangeable with same flags and same behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Install Marketplace Integrations from the Vercel CLI](https://vercel.com/changelog/install-marketplace-integrations-from-the-vercel-cli?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [vercel build](https://vercel.com/docs/cli/build?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [vercel init](https://vercel.com/docs/cli/init?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Learn how to initialize Vercel supported framework examples locally using the vercel init CLI command.
- [vercel upgrade](https://vercel.com/docs/cli/upgrade?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Upgrade the Vercel CLI to the latest version and manage automatic updates with the vercel upgrade CLI command.
- [vercel dev](https://vercel.com/docs/cli/dev?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=related) — Learn how to replicate the Vercel deployment environment locally and test your Vercel Project before deploying using the

Full cross-link map for this page: [/docs/cli/install.graph.md](/docs/cli/install.graph.md?from=related&source_path=%2Fdocs%2Fcli%2Finstall&source_site=vercel-docs&relationship=graph)
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
