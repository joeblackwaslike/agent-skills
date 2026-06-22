---
title: Limits and Pricing for Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/limits-and-pricing
canonical_url: "https://vercel.com/docs/flags/vercel-flags/limits-and-pricing"
last_updated: 2026-04-30
type: reference
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  []
summary: Learn about limits and pricing for Vercel Flags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/limits-and-pricing.md"
fetched_at: "2026-06-22T06:01:12.033Z"
sha256: "20e15211a451bff95355f7c1f9d7fd3a4aee8ff403d76cc727d80c12ff7bdeb5"
---

# Limits and Pricing for Vercel Flags

## Pricing

### Flag requests

Vercel Flags is priced at \*\*$0.03 per 1,000 flag requests\*\* for Pro teams. Enterprise pricing is custom.

|  | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| Maximum flag requests per month | 10,000 | N/A | Custom |
| Additional flag requests | - | $0.03 per 1,000 requests | Custom |


A **flag request** is any request to your application that reads the underlying flags configuration. A single request evaluating multiple feature flags of the same source project still counts as one flag request.

For example, if a page request evaluates 10 different feature flags, that counts as 1 flag request.

If a project reads feature flags from multiple sources, each source is counted separately.

The Hobby plan includes up to 10,000 flag requests per billing cycle.

## Limits

### Flag and segment count limits

Both active and archived flags count toward the total flag limit. Delete flags to free up space.

| Plan       | Max flags | Max segments |
| ---------- | --------- | ------------ |
| Hobby      | 100       | 100          |
| Pro Trial  | 100       | 100          |
| Pro        | 10,000    | 10,000       |
| Enterprise | 10,000    | 10,000       |

### Size limits

| Resource                                         | Limit  |
| ------------------------------------------------ | ------ |
| Individual flag or segment                       | 200 KB |
| Total size of all flags and segments per project | 10 MB  |

The total size limit (the "pack") applies to the combined size of all flags and segments synced to the edge for a project.

### Flag validation

| Constraint               | Rule                                      |
| ------------------------ | ----------------------------------------- |
| Flag slug pattern        | Letters, numbers, dashes, and underscores |
| Flag slug length         | 1 - 512 characters                        |
| Environment name pattern | Letters, numbers, dashes, and underscores |
| Environment name length  | 1 - 128 characters                        |
| Environments per flag    | 10                                        |
| Rules per environment    | 10,000                                    |
| Targets per variant      | 10,000 per entity/attribute combination   |
| Items per condition list | 10,000                                    |
| Rules per segment        | 10,000                                    |
| Flag seed value          | 0 - 100,000                               |

All variant IDs referenced in rules must exist in the flag's variants array. Segments cannot be deleted while referenced by flags or other segments.

### Entity and settings limits

| Constraint                   | Limit          |
| ---------------------------- | -------------- |
| Entity types                 | 32             |
| Attributes per entity        | 32             |
| Labels per attribute         | 128            |
| Entity kind string length    | 128 characters |
| Entity label string length   | 128 characters |
| Attribute key string length  | 128 characters |
| Attribute type string length | 128 characters |
| Label value string length    | 128 characters |


---

[View full sitemap](/docs/sitemap)
