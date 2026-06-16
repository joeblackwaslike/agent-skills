---
title: Enabling and Disabling Comments
product: vercel
url: /docs/comments/how-comments-work
canonical_url: "https://vercel.com/docs/comments/how-comments-work"
last_updated: 2025-09-24
type: how-to
prerequisites:
  - /docs/comments
related:
  - /docs/accounts/create-a-team
  - /docs/vercel-toolbar/managing-toolbar
  - /docs/vercel-toolbar/in-production-and-localhost
  - /docs/deployments/sharing-deployments
summary: Learn when and where Comments are available, and how to enable and disable Comments at the account, project, and session or interface levels.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/comments/how-comments-work.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "389d2c8c42fafbf3a6a6c5b24fb2708c556393e1a6fd7dc70a556d6888b2c700"
---

# Enabling and Disabling Comments

Comments are enabled by default for all preview deployments on all new projects. **By default, only members of [your Vercel team](/docs/accounts/create-a-team) can contribute comments**.

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
