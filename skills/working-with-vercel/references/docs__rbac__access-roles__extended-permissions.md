---
title: Extended permissions
product: vercel
url: /docs/rbac/access-roles/extended-permissions
canonical_url: "https://vercel.com/docs/rbac/access-roles/extended-permissions"
last_updated: 2026-09-01
type: reference
prerequisites:
  - /docs/rbac/access-roles
  - /docs/rbac
related:
  - /docs/rbac/access-roles
summary: "Learn about extended permissions in Vercel's RBAC system. Understand how to combine roles and permissions for precise access control."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/rbac/access-roles/extended-permissions.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "69b452ff8dccba43df2cfcd8cb3e83c4c44801ca226739620090b75b87dc46de"
---

# Extended permissions

Vercel's Role-Based Access Control (RBAC) system consists of three main components:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Expanded Role-Based Access Control (RBAC) for Enterprise teams](https://vercel.com/changelog/expanded-role-based-access-control-rbac-for-enterprise-teams?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related)
- [Project Level Roles](https://vercel.com/docs/rbac/access-roles/project-level-roles?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related) — Learn about the project level roles and their permissions.
- [New project access controls for Enterprise customers](https://vercel.com/changelog/new-project-access-controls-for-enterprise-customers?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related)
- [Team Level Roles](https://vercel.com/docs/rbac/access-roles/team-level-roles?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related) — Learn about the different team level roles and the permissions they provide.
- [Role-based Access Control now generally available on Enterprise Plans](https://vercel.com/changelog/role-based-access-control-now-generally-available-on-enterprise-plans?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related)
- [Access Groups](https://vercel.com/docs/rbac/access-groups?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related) — Learn how to configure access groups for team members on a Vercel account.
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related) — Learn how to manage project access and added products for your integrations.
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC

Full cross-link map for this page: [/docs/rbac/access-roles/extended-permissions.graph.md](/docs/rbac/access-roles/extended-permissions.graph.md?from=related&source_path=%2Fdocs%2Frbac%2Faccess-roles%2Fextended-permissions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

- **Team roles**: Core roles that define a user's overall access level within a team
- **Project roles**: Roles that apply to specific projects rather than the entire team
- **Extended permissions**: Granular permissions that can be combined with roles for fine-tuned access control

These components can be combined to create precise access patterns tailored to your organization's needs.

## Project roles for specific access

Project roles apply only to specific projects and include:

| Project Role                                                       | Compatible Team Roles                                                                                        | Permissions Enabled Through Role                                                   |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| **[Admin](/docs/rbac/access-roles#project-administrators)**        | [Contributor](/docs/rbac/access-roles#contributor-role), [Developer](/docs/rbac/access-roles#developer-role) | Full control over a specific project including production deployments and settings |
| **[Project Developer](/docs/rbac/access-roles#project-developer)** | [Contributor](/docs/rbac/access-roles#contributor-role)                                                      | Can deploy to assigned project and manage dev/preview environment variables        |
| **[Project Viewer](/docs/rbac/access-roles#project-viewer)**       | [Contributor](/docs/rbac/access-roles#contributor-role)                                                      | Read-only access to assigned project                                               |

## Extended permissions for granular access

Extended permissions add granular capabilities that can be combined with roles:

| Extended permission                                                                        | Description                                                                 | Compatible Roles                                                                                                                                                                                                                                                | Already Included in                                                                          |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Create Project                             | Allows the user to create a new project.                                    | [Developer](/docs/rbac/access-roles#developer-role)                                                                                                                                                                                                             | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Full Production Deployment     | Deploy to production from CLI, rollback and promote any deployment.         | [Developer](/docs/rbac/access-roles#developer-role), [Contributor](/docs/rbac/access-roles#contributor-role)                                                                                                                                                    | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Usage Viewer                                 | Read-only usage team-wide including prices and invoices.                    | [Developer](/docs/rbac/access-roles#developer-role), [Security](/docs/rbac/access-roles#security-role), [Member](/docs/rbac/access-roles#member-role), [Viewer](/docs/rbac/access-roles#viewer-role)                                                            | [Owner](/docs/rbac/access-roles#owner-role), [Billing](/docs/rbac/access-roles#billing-role) |
| Integration Manager                   | Install and use Vercel integrations, marketplace integrations, and storage. | [Developer](/docs/rbac/access-roles#developer-role), [Security](/docs/rbac/access-roles#security-role), [Billing](/docs/rbac/access-roles#billing-role), [Viewer](/docs/rbac/access-roles#viewer-role), [Contributor](/docs/rbac/access-roles#contributor-role) | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Connector Manager                       | Create and manage team-wide connectors, project connections, installations, and tokens. | [Developer](/docs/rbac/access-roles#developer-role), [Security](/docs/rbac/access-roles#security-role), [Billing](/docs/rbac/access-roles#billing-role), [Viewer](/docs/rbac/access-roles#viewer-role), [Contributor](/docs/rbac/access-roles#contributor-role) | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Environment Manager                   | Create and manage project environments.                                     | [Developer](/docs/rbac/access-roles#developer-role), [Member](/docs/rbac/access-roles#member-role)                                                                                                                                                              | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Environment Variable Manager | Create and manage environment variables.                                    | [Developer](/docs/rbac/access-roles#developer-role)                                                                                                                                                                                                             | [Owner](/docs/rbac/access-roles#owner-role), [Member](/docs/rbac/access-roles#member-role)   |
| Workflow Run Data Viewer         | Read decrypted Workflow run data.                                            | [Member](/docs/rbac/access-roles#member-role), [Developer](/docs/rbac/access-roles#developer-role), [Security](/docs/rbac/access-roles#security-role), [Billing](/docs/rbac/access-roles#billing-role), [Viewer](/docs/rbac/access-roles#viewer-role), [Contributor](/docs/rbac/access-roles#contributor-role) | [Owner](/docs/rbac/access-roles#owner-role) |

Extended permissions work when the user has at least one compatible team role.

### How roles fit together

Team roles provide the foundation of access control. Each role has a specific scope of responsibilities:

| Team Role                                                   | Role Capabilities                                                      | Compatible Extended Permissions                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **[Owner](/docs/rbac/access-roles#owner-role)**             | Complete control over all team and project settings                    | All extended permissions (already includes all permissions by default)                                                                                                                                                                                                                                                    |
| **[Member](/docs/rbac/access-roles#member-role)**           | Can manage projects but not team settings                              | - [Environment Manager](#environment-manager) <br /> - [Usage Viewer](#usage-viewer) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer)                                                                                                                                                                                                                                       |
| **[Developer](/docs/rbac/access-roles#developer-role)**     | Can deploy and manage projects with limitations on production settings | - [Create Project](#create-project) <br /> - [Full Production Deployment](#full-production-deployment) <br /> - [Usage Viewer](#usage-viewer) <br /> - [Integration Manager](#integration-manager) <br /> - [Connector Manager](#connector-manager) <br /> - [Environment Manager](#environment-manager) <br /> - [Environment Variable Manager](#environment-variable-manager) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer) |
| **[Billing](/docs/rbac/access-roles#billing-role)**         | Manages financial aspects only                                         | - [Integration Manager](#integration-manager) <br /> - [Connector Manager](#connector-manager) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer)                                                                                                                                                                                                                             |
| **[Security](/docs/rbac/access-roles#security-role)**       | Manages security features team-wide                                    | - [Usage Viewer](#usage-viewer) <br /> - [Integration Manager](#integration-manager) <br /> - [Connector Manager](#connector-manager) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer)                                                                                                                                                                                        |
| **[Viewer](/docs/rbac/access-roles#viewer-role)**           | Read-only access to all projects                                       | - [Usage Viewer](#usage-viewer) <br /> - [Integration Manager](#integration-manager) <br /> - [Connector Manager](#connector-manager) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer)                                                                                                                                                                                        |
| **[Contributor](/docs/rbac/access-roles#contributor-role)** | Configurable role that can be assigned project-level roles             | - [Full Production Deployment](#full-production-deployment) <br /> - [Integration Manager](#integration-manager) <br /> - [Connector Manager](#connector-manager) <br /> - [Workflow Run Data Viewer](#workflow-run-data-viewer) <br /> See project-level table for compatible project roles and permissions                                                                                  |

## How combinations work

The multi-role system allows users to have multiple roles simultaneously. When roles are combined:

- Users inherit the most permissive combination of all their assigned roles and permissions
- A user gets all the capabilities of each assigned role
- Extended permissions can supplement roles with additional capabilities
- Project roles can be assigned alongside team roles for project-specific access

The following table outlines various use cases and the role combinations that enable them. Each combination is designed to provide specific capabilities while maintaining security and access control.

| Use Case                | Role Combinations                                                                                                                                                               | Key Permissions                                                                                                                                                               | Outcome                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| **DevOps engineer**     | [Developer](/docs/rbac/access-roles#developer-role) + [Environment Variable Manager](#environment-variable-manager) + [Full Production Deployment](#full-production-deployment) | - Deploy to both preview and production environments <br /> - Manage preview and production environment variables <br /> - Full deployment capabilities incl. CLI and rollbacks | Manages deployments and config without billing or team access                                   |
| **Technical team lead** | [Member](/docs/rbac/access-roles#member-role) + [Security](/docs/rbac/access-roles#security-role)                                                                               | - Create/manage projects and team members <br /> - Configure deployment protection, rate limits <br /> - Manage log drains and monitoring                                       | Leads projects and enforces security without [Owner](/docs/rbac/access-roles#owner-role) access |
| **External contractor** | [Contributor](/docs/rbac/access-roles#contributor-role) + [Project Developer](/docs/rbac/access-roles#project-developer) (for specific projects only)                           | - Can deploy to assigned projects only <br /> - No access to team settings or other projects                                                                                   | Limited project access for external collaborators                                               |
| **Finance manager**     | [Billing](/docs/rbac/access-roles#billing-role) + [Usage Viewer](#usage-viewer)                                                                                                 | - Manage billing and payment methods <br /> - View usage metrics across projects <br /> - Read-only project access                                                              | Monitors costs and handles billing with no dev access                                           |
| **Product owner**       | [Viewer](/docs/rbac/access-roles#viewer-role) + [Create Project](#create-project) + [Environment Manager](#environment-manager)                                                 | - Read-only access to all projects <br /> - Create new projects <br /> - Manage environments, but not deployments or settings                                                   | Oversees product workflows, supports setup but not execution                                    |

## Role compatibility and constraints

Not all roles and permissions can be meaningfully combined. For example:

- The **[Owner](/docs/rbac/access-roles#owner-role)** role already includes all permissions, so adding additional roles doesn't grant more access
- Some extended permissions are only compatible with specific roles (e.g. [Full Production Deployment](#full-production-deployment) works with [Developer](/docs/rbac/access-roles#developer-role), [Member](/docs/rbac/access-roles#member-role), and [Owner](/docs/rbac/access-roles#owner-role) roles)
- Project roles are primarily assigned to [Contributors](/docs/rbac/access-roles#contributor-role) or via Access Groups


---

[View full sitemap](/docs/sitemap)
