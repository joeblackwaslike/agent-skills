---
title: Quickstart
product: vercel
url: /docs/connect/quickstart
canonical_url: "https://vercel.com/docs/connect/quickstart"
last_updated: 2026-08-27
type: tutorial
prerequisites:
  - /docs/connect
related:
  - /docs/connect/legal
  - /docs/cli
  - /docs/connect/concepts/authentication
  - /docs/deployments/environments
  - /docs/cli/connect
summary: Create your first connector in Vercel Connect, install the SDK, and request a runtime provider token from your code.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/quickstart.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "189ea0bb01e47bcbbb0526504b2e343a268896d994f561764ae6f3d811074255"
---

# Quickstart

> Vercel Connect is available on all plans and is subject to the [Vercel Connect terms](/docs/connect/legal)

This guide shows you how to create your first connector in Vercel Connect and request a runtime provider token from your code.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [MCP Events support in Vercel Connect is now in public beta](https://vercel.com/changelog/mcp-events-support-in-vercel-connect-is-now-in-public-beta)
- [Vercel Connect adds managed Stripe API keys](https://vercel.com/changelog/vercel-connect-adds-managed-stripe-api-keys)
- [Vercel Connect now supports Custom Environments](https://vercel.com/changelog/vercel-connect-now-supports-custom-environments)
- [Vercel Connect adds 100+ preset connectors](https://vercel.com/changelog/vercel-connect-preset-connectors)
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [Build a GitHub agent with Vercel Connect](https://vercel.com/kb/guide/github-agent-vercel-connect) — Build a GitHub agent that helps your team work through issues and PRs. Chat SDK handles the interactivity and AI SDK run
- [How to build a Slack bot that manages files in Vercel Blob](https://vercel.com/kb/guide/slack-bot-vercel-blob) — Build a Slack bot using Chat SDK, AI SDK, and Files SDK that can list, read, upload, and delete files in Vercel Blob thr
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents)
- [Auth.js with Vercel Connect](https://vercel.com/docs/connect/frameworks/authjs) — Add a Vercel Connect OAuth provider to Auth.js in a Next.js App Router application.

Full cross-link map for this page: [/docs/connect/quickstart.graph.md](/docs/connect/quickstart.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- [Vercel CLI](/docs/cli) installed (`npm i -g vercel`)
- For TypeScript: Node.js 18 or later
- For Python: Python 3.10 or later and [uv](https://docs.astral.sh/uv/)
- A [Linear](https://linear.app) workspace you can authorize

- ### Set up your environment
  Create a new directory and connect it to a Vercel project. Linking the directory to a project is the recommended way to authenticate, because the project handles secure [OIDC token authentication](/docs/connect/concepts/authentication) for you.

  **Terminal**
  ```bash filename="Terminal" framework=node
  mkdir my-connect-app && cd my-connect-app
  pnpm init
  vercel link
  ```
  **Terminal**
  ```bash filename="Terminal" framework=py
  mkdir my-connect-app && cd my-connect-app
  uv init --bare
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

  Select **Create Connector**, choose **OAuth**, and keep **Managed** selected. Under **Server URL**, enter `mcp.linear.app`, select **Continue**, and set **Connector Name** to `linear`.

  Creating the connector from this project page automatically links Production, Preview, and Development. To enable a [Custom Environment](/docs/deployments/environments#custom-environments), create the connector first, then open its **Projects** section, edit the project link, and select the Custom Environment.
  #### CLI
  Create the connector. Vercel opens your browser to complete the Linear OAuth flow:
  ```bash filename="Terminal"
  vercel connect create mcp.linear.app --name linear
  ```
  For a known service such as `notion` or `okta`, the CLI prompts you for the connection method and any credentials it needs, so you can finish setup without leaving the terminal. Run `vercel connect create <service> --help` to see what a service supports.

  Attach the connector to the currently linked project so it can request tokens:
  ```bash filename="Terminal"
  vercel connect attach oauth/linear
  ```
  By default, `attach` links Production, Preview, and Development. It does not automatically include Custom Environments. Use `-e production -e preview` to restrict the link, or pass a Custom Environment slug such as `-e qa`. See the [`vercel connect`](/docs/cli/connect) reference for the full surface.

  For provider-level isolation, create a separate connector for each environment, install each connector separately, and request only the provider scopes that environment needs. Environment selection on a project link controls which deployments can request tokens; it does not create separate provider grants.

- ### Install the SDK
  Install the Vercel Connect SDK along with the dependencies you need to run a script locally.

  **Terminal**
  ```bash filename="Terminal" framework=node package-manager="npm"
  npm install @vercel/connect dotenv @types/node tsx typescript
  ```
  **Terminal**
  ```bash filename="Terminal" framework=node package-manager="yarn"
  yarn add @vercel/connect dotenv @types/node tsx typescript
  ```
  **Terminal**
  ```bash filename="Terminal" framework=node package-manager="pnpm"
  pnpm add @vercel/connect dotenv @types/node tsx typescript
  ```
  **Terminal**
  ```bash filename="Terminal" framework=node package-manager="bun"
  bun add @vercel/connect dotenv @types/node tsx typescript
  ```
  **Terminal**
  ```bash filename="Terminal" framework=py
  uv add vercel-connect python-dotenv
  ```
  `dotenv` and `python-dotenv` load `.env.local` so the SDK can read `VERCEL_OIDC_TOKEN`.
  - **TypeScript:** `tsx` runs TypeScript files directly, and `typescript` and `@types/node` provide the compiler and Node.js type definitions.
  - **Python:** If you use pip instead of uv, run `pip install vercel-connect python-dotenv`.

- ### Write your code
  Create a file that requests a Linear token on behalf of a specific user and inspects the response:

  **index.ts**
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
  **main.py**
  ```py filename="main.py"
  import asyncio

  from dotenv import load_dotenv
  from vercel import connect
  from vercel.connect import (
      ConnectUserTokenSubject,
      UserAuthorizationRequiredError,
  )

  load_dotenv('.env.local')

  user_id = 'user_demo_123'


  async def main() -> None:
      try:
          response = await connect.get_token_response(
              'oauth/linear',
              subject=ConnectUserTokenSubject(id=user_id),
              scopes=['read'],
          )
      except UserAuthorizationRequiredError:
          print(f'User {user_id} has not authorized Linear yet.')
          print('In a real app, surface the consent URL to the user here.')
          return

      print(f'Got token for {user_id} on {response.connector.uid}')
      print(f'Expires at: {response.expires_at.isoformat()}')


  asyncio.run(main())
  ```
  This requests a user-subject token: Vercel Connect will mint a Linear token that acts as `user_demo_123`, scoped to `read`. In a real app, replace `user_demo_123` with the id you use to identify the signed-in user in your own database.

  For service-level operations (a bot account or a tenant-wide admin API), use an [app subject](/docs/connect/concepts/tokens#subject-types) instead. App-subject tokens skip the user-consent flow entirely, though some providers still require a one-time installation or an administrator grant. For multi-tenant connector types like Slack or GitHub, pass an installation ID to address a specific workspace or organization; otherwise the connector's default installation is used. See [Tokens](/docs/connect/concepts/tokens) for the full set of scoping options.

  **Completing the consent flow**

  When you catch `UserAuthorizationRequiredError`, start an authorization request to get a consent URL to redirect the user to. After they authorize, Vercel completes the OAuth handshake server-side, and your next token request for that user succeeds.

  **consent.ts**
  ```ts filename="consent.ts"
  import { startAuthorization } from '@vercel/connect';

  const { url } = await startAuthorization('oauth/linear', {
    subject: { type: 'user', id: userId },
    scopes: ['read'],
  });

  // In a web app, redirect the user to `url`.
  console.log(`Send the user to: ${url}`);
  ```
  **consent.py**
  ```py filename="consent.py"
  from vercel import connect
  from vercel.connect import ConnectUserTokenSubject


  async def get_consent_url(user_id: str) -> str:
      authorization = await connect.start_authorization(
          'oauth/linear',
          subject=ConnectUserTokenSubject(id=user_id),
          scopes=['read'],
      )

      # In a web app, redirect the user to `authorization.url`.
      return authorization.url
  ```
  > **💡 Note:** Do not persist runtime tokens in long-lived environment variables. Request a token each time you need one; the SDK keeps an in-process cache and refreshes the token automatically as it approaches expiry.

- ### Run it
  **Terminal**
  ```bash filename="Terminal" framework=node
  pnpm tsx index.ts
  ```
  **Terminal**
  ```bash filename="Terminal" framework=py
  uv run python main.py
  ```
  The first time you run this for a new user ID, you'll see:
  ```text filename="Terminal"
  User user_demo_123 has not authorized Linear yet.
  In a real app, surface the consent URL to the user here.
  ```
  That's because no Linear OAuth grant exists yet for `user_demo_123`. In a real app you'd catch [`UserAuthorizationRequiredError`](/docs/connect/concepts/tokens#errors), redirect the user to the connector's consent URL, and retry the request once they authorize. Once the user has consented (try it from the connector's page in the dashboard for this demo), re-run the script and you'll see:

  **Terminal**
  ```text filename="Terminal" framework=node
  Got token for user_demo_123 on oauth/linear
  Expires at: 2026-06-03T22:42:00.000Z
  ```
  **Terminal**
  ```text filename="Terminal" framework=py
  Got token for user_demo_123 on oauth/linear
  Expires at: 2026-06-03T22:42:00+00:00
  ```
  If you only need the token string for an `Authorization` header, use `getToken` or `get_token()` instead.

## What you just did

1. **Set up authentication**: Linked a directory to a Vercel project and pulled an OIDC token so the SDK can authenticate with Vercel Connect.
2. **Created a connector**: Registered Linear as a Custom OAuth connector under your team and attached it to the project.
3. **Requested a user-scoped token**: Minted a short-lived Linear token that acts as a specific user, and handled the first-run consent case with `UserAuthorizationRequiredError`.

## Next steps

- [Concepts](/docs/connect/concepts): Understand connectors, installations, tokens, project links, triggers, and authentication.
- [TypeScript SDK Reference](/docs/connect/ts-sdk-reference): Full `getToken` and `getTokenResponse` parameter reference.
- [Python SDK Reference](/docs/connect/python-sdk-reference): Full `get_token()` and `get_token_response()` parameter reference.
- [CLI Reference](/docs/cli/connect): The full `vercel connect` command surface.
- [Pricing](/docs/connect/pricing): Token-request pricing.
- [Limits](/docs/connect/limits): Platform limits and rate limits.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
