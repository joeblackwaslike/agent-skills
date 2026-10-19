---
title: Managing Domain Renewals and Redemptions
product: vercel
url: /docs/domains/working-with-domains/renew-a-domain
canonical_url: "https://vercel.com/docs/domains/working-with-domains/renew-a-domain"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/domains/working-with-domains
  - /docs/domains
related:
  - /docs/cli/domains
  - /docs/rest-api/domains-registrar/update-auto-renew-for-a-domain
summary: Learn how to manage automatic and manual renewals for custom domains purchased through or registered with Vercel, and how to redeem expired domains...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/domains/working-with-domains/renew-a-domain.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "8f6507342e4970e6cc7e32b390a538f1b749f1b77c59d923cd52ebcba3042fa6"
---

# Managing Domain Renewals and Redemptions

Custom domains purchased through or registered with Vercel are [automatically renewed](#auto-renewal) by default with the option to [manually renew](#manual-renewal) them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Free domain with Pro offer now includes .app and .dev](https://vercel.com/changelog/app-and-dev-domains-included-with-free-domain-for-pro)
- [Free domain for one year, now for all Pro teams](https://vercel.com/changelog/free-domain-for-one-year-now-for-all-pro-teams)
- [Free domain now included with new Pro subscriptions](https://vercel.com/changelog/free-domain-now-included-with-new-pro-subscriptions)
- [Self-serve domain renewals and redemptions now available](https://vercel.com/changelog/self-serve-domain-renewals-and-redemptions-now-available)
- [Lifecycle of a domain](https://vercel.com/kb/guide/lifecycle-of-a-domain) — Understand the states a .com domain passes through from registration to deletion, and how to renew or recover it at each
- [Auto Renewal can now be disabled for Domains](https://vercel.com/changelog/auto-renewal-can-now-be-disabled-for-domains)
- [Programmatic Domain Management](https://vercel.com/docs/domains/registrar-api) — Programmatically search, price, purchase, renew, and manage domains with Vercel's domains registrar API endpoints.
- [Renew a domain](https://vercel.com/docs/rest-api/domains-registrar/renew-a-domain) — POST /v1/registrar/domains/{domain}/renew — Renew a domain
- [Working with SSL Certificates](https://vercel.com/docs/domains/working-with-ssl) — Learn how Vercel uses SSL certification to keep your site secure.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t

Full cross-link map for this page: [/docs/domains/working-with-domains/renew-a-domain.graph.md](/docs/domains/working-with-domains/renew-a-domain.graph.md)
<!-- /docsgraph:related -->

You can see the expiration or [renewal date](#filter-on-renewal-status) of your Vercel-managed domains in the list of domains on the [**Domains** section in your team dashboard sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+team%27s+domains+page).

## Auto renewal

To enable automatic renewal, use the dashboard or the Vercel CLI.

#### Dashboard

- ### Select the Domains tab
  You can choose to prevent the automatic renewal of a Domain from the [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) on the **Vercel Dashboard**.

- ### View the auto renewal status
  From the list of domains, find the domain you want to enable automatic renewal for. You can use the search bar or filter button to find it if you have many domains.
  You'll see the auto-renewal or expiry status of the domain in the domain's row.

  ![Domain row with auto renewal status.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/domains-list-item-light.png)

- ### Toggle the auto renewal status
  Click on the hamburger menu icon  to the right of the domain and toggle the Auto Renewal to on or off.

#### CLI

Run [`vercel domains auto-renew`](/docs/cli/domains) to turn auto renewal on or off:

```bash filename="terminal"
vercel domains auto-renew example.com on
vercel domains auto-renew example.com off
```

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

### Turning off auto renewal before the renewal window

Vercel begins processing an automatic renewal 30 days before your domain's expiration date. Once that renewal is in progress, the auto renewal setting is locked for the current cycle:

- The **Auto Renewal** toggle may not respond, and changing it does not cancel the renewal that is already processing. The renewal, and its charge, still complete.
- Requests to the [update auto-renew endpoint](/docs/rest-api/domains-registrar/update-auto-renew-for-a-domain) fail with the error code `domain_already_renewing` until the renewal finishes.

To prevent a domain from renewing, turn off auto renewal **more than 30 days before its expiration date**. You can check each domain's expiration or renewal date in its row in the [**Domains** tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains).

> **💡 Note:** If the renewal window has already started, wait for the in-progress renewal to
> complete. The domain's expiration date then moves forward by the renewed term,
> and you can turn off auto renewal to prevent the next cycle.

## Manual renewal

Renew a domain from the dashboard or the Vercel CLI.

#### Dashboard

- ### Select the Domains Tab
  Navigate to the [**Domains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fdomains\&title=Go+to+Domains) on the **Vercel Dashboard**.

- ### Find your domain from the list
  From the list of domains, find the domain you want to renew. You can use the search bar or filter button to find it if you have many domains.
  You'll see the auto renewal or expiry status of the domain in the domain's row.

- ### Click the Renew button
  Click on the hamburger menu icon to the right of the domain and click the **Renew** button.
  > **💡 Note:** Your domain must be within 1 year of expiration to be eligible for renewal.

- ### Confirm your renewal
  ![The Renew Domain Modal](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/renew-domain-modal-light.png)

#### CLI

Run [`vercel domains renew`](/docs/cli/domains). The CLI shows the renewal price and asks you to confirm before it charges your account:

```bash filename="terminal"
vercel domains renew example.com
```

## Domain redemptions

For expired domains with a redemption period (typically 30 days), you can now recover them directly in the dashboard:

![The Redeem Domain Modal](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/domains/redeem-domain-modal-light.png)

A redemption fee will be applied, depending on the domain registry.

> **💡 Note:** Not all top-level domains (TLDs) support redemptions.

## Filter on renewal status

You can filter your Vercel owned domains by their renewal status by clicking the filter icon in the top right of the Domains table:

![Filter Domains table by renewal status.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/custom-domains/renew-domain-light.png)

## Renewing third-party domains

Third-Party Domains (ones not purchased with or transferred into Vercel) are not subject to auto-renewal. Please refer to your Domain name registrar's policy regarding renewals.


---

[View full sitemap](/docs/sitemap)
