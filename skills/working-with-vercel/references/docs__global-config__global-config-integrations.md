---
title: Using Global Config with an integration
product: vercel
url: /docs/global-config/global-config-integrations
canonical_url: "https://vercel.com/docs/global-config/global-config-integrations"
last_updated: 2026-07-29
type: conceptual
prerequisites:
  - /docs/global-config
related:
  - /docs/global-config/global-config-integrations/launchdarkly-global-config
  - /docs/global-config/global-config-integrations/statsig-global-config
  - /docs/global-config/global-config-integrations/split-global-config
  - /docs/global-config/global-config-integrations/devcycle-global-config
  - /docs/global-config/get-started
summary: Learn how to use Global Config with popular A/B testing and feature flag service integrations.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/global-config/global-config-integrations.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7437d97b248ffc58a2c1b1a1e6d735ecbb5749114d5c807b899bb659892ef5e7"
---

# Using Global Config with an integration

> Global Config integrations are available on all plans

Vercel has partnered with A/B testing and feature flag services such as LaunchDarkly and Statsig to make it easier to integrate Global Config into your workflow. These integrations sync feature flag definitions into Global Config, allowing you to evaluate flags in the region closest to the user without making network calls to your preferred service provider.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Global Config](https://vercel.com/docs/global-config/using-global-config) — Learn how to use Global Configs in your projects.
- [Get the data of a user-provided Global Config](https://vercel.com/docs/rest-api/marketplace/get-the-data-of-a-user-provided-global-config) — GET /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config — When the user
- [Get Global Configs](https://vercel.com/docs/rest-api/global-config/get-global-configs) — GET /v1/global-config — Returns all Global Configs.
- [Create a Global Config](https://vercel.com/docs/rest-api/global-config/create-a-global-config) — POST /v1/global-config — Creates a Global Config.
- [Get the data of a user-provided Global Config](https://vercel.com/docs/rest-api/marketplace/get-the-data-of-a-user-provided-global-config-1) — HEAD /v1/installations/{integrationConfigurationId}/resources/{resourceId}/experimentation/global-config — When the user

Full cross-link map for this page: [/docs/global-config/global-config-integrations.graph.md](/docs/global-config/global-config-integrations.graph.md)
<!-- /docsgraph:related -->

To see these integrations in action, explore a template:

You can get started with any of these Global Config integrations by following the quickstart:

- **[LaunchDarkly](/docs/global-config/global-config-integrations/launchdarkly-global-config)**
- **[Statsig](/docs/global-config/global-config-integrations/statsig-global-config)**
- **[Split](/docs/global-config/global-config-integrations/split-global-config)**
- **[DevCycle](/docs/global-config/global-config-integrations/devcycle-global-config)**

## More resources

- [Quickstart](/docs/global-config/get-started)
- [Read with the SDK](/docs/global-config/global-config-sdk)
- [Use the Dashboard](/docs/global-config/global-config-dashboard)
- [Manage with the API](/docs/global-config/vercel-api)
- [Global Config Limits](/docs/global-config/global-config-limits)

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
