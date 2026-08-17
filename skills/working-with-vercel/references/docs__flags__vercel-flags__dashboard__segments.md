---
title: Segments
product: vercel
url: /docs/flags/vercel-flags/dashboard/segments
canonical_url: "https://vercel.com/docs/flags/vercel-flags/dashboard/segments"
last_updated: 2026-07-14
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/dashboard
  - /docs/flags/vercel-flags
related:
  - /docs/flags/vercel-flags/dashboard/entities
  - /docs/cli/flags
  - /docs/flags/vercel-flags/dashboard/feature-flag
  - /docs/flags/vercel-flags/sdks
summary: Create reusable user segments for targeting feature flags.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/dashboard/segments.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "6995477a3f0d9b87249ede9fcc5813e96254e17c872ca5db6651bdcdddb5fd94"
---

# Segments

Segments are reusable groups of users for targeting feature flags. Instead of recreating "email ends with @yourcompany.com" for every internal feature, you create an "Internal Team" segment and reference it wherever needed.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Splits Work in Vercel Flags](https://vercel.com/kb/guide/how-splits-work-in-vercel-flags?from=related) — Use weighted splits in Vercel Flags to deterministically bucket users into variants by percentage for gradual rollouts a
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Create a segment](https://vercel.com/docs/rest-api/feature-flags/create-a-segment?from=related)
- [List segments](https://vercel.com/docs/rest-api/feature-flags/list-segments?from=related)
- [Get a segment](https://vercel.com/docs/rest-api/feature-flags/get-a-segment?from=related)
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Update a segment](https://vercel.com/docs/rest-api/feature-flags/update-a-segment?from=related)

Full cross-link map for this page: [/docs/flags/vercel-flags/dashboard/segments.graph.md](/docs/flags/vercel-flags/dashboard/segments.graph.md)
<!-- /docsgraph:related -->

When you update a segment's rules, every flag using that segment updates automatically. This keeps targeting consistent and makes bulk changes simple.

## Common segment examples

| Segment              | Description                         | Example rules                      |
| -------------------- | ----------------------------------- | ---------------------------------- |
| Internal Team        | Your employees                      | Email ends with `@yourcompany.com` |
| Beta Users           | Early adopters testing new features | User has `beta: true` attribute    |
| Enterprise Customers | High-tier paying customers          | Plan equals `enterprise`           |
| US Users             | Users in the United States          | Country equals `US`                |

## How to create a segment

1. Open **Flags** in your project
2. Click **Segments** in the sidebar
3. Click **Create Segment**
4. Enter a name and description
5. Define the targeting rules

### Defining segment rules

Segment rules use [entities](/docs/flags/vercel-flags/dashboard/entities) to match users. Each rule checks an attribute against a condition.

**Building a rule:**

- **Attribute**: The entity property to check (e.g., `user.email`, `team.plan`)
- **Operator**: How to compare the value:
  - `equals` / `does not equal`
  - `contains` / `does not contain`
  - `starts with` / `ends with`
  - `is one of` / `is not one of` (for lists)
- **Value**: What to match against

**Combining rules:**

You can combine multiple conditions with AND or OR logic:

```
user.email ends with "@yourcompany.com"
OR
user.role equals "admin"
```

This segment matches anyone with a company email OR anyone with the admin role.

> **💡 Note:** Segments are available in all environments (Production, Preview, Development). If you need different targeting per environment, create separate segments with environment-specific names (e.g., "Beta Users - Production").

## How to use a segment in a flag

Once you've created a segment, you can use it when configuring flag targeting:

1. Go to a flag's configuration
2. Click the **Target** icon next to an environment
3. Click **Add a Target**
4. Select your segment from the dropdown
5. Choose which variant to serve to users in this segment

Segments can be combined with other rules and targets in your flag configuration.

## How to edit a segment

When you edit a segment's rules, the change applies everywhere the segment is used. This makes it easy to update targeting across multiple flags at once.

1. Go to **Segments** in the Flags tab
2. Click on the segment you want to edit
3. Modify the rules
4. Save your changes

All flags using this segment will immediately use the updated rules.

## How to manage segments from the CLI

Use `vercel flags segments` to list, inspect, create, update, and delete segments from a linked project:

```bash filename="terminal"
vercel flags segments ls
vercel flags segments inspect beta-users
vercel flags segments create beta-users --label "Beta users" \
  --add include:user.id=user_123
vercel flags segments update beta-users --add rule:user.plan:eq:enterprise
vercel flags segments rm beta-users --yes
```

See the [`vercel flags` CLI reference](/docs/cli/flags#segments) for the full command syntax, including JSON output and `--data` examples. For operator values, see [available rule operators](/docs/cli/flags#available-rule-operators).

## How to delete a segment

To delete a segment, it must not be in use by any flags or other segments.

You can see the flags and segments currently referencing a segment on the Segment details page.

If a segment is referenced by a flag or segment:

1. Go to each flag (or segment) using the segment you want to delete
2. Remove the segment from the targeting rules
3. Return to Segments and delete it

## Next steps

- [Learn about entities](/docs/flags/vercel-flags/dashboard/entities) for defining targetable attributes
- [Configure flag targeting](/docs/flags/vercel-flags/dashboard/feature-flag)
- [Set up your SDK](/docs/flags/vercel-flags/sdks) to pass evaluation context


---

[View full sitemap](/docs/sitemap)
