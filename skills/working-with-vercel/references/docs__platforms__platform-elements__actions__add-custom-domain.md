---
title: Add Custom Domain
product: vercel
url: /docs/platforms/platform-elements/actions/add-custom-domain
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions/add-custom-domain"
last_updated: 2026-09-03
type: reference
prerequisites:
  - /docs/platforms/platform-elements/actions
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/blocks/custom-domain
  - /docs/platforms/platform-elements/blocks/dns-table
  - /docs/platforms/multi-tenant-platforms/configuring-domains
summary: Server action for programmatically adding custom domains to Vercel projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/actions/add-custom-domain.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f6c89a6858fee3019ae92a86d21298ec201ab1baeb10462c0a2d8e5f2f51ccbf"
---

# Add Custom Domain

## Overview

The Add Custom Domain action is a server-side utility that allows platforms to programmatically add custom domains to Vercel projects and check their configuration status. This enables platforms to manage domain verification and DNS configuration on behalf of their users, providing a seamless experience for connecting custom domains to deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom domain](https://v0.app/docs/custom-domains) — Add custom domains to your v0 deployments to give your applications a professional, branded URL.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Assigning a custom domain to an environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [add_project_domain](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/add_project_domain) — Use add_project_domain with Vercel MCP.
- [Add an existing domain to the Vercel platform](https://vercel.com/docs/rest-api/domains/add-an-existing-domain-to-the-vercel-platform) — POST /v7/domains — This endpoint is used for adding a new apex domain name with Vercel for the authenticating user. Note

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/add-custom-domain.graph.md](/docs/platforms/platform-elements/actions/add-custom-domain.graph.md)
<!-- /docsgraph:related -->

## Installation

Install the `add-custom-domain` action with the Vercel Platforms CLI:

```bash
npx @vercel/platforms@latest add add-custom-domain
```

You can also install it with the shadcn CLI:

```bash
npx shadcn@latest add https://registry.platforms.guide/add-custom-domain.json
```

## Related

- [Custom Domain block](/docs/platforms/platform-elements/blocks/custom-domain)
- [DNS Table block](/docs/platforms/platform-elements/blocks/dns-table)
- [Configuring domains for multi-tenant platforms](/docs/platforms/multi-tenant-platforms/configuring-domains)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
