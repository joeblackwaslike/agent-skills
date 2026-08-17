---
title: Project Configuration
product: vercel
url: /docs/project-configuration
canonical_url: "https://vercel.com/docs/project-configuration"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/project-configuration/project-settings
  - /docs/project-configuration/vercel-json
  - /docs/project-configuration/vercel-ts
  - /docs/project-configuration/global-configuration
  - /docs/project-configuration/general-settings
summary: Learn how to configure your Vercel projects using vercel.json, vercel.ts, or the dashboard to control builds, routing, functions, and more.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "012fa30f2a51fc7855b630832cc0f1b148f98e3bed6a67bdbe8064b2e969192e"
---

# Project Configuration

Vercel automatically detects your framework and sets sensible defaults for builds, deployments, and routing. Project configuration lets you override these defaults to control builds, routing rules, function behavior, scheduled tasks, image optimization, and more.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I redirect from a subdomain to a subpath?](https://vercel.com/kb/guide/can-i-redirect-from-a-subdomain-to-a-subpath?from=related) — Learn how to redirect from your subdomain to a subpath on Vercel with a vercel.json file or with Next.js
- [Can I route based on letter casing on Vercel?](https://vercel.com/kb/guide/can-i-route-based-on-letter-casing-on-vercel?from=related) — Information on whether or not it is possible to route based on letting casing with Vercel.
- [Does Vercel support Ruby on Rails applications?](https://vercel.com/kb/guide/does-vercel-support-ruby-on-rails-applications?from=related) — Learn how you can use Ruby on Rails with your frontend on Vercel.
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel?from=related) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [How can I reduce my Vercel Functions usage on Vercel?](https://vercel.com/kb/guide/how-can-i-reduce-my-serverless-execution-usage-on-vercel?from=related) — Reduce Vercel Functions usage and cost under Fluid compute pricing with caching, rendering strategies, and function conf
- [Global Options](https://vercel.com/docs/cli/global-options?from=related) — Global options are commonly available to use with multiple Vercel CLI commands. Learn about Vercel CLI's global options
- [Global Configs & Dashboard](https://vercel.com/docs/global-config/global-config-dashboard?from=related) — Learn how to create, view and update your Global Configs and the data inside them in your Vercel Dashboard at the Hobby
- [Service configuration reference](https://vercel.com/docs/services/config-reference?from=related) — Options available for service configuration.
- [Advanced Configuration](https://vercel.com/docs/functions/configuring-functions/advanced-configuration?from=related) — Learn how to add utility files to the /api directory, and bundle Vercel Functions.
- [vercel project](https://vercel.com/docs/cli/project?from=related) — Perform the following commands from the terminal for your Vercel Projects: list, add, inspect, update settings, rename,

Full cross-link map for this page: [/docs/project-configuration.graph.md](/docs/project-configuration.graph.md)
<!-- /docsgraph:related -->

In addition to configuring your project through [Project Settings](/docs/project-configuration/project-settings), you have the following options:

- [Static file-based configuration](/docs/project-configuration/vercel-json) - Static JSON configuration in your repository
- [Programmatic file-based configuration](/docs/project-configuration/vercel-ts) - Dynamic TypeScript configuration that runs at build time
- [Global CLI configuration](/docs/project-configuration/global-configuration) - System-wide Vercel CLI settings

Each method lets you control different aspects of your project.

## File-based configuration

File-based configuration lives in your repository and gets version-controlled with your code. You can use either [`vercel.json`](/docs/project-configuration/vercel-json) for static configuration or [`vercel.ts`](/docs/project-configuration/vercel-ts) for programmatic configuration that runs at build time. Both support the same properties, but `vercel.ts` lets you generate configuration dynamically using environment variables, API calls, or other build-time logic. You can only use one configuration file per project.

The table below shows all available configuration properties:

| Property                    |                               vercel.json                               |                               vercel.ts                               | Description                                         |
| --------------------------- | :---------------------------------------------------------------------: | :-------------------------------------------------------------------: | --------------------------------------------------- |
| **$schema**                 |   [View](/docs/project-configuration/vercel-json#schema-autocomplete)   |   [View](/docs/project-configuration/vercel-ts#schema-autocomplete)   | Enable IDE autocomplete and validation              |
| **buildCommand**            |      [View](/docs/project-configuration/vercel-json#buildcommand)       |      [View](/docs/project-configuration/vercel-ts#buildcommand)       | Override the build command for your project         |
| **bunVersion**              |       [View](/docs/project-configuration/vercel-json#bunversion)        |       [View](/docs/project-configuration/vercel-ts#bunversion)        | Specify which Bun version to use                    |
| **cleanUrls**               |        [View](/docs/project-configuration/vercel-json#cleanurls)        |        [View](/docs/project-configuration/vercel-ts#cleanurls)        | Remove `.html` extensions from URLs                 |
| **crons**                   |          [View](/docs/project-configuration/vercel-json#crons)          |          [View](/docs/project-configuration/vercel-ts#crons)          | Schedule functions to run at specific times         |
| **devCommand**              |       [View](/docs/project-configuration/vercel-json#devcommand)        |       [View](/docs/project-configuration/vercel-ts#devcommand)        | Override the development command                    |
| **fluid**                   |          [View](/docs/project-configuration/vercel-json#fluid)          |          [View](/docs/project-configuration/vercel-ts#fluid)          | Enable fluid compute for functions                  |
| **framework**               |        [View](/docs/project-configuration/vercel-json#framework)        |        [View](/docs/project-configuration/vercel-ts#framework)        | Specify the framework preset                        |
| **functions**               |        [View](/docs/project-configuration/vercel-json#functions)        |        [View](/docs/project-configuration/vercel-ts#functions)        | Configure function memory, duration, and runtime    |
| **headers**                 |         [View](/docs/project-configuration/vercel-json#headers)         |         [View](/docs/project-configuration/vercel-ts#headers)         | Add custom HTTP headers to responses                |
| **ignoreCommand**           |      [View](/docs/project-configuration/vercel-json#ignorecommand)      |      [View](/docs/project-configuration/vercel-ts#ignorecommand)      | Skip builds based on custom logic                   |
| **images**                  |         [View](/docs/project-configuration/vercel-json#images)          |         [View](/docs/project-configuration/vercel-ts#images)          | Configure image optimization                        |
| **installCommand**          |     [View](/docs/project-configuration/vercel-json#installcommand)      |     [View](/docs/project-configuration/vercel-ts#installcommand)      | Override the package install command                |
| **outputDirectory**         |     [View](/docs/project-configuration/vercel-json#outputdirectory)     |     [View](/docs/project-configuration/vercel-ts#outputdirectory)     | Specify the build output directory                  |
| **public**                  |         [View](/docs/project-configuration/vercel-json#public)          |         [View](/docs/project-configuration/vercel-ts#public)          | Make deployment logs and source publicly accessible |
| **redirects**               |        [View](/docs/project-configuration/vercel-json#redirects)        |        [View](/docs/project-configuration/vercel-ts#redirects)        | Redirect requests to different URLs                 |
| **bulkRedirectsPath**       |    [View](/docs/project-configuration/vercel-json#bulkredirectspath)    |    [View](/docs/project-configuration/vercel-ts#bulkredirectspath)    | Point to a file with bulk redirects                 |
| **regions**                 |         [View](/docs/project-configuration/vercel-json#regions)         |         [View](/docs/project-configuration/vercel-ts#regions)         | Deploy functions to specific regions                |
| **functionFailoverRegions** | [View](/docs/project-configuration/vercel-json#functionfailoverregions) | [View](/docs/project-configuration/vercel-ts#functionfailoverregions) | Set failover regions for functions                  |
| **rewrites**                |        [View](/docs/project-configuration/vercel-json#rewrites)         |        [View](/docs/project-configuration/vercel-ts#rewrites)         | Route requests to different paths or external URLs  |
| **trailingSlash**           |      [View](/docs/project-configuration/vercel-json#trailingslash)      |      [View](/docs/project-configuration/vercel-ts#trailingslash)      | Add or remove trailing slashes from URLs            |

## Global CLI configuration

[Global Configuration](/docs/project-configuration/global-configuration) affects how Vercel CLI behaves on your machine. These settings are stored in your user directory and apply across all projects.

## Configuration areas

For detailed information about specific configuration areas, see:

- [General Settings](/docs/project-configuration/general-settings) - Project name, Node.js version, build settings, and Vercel Toolbar
- [Project Settings](/docs/project-configuration/project-settings) - Overview of all project settings in the dashboard
- [Git Configuration](/docs/project-configuration/git-configuration) - Configure Git through vercel.json and vercel.ts
- [Git Settings](/docs/project-configuration/git-settings) - Manage Git connection, LFS, and deploy hooks
- [Security settings](/docs/project-configuration/security-settings) - Attack Mode, logs protection, fork protection, OIDC, and retention policies


---

[View full sitemap](/docs/sitemap)
