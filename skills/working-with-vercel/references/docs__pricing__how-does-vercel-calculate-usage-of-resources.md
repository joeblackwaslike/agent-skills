---
title: Calculating usage of resources
product: vercel
url: /docs/pricing/how-does-vercel-calculate-usage-of-resources
canonical_url: "https://vercel.com/docs/pricing/how-does-vercel-calculate-usage-of-resources"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  - /docs/pricing
related:
  - /docs/pricing
  - /docs/incremental-static-regeneration
  - /docs/caching/runtime-cache
  - /docs/marketplace-storage
  - /docs/routing-middleware
summary: Understand how Vercel measures and calculates your resource usage based on a typical user journey.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/pricing/how-does-vercel-calculate-usage-of-resources.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "266e7bea8eb7d2b02a1ad31c86ef3a4b863e45976516f8c70adfc203f0538f91"
---

# Calculating usage of resources

Understanding how usage and accrual happen on Vercel helps you make the best choices for your project. This guide helps you understand that by exploring a user journey through an ecommerce store.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to Effectively Load Test Your Vercel Application](https://vercel.com/kb/guide/how-to-effectively-load-test-your-vercel-application) — Learn how to safely load test your Next.js app on Vercel. This guide covers realistic, policy-compliant testing of route
- [Managing Usage & Costs](https://vercel.com/docs/speed-insights/managing-usage) — Learn how to measure and manage Speed Insights usage with this guide to reduce events and avoid unexpected costs.
- [Managing Usage & Costs](https://vercel.com/docs/image-optimization/managing-image-optimization-costs) — Learn how to measure and manage Image Optimization usage with this guide to avoid any unexpected costs.
- [Pricing and Limits](https://vercel.com/docs/eve/pricing) — Understand how eve usage maps to Vercel resources and inherited platform limits.
- [Legacy Usage & Pricing for Functions](https://vercel.com/docs/functions/usage-and-pricing/legacy-pricing) — Learn about legacy usage and pricing for Vercel Functions.
- [How requests flow through Vercel](https://vercel.com/docs/fundamentals/infrastructure) — Learn how Vercel routes, secures, and serves requests from your users to your application.

Full cross-link map for this page: [/docs/pricing/how-does-vercel-calculate-usage-of-resources.graph.md](/docs/pricing/how-does-vercel-calculate-usage-of-resources.graph.md)
<!-- /docsgraph:related -->

You'll learn how resources are used at each stage of the journey, from entering the site, to browsing products, interacting with dynamic content, and engaging with A/B testing for personalized content.

## Understanding Vercel resources

> **💡 Note:** The scenarios and resource usage described in this guide are for illustrative
> purposes only.

Usage is accrued as users visit your site. Vercel's framework-defined infrastructure determines how your site renders and how your costs accrue, based on the makeup of your application code, and the framework you use.

A typical user journey through an ecommerce store touches on multiple resources used in Vercel's [managed infrastructure](/docs/pricing#managed-infrastructure).

The ecommerce store employs a combination of caching strategies to optimize both static and dynamic content delivery. For static pages, it uses [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration).

For dynamic content like product price discounts, the site uses [Vercel Runtime Cache](/docs/caching/runtime-cache) to store and retrieve the latest product information. This ensures that all users see the most up-to-date pricing information, while minimizing the need to fetch data from the backend on each request.

For dynamic, user-specific content like shopping cart states, [Vercel Marketplace Redis integrations](/docs/marketplace-storage) are used. This allows the site to store and retrieve user-specific data in real-time, ensuring a seamless experience across sessions.

The site also uses [Middleware](/docs/routing-middleware) to A/B test a product carousel, showing different variants to different users based on their behavior or demographics.

The following sections outline the resources used at each stage of the user journey.

### 1. User enters the site

![1. User enters your site](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/pricing/enters-site-light.png)

The browser requests the page from Vercel. Since it's static and cached on our global [CDN](/docs/cdn), this only involves [CDN Requests](/docs/manage-cdn-usage#cdn-requests) (the network requests required to get the content of the page) and [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) (the amount of content sent back to the browser).

**Priced resources**

- \*\*Price:\*\*:
  Charged per network request to the CDN
- \*\*Price:\*\*:
  Charged based on data moved to the user from the CDN

### 2. Product browsing

![2. User browses products](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/pricing/browse-products-light.png)

During the user's visit to the site, they browse the **All Products** page, which is populated with a list of cached product images and price details. The request to view the page triggers an [CDN Request](/docs/manage-cdn-usage#cdn-requests) to Vercel's CDN, which serves the static assets from the [cache](/docs/caching/cdn-cache).

**Priced resources**

- \*\*Price:\*\*:
  Charged for network requests to fetch product images/details
- \*\*Price:\*\*:
  Data movement charges from CDN to the user

### 3. Viewing updated product details

![3. User browses updated products](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/pricing/updated-product-light.png)

The user decides to view the details of a product. This product's price was recently updated and the first view of the page shows the stale content from the cache due to the revalidation period having ended.

Behind the scenes the site uses [Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) to update the products description and image. The new information for the product is then cached on Vercel's [CDN](/docs/cdn) for future requests, and the revalidation period is reset.

For products with real-time discounts, these discounts are calculated using a [Vercel Function](/docs/functions) that fetches the latest product information from the backend. The results, which include any standard discounts applicable to all users, are cached using the [Vercel Runtime Cache](/docs/caching/runtime-cache).

Upon viewing a product, if the discount data is already in the Data Cache and still fresh, it will be served from there. If the data is stale, it will be re-fetched and cached again for future requests. This ensures that all users see the most up-to-date pricing information.

**Priced resources**

- \*\*Price:\*\*:
  Network request charges for fetching updated product information
- \*\*Price:\*\*:
  Charges for activating a function to update content
- \*\*Price:\*\*:
  CPU time charges for the function processing the update

### 4. Dynamic interactions (Cart)

![4. User interacts with dynamic cart](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/pricing/dynamic-cart-light.png)

The user decides to add a product to their cart. The cart is a dynamic feature that requires real-time updates. When the user adds an item to their cart, [Vercel Marketplace Redis integrations](/docs/marketplace-storage) are used to store the cart state. If the user leaves and returns to the site, the cart state is retrieved from the Redis store, ensuring a seamless experience across sessions.

**Priced resources**

- \*\*Price:\*\*:
  Network request charges for cart updates
- \*\*Price:\*\*:
  Function activation charges for managing cart logic
- \*\*Price:\*\*:
  CPU time charges for the function processing the cart logic
- \*\*Price:\*\*:
  Data movement charges for fetching cart state from the cache
- Redis Requests: Charges for reading and writing cart state to the Redis store
- Redis Storage: Charges for storing cart state in the Redis store
- Redis Data Transfer: Data movement charges for fetching cart state from the Redis store

### 5. Engaging with A/B testing for personalized content

![5. User is shown a variant of the site based on their behavior or demographics](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/pricing/a-b-test-light.png)

Having added an item to the cart, the user decides to continue browsing the site. They scroll to the bottom of the page and are shown a product carousel. This carousel is part of an A/B test using [Middleware](/docs/routing-middleware), and the user is shown a variant based on their behavior or demographics.

**Priced resources**

- \*\*Price:\*\*:
  Network request charges for delivering test variants

## Summary and next steps

Throughout the user journey through the site, a variety of resources are used from Vercel's [managed infrastructure](/docs/pricing#managed-infrastructure). When thinking about how to optimize resource consumption, it's important to consider how each resource is triggered and how it accrues usage over time and across different user interactions.

To learn more about each of the resources used in this guide, see the [managed infrastructure billable resources](/docs/pricing#managed-infrastructure-billable-resources) documentation. To learn about how to optimize resource consumption, see the [Manage and optimize usage](/docs/pricing/manage-and-optimize-usage) guide.

## More resources

For more information on Vercel's pricing, guidance on optimizing consumption, and invoices, see the following resources:

- [Learn about Vercel's pricing model and how it works](/docs/pricing)
- [Learn how Vercel usage is calculated and how it accrues](/docs/pricing/manage-and-optimize-usage)
- [Learn how to understand your Vercel invoice](/docs/pricing/understanding-my-invoice)


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
