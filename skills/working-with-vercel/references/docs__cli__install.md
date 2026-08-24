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
summary: Learn how to install marketplace native integrations and provision resources with the vercel install CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/install.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "7bdcf044e3b35c025ae809eadcff08c31ea952e3715dd0db23dfeea51d124dba"
---

# vercel install

`vercel install` (alias: `vercel i`) is an alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add). Both commands are fully interchangeable with same flags and same behavior.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [vercel login](https://vercel.com/docs/cli/login?from=related) — Learn how to login into your Vercel account using the vercel login CLI command.
- [Update Installation](https://vercel.com/docs/rest-api/marketplace/update-installation?from=related)
- [Overview](https://vercel.com/docs/integrations?from=related) — Learn how to extend Vercel's capabilities by integrating with your preferred providers for AI, databases, headless conte
- [Marketplace Vercel API](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel?from=related) — Learn about marketplace vercel api on Vercel.

Full cross-link map for this page: [/docs/cli/install.graph.md](/docs/cli/install.graph.md)
<!-- /docsgraph:related -->

See the [`vercel integration add` reference](/docs/cli/integration#vercel-integration-add) for all options and examples.

## Usage

```bash filename="terminal"
vercel install <integration-name>
```

*Install a marketplace integration and provision a resource.*

## Examples

```bash filename="terminal"
# Install an integration and provision a resource
vercel install neon
```


---

[View full sitemap](/docs/sitemap)
