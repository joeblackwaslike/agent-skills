---
title: Managing microfrontends security
product: vercel
url: /docs/microfrontends/managing-microfrontends/security
canonical_url: "https://vercel.com/docs/microfrontends/managing-microfrontends/security"
last_updated: 2018-10-20
type: how-to
prerequisites:
  - /docs/microfrontends/managing-microfrontends
  - /docs/microfrontends
related:
  - /docs/deployment-protection
  - /docs/vercel-firewall
  - /docs/microfrontends/routing
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
summary: Learn how to manage your Deployment Protection and Firewall for your microfrontend on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/microfrontends/managing-microfrontends/security.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "f3d67b338d2b59eefa01994ffdbaa56bd6dc676ae99d3634ee2502bf2d776d3a"
---

# Managing microfrontends security

Understand how and where you manage [Deployment Protection](/docs/deployment-protection) and [Vercel Firewall](/docs/vercel-firewall) for each microfrontend application.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting started with microfrontends](https://vercel.com/docs/microfrontends/quickstart) — Learn how to get started with microfrontends on Vercel.
- [Testing & troubleshooting microfrontends](https://vercel.com/docs/microfrontends/troubleshooting) — Learn about testing, common issues, and how to troubleshoot microfrontends on Vercel.
- [Microfrontends Configuration](https://vercel.com/docs/microfrontends/configuration) — Configure your microfrontends.json.
- [Microfrontends local development](https://vercel.com/docs/microfrontends/local-development) — Learn how to run and test your microfrontends locally.
- [Vercel security overview](https://vercel.com/docs/security) — Vercel provides built-in and customizable features to ensure that your site is secure.

Full cross-link map for this page: [/docs/microfrontends/managing-microfrontends/security.graph.md](/docs/microfrontends/managing-microfrontends/security.graph.md)
<!-- /docsgraph:related -->

Every domain in a microfrontends group uses [microfrontends routing](/docs/microfrontends/routing#domains-that-use-microfrontends-routing), whichever project it belongs to. This includes production domains, branch URLs, and deployment URLs of child applications. On these domains, the default application's security settings protect the whole microfrontend. The only exception is a [child application with Microfrontends Routing disabled](#child-applications-with-microfrontends-routing-disabled).

- [Deployment Protection and microfrontends](#deployment-protection-and-microfrontends)
- [Vercel Firewall and microfrontends](#vercel-firewall-and-microfrontends)
- [Child applications with Microfrontends Routing disabled](#child-applications-with-microfrontends-routing-disabled)

## Deployment Protection and microfrontends

Requests to every path are **only** verified by the following [Deployment Protection](/docs/deployment-protection) settings of the **default application**, including paths served by a child application and requests to a child application's domain:

- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection)
- [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)
- [OPTIONS Allowlist](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist)

For paths served by a child application, Vercel accepts the [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) secrets of both the default application and the child application. For paths served by the default application, Vercel only accepts the default application's secrets.

A child application's Deployment Protection settings don't restrict access to its paths. Vercel routes to child applications within a single request at the network layer, as explained in [routing](/docs/microfrontends/routing). It is not a rewrite that results in a separate request to the child application's URL.

### Managing Deployment Protection for your microfrontend

Use the [Deployment Protection](/docs/deployment-protection) settings for the project of the default application to control access to the microfrontend. Choose the protection level you want for the whole microfrontend. For example, use [Standard Protection](/docs/deployment-protection) so that end users can access production domains while preview deployments stay protected.

### Passport and microfrontends

[Passport](/docs/passport) is configured on the default application, and its configuration protects every path on every domain in the group. Child applications cannot have an independent Passport connection while they belong to the group. To configure Passport on the child project, remove it from the group first.

The default application handles the `/.well-known/vercel/passport/callback` request before application routing, so neither application needs to implement the callback path.

## Vercel Firewall and microfrontends

- The [Platform-wide firewall](/docs/vercel-firewall#platform-wide-firewall) is applied to all requests.
- The customizable [Web Application Firewall (WAF)](/docs/vercel-firewall/vercel-waf) from the default application, and from the child application that serves the path, is applied for a request.

### Vercel WAF and microfrontends

For requests to any domain in the group:

- All requests are verified by the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the project of your default application
- Requests to paths served by a child application are **additionally** verified by the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the child's project
- Requests to paths served by the default application are **only** verified by the default application's [Vercel WAF](/docs/vercel-firewall/vercel-waf), even on a child application's domain

This applies for the entire [Vercel WAF](/docs/vercel-firewall/vercel-waf), including [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules), [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking), [WAF Managed Rulesets](/docs/vercel-firewall/vercel-waf/managed-rulesets), and [Attack Mode](/docs/vercel-firewall/attack-mode).

### Managing the Vercel WAF for your microfrontend

- To set a WAF rule that applies to all requests to a microfrontend, use the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for your default application.

- To set a WAF rule that applies **only** to requests to paths of a child application, use the [Vercel WAF](/docs/vercel-firewall/vercel-waf) for the child project.

## Child applications with Microfrontends Routing disabled

When a child application's **Microfrontends Routing** setting is disabled, its domains serve every path from the child application and don't route through the group. Requests to those domains are **only** verified by the child application's settings:

- [Deployment Protection](/docs/deployment-protection), including all protection and bypass methods
- [Vercel WAF](/docs/vercel-firewall/vercel-waf)

The default application's Passport configuration doesn't apply to these domains. Protect them with another [Deployment Protection method](/docs/deployment-protection/methods-to-protect-deployments).

To check the setting, open the child application's project, select **Settings**, then **Microfrontends**.

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
