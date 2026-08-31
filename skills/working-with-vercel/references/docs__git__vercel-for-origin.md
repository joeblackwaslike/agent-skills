---
title: Deploying Origin Repositories with Vercel
product: vercel
url: /docs/git/vercel-for-origin
canonical_url: "https://vercel.com/docs/git/vercel-for-origin"
last_updated: 2026-08-14
type: conceptual
prerequisites:
  - /docs/git
related:
  - /docs/deployments/environments
  - /docs/rbac/access-roles
  - /docs/builds/configure-a-build
  - /docs/git
summary: Connect Origin to Vercel to create automatic Preview and Production Deployments from your repositories.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/git/vercel-for-origin.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "05e85d6f2b07805aac24083c35778303e724e1010473ce4cae3dd2cc7fc7b96e"
---

# Deploying Origin Repositories with Vercel

> **🔒 Permissions Required**: Deploying Origin Repositories with Vercel

[Origin](https://cursor.com/origin) is Cursor's Git platform. Vercel for Origin automatically deploys your Origin repositories, providing [preview deployment URLs](/docs/deployments/environments#preview-environment-pre-production) for pull requests and automatic [production deployments](/docs/deployments/environments#production-environment) from your production branch.

> **💡 Note:** Origin is available from Cursor as a research preview. All Origin repositories
> are private and cannot be deployed from a Vercel Hobby team.

## Connect Origin to Vercel

You need the [Owner](/docs/rbac/access-roles#owner-role) or [Member](/docs/rbac/access-roles#member-role) role on a Vercel team to connect an Origin team.

To connect Origin and import a repository:

1. From the Vercel dashboard, select [**New Project**](/new).
2. Select **Continue with Origin**.
3. Choose the Origin team to connect. Its repositories become available to the Vercel team currently selected in the dashboard.
4. Select an Origin repository from the list.
5. Review the project settings. If Vercel does not detect the framework, select a [**Framework Preset**](/docs/builds/configure-a-build#framework-preset).
6. Select **Deploy**.

Members of the selected Vercel team can import repositories from the connected Origin team. You can connect multiple Origin teams to the same Vercel team.

## Automatic deployments

Vercel creates a deployment for each push by default:

- Pushes to a branch other than your [production branch](/docs/git#production-branch) create preview deployments.
- Pull requests create preview deployments, and Vercel updates the pull request with the deployment status and preview URL.
- Pushes and merges to your production branch create production deployments and update your production domains.

You can also [create a deployment from a Git reference](/docs/git#creating-a-deployment-from-a-git-reference) in the Vercel dashboard.

## Manage the Origin connection

To view or reconnect your Origin teams, open your Vercel team's [**Git settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fgit\&title=Go+to+team+Git+settings) and find **Origin**. To change repository access or uninstall the Vercel app, select **Manage on Cursor**.

To disconnect an Origin repository from a Vercel project, open the project's [**Git settings**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgit\&title=Go+to+Git+settings) and select **Disconnect** under **Connected Git Repository**.


---

[View full sitemap](/docs/sitemap)
