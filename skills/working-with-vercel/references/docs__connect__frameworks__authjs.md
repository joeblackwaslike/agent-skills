---
title: Auth.js
product: vercel
url: /docs/connect/frameworks/authjs
canonical_url: "https://vercel.com/docs/connect/frameworks/authjs"
last_updated: 2026-08-28
type: tutorial
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/quickstart
  - /docs/connect/concepts/project-links
  - /docs/passport
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
summary: Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/authjs.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "d0007efedace2eb66a878957e7134baaecd466f6b05196580b0df88ecbcdaeab"
---

# Auth.js

> **🔒 Permissions Required**: Vercel Connect

[Auth.js](https://authjs.dev/) can use Vercel Connect as an OAuth provider for
signing users into your Next.js application. The `@vercel/connect/authjs`
entrypoint creates the provider configuration, handles Vercel authentication,
and maps the Connect user profile into an Auth.js user.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [How to identify and authorize visitors with the Vercel Passport token in Next.js](https://vercel.com/kb/guide/vercel-passport-nextjs?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Read the Vercel Passport token server-side in a Next.js app to identify visitors with the external_sub claim and authori
- [Better Auth](https://vercel.com/docs/connect/frameworks/better-auth?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Use Vercel Connect as a generic OAuth provider for Better Auth in a Next.js application.
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/frameworks/authjs.graph.md](/docs/connect/frameworks/authjs.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fauthjs&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

This tutorial uses TypeScript and the Next.js App Router.

## Prerequisites

Before you start, you need:

- A Next.js App Router project linked to Vercel.
- A Vercel Connect connector that supports user authorization.
- A project link between the connector and your Vercel project for each
  environment that will serve the Auth.js callback.
- The connector UID, such as `oauth/linear`, or its opaque `scl_...` identifier.
- An upstream OAuth application, if you use a custom OAuth connector. Register
  `https://connect.vercel.com/callback` as the redirect URI at the provider.
  Managed connectors handle this provider callback for you.

Follow the [Vercel Connect quickstart](/docs/connect/quickstart) to create a
connector and link it to your project.

> **💡 Note:** This integration signs a user into your application. It does not return an
> access token for calling the provider's API. See [Choose the correct
> integration](#choose-the-correct-integration) for the distinction.

## Configure Auth.js

- ### Install the packages
  Install Auth.js, its core types, and Vercel Connect:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i next-auth@beta @auth/core @vercel/connect
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i next-auth@beta @auth/core @vercel/connect
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i next-auth@beta @auth/core @vercel/connect
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i next-auth@beta @auth/core @vercel/connect
      ```
    </Code>
  </CodeBlock>
  The Auth.js adapter requires `@auth/core` version `0.37.0` or later.

- ### Configure local authentication
  Link your local directory and pull a development OpenID Connect (OIDC) token:
  ```bash filename="Terminal"
  vercel link
  vercel env pull
  ```
  The command writes `VERCEL_OIDC_TOKEN` to `.env.local`. Vercel provides this
  token automatically after deployment. The Connect adapter fetches an OIDC token
  for every token exchange, so you do not configure a static OAuth client secret.

  Add your connector UID and an Auth.js secret to `.env.local`:
  ```bash filename=".env.local"
  CONNECTOR_LINEAR=oauth/linear
  AUTH_SECRET=replace-with-a-random-secret
  ```
  Generate a long, random value for `AUTH_SECRET`, and do not commit
  `.env.local`.

- ### Add the Connect provider
  Create an Auth.js configuration and add the result of `connect()` to
  `AuthConfig.providers`:
  ```ts filename="auth.config.ts"
  import type { AuthConfig } from '@auth/core';
  import { connect } from '@vercel/connect/authjs';

  export const authConfig: AuthConfig = {
    providers: [
      connect({
        id: 'linear',
        name: 'Linear',
        connector: process.env.CONNECTOR_LINEAR!,
      }),
    ],
  };
  ```
  The options control these values:

  | Option      | Purpose                                                                 |
  | ----------- | ----------------------------------------------------------------------- |
  | `id`        | Auth.js provider ID. It also becomes the final callback URL path segment. |
  | `name`      | Provider name shown in your sign-in interface.                          |
  | `connector` | Connector UID or opaque `scl_...` identifier.                           |
  | `scopes`    | Optional scopes that replace the default scope list.                    |

  The example uses `linear` as the provider ID. Auth.js therefore handles these
  callback URLs:
  - Local: `http://localhost:3000/api/auth/callback/linear`
  - Production: `https://your-domain.example/api/auth/callback/linear`
  The route must be available on every origin where users sign in. Keep the
  provider ID consistent when you call `signIn()`. Do not register these Auth.js
  URLs with the upstream provider. The upstream provider redirects to Vercel
  Connect, and Vercel Connect redirects to your Auth.js callback.

- ### Initialize Auth.js
  Create the root Auth.js module:
  ```ts filename="auth.ts"
  import NextAuth from 'next-auth';
  import { authConfig } from './auth.config';

  export const { auth, handlers, signIn, signOut } = NextAuth(authConfig);
  ```
  This module exposes the route handlers, session helper, and server actions used
  by your application.

- ### Add the App Router route handler
  Create the Auth.js catch-all route and export both handlers:
  ```ts filename="app/api/auth/[...nextauth]/route.ts"
  import { handlers } from '@/auth';

  export const { GET, POST } = handlers;
  ```
  Auth.js now owns the sign-in, callback, sign-out, and session endpoints under
  `/api/auth`.

- ### Add sign-in and sign-out actions
  Use the provider ID from `connect()` when you start the sign-in flow:
  ```tsx filename="app/page.tsx"
  import { auth, signIn, signOut } from '@/auth';

  export default async function Home() {
    const session = await auth();

    if (!session?.user) {
      return (
        <form
          action={async () => {
            'use server';
            await signIn('linear');
          }}
        >
          <button type="submit">Sign in with Linear</button>
        </form>
      );
    }

    return (
      <main>
        <p>Signed in as {session.user.email ?? session.user.name}</p>
        <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </main>
    );
  }
  ```
  Run the application and select **Sign in with Linear**:
  ```bash filename="Terminal"
  pnpm dev
  ```
  After the provider and Vercel Connect consent flows finish, Auth.js redirects
  the browser to `/api/auth/callback/linear` and creates the session.

## Understand PKCE and refresh access

The provider created by `connect()` uses the OAuth 2.0 authorization code flow
with Proof Key for Code Exchange (PKCE). Auth.js creates the code verifier and
challenge, keeps the verifier in its secure cookie, and sends the verifier when
it exchanges the authorization code. You do not need to create PKCE parameters
or change the provider's `checks` setting.

The adapter also:

- Configures the OAuth client without a static client secret.
- Fetches a Vercel OIDC token for each request to the Connect token endpoint.
- Sends the connector identifier and Vercel OIDC token through HTTP Basic
  authentication for that token exchange.
- Adds `offline_access` once, even if your custom scope list already contains
  it, so Vercel Connect can mint refresh tokens.

## Request custom scopes

Without a `scopes` option, the adapter requests `openid`, `profile`, and
`email`. It then adds `offline_access`.

Passing `scopes` replaces the three defaults. Include every OpenID Connect and
provider scope your application needs:

```ts filename="auth.config.ts"
import type { AuthConfig } from '@auth/core';
import { connect } from '@vercel/connect/authjs';

export const authConfig: AuthConfig = {
  providers: [
    connect({
      id: 'linear',
      name: 'Linear',
      connector: process.env.CONNECTOR_LINEAR!,
      scopes: ['openid', 'profile', 'email', 'read'],
    }),
  ],
};
```

This configuration requests `openid profile email read offline_access`.
Confirm the provider supports each custom scope before adding it.

## Map the Connect profile

The Connect userinfo endpoint returns a `ConnectProfile`:

| Connect field    | Auth.js user field | Behavior                                      |
| ---------------- | ------------------ | --------------------------------------------- |
| `sub`            | `id`               | Required stable user identifier.              |
| `name`           | `name`             | Optional display name.                        |
| `email`          | `email`            | Uses `null` when Connect returns no email.     |
| `picture`        | `image`            | Optional profile image.                       |
| `email_verified` | Not mapped         | Available on `ConnectProfile` for custom use. |

To change the standard mapping, spread the generated provider and override its
`profile` function:

```ts filename="auth.config.ts"
import type { AuthConfig } from '@auth/core';
import {
  connect,
  type ConnectProfile,
} from '@vercel/connect/authjs';

const linear = connect({
  id: 'linear',
  name: 'Linear',
  connector: process.env.CONNECTOR_LINEAR!,
});

export const authConfig: AuthConfig = {
  providers: [
    {
      ...linear,
      profile(profile: ConnectProfile) {
        return {
          id: profile.sub,
          name: profile.name ?? profile.email ?? profile.sub,
          email: profile.email ?? null,
          image: profile.picture,
        };
      },
    },
  ],
};
```

Treat `sub` as opaque. Do not derive authorization decisions from its format.

## Understand authorization requirements

Authorization runs in your project's context. During the token exchange,
Vercel Connect authenticates the project with its OIDC token and applies the
connector's [project links](/docs/connect/concepts/project-links). The
connector and project must belong to the correct team, and the link must
include the current environment.

For local development, refresh the team and project context by running
`vercel link` and `vercel env pull` again if the OIDC token expires or points to
the wrong project.

## Choose the correct integration

Auth.js, provider API token access, and Vercel Passport solve different tasks:

| Task | Use | Result |
| ---- | --- | ------ |
| Sign users into your Next.js application through a Connect connector | `connect()` from `@vercel/connect/authjs` | An Auth.js user and application session |
| Call a provider API as an app or user | `getToken()` from `@vercel/connect` | A short-lived provider access token |
| Require identity before a visitor can reach a deployment | [Vercel Passport](/docs/passport) | Deployment protection enforced before your application route runs |

Do not use the Auth.js session token as a provider API token. If your signed-in
application also needs to call the provider, request a narrowly scoped token
with `getToken()` and an appropriate subject. See [Tokens](/docs/connect/concepts/tokens)
for token subjects and provider scopes.

Passport does not create an Auth.js session inside your application. It
protects the deployment at the Vercel layer. Use Auth.js when your application
needs its own sign-in flow, session callbacks, and user records.

## Next steps

- [Vercel Connect authentication](/docs/connect/concepts/authentication)
- [Vercel Connect tokens](/docs/connect/concepts/tokens)
- [Vercel Connect SDK reference](/docs/connect/ts-sdk-reference)
- [Vercel Passport overview](/docs/passport)


---

[View full sitemap](/docs/sitemap)
