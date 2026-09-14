---
title: Request headers
product: vercel
url: /docs/headers/request-headers
canonical_url: "https://vercel.com/docs/headers/request-headers"
last_updated: 2025-12-13
type: reference
prerequisites:
  - /docs/headers
related:
  - /docs/functions
  - /docs/regions
  - /docs/webhooks
  - /docs/drains
  - /docs/drains/security
summary: Learn about the request headers sent to each Vercel deployment and how to use them to process requests before sending a response.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/headers/request-headers.md"
fetched_at: "2026-09-14T09:45:03.548Z"
sha256: "9006885c7e6b990d29c7a156f61c9a38576023b0bd8f9368e995070abcca498f"
---

# Request headers

The following headers are sent to each Vercel deployment and can be used to process the request before sending back a response. These headers can be read from the [Request](https://nodejs.org/api/http.html#http_message_headers) object in your [Vercel Function](/docs/functions).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a honeypot with Vercel Web Application Firewall](https://vercel.com/kb/guide/how-to-build-a-honeypot-with-vercel-web-application-firewall?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Learn how to build a honeypot with Vercel Web Application Firewall \\(WAF\\) that catches bots ignoring your robots.txt. C
- [Requester's public IP postal code now available in Vercel Functions](https://vercel.com/changelog/requesters-public-ip-postal-code-now-available-in-vercel-functions?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related)
- [How can I use geolocation IP headers?](https://vercel.com/kb/guide/geo-ip-headers-geolocation-vercel-functions?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Learn how to read geolocation headers on Vercel with Next.js or any frontend framework.
- [IP Geolocation for Serverless Functions](https://vercel.com/changelog/ip-geolocation-for-serverless-functions?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related)
- [Enhanced geolocation information for Vercel Functions](https://vercel.com/changelog/enhanced-geolocation-information-available-for-vercel-functions?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related)
- [Vercel CDN Cache](https://vercel.com/docs/caching/cdn-cache?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Learn how Vercel's CDN cache stores your content across a global network to reduce latency and origin load.
- [Response headers](https://vercel.com/docs/headers/response-headers?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Learn about the response headers sent to each Vercel deployment and how to use them to process responses before sending
- [Programmatic Configuration with vercel.ts](https://vercel.com/docs/project-configuration/vercel-ts?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Define your Vercel configuration in vercel.ts with @vercel/config for type-safe routing and build settings.
- [Framework environment variables](https://vercel.com/docs/environment-variables/framework-environment-variables?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Framework environment variables are automatically populated by the Vercel, based on your project's framework.
- [Routing Middleware API](https://vercel.com/docs/routing-middleware/api?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=related) — Learn how you can use Routing Middleware, code that executes before a request is processed on a site, to provide speed a

Full cross-link map for this page: [/docs/headers/request-headers.graph.md](/docs/headers/request-headers.graph.md?from=related&source_path=%2Fdocs%2Fheaders%2Frequest-headers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## `host`

This header represents the domain name as it was accessed by the client. If the deployment has been assigned to a preview URL or production domain and the client visits the domain URL, it contains the custom domain instead of the underlying deployment URL.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const host = request.headers.get('host');
  return new Response(`Host: ${host}`);
}
```

## `x-vercel-id`

This header contains a list of [Vercel regions](/docs/regions) your request hit, as well as the region the function was executed in (for both Edge and Serverless).

It also allows Vercel to automatically prevent infinite loops.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const vercelId = request.headers.get('x-vercel-id');
  return new Response(`Vercel ID: ${vercelId}`);
}
```

## `x-forwarded-host`

This header is identical to the `host` header.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const host = request.headers.get('x-forwarded-host');
  return new Response(`Host: ${host}`);
}
```

## `x-forwarded-proto`

This header represents the protocol of the forwarded server, typically `https` in production and `http`in development.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const protocol = request.headers.get('x-forwarded-proto');
  return new Response(`Protocol: ${protocol}`);
}
```

## `x-forwarded-for`

The public IP address of the client that made the request.

If you are trying to use Vercel behind a proxy, we currently overwrite the [`X-Forwarded-For`](https://developer.mozilla.org/docs/Web/HTTP/Headers/X-Forwarded-For) header and **do not forward external IPs**. This restriction is in place to prevent IP spoofing.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const ip = request.headers.get('x-forwarded-for');
  return new Response(`IP: ${ip}`);
}
```

### Custom `X-Forwarded-For` IP

> **🔒 Permissions Required**: Trusted Proxy

**Enterprise customers** can purchase and enable a trusted proxy to allow your custom `X-Forwarded-For` IP. [Contact us](/contact/sales) for more information.

## `x-vercel-forwarded-for`

This header is identical to the `x-forwarded-for` header. However, `x-forwarded-for` could be overwritten if you're using a proxy on top of Vercel.

## `x-real-ip`

This header is identical to the `x-forwarded-for` header.

## `x-vercel-deployment-url`

This header represents the unique deployment, not the preview URL or production domain. For example, `*.vercel.app`.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const deploymentUrl = request.headers.get('x-vercel-deployment-url');
  return new Response(`Deployment URL: ${deploymentUrl}`);
}
```

## `x-vercel-ip-continent`

A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) code representing the continent associated with the location of the requester's public IP address. Codes used to identify continents are as follows:

- `AF` for Africa
- `AN` for Antarctica
- `AS` for Asia
- `EU` for Europe
- `NA` for North America
- `OC` for Oceania
- `SA` for South America

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const continent = request.headers.get('x-vercel-ip-continent');
  return new Response(`Continent: ${continent}`);
}
```

## `x-vercel-ip-country`

A two-character [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) country code for the country associated with the location of the requester's public IP address.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const country = request.headers.get('x-vercel-ip-country');
  return new Response(`Country: ${country}`);
}
```

## `x-vercel-ip-country-region`

A string of up to three characters containing the region-portion of the [ISO 3166-2](https://en.wikipedia.org/wiki/ISO_3166-2) code for the first level region associated with the requester's public IP address. Some countries have two levels of subdivisions, in which case this is the least specific one. For example, in the United Kingdom this will be a country like "England", not a county like "Devon".

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const region = request.headers.get('x-vercel-ip-country-region');
  return new Response(`Region: ${region}`);
}
```

## `x-vercel-ip-city`

The city name for the location of the requester's public IP address. Non-ASCII characters are encoded according to [RFC3986](https://tools.ietf.org/html/rfc3986).

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const city = request.headers.get('x-vercel-ip-city');
  return new Response(`City: ${city}`);
}
```

## `x-vercel-ip-latitude`

The latitude for the location of the requester's public IP address. For example, `37.7749`.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const latitude = request.headers.get('x-vercel-ip-latitude');
  return new Response(`Latitude: ${latitude}`);
}
```

## `x-vercel-ip-longitude`

The longitude for the location of the requester's public IP address. For example, `-122.4194`.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const longitude = request.headers.get('x-vercel-ip-longitude');
  return new Response(`Longitude: ${longitude}`);
}
```

## `x-vercel-ip-timezone`

The name of the time zone for the location of the requester's public IP address in ICANN Time Zone Database name format such as `America/Chicago`.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const timezone = request.headers.get('x-vercel-ip-timezone');
  return new Response(`Timezone: ${timezone}`);
}
```

## `x-vercel-ip-postal-code`

The postal code close to the user's location.

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs
export function GET(request: Request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs
export function GET(request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

**api/header.ts**

```ts filename="api/header.ts" framework=other
export function GET(request: Request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

**api/header.js**

```js filename="api/header.js" framework=other
export function GET(request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

**app/api/header/route.ts**

```ts filename="app/api/header/route.ts" framework=nextjs-app
export function GET(request: Request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

**app/api/header/route.js**

```js filename="app/api/header/route.js" framework=nextjs-app
export function GET(request) {
  const postalCode = request.headers.get('x-vercel-ip-postal-code');
  return new Response(`Postal Code: ${postalCode}`);
}
```

## `x-vercel-signature`

Vercel sends an `x-vercel-signature` header with requests from [Webhooks](/docs/webhooks), [Log Drains](/docs/drains), and other services. The header contains an HMAC-SHA1 signature that you can use to verify the request came from Vercel.

### 1. Reading the header value

First, let's see how to read the header value from incoming requests:

**app/api/webhook/route.ts**

```ts filename="app/api/webhook/route.ts" framework=nextjs
export function POST(request: Request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

**app/api/webhook/route.js**

```js filename="app/api/webhook/route.js" framework=nextjs
export function POST(request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

**api/webhook.ts**

```ts filename="api/webhook.ts" framework=other
export function POST(request: Request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

**api/webhook.js**

```js filename="api/webhook.js" framework=other
export function POST(request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

**app/api/webhook/route.ts**

```ts filename="app/api/webhook/route.ts" framework=nextjs-app
export function POST(request: Request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

**app/api/webhook/route.js**

```js filename="app/api/webhook/route.js" framework=nextjs-app
export function POST(request) {
  const signature = request.headers.get('x-vercel-signature');
  return new Response(`Signature: ${signature}`);
}
```

### 2. Verifying the signature

When your server has a public endpoint, anyone who knows the URL can send requests to it. Verify the signature to confirm the request came from Vercel and wasn't tampered with.

Vercel creates the signature as an HMAC-SHA1 hash of the raw request body using a secret key. To verify it, generate the same hash with your secret (See [Getting your signature secret](#3.-getting-your-signature-secret)) and compare the values:

**app/api/webhook/route.ts**

```ts filename="app/api/webhook/route.ts" framework=nextjs-app
import crypto from 'crypto';

export async function POST(request: Request) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers.get('x-vercel-signature');

  const rawBody = await request.text();
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return Response.json({ error: 'Invalid signature' }, { status: 403 });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody);
  return Response.json({ success: true });
}
```

**app/api/webhook/route.js**

```js filename="app/api/webhook/route.js" framework=nextjs-app
import crypto from 'crypto';

export async function POST(request) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers.get('x-vercel-signature');

  const rawBody = await request.text();
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return Response.json({ error: 'Invalid signature' }, { status: 403 });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody);
  return Response.json({ success: true });
}
```

**pages/api/webhook.ts**

```ts filename="pages/api/webhook.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers['x-vercel-signature'];

  const rawBody = await getRawBody(request);
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    typeof headerSignature !== 'string' ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return response.status(403).json({ error: 'Invalid signature' });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody.toString('utf-8'));
  return response.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

**pages/api/webhook.js**

```js filename="pages/api/webhook.js" framework=nextjs
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(request, response) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers['x-vercel-signature'];

  const rawBody = await getRawBody(request);
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    typeof headerSignature !== 'string' ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return response.status(403).json({ error: 'Invalid signature' });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody.toString('utf-8'));
  return response.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

**api/webhook.ts**

```ts filename="api/webhook.ts" framework=other
import type { VercelRequest, VercelResponse } from '@vercel/node';
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers['x-vercel-signature'];

  const rawBody = await getRawBody(request);
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    typeof headerSignature !== 'string' ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return response.status(403).json({ error: 'Invalid signature' });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody.toString('utf-8'));
  return response.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

**api/webhook.js**

```js filename="api/webhook.js" framework=other
import crypto from 'crypto';
import getRawBody from 'raw-body';

export default async function handler(request, response) {
  const signatureSecret = process.env.WEBHOOK_SECRET;
  const headerSignature = request.headers['x-vercel-signature'];

  const rawBody = await getRawBody(request);
  const bodySignature = crypto
    .createHmac('sha1', signatureSecret)
    .update(rawBody)
    .digest('hex');

  // Use constant-time comparison to prevent timing attacks
  if (
    !headerSignature ||
    typeof headerSignature !== 'string' ||
    headerSignature.length !== bodySignature.length ||
    !crypto.timingSafeEqual(
      Buffer.from(headerSignature),
      Buffer.from(bodySignature)
    )
  ) {
    return response.status(403).json({ error: 'Invalid signature' });
  }

  // Process the verified request
  const payload = JSON.parse(rawBody.toString('utf-8'));
  return response.status(200).json({ success: true });
}

export const config = {
  api: {
    bodyParser: false,
  },
};
```

### 3. Getting your signature secret

The secret key you need depends on what type of request you're receiving:

- **For account webhooks**: The secret displayed when [creating the webhook](/docs/webhooks#enter-your-endpoint-url)
- **For integration webhooks**: Your Integration Secret (also called Client Secret) from the [Integration Console](https://vercel.com/dashboard/integrations/console)
- **For log drains**: Click **Edit** in the Drains list to find or update your [Drain signature secret](/docs/drains/security)

For complete examples with additional error handling, see [Securing webhooks](/docs/webhooks/webhooks-api#securing-webhooks) and [Drain security](/docs/drains/security).


---

[View full sitemap](/docs/sitemap)
