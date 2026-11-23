---
title: Deployment Protection Exceptions
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/deployment-protection
summary: Disable Deployment Protection for a list of preview domains.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.md"
fetched_at: "2026-11-23T14:17:58.741Z"
sha256: "98f51d6703a18f4395a7a1a501d38089fb1267f49b3d69cd0a633e995d556315"
---

# Deployment Protection Exceptions

> Deployment Protection Exceptions are available on all plans

Deployment Protection Exceptions let you disable Deployment Protection (including [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection), and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)) for a list of preview domains.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Slack Reference](https://eve.dev/docs/channels/slack/reference) — Slack channel options, credentials, inbound hooks, code channels, rendering, human-in-the-loop, proactive targets, and a
- [Connections](https://eve.dev/docs/connections) — Expose external MCP and OpenAPI servers to the model, with connection tokens the model never sees.
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Deployment Protection is now enabled by default for new projects](https://vercel.com/changelog/deployment-protection-is-now-enabled-by-default-for-new-projects)
- [Methods to Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Usage & Pricing for Deployment Protection](https://vercel.com/docs/deployment-protection/usage-and-pricing) — Compare Deployment Protection feature availability and pricing across Hobby, Pro, and Enterprise plans.
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Security settings](https://vercel.com/docs/project-configuration/security-settings) — Configure security settings for your Vercel project, including Vercel Support Code Visibility, Git Fork Protection, and
- [Preview Deployment Suffix](https://vercel.com/docs/deployments/preview-deployment-suffix) — When you create a new deployment, Vercel will automatically generate a unique URL which you can use to access that parti

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/deployment-protection-exceptions.graph.md)
<!-- /docsgraph:related -->

When you add a domain to Deployment Protection Exceptions, it becomes publicly accessible and is no longer covered by Deployment Protection features. When you remove a domain from Deployment Protection Exceptions, the domain becomes protected again with the project's Deployment Protection settings.

![Deployment Protection Exceptions.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/deployment-exception-light.png)

Deployment Protection Exceptions is designed for Preview Deployment domains. If you wish to make a Production Deployment domain public, see [Only Production Deployments](/docs/deployment-protection#only-production-deployments).

## Adding a Deployment Protection Exception

- ### Go to project Deployment Protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to add an exception for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Select Add Domain in the Deployment Protection Exceptions section
  From the **Deployment Protection Exceptions** section, select **Add Domain**:

  ![Add Deployment Protection Exception.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/deployment-exception-no-domain-light.png)

- ### Specify the domain to unprotect
  From the **Unprotect Domain** modal:
  1. Enter the domain that you wish to unprotect in the input
  2. Select **Continue**
  ![Add Deployment Protection Exception.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/deployment-protection-exceptions-add-domain-light.png)

- ### Confirm the domain to unprotect
  From the **Unprotect Domain** modal:
  1. Confirm the domain by entering it again in the first input
  2. Enter `unprotect my domain` in the second input
  3. Select **Confirm**
  All your existing and future deployments for that domain will be **unprotected**.

  ![Add Deployment Protection Exception.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/deployment-protection-exceptions-confirm-add-light.png)

## Removing a Deployment Protection Exception

- ### Go to project Deployment Protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project that you wish to remove an exception for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Select the domain to remove
  From the **Deployment Protection Exceptions** section:
  1. Find the domain row in the **Unprotected Domains** section
  2. Select the dot menu at the end of the row
  3. From the context menu, select **Remove**
  ![Removing Deployment Protection Exception.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/remove-deployment-exception-light.png)

- ### Confirm the domain to remove
  From the **Reprotect Domain** modal:
  1. Enter the domain in the first input
  2. Enter `reprotect my domain` in the second input
  3. Select **Confirm**
  All your existing and future deployments for that domain will be **protected**.

  ![Removing Deployment Protection Exception.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/front/docs/security/deployment-protection-exceptions-remove-light.png)

## Managing Deployment Protection Exceptions

You can view and manage all the existing Deployment Protection Exceptions for your team in the following way:

1. From your [dashboard](/dashboard), go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar
2. Select the **Access** section in the sidebar
3. Select the **All Access** button and choose `Unprotected Previews`

![Dashboard > Settings > Deployment Protection > Access](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/deployments/preview-deployments/deployment-protection-exceptions-list.png)

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
