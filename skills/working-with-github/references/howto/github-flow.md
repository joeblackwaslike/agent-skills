# GitHub Flow

The canonical lightweight workflow GitHub itself uses. Simple, fast, and enough for the vast majority of projects.

## The loop

1. **Branch off `main`.** Create a short-lived branch with a descriptive name (`fix/login-redirect`, `feat/csv-export`). `main` is always deployable; your branch is a safe space to work.
2. **Commit and push.** Small, isolated, well-described commits. Push early so work is backed up and visible to collaborators.
3. **Open a PR — early.** Open it as soon as you want feedback (a draft PR is fine before it's ready). The PR is where review, discussion, and CI happen.
4. **CI runs; reviewers review.** Required status checks must pass; reviewers approve or request changes. Push fixes to the same branch — the PR updates and re-runs CI automatically.
5. **Merge to `main`.** Once approved and green, merge.
6. **Deploy from `main`** and **delete the branch.**

```bash
git switch -c feat/csv-export
# work, commit
git push -u origin feat/csv-export
gh pr create --fill --reviewer alice         # open early; --draft if not ready
gh pr checks --watch                         # CI
gh pr merge --squash --delete-branch         # merge + cleanup
```

## Principles

- **Branches are short-lived.** Hours to a few days, not weeks. Long branches accumulate merge debt.
- **`main` is always releasable.** Nothing merges that isn't deployable.
- **The PR is the unit of review and the audit trail.** One coherent change per PR.
- **One branch per unrelated change.** Don't bundle a refactor with a feature — it complicates review and reverts.
- **Protect `main`** with required checks and reviews (see `multi-branch-release.md` for rulesets).

## When GitHub Flow is enough

It's enough — and ideal — when you **deploy from `main`** and only ever support the **latest** version: web apps, services, most internal tooling, and libraries on a rolling release. Continuous delivery off a protected `main` is its sweet spot.

You've outgrown it when you must **maintain multiple released versions in parallel** (patching v1.x while v2.x ships) or you need **staged promotion through environments with formal gates**. At that point, add GitHub Environments and possibly release branches — see `multi-branch-release.md`. Don't reach for that complexity preemptively.

## Compared to the alternatives

| Model | Long-lived branches | Best for | Cost |
| --- | --- | --- | --- |
| **GitHub Flow** | `main` only | Web apps/services deploying latest from `main` | Minimal; needs branch protection + CI discipline |
| **Trunk-based** | `main` only (often with feature flags) | High-velocity teams, CI/CD, many committers | Requires feature flags + strong test gates to merge incomplete work safely |
| **GitFlow** | `main` + `develop` + `release/*` + `hotfix/*` | Versioned products with parallel supported releases, scheduled cadence | High merge/backport overhead; slower flow |

GitHub Flow and trunk-based are close cousins — GitHub Flow is essentially trunk-based with PRs as the gate. The practical difference is that pure trunk-based leans on **feature flags** to merge incomplete work to `main` continuously, while GitHub Flow keeps a feature on its branch until the PR is mergeable. Start with GitHub Flow; adopt flags and tighter trunk-based discipline as commit volume grows; only adopt GitFlow's branch sprawl when parallel-version support genuinely demands it.
