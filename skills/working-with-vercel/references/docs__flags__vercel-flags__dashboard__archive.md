---
title: Archive
product: vercel
url: /docs/flags/vercel-flags/dashboard/archive
canonical_url: "https://vercel.com/docs/flags/vercel-flags/dashboard/archive"
last_updated: 2026-07-15
type: how-to
prerequisites:
  - /docs/flags/vercel-flags/dashboard
  - /docs/flags/vercel-flags
related:
  - /docs/flags/vercel-flags/dashboard/feature-flag
  - /docs/flags/vercel-flags/dashboard
summary: Archive unused feature flags and restore them when needed.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/dashboard/archive.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "4dcbc152d31cd9f6f6595f96de7c69154210be13064dd297e2faf346b5f8abdc"
---

# Archive

The Archive is where you find feature flags that are no longer active. Archiving removes a flag from evaluation while preserving its configuration for later.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Vercel Flags is now generally available](https://vercel.com/changelog/vercel-flags-ga)
- [Vercel Flags is now in public beta](https://vercel.com/changelog/vercel-flags-is-now-in-public-beta)
- [Cleaning up after a full rollout](https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout) — Audit active flags, remove a fully rolled-out flag from your codebase, and archive it using the Vercel CLI.
- [Delete a flag](https://vercel.com/docs/rest-api/feature-flags/delete-a-flag) — DELETE /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug} — Permanently delete a feature flag from the pr
- [Getting Started with Vercel Flags](https://vercel.com/docs/flags/vercel-flags/quickstart) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Integrate flags with Vercel Web Analytics](https://vercel.com/docs/flags/observability/web-analytics) — Learn how to tag your page views and custom events with feature flags
- [Getting started with Flags Explorer](https://vercel.com/docs/flags/flags-explorer/getting-started) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags

Full cross-link map for this page: [/docs/flags/vercel-flags/dashboard/archive.graph.md](/docs/flags/vercel-flags/dashboard/archive.graph.md)
<!-- /docsgraph:related -->

Archive a flag after it is no longer used in code. For example when a feature has fully rolled out, an experiment has concluded, or you want to clean up your flags list without losing the configuration. If a feature might return, archiving lets you restore its configuration and history intact rather than rebuilding from scratch.

Vercel Flags requires you to archive flags before you can delete them. This gives you a safety net if you change your mind.

## Archiving vs. deleting

| Action      | What happens                                                    | Reversible? |
| ----------- | --------------------------------------------------------------- | ----------- |
| **Archive** | Flag stops being served; configuration and history is preserved | Yes         |
| **Delete**  | Flag and all configuration are permanently removed              | No          |

Archive flags when you're done with a feature but might want to restore it later. Delete flags only when you're certain you won't need them again.

## What happens when you archive

When you archive a flag:

1. **Evaluation stops**: The flag is no longer served by the SDK
2. **Your application falls back**: It uses the default value defined in code
3. **Configuration is preserved**: All variants, rules, and targeting settings are saved
4. **The flag moves to Archive**: It no longer appears in the main flags list

> **💡 Note:** If your code doesn't define a default value for the flag, evaluation will throw an error. Make sure your flag definitions include a `defaultValue` or handle missing flags gracefully.

```ts filename="flags.ts"
export const archivedFeature = flag({
  key: 'archived-feature',
  adapter: vercelAdapter(),
  // This default is used when the flag is archived
  defaultValue: false,
});
```

## How to archive a flag

1. Open **Flags** in your project
2. Click on the flag you want to archive
3. Open the Dot menu on the top right
4. Click the **Archive** button
5. Confirm the action

The flag will immediately stop being served and move to the Archive section.

## How to restore a flag

1. Go to the **Archive** section in the Flags tab
2. Click on the flag you want to restore
3. Open the Dot menu on the top right
4. Click the **Unarchive** button
5. Confirm the action

The flag returns to your active flags list with all its previous configuration intact. You can then modify it or enable it as needed.

## How to delete an archived flag

1. Go to the **Archive** section
2. Click on the flag you want to delete
3. Click **Delete**
4. Confirm the permanent deletion

> **💡 Note:** Deleting a flag is permanent and cannot be undone. All configuration, including variants, targeting rules, and change history, will be lost.

## Next steps

- [Configure feature flags](/docs/flags/vercel-flags/dashboard/feature-flag)
- [Manage flags in the dashboard](/docs/flags/vercel-flags/dashboard)


---

[View full sitemap](/docs/sitemap)
