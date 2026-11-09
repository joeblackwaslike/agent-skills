---
title: Getting Started with Chat SDK
product: vercel
url: /docs/chat-sdk/quickstart
canonical_url: "https://vercel.com/docs/chat-sdk/quickstart"
last_updated: 2018-10-20
type: tutorial
prerequisites:
  - /docs/chat-sdk
related:
  - /docs/connect
  - /docs/cli
  - /docs/environment-variables
  - /docs/connect/concepts/project-links
  - /docs/connect/concepts/triggers
summary: Create a Slack bot with the Chat SDK CLI, connect it to Slack through Vercel Connect, and deploy it on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/chat-sdk/quickstart.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "839a9d28625495ea7868a22961ebb8300c20cd161af4348728c8685da802eec4"
---

# Getting Started with Chat SDK

Use the [Chat SDK CLI](https://chat-sdk.dev/docs/create-chat-sdk) to create a Slack bot with Redis state and [Vercel Connect](/docs/connect). The generated bot responds to mentions and echoes replies in a thread. Vercel Connect creates the Slack app for you, manages its credentials, and forwards events to your deployment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to build a Slack bot with Next.js and Redis](https://vercel.com/kb/guide/how-to-build-a-slack-bot-with-next-js-and-redis) — This guide walks through building a Slack bot with Next.js, covering project setup, Slack app configuration, event handl
- [Triage form submissions with Chat SDK](https://vercel.com/kb/guide/triage-form-submissions-with-chat-sdk) — Build a Slack bot that triages form submissions with interactive cards. Forward, edit, or mark as spam without leaving S
- [Create a Discord support bot with Nuxt and Redis](https://vercel.com/kb/guide/create-a-discord-support-bot-with-nuxt-and-redis) — This guide walks through building a Discord support bot with Nuxt, covering project setup, Discord app configuration, Ga
- [Chat SDK with Vercel Connect](https://vercel.com/docs/chat-sdk/integrations/connect) — Use Vercel Connect for Chat SDK platform credentials, verified webhooks, and separate per-user tool access.
- [Chat SDK with Next.js](https://vercel.com/docs/chat-sdk/frameworks/nextjs) — Add a Chat SDK bot to Next.js, receive Slack events through Vercel Connect, and deploy on Vercel.
- [Chat SDK with Vercel Daemons](https://vercel.com/docs/chat-sdk/integrations/daemons) — Process Chat SDK jobs with Vercel Queues and Daemons, using Vercel Connect for Slack credentials and event delivery.
- [TanStack AI with AI Gateway](https://vercel.com/docs/ai-gateway/ecosystem/framework-integrations/tanstack-ai) — Connect TanStack AI to Vercel AI Gateway with the official adapter to authenticate requests and stream responses from AI
- [AI SDK](https://vercel.com/docs/ai-sdk) — Build TypeScript agents and AI applications with a unified API for models, tools, structured output, and streaming.

Full cross-link map for this page: [/docs/chat-sdk/quickstart.graph.md](/docs/chat-sdk/quickstart.graph.md)
<!-- /docsgraph:related -->

## Prerequisites

- Node.js and pnpm installed
- A Vercel account and the latest [Vercel CLI](/docs/cli) installed
- Permission to authorize and install an app in your Slack workspace

- ### Create your bot
  Run `create-chat-sdk` with the Slack and Redis adapters and Connect authentication:
  ```bash filename="Terminal"
  pnpm create chat-sdk@latest my-bot --adapter slack redis --connect --pm pnpm -y
  cd my-bot
  ```
  The CLI installs the dependencies and generates a Next.js project with these files:

  | File | Purpose |
  | --- | --- |
  | `src/lib/bot.ts` | Configures the Slack adapter with `connectSlackAdapter`, connects Redis, and registers handlers for mentions and thread replies. |
  | `src/app/api/webhooks/[platform]/route.ts` | Receives platform events at `/api/webhooks/slack` and uses Next.js `after` to finish processing after acknowledging them. |
  | `.env.example` | Lists the connector UID and Redis connection URL your bot needs. |

  The project serves webhooks and doesn't include a web UI. You can use the generated handlers for this tutorial without changing the code.

- ### Link your project and connect Redis
  Link the generated app to a Vercel project, then add an Upstash Redis database from the [Marketplace](/marketplace/category/storage):
  ```bash filename="Terminal"
  vercel link
  vercel integration add upstash/upstash-kv
  ```
  Follow the prompts to create or select a project and connect a database. Ensure the integration supplies `REDIS_URL` in the project's **Production** and **Development** environments. If you already have a Redis database, add its connection URL as `REDIS_URL` in your project's [environment variables](/docs/environment-variables).

  Redis keeps thread subscriptions available across function instances. Use separate databases for development and production to keep their state isolated.

- ### Connect Slack with Vercel Connect
  From the linked project directory, create a Slack connector. `--triggers` enables event forwarding, and `--trigger-path` sets the generated webhook route as the path that receives the events:
  ```bash filename="Terminal"
  vercel connect create slack --name my-bot --triggers --trigger-path /api/webhooks/slack
  ```
  Complete the guided setup, authorize Vercel to create the app in your Slack workspace, and finish the workspace installation. Connect handles the app registration and credentials. See [Slack connector](/connect/slack) for the supported events and setup details.

  The create command also [attaches the connector to the linked project](/docs/connect/concepts/project-links) for Production, Preview, and Development token access. It registers a [trigger destination](/docs/connect/concepts/triggers) that sends incoming events to the **Production** deployment at `/api/webhooks/slack`. In the next step, use the connector UID that the command prints if it differs from `slack/my-bot`.

  Connect verifies incoming Slack events and forwards them with a Vercel OIDC token. The generated adapter verifies that token, so you don't need to configure a Slack signing secret or bot token.

- ### Set the connector environment variable
  Add the connector UID to your project's Production and Development environments:
  ```bash filename="Terminal"
  vercel env add SLACK_CONNECTOR --environment production
  vercel env add SLACK_CONNECTOR --environment development
  ```
  Enter `slack/my-bot` when each command prompts for a value, using your connector's UID. Confirm that `REDIS_URL` is also configured, then pull the Development variables:
  ```bash filename="Terminal"
  vercel env pull .env.local
  ```
  The generated bot reads `SLACK_CONNECTOR` and `REDIS_URL` automatically. Vercel supplies `VERCEL_OIDC_TOKEN` to deployments, and `vercel env pull` provides a development token for local use. Keep `.env.local` out of version control.

- ### Deploy and test in Slack
  Deploy your bot to Production:
  ```bash filename="Terminal"
  vercel --prod
  ```
  Once the deployment is ready, invite the app you installed through Connect to a Slack channel and mention it. The bot should greet you and subscribe to the thread. Reply in the same thread without mentioning it again; it should respond with `You said:` followed by your message.

  Connect resolves the Production deployment for your project and forwards events to the trigger path you configured. It forwards events to deployed URLs, so test Slack delivery against the deployment rather than a local tunnel.

## Customize your bot

Edit the handlers in `src/lib/bot.ts` to change how your bot responds, then redeploy. The generated `onNewMention` handler calls `thread.subscribe()`, which routes subsequent thread replies to `onSubscribedMessage`.

To test changes on a Preview branch, add `SLACK_CONNECTOR` and a Redis database to the Preview environment, then configure a [Preview trigger destination](/docs/cli/connect#vercel-connect-attach). Use a separate connector and Slack app for development to keep test events separate from production conversations.

## Troubleshooting

| Symptom | What to check |
| --- | --- |
| The deployment reports a missing environment variable | Confirm that `SLACK_CONNECTOR` and `REDIS_URL` are set in Production, then redeploy. |
| Connect reports that an installation is required | Complete the Slack workspace installation for the connector. See [connector installations](/docs/connect/concepts/installations). |
| The bot doesn't respond to a mention | Invite the app to the channel, confirm that the connector has triggers enabled and targets `/api/webhooks/slack` on your Production deployment, and inspect [runtime logs](/docs/logs/runtime). |
| Mentions work, but thread replies don't | Confirm that Redis is reachable, the bot calls `thread.subscribe()`, and the connector receives `message.channels` events for public channel replies. |
| The webhook returns an authorization error | Keep the generated Connect adapter configuration and send events through Connect. See [Chat SDK with Vercel Connect](/docs/connect/frameworks/chat-sdk) for OIDC verification and [delivery limitations](/docs/connect/frameworks/chat-sdk#account-for-delivery-limitations). |

## Frequently asked questions

### Can I use npm, Yarn, or Bun instead of pnpm?

Yes. `create-chat-sdk` supports npm, Yarn, pnpm, and Bun. Select one with the `--pm` flag. With `npm create`, add `--` before the CLI's arguments so npm forwards them instead of reading them itself:

```bash filename="Terminal"
npm create chat-sdk@latest -- my-bot --adapter slack redis --connect --pm npm -y
```

See the [Chat SDK CLI reference](https://chat-sdk.dev/docs/create-chat-sdk) for every option.

### Do I need to create a Slack app or set a Slack signing secret?

No. `vercel connect create slack` creates the Slack app in your workspace, and Vercel Connect manages its credentials. Connect verifies each Slack event and forwards it with a Vercel OIDC token, which the generated adapter verifies in place of a Slack signing secret. You don't set `SLACK_BOT_TOKEN` or `SLACK_SIGNING_SECRET`. See [Chat SDK with Vercel Connect](/docs/chat-sdk/integrations/connect).

### Can I test my Slack bot locally?

You can make outbound Slack calls locally, but Slack events only reach deployed URLs. Connect doesn't forward events to `localhost`, so test mentions and thread replies against a deployment. `vercel env pull .env.local` provides a Development OIDC token that can request the bot's Slack credentials from your machine. To test incoming events before production, add `SLACK_CONNECTOR` and a Redis database to the Preview environment and [attach a Preview trigger destination](/docs/cli/connect#vercel-connect-attach).

### Why does my Chat SDK bot need Redis?

Redis shares your bot's state across function instances. Chat SDK stores thread subscriptions, locks, and event deduplication data in its state adapter, and on Vercel, consecutive webhooks can reach different instances. With Redis, a reply in a subscribed thread reaches `onSubscribedMessage` regardless of which instance receives it. The in-memory adapter loses its state on restart and only locks within one process, so use it for local tests only. You can also use [PostgreSQL](/docs/chat-sdk/adapters#state-adapters).

### Why does my bot ignore a message sent while it's still replying?

By default, Chat SDK drops a message that arrives while a handler is still processing an earlier message in the same thread. Set the `concurrency` option on `Chat` to change this. `queue` handles the latest waiting message after the current handler finishes, `debounce` waits for a pause and handles only the last message, `burst` waits for a pause and passes the earlier messages to your handler, and `concurrent` turns off locking. See [overlapping messages](https://chat-sdk.dev/docs/concurrency).

## Next steps

- [Add model responses, credentials, code execution, and approvals](/docs/chat-sdk/integrations)
- [Add Chat SDK to your framework](/docs/chat-sdk/frameworks)
- [Choose more platform and state adapters](/docs/chat-sdk/adapters)
- [Route messages to an eve agent](/docs/chat-sdk/eve)
- [Build AI agents with AI Gateway and AI SDK](/kb/guide/ai-gateway-and-ai-sdk)
- [Wait for human approval with Chat SDK and Workflows](/kb/guide/human-in-the-loop-with-chat-sdk-and-workflow-sdk)
- [Configure Chat SDK with Vercel Connect](/docs/connect/frameworks/chat-sdk)
- [Explore Chat SDK CLI options](https://chat-sdk.dev/docs/create-chat-sdk)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
