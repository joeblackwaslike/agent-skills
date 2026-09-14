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
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "97d74ca5a11a0468c42f19e2d949689a2cac85ad7c0ead6b78b8bb72be3bc9ec"
---

# Add Custom Domain

## Overview

The Add Custom Domain action is a server-side utility that allows platforms to programmatically add custom domains to Vercel projects and check their configuration status. This enables platforms to manage domain verification and DNS configuration on behalf of their users, providing a seamless experience for connecting custom domains to deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom domain](https://v0.app/docs/custom-domains?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Add custom domains to your v0 deployments to give your applications a professional, branded URL.
- [How do I add a domain using the Vercel API?](https://vercel.com/kb/guide/how-do-i-add-a-domain-using-the-vercel-api?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Information on adding a domain using the Vercel API.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Assigning a custom domain to an environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Multi-Tenant Platform Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.
- [Add an existing domain to the Vercel platform](https://vercel.com/docs/rest-api/domains/add-an-existing-domain-to-the-vercel-platform?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=related) — POST /v7/domains — This endpoint is used for adding a new apex domain name with Vercel for the authenticating user. Note

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/add-custom-domain.graph.md](/docs/platforms/platform-elements/actions/add-custom-domain.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Factions%2Fadd-custom-domain&source_site=vercel-docs&relationship=graph)
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
