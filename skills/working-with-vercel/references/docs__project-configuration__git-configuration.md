---
title: Git Configuration
product: vercel
url: /docs/project-configuration/git-configuration
canonical_url: "https://vercel.com/docs/project-configuration/git-configuration"
last_updated: 2025-12-19
type: reference
prerequisites:
  - /docs/project-configuration
related:
  - /docs/project-configuration/vercel-json
  - /docs/project-configuration/vercel-ts
  - /docs/git/vercel-for-github
  - /docs/deployments/promoting-a-deployment
summary: Learn how to configure Git for your project through vercel.json or vercel.ts.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/project-configuration/git-configuration.md"
fetched_at: "2026-08-17T04:50:17.160Z"
sha256: "157b152fe9268cbc81599a2a10ec08b3a1bf401df8ff7b29f4e1331db52fcafa"
---

# Git Configuration

The following configuration options can be used through a `vercel.json` file via [Static Configuration](/docs/project-configuration/vercel-json) or a `vercel.ts` file via [Programmatic Configuration](/docs/project-configuration/vercel-ts).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [Can you deploy based on tags/releases on Vercel?](https://vercel.com/kb/guide/can-you-deploy-based-on-tags-releases-on-vercel?from=related) — Learn how to deploy based on tags/releases on Vercel.
- [Git Settings](https://vercel.com/docs/project-configuration/git-settings?from=related) — Use the project settings to manage the Git connection, enable Git LFS, and create deploy hooks.
- [Git Integrations](https://vercel.com/docs/git?from=related) — Vercel allows for automatic deployments on every branch push and merges onto the production branch of your GitHub, GitLa
- [GitLab](https://vercel.com/docs/git/vercel-for-gitlab?from=related) — ​Vercel for GitLab automatically deploys your GitLab projects with Vercel, providing Preview Deployment URLs, and automa
- [Bitbucket](https://vercel.com/docs/git/vercel-for-bitbucket?from=related) — ​Vercel for Bitbucket automatically deploys your Bitbucket projects with Vercel, providing Preview Deployment URLs, and
- [System Environment Variables](https://vercel.com/docs/environment-variables/system-environment-variables?from=related) — System environment variables are automatically populated by Vercel, such as the URL of the deployment or the name of the

Full cross-link map for this page: [/docs/project-configuration/git-configuration.graph.md](/docs/project-configuration/git-configuration.graph.md)
<!-- /docsgraph:related -->

## git.deploymentEnabled

**Type**: `Object` of key branch identifier `String` and value `Boolean`, or `Boolean`.

**Default**: `true`

Specify branches that should not trigger a deployment upon commits. By default, any unspecified branch is set to `true`.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "dev": false
    }
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  git: {
    deploymentEnabled: {
      dev: false,
    },
  },
};
```

### Matching multiple branches

Use [minimatch syntax](https://github.com/isaacs/minimatch) to define behavior for multiple branches.

The example below prevents automated deployments for any branch that starts with `internal-`.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "internal-*": false
    }
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  git: {
    deploymentEnabled: {
      'internal-*': false,
    },
  },
};
```

### Branches matching multiple rules

If a branch matches multiple rules and at least one rule is `true`, a deployment will occur.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": {
      "experiment-*": false,
      "*-dev": true
    }
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  git: {
    deploymentEnabled: {
      'experiment-*': false,
      '*-dev': true,
    },
  },
};
```

A branch named `experiment-my-branch-dev` will create a deployment.

### Turning off all automatic deployments

To turn off automatic deployments for all branches, set the property value to `false`.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "git": {
    "deploymentEnabled": false
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  git: {
    deploymentEnabled: false,
  },
};
```

## github.autoAlias

**Type**: `Boolean`.

When set to `false`, [Vercel for GitHub](/docs/git/vercel-for-github) will create preview deployments upon merge.

> **💡 Note:** Follow the [deploying a staged production
> build](/docs/deployments/promoting-a-deployment#staging-and-promoting-a-production-deployment)
> workflow instead of this setting.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "github": {
    "autoAlias": false
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  github: {
    autoAlias: false,
  },
};
```

## github.autoJobCancelation

**Type**: `Boolean`.

When set to false, [Vercel for GitHub](/docs/git/vercel-for-github) will always build pushes in sequence without cancelling a build for the most recent commit.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "github": {
    "autoJobCancelation": false
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  github: {
    autoJobCancelation: false,
  },
};
```

## Legacy

### github.silent

The `github.silent` property has been deprecated in favor of the new settings in the dashboard, which allow for more fine-grained control over which comments appear on your connected Git repositories. These settings can be found in [the Git section of your project's settings](/docs/git/vercel-for-github#silence-github-comments).

**Type**: `Boolean`.

When set to `true`, [Vercel for GitHub](/docs/git/vercel-for-github) will stop commenting on pull requests and commits.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "github": {
    "silent": true
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  github: {
    silent: true,
  },
};
```

### github.enabled

The `github.enabled` property has been deprecated in favor of [git.deploymentEnabled](/docs/project-configuration/git-configuration#git.deploymentenabled), which allows you to disable auto-deployments for your project.

**Type**: `Boolean`.

When set to `false`, [Vercel for GitHub](/docs/git/vercel-for-github) will not deploy the given project regardless of the GitHub app being installed.

#### \['vercel.json'

```json filename="vercel.json"
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "github": {
    "enabled": false
  }
}
```

#### 'vercel.ts']

```typescript filename="vercel.ts"
import type { VercelConfig } from '@vercel/config/v1';

export const config: VercelConfig = {
  github: {
    enabled: false,
  },
};
```


---

[View full sitemap](/docs/sitemap)
