# Choosing a GitHub Auth Strategy

You are building an integration against the GitHub API and have to decide how it
authenticates. There are three real options — Personal Access Tokens (PATs),
OAuth Apps, and GitHub Apps — and they are not interchangeable. The single most
important question is **who acts**: a *user* (and the API call is attributed to
that person, scoped by what *they* can see) or an *installation* (a bot identity
that outlives any individual user and is scoped to specific repos). Get that
axis right and the rest follows.

## Decision matrix

| Axis | Personal Access Token | OAuth App | GitHub App |
| --- | --- | --- | --- |
| **Who acts** | The user who minted the token | A user who authorized the app | An *installation* (bot identity) — optionally a user, on behalf of |
| **Scoping** | Classic: coarse scopes (`repo`, `read:org`); fine-grained: per-repo + per-permission | Coarse OAuth scopes only (`repo`, `gist`, …); all-or-nothing on a scope | Fine-grained permissions chosen at registration; installer picks which repos |
| **Rate limit** | 5,000 req/hr per user | 5,000 req/hr per user who authorized | Per *installation*; scales with installed repos/seats up to 15,000 req/hr; can run many installations in parallel |
| **Token lifetime** | Classic: optional expiry; fine-grained: max 1 year. Long-lived secret | User token lives until revoked (no expiry by default) | App JWT ≤10 min; installation token 1 hr; user token 8 hr (refreshable) |
| **Revocation** | User deletes the token | User revokes the grant | Org admin uninstalls; per-token revoke; key rotation kills all JWTs |
| **Who installs / consents** | One user, manually | Each user clicks "Authorize" | An org/repo admin installs once; users need not consent for server-to-server work |
| **Multi-tenant / marketplace** | No | Per-user only; no per-org install model | Yes — designed for it; one app, many installations, Marketplace-listable |

## When to pick each

**Personal Access Token** — personal scripts, cron jobs, CI secrets, one-off
automation that acts *as you*. Cheap to create, but it is a long-lived bearer
secret tied to a human account: if it leaks, an attacker gets everything in its
scope, and if the human leaves the org the automation dies. Prefer
**fine-grained PATs** (see below). Reach for a PAT only when standing up an App
is overkill and the work genuinely is "me, automated."

**OAuth App** — you need to act *on behalf of a user* and want their identity:
"Login with GitHub," reading the repos *this signed-in user* can see, opening
PRs attributed to them. The model is per-user consent; there is no installation
and no bot identity. OAuth Apps cannot scope down to specific repos (a granted
`repo` scope means *all* the user's repos) and the tokens don't expire by
default — so a leaked token is dangerous for a long time. For new builds,
prefer a **GitHub App with user access tokens**, which gives you the same
"act as the user" flow *plus* expiring tokens and per-repo scoping.

**GitHub App** — **the default for bots, integrations, and anything
multi-tenant.** Scoped (only the permissions you declared, only the repos the
installer selected), revocable (uninstall kills access instantly), higher and
independently-pooled rate limits, and a stable bot identity that outlives any
user. This is what you want for a webhook consumer that comments on PRs, a CI
checks provider, a Marketplace listing, or any "install once, runs forever"
automation. The extra setup cost (private key, JWT signing, installation token
exchange) is real but small, and Octokit handles it for you.

> Rule of thumb: **default to a GitHub App.** Drop to a PAT only for personal
> scripts/CI, and use an OAuth App only if you specifically need the per-user
> consent model and a GitHub App's user tokens won't do.

## Token types produced by a GitHub App

A GitHub App juggles three distinct credentials. Knowing which is which is the
whole game:

1. **App JWT (app-level).** Signed locally with the app's RSA private key using
   `RS256`. Proves "I am this app." Lifetime ≤10 minutes (GitHub enforces the
   cap). Used only for app-management endpoints — listing installations,
   creating installation tokens. You never call repo endpoints with it.

   ```ts
   import { createAppAuth } from "@octokit/auth-app";

   const auth = createAppAuth({ appId, privateKey });
   const { token: jwt } = await auth({ type: "app" }); // a short-lived JWT
   ```

2. **Installation access token (server-to-server).** Minted by exchanging the
   JWT at `POST /app/installations/{installation_id}/access_tokens`. Lives
   **1 hour**, is scoped to exactly the repos and permissions of that
   installation, and is the credential you use for almost all real work. The bot
   acts as itself, not as a user.

   ```ts
   const installationAuth = await auth({ type: "installation", installationId });
   // installationAuth.token — use this for octokit.rest.* calls
   ```

3. **User access token (on behalf of a user).** Obtained via the OAuth-style
   web flow when you need to act *as a logged-in user* (e.g. to attribute an
   action to them or read their personal access). For GitHub Apps these tokens
   **expire after 8 hours** and come with a refresh token (this expiry is
   opt-in per app but recommended). Distinct from an OAuth App token, which
   doesn't expire.

   ```ts
   const userAuth = await auth({
     type: "oauth-user",
     code, // from the OAuth redirect ?code=...
   });
   ```

`@octokit/auth-app` (and the higher-level `App` from the `octokit` package)
manages all three transparently: it signs and refreshes the JWT, caches
installation tokens (up to ~15,000) and re-mints them on expiry, and runs the
user web flow. You rarely touch the raw HTTP.

## Fine-grained PATs replace classic PATs

Classic PATs use broad, blunt scopes — `repo` grants read/write to *every*
repository the user can touch, across every org. **Fine-grained PATs** (now GA
and the recommended default) fix this:

- Pick a specific **resource owner** (your account or one org).
- Select **specific repositories** (or all repos for that owner).
- Grant **granular per-resource permissions** (e.g. "Issues: read", "Contents:
  write") instead of one coarse scope.
- **Mandatory expiration**, max one year.
- Org owners can require/approve them and audit usage centrally.

For any new PAT-based script, create a fine-grained token scoped to the minimum
repos and permissions. Reserve classic PATs only for the handful of APIs
fine-grained tokens don't yet cover. And remember: even a perfectly-scoped PAT
is still a long-lived bearer secret tied to a human — if the automation is
meant to outlive you or serve other people, it should be a GitHub App.
