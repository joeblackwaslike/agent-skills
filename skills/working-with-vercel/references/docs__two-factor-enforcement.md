---
title: Two-factor enforcement
product: vercel
url: /docs/two-factor-enforcement
canonical_url: "https://vercel.com/docs/two-factor-enforcement"
last_updated: 2026-06-16
type: reference
prerequisites:
  []
related:
  - /docs/two-factor-authentication
  - /docs/rbac/managing-team-members
summary: Learn how to enforce two-factor authentication (2FA) for your Vercel team members to enhance security.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/two-factor-enforcement.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "df91617a9f1b1004385ff9d9d1f3ebb92dc84f5494d586e07253a7449b89bb14"
---

# Two-factor enforcement

To enhance the security of your Vercel team, you can enforce two-factor authentication (2FA) for all team members. When enabled, members will be required to configure 2FA before they can access team resources.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [SAML SSO](https://vercel.com/docs/saml?from=related) — Learn how to configure SAML SSO for your organization on Vercel.
- [Directory Sync](https://vercel.com/docs/directory-sync?from=related) — Learn how to configure Directory Sync for your Vercel Team.
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication?from=related) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [RBAC](https://vercel.com/docs/rbac?from=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \(RBAC

Full cross-link map for this page: [/docs/two-factor-enforcement.graph.md](/docs/two-factor-enforcement.graph.md)
<!-- /docsgraph:related -->

What to expect:

- Team members will not be able to access team resources until they have 2FA enabled.
- Team members will continue to occupy a team seat.
- Any CI/CD pipeline tokens associated with users without 2FA will cease to work.
- Managed accounts, like service accounts or bots, will also need to have 2FA enabled.
- Members without 2FA will be prompted to enable it when visiting the team dashboard.
- Builds will fail for members without 2FA.
- Notifications will continue to be sent to members without 2FA.

For more information on how to set up two-factor authentication for your account, see the [two-factor authentication](/docs/two-factor-authentication) documentation.

## Viewing team members' 2FA status

Team owners can view the two-factor authentication status of all team members in the [team members page](/docs/rbac/managing-team-members). Users without 2FA will have a label indicating their state. A filter is available on the same page to show members with two-factor authentication enabled or disabled.

![Image](https://vercel.com/front/docs/two-factor/members-2fa-light.png)

## Enabling team 2FA enforcement

Before enabling 2FA enforcement for your team, you must have 2FA enabled on your own account. To prevent workflow disruptions, we recommend notifying your team members about the policy change beforehand.

Steps to follow:

1. Go to **Team Settings** then [**Security & Privacy**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Go+to+Security+settings) and scroll to **Two-Factor Authentication Enforcement**
2. Toggle the switch to enforce 2FA
3. Click the **Save** button to confirm the action

![Image](https://vercel.com/front/docs/two-factor/team-2fa-enforcement-light.png)


---

[View full sitemap](/docs/sitemap)
