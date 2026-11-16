---
title: Project Level Roles
product: vercel
url: /docs/rbac/access-roles/project-level-roles
canonical_url: "https://vercel.com/docs/rbac/access-roles/project-level-roles"
last_updated: 2026-07-01
type: reference
prerequisites:
  - /docs/rbac/access-roles
  - /docs/rbac
related:
  - /docs/rbac/access-roles
summary: Learn about the project level roles and their permissions.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/rbac/access-roles/project-level-roles.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "11d4fd1fd0175c65bcc917b3247a466d0e9d696b17ae56f22df0e8eef305f903"
---

# Project Level Roles

> Project level roles are available on Enterprise plans

Project level roles are assigned to a team member on a project level. This means that the role is only valid for the project it is assigned to. The role is not valid for other projects in the team.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Expanded Role-Based Access Control (RBAC) for Enterprise teams](https://vercel.com/changelog/expanded-role-based-access-control-rbac-for-enterprise-teams)
- [Team Level Roles](https://vercel.com/docs/rbac/access-roles/team-level-roles) — Learn about the different team level roles and the permissions they provide.
- [New project access controls for Enterprise customers](https://vercel.com/changelog/new-project-access-controls-for-enterprise-customers)
- [Extended permissions](https://vercel.com/docs/rbac/access-roles/extended-permissions) — Learn about extended permissions in Vercel's RBAC system. Understand how to combine roles and permissions for precise ac
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [Access Groups](https://vercel.com/docs/rbac/access-groups) — Learn how to configure access groups for team members on a Vercel account.
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions) — Learn how to manage scopes and permissions for Sign in with Vercel

Full cross-link map for this page: [/docs/rbac/access-roles/project-level-roles.graph.md](/docs/rbac/access-roles/project-level-roles.graph.md)
<!-- /docsgraph:related -->

## Equivalency roles

In the table below, the relationship between team and project roles is indicated by the column headers. For example, the team role "Developer" is equivalent to the "Project Developer" role.

- The [**Developer**](/docs/rbac/access-roles#developer-role) team role is equivalent to the [**Project Developer**](/docs/rbac/access-roles#project-developer) role
- The [**Viewer Pro**](/docs/rbac/access-roles#pro-viewer-role), [**Viewer Enterprise**](/docs/rbac/access-roles#enterprise-viewer-role), and [**Billing**](/docs/rbac/access-roles#billing-role) team roles are equivalent to the [**Project Viewer**](/docs/rbac/access-roles#project-viewer) role
- The [**Owner**](/docs/rbac/access-roles#owner-role) and [**Member**](/docs/rbac/access-roles#member-role) team roles are equivalent to the [**Project Admin**](/docs/rbac/access-roles#project-administrators) role

All project level roles can be assigned to those with the [**Contributor**](/docs/rbac/access-roles#team-level-roles) team role.

See our [Access roles docs](/docs/rbac/access-roles) for a more comprehensive breakdown of the different roles.

## Project level permissions

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
