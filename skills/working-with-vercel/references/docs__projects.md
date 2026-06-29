---
title: Projects overview
product: vercel
url: /docs/projects
canonical_url: "https://vercel.com/docs/projects"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/git
  - /docs/deployments
  - /docs/domains/add-a-domain
  - /docs/monorepos
  - /docs/project-configuration/project-settings
summary: A project is the application that you have deployed to Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/projects.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "3cdd253ab40d513871d68d20e3598bb8644a8e85e67060d76aa812ee875f7bf2"
---

# Projects overview

Projects on Vercel represent applications that you have deployed to the platform from a [single Git repository](/docs/git). Each project can have multiple deployments: a single production deployment and many pre-production deployments. A project groups [deployments](/docs/deployments "Deployments")
and [custom domains](/docs/domains/add-a-domain "Custom Domains").

While each project is only connected to a single, imported Git repository, you can have multiple projects connected to a single Git repository that includes many directories, which is particularly useful for [monorepo](/docs/monorepos) setups.

You can view all projects in your team's [Vercel dashboard](/dashboard), and selecting a project opens that project's dashboard, where you can:

- View an overview of the [production deployment](/docs/deployments) and any active pre-production deployments.
- Configure [project settings](/docs/project-configuration/project-settings) such as setting [custom domains](/docs/domains), [environment variables](/docs/environment-variables), [deployment protection](/docs/security/deployment-protection), and more.
- View details about each [deployment](/docs/deployments) for that project, such as the status, the commit that triggered the deployment, the deployment URL, and more.
- Manage [observability](/docs/observability) for that project, including [Web Analytics](/docs/analytics), [Speed Insights](/docs/speed-insights), and [Logs](/docs/observability/logs).
- Managing the project's [firewall](/docs/vercel-firewall).

## Project limits

To learn more about limits on the number of projects you can have, see [Limits](/docs/limits#general-limits).


---

[View full sitemap](/docs/sitemap)
