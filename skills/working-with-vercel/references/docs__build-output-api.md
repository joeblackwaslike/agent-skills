---
title: Build Output API
product: vercel
url: /docs/build-output-api
canonical_url: "https://vercel.com/docs/build-output-api"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/deployments/build-image
  - /docs/build-output-api/v3/configuration
  - /docs/build-output-api/v3/primitives
  - /docs/build-output-api/v3/features
  - /docs/build-output-api/v3/services
summary: The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/build-output-api.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "de2ef91c566c01449a2f577b0430108999e12f694d8bc1632b28874fd703dffb"
---

# Build Output API

The Build Output API is a file-system-based specification for a directory structure that can produce a Vercel deployment.

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
ideally the same as the platform [Build Image](/docs/deployments/build-image).

## More resources

- [Configuration](/docs/build-output-api/v3/configuration)
- [Vercel Primitives](/docs/build-output-api/v3/primitives)
- [Features](/docs/build-output-api/v3/features)
- [Services](/docs/build-output-api/v3/services)


---

[View full sitemap](/docs/sitemap)
