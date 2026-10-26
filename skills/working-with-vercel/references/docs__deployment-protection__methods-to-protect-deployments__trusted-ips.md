---
title: Restrict deployment access by IP address
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips"
last_updated: 2026-08-28
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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "ea5f8868751ccff7d9378a49849086dfd5d33f9fd1f0dd3cd197058eb2b94fd8"
---

# Restrict deployment access by IP address

> Trusted IPs are available on Enterprise plans
>
> Those with the owner, member and admin roles can manage Trusted IPs

> **⚠️ Warning:** Vercel recommends migrating from Trusted IPs to Vercel Firewall for
> IP-based access control on protected URLs. Trusted IPs supports up to 20
> addresses by default, while Firewall supports larger allowlists through
> rules and reusable team Lists. Firewall also lets you test rules with the
> Log action, inspect matching traffic, reuse policies, and control where
> rules apply. Follow the [migration
> guide](#migrate-trusted-ips-to-vercel-firewall) to move your existing
> configuration.

With Trusted IPs [enabled](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips#manage-trusted-ips) at the level of your [project](/docs/project-configuration/project-settings), only visitors from an allowed IP address can access your deployment. The deployment URL will return `404` [No Deployment Found](/docs/errors#404:-deployment_not_found) for all other requests. Trusted IPs is configured by specifying a list of IPv4 addresses and IPv4 CIDR ranges.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How to choose the right Vercel networking option](https://vercel.com/kb/guide/how-to-choose-the-right-vercel-networking-option) — Decide whether your project needs a networking option at all, then choose between Static IPs, AWS PrivateLink, Secure Co
- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Trusted IPs for Deployment Protection is now Generally Available](https://vercel.com/changelog/trusted-ips-is-now-generally-available-for-enterprise-customers)
- [Trusted Sources for Deployment Protection](https://vercel.com/changelog/trusted-sources-for-deployment-protection)
- [Vercel Enterprise Plan](https://vercel.com/docs/plans/enterprise) — Learn about the Enterprise plan for Vercel, including features, pricing, and more.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments/trusted-ips.graph.md](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips.graph.md)
<!-- /docsgraph:related -->

Trusted IPs works well if you access Vercel deployments through a specific IP address. For example, you can limit preview deployment access to your VPN. You can also enable Trusted IPs in production to restrict incoming access to only requests through your external proxy.

![Enabling Trusted IPs.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/trusted-ips-dash-light.png)

## What to know before enabling Trusted IPs

The tables below outline key considerations and security implications when using Trusted IPs for your deployments on Vercel.

### General considerations

| Consideration             | Description                                                                                                                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Environment Configuration | Can be enabled for different environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)                                                                                           |
| Compatibility             | Operates as a required layer on top of [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection).          |
| Bypass Methods            | Can be bypassed using [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) and [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation), or by callers listed in [Trusted Sources](/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) |
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

## Migrate Trusted IPs to Vercel Firewall

Vercel Firewall provides observable and customizable IP-based access control. You can test rules with the Log action, inspect matching traffic, manage larger IP allowlists by adding addresses directly to rules or reusable team Lists, combine IP addresses with other request conditions, and reuse policies across teams and projects.

Migration is optional.

To move an existing Trusted IPs configuration to Vercel Firewall:

1. Keep Trusted IPs enabled while you configure and test the Firewall rule.
2. Record the IPv4 addresses and CIDR ranges in the project's **Trusted IPs** settings.
3. Review [which IP address Vercel Firewall evaluates](/docs/vercel-firewall/vercel-waf/trusted-ip-access#check-which-ip-address-vercel-firewall-evaluates) before copying the allowlist. If an external proxy connects to Vercel, the behavior differs:
   - **Trusted IPs:** Checks the IP that connects directly to Vercel. With an external proxy, this is the proxy IP, even when [Verified Proxy Advanced](/kb/guide/how-to-setup-verified-proxy) is configured.
   - **Firewall with Verified Proxy Advanced:** Checks the forwarded end-user IP. If the Trusted IPs allowlist contains proxy IPs, copying it won't preserve the same access.
   - **Firewall without Verified Proxy Advanced:** Checks the IP that connects directly to Vercel. With an external proxy, this is the proxy IP. Review the [full proxy behavior and forwarding-header alternative](/docs/vercel-firewall/vercel-waf/trusted-ip-access#check-which-ip-address-vercel-firewall-evaluates) before creating the rule.
4. Follow [Set up trusted IP access with Vercel Firewall](/docs/vercel-firewall/vercel-waf/trusted-ip-access). Add the recorded addresses directly to a Shared Rule or Project Custom Rule, or store them in a reusable team List.
5. Use the mapping in [Match the Trusted IPs deployment scope](#match-the-trusted-ips-deployment-scope) to add the Domain Environment condition.
6. Complete the [Log and Deny tests](/docs/vercel-firewall/vercel-waf/trusted-ip-access#test-and-enforce-the-firewall-rule).
7. Open the project's **Deployment Protection** settings and disable Trusted IPs.
8. Select **Save**, then repeat the allowed and unlisted IP tests.

Firewall Deny returns `403 Forbidden`, while Trusted IPs returns `404 No Deployment Found`.

### Match the Trusted IPs deployment scope

Use these Firewall conditions to reproduce the current Trusted IPs scope:

| Trusted IPs scope | Firewall condition |
| --- | --- |
| All Deployments | Don't add a Domain Environment condition. |
| Production Deployments | **Domain Environment** **Equals** **Production Domains**. |
| Pre-Production Deployments | **Environment** **Equals** **Preview**. |
| Standard Protection | **Domain Environment** **Equals** **Non-Production Domains**. |

The **Environment** **Equals** **Preview** condition preserves the legacy **Pre-Production Deployments** scope. For new configurations, we recommend the **Standard Protection** mapping, which also protects past Production Deployments and Production Deployment URLs.

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

To enable or update Trusted IPs, send the `trustedIps` object:

```json
{
  "trustedIps": {
    "deploymentType": "all",
    "addresses": [{ "value": "203.0.113.0/24", "note": "Office network" }],
    "protectionMode": "additional"
  }
}
```

To disable Trusted IPs, set `trustedIps` to `null`:

```json
{
  "trustedIps": null
}
```

### Manage using Terraform

You can configure Trusted IPs using `trusted_ips` in the `vercel_project` data source in the [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/data-sources/project).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
