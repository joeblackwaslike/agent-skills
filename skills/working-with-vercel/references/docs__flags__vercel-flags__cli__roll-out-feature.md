---
title: Rolling out a new feature
product: vercel
url: /docs/flags/vercel-flags/cli/roll-out-feature
canonical_url: "https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature"
last_updated: 2026-06-24
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  []
summary: Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "3e6de32199fc914b5cc459cbc6a16fd0e577e194247085dd868326f01633a913"
---

# Rolling out a new feature

This workflow creates a Boolean feature flag, adds the entity context needed for bucketing, verifies the change in preview, and starts a staged rollout in production. The same rollout command works for String, Number, and JSON flags after you define their variants.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated?from=related) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [How Splits Work in Vercel Flags](https://vercel.com/kb/guide/how-splits-work-in-vercel-flags?from=related) — Use weighted splits in Vercel Flags to deterministically bucket users into variants by percentage for gradual rollouts a
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments?from=related) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [vercel flags](https://vercel.com/docs/cli/flags?from=related) — Learn how to manage feature flags for your Vercel project using the vercel flags CLI command.
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [Clean Up After Rollout](https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout?from=related) — Audit active flags, remove a fully rolled-out flag from your codebase, and archive it using the Vercel CLI.
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Run an A/B Test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test?from=related) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI

Full cross-link map for this page: [/docs/flags/vercel-flags/cli/roll-out-feature.graph.md](/docs/flags/vercel-flags/cli/roll-out-feature.graph.md)
<!-- /docsgraph:related -->

## 1. Create the flag

```bash filename="terminal"
vercel flags create redesigned-checkout --kind boolean \
  --description "New checkout flow with streamlined steps"
```

*Creating a boolean flag to gate the new checkout experience.*

## 2. Define the entity used for bucketing

Progressive rollouts bucket traffic by an entity attribute. In the dashboard, open **Flags** > **Entities**, create a **User** entity, and add an `id` attribute. The CLI examples on this page use `--by user.id`.

## 3. Pull environment variables

The environment variables include the Vercel OpenID Connect (OIDC) token used by the SDK. Pull them into your local `.env.local`:

```bash filename="terminal"
vercel env pull
```

## 4. Install the Flags SDK

```bash filename="terminal"
pnpm add flags @flags-sdk/vercel
```

## 5. Define the flag and identify the user

Create a flag definition using the Flags SDK. The `vercelAdapter` connects the flag to Vercel Flags, and `identify` provides the entity data used for rollout bucketing:

```ts filename="flags.ts"
import { dedupe, flag } from 'flags/next';
import { vercelAdapter } from '@flags-sdk/vercel';

const identify = dedupe(async () => {
  const session = await getSession();

  return session?.user
    ? {
        user: {
          id: session.user.id,
        },
      }
    : {};
});

export const redesignedCheckout = flag({
  key: 'redesigned-checkout',
  adapter: vercelAdapter(),
  identify,
});
```

If `user.id` is missing for an evaluation, the rollout falls back to the configured fallback variant.

## 6. Use the flag in a component

```tsx filename="app/checkout/page.tsx"
import { redesignedCheckout } from '../../flags';

export default async function CheckoutPage() {
  const showRedesign = await redesignedCheckout();

  return showRedesign ? <NewCheckout /> : <OldCheckout />;
}
```

## 7. Deploy to preview

```bash filename="terminal"
vercel deploy
```

Visit the preview URL to confirm the old checkout renders. Preview still serves `false` until you change that environment.

## 8. Verify the new experience in preview

When the preview deployment is ready, turn the flag on there for manual QA:

```bash filename="terminal"
vercel flags enable redesigned-checkout --environment preview \
  --message "Verify redesigned checkout in preview"
```

Visit the preview URL again to confirm the new checkout renders.

## 9. Deploy to production

```bash filename="terminal"
vercel deploy --prod
```

## 10. Start a progressive rollout in production

```bash filename="terminal"
vercel flags rollout redesigned-checkout --environment production --by user.id \
  --stage 5,6h --stage 10,6h --stage 25,12h --stage 50,1d \
  --message "Start redesigned checkout rollout"
```

*Starting a staged production rollout based on \`user.id\`.*

Each `--stage` defines the percentage of traffic sent to the `true` variant and how long that stage lasts. After the last stage finishes, Vercel serves 100% of the `true` variant indefinitely.

## 11. Inspect or adjust the rollout

Inspect the rollout at any time:

```bash filename="terminal"
vercel flags inspect redesigned-checkout
```

To change the schedule, rerun `vercel flags rollout` with new `--stage` values. If you omit `--start`, `--by`, and the variant flags while updating an existing rollout, the CLI keeps the current values.

## Non-boolean rollout example

For String, Number, and JSON flags, choose the rollout variants explicitly. `--from-variant`, `--to-variant`, and `--default-variant` accept either a variant ID or a variant value, so for JSON flags it is often easier to pass the ID:

```bash filename="terminal"
vercel flags rollout welcome-message --environment production --by user.id \
  --from-variant control --to-variant treatment --default-variant control \
  --stage 10,2h --stage 50,12h --start 2026-04-16T09:00:00Z
```


---

[View full sitemap](/docs/sitemap)
