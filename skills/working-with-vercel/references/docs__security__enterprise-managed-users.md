---
title: Enterprise Managed Users (EMU)
product: vercel
url: /docs/security/enterprise-managed-users
canonical_url: "https://vercel.com/docs/security/enterprise-managed-users"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/security
related:
  - /docs/saml
  - /docs/directory-sync
  - /docs/security/enterprise-managed-users-account-update
  - /docs/projects/transferring-projects
summary: Enterprise Managed Users (EMU) lets your Vercel team manage the sign-in identity of every member. Members sign in through your SAML SSO provider...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/enterprise-managed-users.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "4fed6a3e2ceb6e1c58bd77a3af7dcebd83f5d010355f37a521c4a28cd3473cd3"
---

# Enterprise Managed Users (EMU)

Enterprise Managed Users (EMU) lets your team own and control each member's Vercel account. Members sign in through your SAML SSO provider with a **managed account** created for and restricted to your team, rather than a personal Vercel account.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Enterprise Managed Users is now generally available](https://vercel.com/changelog/enterprise-managed-users?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related)
- [How do I transfer ownership of a Vercel team?](https://vercel.com/kb/guide/how-do-i-transfer-ownership-of-a-vercel-team?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Learn how to transfer ownership of a Vercel team, including the exact dashboard steps to promote a new Owner and remove
- [Easier transitions between hobby and pro](https://vercel.com/changelog/2024-01-account-changes?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related)
- [Enterprise](https://v0.app/docs/enterprise?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Learn how to manage v0 seats, access, and more in your Vercel Enterprise account.
- [How to set up email with your Vercel domain](https://vercel.com/kb/guide/set-up-email-with-your-vercel-domain?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Set up email on your Vercel domain by adding your provider's MX and TXT records in Vercel DNS, and send transactional em
- [Teams](https://v0.app/docs/teams?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Collaborate with your team on projects with shared resources.
- [Vercel Pricing](https://vercel.com/pricing?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Choose a Vercel plan and compare features and usage pricing.
- [Account Management](https://vercel.com/docs/accounts?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Learn how to manage your Vercel account and team members.
- [Managing Team Members](https://vercel.com/docs/rbac/managing-team-members?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \\(RBAC
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t
- [Troubleshoot project collaboration](https://vercel.com/docs/deployments/troubleshoot-project-collaboration?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=related) — Learn about common reasons for deployment issues related to team member requirements and how to resolve them.

Full cross-link map for this page: [/docs/security/enterprise-managed-users.graph.md](/docs/security/enterprise-managed-users.graph.md?from=related&source_path=%2Fdocs%2Fsecurity%2Fenterprise-managed-users&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This guide explains the prerequisites for enabling EMU, how to enable it for your team, what changes for your members, and how existing Hobby teams on your verified domains are handled.

> **Availability**: Enterprise Managed Users are available on Enterprise plans

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

### Find your scenario

| Your situation | Start here |
| --- | --- |
| You're setting up EMU on a team for the first time | [Before you begin](#before-you-begin), then [Enable Enterprise Managed Users](#enable-enterprise-managed-users) |
| Your team already uses Directory Sync role mappings | [Role mappings and EMU](#role-mappings-and-emu) |
| Your members already have Vercel accounts with their work email | [What happens to existing Hobby teams](#what-happens-to-existing-hobby-teams) |
| You have several teams, or acquired a company with its own Vercel team | [Add a second team or an acquired company's team](#add-a-second-team-or-an-acquired-company's-team) |
| Your members are moving to a new email domain | [Migrate your organization to a new domain with EMU](#migrate-your-organization-to-a-new-domain-with-emu) |
| Your CI pipelines or scripts use members' personal access tokens | [Step 4: Move shared automation to a service account](#step-4:-move-shared-automation-to-a-service-account) |

## Before you begin

EMU builds on your team's existing identity setup. Confirm that your team meets every requirement below, and complete the setup in the order shown in [Complete the prerequisites in this order](#complete-the-prerequisites-in-this-order). If you're setting up Directory Sync for the first time or have existing mappings, add new mappings after EMU is enabled.

| Requirement | Details |
| --- | --- |
| SAML SSO configured | [SAML SSO](/docs/saml) must be set up with your identity provider. |
| SAML SSO enforcement on | [SAML SSO enforcement](/docs/saml#enforcing-saml) must be turned on so that members sign in through your identity provider. |
| Directory Sync / SCIM active | Directory Sync (SCIM) must be connected and active. EMU cannot be enabled without it. |
| Verified email domain | At least one email domain must be verified for EMU. The domain determines which sign-in identities your team manages. You verify it inside the **Manage Domains** sheet that opens when you turn on the toggle in [Step 2: Turn on Enterprise Managed Users](#step-2:-turn-on-enterprise-managed-users). This is separate from adding a domain to a project on the **Domains** page, and uses its own DNS TXT record. |

If your members work in more than one team, enable EMU on each of those teams, and make sure every one of them meets the requirements above. See [Add a second team or an acquired company's team](#add-a-second-team-or-an-acquired-company's-team) for who can do this.

### Complete the prerequisites in this order

1. Configure [SAML SSO](/docs/saml) with your identity provider.
2. Turn on [SAML SSO enforcement](/docs/saml#enforcing-saml).
3. Connect [Directory Sync](/docs/directory-sync). Don’t add new role mappings until step 5. Existing mappings won’t be affected, but users with unmanaged accounts will later need to [transition to managed accounts](/docs/security/enterprise-managed-users-account-update).
4. Enable Enterprise Managed Users: turn on the toggle, verify your domains, and select the teams you want to become Enterprise Managed.
5. Add or update your Directory Sync role mappings. Users in mapped groups get a managed account the next time they sign in with SSO, and no invitation emails are sent.

#### Role mappings and EMU

| Your Directory Sync setup | What to do |
| --- | --- |
| No role mappings yet | Add role mappings in step 5, after EMU is enabled. |
| Role mappings already in place | Keep them in place while you enable EMU. Add or change mappings after EMU is enabled, if needed. |

Mappings saved before EMU is enabled send standard invitations, and people who accept them join with unmanaged accounts that later need the [Hobby team transition](/docs/security/enterprise-managed-users-account-update). If you start mapping groups before EMU is on, the dashboard asks whether to set up EMU first.

## Enable Enterprise Managed Users

### Step 1: Find the Enterprise Managed Users setting

1. Open [Team Settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Security+%26+Privacy) and go to **Security & Privacy**.
2. Locate the **Enterprise Managed Users** row. The **Manage** button stays disabled until EMU is enabled.

### Step 2: Turn on Enterprise Managed Users

Enabling Enterprise Managed Users consists of two parts:

1. **Verifying domains and selecting teams**: you complete this in the sheet that opens next. From then on, new users on your verified domains are provisioned as managed accounts when your identity provider assigns them to Vercel (through Directory Sync) or when they first sign in with SAML SSO. Verifying a domain doesn't create accounts for everyone with a matching email address: your identity provider controls who is provisioned.
2. **Transitioning existing members (Beta)**: members who already have personal accounts are brought under management separately through the [Hobby team transition](/docs/security/enterprise-managed-users-account-update). See [What happens to existing Hobby teams](#what-happens-to-existing-hobby-teams).

Turn on the **Enterprise Managed Users** toggle. This does not enable EMU yet: it opens the **Manage Domains** sheet, where you complete the setup.

If no domains appear, select **Configure Domain** (or **Configure** under **Configure another domain**). A setup page opens where you add a DNS TXT record for your email domain. When you're done, you return to **Security & Privacy**. Open the sheet again (turn on the toggle, or select **Manage** if EMU is already on) to check that the verified domain appears in the list.

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

![Enterprise Managed Users enabled for the team.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/enterprise-managed-users/emu-settings-light.png)

After EMU is enabled, use the **Manage** button on the Enterprise Managed Users row to change your domains and teams.

### Step 4: Move shared automation to a service account

Do this after EMU is enabled and before you run the [Hobby team transition](/docs/security/enterprise-managed-users-account-update). Enabling EMU doesn't affect any tokens, but the transition invalidates the personal access tokens of every member it converts. If CI/CD pipelines, scripts, or integrations authenticate with a member's personal token, move them first:

1. Create a service account in your identity provider with an email on your verified domain, and assign it to Vercel in a group you've mapped to a role. Because EMU is already on, it is provisioned as a managed account.
2. Sign in once through SSO as the service account. Creating a token requires a signed-in session.
3. Create team-scoped tokens from the service account and swap them into each integration.

Don't create the service account before EMU is enabled. It would be a regular account, go through the transition like any other member, and its tokens would stop working. Tokens owned by a managed service account keep working when members transition or leave. For details, see [Move shared automation to a service account](/docs/security/enterprise-managed-users-account-update#move-shared-automation-to-a-service-account).

### Enterprise Managed Users restrictions

- Enterprise Managed Users can only belong to EMU-enabled teams. After a user becomes an Enterprise Managed User, they can't be a member of teams that don't have EMU enabled.
- Members whose email addresses don't use a verified email domain are removed from the team when the Hobby team transition runs (Beta). Contractors or agency partners need a provisioned email on one of your verified domains to remain members.
- Users with email addresses on a verified email domain must be provisioned through your identity provider. They can't join the team as unmanaged users.

> **💡 Note:** **If you configured Directory Sync group mappings before enabling EMU**,
> invitations that were sent but not yet accepted stop working when EMU is
> enabled. Affected users can sign in through your identity provider, for
> example from the Vercel app tile, to get a managed account with their mapped
> role. If that doesn't work, remove them from the directory group in your
> identity provider, then add them back.

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

When the transition runs, each existing account is handled based on who owns it and what is on it:

| Account | What happens |
| --- | --- |
| Team member with a work email and no personal content | The Hobby team is archived automatically. Their next SSO sign-in lands directly in their new managed account. |
| Team member with a work email and personal content | They go through a guided flow and decide what happens to their personal projects, then continue in their new managed account. |
| Team member with no email on a verified domain | Removed from the team. They need an email on a verified domain, provisioned through your identity provider, to rejoin. |
| Account on a verified domain that isn't a team member | Prompted to move the account to a personal email. It never gains access to your team. |

> **💡 Note:** **Archived means locked, not deleted.** An archived account can no longer be
> signed in to or used, but its data is preserved. If a member later needs
> something from an archived account, they can [contact Vercel
> Support](https://vercel.com/help) to request recovery.

In both cases, the first time a converted member signs in through SSO, a one-time dialog confirms that their account is now managed, with a dedicated work account, team-managed settings, and SSO-only sign-in. Members provisioned directly as new managed accounts, who had no existing Vercel account, do not see this dialog.

For a full walkthrough of that flow, see [Transition your Hobby team after EMU enrollment](/docs/security/enterprise-managed-users-account-update).

## Acquisitions and email domain changes

Organizations change shape. You acquire a company, get acquired, or rebrand onto a new email domain. This section explains how to move members to new email addresses, or bring an acquired company's team into your organization, without losing team history or project permissions.

### How it works

Which mechanism applies depends on whether EMU is enabled:

- **Before EMU is enabled**, each member controls their own account email. Changing it is a self-serve action in Account Settings, and because the account itself never changes, all of its history is retained automatically.
- **After EMU is enabled**, your identity provider is the source of truth. Members and team owners can no longer set emails on your claimed domains from Vercel. Instead, changing a managed member's email or name in your identity provider syncs to their Vercel account automatically. The sync only applies to managed accounts, only for email addresses on your claimed domains, and only when the target address is not already in use by another Vercel account.
- **During the Hobby team transition**, each member's roles and project access are carried to their new managed account by matching the email address your identity provider asserts at their first SSO sign-in. This is why the order of the steps below matters. Change emails in your identity provider only after members have signed in. Git connections are not migrated. For security, Vercel only records which Git account a member had connected and prompts them to authorize it again on the new account.

### Change email domains before enabling EMU

If EMU is not enabled yet, members update their own email:

1. Add the new email address in Account Settings and verify it.
2. Set the new address as the primary email.
3. Optionally, remove the old address.

> **💡 Note:** If a member already created a separate Vercel account with the new email
> address, they must delete that account first. Email addresses are unique
> across Vercel, and accounts cannot be merged.

> **💡 Note:** If Directory Sync is enabled, update the member's email in your identity
> provider as well so both sides stay in sync before you enable EMU. The order
> doesn't matter. Vercel links directory users by their identity provider ID,
> not their email address. Changing the email on either side never disconnects
> the member, and changes from your identity provider keep syncing even while
> the two emails differ.

Once EMU is enabled, this self-serve path closes, and emails on your claimed domains can only be changed through your identity provider.

### Migrate your organization to a new domain with EMU

To move your members to a new email domain (for example, after an acquisition), complete these steps in order:

#### Step 1: Resolve duplicate accounts

If a member already has a second Vercel account under their target email address, they must delete it to free the address. If the target address is taken when the email sync runs, the sync skips that member's email without an error.

#### Step 2: Add everyone to the Enterprise team

Existing unmanaged accounts cannot join a team after EMU is enabled. Any member who should be part of the organization, including employees of an acquired company, must be a team member before you turn on EMU.

If someone is missed, they still have options after EMU is enabled:

- **If their work email is not attached to an existing Vercel account**, assign them to the team in your identity provider. Vercel provisions a managed account for them automatically at their first SSO sign-in.
- **If their work email belongs to an existing unmanaged account**, that account must go through the Hobby team transition to become managed. The transition is a one-time action and cannot be run again, so contact your Vercel account team to resolve the account.
- **If they only need to hand over content**, they can submit a [project transfer request](/docs/projects/transferring-projects) to move projects into the team. Their unmanaged account itself stays outside the organization, so they should move it to a personal email address.

#### Step 3: Move content out of Pro and Hobby teams

EMU is available on Enterprise teams only. If an acquired company's projects live in a Pro team, [transfer them](/docs/projects/transferring-projects) into your Enterprise team first. Project transfers require the Owner or Member role in the destination team.

#### Step 4: Verify and claim both domains

Claim the current domain and the new one in the EMU enable flow. Members' existing emails only count as work emails if their domain is claimed, and the email sync only moves members onto addresses whose domain is claimed.

#### Step 5: Run the Hobby team transition

Run the transition while your identity provider still asserts members' current emails. If you change emails in your identity provider before a member's first SSO sign-in, that member still gets access, but you must grant their roles and project access again manually.

> **⚠️ Warning:** Avoid running a manual directory sync between triggering the transition and
> your members' first SSO sign-ins. Manual syncs can interfere with the
> transition's permission carryover.

#### Step 6: Update emails in your identity provider

Once a member has signed in and their account is managed, change their email in your identity provider. The change syncs to their Vercel account automatically, with no action needed from the member.

### Add a second team or an acquired company's team

Enabling EMU does not prevent you from adding more teams later. Managed users can join any team in your organization that also uses EMU, so the goal is for every team your members work in to use EMU on the same email domains.

Before you start, make sure the new team meets the [prerequisites](#before-you-begin): an Enterprise plan, SAML SSO enforced, and Directory Sync connected. In **Select Teams**, a team that's missing a prerequisite can't be selected. Hover over it to see what's missing, or select **Configure** next to it to open that team's settings.

Who turns on EMU for the new team depends on whether one person is an Owner of both teams:

| Situation | Who turns on EMU | How |
| --- | --- | --- |
| One person is an Owner of both teams | That Owner | On the team that already uses EMU, open [Security & Privacy](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Security+%26+Privacy), select **Manage** on the Enterprise Managed Users row, keep your domains selected, select the new team in **Select Teams**, and confirm. The selected domains are applied to the new team. The Owner must be signed in to both teams with SAML SSO. |
| No one is an Owner of both teams | An Owner of the new team | On the new team, open [Security & Privacy](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fsecurity\&title=Security+%26+Privacy), turn on the **Enterprise Managed Users** toggle, verify the same email domains on that team (plus any domain of its own), select them, and confirm. |

A managed account can't join a team that doesn't use EMU yet. If every Owner of your EMU team has a managed account, which is common after an acquisition, have an Owner of the new team turn on EMU there (the second row of the table).

After EMU is on for the new team, assign members through your identity provider. Members join with the role from your directory group mapping, with no invitations needed. Existing members of the new team go through the [Hobby team transition](/docs/security/enterprise-managed-users-account-update) (Beta) like any other team. The transition runs on every EMU team owned by the person who starts it. If no one owns both teams, it runs separately for each.

If the acquired company keeps its own email domain, verify and claim that domain as an additional EMU domain instead of migrating emails. Members on that domain are then provisioned and managed like any other member. Multi-domain organizations, including dedicated subdomains for contractors, are fully supported.

## Current limitations

- Personal access tokens belonging to transitioning users are invalidated. Anything that depends on them, such as CI pipelines, scripts, and integrations, must be re-created from the new managed account. See [After the transition](/docs/security/enterprise-managed-users-account-update#after-the-transition) for the steps and how to move automation to a service account first.
- Every team member must have an email on a verified domain. There is no way to add a member on an external domain; provision company emails for contractors if needed.
- Managed users cannot join teams that belong to other organizations.

## Related resources

- [Transition your Hobby team after EMU enrollment](/docs/security/enterprise-managed-users-account-update)
- [SAML SSO](/docs/saml)
- [Directory Sync](/docs/directory-sync)


---

[View full sitemap](/docs/sitemap)
