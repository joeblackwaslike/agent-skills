---
title: Transition your Hobby team after EMU enrollment
product: vercel
url: /docs/security/enterprise-managed-users-account-update
canonical_url: "https://vercel.com/docs/security/enterprise-managed-users-account-update"
last_updated: 2026-08-20
type: how-to
prerequisites:
  - /docs/security
related:
  - /docs/security/enterprise-managed-users
  - /docs/git
  - /docs/saml
  - /docs/directory-sync
summary: Explains the account update screen EMU members see at SSO sign-in and how to complete it.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/enterprise-managed-users-account-update.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c3ac0d4cb48edfc1a52ef1ce31036121f1036ac6953a408978fb4d90ece1664c"
---

# Transition your Hobby team after EMU enrollment

Enabling [Enterprise Managed Users](/docs/security/enterprise-managed-users) (EMU) on a Vercel Enterprise team brings existing members' accounts under team management. If your work email is attached to a Vercel account with personal content on it, you will see an account update screen the next time you sign in through your team's SSO. This page explains why the screen appears, what each option does, and how to complete the flow, whether you are going through it yourself or an admin previewing what your members will see.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enterprise Managed Users is now generally available](https://vercel.com/changelog/enterprise-managed-users?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related)
- [Teams](https://v0.app/docs/teams?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Collaborate with your team on projects with shared resources.
- [Enterprise](https://v0.app/docs/enterprise?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to manage v0 seats, access, and more in your Vercel Enterprise account.
- [Easier transitions between hobby and pro](https://vercel.com/changelog/2024-01-account-changes?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related)
- [September 2020](https://vercel.com/blog/changelog-september-2020?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related)
- [Projects can now be transferred without downtime](https://vercel.com/changelog/projects-can-now-be-transferred-without-downtime?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related)
- [Account](https://v0.app/docs/account?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Manage your account and billing information.
- [How do I transfer ownership of a Vercel team?](https://vercel.com/kb/guide/how-do-i-transfer-ownership-of-a-vercel-team?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to transfer ownership of a Vercel team, including the exact dashboard steps to promote a new Owner and remove
- [Account Management](https://vercel.com/docs/accounts?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to manage your Vercel account and team members.
- [Transferring a project](https://vercel.com/docs/projects/transferring-projects?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to transfer a project between Vercel teams.
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [Managing Global Configs with the Dashboard](https://vercel.com/docs/global-config/global-config-dashboard?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=related) — Learn how to create, view and update your Global Configs and the data inside them in your Vercel Dashboard at the Hobby

Full cross-link map for this page: [/docs/security/enterprise-managed-users-account-update.graph.md](/docs/security/enterprise-managed-users-account-update.graph.md?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users-account-update&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

> **🔒 Permissions Required**: Hobby team transition

## Who sees the account update screen

If your work-email account has no personal content, Vercel archives it automatically and your next SSO sign-in lands directly in your new managed account. An archived account is locked, not deleted: [contact Vercel Support](https://vercel.com/help) to recover it.

You see the account update screen only if your account has personal content or activity on it, such as personal projects, v0 chats, custom domains, paid subscriptions or purchased credits, billing details, or Sign in with Vercel connections. The screen appears on your next SSO sign-in after EMU is enabled and blocks access until you complete it, so that you decide what happens to your personal content before your work email becomes a managed identity.

## How the account update works

The flow starts with an intro screen, then asks you to make one choice about your existing personal account: keep it on a personal email, or delete it. You can also transfer work projects to your enterprise team first.

![Image](https://vercel.com/docs-assets/static/docs/enterprise-managed-users/emu-account-update-intro-light.png?v=3)

The first screen is titled "Your team is now Enterprise Managed" (or "Your teams are now Enterprise Managed"). It tells you:

- Your work email is now managed by your team and can no longer be attached to a personal account.
- Your work with the enterprise team is unchanged and moves to a dedicated work account under that email, accessed through your team's SSO.

## Your options

The Manage Account screen lists the projects on your account and asks you to choose between two options:

- Keeping this account with a personal email
- Deleting this account

Before you choose, you can transfer work projects to your enterprise team. Transfer works with either option.

![Image](https://vercel.com/docs-assets/static/docs/enterprise-managed-users/emu-account-update-manage-light.png?v=3)

### Transfer work projects first (optional)

Each project row has a **Transfer** button to move that project into one of your enterprise teams. Transfers are never automatic. Destinations are limited to enterprise teams where you have the Owner or Member role. Other roles cannot transfer projects into a team.

Transferred projects move to your enterprise team immediately, whichever option you choose. Projects you do not transfer stay with the account: kept with it, or deleted with it.

### Option 1: Keep this account with a personal email

For this option, you keep your existing account, its Hobby team, and your personal projects as a personal account. In the next step, you set a personal email as your primary address, and your work email is removed from this account so your organization can manage it separately. From then on, you sign in to this personal account with your new email (your existing sign-in methods keep working too), and reach your work teams through a separate managed account via SSO.

Choosing this option takes you to the **Update Email screen**, where you provide the personal email that becomes your account's primary email. If you have verified secondary emails on file, pick one from the list, or enter a new address.

Vercel sends a verification link to that address. Once you follow it, your account's primary email switches to the personal address and a confirmation screen lets you continue to your dashboard.

> **💡 Note:** If your work email is on a verified domain but you are not a member of any
> managed team, you start directly at this step (titled "Email Update
> Required"), since your work email can no longer be used for a personal
> account.

### Option 2: Delete this account

Permanently delete the account and everything on it. A confirmation screen summarizes what will be deleted (your projects, v0 chats, domains, deployments, and all other resources), and requires typing your username and the phrase "delete my personal account", plus re-authentication.

All related payments stop, and invoices and billing history are no longer accessible after deletion. Deletion cannot be undone. Afterwards, you are redirected to your team's SSO sign-in to continue as a managed user.

> **💡 Note:** If your account or any of your personal teams is on the Pro plan, the delete
> option is not offered. You go directly from the intro to adding a personal
> email.

## Account update complete

If you kept your account, you end up with two separate identities:

- A personal account on your personal email holding the projects you kept.
- A managed work account on your work email, accessed through your team's SSO, holding your enterprise work.

The two accounts do not share resources. If you deleted your account, you have a single managed work account going forward.

The first time you sign in to your managed work account through SSO, a one-time dialog confirms what changed, walking through your dedicated work account, the settings your team manages, and SSO-only sign-in.

## After the transition

Your managed account is a new Vercel account. Everything the team owns (projects, deployments, domains, and integrations) keeps working without any action. A few things, however, are bound to the account that created them and need a one-time check after your first SSO sign-in.

### Reconnect your Git account

Git connections (GitHub, GitLab, or Bitbucket) are not migrated to your managed account. The authorization belongs to your old account, and re-authorizing on the new account is intentional, for security. Vercel remembers the name of the Git account you had connected and shows it in the dialog on your first sign-in, so you know which one to connect again.

If deploys fail with Git permission errors after you transition, or Vercel stops recognizing your commits, connect your Git provider from [Account Settings → Authentication](https://vercel.com/account/settings/authentication) under **Sign-in Methods**. This is a one-time fix.

### Re-create your access tokens

Access tokens are bound to the account that created them. After you transition, tokens created by your old account stop authorizing against your team. Vercel doesn't delete or migrate them. They lose authorization, so anything using one (the `vercel` CLI, API calls, or scripts) fails until it gets a new token.

To restore access:

1. Sign in to your managed account through SSO. This is a full login, and the Tokens page works the same as before.
2. Go to [Account Settings → Tokens](https://vercel.com/account/settings/tokens) and create a new token scoped to your team.
3. Update the token anywhere the old one was stored, and re-authenticate your local CLI with `vercel login`.
4. If you kept your personal account, revoke the old tokens from it once everything works. If your old account was archived or deleted, you no longer have access to it and there is nothing to revoke. Its tokens have already stopped authorizing.

### Move shared automation to a service account

If automation such as CI/CD deploys, SIEM or log export, or scheduled scripts authenticates with a member's personal token, move it to a dedicated service account **before** running the transition. The service account must be a **managed** account. A service account created before EMU is a regular account and goes through the transition like any other member, so its tokens break the same way.

To set one up:

1. Provision a new non-human identity through your identity provider.
2. Sign in once through SSO as that account. Creating the first token requires a signed-in session.
3. Create team-scoped tokens from it and swap them into each integration.

Tokens owned by a managed service account don't break when a member transitions or leaves. Deploys through the [Vercel Git integration](/docs/git), deploy hooks, and the Directory Sync (SCIM) bearer token are unaffected.

### AI Gateway API keys

AI Gateway keys follow the same rule as access tokens. Each key authenticates as the member who created it, even when it is stored on the team. A team-scoped key created by a member who transitions will stop authorizing, and keys created in a personal Hobby scope are lost if that Hobby team is archived or deleted.

To restore access:

- Re-create application and CI gateway keys from a managed service account.
- For keys you use yourself, create a new team-scoped key from your managed account. Managed accounts have no personal Hobby scope, so every key you create there is scoped to the team.

### Marketplace partner sign-ins

Marketplace integrations installed on the team keep working. The installation and its resources stay on the team, and Vercel reassigns ownership to your managed account automatically. The per-user identity a partner receives when you use an **Open in...** flow, however, comes from your Vercel user ID, which changes when you transition. Most partners treat you as a new user on your next sign-in, so partner-side settings or roles tied to your old identity don't carry over.

If a partner returns an error because your old identity is still linked under the same email, ask the partner to unlink the old identity. Reinstalling the integration is not required and won't help.

## Troubleshooting

- **I don't have a personal email I want to use:** Use any email you control that is not on one of your team's verified domains. If none qualify, create one with a personal provider before completing the flow.
- **I don't see the team I want as a transfer destination:** Transfer destinations are limited to enterprise teams where you have the Owner or Member role. Ask a team owner if you need your role changed or a project moved elsewhere.
- **I'm not sure whether to delete:** Deletion is permanent. If you're unsure, add a personal email instead. You can delete the account later from account settings.
- **A CI pipeline or script stopped working after I transitioned:** It authenticates with a token from your old account. Re-create the token from your managed account, or from a service account for shared automation, and update it where it is stored. See [Re-create your access tokens](#re-create-your-access-tokens).

## Related resources

- [Enterprise Managed Users (EMU)](/docs/security/enterprise-managed-users)
- [SAML SSO](/docs/saml)
- [Directory Sync](/docs/directory-sync)


---

[View full sitemap](/docs/sitemap)
