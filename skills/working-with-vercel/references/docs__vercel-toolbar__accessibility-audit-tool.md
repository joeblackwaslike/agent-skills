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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "929e696a2828f17d854d2d585ff1fe22e1fe6888be669d813647e8bd269b184d"
---

# Accessibility Audit Tool

> Accessibility Audit Tool is available on all plans

The accessibility audit tool automatically checks the [Web Content Accessibility Guidelines 2.0](https://www.w3.org/TR/WCAG20/) level A and AA rules, grouping them by impact as defined by [deque axe](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md#wcag-21-level-a--aa-rules), and runs in the background on [all environments the toolbar and added to](/docs/vercel-toolbar/in-production-and-localhost).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Uncover accessibility issues on your deployments from the Vercel Toolbar](https://vercel.com/changelog/accessibility-tool)
- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar)
- [Managing the visibility of the Vercel Toolbar](https://vercel.com/docs/vercel-toolbar/managing-toolbar) — Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
- [Toolbar](https://vercel.com/docs/agent-resources/vercel-mcp/tools/toolbar) — Vercel MCP tools for toolbar.
- [Add the Vercel Toolbar to your production environment](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t
- [Attestations and Compliance Report](https://vercel.com/docs/security/attestations-and-compliance-report) — Learn how to preview and download Vercel compliance documents from the dashboard.
- [Observability](https://vercel.com/docs/observability) — Find production errors, capture request traces, and discover queryable metrics with Vercel Observability and Vercel CLI.

Full cross-link map for this page: [/docs/vercel-toolbar/accessibility-audit-tool.graph.md](/docs/vercel-toolbar/accessibility-audit-tool.graph.md)
<!-- /docsgraph:related -->

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

To inspect an accessibility issue, select the filter option you want to inspect. A list of issues is displayed as dropdowns. You can select each dropdown to view the issue details, including an explanation of the issue and a link to the relevant WCAG guideline. Hovering over the markup of the failing elements will highlight the element on the page, while clicking on the element will log it to the devtools console.

![Using the Accessibility Audit Tool](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/vercel-toolbar/accessibility-audit-panel-light.png)

## Recording accessibility issues

By default the accessibility audit tool will log issues on page load. To test ephemeral states, such as hover or focus, you can record issues by interacting with the page. To record issues select the **Start Recording** button in the **Accessibility** panel. This will start recording issues as you interact with the page. To stop recording, select the **Stop Recording** button. Recording persists for your session, so you can refresh the page, or navigate to a new page and it will continue to record issues while your tab is active.

## More resources

- [Interaction Timing Tool](/docs/vercel-toolbar/interaction-timing-tool)
- [Layout Shift Tool](/docs/vercel-toolbar/layout-shift-tool)

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
