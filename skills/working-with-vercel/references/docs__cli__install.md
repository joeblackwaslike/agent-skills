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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e9e29178930a9742d30b452ad818283b343f4089a6baaffc9ef7e4bbcc83fdab"
---

# vercel install

`vercel install` (alias: `vercel i`) is an alias for [`vercel integration add`](/docs/cli/integration#vercel-integration-add). Both commands are fully interchangeable with same flags and same behavior.

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
