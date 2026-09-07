---
title: Getting Started with Vercel Flags
product: vercel
url: /docs/flags/vercel-flags/quickstart
canonical_url: "https://vercel.com/docs/flags/vercel-flags/quickstart"
last_updated: 2026-08-11
type: tutorial
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/frameworks/full-stack/nextjs
  - /docs/cli
  - /docs/flags/vercel-flags/sdks/flags-sdk
  - /docs/agent-resources/skills
  - /docs/flags/vercel-flags/sdks/core
summary: Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/quickstart.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "a0c8fa9b7218d6a1b3a689774a619cdfc52390e07319a1427d069b36d8f04860"
---

# Getting Started with Vercel Flags

This guide walks you through creating a feature flag in the Vercel Dashboard and evaluating it in your application. By the end you'll have a working flag that you can toggle from the dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related)
- [Quickstart](https://flags-sdk.dev/docs/frameworks/sveltekit?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related) — Using the Flags SDK in SvelteKit
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Quickstart](https://flags-sdk.dev/docs/frameworks/next?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how to start using the Flags SDK in your Next.js project.
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/flags/vercel-flags/quickstart.graph.md](/docs/flags/vercel-flags/quickstart.graph.md?from=related&source_path=%2Fdocs%2Fflags%2Fvercel-flags%2Fquickstart&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

**Agent prompt**

```text
Help me set up Vercel Flags in this project. First, make sure the Vercel CLI is installed (`npm i -g vercel`). If I'm using Claude Code or Cursor, install the Vercel Plugin (`npx plugins add vercel/vercel-plugin`). For other agents, install Vercel Skills (`npx skills add vercel-labs/agent-skills`). Then: 1. Run `vercel link` and `vercel env pull` to get OpenID Connect (OIDC) credentials locally. 2. Use `vercel flags` to create a feature flag for the project. Install the flags SDK and configure it to evaluate the flag. 3. Use the flag to conditionally render content in a page. 4. Deploy with `vercel --prod`.
```

## Prerequisites

- A [Next.js](/docs/frameworks/full-stack/nextjs) project connected to Vercel.
- [Vercel CLI](/docs/cli) installed.

- ### Create a flag in the dashboard
  1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
  2. Open **Flags** in the sidebar for your project.
  3. Create a new flag named `marketing-banner`.
  4. Leave the **Type** set to **Boolean** and configure the environment settings to be **on** for Development and **off** for Preview and Production.

- ### Pull local OpenID Connect credentials
  Vercel Flags authenticates with the Vercel OpenID Connect (OIDC) token associated with your project. Vercel deployments receive this token automatically. For local development, pull environment variables into your `.env.local` file:
  ```bash filename="terminal"
  vercel env pull
  ```
  If your project isn't linked yet, run `vercel link` first.

- ### Install the required packages
  **Flags SDK**

  The [Flags SDK](/docs/flags/vercel-flags/sdks/flags-sdk) is a framework-native way to define and evaluate feature flags. It works with any flag provider through adapters. The `@flags-sdk/vercel` adapter connects it to your Vercel Flags project, and `@vercel/flags-core` is the evaluation engine used behind the scenes.
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i flags @flags-sdk/vercel
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i flags @flags-sdk/vercel
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i flags @flags-sdk/vercel
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i flags @flags-sdk/vercel
      ```
    </Code>
  </CodeBlock>
  If you use an AI coding assistant, you can also install the [Flags SDK agent skill](/docs/agent-resources/skills) to help define, evaluate, and clean up feature flags:
  ```bash filename="terminal"
  npx skills add vercel/flags --skill flags-sdk
  ```
  **OpenFeature**

  [OpenFeature](https://openfeature.dev/) is a vendor-neutral standard for feature flags. The `@vercel/flags-core` package includes the Vercel Flags evaluation engine and the OpenFeature provider.
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @openfeature/server-sdk @vercel/flags-core
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @openfeature/server-sdk @vercel/flags-core
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @openfeature/server-sdk @vercel/flags-core
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @openfeature/server-sdk @vercel/flags-core
      ```
    </Code>
  </CodeBlock>
  **Core**

  The [@vercel/flags-core](/docs/flags/vercel-flags/sdks/core) library gives you direct access to the Vercel Flags evaluation engine. Use it when you need full control or are working outside of supported frameworks.
  <CodeBlock>
    <Code tab="pnpm">
      ```bash
      pnpm i @vercel/flags-core
      ```
    </Code>
    <Code tab="yarn">
      ```bash
      yarn i @vercel/flags-core
      ```
    </Code>
    <Code tab="npm">
      ```bash
      npm i @vercel/flags-core
      ```
    </Code>
    <Code tab="bun">
      ```bash
      bun i @vercel/flags-core
      ```
    </Code>
  </CodeBlock>

- ### Evaluate the flag in your application
  **Flags SDK**

  Define the flag in a `flags.ts` file. The `vercelAdapter` uses Vercel OIDC automatically:
  ```ts filename="flags.ts"
  import { flag } from 'flags/next';
  import { vercelAdapter } from '@flags-sdk/vercel';

  export const marketingBanner = flag({
    key: 'marketing-banner',
    adapter: vercelAdapter(),
  });
  ```
  Then call the flag in a server component:
  ```tsx filename="app/page.tsx"
  import { marketingBanner } from '../flags';

  export default async function Page() {
    const showBanner = await marketingBanner();

    return <div>{showBanner ? 'Sale live now!' : 'Welcome'}</div>;
  }
  ```
  See the [Flags SDK guide](/docs/flags/vercel-flags/sdks/flags-sdk) for full setup instructions.

  **OpenFeature**

  Create a helper that initializes the Vercel provider once and returns a reusable client:
  ```ts filename="lib/openfeature.ts"
  import { OpenFeature } from '@openfeature/server-sdk';
  import { flagsClient } from '@vercel/flags-core';
  import { VercelProvider } from '@vercel/flags-core/openfeature';

  let initPromise: Promise<void> | null = null;
  let initialized = false;
  const vercelProvider = new VercelProvider(flagsClient);

  async function initialize() {
    try {
      await OpenFeature.setProviderAndWait(vercelProvider);
      initialized = true;
    } catch (error) {
      console.error('Failed to initialize provider:', error);
      initPromise = null;
    }
  }

  export async function getOpenFeatureClient() {
    if (initialized) return OpenFeature.getClient();
    if (!initPromise) initPromise = initialize();
    await initPromise;
    return OpenFeature.getClient();
  }
  ```
  Then use it in a server component:
  ```tsx filename="app/page.tsx"
  import { getOpenFeatureClient } from '../lib/openfeature';

  export default async function Page() {
    const client = await getOpenFeatureClient();
    const showBanner = await client.getBooleanValue(
      'marketing-banner',
      false,
    );

    return <div>{showBanner ? 'Sale live now!' : 'Welcome'}</div>;
  }
  ```
  See the [OpenFeature guide](/docs/flags/vercel-flags/sdks/openfeature) for full setup instructions.

  **Core**

  Use the `flagsClient` to evaluate the flag directly:
  ```ts filename="app/page.tsx"
  import { flagsClient } from '@vercel/flags-core';

  export default async function Page() {
    const result = await flagsClient.evaluate<boolean>(
      'marketing-banner',
      false,
    );

    return <div>{result.value ? 'Sale live now!' : 'Welcome'}</div>;
  }
  ```
  See the [Core Library guide](/docs/flags/vercel-flags/sdks/core) for full setup instructions.

  Toggle the flag off for the **Development** environment in the Vercel Dashboard, then press **Review and save** and leave a message for the change. Reload the page to see the change.

- ### Add targeting with the identify function
  Now that your flag is working, you can add an `identify` function to pass user and team context for [targeting rules](/docs/flags/vercel-flags/dashboard/entities). This lets you roll out flags to specific users, plans, or teams from the dashboard.

  **Flags SDK**

  Update your `flags.ts` to define your entities and an `identify` function. The `dedupe` helper ensures the session is only fetched once per request, even if multiple flags call `identify`:
  ```ts filename="flags.ts"
  import { flag, dedupe } from 'flags/next';
  import { vercelAdapter } from '@flags-sdk/vercel';

  type Entities = {
    user?: {
      id: string;
      email: string;
      plan: string;
    };
    team?: {
      id: string;
      name: string;
    };
  };

  const identify = dedupe(async (): Promise<Entities> => {
    const session = await getSession();
    return {
      user: session?.user
        ? {
            id: session.user.id,
            email: session.user.email,
            plan: session.user.plan,
          }
        : undefined,
      team: session?.team
        ? {
            id: session.team.id,
            name: session.team.name,
          }
        : undefined,
    };
  });

  export const marketingBanner = flag({
    key: 'marketing-banner',
    adapter: vercelAdapter(),
    identify,
  });
  ```
  To use these entities in the dashboard, [define them as entities](/docs/flags/vercel-flags/dashboard/entities) so you can build targeting rules based on attributes like `user.plan` or `team.id`.

  **OpenFeature**

  Pass an evaluation context when calling `getBooleanValue` to provide user and team attributes for targeting:
  ```ts filename="app/page.tsx"
  import { getOpenFeatureClient } from '../lib/openfeature';

  export default async function Page() {
    const session = await getSession();
    const client = await getOpenFeatureClient();

    const entities = {
      user: session?.user
        ? { id: session.user.id, email: session.user.email, plan: session.user.plan }
        : undefined,
      team: session?.team
        ? { id: session.team.id, name: session.team.name }
        : undefined,
    };

    const showBanner = await client.getBooleanValue(
      'marketing-banner',
      false,
      entities,
    );

    return <div>{showBanner ? 'Sale live now!' : 'Welcome'}</div>;
  }
  ```
  To use these entities in the dashboard, [define them as entities](/docs/flags/vercel-flags/dashboard/entities) so you can build targeting rules based on attributes like `user.plan` or `team.id`.

  **Core**

  Pass entities as the third argument to `evaluate` to provide user and team attributes for targeting:
  ```ts filename="app/page.tsx"
  import { flagsClient } from '@vercel/flags-core';

  export default async function Page() {
    const session = await getSession();

    const entities = {
      user: session?.user
        ? { id: session.user.id, email: session.user.email, plan: session.user.plan }
        : undefined,
      team: session?.team
        ? { id: session.team.id, name: session.team.name }
        : undefined,
    };

    const result = await flagsClient.evaluate<boolean>(
      'marketing-banner',
      false,
      entities,
    );

    return <div>{result.value ? 'Sale live now!' : 'Welcome'}</div>;
  }
  ```
  To use these entities in the dashboard, [define them as entities](/docs/flags/vercel-flags/dashboard/entities) so you can build targeting rules based on attributes like `user.plan` or `team.id`.

## Built-in resilience

When you deploy to Vercel, the build process fetches your latest flag definitions once at build time and bundles them into the deployment. This guarantees every function uses the same snapshot during the build, and provides a runtime fallback if the Vercel Flags service is temporarily unreachable. Definitions are only fetched when you are using the Flags SDK packages or when your project has at least one environment variable containing an SDK key for Vercel Flags.

Learn more about [embedded definitions](/docs/flags/vercel-flags/sdks/core#embedded-definitions).

## Next steps

Your flag is working. Here's what to explore next:

- **[Entities and targeting](/docs/flags/vercel-flags/dashboard/entities)**: Define user attributes and create rules to show flags to specific groups.
- **[Segments](/docs/flags/vercel-flags/dashboard/segments)**: Build reusable audience groups like "Beta Testers" or "Internal Team."
- **[Flags Explorer](/docs/flags/flags-explorer/getting-started)**: Override flags in the Vercel Toolbar during development without affecting other users.
- **[Drafts](/docs/flags/vercel-flags/dashboard/drafts)**: Define flags in code first, then promote them in the dashboard when you're ready.
- **[Observability](/docs/flags/observability)**: Track flag evaluations in Runtime Logs and Web Analytics.
- **[Managing flags](/docs/flags/vercel-flags/dashboard)**: Configure rules, environments, and flag lifecycles in the dashboard.


---

[View full sitemap](/docs/sitemap)
