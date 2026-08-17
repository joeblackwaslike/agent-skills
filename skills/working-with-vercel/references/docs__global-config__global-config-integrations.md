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
source: "https://vercel.com/docs/global-config/global-config-integrations.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "16f4db6f78819ab145fffb80d03c776203a3a533995b779ce7d6789a9e1c754a"
---

# Using Global Config with an integration

> **🔒 Permissions Required**: Global Config integrations


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Global Config](https://vercel.com/docs/global-config/using-global-config?from=related) — Learn how to use Global Configs in your projects.
- [Create a Global Config](https://vercel.com/docs/rest-api/global-config/create-a-global-config?from=related)
- [Get the data of a user-provided Global Config](https://vercel.com/docs/rest-api/marketplace/get-the-data-of-a-user-provided-global-config?from=related)
- [Get Global Configs](https://vercel.com/docs/rest-api/global-config/get-global-configs?from=related)
- [Push data into a user-provided Global Config](https://vercel.com/docs/rest-api/marketplace/push-data-into-a-user-provided-global-config?from=related)

Full cross-link map for this page: [/docs/global-config/global-config-integrations.graph.md](/docs/global-config/global-config-integrations.graph.md)
<!-- /docsgraph:related -->

Vercel has partnered with A/B testing and feature flag services such as LaunchDarkly and Statsig to make it easier to integrate Global Config into your workflow. These integrations sync feature flag definitions into Global Config, allowing you to evaluate flags in the region closest to the user without making network calls to your preferred service provider.

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


---

[View full sitemap](/docs/sitemap)
