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
source: "https://vercel.com/docs/build-output-api.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "549d95faff3e49d38037e9eb9695bf72b3c47f42142f46c566cc837d91a7b0fe"
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
- [What can I do when I run into build output limits with Next.js on Vercel?](https://vercel.com/kb/guide/what-can-i-do-when-i-run-into-build-output-limits-with-next-js-on-vercel) — Learn how to work with build output limits for Next.js on Vercel.
- [How Vercel builds your application](https://vercel.com/docs/fundamentals/builds) — Learn how Vercel transforms your source code into optimized assets ready to serve globally.
- [Frameworks on Vercel](https://vercel.com/docs/frameworks) — Vercel supports a wide range of the most popular frameworks, optimizing how your application builds and runs no matter w
- [vercel build](https://vercel.com/docs/cli/build) — Learn how to build a Vercel Project locally or in your own CI environment using the vercel build CLI command.
- [Vercel fundamental concepts](https://vercel.com/docs/fundamentals) — Learn about the core concepts of Vercel
- [Configuring a Build](https://vercel.com/docs/builds/configure-a-build) — Vercel automatically configures the build settings for many front-end frameworks, but you can also customize the build a

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


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
