---
title: Restrict deployment access by IP address
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips"
last_updated: 2026-07-27
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection
related:
  - /docs/project-configuration/project-settings
  - /docs/errors
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
summary: Trusted IPs let you restrict access to your deployments to a list of allowed IP addresses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "144e719cdf51af01b6d1d58b43c174247d7a1c12aabe1ea6c1ea0f72888bc23c"
---

# Restrict deployment access by IP address

> **🔒 Permissions Required**: Trusted IPs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application?from=related) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Using Self-hosted & Reverse Proxies with Vercel](https://vercel.com/kb/guide/how-to-setup-verified-proxy?from=related) — Learn about using self-hosted or reverse proxies with Vercel deployments.
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Fastly](https://vercel.com/kb/guide/vercel-vs-fastly?from=related) — A detailed guide to Vercel vs Fastly: full-stack application platform vs edge infrastructure layer, covering framework s
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [OPTIONS Allowlist](https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist?from=related) — Learn how to disable Deployment Protection for CORS preflight requests for a list of paths.
- [Getting Started](https://vercel.com/docs/networking/static-ips/getting-started?from=related) — Learn how to set up Static IPs for your Vercel projects to connect to IP-restricted backend services.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access?from=related) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [Security](https://vercel.com/docs/microfrontends/managing-microfrontends/security?from=related) — Learn about security on Vercel.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments/trusted-ips.graph.md](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips.graph.md)
<!-- /docsgraph:related -->

With Trusted IPs [enabled](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips#manage-trusted-ips) at the level of your [project](/docs/project-configuration/project-settings), only visitors from an allowed IP address can access your deployment. The deployment URL will return `404` [No Deployment Found](/docs/errors#404:-deployment_not_found) for all other requests. Trusted IPs is configured by specifying a list of IPv4 addresses and IPv4 CIDR ranges.

Trusted IPs works well if you access Vercel deployments through a specific IP address. For example, you can limit preview deployment access to your VPN. You can also enable Trusted IPs in production to restrict incoming access to only requests through your external proxy.

![Image](https://vercel.com/front/docs/security/trusted-ips-dash-light.png)

## What to know before enabling Trusted IPs

The tables below outline key considerations and security implications when using Trusted IPs for your deployments on Vercel.

### General considerations

| Consideration             | Description                                                                                                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Environment Configuration | Can be enabled for different environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)                                                                                           |
| Compatibility             | Operates as a required layer on top of [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).          |
| Bypass Methods            | Can be bypassed using [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) and [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) |
| IP Address Support        | Supports IPv4 addresses and IPv4 CIDR ranges                                                                                                                                                                                                                                           |

### Prerequisites

| Consideration                    | Description                                                                                                                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Preview Environment Requirements | Can only be enabled in preview when [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) is also enabled.                  |
| External Proxy Configuration     | Requires [shared rules](/kb/guide/can-i-use-a-proxy-on-top-of-my-vercel-deployment) configuration to avoid blocking proxy IPs. [Contact our sales team for more information](/contact/sales) |

### Security implications

| Consideration         | Description                                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Firewall Precedence   | [Vercel Firewall](/docs/vercel-firewall) takes precedence over Trusted IPs                                                |
| IP Blocking           | IPs or CIDRs listed in [IP Blocking](/docs/vercel-firewall/vercel-waf/ip-blocking) will be blocked even if listed in Trusted IPs |
| DDoS Mitigation       | Trusted IPs do not bypass [DDoS Mitigation](/docs/vercel-firewall/ddos-mitigation) unless configured                             |
| Deployment Impact     | Changing the Trusted IPs list affects all deployments                                                                     |
| Disabling Trusted IPs | Disabling makes all existing deployments accessible from any IP                                                           |

## Manage Trusted IPs

You can manage Trusted IPs through the dashboard, API, or Terraform.

### Manage using the dashboard

- #### Go to project deployment protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to enable Trusted IPs for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- #### Manage Vercel Authentication
  Ensure Vercel Authentication is enabled. See [Managing Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication#managing-vercel-authentication).

- #### Manage Trusted IPs
  From the **Trusted IPs** section:
  1. Use the toggle to enable the feature
  2. Select the [deployment environment](/docs/deployment-protection#choose-which-urls-to-protect) you want to protect
  3. Enter your list of IPv4 addresses and IPv4 CIDR ranges with an optional note describing the address
  4. Finally, select **Save**
  All your existing and future deployments will be protected with Trusted IPs for that project. Visitors to your project deployments from IP addresses not included in your list will see a [No Deployment Found](/docs/errors#404:-deployment_not_found) error page.

### Manage using the API

You can manage Trusted IPs using the Vercel API endpoint to [update an existing project](/docs/rest-api/projects/update-an-existing-project) with the following body:

| Parameter           | Type   | Required | Description                                                                                                                                                                                              |
| ------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deploymentType`    | string | Yes      | The deployment scope. One of `prod_deployment_urls_and_all_previews` (Standard Protection), `all` (All Deployments), `preview` (Only Preview Deployments), or `production` (Only Production Deployments) |
| `addresses`         | array  | Yes      | Array of address objects                                                                                                                                                                                 |
| `addresses[].value` | string | Yes      | The IPv4 or IPv4 CIDR address                                                                                                                                                                            |
| `addresses[].note`  | string | No       | Optional note about the address                                                                                                                                                                          |
| `protectionMode`    | string | Yes      | Set to `additional` so the IP is required along with other enabled protection methods (recommended)                                                                                                      |

```typescript
// enable / update trusted ips
{
  "trustedIps": {
      "deploymentType": "all" | "preview" | "production" | "prod_deployment_urls_and_all_previews",
      "addresses": { "value": "<value>"; "note": "<note>" | undefined }[],
      "protectionMode": "additional"
  }
}
// disable trusted ips
{
  "trustedIps": null
}
```

### Manage using Terraform

You can configure Trusted IPs using `trusted_ips` in the `vercel_project` data source in the [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/data-sources/project).


---

[View full sitemap](/docs/sitemap)
