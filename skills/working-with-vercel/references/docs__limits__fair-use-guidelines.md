---
title: Fair Use Guidelines
product: vercel
url: /docs/limits/fair-use-guidelines
canonical_url: "https://vercel.com/docs/limits/fair-use-guidelines"
last_updated: 2026-11-12
type: reference
prerequisites:
  - /docs/limits
related:
  - /docs/pricing/regional-pricing
  - /docs/functions/usage-and-pricing
  - /docs/image-optimization/limits-and-pricing
  - /docs/global-config/global-config-limits
  - /docs/builds/managing-builds
summary: Learn how Vercel applies fair use guidelines across plans and usage-based resources.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/limits/fair-use-guidelines.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "92648302ded25f94679ec5dd5ca3e55a57e15ebe39579531f9fafe1f73fc702b"
---

# Fair Use Guidelines

Vercel usage is subject to these fair use guidelines across plans and usage-based resources. Below is a rule-of-thumb for determining which projects fall within our definition of "fair use" and which do not.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Flat Rate CDN is now GA for Pro teams](https://vercel.com/changelog/flat-rate-cdn-is-now-ga-for-pro-teams)
- [Vercel Remote Cache is now free](https://vercel.com/changelog/free-vercel-remote-cache)
- [How to effectively load test your application on Vercel](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Penetration testing on Vercel](https://vercel.com/kb/guide/penetration-testing-on-vercel) — Learn how to perform pentesting on Vercel.
- [Why has my account or deployment been paused?](https://vercel.com/kb/guide/why-is-my-account-deployment-blocked) — Learn why a Vercel account or deployment gets paused, from budget and usage limits to policy violations, and how to resu
- [Vercel Pricing](https://vercel.com/pricing) — Choose a Vercel plan and compare features and usage pricing.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y
- [Account Plans on Vercel](https://vercel.com/docs/plans) — Learn about the different plans available on Vercel.
- [CDN pricing and usage](https://vercel.com/docs/manage-cdn-usage) — Understand CDN pricing resources, monitor usage from your dashboard, and optimize Fast Data Transfer, Fast Origin Transf
- [Vercel Hobby Plan](https://vercel.com/docs/plans/hobby) — Learn about the Hobby plan and how it compares to the Pro plan.

Full cross-link map for this page: [/docs/limits/fair-use-guidelines.graph.md](/docs/limits/fair-use-guidelines.graph.md)
<!-- /docsgraph:related -->

### Examples of fair use

### Never fair use

## Usage guidelines

As a guideline for our community, we expect most users to fall within the below ranges for each plan. These guidelines are not Pro plan entitlements; Vercel bills Pro usage through included credit and on-demand rates. We will notify you if your usage is an outlier. Vercel aims to be as permissive as possible without allowing an unreasonable burden on our infrastructure. Where possible, we'll reach out before taking action to address unreasonable usage and work with you to correct it.

### Typical monthly usage guidelines

| Resource | Included (Pro) | Included (Hobby) |
|----------|----------------|-----------------|
| [Fast Data Transfer](/docs/pricing/regional-pricing) | Flat Rate CDN | First 100 GB |
| [Function Invocations](/docs/functions/usage-and-pricing#invocations) | Usage-based | First 1,000,000 |
| [Fast Origin Transfer](/docs/pricing/regional-pricing) | Usage-based | First 10 GB |
| [Active CPU](/docs/functions/usage-and-pricing#active-cpu) | Usage-based | 4 hours |
| [Provisioned Memory](/docs/functions/usage-and-pricing#provisioned-memory) | Usage-based | 360 GB-hrs |
| [Image Optimization Transformations](/docs/image-optimization/limits-and-pricing#image-transformations) | Usage-based | 5K/month |
| [Image Optimization Cache Reads](/docs/image-optimization/limits-and-pricing#image-cache-reads) | Usage-based | 300K/month |
| [Image Optimization Cache Writes](/docs/image-optimization/limits-and-pricing#image-cache-writes) | Usage-based | 100K/month |


For storage limits, see [Global Config limits](/docs/global-config/global-config-limits).

For Teams on the Pro plan, you can pay for [additional usage](/docs/limits/fair-use-guidelines#additional-resources) as you go.

### Other guidelines

**Middleware with the `edge` runtime configured CPU Limits** - Middleware with the `edge` runtime configured can use no more than **50ms of CPU time on average**. This limitation refers to the actual net CPU time, not the execution time. For example, when you are blocked from talking to the network, the time spent waiting for a response does not count toward CPU time limitations.

For [on-demand concurrent builds](/docs/builds/managing-builds#on-demand-concurrent-builds), there is a fair usage limit of 500 concurrent builds per team. If you exceed this limit, any new on-demand build request will be queued until your total concurrent builds goes below 500.

### Additional resources

Pro plan members can use a pay-as-you-go model for additional usage, giving you greater flexibility and control over your usage. Vercel automatically charges usage at the following rates once you use your credit:

| Resource | Price |
|----------|-------|
| [Fast Data Transfer](/docs/pricing/regional-pricing) | Regional |
| [Function Invocations](/docs/functions/usage-and-pricing#invocations) | $0.60 per 1,000,000 Invocations |
| [Fast Origin Transfer](/docs/pricing/regional-pricing) | Regional |
| [Active CPU](/docs/functions/usage-and-pricing#active-cpu) | Starting at $0.128 per hour |
| [Provisioned Memory](/docs/functions/usage-and-pricing#provisioned-memory) | Starting at $0.0106 per GB-hr |
| [Image Optimization Transformations](/docs/image-optimization/limits-and-pricing#image-transformations) | $0.05 per 1K transformations |
| [Image Optimization Cache Reads](/docs/image-optimization/limits-and-pricing#image-cache-reads) | $0.40 per 1M reads |
| [Image Optimization Cache Writes](/docs/image-optimization/limits-and-pricing#image-cache-writes) | $4.00 per 1M writes |


### General Limits

[**Take a look at our Limits documentation**](/docs/limits#general-limits) for the limits we apply to all accounts.

### Learn More

Circumventing or otherwise misusing Vercel's limits or usage guidelines is a violation of our fair use guidelines.

For further information regarding these guidelines and acceptable use of our services, refer to our [Terms of Service](/legal/terms#fair-use) or your Enterprise Service Agreement.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
