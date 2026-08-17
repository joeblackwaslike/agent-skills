---
title: Protection Bypass for Automation
product: vercel
url: /docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation
canonical_url: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation"
last_updated: 2026-04-30
type: how-to
prerequisites:
  - /docs/deployment-protection/methods-to-bypass-deployment-protection
  - /docs/deployment-protection
related:
  - /docs/deployment-protection
  - /docs/deployment-protection/methods-to-protect-deployments/password-protection
  - /docs/deployment-protection/methods-to-protect-deployments/vercel-authentication
  - /docs/deployment-protection/methods-to-protect-deployments/trusted-ips
  - /docs/vercel-firewall/ddos-mitigation
summary: Learn how to bypass Vercel Deployment Protection for automated tooling (e.g. E2E testing).
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "336ba3a5a57df4df875ae4efbaa4deea41664536e0a1ff75ffac466f8dd53c5b"
---

# Protection Bypass for Automation

> **🔒 Permissions Required**: Protection Bypass for Automation


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Slack](https://eve.dev/docs/channels/slack?from=related) — Reach your agent from Slack app mentions and DMs with Vercel Connect-managed credentials, threaded replies, and interact
- [Full-stack previews on Vercel](https://vercel.com/kb/guide/full-stack-preview-deployments-on-vercel?from=related) — Learn how to use full-stack previews for your Vercel projects. Deploy Next.js, FastAPI, and a containerized Go service t
- [How can I run end-to-end tests after my Vercel Preview Deployment?](https://vercel.com/kb/guide/how-can-i-run-end-to-end-tests-after-my-vercel-preview-deployment?from=related) — Learn how to use the Vercel CLI in combination with your CI/CD provider to run end-to-end tests for every code change.
- [How do I add password protection to my Vercel deployment?](https://vercel.com/kb/guide/how-do-i-add-password-protection-to-my-vercel-deployment?from=related) — Enable Password Protection on a Vercel deployment, configure automation and CORS bypasses, and verify the gate before yo
- [How to test a Slack bot with your Vercel preview deployment](https://vercel.com/kb/guide/test-slack-bot-with-vercel-preview-deployment?from=related) — Learn how to build and test a Slack bot using Vercel preview deployments. This guide covers setting up your Slack app, c
- [Automated & Agent Access](https://vercel.com/docs/deployment-protection/automated-agent-access?from=related) — Grant AI agents, CI/CD pipelines, MCP servers, and testing tools access to Vercel deployments that have Deployment Prote
- [How to lock down deployments on Vercel and v0](https://vercel.com/kb/guide/locking-down-deployments?from=related) — Protect who can see your deployments.
- [Update Protection Bypass for Automation](https://vercel.com/docs/rest-api/projects/update-protection-bypass-for-automation?from=related)
- [Protect Deployments](https://vercel.com/docs/deployment-protection/methods-to-protect-deployments?from=related) — Vercel offers several methods to protect your deployments: Vercel Authentication, Passport, Password Protection, and Tru
- [Access Control](https://vercel.com/docs/security/access-control?from=related) — Learn about the protection and compliance measures Vercel takes to ensure the security of your data, including DDoS miti
- [Custom Events](https://vercel.com/docs/analytics/custom-events?from=related) — Learn how to send custom analytics events from your application.

Full cross-link map for this page: [/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation.graph.md](/docs/deployment-protection/methods-to-bypass-deployment-protection/protection-bypass-automation.graph.md)
<!-- /docsgraph:related -->

Protection Bypass for Automation enables you to run automated tests, CI/CD pipelines, and monitoring tools against your protected deployments without triggering authentication challenges or security blocks.

## How it works

When you provide a valid bypass token, Vercel allows your request to access the deployment without authentication. The bypass applies to both [Deployment Protection](/docs/deployment-protection) and certain security checks.

### What gets bypassed

Your automation bypass token will skip:

- **Deployment protection:** [Password Protection](/docs/deployment-protection/methods-to-protect-deployments/password-protection), [Vercel Authentication](/docs/deployment-protection/methods-to-protect-deployments/vercel-authentication), and [Trusted IPs](/docs/deployment-protection/methods-to-protect-deployments/trusted-ips) checks.
- **System mitigations:** The bypass allows requests that the [Vercel Firewall](/docs/vercel-firewall/ddos-mitigation) normally blocks
- **Bot protection:** Your requests won't trigger [Bot protection](/docs/bot-management) challenges

### What doesn't get bypassed

Your automation bypass token **cannot** override:

- **Active DDoS mitigations:** If attackers target a deployment and Vercel blocks an IP address, subnet, or pattern, those blocks remain in effect even with a valid bypass token
- **Rate limits during attacks:** Rate limiting applied during detected attacks will still apply
- **Security challenges during attacks:** Challenge requirements triggered by attack patterns cannot be bypassed

This design lets you test protected deployments reliably while maintaining critical protections during real attacks.

## Configuring Protection Bypass for Automation

You can create multiple bypass secrets per project to manage access independently for different tools (for example, "CI/CD pipeline" or "Playwright tests"). Vercel automatically sets one secret as the `VERCEL_AUTOMATION_BYPASS_SECRET` [system environment variable](/docs/environment-variables/system-environment-variables#VERCEL_AUTOMATION_BYPASS_SECRET) in your deployments. When you have multiple secrets, you can choose which one to use as the environment variable.

You can use each available secret to bypass Deployment Protection on all deployments in a project until the secret is revoked. When you build a deployment, Vercel sets the environment variable value, so regenerating or deleting the secret in the project settings will invalidate previous deployments. You will need to redeploy your app if you update the secret in order to use the new value.

![Image](<&#xA;    '/docs-assets/static/docs/deployment-protection/protection-bypass-light.png'&#xA;  >)

## Permissions for Protection Bypass for Automation

- [Team members](/docs/rbac/access-roles#team-level-roles) with at least the [member](/docs/rbac/access-roles#member-role) role
- [Project members](/docs/rbac/access-roles#project-level-roles) with the [Project Administrator](/docs/rbac/access-roles#project-administrators) role

## Using Protection Bypass for Automation

To use Protection Bypass for Automation, you can authenticate using either an HTTP header or a query parameter named `x-vercel-protection-bypass` with the value of the generated secret for the project.

### Method 1: HTTP header (recommended)

Using a header is the recommended approach for most automation tools:

### Method 2: Query parameter

For tools that cannot set custom headers (such as webhook URL verification for third-party services like Slack, Stripe, or other integrations), append the bypass secret as a query parameter to your URL:

```bash
https://your-deployment.vercel.app/api/webhook?x-vercel-protection-bypass=your-generated-secret
```

> **💡 Note:** For security, use an environment variable to store the bypass secret rather
> than hardcoding it in your webhook URL configuration. Many third-party
> services support environment variable substitution in webhook URLs.

This is particularly useful for:

- **Slack bot verification**: When Slack needs to verify your webhook URL during app configuration
- **Third-party webhooks**: Services that send POST requests to your endpoints but don't support custom headers
- **URL-based integrations**: Any service that only accepts a URL without header configuration

### Advanced configuration

To bypass authorization on follow-up requests (e.g. for **in-browser testing**) you can set an additional header or query parameter named `x-vercel-set-bypass-cookie` with the value `true`.

This will set the authorization bypass as a cookie using a redirect with a `Set-Cookie` header.

If you are accessing the deployment through a non-direct way (e.g. in an `iframe`) then you may need to further configure `x-vercel-set-bypass-cookie` by setting the value to `samesitenone`.

This will set `SameSite` to `None` on the `Set-Cookie` header, by default `SameSite` is set to `Lax`.

### Examples

#### Playwright

```typescript filename="playwright.config.ts"
import { defineConfig } from '@playwright/test';

if (!process.env.VERCEL_AUTOMATION_BYPASS_SECRET) {
  throw new Error(
    'VERCEL_AUTOMATION_BYPASS_SECRET is required to run tests against protected deployments',
  );
}

export default defineConfig({
  use: {
    extraHTTPHeaders: {
      'x-vercel-protection-bypass':
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      // Use 'samesitenone' instead of 'true' when testing in an iframe.
      'x-vercel-set-bypass-cookie': 'true',
    },
  },
});
```

#### Slack bot webhook verification

When configuring a Slack bot, Slack needs to verify your webhook URL. Since Slack's verification request cannot include custom headers, use the query parameter method:

```json filename="Slack App Manifest"
{
  "settings": {
    "event_subscriptions": {
      "request_url": "https://your-app.vercel.app/api/slack/events?x-vercel-protection-bypass=your-generated-secret"
    },
    "interactivity": {
      "request_url": "https://your-app.vercel.app/api/slack/interactions?x-vercel-protection-bypass=your-generated-secret"
    }
  }
}
```

Slack will keep sending requests to the configured URL; since the bypass secret is part of the URL, it will be included on every request.

#### Other webhook services

For any third-party service that sends webhooks (Stripe, GitHub, etc.), append the bypass secret to your webhook URL:

```bash
# Stripe webhook URL
https://your-app.vercel.app/api/stripe-webhook?x-vercel-protection-bypass=your-generated-secret

# GitHub webhook URL
https://your-app.vercel.app/api/github-webhook?x-vercel-protection-bypass=your-generated-secret
```


---

[View full sitemap](/docs/sitemap)
