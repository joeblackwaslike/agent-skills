---
title: Password Protection
product: vercel
url: /docs/deployment-protection/methods-to-protect-deployments/password-protection
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection"
last_updated: 2026-07-01
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-protect-deployments
  - /docs/deployment-protection
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links
  - /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
summary: Require visitors to enter a password before they can view your deployments.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-protect-deployments/password-protection.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "221cc4d262fa1e574286078666377f2babeb4913a423e6dfd587433a53cac1d3"
---

# Password Protection

> **🔒 Permissions Required**: Password Protection


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [Vercel vs Akamai](https://vercel.com/kb/guide/vercel-vs-akamai?from=related) — A detailed guide to Vercel vs Akamai: compute models, AI infrastructure, framework support, media streaming, CDN capabil
- [Vercel vs Netlify](https://vercel.com/kb/guide/vercel-vs-netlify?from=related) — A detailed guide to Vercel vs Netlify: runtimes, compute architecture, AI infrastructure, security, and when to choose e
- [Vercel vs Render](https://vercel.com/kb/guide/vercel-vs-render?from=related) — A detailed guide to Vercel vs Render: compute models, AI infrastructure, Docker support, background workers, and when to
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Passport](https://vercel.com/docs/passport?from=related) — Learn how to protect deployments with Passport, read visitor identity, and verify Passport tokens in server-side code.
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access?from=related) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [Custom Events](https://vercel.com/docs/analytics/custom-events?from=related) — Learn how to send custom analytics events from your application.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-protect-deployments/password-protection.graph.md](/docs/deployment-protection/methods-to-protect-deployments/password-protection.graph.md)
<!-- /docsgraph:related -->

Password Protection requires visitors to enter a pre-defined password before they can access your deployment. You can set the desired password from your project settings when enabling the feature, and update it any time.

![Image](`/docs-assets/static/docs/concepts/projects/password-protection-screen.png`)

## What to know before enabling Password Protection

The table below outlines key considerations and security implications when using Password Protection for your deployments on Vercel.

| Consideration                 | Description                                                                                                                                                                                                                                                                            |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Environment Configuration** | Can be enabled for different environments. See [Understanding Deployment Protection by environment](/docs/deployment-protection#choose-which-urls-to-protect)                                                                                           |
| **Compatibility**             | Compatible with [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication) and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips)                                                  |
| **Bypass Methods**            | Can be bypassed using [Shareable Links](/docs/deployment-protection/methods-to-bypass-deployment-protection/sharable-links) and [Protection bypass for Automation](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation) |
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

  ![Image](`/docs-assets/static/docs/concepts/projects/password-protection-light.png`)

### Configure Password Protection with the API

You can manage Password Protection using the Vercel API endpoint to [update an existing project](/docs/rest-api/projects/update-an-existing-project) with the following body.

| Parameter        | Type   | Description                                                                                                                                                                  |
| ---------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `deploymentType` | string | The scope of protection. Accepted values are `prod_deployment_urls_and_all_previews` (Standard Protection), `all` (All Deployments), or `preview` (Only Preview Deployments) |
| `password`       | string | The password visitors must enter                                                                                                                                             |

To enable or update Password Protection, send the `passwordProtection` object:

```json
{
  "passwordProtection": {
    "deploymentType": "prod_deployment_urls_and_all_previews",
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


---

[View full sitemap](/docs/sitemap)
