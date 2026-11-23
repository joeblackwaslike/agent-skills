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
  - /docs/vercel-firewall/vercel-waf/rate-limiting-sdk
  - /docs/vercel-firewall/priority-projects
  - /docs/vercel-firewall/vercel-waf/custom-rules
summary: Learn how to configure custom rate limiting rules with the Vercel Web Application Firewall (WAF).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "0cf8b148d54ea02b995f31876ec55c7141783470a88a951021876825825113b8"
---

# WAF Rate Limiting

> WAF Rate Limiting is available on all plans

Rate limiting allows you to control the number of times that a request from the same source can hit your application within a specific timeframe. This could happen due to multiple reasons, such as malicious activity or a software bug.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Priority Projects now in public beta](https://vercel.com/changelog/priority-projects-now-in-public-beta)
- [Rate limiting now available on Hobby, with higher included usage on Pro](https://vercel.com/changelog/rate-limiting-now-available-on-hobby-with-higher-included-usage-on-pro)
- [How to keep your storefront running through Black Friday](https://vercel.com/kb/guide/black-friday-reliability) — Learn how to tune alerts, bot rules, and spend limits. Rehearse rollback so your team can recover quickly from checkout
- [Deploy a Shopify storefront with an AI assistant](https://vercel.com/kb/guide/deploy-shopify-ai-storefront) — Deploy an eve shopping agent with Vercel Shop to find Shopify products, manage carts, and answer store questions.
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Vercel WAF rate limiting now generally available](https://vercel.com/changelog/vercel-waf-rate-limiting-now-generally-available)
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall)
- [Create Vercel Firewall rules with natural language](https://vercel.com/changelog/create-vercel-waf-custom-rules-using-natural-language)
- [Agent Checklist for Launch](https://vercel.com/docs/agent-checklist) — Prepare an eve, Mastra, or Flue agent for launch on Vercel. Check who can call the agent, what its tools can change, how
- [Deploy MCP servers to Vercel](https://vercel.com/docs/mcp/deploy-mcp-servers-to-vercel) — Learn how to deploy Model Context Protocol \\(MCP\\) servers on Vercel with OAuth authentication and efficient scaling.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rate-limiting.graph.md](/docs/vercel-firewall/vercel-waf/rate-limiting.graph.md)
<!-- /docsgraph:related -->

The use of rate limiting rules helps ensure that only intended traffic reaches your resources such as API endpoints or external services, giving you better control over usage costs.

> **💡 Note:** Rate limit counters are tracked on a per-region basis; traffic matching a given rate limit key in multiple regions can exceed the limit you configure for any single region.

## Get started

To start from a preconfigured rule instead of creating one, add the [Rate Limit API Requests Firewall Rule](https://vercel.com/templates/other/rate-limit-api-requests-firewall-rule) template to your project. The template's rule logs matching requests until you change its action. To rate limit by a value that only your code knows, such as a user ID, use the [Rate Limiting SDK](/docs/vercel-firewall/vercel-waf/rate-limiting-sdk).

To create a rate limiting rule in the dashboard:

1. From your [dashboard](https://vercel.com/dashboard/), select the project that you'd like to configure rate limiting for. Then open **Firewall** in the sidebar
2. Select **Configure** on the top right of the Firewall overview page. Then, select **+ New Rule**
3. Complete the fields for the rule as follows
   1. Type a name to help you identify the purpose of this rule for future reference

   2. In the **Configure** section, add as many **If** conditions as needed. For example, to rate limit one API route, select **Request Path** and **Equals**, then enter the route's path, such as `/api/chat`:

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

## Response conditions

> Response conditions are available on Enterprise and Pro plans for [Priority projects](/docs/vercel-firewall/priority-projects).

By default, a rate limit rule counts every request that matches its request conditions. You can add response conditions so the rule counts only the responses that match, which lets you limit traffic based on what your application returns. For example, count repeated 404s or requests where your application sets a specific error header.

1. Create or edit a rule with the **Rate Limit** action.
2. Add at least one request condition, such as **Request Path**.
3. Below the rate limit settings, select **Filter counted responses**. This adds a **Response Status Code** condition.
4. Choose what the response has to match:
   - To match on status, keep **Response Status Code**, choose an operator, and enter a status code. For example, **Equals** `401` counts only responses with a 401 status.
   - To match on a header, change the condition to **Response Header**, then enter the header name, an operator, and a value.
5. To add another response condition, select **AND**.

A request counts toward the limit only when its response matches all of the rule's response conditions. If the rule has more than one condition group joined by **OR**, the response conditions apply no matter which group the request matched. Response conditions require at least one request condition and the **Fixed Window** algorithm. If the rule uses **Token Bucket**, adding a response condition switches it to **Fixed Window**.

Once a client reaches the limit, the rule applies its action to every request that matches the request conditions, not only to requests whose response matches. For example, a rule that counts 401 responses on `/login` also limits that client's `/login` requests that would have succeeded.

## Limits

| Resource               | Hobby                                 | Pro                                   | Enterprise                                           |
| ---------------------- | ------------------------------------- | ------------------------------------- | ---------------------------------------------------- |
| Included counting keys | IP, JA4 Digest                        | IP, JA4 Digest                        | IP, JA4 Digest, User Agent and arbitrary Header keys |
| Counting algorithm     | Fixed window                          | Fixed window                          | Fixed window, Token bucket                           |
| Counting window        | Minimum: **10s**, Maximum: **10mins** | Minimum: **10s**, Maximum: **10mins** | Minimum: **10s**, Maximum: **1hr**                   |
| Number of rules        | 1 per project                         | 40 per project | 250 per project |
| Included requests      | 1,000,000 Allowed requests            | Usage-based                           | Custom                                               |

Hobby projects can have one WAF Rate Limiting rule within their total of 3 [custom firewall rules](/docs/vercel-firewall/vercel-waf/custom-rules).

On the Pro plan, rate limiting rules in [Priority projects](/docs/vercel-firewall/priority-projects#rate-limiting-counting-keys) can also use the User Agent and Header counting keys. The Token bucket counting algorithm requires the Enterprise plan. Rate limiting rules count toward the project's custom rule limit, which is [higher for Priority projects](/docs/vercel-firewall/priority-projects#higher-firewall-limits).

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
