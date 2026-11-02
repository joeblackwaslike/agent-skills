---
title: Running Integration Tests with a Database in Vercel CI
product: vercel
url: /docs/ci/guides/integration-tests
canonical_url: "https://vercel.com/docs/ci/guides/integration-tests"
last_updated: 2026-10-28
type: tutorial
prerequisites:
  - /docs/ci/guides
  - /docs/ci
related:
  - /docs/ci
  - /docs/ci/image
  - /docs/ci/environment-variables
  - /docs/ci/guides/end-to-end-tests
  - /docs/ci/guides/github-comments
summary: Start a Postgres container next to your tests in Vercel CI with Turborepo\
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/ci/guides/integration-tests.md"
fetched_at: "2026-11-02T12:08:37.581Z"
sha256: "79fd3b3a606e85ffd036c74dd052e09b9ac9e2329839ee44e3d984e767c901e4"
---

# Running Integration Tests with a Database in Vercel CI

In this tutorial, you'll run integration tests against a real Postgres database in Vercel CI. You'll use Turborepo's [`with` key](https://turborepo.dev/docs/reference/configuration#with) to start the database next to your tests, so both run in the same compute instance and Turborepo stops the database when your tests finish.

You'll configure:

1. A task that runs Postgres in a Docker container.
2. A test task that starts the database with `with`, waits until it's ready, and runs your tests.

## Prerequisites

- Vercel CI [enabled for your repository](/docs/ci#getting-started).
- An app in your monorepo at `apps/api` that you want to test, with the package name `api`.
- An empty package for the database at `packages/db`, with the package name `db`.

## Set up the tests

- ### Add a task that runs Postgres
  Add a script that runs the official Postgres image to `packages/db/package.json`:
  ```json filename="packages/db/package.json"
  {
    "name": "db",
    "private": true,
    "scripts": {
      "postgres": "docker run --rm --name ci-postgres -p 5432:5432 -e POSTGRES_PASSWORD=postgres postgres:17"
    }
  }
  ```
  Then mark the task as persistent, because it runs until something stops it:
  ```json filename="packages/db/turbo.json"
  {
    "extends": ["//"],
    "tasks": {
      "postgres": {
        "persistent": true,
        "cache": false
      }
    }
  }
  ```
  Vercel CI starts Docker before your task runs, so the task can use `docker run` without any setup. To learn more, see [Running containers in your tasks](/docs/ci/image#running-containers-in-your-tasks).

- ### Start the database with your tests
  Add a `test:integration` task to your app's `turbo.json`, and list the database task in `with`:
  ```json filename="apps/api/turbo.json"
  {
    "extends": ["//"],
    "tasks": {
      "test:integration": {
        "with": ["db#postgres"],
        "tags": ["ci", "ci:cpus:4"]
      }
    }
  }
  ```
  - `with` starts `db#postgres` at the same time as `test:integration`, in the same compute instance. When the tests finish, Turborepo stops the database, and the container removes itself.
  - `db#postgres` doesn't need a `ci` tag. Vercel CI only runs it as part of `test:integration`.
  - `ci:cpus:4` gives the database and your tests more CPUs than the default of 2, because they share the instance.

- ### Wait for the database
  Postgres takes a few seconds to start, and Docker might need to download the image first. Add a script that waits until Postgres accepts connections:
  ```bash filename="apps/api/scripts/wait-for-postgres.sh"
  #!/bin/sh
  set -eu

  for _ in $(seq 1 120); do
    if docker exec ci-postgres pg_isready -h 127.0.0.1 -U postgres >/dev/null 2>&1; then
      exit 0
    fi
    sleep 1
  done

  echo "Postgres didn't start within 120 seconds." >&2
  exit 1
  ```
  The `-h 127.0.0.1` flag checks the TCP port that your tests connect to. Without it, `pg_isready` can report that Postgres is ready while the image is still initializing the database.

- ### Write a test
  Install a Postgres client in your app:
  ```bash package-manager
  npm i -D pg
  ```
  Then add a test that connects to the database:
  ```js filename="apps/api/test/database.test.js"
  import assert from 'node:assert/strict';
  import { test } from 'node:test';
  import pg from 'pg';

  test('runs a query against Postgres', async () => {
    const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
    await client.connect();
    try {
      const { rows } = await client.query('SELECT 1 + 1 AS sum');
      assert.equal(rows[0].sum, 2);
    } finally {
      await client.end();
    }
  });
  ```
  Add the `test:integration` script to your app's `package.json`. It waits for the database, then runs the tests with the database's connection string:
  ```json filename="apps/api/package.json"
  {
    "name": "api",
    "type": "module",
    "scripts": {
      "test:integration": "sh scripts/wait-for-postgres.sh && DATABASE_URL=postgres://postgres:postgres@localhost:5432/postgres node --test"
    }
  }
  ```
  The example sets `DATABASE_URL` inside the script because the database only exists for this task. To use a value from Vercel CI instead, see [Make variables available to your tasks](/docs/ci/environment-variables#make-variables-available-to-your-tasks).

- ### Push your changes
  Commit the files and push them to GitHub. When your changes affect `api`, Vercel CI runs `api#test:integration`, which starts Postgres, runs your tests, and stops the database.

  You can run the same task locally with Docker installed:
  ```bash filename="terminal"
  turbo run api#test:integration
  ```

## Next steps

- [Run end-to-end tests against your deployment](/docs/ci/guides/end-to-end-tests)
- [Post results to your pull requests](/docs/ci/guides/github-comments)
- [Learn how Vercel CI bills for CPU time](/docs/ci/pricing)


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
