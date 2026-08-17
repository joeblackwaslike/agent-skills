---
title: Accessibility Audit Tool
product: vercel
url: /docs/vercel-toolbar/accessibility-audit-tool
canonical_url: "https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool"
last_updated: 2025-09-24
type: how-to
prerequisites:
  - /docs/vercel-toolbar
related:
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/vercel-toolbar
  - /docs/vercel-toolbar/interaction-timing-tool
  - /docs/vercel-toolbar/layout-shift-tool
summary: Learn how to use the Accessibility Audit Tool to automatically check the Web Content Accessibility Guidelines 2.0 level A and AA rules.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "dc0fabdb9b2204b6d379976f426c02a02e2bada674ee7d393f2969f58ac2e907"
---

# Accessibility Audit Tool

> **🔒 Permissions Required**: Accessibility Audit Tool


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Managing Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar?from=related) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Browser Extensions](https://vercel.com/docs/vercel-toolbar/browser-extension?from=related) — The browser extensions enable you to use the toolbar in production environments, take screenshots and attach them to com
- [Using Vercel Toolbar](https://vercel.com/docs/microfrontends/managing-microfrontends/vercel-toolbar?from=related) — Learn about using vercel toolbar on Vercel.
- [Add to Production](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production?from=related) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t
- [Using Web Analytics](https://vercel.com/docs/analytics/using-web-analytics?from=related) — Learn how to use Vercel's Web Analytics to understand how visitors are using your website.

Full cross-link map for this page: [/docs/vercel-toolbar/accessibility-audit-tool.graph.md](/docs/vercel-toolbar/accessibility-audit-tool.graph.md)
<!-- /docsgraph:related -->

The accessibility audit tool automatically checks the [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG20/) level A and AA rules, grouping them by impact as defined by [deque axe](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules), and runs in the background on [all environments the toolbar and added to](/docs/vercel-toolbar/in-production-and-localhost).

## Accessing the accessibility audit tool

To access the accessibility audit tool:

1. [Open the Toolbar Menu](/docs/vercel-toolbar#using-the-toolbar-menu)
2. Select the **Accessibility Audit** option. If there are accessibility issues detected on the page, a badge will display next to the option. The number inside the badge details the number of issues detected
3. The **Accessibility** panel will open on the right side of the screen. Here you can filter by **All**, **Critical**, **Serious**, **Moderate**, and **Minor** issues

## Enabling or disabling the accessibility audit tool

The accessibility audit tool is enabled by default. To disable it:

1. Open the **Preferences** panel by selecting the toolbar menu icon, then scrolling down to the **Preferences** section
2. Toggle the **Accessibility Audit** option to enable or disable the tool

## Inspecting accessibility issues

To inspect an accessibility issue select the filter option you want to inspect. A list of issues will are displayed as dropdowns. You can select each dropdown to view the issue details, including an explanation of the issue and a link to the relevant WCAG guideline. Hovering over the failing elements markup will highlight the element on the page, while clicking on the element will log it to the devtools console.

![Image](`/front/docs/vercel-toolbar/accessibility-audit-panel-light.png`)

## Recording accessibility issues

By default the accessibility audit tool will log issues on page load. To test ephemeral states, such as hover or focus, you can record issues by interacting with the page. To record issues select the **Start Recording** button in the **Accessibility** panel. This will start recording issues as you interact with the page. To stop recording, select the **Stop Recording** button. Recording persists for your session, so you can refresh the page, or navigate to a new page and it will continue to record issues while your tab is active.

## More resources

- [Interaction Timing Tool](/docs/vercel-toolbar/interaction-timing-tool)
- [Layout Shift Tool](/docs/vercel-toolbar/layout-shift-tool)


---

[View full sitemap](/docs/sitemap)
