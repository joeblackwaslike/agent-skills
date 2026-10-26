---
title: Vercel Blob Pricing
product: vercel
url: /docs/vercel-blob/usage-and-pricing
canonical_url: "https://vercel.com/docs/vercel-blob/usage-and-pricing"
last_updated: 2026-09-23
type: reference
prerequisites:
  - /docs/vercel-blob
related:
  - /docs/manage-cdn-usage
  - /docs/cdn
  - /docs/vercel-blob/client-upload
  - /docs/vercel-blob/server-upload
  - /docs/vercel-blob
summary: Learn about the pricing for Vercel Blob.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-blob/usage-and-pricing.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "309be6133cfb87636dbfb200320d80a2bd699d5c7b171f7a866f6c4f20f00a92"
---

# Vercel Blob Pricing

> Vercel Blob is available on all plans
>
> Those with the owner, member, developer role can access this feature

## Usage

Vercel Blob usage is measured based on the following:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Vercel Blob](https://vercel.com/kb/guide/vercel-blob) — Vercel Blob stores and serves files of any size through Vercel's global network. Learn how Blob works, what it costs, an
- [Increased Blob store limit for Hobby users](https://vercel.com/changelog/increased-blob-store-limit-for-hobby-users)
- [Unlimited Vercel Blob stores on every plan](https://vercel.com/changelog/unlimited-vercel-blob-stores-on-every-plan)
- [Vercel Blob vs Netlify Blobs](https://vercel.com/kb/guide/vercel-blob-vs-netlify-blobs) — Compare Vercel Blob and Netlify Blobs on storage model, public URLs, delivery, limits, and pricing to choose the right o
- [Vercel Blob is now generally available: Cost-efficient, durable storage](https://vercel.com/blog/vercel-blob-now-generally-available)
- [How to upload and store files with Vercel](https://vercel.com/kb/guide/how-to-upload-and-store-files-with-vercel) — Vercel file uploads done right cover Server Actions, client-direct upload, and multipart for 5 TB files, with auth and c
- [Vercel Blob is now generally available](https://vercel.com/changelog/vercel-blob-is-now-generally-available)
- [Build with Vercel Blob on Next.js](https://vercel.com/kb/guide/vercel-blob-nextjs) — Deploy the Vercel Blob Next.js Starter and learn how client uploads store images securely in a private Blob store.
- [Pricing on Vercel](https://vercel.com/docs/pricing) — Learn about Vercel's pricing model, including the resources and services that are billed, and how they are priced.
- [Vercel Storage overview](https://vercel.com/docs/storage) — Store files with Vercel Blob, runtime configuration with Global Config, and application data with Marketplace databases.
- [Limits and Pricing for Image Optimization](https://vercel.com/docs/image-optimization/limits-and-pricing) — This page outlines information on the limits that are applicable when using Image Optimization, and the costs they can i
- [Manage and optimize usage](https://vercel.com/docs/pricing/manage-and-optimize-usage) — Understand how to manage and optimize your usage on Vercel, learn how to track your usage, set up alerts, and optimize y

Full cross-link map for this page: [/docs/vercel-blob/usage-and-pricing.graph.md](/docs/vercel-blob/usage-and-pricing.graph.md)
<!-- /docsgraph:related -->

- **Storage Size**: Monthly average of your blob store size (GB-month)
- **Simple Operations**: Counts when a blob is accessed by its URL and it's a cache MISS, or when you retrieve blob metadata without downloading the blob
- **Advanced Operations**: Counts when you upload, copy, or list blobs, and when you create a Blob store
- **Blob Data Transfer**: Charged when blobs are downloaded or viewed
- **[CDN Requests](/docs/manage-cdn-usage#cdn-requests)**: Each blob access by its URL counts as one CDN Request, regardless if it's a MISS or HIT
- **[Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer)**: Applied only for cache MISS scenarios

See the [usage details](#usage-details) and [pricing example](#pricing-example) sections for more information on how usage is calculated.

> **💡 Note:** Stored files are referred to as "blobs" once they're in the storage system,
> following cloud storage terminology.

## Pricing

| Resource | Price | Included (Pro) | Included (Hobby) |
|----------|-------|----------------|-----------------|
| [Blob Storage Size](/docs/vercel-blob/usage-and-pricing#pricing) | Regional | Usage-based | 1GB/month |
| [Blob Simple Operations](/docs/vercel-blob/usage-and-pricing#pricing) | Regional | Usage-based | First 10,000 |
| [Blob Advanced Operations](/docs/vercel-blob/usage-and-pricing#pricing) | Regional | Usage-based | First 2,000 |
| [Blob Data Transfer](/docs/vercel-blob/usage-and-pricing#pricing) | Regional | Flat Rate CDN | First 10 GB |


<br />

> **💡 Note:** [CDN Requests](/docs/manage-cdn-usage#cdn-requests) and [Fast Origin
> Transfer](/docs/manage-cdn-usage#fast-origin-transfer) for blobs are billed
> at standard [CDN rates](/docs/cdn#pricing-and-usage). The included resource usage for
> the Hobby plan is shared across all Vercel services in your project.

## Usage details

- Cache HITs do not count as Simple Operations
- Cache HITs do not incur Fast Origin Transfer charges
- The maximum size of a blob in cache is [512 MB](/docs/vercel-blob/usage-and-pricing#size-limits). Any blob larger than this will generate a cache MISS on every access, resulting in a Fast Origin Transfer and CDN Request charge each time it is accessed
- Uploads do not incur data transfer charges when using [Client Uploads](/docs/vercel-blob/client-upload)
- Uploads incur [Fast Data Transfer](/docs/manage-cdn-usage#fast-data-transfer) charges when using [Server Uploads](/docs/vercel-blob/server-upload) if your Vercel application is the one receiving the file upload
- [Multipart uploads](/docs/vercel-blob#multipart-uploads) count as multiple Advanced Operations: one when starting, one per part, one for completion
- Creating a Blob store counts as one Advanced Operation; deleting a store is free
- Delete operations are free
- **Dashboard interactions count as operations**: Each time you interact with the Vercel dashboard to browse your blob store, upload files, or view blob details, these actions count as Advanced Operations and will appear in your usage metrics.

## Private and public storage delivery costs

Private and public Blob stores are priced the same for storage, operations, and uploads. The difference is in how files are delivered, which affects data transfer costs.

**Private blob delivery** (e.g. a 10 KB document served through a [Function](/docs/functions)):

- Your Function fetches the blob from the store, then streams it to the browser
- You pay [Blob Data Transfer](/docs/vercel-blob#blob-data-transfer) + [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) on cache miss for the Function-to-store fetch, plus [Fast Data Transfer](/docs/cdn) + [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) for the Function-to-browser response

**Public blob delivery** (e.g. a 150 KB image on a page):

- The browser fetches the blob directly from the store
- You pay [Blob Data Transfer](/docs/vercel-blob#blob-data-transfer) + [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) on cache miss
- Blob Data Transfer (BDT) is 3x more cost-efficient than Fast Data Transfer (FDT) on average

For full details on how delivery works, see [delivering private blobs](/docs/vercel-blob/private-storage#delivering-private-blobs) and [delivering public blobs](/docs/vercel-blob/public-storage#delivering-public-blobs).

## Hobby

Vercel Blob is free for Hobby users within the [usage limits](#pricing).

Vercel will send you emails as you are nearing your usage limits. You **will not pay for any additional usage**. However, you will not be able to access Vercel Blob if limits are exceeded. In this scenario, you will have to wait until 30 days have passed before using Blob storage again.

To remove these limits, you can start a Pro trial using the button below.

## Pro

You pay for usage using your [monthly credit](/docs/plans/pro-plan#monthly-credit), which switches to on-demand once you have used it.

Pro teams can [set up Spend Management](/docs/spend-management#managing-your-spend-amount) to get notified or to automatically take action, such as [using a webhook](/docs/spend-management#configuring-a-webhook) or pausing your projects when your usage hits a set spend amount.

## Enterprise

Vercel Blob Enterprise pricing is custom. Contact your account team for contracted rates and support questions.

## Pricing Example

Let's say during one month of usage, you upload 120,000 blobs of which 30% (36,000 blobs) are uploaded using multipart uploads with 5 parts each.
Your storage averages 50 GB and your blobs are downloaded 2.5 million times, with a 70% cache HIT ratio (meaning 30% or 750,000 downloads are cache MISSes), for a total of 350 GB of data transfer.

Here's the cost breakdown:

- **Storage**: 50 GB total at $0.023/GB = $1.15
- **Simple Operations**: 750K (30% cache MISSes of 2.5M downloads + head calls) at $0.40/1M = $0.30
- **Advanced Operations**:
  - Single uploads: 84K (70% of 120K blobs)
  - Multipart uploads: 36K × (1 start + 5 parts + 1 completion) = 252K operations
  - Total: 336K at $5.00/1M = $1.68
- **Data Transfer** (iad1): 350 GB total at $0.05/GB = $17.50
- **CDN Requests**: 2.5M requests (all downloads) - 10M included = $0.00
- **Fast Origin Transfer** (iad1): 105 GB (30% cache MISSes of 350 GB) at $0.06/GB = $6.30

**Total**: $26.93/month

## Limits

Vercel Blob has certain [limits](/docs/limits) that you should be aware of when designing your application.

### Store limits

You can create as many Blob stores as you need. Creating a store counts as one [Advanced Operation](#usage). Deleting a store is free.

You pay for storage, operations, and data transfer based on what you use. Splitting the same data across more stores doesn't change those costs. Use separate stores to isolate projects, environments, customers, or public and private content.

### Operation rate limits

| Plan       | Simple Operations | Advanced Operations |
| ---------- | ----------------- | ------------------- |
| Hobby      | 1,200/min (20/s)  | 900/min (15/s)      |
| Pro        | 7,200/min (120/s) | 4,500/min (75/s)    |
| Enterprise | 9,000/min (150/s) | 7,500/min (125/s)   |

**Note:** Rate limits are based on the number of operations, not HTTP requests. For example, when using `del([pathnames])` to delete multiple blobs in one call, each blob deletion counts as a separate operation toward your rate limit. Deleting 100 blobs in a batch counts as 100 operations, not one.

### Size limits

- **Cache Size Limit**: 512 MB per blob
  - Blobs larger than 512 MB will not be cached
  - Accessing these blobs will always count as a cache MISS (generating one [Simple Operation](/docs/vercel-blob#simple-operations))
  - These large blobs will also incur [Fast Origin Transfer](/docs/manage-cdn-usage#fast-origin-transfer) charges for each access

- **Maximum File Size**: 5TB (5,000GB)
  - This is the absolute maximum size for any individual file uploaded to Vercel Blob
  - For files larger than 100MB, we recommend using [multipart uploads](/docs/vercel-blob#multipart-uploads)

## Observability

You can monitor and analyze your Vercel Blob usage with the [Observability section in the sidebar](https://vercel.com/d?to=%2F%5Bteam%5D%2F~%2Fobservability%2Fblob\&title=Go+to+Blob+Observability) in the Vercel Dashboard.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
