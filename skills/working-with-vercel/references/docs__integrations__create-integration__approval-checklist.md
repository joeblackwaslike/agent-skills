---
title: Integration Approval Checklist
product: vercel
url: /docs/integrations/create-integration/approval-checklist
canonical_url: "https://vercel.com/docs/integrations/create-integration/approval-checklist"
last_updated: 2026-07-16
type: reference
prerequisites:
  - /docs/integrations/create-integration
  - /docs/integrations
related:
  - /docs/integrations/create-integration/native-integration
  - /docs/integrations/create-integration/marketplace-api
  - /docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation
  - /docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info
  - /docs/deploy-button/source
summary: Review this checklist before submitting your native or connectable account integration for approval on the Vercel Marketplace.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/create-integration/approval-checklist.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "f4dbe9ad6fca39966b0f313e984e5d3c8eb392b3783e5004fa825c86abf02a58"
---

# Integration Approval Checklist

Before submitting your integration for review, work through the checklist that matches your integration type:


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations?from=related) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Requirements for listing an Integration](https://vercel.com/docs/integrations/create-integration/submit-integration?from=related) — Learn about all the requirements and guidelines needed when creating your Integration.
- [Install an Integration](https://vercel.com/docs/integrations/install-an-integration?from=related) — Learn how to pair Vercel's functionality with a third-party service to streamline observability, integrate with testing
- [Add a Native Integration](https://vercel.com/docs/integrations/install-an-integration/product-integration?from=related) — Learn how you can add a product to your Vercel project through a native integration.
- [Marketplace Partner API](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/partner?from=related) — Learn about marketplace partner api on Vercel.
- [Marketplace Vercel API](https://vercel.com/docs/integrations/create-integration/marketplace-api/reference/vercel?from=related) — Learn about marketplace vercel api on Vercel.

Full cross-link map for this page: [/docs/integrations/create-integration/approval-checklist.graph.md](/docs/integrations/create-integration/approval-checklist.graph.md)
<!-- /docsgraph:related -->

- [Native integration](#native-integrations): Uses the Marketplace API and an integration server.
- [Connectable account integration](#connectable-account-integrations): Uses a redirect URL and OAuth flow.

Complete the relevant checklist, then email integrations@vercel.com with your request to be reviewed.

## Native integrations

Use this checklist if you're building a [native integration](/docs/integrations/create-integration/native-integration) that uses the [Marketplace API](/docs/integrations/create-integration/marketplace-api).

### Authentication and setup

- Verify that OAuth and SSO flows authenticate users securely. Test both [Vercel SSO](/docs/integrations/create-integration/marketplace-api#vercel-initiated-sso) and [Provider SSO](/docs/integrations/create-integration/marketplace-api#provider-initiated-sso) if applicable.
- Test the user onboarding flow from Vercel to your platform. Confirm that the [Upsert Installation](/docs/integrations/create-integration/marketplace-api/reference/partner/upsert-installation) endpoint creates and syncs accounts correctly.
- Confirm that user accounts sync between Vercel and your platform. Use the [Get Account Information](/docs/integrations/create-integration/marketplace-api/reference/vercel/get-account-info) endpoint to retrieve team contact details rather than relying on the installing user's information.

### Product listing

- Validate your product's listing details: name, description, and . Confirm the logo is properly centered and looks good in both light and dark mode.
- Confirm pricing details and plans (free and paid tiers) are accurate. Your [billing plans endpoint](/docs/integrations/create-integration/marketplace-api#billing) returns the correct plans for each product.
- Include documentation links (setup guides, FAQs) in your listing. Set the **Documentation URL** in the integration console.
- Verify category placement in the Marketplace (for example, AI, Observability, Database) matches your product.
- Confirm feature parity with your direct offering, including any features tailored for the Marketplace.
- Ensure your  are high quality (1920x1080px, 16:9 ratio) and readable in both light and dark mode. Verify the first image is suitable for the auto-generated Open Graph image.
- If your integration supports both native and connectable account flows, ensure the connectable account flow works. Otherwise, remove the **Redirect URL** from the integration console.
- Add a Marketplace [template](/docs/deploy-button/source#store-product-integration) as a deploy option in the product flow. This is required.

### Installation and configuration

- Test the installation process for new users who don't have an account on your platform.
- Test the installation process for existing users who already have an account on your platform.
- Test the installation from the external flow (user is logged out of Vercel).
- Confirm that configuration steps (API keys, endpoints, metadata schema options) are clear and functional. Use the **Preview Form** in the integration console to verify your [metadata schema](/docs/integrations/create-integration/marketplace-product#metadata-schema) renders correctly.
- Validate that settings apply correctly after installation. Verify environment variables are set with the correct targets and values.
- Confirm the uninstall process works and cleans up resources. Handle the [Delete Installation](/docs/integrations/create-integration/marketplace-api/reference/partner/delete-installation) endpoint and return `{finalized: true}` if you don't need a finalization window.
- Run end-to-end testing: install the integration, provision a resource, connect it to a project, and verify all functionality works as expected.

### Feature functionality

- Test core features of your product, including query execution, data retrieval, and any product-specific functionality.
- Verify usage reporting displays correctly in both the **Integrations** section in the sidebar and the resource dashboard. Confirm that usage charts and stats are formatted properly.
- Confirm [invoice submission](/docs/integrations/create-integration/billing#submitting-invoices) works. Submit a test invoice and verify it flows through the expected [lifecycle states](/docs/integrations/create-integration/billing#invoice-lifecycle).
- Verify that test snippets and quick-start code blocks appear on the product page. Confirm they include the correct secrets and environment variable references.
- Publish your Getting Started guide with accurate content and verify it displays correctly.
- Verify metadata configuration from the integration console: use `vercel-region` controls instead of a generic `select` for region choices, set meaningful default values, and validate controls in both resource creation and update flows.
- Test the responsiveness of UI elements. Verify buttons, tiles, and dropdowns work as expected.

### Billing and usage tracking

- Test your integration against Vercel's [billing system](/docs/integrations/create-integration/billing). Verify that usage-based pricing calculations are correct.
- Confirm you [send interim billing data](/docs/integrations/create-integration/billing#send-interim-billing-data) at least once a day (ideally once per hour) so users see expected charges in their dashboard.
- Test invoice generation and sync with your billing cycle. Verify that the `period` field aligns with your billing schedule.
- Test refund processes or billing adjustments using the [Invoice Actions API](/docs/integrations/create-integration/marketplace-api/reference/vercel/update-invoice).
- Handle `marketplace.invoice.notpaid` and `marketplace.invoice.overdue` webhooks gracefully. Wait at least 15 days before taking destructive actions like deleting resources.

### Documentation and support

- Confirm all setup and usage documentation is complete and accessible at the **Documentation URL** in the integration console.
- Test the support contact flow from the marketplace listing page (`/marketplace/[slug]`). This uses the static support link configured in the integration console.
- Test the support link from the installed product page (`/[teamSlug]/~/integrations/products/[slug]`). This uses an SSO link with the `support=true` query parameter.
- Test the support link from the resource dashboard page. This also uses an SSO link with the `support=true` query parameter.

### Edge cases and scalability

- Simulate high traffic or multiple concurrent installations to test scalability.
- Test edge cases such as invalid configurations, missing dependencies, or expired tokens.
- Test [reinstallation behavior](/docs/integrations/create-integration/native-integration#reinstallation-behavior). If a team uninstalls and reinstalls your integration, verify you treat the new `installationId` as a fresh installation with no assumptions from the previous one.

### Next steps for providers

Once you've completed this checklist:

1. Email integrations@vercel.com with your request to be reviewed for listing.
2. Vercel reviews your integration and provides feedback or requests additional testing.
3. Schedule a final walkthrough call to address any remaining questions.

## Connectable account integrations

Use this checklist if you're building a [connectable account integration](/docs/integrations/create-integration#connectable-account-integrations) that uses a redirect URL and OAuth flow.

### Marketplace listing

Navigate to `/integrations/:slug` to view the listing for your integration.

- Is the  properly centered and cropped? Does it look good in both light and dark mode?

* Is the first image high-quality and suitable for the auto-generated  image?
* Check that none of the images are blurry or display sensitive information. All images should look polished and professional.

**Examples:**

- [MongoDB Atlas](https://vercel.com/marketplace/mongodbatlas)
- [Sanity](https://vercel.com/marketplace/sanity)

### Overview and instructions

- Does the description section use markdown where appropriate (for example, `[link](#)`)?
- If there's an Instructions section, is the content additional and helpful? Avoid a step-by-step installation guide.
- Do the instructions clearly list all  that get set and what they're used for?
  Use the  when creating environment variables.
- Does additional documentation exist? If so, is the documentation URL set?

### Installation flow

From clicking the install button, a wizard pops up to guide the user through setup.

- Does the UI offer to select and map Vercel projects with the third-party? **Important:** The project selection before the popup exists for security reasons. It does **not** define which projects the user wants to install the integration on.
- Does the UI pre-select the first Vercel project to streamline installation?
- If a user limits the scope to a single project within Vercel, does the popup respect that? Is the project selection disabled?
- Are long project names on the project selection handled correctly without breaking the UI?
- Does the UI include sensible defaults during installation?
- Are advanced settings hidden behind a toggle? For example, region, RAM, and CPU selections should be preselected and hidden so the UI isn't overloaded with settings.
- Does the UI use pagination when listing all available projects? Users may have more than the pagination limit of the projects API.
- Is it impossible for users to exit the installation flow? Links such as the logo or footer should open in a new tab to prevent users from navigating away.
- Does the authentication flow (sign-up, login, forgotten password) work without interrupting installation? Can the user complete the installation successfully?

### Deploy button flow

Using  allows users to install an integration together with an example repository on GitHub.

- Does the integration handle the case where it's already installed on the ?
  The integration shouldn't treat the passed `configurationId` as a new installation if it was previously installed.

### Post-installation

After a user installs your integration through the Marketplace, they should see the details of their installation.

- Is there a Configuration URL for the integration? Users should be able to modify linked projects by selecting projects in a similar way as during installation.
- Are the environment variables set correctly with the right target?


---

[View full sitemap](/docs/sitemap)
