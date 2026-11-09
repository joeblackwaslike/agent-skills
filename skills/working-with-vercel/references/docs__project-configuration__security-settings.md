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
  - /docs/rbac/managing-team-members
  - /docs/oidc
  - /docs/deployment-retention
summary: Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and Secure Backend Access with...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/security-settings.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "8723c1de41ce6cc25500f28047f122a0965cb4f84ef5bb59007c8f38d64d3c10"
---

# Security settings

To adjust your project's security settings:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Vercel security overview](https://vercel.com/docs/security) — Vercel provides built-in and customizable features to ensure that your site is secure.
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Deployment Protection on Vercel](https://vercel.com/docs/deployment-protection) — Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure p

Full cross-link map for this page: [/docs/project-configuration/security-settings.graph.md](/docs/project-configuration/security-settings.graph.md)
<!-- /docsgraph:related -->

1. Select your project from your [dashboard](/dashboard)
2. Open [**Security**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fsecurity\&title=Go+to+Security+settings) and select **Settings** in the sidebar

From here you can enable or disable [Attack Mode](/docs/vercel-firewall/attack-mode), [Vercel Support Code Visibility](#vercel-support-code-visibility), and [Git Fork Protection](#git-fork-protection).

## Build logs and source protection

Only you and authenticated members of your Vercel team can see the build logs and source code of your deployments. This also applies to the following paths on your deployment URLs and custom domains:

- `/_src`: Displays the source code and build output.
- `/_logs`: Displays the build logs.

Both paths redirect to the Vercel dashboard, where visitors must log in to Vercel as a member of your team.

This protection is always on and covers all of your deployments, including older ones. You can't disable it for a project or for a single deployment.

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

## Recently Deleted Deployments

This section lists the recently deleted deployments of your project. You can restore a deleted deployment during its recovery period. To learn more, see [Restoring a deleted deployment](/docs/deployment-retention#restoring-a-deleted-deployment).

To set a limit on how long Vercel keeps older deployments for your project, use the **Deployment Retention Policy** section of your project's **Build and Deployment** settings. To learn more, see [Deployment Retention Policy](/docs/deployment-retention).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
