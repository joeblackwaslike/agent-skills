---
title: Layout Shift Tool
product: vercel
url: /docs/vercel-toolbar/layout-shift-tool
canonical_url: "https://vercel.com/docs/vercel-toolbar/layout-shift-tool"
last_updated: 2025-09-24
type: reference
prerequisites:
  - /docs/vercel-toolbar
related:
  - /docs/speed-insights/metrics
  - /docs/vercel-toolbar
  - /docs/deployments/environments
  - /docs/comments/using-comments
  - /docs/draft-mode
summary: The layout shift tool gives you insight into any elements that may cause layout shifts on the page.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-toolbar/layout-shift-tool.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "ff90ada9c14e9dc0e0dd35972ee066a571ec1a859553157488e4d7de1ebfb1fe"
---

# Layout Shift Tool

> **🔒 Permissions Required**: Layout Shift Tool


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Optimizing Core Web Vitals in 2024](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024?from=related) — Learn how to optimize Core Web Vitals for your site, including INP, CLS, LCP, and more.
- [Improve Cumulative Layout Shift \(CLS\) on Vercel](https://vercel.com/kb/guide/cls-on-vercel?from=related) — Read, diagnose, and fix Cumulative Layout Shift on Vercel using Speed Insights and Next.js best practices.
- [Interaction Timing Tool](https://vercel.com/docs/vercel-toolbar/interaction-timing-tool?from=related) — The interaction timing tool allows you to inspect in detail each interaction's latency and get notified for interactions
- [Accessibility Audit Tool](https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool?from=related) — Learn how to use the Accessibility Audit Tool to automatically check the Web Content Accessibility Guidelines 2.0 level
- [Managing Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar?from=related) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Speed Insights](https://vercel.com/docs/speed-insights?from=related) — This page lists out and explains all the performance metrics provided by Vercel's Speed Insights feature.
- [Edit Mode](https://vercel.com/docs/edit-mode?from=related) — Discover how Vercel's Edit Mode enhances content management for headless CMSs, enabling real-time editing, and seamless

Full cross-link map for this page: [/docs/vercel-toolbar/layout-shift-tool.graph.md](/docs/vercel-toolbar/layout-shift-tool.graph.md)
<!-- /docsgraph:related -->

The layout shift tool gives you insight into any elements that may cause layout shifts on the page. The cause for a layout shift could be many things:

- Elements that change in height or width
- Custom font loading
- Media embeds (images, iframes, videos, etc.) that do not have set dimensions
- Dynamic content that's injected at runtime
- Animations that affect layout

Layout shifts play a part in [Core Web Vitals](/docs/speed-insights/metrics#core-web-vitals-explained) and contribute to [Speed Insights](/docs/speed-insights/metrics#core-web-vitals-explained) scores. With the layout shift tool, you can see which elements are contributing to a layout shift and by how much.

## Accessing the layout shift tool

To access the layout shift tool:

1. [Open the toolbar menu](/docs/vercel-toolbar#using-the-toolbar-menu)
2. Select the **Layout Shifts** option. If there are layout shifts detected on the page, a badge will display next to the option. The number inside the badge details the number of shifts detected
3. The **Layout Shifts** popover will open on the right side of the screen. Here you can filter, inspect, and replay any detected layout shifts

Each shift details its impact, the responsible element, and a description of the shift if available. For example, "became taller when its text changed and shifted another element". Hovering over a layout shift will highlight the affected element. You can also replay layout shifts to get a better understanding of what's happening.

## Inspecting layout shifts

You can replay a layout shift by either:

- Double-clicking it
- Selecting it and using the **Replay selected shift** button

You can also select more than one shift and play them at the same time. You may want to do this to see the combined effect of element shifts on the page.

When you replay layout shifts, the Vercel Toolbar will become your stop button. Press this to stop replaying layout shifts. Alternatively, press the  key.

You can also disable layout shift detection on a per element basis. You can do this by adding a `data-allow-shifts` attribute to an element. This will affect the element and its descendants.

## Disabling the layout shift tool

To disable the layout shift tool completely:

1. [Open the Toolbar Menu](/docs/vercel-toolbar#using-the-toolbar-menu)
2. Select **Preferences**
3. Toggle the setting for **Layout Shift Detection**

## More resources

- [Preview deployments overview](/docs/deployments/environments#preview-environment-pre-production)
- [Using comments with preview deployments](/docs/comments/using-comments)
- [Draft mode](/docs/draft-mode)


---

[View full sitemap](/docs/sitemap)
