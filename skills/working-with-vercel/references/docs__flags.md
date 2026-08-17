---
title: Flags
product: vercel
url: /docs/flags
canonical_url: "https://vercel.com/docs/flags"
last_updated: 2026-07-15
type: conceptual
prerequisites:
  []
related:
  - /docs/flags/marketplace
  - /docs/flags/observability
summary: "Control feature visibility, run experiments, and ship with confidence using Vercel's feature flags platform."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "988e9b4c9d82a8178514d321235a2fe4196c9e13eb13970d821fff7dfcd183bc"
---

# Flags

Vercel provides a complete feature flags platform. Use Vercel as your feature flag provider, or connect your preferred provider from the [Marketplace](/docs/flags/marketplace). Either way, you get a unified dashboard to manage all your flags, developer tools like the Flags Explorer, and built-in observability.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [List flags](https://vercel.com/docs/rest-api/feature-flags/list-flags?from=related)
- [Web Analytics](https://vercel.com/docs/analytics?from=related) — With Web Analytics, you can get detailed insights into your website's visitors with new metrics like top pages, top refe
- [Filtering](https://vercel.com/docs/analytics/filtering?from=related) — Learn how filters allow you to explore insights about your website's visitors.
- [Glossary](https://vercel.com/docs/glossary?from=related) — Learn about the terms and concepts used in Vercel's products and documentation.
- [Native Integration Flows](https://vercel.com/docs/integrations/create-integration/marketplace-flows?from=related) — Learn how information flows between the integration user, Vercel, and the integration provider for Vercel native integra

Full cross-link map for this page: [/docs/flags.graph.md](/docs/flags.graph.md)
<!-- /docsgraph:related -->

![Image](`/docs-assets/static/docs/flags/flags-tab-light.png`)

## Why use feature flags?

Flags give you control over your application's behavior without redeploying:

- Roll out features gradually to specific users, teams, or environments
- Test in production safely before launching to everyone
- Run A/B tests to measure impact on conversion and performance
- Override flags locally with the Flags Explorer — no code changes needed
- Ship and deploy independently from releasing features

## Choose your provider

## Unified dashboard

The **Flags** section in your Vercel Dashboard shows all your flags in one place, regardless of which provider you use. You can filter, search, and see the status of every flag across your project.

This unified view lists all your flags in one place. Vercel Flags can be edited directly in the Vercel Dashboard. Marketplace flags link straight to their provider's dashboard—and since you're already signed in through Vercel, you can jump in and make changes immediately.

## Developer tools

## Observability

Track flag evaluations in Runtime Logs and analyze their impact on user behavior in Web Analytics. See which flags affect conversion rates and application performance.

[Learn more about flags observability](/docs/flags/observability)


---

[View full sitemap](/docs/sitemap)
