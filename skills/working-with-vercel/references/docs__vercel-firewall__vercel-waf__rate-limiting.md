---
title: WAF Rate Limiting
product: vercel
url: /docs/vercel-firewall/vercel-waf/rate-limiting
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: Learn how to configure custom rate limiting rules with the Vercel Web Application Firewall (WAF).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "0f85981919d21c7ba74bd4eca330ef7d9cf4bd864dba91fda1798b0bc6cffb03"
---

# WAF Rate Limiting

> WAF Rate Limiting is available on all plans

Rate limiting allows you to control the number of times that a request from the same source can hit your application within a specific timeframe. This could happen due to multiple reasons, such as malicious activity or a software bug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add Rate Limiting with Vercel](https://vercel.com/kb/guide/add-rate-limiting-vercel) — Learn how to implement rate limiting with Vercel
- [Rate limiting now available on Hobby, with higher included usage on Pro](https://vercel.com/changelog/rate-limiting-now-available-on-hobby-with-higher-included-usage-on-pro)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel WAF rate limiting now generally available](https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall)
- [Rate Limiting SDK](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk) — Learn how to configure a custom rule with rate limit in your code.
- [Production checklist for launch](https://vercel.com/docs/production-checklist) — Ensure your application is ready for launch with this comprehensive production checklist by the Vercel engineering team.
- [Public Storage](https://vercel.com/docs/vercel-blob/public-storage) — Learn how to use public Vercel Blob storage to serve files accessible to anyone with the URL

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rate-limiting.graph.md](/docs/vercel-firewall/vercel-waf/rate-limiting.graph.md)
<!-- /docsgraph:related -->

The use of rate limiting rules helps ensure that only intended traffic reaches your resources such as API endpoints or external services, giving you better control over usage costs.

> **💡 Note:** Rate limit counters are tracked on a per-region basis; traffic matching a given rate limit key in multiple regions can exceed the limit you configure for any single region.

## Get started

1. From your [dashboard](https://vercel.com/dashboard/), select the project that you'd like to configure rate limiting for. Then open **Firewall** in the sidebar
2. Select **Configure** on the top right of the Firewall overview page. Then, select **+ New Rule**
3. Complete the fields for the rule as follows
   1. Type a name to help you identify the purpose of this rule for future reference

   2. In the **Configure** section, add as many **If** conditions as needed:

      > **💡 Note:** All conditions must be true for the action to happen.

      ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/vercel-waf-custom-rule-configure-light.png)

   3. For the **Then** action, select **Rate Limit**
      - If this is the first time you are creating a rate limit rule, review the **Rate Limiting Pricing** dialog and select **Continue**

   4. Select [Fixed Window (all plans)](# "About the Fixed Window algorithm") or [Token Bucket (Enterprise)](# "About the Token Bucket algorithm") for the limiting strategy

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/vercel-waf-rate-limit-light.png)

1. Update the **Time Window** field as needed (defaults to 60s) and the **Request Limit** field as needed (defaults to 100 requests)
   - The **Request Limit** defines the maximum number of requests allowed in the selected time window from a common source
2. Select the key(s) from the request's source that you want to match against
3. For the **Then** action, you can leave the **Default (429)** action or choose between **Log**, **Deny** and **Challenge**
   > **💡 Note:** The **Log** action will not perform any blocks. You can use it to first
   > monitor the effect before applying a rate limit or block action.
4. Select **Save Rule**
5. Apply the changes:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment
6. Go to the Firewall overview page, select your Custom Rule from the traffic grouping drop-down and select the parameter(s) related to the condition(s) of your Custom Rule to observe the traffic and check whether it's working as expected:

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/waf-overview-custom-rule-light.png)

## Limits

| Resource               | Hobby                                 | Pro                                   | Enterprise                                           |
| ---------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| Included counting keys | IP, JA4 Digest                        | IP, JA4 Digest                        | IP, JA4 Digest, User Agent and arbitrary Header keys |
| Counting algorithm     | Fixed window                          | Fixed window                          | Fixed window, Token bucket                           |
| Counting window        | Minimum: **10s**, Maximum: **10mins** | Minimum: **10s**, Maximum: **10mins** | Minimum: **10s**, Maximum: **1hr**                   |
| Number of rules        | 1 per project                         | 40 per project | 250 per project |
| Included requests      | 1,000,000 Allowed requests            | Usage-based                           | Custom                                               |

Hobby projects can have one WAF Rate Limiting rule within their total of 3 [custom firewall rules](/docs/vercel-firewall/vercel-waf/custom-rules).

## Pricing

The pricing is based on the region(s) from which the requests come from.

| Resource | Price | Included (Pro) |
|----------|-------|----------------|
| [WAF Rate Limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) | Regional | Usage-based |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
