---
title: Vercel Pro Plan
product: vercel
url: /docs/plans/pro-plan
canonical_url: "https://vercel.com/docs/plans/pro-plan"
last_updated: 2026-07-15
type: reference
prerequisites:
  - /docs/plans
related:
  - /docs/pricing
  - /docs/builds/managing-builds
  - /docs/plans/pro-plan/trials
  - /docs/domains/free-domain-with-pro
  - /docs/manage-cdn-usage
summary: Learn about the Vercel Pro plan with credit-based billing, free viewer seats, and self-serve enterprise features for professional teams.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/plans/pro-plan.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "e8d93ff83af941a1e642d8e896d687d21e7f7e355fef7d68f23bb757dd45d6cf"
---

# Vercel Pro Plan

The Vercel Pro plan is designed for professional developers, freelancers, and businesses who need enhanced features and team collaboration.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I transfer ownership of a Vercel team?](https://vercel.com/kb/guide/how-do-i-transfer-ownership-of-a-vercel-team?from=related) — Learn how to transfer ownership of a Vercel team, including the exact dashboard steps to promote a new Owner and remove
- [Why has my account or deployment been paused?](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked?from=related) — Learn why a Vercel account or deployment gets paused, from budget and usage limits to policy violations, and how to resu
- [Hobby Plan](https://vercel.com/docs/plans/hobby?from=related) — Learn about the Hobby plan and how it compares to the Pro plan.
- [Account Management](https://vercel.com/docs/accounts?from=related) — Learn how to manage your Vercel account and team members.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines?from=related) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.
- [Enterprise Plan](https://vercel.com/docs/plans/enterprise?from=related) — Learn about the Enterprise plan for Vercel, including features, pricing, and more.
- [Manage and Optimize Usage](https://vercel.com/docs/pricing/manage-and-optimize-usage?from=related) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/plans/pro-plan.graph.md](/docs/plans/pro-plan.graph.md)
<!-- /docsgraph:related -->

## Pro plan features

- **[Credit-based billing](#monthly-credit)**: Pro includes monthly credit that can be used flexibly across [usage dimensions](/docs/pricing#managed-infrastructure-billable-resources)
- **[Free viewer seats](#viewer-team-seat)**: Unlimited read-only access to the Vercel dashboard so that project collaborators can view deployments, check analytics, and comment on previews
- **[Elastic build machines](/docs/builds/managing-builds#elastic-build-machines)**: New teams use Elastic build machines by default. Elastic automatically selects a machine for each project based on its build workload
- **[Paid add-ons](#paid-add-ons)**: Additional enterprise-grade features are available as add-ons
- **[Free first-year domain with Pro](#free-first-year-domain-with-pro)**: One eligible TLD domain (`.online`, `.site`, `.space`, `.store`, `.tech`, or `.website`) per paid Pro team. Renews at the standard rate after year one

For a full breakdown of the features included in the Pro plan, see the [pricing page](https://vercel.com/pricing).

## Free first-year domain with Pro

All paid Pro teams include one free first-year domain on an eligible TLD (`.online`, `.site`, `.space`, `.store`, `.tech`, or `.website`). New Pro subscriptions can claim the domain at checkout during the upgrade. Existing Pro teams claim from domain search in the dashboard at [vercel.com/domains](https://vercel.com/domains). After the first year, the domain renews at the standard rate.

The offer is limited to one domain per team and excludes:

- Teams on a [Pro trial](/docs/plans/pro-plan/trials)
- Teams that have already claimed their free domain
- Additional domains beyond the one included per team

See the [docs page](/docs/domains/free-domain-with-pro#how-do-i-claim-my-free-domain) for more information on how to claim your free domain.

## Monthly credit

You can use your monthly credit across all infrastructure resources. Once you have used your monthly credit, Vercel bills additional usage on-demand.

The monthly credit applies to all [managed infrastructure billable resources](/docs/pricing#managed-infrastructure-billable-resources) after their respective included allocations are exceeded.

### Credit and usage allocation

- **Monthly credit**: Every Pro plan has $20 in monthly credit.
- **Included infrastructure usage**: Each month, you have 1 TB [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) and 10,000,000 [Edge Requests](/docs/manage-cdn-usage#edge-requests) included. Once you exceed these included allocations, Vercel will charge usage against your monthly credit before switching to on-demand billing.

### Credit expiration

The credit and allocations expire at the end of the month if they are not used, and are reset at the beginning of the following month.

### Managing your spend amount

You will receive automatic notifications when your usage has reached 75% of your monthly credit. Once you exceed the monthly credit, Vercel switches your team to on-demand usage and you will receive daily and weekly summary emails of your usage.

You can also set up alerts and automatic actions when your account hits a certain spend threshold as described in the [spend management documentation](/docs/spend-management). This can be useful to manage your spend amount once you have used your included credit.

> **💡 Note:** By default, Vercel enables spend management notifications for new customers at
> a spend amount of $200 per billing cycle.

## Pro plan pricing

The Pro plan is billed monthly based on the number of deploying team seats, paid add-ons, and any on-demand usage during the billing period. Each product has its own pricing structure, and includes both included resources and extra usage charges. The [platform fee](#platform-fee) is a fixed monthly fee that includes $20 in usage credit.

### Platform fee

- $20/month Pro platform fee
  - 1 deploying team seat included
  - $20/month in usage credit

See the [pricing](/docs/pricing) page for more information about the pricing for resource usage.

## Team seats

On the Pro plan, your team starts with 1 included paid seat that can deploy projects, manage the team, and access all member-level permissions.

You can add (See the [Managing Team Members documentation](/docs/rbac/managing-team-members#adding-team-members-and-assigning-roles) for more information):

- Additional paid seats ([Owner](/docs/rbac/access-roles#owner-role) or [Member](/docs/rbac/access-roles#member-role) roles) for $20/month each
- Unlimited free [Viewer seats](#viewer-team-seat) with read-only access

See the [Team Level Roles Reference](/docs/rbac/access-roles/team-level-roles) for a complete list of roles and their permissions.

### Viewer team seat

Each viewer team seat has the [Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) role with the following access:

- Read-only access to Vercel to view analytics, speed insights, or access project deployments
- Ability to comment and collaborate on deployed previews

Viewers cannot configure or deploy projects.

### Additional team seats

- Seats with [Owner](/docs/rbac/access-roles#owner-role) or [Member](/docs/rbac/access-roles#member-role) roles: $20/month each
  - These team seats have the ability to configure & deploy projects
- [Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) (read-only) seats: Free

## Paid add-ons

The following features are available as add-ons:

- **[SAML Single Sign-On](/docs/saml)**: $300/month
- **[HIPAA BAA](/docs/security/compliance#hipaa)**: Healthcare compliance agreements for $350/month
- **[Advanced Deployment Protection](/docs/deployment-protection#advanced-deployment-protection)**: $150/month
- **[Flags Explorer](/docs/flags/flags-explorer)**: $250/month
- **[Observability Plus](/docs/observability/observability-plus)**: $1.20 per 1 million events
- **[Preview Deployment Suffix](/docs/deployments/preview-deployment-suffix)**: $100/month
- **[Static IPs](/docs/networking/static-ips)**: $100/month per project, plus Private Data Transfer
- **[Web Analytics Plus](/docs/analytics/limits-and-pricing#pro-with-web-analytics-plus)**: $10/month
- **[Speed Insights](/docs/speed-insights)**: $10/month per project

## Downgrading to Hobby

Each account is limited to one team on the Hobby plan. If you attempt to downgrade a Pro team while already having a Hobby team, the platform will either require one team to be deleted or the two teams to be merged.

To downgrade from a Pro to Hobby plan without losing access to the team's projects:

1. Navigate to your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and select your team from the team switcher
2. Open **Settings** in the sidebar
3. Select **Billing** in the Settings navigation
4. Click **Downgrade Plan** in the **Plan** sub-section

When you downgrade a Pro team, all active members except for the original owner are removed.

Due to restrictions in the downgrade flow, Pro teams will need to [manually transfer any connected Stores](/docs/storage#transferring-your-store) and/or [Domains](/docs/domains/working-with-domains/transfer-your-domain#transferring-domains-between-projects) to a new destination before proceeding with downgrade.


---

[View full sitemap](/docs/sitemap)
