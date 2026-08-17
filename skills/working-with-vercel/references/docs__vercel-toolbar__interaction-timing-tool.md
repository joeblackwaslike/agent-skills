---
title: Interaction Timing Tool
product: vercel
url: /docs/vercel-toolbar/interaction-timing-tool
canonical_url: "https://vercel.com/docs/vercel-toolbar/interaction-timing-tool"
last_updated: 2025-07-18
type: how-to
prerequisites:
  - /docs/vercel-toolbar
related:
  - /docs/vercel-toolbar
  - /docs/deployments/environments
  - /docs/comments/using-comments
  - /docs/draft-mode
summary: "The interaction timing tool allows you to inspect in detail each interaction's latency and get notified for interactions taking >200ms."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-toolbar/interaction-timing-tool.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "7c9c7cddec0fd8fd23a583e168e6362a64a8166a4a636c3d79801d5f14ece0cd"
---

# Interaction Timing Tool

> **🔒 Permissions Required**: Interaction Timing Tool


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Optimizing Core Web Vitals in 2024](https://vercel.com/kb/guide/optimizing-core-web-vitals-in-2024?from=related) — Learn how to optimize Core Web Vitals for your site, including INP, CLS, LCP, and more.
- [Accessibility Audit Tool](https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool?from=related) — Learn how to use the Accessibility Audit Tool to automatically check the Web Content Accessibility Guidelines 2.0 level
- [Layout Shift Tool](https://vercel.com/docs/vercel-toolbar/layout-shift-tool?from=related) — The layout shift tool gives you insight into any elements that may cause layout shifts on the page.
- [Managing Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar?from=related) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Speed Insights](https://vercel.com/docs/speed-insights?from=related) — This page lists out and explains all the performance metrics provided by Vercel's Speed Insights feature.
- [Add to Production](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production?from=related) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t

Full cross-link map for this page: [/docs/vercel-toolbar/interaction-timing-tool.graph.md](/docs/vercel-toolbar/interaction-timing-tool.graph.md)
<!-- /docsgraph:related -->

As you navigate your site, the interaction timing tool allows you to inspect in detail each interaction's latency and get notified with toasts for interactions taking > 200ms. This can help you ensure your site's [Interaction to Next Paint (INP)](/blog/first-input-delay-vs-interaction-to-next-paint) (a Core Web Vitals) has a good score.

## Accessing the Interaction Timing Tool

To access the interaction timing tool:

1. [Open the Toolbar Menu](/docs/vercel-toolbar#using-the-toolbar-menu)
2. Select the **Interaction Timing** option. If any interaction has been detected on the page, a badge will display next to the option. The number inside the badge is the current INP
3. The **Interaction Timing** popover will open on the right side of the screen. As you navigate your site, each interaction will appear in this panel. Mouse over the interaction timeline to understand how the duration of input delay, processing (event handlers), and rendering are affecting the interaction's latency

## Interaction Timing Tool Preferences

To change preferences for the interaction timing tool:

1. [Open the Toolbar Menu](/docs/vercel-toolbar#using-the-toolbar-menu)
2. Select the **Preferences** option
3. Select your desired setting for **Measure Interaction Timing**
   - **On** will show the toasts for interactions taking >200ms
   - **On (Silent)** will not show toasts, but will still track interaction timing and display it in the interaction timing side panel when opened
   - **Off** will turn off tracking for interaction timing

## More resources

- [Preview deployments overview](/docs/deployments/environments#preview-environment-pre-production)
- [Using comments with preview deployments](/docs/comments/using-comments)
- [Draft mode](/docs/draft-mode)


---

[View full sitemap](/docs/sitemap)
