---
title: Vercel Storage overview
product: vercel
url: /docs/storage
canonical_url: "https://vercel.com/docs/storage"
last_updated: 2026-05-06
type: conceptual
prerequisites:
  []
related:
  - /docs/vercel-blob
  - /docs/edge-config
  - /docs/marketplace-storage
  - /docs/storage/vercel-blob
  - /docs/storage/vercel-blob/usage-and-pricing
summary: "Store large files and global configuration with Vercel's storage products."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/storage.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "d985c18ae8657c11e46a0f8e5753ee363a0bef27457532a3216645fcee101a1c"
---

# Vercel Storage overview

Vercel offers a suite of managed, serverless storage products that integrate with your frontend framework.

- [**Vercel Blob**](/docs/vercel-blob): Large file storage
- [**Vercel Edge Config**](/docs/edge-config): Global, low-latency data store
- [**Vercel Marketplace**](/docs/marketplace-storage): Find Postgres, KV, NoSQL, and other databases from providers like Neon, Upstash, and AWS

## Choosing a storage product

The right storage solution depends on your needs for latency, durability, and consistency. This table summarizes the key differences:

| Product                           | Reads      | Writes       | Use Case                                    | Limits                                                    | Plans                  |
| --------------------------------- | ---------- | ------------ | ------------------------------------------- | --------------------------------------------------------- | ---------------------- |
| [Blob](/docs/storage/vercel-blob) | Fast       | Milliseconds | Large, content-addressable files ("blobs")  | [Learn more](/docs/storage/vercel-blob/usage-and-pricing) | Hobby, Pro             |
| [Edge Config](/docs/edge-config)  | Ultra-fast | Seconds      | Runtime configuration (e.g., feature flags) | [Learn more](/docs/edge-config/edge-config-limits)        | Hobby, Pro, Enterprise |

See [best practices](#best-practices) for optimizing your storage usage.

## Vercel Blob

> **🔒 Permissions Required**: Vercel Blob

Vercel Blob offers optimized storage for images, videos, and other files.

You should use Vercel Blob if you need to:

- **Store images**: For example, storing user avatars or product images
- **Store videos**: For example, storing user-generated video content

### Explore Vercel Blob

- [Overview](/docs/storage/vercel-blob)
- [Quickstart](/docs/storage/vercel-blob/server-upload)

## Edge Config

> **🔒 Permissions Required**: Edge Config

An Edge Config is a global data store that enables you to read data in the region closest to the user without querying an external database or hitting upstream servers. Most lookups return in less than 1ms, and 99% of reads will return under 10ms.

You should use Edge Config if you need to:

- **Fetch data at ultra-low latency**: For example, you should store feature flags in an Edge Config store.
- **Store data that is read often but changes rarely**: For example, you should store critical redirect URLs in an Edge Config store.
- **Read data in every region**: Edge Config data is actively replicated to all regions in the Vercel CDN.

### Explore Edge Config

- [Overview](/docs/edge-config)
- [Quickstart](/docs/edge-config/get-started)
- [Limits & Pricing](/docs/edge-config/edge-config-limits)

## Marketplace Storage

> **🔒 Permissions Required**: Marketplace Storage

The [Vercel Marketplace](https://vercel.com/marketplace?category=storage) connects you with storage providers like Neon, Upstash, and Supabase. You can provision databases directly from your Vercel dashboard, and Vercel automatically injects credentials as environment variables.

You should use Marketplace storage if you need to:

- **Relational databases (Postgres)**: For structured data with ACID transactions, complex queries, and foreign keys
- **Key-value stores (Redis)**: For caching, session storage, real-time leaderboards, and rate limiting
- **NoSQL databases**: For flexible schemas with MongoDB or DynamoDB
- **Vector databases**: For AI embeddings, semantic search, and recommendation systems

You can provision a Marketplace storage resource in one command with the CLI. This installs the integration, connects it to the linked project, and pulls credentials into `.env.local`:

```bash filename="terminal"
vercel install neon
vercel install upstash
vercel install supabase
```

See [`vercel install`](/docs/cli/install) for the full reference.

### Explore Marketplace Storage

- [Overview](/docs/marketplace-storage)
- [Add a Native Integration](/docs/integrations/install-an-integration/product-integration)
- [Provision from the CLI with `vercel install`](/docs/cli/install)
- [Browse Storage Integrations](https://vercel.com/marketplace?category=storage)

## Best practices

Follow these best practices to get the most from your storage:

### Locate your data close to your functions

Deploy your databases in [regions](/docs/regions) closest to your Functions. This minimizes network roundtrips and keeps response times low.

### Optimize for high cache hit rates

Vercel's CDN caches content in every region globally. Cache data fetched from your data store on the CDN using [cache headers](/docs/cdn-cache) to get the fastest response times.

[Incremental Static Regeneration](/docs/concepts/incremental-static-regeneration/overview) sets up caching headers automatically and stores generated assets globally. This gives you high availability and prevents cache-control misconfiguration.

You can also configure cache-control headers manually with [Vercel Functions](/docs/cdn-cache#using-vercel-functions) to cache responses in every CDN region. Note that Middleware runs before the CDN cache layer and cannot use cache-control headers.

## Transferring your store

You can bring your Blob or Edge Config stores along with your account as you upgrade from Hobby to Pro, or downgrade from Pro to Hobby. To do so:

1. Navigate to the [dashboard](/dashboard) and open [**Storage**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fstores\&title=Go+to+Storage) in the sidebar
2. Select the store that you would like to transfer
3. Select **Settings**, then select **Transfer Store**
4. Select a destination account or team. If you're upgrading to Pro, select your new Pro team. If downgrading, select your Hobby team

When successful, you'll be taken to the **Storage** section in the sidebar of the account or team you transferred the store to.

### Transfer Marketplace resources

You can transfer [Marketplace](/docs/marketplace-storage) resources between teams from the resource's **Settings** page. See [Transfer a resource to another team](/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team) for steps.

## Explore storage products

**Vercel Blob**: Store images, videos, and other large files. [Learn more →](/docs/storage/vercel-blob)

**Edge Config**: Global, low-latency data store for runtime configuration. [Learn more →](/docs/edge-config)

**Marketplace Storage**: Postgres, KV, NoSQL, and other databases from Neon, Upstash, and more. [Learn more →](/docs/marketplace-storage)

**Blob quickstart**: Upload your first file to Vercel Blob from a server. [Learn more →](/docs/storage/vercel-blob/server-upload)

**Edge Config quickstart**: Read your first value from Edge Config. [Learn more →](/docs/edge-config/get-started)

**Provision from the CLI**: Use \`vercel install\` to provision Marketplace resources. [Learn more →](/docs/cli/install)

**Browse Storage Integrations**: See every storage provider in the Vercel Marketplace. [Learn more →](https://vercel.com/marketplace?category=storage)

**Native Integrations**: Add a Marketplace integration to your project. [Learn more →](/docs/integrations/install-an-integration/product-integration)


---

[View full sitemap](/docs/sitemap)
