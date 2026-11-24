---
title: Chat SDK with Vercel Connect
product: vercel
url: /docs/connect/frameworks/chat-sdk
canonical_url: "https://vercel.com/docs/connect/frameworks/chat-sdk"
last_updated: 2026-09-18
type: how-to
prerequisites:
  - /docs/connect/frameworks
  - /docs/connect
related:
  - /docs/chat-sdk
  - /docs/chat-sdk/quickstart
  - /docs/chat-sdk/integrations/connect
  - /docs/connect/concepts/triggers
  - /docs/cli/connect
summary: Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, Microsoft Teams, GitHub, Linear, Notion, and...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/connect/frameworks/chat-sdk.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "29c2c3281b69bc2275581b69b61746413c0eb5a3017634d820c544d72574b0e5"
---

# Chat SDK with Vercel Connect

> Vercel Connect is available on all plans and is subject to the [Vercel Connect terms](/legal/service-terms#connect)

The `@vercel/connect/chat` entry point connects Vercel Connect credentials to
the [Chat SDK](https://chat-sdk.dev/docs/vercel-connect) adapter for each
supported platform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [The Complete Guide to Chat SDK](https://vercel.com/kb/guide/the-complete-guide-to-chat-sdk) — Chat SDK is a TypeScript library for building chat bots that work across Slack, Teams, Discord, Linear, and more from a
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga)
- [Vercel Connect now supports Microsoft Teams](https://vercel.com/changelog/vercel-connect-microsoft-teams)
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
- [AI SDK and MCP with Vercel Connect](https://vercel.com/docs/connect/frameworks/ai-sdk-and-mcp) — Connect an AI SDK app to an OAuth-protected MCP server with Vercel Connect, then handle user consent and tool approval.

Full cross-link map for this page: [/docs/connect/frameworks/chat-sdk.graph.md](/docs/connect/frameworks/chat-sdk.graph.md)
<!-- /docsgraph:related -->

If you're new to Chat SDK, start with the [overview](/docs/chat-sdk) or [deploy a Slack bot](/docs/chat-sdk/quickstart) to learn how adapters, event handlers, and persistent state fit together. For a focused Slack example, follow the [Chat SDK integration guide](/docs/chat-sdk/integrations/connect). Use this page for additional platform configuration, credential options, and trigger behavior.

## Understand the two request paths

The helpers configure outbound and inbound requests separately:

- **Outbound provider API requests:** Each credential field is an async
  resolver. The adapter calls it when it needs a provider credential.
  `@vercel/connect` handles caching and refreshes short-lived tokens.
- **Inbound provider webhooks:** Slack, Discord, Microsoft Teams, GitHub, and Linear can use
  [Connect triggers](/docs/connect/concepts/triggers). Connect verifies the
  provider's request, forwards it, and adds a Vercel OpenID Connect
  (OIDC) bearer token. The helper's `webhookVerifier` verifies that OIDC token
  instead of performing the provider's native verification.

The inbound verifier does not verify provider signatures or Microsoft's
native JWT itself. Only use it for requests forwarded through a Connect trigger.

## Check platform capabilities

| Platform | Helper                  | Outbound fields             | Inbound verification                                  |
| -------- | ----------------------- | --------------------------- | ----------------------------------------------------- |
| Slack    | `connectSlackAdapter`   | `botToken`                  | Connect trigger and Vercel OIDC                       |
| Discord  | `connectDiscordAdapter` | `botToken`, `applicationId` | Connect trigger and Vercel OIDC                       |
| Microsoft Teams | `connectTeamsAdapter` | `appId`, `token` | Connect trigger and Vercel OIDC |
| GitHub   | `connectGitHubAdapter`  | `installationToken`         | Connect trigger and Vercel OIDC                       |
| Linear   | `connectLinearAdapter`  | `accessToken`               | Connect trigger and Vercel OIDC                       |
| Notion   | `connectNotionAdapter`  | `token`                     | Direct Notion webhook and `NOTION_VERIFICATION_TOKEN` |
| Telegram | `connectTelegramAdapter` | `botToken`                  | Direct Telegram webhook secret or polling             |

All helpers request app-subject credentials with
`subject: { type: 'app' }`. They do not request credentials on behalf of an
end user.

## Create and attach a trigger-capable connector

The following example connects a Slack app. Replace `slack` with `discord`,
`github`, `linear`, or `microsoft-teams` for another trigger-capable platform.
For Microsoft Teams, use a connector UID such as `microsoft-teams/acme-teams`
and the webhook route `/api/webhooks/teams` for `bot.webhooks.teams`.

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

### Microsoft Teams

`connectTeamsAdapter` resolves the bot's `appId` during initialization and
supplies a scope-aware `token` callback for Bot Framework and Microsoft Graph:

```ts filename="app/chat.ts" framework=all
import { createTeamsAdapter } from '@chat-adapter/teams';
import { connectTeamsAdapter } from '@vercel/connect/chat';

const teams = createTeamsAdapter({
  ...connectTeamsAdapter('microsoft-teams/acme-teams'),
});
```

```js filename="app/chat.js" framework=all
import { createTeamsAdapter } from '@chat-adapter/teams';
import { connectTeamsAdapter } from '@vercel/connect/chat';

const teams = createTeamsAdapter({
  ...connectTeamsAdapter('microsoft-teams/acme-teams'),
});
```

Omit `TEAMS_APP_ID` and `TEAMS_APP_PASSWORD` when using the helper. Enable
trigger forwarding to `/api/webhooks/teams`; the helper verifies forwarded
requests with Vercel OIDC instead of Microsoft's native JWT.

The token callback requests separate tokens for
`https://api.botframework.com/.default` and
`https://graph.microsoft.com/.default`. Graph reads still require the
appropriate installation and consent permissions. Connect uses the bot's
home tenant for managed tokens.

Chat initializes the adapter automatically before handling webhooks. Call
`await bot.initialize()` before using adapter methods directly, because the
`appId` resolver runs during initialization.

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

The adapter handles the bot's conversation in issue and pull request threads.
To let the bot's agent call other GitHub operations, such as reading a pull
request's changed files, [GitHub Tools](https://github-tools.com/integrations/chat-sdk)
can request tokens from the same connector with `connectGithubToken`. Its
[Review pull requests guide](https://github-tools.com/guides/review-pull-requests)
builds a bot that reviews a pull request when someone mentions it and keeps
each thread in a durable workflow. The guide configures the adapter and its
webhook with environment variables. To use Connect for those too, apply this
page's adapter and
[trigger setup](#create-and-attach-a-trigger-capable-connector).

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
the app subject. `connectTeamsAdapter` does not accept `scopes`, because the
Teams adapter selects the scope for each token request.

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

## Frequently asked questions

### Do the Chat SDK helpers request tokens on behalf of end users?

No. Every helper in `@vercel/connect/chat` requests credentials with `subject: { type: 'app' }`, and you can't override the subject, so the bot acts as your installed app. When an agent in your bot needs to act through a user's own account, request a user-scoped token with `getToken()`, or attach MCP tools with a Connect auth provider that uses the user's ID as the subject. See [Use authenticated MCP tools in a Chat SDK bot](/docs/connect/frameworks/tanstack-ai#use-authenticated-mcp-tools-in-a-chat-sdk-bot).

### Does the Connect `webhookVerifier` check Slack or Discord signatures?

No. Vercel Connect verifies the provider's request, then forwards it with a Vercel OIDC token. The helper's `webhookVerifier` checks only that OIDC token, so use it only on routes that receive trigger-forwarded requests. By default, it accepts a token only when its project and environment match the current deployment. Notion and Telegram don't use triggers and keep their native verification. See [Customize inbound OIDC verification](#customize-inbound-oidc-verification).

### Why does my bot receive the same event more than once?

Providers and Vercel Connect can retry deliveries, and the verifier doesn't deduplicate them. OIDC token expiry limits how old a forwarded request can be, but a retry can still arrive within that window. Make every handler idempotent, for example by recording processed event IDs and skipping repeats. See [Account for delivery limitations](#account-for-delivery-limitations).

### Can a Connect-backed bot wait for human approval before it acts?

Yes, with Vercel Workflows. The [Chat SDK with Vercel Workflows](/docs/chat-sdk/integrations/workflows) guide configures the bot with `connectSlackAdapter`, starts a workflow from a chat message, and posts a Slack approval card. The run resumes after an approver responds, or expires after a timeout. Vercel Workflows persists the run while it waits, so the pending approval doesn't keep a function running.

### How do I add AI model responses to a Connect-backed bot?

Call AI SDK through [AI Gateway](/docs/ai-gateway) from your event handlers. On Vercel, AI SDK authenticates to AI Gateway with the deployment's OIDC token, the same token the Connect helpers use, so the bot doesn't need a model provider API key. Locally, `vercel env pull` writes a development token for both. See [Chat SDK with AI Gateway](/docs/chat-sdk/integrations/ai-gateway).

## Next steps

- Review [Connect triggers](/docs/connect/concepts/triggers) to choose a
  destination.
- Review [Authentication](/docs/connect/concepts/authentication) to understand
  deployment OIDC tokens.
- Use the [SDK reference](/docs/connect/ts-sdk-reference) for token parameters
  and errors.

## Search the docs from your terminal

Search the Vercel docs and read pages as Markdown with the Vercel CLI. No login required.

```bash
# Find docs pages by keyword
npx vercel@latest docs search "environment variables"
npx vercel@latest docs search "function timeout"

# Print a docs page as Markdown, by path or URL
npx vercel@latest docs inspect <page>
```

---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
