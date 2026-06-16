---
title: Storage on Vercel Marketplace
product: vercel
url: /docs/marketplace-storage
canonical_url: "https://vercel.com/docs/marketplace-storage"
last_updated: 2026-05-06
type: conceptual
prerequisites:
  []
related:
  - /docs/environment-variables
  - /docs/cli/install
  - /docs/cli/integration
  - /docs/integrations/install-an-integration/product-integration
  - /docs/functions/configuring-functions/region
summary: Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data, and inspect schemas from the...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/marketplace-storage.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "3ee4c1161f93057e89b4199d9f0902140c213bf5559b6bfd6bce2e523affbc28"
---

# Storage on Vercel Marketplace

> **🔒 Permissions Required**: Marketplace Storage Integrations

The [Vercel Marketplace](https://vercel.com/marketplace?category=storage) provides integrations with different storage providers to provision databases and data stores directly from your Vercel dashboard.

- For Postgres, you can use providers like Neon, Supabase, or AWS Aurora Postgres.
- For KV (key-value stores), you can use Upstash Redis.

The integration automatically injects credentials into your projects as environment variables.

## Why use Marketplace storage

When you install a storage integration from the Marketplace, you get:

- **Simplified provisioning**: Create databases without leaving the Vercel dashboard
- **Automatic configuration**: Vercel injects connection strings and credentials as [environment variables](/docs/environment-variables)
- **Unified billing**: Pay for storage resources through your Vercel account

## Available storage integrations

## Getting started

You can add a storage integration from the CLI or the dashboard. Both paths provision the resource, connect it to your Vercel project, and inject credentials as environment variables.

### From the CLI

Use [`vercel install`](/docs/cli/install) (or its full form, [`vercel integration add`](/docs/cli/integration#vercel-integration-add)) to provision a resource without leaving your terminal:

```bash filename="terminal"
vercel install neon
```

The command installs the integration if it isn't already on your team, provisions the resource, connects it to the currently linked project, and runs `vercel env pull` to sync credentials into `.env.local`.

To skip prompts in CI or scripted agent flows, pass options as flags:

```bash filename="terminal"
vercel install neon --name my-database --plan free -e production -e preview
```

Run `vercel install <integration-name> --help` to see the available products, metadata keys, and billing plans for a specific integration. For the full reference, see [`vercel integration add`](/docs/cli/integration#vercel-integration-add).

### From the dashboard

1. Go to the [Vercel Marketplace](https://vercel.com/marketplace?category=storage) and browse storage integrations.
2. Select an integration and click **Install**.
3. Choose a pricing plan that fits your needs.
4. Configure your database (name, region, and other options).
5. Connect the storage resource to your Vercel project.

Once connected, the integration automatically adds environment variables to your project. You can then use these variables in your application code to connect to your database.

For detailed steps, see [Add a Native Integration](/docs/integrations/install-an-integration/product-integration).

### Managing storage integrations

After installation, you can manage your storage resources from the Vercel dashboard:

- **View connected projects**: See which projects use each storage resource
- **Monitor usage**: Track storage consumption and costs
- **Update configuration**: Modify settings or upgrade plans
- **Access provider dashboard**: Link directly to the provider's management interface
- [**Browse and query your database**](#browsing-and-querying-your-database): For supported Postgres integrations, run queries, edit data, and inspect your schema directly from the dashboard
- **Transfer resources**: For supported integrations, [move a resource to a different team](/docs/integrations/install-an-integration/product-integration#transfer-a-resource-to-another-team)

For more details, see [Manage Native Integrations](/docs/integrations/install-an-integration/product-integration#manage-native-integrations).

## Browsing and querying your database

For supported Marketplace Postgres integrations, you can run SQL queries, view and edit data, and inspect your database schema directly from the Vercel dashboard. You no longer need external tools like `psql` or third-party database UIs.

This feature is available for the following integrations:

- [AWS Aurora Postgres](/marketplace/aws/aws-apg)
- [Neon](/marketplace/neon)
- [Prisma Postgres](/marketplace/prisma)
- [Supabase](/marketplace/supabase)

Support for more integrations will be added over time.

### Accessing the database browser

To access the database browser:

1. Open your project in the Vercel dashboard
2. Navigate to the **Storage** tab and select your database resource
3. Go to the **Browser** section of the database page

You need **Owner** permissions to access the database browser.

### Query editor

The **Query** tab lets you run SQL queries and view results in a table. You can copy results as CSV, JSON, or Markdown for use in other tools.

### Data editor

The **Data** tab displays your table data in a spreadsheet-like interface where you can:

- Sort rows
- Copy cell values
- Edit data
- Insert new rows
- Delete rows

When you confirm your changes, the data editor applies them to the database as a single transaction.

### Schema viewer

The **Schema** tab shows your tables and their relations in a visual graph layout. Use it to understand your database structure without writing queries.

## Choosing a storage solution

Consider these factors when selecting a storage provider:

| Factor                   | Considerations                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Data model**           | Relational (Postgres) for structured data, key-value (Redis) for caching, NoSQL for flexible schemas, vector for AI embeddings                                                                                                                                                                                                                                                                                                                                                                                               |
| **Common use cases**     | Postgres for [ACID transactions](# "What are ACID transactions?"), complex queries, and foreign keys. Redis for session storage, rate limiting, and leaderboards. Vector for semantic search and recommendations. NoSQL for document storage, high write throughput, and horizontal scaling |
| **Latency requirements** | Choose providers with regions close to your [Functions](/docs/functions/configuring-functions/region)                                                                                                                                                                                                                                                                                                                                                                                                                        |
| **Scale**                | Evaluate pricing tiers and scaling capabilities for your expected workload                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **Features**             | Compare provider-specific features like branching, point-in-time recovery, or real-time subscriptions                                                                                                                                                                                                                                                                                                                                                                                                                        |

## Best practices

- **Locate data close to your Functions:** Deploy databases in [regions](/docs/functions/configuring-functions/region) near your Functions to minimize latency.
- **Use connection pooling:** In serverless environments, use [connection pooling](/kb/guide/connection-pooling-with-functions) (e.g., built-in pooling or PgBouncer) to manage database connections efficiently.
- **Implement caching strategies:**
  - [Data Cache](/docs/runtime-cache/data-cache) to cache fetch responses and reduce load
  - [Edge Config](/docs/edge-config) for low-latency reads of config data
  - Redis for frequently accessed, periodically changing data
  - CDN caching with [cache headers](/docs/cdn-cache) for static content
- **Secure your connections:**
  - Store credentials only in [environment variables](/docs/environment-variables), never in code
  - Use SSL/TLS connections when available

## More resources

- [Add a Native Integration](/docs/integrations/install-an-integration/product-integration)
- [Integrations Overview](/docs/integrations)
- [Environment Variables](/docs/environment-variables)
- [Functions Regions](/docs/functions/configuring-functions/region)


---

[View full sitemap](/docs/sitemap)
