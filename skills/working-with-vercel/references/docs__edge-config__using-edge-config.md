---
title: Using Edge Config
product: vercel
url: /docs/edge-config/using-edge-config
canonical_url: "https://vercel.com/docs/edge-config/using-edge-config"
last_updated: 2026-04-21
type: conceptual
prerequisites:
  - /docs/edge-config
related:
  - /docs/edge-config
  - /docs/cdn
  - /docs/edge-config/edge-config-sdk
  - /docs/rest-api
  - /docs/edge-config/vercel-api
summary: Learn how to use Edge Configs in your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/edge-config/using-edge-config.md"
fetched_at: "2026-06-15T20:38:13.599Z"
sha256: "6fdfd5c7059d5c71fef5555f1b8918edc6f0df79c1164ea1471de026316e19bf"
---

# Using Edge Config

[Edge Config](/docs/edge-config) is a global data store that offers ultra-low latency read speeds from anywhere in the world thanks to [Vercel's CDN](/docs/cdn).

We recommend using [the Edge Config client SDK](/docs/edge-config/edge-config-sdk) to read data from your Edge Configs. To write data to your Edge Configs, use [Vercel REST API](/docs/rest-api) as outlined in [our docs on managing Edge Configs with the API](/docs/edge-config/vercel-api).

This page outlines all the ways you can interact with your Edge Configs, and our recommended best approaches.

## Reading data from Edge Configs

There are multiple ways to read data from your Edge Configs, but **we recommend using [our Edge Config client SDK](/docs/edge-config/edge-config-sdk) in your projects**.

If you prefer making direct API requests to your Edge Config, we recommend sending them to your [Edge Config endpoint](#understanding-edge-config-endpoints). You can request data through Vercel REST API, but we recommend against ever doing so. Requests to Vercel REST API do not benefit from the optimizations Vercel applies to Edge Config reads. Requests to an Edge Config endpoint do.

Edge Config is optimized to work with Vercel's CDN. As a result, Edge Configs accessed from local development environments cannot benefit from Vercel's optimizations and will be over 100 milliseconds slower than production.

### Understanding Edge Config endpoints

Edge Config is available at two separate REST APIs which are built for distinct use cases:

- `api.vercel.com`: [Vercel REST API](/docs/rest-api) built for managing Edge Config
- `edge-config.vercel.com`: [Edge Config endpoint](/docs/edge-config/using-edge-config#querying-edge-config-endpoints) intended for reading Edge Config at high volume

#### `api.vercel.com`

- This endpoint is part of the [Vercel REST API](/docs/rest-api)
- It is intended to [manage Edge Configs](/docs/edge-config/vercel-api)
- You can use this endpoint to create, update, and delete Edge Configs
- This endpoint is served from a single region and we do not apply any of our read optimizations
- This endpoint is rate limited to 20 Edge Config Item reads per minute
- Reading Edge Config from this endpoint will always return the latest version of an Edge Config
- This endpoint uses the [Vercel REST API authentication](/docs/rest-api#authentication)

#### `edge-config.vercel.com`

- This is a highly optimized, globally distributed, actively replicated endpoint built for global, low latency, high volume reads
- This endpoint has no rate limits
- This is the endpoint [`@vercel/edge-config`](/docs/edge-config/edge-config-sdk) reads from
- This endpoint uses the Edge Config's own [Read Access tokens](/docs/edge-config/using-edge-config#creating-a-read-access-token)

#### Querying Edge Config endpoints

You can use the following routes when querying your Edge Config endpoint:

- `/<edgeConfigId>/items`
- `/<edgeConfigId>/item/<itemKey>`
- `/<edgeConfigId>/digest`

You can authenticate with a [Read Access token](/docs/edge-config/using-edge-config#creating-a-read-access-token), which you can add to the `Authorization` header of your request, setting `Bearer <token>` as the value.

### Finding your Edge Config ID

You can find your Edge Config ID with one of the following methods:

- In your dashboard, under the **Storage** section in the sidebar. Select your Edge Config, and you'll see the ID under the **Edge Config ID** label near the top of the page, as shown in the screenshot below:

![Image](https://vercel.com/docs-assets/static/docs/storage/edge-config/config-id-light.png)

- Send a `GET` request to the `/edge-config` endpoint of Vercel REST API, as outlined in [our API reference](/docs/rest-api/reference/endpoints/edge-config/get-edge-configs). The response will be a list of Edge Configs associated with your account (or team, if you add the `teamId` query parameter)

```bash
https://api.vercel.com/v1/edge-config?teamId=<teamId>
```

### Creating a read access token

A read access token is automatically generated when you connect an Edge Config to a project.

> **⚠️ Warning:** Vercel shows the full token value only once, right after creation, whether
> you use the dashboard or the API. Copy it immediately and store it somewhere
> safe. If you lose the token, delete it and create a new one.

There are multiple ways to create a Read Access token for your Edge Config manually:

- In the **Storage** section in your project dashboard sidebar. See [our Edge Config dashboard docs](/docs/edge-config/edge-config-dashboard#managing-read-access-tokens) to learn how
- Through a `POST` request to Vercel REST API

#### Using Vercel API

First, you'll need an access token for Vercel REST API, which you must add to an `Authorization` header with the `Bearer <token>` pattern to validate requests. To learn more, see [Creating an access token](/docs/rest-api#creating-an-access-token).

Then you can send a `POST` request to the [`/edge-config/<edgeConfigId>/token`](/docs/rest-api/reference/endpoints/edge-config/create-an-edge-config) path, as shown below, inserting [your Edge Config's ID](#finding-your-edge-config-id) where appropriate:

> **⚠️ Warning:** Copy the token from the response immediately and store it somewhere safe.
> This is the only time Vercel returns the full token value. Later requests
> return only a truncated preview.

#### \['cURL'

```bash filename="cURL"
curl -X 'POST' 'https://api.vercel.com/v1/edge-config/my_edge_config_id/token' \
     -H 'Authorization: Bearer your_vercel_api_token_here' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{ "label": "my edge config token label" }'

```

#### 'fetch']

```javascript filename="fetch"
try {
  const createReadAccessToken = await fetch(
    'https://api.vercel.com/v1/edge-config/my_edge_config_id/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${your_vercel_api_token_here}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'my edge config token label',
      }),
    },
  );
  const result = await createReadAccessToken.json();
  console.log(result);
} catch (error) {
  console.log(error);
}
```

> **💡 Note:** Append the `teamId` query parameter to the request if the
> config is scoped to a Vercel team.

The API response is a JSON object with the token's `id` and the full plaintext `token` value. This is the only time Vercel returns the full token, so copy it before moving on. Later `GET` requests return only a truncated preview.

```json filename="response"
{
  "token": "your_edge_config_read_access_token_here",
  "id": "your_edge_config_token_id_here"
}
```

### Using a connection string

A connection string is a URL that connects a project to an Edge Config. It has the following format:

```bash filename="connection string"
https://edge-config.vercel.com/<edgeConfigId>?token=<token>
```

There are three ways to get a connection string:

- **From the create token dialog.** When you [create a token from the dashboard](/docs/edge-config/edge-config-dashboard#managing-read-access-tokens), the confirmation dialog shows the full connection string alongside the token. Copy it before closing the dialog.
- **From an `EDGE_CONFIG` environment variable.** When you connect an Edge Config to a project from the dashboard, Vercel automatically creates an `EDGE_CONFIG` environment variable containing the connection string. You can retrieve the value locally with [`vercel env pull`](/docs/cli/env), or copy it from the project's **Settings > Environment Variables** page.
- **By building one manually.** Combine [your Edge Config ID](#finding-your-edge-config-id) with the plaintext token from the [create a read access token](#creating-a-read-access-token) API response. This is useful when you need a connection string outside of Vercel.

Save the connection string as soon as you generate the token. Vercel only returns the plaintext token once, so you can't rebuild the connection string later.

> **💡 Note:** A token is not created when you create an Edge Config at the account level,
> until you connect a project.

**Vercel will optimize your reads to be faster if you set the connection string as an environment variable.** Hard-coding your connection string into your application as a string will not allow Vercel to detect the URL and optimize your reads.

The variable can be called anything, but [our Edge Config client SDK](/docs/edge-config/edge-config-sdk) will search for `process.env.EDGE_CONFIG` by default. See our [environment variables](/docs/environment-variables#creating-environment-variables) docs to learn how to create one.

## Writing data to Edge Configs

Edge Config is optimized for **many reads** and **few writes**. To write data to your Edge Configs, see [our docs on doing so with Vercel REST API](/docs/edge-config/vercel-api).

## Edge Config backups

Edge Config backups are a backup and restore functionality that allows you to access and roll back to a previous point in time.

Restoring a backup will immediately update the live data, and the data that was live before the restore will become available as a new backup.

Backups are taken when you make any changes either through the dashboard or API. They do not contribute to your storage size. The length of time each backup is held for depends on your plan, see [Limits and Pricing](/docs/edge-config/edge-config-limits) for more information.


---

[View full sitemap](/docs/sitemap)
