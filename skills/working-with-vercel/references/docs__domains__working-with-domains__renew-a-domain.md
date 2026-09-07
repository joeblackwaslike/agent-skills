---
title: Managing Domain Renewals and Redemptions
product: vercel
url: /docs/domains/working-with-domains/renew-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/renew-a-domain"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  []
summary: Learn how to manage automatic and manual renewals for custom domains purchased through or registered with Vercel, and how to redeem expired domains...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/renew-a-domain.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "e7aaf8e289c22698ce05e5a1879557481a35e022864e28eb0df019c08be6d6ab"
---

# Managing Domain Renewals and Redemptions

Custom domains purchased through or registered with Vercel are [automatically renewed](#auto-renewal) by default with the option to [manually renew](#manual-renewal) them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Free domain with Pro offer now includes .app and .dev](https://vercel.com/changelog/app-and-dev-domains-included-with-free-domain-for-pro?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related)
- [Free domain for one year, now for all Pro teams](https://vercel.com/changelog/free-domain-for-one-year-now-for-all-pro-teams?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related)
- [Free domain now included with new Pro subscriptions](https://vercel.com/changelog/free-domain-now-included-with-new-pro-subscriptions?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related)
- [Self-serve domain renewals and redemptions now available](https://vercel.com/changelog/self-serve-domain-renewals-and-redemptions-now-available?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related)
- [Lifecycle of a domain](https://vercel.com/kb/guide/lifecycle-of-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — Understand the states a .com domain passes through from registration to deletion, and how to renew or recover it at each
- [Auto Renewal can now be disabled for Domains](https://vercel.com/changelog/auto-renewal-can-now-be-disabled-for-domains?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related)
- [Can I disable auto renewals for a domain registered with Vercel?](https://vercel.com/kb/guide/how-can-i-disable-auto-renewals-for-a-domain-registered-with-vercel?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — Learn about disabling auto-renewal of domains registered with Vercel.
- [Update auto-renew for a domain](https://vercel.com/docs/rest-api/domains-registrar/update-auto-renew-for-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — PATCH /v1/registrar/domains/{domain}/auto-renew — Update the auto-renew setting for a domain
- [Renew a domain](https://vercel.com/docs/rest-api/domains-registrar/renew-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — POST /v1/registrar/domains/{domain}/renew — Renew a domain
- [Programmatic Domain Management](https://vercel.com/docs/domains/registrar-api?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=related) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t

Full cross-link map for this page: [/docs/domains/working-with-domains/renew-a-domain.graph.md](/docs/domains/working-with-domains/renew-a-domain.graph.md?from=related&source_path=%2Fdocs%2Fdomains%2Fworking-with-domains%2Frenew-a-domain&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

You can see the expiration or [renewal date](#filter-on-renewal-status) of your Vercel-managed domains in the list of domains on the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page).

## Auto renewal

To enable automatic renewal, follow these steps:

- ### Select the Domains tab
  You can choose to prevent the automatic renewal of a Domain from the [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) on the **Vercel Dashboard**.

- ### View the auto renewal status
  From the list of domains, find the domain you want to enable automatic renewal for. You can use the search bar or filter button to find it if you have many domains.
  You'll see the auto-renewal or expiry status of the domain in the domain's row.

  ![Image](`/docs-assets/static/docs/domains/domains-list-item-light.png`)

- ### Toggle the auto renewal status
  Click on the hamburger menu icon  to the right of the domain and toggle the Auto Renewal to on or off.

### Auto renewal off

If auto renewal is off, Vercel will not try to re-register the Domain when it expires at the end of the registration period. You will not be charged for the Domain any longer, but **you will lose access to the Domain** when it expires. Recovering the Domain, if even possible, may be subject to a **redemption fee**.

If the Domain enters the redemption period, you can attempt to manually recover it by selecting **Renew** in the [Domains tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains). The option will appear if recovery is still possible.

Vercel will send you three emails regarding the Domain before this happens. 24 and 14 days before the Domain is set to expire, you will be notified that auto renewal is off and the Domain will expire soon. A final email will notify you when the Domain expires.

### Auto renewal on

> **💡 Note:** Vercel can only renew your domain if your payment method is valid at the time of renewal. If your card fails, the domain may expire. Vercel will retry the payment and notify you of any issues via email. You can confirm renewal status or retry manually in the [**Domains** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains).

If auto renewal is on, Vercel will use the following process to renew the domain:

1. 60 days before expiration, Vercel will send you a warning email that the domain will expire and that we will try to renew it
2. 30 days before expiration, Vercel will try to renew the domain
3. Starting at 29 days before expiration, Vercel will check for any failed renewals and try to renew them again

## Manual renewal

- ### Select the Domains Tab
  Navigate to the [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) on the **Vercel Dashboard**.

- ### Find your domain from the list
  From the list of domains, find the domain you want to renew. You can use the search bar or filter button to find it if you have many domains.
  You'll see the auto renewal or expiry status of the domain in the domain's row.

- ### Click the Renew button
  Click on the hamburger menu icon to the right of the domain and click the **Renew** button.
  > **💡 Note:** Your domain must be within 1 year of expiration to be eligible for renewal.

- ### Confirm your renewal
  ![Image](`/docs-assets/static/docs/domains/renew-domain-modal-light.png`)

## Domain redemptions

For expired domains with a redemption period (typically 30 days), you can now recover them directly in the dashboard:

![Image](`/docs-assets/static/docs/domains/redeem-domain-modal-light.png`)

A redemption fee will be applied, depending on the domain registry.

> **💡 Note:** Not all top-level domains (TLDs) support redemptions.

## Filter on renewal status

You can filter your Vercel owned domains by their renewal status by clicking the filter icon in the top right of the Domains table:

![Image](`/docs-assets/static/docs/concepts/projects/custom-domains/renew-domain-light.png`)

## Renewing third-party domains

Third-Party Domains (ones not purchased with or transferred into Vercel) are not subject to auto-renewal. Please refer to your Domain name registrar's policy regarding renewals.


---

[View full sitemap](/docs/sitemap)
