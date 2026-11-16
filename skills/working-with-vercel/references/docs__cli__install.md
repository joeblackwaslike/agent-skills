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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/cli/install.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "9bd8ea84bb4f379256ab4df2fb57990cd7d1f852a47fee8c3734dbad3f86211f"
---

# vercel install

`vercel install` is an alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add). Both commands are fully interchangeable with same flags and same behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Install Marketplace Integrations from the Vercel CLI](https://vercel.com/changelog/install-marketplace-integrations-from-the-vercel-cli)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Update Installation](https://vercel.com/docs/rest-api/marketplace/update-installation) — PATCH /v1/installations/{integrationConfigurationId} — This endpoint updates an integration installation.
- [Marketplace Vercel API Reference](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel) — Learn how to call Vercel API endpoints to interact with Vercel resources
- [Finalize Installation](https://vercel.com/docs/rest-api/marketplace/finalize-installation) — POST /v1/installations/{integrationConfigurationId}/billing/finalize — This endpoint allows the partner to mark an insta
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration) — Learn how you can add a product to your Vercel project through a native integration.

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
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
