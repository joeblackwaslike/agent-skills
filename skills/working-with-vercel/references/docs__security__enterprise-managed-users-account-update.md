---
title: Hobby team transition
product: vercel
url: /docs/security/enterprise-managed-users-account-update
canonical_url: "https://vercel.com/docs/security/enterprise-managed-users-account-update"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/security
related:
  - /docs/security/enterprise-managed-users
  - /docs/saml
  - /docs/directory-sync
summary: Learn about hobby team transition on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/enterprise-managed-users-account-update.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "f894f908a9eb4182e7851cecb165a8b4c5249d49c505743bda1fc18ec144e8cd"
---

# Transition your Hobby team after EMU enrollment

Enabling [Enterprise Managed Users](/docs/security/enterprise-managed-users) (EMU) on a Vercel Enterprise team brings existing members' accounts under team management. If your work email is attached to a Vercel account with personal content on it, you will see an account update screen the next time you sign in through your team's SSO. This page explains why the screen appears, what each option does, and how to complete the flow, whether you are going through it yourself or an admin previewing what your members will see.

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

The first time you sign in to your managed work account through SSO, a one-time dialog confirms what changed: your dedicated work account, the settings your team manages, and SSO-only sign-in.

## Troubleshooting

- **I don't have a personal email I want to use:** Use any email you control that is not on one of your team's verified domains. If none qualify, create one with a personal provider before completing the flow.
- **I don't see the team I want as a transfer destination:** Transfer destinations are limited to enterprise teams where you have the Owner or Member role. Ask a team owner if you need your role changed or a project moved elsewhere.
- **I'm not sure whether to delete:** Deletion is permanent. If you're unsure, add a personal email instead. You can delete the account later from account settings.

## Related resources

- [Enterprise Managed Users (EMU)](/docs/security/enterprise-managed-users)
- [SAML SSO](/docs/saml)
- [Directory Sync](/docs/directory-sync)


---

[View full sitemap](/docs/sitemap)
