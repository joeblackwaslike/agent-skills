---
title: Two-factor enforcement
product: vercel
url: /docs/two-factor-enforcement
canonical_url: "https://vercel.com/docs/two-factor-enforcement"
last_updated: 2026-02-27
type: reference
prerequisites:
  []
related:
  - /docs/two-factor-authentication
  - /docs/rbac/managing-team-members
summary: Learn how to enforce two-factor authentication (2FA) for your Vercel team members to enhance security.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/two-factor-enforcement.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "b61d40d97eeb3ff747ce39b22c47637650371a28428f838a7661e5e0fbe967fe"
---

# Two-factor enforcement

To enhance the security of your Vercel team, you can enforce two-factor authentication (2FA) for all team members. When enabled, members will be required to configure 2FA before they can access team resources.

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
