---
title: Vercel security overview
product: vercel
url: /docs/security
canonical_url: "https://vercel.com/docs/security"
last_updated: 2026-06-16
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ea157046351e364b9039547eacad7c796d22b2a6cb67324aec9a5a7064c02a8d"
---

# Vercel security overview

Cloud-deployed web applications face constant security threats, with attackers launching millions of malicious attacks weekly. Your application, users, and business require robust security measures to stay protected.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [HIPAA Compliance on Vercel](https://vercel.com/kb/guide/hipaa-compliance-guide-vercel?from=related) — Deploy HIPAA-compliant healthcare apps on Vercel with built-in security, BAAs, and scalable serverless infrastructure.
- [How to Utilize Vercel’s Bot Management Features](https://vercel.com/kb/guide/how-to-utilize-vercels-bot-management-features?from=related) — A practical, step-by-step guide to identifying unwanted automated traffic and securing your Vercel apps with Bot Protect
- [Is Vercel certified under DPF?](https://vercel.com/kb/guide/is-vercel-certified-under-dpf?from=related) — The EU-U.S. Data Privacy Framework \(DPF\) enables secure data transfers from the EU, UK, and Switzerland to the U.S. Ve
- [Ensuring safe and effective infrastructure testing](https://vercel.com/kb/guide/ensuring-safe-and-effective-infrastructure-testing?from=related) — We conduct regular penetration testing through certified third-party assessors to secure the Vercel platform. This guide
- [Firewall](https://vercel.com/docs/vercel-firewall?from=related) — Learn how Vercel Firewall helps protect your applications and websites from malicious attacks and unauthorized access.
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Security](https://vercel.com/docs/vercel-blob/security?from=related) — Learn how your Vercel Blob store is secured

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


---

[View full sitemap](/docs/sitemap)
