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
source: "https://vercel.com/docs/security.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "3d28a8318cd0e30d9df1d3f39afa32ad84ec64aead745763431d03f63dddf818"
---

# Vercel security overview

Cloud-deployed web applications face constant security threats, with attackers launching millions of malicious attacks weekly. Your application, users, and business require robust security measures to stay protected.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Is Vercel certified under DPF?](https://vercel.com/kb/guide/is-vercel-certified-under-dpf?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — The EU-U.S. Data Privacy Framework \\(DPF\\) enables secure data transfers from the EU, UK, and Switzerland to the U.S. Ve
- [PCI compliance for ecommerce](https://vercel.com/blog/pci-compliance-for-ecommerce-teams?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related)
- [The Frontend Cloud: Powering resiliency for global web applications](https://vercel.com/blog/the-resiliency-of-the-frontend-cloud?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Vercel security roundup: improved bot defenses, DoS mitigations, and insights](https://vercel.com/blog/vercel-security-roundup-improved-bot-defenses-dos-mitigations-and-insights?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [Life of a Vercel request: Securing your app's traffic with Vercel](https://vercel.com/blog/life-of-a-request-securing-your-apps-traffic-with-vercel?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Vercel security roundup: Faster defenses and better visibility for your apps](https://vercel.com/blog/vercel-security-roundup-faster-defenses-and-better-visibility-for-your-apps?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related)
- [Vercel Firewall](https://vercel.com/docs/vercel-firewall?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [CDN security](https://vercel.com/docs/cdn-security?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Security](https://vercel.com/docs/vercel-blob/security?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=related) — Learn how your Vercel Blob store is secured

Full cross-link map for this page: [/docs/security.graph.md](/docs/security.graph.md?from=related&source_path=%2Fdocs%2Fsecurity&source_site=vercel-docs&relationship=graph)
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


---

[View full sitemap](/docs/sitemap)
