---
title: ISR Usage and Pricing
product: vercel
url: /docs/incremental-static-regeneration/limits-and-pricing
canonical_url: "https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing"
last_updated: 2026-02-23
type: reference
prerequisites:
  - /docs/incremental-static-regeneration
related:
  - /docs/incremental-static-regeneration
  - /docs/functions/configuring-functions/region
  - /docs/pricing/regional-pricing
  - /docs/pricing/incremental-static-regeneration
  - /docs/pricing/manage-and-optimize-usage
summary: Learn about ISR costs, usage metrics, and strategies to optimize your ISR reads and writes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/incremental-static-regeneration/limits-and-pricing.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "20a03f0c305bd83b63b489ce243d7b5edfb1e56d9b706ae75893f542939df74c"
---

# ISR Usage and Pricing

This page covers ISR costs, usage metrics, and optimization strategies. To decide when ISR is the right cache for your use case, see [Caching on Vercel](/docs/incremental-static-regeneration#caching-on-vercel).

## Pricing

[Incremental Static Regeneration (ISR)](/docs/incremental-static-regeneration) caches your page responses ephemerally in the Vercel CDN in every region and persists them to durable storage in a single region. CDN cache reads and writes are free, but reads and writes from durable storage incur costs.

**ISR Reads and Writes** are priced regionally based on the [Vercel function region(s)](/docs/functions/configuring-functions/region) set at your project level. See the regional [pricing documentation](/docs/pricing/regional-pricing) and [ISR cache region](#isr-cache-region) for more information.

## Usage

The table below shows the metrics for the [**ISR**](/docs/pricing/incremental-static-regeneration) section of the [**Usage** dashboard](/docs/pricing/manage-and-optimize-usage#viewing-usage).

To view information on managing each resource, select the resource link in the **Metric** column. To jump straight to guidance on optimization, select the corresponding resource link in the **Optimize** column. The cost for each metric is based on the request location. See the [pricing section](/docs/incremental-static-regeneration/limits-and-pricing#pricing) and choose the region from the dropdown for specific information.

### Storage

There is no limit on storage for ISR. All the data you write remains cached for the duration you specify. Only you or your team can invalidate this cache, unless it goes unaccessed for 31 days.

### Written data

The total amount of Write Units used to durably store new ISR data, measured in 8 KB units.

### Read data

The total amount of Read Units used to access ISR data, measured in 8 KB units.

ISR reads and writes are measured in 8 KB units:

- **Read unit**: One read unit equals 8 KB of data read from the ISR cache
- **Write unit**: One write unit equals 8 KB of data written to the ISR cache

## ISR reads and writes price

**ISR Reads and Writes** are priced regionally based on the [Vercel function region(s)](/docs/functions/configuring-functions/region) set at your project level. See the regional [pricing documentation](/docs/pricing/regional-pricing) and [ISR cache region](#isr-cache-region) for more information.

### ISR cache region

The ISR cache region for your deployment is set at build time and is based on the [default Function region](/docs/functions/configuring-functions/region#setting-your-default-region) set at your project level. If you have multiple regions set, the region that gives you the best [cost](/docs/pricing/regional-pricing) optimization is selected. For example, if `iad1` (Washington, D.C., USA) is one of your regions, it's always selected.

ISR uses a two-level caching architecture:

- **CDN cache (in the requested region)**: When a user requests your page, the nearest CDN region serves the cached response. This cache is ephemeral with no guaranteed retention. Vercel keeps it on a best-effort basis, typically for minutes to hours, and can evict it under memory pressure. CDN cache reads are free.
- **ISR cache (in the Function region)**: If the CDN cache misses, the request falls back to the durable ISR cache in your Function region. Your Function stores revalidated content here and resolves cache misses by fetching fresh data. This cache guarantees retention for the duration you specify, until it goes unaccessed for 31 days. ISR reads and writes from this cache incur costs.

For best performance, set your default Function region close to where your data sources are. This reduces latency for cache misses and revalidation. Automatic compression of ISR writes helps keep costs down even when you choose a region further from the lowest-cost option.

## Optimizing ISR reads and writes

You're charged based on the volume of data read from and written to the ISR cache, and the regions where reads and writes occur. To optimize ISR usage, consider the following strategies:

- For content that rarely changes, set a longer [time-based revalidation](/docs/incremental-static-regeneration/quickstart#time-based-revalidation) interval
- If you have events that trigger data updates, use [on-demand revalidation](/docs/incremental-static-regeneration/quickstart#on-demand-revalidation) instead of short revalidation intervals

When revalidation runs and the content hasn't changed from the previous version, no ISR write units are incurred. This applies to both time-based and on-demand revalidation.

Vercel's region-aware ISR architecture helps reduce ISR spend by keeping the durable cache close to your function and serving subsequent requests from CDN caches.

If you're seeing unexpected writes, the content has changed between revalidations. To debug:

- Check that you're not using `new Date()` in the ISR output
- Check that you're not using `Math.random()` in the ISR output
- Check that no other non-deterministic code is included in the ISR output

## ISR reads chart

You're charged based on the amount of data read from your ISR cache and the region(s) where the reads occur.

When viewing your ISR read units chart, you can group by:

- **Projects**: To see the number of read units for each project
- **Region**: To see the number of read units for each region

## ISR writes chart

You're charged based on the amount of ISR write units written to your ISR cache and the region(s) where the writes occur.

When viewing your ISR writes chart, you can group by sum of units to see a total of all writes across your team's projects:

- **Projects**: To see the number of write units for each project
- **Region**: To see the number of write units for each region


---

[View full sitemap](/docs/sitemap)
