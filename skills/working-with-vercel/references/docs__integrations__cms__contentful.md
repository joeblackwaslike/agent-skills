---
title: Vercel and Contentful Integration
product: vercel
url: /docs/integrations/cms/contentful
canonical_url: "https://vercel.com/docs/integrations/cms/contentful"
last_updated: 2026-08-28
type: tutorial
prerequisites:
  - /docs/integrations/cms
  - /docs/integrations
related:
  - /docs/vercel-toolbar
summary: Integrate Vercel with Contentful to deploy your content.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/integrations/cms/contentful.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "c61c6216777029a220b4ebcfed0cfb0b22b9f5ab40824879a685f5fa25d25225"
---

# Vercel and Contentful Integration

[Contentful](https://contentful.com/) is a headless CMS that allows you to separate the content management and presentation layers of your web application. This integration allows you to deploy your content from Contentful to Vercel.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Content Link can now be used with Contentful ](https://vercel.com/changelog/content-link-can-now-be-used-with-contentful)
- [Integrating Next.js and Contentful for your Headless CMS](https://vercel.com/kb/guide/integrating-next-js-and-contentful-for-your-headless-cms) — Next.js with Contentful gives you the power to quickly build scalable dynamic static websites with improved search engin
- [Integrate Vercel and Contentstack for your Headless CMS](https://vercel.com/kb/guide/integrate-vercel-and-contentstack) — Integrate Vercel with Contentstack, a headless CMS, to build and deploy dynamic, high-performance websites.
- [Build an integrations hub with Nuxt and Vercel Connect](https://vercel.com/kb/guide/nuxt-and-vercel-connect) — Build an Integrations Hub with Nuxt and Vercel Connect. Connect GitHub and Linear over OAuth and mint short-lived tokens
- [How to deploy a Next.js online store with Stripe](https://vercel.com/kb/guide/how-to-deploy-a-next-js-online-store-with-stripe) — Learn how to build and deploy a Next.js e-commerce store with Stripe payments on Vercel. This step-by-step guide covers
- [Build with a FastAPI starter template](https://vercel.com/kb/guide/build-with-a-fastapi-starter-template) — Browse FastAPI starter templates for Vercel and deploy one in a few steps. Compare minimal, AI, agent, and full-stack Fa
- [Vercel and Sitecore XM Cloud Integration](https://vercel.com/docs/integrations/cms/sitecore) — Integrate Vercel with Sitecore XM Cloud to deploy your content.
- [Vercel Sanity Integration](https://vercel.com/docs/integrations/cms/sanity) — Learn how to integrate Sanity with Vercel. Follow our tutorial to deploy the Sanity template or install the integration
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Deploying GitLab Projects with Vercel](https://vercel.com/docs/git/vercel-for-gitlab) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Platform Template](https://vercel.com/docs/platforms/examples/platform-template) — Build an AI app builder on Vercel with sandboxes, AI Gateway, deployments, and project transfers.

Full cross-link map for this page: [/docs/integrations/cms/contentful.graph.md](/docs/integrations/cms/contentful.graph.md)
<!-- /docsgraph:related -->

This quickstart guide uses the [Vercel Contentful integration](/marketplace/contentful) to allow streamlined access between your Contentful content and Vercel deployment. When you use the template, you'll be automatically prompted to install the Integration during deployment.

If you already have a Vercel deployment and a Contentful account, you should [install the Contentful Integration](/marketplace/contentful) to connect your Space to your Vercel project. To finish, the important parts that you need to know from the QuickStart are:

- Getting your [Space ID](#retrieve-your-contentful-space-id) and [Content Management API Token](#create-a-content-management-api-token)
- [Importing your content model](#import-the-content-model)
- [Adding your Contentful environment variables](#add-environment-variables) to your Vercel project

## Getting started

To help you get started, we built a [template](https://vercel.com/templates/next.js/nextjs-blog-preview-mode) using Next.js, Contentful, and Tailwind CSS.

You can either deploy the template above to Vercel with one click, or use the steps below to clone it to your machine and deploy it locally:

- ### Clone the repository
  You can clone the repo using the following command:

  **pnpm**
  ```bash
  pnpm create next-app --example cms-contentful
  ```
  **yarn**
  ```bash
  yarn create next-app --example cms-contentful
  ```
  **npm**
  ```bash
  npx create-next-app --example cms-contentful
  ```
  **bun**
  ```bash
  bunx create-next-app --example cms-contentful
  ```

- ### Create a Contentful Account
  Next, create a new account on [Contentful](https://contentful.com/) and make an empty "space". This is where your content lives. We also created a sample content model to help you get started quickly.

  If you have an existing account and space, you can use it with the rest of these steps.

- ### Retrieve your Contentful Space ID
  The Vercel integration uses your Contentful Space ID to communicate with Contentful. To find this, navigate to your Contentful dashboard and select **Settings** > **API Keys**. Click on **Add API key** and you will see your Space ID in the next screen.

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/contentful/api-section.png)

- ### Create a Content Management API token
  You will also need to create a Content Management API token for Vercel to communicate back and forth with the Contentful API. You can get that by going to **Settings** > **API Keys** > **Content management tokens**.

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/contentful/content-management-tokens.png)

  Click on **Generate personal token** and a modal will pop up. Give your token a name and click on **Generate**.
  > **💡 Note:** Avoid sharing this token because it allows both read and write access to your
  > Contentful space. Once the token is generated copy the key and save remotely
  > as it will not be accessible later on. If lost, a new one must be created.

- ### Import the Content Model
  Use your Space ID and Content Management Token in the command below to import the pre-made content model into your space using our setup Node.js script. You can do that by running the following command:

  **pnpm**
  ```bash
  npx cross-env CONTENTFUL_SPACE_ID=YOUR_SPACE_ID CONTENTFUL_MANAGEMENT_TOKEN=XXX pnpm run setup
  ```
  **yarn**
  ```bash
  npx cross-env CONTENTFUL_SPACE_ID=YOUR_SPACE_ID CONTENTFUL_MANAGEMENT_TOKEN=XXX yarn setup
  ```
  **npm**
  ```bash
  npx cross-env CONTENTFUL_SPACE_ID=YOUR_SPACE_ID CONTENTFUL_MANAGEMENT_TOKEN=XXX npm run setup
  ```
  **bun**
  ```bash
  npx cross-env CONTENTFUL_SPACE_ID=YOUR_SPACE_ID CONTENTFUL_MANAGEMENT_TOKEN=XXX bun run setup
  ```

## Adding Content in Contentful

Now that you've created your space in Contentful, add some content!

- ### Publish Contentful entries
  You'll notice the new author and post entries for the example we've provided. Publish each entry to make this fully live.

- ### Retrieve your Contentful Secrets
  Now, let's save the Space ID and token from earlier to add as Environment Variables for running locally. Create a new `.env.local` file in your application:
  ```shell filename="terminal"
  CONTENTFUL_SPACE_ID='your-space-id'
  CONTENTFUL_ACCESS_TOKEN='your-content-api-token'
  ```

- ### Start your application
  You can now start your application with the following command:

  **pnpm**
  ```bash
  pnpm install && pnpm run dev
  ```
  **yarn**
  ```bash
  yarn && yarn dev
  ```
  **npm**
  ```bash
  npm install && npm run dev
  ```
  **bun**
  ```bash
  bun install && bun run dev
  ```
  Your project should now be running on `http://localhost:3000`.

## How it works

Next.js is designed to integrate with any data source of your choice, including Content Management Systems. Contentful provides a helpful GraphQL API, which you can both query and mutate data from. This allows you to decouple your content from your frontend. For example:

```js
async function fetchGraphQL(query) {
  return fetch(
    `https://graphql.contentful.com/content/v1/repos/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json());
}
```

This code allows you to fetch data on the server from your Contentful instance. Each space inside Contentful has its own ID (e.g. `CONTENTFUL_SPACE_ID`) which you can add as an Environment Variable inside your Next.js application.

This allows you to use secure values you don't want to commit to git, which are only evaluated on the server (e.g. `CONTENTFUL_ACCESS_TOKEN`).

## Deploying to Vercel

Now that you have your application wired up to Contentful, you can deploy it to Vercel to get your site online. You can either use the Vercel CLI or the Git integrations to deploy your code. Let’s use the Git integration.

- ### Publish your code to Git
  Push your code to your git repository (e.g. GitHub, GitLab, or BitBucket).
  ```shell filename="terminal"
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin [repository url]
  git push -u origin master
  ```

- ### Import your project into Vercel
  Log in to your Vercel account (or create one) and import your project into Vercel using the [import flow](https://vercel.com/new).

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/contentful/import-to-vercel.png)

  Vercel will detect that you are using Next.js and will enable the correct settings for your deployment.

- ### Add Environment Variables
  Add the `CONTENTFUL_SPACE_ID` and `CONTENTFUL_ACCESS_TOKEN` Environment Variables from your `.env.local` file by copying and pasting it under the **Environment Variables** section.
  ```shell filename="terminal"
  CONTENTFUL_SPACE_ID='your-space-id'
  CONTENTFUL_ACCESS_TOKEN='your-content-api-token'
  ```
  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/contentful/add-env-vars.png)

  Click "Deploy" and your application will be live on Vercel!

  ![Image](https://7nyt0uhk7sse4zvn.public.blob.vercel-storage.com/docs-assets/static/docs/integrations/contentful/deployed.png)

### Content Link

> Content Link is available on Enterprise and Pro plans

Content Link enables you to edit content on websites using headless CMSs by providing links on elements that match a content model in the CMS. This real-time content visualization allows collaborators to make changes without needing a developer's assistance.

You can enable Content Link on a preview deployment by selecting  **Edit Mode** in the [Vercel Toolbar](/docs/vercel-toolbar) menu.

The corresponding model in the CMS determines an editable field. You can hover over an element to display a link in the top-right corner of the element and then select the link to open the related CMS field for editing.

You don't need any additional configuration or code changes on the page to use this feature.

To implement Content Link in your project, follow the steps in [Contentful's documentation](https://www.contentful.com/developers/docs/tools/vercel/content-source-maps-with-vercel/).

## Manage Contentful content from Slack

Deploy the [eve Contentful Agent template](/templates/eve/eve-contentful-agent) to search, draft, and edit Contentful entries from Slack. By default, the agent saves entry edits without publishing them and asks for approval in Slack before publication.

During setup, connect a Slack app through Vercel Connect and configure a private Vercel Blob store for users' writing preferences. Provide your Contentful Management API token as `CONTENTFUL_MANAGEMENT_TOKEN` and your space IDs as `CONTENTFUL_SPACE_IDS`. After deployment, add the agent to a Slack channel and mention it to start a conversation.

See the [template repository](https://github.com/vercel-labs/eve-contentful-agent-template) for setup instructions and options for customizing writing guidelines and publication approval.


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
