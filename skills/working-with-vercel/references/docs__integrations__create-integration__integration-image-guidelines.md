---
title: Integration Image Guidelines
product: vercel
url: /docs/integrations/create-integration/integration-image-guidelines
canonical_url: "https://vercel.com/docs/integrations/create-integration/integration-image-guidelines"
last_updated: 2025-08-26
type: reference
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  []
summary: Guidelines for creating images for integrations, including layout, content, visual assets, descriptions, and design standards.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
search_with_vercel_cli: npx vercel@latest docs search "<query>"
source: "https://vercel.com/docs/integrations/create-integration/integration-image-guidelines.md"
fetched_at: "2026-11-16T12:35:12.533Z"
sha256: "69fc9596dac002aa2498fe1b9f1cda625a293579b4ea432795b85df599f237cf"
---

# Integration Image Guidelines

These guidelines help ensure consistent, high-quality previews for integrations across the Vercel platform.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Integration Approval Checklist](https://vercel.com/docs/integrations/create-integration/approval-checklist) — Review this checklist before submitting your native or connectable account integration for approval on the Vercel Market
- [List products for integration configuration](https://vercel.com/docs/rest-api/integrations/list-products-for-integration-configuration) — GET /v1/integrations/configuration/{id}/products — Returns products available for an integration configuration. Each pro
- [Vercel CI Guides](https://vercel.com/docs/ci/guides) — Follow complete examples of common Vercel CI workflows, from end-to-end tests to pull request comments.
- [Vercel CMS Integrations](https://vercel.com/docs/integrations/cms) — Learn how to integrate Vercel with CMS platforms, including Contentful, Sanity, and Sitecore XM Cloud.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing

Full cross-link map for this page: [/docs/integrations/create-integration/integration-image-guidelines.graph.md](/docs/integrations/create-integration/integration-image-guidelines.graph.md)
<!-- /docsgraph:related -->

See [Clerk's Integration](https://vercel.com/marketplace/clerk) for a strong example.

## 1. Rules on image layout

a. Images must use a 16:9 layout (1920 × 1080 minimum).

b. Layouts must have symmetrical margins and a reasonable safe area.

c. All images must have both a central visual asset and a description.

## 2. Rules on central visual assets

a. Central visual assets must offer a real glimpse into the product.

b. Central visual assets shouldn't be full window screenshots. Instead, you should showcase product components.

c. Products with GUIs must have at least one central visual asset displaying a component of the GUI.

d. You can include additional decor as long as it does not overpower the central visual asset.

## 3. Rules on descriptions

a. Descriptions must explain the paired visual asset.

b. Descriptions must be clear and concise.

c. Descriptions must follow proper grammar.

## 4. Rules on image design

a. Images must meet a baseline design standard and maintain a consistent visual style across all assets.

b. Images must be accessible and legible. You should ensure good contrast and type size.

c. Avoid unnecessary clutter on images and focus on clarity.

d. All images must be high-resolution to prevent any pixelation.

e. Images should clearly highlight the most compelling parts of the UI and showcase features that are valuable to customers.

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
