---
title: Limits and Pricing for Speed Insights
product: vercel
url: /docs/speed-insights/limits-and-pricing
canonical_url: "https://vercel.com/docs/speed-insights/limits-and-pricing"
last_updated: 2026-09-23
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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "e03d427f55aed16045c32066a4707f6dd06bef35cf49047c10fb6d10b9f3dcc8"
---

# Limits and Pricing for Speed Insights

> **Availability**: Speed Insights is available on all plans

Speed Insights has two tiers:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Improve Cumulative Layout Shift \\(CLS\\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [How to handle order-ahead traffic spikes on Vercel](https://vercel.com/kb/guide/handle-order-ahead-traffic-spikes-on-vercel) — Order-ahead traffic spikes hit the same routes every lunch hour. Learn how to scale, cache, queue, and test a restaurant
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [Speed Insights now has a free tier](https://vercel.com/changelog/speed-insights-free-tier)
- [Using Speed Insights](https://vercel.com/docs/speed-insights/using-speed-insights) — Learn how to use Speed Insights to analyze your application's performance data.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Pricing for Web Analytics](https://vercel.com/docs/analytics/limits-and-pricing) — Learn about pricing for Vercel Web Analytics.
- [Observability Plus](https://vercel.com/docs/observability/observability-plus) — Learn about using Observability Plus and its limits.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.

Full cross-link map for this page: [/docs/speed-insights/limits-and-pricing.graph.md](/docs/speed-insights/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

- Speed Insights is free on Hobby, Pro, and Enterprise. Add the `@vercel/speed-insights` package to start collecting events.
- Speed Insights Plus is available for projects on Pro and Enterprise. It adds all Core Web Vitals, detailed breakdowns, and [Drains](/docs/drains).

Events from the free tier have no usage charges and do not count toward Plus usage. Speed Insights Plus has no included event allowance on Pro.

|                 | Speed Insights                                                                                                                       | Speed Insights Plus                                                                                                   |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Price           | Free on all plans                                                                                                                   | $10.00 per project, per month on Pro. Included on Enterprise. Plus on-demand events |
| Included events | 10,000 events over the last 30 days, shared across the team                                                                                                  | None on Pro. Enterprise terms follow your contract. |
| Event usage | Free within the included limit                                                                                                                   | $0.65 per 10,000 events on Pro. Enterprise pricing follows your contract. |
| Metrics         | [Real Experience Score (RES)](/docs/speed-insights/metrics#real-experience-score-res) only | Insights to all Core Web Vitals (FCP, LCP, INP, CLS, TTFB)                                                      |
| Breakdowns      | Path and route counts with Great and Needs Improvement entries only                                                   | All breakdowns, including Poor entries, countries, and element selectors                                                                                                        |
| Date ranges     | 24 hours and 7 days                                                                                                   | 24 hours and 7 days, including 30 days on Pro and 90 days on Enterprise                                                    |
| Drains          | Not available                                                                                                                        | Available, see [Drains](/docs/drains) for more information                                                                                                             |

## Pricing

The free tier has no project fee or event charges on any plan.
On Pro, all events collected by Speed Insights Plus projects count toward paid usage.
On Pro, Plus also has a per-project monthly fee. Enterprise pricing follows your contract.

The following table outlines the price for events on each version of Speed Insights:

| Resource | Hobby Included | On-demand Rates |
| --- | --- | --- |
| Speed Insights Events | First 10,000 events | $0.65 per 10,000 events |


Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

## Limitations

Projects that are only on Speed Insights share a free allocation of 10,000 events over the last 30 days.
This is a rolling window, not a calendar-month or billing-cycle reset.

When your team reaches the free tier limit, Vercel pauses collection for those projects for at least 14 days.
The pause continues while usage over the last 30 days remains above half of the free allocation.
Your sites keep running, and you do not incur event overage charges for the free tier.

Speed Insights Plus projects do not count toward the free tier limit. Reaching that limit does not pause collection for Plus projects.

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
