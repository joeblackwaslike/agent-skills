---
title: Cleaning up after a full rollout
product: vercel
url: /docs/flags/vercel-flags/cli/clean-up-after-rollout
canonical_url: "https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout"
last_updated: 2026-02-24
type: how-to
prerequisites:
  - /docs/flags/vercel-flags
  - /docs/flags
related:
  - /docs/flags/vercel-flags/dashboard/archive
summary: Audit active flags, remove a fully rolled-out flag from your codebase, and archive it using the Vercel CLI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "d5aa60cf64fc23bfdc985457cc34862cc88523b609948ca1a34153268af3b839"
---

# Cleaning up after a full rollout

Once a feature is stable and the flag has been enabled in all environments for a while, remove it from your codebase and dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Roll Out a Feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature?from=related) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard?from=related) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Getting Started](https://vercel.com/docs/flags/vercel-flags/quickstart?from=related) — Create your first feature flag and evaluate it in your application using the Flags SDK, OpenFeature, or the core library
- [Run an A/B Test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test?from=related) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI
- [Feature Flag](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag?from=related) — Learn how to configure individual feature flags in the Vercel Dashboard.

Full cross-link map for this page: [/docs/flags/vercel-flags/cli/clean-up-after-rollout.graph.md](/docs/flags/vercel-flags/cli/clean-up-after-rollout.graph.md)
<!-- /docsgraph:related -->

## 1. Audit active flags

```bash filename="terminal"
vercel flags list --state active
```

## 2. Inspect the candidate

```bash filename="terminal"
vercel flags inspect old-onboarding-flow
```

Check the output to confirm the flag is enabled in all environments and hasn't been changed recently.

## 3. Find all references in code

Search your codebase for the flag key and its camelCase variant:

```bash filename="terminal"
rg "old-onboarding-flow" --type ts
rg "oldOnboardingFlow" --type ts
```

## 4. Remove the flag definition

Delete the `flag()` declaration from your `flags.ts` file.

## 5. Remove conditionals from components

Keep only the code path that was behind the enabled flag:

```tsx filename="Before"
const show = await oldOnboardingFlow();
return show ? <NewOnboarding /> : <OldOnboarding />;
```

```tsx filename="After"
return <NewOnboarding />;
```

Delete any component files that are no longer referenced.

## 6. Deploy to preview and verify

```bash filename="terminal"
vercel deploy
```

Visit the preview URL to confirm the feature still works without the flag.

## 7. Archive the flag

Once archived, the flag stops evaluating and your application falls back to the `decide` default defined in code.

```bash filename="terminal"
vercel flags archive old-onboarding-flow --yes
```

See [Archive](/docs/flags/vercel-flags/dashboard/archive) for details on what happens when you archive.

## 8. Deploy to production

```bash filename="terminal"
vercel deploy --prod
```


---

[View full sitemap](/docs/sitemap)
