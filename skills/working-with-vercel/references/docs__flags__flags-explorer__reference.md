---
title: Reference
product: vercel
url: /docs/flags/flags-explorer/reference
canonical_url: "https://vercel.com/docs/flags/flags-explorer/reference"
last_updated: 2026-04-24
type: reference
prerequisites:
  - /docs/flags/flags-explorer
  - /docs/flags
related:
  - /docs/flags/observability/web-analytics
  - /docs/environment-variables/system-environment-variables
  - /docs/cli/flags
  - /docs/microfrontends
summary: In-depth reference for configuring the Flags Explorer
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/flags-explorer/reference.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "2553bdb35835afb4e68e93244d269c7228e33e216701ae8c32be3e80831ef251"
---

# Reference

> Flags Explorer is available on all plans

The Flags Explorer has five main concepts: the [Discovery Endpoint](/docs/flags/flags-explorer/reference#discovery-endpoint), the [FLAGS\_SECRET environment variable](/docs/flags/flags-explorer/reference#flags_secret-environment-variable), the [override cookie](/docs/flags/flags-explorer/reference#override-cookie), [flag definitions](/docs/flags/flags-explorer/reference#definitions), and [flag values](/docs/flags/flags-explorer/reference#values).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Flags as code in Next.js](https://vercel.com/blog/flags-as-code-in-next-js)
- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit) — Using the Flags SDK in SvelteKit
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel)
- [flags/next](https://flags-sdk.dev/docs/api-reference/frameworks/next) — APIs for working with feature flags in Next.js.
- [Quickstart](https://flags-sdk.dev/docs/frameworks/next) — Learn how to start using the Flags SDK in your Next.js project.
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Getting started with Flags Explorer](https://vercel.com/docs/flags/flags-explorer/getting-started) — Learn how to set up the Flags Explorer so you can see and override your application's feature flags
- [Setting up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot

Full cross-link map for this page: [/docs/flags/flags-explorer/reference.graph.md](/docs/flags/flags-explorer/reference.graph.md)
<!-- /docsgraph:related -->

## Definitions

The Flags Explorer needs to know about your feature flags before it can display them.

Flag definitions are metadata for your feature flags, which communicate:

- Name
- URL for where your team can manage the flag
- Description
- Possible values and their (optional) labels

A definition can never communicate the value of a flag as they load independently from [flag values](/docs/flags/flags-explorer/reference#values). See [flag definitions](/docs/flags/flags-explorer/reference#definitions) for more information.

```json
{
  "bannerFlag": {
    "origin": "https://example.com/flag/bannerFlag",
    "description": "Determines whether the banner is shown",
    "options": [
      { "value": true, "label": "on" },
      { "value": false, "label": "off" }
    ]
  }
}
```

This is how Vercel Toolbar shows flag definitions:

![Flags Explorer showing flag values.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/workflow-collaboration/feature-flags/flags-explorer-definitions-light.png)

There are two ways to provide your feature flags to the Flags Explorer:

1. [Returning definitions through the Flags Discovery Endpoint](/docs/flags/flags-explorer/reference#returning-definitions-through-the-flags-discovery-endpoint)
2. [Embedding definitions through script tags](/docs/flags/flags-explorer/reference#embedding-definitions-through-script-tags)

### Returning definitions through the Flags Discovery Endpoint

The Flags Discovery Endpoint is the recommended way to provide your feature flags to the Flags Explorer. The Flags Explorer will request your application's [Flags Discovery Endpoint](/docs/flags/flags-explorer/reference#discovery-endpoint) to fetch the feature flag definitions and other settings.

See [Definitions properties](/docs/flags/flags-explorer/reference#definitions-properties) for a full list of properties you can return from your Flags Discovery Endpoint.

### Embedding definitions through script tags

We strongly recommend communicating your feature flag definitions through the [Flags Discovery Endpoint](/docs/flags/flags-explorer/reference#discovery-endpoint). In rare cases, it can be useful to communicate feature flag definitions through the HTML response. Vercel Toolbar will pick up any script tags included in the DOM which have a `data-flag-definitions` attribute.

If you are using React or Next.js, use the [`FlagDefinitions`](https://flags-sdk.dev/docs/api-reference/core/react#flagdefinitions) component. If you are using another framework or no framework at all you can render these script tags manually. The expected shape is:

```ts
type FlagDefinitionsType = Record<
  string,
  {
    options?: {
      value: any;
      label?: string;
    }[];
    origin?: string;
    description?: string;
  }
>;
```

This example shows how to communicate a feature flag definition through the DOM:

```html
<script type="application/json" data-flag-definitions>
  {
    "showBanner": {
      "description": "Shows or hide the banner",
      "origin": "https://example.com/showBanner",
      "options": [
        { "value": false, "label": "Hide" },
        { "value": true, "label": "Show" }
      ]
    }
  }
</script>
```

You can also encrypt the definitions before emitting them to prevent leaking your feature flags through the DOM. `encryptFlagDefinitions` requires a [`FLAGS_SECRET`](/docs/flags/flags-explorer/reference#flags_secret-environment-variable) and throws without one.

```js
import { encryptFlagDefinitions, safeJsonStringify } from 'flags';

const encryptedDefinitions = await encryptFlagDefinitions(definitions);

<script type="application/json" data-flag-definitions>
  ${safeJsonStringify(encryptedDefinitions)}
</script>;
```

> **💡 Note:** Using `JSON.stringify` within script tags leads to [XSS
> vulnerabilities](https://owasp.org/www-community/attacks/xss/). Use
> `safeJsonStringify` exported by `flags` to stringify safely.

## Values

Your Flags Discovery Endpoint returns your application's feature flag definitions containing information like their key, description, origin, and available options. However the Flags Discovery Endpoint cannot return the value a flag evaluated to, since this value might depend on the request which rendered the page initially.

You can optionally provide the values of your feature flags to Flags Explorer in two ways:

1. [Emitting values using the React components](/docs/flags/flags-explorer/reference#emitting-values-using-the-flagvalues-react-component)
2. [Embedding values through script tags](/docs/flags/flags-explorer/reference#embedding-values-through-script-tags)

Emitted values will show up in the Flags Explorer, and will be used by [Web Analytics to annotate events](/docs/flags/observability/web-analytics).

This is how Vercel Toolbar shows flag values:

![Default Feature Flag Values in Vercel Toolbar.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/workflow-collaboration/feature-flags/flags-explorer-default-value-light.png)

Any JSON-serializable values are supported. Flags Explorer combines these values with any definitions, if they are present.

```json
{ "bannerFlag": true, "buttonColor": "blue" }
```

### Emitting values using the FlagValues React component

The `flags` package exposes React components which allow making the Flags Explorer aware of your feature flag's values.

```tsx filename="pages/index.tsx" framework=nextjs
import { FlagValues } from 'flags/react';

export default function Page() {
  return (
    <div>
      {/* Some other content */}
      <FlagValues values={{ exampleFlag: true }} />
    </div>
  );
}
```

```jsx filename="pages/index.jsx" framework=nextjs
import { FlagValues } from 'flags/react';

export default function Page() {
  return (
    <div>
      {/* Some other content */}
      <FlagValues values={{ exampleFlag: true }} />
    </div>
  );
}
```

```tsx filename="app/page.tsx" framework=nextjs-app
import { FlagValues } from 'flags/react';

export default function Page() {
  return (
    <div>
      {/* Some other content */}
      <FlagValues values={{ exampleFlag: true }} />
    </div>
  );
}
```

```jsx filename="app/page.jsx" framework=nextjs-app
import { FlagValues } from 'flags/react';

export default function Page() {
  return (
    <div>
      {/* Some other content */}
      <FlagValues values={{ exampleFlag: true }} />
    </div>
  );
}
```

The approaches above will add the names and values of your feature flags to the DOM in plain text. Use the `encryptFlagValues` function to keep your feature flags confidential.

```tsx filename="pages/index.tsx" framework=nextjs
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { encryptFlagValues, decryptOverrides } from 'flags';
import { FlagValues } from 'flags/react';

type Flags = {
  banner: boolean;
};

async function getFlags(
  request: GetServerSidePropsContext['req'],
): Promise<Flags> {
  const overridesCookieValue = request.cookies['vercel-flag-overrides'];
  const overrides = overridesCookieValue
    ? await decryptOverrides(overridesCookieValue)
    : null;

  return {
    banner: overrides?.banner ?? false,
  };
}

export const getServerSideProps: GetServerSideProps<{
  flags: Flags;
  encryptedFlagValues: string;
}> = async (context) => {
  const flags = await getFlags(context.req);
  const encryptedFlagValues = await encryptFlagValues(flags);

  return { props: { flags, encryptedFlagValues } };
};

export default function Page({
  flags,
  encryptedFlagValues,
}: {
  flags: Flags;
  encryptedFlagValues: string;
}) {
  return (
    <>
      <FlagValues values={encryptedFlagValues} />
      {flags.banner ? <div>Banner</div> : null}
    </>
  );
}
```

```jsx filename="pages/index.jsx" framework=nextjs
import { encryptFlagValues, decryptOverrides } from 'flags';
import { FlagValues } from 'flags/react';

async function getFlags(request) {
  const overridesCookieValue = request.cookies['vercel-flag-overrides'];
  const overrides = overridesCookieValue
    ? await decryptOverrides(overridesCookieValue)
    : null;

  return {
    banner: overrides?.banner ?? false,
  };
}

export const getServerSideProps = async (context) => {
  const flags = await getFlags(context.req);
  const encryptedFlagValues = await encryptFlagValues(flags);

  return { props: { flags, encryptedFlagValues } };
};

export default function Page({ flags, encryptedFlagValues }) {
  return (
    <>
      <FlagValues values={encryptedFlagValues} />
      {flags.banner ? <div>Banner</div> : null}
    </>
  );
}
```

```tsx filename="app/page.tsx" framework=nextjs-app
import { Suspense } from 'react';
import { encryptFlagValues, type FlagValuesType } from 'flags';
import { FlagValues } from 'flags/react';

async function ConfidentialFlagValues({ values }: { values: FlagValuesType }) {
  const encryptedFlagValues = await encryptFlagValues(values);
  return <FlagValues values={encryptedFlagValues} />;
}

export default function Page() {
  const values: FlagValuesType = { exampleFlag: true };

  return (
    <div>
      {/* Some other content */}
      <Suspense fallback={null}>
        <ConfidentialFlagValues values={values} />
      </Suspense>
    </div>
  );
}
```

```jsx filename="app/page.jsx" framework=nextjs-app
import { Suspense } from 'react';
import { encryptFlagValues } from 'flags';
import { FlagValues } from 'flags/react';

async function ConfidentialFlagValues({ values }) {
  const encryptedFlagValues = await encryptFlagValues(values);
  return <FlagValues values={encryptedFlagValues} />;
}

export default function Page() {
  const values = { exampleFlag: true };

  return (
    <div>
      {/* Some other content */}
      <Suspense fallback={null}>
        <ConfidentialFlagValues values={values} />
      </Suspense>
    </div>
  );
}
```

The `FlagValues` component will emit a script tag with a `data-flag-values` attribute, which gets picked up by the Flags Explorer. Flags Explorer then combines the flag values with the definitions returned by your Discovery Endpoint. If you are not using React or Next.js you can render these script tags manually as shown in the next section.

### Embedding values through script tags

Flags Explorer scans the DOM for script tags with the `data-flag-values` attribute. Any changes to content get detected by a mutation observer.

You can emit the values of feature flags to the Flags Explorer by rendering script tags with the `data-flag-values` attribute.

```html
<script type="application/json" data-flag-values>
  {
    "showBanner": true,
    "showAds": false,
    "pricing": 5
  }
</script>
```

> **💡 Note:** Be careful when creating these script tags. Using `JSON.stringify` within
> script tags leads to [XSS
> vulnerabilities](https://owasp.org/www-community/attacks/xss/). Use
> `safeJsonStringify` exported by `flags` to stringify safely.

The expected shape is:

```ts
type FlagValues = Record<string, any>;
```

To prevent disclosing feature flag names and values to the client, the information can be encrypted. This keeps the feature flags confidential. Use the Flags SDK's `encryptFlagValues` function to encrypt your flag values on the server before rendering them on the client. On Vercel, `encryptFlagValues` uses Vercel's public key, so only Flags Explorer can read the values. If your project has a `FLAGS_SECRET` environment variable, `encryptFlagValues` uses that secret instead, and Flags Explorer decrypts the values with the `FLAGS_SECRET` from your project.

```tsx
import { encryptFlagValues, safeJsonStringify } from 'flags';

// Encrypt your flags and their values on the server.
const encryptedFlagValues = await encryptFlagValues({
  showBanner: true,
  showAds: false,
  pricing: 5,
});

// Render the encrypted values on the client.
// Note: Use `safeJsonStringify` to ensure `encryptedFlagValues` is correctly formatted as JSON.
//       This step may vary depending on your framework or setup.
<script type="application/json" data-flag-values>
  {safeJsonStringify(encryptedFlagValues)}
</script>;
```

## `FLAGS_SECRET` environment variable

On Vercel, Flags Explorer works without a `FLAGS_SECRET` when you use `flags` version 4.5.0 or later:

- Vercel signs the requests to your [Flags Discovery Endpoint](/docs/flags/flags-explorer/reference#discovery-endpoint), and [`verifyAccess`](https://flags-sdk.dev/docs/api-reference/core/core#verifyaccess) verifies them.
- Vercel signs the overrides that Vercel Toolbar stores, and the Flags SDK verifies them.
- `encryptFlagValues` encrypts flag values with Vercel's public key.

For this to work, your project must [expose the system environment variables](/docs/environment-variables/system-environment-variables), which is the default. For local development, run `vercel env pull` so the Flags SDK can identify your project.

Projects that already have a `FLAGS_SECRET` keep working without changes. When the secret is set, it gates access to the Flags Discovery Endpoint, and Vercel Toolbar uses it to encrypt overrides.

### When you need a `FLAGS_SECRET`

Set a `FLAGS_SECRET` in these cases:

- Your application runs outside Vercel, or you run it locally without `vercel env pull`.
- Your project doesn't expose the system environment variables.
- You create your own encrypted overrides with `encryptOverrides`, for example in end-to-end tests or with [`vercel flags override`](/docs/cli/flags).
- You encrypt flag definitions with `encryptFlagDefinitions` to [embed them through script tags](/docs/flags/flags-explorer/reference#embedding-definitions-through-script-tags).
- You [precompute](https://flags-sdk.dev/docs/core-concepts/precompute) flags in a prebuilt deployment (`vercel build` and `vercel deploy --prebuilt`), or a precomputed code must be valid in another deployment or project.

Create the secret by following the instructions below. If you use [microfrontends](/docs/microfrontends) and set a `FLAGS_SECRET`, use the same value in every project of the microfrontends group, and enable [Automatically expose System Environment Variables](/docs/environment-variables/system-environment-variables) in each project's settings. Without them, Flags Explorer can't load the flags of child apps.

**Manually creating the `FLAGS_SECRET`**

The `FLAGS_SECRET` value must have a specific length (32 random bytes encoded in base64url) to work as an encryption key. Generate a unique value for each environment (Development, Preview, and Production) by running the following command once per environment:

```bash filename="Terminal"
node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
```

Add each value to your project's environment variables in the Vercel dashboard, scoped to the matching environment. Store the Preview and Production values as **Secret** so they cannot be read from the dashboard or CLI after creation.

Then pull your environment variables locally with `vercel env pull` to make them available to your project.

> **💡 Note:** When you use a `FLAGS_SECRET`, define it in your project settings on the
> Vercel dashboard. Defining the environment variable locally is not enough as
> Flags Explorer reads the environment variable from your project settings.

## Discovery Endpoint

Flags Explorer requests your application's [Flags Discovery Endpoint](/docs/flags/flags-explorer/reference#discovery-endpoint). This endpoint returns a configuration for the Flags Explorer that includes the flag definitions.

### Verifying a request to the Discovery Endpoint

Your endpoint should call `verifyAccess` to ensure the request to load flags originates from Vercel Toolbar. This prevents your feature flag definitions from being exposed publicly through the Discovery Endpoint. The `Authorization` header sent by Vercel Toolbar contains a short-lived token that Vercel signs for your project. On Vercel, or locally after `vercel env pull`, `verifyAccess` accepts this token without a `FLAGS_SECRET`. If your project has a `FLAGS_SECRET`, the header contains proof that whoever made this request has access to the secret instead. The secret itself is not sent over the network.

If the `verifyAccess` check fails, you should return status code `401` with a `null` JSON body and no flag definitions. When the `verifyAccess` check is successful, return the feature flag definitions and other configuration as JSON:

**Using the Flags SDK**

```ts filename="pages/api/vercel/flags.ts" framework=nextjs
import type { NextApiRequest, NextApiResponse } from 'next';
import { verifyAccess, version } from 'flags';
import { getProviderData } from 'flags/next';
import * as flags from '../../../flags';

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  const access = await verifyAccess(request.headers['authorization']);
  if (!access) return response.status(401).json(null);

  const apiData = getProviderData(flags);

  response.setHeader('x-flags-sdk-version', version);
  return response.json(apiData);
}
```

```js filename="pages/api/vercel/flags.js" framework=nextjs
import { verifyAccess, version } from 'flags';
import { getProviderData } from 'flags/next';
import * as flags from '../../../flags';

export default async function handler(request, response) {
  const access = await verifyAccess(request.headers['authorization']);
  if (!access) return response.status(401).json(null);

  const apiData = getProviderData(flags);

  response.setHeader('x-flags-sdk-version', version);
  return response.json(apiData);
}
```

```ts filename="app/.well-known/vercel/flags/route.ts" framework=nextjs-app
import { getProviderData, createFlagsDiscoveryEndpoint } from 'flags/next';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
```

```js filename="app/.well-known/vercel/flags/route.js" framework=nextjs-app
import { getProviderData, createFlagsDiscoveryEndpoint } from 'flags/next';
import * as flags from '../../../../flags';

export const GET = createFlagsDiscoveryEndpoint(() => getProviderData(flags));
```

**Using a custom setup**

If you are not using the Flags SDK to define feature flags in code, or if you are not using Next.js or SvelteKit, you need to manually return the feature flag definitions from your Discovery Endpoint.

```ts filename="pages/api/vercel/flags.ts" framework=nextjs
import { verifyAccess } from 'flags';

export default async function handler(request, response) {
  const access = await verifyAccess(request.headers['authorization'] as string);
  if (!access) return response.status(401).json(null);

  return response.json({
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://example.com/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  });
}
```

```js filename="pages/api/vercel/flags.js" framework=nextjs
import { verifyAccess } from 'flags';

export default async function handler(request, response) {
  const access = await verifyAccess(request.headers['authorization']);
  if (!access) return response.status(401).json(null);

  return response.json({
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://example.com/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  });
}
```

```ts filename="app/.well-known/vercel/flags/route.ts" framework=nextjs-app
import { createFlagsDiscoveryEndpoint } from 'flags/next';

export const GET = createFlagsDiscoveryEndpoint(async (request) => {
  return {
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://example.com/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  };
});
```

```js filename="app/.well-known/vercel/flags/route.js" framework=nextjs-app
import { createFlagsDiscoveryEndpoint } from 'flags/next';

export const GET = createFlagsDiscoveryEndpoint(async (request) => {
  return {
    definitions: {
      newFeature: {
        description: 'Controls whether the new feature is visible',
        origin: 'https://example.com/#new-feature',
        options: [
          { value: false, label: 'Off' },
          { value: true, label: 'On' },
        ],
      },
    },
  };
});
```

### Valid JSON response

The JSON response must have the following shape

```ts
type ApiData = {
  definitions: Record<
    string,
    {
      description?: string;
      origin?: string;
      options?: { value: any; label?: string }[];
    }
  >;
  hints?: { key: string; text: string }[];
  overrideEncryptionMode?: 'plaintext' | 'encrypted';
};
```

### Definitions properties

These are your application's feature flags. You can return the following data for each definition:

| Property                 | Type                               | Description                                                                                                        |
| ------------------------ | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `description` (optional) | string                             | A description of what this feature flag is for.                                                                    |
| `origin` (optional)      | string                             | The URL where feature flag is managed. This usually points to the flag details page in your feature flag provider. |
| `options` (optional)     | `{ value: any, label?: string }[]` | An array of options. These options will be available as overrides in Vercel Toolbar.                               |

You can optionally tell Vercel Toolbar about the actual value flags resolved to. The Flags Discovery Endpoint cannot return this as the value might differ for each request. See [Flag values](/docs/flags/flags-explorer/reference#values) instead.

### Hints

In some cases you might need to fetch your feature flag definitions from your feature flag provider before you can return them from the Flags Discovery Endpoint.

In case this request fails you can use `hints`. Any hints returned will show up in the UI.

This is useful when you are fetching your feature flags from multiple sources. In case one request fails you might still want to show the remaining flags on a best effort basis, while also displaying a hint that fetching a specific source failed. You can return `definitions` and `hints` simultaneously to do so.

### Override mode

When you create an override, Vercel Toolbar will set a cookie called `vercel-flag-overrides`. You can read this cookie in your applications to make your application respect the overrides set by Vercel Toolbar.

The `overrideEncryptionMode` setting controls the value of the cookie:

- `plaintext`: The cookie will contain the overrides as plain JSON. Be careful not to trust those overrides as users can manipulate the value easily.
- `encrypted`: Vercel Toolbar protects the overrides before storing them in the cookie. With a `FLAGS_SECRET`, it encrypts them with the secret. Without one, it stores overrides that Vercel signs for your project. This prevents manipulation, but requires decrypting or verifying them on your end before usage.

We highly recommend using `encrypted` mode as it protects against manipulation.

## Override cookie

The Flags Explorer will set a cookie called `vercel-flag-overrides` containing the overrides.

**Using the Flags SDK**

If you use the Flags SDK for Next.js or SvelteKit, the SDK will automatically handle the overrides set by the Flags Explorer.

**Manual setup**

Read this cookie and use the `decryptOverrides` function to decrypt the overrides and use them in your application. On Vercel, or locally after `vercel env pull`, `decryptOverrides` also verifies overrides that Vercel signs, so it works without a `FLAGS_SECRET`. The decrypted value is a JSON object containing the name and override value of each overridden flag.

```ts filename="app/getFlags.ts" framework=nextjs
import { decryptOverrides } from 'flags';
import { type NextRequest } from 'next/server';

async function getFlags(request: NextRequest) {
  const overrideCookie = request.cookies.get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decryptOverrides(overrideCookie)
    : null;

  const flags = {
    exampleFlag: overrides?.exampleFlag ?? false,
  };

  return flags;
}
```

```js filename="app/getFlags.js" framework=nextjs
import { decryptOverrides } from 'flags';

async function getFlags(request) {
  const overrideCookie = request.cookies.get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decryptOverrides(overrideCookie)
    : null;

  const flags = {
    exampleFlag: overrides?.exampleFlag ?? false,
  };

  return flags;
}
```

```ts filename="app/getFlags.ts" framework=nextjs-app
import { decryptOverrides } from 'flags';
import { cookies } from 'next/headers';

async function getFlags() {
  const overrideCookie = (await cookies()).get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decryptOverrides(overrideCookie)
    : null;

  return {
    exampleFlag: overrides?.exampleFlag ?? false,
  };
}
```

```js filename="app/getFlags.js" framework=nextjs-app
import { decryptOverrides } from 'flags';
import { cookies } from 'next/headers';

async function getFlags() {
  const overrideCookie = (await cookies()).get('vercel-flag-overrides')?.value;
  const overrides = overrideCookie
    ? await decryptOverrides(overrideCookie)
    : null;

  return {
    exampleFlag: overrides?.exampleFlag ?? false,
  };
}
```

## Script tags

Vercel Toolbar uses a [MutationObserver](https://developer.mozilla.org/docs/Web/API/MutationObserver) to find all script tags with `data-flag-values` and `data-flag-definitions` attributes. Any changes to content get detected by the toolbar.

For more information, see the following sections:

- [Embedding definitions through script tags](/docs/flags/flags-explorer/reference#embedding-definitions-through-script-tags)
- [Embedding values through script tags](/docs/flags/flags-explorer/reference#embedding-values-through-script-tags)

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
