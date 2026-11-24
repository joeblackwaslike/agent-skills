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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/networking/static-ips/getting-started.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "7dc44abcae3282fbb435bbb9c95c3883c991bcc28f6e7ad50c785cbfb5b19a39"
---

# Getting Started with Static IPs

> Static IPs are available on Enterprise and Pro plans

This guide walks you through setting up Static IPs so you can access backend services that require IP allowlisting.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to choose the right Vercel networking option](https://vercel.com/kb/guide/how-to-choose-the-right-vercel-networking-option) — Decide whether your project needs a networking option at all, then choose between Static IPs, AWS PrivateLink, Secure Co
- [Static IPs are now available for more secure connectivity](https://vercel.com/changelog/static-ips-are-now-available-for-more-secure-connectivity)
- [Route build traffic through Static IPs](https://vercel.com/changelog/route-build-traffic-through-static-ips)
- [How to resolve IP blocking issues ](https://vercel.com/kb/guide/how-to-resolve-ip-blocking-issues) — Learn to troubleshoot IP blocking issues for both shared and personal networks.
- [Configures Static IPs for a project](https://vercel.com/docs/rest-api/networking/configures-static-ips-for-a-project) — PATCH /v1/projects/{idOrName}/shared-connect-links — Allows configuring Static IPs for a project
- [Serving Static Files](https://vercel.com/docs/platforms/multi-tenant-platforms/serving-static-files) — Serve tenant-specific static files like robots.txt, sitemap.xml, and llms.txt dynamically using route handlers.
- [Secure Compute](https://vercel.com/docs/networking/secure-compute) — Secure Compute provides dedicated private networks with VPC peering for Enterprise teams.
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Using Vercel with Microsoft Azure](https://vercel.com/docs/integrations/external-platforms/azure) — Run your frontend on Vercel alongside backends hosted in Microsoft Azure, with private network connectivity, keyless aut

Full cross-link map for this page: [/docs/networking/static-ips/getting-started.graph.md](/docs/networking/static-ips/getting-started.graph.md)
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
  1. Turn on **Advanced Networking**, click **Static IPs**, and then click **Configure Regions**
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
