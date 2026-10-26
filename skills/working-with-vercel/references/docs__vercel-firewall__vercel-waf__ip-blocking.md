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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "dabb63e6aba60bef5917696319755c9d0278f208ac2e5aa217497bf2111ee332"
---

# WAF IP Blocking

You can create custom rules to block a specific IP address or multiple IP addresses by [CIDR](# "What is CIDR?"), effectively preventing unauthorized access or unwanted traffic. This security measure allows you to restrict access to your applications or websites based on the IP addresses of incoming requests.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Firewall in the CLI](https://vercel.com/changelog/manage-vercel-firewall-in-the-cli)
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [How to resolve IP blocking issues ](https://vercel.com/kb/guide/how-to-resolve-ip-blocking-issues) — Learn to troubleshoot IP blocking issues for both shared and personal networks.
- [Security through design: Creating the improved Firewall experience](https://vercel.com/blog/security-through-design-creating-the-improved-firewall-experience)
- [Supporting Compliance with Vercel WAF](https://vercel.com/kb/guide/supporting-compliance-with-vercel-waf) — Vercel Firewall provides edge-based traffic filtering and monitoring to help teams meet compliance requirements in secur
- [Limit Abuse with Rate Limiting](https://vercel.com/kb/guide/limit-abuse-with-rate-limiting) — Learn how to protect your authentication endpoints against abuse.
- [Custom firewall rules for IP blocking](https://vercel.com/changelog/custom-firewall-rules-for-ip-blocking)
- [Block, rate limit, and challenge traffic with the Vercel Firewall](https://vercel.com/changelog/block-rate-limit-and-challenge-traffic-with-the-vercel-firewall)
- [Using the REST API with the Firewall](https://vercel.com/docs/vercel-firewall/firewall-api) — Learn how to interact with the security endpoints of the Vercel REST API programmatically.
- [Restrict deployment access by IP address](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) — Trusted IPs let you restrict access to your deployments to a list of allowed IP addresses.
- [Vercel Enterprise Plan](https://vercel.com/docs/plans/enterprise) — Learn about the Enterprise plan for Vercel, including features, pricing, and more.

Full cross-link map for this page: [/docs/vercel-firewall/vercel-waf/ip-blocking.graph.md](/docs/vercel-firewall/vercel-waf/ip-blocking.graph.md)
<!-- /docsgraph:related -->

Common use cases for IP blocking on Vercel include:

- Blocking known malicious IP addresses
- Preventing competitors or scrapers from accessing your content

For cases such as complying with specific laws and regulations or restricting access to or from a particular geographic area, use [Custom Rules](/docs/vercel-firewall/vercel-waf/custom-rules).

## Access roles

- You need to be a [Developer](/docs/rbac/access-roles#developer-role) or viewer ([Viewer Pro](/docs/rbac/access-roles#pro-viewer-role) or [Viewer Enterprise](/docs/rbac/access-roles#enterprise-viewer-role)) in the team to view the Firewall overview page and list the rules
- You need to be a [Project administrator](/docs/rbac/access-roles#project-administrators), [Team member](/docs/rbac/access-roles#member-role), or [Security](/docs/rbac/access-roles#security-role) to configure, save and apply any rule and configuration

## Project level IP Blocking

> Project level IP Blocking is available on all plans
>
> Those with the member, viewer, developer and administrator roles can access this feature

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

> Account-level IP Blocking is available on Enterprise plans
>
> Those with the owner and member roles can access this feature

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
