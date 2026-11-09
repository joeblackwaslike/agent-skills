---
title: Restricting Git Connections to a single Vercel team
product: vercel
url: /docs/protected-git-scopes
canonical_url: "https://vercel.com/docs/protected-git-scopes"
last_updated: 2026-09-16
type: conceptual
prerequisites:
  []
related:
  - /docs/rbac/access-roles
summary: Information to stop developers from deploying their repositories to a personal Vercel account by using Protected Git Scopes.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/protected-git-scopes.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "227806036853167e4f75ce45f4fd16566f96d46f5f2f09aae9a55869c8bb8235"
---

# Restricting Git Connections to a single Vercel team

> Protected Git Scopes are available on Enterprise plans
>
> Those with the owner role can access this feature

Teams often need control over who can deploy their repositories to which teams or accounts. For example, a user on your team may accidentally try to deploy your project on their personal Vercel Account. To control this, you can add a Protected Git Scope.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Restrict repository deployments to specific teams](https://vercel.com/changelog/restrict-repository-deployments-to-specific-teams)
- [Multiple Git namespaces per Personal Account and Team](https://vercel.com/changelog/multiple-git-namespaces-per-personal-account-and-team)
- [Git Fork Protection can now be disabled](https://vercel.com/changelog/git-fork-protection-can-now-be-disabled)
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions) — Learn how to manage scopes and permissions for Sign in with Vercel
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [Role-based access control \\(RBAC\\)](https://vercel.com/docs/rbac) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC

Full cross-link map for this page: [/docs/protected-git-scopes.graph.md](/docs/protected-git-scopes.graph.md)
<!-- /docsgraph:related -->

Protected Git Scopes restrict Vercel account and team access to Organization-level Git repositories. This ensures that only authorized Vercel teams can deploy your repositories.

## Managing Protected Git Scopes

You can [add](#adding-a-protected-git-scope) up to five Protected Git Scopes to your Vercel Team. Protected Git Scopes are configured at the team level, not per project. Multiple teams can specify the same scope, allowing both teams access.

To add a Protected Git Scope to your Vercel Team, you must be an [Owner](/docs/rbac/access-roles#owner-role) of the Vercel Team, and have the required permission in the Git namespace.

For Github you must be an `admin`, for Gitlab you must be an `owner`, and for Bitbucket you must be a `owner`.

## Adding a Protected Git Scope

To add a Protected Git Scopes:

1. Go to your Team's dashboard and open **Settings** in the sidebar
2. In the **Security & Privacy** section, go to **Protected Git Scopes**

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/protected-git-scopes-light.png)

3. Select **Add Scope** to add a new Protected Git Scope
4. In the modal, select the Git provider you wish to add:

   ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/protected-git-scopes-modal-1-light.png)
5. In the modal, select the Git namespace you wish to add:

   ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/protected-git-scopes-modal-2-light.png)
6. Click **Save**

## Removing a Protected Git Scope

To remove a Protected Git Scopes:

1. Go to your Team's dashboard and open **Settings** in the sidebar.
2. In the **Security & Privacy** section, go to **Protected Git Scopes**

![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/security/protected-git-scopes-light.png)

3. Select **Remove** to remove the Protected Git Scope


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
