---
title: Drain Audit Logs to Panther
product: vercel
url: /docs/drains/audit-logs-to-panther
canonical_url: "https://vercel.com/docs/drains/audit-logs-to-panther"
last_updated: 2026-08-06
type: how-to
prerequisites:
  - /docs/drains
related:
  - /docs/drains/using-drains
  - /docs/drains/reference/audit-logs
summary: "Learn how to forward Vercel Audit Log Drain events to Panther using Panther's built-in Vercel source."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/drains/audit-logs-to-panther.md"
fetched_at: "2026-08-10T05:33:51.465Z"
sha256: "b5769ae7399986fd0f10deb00d60f54ac89675cb6b54e490d4359fe6b2c06d52"
---

# Drain Audit Logs to Panther

> **🔒 Permissions Required**: Audit Log Drains

Audit Log Drains can forward team activity events to [Panther](https://panther.com/) using [Panther's built-in Vercel source](https://docs.panther.com/data-onboarding/supported-logs/vercel). Use this setup to ingest audit logs into Panther for security monitoring, compliance review, and threat detection.

The Panther destination sends Audit Log Drain events as JSON to the HTTP Source URL that Panther generates. Vercel authenticates each request with the source's Bearer token, and Panther ingests the events as the `Vercel.Audit` log type.

## Getting started with Audit Logs to Panther

Before you configure the drain, make sure you have:

- Permission to create log sources in Panther
- Access to [configure Audit Log Drains](/docs/drains/using-drains) for your Vercel team

- ### Create a Vercel source in Panther
  - In the Panther Console, open **Log Sources**, click **Create New**, search for **Vercel**, and select the Vercel source.
  - Click **Start Setup**, then enter a name for the source. Panther sets the log type to `Vercel.Audit` and the authentication method to **Bearer**.
  Generate a Bearer token and save it in a secure location. Click **Setup**, wait for Panther to create the endpoint, then copy the **HTTP Source URL** from the source details.

- ### Configure the drain in Vercel
  In the Vercel dashboard, go to **Team Settings** > [**Drains**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fsettings%2Fdrains\&title=Go+to+Drains+settings), click **Add Drain**, and choose **Audit Log** as the data type.

  Enter a name for the drain, select **Panther** as the destination, and configure these fields:
  - **Webhook URL**: Paste the **HTTP Source URL** from Panther.
  - **Token**: Paste the generated Bearer token without the `Bearer` prefix. Vercel adds the prefix to the `Authorization` header.
  Click **Test** to send an example event to Panther. A successful test confirms that the source URL and token are valid.

- ### Create and verify the drain
  Click **Create Drain** to begin forwarding team activity events. In Panther, open the Vercel log source and verify that `Vercel.Audit` events arrive.

## Configuration reference

| Field       | Description                                                       | Example                                                          |
| ----------- | ----------------------------------------------------------------- | ---------------------------------------------------------------- |
| Webhook URL | The HTTP Source URL that Panther generates for the Vercel source. | `https://logs.your_panther_domain_here/http/your_source_id_here` |
| Token       | The Bearer token that Panther generates for the source.           | `your_panther_token_here`                                       |

## Format

Vercel sends the standard Audit Log Drain JSON format to the Panther HTTP Source URL over HTTPS and sets the `Authorization` header to `Bearer <token>`.

See the [Audit Log Drains reference](/docs/drains/reference/audit-logs#panther) for delivery details and the underlying audit log schema.

## More resources

- [Audit Log Drains reference](/docs/drains/reference/audit-logs)
- [Configure Drains](/docs/drains/using-drains)
- [Vercel Logs in Panther](https://docs.panther.com/data-onboarding/supported-logs/vercel)


---

[View full sitemap](/docs/sitemap)
