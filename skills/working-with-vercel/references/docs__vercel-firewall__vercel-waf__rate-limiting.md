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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "3102a9a02e66906a5c0f3110266f4016514a6dba2ffa227242ee93ad162e1b7d"
---

# WAF Rate Limiting

> WAF Rate Limiting is available on all plans

Rate limiting allows you to control the number of times that a request from the same source can hit your application within a specific timeframe. This could happen due to multiple reasons, such as malicious activity or a software bug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Add rate limiting with Vercel](https://vercel.com/kb/guide/add-rate-limiting-vercel) — Learn how to implement rate limiting with Vercel.
- [Rate limiting now available on Hobby, with higher included usage on Pro](https://vercel.com/changelog/rate-limiting-now-available-on-hobby-with-higher-included-usage-on-pro)
- [Deploy a Shopify storefront with an AI assistant](https://vercel.com/kb/guide/deploy-shopify-ai-storefront) — Deploy an eve shopping agent with Vercel Shop to find Shopify products, manage carts, and answer store questions.
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel WAF rate limiting now generally available](https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall)
- [Rate Limiting SDK](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk) — Learn how to configure a custom rule with rate limit in your code.
- [Agent Checklist for Launch](https://vercel.com/docs/agent-checklist) — Prepare an eve, Mastra, or Flue agent for launch on Vercel. Check who can call the agent, what its tools can change, how
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.

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
3. For the **Then** action, you can leave the default **Too Many Requests (429)** action or choose between **Log**, **Deny (403)**, and **Challenge**
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
