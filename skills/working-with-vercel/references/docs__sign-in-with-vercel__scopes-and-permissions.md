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
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "23b49748ab389b9251b54bfdf07b602620f39d552354f234455965a512d5fd2f"
---

# Scopes and Permissions

Scopes define what data is included in the [ID Token](/docs/sign-in-with-vercel/tokens#id-token) and whether to issue a [Refresh Token](/docs/sign-in-with-vercel/tokens#refresh-token). Permissions control what APIs and team resource an [Access Token](/docs/sign-in-with-vercel/tokens#access-token) can interact with.

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
