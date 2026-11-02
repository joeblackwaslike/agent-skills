---
title: Running End-to-End Tests in Vercel CI
product: vercel
url: /docs/ci/guides/end-to-end-tests
canonical_url: "https://vercel.com/docs/ci/guides/end-to-end-tests"
last_updated: 2026-10-28
type: tutorial
prerequisites:
  - /docs/ci/guides
  - /docs/ci
related:
  - /docs/deployment-protection
  - /docs/ci
  - /docs/ci/configuration
  - /docs/ci/image
  - /docs/cli/ci
summary: Run Playwright tests against the Vercel deployment of every commit with Vercel CI.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ci/guides/end-to-end-tests.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "24e940ef0fed649d333b77643f0189e95e5bc6f4c3ef6743cd3961aaf00391f7"
---

# Running End-to-End Tests in Vercel CI

In this tutorial, you'll set up Vercel CI to run [Playwright](https://playwright.dev/) tests against the Vercel deployment of each commit. The tests run in Chromium and work with deployments that use [Deployment Protection](/docs/deployment-protection).

You'll configure a task that:

1. Waits for your app's Vercel deployment to finish.
2. Starts the official Playwright container image with Docker.
3. Runs your tests against the deployment's URL.

## Prerequisites

- Vercel CI [enabled for your repository](/docs/ci#getting-started).
- A web app in your monorepo at `apps/web`, with the package name `web` in its `package.json`.
- A Vercel project connected to your repository with its root directory set to `apps/web`.
- `@playwright/test` in the app's `devDependencies`.

## Set up the tests

- ### Add the Vercel CI task
  Add an `e2e:ci` task to your app's `turbo.json`:
  ```json filename="apps/web/turbo.json"
  {
    "extends": ["//"],
    "tasks": {
      "e2e:ci": {
        "dependsOn": ["web#deployment"],
        "tags": ["ci", "ci:cpus:8", "ci:oidc:deployments"],
        "passThroughEnv": ["VERCEL_DEPLOYMENT_URLS"]
      }
    }
  }
  ```
  - `web#deployment` makes the task wait for the `web` deployment of the same commit.
  - `ci:oidc:deployments` authenticates requests to that deployment, so the tests can reach it even when Deployment Protection is on.
  - `ci:cpus:8` gives the browser more CPUs than the default of 2.
  - `passThroughEnv` lets the task read the deployment's URL from `VERCEL_DEPLOYMENT_URLS`.
  To learn more about each setting, see [Testing against your deployments](/docs/ci/configuration#testing-against-your-deployments).

- ### Point Playwright at the deployment
  Vercel CI gives your task the deployment's address in `VERCEL_DEPLOYMENT_URLS`. This variable holds a JSON object that maps each package name to its deployment's hostname. The hostname has no protocol:
  ```json
  { "web": "web-a1b2c3d4e-acme.vercel.app" }
  ```
  Playwright needs a full URL, so the container script in the next steps reads the `web` hostname, adds `https://`, and passes the result to Playwright as `BASE_URL`. The value moves through each stage like this:

  | Stage                                       | Value                                       |
  | ------------------------------------------- | ------------------------------------------- |
  | `VERCEL_DEPLOYMENT_URLS` in the task        | `{"web":"web-a1b2c3d4e-acme.vercel.app"}`   |
  | `host` in `scripts/e2e-ci.sh`               | `web-a1b2c3d4e-acme.vercel.app`             |
  | `BASE_URL` in the Playwright container      | `https://web-a1b2c3d4e-acme.vercel.app`     |
  | `page.goto('/')` in a test                  | `https://web-a1b2c3d4e-acme.vercel.app/`    |

  If your app's package name isn't `web`, use that name as the key instead.

  Read the base URL from `BASE_URL` in your Playwright configuration. The fallback to `localhost` lets you run the same tests against your local dev server:
  ```ts filename="apps/web/playwright.config.ts"
  import { defineConfig } from '@playwright/test';

  export default defineConfig({
    testDir: './e2e',
    use: {
      baseURL: process.env.BASE_URL ?? 'http://localhost:3000',
    },
  });
  ```
  Then add a test:
  ```ts filename="apps/web/e2e/home.spec.ts"
  import { expect, test } from '@playwright/test';

  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });
  ```

- ### Trust the Vercel CI certificate authority
  Vercel CI uses its own certificate authority (CA) for network traffic. Chromium doesn't read the `SSL_CERT_FILE` variable that other tools use, so it rejects HTTPS connections until you import the CA into its certificate database.

  Create a script that imports the CA bundle, then runs the command you pass to it:
  ```bash filename="apps/web/scripts/trust-ci-ca.sh"
  #!/bin/sh
  set -eu

  bundle=${SSL_CERT_FILE:?SSL_CERT_FILE must point to the Vercel CI CA bundle}

  apt-get update -qq
  apt-get install -y -qq libnss3-tools >/dev/null

  mkdir -p /tmp/ci-ca /root/.pki/nssdb
  awk '/-----BEGIN CERTIFICATE-----/ { n += 1; out = sprintf("/tmp/ci-ca/%03d.crt", n) }
    out { print > out }
    /-----END CERTIFICATE-----/ { close(out); out = "" }' "$bundle"

  certutil -N -d sql:/root/.pki/nssdb --empty-password
  for cert in /tmp/ci-ca/*.crt; do
    certutil -A -d sql:/root/.pki/nssdb -n "$(basename "$cert")" -t C,, -i "$cert"
  done

  exec "$@"
  ```
  This script only configures Chromium. Firefox and WebKit store trusted certificates differently and need additional setup.

- ### Run Playwright in a container
  Create a script that starts the Playwright image that matches your installed version, then runs your tests inside it:
  ```bash filename="apps/web/scripts/e2e-ci.sh"
  #!/bin/sh
  set -eu

  host=$(node -p 'JSON.parse(process.env.VERCEL_DEPLOYMENT_URLS).web')
  version=$(node -p 'require("@playwright/test/package.json").version')
  repo=$(git rev-parse --show-toplevel)

  exec vercel-ci-docker-run --rm --init --ipc=host --user root \
    --volume "$repo:$repo" \
    --workdir "$PWD" \
    --env CI \
    --env "BASE_URL=https://$host" \
    "mcr.microsoft.com/playwright:v$version" \
    sh scripts/trust-ci-ca.sh ./node_modules/.bin/playwright test
  ```
  - `host` reads the `web` deployment's hostname from `VERCEL_DEPLOYMENT_URLS`. The `.web` key is your app's package name.
  - `--env "BASE_URL=https://$host"` turns the hostname into the URL that `playwright.config.ts` reads. The container doesn't inherit the task's environment variables, so the script passes `BASE_URL` and `CI` explicitly.
  - `vercel-ci-docker-run` works like `docker run` and adds the Vercel CI CA bundle to the container. The trust script reads it from `SSL_CERT_FILE`. To learn more, see [Running containers in your tasks](/docs/ci/image#running-containers-in-your-tasks).
  - The container mounts your repository, so it uses the dependencies Vercel CI already installed.
  - `--ipc=host` gives Chromium enough shared memory.
  Add the script to your app's `package.json`:
  ```json filename="apps/web/package.json"
  {
    "scripts": {
      "e2e:ci": "sh scripts/e2e-ci.sh"
    }
  }
  ```

- ### Push your changes
  Commit the files and push them to GitHub. On the next push, Vercel CI waits for the `web` deployment, then runs `web#e2e:ci` against it.

  To find the run and its logs, open [the CI tab](https://vercel.com/d?to=%2F%5Bteam%5D%2F%7E%2Fci\&title=) in the dashboard, or run [`vercel ci`](/docs/cli/ci) from your repository.

## Next steps

- [Make other environment variables available to your tests](/docs/ci/environment-variables#make-variables-available-to-your-tasks)
- [Call other projects from your tests](/docs/ci/configuration#call-other-projects)
- [Understand what your test runs cost](/docs/ci/pricing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
