---
title: Observability Plus
product: vercel
url: /docs/observability/observability-plus
canonical_url: "https://vercel.com/docs/observability/observability-plus"
last_updated: 2026-06-01
type: reference
prerequisites:
  - /docs/observability
related:
  - /docs/observability
  - /docs/plans/pro-plan
summary: Learn about using Observability Plus and its limits.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/observability/observability-plus.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e931cc29031d2d433ff24f3b97553c1c10116f1e533da33cf8d6d911a1c66db5"
---

# Observability Plus

> **🔒 Permissions Required**: Observability Plus

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
