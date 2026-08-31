---
title: Triggers
product: vercel
url: /docs/connect/concepts/triggers
canonical_url: "https://vercel.com/docs/connect/concepts/triggers"
last_updated: 2026-08-20
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/concepts/tokens
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain-to-environment
  - /docs/cli/connect
summary: Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/triggers.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "cddd6350c9a7c93f2a513b6c5746a9240ba01d803adb6cee7591c108e1823fbc"
---

# Triggers

A **trigger** is an incoming webhook from a third-party service that Vercel Connect verifies and forwards to your projects. Where [tokens](/docs/connect/concepts/tokens) are the outbound half of Vercel Connect (your code calling the provider), triggers are the inbound half (the provider calling your code).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Connect](https://chat-sdk.dev/docs/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Authenticate Slack, Discord, GitHub, Linear, Notion, and Telegram adapters with Vercel Connect — short-lived runtime tok
- [Chat SDK now supports Vercel Connect](https://vercel.com/changelog/chat-sdk-vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related)
- [Vercel Connect is now generally available](https://vercel.com/changelog/vercel-connect-ga?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related)
- [The Complete Guide to Vercel Connect](https://vercel.com/kb/guide/vercel-connect?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Use Vercel Connect to call provider APIs like Slack, GitHub, Linear, Microsoft, Discord, Snowflake, and Salesforce from
- [Concepts](https://vercel.com/docs/eve/concepts?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Learn how eve agents, sessions, channels, tools, skills, connections, and sandboxes fit together.
- [Observability](https://vercel.com/docs/connect/observability?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Monitor token requests, authorizations, revocations, and trigger deliveries for your connectors.
- [Connectors](https://vercel.com/docs/connect/concepts/connectors?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — A connector is the team-owned record that represents one third-party service. Its type determines which capabilities are
- [Creating & Triggering Deploy Hooks](https://vercel.com/docs/deploy-hooks?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Learn how to create and trigger deploy hooks to integrate Vercel deployments with other systems.
- [Chat SDK](https://vercel.com/docs/connect/frameworks/chat-sdk?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=related) — Use Vercel Connect credentials and trigger forwarding with Chat SDK adapters for Slack, Discord, GitHub, Linear, Notion,

Full cross-link map for this page: [/docs/connect/concepts/triggers.graph.md](/docs/connect/concepts/triggers.graph.md?from=related&source_path=%2Fdocs%2Fconnect%2Fconcepts%2Ftriggers&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

[Browse connectors](/connect/browse) to see which services support triggers and their default events.

## How it works

1. The provider sends a webhook to Vercel Connect's intake endpoint (configured on the provider side at install time).
2. Vercel Connect verifies the request signature against the connector's signing key. Unsigned or invalid requests are rejected.
3. Vercel Connect forwards the verified event to each registered trigger destination on the connector.

A trigger destination combines a project, target, and path. The target can be Production, a Preview branch, or a [Custom Environment](/docs/deployments/environments#custom-environments). When an event arrives, Vercel Connect resolves the target to a domain and appends the configured path to `https://<domain>`.

A connector can have up to three trigger destinations.

Forwarding is strictly opt-in: Vercel Connect delivers events only to the trigger destinations you configure on the connector. It never routes event data to any other destination at Vercel's election.

## Registering a destination

### Use the dashboard

1. Open [**Connect**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fconnect\&title=Open+Vercel+Connect+Project) in the Vercel Dashboard, then select the connector.
2. Under **Triggers**, select **Add Trigger Destination**.
3. Select the project.
4. Under **Target Type**, choose the destination:
   - Select **Environment**, then under **Environment** select **Production** or a Custom Environment.
   - Select **Branch**, then choose the Preview branch.
5. Enter the path that receives provider events.
6. Select **Add**.

Before using a Custom Environment as a destination, deploy to it and [assign a domain](/docs/domains/working-with-domains/add-a-domain-to-environment) to the environment. The domain must be verified and serve the environment's latest deployment directly rather than redirect elsewhere. Vercel Connect forwards events through that domain.

Registering a trigger destination also enables its target environment on the connector's project link, allowing deployments there to request tokens.

### Use the CLI

Pass `--triggers` when attaching a connector to a project:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production --triggers
```

To target a Preview branch, set a custom receiver path, or do both, add `--trigger-branch`, `--trigger-path`, or both:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment production \
  --triggers --trigger-branch staging --trigger-path /api/slack-events
```

To target a Custom Environment, pass its slug to `--trigger-environment`:

```bash filename="terminal"
vercel connect attach slack/acme-slack --project my-project --environment qa \
  --triggers --trigger-environment qa --trigger-path /api/slack-events
```

`--trigger-environment` selects where Vercel Connect sends provider events. The CLI combines the environments passed to `--environment` with the trigger target. For a project with no existing trigger destinations, the example above produces a project link that contains only `qa`. Existing trigger destinations remain registered, and the CLI preserves any Custom Environments they require on the project link. If you omit `--environment`, the CLI links `production`, `preview`, and `development`, adds `qa` because it is the trigger target, and preserves Custom Environments required by existing destinations.

`--trigger-environment` and `--trigger-branch` are mutually exclusive and only valid with `--triggers`. If you omit both options, the trigger destination targets Production. If you omit `--trigger-path`, Vercel derives the receiver path from the connector and project framework. Pass `--trigger-path` to select the receiver path explicitly.

When you omit `--triggers`, `vercel connect attach` updates the project link without adding a trigger destination. Existing trigger destinations remain registered. You can also add or remove destinations from the Vercel Dashboard.

Removing a trigger destination does not remove its environment from the project link. Edit the link under **Projects** if you also want to revoke token access.

Deleting a Custom Environment removes trigger destinations that target it. Vercel Connect does not reroute those events to Production or Preview.

## Verifying a forwarded request

When Vercel Connect forwards an event to your project, it signs the outbound request so your handler can confirm it came from Vercel Connect. Verify the signature on the receiving end before acting on the payload. Vercel Connect publishes the signing key per connector for this purpose.

## Errors

If the target does not resolve to a deployment, or the receiving handler returns a 5xx status, delivery fails. Requests that receive status `500`, `502`, `503`, or `504` are attempted up to three times. The Vercel Dashboard shows aggregate trigger metrics rather than a per-event delivery log, so use the target deployment's runtime logs to investigate an individual request.

## Next steps

- [Slack connector](/connect/slack): Review Slack's default events and setup instructions.
- [Connector catalog](/connect/browse): Which connectors support triggers and their default events.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach --triggers`.


---

[View full sitemap](/docs/sitemap)
