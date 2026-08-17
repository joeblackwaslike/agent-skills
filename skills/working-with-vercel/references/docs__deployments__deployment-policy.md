---
title: Deployment Policies
product: vercel
url: /docs/deployments/deployment-policy
canonical_url: "https://vercel.com/docs/deployments/deployment-policy"
last_updated: 2026-07-14
type: how-to
prerequisites:
  - /docs/deployments
related:
  - /docs/deployments
  - /docs/cli
  - /docs/rest-api
  - /docs/deploy-hooks
  - /docs/integrations
summary: Use a deployment policy to control which Git sources and deployment mechanisms can deploy to your team and projects, per environment.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/deployment-policy.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "43ef736db03ddb9aeb689e228658eb667009b0aa669ca2432cb08a23a2374e79"
---

# Deployment Policies

> **🔒 Permissions Required**: Deployment Policies


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Deployment Retention](https://vercel.com/docs/deployment-retention?from=related) — Learn how Deployment Retention policies affect a deployment's lifecycle
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Git Integrations](https://vercel.com/docs/git?from=related) — Vercel allows for automatic deployments on every branch push and merges onto the production branch of your GitHub, GitLa
- [Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Project Settings](https://vercel.com/docs/project-configuration/project-settings?from=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/deployments/deployment-policy.graph.md](/docs/deployments/deployment-policy.graph.md)
<!-- /docsgraph:related -->

Deployment Policies are a set of rules that control which Git sources and deployment mechanisms can create deployments for your team and projects. You can define default rules for a team, and override these as neccesary per project. For example, you can require that production only accepts deployments from a specific repository while preview stays open to any source.

A policy has two independent rules that can be configured:

- **Git Sources** restrict which Git providers, organizations, and repositories can deploy.
- **Deployment Sources** restrict which mechanisms, such as Git, the Vercel CLI, or Deploy Hooks, can deploy.

Policies configured at the team level apply to every project on the team. Each project inherits the team policy by default, but can choose to override it with its own rules.

## Rules

Each rule applies to one or more environments that you select, and an environment can belong to at most one rule of the same type.

Rules can be created and saved before they are enforced. When a rule is not enforced, Vercel keeps your configuration but stops applying it, so you can pause a rule without deleting it.

Environments come in two kinds:

- **System environments**: Production and Preview.
- **Custom environments**: any custom environments you've created on the project. Custom environments are only available when you edit a project's policy.

### Git Sources

Git Sources rules limit which Git providers, organizations, and repositories can deploy to the selected environments.

To restrict Git sources for a team:

1. Open your team's [Git Sources settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%23git-sources\&title=Go+to+Git+Sources+Settings).
2. Select **Add Rule** and choose the environments the rule applies to.
3. Select **Add Source**, choose a provider, and enter the organization or namespace. Leave the repository or project field empty to allow any repository under that organization or namespace.
4. Select **Save**.

### Deployment Sources

Deployment Sources rules limit which mechanisms can deploy to the selected environments. You can allow or block each of the following:

| Source                       | Description                                              |
| ---------------------------- | -------------------------------------------------------- |
| **Git**                      | Deployments from a connected [Git provider](/docs/deployments#git). |
| **Vercel CLI**               | Deployments created with the [Vercel CLI](/docs/cli).    |
| **v0**                       | Deployments created from [v0](https://v0.app) projects without a Git connection. |
| **REST API**                 | Deployments created through the [REST API](/docs/rest-api). |
| **Deploy Hooks**             | Deployments triggered by a project [Deploy Hook](/docs/deploy-hooks) URL. |
| **Marketplace Integrations** | Deployments from a third-party [Marketplace](/docs/integrations) integration. |

To restrict deployment sources for a team:

1. Open your team's [Deployment Sources settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fbuild-and-deployment%23deployment-sources\&title=Go+to+Deployment+Sources+Settings).
2. Select **Add Rule** and choose the environments the rule applies to.
3. Select the sources you want to allow. Clear a source to block it.
4. Select **Save**.

## Overriding team policies

By default, a project inherits its team's deployment policy. You can override either part of the policy on a single project without affecting the rest of the team.

1. Open your project's [build and deployment settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment\&title=Go+to+Build+and+Deployment+Settings).
2. For **Git Sources** or **Deployment Sources**, switch from **Inherit** to **Override**.
3. Edit the rules for the project, then select **Save**.

To stop overriding and return to the team policy, switch the section back to **Inherit** and save. Inherited rules are shown as a read-only summary, with a link to view the team policy.

## Related

- [Managing deployments](/docs/deployments/managing-deployments)
- [Deploy Hooks](/docs/deploy-hooks)
- [Environments](/docs/deployments/environments)


---

[View full sitemap](/docs/sitemap)
