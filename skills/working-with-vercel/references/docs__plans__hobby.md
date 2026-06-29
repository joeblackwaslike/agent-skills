---
title: Vercel Hobby Plan
product: vercel
url: /docs/plans/hobby
canonical_url: "https://vercel.com/docs/plans/hobby"
last_updated: 2026-06-16
type: reference
prerequisites:
  - /docs/plans
related:
  - /docs/edge-config/using-edge-config
  - /docs/functions/usage-and-pricing
  - /docs/image-optimization/limits-and-pricing
  - /docs/speed-insights/limits-and-pricing
  - /docs/speed-insights
summary: Learn about the Hobby plan and how it compares to the Pro plan.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/plans/hobby.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "780dff8e21da5c946992501e25195e770c05f8d9cf307ea8aff3c450d490285d"
---

# Vercel Hobby Plan

The Hobby plan is **free** and aimed at developers with personal projects, and small-scale applications. It offers a generous set of features for individual users on a **per month** basis:

| Resource                                                                                            | Hobby Included Usage |
| --------------------------------------------------------------------------------------------------- | -------------------- |
| [Edge Config Reads](/docs/edge-config/using-edge-config#reading-data-from-edge-configs)             | First 100,000        |
| [Edge Config Writes](/docs/edge-config/using-edge-config#writing-data-to-edge-configs)              | First 100            |
| [Active CPU](/docs/functions/usage-and-pricing)                                                     | 4 CPU-hrs            |
| [Provisioned Memory](/docs/functions/usage-and-pricing)                                             | 360 GB-hrs           |
| [Function Invocations](/docs/functions/usage-and-pricing)                                           | First 1,000,000      |
| [Image Transformations](/docs/image-optimization/limits-and-pricing#image-transformations)           | First 5,000          |
| [Image Cache Reads](/docs/image-optimization/limits-and-pricing#image-cache-reads)                   | First 300,000        |
| [Image Cache Writes](/docs/image-optimization/limits-and-pricing#image-cache-writes)                 | First 100,000        |
| [Speed Insights Events](/docs/speed-insights/limits-and-pricing)                                    | First 10,000 events  |
| [Speed Insights Projects](/docs/speed-insights)                                                     | 1 Project            |
| [Web Analytics Events](/docs/analytics/limits-and-pricing#what-is-an-event-in-vercel-web-analytics) | 50,000 events / month included |
| [Workflow Events](/docs/workflows/pricing)                                                           | 50,000 events / month included |
| [Workflow Data Written](/docs/workflows/pricing)                                                     | 1 GB                          |

## Hobby billing cycle

As the Hobby plan is a free tier there are no billing cycles. In most cases, if you exceed your usage limits on the Hobby plan, you will have to wait until 30 days have passed before you can use the feature again.

Some usage limits have shorter pause periods:

- [Web Analytics](/docs/analytics/limits-and-pricing#hobby): collection pauses
  after the grace period and can resume after 7 days

As stated in the [fair use guidelines](/docs/limits/fair-use-guidelines#commercial-usage), the Hobby plan restricts users to non-commercial, personal use only.

When your personal account gets converted to a Hobby team, your usage and activity log will be reset. To learn more about this change, read the [changelog](/changelog/2024-01-account-changes).

## Comparing Hobby and Pro plans

The Pro plan offers more resources and advanced features compared to the Hobby plan. The following table provides a side-by-side comparison of the two plans:

| Feature | Hobby | Pro |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edge Requests | Up to 1,000,000 requests | 10,000,000 requests included, then on-demand |
| Projects | 200 | Unlimited |
| Vercel Function maximum duration | 300s (5 minutes) | 300s (default) - [configurable up to 800s](/docs/functions/configuring-functions/duration); [extended max duration up to 1800s](/docs/functions/configuring-functions/duration#extended-max-duration) (30 minutes, beta) |
| Build vCPUs | 4 | 30 |
| Build memory (GB) | 8 | 60 |
| Build disk size | 32 GB | 32 GB up to [64 GB](/docs/builds/managing-builds#build-machine-types) |
| Team collaboration features | - | Yes |
| Domains per project | 50 | Unlimited |
| Deployments per day | 100 | 6,000 |
| Analytics | 50,000 included Events 1 month of data | On-demand events Web Analytics Plus add-on |
| Email support | - | Yes |
| [RBAC](/docs/rbac/access-roles) available | N/A | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role), [Billing](/docs/rbac/access-roles#billing-role), [Viewer Pro](/docs/rbac/access-roles#viewer-pro-role) |
| [Comments](/docs/comments) | Available | Available for team collaboration |
| Log Drains | - | [Configurable](/docs/drains/using-drains) (not on a trial) |
| Spend Management | N/A | [Configurable](/docs/spend-management) |
| [Vercel Toolbar](/docs/vercel-toolbar) | Available for certain features | Available |
| [Storage](/docs/storage) | Blob | Blob |
| [Activity Logs](/docs/activity-log) | Available | Available |
| [Runtime Logs](/docs/logs/runtime) | 1 hour of logs | 1 day of logs |
| [DDoS Mitigation](/docs/vercel-firewall/ddos-mitigation) | On by default. Optional [Attack Mode](/docs/vercel-firewall/attack-mode). | On by default. Optional [Attack Mode](/docs/vercel-firewall/attack-mode). |
| [Vercel WAF IP Blocking](/docs/security/vercel-waf/ip-blocking) | Up to 3 | Up to 100 |
| [Vercel WAF Custom Rules](/docs/security/vercel-waf/custom-rules) | Up to 3 | Up to 40 |
| Deployment Protection | [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) | [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection) (Add-on), [Sharable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) |

## Upgrading to Pro

You can take advantage of Vercel's Pro trial to explore [Pro features](/docs/plans/pro-plan) for free during the trial period, with some [limitations](/docs/plans/pro-plan/trials#trial-limitations).

To upgrade from a Hobby plan:

1. Go to your [dashboard](/dashboard). If you're upgrading a team, make sure to select the team you want to upgrade
2. Open **Settings** in the sidebar and select [**Billing**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbilling\&title=Go+to+Billing)
3. Under **Plan**, if your team is eligible for an upgrade, you can click the **Upgrade** button. Or, you may need to create or select a team to upgrade. In that case, you can click **Create a Team** or **Upgrade a Team**
4. Optionally, add team members. Developer seats cost **$20 per user / month**, while Viewer seats are free
5. Enter your card details
6. Click **Confirm and Upgrade**

If you would like to end your paid plan, you can [downgrade to Hobby](/docs/plans/pro-plan#downgrading-to-hobby).


---

[View full sitemap](/docs/sitemap)
