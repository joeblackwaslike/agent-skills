---
title: Configuration
product: vercel
url: /docs/microfrontends/configuration
canonical_url: "https://vercel.com/docs/microfrontends/configuration"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends
related:
  - /docs/microfrontends/quickstart
  - /docs/builds/configure-a-build
  - /docs/environment-variables/managing-environment-variables
summary: Learn about configuration on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "1702c4519b887435b9922b8de3148776e55df1c0060dd50862ddb80af8b81fcc"
---

# Microfrontends Configuration

The `microfrontends.json` file is used to configure your microfrontends. If this file is not deployed with your [default application](/docs/microfrontends/quickstart#key-concepts), the deployment will not be a microfrontend.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Microfrontends](https://turborepo.dev/docs/guides/microfrontends?from=related) — Set up Turborepo's built-in proxy to route traffic between multiple frontend applications during local development.
- [Project Configuration](https://vercel.com/docs/project-configuration?from=related) — Learn how to configure your Vercel projects using vercel.json, vercel.ts, or the dashboard to control builds, routing, f
- [Local Development](https://vercel.com/docs/microfrontends/local-development?from=related) — Learn about local development on Vercel.
- [vercel microfrontends](https://vercel.com/docs/cli/microfrontends?from=related) — Manage microfrontends groups from the CLI. Learn how to create groups, inspect group metadata, add and remove projects,
- [Managing Microfrontends](https://vercel.com/docs/microfrontends/managing-microfrontends?from=related) — Learn about managing microfrontends on Vercel.
- [Path Routing](https://vercel.com/docs/microfrontends/path-routing?from=related) — Learn about path routing on Vercel.

Full cross-link map for this page: [/docs/microfrontends/configuration.graph.md](/docs/microfrontends/configuration.graph.md)
<!-- /docsgraph:related -->

## Schema

## Example

```json filename="microfrontends.json"
{
  "$schema": "https://openapi.vercel.sh/microfrontends.json",
  "applications": {
    "nextjs-pages-dashboard": {
      "development": {
        "fallback": "nextjs-pages-dashboard.vercel.app"
      }
    },
    "nextjs-pages-blog": {
      "routing": [
        {
          "paths": ["/blog/:path*"]
        },
        {
          "flag": "enable-flagged-blog-page",
          "paths": ["/flagged/blog"]
        }
      ]
    }
  }
}
```

## Application Naming

If the application name differs from the `name` field in `package.json` for the application, you should either rename the name field in `package.json` to match or add the `packageName` field to the microfrontends configuration.

```json filename="microfrontends.json"
    "docs": {
      "packageName": "name-from-package-json",
      "routing": [
        {
          "group": "docs",
          "paths": ["/docs/:path*"]
        }
      ]
    }
```

## File Naming

The microfrontends configuration file can be named either `microfrontends.json` or `microfrontends.jsonc`.

You can also define a custom configuration file by setting the `VC_MICROFRONTENDS_CONFIG_FILE_NAME` environment variable — for example, `microfrontends-dev.json`. The file name must end with either `.json` or `.jsonc`, and it may include a path, such as `/path/to/microfrontends.json`. The filename / path specified is relative to the [root directory](/docs/builds/configure-a-build#root-directory) for the [default application](/docs/microfrontends/quickstart#key-concepts).

Be sure to add the [environment variable](/docs/environment-variables/managing-environment-variables) to all projects within the microfrontends group.

Using a custom file name allows the same repository to support multiple microfrontends groups, since each group can have its own configuration file.

If you're using Turborepo, define the environment variable **outside** of the Turbo invocation when running `turbo dev`, so the local proxy can detect and use the correct configuration file.

```bash
VC_MICROFRONTENDS_CONFIG_FILE_NAME="microfrontends-dev.json" turbo dev
```


---

[View full sitemap](/docs/sitemap)
