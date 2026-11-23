---
title: Rule Configuration Reference
product: vercel
url: /docs/vercel-firewall/vercel-waf/rule-configuration
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration"
last_updated: 2025-04-21
type: reference
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/regions
  - /docs/vercel-firewall/firewall-concepts
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/vercel-waf/rate-limiting
summary: List of configurable options with the Vercel WAF
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/rule-configuration.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "acb17a3c80a398ed04046cff5721c7363910ee86b24f9dcf8ef642aefb3de91d"
---

# Rule Configuration Reference

For each custom rule that you create, you can configure one or more conditions with [**parameters**](#parameters) from the incoming traffic that you compare with specific values using [**operators**](#operators). For each new condition, you can choose how you combine it with the previous condition using the **AND** (Both conditions need to be met) or the **OR** operator (One of the conditions need to be met).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Next.js Server Actions in the Vercel Firewall](https://vercel.com/changelog/manage-next-js-server-actions-in-the-vercel-firewall)
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Protect Sensitive Routes with Vercel WAF: Challenge and Deny Rule Recipes](https://vercel.com/kb/guide/suspicious-traffic-in-specific-countries) — Use Vercel WAF custom rules to block or challenge unwanted traffic by country, ASN, IP address, user agent, path, or coo
- [WAF Custom Rules](https://vercel.com/docs/vercel-firewall/vercel-waf/custom-rules) — Learn how to add and manage custom rules to configure the Vercel Web Application Firewall \\(WAF\\).
- [WAF Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples) — Learn how to use Vercel WAF to protect your site in specific situations.
- [WAF Managed Rulesets](https://vercel.com/docs/vercel-firewall/vercel-waf/managed-rulesets) — Learn how to use WAF Managed Rulesets with the Vercel Web Application Firewall \\(WAF\\)
- [Returns activated WAF config](https://vercel.com/docs/rest-api/security/returns-activated-waf-config-2) — POST /v1/security/firewall/config/{configVersion}/activate — Promotes a draft WAF config to an active config
- [Rate Limiting SDK](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting-sdk) — Learn how to configure a custom rule with rate limit in your code.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md](/docs/vercel-firewall/vercel-waf/rule-configuration.graph.md)
<!-- /docsgraph:related -->

You also specify an [**action**](#actions) executed when all the conditions are met.

## Parameters

| Parameter | Description | Example | Note |
| --- | --- | --- | --- |
| Request Path | The full request path on the incoming request, always starting with a leading `/` | `/api`, `/signup/new` | |
| Route | The framework determined `x-matched-path` | `/blog/[slug]` | When matching on the route, the custom rule will run after middleware. If the rule blocks a request, middleware charges could be incurred |
| Server Action Name | The Next.js server action name as defined by your codebase | `app/auth/actions.ts#getUser` | Requires Next.js 15.5. When matching on the server action name, the custom rule will run after middleware. If the rule blocks a request, middleware charges could be incurred |
| Raw Path | The raw request path, ignoring any parsing or normalizing that might be done at the framework level | `/api/`, `/signup/new/` | |
| Method | The HTTP method used to make the request | `GET`, `POST` | |
| User Agent | The HTTP user agent used to make the request | `curl` | |
| Request Header | The request header on the original request. Define both the header key and value you want to match | | You cannot match headers set by middleware, as the rule runs before middleware is invoked |
| Query | Any incoming query parameter on the original request. Define both the query key and value you want to match | | |
| Cookie | Any incoming cookie on the original request. Define both the cookie key and value you want to match | | |
| Hostname | The hostname used for the incoming request | | This applies to projects with multiple domains such as platforms that assign a domain to each user of the platform |
| IP Address | The original or forwarded IP address on the incoming request | `10.0.0.1`, `10.0.0.1/32` | |
| Protocol | The HTTP protocol of the original request | `HTTP/1.1`, `HTTP/2.0` | |
| Scheme | The URL scheme of the incoming request | `http`, `https` | |
| Environment | The Vercel Environment that received this request | | Preview or Production |
| Vercel Region | The Vercel region that received this request | [Regions list](/docs/regions#region-list) | |
| Continent | The continent based on the client IP address | | A shorthand for the `x-vercel-ip-continent` header |
| State | The state (Country Region) based on the client IP address | | A shorthand for the `x-vercel-ip-country-region` header |
| Country | The country based on the client IP address | | A shorthand for the `x-vercel-ip-country` header |
| City | The city based on the client IP address | | A shorthand for the `x-vercel-ip-city` header |
| AS Number | The Autonomous System Number based on the client IP address | Digits only, e.g. `12345` | Digits only |
| JA3 Digest | The calculated TLS digest of the incoming request | | |
| JA4 Digest | The calculated TLS digest of the incoming request | | |
| @vercel/firewall | ID for a rate limit instrumented in code via the `@vercel/firewall` package | | |

## Operators

All operators are case insensitive.

| Parameter | Value | Description |
| --- | --- | --- |
| Equals | `eq` | An exact string match |
| Does not equal | `neq` | Inverse of **Equals** |
| Is any of | `inc` | • An exact string match, matching any of the provided values<br />• Acts like a `SQL IN` query |
| Is not any of | `ninc` | • Ensures the source is not a match with any of the provided values<br />• Acts like a `SQL NOT IN` query |
| Contains | `sub` | Includes the provided value |
| Does not contain | `sub` | Inverse of **Contains**. Set the `neg` parameter to `true` |
| Starts with | `pre` | • A string operator matching the start of the string<br />• Optimized for performance. It's preferred to use this over a regex prefix expression |
| Ends with | `suf` | • A string operator matching the end of the string<br />• Optimized for performance. It's preferred to use this over a regex suffix expression |
| Matches expression | `re` | • A PCRE ([Perl Compatible Regular Expression](https://www.pcre.org/)) compliant regular expression<br />• Useful for negative matches like “does not contain” or similar strict matching criteria |
| Does not match expression | `re` | Inverse of **Matches expression**. Set the `neg` parameter to `true` |
| Does not start with | `pre` | Inverse of **Starts with**. Set the `neg` parameter to `true` |
| Does not end with | `suf` | Inverse of **Ends with**. Set the `neg` parameter to `true` |
| Exists | `ex` | Checks that a request header, query parameter, or cookie key exists, regardless of its value |
| Does not exist | `ex` | Inverse of **Exists**. Set the `neg` parameter to `true` |

## Actions

| Name | Description | Note |
| --- | --- | --- |
| Log | Tracks the matching of this rule without blocking traffic. Requests matching this rule are visible in the Firewall overview page. | • If another rule blocks the traffic **before** a log rule executes, the request is not considered a match for that log rule<br />• If another rule blocks the traffic **after** a log rule executes, the request is tagged to the rule that blocked the traffic and does not appear in the log rule |
| Challenge | Conditionally blocks traffic with [browser challenge](/docs/vercel-firewall/firewall-concepts#challenge). | • If the client fails to solve the challenge, the rule continues to block the traffic<br />• Once the client solves the challenge, the rule is bypassed and remaining rules (if any) are evaluated. The request is allowed if none of the remaining rules block |
| Deny | Blocks the request and no further rules are evaluated. | |
| Bypass | If matched, it bypasses any remaining custom rules. | WAF bypass rules **do not** bypass system-level mitigations such as [DDoS Mitigation](/docs/vercel-firewall/ddos-mitigation). To do so, you can use the [Bypass System-level Mitigations](/docs/vercel-firewall/ddos-mitigation#bypass-system-level-mitigations) feature. |
| Redirect | If matched, it redirects the client to the target path set in the `to` field. | • Redirects the request and no further rules are evaluated<br />• The target path in the `to` field can be absolute or relative to the project deployment's root<br />• It's a temporary redirect (307) by default. To set a permanent redirect (301), use the Vercel CLI or the REST API |
| Rate Limit | Limits how many matching requests each source can send in a time window. By default, requests over the limit get a 429 response. | Review [WAF Rate Limiting](/docs/vercel-firewall/vercel-waf/rate-limiting) to configure the time window, the request limit, and the keys. |

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
