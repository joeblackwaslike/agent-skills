---
title: Observability Plus
product: vercel
url: /docs/observability/observability-plus
canonical_url: "https://vercel.com/docs/observability/observability-plus"
last_updated: 2026-07-06
type: reference
prerequisites:
  - /docs/observability
related:
  - /docs/observability
  - /docs/plans/pro-plan
  - /docs/query
summary: Learn about using Observability Plus and its limits.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability/observability-plus.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7f8a472fe12b1702cb9eb5c45b8ff6fc3b75e50d8cfb96118ae8a3d27210bc74"
---

# Observability Plus

> **🔒 Permissions Required**: Observability Plus


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to architect an AI evaluation dashboard on Vercel](https://vercel.com/kb/guide/ai-evaluation-dashboard-architecture-on-vercel?from=related) — Map eval orchestration, traces, and run storage to AI Gateway, Observability, and Marketplace Postgres, and learn when s
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [How to migrate from Fastly to Vercel with zero downtime](https://vercel.com/kb/guide/how-to-migrate-from-fastly-to-vercel-with-zero-downtime?from=related) — Consolidate your CDN infrastructure on Vercel to reduce latency, simplify your configuration, and improve your developer
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [How to ship an Elysia app on Vercel](https://vercel.com/kb/guide/ship-a-elysia-app-on-vercel?from=related) — Deploy a Elysia app to Vercel with zero configuration. Learn how to ship from a template, the Vercel CLI, or Git, and co
- [Manage & Optimize](https://vercel.com/docs/manage-and-optimize-observability?from=related) — Learn how to understand the different charts in the Vercel dashboard, how usage relates to billing, and how to optimize
- [Limits and Pricing](https://vercel.com/docs/speed-insights/limits-and-pricing?from=related) — Learn about our limits and pricing when using Vercel Speed Insights. Different limitations are applied depending on your
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Pro Plan Trial](https://vercel.com/docs/plans/pro-plan/trials?from=related) — Learn all about Vercel's Pro Plan free trial, including features, usage limits, and options post-trial. Learn how to man
- [Limits and Pricing](https://vercel.com/docs/query/monitoring/limits-and-pricing?from=related) — Learn about our limits and pricing when using Monitoring. Different limitations are applied depending on your plan.

Full cross-link map for this page: [/docs/observability/observability-plus.graph.md](/docs/observability/observability-plus.graph.md)
<!-- /docsgraph:related -->

Every Vercel team has access to [Observability](/docs/observability). **Observability Plus** is available on Paid Pro and Enterprise teams and unlocks more granular data exploration, helping you pinpoint when and why issues occurred.

For teams created or upgraded to Paid Pro on or after April 3, 2026, Observability Plus is enabled by default. Existing Paid Pro and Enterprise teams can [enable it separately](#enabling-observability-plus). Pro Trial plans require conversion to Paid Pro to access Observability Plus.

To learn more about Observability Plus, see [Limitations](#limitations) or [pricing](#pricing).

## Using Observability Plus

### Enabling Observability Plus

To enable Observability Plus on an existing Paid Pro or Enterprise team:

1. Go to the **Observability Plus** section of your team's [**Billing** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling%23observability).
2. Turn on the **Observability Plus** toggle.
3. Review any charges, then confirm to enable.

> **💡 Note:** If you don't see Observability Plus in the upgrade flow or in Billing, contact [Vercel Support](/help) or your Vercel account representative for assistance.



#### Plan availability

Observability Plus access depends on your plan:

- **Paid Pro**: For teams created or upgraded to Paid Pro on or after April 3, 2026, Observability Plus is enabled by default. Existing Paid Pro teams can enable it using the steps above.
- **Hobby**: Upgrade to a Paid [Pro plan](/docs/plans/pro-plan) to access Observability Plus.

* **Pro Trial**: Observability Plus is not available during trial. Convert to a Paid Pro plan to access it.

- **Enterprise**: Enable Observability Plus using the steps above.

### Managing projects

By default, Observability Plus applies to all projects in your team. You can exclude specific projects to control costs. Excluded projects revert to the free-tier observability experience with limited retention and no access to advanced metrics or [Query](/docs/query).

#### Excluding a project

You can exclude a project from Observability Plus in three ways:

**During initial enablement:**

When [enabling Observability Plus](#enabling-observability-plus) for the first time, the setup flow includes a project selection step where you can choose which projects to exclude. This modal shows your top projects by usage. To exclude other projects, use the project-level option described below.

**From billing settings:**

1. Navigate to your team's [**Billing** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling%23observability).
2. In the **Observability Plus** section, click **Manage projects**.
3. Toggle off the projects you want to exclude.

This modal also shows your top projects by usage. To exclude projects not listed in the modal, use the project-level option below.

**From the project observability dashboard:**

1. Navigate to your project's [**Observability** dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability).
2. Click the more options button () at the top right of the page, then select **Exclude Project from Plus**.
3. Confirm the exclusion in the modal.

Events from excluded projects won't count toward your Observability Plus usage.

#### Including a project

To re-enable Observability Plus for an excluded project:

- **From billing settings**: Navigate to **Billing** > **Observability Plus** > **Manage projects** and toggle the project back on.
- **From the [project observability dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fobservability\&title=Go+to+Observability)**: Click the more options button () at the top right of the page, then select **Include Project in Plus**.

The project immediately regains access to Observability Plus features.

### Disabling Observability Plus

Paid Pro teams can disable Observability Plus at any time. After you disable it, Vercel stops collecting Observability Plus events. To regain access to extended retention data, re-enable it.

1. Go to the **Observability Plus** section of your team's [**Billing** settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling%23observability).
2. Click the toggle to disable it.
3. Click **Confirm** in the **Turn off Observability Plus** dialog.

## Pricing

Users on all plans can use Observability at no additional cost, with some [limitations](#limitations). Observability is available for all projects in the team.

Paid Pro and Enterprise teams can use **Observability Plus** for additional features, higher limits, and increased retention. Vercel bills you based on usage at a per-event rate. See the table below for pricing details:

| Resource | Usage-based pricing |
| --- | --- |
| Observability Plus | $1.20 per 1 million [events](/docs/observability#tracked-events) |


## Limitations

| Feature                               | Observability                                                                            | Observability Plus                                                                                                                  |
| ------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Data Retention                        | Hobby: 12 hours  Pro: 1 day  Enterprise: 3 days                                | 30 days                                                                                                                             |
| Query                                 | No access                                                                                | Author queries in the Vercel dashboard and save queries to notebooks                                                                |
| Vercel Functions                      | No Latency (p75) data, no breakdown by path                                              | Latency data, sort by p75, breakdown by path and routes                                                                             |
| External APIs                         | No ability to sort by error rate or p75 duration, only request totals for each hostname  | Sorting and filtering by requests, p75 duration, and duration. Latency, Requests, API Endpoint and function calls for each hostname |
| Edge Requests                         | No breakdown by path                                                                     | Full request data                                                                                                                   |
| Fast Data Transfer                    | No breakdown by path                                                                     | Full request data                                                                                                                   |
| ISR (Incremental Static Regeneration) | No access to average duration or revalidation data. Limited function data for each route | Access to sorting and filtering by duration and revalidation. Full function data for each route                                     |
| Build Diagnostics                     | Hobby: 12 hours  Pro: 1 day  Enterprise: 3 days                                | Full access                                                                                                                         |
| In-function Concurrency               | Full access when enabled                                                                 | Full access when enabled                                                                                                            |
| Runtime logs                          | Hobby: 1 hour  Pro: 1 day  Enterprise: 3 days                                  | 30 days, max selection window of 14 consecutive days                                                                                |

To access Observability Plus features, upgrade to a Paid [Pro plan](/docs/plans/pro-plan) or [enable Observability Plus](#enabling-observability-plus) on an existing Paid Pro or Enterprise team.

## Prorating

Observability Plus uses usage-based pricing. You're only charged for events your team generates. Usage is prorated within your billing cycle. For example:

- If you disable Observability Plus before the billing cycle ends, Observability Plus will automatically turn off, Vercel will stop collecting events, and you will lose access to existing data.
- Once the billing cycle is over, you will be charged for the events collected prior to disabling. You won't be refunded any amounts already paid.


---

[View full sitemap](/docs/sitemap)
