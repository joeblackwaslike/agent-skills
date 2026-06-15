---
source: "https://raw.githubusercontent.com/github/docs/main/content/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users.md"
fetched_at: "2026-06-15T17:25:57.300Z"
sha256: "04768b43170a5997732c9970a0df948215398ba207264652b20f6f13b2eee711"
---

## About issue and pull request assignees

You can assign multiple people to each issue or pull request, including: yourself, anyone who has commented on the issue or pull request, anyone with write permissions to the repository, and organization members with read permissions to the repository. For more information, see [AUTOTITLE](/get-started/learning-about-github/access-permissions-on-github).

{% ifversion copilot %}

You may also be able to assign {% data variables.product.prodname_copilot_short %} to an issue, see [AUTOTITLE](/copilot/how-tos/use-copilot-agents/cloud-agent/start-copilot-sessions).

{% endif %}

Both issues and pull requests support up to 10 assignees.

## Assigning an individual issue or pull request

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-issue-pr %}
1. Open the issue or pull request that you want to assign to someone.
1. In the right side menu, click **Assignees**.

   ![Screenshot of the right sidebar of an issue. A header, labeled "Assignees", is outlined in dark orange.](/assets/images/help/issues/assignee-menu.png)
1. To assign the issue or pull request to a user, start typing their username, then click their name when it appears. You can select and add up to ten assignees to an issue or pull request.

## Assigning multiple issues or pull requests

{% data reusables.repositories.navigate-to-repo %}
{% data reusables.repositories.sidebar-issue-pr %}
1. Select the items you want to assign to someone.

   ![Screenshot of the first two items in a list of issues. To the left of each issue, a checkbox is checked and outlined in dark orange.](/assets/images/help/issues/issues-assign-checkbox.png)
1. In the upper-right corner, click **Assign**.
1. To assign the items to a user, start typing their username, then click their name when it appears. You can select and add up to ten assignees to an issue or pull request.

{% ifversion copilot %}

## Assigning an issue to {% data variables.product.prodname_copilot_short %}

If you assign an issue to {% data variables.product.prodname_copilot_short %}, {% data variables.product.prodname_copilot_short %} will work autonomously on the issue, creating a pull request and, when it has finished, requesting that you review the pull request. See [AUTOTITLE](/copilot/concepts/agents/cloud-agent/about-cloud-agent).

{% endif %}

## Further reading

* [AUTOTITLE](/issues/tracking-your-work-with-issues/filtering-and-searching-issues-and-pull-requests)
