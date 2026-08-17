---
title: Using Global Config
product: vercel
url: /docs/global-config/using-global-config
canonical_url: "https://vercel.com/docs/global-config/using-global-config"
last_updated: 2026-07-29
type: conceptual
prerequisites:
  - /docs/global-config
related:
  - /docs/global-config
  - /docs/cdn
  - /docs/global-config/global-config-sdk
  - /docs/rest-api
  - /docs/global-config/vercel-api
summary: Learn how to use Global Configs in your projects.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/global-config/using-global-config.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "dbe7a363ae6f70a5b6e9b916b11d2840bc116cfd3f21c10cbdbbba252f33f122"
---

# Using Global Config

[Global Config](/docs/global-config) is a global data store that offers ultra-low latency read speeds from anywhere in the world thanks to [Vercel's CDN](/docs/cdn).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Getting Started](https://vercel.com/docs/global-config/get-started?from=related) — Learn how to create a Global Config store and read from it in your project.
- [vercel global-config](https://vercel.com/docs/cli/global-config?from=related) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a
- [Create a Global Config](https://vercel.com/docs/rest-api/global-config/create-a-global-config?from=related)
- [Get Global Configs](https://vercel.com/docs/rest-api/global-config/get-global-configs?from=related)
- [LaunchDarkly](https://vercel.com/docs/global-config/global-config-integrations/launchdarkly-global-config?from=related) — Learn how to use Global Config with Vercel's LaunchDarkly integration.

Full cross-link map for this page: [/docs/global-config/using-global-config.graph.md](/docs/global-config/using-global-config.graph.md)
<!-- /docsgraph:related -->

We recommend using [the Global Config client SDK](/docs/global-config/global-config-sdk) to read data from your Global Configs. To write data to your Global Configs, use [Vercel REST API](/docs/rest-api) as outlined in [our docs on managing Global Configs with the API](/docs/global-config/vercel-api).

This page outlines all the ways you can interact with your Global Configs, and our recommended best approaches.

## Reading data from Global Configs

There are multiple ways to read data from your Global Configs, but **we recommend using [our Global Config client SDK](/docs/global-config/global-config-sdk) in your projects**.

If you prefer making direct API requests to your Global Config, we recommend sending them to your [Global Config endpoint](#understanding-global-config-endpoints). You can request data through Vercel REST API, but we recommend against ever doing so. Requests to Vercel REST API do not benefit from the optimizations Vercel applies to Global Config reads. Requests to a Global Config endpoint do.

Global Config is optimized to work with Vercel's CDN. As a result, Global Configs accessed from local development environments cannot benefit from Vercel's optimizations and will be over 100 milliseconds slower than production.

### Understanding Global Config endpoints

Global Config is available at two separate REST APIs which are built for distinct use cases:

- `api.vercel.com`: [Vercel REST API](/docs/rest-api) built for managing Global Config
- `global-config.vercel.com`: [Global Config endpoint](/docs/global-config/using-global-config#querying-global-config-endpoints) intended for reading Global Config at high volume

#### `api.vercel.com`

- This endpoint is part of the [Vercel REST API](/docs/rest-api)
- It is intended to [manage Global Configs](/docs/global-config/vercel-api)
- You can use this endpoint to create, update, and delete Global Configs
- This endpoint is served from a single region and we do not apply any of our read optimizations
- This endpoint is rate limited to 500 requests per minute
- Reading Global Config from this endpoint will always return the latest version of a Global Config
- This endpoint uses the [Vercel REST API authentication](/docs/rest-api#authentication)

#### `global-config.vercel.com`

- This is a highly optimized, globally distributed, actively replicated endpoint built for global, low latency, high volume reads
- This endpoint has no rate limits
- This is the endpoint [`@vercel/global-config`](/docs/global-config/global-config-sdk) reads from
- This endpoint uses the Global Config's own [Read Access tokens](/docs/global-config/using-global-config#creating-a-read-access-token)

#### Querying Global Config endpoints

You can use the following routes when querying your Global Config endpoint:

- `/<globalConfigId>/items`
- `/<globalConfigId>/item/<itemKey>`
- `/<globalConfigId>/digest`

You can authenticate with a [Read Access token](/docs/global-config/using-global-config#creating-a-read-access-token), which you can add to the `Authorization` header of your request, setting `Bearer <token>` as the value.

### Finding your Global Config ID

You can find your Global Config ID with one of the following methods:

- In your dashboard, under the **Storage** section in the sidebar. Select your Global Config, and you'll see the ID under the **Global Config ID** label near the top of the page, as shown in the screenshot below:

![Image](https://vercel.com/docs-assets/static/docs/storage/global-config/config-id-light.png)

- Send a `GET` request to the `/global-config` endpoint of Vercel REST API. The response will be a list of Global Configs associated with your account (or team, if you add the `teamId` query parameter)

```bash
https://api.vercel.com/v1/global-config?teamId=<teamId>
```

### Creating a read access token

A read access token is automatically generated when you connect a Global Config to a project.

> **💡 Note:** Vercel shows the full token value only once, right after creation, whether
> you use the dashboard or the API. Copy it immediately and store it somewhere
> safe. If you lose the token, delete it and create a new one.

There are multiple ways to create a Read Access token for your Global Config manually:

- In the **Storage** section in your project dashboard sidebar. See [our Global Config dashboard docs](/docs/global-config/global-config-dashboard#managing-read-access-tokens) to learn how
- Through a `POST` request to Vercel REST API

#### Using Vercel API

First, you'll need an access token for Vercel REST API, which you must add to an `Authorization` header with the `Bearer <token>` pattern to validate requests. To learn more, see [Creating an access token](/docs/rest-api#creating-an-access-token).

Then you can send a `POST` request to the `/global-config/<globalConfigId>/token` path, as shown below, inserting [your Global Config's ID](#finding-your-global-config-id) where appropriate:

> **💡 Note:** Copy the token from the response immediately and store it somewhere safe.
> This is the only time Vercel returns the full token value. Later requests
> return only a truncated preview.

#### \['cURL'

```bash filename="cURL"
curl -X 'POST' 'https://api.vercel.com/v1/global-config/my_global_config_id/token' \
     -H 'Authorization: Bearer your_vercel_api_token_here' \
     -H 'Content-Type: application/json; charset=utf-8' \
     -d $'{ "label": "my global config token label" }'

```

#### 'fetch']

```javascript filename="fetch"
try {
  const createReadAccessToken = await fetch(
    'https://api.vercel.com/v1/global-config/my_global_config_id/token',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${your_vercel_api_token_here}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        label: 'my global config token label',
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
  "token": "your_global_config_read_access_token_here",
  "id": "your_global_config_token_id_here"
}
```

### Using a connection string

A connection string is a URL that connects a project to a Global Config. It has the following format:

```bash filename="connection string"
https://global-config.vercel.com/<globalConfigId>?token=<token>
```

There are three ways to get a connection string:

- **From the create token dialog.** When you [create a token from the dashboard](/docs/global-config/global-config-dashboard#managing-read-access-tokens), the confirmation dialog shows the full connection string alongside the token. Copy it before closing the dialog.
- **From a `GLOBAL_CONFIG` environment variable.** When you connect a Global Config to a project from the dashboard, Vercel automatically creates a `GLOBAL_CONFIG` environment variable containing the connection string. You can retrieve the value locally with [`vercel env pull`](/docs/cli/env), or copy it from the project's **Settings > Environment Variables** page.
- **By building one manually.** Combine [your Global Config ID](#finding-your-global-config-id) with the plaintext token from the [create a read access token](#creating-a-read-access-token) API response. This is useful when you need a connection string outside of Vercel.

Save the connection string as soon as you generate the token. Vercel only returns the plaintext token once, so you can't rebuild the connection string later.

> **💡 Note:** A token is not created when you create a Global Config at the account level,
> until you connect a project.

**Vercel will optimize your reads to be faster if you set the connection string as an environment variable.** Hard-coding your connection string into your application as a string will not allow Vercel to detect the URL and optimize your reads.

The variable can be called anything, but [our Global Config client SDK](/docs/global-config/global-config-sdk) will search for `process.env.GLOBAL_CONFIG` by default. See our [environment variables](/docs/environment-variables#creating-environment-variables) docs to learn how to create one.

## Writing data to Global Configs

Global Config is optimized for **many reads** and **few writes**. To write data to your Global Configs, see [our docs on doing so with Vercel REST API](/docs/global-config/vercel-api).

## Global Config backups

Global Config backups are a backup and restore functionality that allows you to access and roll back to a previous point in time.

Restoring a backup will immediately update the live data, and the data that was live before the restore will become available as a new backup.

Backups are taken when you make any changes either through the dashboard or API. They do not contribute to your storage size. The length of time each backup is held for depends on your plan, see [Limits and Pricing](/docs/global-config/global-config-limits) for more information.


---

[View full sitemap](/docs/sitemap)
