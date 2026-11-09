---
title: Password Protection
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments/password-protection
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection"
last_updated: 2026-09-15
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection
related:
  - /docs/deployment-protection/usage-and-pricing
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
summary: Require visitors to enter a password before they can view your deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "fad21bcbee9b798d49f933ed8f7a383c22bf0b5de94b264924ea02f18a492534"
---

# Password Protection

> Password Protection is available on Enterprise and Pro plans
>
> Those with the owner, member and admin roles can manage Password Protection

Password Protection requires visitors to enter a pre-defined password before they can access your deployment. You can set the desired password from your project settings when enabling the feature, and update it any time.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Password Protection is now available per project on Pro](https://vercel.com/changelog/password-protection-now-costs-20-per-project-per-month-on-pro)
- [Choose between Vercel Passport and other Deployment Protection methods](https://vercel.com/kb/guide/vercel-passport-vs-deployment-protection) — Compare Vercel Passport with Vercel Authentication, Password Protection, and Trusted IPs to choose the right Deployment
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Render](https://vercel.com/kb/guide/vercel-vs-render) — A detailed guide to Vercel vs Render: compute models, AI infrastructure, Docker and container image support, background
- [Deployment Protection: Added security controls now available on all plans](https://vercel.com/blog/protecting-deployments)
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments) — Protect who can see your deployments.
- [Protect production deployments for free on every plan](https://vercel.com/changelog/protect-production-deployments-for-free-on-every-plan)
- [Access Control](https://vercel.com/docs/security/access-control) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [update_project_deployment_protection](https://vercel.com/docs/agent-resources/vercel-mcp/tools/projects/update_project_deployment_protection) — Use update_project_deployment_protection with Vercel MCP.
- [Tracking custom events](https://vercel.com/docs/analytics/custom-events) — Learn how to send custom analytics events from your application.
- [Audit Logs](https://vercel.com/docs/audit-log) — Learn how to track and analyze your team members' activities.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments/password-protection.graph.md](/docs/deployment-protection/methods-to-protect-deployments/password-protection.graph.md)
<!-- /docsgraph:related -->

![Deployment protected with Password Protection authentication screen.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/password-protection-screen.png)

## Password Protection pricing

Password Protection pricing depends on your plan and when your team started using the feature:

| Plan or billing model | Price | Coverage |
| --- | --- | --- |
| Hobby | Not available | Upgrade to Pro to enable Password Protection |
| Pro | $20 per month per protected project | The project where you enable Password Protection |
| Enterprise | Included | Every project through Team Level Password Protection |
| Existing Pro teams with the legacy Advanced Deployment Protection package | $150 per month per team | Every project through Team Level Password Protection |

For project-priced Pro teams, Vercel adds the charge when you enable Password Protection for a project. Disabling Password Protection stops future charges for that project. The project's remaining Deployment Protection settings determine who can access its deployments.

See [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for the full feature and plan comparison.

## What to know before enabling Password Protection

The table below outlines key considerations and security implications when using Password Protection for your deployments on Vercel.

| Consideration                 | Description                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Environment Configuration** | Can be enabled for different environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)                                                                                           |
| **Compatibility**             | Compatible with [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)                                                  |
| **Bypass Methods**            | Can be bypassed using [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) and [Protection bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation), or by callers listed in [Trusted Sources](/docs/deployment-protection/methods-to-bypass-deployment-protection/trusted-sources) |
| **Password Persistence**      | Users only need to enter the password once per deployment, or when the password changes, due to cookie set by the feature being invalidated on password change                                                                                                                         |
| **Password Changes**          | Users must re-enter a new password if you change the existing one                                                                                                                                                                                                                      |
| **Disabling Protection**      | All existing deployments become unprotected if you disable the feature                                                                                                                                                                                                                 |
| **Token Scope**               | JWT tokens set as cookies are valid only for the URL they were set for and can't be reused for different URLs, even if those URLs point to the same deployment                                                                                                                         |

## How to enable and manage Password Protection

You can manage Password Protection through the dashboard, API, or Terraform.

- ### Go to project deployment protection settings
  From your Vercel [dashboard](/dashboard):
  1. Select the project you want to enable Password Protection for
  2. Go to [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) in the sidebar

- ### Configure Password Protection
  From the **Password Protection** section:
  1. Use the toggle to enable the feature
  2. Select the [deployment environment](/docs/deployment-protection#choose-which-urls-to-protect) you want to protect
  3. **Enter a password** of your choice
  4. Finally, select **Save**
  All your existing and future deployments will be protected with a password for the project. The next time you access a deployment, you'll need to enter the password. After you enter it, a cookie is set in your browser for that deployment URL so you don't need to enter the password again.

  ![Enabling Password Protection.](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/concepts/projects/password-protection-light.png)

### Configure Password Protection with the API

You can manage Password Protection using the Vercel API endpoint to [update an existing project](/docs/rest-api/projects/update-an-existing-project) with the following body.

| Parameter        | Type   | Description                                                                                                                                                                  |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deploymentType` | string | The scope of protection. Accepted values are `all_except_custom_domains` (Standard Protection), `prod_deployment_urls_and_all_previews` (legacy Standard Protection), `all` (All Deployments), or `preview` (legacy Pre-Production Deployments) |
| `password`       | string | The password visitors must enter                                                                                                                                             |

To enable or update Password Protection, send the `passwordProtection` object:

```json
{
  "passwordProtection": {
    "deploymentType": "all_except_custom_domains",
    "password": "your_password_here"
  }
}
```

To disable Password Protection, set `passwordProtection` to `null`:

```json
{
  "passwordProtection": null
}
```

### Configure Password Protection with Terraform

You can configure Password Protection using `password_protection` in the `vercel_project` data source in the [Vercel Terraform Provider](https://registry.terraform.io/providers/vercel/vercel/latest/docs/data-sources/project).

## Keep automated requests working

Password Protection checks every request before it reaches your application, including requests from CI jobs, end-to-end tests, and webhooks. Those requests can't enter a password, so they receive a `401` response as soon as you enable protection. Set up [Protection Bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) when you enable Password Protection, and send the secret in the `x-vercel-protection-bypass` header.

For test runners, add the header to every request and set `x-vercel-set-bypass-cookie` to `true` so in-browser navigation doesn't hit the password prompt. See the [Playwright](/docs/deployment-protection/automated-agent-access#end-to-end-tests-with-playwright) and [Cypress](/docs/deployment-protection/automated-agent-access#end-to-end-tests-with-cypress) configurations.

To check the bypass, request a protected deployment with the secret. A `200` response means the bypass works:

```bash filename="terminal"
curl -I -H "x-vercel-protection-bypass: $VERCEL_AUTOMATION_BYPASS_SECRET" \
  https://your-deployment.vercel.app
```

## Troubleshooting `401` errors

If requests that worked before you enabled Password Protection now return `401`, find the matching symptom:

| Symptom | Cause | Fix |
| --- | --- | --- |
| Cross-origin requests fail because the `OPTIONS` preflight returns `401` | Browsers don't send cookies or custom headers with a CORS preflight, so the preflight can't pass protection. | Add the API's path prefix, such as `/api`, to the [OPTIONS Allowlist](/docs/deployment-protection/methods-to-bypass-deployment-protection/options-allowlist). |
| A `fetch` from your own server code to the deployment's URL returns `401` | The server-side request doesn't include the visitor's authentication cookie. | Use the incoming request's origin and forward its `cookie` header. In the browser, use relative paths. See [How to migrate to Standard Protection](/docs/deployment-protection#how-to-migrate-to-standard-protection). |
| Webhooks from services such as Stripe or Slack return `401`, or URL verification fails | The service can't enter a password or send the authentication cookie. | Send the bypass secret in the `x-vercel-protection-bypass` header. If the service accepts only a URL, add the secret as a [query parameter](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation#method-2-query-parameter). |
| Requests to an API on a different subdomain return `401` after you enter the password | The authentication cookie is valid only for the URL where you entered the password. | Call the API on the same origin with relative paths, or send the bypass header from automated callers. |
| Tests return `401` after you regenerate a bypass secret | Existing deployments still use the previous secret value. | Redeploy so the deployment uses the new secret. |

## Frequently asked questions

### How do I add password protection on Vercel?

Open your project's [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) settings. In the **Password Protection** section, turn on **Require Password**, choose which deployments to protect, enter a password, and select **Save**. If your Pro team pays per project, confirm the $20 monthly charge. Password Protection requires a Pro or Enterprise plan. You can also configure it with the [Vercel REST API](#configure-password-protection-with-the-api) or [Terraform](#configure-password-protection-with-terraform).

### How much does password protection cost on Vercel?

On the Pro plan, Password Protection costs $20 per month for each project where you enable it. Enterprise plans include it for every project at no extra charge. Password Protection isn't available on the Hobby plan. For a free alternative, use [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), which every plan includes. It asks visitors to log in with a Vercel account that has access, instead of entering a password.

Some existing Pro teams have the legacy Advanced Deployment Protection package. They pay $150 per month for Password Protection on every project. See [Password Protection pricing](#password-protection-pricing) and [Usage & Pricing for Deployment Protection](/docs/deployment-protection/usage-and-pricing) for details.

### How do I password protect my production domain on Vercel?

Select [**All Deployments**](/docs/deployment-protection#all-deployments) as the protection scope when you configure Password Protection. The default scope, [Standard Protection](/docs/deployment-protection#standard-protection), leaves your production domains public. Production domains include custom domains such as `example.com` and the `.vercel.app` domains assigned to production. With All Deployments, visitors need the password for every preview and production URL, unless they use a [bypass method](#what-to-know-before-enabling-password-protection).

### Can I share a password-protected deployment without sharing the password?

Yes. Create a [Shareable Link](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) from the deployment's **Share** menu by selecting **Anyone with the link**. Anyone who opens that link can view the deployment without entering the password. To revoke access, switch the option back to **Only people with access**. For CI jobs, tests, and webhooks, use [Protection Bypass for Automation](#keep-automated-requests-working) instead.

### How do I turn off password protection on Vercel?

Open your project's [**Deployment Protection**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fdeployment-protection\&title=Go+to+Deployment+Protection+settings) settings. Turn off **Require Password** and select **Save**. Type `disable password protection` to confirm, then select **Disable Password Protection**. To disable it with the API, set `passwordProtection` to `null` as shown in [Configure Password Protection with the API](#configure-password-protection-with-the-api). All existing deployments become unprotected. If your Pro team pays per project, future charges for that project stop.


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
