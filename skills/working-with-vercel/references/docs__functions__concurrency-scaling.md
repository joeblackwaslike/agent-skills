---
title: Concurrency scaling
product: vercel
url: /docs/functions/concurrency-scaling
canonical_url: "https://vercel.com/docs/functions/concurrency-scaling"
last_updated: 2026-08-11
type: reference
prerequisites:
  - /docs/functions
related:
  - /docs/functions
  - /docs/plans
  - /docs/drains
  - /docs/logs/runtime
  - /docs/errors/function_throttled
summary: Learn how Vercel automatically scales your functions to handle traffic surges.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/functions/concurrency-scaling.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "a92e2049b110196e585c0336d3dac747b90e48f7353fd6c7e11ae2334117c181"
---

# Concurrency scaling

Vercel automatically scales your functions to handle traffic surges, ensuring optimal performance during increased loads.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Python function bundles now include precompiled bytecode](https://vercel.com/changelog/python-function-bundles-now-include-precompiled-bytecode)
- [How to handle order-ahead traffic spikes on Vercel](https://vercel.com/kb/guide/handle-order-ahead-traffic-spikes-on-vercel) — Order-ahead traffic spikes hit the same routes every lunch hour. Learn how to scale, cache, queue, and test a restaurant
- [How can I improve function cold start performance on Vercel?](https://vercel.com/kb/guide/improve-function-cold-start-performance-on-vercel) — Learn how to confirm whether cold starts cause function latency on Vercel, and how Fluid compute reduces how often they
- [Scale to one: How Fluid solves cold starts](https://vercel.com/blog/scale-to-one-how-fluid-solves-cold-starts)
- [Vercel Functions now scale 12x faster for high-volume requests](https://vercel.com/changelog/vercel-functions-now-scale-12x-faster-for-high-volume-requests)
- [What should I do if I receive a 503 error on Vercel?](https://vercel.com/kb/guide/what-should-i-do-if-i-receive-a-503-error-on-vercel) — Learn about when Serverless Functions return a 503 status code and what can be done about them.
- [What is Vercel's policy regarding load testing deployments?](https://vercel.com/kb/guide/what-s-vercel-s-policy-regarding-load-testing-deployments) — Learn about Vercel's policies regarding load tests.
- [Why are my Vercel builds queued?](https://vercel.com/kb/guide/why-are-my-vercel-builds-queued) — Learn about why your Vercel builds may be getting queued and how to resolve this.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.
- [Pricing and Limits](https://vercel.com/docs/queues/pricing) — Understand how Vercel Queues billing works, what's included, and which service limits apply.
- [Multi-tenant Limits](https://vercel.com/docs/platforms/multi-tenant-platforms/limits) — Understand the limits and features available for Vercel for Platforms.
- [Usage & Pricing for Cron Jobs](https://vercel.com/docs/cron-jobs/usage-and-pricing) — Learn about cron jobs usage and pricing details.

Full cross-link map for this page: [/docs/functions/concurrency-scaling.graph.md](/docs/functions/concurrency-scaling.graph.md)
<!-- /docsgraph:related -->

## Automatic concurrency scaling

The concurrency model on Vercel refers to how many instances of your [functions](/docs/functions) can run simultaneously. All functions on Vercel scale automatically based on demand to manage increased traffic loads.

With automatic concurrency scaling, your Vercel Functions can scale to a maximum of **30,000** on Hobby and Pro or **100,000** on Enterprise, maintaining optimal performance during traffic surges. The scaling is based on the [burst concurrency limit](#burst-concurrency-limits) of **1000 concurrent executions per 10 seconds**, per region. Additionally, Enterprise customers can purchase extended concurrency.

Vercel's infrastructure monitors your usage and preemptively adjusts the concurrency limit to cater to growing traffic, allowing your applications to scale without your intervention.

Automatic concurrency scaling is available on [all plans](/docs/plans).

## Burst concurrency limits

Burst concurrency refers to Vercel's ability to temporarily handle a sudden influx of traffic by allowing a higher concurrency limit.

Upon detecting a traffic spike, Vercel temporarily increases the concurrency limit to accommodate the additional load. The initial increase allows for a maximum of **1000 concurrent executions per 10 seconds**. After the traffic burst subsides, the concurrency limit gradually returns to its previous state, ensuring a smooth scaling experience.

The scaling process may take several minutes during traffic surges, especially substantial ones. While this delay aligns with natural traffic curves to minimize potential impact on your application's performance, it's advisable to monitor the scaling process for optimal operation.

You can monitor burst concurrency events using [Log Drains](/docs/drains), or [Runtime Logs](/docs/logs/runtime) to help you understand and optimize your application's performance.

If you exceed the limit, a [`503 FUNCTION_THROTTLED`](/docs/errors/function_throttled) error will trigger.


---

[View full sitemap](/docs/sitemap)
