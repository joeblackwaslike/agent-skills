---
title: DEPLOYMENT_PAUSED
product: vercel
url: /docs/errors/DEPLOYMENT_PAUSED
canonical_url: "https://vercel.com/docs/errors/DEPLOYMENT_PAUSED"
last_updated: 2026-02-09
type: reference
prerequisites:
  []
related:
  - /docs/spend-management
  - /docs/limits
  - /docs/limits/fair-use-guidelines
summary: The deployment was paused. This is a deployment error.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/errors/deployment_paused.md"
fetched_at: "2026-07-20T06:54:28.409Z"
sha256: "8eb13530624b2f2194f2645a53daa82cd4b60e376e7cd3333908e51909fb67e1"
---

# DEPLOYMENT_PAUSED

The `DEPLOYMENT_PAUSED` error occurs when a deployment is paused due to certain conditions or configurations. This might happen if there's a manual intervention required, or a specific condition is met that triggers the pause.

**Error Code:** `503`

**Name:** Service Unavailable

## Troubleshoot

To troubleshoot this error, follow these steps:

1. **Check configuration:** Ensure that your deployment configuration is correct and complies with the platform's requirements
2. **Review your spend management**: You may have configured your deployments to pause once your spend amount is reached. Review your [spend management settings](/docs/spend-management#managing-your-spend-amount) to either adjust your limit or review your usage
3. **Verify account status:** Ensure your account is in good standing and hasn't exceeded any [limits or quotas](/docs/limits)
4. **Review email notifications**: If your account or deployment has been paused, Vercel will email you to share more details about the pause and outline next steps. Review the email for additional information about the pause and any necessary actions to resolve the issue
5. **Check for terms of service violations**: If the pause is due to a breach of the [terms of service](/legal/terms) or [fair use guidelines](/docs/limits/fair-use-guidelines), review the specific usage limits and policies in the Vercel dashboard to understand the reasons for the pause
6. **Check for platform outages:** Sometimes, platform-wide outages or issues can cause deployments to be blocked. Check the [status page](https://www.vercel-status.com/) for any ongoing incidents
7. **Contact support:** If you've verified the above and are still experiencing the issue, [contact support](/help#issues) for further assistance


---

[View full sitemap](/docs/sitemap)
