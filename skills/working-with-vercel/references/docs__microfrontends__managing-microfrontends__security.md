---
title: Security
product: vercel
url: /docs/microfrontends/managing-microfrontends/security
canonical_url: "https://vercel.com/docs/microfrontends/managing-microfrontends/security"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends/managing-microfrontends
  - /docs/microfrontends
related:
  - /docs/deployment-protection
  - /docs/vercel-firewall
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
summary: Learn about security on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/managing-microfrontends/security.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "b07492f0f0eaeaf866e90f008da650259b8342165e695bdf499b7ded821cf89c"
---

# Managing microfrontends security

Understand how and where you manage [Deployment Protection](/docs/deployment-protection) and [Vercel Firewall](/docs/vercel-firewall) for each microfrontend application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Overview](https://vercel.com/docs/security?from=related) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Getting Started](https://vercel.com/docs/microfrontends/quickstart?from=related) — Learn about getting started on Vercel.
- [Security](https://vercel.com/docs/cdn-security?from=related) — Learn how Vercel's CDN secures every request with HTTPS, TLS, DDoS mitigation, firewall protection, and security headers

Full cross-link map for this page: [/docs/microfrontends/managing-microfrontends/security.graph.md](/docs/microfrontends/managing-microfrontends/security.graph.md)
<!-- /docsgraph:related -->

- [Deployment Protection and microfrontends](#deployment-protection-and-microfrontends)
- [Vercel Firewall and microfrontends](#vercel-firewall-and-microfrontends)

## Deployment Protection and microfrontends

Because each URL is protected by the [Deployment Protection](/docs/deployment-protection) settings of the project it belongs to, the deployment protection for the microfrontend experience as a whole is determined by the **default application**.

For requests to a microfrontend host (a domain belonging to the microfrontend default application):

- Requests are **only** verified by the [Deployment Protection](/docs/deployment-protection) settings for the project of your **default application**

For requests directly to a child application (a domain belonging to a child microfrontend):

- Requests are **only** verified by the [Deployment Protection](/docs/deployment-protection) settings for the project of the **child application**

This applies to all [protection methods](/docs/deployment-protection/methods-to-protect-deployments) and [bypass methods](/docs/deployment-protection/methods-to-bypass-deployment-protection), including:

- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection)
- [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)
- [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links)
- [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation)
- [Deployment Protection Exceptions](/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions)
- [OPTIONS Allowlist](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist).

### Managing Deployment Protection for your microfrontend

Use the [Deployment Protection](/docs/deployment-protection) settings for the project of the default application to control access to the microfrontend.

We recommend the following configuration:

- **Default app**: Use [Standard Protection](/docs/deployment-protection) so that end users can access the microfrontend through the default app's URL.
- **Child apps**: Enable [protection for all deployments](/docs/deployment-protection) so that child apps are not directly accessible. Since child app content is served through the default app's URL, child apps can only be accessed via the URL of the default project.

This works because Vercel handles routing to child apps within a single request at the network layer — as explained in [Path Routing](/docs/microfrontends/path-routing) — it is not a rewrite that would result in a separate request to the child app's URL. Deployment protection on the child app therefore applies only when the child app's URL is accessed directly.

## Vercel Firewall and microfrontends

- The [Platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) is applied to all requests.
- The customizable [Web Application Firewall (WAF)](/docs/vercel-firewall/vercel-waf) from the default application and the corresponding child application is applied for a request.

### Vercel WAF and microfrontends

For requests to a microfrontend host (a domain belonging to the microfrontend default application):

- All requests are verified by the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the project of your default application
- Requests to child applications are **additionally** verified by the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for their project

For requests directly to a child application (a domain belonging to a child microfrontend):

- Requests are **only** verified by the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the project of the child application.

This applies for the entire [Vercel WAF](/docs/vercel-firewall/vercel-waf), including [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules), [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets), and [Attack Mode](/docs/vercel-firewall/attack-mode).

### Managing the Vercel WAF for your microfrontend

- To set a WAF rule that applies to all requests to a microfrontend, use the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for your default application.

- To set a WAF rule that applies **only** to requests to paths of a child application, use the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the child project.


---

[View full sitemap](/docs/sitemap)
