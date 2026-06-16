---
title: Pricing on Vercel
product: vercel
url: /docs/pricing
canonical_url: "https://vercel.com/docs/pricing"
last_updated: 2026-05-28
type: reference
prerequisites:
  []
related:
  - /docs/pricing/how-does-vercel-calculate-usage-of-resources
  - /docs/functions/configuring-functions/duration
  - /docs/functions/usage-and-pricing
  - /docs/image-optimization/limits-and-pricing
  - /docs/edge-config/edge-config-limits
summary: "Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "7991995594eb91918446d3e3d23cf2af5c629b2b866dfabf21033cf6dc3f2548"
---

# Pricing on Vercel

This page provides an overview of Vercel's pricing model and outlines all billable metrics and their pricing models.

For a full breakdown of Vercel's pricing by plan, see the [pricing page](/pricing).

To learn how resources are triggered through a real-world app scenario, see the [calculating resource usage](/docs/pricing/how-does-vercel-calculate-usage-of-resources) guide.

## Managed Infrastructure

Vercel provides [Managed Infrastructure](https://vercel.com/products/managed-infrastructure) to deploy, scale, and secure your applications.

These resources are usage based, and billed based on the amount of data transferred, the number of requests made, and the duration of compute resources used.

Each product's usage breaks down into resources, with each one billed based on the usage of a specific metric. For example, [Function Duration](/docs/functions/configuring-functions/duration) generates bills based on the total execution time of a Vercel Function.

### Managed Infrastructure billable resources

Most resources include an amount of usage your projects can use within your billing cycle. If you exceed the included amount, you are charged for the extra usage.

#### [Vercel Functions](/docs/functions/usage-and-pricing)

| Resource | Hobby | Pro |
| --- | --- | --- |
| **Active CPU** | 4 hours included | N/A |
| *On-demand Active CPU* | - | Costs vary by region |
| **Provisioned Memory** | 360 GB-hrs included | N/A |
| *On-demand Provisioned Memory* | - | Costs vary by region |
| **Invocations** | 1 million included | N/A |
| *On-demand Invocations* | - | N/A |


#### [Image Optimization](/docs/image-optimization/limits-and-pricing)

| Image Usage | Hobby Included | On-demand Rates |
| --- | --- | --- |
| Image transformations | 5K/month | $0.05 - $0.0812 per 1K |
| Image cache reads | 300K/month | $0.40 - $0.64 per 1M |
| Image cache writes | 100K/month | $4.00 - $6.40 per 1M |


#### [Edge Config](/docs/edge-config/edge-config-limits)

| Resource | Pro Price |
| --- | --- |
| Edge Config Reads | $3.00 |
| Edge Config Writes | $5.00 |


#### [Web Analytics](/docs/analytics/limits-and-pricing)

|  | Hobby | Pro | Pro with Web Analytics Plus | Enterprise |
| --- | --- | --- | --- | --- |
| Included Events | 50,000 Events | N/A | N/A | None |
| Additional Events | - | $3 / 100,000 Events (prorated) | $3 / 100,000 Events (prorated) | Custom |
| Included Projects | Unlimited | Unlimited | Unlimited | Unlimited |
| Reporting Window | 1 Month | 12 Months | 24 Months | 24 Months |
| Custom Events | - | Included | Included | Included |
| Properties on Custom Events | - | 2 | 8 | 8 |
| UTM Parameters | - | - | Included | Included |


#### [Speed Insights](/docs/speed-insights/limits-and-pricing)

| Resource | Pro Price |
| --- | --- |
| Speed Insights Data Points | $0.65 |


#### [Drains](/docs/drains#usage-and-pricing)

| Resource | Pro Price |
| --- | --- |
| Drains Volume | $0.50 |


#### [Monitoring](/docs/monitoring/limits-and-pricing)

Monitoring is now part of [Observability Plus](/docs/observability/observability-plus). If you have an active Monitoring subscription, you'll automatically move to per-event pricing. See [Monitoring pricing](/docs/monitoring/limits-and-pricing) for details.

#### [Observability](/docs/observability/limits-and-pricing)

| Resource | Usage-based pricing |
| --- | --- |
| Observability Plus | $1.20 per 1 million [events](/docs/observability#tracked-events) |


#### [Blob](/docs/vercel-blob/usage-and-pricing)

| Resource | Price |
|----------|-------|
| [Blob Simple Operations](/docs/vercel-blob/usage-and-pricing#pricing) | Regional |
| [Blob Advanced Operations](/docs/vercel-blob/usage-and-pricing#pricing) | Regional |
| [Blob Data Transfer](/docs/vercel-blob/usage-and-pricing#pricing) | Regional |


#### [Microfrontends](/docs/microfrontends#limits-and-pricing)

|  | Hobby | Pro / Enterprise |
| --- | --- | --- |
| Included Microfrontends Routing | 50K requests / month | N/A |
| Additional Microfrontends Routing | - | $2 per 1M requests |
| Included Microfrontends Projects | 2 projects | 2 projects |
| Additional Microfrontends Projects | - | $250/project/month |


#### [Bulk redirects](/docs/redirects/bulk-redirects#limits-and-pricing)

| Plan | Included in plan | Price for additional capacity |
| --- | --- | --- |
| Pro | 1,000 | $0.002/month per additional 25,000 |
| Enterprise | 10,000 | $0.002/month per additional 25,000 |


#### [Builds](/docs/builds/managing-builds)

Build usage is priced at $0.0035 per CPU Minute. The duration of the build is rounded up to the nearest minute and then multiplied by the number of CPUs on the machine type. For example, if a build took 2 minutes and 34 seconds and used the Enhanced machine type, it will be priced at $0.084 (3 minutes x 8 CPUs x $0.0035).

Builds on Standard build machines are only billed when on-demand concurrency is enabled or Elastic build machines are selected.

<!-- COPPER_ERROR: BuildsPricingTable — Could not find matrix pricing for buildCpuMinutes -->

#### Pro plan add-ons

To enable any of the Pro plan add-ons:

1. Visit the Vercel [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher.
2. Open **Settings** in the sidebar and go to [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing).
3. In the **Add-Ons** section, find the add-on you'd like to add. Switch the toggle to **Enabled** and configure the add-on as necessary.

#### Regional pricing

See the [regional pricing](/docs/pricing/regional-pricing) page for more information on Managed Infrastructure pricing in different regions.

## Developer Experience Platform

Vercel's Developer Experience Platform [(DX Platform)](https://vercel.com/products/dx-platform) offers a monthly billed suite of tools and services focused on building, deploying, and optimizing web applications.

### DX Platform billable resources

The below table lists the billable DX Platform resources for the Pro plan. Most resources are billed at a fixed monthly rate. [Observability Plus](/docs/observability/observability-plus) uses usage-based pricing with no base fee.

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [Team seats](/docs/plans/pro-plan#team-seats) | $20 / month per additional paid seat | N/A |
| [Preview Deployment Suffix](/docs/deployments/generated-urls#preview-deployment-suffix) | $100 / month | N/A |
| [SAML Single Sign-On](/docs/saml) | $300 / month | N/A |
| [HIPAA BAA](/docs/security/compliance#hipaa) | $350 / month | N/A |
| [Flags Explorer](/docs/flags/flags-explorer) | $250 / month | N/A |
| [Observability Plus](/docs/observability/observability-plus) | $1.20 per 1,000,000 Events | N/A |
| [Web Analytics Plus](/docs/analytics/limits-and-pricing#pro-with-web-analytics-plus) | $10 / month | N/A |
| [Speed Insights](/docs/speed-insights) | $10 / month per project | N/A |


## More resources

For more information on Vercel's pricing, guidance on optimizing consumption, and invoices, see the following resources:

- [How are resources used on Vercel?](/docs/pricing/how-does-vercel-calculate-usage-of-resources)
- [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage)
- [Understanding my invoice](/docs/pricing/understanding-my-invoice)
- [Improved infrastructure pricing](/blog/improved-infrastructure-pricing)
- [Regional pricing](/docs/pricing/regional-pricing)


---

[View full sitemap](/docs/sitemap)
