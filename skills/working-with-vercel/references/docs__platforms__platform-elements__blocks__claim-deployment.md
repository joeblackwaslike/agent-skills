---
title: Claim Deployment
product: vercel
url: /docs/platforms/platform-elements/blocks/claim-deployment
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment"
last_updated: 2026-06-26
type: reference
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/platforms/platform-elements/blocks/deploy-popover
summary: A component for users to claim ownership of Vercel deployments created on their behalf.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment.md"
fetched_at: "2026-08-31T10:45:09.572Z"
sha256: "bf96e0a569f9651ea29db909c166f446fbb40087b3c5f66e041d4264e10ca004"
---

# Claim Deployment

## Overview


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Claim Deployments now available for fast and secure deployment transfers](https://vercel.com/changelog/claim-deployments?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related)
- [Claimed deployments now include third-party resources](https://vercel.com/changelog/claimed-deployments-now-include-third-party-resources?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related)
- [Introducing Platform Elements](https://vercel.com/changelog/introducing-platform-elements?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related)
- [AI Agents on Vercel](https://vercel.com/kb/guide/ai-agents?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — This guide provides an overview of how to build and deploy AI agents on Vercel.
- [Claim Deployments](https://vercel.com/docs/deployments/claim-deployments?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — Learn how to take ownership of deployments on Vercel with the Claim Deployments feature.
- [Deploying to Vercel](https://vercel.com/docs/deployments?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — Learn how to create and manage deployments on Vercel.
- [Platform Template](https://vercel.com/docs/platforms/examples/platform-template?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — Build an AI app builder on Vercel with sandboxes, AI Gateway, deployments, and project transfers.
- [Deploying a project from the CLI](https://vercel.com/docs/projects/deploy-from-cli?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — Set up and deploy a Vercel project using the CLI, from linking to production.
- [Vercel Documentation Sitemap](https://vercel.com/docs/sitemap.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=related) — Browse Vercel documentation pages with summaries, prerequisites, and topics.

Full cross-link map for this page: [/docs/platforms/platform-elements/blocks/claim-deployment.graph.md](/docs/platforms/platform-elements/blocks/claim-deployment.graph.md?from=related&source_path=%2Fdocs%2Fplatforms%2Fplatform-elements%2Fblocks%2Fclaim-deployment&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

The Claim Deployment block provides a polished interface for platforms that deploy sites to Vercel on behalf of their users. When you create a deployment programmatically (e.g., through Mintlify, Hashnode, or similar platforms), users can claim ownership to manage updates and settings directly from their own Vercel account.

## Installation

Install the `claim-deployment` block into your project using the Platform Elements installer.

## Features

- **Visual deployment preview**: Shows a preview image of the deployed site
- **One-click URL copying**: Users can easily copy their deployment URL with the external link button
- **Vercel branding**: Includes the official Vercel logo for authenticity
- **Responsive design**: Works seamlessly across desktop and mobile devices

## Usage

```tsx filename="claim-deployment.tsx"
import { ClaimDeployment } from '@/components/blocks/claim-deployment';

export default function DeploymentReady() {
  const handleClaim = () => {
    // Redirect to Vercel OAuth flow or handle claim logic
    window.location.href = `https://vercel.com/oauth/authorize?...`;
  };

  return (
    <ClaimDeployment
      url="https://my-app.vercel.app"
      onClaimClick={handleClaim}
    />
  );
}
```

## Props

| Prop           | Type         | Required | Description                                                               |
| -------------- | ------------ | -------- | ------------------------------------------------------------------------- |
| `url`          | `string`     | Yes      | The deployment URL to display and allow copying                           |
| `onClaimClick` | `() => void` | Yes      | Callback function triggered when the "Claim Deployment" button is clicked |

## Customization

The component uses shadcn/ui components internally, allowing you to customize the appearance through your existing theme configuration. Replace the preview image placeholder with an actual screenshot of the deployment.

## Integration flow

1. **Deploy via API**: Your platform creates a deployment using Vercel's API
2. **Show claim interface**: Present this component to the user with their deployment URL
3. **Handle claim action**: When clicked, redirect to Vercel's OAuth flow or your custom claim process
4. **Transfer ownership**: Complete the transfer so users can manage the deployment from their Vercel dashboard

## Related

- [Deploy Files action](/docs/platforms/platform-elements/actions/deploy-files)
- [Deploy Popover block](/docs/platforms/platform-elements/blocks/deploy-popover)


---

[View full sitemap](/docs/sitemap)
