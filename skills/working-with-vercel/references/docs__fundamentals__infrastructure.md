---
title: How requests flow through Vercel
product: vercel
url: /docs/fundamentals/infrastructure
canonical_url: "https://vercel.com/docs/fundamentals/infrastructure"
last_updated: 2026-06-17
type: conceptual
prerequisites:
  - /docs/fundamentals
related:
  - /docs/regions
  - /docs/security/vercel-waf
  - /docs/security/vercel-firewall
  - /docs/vercel-firewall/ddos-mitigation
  - /docs/routing-middleware
summary: Learn how Vercel routes, secures, and serves requests from your users to your application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/fundamentals/infrastructure.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "2b30f5c5ae0a0222c5038fd591804b1acb4084ae4f8c868e87ecac5d246aa22b"
---

# How requests flow through Vercel

When you deploy to Vercel, your code runs on a global network of servers. This network puts your application close to your users, reduces latency, and handles scaling automatically. This is part of Vercel's [self-driving infrastructure](https://vercel.com/blog/self-driving-infrastructure): a system where you express intent, and the platform handles operations.

The following sections walk through what happens from the moment a user presses **enter** on their keyboard to when your application appears on their screen. For a deeper technical dive, see [Life of a Vercel Request: What Happens When a User Presses Enter](https://vercel.com/blog/life-of-a-vercel-request-what-happens-when-a-user-presses-enter).

![Image](https://vercel.com/docs-assets/static/docs/getting-started-with-vercel/vercel-infra-light.png)

## How requests enter Vercel's global network

When a user requests your site, their browser performs a DNS lookup. For sites hosted on Vercel, this resolves to an anycast IP address owned by Vercel.

Vercel uses a global load balancer with [anycast routing](https://vercel.com/blog/effortless-high-availability-for-dynamic-frontends#initiating-at-edge:-optimized-global-routing) to direct the request to the optimal Point of Presence (PoP) across 100+ global locations. The routing decision considers the number of network hops, round-trip time, and available bandwidth.

Once the request reaches a PoP, it leaves the public internet and travels over a private fiber-optic backbone. This dedicated path reduces latency, jitter, and packet loss compared to the unpredictable public internet.

For more on how Vercel's network operates, see [Life of a Vercel Request: Navigating the Network](https://vercel.com/blog/life-of-a-vercel-request-navigating-the-edge-network).

**Regions**: Learn about Vercel's global infrastructure regions. [Learn more →](/docs/regions)

## How Vercel secures requests before they reach your application

Before your application logic sees any request, it passes through Vercel's integrated security layer. Requests encounter multiple stages of defense covering Network layer 3, Transport layer 4, and Application layer 7.

### TLS termination

The global load balancer hands off raw TCP/IP requests to the TLS terminator. This service handles the TLS handshake with the browser, turning encrypted HTTPS requests into readable HTTP that Vercel's systems can process.

At any moment, the TLS terminator holds millions of concurrent connections to the internet. The TLS terminator:

- Decrypts HTTPS requests, offloading CPU-intensive cryptographic work from your application
- Manages connection pooling to handle slow clients without blocking resources
- Acts as an enforcer: if a request is flagged as malicious, this is where it gets blocked

### System DDoS mitigation

Working in tandem with the TLS terminator is Vercel's [always-on system DDoS mitigation](https://vercel.com/blog/protectd-evolving-vercels-always-on-denial-of-service-mitigations). Unlike traditional firewalls that rely on static rules, this system analyzes the entire data stream in real time. It continuously maps relationships between traffic attributes (TLS fingerprints, User-Agent strings, IP reputation), detects attack patterns, botnets, and DDoS attempts, and pushes defensive signatures to the TLS terminator within seconds. The system blocks L3, L4, and L7 threats close to the source, before they reach your application.

This system runs across all deployments by default, delivering a P99 time-to-mitigation of 3.5 seconds for novel attacks.

### Web Application Firewall

For additional protection, you can configure the [Web Application Firewall (WAF)](/docs/security/vercel-waf) with custom rules. The WAF lets you create granular rules for your specific application needs, while Vercel's system DDoS mitigation handles platform-wide threat detection automatically.

**Vercel Firewall**: Configure firewall rules to protect your applications. [Learn more →](/docs/security/vercel-firewall)

**DDoS Mitigation**: Learn how Vercel protects against distributed denial-of-service attacks. [Learn more →](/docs/vercel-firewall/ddos-mitigation)

## How the proxy routes requests to your application

After passing security checks, the request enters the proxy. This is the decision engine of the Vercel network.

The proxy is application-aware. It consults a globally replicated metadata service that contains the configuration for every deployment. This metadata comes from your `vercel.json` or framework configuration file (like `next.config.js`).

Using this information, the proxy determines the following:

1. **Route type**: Does this URL point to a static file or a dynamic function?
2. **Rewrites and redirects**: Does the URL need modification before processing?
3. **Middleware**: Does [Routing Middleware](/docs/routing-middleware) need to run first for tasks like authentication or A/B testing?

For a detailed look at how routing decisions work, see [Life of a Request: Application-Aware Routing](https://vercel.com/blog/life-of-a-request-application-aware-routing).

**Routing Middleware**: Run code before a request is completed for authentication, A/B testing, and more. [Learn more →](/docs/routing-middleware)

**Redirects**: Redirect incoming requests to different URLs. [Learn more →](/docs/redirects)

**Rewrites**: Map incoming requests to different destinations without changing the URL. [Learn more →](/docs/rewrites)

## How Vercel caches static and dynamic content

Most applications serve a mix of static and dynamic content. For static assets, pre-rendered pages, and cacheable responses, the proxy checks the **Vercel Cache**.

| Cache Status        | What Happens                                                                        |
| ------------------- | ----------------------------------------------------------------------------------- |
| **Hit**             | Content returns immediately to the user from the PoP closest to them                |
| **Miss**            | Content generates in real time and populates the cache for future requests          |
| **Stale hit (ISR)** | Stale content serves instantly while a background process regenerates fresh content |

With [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration), you can serve cached content instantly while keeping it fresh. The cache serves the existing version to your user and triggers regeneration in the background for the next visitor.

**Caching**: Understand how Vercel's edge cache accelerates your applications. [Learn more →](/docs/cdn-cache)

**Incremental Static Regeneration**: Update static content without rebuilding your entire site. [Learn more →](/docs/incremental-static-regeneration)

**Cache Headers**: Control caching behavior with HTTP headers. [Learn more →](/docs/headers/cache-control-headers)

## How Vercel executes server-side code

When a request requires dynamic data, personalization, or server-side logic, the proxy forwards it to the **Compute Layer**.

The request flow works like this:

1. **Vercel Functions router** receives the request and manages concurrency. Even during massive traffic spikes, the router queues and shapes traffic to prevent failures.
2. A **Compute instance** executes your code. With [Fluid compute](/docs/fluid-compute), instances can handle multiple concurrent requests efficiently.
3. **Response loop**: The compute instance generates HTML or JSON and sends it back through the proxy. If your response headers allow caching, the proxy stores the response for future requests.

**Vercel Functions**: Run server-side code without managing infrastructure. [Learn more →](/docs/functions)

**Fluid Compute**: Scale compute resources automatically based on demand. [Learn more →](/docs/fluid-compute)

**What is Compute?**: Understand the fundamentals of compute on Vercel. [Learn more →](/docs/fundamentals/what-is-compute)

## How Vercel builds and deploys your application

Everything described above depends on artifacts created during deployment.

When you push code, Vercel's build infrastructure detects your framework, runs your build command, and separates output into **static assets** (sent to the cache) and **compute artifacts** (sent to the function store). It then compiles your configuration into the **metadata** that powers the proxy.

For more on what happens during deployment, see [Behind the Scenes of Vercel's Infrastructure](https://vercel.com/blog/behind-the-scenes-of-vercels-infrastructure).

**Builds**: Learn how Vercel builds your application during deployment. [Learn more →](/docs/deployments/builds)

**Build Output API**: Understand the output format that powers Vercel deployments. [Learn more →](/docs/build-output-api)


---

[View full sitemap](/docs/sitemap)
