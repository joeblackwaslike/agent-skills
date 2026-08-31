---
title: Better Auth
product: vercel
url: /docs/connect/frameworks/better-auth
canonical_url: "https://vercel.com/docs/connect/frameworks/better-auth"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/concepts/authentication
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/tokens
  - /docs/passport
  - /docs/connect/quickstart
summary: Use Vercel Connect as a generic OAuth provider for Better Auth in a Next.js application.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/better-auth.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "c736751ea876a8803bdc92eb2e5c7ada302a3de40746849a0d575625b9b3eb29"
---

# Better Auth

> **🔒 Permissions Required**: Vercel Connect


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The complete guide to authentication on Vercel](https://vercel.com/kb/guide/complete-guide-authentication-vercel?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Learn how to implement authentication in your Vercel applications. Covers NextAuth/Auth.js setup, environment variable c
- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related)
- [Auth.js](https://vercel.com/docs/connect/frameworks/authjs?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [For Service Providers](https://vercel.com/docs/connect/providers?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — What your service needs to declare so Vercel Connect can discover, register, and authorize against it using standard OAu
- [SDK Reference](https://vercel.com/docs/connect/ts-sdk-reference?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — API reference for @vercel/connect, the TypeScript SDK for requesting runtime tokens from Vercel Connect.
- [AI SDK and MCP](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,

Full cross-link map for this page: [/docs/connect/frameworks/better-auth.graph.md](/docs/connect/frameworks/better-auth.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fbetter-auth&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The `@vercel/connect/betterauth` adapter lets your application sign users in
through a Vercel Connect connector. It configures Better Auth's
[`genericOAuth`](https://www.better-auth.com/docs/plugins/generic-oauth)
plugin to use the Vercel Connect OAuth gateway.

This tutorial uses a Next.js App Router application. After you finish, a user
can select a sign-in button, authorize the connector, and return with a Better
Auth session.

## Prerequisites

Before you start, make sure you have:

- A Vercel project with [OIDC authentication](/docs/connect/concepts/authentication)
- A Better Auth database, or a PostgreSQL database for the example in this guide
- An OAuth connector whose identity response includes a stable subject, email,
  and name for the signing-in user
- A [project link](/docs/connect/concepts/project-links) between the connector
  and every Vercel environment that runs the application
- Node.js 18 or later

If you supply your own OAuth application credentials when creating the
connector, add `https://connect.vercel.com/callback` as an allowed redirect URI
in the provider's application settings. This URI returns the provider's
response to Vercel Connect. It is different from the Better Auth callback in
your application.

> **💡 Note:** This guide uses `slack/acme-slack` as the connector UID and `slack` as the
> Better Auth provider ID. Replace both values with your connector and a stable
> provider ID for your application.

## Configure sign-in

- ### Link your local project
  Link your application to the Vercel project that can use the connector. Then
  pull a development OIDC token:
  ```bash filename="terminal"
  vercel link
  vercel env pull
  ```
  `vercel env pull` adds `VERCEL_OIDC_TOKEN` to `.env.local`. The adapter uses
  this token to authenticate the authorization-code exchange. Vercel provides
  and rotates the token automatically after you deploy.

  If the connector is not linked to the project yet, attach it:
  ```bash filename="terminal"
  vercel connect attach slack/acme-slack
  ```
  By default, this enables Production, Preview, and Development. Configure
  Custom Environments separately. See [Project links](/docs/connect/concepts/project-links)
  for environment controls.

- ### Install the dependencies
  Install Better Auth, Vercel Connect, and the PostgreSQL client used in this
  example:
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @vercel/connect better-auth pg
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @vercel/connect better-auth pg
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @vercel/connect better-auth pg
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @vercel/connect better-auth pg
      ```
    </Code>
  </CodeBlock>
  If your Better Auth application already has a database adapter, keep it and
  omit `pg`.

- ### Set environment variables
  Add the Better Auth settings, your database connection, and the connector UID
  to `.env.local`:
  ```bash filename=".env.local"
  BETTER_AUTH_SECRET=replace-with-at-least-32-random-characters
  BETTER_AUTH_URL=http://localhost:3000
  DATABASE_URL=postgresql://user:password@host:5432/database
  CONNECTOR_SLACK=slack/acme-slack
  ```
  Generate a high-entropy Better Auth secret with
  `openssl rand -base64 32`. Set `BETTER_AUTH_URL` to your production origin in
  Production.

- ### Configure Better Auth
  Create the Better Auth server configuration:
  ```ts filename="lib/auth.ts"
  import { Pool } from 'pg';
  import { betterAuth } from 'better-auth';
  import { genericOAuth } from 'better-auth/plugins/generic-oauth';
  import {
    connect,
    ConnectError,
  } from '@vercel/connect/betterauth';

  export const auth = betterAuth({
    secret: process.env.BETTER_AUTH_SECRET!,
    baseURL: process.env.BETTER_AUTH_URL!,
    database: new Pool({
      connectionString: process.env.DATABASE_URL!,
    }),
    plugins: [
      genericOAuth({
        config: [
          connect({
            providerId: 'slack',
            connector: process.env.CONNECTOR_SLACK!,
          }),
        ],
      }),
    ],
    onAPIError: {
      errorURL: '/sign-in',
      onError(error) {
        if (error instanceof ConnectError) {
          console.error('Vercel Connect sign-in failed', {
            code: error.code,
            status: error.status,
            statusText: error.statusText,
          });
          return;
        }
        console.error('Better Auth request failed', error);
      },
    },
  });
  ```
  The `connector` value can be a human-readable UID such as
  `slack/acme-slack` or an opaque connector key that starts with `scl_`.
  `providerId` belongs to Better Auth. It appears in Better Auth routes and
  account records, so keep it stable.

  If this is a new Better Auth database, create its tables:
  ```bash filename="terminal"
  pnpm dlx auth@latest migrate
  ```

- ### Mount the Better Auth route
  Expose Better Auth's catch-all handler:
  ```ts filename="app/api/auth/[...all]/route.ts"
  import { toNextJsHandler } from 'better-auth/next-js';
  import { auth } from '@/lib/auth';

  export const { GET, POST } = toNextJsHandler(auth);
  ```
  The generic OAuth plugin mounts its callback under this handler. For the
  `slack` provider ID, the callback is:
  ```text
  http://localhost:3000/api/auth/oauth2/callback/slack
  ```
  In Production, Better Auth uses your `BETTER_AUTH_URL` origin. You do not need
  to create another callback route.

- ### Create the client
  Add the generic OAuth client plugin:
  ```ts filename="lib/auth-client.ts"
  import { createAuthClient } from 'better-auth/react';
  import { genericOAuthClient } from 'better-auth/client/plugins';

  export const authClient = createAuthClient({
    plugins: [genericOAuthClient()],
  });
  ```
  Create a sign-in button:
  ```tsx filename="app/sign-in/sign-in-button.tsx"
  'use client';

  import { authClient } from '@/lib/auth-client';

  export function SignInButton() {
    async function signIn() {
      const { error } = await authClient.signIn.oauth2({
        providerId: 'slack',
        callbackURL: '/',
        errorCallbackURL: '/sign-in',
      });

      if (error) {
        console.error('Could not start sign-in', error);
      }
    }

    return <button onClick={signIn}>Sign in with Slack</button>;
  }
  ```
  Render the button from a page:
  ```tsx filename="app/sign-in/page.tsx"
  import { SignInButton } from './sign-in-button';

  export default function SignInPage() {
    return (
      <main>
        <h1>Sign in</h1>
        <SignInButton />
      </main>
    );
  }
  ```
  `providerId` must match the value passed to `connect()`. `callbackURL` is the
  page Better Auth opens after a successful sign-in. It is not the OAuth
  callback route.

- ### Test the flow
  Start your application with `.env.local` loaded, then open the sign-in page:
  ```bash filename="terminal"
  pnpm dev
  ```
  Select **Sign in with Slack**. Better Auth redirects the browser to the Vercel
  Connect OAuth gateway. After authorization, the gateway returns to
  `/api/auth/oauth2/callback/slack`. Better Auth creates or updates the user and
  redirects to `/`.

## Configure scopes

By default, `connect()` requests these scopes:

```text
openid profile email offline_access
```

The adapter adds `offline_access` automatically, including when you provide a
custom scope list. It also removes duplicate scopes.

Pass `scopes` when your connector needs other scopes. Include the identity
scopes that your sign-in flow needs:

```ts
connect({
  providerId: 'slack',
  connector: process.env.CONNECTOR_SLACK!,
  scopes: ['openid', 'profile', 'email', 'channels:read'],
})
```

The resulting request includes `offline_access` without requiring you to add
it. Only request scopes that your application needs and that the connector's
provider supports.

## Understand authorization requirements

Authorization runs in your project's context. The token exchange requires a
Vercel OIDC token, and the connector must belong to your team, with a
[project link](/docs/connect/concepts/project-links) that includes the calling
project and environment. The `getVercelOidcToken` option on `connect()` is
available for tests or runtimes that mint this token another way.

## Handle Connect errors

The adapter throws `ConnectError` when the gateway cannot exchange the
authorization code or fetch user information. The class exposes:

- `code`: a machine-readable Connect or provider error code
- `status` and `statusText`: the gateway HTTP response
- `vendor`: structured details returned by the upstream provider, when present

The `onAPIError` handler in the server configuration logs safe fields when
Better Auth passes through the original adapter error. Do not send raw
token-exchange responses or the `vendor` payload to the browser.

If the gateway returns no access token for its user information request, the
adapter throws a `ConnectError` with the code `missing_access_token`. Use the
error code and status for diagnostics, then verify the connector, project
link, requested scopes, and local OIDC token.

Better Auth catches errors from its custom authorization-code exchange, logs
them on the server, and redirects with `oauth_code_verification_failed`.
`errorCallbackURL` controls the redirect after Better Auth has read the OAuth
state. The global `onAPIError.errorURL` is the fallback for errors that happen
before that state is available. Keep both URLs on a trusted application origin
and show a generic message to the user.

## Choose the right authentication flow

These three features solve different problems:

- **Connect OAuth gateway sign-in**: The integration in this guide signs a
  person into your application. Better Auth receives identity data from
  Vercel Connect and creates an application session.
- **Provider API token access**: Use `getToken()` from `@vercel/connect` when
  your server needs a scoped token for a provider API. Do not send the access
  token stored by Better Auth's generic OAuth account to the provider API.
  Provider token requests have their own subject, installation, and scope
  rules. See [Tokens](/docs/connect/concepts/tokens).
- **Vercel Passport**: Passport protects a deployment before a request reaches
  your application. It does not create a Better Auth session and does not
  issue provider API tokens. See [Passport](/docs/passport).

## Next steps

- [Vercel Connect quickstart](/docs/connect/quickstart)
- [Connector concepts](/docs/connect/concepts/connectors)
- [Authentication](/docs/connect/concepts/authentication)
- [Tokens](/docs/connect/concepts/tokens)


---

[View full sitemap](/docs/sitemap)
