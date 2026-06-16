---
title: Organizations
product: vercel
url: /docs/organizations
canonical_url: "https://vercel.com/docs/organizations"
last_updated: 2026-06-03
type: conceptual
prerequisites:
  []
related:
  - /docs/accounts
  - /docs/projects/managing-projects
  - /docs/rbac/managing-team-members
  - /docs/rest-api
  - /docs/rest-api/teams/create-a-team
summary: Learn how organizations let you group multiple Vercel teams under a single entity with consolidated billing and central management.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/organizations.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "93533bcbba6b7729ce62f51841a733d01dfd6ed16dfaff51d8806e099de18f0e"
---

# Organizations

An organization groups multiple Vercel [teams](/docs/accounts) under a single entity. It's built for enterprises that run more than one team and want consolidated billing and central management without configuring each team by hand.

> **🔒 Permissions Required**: Organizations

## When to use organizations

Use an organization when your company runs more than one Vercel team and you want to bill and manage them together.

With an organization, you can:

- Group every team in your company under one entity.
- Roll up usage from all teams into a single Enterprise invoice.
- Manage related teams from one place instead of one-off, hand-configured setups.

A common setup is a company that runs a separate team for each business unit, such as a product team, an internal tools team, and an AI team. These teams all bill to a single account while keeping their projects, members, and settings isolated.

## How organizations relate to teams

An organization groups your existing [teams](/docs/accounts). Every team in it is a member team, including the team that stores billing:

- **Member teams**: Each team keeps its own [projects](/docs/projects/managing-projects), [members](/docs/rbac/managing-team-members), and settings.
- **Billing team**: One member team stores the organization's billing configuration. You can't remove this team from the organization.
- **Billing roll-up**: Member teams don't pay their own bills. Vercel consolidates every team's usage onto the billing team's Enterprise invoice.

A team can belong to only one organization, and teams can't move between organizations.

## Managing organizations with the API

You manage organizations through the [Vercel REST API](/docs/rest-api). Authenticate each request with a Vercel [access token](/docs/rest-api#authentication) that has access to the teams involved.

### Creating an organization

Create an organization from an existing Enterprise team. That team becomes the organization's billing team, and you become its owner.

```bash
curl -X POST "https://api.vercel.com/v1/organizations" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "teamId": "team_aBcD1234EfGh5678", "slug": "acme", "name": "Acme" }'
```

The response is the new organization, including the `organizationId` you use in the calls below:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "slug": "acme",
  "name": "Acme",
  "ownerId": "user_aBcD1234EfGh5678",
  "teamId": "team_aBcD1234EfGh5678",
  "teamCount": 1,
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

### Creating a team in an organization

Create a team with the [teams API](/docs/rest-api/teams/create-a-team) and set `organizationId` to the organization's ID. This links the new team to the organization as a child team (stored as the team's `parentId`), so its usage and billing roll up to the organization's billing team.

```bash
curl -X POST "https://api.vercel.com/v1/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "slug": "acme-marketing", "name": "Acme Marketing", "organizationId": "org_aBcD1234EfGh5678IjKl9012" }'
```

The response includes the new team's `id`:

```json
{
  "id": "team_MnOp3456QrSt7890",
  "slug": "acme-marketing"
}
```

### Adding an existing team to an organization

To bring an existing team under the organization, call the organization's teams endpoint with the team's `teamId`. You must also set `billingPlan` to control the team's access level and billing model:

- `platform`: For high-scale accounts that run hundreds or thousands of limited-access Pro teams. Each team's usage is emitted at the end of its own billing cycle to the organization under a consolidated `Platform Customer Usage` SKU.
- `enterprise`: For teams that need full Enterprise permissions, including the ability to buy add-ons. Each team draws down directly from the organization's Flex commit. An organization can have up to 100 enterprise teams.

If you omit `billingPlan`, the request returns a `400` error.

```bash
curl -X POST "https://api.vercel.com/v1/organizations/org_aBcD1234EfGh5678IjKl9012/teams" \
  -H "Authorization: Bearer $VERCEL_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{ "teamId": "team_UvWx9012YzAb3456", "billingPlan": "platform" }'
```

The response is the organization-team link:

```json
{
  "organizationId": "org_aBcD1234EfGh5678IjKl9012",
  "teamId": "team_UvWx9012YzAb3456",
  "createdAt": "2026-06-01T12:00:00.000Z",
  "updatedAt": "2026-06-01T12:00:00.000Z"
}
```

### Removing a team from an organization

Remove a team from the organization. You can't remove the billing team.

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

## Billing

An organization's charges roll up to the billing team's Enterprise account. To understand how Enterprise billing and invoicing work, see:

- [Enterprise plan](/docs/plans/enterprise)
- [Enterprise billing](/docs/plans/enterprise/billing)

## Current limitations

Organizations are in private beta, and some capabilities aren't available yet:

- **Single owner**: An organization can have only one owner. Support for assigning a group of users as organization managers is on the roadmap.
- **Billing aggregates at invoice time**: Vercel consolidates usage from member teams when it generates the monthly invoice, not in real time.

## Related resources

- [Enterprise plan](/docs/plans/enterprise)
- [Enterprise billing](/docs/plans/enterprise/billing)
- [Account management](/docs/accounts)
- [Roles and access control](/docs/rbac)
- [Release phases](/docs/release-phases)


---

[View full sitemap](/docs/sitemap)
