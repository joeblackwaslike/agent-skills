---
title: WAF IP Blocking
product: vercel
url: /docs/vercel-firewall/vercel-waf/ip-blocking
canonical_url: "https://vercel.com/docs/vercel-firewall/vercel-waf/ip-blocking"
last_updated: 2026-08-13
type: how-to
prerequisites:
  - /docs/vercel-firewall/vercel-waf
  - /docs/vercel-firewall
related:
  - /docs/vercel-firewall/vercel-waf/custom-rules
  - /docs/rbac/access-roles
summary: Learn how to customize the Vercel WAF to restrict access to certain IP addresses.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-firewall/vercel-waf/ip-blocking.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "fb8017459069f1801eaa920bbf2b84acfc4a74a95a281b1c4d5f747dc84b00c9"
---

# WAF IP Blocking

You can create custom rules to block a specific IP address or multiple IP addresses by [CIDR](# "What is CIDR?"), effectively preventing unauthorized access or unwanted traffic. This security measure allows you to restrict access to your applications or websites based on the IP addresses of incoming requests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related)
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to resolve IP blocking issues ](https://vercel.com/kb/guide/how-to-resolve-ip-blocking-issues?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn to troubleshoot IP blocking issues for both shared and personal networks.
- [Security through design: Creating the improved Firewall experience](https://vercel.com/blog/security-through-design-creating-the-improved-firewall-experience?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related)
- [Deny traffic from a set of IP addresses](https://vercel.com/kb/guide/deny-traffic-from-a-set-of-ip-addresses?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how to block specific IP addresses with the Vercel WAF API.
- [Blocking traffic from a specific IP address.](https://vercel.com/kb/guide/traffic-spikes?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how to block traffic from a specific IP address.
- [Custom firewall rules for IP blocking](https://vercel.com/changelog/custom-firewall-rules-for-ip-blocking?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related)
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related)
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Firewall Observability](https://vercel.com/docs/vercel-firewall/firewall-observability?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how firewall traffic monitoring and alerts help you react quickly to potential security threats.
- [vercel firewall](https://vercel.com/docs/cli/firewall?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=related) — Learn how to manage your project's custom firewall rules, IP blocks, system bypass rules, attack challenge mode, and sys

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/ip-blocking.graph.md](/docs/vercel-firewall/vercel-waf/ip-blocking.graph.md?from=related&source_path=%2Fdocs%2Fvercel-firewall%2Fvercel-waf%2Fip-blocking&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Common use cases for IP blocking on Vercel include:

- Blocking known malicious IP addresses
- Preventing competitors or scrapers from accessing your content

For cases such as complying with specific laws and regulations or restricting access to or from a particular geographic area, use [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules).

## Access roles

- You need to be a [Developer](/docs/rbac/access-roles#developer-role) or viewer ([Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) or [Viewer Enterprise](/docs/rbac/access-roles#enterprise-viewer-role)) in the team to view the Firewall overview page and list the rules
- You need to be a [Project administrator](/docs/rbac/access-roles#project-administrators), [Team member](/docs/rbac/access-roles#member-role), or [Security](/docs/rbac/access-roles#security-role) to configure, save and apply any rule and configuration

## Project level IP Blocking

> **🔒 Permissions Required**: Project level IP Blocking

To block an IP address, open [**Firewall**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Ffirewall\&title=Go+to+Firewall) in the sidebar of your project and follow these steps:

1. Select **Configure** on the top right of the Firewall overview page
2. Scroll down to the **IP Blocking** section
3. Select the **+ Add IP** button
4. Complete the required **IP Address Or CIDR** and **Host** fields in the **Configure New Domain Protection** modal
   - The host is the domain name of the site you want to block the IP address from accessing. It should match the domain(s) associated with your project
   - You can copy this value from the URL of the site you want to block **without the `https` prefix**
   - It must match the exact domain you want to block, for example `my-site.com`, `www.my-site.com` or `docs.my-site.com`
   - You should add an entry for all subdomains that you wish block, such as `blog.my-site.com` and `docs.my-site.com`
5. Select the **Add IP Block Rule** button
6. Apply the changes:
   - When you make any change, you will see a **Review Changes** button appear or update on the top right with the number of changes requested
   - Select **Review Changes** and review the changes to be applied
   - Select **Publish** to apply the changes to your production deployment

## Account-level IP Blocking

> **🔒 Permissions Required**: Account-level IP Blocking

### How to add an IP block rule

To block an IP address, you can create an IP Blocking rule in your dashboard:

1. On your Team's [dashboard](/dashboard), navigate to **Settings** and open [**Security**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Go+to+Security) in the sidebar
2. On the **IP Blocking** section, select **Create New Rule** to create a new rule set
3. Add the IP address you want to block and the host you want to block it from. The host is the domain name of the site you want to block the IP address from accessing
   - You can copy this value from the URL of the site you want to block **without the `https` prefix**
   - It must match the exact domain you want to block, for example `my-site.com`, `www.my-site.com` or `docs.my-site.com`
   - You should add a separate entry for each subdomain that you wish to block, such as `blog.my-site.com` and `docs.my-site.com`
4. Select the **Add IP Block Rule** button

## More resources

- [Geolocation region block](/kb/guide/suspicious-traffic-in-specific-countries)


---

[View full sitemap](/docs/sitemap)
