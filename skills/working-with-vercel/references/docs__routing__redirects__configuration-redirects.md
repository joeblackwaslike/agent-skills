---
title: Configuration Redirects
product: vercel
url: /docs/routing/redirects/configuration-redirects
canonical_url: "https://vercel.com/docs/routing/redirects/configuration-redirects"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/routing/redirects
  - /docs/routing
related:
  - /docs/project-configuration/vercel-json
  - /docs/regions
  - /docs/routing/redirects
summary: Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern matching, and geolocation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/configuration-redirects.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "b5ae0fbe5965386690f5e4caa1e75b4371af63cce2e9f16e56c27c0624ee4704"
---

# Configuration Redirects

Configuration redirects define routing rules that Vercel evaluates at build time. Use them for permanent redirects (`308`), temporary redirects (`307`), and geolocation-based routing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [redirects](https://nextjs.org/docs/pages/api-reference/config/next-config-js/redirects) — Add redirects to your Next.js app.
- [redirects](https://nextjs.org/docs/app/api-reference/config/next-config-js/redirects) — Add redirects to your Next.js app.
- [Emergency Redirect](https://vercel.com/kb/guide/emergency-redirect) — Learn how to implement an emergency redirect without re-deploying your site.
- [Bulk Redirects](https://vercel.com/docs/routing/redirects/bulk-redirects) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [vercel redirects](https://vercel.com/docs/cli/redirects) — Learn how to manage project-level redirects using the vercel redirects CLI command.
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Rewrites on Vercel](https://vercel.com/docs/routing/rewrites) — Learn how to use rewrites to send users to different URLs without modifying the visible URL.

Full cross-link map for this page: [/docs/routing/redirects/configuration-redirects.graph.md](/docs/routing/redirects/configuration-redirects.graph.md)
<!-- /docsgraph:related -->

Define configuration redirects in your framework's config file or in the `vercel.json` file, which is located in the root of your application. The `vercel.json` should contain a `redirects` field, which is an array of redirect rules. For more information on all available properties, see the [project configuration](/docs/project-configuration/vercel-json#redirects) docs.

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "redirects": [
    { "source": "/me", "destination": "/profile.html" },
    { "source": "/user", "destination": "/api/user", "permanent": false },
    {
      "source": "/view-source",
      "destination": "https://github.com/vercel/vercel"
    },
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        {
          "type": "header",
          "key": "x-vercel-ip-country",
          "value": "GB"
        }
      ],
      "destination": "/uk/:path*",
      "permanent": false
    }
  ]
}
```

View the full [API reference](/docs/project-configuration/vercel-json#redirects) for the `redirects` property.

> **💡 Note:** Using `has` does not yet work locally while using `vercel dev`, but does work
> when deployed.

> For \["nextjs","nextjs-app"]:

When using Next.js, you do *not* need to use `vercel.json`. Instead, use the framework-native `next.config.js` to define configuration-based redirects.

```js filename="next.config.js"
module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      {
        source: '/:path((?!uk/).*)',
        has: [
          {
            type: 'header',
            key: 'x-vercel-ip-country',
            value: 'GB',
          },
        ],
        permanent: false,
        destination: '/uk/:path*',
      },
    ];
  },
};
```

Learn more in the [Next.js documentation](https://nextjs.org/docs/app/guides/redirecting).

> For \['sveltekit']:

Use `vercel.json`, see above.

> For \['nuxt']:

When using Nuxt, you do *not* need to use `vercel.json`. Instead, use the framework-native `nuxt.config.ts` to define configuration-based redirects.

```ts filename="nuxt.config.ts"
export default defineNuxtConfig({
  routeRules: {
    '/old-page': { redirect: '/new-page' },
    '/old-page2': { redirect: { to: '/new-page', statusCode: 308 } },
  },
});
```

> For \['other']:

Use `vercel.json`, see above.

When deployed, these redirect rules will be deployed to every [region](/docs/regions) in Vercel's CDN.

## Redirect based on a query string

The `source` pattern matches only the path, so you can't match a query string in `source`. To redirect based on a query parameter, add a `has` condition with `type` set to `query`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "redirects": [
    {
      "source": "/specific/:path*",
      "has": [{ "type": "query", "key": "page", "value": "home" }],
      "destination": "/another/:path*",
      "permanent": false
    }
  ]
}
```

A request to `/specific/mypath?page=home&id=1000` redirects to `/another/mypath?page=home&id=1000` with a `307` status. A request to `/specific/mypath?page=about` doesn't match, so no redirect happens. Use `missing` instead of `has` to redirect only when a parameter is absent.

The request's query string passes through to the destination. If the destination has its own query parameters, Vercel combines them. For example, a rule with `"source": "/"` and `"destination": "/new?path=foo"` redirects `/?baz=10` to `/new?baz=10&path=foo`.

For all `has` and `missing` options, see the [redirects reference](/docs/project-configuration/vercel-json#redirects). In Next.js, `redirects()` in `next.config.js` accepts the same `has` syntax.

## Limits

The [/.well-known/acme-challenge](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
Enterprise teams can configure custom SSL. [Contact sales](/contact/sales) to
learn more.

If you are exceeding the limits below, we recommend using Middleware and Global Config to [dynamically read redirect values](/docs/routing/redirects#middleware).

| Limit                                        | Maximum |
| -------------------------------------------- | ------- |
| Number of redirects in the array             | 2,048   |
| String length for `source` and `destination` | 4,096   |


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
