---
title: Deployment Protection on Vercel
product: vercel
url: /docs/deployment-protection
canonical_url: "https://vercel.com/docs/deployment-protection"
last_updated: 2026-09-15
type: conceptual
prerequisites:
  []
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/passport
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/deployment-protection/protected-source-maps
summary: "Learn how to control access to your Vercel project's preview and production URLs with Deployment Protection. Configure protection methods and scope..."
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection.md"
fetched_at: "2026-09-21T09:45:51.435Z"
sha256: "eea9da26477b5e4fea7419c572e70d98f421a3acd6a3a65f3ee1807a0574adf3"
---

# Deployment Protection on Vercel

Deployment Protection lets you control who can access your preview and production URLs. You configure it at the project level, choosing both a **protection method** (how you protect) and a **protection scope** (what you protect).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Protect who can see your deployments.
- [Remote Agents](https://eve.dev/docs/guides/remote-agents?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Call another eve deployment as a subagent with defineRemoteAgent: the same tool call as a local subagent, with outbound
- [More Secure Deployment Protection](https://vercel.com/changelog/more-secure-deployment-protection?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)
- [Protection bypass for automation now supports multiple secrets](https://vercel.com/changelog/protection-bypass-for-automation-multiple-secrets?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)
- [Set team-wide defaults for Deployment Protection](https://vercel.com/changelog/set-team-wide-defaults-for-deployment-protection?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)
- [Use native curl syntax with Vercel CLI](https://vercel.com/changelog/use-native-curl-syntax-with-vercel-cli?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)
- [Application authentication on Vercel](https://vercel.com/kb/guide/application-authentication-on-vercel?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Secure application authentication on Vercel across layers: proxy checks, the Data Access Layer, PPR-safe rendering, and
- [Are Vercel Preview Deployments indexed by search engines?](https://vercel.com/kb/guide/are-vercel-preview-deployment-indexed-by-search-engines?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Vercel Preview Deployments aren't indexed by default. Learn how the noindex header works, how to confirm it, and the cus
- [Can I get a fixed IP address for my Vercel deployments?](https://vercel.com/kb/guide/can-i-get-a-fixed-ip-address?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Vercel deployments use dynamic IPs by default. Learn how Static IPs, Secure Compute, and AWS PrivateLink give you a fixe
- [How can I run end-to-end tests after my Vercel Preview Deployment?](https://vercel.com/kb/guide/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related) — Learn how to use the Vercel CLI in combination with your CI/CD provider to run end-to-end tests for every code change.
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=related)

Full cross-link map for this page: [/docs/deployment-protection.graph.md](/docs/deployment-protection.graph.md?from=related&source_path=%2Fdocs%2Fdeployment-protection&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

Deployment Protection requires authentication for all requests, including those to Routing Middleware.

## What protection methods are available

You can choose from several methods to protect your deployments:

- [**Vercel Authentication**](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication): Restricts access to only Vercel users with suitable access rights
- [**Passport**](/docs/passport): Restricts access to visitors who authenticate through your identity provider. **Available on the Enterprise plan**
- [**Password Protection**](/docs/deployment-protection/methods-to-protect-deployments/password-protection): Restricts access to users with the correct password. **Available on Pro for $20 per month per protected project and included on Enterprise at the team level. Not available on Hobby**
- [**Trusted IPs**](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips): Restricts access to users with the correct IP address. **Available on the Enterprise plan**

## Choose which URLs to protect

The protection scope determines which URLs you protect:

- [**Standard Protection**](#standard-protection): Protects all deployments **except** production domains
- [**All Deployments**](#all-deployments): Protects **all** URLs, including production domains
- [**(Legacy) Standard Protection**](#legacy-standard-protection): Protects all preview URLs and deployment URLs. All up-to-date production URLs remain unprotected.
- [**(Legacy) Pre-Production Deployments**](#legacy-pre-production-deployments): Protects only preview URLs. Does not protect past production deployments.

To protect [**only production URLs**](#only-production-deployments), use [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips). This option is **only available on the Enterprise plan**.

## Restrict access to source maps

[Protected Source Maps](/docs/deployment-protection/protected-source-maps) gates `.map` file requests behind [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), so you can ship browser source maps to production without exposing source code.

## Where to find Deployment Protection settings

You manage Deployment Protection through your project settings:

1. From the [dashboard](/dashboard), select the project you want to configure
2. Open **Settings** in the sidebar and select [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings)

### How team default settings apply to new projects

You can set a default Deployment Protection configuration for new projects in your team settings. You can override this default on individual projects as needed.

When setting a team default, choose the protection level (All Deployments, Standard Protection, or None) and one of the available protection methods, including Vercel Authentication, Passport, or Password Protection.

![Image](https://vercel.com/docs-assets/static/docs/deployment-protection/deployment-protection-team-default-light.png)

## Standard Protection

> **🔒 Permissions Required**: Standard Protection

**Standard Protection** is the recommended option for most projects. It protects all domains except [production domains](/docs/domains/working-with-domains/add-a-domain "Production Domains").

![Image](`/contentful/image/e5382hct74si/7LHNvuRkcDlKMWswY7c8xd/858a8627a82bcec2c456bcd42618b3f5/Screenshot_2025-07-09_at_5.05.58%C3%A2__pm.png`)

You can combine Standard Protection with any of the following methods:

- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Passport](/docs/passport)
- [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection)
- [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)

### How to migrate to Standard Protection

When you enable Standard Protection, the production [generated deployment URL](/docs/deployments/generated-urls) becomes restricted. Update any fetch requests that use `VERCEL_URL` or `VERCEL_BRANCH_URL` from [System Environment Variables](/docs/environment-variables/system-environment-variables#system-environment-variables) to target the same domain the user requested, since those variables will no longer be publicly accessible.

> **💡 Note:** The Framework Environment Variable `VERCEL_URL` is prefixed with the name of
> the framework. For example, `VERCEL_URL` for Next.js is
> `NEXT_PUBLIC_VERCEL_URL`, and `VERCEL_URL` for Nuxt is `NUXT_ENV_VERCEL_URL`.
> See the [Framework Environment
> Variables](/docs/environment-variables/framework-environment-variables)
> documentation for more information.

For client-side requests, use relative paths in the fetch call to target the current domain. This automatically includes the user's authentication cookie for protected URLs:

```ts
// Before
fetch(`${process.env.VERCEL_URL}/some/path`);

// After
fetch('/some/path');
// Note: For operations requiring fully qualified URLs, such as generating OG images,
// replace '/some/path' with the actual domain (e.g. 'https://yourdomain.com/some/path').
```

For server-side requests, use the origin from the incoming request and manually add request cookies to pass the user's authentication cookie:

```ts
const headers = { cookie: <incoming request header cookies> };
fetch('<incoming request origin>/some/path', { headers });
```

Bypassing protection using [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) is an option but not required for requests targeting the same domain.

## All Deployments

> **🔒 Permissions Required**: Protecting all deployments

Select **All Deployments** to secure all deployments (both preview and production), restricting public access entirely.

With this configuration, all URLs are protected, including your production domain `example.com` and [generated URLs](/docs/deployments/generated-urls) like `my-project-1234.vercel.app`.

![Image](`/front/docs/security/all-deployments-light.png`)

You can combine All Deployments protection with any of the following methods:

- [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication)
- [Passport](/docs/passport)
- [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection)
- [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)

## Only Production Deployments

> **🔒 Permissions Required**: Protecting production deployments

Use [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) to restrict access to production deployments to a specific list of IPv4 addresses.

Preview deployment URLs remain publicly accessible. This feature is **only available on the Enterprise plan**.

![Image](`/front/docs/security/prod-deployments-light.png`)

## (Legacy) Standard Protection

**(Legacy) Standard Protection** protects all preview URLs and [deployment URLs](/docs/deployments/generated-urls "Deployment URLs"). All [up to date production URLs](/docs/deployments/generated-urls "Up to date Production URLs") remain unprotected.

## (Legacy) Pre-Production Deployments

Select **(Legacy) Pre-Production Deployments** to protect preview URLs while the production environment remains publicly accessible.

For example, Vercel generates a preview URL such as `my-preview-5678.vercel.app`, which will be protected. In contrast, all production URLs, including any past or current generated production branch URLs like `*-main.vercel.app`, remain accessible.

## Password Protection pricing

Password Protection pricing depends on your plan and when your team started using the feature:

| Plan or billing model | Price | Coverage |
| --- | --- | --- |
| Hobby | Not available | Upgrade to Pro to enable Password Protection |
| Pro | $20 per month per protected project | The project where you enable Password Protection |
| Enterprise | Included | Every project through Team Level Password Protection |
| Existing Pro teams with the legacy Advanced Deployment Protection package | $150 per month per team | Every project through Team Level Password Protection |

For project-priced Pro teams, enabling Password Protection adds a charge for that project. [Disable Password Protection from the project's settings](/docs/deployment-protection/methods-to-protect-deployments/password-protection#how-to-enable-and-manage-password-protection) to stop future charges for the project.

Vercel Authentication for All Deployments and Deployment Protection Exceptions do not require a paid add-on.

See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full feature and plan comparison.

## Related resources

- [Methods to protect deployments](/docs/deployment-protection/methods-to-protect-deployments): Learn about each protection method in detail
- [Methods to bypass deployment protection](/docs/deployment-protection/methods-to-bypass-deployment-protection): Configure exceptions and shareable links
- [Usage & Pricing](/docs/deployment-protection/usage-and-pricing): Compare feature availability and pricing by plan
- [Vercel plans](/docs/plans): Compare plan features and pricing


---

[View full sitemap](/docs/sitemap)
