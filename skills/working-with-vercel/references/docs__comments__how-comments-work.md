---
title: Enabling and Disabling Comments
product: vercel
url: /docs/comments/how-comments-work
canonical_url: "https://vercel.com/docs/comments/how-comments-work"
last_updated: 2026-08-11
type: how-to
prerequisites:
  - /docs/comments
related:
  - /docs/accounts
  - /docs/vercel-toolbar/managing-toolbar
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/deployments/sharing-deployments
summary: Learn when and where Comments are available, and how to enable and disable Comments at the account, project, and session or interface levels.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/comments/how-comments-work.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "006be4802069c79ee2cbb73649d199d94c17bdb0d27eba8dcdca9604268ff4e4"
---

# Enabling and Disabling Comments

Comments are enabled by default for all preview deployments on all new projects. **By default, only members of [your Vercel team](/docs/accounts#creating-a-team) can contribute comments**.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related)
- [Introducing Commenting on Preview Deployments](https://vercel.com/blog/introducing-commenting-on-preview-deployments?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related)
- [Using Vercel comments to improve the Next.js 13 documentation](https://vercel.com/blog/using-vercel-comments-to-improve-the-next-js-13-documentation?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related)
- [How do I prevent the Vercel for GitHub integration comments?](https://vercel.com/kb/guide/how-to-prevent-vercel-github-comments?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related) — Information on how to prevent the Vercel for GitHub integration from adding comments.
- [Enhanced Preview experience](https://vercel.com/blog/making-live-reviews-a-reality-enhanced-preview-experience?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related)
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us
- [Create React App on Vercel](https://vercel.com/docs/frameworks/frontend/create-react-app?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related) — Deploy Create React App projects to Vercel and add Preview Deployments, Web Analytics, Speed Insights, and Observability
- [SvelteKit on Vercel](https://vercel.com/docs/frameworks/full-stack/sveltekit?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related) — Deploy SvelteKit applications to Vercel and configure the adapter, rendering, streaming, ISR, analytics, and Routing Mid
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/comments/how-comments-work.graph.md](/docs/comments/how-comments-work.graph.md?from=related&source_path=%2Fdocs%2Fcomments%2Fhow-comments-work&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **💡 Note:** The comments toolbar will only render on sites with **HTML** set as the
> `Content-Type`. Additionally, on Next.js sites, the comments toolbar will only
> render on Next.js pages and **not** on API routes or static files.

### At the account level

You can enable or disable comments at the account level with certain permissions:

1. Navigate to [your Vercel dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard) and make sure that you have selected your team from the team switcher.
2. From your [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard), open **Settings** in the sidebar.
3. In the **General** section, find **Vercel Toolbar**.
4. Under each environment (**Preview** and **Production**), select either **On** or **Off** from the dropdown to determine the visibility of the Vercel Toolbar for that environment.
5. You can optionally choose to allow the setting to be overridden at the project level.

![Image](`/docs-assets/static/docs/concepts/deployments/team-level-toolbar-management-light.png`)

### At the project level

1. From your [dashboard](/dashboard), select the project you want to enable or disable Vercel Toolbar for.
2. Navigate to [**General**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgeneral\&title=Go+to+General+settings) in **Settings**.
3. Find **Vercel Toolbar**.
4. Under each environment (**Preview** and **Production**), select either an option from the dropdown to determine the visibility of Vercel Toolbar for that environment. The options are:
   - **Default**: Respect team-level visibility settings.
   - **On**: Enable the toolbar for the environment.
   - **Off**: Disable the toolbar for the environment.

![Image](`/docs-assets/static/docs/concepts/deployments/project-level-toolbar-management-light.png`)

### At the session or interface level

To disable comments for the current browser session, you must [disable the toolbar](/docs/vercel-toolbar/managing-toolbar#disable-toolbar-for-session).

### With environment variables

You can enable or disable comments for specific branches or environments with [preview environment variables](/docs/vercel-toolbar/managing-toolbar#enable-or-disable-the-toolbar-for-a-specific-branch).

See [Managing the toolbar](/docs/vercel-toolbar/managing-toolbar) for more information.

### In production and localhost

To use comments in a production deployment, or link comments in your local development environment to a preview deployment, see [our docs on using comments in production and localhost](/docs/vercel-toolbar/in-production-and-localhost).

See [Managing the toolbar](/docs/vercel-toolbar/managing-toolbar) for more information.

## Sharing

To learn how to share deployments with comments enabled, see the [Sharing Deployments](/docs/deployments/sharing-deployments) docs.


---

[View full sitemap](/docs/sitemap)
