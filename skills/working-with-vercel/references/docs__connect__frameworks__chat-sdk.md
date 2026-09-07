---
title: Chat SDK
product: vercel
url: /docs/connect/frameworks/chat-sdk
canonical_url: "https://vercel.com/docs/connect/frameworks/chat-sdk"
last_updated: 2026-08-28
type: how-to
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/connect/concepts/triggers
  - /docs/cli/connect
  - /docs/connect/concepts/installations
  - /docs/connect/concepts/tokens
  - /docs/connect/concepts/authentication
summary: Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion, and Telegram.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/frameworks/chat-sdk.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "6f15078ac6db2a188e032e3340438398b9ccadd1842d0a9caf153a41aed289a1"
---

# Chat SDK

> **🔒 Permissions Required**: Vercel Connect

The `@vercel/connect/chat` entry point connects Vercel Connect credentials to
the [Chat SDK](https://chat-sdk.dev/docs/vercel-connect) adapter for each
supported platform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Chat SDK now supports Vercel Connect](https://vercel.com/changelog/chat-sdk-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related)
- [Build your own Slackbot with Vercel Connect](https://vercel.com/kb/guide/build-a-slack-bot-with-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related) — Learn how to build your very own Slackbot with Chat SDK and AI SDK. Vercel Connect supplies runtime Slack tokens and for
- [The end of credential sprawl for agents](https://vercel.com/blog/the-end-of-credential-sprawl-for-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related)
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related)
- [Introducing Vercel Connect](https://vercel.com/blog/introducing-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related)
- [CLI](https://chat-sdk.dev/docs/create-chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related) — Scaffold a Chat SDK bot app with a single command.
- [Vercel Connect: Secure access to external services for your agents](https://vercel.com/changelog/vercel-connect-secure-access-to-external-services-for-your-agents?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related)
- [How to build an AI agent for Slack with Chat SDK and AI SDK](https://vercel.com/kb/guide/how-to-build-an-ai-agent-for-slack-with-chat-sdk-and-ai-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related) — Build a Slack AI agent using Chat SDK, AI SDK's ToolLoopAgent, and Vercel AI Gateway. Covers project setup, tool definit
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/connect/frameworks/chat-sdk.graph.md](/docs/connect/frameworks/chat-sdk.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fframeworks%2Fchat-sdk&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Understand the two request paths

The helpers configure outbound and inbound requests separately:

- **Outbound provider API requests:** Each credential field is an async
  resolver. The adapter calls it when it needs a provider credential.
  `@vercel/connect` handles caching and refreshes short-lived tokens.
- **Inbound provider webhooks:** Slack, Discord, GitHub, and Linear can use
  [Connect triggers](/docs/connect/concepts/triggers). Connect verifies the
  provider's signature, forwards the request, and adds a Vercel OpenID Connect
  (OIDC) bearer token. The helper's `webhookVerifier` verifies that OIDC token
  instead of the provider's native signature.

The inbound verifier does not verify Slack, Discord, GitHub, or Linear
credentials itself. Only use it for requests forwarded through a Connect
trigger.

## Check platform capabilities

| Platform | Helper                  | Outbound fields             | Inbound verification                                  |
| -------- | ----------------------- | --------------------------- | ----------------------------------------------------- |
| Slack    | `connectSlackAdapter`   | `botToken`                  | Connect trigger and Vercel OIDC                       |
| Discord  | `connectDiscordAdapter` | `botToken`, `applicationId` | Connect trigger and Vercel OIDC                       |
| GitHub   | `connectGitHubAdapter`  | `installationToken`         | Connect trigger and Vercel OIDC                       |
| Linear   | `connectLinearAdapter`  | `accessToken`               | Connect trigger and Vercel OIDC                       |
| Notion   | `connectNotionAdapter`  | `token`                     | Direct Notion webhook and `NOTION_VERIFICATION_TOKEN` |
| Telegram | `connectTelegramAdapter` | `botToken`                  | Direct Telegram webhook secret or polling             |

All helpers request app-subject credentials with
`subject: { type: 'app' }`. They do not request credentials on behalf of an
end user.

## Create and attach a trigger-capable connector

The following example connects a Slack app. Replace `slack` with `discord`,
`github`, or `linear` for another trigger-capable platform.

1. Create the connector and enable triggers:

   ```bash filename="terminal"
   vercel connect create slack --name acme-slack --triggers
   ```

2. Attach it to your project. Set the trigger path to the matching Chat SDK
   webhook route:

   ```bash filename="terminal"
   vercel connect attach slack/acme-slack \
     --project my-bot \
     --environment production \
     --triggers \
     --trigger-path /api/webhooks/slack
   ```

   The path must match the route where you expose
   `bot.webhooks.<platform>`. See the [`vercel connect` CLI
   reference](/docs/cli/connect) for Preview branches and Custom
   Environments.

3. Link your local directory and pull a development OIDC token:

   ```bash filename="terminal"
   vercel link
   vercel env pull
   ```

   Vercel deployments receive `VERCEL_OIDC_TOKEN` automatically. Connect
   forwards webhooks to deployed URLs, not `localhost`.

4. Spread the Connect config into the adapter:

   ```ts filename="app/chat.ts"
   import { createSlackAdapter } from '@chat-adapter/slack';
   import { connectSlackAdapter } from '@vercel/connect/chat';
   import { Chat } from 'chat';

   export const bot = new Chat({
     userName: 'my-bot',
     adapters: {
       slack: createSlackAdapter({
         ...connectSlackAdapter('slack/acme-slack'),
       }),
     },
   });
   ```

Keep your existing Chat SDK webhook route. Connect sends the forwarded request
to the path you registered during `vercel connect attach`.

## Configure each platform

### Slack

Pass requested provider scopes as the helper's second argument:

```ts filename="app/chat.ts"
import { createSlackAdapter } from '@chat-adapter/slack';
import { connectSlackAdapter } from '@vercel/connect/chat';

const slack = createSlackAdapter({
  ...connectSlackAdapter('slack/acme-slack', {
    scopes: ['chat:write'],
  }),
});
```

Do not set `signingSecret` or `SLACK_SIGNING_SECRET` for a
Connect-triggered route. The adapter verifies the forwarded request's Vercel
OIDC token.

### Discord

The helper resolves the bot token and application ID from one Connect token
response:

```ts filename="app/chat.ts"
import { createDiscordAdapter } from '@chat-adapter/discord';
import { connectDiscordAdapter } from '@vercel/connect/chat';

const discord = createDiscordAdapter({
  ...connectDiscordAdapter('discord/acme-discord'),
});
```

Do not set `DISCORD_BOT_TOKEN`, `DISCORD_APPLICATION_ID`, or
`DISCORD_PUBLIC_KEY` for the Connect-backed fields and trigger route.

### GitHub

The adapter receives an installation access token directly, so it does not
perform a private-key JSON Web Token exchange:

```ts filename="app/chat.ts"
import { createGitHubAdapter } from '@chat-adapter/github';
import { connectGitHubAdapter } from '@vercel/connect/chat';

const github = createGitHubAdapter({
  ...connectGitHubAdapter('github/acme-github'),
  userName: 'my-bot[bot]',
});
```

### Linear

Use the agent sessions mode for an app-actor installation:

```ts filename="app/chat.ts"
import { createLinearAdapter } from '@chat-adapter/linear';
import { connectLinearAdapter } from '@vercel/connect/chat';

const linear = createLinearAdapter({
  ...connectLinearAdapter('linear/acme-linear'),
  mode: 'agent-sessions',
});
```

### Notion

Notion support is outbound-only. Create and attach the connector without
`--triggers`:

```bash filename="terminal"
vercel connect create notion --name acme-notion
vercel connect attach notion/acme-notion --project my-bot
```

Configure the webhook directly in Notion. Keep Notion's native verification
token for inbound HMAC verification:

```ts filename="app/chat.ts"
import { createNotionAdapter } from '@chat-adapter/notion';
import { connectNotionAdapter } from '@vercel/connect/chat';

const notion = createNotionAdapter({
  ...connectNotionAdapter('notion/acme-notion'),
  verificationToken: process.env.NOTION_VERIFICATION_TOKEN,
});
```

The helper supplies `token`, so you can omit `NOTION_TOKEN`. It does not
supply a `webhookVerifier`.

### Telegram

Telegram support is outbound-only. Create and attach the connector without
`--triggers`:

```bash filename="terminal"
vercel connect create telegram --name acme-telegram
vercel connect attach telegram/acme-telegram --project my-bot
```

Keep Telegram's native webhook secret, or use polling mode without an inbound
webhook:

```ts filename="app/chat.ts"
import { createTelegramAdapter } from '@chat-adapter/telegram';
import { connectTelegramAdapter } from '@vercel/connect/chat';

const telegram = createTelegramAdapter({
  ...connectTelegramAdapter('telegram/acme-telegram'),
  secretToken: process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN,
});
```

The helper supplies `botToken`, so you can omit `TELEGRAM_BOT_TOKEN`. It does
not supply a `webhookVerifier`.

## Select scopes and installations

Each helper accepts Connect token parameters as its second argument. You can
pass `scopes`, `installationId`, and `validityBufferMs`. You cannot override
the app subject.

Use `installationId` when one connector has several provider installations:

```ts filename="app/chat.ts"
const slack = createSlackAdapter({
  ...connectSlackAdapter('slack/acme-slack', {
    installationId: 'sci_123',
    scopes: ['chat:write'],
  }),
});
```

If you omit `installationId`, Connect uses the connector's default
installation. The helpers do not automatically select an installation from an
inbound workspace or organization. See [Installations](/docs/connect/concepts/installations)
and [Tokens](/docs/connect/concepts/tokens) for selection and scope behavior.

## Customize inbound OIDC verification

The default verifier accepts a token only when its project and environment
match the current deployment. It reads the project from `VERCEL_PROJECT_ID`
and the environment from `VERCEL_TARGET_ENV`, then `VERCEL_ENV`.

Use `createConnectWebhookVerifier` to accept additional environments or pin an
explicit project:

```ts filename="app/chat.ts"
import { createSlackAdapter } from '@chat-adapter/slack';
import {
  connectSlackAdapter,
  createConnectWebhookVerifier,
} from '@vercel/connect/chat';

const slack = createSlackAdapter({
  ...connectSlackAdapter('slack/acme-slack'),
  webhookVerifier: createConnectWebhookVerifier({
    environment: ['production', 'preview'],
  }),
});
```

The verifier fails closed when it cannot determine a project or environment.
Do not pin it to `production` if a Preview deployment must receive triggers.

## Account for delivery limitations

- **Preview deployments:** Register a Preview branch as the trigger
  destination and allow `preview` in a custom verifier. Connect cannot forward
  to `localhost`.
- **Freshness and idempotency:** OIDC token expiry provides request freshness.
  The verifier does not provide nonce or delivery deduplication. Providers and
  Connect can retry requests, so make every handler idempotent.
- **Slack Socket Mode:** Connect trigger forwarding uses HTTP. It does not
  work with the Slack adapter's Socket Mode.
- **Installation routing:** The helpers use one configured or default
  installation. They do not derive a tenant-specific installation from each
  inbound event.

## Start with a template

Deploy a Chat SDK template to start building AI agents that use Vercel Connect
to securely access third-party services and APIs:

## Next steps

- Review [Connect triggers](/docs/connect/concepts/triggers) to choose a
  destination.
- Review [Authentication](/docs/connect/concepts/authentication) to understand
  deployment OIDC tokens.
- Use the [SDK reference](/docs/connect/ts-sdk-reference) for token parameters
  and errors.


---

[View full sitemap](/docs/sitemap)
