---
title: Running an A/B test
product: vercel
url: /docs/flags/vercel-flags/cli/run-ab-test
canonical_url: "https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test"
last_updated: 2026-03-18
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/observability/web-analytics
  - /docs/flags/flags-explorer
summary: Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test.md"
fetched_at: "2026-08-24T04:53:18.281Z"
sha256: "86c398d9c486ed2f14a61fdb55c67802c3b2d61c0b3cedeb8ad82c69b40f54e0"
---

# Running an A/B test

This workflow sets up a multi-variant layout experiment, tracks results through Web Analytics, and cleans up afterward.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Splits Work in Vercel Flags](https://vercel.com/kb/guide/how-splits-work-in-vercel-flags?from=related) — Use weighted splits in Vercel Flags to deterministically bucket users into variants by percentage for gradual rollouts a
- [How to Integrate Optimizely Feature Experimentation with Next.js and Vercel](https://vercel.com/kb/guide/how-to-integrate-optimizely-feature-experimentation-next-vercel?from=related) — This guide covers setting up feature flags, implementing A/B tests, and optimizing performance using React Server Compon
- [A/B Testing on Vercel](https://vercel.com/kb/guide/ab-testing-on-vercel?from=related) — Learn best practices for A/B testing on Vercel
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Vercel Flags](https://flags-sdk.dev/docs/providers/vercel?from=related)
- [Roll Out a Feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature?from=related) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Clean Up After Rollout](https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout?from=related) — Audit active flags, remove a fully rolled-out flag from your codebase, and archive it using the Vercel CLI.
- [Observability](https://vercel.com/docs/flags/observability?from=related) — Track feature flag evaluations and analyze their impact with Web Analytics.
- [CLI Workflows](https://vercel.com/docs/agent-resources/workflows?from=related) — End-to-end workflows that show how to compose Vercel CLI commands into complete debugging, deployment, and recovery sess
- [sitemap.md](https://vercel.com/docs/sitemap.md?from=related) — Learn about sitemap.md on Vercel.

Full cross-link map for this page: [/docs/flags/vercel-flags/cli/run-ab-test.graph.md](/docs/flags/vercel-flags/cli/run-ab-test.graph.md)
<!-- /docsgraph:related -->

## 1. Create the flag

```bash filename="terminal"
vercel flags create new-pricing-layout --kind string \
  --description "A/B test: new pricing page layout" \
  --variant control="Current layout" --variant treatment="New layout"
```

## 2. Define the flag in code

```ts filename="flags.ts"
import { flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

export const newPricingLayout = flag<'control' | 'treatment'>({
  key: 'new-pricing-layout',
  adapter: vercelAdapter(),
});
```

The flag returns one of the variants you created in the CLI, in this case `control` or `treatment`. If you want to rename a variant later, use `vercel flags update`.

## 3. Use the flag in a component

```tsx filename="app/pricing/page.tsx"
import { newPricingLayout } from '../../flags';

export default async function PricingPage() {
  const layoutVariant = await newPricingLayout();

  return layoutVariant === 'treatment' ? <NewPricing /> : <CurrentPricing />;
}
```

## 4. Track flag values in Web Analytics

Add the `FlagValues` component to your layout so Web Analytics can correlate page views and events with flag values automatically:

```tsx filename="app/layout.tsx"
import { Suspense } from 'react';
import { FlagValues } from 'flags/react';
import { newPricingLayout } from '../flags';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        {children}
        <Suspense fallback={null}>
          <FlagValues values={{ 'new-pricing-layout': await newPricingLayout() }} />
        </Suspense>
      </body>
    </html>
  );
}
```

See [Web Analytics integration](/docs/flags/observability/web-analytics) for more on tracking flag values.

## 5. Deploy to preview

```bash filename="terminal"
vercel deploy
```

## 6. Test both variants in preview

Use `vercel flags set` to switch the preview environment between variants while you test:

```bash filename="terminal"
vercel flags set new-pricing-layout --environment preview --variant control \
  --message "Verify the control layout in preview"
```

```bash filename="terminal"
vercel flags set new-pricing-layout --environment preview --variant treatment \
  --message "Verify the treatment layout in preview"
```

Visit the preview URL after each change to confirm both layouts render correctly. If you've set up the [Flags Explorer](/docs/flags/flags-explorer), you can still use it for local overrides.

## 7. Open the flag and configure the experiment

Use `vercel flags open` to jump to the flag in the dashboard:

```bash filename="terminal"
vercel flags open new-pricing-layout
```

In the dashboard, configure the targeting rule that splits production traffic between the `control` and `treatment` variants.

## 8. Deploy to production

```bash filename="terminal"
vercel deploy --prod
```

## 9. Monitor the experiment

Monitor results in Web Analytics by comparing metrics for the `control` and `treatment` variants.

## 10. Conclude the experiment

When you've picked a winner, clean up:

1. Remove the flag from code and keep only the winning layout
2. Archive the flag:

```bash filename="terminal"
vercel flags archive new-pricing-layout --yes
```


---

[View full sitemap](/docs/sitemap)
