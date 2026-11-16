---
title: Vercel security overview
product: vercel
url: /docs/security
canonical_url: "https://vercel.com/docs/security"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/security/compliance
  - /docs/security/shared-responsibility
  - /docs/cdn-security/encryption
  - /docs/vercel-firewall/firewall-concepts
  - /docs/security/access-control
summary: Vercel provides built-in and customizable features to ensure that your site is secure.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/security.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "55cf1dece6a997d7b8cf35cf4a6911687a09cf3754c4f844a2ad194e218c531b"
---

# Vercel security overview

Cloud-deployed web applications face constant security threats, with attackers launching millions of malicious attacks weekly. Your application, users, and business require robust security measures to stay protected.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to use Vercel’s Bot Management features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [PCI compliance for ecommerce](https://vercel.com/blog/pci-compliance-for-ecommerce-teams)
- [The Frontend Cloud: Powering resiliency for global web applications](https://vercel.com/blog/the-resiliency-of-the-frontend-cloud)
- [Vercel security roundup: Faster defenses and better visibility for your apps](https://vercel.com/blog/vercel-security-roundup-faster-defenses-and-better-visibility-for-your-apps)
- [Vercel security roundup: improved bot defenses, DoS mitigations, and insights](https://vercel.com/blog/vercel-security-roundup-improved-bot-defenses-dos-mitigations-and-insights)
- [Introducing Vercel Firewall and Vercel Secure Compute](https://vercel.com/blog/vercel-security)
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [CDN security](https://vercel.com/docs/cdn-security) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Managing microfrontends security](https://vercel.com/docs/microfrontends/managing-microfrontends/security) — Learn how to manage your Deployment Protection and Firewall for your microfrontend on Vercel.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.

Full cross-link map for this page: [/docs/security.graph.md](/docs/security.graph.md)
<!-- /docsgraph:related -->

A comprehensive security strategy requires active protection, robust policies, and compliance frameworks:

- [Security governance and policies](#governance-and-policies) ensure long-term organizational safety, maintain regulatory adherence, and establish consistent security practices across teams.
- A [Multi-layered protection](#multi-layered-protection) system provides active security against immediate threats and attacks.

## Governance and policies

### Compliance measures

Learn about the [protection and compliance measures](/docs/security/compliance) Vercel takes to ensure the security of your data, including DDoS mitigation, SOC2 Type 2 compliance, Data encryption, and more.

### Shared responsibility model

A [shared responsibility model](/docs/security/shared-responsibility) is a framework designed to split tasks and obligations between two groups in cloud computing. The model divides duties to ensure security, maintenance, and service functionality.

### Encryption

Out of the box, Vercel serves every deployment over an [HTTPS connection](/docs/cdn-security/encryption). Vercel automatically generates SSL certificates for these unique URLs free of charge.

## Multi-layered protection

Understand how Vercel protects every incoming request with [multiple layers](/docs/vercel-firewall/firewall-concepts#how-vercel-secures-requests) of firewall and deployment protection. To restrict who can view your preview and production deployments, see the [access control](/docs/security/access-control) options: Password protection and Vercel Authentication.

### Vercel firewall

The Vercel firewall helps to protect your applications and websites from malicious attacks and unauthorized access through:

- An enterprise-grade platform-wide firewall available for free for all customers with no configuration required that includes automatic [DDoS mitigation](/docs/vercel-firewall/ddos-mitigation) and protection against low quality traffic.
- A [Web Application Firewall (WAF)](/docs/vercel-firewall/vercel-waf) that supports custom rules, managed rulesets, and allows customers to challenge automated traffic. You can customize the WAF at the project level.
- [Observability](/docs/vercel-firewall/firewall-observability) into network traffic and firewall activity, including the access to firewall logs.

### Security Review

[Security Review](/docs/agent/security-review) scans your code for security vulnerabilities and reports findings in the Vulnerabilities dashboard, so you can fix issues in your own code before they reach your users.

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
