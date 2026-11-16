---
title: Two-factor Enforcement
product: vercel
url: /docs/two-factor-enforcement
canonical_url: "https://vercel.com/docs/two-factor-enforcement"
last_updated: 2026-08-28
type: how-to
prerequisites:
  []
related:
  - /docs/two-factor-authentication
  - /docs/rbac/managing-team-members
summary: Require two-factor authentication for your team and review the impact on members and automation.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/two-factor-enforcement.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "f27b190f22a45046513992b92e2796da4440623e5c72de4589b724cee3dc0b58"
---

# Two-factor Enforcement

Two-factor authentication (2FA) enforcement requires members to enable personal 2FA before accessing your team's resources. Team owners can enable enforcement after enabling their own 2FA.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Two-factor authentication (2FA) team enforcement](https://vercel.com/changelog/2fa-team-enforcement)
- [Two-Factor Authentication (2FA) is now available](https://vercel.com/changelog/2fa-is-now-available)
- [SAML Single Sign-On](https://vercel.com/docs/saml) — Learn how to configure SAML SSO for your organization on Vercel.
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard) — Learn how to manage Sign in with Vercel from the Dashboard
- [Invite a user](https://vercel.com/docs/rest-api/teams/invite-a-user) — POST /v2/teams/{teamId}/members — Invite a user to join the team specified in the URL. The authenticated user needs to b
- [Update a Team Member](https://vercel.com/docs/rest-api/teams/update-a-team-member) — PATCH /v1/teams/{teamId}/members/{uid} — Update the membership of a Team Member on the Team specified by \\`teamId\\`, suc

Full cross-link map for this page: [/docs/two-factor-enforcement.graph.md](/docs/two-factor-enforcement.graph.md)
<!-- /docsgraph:related -->

## Upcoming enforcement

All Vercel users must complete authenticator app setup by **January 20, 2027**. See [authenticator app requirements](/docs/two-factor-authentication#authenticator-app-requirements).

Existing team enforcement takes effect immediately. Members must have 2FA enabled to access teams that already enforce it.

Prepare your team before January 20:

1. Ask every member to [set up an authenticator app](/docs/two-factor-authentication#enabling-two-factor-authentication). Members who use a passkey must also add an authenticator app.
2. Ask members to save their recovery codes. They can also [add a passkey](/docs/two-factor-authentication#configuring-a-passkey) for phishing-resistant sign-in.
3. [Review member readiness](#viewing-team-members-2fa-status) and the accounts behind deployment and automation tokens before enforcement takes effect.

Current enforcement accepts enabled personal 2FA with an authenticator app or a passkey. The upcoming requirements also apply to members whose 2FA uses only a passkey.

## What happens when enforcement is enabled

Members without enabled 2FA can't access team resources. Vercel prompts them to complete setup when they visit the team dashboard. They remain on the team, occupy a seat, and receive notifications.

Review deployments and automation before enabling enforcement:

- Personal access tokens use their owner's 2FA status. If the owner hasn't enabled 2FA, requests to the team can fail, including deployments from the CLI or CI/CD pipelines.
- Accounts used for services or bots also need enabled 2FA if automation uses their personal access tokens.
- Integration tokens are exempt from this personal 2FA enforcement check.

After completing setup on their own account, members can return to the team dashboard to regain access.

## Viewing team members' 2FA status

Open **Settings**, then **Members** for your team to [review members' 2FA status](/docs/rbac/managing-team-members). Filter for disabled 2FA to find members who need to complete setup.

This filter doesn't identify members with passkey-only 2FA. Ask members to confirm that they've added an authenticator app, even if their 2FA status shows enabled.

![Two-factor authentication status on the Members page.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/two-factor/members-2fa-light.png)

## Enabling team 2FA enforcement

As a team owner, [set up an authenticator app](/docs/two-factor-authentication#enabling-two-factor-authentication) on your account. Tell members when you plan to enable enforcement and share the setup instructions. Review members and automation accounts before continuing.

1. Select your team in the dashboard and open **Settings**, then [**Security & Privacy**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity%23two-factor-enforcement\&title=Go+to+Security+settings).
2. Find **Two-Factor Authentication Enforcement** and turn on the switch.
3. Select **Save** and confirm that enforcement shows **Enabled**.

Saving takes effect immediately. Members without enabled 2FA must complete setup to regain team access.

![Two-factor authentication enforcement team setting.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/two-factor/team-2fa-enforcement-light.png)

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
