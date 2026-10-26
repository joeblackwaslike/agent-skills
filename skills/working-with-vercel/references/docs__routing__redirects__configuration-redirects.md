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
  - /docs/project-configuration
  - /docs/regions
  - /docs/routing/redirects
summary: Learn how to define static redirects in your framework configuration or vercel.json with support for wildcards, pattern matching, and geolocation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/redirects/configuration-redirects.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "abdcaefec7adbfaa36e577cfcdb3e62cd6daa0521a90c7e2ebc4d2d2da3b1fc0"
---

# Configuration Redirects

Configuration redirects define routing rules that Vercel evaluates at build time. Use them for permanent redirects (`308`), temporary redirects (`307`), and geolocation-based routing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Redirecting Domains](https://vercel.com/blog/redirecting-domains)
- [Dynamic redirects with Global Config and Next.js proxy](https://vercel.com/kb/guide/dynamic-redirects-with-global-config-and-next-js-proxy) — Learn how to create redirects that update instantly without redeploying by storing rules in Global Config and reading th
- [How can I increase the limit of redirects or use dynamic redirects on Vercel?](https://vercel.com/kb/guide/how-can-i-increase-the-limit-of-redirects-or-use-dynamic-redirects-on-vercel) — Instructions on how to use Serverless Functions to handle redirects on Vercel.
- [How do I perform Vercel redirects based on query strings?](https://vercel.com/kb/guide/how-do-i-perform-vercel-redirects-based-on-query-strings) — When using redirects with the \\`vercel.json\\` or \\`next.config.js\\` configuration file, your URL may contain query param
- [Can I redirect from a subdomain to a subpath?](https://vercel.com/kb/guide/can-i-redirect-from-a-subdomain-to-a-subpath) — Learn how to redirect from your subdomain to a subpath on Vercel with a vercel.json file or with Next.js
- [vercel redirects](https://vercel.com/docs/cli/redirects) — Learn how to manage project-level redirects using the vercel redirects CLI command.
- [Bulk Redirects](https://vercel.com/docs/routing/redirects/bulk-redirects) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Managing redirects at scale](https://vercel.com/docs/routing/redirects/manage-redirects-at-scale) — Add, bulk upload, version, and roll back project-level redirects using the CLI.
- [Getting Started](https://vercel.com/docs/routing/redirects/bulk-redirects/getting-started) — Learn how to import thousands of simple redirects from CSV, JSON, or JSONL files.
- [Project-Level Routing Rules](https://vercel.com/docs/routing/project-routing-rules) — Add redirects, rewrites, headers, and status codes to your project from the dashboard or API, without deploying new code

Full cross-link map for this page: [/docs/routing/redirects/configuration-redirects.graph.md](/docs/routing/redirects/configuration-redirects.graph.md)
<!-- /docsgraph:related -->

Define configuration redirects in your framework's config file or in the `vercel.json` file, which is located in the root of your application. The `vercel.json` should contain a `redirects` field, which is an array of redirect rules. For more information on all available properties, see the [project configuration](/docs/project-configuration#redirects) docs.

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

View the full [API reference](/docs/project-configuration#redirects) for the `redirects` property.

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

## Limits

The [/.well-known](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
Enterprise teams can configure custom SSL. [Contact sales](/contact/sales) to
learn more.

If you are exceeding the limits below, we recommend using Middleware and Global Config to [dynamically read redirect values](/docs/routing/redirects#edge-middleware).

| Limit                                        | Maximum |
| -------------------------------------------- | ------- |
| Number of redirects in the array             | 2,048   |
| String length for `source` and `destination` | 4,096   |


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
