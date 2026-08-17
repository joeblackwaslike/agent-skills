---
title: CDN security
product: vercel
url: /docs/cdn-security
canonical_url: "https://vercel.com/docs/cdn-security"
last_updated: 2026-03-05
type: conceptual
prerequisites:
  []
related:
  - /docs/cdn-security/encryption
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/vercel-firewall/vercel-waf/managed-rulesets
summary: "Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cdn-security.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1e90035bcafd33b4d12f14a4833f3e0669c350fbf3a27a82b4c278ea3a2e365d"
---

# CDN security

Vercel's CDN applies multiple layers of security to every incoming request before it reaches your application. Encryption, firewall protection, and DDoS mitigation all happen at the CDN level, so your deployments are protected by default.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel as a Standalone CDN](https://vercel.com/kb/guide/using_vercel_as_a_cdn?from=related) — Use Vercel's external rewrites to proxy and cache content from external websites or APIs through Vercel's global edge ne
- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [How Vercel CDN works](https://vercel.com/docs/how-vercel-cdn-works?from=related) — Learn how Vercel's CDN processes requests through routing, caching, and compute layers to deliver your content with low
- [Overview](https://vercel.com/docs/cdn?from=related) — Vercel's CDN is a globally distributed platform that handles routing, caching, security, and compression for every deplo
- [Firewall](https://vercel.com/docs/vercel-firewall?from=related) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Security](https://vercel.com/docs/vercel-blob/security?from=related) — Learn how your Vercel Blob store is secured

Full cross-link map for this page: [/docs/cdn-security.graph.md](/docs/cdn-security.graph.md)
<!-- /docsgraph:related -->

## Encryption and TLS

Vercel serves every deployment over HTTPS and automatically provisions SSL certificates for all deployment URLs and custom domains. The CDN forwards HTTP requests to HTTPS with a `308` status code.

The CDN supports TLS 1.2 and TLS 1.3 with strong cipher suites that provide [forward secrecy](https://en.wikipedia.org/wiki/Forward_secrecy). TLS session resumption reduces Time to First Byte (TTFB) for returning visitors, and [OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) speeds up certificate validation for first-time visitors.

Vercel also supports post-quantum cryptography through the `X25519MLKEM768` key exchange mechanism. This protects your deployments against future quantum computing attacks in Chrome 131+, Firefox 132+, and Safari 26+.

The CDN also supports [Encrypted Client Hello (ECH)](/docs/cdn-security/encryption#encrypted-client-hello-ech), which encrypts the hostname in the TLS handshake so network observers can't see which site a visitor connects to. Vercel manages ECH automatically, with nothing to configure.

- [Encryption & TLS details](/docs/cdn-security/encryption)

## Supported protocols

The CDN negotiates the following protocols through [ALPN](https://tools.ietf.org/html/rfc7301):

- [HTTPS](https://en.wikipedia.org/wiki/HTTPS)
- [HTTP/1.1](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol)
- [HTTP/2](https://en.wikipedia.org/wiki/HTTP/2)

## Firewall protection

The Vercel Firewall inspects every request as it arrives at the CDN, before it reaches your application. It operates in three layers: [platform-wide firewall](#platform-wide-firewall), [Web Application Firewall (WAF)](#web-application-firewall-waf), and [bot management](#bot-management).

### Platform-wide firewall

All Vercel customers get an enterprise-grade firewall at no cost. It runs automatically and includes DDoS mitigation and protection against low-quality traffic. You don't need to configure anything.

- [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation)

### Web Application Firewall (WAF)

You can configure custom rules, managed rulesets, and traffic challenges at the project level. The WAF lets you block, challenge, or log requests based on IP, path, headers, geographic location, and other attributes.

- [WAF overview](/docs/vercel-firewall/vercel-waf)
- [Custom rules](/docs/vercel-firewall/vercel-waf/custom-rules)
- [Managed rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets)

### Bot management

Vercel classifies incoming traffic to separate legitimate bots from automated threats. You can challenge non-browser traffic, control AI crawlers, and allow verified bots like search engines to pass through unchallenged.

- [Bot management](/docs/bot-management)
- [Firewall observability](/docs/vercel-firewall/firewall-observability)

## Security headers

You can configure HTTP security headers to protect visitors from common web vulnerabilities. Vercel applies HSTS automatically on `.vercel.app` domains and custom domains.

Headers you can configure:

- **Content-Security-Policy (CSP)**: Restrict which sources can load scripts, images, and other resources to prevent cross-site scripting (XSS).

- **Strict-Transport-Security (HSTS)**: Tell browsers to always connect over HTTPS.

- **X-Frame-Options**: Prevent your pages from being embedded in iframes to block clickjacking.

- **X-Content-Type-Options**: Stop browsers from MIME-type sniffing responses.

- [Security headers](/docs/cdn-security/security-headers)

## HSTS

The `.vercel.app` domain and all subdomains support HSTS by default and are preloaded in browser HSTS lists. Custom domains also use HSTS. You can modify the `Strict-Transport-Security` header in your project's [response headers configuration](/docs/headers/response-headers).

- [HSTS details](/docs/cdn-security/encryption#support-for-hsts)


---

[View full sitemap](/docs/sitemap)
