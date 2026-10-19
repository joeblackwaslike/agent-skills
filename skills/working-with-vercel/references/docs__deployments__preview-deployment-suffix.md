---
title: Preview Deployment Suffix
product: vercel
url: /docs/deployments/preview-deployment-suffix
canonical_url: "https://vercel.com/docs/deployments/preview-deployment-suffix"
last_updated: 2026-09-18
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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "5c2e03d2c25cb1ea9ba2dcb8fe7e5ab3ee7dc6dff527eb9422eae48343a79353"
---

# Preview Deployment Suffix

> **Availability**: Preview Deployment Suffix is available on Enterprise and Pro plans

Preview Deployment Suffixes allow you to customize the URL of a [preview deployment](/docs/deployments/environments#preview-environment-pre-production) by replacing the default `vercel.app` suffix with a [custom domain](/docs/domains/working-with-domains/add-a-domain) of your choice.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Preview URLs optimized for multi-tenant platforms](https://vercel.com/changelog/preview-urls-optimized-for-multi-tenant-platforms)
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [Preview deployments for retail campaign review](https://vercel.com/kb/guide/preview-deployments-retail-campaign-review) — Use preview deployments so merchandising, brand, and engineering review a retail campaign on one live URL before launch.
- [Project-level deployment suffixes](https://vercel.com/changelog/project-level-deployment-suffixes)
- [Accessing Deployments through Generated URLs](https://vercel.com/docs/deployments/generated-urls) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti
- [Deployments](https://vercel.com/docs/agent-resources/vercel-mcp/tools/deployments) — Vercel MCP tools for deployments.
- [Configuring Custom Domains](https://vercel.com/docs/platforms/multi-tenant-platforms/configuring-domains) — Add, verify, redirect, and remove wildcard and custom domains for a multi-tenant application using the Vercel SDK.
- [Working with domains](https://vercel.com/docs/domains/working-with-domains) — Learn how domains work and the options Vercel provides for managing them.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli) — Set up and deploy a Vercel project using the CLI, from linking to production.

Full cross-link map for this page: [/docs/deployments/preview-deployment-suffix.graph.md](/docs/deployments/preview-deployment-suffix.graph.md)
<!-- /docsgraph:related -->

The entered custom domain must be:

- Available and active within the team that enabled the Preview Deployment Suffix
- Using Vercel's [nameservers](/docs/domains/working-with-domains/add-a-domain#vercel-nameservers), or [delegating certificate validation to Vercel](#use-an-external-dns-provider)

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

![Selecting a custom value for the Preview Deployment Suffix.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployment-suffix-light.png)

### Use an external DNS provider

If you can't switch nameservers, delegate certificate validation to Vercel while keeping the rest of your DNS at your current provider. For a suffix of `preview.example.com`, add these records in your provider's `example.com` zone:

| Type | Name | Value |
| --- | --- | --- |
| NS | `_acme-challenge.preview` | `ns1.vercel-dns.com.` |
| NS | `_acme-challenge.preview` | `ns2.vercel-dns.com.` |
| CNAME | `*.preview` | `cname.vercel-dns-0.com.` |

If the domain is attached to a project and **Settings > Domains** recommends a different CNAME target, use that project-specific value. The wildcard CNAME routes deployment traffic; the NS records let Vercel issue and renew the wildcard certificate. Some providers require full names, such as `_acme-challenge.preview.example.com`, instead of prefixes.

On your team's **Domains** page, select the apex domain (`example.com`) and choose **Enable Vercel DNS** if it isn't already enabled. This activates the Vercel zone without changing your registrar's nameservers. Then save `preview.example.com` as the Preview Deployment Suffix and confirm a new preview URL resolves and has a valid certificate.

> **💡 Note:** Delegating `_acme-challenge` to Vercel can prevent other hosting providers
> from issuing certificates that need the same challenge name. Check their
> certificate requirements before delegating, and keep the delegation in place
> for Vercel's certificate renewals.

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
