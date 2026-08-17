---
title: Deployment Checks
product: vercel
url: /docs/deployment-checks
canonical_url: "https://vercel.com/docs/deployment-checks"
last_updated: 2026-07-02
type: reference
prerequisites:
  []
related:
  - /docs/git/vercel-for-github
  - /docs/deployments/promoting-a-deployment
  - /docs/rolling-releases
summary: Set conditions that must be met before proceeding to the next phase of the deployment lifecycle.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/deployment-checks.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "67023c59c6df9220ede7bbf1586c961f4e8f7d42986046fd222640c4808c3298"
---

# Deployment Checks

Deployment Checks are conditions that must be met before promoting a production build to your production environment.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related) — Learn how to deploy based on tags/releases on Vercel.
- [How can I use GitHub Actions with Vercel?](https://vercel.com/kb/guide/how-can-i-use-github-actions-with-vercel?from=related) — GitHub Actions with Vercel works best when you skip duplicate builds. Learn the 4-command CLI pattern, --prebuilt flag,
- [Why aren't commits triggering deployments on Vercel?](https://vercel.com/kb/guide/why-aren-t-commits-triggering-deployments-on-vercel?from=related) — Commits not triggering deployments on Vercel? Walk the diagnostic checklist covering authentication, commit author acces
- [Checks](https://vercel.com/docs/checks?from=related) — Vercel automatically keeps an eye on various aspects of your web application using the Checks API. Learn how to use Chec
- [Checks Reference](https://vercel.com/docs/checks/creating-checks?from=related) — Learn how to create your own Checks with Vercel Integrations. You can build your own Integration in order to register an
- [Git Integrations](https://vercel.com/docs/git?from=related) — Vercel allows for automatic deployments on every branch push and merges onto the production branch of your GitHub, GitLa
- [Deployments](https://vercel.com/docs/deployments?from=related) — Learn how to create and manage deployments on Vercel.
- [Git Configuration](https://vercel.com/docs/project-configuration/git-configuration?from=related) — Learn how to configure Git for your project through vercel.json or vercel.ts.

Full cross-link map for this page: [/docs/deployment-checks.graph.md](/docs/deployment-checks.graph.md)
<!-- /docsgraph:related -->

When you add Deployment Checks to a project, Vercel will hold each production deployment until all required checks pass before assigning it to your custom production domains.

## Understanding Deployment Checks

Decoupling production builds and releases allows teams to move faster with higher confidence at scale.

- Feature branches are worked on in isolation and merged to the default branch once the code passes required checks for merging.
- Production deployments are created after new code is merged, but must pass a set of required checks before being released to end users.

By default, Vercel automatically promotes your most recent, successful production build to your custom production domains. This creates the following release workflow:

1. Push or merge code to your default branch.
2. Vercel creates a production build.
3. Once the build is ready, release the build to production.

At scale, this can mean the set of code that is tested **before merging** is not the same as the code that would be released to end users. We want to maintain the safety of releases, while allowing developers and [agents](/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk "AI Agents") to continue authoring and merging code at high velocity.

With Deployment Checks, you introduce a new step that ensures the safety of the production deployment before it's released, with the following workflow:

1. Push or merge code to your default branch.
2. Vercel creates a production deployment.
3. **Run safety checks to ensure that the build is safe for release.**
4. **Once Deployment Checks are passing**, release the build to production.

## Types of Deployment Checks

You can add Deployment Checks from multiple sources:

- **GitHub Checks**: Import GitHub Actions workflow results as Deployment Checks. Vercel reads commit statuses and check run results to determine if a deployment should be promoted.
- **Integration Checks**: Third-party integrations from the [Vercel Marketplace](/marketplace) can provide checks for testing, monitoring, and observability.

## GitHub Checks

When a project is connected to GitHub using [Vercel for GitHub](/docs/git/vercel-for-github), Vercel can read the statuses of your commits and selected GitHub Action results. Using these statuses, Vercel can prevent production deployments from [promoting to production](/docs/deployments/promoting-a-deployment) until your checks have passed.

### Adding GitHub Checks

- ### Ensure prerequisites are met
  1. Link your project to a GitHub repository using [Vercel for GitHub](/docs/git/vercel-for-github). You can verify this in your [project's Git settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fgit).
  2. Visit [your project's production environment settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fenvironments%2Fproduction) and ensure automatic aliasing for production is turned on.

- ### Select your Deployment Checks
  Visit [your project's Deployment Checks settings](https://vercel.com/d?to=%2F%5Bteam%5D%2F%5Bproject%5D%2Fsettings%2Fbuild-and-deployment%23deployment-checks) and select **Add Checks**. Choose **GitHub** as the provider, then search for and select the GitHub Actions checks you want to require.

- ### Update workflows (if necessary)
  If using GitHub Actions with a [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch) trigger, update your workflows to set a status for Vercel using the [`vercel/repository-dispatch/actions/status@v1`](https://github.com/marketplace/actions/deployment-status-update) action. This ensures the commit that triggered the deployment is the one used to determine if the Deployment Checks are met.
  ```yaml
  - name: 'Notify Vercel'
    uses: 'vercel/repository-dispatch/actions/status@v1'
    with:
      # The name of the check will be used to identify the check in the Deployment Checks settings and must be unique
      name: "Vercel - my-project: e2e-tests"
  ```
  If you are **not** using [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch), you can still use the [`vercel/repository-dispatch/actions/status@v1`](https://github.com/marketplace/actions/deployment-status-update), but it is not required and you can depend on the check directly.

- ### Create a new production deployment
  Deployment Checks appear as part of a production deployment's lifecycle. Production deployments will still be created, but will not be automatically assigned to your custom domains until all Deployment Checks are met.

- ### Run GitHub Actions to fulfill all Deployment Checks
  To meet Deployment Checks, run their corresponding GitHub Actions.

  If you're using [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch) to trigger a workflow in response to Vercel deployments, you must use the [`vercel.deployment.ready` event](/docs/git/vercel-for-github#repository-dispatch-events). This event triggers after the deployment is created, and before checks are run.

- ### Promote to production once all Deployment Checks are met
  Once all of the Deployment Checks have passed, the deployment is aliased to your production domain(s) automatically.

  For additional release protection, enable [Rolling Releases](/docs/rolling-releases) to ensure your deployment is fractionally released before promoting to everyone.

## Bypassing Deployment Checks

You can bypass Deployment Checks by selecting [Force Promote](/docs/deployments/promoting-a-deployment) from the deployment details page.

## Limitations

GitHub and GitHub Actions have edge cases with status reporting. These behaviors are matched in GitHub-backed Deployment Checks.

- To trigger a workflow in response to Vercel deployments using [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch), use the [`vercel/repository-dispatch/actions/status@v1`](https://github.com/marketplace/actions/deployment-status-update) action to set a status on the commit for Vercel Deployment Checks. This ensures the commit that triggered the deployment is the one used to determine if the Deployment Checks are met.
- GitHub uses the names of jobs to identify which checks are the same across instances. This means that:
  - Changing the name of a job requires updating your Deployment Checks to align with the names.
  - Each run of a GitHub Workflow should result in only one commit status. For example, when using [`repository_dispatch`](https://docs.github.com/en/actions/writing-workflows/choosing-when-your-workflow-runs/events-that-trigger-workflows#repository_dispatch), ensure the commit status includes the environment name to avoid writing to the same status for each of the triggered workflow runs.
- Avoid using the same name for actions across multiple workflows. Due to GitHub's implementation of Check Runs, these will collide and introduce race conditions when used with GitHub branch protection rules, GitHub rulesets, and Vercel Deployment Checks.


---

[View full sitemap](/docs/sitemap)
