---
title: BotID
product: vercel
url: /docs/botid
canonical_url: "https://vercel.com/docs/botid"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/botid/get-started
  - /docs/botid/verified-bots
  - /docs/vercel-firewall/firewall-observability
  - /docs/observability/observability-plus
  - /docs/botid/advanced-configuration
summary: Protect your applications from automated attacks with intelligent bot detection and verification, powered by Kasada.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/botid.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "294a0c70e1e310850e010e5f5d7054bd87ad7e6d73c5aca13ec7edc568a74ea6"
---

# BotID

> **🔒 Permissions Required**: BotID

[Vercel BotID](/botid) is an invisible CAPTCHA that protects against sophisticated bots without showing visible challenges or requiring user action. It's a client-side challenge that uses machine learning to distinguish between humans and bots. It adds a protection layer to high-value routes, such as checkouts, signups, and APIs, that are common targets for bots imitating real users.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — Gate every request to your AI endpoints with Vercel BotID and checkBotId\\(\\) so inference runs only for verified callers
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — This guide gives an overview on Vercel BotID and how to deploy and test it in production
- [Improved fake hardware detection with Vercel BotID](https://vercel.com/changelog/botid-deep-analysis-model-improved-for-fake-hardware-detection?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related)
- [Vercel BotID now  available for all frameworks](https://vercel.com/changelog/botid-now-available-for-all-frameworks?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related)
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related)
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related)
- [Application authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — Secure application authentication on Vercel across layers: proxy checks, the Data Access Layer, PPR-safe rendering, and
- [Building AI apps on Vercel: an overview](https://vercel.com/kb/guide/how-to-build-ai-app?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — Learn the key AI concepts and tools for building and scaling AI apps.
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Proxy](https://docs.vercel.shop/docs/anatomy/proxy?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — How the storefront assigns Shopify-owned routes while leaving application routes available to Next.js.
- [Shop Configuration](https://docs.vercel.shop/docs/reference/shop-config?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related) — Configure storefront identity, analytics, and cross-cutting feature availability.
- [Billions of requests: Black Friday-Cyber Monday 2025](https://vercel.com/blog/bfcm-2025?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/botid.graph.md](/docs/botid.graph.md?from=related&source_path=%2Fdocs%2Fbotid&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Sophisticated bots are designed to closely mimic real user behavior. They can run JavaScript, solve CAPTCHAs, and navigate interfaces in ways that closely resemble humans. Tools like **Playwright** and **Puppeteer** automate these sessions, simulating actions from page load to form submission. These bots aim to blend in with normal traffic, making detection difficult and mitigation costly.

### Resources

- [Getting Started](/docs/botid/get-started) - Setup guide with complete code examples
- [Verified Bots](/docs/botid/verified-bots) - Information about verified bots and their handling
- [Bypass BotID](#bypassing-botid) - Configure bypass rules for BotID detection

## Validation flow

BotID validates clients with these steps:

1. A **client-side challenge** is sent to the browser.
2. The **browser** solves the challenge and includes the solution in requests to your high-value endpoint.
3. Your **server-side code** calls `checkBotId()`
4. **Vercel** validates the integrity of the challenge response.
5. **Deep Analysis** uses a machine learning model to analyze the client side signals, if configured.
6. The **server-side code** receives the analysis result, where the application can take action.

## Check levels

BotID can be configured to run at one of two levels, **Basic** or **Deep Analysis**. Deep Analysis runs only after the Basic validation has passed.

### Basic

The **Basic** level validates the integrity and correctness of the challenge response, catching many less sophisticated bots. It is provided free of charge for all plans.

### Deep Analysis

BotID includes **Deep Analysis**, powered by [Kasada](https://www.kasada.io/). Kasada is a leading bot protection provider trusted by Fortune 500 companies and global enterprises. It delivers advanced bot detection and anti-fraud capabilities while respecting user privacy and adapting to new bot behaviors in real-time.

Deep Analysis uses machine learning to analyze thousands of client side signals to further detect bots, in addition to the basic validation.

Deep Analysis provides real-time protection against:

- **Automated attacks**: Shield your application from credential stuffing, brute force attacks, and other automated threats
- **Data scraping**: Prevent unauthorized data extraction and content theft
- **API abuse**: Protect your endpoints from excessive automated requests
- **Spam and fraud**: Block malicious bots while allowing legitimate traffic through
- **Expensive resources**: Prevent bots from consuming expensive infrastructure, bandwidth, compute, or inventory

Deep Analysis counters the most advanced bots by:

1. Silently collecting thousands of signals that distinguish human users from bots
2. Changing detection methods on every page load to prevent reverse engineering and sophisticated bypasses
3. Streaming attack data to a global machine learning system that improves protection for all customers

## Pricing

| Mode          | Plans Available | Price                                      |
| ------------- | --------------- | ------------------------------------------ |
| Basic         | All Plans       | Free                                       |
| Deep Analysis | Pro             | $1/1000 `checkBotId()` Deep Analysis calls |
| Deep Analysis | Enterprise      | Custom                                     |

> **💡 Note:** Calling the `checkBotId()` function in your code triggers BotID Deep Analysis
> charges. Passive page views or requests that don't invoke the `checkBotId()`
> function are not charged.

## Bypassing BotID

You can add a bypass rule to the [Vercel WAF](https://vercel.com/docs/vercel-firewall/firewall-concepts#bypass) to let through traffic that would have otherwise been detected as a bot by BotID.

## BotID observability

You can view BotID checks by selecting BotID on the firewall traffic dropdown filter of the [Firewall tab](/docs/vercel-firewall/firewall-observability#traffic) of a project.

Metrics are also available in [Observability Plus](/docs/observability/observability-plus).

## More resources

- [Advanced configuration](/docs/botid/advanced-configuration) - Fine-grained control over detection levels and backend domains
- [Form submissions](/docs/botid/form-submissions) - Handling form submissions with BotID protection
- [Local Development Behavior](/docs/botid/local-development-behavior) - Testing BotID in development environments


---

[View full sitemap](/docs/sitemap)
