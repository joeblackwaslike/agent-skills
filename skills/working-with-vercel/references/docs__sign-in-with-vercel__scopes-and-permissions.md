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
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "bf47c77712e329b4ce22f4a1a9dbfe5b4cd27ce5c9f3f44f34490eca5d59bb44"
---

# Scopes and Permissions

Scopes define what data is included in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token) and whether to issue a [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token). Permissions control what APIs and team resource an [Access Token](/docs/sign-in-with-vercel/tokens#access-token) can interact with.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Manage from Dashboard](https://vercel.com/docs/sign-in-with-vercel/manage-from-dashboard?from=related) — Learn how to manage Sign in with Vercel from the Dashboard
- [Access tokens](https://vercel.com/docs/accounts/access-tokens?from=related) — Create and scope Vercel access tokens to your full account, a team, or a single project, then use them to authenticate A
- [Permissions and Access](https://vercel.com/docs/integrations/install-an-integration/manage-integrations-reference?from=related) — Learn how to manage project access and added products for your integrations.
- [RBAC](https://vercel.com/docs/rbac?from=related) — Learn how to manage team members on Vercel, and how to assign roles to each member with role-based access control \(RBAC
- [Restricting Git Connections to a single Vercel team](https://vercel.com/docs/protected-git-scopes?from=related) — Information to stop developers from deploying their repositories to a personal Vercel account by using Protected Git Sco

Full cross-link map for this page: [/docs/sign-in-with-vercel/scopes-and-permissions.graph.md](/docs/sign-in-with-vercel/scopes-and-permissions.graph.md)
<!-- /docsgraph:related -->

## Scopes

The following scopes are available:

| Scope            | Description                                                                                                                                                                             |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `openid`         | Required permission, needed to issue an [ID Token](/docs/sign-in-with-vercel/tokens#id-token) for user identification.                                                                  |
| `email`          | Enabling this scope grants access to the user's email address in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token).                                                             |
| `profile`        | Enabling this scope grants access to the user's basic profile information, including name, username, and profile picture, in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token). |
| `offline_access` | Enabling this scope issues a [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token).                                                                                           |

## Permissions

> **💡 Note:** Permissions for issuing API requests and interacting with team resources are
> currently in private beta.


---

[View full sitemap](/docs/sitemap)
