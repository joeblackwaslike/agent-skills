---
title: Testing & Troubleshooting
product: vercel
url: /docs/microfrontends/troubleshooting
canonical_url: "https://vercel.com/docs/microfrontends/troubleshooting"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/microfrontends
related:
  - /docs/microfrontends/local-development
  - /docs/microfrontends/managing-microfrontends/vercel-toolbar
  - /docs/observability
  - /docs/tracing/session-tracing
  - /docs/tracing
summary: Learn about testing & troubleshooting on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/microfrontends/troubleshooting.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "a5a20ef12fd4eaddb1bbf8934e77dbc101033943496cf2a48a5655bb079c3476"
---

# Testing & troubleshooting microfrontends

## Testing

The `@vercel/microfrontends` package includes test utilities to help avoid common misconfigurations.

### `validateMiddlewareConfig`

The `validateMiddlewareConfig` test ensures Middleware is configured to work correctly with microfrontends. Passing this test does *not* guarantee Middleware is set up correctly, but it should find many common problems.

Since Middleware only runs in the default application, you should only run this test on the default application. If it finds a configuration issue, it will throw an exception so that you can use it with any test framework.

```ts filename="tests/middleware.test.ts"
/* @jest-environment node */

import { validateMiddlewareConfig } from '@vercel/microfrontends/next/testing';
import { config } from '../middleware';

describe('middleware', () => {
  test('matches microfrontends paths', () => {
    expect(() =>
      validateMiddlewareConfig(config, './microfrontends.json'),
    ).not.toThrow();
  });
});
```

### `validateMiddlewareOnFlaggedPaths`

The `validateMiddlewareOnFlaggedPaths` test checks that Middleware is correctly configured for flagged paths by ensuring that Middleware rewrites to the correct path for these flagged paths. Since Middleware only runs in the default application, you should only run this testing utility in the default application.

```ts filename="tests/middleware.test.ts"
/* @jest-environment node */

import { validateMiddlewareOnFlaggedPaths } from '@vercel/microfrontends/next/testing';
import { middleware } from '../middleware';

// For this test to work, all flags must be enabled before calling
// validateMiddlewareOnFlaggedPaths. There are many ways to do this depending
// on your flag framework, test framework, etc. but this is one way to do it
// with https://flags-sdk.dev/
jest.mock('flags/next', () => ({
  flag: jest.fn().mockReturnValue(jest.fn().mockResolvedValue(true)),
}));

describe('middleware', () => {
  test('rewrites for flagged paths', async () => {
    await expect(
      validateMiddlewareOnFlaggedPaths('./microfrontends.json', middleware),
    ).resolves.not.toThrow();
  });
});
```

### `validateRouting`

The `validateRouting` test validates that the given paths route to the correct microfrontend. You should only add this test to the default application where the `microfrontends.json` file is defined.

```ts filename="tests/microfrontends.test.ts"
import { validateRouting } from '@vercel/microfrontends/next/testing';

describe('microfrontends', () => {
  test('routing', () => {
    expect(() => {
      validateRouting('./microfrontends.json', {
        marketing: ['/', '/products'],
        docs: ['/docs', '/docs/api'],
        dashboard: [
          '/dashboard',
          { path: '/new-dashboard', flag: 'enable-feature-x' },
        ],
      });
    }).not.toThrow();
  });
});
```

The above test confirms that microfrontends routing:

- Routes `/` and `/products` to the `marketing` microfrontend.
- Routes `/docs` and `/docs/api` to the `docs` microfrontend.
- Routes `/dashboard` and `/new-dashboard` (with the `enable-feature-x` flag enabled) to the `dashboard` microfrontend.

## Debugging routing

### Debug logs when running locally

See [debug routing](/docs/microfrontends/local-development#debug-routing) for how to enable debug logs to see where and why the local proxy routed the request.

### Debug headers when deployed

Debug headers expose the internal reason for the microfrontend response. You can use these headers to debug issues with routing.

You can enable debug headers in the [Vercel Toolbar](/docs/microfrontends/managing-microfrontends/vercel-toolbar#enable-routing-debug-mode), or by setting a cookie `VERCEL_MFE_DEBUG` to `1` in your browser.

Requests to your domain will then return additional headers on every response:

- `x-vercel-mfe-app`: The name of the microfrontend project that handled the request.
- `x-vercel-mfe-target-deployment-id`: The ID of the deployment that handled the request.
- `x-vercel-mfe-default-app-deployment-id`: The ID of the default application deployment, the source of the `microfrontends.json` configuration.
- `x-vercel-mfe-zone-from-middleware`: For flagged paths, the name of the microfrontend that middleware decided should handle the request.
- `x-vercel-mfe-matched-path`: The path from `microfrontends.json` that was matched by the routing configuration.
- `x-vercel-mfe-response-reason`: The internal reason for the MFE response.

## Observability

Microfrontends routing information is stored in [Observability](/docs/observability) and can be viewed in the team or project scopes. Click on the Observability tab, and then find Microfrontends in the CDN section.

## Tracing

Microfrontends routing is captured by Vercel [Session tracing](/docs/tracing/session-tracing). Once you have captured a trace, you can inspect the Microfrontends span in the [logs section in the sidebar](/docs/tracing#viewing-traces-in-the-dashboard).

You may need to zoom in to the Microfrontends span. The span includes:

- `vercel.mfe.app`: The name of the microfrontend project that handled the request.
- `vercel.mfe.target_deployment_id`: The ID of the deployment that handled the request.
- `vercel.mfe.default_app_deployment_id`: The ID of the default application deployment, the source of the `microfrontends.json` configuration.
- `vercel.mfe.app_from_middleware`: For flagged paths, the name of the microfrontend that middleware decided should handle the request.
- `vercel.mfe.matched_path`: The path from `microfrontends.json` that was matched by the routing configuration.

## Troubleshooting

The following are common issues you might face with debugging tips:

### Build fails with "Could not find a `microfrontends.json` file"

A build that ends with `Could not find a microfrontends.json file in the repository that contains the "<application>" application` means the application couldn't locate a `microfrontends.json` that lists it when it builds. Every application in the group reads `microfrontends.json` at build time through `withMicrofrontends`.

In a monorepo, each application searches the repository for the configuration automatically and matches applications by name. The build fails when:

- The application isn't listed under `applications` in `microfrontends.json`.
- The application's name in `microfrontends.json` doesn't match its Vercel project name. If the `package.json` name differs from the Vercel project name, add a `packageName` field to the application in `microfrontends.json`. See [Configuration](/docs/microfrontends/configuration).

In a [polyrepo](/docs/microfrontends/local-development#polyrepo-setup), the configuration lives in only one repository, so the other applications can't find it unless you give them access:

- Pull the configuration into the application with `vercel microfrontends pull`, which writes it to the application's `.vercel` directory. See [Accessing the configuration file](/docs/microfrontends/local-development#accessing-the-configuration-file).
- Or set the `VC_MICROFRONTENDS_CONFIG` environment variable to the path of the configuration file.
- If the configuration uses a custom file name, set `VC_MICROFRONTENDS_CONFIG_FILE_NAME`. See [File naming](/docs/microfrontends/configuration#file-naming).

Add any [environment variables](/docs/environment-variables/managing-environment-variables) to every project in the microfrontends group so they apply during each build.

### Microfrontends aren't working in local development

See [debug routing](/docs/microfrontends/local-development#debug-routing) for how to enable debug logs to see where and why the local proxy routed the request.

### Requests are not routed to the correct microfrontend in production

To validate where requests are being routed to in production, follow these steps:

1. [Verify](/docs/microfrontends/path-routing#identifying-microfrontends-by-path) that the path is covered by the microfrontends routing configuration.
2. Inspect the [debug headers](/docs/microfrontends/troubleshooting#debug-headers) or view a [page trace](/docs/microfrontends/troubleshooting#tracing) to verify the expected path was matched.

### Pages Router pages fail during client-side navigation

Pages Router pages that use `getStaticProps` or `getServerSideProps` rely on
`/_next/data/...json` requests during client-side navigation. If Pages Router
support or the required proxy and routing behavior is missing, the page can work
on direct load but fail when you navigate to it from another microfrontend. This
can happen when navigating from an App Router page to a Pages Router page.

Check for these symptoms:

- `/_next/data` requests return a `404` response.
- `/_next/data` requests route to the wrong microfrontend.
- The page loads stale or incorrect data after navigation.

For any Next.js microfrontend that uses the Pages Router, enable
`supportPagesRouter` in `withMicrofrontends()`.

See [Set up microfrontends with your framework](/docs/microfrontends/quickstart#set-up-microfrontends-with-your-framework).

## QA checklist for Pages Router microfrontends

Use this checklist before promoting a microfrontends change that includes any
Next.js Pages Router routes:

- Test a direct page load.
- Test client-side navigation from another microfrontend into the Pages Router page.
- Test navigation from App Router pages to Pages Router pages.
- Test Pages Router pages that use `getStaticProps`.
- Test Pages Router pages that use `getServerSideProps`.
- Inspect network requests for `/_next/data`.
- Test through the [local microfrontends proxy](/docs/microfrontends/local-development#accessing-the-microfrontends-proxy).
- Test on a Preview deployment.


---

[View full sitemap](/docs/sitemap)
