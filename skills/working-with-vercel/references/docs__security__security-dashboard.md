---
title: Security Dashboard
product: vercel
url: /docs/security/security-dashboard
canonical_url: "https://vercel.com/docs/security/security-dashboard"
last_updated: 2026-08-17
type: conceptual
prerequisites:
  - /docs/security
related:
  - /docs/two-factor-enforcement
  - /docs/rbac/access-roles
  - /docs/accounts/access-tokens
  - /docs/oidc
  - /docs/project-configuration/security-settings
summary: The Security Dashboard aggregates the security posture of every account and project on your team, flags misconfigurations, and shows how to fix them.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/security/security-dashboard.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "2ecaa4bbe0568c8080b33a4e23b6863f2e8fcd485bbaa2a6853d983f6de4eead"
---

# Security Dashboard

The Security Dashboard aggregates the security posture of every account and project on your team into a single view. It runs a set of security checks against your team's members, tokens, projects, deployments, and environment variables, then flags the checks that fail and explains how to fix them.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Security Dashboard is now generally available](https://vercel.com/changelog/vercel-security-dashboard-is-now-generally-available?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related)
- [Unified security actions dashboard](https://vercel.com/changelog/unified-security-actions-dashboard?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related)
- [Vercel Security Dashboard is in private beta](https://vercel.com/changelog/vercel-security-dashboard-is-in-private-beta?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related)
- [Security](https://v0.app/docs/security?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — Learn about v0's security practices, threat modeling, and enterprise security features.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Attestations and Compliance Report](https://vercel.com/docs/security/attestations-and-compliance-report?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — Learn how to preview and download Vercel compliance documents from the dashboard.
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [List all checks for a project](https://vercel.com/docs/rest-api/checks-v2/list-all-checks-for-a-project?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — GET /v2/projects/{projectIdOrName}/checks — List all checks for a project, optionally filtered by target.
- [Access Control](https://vercel.com/docs/security/access-control?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti

Full cross-link map for this page: [/docs/security/security-dashboard.graph.md](/docs/security/security-dashboard.graph.md?from=related&source_path=%2Fdocs%2Fsecurity%2Fsecurity-dashboard&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

As your team grows and coding agents make it faster to spin up projects, small oversights accumulate such as:

- a member without two-factor authentication
- a preview deployment left publicly reachable
- a long-lived credential used where a short-lived one would do

The Security Dashboard surfaces these gaps in one place so you can address them before they turn into incidents.

## Open the Security Dashboard

You reach the [Security Dashboard](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsecurity\&title=Go+to+Security+Dashboard) from your team settings:

1. From your team, go to **Settings**, then open the **Security & Privacy** tab.
2. In the **Security Dashboard** card, review the score summary, then select **Visit** to open the full dashboard.

The **Security & Privacy** tab is the main entry point. Its card shows the same score bar as the dashboard, so you can see your team's posture at a glance without leaving settings.

## How the Security Dashboard works

The Security Dashboard runs a fixed catalog of security checks against your team. Each check inspects one type of misconfiguration and reports the entities that violate it, called findings. For example, the `members-no-mfa` check reports each team member who can sign in without a second factor.

Every check has a risk level that determines how it affects your score:

| Risk level | Effect on the dashboard                                                       |
| ---------- | ----------------------------------------------------------------------------- |
| High       | Counts toward your score. Shown first, with a red segment in the progress bar. |
| Medium     | Counts toward your score. Shown with an amber segment in the progress bar.     |

The dashboard groups checks into two categories, [Account and authentication](#account-and-authentication-checks) and [Projects, deployments, and environment variables](#projects-deployments-and-environment-variables-checks), and orders them by risk level so the highest-priority work is at the top.

### Your security score

At the top of the dashboard, a progress bar summarizes how many checks pass and how many still need attention. The headline reads like `2 high and 1 medium issues remaining`, or `All recommended protections in place` when every check passes.

The bar has three segments:

- **Red**: high-risk checks with findings.
- **Amber**: medium-risk checks with findings.
- **Blue**: checks that pass or have every finding muted.

## Account and authentication checks

These checks cover your team's members and access tokens.

| Check                                             | Risk | What it checks                                                                                     | How to resolve                                                                                                             |
| ------------------------------------------------- | ---- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Team members without multi-factor authentication | High | Members who can sign in without a second factor, so a stolen password alone can take over the account. | [Enforce two-factor authentication](/docs/two-factor-enforcement) for the team so every member needs a second factor.     |
| Team owners to review                             | High | Fires when more than 30% of your team are owners. Extra owners widen the blast radius of a compromised account. | Review member [roles](/docs/rbac/access-roles) and demote owners who don't need full access.                              |
| Personal access tokens that never expire         | High | Personal access tokens with no expiration, which stay valid until someone revokes them manually.  | Recreate the token with an expiration from [account tokens](/docs/accounts/access-tokens).                                |

> **💡 Note:** Personal access tokens belong to individual accounts. You can't edit or delete
> another member's token, so ask the member who owns a flagged token to rotate
> it.

## Projects, deployments, and environment variables checks

These checks cover your team's projects, their deployment settings, and their environment variables.

| Check                                                         | Risk   | What it checks                                                                                     | How to resolve                                                                                                                                    |
| ------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Long-lived credentials where OIDC is available                | High   | Static credentials stored as environment variables where a short-lived token would work instead.  | Replace the static credential with [OIDC federation](/docs/oidc) so your app exchanges a short-lived token at runtime.                            |
| Projects without Git fork deploy prevention                   | High   | Projects where forked pull requests can deploy and read your environment variables without review. | Turn on [Git fork protection](/docs/project-configuration/security-settings#git-fork-protection) in the project's security settings.              |
| Projects without preview deployment protection                | High   | Preview deployments that anyone with the URL can reach.                                            | Enable [deployment protection](/docs/deployment-protection) so only authorized users can open preview URLs.                                       |
| Environment variables not marked Sensitive                    | Medium | Values that can be read back from the dashboard or API after they are written.                     | Mark the variable as [Sensitive](/docs/environment-variables/sensitive-environment-variables) so new values can't be read back once saved. Because the existing value was readable, [rotate it](/docs/environment-variables/rotating-secrets) when you make the change. |
| Environment variables older than 90 days                      | Medium | Variables that have not been rotated in over 90 days.                                              | [Rotate the secret](/docs/environment-variables/rotating-secrets), or delete the variable if it's no longer needed.                               |
| Environment variables exposed via a web application framework | Medium | Variables a web application framework exposes to the client, which increases the risk of a leak.   | Review your [framework environment variables](/docs/environment-variables/framework-environment-variables) and keep secrets server-only.          |

## Card states

The dashboard shows each check as a card. Its badge and icon reflect the check's current state:

| What the card shows                                       | Meaning                                                                                                             |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| A `High` or `Medium` risk badge                          | The check has findings and counts against your score. High-risk checks show a red badge, medium-risk an amber one. |
| A blue check-circle                                       | The check passes with no findings.                                                                                |
| A blue check-circle with a `Check muted` badge           | The whole check is muted and excluded from your score.                                                             |
| An `N muted` badge next to the risk badge or check-circle | Some of the check's findings are muted and excluded from your score.                                               |
| A `Data Unavailable` overlay                             | The check couldn't be computed. When your role lacks permission to read the data, the overlay reads `Insufficient Permissions`. |

## Act on findings

Each check appears as a card with its title, a short explanation of the risk, the number of findings, and the affected entities. Select an entity to jump to the setting where you can fix it, such as a member's row in your team settings or a project's deployment protection settings.

Cards also include actions that take you to the relevant settings, such as **Enforce 2FA** for the multi-factor authentication check or **Deployment Protection Settings** for preview protection. Once you resolve the underlying setting, the check shows as passing, with a blue check-circle, the next time the dashboard refreshes its checks.

## Mute a check or finding

Mute a check to hide its current and future findings, or mute a single finding to dismiss one entity while keeping the rest of the check active. Use muting for findings you have reviewed and accepted, so they stop counting against your score without hiding new issues elsewhere.

- **Muted checks and findings are excluded from your score** and listed separately, so your headline reflects only the work that remains.
- **You can add a reason** when you mute, which is recorded alongside who muted it and when.
- **Muting requires permission to manage your team.** Members without that permission can view checks but cannot mute them.

To reverse a mute, select the bell icon on the check again to unmute it, or unmute an individual finding from its row.

## Export findings to CSV

Export findings to a CSV file to share them or track them outside Vercel. Use the **Export CSV** button in the dashboard header to export every check, or export a single check from its card.

The CSV has four columns:

| Column      | Description                                                        |
| ----------- | ----------------------------------------------------------------- |
| Exported At | The timestamp of the export.                                      |
| Check       | The name of the check.                                            |
| Finding     | The affected entity. Grouped findings appear as `group / finding`. |
| Muted       | `Yes` if the finding is muted, otherwise `No`.                    |

## Run checks from the CLI

The [`vercel security`](/docs/cli/security) command runs the same checks as the Security Dashboard in your terminal. Use it to review your posture without leaving the command line, or to pipe the report into scripts and coding agents:

```bash filename="terminal"
# Run every check for the current team
vercel security

# List the individual findings behind each check
vercel security check --findings

# Scope the report to a single project
vercel security check --project my-app
```

The command outputs JSON in non-interactive environments, so you can run it in CI. A failing check still exits `0`, so gate a CI step on the report contents rather than the exit code. Because the report lists security findings, treat its output as sensitive and avoid writing it to shared or public logs. See the [`vercel security` reference](/docs/cli/security) for the full list of options.

## Who can access the Security Dashboard

Access to the Security Dashboard depends on your team role. Some checks read data that requires elevated permissions: when your role can't read the data behind a check, its card shows a `Data Unavailable` overlay labeled `Insufficient Permissions`, and the [`vercel security`](/docs/cli/security) command reports the check as `no access`. Muting checks and findings requires permission to manage your team. For an overview of team roles and what each can do, see [access roles](/docs/rbac/access-roles).

## Related

- [Vercel security overview](/docs/security)
- [`vercel security` CLI reference](/docs/cli/security)
- [Access roles](/docs/rbac/access-roles)
- [Deployment protection](/docs/deployment-protection)


---

[View full sitemap](/docs/sitemap)
