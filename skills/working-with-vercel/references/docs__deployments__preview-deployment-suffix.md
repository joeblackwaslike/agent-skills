---
title: Preview Deployment Suffix
product: vercel
url: /docs/deployments/preview-deployment-suffix
canonical_url: "https://vercel.com/docs/deployments/preview-deployment-suffix"
last_updated: 2026-02-27
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/pricing
summary: When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that particular deployment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/preview-deployment-suffix.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b85c035c55f2aabae944ee10d7adb10341d2e6bb5e30541265d7362b0dbb2915"
---

# Preview Deployment Suffix

> **🔒 Permissions Required**: Preview Deployment Suffix


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [Why do my Vercel deployments have multiple domains?](https://vercel.com/kb/guide/why-do-my-vercel-deployments-have-multiple-domains?from=related) — Learn about why Vercel auto generates URLs for your deployments.
- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [Avoiding duplicate-content SEO with vercel.app URLs and custom domains](https://vercel.com/kb/guide/avoiding-duplicate-content-with-vercel-app-urls?from=related) — Discover why search engines may treat your vercel.app URL and custom domain as separate pages, and how to consolidate ra
- [Generated URLs](https://vercel.com/docs/deployments/generated-urls?from=related) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Multi-tenant Preview URLs](https://vercel.com/docs/platforms/multi-tenant-platforms/preview-url-prefixes?from=related) — Test tenant-specific experiences in preview deployments using dynamic URL prefixes.
- [Deploy from CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Deployment Protection](https://vercel.com/docs/deployment-protection?from=related) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Pro Plan](https://vercel.com/docs/plans/pro-plan?from=related) — Learn about the Vercel Pro plan with credit-based billing, free viewer seats, and self-serve enterprise features for pro

Full cross-link map for this page: [/docs/deployments/preview-deployment-suffix.graph.md](/docs/deployments/preview-deployment-suffix.graph.md)
<!-- /docsgraph:related -->

Preview Deployment Suffixes allow you to customize the URL of a [preview deployment](/docs/deployments/environments#preview-environment-pre-production) by replacing the default `vercel.app` suffix with a [custom domain](/docs/domains/working-with-domains/add-a-domain) of your choice.

The entered custom domain must be:

- Available and active within the team that enabled the Preview Deployment Suffix
- Using Vercel's [Nameservers](/docs/domains/working-with-domains/add-a-domain#vercel-nameservers)

### Enabling the Preview Deployment Suffix

> **💡 Note:** Preview Deployment Suffix is included and enabled by default in Enterprise
> plans

To enable Preview Deployment Suffix, and customize the appearance of any of your generated URLs:

1. From your [dashboard](/dashboard), open **Settings** in the sidebar
2. Open [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) in the sidebar
3. Under **Add-Ons**, set the toggle for **Preview Deployment Suffix** to **Enabled**
4. Open **Settings** in the sidebar on the team dashboard
5. Open **General** in the sidebar and scroll down to the **Preview Deployment Suffix** section
6. Enter the custom domain of your choice in the input, and push **Save**

![Image](`/docs-assets/static/docs/concepts/deployments/preview-deployment-suffix-light.png`)

If you are not able to use Vercel's Nameservers, see our guide on [how to use a custom domain without Vercel's Nameservers](/kb/guide/preview-deployment-suffix-without-vercel-nameservers).

See the [plans add-ons](/docs/pricing#pro-plan-add-ons) documentation for information on pricing.

### Disabling the Preview Deployment Suffix

To disable Preview Deployment Suffix:

1. From your [dashboard](/dashboard), open **Settings** in the sidebar
2. Open [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) in the sidebar
3. Under **Add-Ons**, set the toggle for **Preview Deployment Suffix** to **Disabled**

The next preview deployment generated will revert back to the default `vercel.app` suffix.

### Broken Preview Deployment Suffix error

You may encounter this error if you are using the [Preview Deployment Suffix](#preview-deployment-suffix) in your team. Make sure that the custom domain you configured is:

- Active (not deleted)
- Available within the team that enabled the [Preview Deployment Suffix](#preview-deployment-suffix)
- Backed by an [active wildcard certificate](https://knowledge.digicert.com/generalinformation/INFO900.html)

The best way to satisfy all of these constraints is to ensure the domain is also added to a project located in the same team. In this project, you can include a single `index.html` that displays when someone visits the root of the domain.


---

[View full sitemap](/docs/sitemap)
