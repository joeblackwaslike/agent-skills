---
title: Microfrontends
product: vercel
url: /docs/microfrontends
canonical_url: "https://vercel.com/docs/microfrontends"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/monorepos
  - /docs/feature-flags
  - /docs/microfrontends/local-development
  - /docs/microfrontends/quickstart
  - /docs/vercel-toolbar/in-production-and-localhost
summary: Learn about microfrontends on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "42645050b16b99d0214868c6bd323e4c00e3a85a88c0b3b843308eea88d2d261"
---

# Microfrontends

Microfrontends allow you to split a single application into smaller, independently deployable units that render as one cohesive application for users. Different teams using different technologies can develop, test, and deploy each microfrontend while Vercel handles connecting the microfrontends and routing requests on the global network.

## When to use microfrontends?

They are valuable for:

- **Improved developer velocity**: You can split large applications into smaller units, improving development and build times.
- **Independent teams**: Large organizations can split features across different teams, with each team choosing their technology stack, framework, and development lifecycle.
- **Incremental migration**: You can gradually migrate from legacy systems to modern frameworks without rewriting everything at once.

Microfrontends may add additional complexity to your development process. To improve developer velocity, consider alternatives like:

- [Monorepos](/docs/monorepos) with [Turborepo](https://turborepo.com/)
- [Feature flags](/docs/feature-flags)
- Faster compilation with [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack)

## Repository layout

Microfrontends work the same whether you keep your applications in one repository (a monorepo) or spread them across several (a polyrepo). The microfrontends group, path routing, and production routing behave identically in both cases. Each application is its own Vercel project and deploys on its own, no matter where its code lives.

The layout you choose affects how each application finds the `microfrontends.json` configuration, both during local development and when it builds on Vercel:

| Task                                | Monorepo                                                | Polyrepo                                                              |
| ----------------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------- |
| Finding `microfrontends.json`       | Vercel detects it automatically                         | Pull it with the Vercel CLI or set `VC_MICROFRONTENDS_CONFIG`        |
| Running the local proxy             | Starts automatically with Turborepo, or run the script  | Run the proxy script in the repository you're working in             |
| Running multiple apps together      | Turborepo can run every app at once                     | Start each app in its own repository                                 |

In a monorepo, every application can locate the shared `microfrontends.json` automatically. In a polyrepo, the configuration lives in only one repository, so each other application needs its own access to it. This applies at build time as well as locally: a polyrepo application whose build can't find `microfrontends.json` fails with a build error. Pull the configuration into the application with `vercel microfrontends pull` or set `VC_MICROFRONTENDS_CONFIG`. See [Polyrepo setup](/docs/microfrontends/local-development#polyrepo-setup).

Choose the layout that fits how your teams already work. For the setup steps in each case, see [Test your microfrontends locally](/docs/microfrontends/local-development).

## Getting started with microfrontends

- Learn how to set up and configure microfrontends using our [Quickstart](/docs/microfrontends/quickstart) guide
- [Test your microfrontends locally](/docs/microfrontends/local-development) before merging the code to preview and production

To make the most of your microfrontend experience, [install the Vercel Toolbar](/docs/vercel-toolbar/in-production-and-localhost).

## Managing microfrontends

Once you have configured the basic structure of your microfrontends,

- Learn the different ways in which you can [route paths](/docs/microfrontends/path-routing) to different microfrontends as well as available options
- Learn how to [manage your microfrontends](/docs/microfrontends/managing-microfrontends) to add and remove microfrontends, share settings, route observability and manage the security of each microfrontend.
- Learn how to [optimize navigations](/docs/microfrontends/managing-microfrontends#optimizing-navigations-between-microfrontends) between different microfrontends
- Use the [Vercel Toolbar](/docs/microfrontends/managing-microfrontends/vercel-toolbar) to manage different aspects of microfrontends such as [overriding microfrontend routing](/docs/microfrontends/managing-microfrontends/vercel-toolbar#routing-overrides).
- Learn how to [troubleshoot](/docs/microfrontends/troubleshooting#troubleshooting) your microfrontends setup or [add unit tests](/docs/microfrontends/troubleshooting#testing) to ensure everything works.

## Limits and pricing

Teams on all plans can use microfrontends support with plan-specific limits. Hobby and Pro include two microfrontend projects. Pro teams can add more projects, and Vercel bills Pro teams for routed requests as shown below. Enterprise pricing is custom.

|  | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| Included Microfrontends Routing | 50K requests / month | N/A | Custom |
| Additional Microfrontends Routing | - | $2 per 1M requests | Custom |
| Included Microfrontends Projects | 2 projects | 2 projects | Custom |
| Additional Microfrontends Projects | - | $250/project/month | Custom |


Microfrontends usage can be viewed in the **Vercel Delivery Network** section of **Usage** section in the sidebar in the Vercel dashboard.

## More resources

- [Incremental migrations with microfrontends](/kb/guide/incremental-migrations-with-microfrontends)
- [How Vercel adopted microfrontends](https://vercel.com/blog/how-vercel-adopted-microfrontends)


---

[View full sitemap](/docs/sitemap)
