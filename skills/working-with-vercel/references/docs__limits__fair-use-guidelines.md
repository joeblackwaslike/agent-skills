---
title: Fair Use Guidelines
product: vercel
url: /docs/limits/fair-use-guidelines
canonical_url: "https://vercel.com/docs/limits/fair-use-guidelines"
last_updated: 2026-02-27
type: reference
prerequisites:
  - /docs/limits
related:
  - /docs/image-optimization/limits-and-pricing
  - /docs/edge-config/edge-config-limits
  - /docs/builds/managing-builds
  - /docs/pricing/regional-pricing
  - /docs/deployments
summary: Learn how Vercel applies fair use guidelines across plans and usage-based resources.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/limits/fair-use-guidelines.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "56643942530cbb1213a96469c2fb4ef01cca90621b9d1a2583d85565b58fcd37"
---

# Fair Use Guidelines

Vercel usage is subject to these fair use guidelines across plans and usage-based resources. Below is a rule-of-thumb for determining which projects fall within our definition of "fair use" and which do not.

### Examples of fair use

### Never fair use

## Usage guidelines

As a guideline for our community, we expect most users to fall within the below ranges for each plan. These guidelines are not Pro plan entitlements; Vercel bills Pro usage through included credit, explicit included allowances, and on-demand rates. We will notify you if your usage is an outlier. Vercel aims to be as permissive as possible without allowing an unreasonable burden on our infrastructure. Where possible, we'll reach out before taking action to address unreasonable usage and work with you to correct it.

### Typical monthly usage guidelines

|                                                                                            | Hobby                                               | Pro                                                 |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------- | --------------------------------------------------- |
| Fast Data Transfer                                                                         | Up to 100 GB                                        | Up to 1 TB                                          |
| Fast Origin Transfer                                                                       | Up to 10 GB                                         | Usage-based                                         |
| Active CPU                                                                                 | Up to 4 CPU-hrs                                     | Usage-based                                         |
| Provisioned Memory                                                                         | Up to 360 GB-hrs                                    | Usage-based                                         |
| Function Invocations                                                                       | Up to 1M invocations                                | Usage-based                                         |
| [Image transformations](/docs/image-optimization/limits-and-pricing#image-transformations) | Up to 5K transformations/month                      | Usage-based                                         |
| [Image cache reads](/docs/image-optimization/limits-and-pricing#image-cache-reads)         | Up to 300K reads/month                              | Usage-based                                         |
| [Image cache writes](/docs/image-optimization/limits-and-pricing#image-cache-writes)       | Up to 100K writes/month                             | Usage-based                                         |
| Storage                                                                                    | [Edge Config](/docs/edge-config/edge-config-limits) | [Edge Config](/docs/edge-config/edge-config-limits) |

For Teams on the Pro plan, you can pay for [additional usage](/docs/limits/fair-use-guidelines#additional-resources) as you go.

### Other guidelines

**Middleware with the `edge` runtime configured CPU Limits** - Middleware with the `edge` runtime configured can use no more than **50ms of CPU time on average**. This limitation refers to the actual net CPU time, not the execution time. For example, when you are blocked from talking to the network, the time spent waiting for a response does not count toward CPU time limitations.

For [on-demand concurrent builds](/docs/builds/managing-builds#on-demand-concurrent-builds), there is a fair usage limit of 500 concurrent builds per team. If you exceed this limit, any new on-demand build request will be queued until your total concurrent builds goes below 500.

### Additional resources

Pro plan members can use a pay-as-you-go model for additional usage, giving you greater flexibility and control over your usage. Vercel automatically charges usage at the following rates after applicable included allowances and credit:

|                                                                                           | Pro                                                 |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Fast Data Transfer                                                                        | [Regionally priced](/docs/pricing/regional-pricing) |
| Fast Origin Transfer                                                                      | [Regionally priced](/docs/pricing/regional-pricing) |
| Active CPU                                                                                | Starting at $0.128 per hour                         |
| Provisioned Memory                                                                        | Starting at $0.0106 per GB-hr                       |
| Function Invocations                                                                      | $0.60 per 1M invocations                            |
| [Image transformations](/docs/image-optimization/limits-and-pricing#image-transformations) | $0.05 per 1K transformations                        |
| [Image cache reads](/docs/image-optimization/limits-and-pricing#image-cache-reads)         | $0.40 per 1M reads                                  |
| [Image cache writes](/docs/image-optimization/limits-and-pricing#image-cache-writes)       | $4.00 per 1M writes                                 |

### Commercial usage

**Hobby teams** are restricted to non-commercial personal use only. All commercial usage of the platform requires either a Pro or Enterprise plan.

Commercial usage is defined as any [Deployment](/docs/deployments) that is used for the purpose of financial gain of **anyone** involved in **any part of the production** of the project, including a paid employee or consultant writing the code. Examples of this include, but are not limited to, the following:

- Any method of requesting or processing payment from visitors of the site
- Advertising the sale of a product or service
- Receiving payment to create, update, or host the site
- Affiliate linking is the primary purpose of the site
- The inclusion of advertisements, including but not limited to online advertising platforms like Google AdSense

> **💡 Note:** Asking for Donations  fall under commercial usage.

If you are unsure whether or not your site would be defined as commercial usage, please [contact the Vercel Support team](/help#issues).

### General Limits

[**Take a look at our Limits documentation**](/docs/limits#general-limits) for the limits we apply to all accounts.

### Learn More

Circumventing or otherwise misusing Vercel's limits or usage guidelines is a violation of our fair use guidelines.

For further information regarding these guidelines and acceptable use of our services, refer to our [Terms of Service](/legal/terms#fair-use) or your Enterprise Service Agreement.


---

[View full sitemap](/docs/sitemap)
