---
title: Restricting Git Connections to a single Vercel team
product: vercel
url: /docs/protected-git-scopes
canonical_url: "https://vercel.com/docs/protected-git-scopes"
last_updated: 2026-06-16
type: conceptual
prerequisites:
  []
related:
  - /docs/rbac/access-roles
summary: Information to stop developers from deploying their repositories to a personal Vercel account by using Protected Git Scopes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/protected-git-scopes.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "2c9b04b9c7fc986bddb21913aed02e469cb178a589a789c739633ab8f2ae341b"
---

# Restricting Git Connections to a single Vercel team

> **🔒 Permissions Required**: Protected Git Scopes


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can I connect a Pro team to a personal Git account?](https://vercel.com/kb/guide/connecting-teams-with-personal-git-accounts?from=related) — Information on connecting personal Git accounts to a Vercel team.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Scopes & Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions?from=related) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication?from=related) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [RBAC](https://vercel.com/docs/rbac?from=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \(RBAC
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members?from=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \(RBAC

Full cross-link map for this page: [/docs/protected-git-scopes.graph.md](/docs/protected-git-scopes.graph.md)
<!-- /docsgraph:related -->

Teams often need control over who can deploy their repositories to which teams or accounts. For example, a user on your team may accidentally try to deploy your project on their personal Vercel Account. To control this, you can add a Protected Git Scope.

Protected Git Scopes restrict Vercel account and team access to Organization-level Git repositories. This ensures that only authorized Vercel teams can deploy your repositories.

## Managing Protected Git Scopes

You can [add](#adding-a-protected-git-scope) up to five Protected Git Scopes to your Vercel Team. Protected Git Scopes are configured at the team level, not per project. Multiple teams can specify the same scope, allowing both teams access.

In order to add a Protected Git Scope to your Vercel Team, you must be an [Owner](/docs/rbac/access-roles#owner-role) of the Vercel Team, and have the required permission in the Git namespace.

For Github you must be an `admin`, for Gitlab you must be an `owner`, and for Bitbucket you must be a `owner`.

## Adding a Protected Git Scope

To add a Protected Git Scopes:

1. Go to your Team's dashboard and open **Settings** in the sidebar
2. In the **Security & Privacy** section, go to **Protected Git Scopes**

![Image](https://vercel.com/docs-assets/static/docs/security/protected-git-scopes-light.png)

3. Select **Add** to add a new Protected Git Scope
4. In the modal, select the Git provider you wish to add:

   ![Image](https://vercel.com/docs-assets/static/docs/security/protected-git-scopes-modal-1-light.png)
5. In the modal, select the Git namespace you wish to add:

   ![Image](https://vercel.com/docs-assets/static/docs/security/protected-git-scopes-modal-2-light.png)
6. Click **Save**

## Removing a Protected Git Scope

To remove a Protected Git Scopes:

1. Go to your Team's dashboard and open **Settings** in the sidebar.
2. In the **Security & Privacy** section, go to **Protected Git Scopes**

![Image](https://vercel.com/docs-assets/static/docs/security/protected-git-scopes-light.png)

3. Select **Remove** to remove the Protected Git Scope


---

[View full sitemap](/docs/sitemap)
