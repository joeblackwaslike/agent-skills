---
title: Vercel Sanity Integration
product: vercel
url: /docs/integrations/cms/sanity
canonical_url: "https://vercel.com/docs/integrations/cms/sanity"
last_updated: 2025-03-04
type: how-to
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/cli
  - /docs/vercel-toolbar
  - /docs/connect
summary: Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration for real-time collaboration...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/sanity.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "36ecf35710b8c99cfc48581d514923e423507a25cacf78e0dfe2477663f48164"
---

# Vercel Sanity Integration

Sanity is a headless content management system that provides real-time collaboration and structured content management. It offers a highly customizable content studio and a powerful API, allowing developers to integrate and manage content across various platforms and devices.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Sanity is now available on the Vercel Marketplace](https://vercel.com/changelog/sanity-vercel-marketplace)
- [Vercel + Sanity: Innovating on a faster, more collaborative Web](https://vercel.com/blog/vercel-sanity-innovating-on-a-faster-collaborative-web)
- [Draft documentation fixes from reader feedback with Sanity and eve](https://vercel.com/kb/guide/sanity-eve-agent) — Build an autonomous agent that drafts fixes in Sanity, stages them for human review, and calls the model through AI Gate
- [Visual Editing: Click-to-edit content for headless CMSes](https://vercel.com/blog/visual-editing)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Vercel and Contentful Integration](https://vercel.com/docs/integrations/cms/contentful) — Integrate Vercel with Contentful to deploy your content.
- [Vercel Agility CMS Integration](https://vercel.com/docs/integrations/cms/agility-cms) — Learn how to integrate Agility CMS with Vercel. Follow our tutorial to deploy the Agility CMS template or install the in
- [Vercel DatoCMS Integration](https://vercel.com/docs/integrations/cms/dato-cms) — Learn how to integrate DatoCMS with Vercel. Follow our step-by-step tutorial to set up and manage your digital content s
- [Vercel ButterCMS Integration](https://vercel.com/docs/integrations/cms/butter-cms) — Learn how to integrate ButterCMS with Vercel. Follow our tutorial to set up the ButterCMS template on Vercel and manage
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.

Full cross-link map for this page: [/docs/integrations/cms/sanity.graph.md](/docs/integrations/cms/sanity.graph.md)
<!-- /docsgraph:related -->

## Getting started

To get started with the Sanity on Vercel deploy the template below:

Or, follow the steps below to install the integration:

- ### Install the Vercel CLI
  To pull in environment variables from Sanity to your Vercel project, you need to install the [Vercel CLI](/docs/cli). Run the following command in your terminal:

  **pnpm**
  ```bash
  pnpm i -g vercel@latest
  ```
  **yarn**
  ```bash
  yarn global add vercel@latest
  ```
  **npm**
  ```bash
  npm i -g vercel@latest
  ```
  **bun**
  ```bash
  bun add -g vercel@latest
  ```

- ### Install your CMS integration
  Navigate to the  integration and follow the steps to install the integration.

- ### Pull in environment variables
  Once you've installed the Sanity integration, you can pull in environment variables from Sanity to your Vercel project. In your terminal, run:
  ```bash
  vercel env pull
  ```

See your installed CMSs documentation for next steps on how to use the integration.

### Content Link

> Content Link is available on Enterprise and Pro plans

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.

## Manage Sanity content from Slack

Deploy the [eve Sanity Copilot template](/templates/eve/eve-sanity-copilot) to query content and create or edit drafts from Slack. The copilot also helps you work with schemas and releases, and write longer drafts in Notion.

Each user signs in to Sanity through [Vercel Connect](/docs/connect), so requests use that user's permissions. By default, operations such as publishing documents and deploying schemas require approval in Slack.

The deployment flow sets up the connectors and a Vercel Blob store for files and attachments. After deployment, mention the copilot in Slack to start a conversation. See the [template repository](https://github.com/vercel-labs/sanity-copilot-eve-template) for setup instructions and options for customizing the agent's behavior and approval rules.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
