---
title: Getting Started with Static IPs
product: vercel
url: /docs/networking/static-ips/getting-started
canonical_url: "https://vercel.com/docs/networking/static-ips/getting-started"
last_updated: 2026-05-12
type: tutorial
prerequisites:
  - /docs/networking/static-ips
  - /docs/networking
related:
  - /docs/plans/pro-plan
  - /docs/plans/enterprise
  - /docs/networking/static-ips
summary: Learn how to set up Static IPs for your Vercel projects to connect to IP-restricted backend services.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/networking/static-ips/getting-started.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "839da9b9531c8ea2d37d350cf6b7137f16c12abe047b7043f2ce91446e890d7a"
---

# Getting Started with Static IPs

> **🔒 Permissions Required**: Static IPs

This guide walks you through setting up Static IPs so you can access backend services that require IP allowlisting.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic outbound IPs by default. Learn how to allowlist IP addresses for a deployment with Static
- [Static IPs are now available for more secure connectivity](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related)
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.
- [Secure Compute](https://vercel.com/docs/networking/secure-compute?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Secure Compute provides dedicated private networks with VPC peering for Enterprise teams.
- [Restrict deployment access by IP address](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Trusted IPs let you restrict access to your deployments to a list of allowed IP addresses.
- [Reverse Proxy Servers and Vercel](https://vercel.com/docs/security/reverse-proxy?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn why reverse proxy servers are not recommended with Vercel's firewall.
- [Domains Overview](https://vercel.com/docs/domains?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=related) — Learn the fundamentals of how domains, DNS, and nameservers work on Vercel.

Full cross-link map for this page: [/docs/networking/static-ips/getting-started.graph.md](/docs/networking/static-ips/getting-started.graph.md?from=related&source_path=%2Fdocs%2Fnetworking%2Fstatic-ips%2Fgetting-started&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Static IPs for this Vercel project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Run `vercel link` to connect the project. 2. Enable static IP addresses for outbound connections using the Vercel CLI so I can allowlist them in my database or API firewall.
```

## Prerequisites

Before you dive in, make sure you have:

- A project deployed on Vercel
- A backend service that supports IP allowlisting
- [Pro](/docs/plans/pro-plan) or [Enterprise](/docs/plans/enterprise) plan

- ### Access the Networking settings
  1. Go to your **Project Dashboard**
  2. Navigate to **Project Settings**
  3. Click the **Networking** section

- ### Configure your region
  1. Click **Manage Active Regions**
  2. Pick a **region** close to your backend services to keep latency down. You can pick up to 3 regions
  3. Your project gets assigned static IPs within a shared VPC for each configured region

- ### Get your static IP addresses and configure your backend service
  1. Copy the static IP addresses from the dashboard
  2. Add the static IPs to your backend service's allowlist so it knows which IP addresses are allowed to connect

- ### Verify your connection
  To test your connection, redeploy your project that connects to your backend service. All your outbound traffic will now go through those static IPs and be routed via the static IPs.

## Next steps

- Learn how to [monitor usage and billing](/docs/networking/static-ips#managing-your-static-ips) for your Static IPs
- Understand [how Static IPs work](/docs/networking/static-ips#how-it-works)
- Review [limits and pricing](/docs/networking/static-ips#limits-and-pricing)


---

[View full sitemap](/docs/sitemap)
