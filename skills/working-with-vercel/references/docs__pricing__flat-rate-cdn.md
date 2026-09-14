---
title: Flat Rate CDN
product: vercel
url: /docs/pricing/flat-rate-cdn
canonical_url: "https://vercel.com/docs/pricing/flat-rate-cdn"
last_updated: 2026-09-08
type: reference
prerequisites:
  - /docs/pricing
related:
  - /docs/cdn
  - /docs/cli/usage
  - /docs/manage-cdn-usage
  - /docs/pricing
summary: Flat Rate CDN gives you fixed monthly CDN pricing and protection against usage spikes across capacity tiers.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/flat-rate-cdn.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "4abc3b251a4fae0ea051c5afeb098a3efbae7a25ea15ee3215d1398dc6819398"
---

# Flat Rate CDN

> **🔒 Permissions Required**: Flat Rate CDN

Flat Rate CDN gives you fixed monthly CDN pricing and protection against usage spikes. You pay for a capacity tier instead of per unit of usage, so a one-day traffic spike doesn't change your bill.

![Image](https://vercel.com/docs-assets/static/docs/cdn/flat-rate-cdn-cost-comparison-light.png)

On this page, you'll learn how [Flat Rate CDN handles usage](#how-vercel-handles-usage), how to [enable and configure it](#using-flat-rate-cdn), how to [exclude projects from it](#excluding-projects-from-flat-rate-cdn), and if your [project is eligible](#flat-rate-cdn-eligibility) for Flat Rate CDN.

## How Vercel handles usage

If your total usage for a billing cycle exceeds your monthly capacity, Vercel moves you to a [higher tier](#flat-rate-cdn-tiers) at the start of the next cycle. A one-day spike doesn't trigger an upgrade. Vercel will transition you to [on-demand pricing](/docs/cdn#on-demand-cdn) if you exceed the highest tier.

Vercel provides visibility into your CDN usage in the [billing usage dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fusage\&title=Go+to+Usage) or with [`vercel usage`](/docs/cli/usage), which can break usage down by day. This gives you time to understand your usage and take action before any changes occur.

### Flat Rate CDN tiers

Each tier is a fixed monthly price for a monthly request and data transfer capacity. Pro includes the lowest tier at no additional cost.

| Tier pricing | CDN requests | Data transfer |
| --- | --- | --- |
| Included with Pro | 1M | 1 TB |
| $20/mo | 10M | 50 TB |
| $100/mo | 50M | 50 TB |
| $300/mo | 150M | 50 TB |

Capacity is sized on typical monthly usage. For example, 1 million CDN requests per month works out to about 33,000 requests per day, and you can exceed that on individual days without extra cost.

While Flat Rate CDN is enabled, Vercel covers these resources as a part of your tier instead of billing them on demand:

- CDN requests
- Fast Data Transfer
- Blob Data Transfer
- Sandbox Data Transfer
- Observability events generated from CDN requests

> **💡 Note:** CDN requests appear as **Edge Requests** in your billing dashboard and usage
> charts.

See [CDN pricing and usage](/docs/manage-cdn-usage) for how these resources are defined.

## Using Flat Rate CDN

### Enable and configure Flat Rate CDN

To enable Flat Rate CDN:

1. Select [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing#flat-rate-cdn) in your team's navigation.
2. Browse to **Flat Rate CDN** and turn on the toggle.
3. Choose a capacity tier that matches your typical usage.
4. Review your selection, which shows subscription costs if you chose a paid tier.
5. Select **Continue** to apply.

To change your tier later, select **Configure** in the same section. Tier changes take effect at your next billing cycle.

### Excluding projects from Flat Rate CDN

You can place individual projects that aren't business-critical and that you don't want counting toward your Flat Rate CDN capacity, on the [Flex CDN](/docs/cdn#flex-cdn) network. To see how Flex compares to the other tiers, see [CDN service tiers](/docs/cdn#cdn-service-tiers).

Projects on this list must use Vercel DNS, which Vercel validates when you add them. Change DNS in the project's **Domains** settings if needed.

To opt a project into the Flex network:

1. Select **Billing** in your team's navigation.
2. Under **Exclude projects from capacity**, search for the project.
3. Save your selection.

### Disabling Flat Rate CDN

To disable Flat Rate CDN:

1. Select **Billing** in your team's navigation.
2. Browse to **Flat Rate CDN** and turn off the toggle.
3. Confirm when prompted.

Your tier stays active until the end of your current billing cycle. After that, your team moves to [on-demand pricing](/docs/cdn#on-demand-cdn) for CDN usage, and Vercel bills the resources [covered by your tier](#flat-rate-cdn-tiers) per unit.

See [CDN pricing and usage](/docs/manage-cdn-usage) for on-demand rates and how to stop charges.

## Flat Rate CDN eligibility

Flat Rate CDN is designed for typical web application delivery, including frontend assets, APIs, and backend responses integral to user-facing application experiences.

### Out-of-scope usage

Flat Rate CDN is not eligible for:

- Bulk file distribution or download services
- Large-scale delivery of media or files where such delivery constitutes a majority of bandwidth usage
- Use of the CDN as a storage or file hosting system
- Workloads where high-volume data transfer is the primary function, rather than supporting application logic or user interaction

### Fair use guidelines

If your usage patterns fall within any of the above categories, as determined by Vercel, or are materially above your tier capacity, Vercel may:

- Move projects onto its [Flex CDN tier](/docs/cdn#flex-cdn)
- Require migration to a more appropriate plan or product
- Limit service where necessary

## Related

- [CDN pricing and usage](/docs/manage-cdn-usage)
- [Pricing on Vercel](/docs/pricing)
- [Vercel CDN overview](/docs/cdn)
- [CDN requests](/docs/manage-cdn-usage#cdn-requests)


---

[View full sitemap](/docs/sitemap)
