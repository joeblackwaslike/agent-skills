---
title: Using the REST API with the Firewall
product: vercel
url: /docs/vercel-firewall/firewall-api
canonical_url: "https://vercel.com/docs/vercel-firewall/firewall-api"
last_updated: 2025-11-25
type: how-to
prerequisites:
  - /docs/vercel-firewall
related:
  - /docs/rest-api
  - /docs/rest-api/security/create-system-bypass-rule
  - /docs/rest-api/security/update-firewall-configuration
  - /docs/rest-api/sdk
  - /docs/rest-api/security/update-attack-challenge-mode
summary: Learn how to interact with the security endpoints of the Vercel REST API programmatically.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/firewall-api.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "743d75cb99a861e807ee63f165e9dabeb01e9992c722b989e4d70b5aa908b5d6"
---

# Using the REST API with the Firewall

The security section of the [Vercel REST API](/docs/rest-api) allows you to programmatically interact with some of the functionality of the Vercel Firewall such as [creating a system bypass rule](/docs/rest-api/security/create-system-bypass-rule) and [updating your Vercel WAF rule configuration](/docs/rest-api/security/update-firewall-configuration).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Examples](https://vercel.com/docs/vercel-firewall/vercel-waf/examples?from=related) — Learn how to use Vercel WAF to protect your site in specific situations.
- [Read Firewall Configuration](https://vercel.com/docs/rest-api/security/read-firewall-configuration?from=related)
- [Web Application Firewall](https://vercel.com/docs/vercel-firewall/vercel-waf?from=related) — Learn how to secure your website with the Vercel Web Application Firewall \(WAF\)
- [Put Firewall Configuration](https://vercel.com/docs/rest-api/security/put-firewall-configuration?from=related)
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.

Full cross-link map for this page: [/docs/vercel-firewall/firewall-api.graph.md](/docs/vercel-firewall/firewall-api.graph.md)
<!-- /docsgraph:related -->

You can use the REST API programmatically as follows:

- Install the [Vercel SDK](/docs/rest-api/sdk) and use the [security methods](https://github.com/vercel/sdk/blob/HEAD/docs/sdks/security/README.md).
- [Call the endpoints directly](/docs/rest-api) and use the [security endpoints](/docs/rest-api/security/update-attack-challenge-mode).

To define firewall rules in code that apply across multiple projects, you can use the [Vercel Terraform provider](https://registry.terraform.io/providers/vercel/vercel/latest).

After [setting up Terraform](/kb/guide/integrating-terraform-with-vercel), you can use the following rules:

- [vercel\_firewall\_config](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_config)
- [vercel\_firewall\_bypass](https://registry.terraform.io/providers/vercel/vercel/latest/docs/resources/firewall_bypass)

## Examples

Learn how to use some of these endpoints with specific examples for the Vercel WAF.

- [Challenge `cURL` requests](/kb/guide/challenge-curl-requests)
- [Challenge cookieless requests on a specific path](/kb/guide/challenge-cookieless-requests-on-a-specific-path)
- [Deny non-browser traffic or blocklisted ASNs](/kb/guide/deny-non-browser-traffic-or-blocklisted-asns)
- [Deny traffic from a set of IP addresses](/kb/guide/deny-traffic-from-a-set-of-ip-addresses)
- [Vercel Firewall Terraform configuration](/kb/guide/firewall-terraform-configuration)


---

[View full sitemap](/docs/sitemap)
