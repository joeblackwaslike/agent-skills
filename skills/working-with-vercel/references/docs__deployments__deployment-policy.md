---
title: Deployment Policies
product: vercel
url: /docs/deployments/deployment-policy
canonical_url: "https://vercel.com/docs/deployments/deployment-policy"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/deploy-hooks
  - /docs/integrations
  - /docs/deployments/managing-deployments
  - /docs/deployments/environments
summary: Learn about deployment policies on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/deployment-policy.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "4baf26a0815861252b5a3808a4dca77e7337f0f7b08247e7833ac482029e4d29"
---

# Deployment Policies

> **🔒 Permissions Required**: Deployment Policies

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
| **Git**                      | Deployments from a connected Git provider.               |
| **Vercel CLI**               | Deployments created with the Vercel CLI.                 |
| **REST API**                 | Deployments created through the REST API.                |
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
