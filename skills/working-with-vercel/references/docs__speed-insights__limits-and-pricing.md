---
title: Limits and Pricing for Speed Insights
product: vercel
url: /docs/speed-insights/limits-and-pricing
canonical_url: "https://vercel.com/docs/speed-insights/limits-and-pricing"
last_updated: 2026-09-01
type: reference
prerequisites:
  - /docs/speed-insights
related:
  - /docs/drains
  - /docs/speed-insights/metrics
  - /docs/spend-management
  - /docs/speed-insights/package
  - /docs/speed-insights/managing-usage
summary: Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your plan.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/speed-insights/limits-and-pricing.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "936fd94594693cb5c1319663c89097a26f60274d42df92adba1798ae7252cf86"
---

# Limits and Pricing for Speed Insights

> **🔒 Permissions Required**: Speed Insights

Speed Insights has two tiers:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Improve Cumulative Layout Shift \\(CLS\\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Speed Insights now has a free tier](https://vercel.com/changelog/speed-insights-free-tier?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn how to use Speed Insights to analyze your application's performance data.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Pricing on Vercel](https://vercel.com/docs/pricing?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Observability Plus](https://vercel.com/docs/observability/observability-plus?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about using Observability Plus and its limits.
- [Pricing for Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about pricing for Vercel Web Analytics.

Full cross-link map for this page: [/docs/speed-insights/limits-and-pricing.graph.md](/docs/speed-insights/limits-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fspeed-insights%2Flimits-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Speed Insights** is available on every plan. Add the `@vercel/speed-insights` package to start reporting events and view essential performance insights.
- **Speed Insights Plus** unlocks all Core Web Vitals, breakdowns, and [Drains](/docs/drains). Upgrade each project individually.

|                 | Speed Insights                                                                                                                       | Speed Insights Plus                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Price           | Free on all plans                                                                                                                   | $10.00 per project, per month on Pro. Included on Enterprise. Plus on-demand events |
| Included events | 10,000 events over the last 30 days, shared across the team                                                                                                  | 10,000 events over the last 30 days, shared across the team                                                                           |
| Additional events | Not available                                                                                                                   | $0.65 per 10,000 events                                                                                                       |
| Metrics         | [Real Experience Score (RES)](/docs/speed-insights/metrics#real-experience-score-res) only | Insights to all Core Web Vitals (FCP, LCP, INP, CLS, TTFB)                                                      |
| Breakdowns      | Path and route counts with Great and Needs Improvement entries only                                                   | All breakdowns, including Poor entries, countries, and element selectors                                                                                                        |
| Date ranges     | 24 hours and 7 days                                                                                                   | 24 hours and 7 days, including 30 days on Pro and 90 days on Enterprise                                                    |
| Drains          | Not available                                                                                                                        | Available, see [Drains](/docs/drains) for more information                                                                                                             |

## Pricing

Speed Insights is available for free on all plans.
Speed Insights Plus is available on the Pro and Enterprise plans.

The following table outlines the price for events on each version of Speed Insights:

| Resource | Hobby Included | On-demand Rates |
| --- | --- | --- |
| Speed Insights Events | First 10,000 events | $0.65 per 10,000 events |


Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

## Limitations

Projects that are only on Speed Insights share a free allocation of 10,000 events over the last 30 days.
If your team goes beyond this allocation, Vercel pauses the ingestion for those projects for the next 14 days.

Ingestion is not paused for projects on Speed Insights Plus.

If your team is on the Hobby plan, you have to upgrade to Pro to use Speed Insights Plus.

## Sample rate

By default, Speed Insights uses all incoming events to calculate the scores shown in the Speed Insights view.

To reduce the number of events collected, change the sample rate at the project level with the `@vercel/speed-insights` package, as documented in [Sample rate](/docs/speed-insights/package#samplerate).
For a comprehensive guide on reducing usage, including using `beforeSend` to filter specific pages, see [Managing Usage & Costs](/docs/speed-insights/managing-usage).

## Usage

The table below shows the metrics for the [**Observability**](/docs/manage-and-optimize-observability) section of the **Usage** dashboard where you can view your Speed Insights usage.

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

See the [manage and optimize Observability usage](/docs/manage-and-optimize-observability) section for more information on how to optimize your usage.


---

[View full sitemap](/docs/sitemap)
