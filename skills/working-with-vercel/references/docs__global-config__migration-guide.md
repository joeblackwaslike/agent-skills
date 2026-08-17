---
title: Migrating from Edge Config to Global Config
product: vercel
url: /docs/global-config/migration-guide
canonical_url: "https://vercel.com/docs/global-config/migration-guide"
last_updated: 2026-07-29
type: how-to
prerequisites:
  - /docs/global-config
related:
  - /docs/cli/global-config
  - /docs/global-config/global-config-limits
  - /docs/global-config/get-started
  - /docs/global-config/using-global-config
  - /docs/global-config/global-config-sdk
summary: Learn what changed when Edge Config was renamed to Global Config, and how to migrate your connection strings, SDK, and environment variables.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/migration-guide.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "9def2e1bc7711d399d563b3d15c65fba38dbb442b4606d4ae91c2de6cbc90485"
---

# Migrating from Edge Config to Global Config

Edge Config is now **Global Config**. This rename better reflects that it is a globally replicated data store for the configuration that applications read at runtime, such as feature flags, redirects, and experimentation settings.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Implementing Blue-Green Deployments on Vercel](https://vercel.com/kb/guide/blue_green_deployments_on_vercel?from=related) — This guide outlines how to implement blue-green deployments on Vercel, leveraging GitHub Actions for seamless and contro
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy?from=related) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [Implementing Canary Deployments on Vercel](https://vercel.com/kb/guide/implementing_canary_deployments_on_vercel?from=related) — This guide explains how to set up canary deployments on Vercel, enabling developers to gradually roll out new versions t
- [Global Configs & Dashboard](https://vercel.com/docs/global-config/global-config-dashboard?from=related) — Learn how to create, view and update your Global Configs and the data inside them in your Vercel Dashboard at the Hobby
- [Update a Global Config](https://vercel.com/docs/rest-api/global-config/update-a-global-config?from=related)
- [DevCycle](https://vercel.com/docs/global-config/global-config-integrations/devcycle-global-config?from=related) — Learn how to use Global Config with Vercel's DevCycle integration.

Full cross-link map for this page: [/docs/global-config/migration-guide.graph.md](/docs/global-config/migration-guide.graph.md)
<!-- /docsgraph:related -->

The store itself is unchanged. This page lists everything that changed with the rename, and what to do if you use the REST API, connection strings, or a custom environment variable setup.

## What changed

| Area                         | Before                           | Now                                                             |
| ---------------------------- | -------------------------------- | --------------------------------------------------------------- |
| Domain                       | `https://edge-config.vercel.com` | `https://global-config.vercel.com`                              |
| REST API                     | `api.vercel.com/v1/edge-config`  | `api.vercel.com/v1/global-config`                               |
| SDK package                  | `@vercel/edge-config`            | `@vercel/global-config`                                         |
| Default environment variable | `EDGE_CONFIG`                    | `GLOBAL_CONFIG`                                                 |
| CLI command                  | `vercel edge-config`             | [`vercel global-config`](/docs/cli/global-config)               |
| Dashboard                    | Storage tab shows Edge Config    | Storage tab shows Global Config, everything else is unchanged  |
| Documentation                | `/docs/edge-config`              | `/docs/global-config`, old URLs redirect                        |
| Limits                       | Plan-based caps                  | Raised on every plan, see [new limits](#new-limits)             |

The old connection string, API path, package, `vercel edge-config` CLI command, and `EDGE_CONFIG` environment variable all continue to work. There is no timeline for when they'll be removed.

## What you need to do

- **Existing projects: no action required.** Deployments, connected stores, and the `EDGE_CONFIG` environment variable continue to work.
- **Upgrading proactively is safe.** The new SDK reads `GLOBAL_CONFIG` by default and falls back to `EDGE_CONFIG`, so it works with stores connected before and after the rename. You can switch packages today without touching your stores.
- **Creating stores and pushing new config values work without upgrading.** Neither depends on which SDK version your project uses.
- **Upgrade before connecting new stores to a project.** Connecting a store now creates a `GLOBAL_CONFIG` environment variable, and the legacy SDK only reads `EDGE_CONFIG` by default. A project still on `@vercel/edge-config` cannot read a newly connected store.

## Upgrading the SDK

Use `@vercel/global-config` as a drop-in replacement for `@vercel/edge-config`:

<CodeBlock>
  <Code tab="pnpm">
    ```bash
    pnpm i @vercel/global-config
    ```
  </Code>
  <Code tab="yarn">
    ```bash
    yarn i @vercel/global-config
    ```
  </Code>
  <Code tab="npm">
    ```bash
    npm i @vercel/global-config
    ```
  </Code>
  <Code tab="bun">
    ```bash
    bun i @vercel/global-config
    ```
  </Code>
</CodeBlock>

Then update your imports:

```diff filename="example.ts"
- import { get } from '@vercel/edge-config';
+ import { get } from '@vercel/global-config';
```

If you store connection strings under custom environment variable names and read them with `createClient`, both packages continue to work with your existing setup.

## Custom setups

- **REST API:** New integrations should use `api.vercel.com/v1/global-config`. Requests to `api.vercel.com/v1/edge-config` continue to work.
- **Connection strings:** Stores connected to a project from now on receive connection strings that use `global-config.vercel.com`. Existing `edge-config.vercel.com` connection strings remain valid.

## New limits

Limits are raised on every plan:

| Limit      | Hobby                     | Pro                            | Enterprise                     |
| ---------- | ------------------------- | ------------------------------ | ------------------------------ |
| Stores     | 1 (unchanged)             | Unlimited (was 3)              | Unlimited (was 10)             |
| Writes     | 250 per month (unchanged) | 100 per hour (was 480 per day) | 100 per hour (was 480 per day) |
| Store size | 1 MB (was 8 KB)           | 1 MB (was 64 KB)               | 1 MB (was 512 KB)              |

The hourly write limit allows up to 2,400 writes per day. The per-project connection limit is unchanged: 1 on Hobby, and 3 on Pro and Enterprise.

Pricing is unchanged, see [Limits and Pricing](/docs/global-config/global-config-limits) for details.

## More resources

- [Getting started with Global Config](/docs/global-config/get-started)
- [Using Global Config](/docs/global-config/using-global-config)
- [Global Config SDK](/docs/global-config/global-config-sdk)


---

[View full sitemap](/docs/sitemap)
