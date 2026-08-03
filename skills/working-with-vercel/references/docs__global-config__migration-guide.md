---
title: Migration Guide
product: vercel
url: /docs/global-config/migration-guide
canonical_url: "https://vercel.com/docs/global-config/migration-guide"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/global-config
related:
  - /docs/cli/global-config
  - /docs/global-config/global-config-limits
  - /docs/global-config/get-started
  - /docs/global-config/using-global-config
  - /docs/global-config/global-config-sdk
summary: Learn about migration guide on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/migration-guide.md"
fetched_at: "2026-08-03T07:34:45.774Z"
sha256: "bf1b23dd561b03454e78209aafa2afdd5e6181dea8b0dcd5743f7b0d1205b87e"
---

# Migrating from Edge Config to Global Config

Edge Config is now **Global Config**. This rename better reflects that it is a globally replicated data store for the configuration that applications read at runtime, such as feature flags, redirects, and experimentation settings.

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
