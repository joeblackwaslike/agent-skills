---
title: Vercel for Platforms
product: vercel
url: /docs/platforms
canonical_url: "https://vercel.com/docs/platforms"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/platforms/multi-tenant-platforms/concepts
  - /docs/platforms/multi-project-platforms/concepts
  - /docs/sdk
  - /docs/platforms/examples/multi-tenant-template
  - /docs/platforms/platform-elements/blocks/claim-deployment
summary: Learn about vercel for platforms on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "df50c0749be64e40db91ce62e847937a9a0c26f06ba638f96fe02e83fbde086d"
---

# Vercel for Platforms

## Choosing an architecture

Most platforms on Vercel follow one of two patterns. Pick the one that matches how isolated each customer needs to be:

| Approach                                                          | Codebase and deployment                          | Complexity | Best for                                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| [Multi-tenant](/docs/platforms/multi-tenant-platforms/concepts)   | One codebase, one deployment serves every tenant | Lower      | Content and branding differ, but functionality is the same (documentation sites, website builders, SaaS dashboards) |
| [Multi-project](/docs/platforms/multi-project-platforms/concepts) | One project and deployment per tenant            | Higher     | Each tenant needs custom code or isolated infrastructure (AI coding platforms, user-generated apps)                 |

For a multi-tenant build, clone the [Platforms Starter Kit](/templates/next.js/platforms-starter-kit). For a multi-project build, create and deploy tenant projects with the [Vercel SDK](/docs/sdk).

## What you can build

Teams run many kinds of platforms on Vercel:

- **Content platforms**, such as [Hashnode](https://townhall.hashnode.com/powerful-and-superfast-hashnode-blogs-now-powered-by-nextjs-11-and-vercel) and [Dub](https://dub.co/).
- **Documentation platforms**, such as [Mintlify](https://mintlify.com/), [Fern](https://buildwithfern.com/), and [Plain](https://www.plain.com/channels/help-center).
- **Website and store builders**, such as [Super](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel), [Typedream](https://typedream.com/), and [Universe](https://univer.se/).
- **B2B SaaS platforms**, such as [Zapier](https://zapier.com/interfaces), [Instatus](https://instatus.com/), and [Cal](http://cal.com/).

A typical setup gives you a root domain for your platform (`acme.com`), subdomains for tenants (`tenant1.acme.com`), and fully custom domains for customers who want them (`tenantcustomdomain.com`).

## What you get

- **Unlimited custom domains** and `*.yourdomain.com` subdomains.
- **Automatic SSL.** Vercel issues and renews certificates for every tenant domain.
- **Programmatic domain management** through the REST API or the Vercel SDK.
- **Global low-latency routing** over the Vercel CDN and Anycast network.
- **Preview deployments** so you can test tenant changes before they ship.
- **Support for 35+ frontend and backend frameworks.**

## Explore the docs

**Multi-tenant platforms**: Serve many customers from one codebase with custom domains and subdomains. [Learn more →](/docs/platforms/multi-tenant-platforms/concepts)

**Multi-project platforms**: Give each customer an isolated project and deployment, created with the SDK. [Learn more →](/docs/platforms/multi-project-platforms/concepts)

**Examples**: Clone working multi-tenant and multi-project starters. [Learn more →](/docs/platforms/examples/multi-tenant-template)

**Platform elements**: Drop in prebuilt actions and UI blocks for domains and deployments. [Learn more →](/docs/platforms/platform-elements/blocks/claim-deployment)

**Starter template**: Deploy a multi-tenant Next.js app with subdomain routing and tenant storage. [Learn more →](/templates/next.js/platforms-starter-kit)


---

[View full sitemap](/docs/sitemap)
