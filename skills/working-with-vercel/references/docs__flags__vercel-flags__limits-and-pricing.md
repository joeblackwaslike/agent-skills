---
title: Limits and Pricing for Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/limits-and-pricing
canonical_url: "https://vercel.com/docs/flags/vercel-flags/limits-and-pricing"
last_updated: 2026-08-26
type: reference
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  []
summary: Review Vercel Flags request pricing and limits for flags, segments, configuration size, and connected projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/limits-and-pricing.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0470dacd200e2906d867bc2c06ad87b79ae4fbe6f1e635506a61ab28ceb3722b"
---

# Limits and Pricing for Vercel Flags

## Pricing

### Flag requests

A flag request is an application request that reads a source project's flag configuration. When you use the same Flags client, evaluating multiple flags from that source within one application request counts as one flag request. Repeated evaluations of the same flag within a request do not count.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags is now in public beta](https://vercel.com/changelog/vercel-flags-is-now-in-public-beta)
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Pricing for Flags Explorer](https://vercel.com/docs/flags/flags-explorer/limits-and-pricing) — Compare monthly Flags Explorer override limits and the price of unlimited overrides across Vercel plans.
- [Container Registry limits and pricing](https://vercel.com/docs/container-registry/limits-and-pricing) — Storage pricing, size limits, plan limits, and compatibility limits for Vercel Container Registry.
- [Feature Flag Configuration](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [Fair Use Guidelines](https://vercel.com/docs/limits/fair-use-guidelines) — Learn how Vercel applies fair use guidelines across plans and usage-based resources.
- [List segments](https://vercel.com/docs/rest-api/feature-flags/list-segments) — GET /v1/projects/{projectIdOrName}/feature-flags/segments — List all feature flag segments for a project.

Full cross-link map for this page: [/docs/flags/vercel-flags/limits-and-pricing.graph.md](/docs/flags/vercel-flags/limits-and-pricing.graph.md)
<!-- /docsgraph:related -->

Reads from different source projects count separately. Reads of cached flag configuration also count.

Reuse one Flags client per source project. Separate client instances track reads separately, even within the same application request.

A page view can make several application requests. Each application request that reads flag configuration counts separately.

These examples use one shared Flags client per source project.

| Evaluations within one application request | Flag requests |
| ----------------------------------------- | ------------- |
| One flag from one source project          | 1             |
| 10 flags from one source project          | 1             |
| The same flag evaluated 10 times           | 1             |
| Flags from two source projects            | 2             |

Vercel Flags is priced at \*\*$0.03 per 1,000 flag requests\*\* for Pro teams. Enterprise pricing is custom.

|  | Hobby | Pro | Enterprise |
| --- | --- | --- | --- |
| Maximum flag requests per month | 10,000 | N/A | Custom |
| Additional flag requests | - | $0.03 per 1,000 requests | Custom |


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
| Labels per attribute         | 256            |
| Entity kind string length    | 128 characters |
| Entity label string length   | 128 characters |
| Attribute key string length  | 128 characters |
| Attribute type string length | 128 characters |
| Label value string length    | 128 characters |


---

[View full sitemap](/docs/sitemap)
