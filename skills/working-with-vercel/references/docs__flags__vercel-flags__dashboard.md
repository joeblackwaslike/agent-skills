---
title: Managing flags in the dashboard
product: vercel
url: /docs/flags/vercel-flags/dashboard
canonical_url: "https://vercel.com/docs/flags/vercel-flags/dashboard"
last_updated: 2026-06-24
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/dashboard/feature-flag
  - /docs/flags/vercel-flags/dashboard/drafts
  - /docs/flags/vercel-flags/dashboard/segments
  - /docs/flags/vercel-flags/dashboard/entities
  - /docs/flags/vercel-flags/dashboard/sdk-keys
summary: Learn how to manage your feature flags using the Vercel Dashboard.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/dashboard.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ac3d41ac51e22d17a10f1f286e33793a208b2f266e456ce71165b8ed0589cd4b"
---

# Managing flags in the dashboard

The **Flags** section in your Vercel dashboard sidebar is the central place to manage feature flags. You can configure targeting rules, weighted splits, progressive rollouts, and coordinate releases for Boolean, String, Number, and JSON flags directly within Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Flags SDK](https://vercel.com/docs/flags/vercel-flags/sdks/flags-sdk?from=related) — Integrate Vercel Flags into your Next.js or SvelteKit application using the Flags SDK.
- [Flags Explorer](https://vercel.com/docs/flags/flags-explorer?from=related) — View and override your application's feature flags from the Vercel Toolbar
- [Flags SDK](https://vercel.com/docs/flags/flags-sdk-reference?from=related) — API reference for the Flags SDK for Next.js and SvelteKit.
- [Set Up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer?from=related) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot
- [Web Analytics](https://vercel.com/docs/flags/observability/web-analytics?from=related) — Learn how to tag your page views and custom events with feature flags

Full cross-link map for this page: [/docs/flags/vercel-flags/dashboard.graph.md](/docs/flags/vercel-flags/dashboard.graph.md)
<!-- /docsgraph:related -->

![Image](`/docs-assets/static/docs/flags/flags-tab-light.png`)

## Access your flags

You can access the flags dashboard by navigating to your project and selecting the **Flags** section in the sidebar:

The **Overview** shows all your flags at a glance. You can filter and search to see each flag's status, type, and whether it's currently in use. Flags from Marketplace providers display their provider's icon, while Vercel Flags show a status light. Click on **Vercel Flags** » **Flags** on the left to see Vercel Flags only.

## How to create a flag

> **💡 Note:** **Project Administrators** and **Developers** can create and manage feature
> flags.

To create a flag in the dashboard:

1. From the **Flags** tab, click the **Create Flag** button
2. Enter a **Slug** for your flag (e.g., `show-new-feature`)
3. Select the **Type** (Boolean, String, Number, or JSON)

For String, Number, and JSON flags, you can define the variants your flag returns. Each variant has a **value** used in code and an optional **label** shown in the dashboard. JSON flags use a code editor for entering structured values like objects and arrays.

When you create a JSON flag, give variants clear labels so they're easier to distinguish later in environment selectors and targeting rules.

During creation, you can configure which variant each environment receives. Boolean flags default to `true` in Development and `false` in Preview and Production, so your feature is visible while you develop but hidden after merging. You can refine these rules at any time after creating the flag.

When you create a flag, Vercel automatically configures this environment variable for your project:

- `FLAGS_SECRET`: Secret key used by the Flags Explorer for overrides

See [Feature Flag Configuration](/docs/flags/vercel-flags/dashboard/feature-flag) for more information on how to configure individual flags.

## Flags tab sections

### Flags

Select any flag to configure how it behaves across environments and user groups. You can set static values, add targeting rules that evaluate top to bottom, and track the complete history of changes. Rules can target specific segments or entities, with weighted splits for experiments and progressive rollouts for time-based releases.

For more information on how to configure individual flags, see [Feature Flag Configuration](/docs/flags/vercel-flags/dashboard/feature-flag).

### Drafts

Drafts are flags that Vercel detects in your code but haven't been created in the dashboard yet. This lets you define flags in code first, then promote them when you're ready to configure targeting. When you create a feature flag from a draft the descriptions and options from your code are pre-filled automatically.

For more information on drafts, see [Draft Flags](/docs/flags/vercel-flags/dashboard/drafts).

### Segments

Segments let you define reusable groups of users, like "Beta Testers" or "Internal Team." Create a segment once with your targeting rules, then apply it to any flag. When you update a segment, all flags using it update automatically.

For more information on segments, see [Segments](/docs/flags/vercel-flags/dashboard/segments).

### Entities

Entities define the types and attributes you can target, like User, Team, or Device. By mapping entities to your application data, you can create precise rules like "enable for users on the Enterprise plan" or "show to users in the Engineering department."

For more information on entities, see [Entities](/docs/flags/vercel-flags/dashboard/entities).

### SDK Keys

SDK Keys are secrets for manual authentication and cross-project flag evaluation.

To share flags across projects, such as in a microfrontend setup, create a dedicated SDK Key in one project and add it to the other project's environment variables. See [How to use flags of another project](/docs/flags/vercel-flags/dashboard/sdk-keys#how-to-use-flags-of-another-project) for details.

For more information on SDK keys, see [SDK Keys](/docs/flags/vercel-flags/dashboard/sdk-keys).

### Archive

Archive flags when they're no longer needed but you might want to restore them later. Archived flags stop being served and can't be edited while archived, but their configuration is preserved. You can restore a flag with all its previous settings intact, or permanently delete it from the archive.

For more information on archiving flags, see [Archive](/docs/flags/vercel-flags/dashboard/archive).

## Next steps

- [Quickstart guide](/docs/flags/vercel-flags/quickstart)
- [Set up Flags Explorer](/docs/flags/flags-explorer/getting-started)
- [Enable observability](/docs/flags/observability)


---

[View full sitemap](/docs/sitemap)
