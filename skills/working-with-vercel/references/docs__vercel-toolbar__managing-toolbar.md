---
title: Managing the visibility of the Vercel Toolbar
product: vercel
url: /docs/vercel-toolbar/managing-toolbar
canonical_url: "https://vercel.com/docs/vercel-toolbar/managing-toolbar"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/vercel-toolbar
related:
  - /docs/vercel-toolbar/browser-extension
  - /docs/deployments/environments
  - /docs/environment-variables
  - /docs/domains/working-with-domains/add-a-domain
  - /docs/caching/cache-control-headers
summary: Learn how to enable or disable the Vercel Toolbar for your team, project, and session.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/vercel-toolbar/managing-toolbar.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "1f985820c9bd657bdcc58b280c8850fc900d20c3132fd0e5e8442736b891d7c1"
---

# Managing the visibility of the Vercel Toolbar

> **🔒 Permissions Required**: Vercel Toolbar


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Introducing new developer tools in the Vercel Toolbar](https://vercel.com/blog/introducing-new-developer-tools-in-the-vercel-toolbar?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related)
- [Use the Vercel Toolbar in Production with the Chrome Extension or the toolbar menu](https://vercel.com/changelog/use-the-vercel-toolbar-in-production?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related)
- [Add the Vercel Toolbar to your production environment](https://vercel.com/docs/vercel-toolbar/in-production-and-localhost/add-to-production?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related) — Learn how to add the Vercel Toolbar to your production environment and how your team members can use tooling to access t
- [Easier toolbar setup for SvelteKit and other Vite-based frameworks](https://vercel.com/changelog/easier-toolbar-setup-for-sveltekit-and-other-vite-based-frameworks?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related)
- [Improvements to Vercel Toolbar: Shrinking when inactive, removal of avatars, and more](https://vercel.com/changelog/improvements-to-vercel-toolbar?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related)
- [Enabling and Disabling Comments](https://vercel.com/docs/comments/how-comments-work?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related) — Learn when and where Comments are available, and how to enable and disable Comments at the account, project, and session
- [Accessibility Audit Tool](https://vercel.com/docs/vercel-toolbar/accessibility-audit-tool?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related) — Learn how to use the Accessibility Audit Tool to automatically check the Web Content Accessibility Guidelines 2.0 level
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/vercel-toolbar/managing-toolbar.graph.md](/docs/vercel-toolbar/managing-toolbar.graph.md?from=related&source_path=%2Fdocs%2Fvercel-toolbar%2Fmanaging-toolbar&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Viewing the toolbar

When the toolbar is enabled, you'll be able to view it on any preview or enabled environment. By default, the toolbar will appear as a circle with a menu icon. Clicking activates it, at which point you will see any comments on the page and notifications for issues detected by tools running in the background. When the toolbar has not been activated it will show a small Vercel icon over the menu icon.

Once a tool is used, the toolbar will show a second icon next to the menu, so you can access your most recently used tool.

## Enable or disable the toolbar team-wide

To disable the toolbar by default for all projects in your team:

1. Navigate to [your Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and make sure that you have selected your team from the team switcher.
2. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), open **Settings** in the sidebar.
3. In the **General** section, find **Vercel Toolbar**.
4. Under each environment (**Preview** and **Production**), select either **On** or **Off** from the dropdown to determine the visibility of the Vercel Toolbar for that environment.
5. You can optionally choose to allow the setting to be overridden at the project level.

![Image](`/docs-assets/static/docs/concepts/deployments/team-level-toolbar-management-light.png`)

## Enable or disable the toolbar project-wide

To disable the toolbar project-wide:

1. From your [dashboard](/dashboard), select the project you want to enable or disable Vercel Toolbar for.
2. Navigate to [**General**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgeneral\&title=Go+to+General+settings) in **Settings**.
3. Find **Vercel Toolbar**.
4. Under each environment (**Preview** and **Production**), select either an option from the dropdown to determine the visibility of Vercel Toolbar for that environment. The options are:
   - **Default**: Respect team-level visibility settings.
   - **On**: Enable the toolbar for the environment.
   - **Off**: Disable the toolbar for the environment.

![Image](`/docs-assets/static/docs/concepts/deployments/project-level-toolbar-management-light.png`)

## Disable toolbar for session

To disable the toolbar in the current browser tab:

1. Activate the Vercel Toolbar by clicking on it
2. In the toolbar menu, scroll down the list and select **Disable for Session**.

To show the toolbar again, open a new browser session.

Alternatively, you can also hide the toolbar in any of the following ways:

- Select the toolbar icon and drag it to the X that appears at the bottom of the screen.
- Click the [browser extension](/docs/vercel-toolbar/browser-extension) icon if you have it pinned to your browser bar.
- Use .

To show the toolbar when it is hidden you can use that same key command or click the browser extension.

Users with the browser extension can set the toolbar to start hidden by toggling on **Start Hidden** in **Preferences** from the Toolbar menu.

## Disable toolbar for automation

You can use the `x-vercel-skip-toolbar` header to prevent interference with automated end-to-end tests:

1. Add the `x-vercel-skip-toolbar` header to the request sent to [the preview deployment URL](/docs/deployments/environments#preview-environment-pre-production#preview-urls)
2. Optionally, you can assign the value `1` to the header. However, presence of the header itself triggers Vercel to disable the toolbar

## Enable or disable the toolbar for a specific branch

You can use Vercel's [preview environment variables](/docs/environment-variables#preview-environment-variables) to manage the toolbar for specific branches or environments

To enable the toolbar for an individual branch, add the following to the environment variables for the desired preview branch:

```txt filename=".env"
VERCEL_PREVIEW_FEEDBACK_ENABLED=1
```

To disable the toolbar for an individual branch, set the above environment variable's value to `0`:

```txt filename=".env"
VERCEL_PREVIEW_FEEDBACK_ENABLED=0
```

## Using the toolbar with a custom alias domain

To use the toolbar with preview deployments that have [custom alias domains](/docs/domains/working-with-domains/add-a-domain), you must opt into the toolbar explicitly in your project settings on [the dashboard](/dashboard).

## Using a Content Security Policy

If you have a [Content Security Policy (CSP)](https://developer.mozilla.org/docs/Web/HTTP/CSP) configured, you **may** need to adjust the CSP to enable access to the Vercel Toolbar or Comments.

You can make the following adjustments to the `Content-Security-Policy` [response header](/docs/caching/cache-control-headers#custom-response-headers):

- Add the following to `script-src` (Most commonly used):
  ```bash
    script-src https://vercel.live
  ```
- Add the following to `connect-src`:
  ```bash
    connect-src https://vercel.live wss://ws-us3.pusher.com
  ```
- Add the following to `img-src`:
  ```bash
    img-src https://vercel.live https://vercel.com data: blob:
  ```
- Add the following to `frame-src`:
  ```bash
    frame-src https://vercel.live
  ```
- Add the following to `style-src`:
  ```bash
    style-src https://vercel.live 'unsafe-inline'
  ```
- Add the following to `font-src`:
  ```bash
    font-src https://vercel.live https://assets.vercel.com
  ```


---

[View full sitemap](/docs/sitemap)
