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
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/flags/vercel-flags/cli/clean-up-after-rollout.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "01cd3a81110b2cfa6fd570f0fcd4a0bb91e7fe20a9fc1ce598fd49a9f8cbc304"
---

# Cleaning up after a full rollout

Once a feature is stable and the flag has been enabled in all environments for a while, remove it from your codebase and dashboard.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [A/B testing on ecommerce storefronts without hurting Core Web Vitals](https://vercel.com/kb/guide/ecommerce-ab-testing-core-web-vitals) — Client-side A/B tools can worsen LCP and CLS on the pages you're testing. Run ecommerce A/B tests at the edge with Routi
- [How Vercel Flags are evaluated](https://vercel.com/kb/guide/how-vercel-flags-are-evaluated) — Learn how Vercel Flags determines a flag’s value across environments using evaluation context, targeting, rules, and fal
- [Vercel Flags: Platform-native feature flags](https://vercel.com/blog/vercel-flags-platform-native-feature-flags)
- [How Vercel Flags resolves environments](https://vercel.com/kb/guide/how-vercel-flags-resolves-environments) — Configure Vercel Flags per environment by using environment-scoped SDK Keys that map your Vercel deployment environment
- [Rolling out a new feature](https://vercel.com/docs/flags/vercel-flags/cli/roll-out-feature) — Create a feature flag, wire it into your application with the Flags SDK, and start a staged rollout using the Vercel CLI
- [Feature Flag Configuration](https://vercel.com/docs/flags/vercel-flags/dashboard/feature-flag) — Learn how to configure individual feature flags in the Vercel Dashboard.
- [Running an A/B test](https://vercel.com/docs/flags/vercel-flags/cli/run-ab-test) — Set up an A/B test with a feature flag, track results through Web Analytics, and clean up afterward using the Vercel CLI
- [Delete a flag](https://vercel.com/docs/rest-api/feature-flags/delete-a-flag) — DELETE /v1/projects/{projectIdOrName}/feature-flags/flags/{flagIdOrSlug} — Permanently delete a feature flag from the pr
- [Rolling back a production deployment](https://vercel.com/docs/deployments/rollback-production-deployment) — Recover from a bad production deployment by rolling back, investigating the root cause, and redeploying a fix.

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

## 7. Deploy to production

```bash filename="terminal"
vercel deploy --prod
```

Archived flags evaluate to the default value defined in code, so remove the flag from your code and deploy to every environment that uses it before archiving.

## 8. Archive the flag

Once the code removal is live in every environment, archive the flag:

```bash filename="terminal"
vercel flags archive old-onboarding-flow
```

The command reports evaluations from the last 3 days before asking for confirmation. If you need the flag back, `vercel flags unarchive old-onboarding-flow` restores it with its configuration and history.

See [Archive](/docs/flags/vercel-flags/dashboard/archive) for details on what happens when you archive.

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
