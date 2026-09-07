---
title: Claim Deployments
product: vercel
url: /docs/deployments/claim-deployments
canonical_url: "https://vercel.com/docs/deployments/claim-deployments"
last_updated: 2026-08-21
type: conceptual
prerequisites:
  - /docs/deployments
related:
  - /docs/projects/transferring-projects
  - /docs/integrations/create-integration/marketplace-flows
  - /docs/rest-api/projects/create-project-transfer-request
  - /docs/rest-api/projects/accept-project-transfer-request
  - /docs/rest-api/deployments/upload-deployment-files
summary: Learn how to take ownership of deployments on Vercel with the Claim Deployments feature.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployments/claim-deployments.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "07a1eb9d9668dec4a917cd41158641cbb64e33708825bafffbeb4de111aac697"
---

# Claim Deployments

The Claim Deployments feature enables users to take control of deployments by transferring them to their Vercel accounts. Users can generate and share a claim URL, which allows others to assume ownership of these deployments. This feature is particularly helpful for AI-generated deployments and facilitates the transfer of projects between different accounts with different owners.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Deployments now available for fast and secure deployment transfers](https://vercel.com/changelog/claim-deployments?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related)
- [Claimed deployments now include third-party resources](https://vercel.com/changelog/claimed-deployments-now-include-third-party-resources?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related)
- [AI Agents on Vercel](https://vercel.com/kb/guide/ai-agents?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — This guide provides an overview of how to build and deploy AI agents on Vercel.
- [Domain Linked to Another Account](https://vercel.com/kb/guide/domain-linked-to-another-account?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — This guide explains how to claim a domain already linked to another Vercel account and add it to your team using the dom
- [Claim Deployment](https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — A component for users to claim ownership of Vercel deployments created on their behalf.
- [Managing Deployments](https://vercel.com/docs/deployments/managing-deployments?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — Learn how to manage your current and previously deployed projects to Vercel through the dashboard. You can redeploy at a
- [Claiming Domain Ownership](https://vercel.com/docs/domains/working-with-domains/claim-domain-ownership?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — Learn how to claim ownership of a domain that is registered with another Vercel account by verifying DNS ownership.
- [Deploy Files](https://vercel.com/docs/platforms/platform-elements/actions/deploy-files?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — Server action for programmatically deploying files to Vercel on behalf of platform users.
- [Transferring Domains to Another Team or Project](https://vercel.com/docs/domains/working-with-domains/transfer-your-domain?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=related) — Domains can be transferred to another team or project within Vercel, or to and from a third-party registrar. Learn how t

Full cross-link map for this page: [/docs/deployments/claim-deployments.graph.md](/docs/deployments/claim-deployments.graph.md?from=related&source_path=%2Fdocs%2Fdeployments%2Fclaim-deployments&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

However, when transferring a project between two teams owned by the same user, it is recommended to use the [Project Transfer flow](/docs/projects/transferring-projects#starting-a-transfer) instead of the Claim Deployments flow.

## Get started

- [Claim deployments template](https://github.com/vercel/claim-deployments-demo)
- [Demo](https://claim-deployments-demo.vercel.app)
- [Demo with resource claims](https://claim-deployments-demo-with-resource.vercel.app/)

## Associated resources

When a user claims a deployment, Vercel also transfers any associated resources (limited to specific providers) to the new owner's account. These resources maintain their connections to the project, ensuring a seamless transition of both the deployment and its dependencies.

The resource providers that currently support resource transfer are [Neon](https://vercel.com/marketplace/neon), [Supabase](https://vercel.com/marketplace/supabase), and [Prisma](https://vercel.com/marketplace/prisma).

For more details on the transfer process, see [Resources with Claim Deployments flows](/docs/integrations/create-integration/marketplace-flows#resources-with-claim-deployments).

## Important endpoints

- **Claim Deployments URL:** `https://vercel.com/claim-deployment?[...]`

- **Initiate a project transfer request:** [POST /projects/:idOrName/transfer-request](/docs/rest-api/projects/create-project-transfer-request)

- **Complete a project transfer:** [PUT /projects/transfer-request/:code](/docs/rest-api/projects/accept-project-transfer-request)
  - *This endpoint is not needed if you are using the Claim Deployments URL*

## Example use case: automated AI-generated deployment

1. **File upload:** The AI agent uploads the deployment files using the Vercel API: [POST /v2/files](/docs/rest-api/deployments/upload-deployment-files).

2. **Deployment creation:**
   - Create a new deployment using the [Vercel CLI](/docs/cli/deploying-from-cli)
   - Or create a deployment with the Vercel API: [POST /v2/files](/docs/rest-api/deployments/upload-deployment-files) followed by [POST /deployments](/docs/rest-api/deployments/create-a-new-deployment).

3. **Project transfer request:**
   - The agent initiates a transfer request with: [POST /projects/:idOrName/transfer-request](/docs/rest-api/projects/create-project-transfer-request).
   - This returns a `code` (valid for 24 hours) that allows the agent to transfer the project to another team, typically the end user who initiated the request.

4. **Generate claim URL:**
   - The agent generates a claim URL and shares it with the user:
     `https://vercel.com/claim-deployment?code=xxx&returnUrl=https://xxx`

5. **User claims the deployment:**
   - The user accesses the claim page using the URL and selects a team within their Vercel account to transfer the deployment.

6. **Project transfer completion:**
   - After the user clicks **Transfer**, the Vercel API ([PUT /projects/transfer-request/:code](/docs/rest-api/projects/accept-project-transfer-request)) completes the project transfer, assigning it to the user’s selected team. This step is not necessary if you are using the Claim Deployments Flow.

Get started with [this template](https://github.com/vercel/claim-deployments-demo) of claiming deployments ([demo](https://claim-deployments-demo.vercel.app)).

## Team restructuring

When reorganizing teams, you can easily transfer ownership of projects to another team using the Claim Deployments feature.

## Migrating personal projects to a company account

Freelancers or employees can move deployments from their personal accounts to a company’s Vercel account by generating and sharing a claim URL.


---

[View full sitemap](/docs/sitemap)
