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
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "517dbb6244db8bfa904d68eb346b28cacde8e975dcde5d304de9be72c4ac508b"
---

# Enabling and Disabling Comments

Comments are enabled by default for all preview deployments on all new projects. **By default, only members of [your Vercel team](/docs/accounts#creating-a-team) can contribute comments**.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage Vercel Toolbar comments from the CLI](https://vercel.com/changelog/manage-vercel-toolbar-comments-from-the-cli)
- [@vercel/toolbar available to use collaboration features in production](https://vercel.com/changelog/vercel-toolbar-now-available-to-use-collaboration-features-in-production)
- [Using Vercel comments to improve the Next.js 13 documentation](https://vercel.com/blog/using-vercel-comments-to-improve-the-next-js-13-documentation)
- [Introducing Commenting on Preview Deployments](https://vercel.com/blog/introducing-commenting-on-preview-deployments)
- [Using Comments with Preview Deployments](https://vercel.com/docs/comments/using-comments) — This guide will help you get started with using Comments with your Vercel Preview Deployments.
- [Managing Comments on Preview Deployments](https://vercel.com/docs/comments/managing-comments) — Learn how to manage Comments on your Preview Deployments from Team members and invited collaborators.
- [Vercel Toolbar](https://vercel.com/docs/vercel-toolbar) — Learn how to use the Vercel Toolbar to leave feedback, navigate through important dashboard pages, share deployments, us
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Create React App on Vercel](https://vercel.com/docs/frameworks/frontend/create-react-app) — Deploy Create React App projects to Vercel and add Preview Deployments, Web Analytics, Speed Insights, and Observability

Full cross-link map for this page: [/docs/comments/how-comments-work.graph.md](/docs/comments/how-comments-work.graph.md)
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

![The dashboard setting to enable or disable the toolbar at the team level.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/team-level-toolbar-management-light.png)

### At the project level

1. From your [dashboard](/dashboard), select the project you want to enable or disable Vercel Toolbar for.
2. Navigate to [**General**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgeneral\&title=Go+to+General+settings) in **Settings**.
3. Find **Vercel Toolbar**.
4. Under each environment (**Preview** and **Production**), select either an option from the dropdown to determine the visibility of Vercel Toolbar for that environment. The options are:
   - **Default**: Respect team-level visibility settings.
   - **On**: Enable the toolbar for the environment.
   - **Off**: Disable the toolbar for the environment.

![The dashboard setting to enable or disable the toolbar in a project.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/project-level-toolbar-management-light.png)

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


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
