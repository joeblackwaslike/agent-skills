---
title: Scopes and Permissions
product: vercel
url: /docs/sign-in-with-vercel/scopes-and-permissions
canonical_url: "https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions"
last_updated: 2026-02-26
type: how-to
prerequisites:
  - /docs/sign-in-with-vercel
related:
  - /docs/sign-in-with-vercel/tokens
summary: Learn how to manage scopes and permissions for Sign in with Vercel
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/sign-in-with-vercel/scopes-and-permissions.md"
fetched_at: "2026-10-05T11:22:20.527Z"
sha256: "a664e7a56c6f71e0d283fa75603e20eb8da0e26b4c4863383e2e36ed15db7c1c"
---

# Scopes and Permissions

Scopes define what data is included in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token) and whether to issue a [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token). Permissions control what APIs and team resource an [Access Token](/docs/sign-in-with-vercel/tokens#access-token) can interact with.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sign in with Vercel now generally available](https://vercel.com/changelog/sign-in-with-vercel?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related)
- [How do I use a Vercel API Access Token?](https://vercel.com/kb/guide/how-do-i-use-a-vercel-api-access-token?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Create a Vercel API access token, scope it to your account, a team, or a project, and use it to authenticate Vercel REST
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Learn how to manage project access and added products for your integrations.
- [Access tokens](https://vercel.com/docs/accounts/access-tokens?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate A
- [Manage Sign in with Vercel from the Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [Extended permissions](https://vercel.com/docs/rbac/access-roles/extended-permissions?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Learn about extended permissions in Vercel's RBAC system. Understand how to combine roles and permissions for precise ac
- [Project Level Roles](https://vercel.com/docs/rbac/access-roles/project-level-roles?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=related) — Learn about the project level roles and their permissions.

Full cross-link map for this page: [/docs/sign-in-with-vercel/scopes-and-permissions.graph.md](/docs/sign-in-with-vercel/scopes-and-permissions.graph.md?from=related&source_path=%2Fdocs%2Fsign-in-with-vercel%2Fscopes-and-permissions&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Scopes

The following scopes are available:

| Scope | Description |
| --- | --- |
| `openid` | Required permission, needed to issue an [ID Token](/docs/sign-in-with-vercel/tokens#id-token) for user identification. |
| `profile` | Enabling this scope grants access to the user's basic profile information, including name, username, and profile picture, in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token). |
| `email` | Enabling this scope grants access to the user's email address in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token). |
| `offline_access` | Enabling this scope issues a [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token). |


## Permissions

> **💡 Note:** Permissions for issuing API requests and interacting with team resources are
> currently in private beta.

Each permission covers one resource or product, such as Deployments or Domains. Some permissions offer a single access option, while others let the user choose one, such as **Read Only** or **Read and Write**. The option the user grants sets what an [Access Token](/docs/sign-in-with-vercel/tokens#access-token) can do with the resource:

| Access         | Description                                                            |
| -------------- | ---------------------------------------------------------------------- |
| Read Only      | Read the resource's data.                                              |
| Read and Write | Read and change the resource's data.                                   |
| Manage         | Enable or disable a product. Includes everything **Read Only** grants. |
| Use            | Use a capability without access to view the resource it consumes.      |

Permissions are grouped by where a user grants them: to a team or to a project.

The following permissions are available:

### Team Permissions

| Permission | Access | Description |
| --- | --- | --- |
| Access Groups | Read Only | Read Access Groups. |
| Activity Events | Read Only | Read activity events. |
| AI Gateway | Use | Use AI Gateway. |
| AI Gateway API Keys | Read and Write | Read and make changes to AI Gateway API keys. |
| AI Gateway Guardrails | Read Only, Read and Write | Read and manage AI Gateway guardrails. |
| AI Gateway Private Models | Read Only, Read and Write | Read and manage AI Gateway private model configurations. |
| AI Gateway Rules | Read Only, Read and Write | Read and manage AI Gateway routing rules. |
| AI Gateway Virtual Models | Read Only, Read and Write | Read and manage AI Gateway virtual model configurations. |
| Alerts | Read Only, Read and Write | Read and manage alerts and alert rules. |
| All Environment Variables | Read and Write | Manage all project environment variables. |
| Automations | Read Only, Read and Write | Read and manage automations. |
| Billing | Read Only, Read and Write | Read billing information and make purchases. |
| Blob | Read and Write | Manage Blob storage. |
| Connectors | Read Only, Read and Write | Create, configure, connect, and remove Vercel Connect connectors. |
| Container Registry | Read Only, Read and Write | Read and manage container registry images and tags. |
| Domains | Read Only, Read and Write | Read and make changes to domains. |
| Drains | Read and Write | Manage Drains. |
| Global Config | Read and Write | Manage Global Config. |
| Integration Configurations | Read Only, Read and Write | Read and make changes to integration configurations. |
| Integration Resources | Read Only, Read and Write | Read and make changes to integration resources. |
| KMS | Read Only, Read and Write | Read and manage KMS issuers and project grants. |
| Messageboard | Read Only, Read and Write | Create, update, and delete team boards, spaces, and tasks. |
| Monitoring | Read Only | Read Monitoring data. |
| Remote Cache | Read Only, Read and Write | Manage Remote Cache. |
| Team | Read Only | Read your Vercel team data. |
| Team Members | Read and Write | Invite, remove, and change the roles of team members. |
| Webhooks | Read Only | List webhooks. |


### Project Permissions

| Permission | Access | Description |
| --- | --- | --- |
| CDN Cache | Read and Write | Manage CDN Cache. |
| Deployments | Read Only, Read and Write | Read and make changes to deployments. |
| Domain Registrar | Read and Write | Buy or transfer-in new domains. |
| Firewall | Read Only, Read and Write | Read and manage Firewall configuration and IP blocking rules. |
| Flags | Read Only | Read feature flags. |
| Non-Production Environment Variables | Read Only, Read and Write | Manage non-production project environment variables. |
| Non-Production Flags | Read and Write | Manage non-production feature flags. |
| Production Environment Variables | Read Only, Read and Write | Manage production project environment variables. |
| Production Flags | Read and Write | Manage production feature flags. |
| Project Protection Bypass | Read and Write | Manage project protection bypass rules. |
| Project Trusted Sources | Read Only, Read and Write | Read and manage project trusted sources. |
| Projects | Read Only, Read and Write | Read and make changes to authorized projects. |
| Sandboxes | Read Only, Read and Write | Read and manage sandboxes. |
| Schedules | Read Only, Read and Write | Read, manage, and manually invoke project schedules. |
| Speed Insights | Read Only, Manage | Enable or disable Speed Insights. |
| Web Analytics | Read Only, Manage | Enable or disable Web Analytics. |


---

[View full sitemap](/docs/sitemap)
