---
title: Vercel for Platforms
product: vercel
url: /docs/platforms
canonical_url: "https://vercel.com/docs/platforms"
last_updated: 2026-09-03
type: conceptual
prerequisites:
  []
related:
  - /docs/platforms/multi-tenant-platforms/concepts
  - /docs/platforms/multi-project-platforms/concepts
  - /docs/platforms/multi-project-platforms/quickstart
  - /docs/rest-api/sdk
  - /docs/platforms/examples/platform-template
summary: Build platforms where agents and users deploy apps with isolated projects or shared multi-tenant deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "c3d968f00c28338116610a71592a7239c1c425078051f04723536733f2fc2133"
---

# Vercel for Platforms

## Build platforms where agents and users deploy apps

Vercel for Platforms gives generated apps isolated projects and deployments. Multi-tenant products can serve many customers from one codebase with custom domains and subdomains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel for Platforms can now deploy from your users' GitHub repositories](https://vercel.com/changelog/vercel-for-platforms-can-now-deploy-from-your-users-github-repositories?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related)
- [Introducing Vercel for Platforms](https://vercel.com/changelog/introducing-vercel-for-platforms?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related)
- [Introducing the Vercel Platforms Starter Kit](https://vercel.com/blog/platforms-starter-kit?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related)
- [Build a multi-tenant app with Next.js and Vercel](https://vercel.com/kb/guide/nextjs-multi-tenant-application?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related) — Create a Next.js application with multi-tenancy and custom domain support on Vercel.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.
- [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=related) — Vercel is the native Next.js platform, designed to enhance the Next.js experience.

Full cross-link map for this page: [/docs/platforms.graph.md](/docs/platforms.graph.md?from=related&source_path=%2Fdocs%2Fplatforms&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

```typescript filename="create-project.ts"
import { Vercel } from '@vercel/sdk';

const vercel = new Vercel({
  bearerToken: process.env.VERCEL_TOKEN,
});

async function createAndGetProject() {
  try {
    const project = await vercel.projects.createProject({
      requestBody: {
        name: 'my-new-project',
        framework: 'nextjs',
      },
    });

    console.log(`Project created: ${project.id}`);
  } catch (error) {
    console.error(
      error instanceof Error ? `Error: ${error.message}` : String(error),
    );
  }
}

createAndGetProject();
```

## Choosing an architecture

Most platforms on Vercel follow one of two patterns. Pick the one that matches how isolated each customer needs to be:

| Approach                                                          | Codebase and deployment                          | Complexity | Best for                                                                                                            |
| ----------------------------------------------------------------- | ------------------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| [Multi-tenant](/docs/platforms/multi-tenant-platforms/concepts)   | One codebase, one deployment serves every tenant | Lower      | Content and branding differ, but functionality is the same (documentation sites, website builders, SaaS dashboards) |
| [Multi-project](/docs/platforms/multi-project-platforms/concepts) | One project and deployment per tenant            | Higher     | Each tenant needs custom code or isolated infrastructure (AI coding platforms, user-generated apps)                 |

For a multi-tenant build, clone the [Platforms Starter Kit](/templates/next.js/platforms-starter-kit). For a multi-project build, follow the [multi-project quickstart](/docs/platforms/multi-project-platforms/quickstart) to create and deploy tenant projects with the [Vercel SDK](/docs/rest-api/sdk).

## What you can build

Teams run many kinds of platforms on Vercel:

- **AI app builders and coding platforms**, where agents generate code and each app gets an isolated project and deployment. Start with the [Platform Template](/docs/platforms/examples/platform-template) or [OSS coding agent](/docs/platforms/examples/oss-coding-agent).
- **Content platforms**, such as [Hashnode](https://townhall.hashnode.com/powerful-and-superfast-hashnode-blogs-now-powered-by-nextjs-11-and-vercel) and [Dub](https://dub.co/).
- **Documentation platforms**, such as [Mintlify](https://mintlify.com/), [Fern](https://buildwithfern.com/), and [Plain](https://www.plain.com/channels/help-center).
- **Website and store builders**, such as [Super](https://vercel.com/blog/super-serves-thousands-of-domains-on-one-project-with-next-js-and-vercel), [Typedream](https://typedream.com/), and [Universe](https://univer.se/).
- **B2B SaaS platforms**, such as [Zapier](https://zapier.com/interfaces), [Instatus](https://instatus.com/), and [Cal](http://cal.com/).

A typical setup gives you a root domain for your platform (`acme.com`), subdomains for tenants (`tenant1.acme.com`), and fully custom domains for customers who want them (`tenantcustomdomain.com`).

## What you get

- **Custom domains and `*.yourdomain.com` subdomains**, subject to [plan limits](/docs/platforms/multi-tenant-platforms/limits).
- **Automatic SSL for verified domains.** Vercel issues and renews certificates after domain verification.
- **Programmatic domain management** through the REST API or the Vercel SDK.
- **Global low-latency routing** over the Vercel CDN and Anycast network.
- **Preview deployments** so you can test tenant changes before they ship.
- **Support for 35+ frontend and backend frameworks.**

## Explore the docs

**Multi-tenant platforms**: Serve many customers from one codebase with custom domains and subdomains. [Learn more →](/docs/platforms/multi-tenant-platforms/concepts)

**Multi-project platforms**: Give each customer an isolated project and deployment, created with the SDK. [Learn more →](/docs/platforms/multi-project-platforms/concepts)

**Examples**: Start from multi-project AI app builders or multi-tenant templates. [Learn more →](/docs/platforms/examples)

**Platform elements**: Drop in prebuilt actions and UI blocks for domains and deployments. [Learn more →](/docs/platforms/platform-elements/blocks/claim-deployment)

**Starter template**: Deploy a multi-tenant Next.js app with subdomain routing and tenant storage. [Learn more →](/templates/next.js/platforms-starter-kit)


---

[View full sitemap](/docs/sitemap)
