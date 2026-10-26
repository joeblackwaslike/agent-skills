---
title: Vercel Enterprise Plan
product: vercel
url: /docs/plans/enterprise
canonical_url: "https://vercel.com/docs/plans/enterprise"
last_updated: 2026-09-01
type: reference
prerequisites:
  - /docs/plans
related:
  - /docs/functions/runtimes
  - /docs/functions/configuring-functions/region
  - /docs/functions/limitations
  - /docs/domains
  - /docs/domains/custom-ssl-certificate
summary: Learn about the Enterprise plan for Vercel, including features, pricing, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/plans/enterprise.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "293409dd5985b6c3de1155ff091f64db72262ff4de32867b45cb55c3b7504a9a"
---

# Vercel Enterprise Plan

Vercel offers an Enterprise plan for organizations and enterprises that need high [performance](#performance-and-reliability), advanced [security](#security-and-compliance), and dedicated [support](#administration-and-support).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Agent Runs](https://eve.dev/docs/observability/agent-runs) — Inspect eve sessions in Vercel and configure the Agent Runs destination.
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [Protect internal apps with Vercel Passport and your identity provider](https://vercel.com/kb/guide/vercel-passport) — Vercel Passport protects internal apps behind your own identity provider, such as Okta or Microsoft Entra ID. Learn how
- [Using Vercel Passport with Microsoft Entra ID](https://vercel.com/kb/guide/vercel-passport-microsoft-entra-id) — Configure Microsoft Entra ID and Vercel Passport to protect a Next.js app, limit access to assigned users, and read veri
- [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan) — Learn about the Vercel Pro plan with credit-based billing, one free first-year domain, free viewer seats, and self-serve
- [Security & Compliance Measures](https://vercel.com/docs/security/compliance) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Organizations](https://vercel.com/docs/organizations) — Learn how organizations let you group multiple Vercel teams under a single entity with consolidated billing and central
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits) — Understand the limits and features available for Vercel for Platforms.

Full cross-link map for this page: [/docs/plans/enterprise.graph.md](/docs/plans/enterprise.graph.md)
<!-- /docsgraph:related -->

## Performance and reliability

The Enterprise plan uses isolated build infrastructure on high-grade hardware with no queues to ensure exceptional performance and a seamless experience.

- Greater function limits for [Vercel Functions](/docs/functions/runtimes) including bundle size, duration, memory, and concurrency
- Automatic failover regions for [Vercel Functions](/docs/functions/configuring-functions/region#automatic-failover)
- Greater multi-region limits for [Vercel Functions](/docs/functions/configuring-functions/region#project-configuration)
- Greater memory and duration limits for [Vercel Functions](/docs/functions/limitations)
- Unlimited [domains](/docs/domains) per project
- [Custom SSL Certificates](/docs/domains/custom-ssl-certificate)
- Automatic concurrency scaling up to 100,000 for [Vercel Functions](/docs/functions/concurrency-scaling#automatic-concurrency-scaling)
- [Isolated
  build infrastructure](/docs/security#do-enterprise-accounts-run-on-a-different-infrastructure),
  with the ability to have [larger memory and storage](/docs/deployments/troubleshoot-a-build#build-container-resources)
- [Trusted Proxy](/docs/headers/request-headers#x-forwarded-for)

## Security and compliance

Data and infrastructure security is paramount in the Enterprise plan with advanced features including:

- [SSO/SAML Login](/docs/saml)
- [Compliance measures](/docs/security)
- Access management for your deployments such as [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection),
  [Private Production Deployments](/docs/deployment-protection#only-production-deployments),
  and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)
- [Secure Compute](/docs/networking/secure-compute) (Paid add-on for Enterprise)
- [Directory Sync](/docs/directory-sync)
- [Audit Log Drains](/docs/drains/reference/audit-logs)
- [Vercel Firewall](/docs/vercel-firewall), including [dedicated DDoS support](/docs/vercel-firewall/ddos-mitigation#dedicated-ddos-support-for-enterprise-teams), [WAF account-level IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking#account-level-ip-blocking) and [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)

## Conformance and Code Owners

[Conformance](/docs/conformance) is a suite of tools designed for static code analysis. Conformance ensures high standards in performance, security, and code health, which are integral for enterprise projects. Code Owners enables you to define users or teams that are responsible for directories and files in your codebase.

- [Allowlists](/docs/conformance/allowlist)
- [Curated rules](/docs/conformance/rules)
- [Custom rules](/docs/conformance/custom-rules)
- [Code Owners](/docs/code-owners) for GitHub

## Observability and Reporting

Gain actionable insights with enhanced observability & logging.

- Enhanced [Observability and Logging](/docs/observability)
- [Audit Logs](/docs/audit-log)
- Increased retention with [Speed Insights Plus](/docs/speed-insights/limits-and-pricing)
- [Custom Events](/docs/analytics/custom-events) tracking and more filters, such as UTM Parameters
- 3 days of [Runtime Logs](/docs/logs/runtime)
- Increased retention in [Observability](/docs/observability)
- [Tracing](/docs/tracing) support
- Configurable [drains](/docs/drains/using-drains)
- Integrations, like [Datadog](/marketplace/datadog), [New Relic](/marketplace/newrelic), and [Middleware](/marketplace/middleware)

## Administration and Support

The Enterprise plan allows for streamlined team collaboration and offers robust support with:

- [Role-Based Access Control (RBAC)](/docs/rbac/access-roles)
- [Access Groups](/docs/rbac/access-groups)
- [Vercel Support Center](/docs/support-center)
- A dedicated Success Manager
- [SLAs](https://vercel.com/legal/sla), including [response time](https://vercel.com/legal/support-terms)
- Audits for Next.js
- Professional services

When employees outside IT build internal applications, define who owns each app and when engineering support is required. Read [What is a citizen developer?](/i/what-is-a-citizen-developer) for guidance on supporting these builders and reviewing applications before wider use.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
