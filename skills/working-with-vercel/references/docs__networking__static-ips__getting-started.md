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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1706130bb25f6d18bc33a0a36219e613f89df424ab11daa81b61a3c63b507a9e"
---

# Getting Started with Static IPs

> **🔒 Permissions Required**: Static IPs


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related) — You can allowlist IP addresses with Vercel Secure Compute and Static IPs
- [How can I allowlist IP addresses for a deployment?](https://vercel.com/kb/guide/how-to-allowlist-deployment-ip-address?from=related) — You can securely connect a deployment to external services by using a stable set of IP addresses.
- [Secure Compute](https://vercel.com/docs/networking/secure-compute?from=related) — Secure Compute provides dedicated private networks with VPC peering for Enterprise teams.
- [Trusted IPs](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/trusted-ips?from=related) — Trusted IPs let you restrict access to your deployments to a list of allowed IP addresses.
- [Reverse Proxy Servers and Vercel](https://vercel.com/docs/security/reverse-proxy?from=related) — Learn why reverse proxy servers are not recommended with Vercel's firewall.
- [Configures Static IPs for a project](https://vercel.com/docs/rest-api/networking/configures-static-ip-s-for-a-project?from=related)
- [Getting Started](https://vercel.com/docs/getting-started-with-vercel?from=related) — Install the Vercel CLI, add the Vercel Plugin or agent skills, and deploy your first project.

Full cross-link map for this page: [/docs/networking/static-ips/getting-started.graph.md](/docs/networking/static-ips/getting-started.graph.md)
<!-- /docsgraph:related -->

This guide walks you through setting up Static IPs so you can access backend services that require IP allowlisting.

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
