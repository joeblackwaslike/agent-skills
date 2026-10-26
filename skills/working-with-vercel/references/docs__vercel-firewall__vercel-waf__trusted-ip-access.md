---
title: Restrict access to trusted IP addresses
product: vercel
url: /docs/vercel-firewall/vercel-waf/trusted-ip-access
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/trusted-ip-access"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  []
summary: Learn how to use Vercel Firewall to allow requests from trusted IP addresses and deny requests from other networks.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/trusted-ip-access.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "aeb87de3381143b39732c8d9a4627f5fde2869cc0ff909633cbcc7a6b7b0c50f"
---

# Restrict access to trusted IP addresses

Use Vercel Firewall to allow requests from trusted IP addresses and deny requests from other networks. Firewall lets you test rules with the Log action, inspect matching traffic, and combine IP addresses with other request conditions. You can manage larger IP allowlists by adding addresses directly to rules or reusable team Lists, then reuse policies across projects.

> **⚠️ Warning:** Test the Firewall rule with the Log action before using Deny. An incorrect IP
> or proxy configuration can block your access to every project covered by the
> rule.

## Choose where to manage the IP access rule

Create a Project Custom Rule in the project's Firewall settings.

## Check which IP address Vercel Firewall evaluates

Vercel Firewall evaluates the IP address that connects directly to Vercel unless [Verified Proxy Advanced](/kb/guide/how-to-setup-verified-proxy) is configured for an external proxy.

> **⚠️ Warning:** With an external proxy, Vercel Firewall evaluates the proxy IP unless Verified
> Proxy Advanced (formerly Trusted Proxy) is configured. With Verified Proxy
> Advanced, Vercel Firewall evaluates the forwarded end-user IP.

| Request path | Vercel Firewall evaluates |
| --- | --- |
| No external proxy | The end-user IP, which connects directly to Vercel |
| External proxy without Verified Proxy Advanced | The proxy IP, such as a Cloudflare IP |
| External proxy with Verified Proxy Advanced | The end-user IP forwarded by the verified proxy |

If you don't use Verified Proxy Advanced, allowing an external proxy IP allows every request that reaches Vercel through that proxy. Configure end-user access at the external proxy, configure Verified Proxy Advanced, or match a secured forwarding header such as Cloudflare's [`CF-Connecting-IP`](https://developers.cloudflare.com/fundamentals/reference/http-headers/#cf-connecting-ip) when the Firewall rule should evaluate the end-user IP.

> **⚠️ Warning:** If Verified Proxy Advanced isn't configured, you can match the exact end-user
> IP header set by your proxy with a **Request Header** condition instead of
> using **IP Address**. Only trust this header if the proxy overwrites incoming
> values and visitors can't access the deployment without going through the
> proxy. Otherwise, a visitor could spoof an allowed IP address. Request Header
> conditions compare exact values and don't apply IP or CIDR matching semantics.

## Create a Project Custom Rule

> Project Custom Rules are available on all plans

Use a Project Custom Rule when one project needs independent control. You can start with a template, enter IP addresses directly, or reference a team List.

### Add a rule from the trusted IP template

The template opens the rule builder with the **Log** action and an **IP Address** **Is not any of** condition. Add your trusted addresses before saving the rule.

Create the rule manually if you need to evaluate a proxy's forwarding header instead of the Firewall IP Address field.

1. Select **Add Trusted IP Rule**, then choose the project to protect.
2. Add each trusted IP address or CIDR range to the **IP Address** condition.
3. Add a [Domain Environment condition](#choose-which-domains-to-protect) if the rule shouldn't cover all domains.
4. Select **Save Rule**, review the pending changes, and apply the configuration.
5. Continue with [Test and enforce the Firewall rule](#test-and-enforce-the-firewall-rule).

### Create a Project Custom Rule manually

Create the rule manually when you want to reference a team List or add more conditions:

1. From the [dashboard](/dashboard), select the project and open **Firewall**.
2. Select **Add New...** > **Rule**.
3. Name the rule, for example `Require trusted network`.
4. Configure the IP condition using one of these options:
   - To use a team List, select **IP Address**, **Is not in list**, and the List.
   - To keep the addresses in this project, select **IP Address**, **Is not any of**, and enter each IP address or CIDR range.
   - To evaluate a proxy-provided end-user IP without Verified Proxy Advanced, select **Request Header**, enter the exact header name set by your proxy (for example, `CF-Connecting-IP` for Cloudflare), select **Is not any of**, and enter each allowed IP value exactly as the proxy sends it. Review the [forwarded IP header requirements](#check-which-ip-address-vercel-firewall-evaluates) before using this option.
5. Add a [Domain Environment condition](#choose-which-domains-to-protect) if the rule shouldn't cover all domains.
6. Set **Then** to **Log**.
7. Select **Save Rule**, review the pending changes, and apply the configuration.
8. Continue with [Test and enforce the Firewall rule](#test-and-enforce-the-firewall-rule).

## Choose which domains to protect

Add a **Domain Environment** condition to control which domains require a trusted IP address:

| Access scope | Firewall condition |
| --- | --- |
| All domains | Don't add a Domain Environment condition. |
| Production domains | **Domain Environment** **Equals** **Production Domains**. |
| Standard Protection behavior | **Domain Environment** **Equals** **Non-Production Domains**. This includes preview domains, past Production Deployments, and Production Deployment URLs, while domains assigned to Production remain public. |

The Domain Environment filter uses domain assignments, not the deployment that an alias currently targets. This keeps Standard Protection behavior stable when an alias changes its target.

## Test and enforce the Firewall rule

Test from both an allowed network and a network outside your allowed IP addresses before changing the Firewall action to Deny:

1. Confirm that requests from an allowed IP don't match the Log rule.
2. Confirm that requests from an unlisted IP match the Log rule for every intended domain environment.
3. If you use an external proxy, confirm whether Firewall logs show the proxy IP or the end-user IP expected for your Verified Proxy Advanced configuration.
4. Change the Firewall action to **Deny** and apply the configuration.
5. Repeat the allowed and unlisted IP tests. Firewall Deny returns `403 Forbidden` for an unlisted IP.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
