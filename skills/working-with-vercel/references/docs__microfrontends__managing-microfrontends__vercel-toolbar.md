---
title: Using Vercel Toolbar
product: vercel
url: /docs/microfrontends/managing-microfrontends/vercel-toolbar
canonical_url: "https://vercel.com/docs/microfrontends/managing-microfrontends/vercel-toolbar"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends/managing-microfrontends
  - /docs/microfrontends
related:
  - /docs/vercel-toolbar
  - /docs/microfrontends/quickstart
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/microfrontends/troubleshooting
summary: Learn about using vercel toolbar on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/managing-microfrontends/vercel-toolbar.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "59d417f68423c51847a7998c6dc7cf526841500e6de4c900218c4b9173f8d063"
---

# Managing with the Vercel Toolbar

Using the [Vercel Toolbar](/docs/vercel-toolbar), you can visualize and independently test your microfrontends so you can develop microfrontends in isolation. The Microfrontends panel of the toolbar shows all microfrontends that you have [configured in `microfrontends.json`](/docs/microfrontends/quickstart#define-microfrontends.json).

You can access it in all microfrontends that you have [enabled the toolbar for](/docs/vercel-toolbar/in-production-and-localhost).

> **💡 Note:** This requires version `0.1.33` or newer of the `@vercel/toolbar` package.

## View all microfrontends

In the **Microfrontends** panel of the toolbar shows all microfrontends that are available in that microfrontends group. By clicking on each microfrontend, you can see information such as the corresponding Vercel project or take action on the microfrontend.

![Image](`/docs-assets/static/docs/microfrontends/toolbar/microfrontends-panel-2-light.png`)

## Microfrontends zone indicator

Since multiple microfrontends can serve content on the same domain, it's easy to lose track of which application is serving that page. Use the **Zone Indicator** to display the name of the application and environment that the microfrontend is being served by whenever you visit any paths.

![Image](`/docs-assets/static/docs/microfrontends/toolbar/zone-indicator-3-light.png`)

You find the **Zone Indicator** toggle at the bottom of the **Microfrontends** panel in the Vercel toolbar.

## Routing overrides

While developing microfrontends, you often want to build and test just your microfrontend in isolation to avoid dependencies on other projects. Vercel will intelligently choose the environment or fallback based on what projects were built for your commit. The Vercel Toolbar will show you which environments microfrontend requests are routed to and allow you to override that decision to point to another environment.

1. Open the **microfrontends panel** in the Vercel Toolbar.
2. Find the application that you want to modify in the list of microfrontends.
3. In the **Routing** section, choose the environment and branch (if applicable) that you want to send requests to.
4. Select **Reload Preview** to see the microfrontend with the new values.

To undo the changes back to the original values, open the microfrontends panel and click **Reset to Default**.

![Image](`/docs-assets/static/docs/microfrontends/toolbar/routing-overrides-3-light.png`)

## Enable routing debug mode

You can enable [debug headers](/docs/microfrontends/troubleshooting#debug-headers) on microfrontends responses to help [debug issues with routing](/docs/microfrontends/troubleshooting#requests-are-not-routed-to-the-correct-microfrontend-in-production). In the **Microfrontends** panel in the Toolbar, click the **Enable Debug Mode** toggle at the bottom of the panel.


---

[View full sitemap](/docs/sitemap)
