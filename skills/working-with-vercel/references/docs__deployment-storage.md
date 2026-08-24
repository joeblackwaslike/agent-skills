---
title: Deployment Storage
product: vercel
url: /docs/deployment-storage
canonical_url: "https://vercel.com/docs/deployment-storage"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  []
related:
  - /docs/deployment-retention
  - /docs/deployment-storage/optimize
summary: Learn about deployment storage on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-storage.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "be08d84e1d88f275a4b0e32970815eb9cb6f759ed3275c78eb235552fafd4978"
---

# Deployment Storage

Deployment Storage is cloud storage for the build output and Vercel Function bundles retained with your deployments. A [Deployment Retention Policy](/docs/deployment-retention) controls when each deployment becomes eligible for deletion. [Exceptions to the policy](/docs/deployment-retention#exceptions-to-the-retention-policy) can keep a deployment and its output longer.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I delete an individual deployment?](https://vercel.com/kb/guide/how-do-i-delete-an-individual-deployment?from=related) — Information on deleting an individual deployment.
- [Overview](https://vercel.com/docs/storage?from=related) — Store large files and global configuration with Vercel's storage products.
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Builds](https://vercel.com/docs/builds?from=related) — Understand how the build step works when creating a Vercel Deployment.
- [Marketplace](https://vercel.com/docs/marketplace-storage?from=related) — Connect Postgres, Redis, NoSQL, and other storage solutions through the Vercel Marketplace. Run SQL queries, edit data,

Full cross-link map for this page: [/docs/deployment-storage.graph.md](/docs/deployment-storage.graph.md)
<!-- /docsgraph:related -->

You use retained deployment output to:

- Open an earlier Preview deployment to investigate a regression
- Promote a tested deployment without rebuilding it
- Roll back to an eligible Production deployment during an incident
- Inspect previous release output during an audit

Each successful deployment can add two types of Deployment Storage:

| Usage metric | What it includes |
| --- | --- |
| **Deployment Storage** | Build outputs and static assets |
| **Functions Storage** | Vercel Function bundles stored in each region where Vercel deploys them |

## How usage grows

Three factors affect Deployment Storage:

| Driver | Effect on usage |
| --- | --- |
| Number of retained deployments | Each retained deployment can add stored assets and Function bundles. |
| Output size | Larger assets or Function bundles add more storage per deployment. |
| Retention period | Longer periods keep each deployment's output for more time. |

## View Deployment Storage

To review your usage:

1. Select your team in the Vercel dashboard.
2. Open **Usage**.
3. Select **Deployment Storage**.
4. Open **Deployment Storage** or **Functions Storage**.
5. Select **Projects** to compare usage by project.

Review both metrics. A project can have low Deployment Storage and high Functions Storage, or the reverse.

## Pricing

Vercel measures Deployment Storage and Functions Storage in GB-months. A GB-month measures how much data Vercel stores and how long it stores that data.

| Usage metric | Pro list price |
| --- | --- |
| Deployment Storage | $0.10 per GB-month |
| Functions Storage | $0.10 per GB-month |

For each metric, Vercel records the maximum stored amount for each project on each billing day. It adds those daily project amounts across the billing period. Storing 1 GB every day in a 30-day month equals 1 GB-month.

Enterprise rates follow your contract. Your plan or contract may also include an allowance. Use **Usage** and your invoice to confirm your team's allowance, rate, and charge.

## Control retention

Use a [Deployment Retention Policy](/docs/deployment-retention) to control how long Vercel keeps deployments.

- The team policy sets the default for new projects. You can also apply it to all existing projects.
- A project policy changes retention for that project only.

Shorter retention can reduce storage over time. It also reduces the deployment history available for inspection, promotion, and rollback.

## Compare storage products

Deployment Storage is separate from other Vercel storage products:

| Product | What it stores | Main control |
| --- | --- | --- |
| Deployment Storage | Output linked to retained deployments | Output size and retention |
| Remote Cache Artifacts | Task output that later builds can reuse | Cache use and retention |
| Vercel Blob | Files that your application uploads and manages | Application upload and deletion logic |

A change to one product does not always change usage for another product.

For help reducing Deployment Storage usage, see the [optimization guide](/docs/deployment-storage/optimize).


---

[View full sitemap](/docs/sitemap)
