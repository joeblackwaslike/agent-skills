---
title: Security settings
product: vercel
url: /docs/project-configuration/security-settings
canonical_url: "https://vercel.com/docs/project-configuration/security-settings"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/vercel-firewall/attack-mode
  - /docs/cli/deploy
  - /docs/project-configuration/vercel-json
  - /docs/rbac/managing-team-members
  - /docs/oidc
summary: Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibility, Git Fork Protection, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/security-settings.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "6089ed450d2331601c1b3a7400c246fbcccc4a3321c6c50ca41bae951e6d6ffa"
---

# Security settings

To adjust your project's security settings:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Vercel security overview](https://vercel.com/docs/security) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Restrict access to deployments with Vercel Authentication](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) — Vercel Authentication restricts access to your deployments so only authorized users can view and comment on your site.

Full cross-link map for this page: [/docs/project-configuration/security-settings.graph.md](/docs/project-configuration/security-settings.graph.md)
<!-- /docsgraph:related -->

1. Select your project from your [dashboard](/dashboard)
2. Open [**Security**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity\&title=Go+to+Security+settings) and select **Settings** in the sidebar

From here you can enable or disable [Attack Mode](/docs/vercel-firewall/attack-mode), [Logs and Source Protection](#build-logs-and-source-protection), [Vercel Support Code Visibility](#vercel-support-code-visibility) and [Git Fork Protection](#git-fork-protection).

## Build logs and source protection

By default, the following paths mentioned below can only be accessed by you and authenticated members of your Vercel team:

- `/_src`: Displays the source code and build output.
- `/_logs`: Displays the build logs.

> **💡 Note:** Disabling **Build Logs and Source Protection** will make your source code and
> logs publicly accessible. **Do not** edit this setting if you don't want them
> to be publicly accessible. <br /><br />

None of your existing deployments will be affected when you toggle this
setting. If you'd like to make the source code or logs private on your
existing deployments, the only option is to delete these deployments.

This setting is overwritten when a deployment is created using Vercel CLI with the [`--public` option](/docs/cli/deploy#public) or the [`public` property](/docs/project-configuration/vercel-json#public) is used in `vercel.json`.

> **💡 Note:** For deployments created before July 9th, 2020 at 7:05 AM (UTC), only the
> Project Settings is considered for determining whether the deployment's Logs
> and Source are publicly accessible or not. It doesn't matter if the `--public`
> flag was passed when creating those Deployments.

## Vercel Support Code Visibility

> Vercel Support Code Visibility is available on Enterprise and Pro plans

This setting controls whether the Vercel Support team can view your deployment's source code. By default, it's disabled, so the source code is visible only to you and your team. The Vercel Support team might ask you to enable it to troubleshoot specific issues related to your source code. To allow them, open [Security](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity\&title=Project+Security+Settings), enable **Vercel Support Code Visibility**, and click **Save**, then confirm by entering your `team-slug/project-name` and clicking Enable.

## Git fork protection

If you receive a pull request from a fork of your repository, Vercel will require authorization from you or a [Team Member](/docs/rbac/managing-team-members) to deploy the pull request.

This behavior protects you from leaking sensitive project information such as environment variables and the [OIDC Token](/docs/oidc).

You can disable this protection in the Security section of your Project Settings.

> **💡 Note:** Do not disable this setting until you review Environment Variables in your
> project as well as `vercel.json` in your source code.

## Secure Backend Access with OIDC Federation

This feature allows you to secure access to your backend services by using short-lived, non-persistent tokens that are signed by Vercel's OIDC Identity Provider (IdP).

To learn more, see [Secure Backend Access with OIDC Federation](/docs/oidc).

## Deployment Retention Policy

Deployment Retention Policy allows you to set a limit on how long older deployments are kept for your project. To learn more, see [Deployment Retention Policy](/docs/deployment-retention).

This section also provides information on the recently deleted deployments


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
