---
title: Account Plans on Vercel
product: vercel
url: /docs/plans
canonical_url: "https://vercel.com/docs/plans"
last_updated: 2026-06-16
type: reference
prerequisites:
  []
related:
  - /docs/git
  - /docs/cdn-security/encryption
  - /docs/deployments/environments
  - /docs/functions
  - /docs/routing-middleware
summary: Learn about the different plans available on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/plans.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "23298d7af0d2122086e34c0ee3098a33cf929f874eadce304531b0963e314e9a"
---

# Account Plans on Vercel

Vercel offers multiple account plans: Hobby, Pro, and Enterprise.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Services](https://vercel.com/kb/guide/vercel-services?from=related) — Vercel Services let you deploy multiple frontends and backends in one project on a shared domain. Learn how to define se
- [Pricing](https://vercel.com/docs/pricing?from=related) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines?from=related) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.
- [Pricing and Quotas](https://vercel.com/docs/sandbox/pricing?from=related) — Understand how Vercel Sandbox billing works, what's included in each plan, and the limits that apply.
- [Account Management](https://vercel.com/docs/accounts?from=related) — Learn how to manage your Vercel account and team members.
- [Pricing](https://vercel.com/docs/analytics/limits-and-pricing?from=related) — Learn about pricing for Vercel Web Analytics.

Full cross-link map for this page: [/docs/plans.graph.md](/docs/plans.graph.md)
<!-- /docsgraph:related -->

Each plan is designed to meet the needs of different types of users, from personal projects to large enterprises. The Hobby plan is free and includes base features, while Pro and Enterprise plans offer enhanced features, team collaboration, and flexible resource management.

## Hobby

The Hobby plan is designed for personal projects and developers. It includes CLI and personal [Git integrations](/docs/git), built-in CI/CD, [automatic HTTPS/SSL](/docs/cdn-security/encryption), and [previews deployments](/docs/deployments/environments#preview-environment-pre-production) for every Git push.

It also provides base resources for [Vercel Functions](/docs/functions), [Middleware](/docs/routing-middleware), and [Image Optimization](/docs/image-optimization), along with 100 GB of Fast Data Transfer and 1 hour of [runtime logs](/docs/logs/runtime).

See the [Hobby plan](/docs/plans/hobby) page for more details.

## Pro

The Pro plan is designed for professional developers, freelancers, and businesses who need enhanced features and team collaboration. It includes all features of the [Hobby plan](/docs/plans/hobby) with significant improvements in resource management and team capabilities.

Pro introduces a flexible credit-based system that provides transparent, usage-based billing. You get enhanced team collaboration with viewer roles, advanced analytics, and the option to add enterprise features through add-ons.

Key features include team roles and permissions, credit-based resource management, enhanced monitoring, and email support with optional priority support upgrades.

Paid Pro teams include a [free first-year domain on an eligible TLD](/docs/plans/pro-plan#free-first-year-domain-with-pro), one per team. The offer is not available during the Pro trial.

See the [Pro plan](/docs/plans/pro-plan) page for more details.

## Enterprise

The Enterprise plan caters to large organizations and enterprises requiring custom options, advanced security, and dedicated support. It includes all features of the Pro plan with custom limits, dedicated infrastructure, and enterprise-grade security features.

Enterprise customers benefit from [Single Sign-On (SSO)](/docs/saml), enhanced [observability and logging](/docs/observability), isolated build infrastructure, dedicated Vercel account representatives, and SLAs.

See the [Enterprise plan](/docs/plans/enterprise) page for more details.

## General billing information

### Where do I understand my usage?

On the [usage page of your dashboard](/dashboard). To learn how your usage relates to your bill and how to optimize your usage, see [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage).

You can also learn more about how [usage incurs on your site](/docs/pricing/how-does-vercel-calculate-usage-of-resources) or how to [understand your invoice](/docs/pricing/understanding-my-invoice).

### What happens when I reach 100% usage?

All plans [receive notifications](/docs/notifications#on-demand-usage-notifications) by email and on the dashboard when they are approaching and exceed their usage limits.

- Hobby plans will be paused when they exceed the included free tier usage
- Pro plans users can configure [Spend Management](/docs/spend-management) to automatically pause deployments, trigger a webhook, or send SMS notifications when they reach 100% usage

For Pro and Enterprise teams, when you reach 100% usage your deployments are **not** automatically stopped. Rather, Vercel enables you to incur on-demand usage as your site grows. It's important to be aware of the [usage page of your dashboard](/docs/pricing/manage-and-optimize-usage) to see if you are approaching your limit.

One of the benefits to always being on, is that you don't have to worry about downtime in the event of a huge traffic spike caused by announcements or other events. Keeping your site live during these times can be critical to your business.

See [Manage & optimize usage](/docs/pricing/manage-and-optimize-usage) for more information on how to optimize your usage.


---

[View full sitemap](/docs/sitemap)
