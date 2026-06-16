---
title: Rewrites on Vercel
product: vercel
url: /docs/routing/rewrites
canonical_url: "https://vercel.com/docs/routing/rewrites"
last_updated: 2026-04-05
type: conceptual
prerequisites:
  - /docs/routing
related:
  - /docs/project-configuration
  - /docs/caching/cache-control-headers
  - /docs/caching/cdn-cache/purge
  - /docs/headers/cache-control-headers
  - /docs/cdn-cache/purge
summary: Learn how to use rewrites to send users to different URLs without modifying the visible URL.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/routing/rewrites.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "6afc0a25391fe2aa2e8ccb0f12fd1df0f2ff588c04f66b1cc337679a762532a6"
---

# Rewrites on Vercel

A rewrite routes a request to a different destination without changing the URL in the browser. Unlike redirects, the user won't see the URL change.

There are two main types:

1. **Same-application rewrites** – Route requests to different pages within your Vercel project.
2. **Rewrites to external origins** – Forward requests to an API or website outside your Vercel project.

The [/.well-known](# "The /.well-known directory") path is reserved and cannot be redirected or rewritten. Only
Enterprise teams can configure custom SSL. [Contact sales](/contact/sales) to
learn more.

## Setting up rewrites

Rewrites are defined in a `vercel.json` file in your project's root directory:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/source-path",
      "destination": "/destination-path"
    }
  ]
}
```

For all configuration options, see the [project configuration](/docs/project-configuration#rewrites) docs.

## Same-application rewrites

Same-application rewrites route requests to different destinations within your project. Common uses include:

- **Friendly URLs**: Transform `/products/t-shirts` into `/catalog?category=t-shirts`
- **Device-specific content**: Show different layouts based on device type
- **A/B testing**: Route users to different versions of a page
- **Country-specific content**: Show region-specific content based on the user's location

Example: Route image resize requests to a serverless function:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/resize/:width/:height",
      "destination": "/api/sharp"
    }
  ]
}
```

This converts a request like `/resize/800/600` to `/api/sharp?width=800&height=600`.

Example: Route UK visitors to a UK-specific section:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/:path((?!uk/).*)",
      "has": [
        { "type": "header", "key": "x-vercel-ip-country", "value": "GB" }
      ],
      "destination": "/uk/:path*"
    }
  ]
}
```

This routes a UK visitor requesting `/about` to `/uk/about`.

## Rewrites to external origins

An external origin is any API or website outside your Vercel project. Rewrites to external origins forward requests to these destinations, effectively allowing Vercel to function as a reverse proxy or standalone CDN. You can use this feature to:

- **Proxy API requests**: Hide your actual API endpoint
- **Combine multiple services**: Merge multiple backends under one domain
- **Create microfrontends**: Combine multiple Vercel applications into a single website
- **Add caching**: Cache external API responses on the CDN
- **Serve externally hosted content**: Serve content that is not hosted on Vercel.

Example: Forward API requests to an external endpoint:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ]
}
```

A request to `/api/users` will be forwarded to `https://api.example.com/users` without changing the URL in the browser.

### Caching rewrites to external origins

Vercel honors `cache-control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control` headers from upstream servers on external rewrites. When your upstream returns caching headers, Vercel caches the response on the CDN accordingly. This behavior is enabled by default for projects created on or after April 6, 2026, for older projects that have the setting enabled in the dashboard, or when you set the `x-vercel-enable-rewrite-caching` header. Older projects retain the previous uncached behavior unless you [opt in](#honoring-cache-control-headers-for-older-projects).

> **💡 Note:** If your upstream returns caching headers you don't intend to honor, review them to ensure they reflect your intended caching strategy.

You can override upstream caching headers using [`CDN-Cache-Control`](/docs/caching/cache-control-headers#cdn-cache-control-header) or [`Vercel-CDN-Cache-Control`](/docs/caching/cache-control-headers#cdn-cache-control-header) in your `vercel.json`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        {
          "key": "CDN-Cache-Control",
          "value": "max-age=60"
        }
      ]
    }
  ]
}
```

This caches the response on the CDN for 60 seconds, regardless of what the upstream server returns.

> **💡 Note:** When caching external rewrites, it's best practice to also include a `Vercel-Cache-Tag` response header with a
> comma-separated list of tags so you can later [purge the CDN cache by tag](/docs/caching/cdn-cache/purge) at your convenience.

#### Disabling caching for rewrites to external origins

To opt out of the default caching behavior and prevent Vercel from caching upstream responses, set the `x-vercel-enable-rewrite-caching` header to `0`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [
        { "key": "x-vercel-enable-rewrite-caching", "value": "0" }
      ]
    }
  ]
}
```

This restores the previous behavior where upstream caching headers are ignored and responses are never cached.

For more information on caching headers, see the [Cache-Control headers documentation](/docs/caching/cache-control-headers).

### Honoring cache-control headers for older projects

> **💡 Note:** This section applies to projects created before April 6, 2026 that have not yet adopted the new default caching behavior. For projects created on or after April 6, 2026, external rewrites respect upstream `cache-control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control` headers by default and this section does not apply.

Before April 6, 2026, external rewrites were not cached by default. To opt in to caching, you had to add the `x-vercel-enable-rewrite-caching` header to your `vercel.json`:

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://api.example.com/:path*"
    }
  ],
  "headers": [
    {
      "source": "/api/:path*",
      "headers": [{ "key": "x-vercel-enable-rewrite-caching", "value": "1" }]
    }
  ]
}
```

This tells Vercel to respect caching headers (`cache-control`, `CDN-Cache-Control`, and `Vercel-CDN-Cache-Control`) on the upstream response. Once enabled, you can control the cache duration in two ways:

1. **From your API (preferred)**: When you control the backend, return [`CDN-Cache-Control`](/docs/caching/cache-control-headers#cdn-cache-control-header) or [`Vercel-CDN-Cache-Control`](/docs/caching/cache-control-headers#cdn-cache-control-header) headers in the API response:

   ```
   CDN-Cache-Control: max-age=60
   ```

   This caches the response on the CDN for 60 seconds.

2. **From Vercel configuration**: When you can't modify the backend, set caching headers in `vercel.json` alongside `x-vercel-enable-rewrite-caching`:

   ```json filename="vercel.json"
   {
     "$schema": "https://openapi.vercel.sh/vercel.json",
     "rewrites": [
       {
         "source": "/api/:path*",
         "destination": "https://api.example.com/:path*"
       }
     ],
     "headers": [
       {
         "source": "/api/:path*",
         "headers": [
           { "key": "x-vercel-enable-rewrite-caching", "value": "1" },
           {
             "key": "CDN-Cache-Control",
             "value": "max-age=60"
           }
         ]
       }
     ]
   }
   ```

   This caches the response on the CDN for 60 seconds.

For more information on caching headers, see the [Cache-Control headers documentation](/docs/headers/cache-control-headers).

> **💡 Note:** When caching rewrites to external origins, it's best practice to also include a `Vercel-Cache-Tag` response header with a
> comma-separated list of tags so you can later [purge the CDN cache by tag](/docs/cdn-cache/purge) at your convenience.

### Draining rewrites to external origins

You can export rewrite data by draining logs from your application. External origin events appear in your runtime logs, allowing you to monitor proxy requests, track external API calls, and analyze traffic patterns to your backend services.

To get started, configure a [logs drain](/docs/drains/using-drains).

### Observing rewrites to external origins

You can observe your external origin performance using Observability. The **External Origins** tab shows request counts, connection latency, and traffic patterns for your proxied requests, helping you monitor backend performance and validate that rewrites are working as expected.

Learn more in the [Observability Insights](/docs/observability/insights#external-rewrites) documentation.

## Framework considerations

**Rewrites to external origins** work universally with all frameworks, making them ideal for API proxying, microfrontend architectures, and serving content from external origins through Vercel's global network as a reverse proxy or standalone CDN.

For **same-application rewrites**, always prefer your framework's native routing capabilities:

- **Next.js**: [Next.js rewrites](https://nextjs.org/docs/api-reference/next.config.js/rewrites)
- **Astro**: [Astro routing](/docs/frameworks/astro#rewrites)
- **SvelteKit**: [SvelteKit routing](/docs/frameworks/sveltekit#rewrites)

Use `vercel.json` rewrites for same-application routing only when your framework doesn't provide native routing features. Always consult your framework's documentation for the recommended approach.

## Testing rewrites

Use Vercel's preview deployments to test your rewrites before going to production. Each pull request creates a unique preview URL where you can verify your rewrites work correctly.

## Wildcard path forwarding

You can capture and forward parts of a path using wildcards:

```json
{
  "rewrites": [
    {
      "source": "/docs/:path*",
      "destination": "/help/:path*"
    }
  ]
}
```

A request to `/docs/getting-started/install` will be forwarded to `/help/getting-started/install`.

You can also capture multiple path segments:

```json
{
  "rewrites": [
    {
      "source": "/blog/:year/:month/:slug*",
      "destination": "/posts?date=:year-:month&slug=:slug*"
    }
  ]
}
```

## Using regular expressions

For more complex patterns, you can use regular expressions with capture groups:

```json
{
  "rewrites": [
    {
      "source": "^/articles/(\\d{4})/(\\d{2})/(.+)$",
      "destination": "/archive?year=$1&month=$2&slug=$3"
    }
  ]
}
```

This converts `/articles/2023/05/hello-world` to `/archive?year=2023&month=05&slug=hello-world`.

You can also use named capture groups:

```json
{
  "rewrites": [
    {
      "source": "^/products/(?<category>[a-z]+)/(?<id>\\d+)$",
      "destination": "/shop?category=$category&item=$id"
    }
  ]
}
```

This converts `/products/shirts/123` to `/shop?category=shirts&item=123`.

## When to use each type

- **Same-application rewrites**: Use when routing within your own application
- **Rewrites to external origins**: Use when connecting to external APIs, creating microfrontends, or using Vercel as a reverse proxy or standalone CDN for third-party content


---

[View full sitemap](/docs/sitemap)
