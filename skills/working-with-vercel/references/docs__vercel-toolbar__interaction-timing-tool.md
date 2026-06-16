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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "08539581f455178db56fbd2ba92ca1fc8c8f1d1118357df148532320a74fb221"
---

# Interaction Timing Tool

> **🔒 Permissions Required**: Interaction Timing Tool

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
