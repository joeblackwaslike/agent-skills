---
source: "https://raw.githubusercontent.com/github/docs/main/content/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions.md"
fetched_at: "2026-10-19T09:43:37.420Z"
sha256: "da7b70a1d8039e0002d5e1667412589cb2390475abc309bc401e0ac229f6816b"
---

You can use the `jobs.<job_id>.if` conditional to prevent a job from running unless a condition is met. {% data reusables.actions.if-supported-contexts %} 

Note that conditions executed by a shell (for example `[[ $variable == "prefix"* ]]`) cannot be evaluated in `jobs.<job_id>.if`. Such conditions must be written inside `jobs.<job_id>.steps[*].run`.

### Example: Only run job for a specific repository

This example uses `if` to control when the `production-deploy` job can run. It will only run if the repository is named `octo-repo-prod` and is within the `octo-org` organization. Otherwise, the job will be marked as _skipped_.

```yaml copy
name: example-workflow
on: [push]
jobs:
  production-deploy:
    if: {% raw %}${{ github.repository == 'octo-org/octo-repo-prod' }}{% endraw %}
    runs-on: ubuntu-latest
    steps:
      - uses: {% data reusables.actions.action-checkout %}
      - uses: {% data reusables.actions.action-setup-node %}
        with:
          node-version: '14'
      - run: npm install -g bats
```

Skipped jobs display the message "This check was skipped."

> [!NOTE]
> A job that is skipped will report its status as "Success". It will not prevent a pull request from merging, even if it is a required check.

{% ifversion fpt or ghec %}

To debug why a job was skipped or ran unexpectedly, you can view job condition expression logs. For more information, see [AUTOTITLE](/actions/how-tos/monitor-workflows/view-job-condition-logs).

{% endif %}
