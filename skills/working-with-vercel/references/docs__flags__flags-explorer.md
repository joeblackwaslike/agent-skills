---
title: Flags Explorer
product: vercel
url: /docs/flags/flags-explorer
canonical_url: "https://vercel.com/docs/flags/flags-explorer"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/flags
related:
  - /docs/vercel-toolbar
  - /docs/flags/flags-explorer/getting-started
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/flags/flags-explorer/reference
  - /docs/flags/flags-explorer/limits-and-pricing
summary: "View and override your application's feature flags from the Vercel Toolbar"
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/flags-explorer.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "ad8d99a4458c3216a415e3c1b3746f58ba5c7d1f2653dc3d0c65afa8ff22efad"
---

# Flags Explorer

> **🔒 Permissions Required**: Flags Explorer

The Flags Explorer is a feature of the [Vercel Toolbar](/docs/vercel-toolbar) that allows you to view and override your application's feature flags without leaving your browser tab. You can also share and recommend overrides to team members. Follow the [Quickstart](/docs/flags/flags-explorer/getting-started) to make the Flags Explorer aware of your application's feature flags.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Quickstart](https://flags-sdk.dev/docs/frameworks/next?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related) — Learn how to start using the Flags SDK in your Next.js project.
- [Providers](https://flags-sdk.dev/docs/providers?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related) — Combine your feature flag provider with the Flags SDK using an adapter.
- [Flagsmith](https://flags-sdk.dev/docs/providers/flagsmith?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [GrowthBook](https://flags-sdk.dev/docs/providers/growthbook?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [Hypertune](https://flags-sdk.dev/docs/providers/hypertune?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [LaunchDarkly is now available on the Vercel Marketplace](https://vercel.com/changelog/launchdarkly-is-now-available-on-the-vercel-marketplace?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [Add structured application logs to Vercel Functions](https://vercel.com/kb/guide/add-structured-application-logs-to-vercel-functions?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related) — Learn how to add structured application logs to Vercel Functions to help troubleshoot function issues in real time.
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [Introducing feature flag management from the Vercel Toolbar](https://vercel.com/blog/toolbar-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [View and override feature flags from the Vercel Toolbar](https://vercel.com/changelog/view-and-override-feature-flags-from-the-vercel-toolbar?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [Flags Explorer is now generally available](https://vercel.com/changelog/flags-explorer-is-now-generally-available?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related)
- [Setting up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=related) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot

Full cross-link map for this page: [/docs/flags/flags-explorer.graph.md](/docs/flags/flags-explorer.graph.md?from=related&source_path=%2Fdocs%2Fflags%2Fflags-explorer&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Quickly override feature flags for your current session without signing into your feature flag provider, and without affecting team members or automated tests using the Flags Explorer.

Team members can access the Flags Explorer once they have activated the toolbar. The Flags Explorer is available in all environments your team has [enabled the toolbar for](/docs/vercel-toolbar/in-production-and-localhost).

![Image](`/docs-assets/static/docs/workflow-collaboration/feature-flags/flags-explorer-overview-filter-light.png`)

## View and override flags in the toolbar

Before you can use with the Flags Explorer, ensure that your team has set up both [feature flags](/docs/flags/flags-explorer/getting-started) and the [Vercel Toolbar](/docs/vercel-toolbar/in-production-and-localhost) in the environment you are using,

To see and override feature flags for your application:

1. You must log into the Vercel Toolbar to interact with your application's feature flag overrides.
2. Select the **Flags Explorer** option () from the Vercel Toolbar menu.
3. Find the desired feature flag in the modal by scrolling or using the search and filter controls.
4. Select an override value for the desired feature flag. Note that by default, overrides are not persisted and only affect the user applying them, in the environment in which they were set. To share overrides, see [Sharing flag overrides](#sharing-flag-overrides).
5. Apply the changes. This will trigger a soft reload. If you have applied changes, the Vercel Toolbar will turn blue.

## Sharing flag overrides

Any overrides you apply from Vercel Toolbar usually apply to your browser session only. However, you can recommend overrides to team members by either:

- [Setting overrides as recommended for a given branch](#branch-based-recommendations)
- Explicitly [sharing a set of overrides through a URL](#url-based-recommendations) with a team member

### Branch based recommendations

This workflow is great when you start working on a new feature in a branch, as the recommended overrides will travel with the branch from local development through to the preview deployment.

1. First configure the overrides you would like to share as usual
2. Then, select the chevron next to the branch name at the top
3. Choose **Save Recommendations** to recommend these overrides to any team member visiting your branch locally or on a preview deployment

When a team member visits that branch they will get a notification suggesting to apply the overrides you recommended. Notifications are displayed on all preview deployments, but not on your production deployment.

### URL based recommendations

This workflow is great when you want to share once-off overrides with team members to reproduce a bug under certain conditions or to share a new feature.

1. First configure the overrides you would like to share as usual
2. Choose **Share** to copy a link to the page you are on, along with a query parameter containing your overrides

You can send this link to team members. When they visit the link they will get a notification suggesting to apply the overrides you shared.

## More resources

- [Flags Explorer reference](/docs/flags/flags-explorer/reference)
- [Flags Explorer pricing and limits](/docs/flags/flags-explorer/limits-and-pricing)
- [Flags SDK Reference](/docs/flags/flags-sdk-reference)


---

[View full sitemap](/docs/sitemap)
