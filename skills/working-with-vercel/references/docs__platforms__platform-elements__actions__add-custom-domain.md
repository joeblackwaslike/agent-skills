---
title: Add Custom Domain
product: vercel
url: /docs/platforms/platform-elements/actions/add-custom-domain
canonical_url: "https://vercel.com/docs/platforms/platform-elements/actions/add-custom-domain"
last_updated: 2026-06-26
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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "8329e2d3dbf51f5fb3845424d9e650b1d47a3124f08c94ce7dda7ea2ac2fe5bd"
---

# Add Custom Domain

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add a custom domain to my Vercel project?](https://vercel.com/kb/guide/how-do-i-add-a-custom-domain-to-my-vercel-project?from=related) — Learn how to add a custom domain to your Vercel project.
- [How do I add a domain using the Vercel API?](https://vercel.com/kb/guide/how-do-i-add-a-domain-using-the-vercel-api?from=related) — Information on adding a domain using the Vercel API.
- [Adding a Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Set Up Custom Domain](https://vercel.com/docs/domains/set-up-custom-domain?from=related) — Add and configure a custom domain for your Vercel project using the CLI.
- [Adding a Domain to an Environment](https://vercel.com/docs/domains/working-with-domains/add-a-domain-to-environment?from=related) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Add an existing domain to the Vercel platform](https://vercel.com/docs/rest-api/domains/add-an-existing-domain-to-the-vercel-platform?from=related)
- [Quickstart](https://vercel.com/docs/platforms/multi-tenant-platforms/quickstart?from=related) — Set up wildcard domains, custom domains, domain verification, and redirects for a multi-tenant application on Vercel.

Full cross-link map for this page: [/docs/platforms/platform-elements/actions/add-custom-domain.graph.md](/docs/platforms/platform-elements/actions/add-custom-domain.graph.md)
<!-- /docsgraph:related -->

The Add Custom Domain action is a server-side utility that allows platforms to programmatically add custom domains to Vercel projects and check their configuration status. This enables platforms to manage domain verification and DNS configuration on behalf of their users, providing a seamless experience for connecting custom domains to deployments.

## Installation

Install the `add-custom-domain` action into your project using the Platform Elements installer.

## Related

- [Custom Domain block](/docs/platforms/platform-elements/blocks/custom-domain)
- [DNS Table block](/docs/platforms/platform-elements/blocks/dns-table)
- [Configuring domains for multi-tenant platforms](/docs/platforms/multi-tenant-platforms/configuring-domains)


---

[View full sitemap](/docs/sitemap)
