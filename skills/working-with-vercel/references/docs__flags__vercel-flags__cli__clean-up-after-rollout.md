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
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "0c8f82f7718d386de85bc7f553e343a274c730b927d513c5b38647ec60b0bacf"
---

# Cleaning up after a full rollout

Once a feature is stable and the flag has been enabled in all environments for a while, remove it from your codebase and dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [Automate progressive rollouts with Vercel Flags](https://vercel.com/changelog/progressive-rollouts-in-vercel-flags)
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Rolling out a new feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Managing flags in the dashboard](https://vercel.com/docs/flags/vercel-flags/dashboard) — Learn how to manage your feature flags using the Vercel Dashboard.
- [Running an A/B test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI
- [Performing a rolling release deployment](https://vercel.com/docs/rolling-releases/rolling-release-deployment) — Gradually roll out a production deployment using traffic stages, monitoring, and automated abort.
- [Setting up Flags Explorer](https://vercel.com/docs/flags/vercel-flags/cli/set-up-flags-explorer) — Add the Flags Explorer to the Vercel Toolbar so you can override flag values on preview deployments without affecting ot

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
