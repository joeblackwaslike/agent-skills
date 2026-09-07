---
title: General settings
product: vercel
url: /docs/project-configuration/general-settings
canonical_url: "https://vercel.com/docs/project-configuration/general-settings"
last_updated: 2026-08-25
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/builds/configure-a-build
  - /docs/functions/runtimes/node-js/node-js-versions
  - /docs/comments
  - /docs/vercel-toolbar
  - /docs/flags
summary: Configure basic settings for your Vercel project, including the project name, build and development settings, root directory, Node.js version,...
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/general-settings.md"
fetched_at: "2026-09-07T09:06:21.866Z"
sha256: "014377865f278cc2965b4b509f72bf96d8a89c6b760d461bae1bcf5ed3825cf2"
---

# General settings

## Project name

Project names can be up to 100 characters long and must be lowercase. They can include letters, digits, and the following characters: `.`, `\_`, `-`. However, they cannot contain the sequence `---`.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Firewall Terraform Configuration](https://vercel.com/kb/guide/firewall-terraform-configuration?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Learn how to create scalable firewall configurations with Terraform
- [How do I change the name of my Vercel Project?](https://vercel.com/kb/guide/how-do-i-change-the-name-of-my-vercel-project?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Change your Vercel project name in the dashboard, CLI, or REST API, then update the environment variables, callbacks, an
- [Project settings](https://vercel.com/docs/project-configuration/project-settings?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,
- [Security settings](https://vercel.com/docs/project-configuration/security-settings?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Configure security settings for your Vercel project, including Logs and Source Protection, Vercel Support Code Visibilit
- [Build Features for Customizing Deployments](https://vercel.com/docs/builds/build-features?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Learn how to customize your deployments using Vercel's build features.
- [Linking Projects with Vercel CLI](https://vercel.com/docs/cli/project-linking?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — Learn how to link existing Vercel Projects with Vercel CLI.
- [Projects overview](https://vercel.com/docs/projects?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=related) — A project is the application that you have deployed to Vercel.

Full cross-link map for this page: [/docs/project-configuration/general-settings.graph.md](/docs/project-configuration/general-settings.graph.md?from=related&source_path=%2Fdocs%2Fproject-configuration%2Fgeneral-settings&source_site=vercel-docs&relationship=graph)
<!-- /docsgraph:related -->

## Project avatar

Each project can have its own avatar, shown across the Vercel dashboard and in integrations. Project avatars are available on the Hobby, Pro, and Enterprise plans.

After a deployment completes, Vercel detects the project's favicon and stores it once as the avatar. If no favicon is found, the framework icon is shown instead.

To upload your own image, go to **Settings** > **General** and upload a JPG, PNG, SVG, or ICO up to 1 MB with a minimum size of 16×16 px.

## Build and development settings

You can edit settings regarding the build and development settings, root directory, and the [install command](/docs/builds/configure-a-build#install-command). See the [Configure a build documentation](/docs/builds/configure-a-build) to learn more.

The changes you make to these settings will only be applied starting from your **next deployment**.

## Node.js version

Learn more about how to customize the Node.js version of your project in the [Node.js runtime](/docs/functions/runtimes/node-js/node-js-versions#setting-the-node.js-version-in-project-settings) documentation.

You can also learn more about [all supported versions](/docs/functions/runtimes/node-js/node-js-versions#default-and-available-versions) of Node.js.

## Project ID

Your project ID can be used by the REST API to carry out tasks relating to your project. To locate your Project ID:

1. Ensure you have selected your Team from the team switcher.
2. Choose your project from the [dashboard](https://vercel.com/d?to=%2Fdashboard\&title=Open+Dashboard).
3. Open **Settings** in the sidebar.
4. Under **General**, scroll down until you find **Project ID**. The ID should start `prj_`.
5. Copy the Project ID to use as needed.

## Vercel Toolbar settings

The Vercel Toolbar is a tool that assists you in iterating and developing your project and is enabled by default on preview deployments. You can enable or disable the toolbar in your project settings.

- Leave feedback on deployments with [Comments](/docs/comments)
- Navigate [through dashboard pages](/docs/vercel-toolbar#using-the-toolbar-menu), and [share deployments](/docs/vercel-toolbar#sharing-deployments)
- Read and set [Feature Flags](/docs/flags)
- Use [Draft Mode](/docs/draft-mode) for previewing unpublished content
- Edit content in real-time using [Edit Mode](/docs/edit-mode)
- Inspect for [Layout Shifts](/docs/vercel-toolbar/layout-shift-tool) and [Interaction Timing](/docs/vercel-toolbar/interaction-timing-tool)
- Check for accessibility issues with the [Accessibility Audit Tool](/docs/vercel-toolbar/accessibility-audit-tool)


---

[View full sitemap](/docs/sitemap)
