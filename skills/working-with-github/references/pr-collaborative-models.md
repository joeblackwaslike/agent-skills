---
source: "https://raw.githubusercontent.com/github/docs/main/content/pull-requests/collaborating-with-pull-requests/getting-started/about-collaborative-development-models.md"
fetched_at: "2026-07-20T06:52:02.847Z"
sha256: "d76047a913b4e42aa6684ae2835894ee1a425d38b2904e248a040a45f74787dd"
---

## Fork and pull model

In the fork and pull model, anyone can fork an existing ("upstream") repository to which they have read access and the owner of the upstream repository allows it. Be aware that a fork and its upstream share the same git data. This means that all content uploaded to a fork is accessible from the upstream and all other forks of that upstream. You do not need permission from the upstream repository to push to a fork that you created. You can optionally allow anyone with push access to the upstream repository to make changes to your pull request branch. This model is popular with open-source projects as it reduces the amount of friction for new contributors and allows people to work independently without upfront coordination.

> [!TIP]
> {% data reusables.open-source.open-source-guide-general %} {% data reusables.open-source.open-source-learning %}

## Shared repository model

In the shared repository model, collaborators are granted push access to a single shared repository and topic branches are created when changes need to be made. Pull requests are useful in this model as they initiate code review and general discussion about a set of changes before the changes are merged into the main development branch. This model is more prevalent with small teams and organizations collaborating on private projects.

## Further reading

* [AUTOTITLE](/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests)
* [AUTOTITLE](/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request-from-a-fork)
* [AUTOTITLE](/pull-requests/collaborating-with-pull-requests/working-with-forks/allowing-changes-to-a-pull-request-branch-created-from-a-fork)
