---
title: Security settings
product: vercel
url: /docs/project-configuration/security-settings
canonical_url: "https://vercel.com/docs/project-configuration/security-settings"
last_updated: 2026-05-08
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/attack-mode
  - /docs/cli/deploy
  - /docs/project-configuration
  - /docs/rbac/managing-team-members
  - /docs/oidc
summary: Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibility, Git Fork Protection, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/security-settings.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "f94719804e65e1d83c71d66eb3573b3af1bca3e592a68543a7fb9cc06447794b"
---

# Security settings

To adjust your project's security settings:

1. Select your project from your [dashboard](/dashboard)
2. Open **Settings** in the sidebar and select [**Security**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity\&title=Go+to+Security+settings)

From here you can enable or disable [Attack Mode](/docs/attack-mode), [Logs and Source Protection](#build-logs-and-source-protection), [Vercel Support Code Visibility](#vercel-support-code-visibility) and [Git Fork Protection](#git-fork-protection).

## Build logs and source protection

By default, the following paths mentioned below can only be accessed by you and authenticated members of your Vercel team:

- `/_src`: Displays the source code and build output.
- `/_logs`: Displays the build logs.

> **⚠️ Warning:** Disabling **Build Logs and Source Protection** will make your source code and
> logs publicly accessible. **Do not** edit this setting if you don't want them
> to be publicly accessible.&#x20;

None of your existing deployments will be affected when you toggle this
setting. If you’d like to make the source code or logs private on your
existing deployments, the only option is to delete these deployments.

This setting is overwritten when a deployment is created using Vercel CLI with the [`--public` option](/docs/cli/deploy#public) or the [`public` property](/docs/project-configuration#public) is used in `vercel.json`.

> **💡 Note:** For deployments created before July 9th, 2020 at 7:05 AM (UTC), only the
> Project Settings is considered for determining whether the deployment's Logs
> and Source are publicly accessible or not. It doesn't matter if the `--public`
> flag was passed when creating those Deployments.

## Vercel Support Code Visibility

> **🔒 Permissions Required**: Vercel Support Code Visibility

Vercel provides a setting that controls the visibility of your source code to our Vercel Support team. By default, this setting is disabled, ensuring that your code remains confidential and accessible only to you and your team.
Our Vercel Support team might request for this setting to be enabled to troubleshoot specific issues related to your code.

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

Deployment Retention Policy allows you to set a limit on how long older deployments are kept for your project. To learn more, see [Deployment Retention Policy](/docs/security/deployment-retention).

This section also provides information on the recently deleted deployments


---

[View full sitemap](/docs/sitemap)
