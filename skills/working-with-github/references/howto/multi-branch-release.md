# Multi-Branch / Multi-Environment Release

A modern promotion process: how branches, GitHub Environments, and rulesets combine to ship `dev → staging → prod` safely.

## Branching model: pick one deliberately

**Trunk-based (default for 2026).** Everything merges to `main` via short-lived branches. `main` is always releasable. Environments — not long-lived branches — separate dev/staging/prod. Releases are tags off `main`. Choose this unless you have a concrete reason not to: it minimizes merge debt and matches continuous delivery.

**GitFlow-style release branches.** Long-lived `release/x.y` (and sometimes `develop`) branches alongside `main`. Choose this only when you must **support multiple released versions in parallel** (e.g. you maintain `release/1.x` and `release/2.x` and ship patches to both), or you're in a regulated/slow-cadence shop with formal release stabilization windows. The cost is ongoing merge/backport overhead.

Most teams want trunk-based. Reach for release branches when "we still patch the version from 8 months ago" is a real requirement.

## GitHub Environments

An **Environment** is a named deployment target (`development`, `staging`, `production`) with its own protection rules, secrets, and variables. They're the gate that turns "merged" into "deployed."

Protection rules per environment:

- **Required reviewers** — up to 6 users/teams must approve before a deployment to this environment proceeds. This is your **manual approval gate** for production.
- **Wait timer** — force a delay (e.g. 10 min soak) before the deployment runs.
- **Deployment branch policies / branch restrictions** — only allow deployments to this environment from specific branches or tags (e.g. `production` deploys only from `main` or `v*` tags; `staging` only from `main`).
- **Allow administrators to bypass** (toggle) and required-reviewer prevent-self-review options.

Each environment also scopes its own **secrets** and **variables**, so `production` credentials never leak into a `staging` deploy. A workflow job opts in with `environment: production`, and the gate evaluates before the job runs.

Configure via UI (Settings → Environments) or the REST API:

```bash
# Create/update an environment with a 1-reviewer gate and a wait timer
gh api --method PUT repos/OWNER/REPO/environments/production \
  -f wait_timer=10 \
  -F 'reviewers[]={"type":"Team","id":1234567}' \
  -F 'deployment_branch_policy={"protected_branches":true,"custom_branch_policies":false}'

# Set an environment-scoped variable
gh api --method POST repos/OWNER/REPO/environments/production/variables \
  -f name=API_BASE -f value=https://api.example.com
```

## Branch protection / rulesets gate promotion

Protect the branch that feeds your environments (usually `main`) so only vetted code can be deployed. Use **rulesets** (the modern, layerable successor to classic branch protection):

- **Required status checks** — the build/test/lint checks that must pass before merge (and the deployment branch policy ensures only this branched code reaches prod).
- **Required pull request reviews** — N approvals, dismiss stale approvals on new pushes, require review from code owners.
- **Restrict who can push** — limit direct pushes / who can merge to the protected branch.
- **Require linear history**, **require signed commits**, **block force-pushes**, **require deployments to succeed** (gate merge on a prior environment deploy).

```bash
# Inspect rulesets on a repo
gh api repos/OWNER/REPO/rulesets --jq '.[].name'
# Classic branch protection (still available)
gh api repos/OWNER/REPO/branches/main/protection
```

The combination is the safety net: rulesets keep `main` clean; environment protection keeps prod deploys gated.

## A concrete pattern (trunk-based)

```
feature/* ──PR──▶ main ──auto-deploy──▶ staging
                   │
                   └── tag v1.2.3 / promote ──manual approval──▶ production
```

1. Feature branch → PR → required checks + review → **squash-merge to `main`**.
2. A workflow on push-to-`main` deploys to the **`staging`** environment automatically (no gate, or a short wait timer).
3. Promotion to **`production`** is a separate workflow triggered by a **tag/release** (or `workflow_dispatch`), targeting `environment: production`. The environment's **required-reviewer** rule pauses the run for **manual approval**; the **branch policy** ensures it can only deploy `main`/`v*`.
4. The deploy emits a GitHub **deployment** + status, visible on the PR/commit and the repo's Environments page.

This maps cleanly onto the Actions deployment model. **Don't duplicate workflow YAML here** — the `working-with-github-actions` skill owns the `on:`/`jobs:`/`environment:` wiring, OIDC cloud auth, and `release-please`/deploy actions. This guide is the GitHub-side gating; that skill is the execution.

## Hotfix flow (on a release branch)

When prod is broken and `main` has unreleased work you can't ship:

```bash
# Branch from the released tag, not from main
git switch -c hotfix/1.2.4 v1.2.3
# ... fix, commit ...
git push -u origin hotfix/1.2.4
gh pr create --fill --base main      # if trunk-based: PR back to main
gh release create v1.2.4 --target hotfix/1.2.4 --generate-notes
```

If you maintain `release/1.x` branches, PR the fix into the release branch, cut the patch release off it, then **backport to `main`** (and any other supported release branch) so the fix isn't lost on the next minor:

```bash
# Cherry-pick the merged hotfix commit onto main / other release lines
git switch main && git cherry-pick <sha> && git push
```

Keep hotfix scope minimal — one fix, one PR, one patch tag. Backport immediately while the context is fresh; a forgotten backport is how the same bug ships twice.
