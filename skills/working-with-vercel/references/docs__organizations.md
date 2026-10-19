---
title: Organizations
product: vercel
url: /docs/organizations
canonical_url: "https://vercel.com/docs/organizations"
last_updated: 2026-09-01
type: conceptual
prerequisites:
  []
related:
  - /docs/accounts
  - /docs/projects/managing-projects
  - /docs/rbac/managing-team-members
  - /docs/saml
  - /docs/security/enterprise-managed-users
summary: Learn how organizations let you group multiple Vercel teams under a single entity with consolidated billing and central management.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/organizations.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "84964aa5d8ec4d90cb3032c036edfe7e47da227d0406748a9c121e8302673b50"
---

# Organizations

An organization groups multiple Vercel [teams](/docs/accounts) under a single entity. It's built for enterprises that run more than one team and want consolidated billing and central management without configuring each team by hand.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Organizations](https://v0.app/docs/api/v2/guides/organizations) — Learn how to use the v0 API with Vercel Organizations to offer v0-style chat experiences to your customers.
- [Teams](https://v0.app/docs/teams) — Collaborate with your team on projects with shared resources.
- [Create or Add Team to Organization](https://vercel.com/docs/rest-api/organizations/create-or-add-team-to-organization) — POST /v1/organizations/{organizationId}/teams — Create a new team under an organization, or add an existing team. \\`mode
- [List Organization Teams](https://vercel.com/docs/rest-api/organizations/list-organization-teams) — GET /v1/organizations/{organizationId}/teams — List up to 100 teams in an organization, each enriched with the team's sl
- [Billing FAQ for Pro Plan](https://vercel.com/docs/plans/pro-plan/billing) — This page covers frequently asked questions around payments, invoices, and billing on the Pro plan.
- [List Organizations](https://vercel.com/docs/rest-api/organizations/list-organizations) — GET /v1/organizations — List the organizations where the authenticated user holds the OrgAdmin or OrgViewer permission o
- [Vercel Pro Plan](https://vercel.com/docs/plans/pro-plan) — Learn about the Vercel Pro plan with credit-based billing, one free first-year domain, free viewer seats, and self-serve

Full cross-link map for this page: [/docs/organizations.graph.md](/docs/organizations.graph.md)
<!-- /docsgraph:related -->

> **Availability**: Organizations (Private Beta) are available to Enterprise plans with Flexible Commitment (Flex) billing. Contact your account team to request access.

## When to use organizations

Use an organization when you run more than one Vercel team and want to bill and manage them together. Organizations support two setups:

- **Multi-tenant platforms**: You build a platform, such as a vibe coding product, and create a child team for each tenant. Each child team keeps its tenant's projects, members, and usage isolated. Vercel aggregates each team's usage to the organization at the end of the team's billing cycle, for example monthly. These teams use the `platform` billing plan.
- **Internal company structure**: You mirror your company's structure with a team for each department, such as engineering, design, and marketing. These teams draw down the organization's Flex commit in real time and use the `enterprise` billing plan. An organization supports up to 200 `enterprise` child teams.

## How organizations relate to teams

An organization groups your existing [teams](/docs/accounts). Each team in it is a member team, including the team that stores billing:

- **Member teams**: Each team keeps its own [projects](/docs/projects/managing-projects), [members](/docs/rbac/managing-team-members), and settings.
- **Root team**: The Enterprise team you create the organization from. It stores the organization's billing configuration, and you can't remove it from the organization.
- **Billing roll-up**: Member teams don't pay their own bills. Vercel consolidates every team's usage onto the root team's Enterprise invoice.

A team can belong to only one organization, and teams can't move between organizations.

## Managing organizations in the dashboard

You can manage an organization from the Vercel dashboard as well as the API. To open the organization dashboard, select your organization in the team switcher. The organization dashboard has these pages:

- **Usage**: Compare usage and spend across the organization's teams, set a budget for each team, and download usage as a CSV file.
- **Teams**: List the organization's teams. To create a team, click **Create Team** and choose `enterprise` or `platform` as its [billing plan](#choosing-a-billing-plan-for-a-child-team).
- **Admins**: Grant or remove Organization Admin access for members of the root team.
- **Billing**: Review the organization's billing information and organization-wide budget.
- **Invoices**: Review the organization's current and upcoming invoices.
- **Settings**: Configure the organization's details, identity and access, Enterprise Managed Users, Deployment Protection defaults, and audit log export.

## Features that work with organizations

An organization lets you configure Single Sign-On, Directory Sync, Enterprise Managed Users, and Deployment Protection one time for all of its teams. To change these settings, open the organization dashboard and navigate to **Settings**.

### Share one SAML Single Sign-On connection across teams

An organization can have one [SAML Single Sign-On](/docs/saml) connection that every team in the organization can use for sign-in. In the **Identity & Access** section, click **Configure** next to **Single Sign-On** to connect your identity provider. To require SAML sign-in for members of every team that uses the connection, turn on **SAML Enforcement**.

### Manage team access with organization Directory Sync

Organization Directory Sync maps groups in your identity provider to roles on your teams, so access on Vercel follows group membership in your directory. Configure it in the Identity & Access section. For each directory group, you can grant Organization access and choose a Default access role, which the group's members get on every team in the organization, including teams created later. To give the group a different role on a specific team, set a team-level role. That role overrides the default for that team only.

Directory Sync starts syncing after at least one directory group has Organization Admin access. You must be an Organization Admin to configure organization Directory Sync.

### Turn on Enterprise Managed Users for organization teams

[Enterprise Managed Users](/docs/security/enterprise-managed-users) (EMU) lets your organization own and manage the Vercel accounts of its members. In the **Enterprise Managed Users** section, add the **Verified Domains** that your organization owns, then click **Review Teams** to choose which teams use EMU.

Organization Directory Sync converts synced members to managed accounts only after the organization meets these requirements:

- An Enterprise plan
- SAML Single Sign-On that is configured and enforced
- An active Directory Sync connection

### Set Deployment Protection defaults for new projects

Organization [Deployment Protection](/docs/deployment-protection) defaults control access to deployments for new projects across the organization's teams. In the **Deployment Protection Defaults** section, you can configure these settings:

- **Vercel Authentication**: Require visitors to log in to Vercel and belong to a team in your organization before they can view deployments. Choose **Standard Protection** to protect all deployments except production custom domains, or **All Deployments** to protect all domains.
- **Who Can Change Protection**: Require the Owner role to change or disable Vercel Authentication in projects.

## Managing organizations with the API

You can also manage organizations through the [Vercel REST API](/docs/rest-api). Authenticate each request with a Vercel [access token](/docs/rest-api#authentication) that has access to the teams involved.

The API supports these operations:

| Action                        | Endpoint                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| Create an organization        | `POST /v1/organizations`                                     |
| List your organizations       | `GET /v1/organizations`                                      |
| Get an organization           | `GET /v1/organizations/{organizationId}`                     |
| Update an organization        | `PATCH /v1/organizations/{organizationId}`                   |
| Delete an organization        | `DELETE /v1/organizations/{organizationId}`                  |
| Create or add a team          | `POST /v1/organizations/{organizationId}/teams`              |
| List an organization's teams  | `GET /v1/organizations/{organizationId}/teams`               |
| Remove a team                 | `DELETE /v1/organizations/{organizationId}/teams/{teamId}`   |

### Creating an organization

Create an organization from an existing Enterprise team with Flexible Commitment (Flex) billing by passing that team's ID in the `teamId` query parameter. The team becomes the organization's root team, and you become the organization's owner. If you omit `name`, Vercel generates one from the slug.

```bash
curl -X POST "https://api.vercel.com/v1/organizations?teamId=team_aBcD1234EfGh5678" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "slug": "acme", "name": "Acme" }'
```

The response is the new organization, including the `organizationId` you use in later requests:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "slug": "acme",
  "name": "Acme",
  "avatar": null,
  "ownerId": "user_aBcD1234EfGh5678",
  "teamId": "team_aBcD1234EfGh5678",
  "teamCount": 1,
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

### Choosing a billing plan for a child team

Each child team has a `billingPlan` that sets its features and billing model. Choose the plan before you create or add a team:

- `platform`: For multi-tenant platforms that run a Pro team for each tenant, at any number of tenants. Vercel emits each team's usage to the organization at the end of the team's billing cycle under a consolidated `Platform Customer Usage` SKU.
- `enterprise`: For internal teams that need Enterprise permissions, except the add-ons in [Current limitations](#current-limitations). Each team draws down the organization's Flex commit in real time. An organization can have up to 200 `enterprise` child teams.

If you omit `billingPlan`, the team joins as `platform`.

### Creating a team in an organization

Create a new team directly under the organization by calling the organization's `teams` endpoint with `mode` set to `create`. Pass a `slug` and a `name` for the new team. The new team joins the organization as a `platform` child team, so its usage and billing roll up to the organization's root team. To create an `enterprise` child team, set `billingPlan` to `enterprise`. You become an owner of the new team.

```bash
curl -X POST "https://api.vercel.com/v1/organizations/org_aBcD1234EfGh5678IjKl9012/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "mode": "create", "slug": "acme-customer-1", "name": "Acme Customer 1" }'
```

The response is the organization-team link, including the new team's `teamId`:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "teamId": "team_MnOp3456QrSt7890",
  "billingPlan": "platform",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

### Adding an existing team to an organization

To bring an existing team under the organization, call the organization's `teams` endpoint with `mode` set to `link` and identify the team with its `teamId` or `slug`. You must be an owner of the team you're adding, and you can't add the organization's root team as a child. Set `billingPlan` as described in [Choosing a billing plan for a child team](#choosing-a-billing-plan-for-a-child-team). To add a team that is already on the Enterprise plan, contact your account team.

```bash
curl -X POST "https://api.vercel.com/v1/organizations/org_aBcD1234EfGh5678IjKl9012/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "mode": "link", "teamId": "team_UvWx9012YzAb3456", "billingPlan": "platform" }'
```

The response is the organization-team link:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "teamId": "team_UvWx9012YzAb3456",
  "billingPlan": "platform",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

### Listing organizations and teams

List the organizations that you manage:

```bash
curl "https://api.vercel.com/v1/organizations" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

To fetch a single organization by ID, call `GET /v1/organizations/$ORGANIZATION_ID`.

List an organization's teams, including the root team, with the teams endpoint. Set `includeMemberCount` to `true` to get the number of members in each team:

```bash
curl "https://api.vercel.com/v1/organizations/$ORGANIZATION_ID/teams?includeMemberCount=true" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

```json
{
  "teams": [
    {
      "organizationId": "org_aBcD1234EfGh5678IjKl9012",
      "teamId": "team_MnOp3456QrSt7890",
      "createdAt": "2026-06-01T12:00:00.000Z",
      "updatedAt": "2026-06-01T12:00:00.000Z",
      "billingPlan": "platform",
      "slug": "acme-customer-1",
      "name": "Acme Customer 1",
      "avatar": null,
      "memberCount": 12
    }
  ]
}
```

For organizations with many teams, the response includes a `cursor`. Pass the `cursor` value as a query parameter to fetch the next page, and keep paginating until the response has no `cursor`.

### Removing a team from an organization

Removing a team from an organization deletes the team itself, not only its link to the organization. The team must pass the same billing checks as any team deletion. You can't remove the root team. This endpoint removes `platform` child teams.

```bash
curl -X DELETE "https://api.vercel.com/v1/organizations/$ORGANIZATION_ID/teams/$TEAM_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

The response confirms the removed team:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "teamId": "team_MnOp3456QrSt7890"
}
```

### Updating an organization

Update an organization's slug or avatar. Slugs must be lowercase, start and end with an alphanumeric character, and can contain dashes:

```bash
curl -X PATCH "https://api.vercel.com/v1/organizations/$ORGANIZATION_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "slug": "acme-inc" }'
```

To set the avatar, upload the image with [`POST /v2/files`](/docs/rest-api/reference/endpoints/deployments/upload-deployment-files), then send the 40-character SHA-1 hash of the file as `avatar`. Send `null` to remove the avatar.

The response is the updated organization.

### Deleting an organization

Delete an organization after removing all of its child teams. The request fails with an `organization_has_teams` error while child teams remain. The root team must also have no unresolved billing issues. Deleting the organization doesn't delete the root team, which continues as a standalone team.

```bash
curl -X DELETE "https://api.vercel.com/v1/organizations/$ORGANIZATION_ID" \
  -H "Authorization: Bearer $VERCEL_TOKEN"
```

The response confirms the deleted organization:

```json
{ "id": "org_aBcD1234EfGh5678IjKl9012" }
```

## Billing

An organization's charges roll up to the root team's Enterprise account.

Vercel bills seats on the root team's subscription as the unique paid members across the organization's Enterprise teams (the root team plus every `enterprise` child team). A member who belongs to several of those teams counts once.

To understand how Enterprise billing and invoicing work, see:

- [Enterprise plan](/docs/plans/enterprise)
- [Enterprise billing](/docs/plans/enterprise/billing)

## Current limitations

Organizations are in private beta, and some capabilities aren't available yet:

- **Marketplace integrations**: Child teams can't use [Marketplace integrations](/docs/integrations) yet.
- **Delayed billing for `platform` teams**: Vercel aggregates usage from `platform` child teams at the end of each team's billing cycle. Usage from `enterprise` child teams draws down the organization's Flex commit in real time.
- **Enterprise add-ons**: Child teams, including `enterprise` child teams, can't use these Enterprise add-ons:
  - Observability Plus
  - Static IPs
  - Secure Compute
  - SIEM Log Streaming
  - Microfrontends Projects
  - Bulk Redirects
  - Rolling Releases
  - Flags Explorer
  - Web Analytics Plus
  - Speed Insights Plus
  - HIPAA BAA

## Related resources

- [Enterprise plan](/docs/plans/enterprise)
- [Enterprise billing](/docs/plans/enterprise/billing)
- [Account management](/docs/accounts)
- [Roles and access control](/docs/rbac)
- [Release phases](/docs/release-phases)


---

[View full sitemap](/docs/sitemap)
