---
title: Triggers
product: vercel
url: /docs/connect/concepts/triggers
canonical_url: "https://vercel.com/docs/connect/concepts/triggers"
last_updated: 2026-07-28
type: conceptual
prerequisites:
  - /docs/connect/concepts
  - /docs/connect
related:
  - /docs/connect/concepts/tokens
  - /docs/deployments/environments
  - /docs/domains/working-with-domains/add-a-domain-to-environment
  - /docs/connect/quickstart
  - /docs/connect/concepts/connectors
summary: Incoming webhooks from third-party services, verified by Vercel Connect and forwarded to your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/connect/concepts/triggers.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "593638ad1adfdcb5f5e4e0a549c5c80e791d4c58da34d32646008bc049c4e716"
---

# Triggers

A **trigger** is an incoming webhook from a third-party service that Vercel Connect verifies and forwards to your projects. Where [tokens](/docs/connect/concepts/tokens) are the outbound half of Vercel Connect (your code calling the provider), triggers are the inbound half (the provider calling your code).

Trigger forwarding is Slack-only in beta.

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

- [Quickstart](/docs/connect/quickstart): The Slack walkthrough includes a `--triggers` example.
- [Connectors](/docs/connect/concepts/connectors): Which connector types support triggers.
- [CLI Reference](/docs/cli/connect): Full surface of `vercel connect attach --triggers`.


---

[View full sitemap](/docs/sitemap)
