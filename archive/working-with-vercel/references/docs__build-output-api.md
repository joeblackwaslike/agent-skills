---
title: Build Output API
product: vercel
url: /docs/build-output-api
canonical_url: "https://vercel.com/docs/build-output-api"
last_updated: 2026-08-11
type: conceptual
prerequisites:
  []
related:
  - /docs/builds/build-image
  - /docs/build-output-api/configuration
  - /docs/build-output-api/primitives
  - /docs/build-output-api/features
  - /docs/build-output-api/services
summary: The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/build-output-api.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "9ee6003401764a297548b9e1c857d4e17c34803d17bb98581d04aac5f21939c5"
---

# Build Output API

The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deploy to Vercel with Self-Hosted Git Pipelines \\(GitLab & Bitbucket\\)](https://vercel.com/kb/guide/how-can-i-use-gitlab-pipelines-with-vercel) — Learn how to use GitLab Pipelines to deploy to Vercel including support for self-managed GitLab.
- [How we cut CDN metadata lookup latency by 91%](https://vercel.com/blog/how-we-cut-cdn-metadata-lookup-latency-by-91-percent)
- [How we made global routing faster with Bloom filters](https://vercel.com/blog/how-we-made-global-routing-faster-with-bloom-filters)
- [NestJS](https://workflow-sdk.dev/docs/getting-started/nestjs) — Set up Workflow SDK in a NestJS app.
- [Announcing the Build Output API](https://vercel.com/blog/build-output-api)
- [New build and deploy capabilities in Vercel CLI](https://vercel.com/changelog/new-build-and-deploy-capabilities-in-vercel-cli)
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals) — Learn about the core concepts of Vercel
- [Products](https://vercel.com/docs/products) — Browse Vercel products for building, deploying, securing, observing, and scaling web applications.

Full cross-link map for this page: [/docs/build-output-api.graph.md](/docs/build-output-api.graph.md)
<!-- /docsgraph:related -->

Framework authors can take advantage of [framework-defined infrastructure](/blog/framework-defined-infrastructure) by implementing this directory structure as the output of their build command. This allows the framework to define and use all of the Vercel platform features.

## Overview

The Build Output API closely maps to the Vercel product features in a logical and understandable format.

It is primarily targeted toward authors of web frameworks who would like to utilize all of the Vercel platform features, such as Vercel Functions, Routing, Caching, etc.

If you are a framework author looking to integrate with Vercel, you can use
this reference as a way to understand which files the framework should emit to the
`.vercel/output` directory.

If you are not using a framework and would like to still take advantage of any of the features
that those frameworks provide, you can create the `.vercel/output` directory and populate it
according to this specification yourself.

You can find complete examples of Build Output API directories in [vercel/examples](https://github.com/vercel/examples/tree/main/build-output-api).

Check out our blog post on using the [Build Output API to build your own framework](/blog/build-your-own-web-framework) with Vercel.

## Known limitations

**Native Dependencies:** Please keep in mind that when building locally, your build tools will
compile native dependencies targeting your machine’s architecture. This will not necessarily match
what runs in production on Vercel.

For projects that depend
on native binaries, you should build on a host machine running Linux with a `x64` CPU architecture,
ideally the same as the platform [Build Image](/docs/builds/build-image).

## More resources

- [Configuration](/docs/build-output-api/configuration)
- [Vercel Primitives](/docs/build-output-api/primitives)
- [Features](/docs/build-output-api/features)
- [Services](/docs/build-output-api/services)
- [Daemons](/docs/build-output-api/daemons)

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
