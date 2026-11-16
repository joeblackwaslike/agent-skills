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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/platforms/platform-elements/actions/add-custom-domain.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "c726a1ec6245511b2bcc24c2cf5fe8701e88bbe9d89d2bc7c38c1ac683c388a8"
---

# Add Custom Domain

## Overview

The Add Custom Domain action is a server-side utility that allows platforms to programmatically add custom domains to Vercel projects and check their configuration status. This enables platforms to manage domain verification and DNS configuration on behalf of their users, providing a seamless experience for connecting custom domains to deployments.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Custom domain](https://v0.app/docs/custom-domains) — Add custom domains to your v0 deployments to give your applications a professional, branded URL.
- [Adding & Configuring a Custom Domain](https://vercel.com/docs/domains/working-with-domains/add-a-domain) — Learn how to add a custom domain to your Vercel project, verify it, and correctly set the DNS or Nameserver values.
- [Setting up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain) — Add and configure a custom domain for your Vercel project using the CLI.
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
