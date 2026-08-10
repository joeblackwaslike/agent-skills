---
title: Enterprise Managed Users (EMU)
product: vercel
url: /docs/security/enterprise-managed-users
canonical_url: "https://vercel.com/docs/security/enterprise-managed-users"
last_updated: 2026-07-30
type: how-to
prerequisites:
  - /docs/security
related:
  - /docs/saml
  - /docs/directory-sync
  - /docs/security/enterprise-managed-users-account-update
summary: Enterprise Managed Users (EMU) lets your Vercel team manage the sign-in identity of every member. Members sign in through your SAML SSO provider...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/enterprise-managed-users.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "ba30b76cc9e94934d21237aa394c5164efdac8823f946d301946df7858cbd980"
---

# Enterprise Managed Users (EMU)

Enterprise Managed Users (EMU) lets your team own and control each member's Vercel account. Members sign in through your SAML SSO provider with a **managed account** created for and restricted to your team, rather than a personal Vercel account.

This guide explains the prerequisites for enabling EMU, how to enable it for your team, what changes for your members, and how existing Hobby teams on your verified domains are handled.

> **🔒 Permissions Required**: Enterprise Managed Users

## When to use Enterprise Managed Users

Use EMU when your company wants to own the full identity lifecycle of its Vercel members instead of relying on individually created accounts.

With EMU, you can:

- Own every account that signs in to your team: members use managed accounts that your team controls, not personal ones.
- Provision and deprovision members, and manage which of your teams they belong to, directly from your identity provider through Directory Sync.
- Require SSO-only sign-in: managed accounts can only be accessed through your identity provider, not personal logins like GitHub, Google, or email.
- Take full control of your email domains on Vercel: no new personal accounts can be created with an email on your verified domains.
- Resolve existing personal Hobby teams on your domains in one pass at rollout, preserving each person's legitimate personal content.

## How EMU works

EMU connects your identity provider to Vercel and manages accounts through your verified email domains:

- **Identity provider**: Your SAML SSO provider controls how members sign in, and Directory Sync provisions and removes members automatically.
- **Verified domains**: You choose which of your verified email domains EMU applies to.
- **Managed accounts**: Members with an email on a selected verified domain receive a managed account that your team owns, dedicated to work.
- **Existing accounts**: Some members may already have a personal Vercel account on a verified domain. When you enable EMU, they continue their team work through a new managed account, starting from their next SSO sign-in. The existing personal account is archived automatically if it has no personal content, or its owner decides what happens to it through the account update flow. The Hobby team transition is in Beta and available on request. See [What happens to existing Hobby teams](#what-happens-to-existing-hobby-teams).

## Before you begin

EMU builds on your team's existing identity setup. Confirm that your team meets every requirement below, and complete the setup in the order shown in [Complete the prerequisites in this order](#complete-the-prerequisites-in-this-order): Directory Sync role mappings come last, after EMU is enabled.

| Requirement | Details |
| --- | --- |
| Verified domain | At least one domain must be verified under **Team Settings → Security & Privacy → Manage Domains**. The domain determines which sign-in identities your team manages. You verify and select domains in the Manage Domains sheet during [Step 2: Turn on Enterprise Managed Users](#step-2:-turn-on-enterprise-managed-users). |
| SAML SSO configured | [SAML SSO](/docs/saml) must be set up with your identity provider. |
| SAML SSO enforcement on | [SAML SSO enforcement](/docs/saml#enforcing-saml) must be turned on so that members sign in through your identity provider. |
| Directory Sync / SCIM active | Directory Sync (SCIM) must be connected and active. EMU cannot be enabled without it. |

If your members belong to multiple teams, we recommend enabling EMU for all of those teams. This ensures that the same managed users can access each team under EMU. To do this, each team must meet the requirements listed above before you enable EMU. Once each team meets the requirements, add them using the **Manage** button on the Enterprise Managed Users row.

### Complete the prerequisites in this order

1. Configure [SAML SSO](/docs/saml) with your identity provider.
2. Turn on [SAML SSO enforcement](/docs/saml#enforcing-saml).
3. Connect [Directory Sync](/docs/directory-sync), but leave role mappings empty.
4. Enable Enterprise Managed Users: turn on the toggle, verify your domains, and select the teams you want to become Enterprise Managed.
5. Complete your Directory Sync role mappings. Mapped users are provisioned as managed accounts on their next SSO sign-in.

## Enable Enterprise Managed Users

### Step 1: Find the Enterprise Managed Users setting

1. Open [Team Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Security+%26+Privacy) and go to **Security & Privacy**.
2. Locate the **Enterprise Managed Users** row. The **Manage** button stays disabled until EMU is enabled.

### Step 2: Turn on Enterprise Managed Users

Enabling Enterprise Managed Users consists of two parts:

1. **Verifying domains and selecting teams**: you complete this in the sheet that opens next. From then on, new users on your verified domains are provisioned as managed accounts when your identity provider assigns them to Vercel (through Directory Sync) or when they first sign in with SAML SSO. Verifying a domain doesn't create accounts for everyone with a matching email address: your identity provider controls who is provisioned.
2. **Transitioning existing members (Beta)**: members who already have personal accounts are brought under management separately through the [Hobby team transition](/docs/security/enterprise-managed-users-account-update). See [What happens to existing Hobby teams](#what-happens-to-existing-hobby-teams).

Turn on the **Enterprise Managed Users** toggle. This does not enable EMU yet: it opens the **Manage Domains** sheet, where you complete the setup.

If no domains appear, verify a domain in the sheet to make it available for managed sign-in.

### Step 3: Select domains and teams, then confirm

1. Select the verified domains you want to cover under EMU. Members whose email address matches a selected domain will receive managed accounts.

   - Members whose email does not match a selected domain are removed from the team by the Hobby team transition (Beta). After EMU is on, the team can no longer add members with emails outside the verified domains.
   - Enabling EMU also immediately prevents anyone from creating a new personal Vercel account with an email on the verified domains. Your team gets full control of its email domains on Vercel.

2. Select the teams to enable EMU on.

> **⚠️ Warning:** **Enable EMU on all of your teams.** A managed account can only join teams
> that use EMU. On teams without EMU, your members either appear under their
> personal email address (if they kept their account through the account update
> flow) or lose access entirely (if their previous account was archived).

3. Select **Confirm**. EMU is now active for the selected teams. From this point, all new members signing in via SAML SSO will be provisioned a managed account.

![Image](`/docs-assets/static/docs/enterprise-managed-users/emu-settings-light.png`)

After EMU is enabled, use the **Manage** button on the Enterprise Managed Users row to change your domains and teams.

### Enterprise Managed Users restrictions

- Enterprise Managed Users can only belong to EMU-enabled teams. After a user becomes an Enterprise Managed User, they can't be a member of teams that don't have EMU enabled.
- Members whose email addresses don't use a verified email domain are removed from the team when the Hobby team transition runs (Beta). Contractors or agency partners need a provisioned email on one of your verified domains to remain members.
- Users with email addresses on a verified email domain must be provisioned through your identity provider. They can't join the team as unmanaged users.

> **💡 Note:** **If you configured Directory Sync group mappings before enabling EMU**,
> invitations that were sent but not yet accepted stop working when EMU is
> enabled, and signing in with SSO alone does not recover them. To fix an
> affected user: remove them from the directory group in your identity provider,
> then add them back. This provisions them a managed account on their next SSO
> sign-in. Before enabling EMU, check your identity provider for pending
> unaccepted invitations.

## What changes for managed users

When a team member's account becomes managed:

- **Sign-in**: They must sign in through the team's SAML SSO provider. Other login/signup methods no longer work.

- **Account ownership**: The team owns the managed account.

- **Profile restrictions**: Certain profile fields, such as **name** and **username**, are managed by your team through the identity provider and cannot be changed by the member.

- **Joining the team**: Only managed accounts can be members. Existing unmanaged Vercel accounts cannot join the team directly.

- **Joining other teams**: Managed users cannot join teams that belong to other organizations.

- **Leaving the team**: Managed users cannot voluntarily leave the team. Membership is managed through your identity provider via Directory Sync.

- **Offboarding**: When a managed user is removed from all of your organization's teams, their managed account is eventually deleted.

Existing users on your verified domains who are not members of your team are also affected. Their work email can no longer be used for a personal account, and the Hobby team transition (Beta) prompts them to move their account to a personal email.

## What happens to existing Hobby teams

When someone creates a Vercel account through standard sign-up, Vercel automatically creates a Hobby team for them. If your members signed up with their work email before you enabled EMU (for example, to try Vercel or v0 before your Enterprise team onboarded them), those Hobby teams exist alongside your Enterprise team, sometimes with projects on them.

> **💡 Note:** The Hobby team transition is in Beta and available on request. Contact your
> account team to enable it for your organization. Until it is enabled,
> existing Hobby teams are not processed automatically when you turn on EMU.

Resolving these Hobby teams is a one-time cleanup, not an ongoing task. After you enable EMU, new members are provisioned through SSO with a managed account and no Hobby team, and new personal sign-ups with an email on your verified domains are blocked.

When the transition runs, each Hobby team on a verified domain is handled based on what is on it. Hobby teams with no personal content or activity are archived automatically; their owners land directly in their new managed account on their next SSO sign-in. Hobby teams with personal content go through a guided flow where the owner decides what happens to the projects.

> **💡 Note:** **Archived means locked, not deleted.** An archived account can no longer be
> signed in to or used, but its data is preserved. If a member later needs
> something from an archived account, they can [contact Vercel
> Support](https://vercel.com/help) to request recovery.

In both cases, the first time a converted member signs in through SSO, a one-time dialog confirms that their account is now managed: a dedicated work account, team-managed settings, and SSO-only sign-in. Members provisioned directly as new managed accounts, who had no existing Vercel account, do not see this dialog.

For a full walkthrough of that flow, see [Transition your Hobby team after EMU enrollment](/docs/security/enterprise-managed-users-account-update).

## Current limitations

- Personal access tokens belonging to transitioning users are invalidated. Anything that depends on them, such as CI pipelines, scripts, and integrations, must be re-created from the new managed account.
- Every team member must have an email on a verified domain. There is no way to add a member on an external domain; provision company emails for contractors if needed.
- Managed users cannot join teams that belong to other organizations.

## Related resources

- [Transition your Hobby team after EMU enrollment](/docs/security/enterprise-managed-users-account-update)
- [SAML SSO](/docs/saml)
- [Directory Sync](/docs/directory-sync)


---

[View full sitemap](/docs/sitemap)
