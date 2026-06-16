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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "5861a9c4647751ed66f20731adbc25dc64288d176435449cdd6322552a61bdb0"
---

# CDN security

Vercel's CDN applies multiple layers of security to every incoming request before it reaches your application. Encryption, firewall protection, and DDoS mitigation all happen at the CDN level, so your deployments are protected by default.

## Encryption and TLS

Vercel serves every deployment over HTTPS and automatically provisions SSL certificates for all deployment URLs and custom domains. The CDN forwards HTTP requests to HTTPS with a `308` status code.

The CDN supports TLS 1.2 and TLS 1.3 with strong cipher suites that provide [forward secrecy](https://en.wikipedia.org/wiki/Forward_secrecy). TLS session resumption reduces Time to First Byte (TTFB) for returning visitors, and [OCSP stapling](https://en.wikipedia.org/wiki/OCSP_stapling) speeds up certificate validation for first-time visitors.

Vercel also supports post-quantum cryptography through the `X25519MLKEM768` key exchange mechanism. This protects your deployments against future quantum computing attacks in Chrome 131+, Firefox 132+, and Safari 26+.

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
