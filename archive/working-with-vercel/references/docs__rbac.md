---
title: Role-based access control (RBAC)
product: vercel
url: /docs/rbac
canonical_url: "https://vercel.com/docs/rbac"
last_updated: 2026-06-16
type: reference
prerequisites:
  []
related:
  - /docs/rbac/managing-team-members
  - /docs/rbac/access-roles
  - /docs/rbac/access-groups
summary: Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control (RBAC).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/rbac.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "4ee8b8ab78d4b6747decf5cc5c69e66d66a6f219e11811a62ebcbd521e973f2c"
---

# Role-based access control (RBAC)

> Team roles are available on Enterprise and Pro plans

Teams consist of members, and each member of a team can get assigned a role. These roles define what you can and cannot do within a team on Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build and maintain HIPAA-compliant applications on Vercel](https://vercel.com/kb/guide/hipaa-compliance-guide-vercel) — Deploy HIPAA-compliant healthcare apps on Vercel with built-in security, BAAs, and scalable serverless infrastructure.
- [How Vercel Agent accesses production safely](https://vercel.com/blog/how-vercel-agent-accesses-production-safely)
- [Vercel for Enterprise](https://vercel.com/blog/vercel-for-enterprise)
- [Expanded Role-Based Access Control (RBAC) for Enterprise teams](https://vercel.com/changelog/expanded-role-based-access-control-rbac-for-enterprise-teams)
- [Role-based Access Control now generally available on Enterprise Plans](https://vercel.com/changelog/role-based-access-control-now-generally-available-on-enterprise-plans)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [List access groups for a team, project or member](https://vercel.com/docs/rest-api/access-groups/list-access-groups-for-a-team-project-or-member) — GET /v1/access-groups — List access groups
- [Update Team Directory Sync Role Mappings](https://vercel.com/docs/rest-api/teams/update-team-directory-sync-role-mappings) — POST /v1/teams/{teamId}/dsync-roles — Update the Directory Sync role mappings for a Team. This endpoint allows updating
- [Reads an access group project](https://vercel.com/docs/rest-api/access-groups/reads-an-access-group-project) — GET /v1/access-groups/{accessGroupIdOrName}/projects/{projectId} — Allows reading an access group project
- [Scopes and Permissions](https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions) — Learn how to manage scopes and permissions for Sign in with Vercel

Full cross-link map for this page: [/docs/rbac.graph.md](/docs/rbac.graph.md)
<!-- /docsgraph:related -->

As your project scales and you add more team members, you can assign them roles to ensure that they have the right permissions to work on your projects.

Vercel offers a range of roles for your team members. When deciding what role a member should have on your team, consider the following:

- What projects does this team member need to access?
- What actions does this team member need to perform on these projects?
- What actions does this team member need to perform on the team itself?

See the [Managing team members](/docs/rbac/managing-team-members) section for information on setting up and managing team members.

For specific information on the different access roles available on each plan, see the [Access Roles](/docs/rbac/access-roles) section.

## More resources

- [Managing team members](/docs/rbac/managing-team-members)
- [Access groups](/docs/rbac/access-groups)
- [Access roles](/docs/rbac/access-roles)

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
