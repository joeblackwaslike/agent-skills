---
title: Quickstart with Vercel Connect
product: vercel
url: /docs/connect/quickstart
canonical_url: "https://vercel.com/docs/connect/quickstart"
last_updated: 2026-06-03
type: tutorial
prerequisites:
  - /docs/connect
related:
  - /docs/cli
  - /docs/connect/concepts/authentication
  - /docs/cli/connect
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts
summary: Create your first connector in Vercel Connect, attach it to a project, and request runtime tokens for agent workflows.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/quickstart.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "e5406e5a919384b3884a57018620e79dd7ad96e9e5118cc19e7cb4b374f0be4b"
---

# Quickstart

> **🔒 Permissions Required**: Vercel Connect

This guide shows you how to create your first connector in Vercel Connect and request a runtime provider token from your code.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- Node.js 18 or later
- A [Linear](https://linear.app) workspace you can authorize

- ### Set up your environment
  Create a new directory and connect it to a Vercel project. Linking the directory to a project is the recommended way to authenticate, because the project handles secure [OIDC token authentication](/docs/connect/concepts/authentication) for you.
  ```bash filename="Terminal"
  mkdir my-connect-app && cd my-connect-app
  pnpm init
  vercel link
  ```
  When prompted, select an existing project or **Create a new project**. The project doesn't need any code deployed; it just needs to exist so Vercel can issue OIDC tokens to it.

  Once linked, pull your environment variables to get a development OIDC token:
  ```bash filename="Terminal"
  vercel env pull
  ```
  This creates a `.env.local` file containing `VERCEL_OIDC_TOKEN`, which the SDK uses to authenticate calls to Vercel Connect. The token is short-lived; re-run `vercel env pull` if you see authentication errors. When you deploy to Vercel, token management happens automatically.

- ### Create a Linear connector
  Create a connector for Linear so your code can mint Linear API tokens on behalf of a user. You can do this from the dashboard or the CLI.
  #### Dashboard
  Open [**Connect**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fconnect\&title=Open+Vercel+Connect+Project) in the Vercel dashboard. You'll be prompted to pick a team and project; any connector you create from this page is automatically linked to that project, so you can skip a separate attach step.

  Click **Create connector**, choose **Custom OAuth** as the connector type, enter `mcp.linear.app` as the service URL, and configure:
  - **Name**: a stable identifier, for example `linear`
  - **Environments**: at least one, such as **Production**. Add **Preview** or **Development** if your workflow runs there too.
  #### CLI
  Create the connector. Vercel opens your browser to complete the Linear OAuth flow:
  ```bash filename="Terminal"
  vercel connect create mcp.linear.app --name linear
  ```
  Attach the connector to the currently linked project so it can request tokens:
  ```bash filename="Terminal"
  vercel connect attach oauth/linear
  ```
  By default, `attach` links every environment. Use `-e production -e preview` to restrict to specific environments. See the [`vercel connect`](/docs/cli/connect) reference for the full surface.

  For sensitive integrations, create a separate connector per environment so each environment has its own authorization grant and scopes. A token compromised in one environment cannot then be replayed against another.

- ### Install the SDK
  Install `@vercel/connect` along with the dev dependencies you need to run a TypeScript script locally.
  #### npm
  ```bash filename="Terminal"
  npm install @vercel/connect dotenv @types/node tsx typescript
  ```
  #### yarn
  ```bash filename="Terminal"
  yarn add @vercel/connect dotenv @types/node tsx typescript
  ```
  #### pnpm
  ```bash filename="Terminal"
  pnpm add @vercel/connect dotenv @types/node tsx typescript
  ```
  #### bun
  ```bash filename="Terminal"
  bun add @vercel/connect dotenv @types/node tsx typescript
  ```
  `dotenv` loads `.env.local` so the SDK can read `VERCEL_OIDC_TOKEN`. The `tsx` package is a TypeScript runner, and `typescript` and `@types/node` provide the compiler and Node.js type definitions.

- ### Write your code
  Create a file that requests a Linear token on behalf of a specific user and inspects the response:
  ```ts filename="index.ts"
  import { config } from 'dotenv';
  config({ path: '.env.local' });

  import {
    getTokenResponse,
    UserAuthorizationRequiredError,
  } from '@vercel/connect';

  const userId = 'user_demo_123';

  async function main() {
    try {
      const response = await getTokenResponse('oauth/linear', {
        subject: { type: 'user', id: userId },
        scopes: ['read'],
      });

      console.log(`Got token for ${userId} on ${response.connector.uid}`);
      console.log(`Expires at: ${new Date(response.expiresAt).toISOString()}`);
    } catch (error) {
      if (error instanceof UserAuthorizationRequiredError) {
        console.log(`User ${userId} has not authorized Linear yet.`);
        console.log('In a real app, surface the consent URL to the user here.');
        return;
      }
      throw error;
    }
  }

  main().catch(console.error);
  ```
  This requests a user-subject token: Vercel Connect will mint a Linear token that acts as `user_demo_123`, scoped to `read`. In a real app, replace `user_demo_123` with the id you use to identify the signed-in user in your own database.

  For service-level operations (a bot account or a tenant-wide admin API), use `subject: { type: 'app' }` instead. App-subject tokens skip the user-consent flow entirely. For multi-tenant connector types like Slack or GitHub, pass `installationId` to address a specific workspace or organization; otherwise the connector's default installation is used. See [Tokens](/docs/connect/concepts/tokens) for the full set of scoping options.

  **Completing the consent flow**

  When you catch `UserAuthorizationRequiredError`, call `startAuthorization` to get a consent URL to redirect the user to. After they authorize, Vercel completes the OAuth handshake server-side, and your next `getToken` call for that user succeeds.
  ```ts filename="consent.ts"
  import { startAuthorization } from '@vercel/connect';

  const { url } = await startAuthorization('oauth/linear', {
    subject: { type: 'user', id: userId },
    scopes: ['read'],
  });

  // In a web app, redirect the user to `url`.
  console.log(`Send the user to: ${url}`);
  ```
  > **💡 Note:** Do not persist runtime tokens in long-lived environment variables. Call `getToken` (or `getTokenResponse`) at request time; the SDK keeps an in-process cache and refreshes the token automatically as it approaches expiry.

- ### Run it
  ```bash filename="Terminal"
  pnpm tsx index.ts
  ```
  The first time you run this with a new `userId`, you'll see:
  ```text filename="Terminal"
  User user_demo_123 has not authorized Linear yet.
  In a real app, surface the consent URL to the user here.
  ```
  That's because no Linear OAuth grant exists yet for `user_demo_123`. In a real app you'd catch [`UserAuthorizationRequiredError`](/docs/connect/concepts/tokens#errors), redirect the user to the connector's consent URL, and retry the request once they authorize. Once the user has consented (try it from the connector's page in the dashboard for this demo), re-run the script and you'll see:
  ```text filename="Terminal"
  Got token for user_demo_123 on oauth/linear
  Expires at: 2026-06-03T22:42:00.000Z
  ```
  If you need the token as a string for use in an `Authorization` header, use `getToken` instead of `getTokenResponse`.

## What you just did

1. **Set up authentication**: Linked a directory to a Vercel project and pulled an OIDC token so the SDK can authenticate with Vercel Connect.
2. **Created a connector**: Registered Linear as a Custom OAuth connector under your team and attached it to the project.
3. **Requested a user-scoped token**: Called `getTokenResponse` with a `user` subject to mint a short-lived Linear token that acts as a specific user, and handled the first-run consent case with `UserAuthorizationRequiredError`.

## Next steps

- [Concepts](/docs/connect/concepts): Understand connectors, installations, tokens, project links, triggers, and authentication.
- [SDK Reference](/docs/connect/ts-sdk-reference): Full `getToken` and `getTokenResponse` parameter reference.
- [CLI Reference](/docs/cli/connect): The full `vercel connect` command surface.
- [Pricing and Limits](/docs/connect/pricing): Token-request pricing and beta limits.


---

[View full sitemap](/docs/sitemap)
