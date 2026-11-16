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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/botid.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "2f745ee21bd93f63e5f0e522bbc57cc69fb255c34bcaa04d3fafea6d098cb847"
---

# BotID

> BotID is available on all plans

[Vercel BotID](/botid) is an invisible CAPTCHA that protects against sophisticated bots without showing visible challenges or requiring user action. It's a client-side challenge that uses machine learning to distinguish between humans and bots. It adds a protection layer to high-value routes, such as checkouts, signups, and APIs, that are common targets for bots imitating real users.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [​Introducing BotID, invisible bot filtering for critical routes](https://vercel.com/blog/introducing-botid)
- [Vercel BotID is now generally available](https://vercel.com/changelog/vercel-botid-is-now-generally-available)
- [Improved fake hardware detection with Vercel BotID](https://vercel.com/changelog/botid-deep-analysis-model-improved-for-fake-hardware-detection)
- [Vercel BotID now  available for all frameworks](https://vercel.com/changelog/botid-now-available-for-all-frameworks)
- [Vercel BotID now leverages Vercel's verified bot directory](https://vercel.com/changelog/vercel-botid-now-leverages-vercels-verified-bot-directory)
- [Application authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel) — Secure application authentication on Vercel across layers: proxy checks, the Data Access Layer, PPR-safe rendering, and
- [Deploy a Shopify storefront with an AI assistant](https://vercel.com/kb/guide/deploy-shopify-ai-storefront) — Deploy an eve shopping agent with Vercel Shop to find Shopify products, manage carts, and answer store questions.
- [How to handle order-ahead traffic spikes on Vercel](https://vercel.com/kb/guide/handle-order-ahead-traffic-spikes-on-vercel) — Order-ahead traffic spikes hit the same routes every lunch hour. Learn how to scale, cache, queue, and test a restaurant
- [How to effectively load test your application on Vercel](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Introduction](https://vercel.shop/docs) — What Vercel Shop is, what you get out of the box, and how it fits Shopify's new Hydrogen.
- [Shop Configuration](https://vercel.shop/docs/reference/shop-config) — Choose optional storefront features and set your store's identity and locale.

Full cross-link map for this page: [/docs/botid.graph.md](/docs/botid.graph.md)
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
- [Verify visitors on page load](/docs/botid/verify-on-page-load) - Reuse an earlier verification with a short-lived signed cookie
- [Form submissions](/docs/botid/form-submissions) - Handling form submissions with BotID protection
- [Local Development Behavior](/docs/botid/local-development-behavior) - Testing BotID in development environments

## Related guides

- [Vercel BotID vs Cloudflare Turnstile](https://vercel.com/kb/guide/vercel-botid-vs-cloudflare-turnstile): Compare Vercel BotID and Cloudflare Turnstile for bot protection, including detection model, hosting requirements, checkBotId() vs Siteverify, framework support, and pricing.
- [How to protect your AI endpoints with Vercel BotID](https://vercel.com/kb/guide/protect-ai-endpoints-with-vercel-botid): Gate every request to your AI endpoints with Vercel BotID and checkBotId() so inference runs only for verified callers. Covers setup, Deep Analysis, and verified bots.
- [How to use Vercel’s Bot Management features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features): A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protection Managed Rules, AI Bots Managed Rules, BotID, and custom WAF rules. Learn how to enable, monitor, and tune protections to block bad bots, preserve performance for real users, and safely allow good crawlers.
- [Deploying and testing BotID](https://vercel.com/kb/guide/deploying-and-testing-botid): This guide gives an overview on Vercel BotID and how to deploy and test it in production

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
