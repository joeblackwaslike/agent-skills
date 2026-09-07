---
title: Pricing for Web Analytics
product: vercel
url: /docs/analytics/limits-and-pricing
canonical_url: "https://vercel.com/docs/analytics/limits-and-pricing"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/analytics
related:
  - /docs/plans/hobby
  - /docs/manage-and-optimize-observability
  - /docs/notifications
  - /docs/accounts
  - /docs/plans/pro-plan
summary: Learn about pricing for Vercel Web Analytics.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/analytics/limits-and-pricing.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "1abb6eca20762cabc87fabdc92c0749ab6ddb7bcec3c2413f35ff4a999ac6592"
---

# Pricing for Web Analytics

## Pricing

Vercel prices Web Analytics by the number of [collected events](#what-is-an-event-in-vercel-web-analytics) across all projects in your team.
After you enable Vercel Web Analytics, your plan determines which features you can use.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Split Web Analytics data by any dimension](https://vercel.com/changelog/split-web-analytics-data-by-any-dimension?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [Up to 80% pricing reduction for Web Analytics](https://vercel.com/changelog/up-to-80-pricing-reduction-for-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [UTM parameter support in Web Analytics](https://vercel.com/changelog/utm-parameter-support-in-web-analytics?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Web Analytics is now generally available](https://vercel.com/changelog/web-analytics-is-now-generally-available?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [Vercel Web Analytics is now generally available](https://vercel.com/blog/vercel-web-analytics-is-now-generally-available?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related)
- [Observability Plus](https://vercel.com/docs/observability/observability-plus?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about using Observability Plus and its limits.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Limits and Pricing for Speed Insights](https://vercel.com/docs/speed-insights/limits-and-pricing?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your
- [Limits and Pricing for Monitoring](https://vercel.com/docs/query/monitoring/limits-and-pricing?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.
- [Account Plans on Vercel](https://vercel.com/docs/plans?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=related) — Learn about the different plans available on Vercel.

Full cross-link map for this page: [/docs/analytics/limits-and-pricing.graph.md](/docs/analytics/limits-and-pricing.graph.md?from=related&source_path=%2Fdocs%2Fanalytics%2Flimits-and-pricing&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

|  | Hobby | Pro | Pro with Web Analytics Plus | Enterprise |
| --- | --- | --- | --- | --- |
| Included Events | 50,000 events / month included | None | N/A | None |
| Additional Events | N/A | $0.03 per 1K events | $0.03 per 1K events | Custom |
| Included Projects | Unlimited | Unlimited | Unlimited | Unlimited |
| Reporting Window | 1 Month | 12 Months | 24 Months | 24 Months |
| Custom Events | - | Included | Included | Included |
| Properties on Custom Events | - | 2 | 8 | 8 |
| UTM Parameters | - | N/A | Included | Included |


Hobby teams can't purchase additional events. Once you reach the monthly limit, collection pauses until the next billing cycle or until you [upgrade to Pro](/docs/plans/hobby#upgrading-to-pro).

On every billing cycle, Hobby teams receive the included event allowance listed above.

Vercel charges Pro teams for collected events based on usage, subject to the Pro monthly usage credit.
If your team is on the Hobby plan, we will [pause](#hobby) the collection, as you cannot be charged for extra events.

Pro teams can also purchase the [Web Analytics Plus add-on](#pro-with-web-analytics-plus) for an additional $10.00/month per team, which grants access to more features and an extended reporting window.

## Usage

The table below shows the metrics for the [**Observability**](/docs/manage-and-optimize-observability) section of the **Usage** dashboard where you can view your Web Analytics usage.

To view information on managing each resource, select the resource link in the **Metric** column.
To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column.

See the [manage and optimize Observability usage](/docs/manage-and-optimize-observability) section for more information on how to optimize your usage.

## Billing information

### Hobby

Web Analytics are free for Hobby users within the usage limits detailed above.

Vercel will [send you notifications](/docs/notifications#on-demand-usage-notifications) as you are nearing your usage limits.
You **will not pay for any additional usage**.
However, once you exceed the limits, a three day grace period will start before Vercel will stop capturing events.
In this scenario, you have two options to move forward:

- Wait 7 days before Vercel will start collecting events again
- Upgrade to Pro to capture more events, send custom events, and access an extended reporting window.

You can sign up for Pro and start a trial using the button below.

If you're expecting large number of page views, make sure to deploy your project to a Vercel [Team](/docs/accounts#creating-a-team) on the [Pro](/docs/plans/pro-plan) plan.

### Pro

For Teams on a Pro trial, the [trial will end](/docs/plans/pro-plan/trials#post-trial-decision) after 14 days.

> **💡 Note:** Note that while you will not be charged during the time of the trial, once the
> trial ends, you will be charged for the events collected during the trial

You will be charged $0.00. These numbers are based on a per-billing cycle basis. Vercel will [send you notifications](/docs/notifications#on-demand-usage-notifications) when you get closer to spending your included credit.

Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

Analytics data is not collected while your project is paused, but becomes accessible again once you upgrade to Pro.

### Pro with Web Analytics Plus

Teams on the Pro plan can optionally extend usage and capabilities through the Web Analytics Plus [add-on](/docs/pricing#pro-plan-add-ons) for an additional $10.00/month per team.

When enabled, all projects within the team have access to additional features.

To upgrade to Web Analytics Plus:

1. Visit the Vercel [dashboard](/dashboard) and open [**Settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) in the sidebar
2. From the left-nav, go to [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing) and scroll to the Add-ons section
3. Under **Web Analytics Plus**, toggle to **Enable** the switch

## FAQ

### What is an event in Vercel Web Analytics?

An event in Vercel Web Analytics is either an automatically tracked page view or a [custom event](/docs/analytics/custom-events).
A page view is a default event that is automatically tracked by our script when a user visits a page on your website.
A custom event is any other action that you want to track on your website, such as a button click or form submission.

### What happens when you reach the maximum number of events?

- Hobby teams won't be billed beyond their allocation. Instead, collection will be paused after the 3 days grace period.
- Pro and Enterprise teams will be billed per collected event.

### Is usage shared across projects?

Yes, events are shared across all projects under the same Vercel account in Web Analytics.
This means that the events collected by each project count towards the total event limit for your account.
Keep in mind that if you have high-traffic websites or multiple projects with heavy event usage, you may need to upgrade to a higher-tier plan to accommodate your needs.

### What is the reporting window?

The reporting window in Vercel Web Analytics is the length of time that your analytics data is guaranteed to be stored and viewable for analysis.
While only the reporting window is guaranteed to be stored, Vercel may store your data for longer periods to give you the option to upgrade to a bigger plan without losing any data.


---

[View full sitemap](/docs/sitemap)
