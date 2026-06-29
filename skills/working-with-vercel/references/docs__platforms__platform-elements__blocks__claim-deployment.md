---
title: Claim Deployment
product: vercel
url: /docs/platforms/platform-elements/blocks/claim-deployment
canonical_url: "https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment"
last_updated: 2018-10-20
type: conceptual
prerequisites:
  - /docs/platforms/platform-elements/blocks
  - /docs/platforms/platform-elements
related:
  - /docs/platforms/platform-elements/actions/deploy-files
  - /docs/platforms/platform-elements/blocks/deploy-popover
summary: Learn about claim deployment on Vercel.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/platforms/platform-elements/blocks/claim-deployment.md"
fetched_at: "2026-06-29T05:46:34.852Z"
sha256: "1ba811413b587431b988f843372ce10133b4838f1970b66a77789d6dc74bbe7e"
---

# Claim Deployment

## Overview

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
