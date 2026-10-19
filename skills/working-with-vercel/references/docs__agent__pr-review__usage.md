---
title: Managing Code Reviews
product: vercel
url: /docs/agent/pr-review/usage
canonical_url: "https://vercel.com/docs/agent/pr-review/usage"
last_updated: 2026-08-28
type: integration
prerequisites:
  - /docs/agent/pr-review
  - /docs/agent
related:
  - /docs/agent/pr-review
  - /docs/agent/pricing
summary: Customize which repositories get reviewed and track your review metrics and spending.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/agent/pr-review/usage.md"
fetched_at: "2026-10-19T09:46:53.451Z"
sha256: "3c218d276d607de838486854fd93eea7725ab780dccfaca1de7d20bead90ce6a"
---

# Managing Code Reviews

Once you've [set up Code Review](/docs/agent/pr-review#how-to-set-up-code-review), you can customize settings and monitor performance on the [**Agent** page](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the dashboard. This is your central hub for managing which repositories get reviewed, tracking costs, and analyzing how reviews are performing.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Using Vercel Agent to review pull requests](https://vercel.com/kb/guide/vercel-agent-code-review) — Set up Vercel Agent Code Review to automatically review pull requests, apply validated fixes, request reviews with @verc
- [The Complete Guide to Vercel Agent](https://vercel.com/kb/guide/vercel-agent) — Learn what Vercel Agent does, how to set up Code Review, Investigation, Chat, and Installation, and what each feature co
- [On-demand Vercel Agent code reviews](https://vercel.com/changelog/on-demand-vercel-agent-code-reviews)
- [Apply code suggestions from Vercel Agent with one click](https://vercel.com/changelog/apply-code-suggestions-from-vercel-agent-with-one-click)
- [Introducing the new Vercel Agent](https://vercel.com/blog/vercel-agent)
- [AI code reviews by Vercel Agent now in Public Beta](https://vercel.com/changelog/ai-code-reviews-by-vercel-agent-now-in-beta)
- [Introducing Vercel for Slack](https://vercel.com/blog/introducing-vercel-for-slack)
- [Using coding agents to procure Vercel Marketplace integrations](https://vercel.com/kb/guide/using-coding-agents-to-procure-vercel-marketplace-integrations) — Coding agents can now discover, provision, and manage third-party services from the Vercel Marketplace using the Vercel
- [Automatic build fix suggestions with Vercel Agent](https://vercel.com/changelog/automatic-build-fix-suggestions-with-vercel-agent)
- [Installation](https://vercel.com/docs/agent/installation) — Let AI automatically install Web Analytics and Speed Insights in your app
- [Getting started with Vercel](https://vercel.com/docs/getting-started-with-vercel) — Install the Vercel CLI, add the Vercel Plugin or agent skills, connect Vercel MCP, and deploy your first project.
- [Project settings](https://vercel.com/docs/project-configuration/project-settings) — Use the project settings, to configure custom domains, environment variables, Git, integrations, deployment protection,

Full cross-link map for this page: [/docs/agent/pr-review/usage.graph.md](/docs/agent/pr-review/usage.graph.md)
<!-- /docsgraph:related -->

## Choose which repositories to review

You might want to control which repositories receive automatic reviews, especially when you're testing Code Review for the first time or managing costs across a large organization.

To choose which repositories get reviewed:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Click the **…** button, and then select **Settings** to view the Vercel Agent settings.
3. Under **Repositories**, choose which repositories to review:
   - **All repositories** (default): Reviews every repository connected to your Vercel projects
   - **Public only**: Only reviews publicly accessible repositories
   - **Private only**: Only reviews private repositories
4. Click **Save** to apply your changes.

These settings help you start small with specific repos or focus on the repositories that matter most to your team.

## Allow reviews on draft PRs

By default, Code Review skips draft pull requests since they're often work-in-progress. You can enable draft reviews if you want early feedback even on unfinished code.

To enable reviews on draft PRs:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Click the **…** button, and then select **Settings** to view the Vercel Agent settings.
3. Under **Review Draft PRs**, select **Review draft PRs**.
4. Click **Save** to apply your changes.

Draft reviews contribute to your Vercel Agent usage, but provide feedback earlier in your development process.

## Track spending and costs

You can monitor your spending in real time to manage your budget. The **Agent** page shows the cost of each review and your total spending over a given period.

For detailed information about tracking usage and understanding cost breakdowns, see [Track costs and usage](/docs/agent/pricing#track-costs-and-usage).

## Track the suggestions

The **Agent** page also shows you the total number of suggestions over a given period, as well as the number of suggestions for each individual review.

To view suggestions:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Check the **Suggestions** column for each review.

A high number of suggestions might indicate complex changes or code that needs more attention. A low number might mean your code is already following best practices, or the changes are straightforward.

## Review Vercel Agent efficiency

Understanding how Code Review performs helps you optimize your setup and control usage.

The **Agent** page provides several metrics for each review:

- **Repository**: Which repository was reviewed
- **PR**: The pull request identifier (click to view the PR)
- **Suggestions**: Number of code changes recommended
- **Review time**: How long the review took to complete
- **Files read**: Number of files the AI analyzed
- **Spend**: Total cost for that review
- **Time**: When the review occurred

Use this data to identify patterns:

- **Expensive reviews**: If certain repositories consistently have high costs, consider whether they need special handling or different review settings
- **Long review times**: Reviews taking longer than expected might indicate complex codebases or large PRs that could benefit from smaller, incremental changes
- **High file counts**: Repositories with many files analyzed might benefit from more focused review scopes

## Export review metrics

You can export all your review data to CSV for deeper analysis, reporting, or tracking trends over time.

To export your data:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Click the **Export** button.
3. Save the CSV file to your computer.

The exported data includes all metrics from the dashboard, letting you:

- Create custom reports for your team or stakeholders
- Analyze trends across multiple repositories
- Calculate ROI by comparing review costs to time saved
- Track adoption and usage patterns over time

## Turn off automatic Code Reviews

You can stop automatic reviews from the **Agent** page. Manual reviews and explicit `@vercel` requests remain available and can create paid usage.

To turn off automatic Code Reviews:

1. Select [**Agent**](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fagent\&title=Open+Vercel+Agent) in the top-right corner of the dashboard.
2. Click the **…** button, and then select **Turn off automatic Code Reviews…**.
3. Confirm the action in the prompt that appears.

Once disabled, Code Review won't run automatically on new pull requests. You can re-enable automatic reviews at any time from the same menu.


---

[View full sitemap](/docs/sitemap)
