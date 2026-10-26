---
title: vercel env
product: vercel
url: /docs/cli/env
canonical_url: "https://vercel.com/docs/cli/env"
last_updated: 2026-08-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/environment-variables
  - /docs/cli/build
  - /docs/cli/dev
  - /docs/cli/pull
  - /docs/environment-variables/sensitive-environment-variables
summary: Learn how to manage your environment variables in your Vercel Projects using the vercel env CLI command.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/env.md"
fetched_at: "2026-10-26T09:55:32.834Z"
sha256: "f48f813a0a9f7232bacc9381bc1b52cd60b373b4b380a5782d87a9a159d31263"
---

# vercel env

The `vercel env` command is used to manage [Environment Variables](/docs/environment-variables) of a Project, providing functionality to list, add, remove, export, and run commands with environment variables.


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [How to add and manage environment variables on Vercel](https://vercel.com/kb/guide/how-to-add-vercel-environment-variables) — Add environment variables to Vercel through the dashboard, CLI, or REST API, scope them to each environment, and pull th
- [Route form submissions with Jev and AI SDK](https://vercel.com/kb/guide/jev-ai-sdk-form-router) — Route form submissions to the right team with the Jev x AI SDK Form Router template. Jev routes clear cases and a fallba
- [Migrate to Vercel from Cloudflare](https://vercel.com/kb/guide/migrate-to-vercel-from-cloudflare) — Migrate your website's configuration from Cloudflare Pages or Workers to Vercel
- [How do I use private dependencies with Vercel?](https://vercel.com/kb/guide/using-private-dependencies-with-vercel) — Information on how to use private dependencies with a Vercel deployment.
- [Managing environment variables across environments](https://vercel.com/docs/environment-variables/manage-across-environments) — Add, sync, and verify environment variables across development, preview, production, and custom environments using the C
- [vercel pull](https://vercel.com/docs/cli/pull) — Learn how to update your local project with remote environment variables using the vercel pull CLI command.
- [vercel deploy](https://vercel.com/docs/cli/deploy) — Learn how to deploy your Vercel projects using the vercel deploy CLI command.
- [vercel list](https://vercel.com/docs/cli/list) — Learn how to list out all recent deployments for the current Vercel Project using the vercel list CLI command.
- [vercel global-config](https://vercel.com/docs/cli/global-config) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, remove, and manage items, read tokens, a

Full cross-link map for this page: [/docs/cli/env.graph.md](/docs/cli/env.graph.md)
<!-- /docsgraph:related -->

To leverage environment variables in local tools (like `next dev` or `gatsby dev`) that want them in a file (like `.env`), run `vercel env pull <file>`. This will export your Project's environment variables to that file. After updating environment variables on Vercel (through the dashboard, `vercel env add`, or `vercel env rm`), you will have to run `vercel env pull <file>` again to get the updated values. When the target file already exists, `vercel env pull` merges the pulled values into it instead of discarding local-only entries. See [the pull merge behavior](#exporting-development-environment-variables) for details.

To run a command with environment variables without writing them to a file, use `vercel env run -- <command>`. This fetches the environment variables directly from your linked Vercel project and passes them to the specified command.

### Exporting Development Environment Variables

Some frameworks make use of environment variables during local development through CLI commands like `next dev` or `gatsby dev`. The `vercel env pull` sub-command will export development environment variables to a local `.env` file or a different file of your choice.

```bash filename="terminal"
vercel env pull [file]
```

To override environment variable values temporarily, use:

```bash filename="terminal"
MY_ENV_VAR="temporary value" next dev
```

#### How `vercel env pull` merges into an existing file

When the target file already exists, `vercel env pull` merges the pulled values into it rather than overwriting the whole file:

- Variables defined only in your local file, and not present in the pulled environment, are kept. The CLI logs `Kept <KEYS> (defined locally, not found in the <environment> Environment)`.
- `VERCEL_OIDC_TOKEN` is never preserved from your local file. It is always refreshed from Vercel. The Vercel-managed analytics variables `VERCEL_ANALYTICS_ID`, `VERCEL_SPEED_INSIGHTS_ID`, and `VERCEL_WEB_ANALYTICS_ID` are also never preserved as local-only entries.
- For Secret variables whose values cannot be read from Vercel, the CLI keeps the real value already in your local file. If your local file has no real value for that key, the CLI writes a placeholder for you to replace with a local-only value.

<br />

> **💡 Note:** If you are using [`vercel build`](/docs/cli/build) or [
> `vercel dev`](/docs/cli/dev), you should use [
> `vercel pull`](/docs/cli/pull) instead. Those commands
> operate on a local copy of environment variables and Project settings that are
> saved under `.vercel/`, which
> `vercel pull` provides.

## Usage

```bash filename="terminal"
vercel env ls
```

*Using the \`vercel env\` command to list all Environment
Variables in a Vercel Project.*

```bash filename="terminal"
vercel env add
```

*Using the \`vercel env\` command to add an Environment
Variable to a Vercel Project.*

```bash filename="terminal"
vercel env rm
```

*Using the \`vercel env\` command to remove an Environment
Variable from a Vercel Project.*

## Extended Usage

```bash filename="terminal"
vercel env ls [environment]
```

*Using the \`vercel env\` command to list Environment
Variables for a specific Environment in a Vercel Project.*

```bash filename="terminal"
vercel env ls [environment] [gitbranch]
```

*Using the \`vercel env\` command to list Environment
Variables for a specific Environment and Git branch.*

```bash filename="terminal"
vercel env add [name]
```

*Using the \`vercel env\` command to add an Environment
Variable to all Environments to a Vercel Project.*

```bash filename="terminal"
vercel env add [name] [environment]
```

*Using the \`vercel env\` command to add an Environment
Variable for a specific Environment to a Vercel Project.*

```bash filename="terminal"
vercel env add [name] [environment] [gitbranch]
```

*Using the \`vercel env\` command to add an Environment
Variable to a specific Git branch.*

```bash filename="terminal"
vercel env add [name] [environment] < [file]
```

*Using the \`vercel env\` command to add an Environment
Variable to a Vercel Project using a local file's content as the value.*

```bash filename="terminal"
echo [value] | vercel env add [name] [environment]
```

*Using the \`echo\` command to generate the value of the
Environment Variable and piping that value into the
\`vercel env add\` command. Warning: this will save the value
in bash history, so this is not recommended for secrets.*

```bash filename="terminal"
vercel env add [name] [environment] [gitbranch] < [file]
```

*Using the \`vercel env\` command to add an Environment
Variable with Git branch to a Vercel Project using a local file's content as
the value.*

```bash filename="terminal"
vercel env rm [name] [environment]
```

*Using the \`vercel env\` command to remove an Environment
Variable from a Vercel Project.*

### Updating Environment Variables

The `vercel env update` sub-command updates the value of an existing environment variable.

```bash filename="terminal"
vercel env update [name]
```

*Using \`vercel env update\` to update an Environment
Variable across all Environments.*

```bash filename="terminal"
vercel env update [name] [environment]
```

*Using \`vercel env update\` to update an Environment
Variable for a specific Environment.*

```bash filename="terminal"
vercel env update [name] [environment] [gitbranch]
```

*Using \`vercel env update\` to update an Environment
Variable for a specific Environment and Git branch.*

```bash filename="terminal"
cat ~/.npmrc | vercel env update NPM_RC preview
```

*Update an Environment Variable value from stdin.*

```bash filename="terminal"
vercel env pull [file]
```

*Using the \`vercel env\` command to download Development
Environment Variables from the cloud and write to a specific file.*

```bash filename="terminal"
vercel env pull --environment=preview
```

*Using the \`vercel env\` command to download Preview
Environment Variables from the cloud and write to the
\`.env.local\` file.*

```bash filename="terminal"
vercel env pull --environment=preview --git-branch=feature-branch
```

*Using the \`vercel env\` command to download
"feature-branch" Environment Variables from the cloud and write to the
\`.env.local\` file.*

### Running Commands with Environment Variables

The `vercel env run` sub-command runs any command with environment variables from your linked Vercel project, without writing them to a file. This is useful when you want to avoid storing secrets on disk or need a quick way to test with production-like configuration.

```bash filename="terminal"
vercel env run -- <command>
```

*Using \`vercel env run\` to run a command with
development Environment Variables from your Vercel Project.*

```bash filename="terminal"
vercel env run -- next dev
```

*Run the Next.js development server with development Environment Variables.*

```bash filename="terminal"
vercel env run -e preview -- npm test
```

*Run tests with preview Environment Variables.*

```bash filename="terminal"
vercel env run -e production -- next build
```

*Run a production build with production Environment Variables.*

```bash filename="terminal"
vercel env run -e preview --git-branch feature-x -- next dev
```

*Run the development server with preview Environment Variables for a specific
Git branch.*

> **💡 Note:** The `--` separator is required to distinguish between
> flags for `vercel env run` and the command you want to
> run. Flags after `--` are passed to your command.

#### Options

The following options are available for `vercel env run`:

- `-e, --environment`: Specify the environment to pull variables from. Defaults to `development`. Accepts `development`, `preview`, or `production`.
- `--git-branch`: Specify a Git branch to pull branch-specific Environment Variables.

## Unique Options

These are options that only apply to the `vercel env` command.

### Type

`vercel env add` and `vercel env update` store each variable as Config or Secret. Use `--type config` or `--type secret` to set the type explicitly. The `--sensitive` and `--no-sensitive` flags map to Secret and Config. `--visibility` is a deprecated alias for `--type`.

Success output includes a `Type` line (`Config` or `Secret`).

| Target | Default type | Notes |
| --- | --- | --- |
| Production | `secret` | Use `--no-sensitive` or `--type config` for Config. |
| Preview | `secret` | Use `--no-sensitive` or `--type config` for Config. |
| Development | `config` | Use `--sensitive` or `--type secret` for Secret. Secrets are allowed in Development. |
| Custom environments | `secret` | Use `--no-sensitive` or `--type config` for Config. |

```bash filename="terminal"
vercel env add API_URL production --value "https://api.example.com" --no-sensitive --yes
```

*Add a Config variable. \`--no-sensitive\` infers \`type: config\`.*

```bash filename="terminal"
vercel env add API_KEY production --value "sk_live_..." --sensitive --yes
```

*Add a Secret variable. \`--sensitive\` infers \`type: secret\`.*

```bash filename="terminal"
vercel env add DEV_API_KEY development --value "sk_test_..." --sensitive --yes
```

*Add a Secret in Development.*

```bash filename="terminal"
vercel env add API_URL production --type config --yes
```

*Set the type explicitly with \`--type config\` or \`--type secret\`.*

Using `--sensitive` or `--no-sensitive` with a conflicting `--type` returns an error.

In an interactive terminal, the CLI asks `Environment Variable type?` unless you pass a type flag, `--yes`, `--value`, or a value through stdin. Variables with a public framework prefix, such as `NEXT_PUBLIC_`, are stored as Config.

The legacy **Enforce Sensitive Environment Variables** team policy is deprecated. The CLI no longer enforces that policy locally. See [Environment variables policy](/docs/environment-variables/sensitive-environment-variables#environment-variables-policy) for the replacement **Separate Production Secret Values** policy.

### Force

The `--force` option overwrites an existing environment variable of the same target without prompting for confirmation.

```bash filename="terminal"
vercel env add API_TOKEN production --force
```

*Using \`vercel env add\` with the
\`--force\` option to overwrite an existing Environment
Variable.*

### Yes

The `--yes` option can be used to bypass the confirmation prompt when overwriting an environment file, removing an environment variable, or updating an environment variable.

```bash filename="terminal"
vercel env pull --yes
```

*Using the \`vercel env pull\` command with the
\`--yes\` option to overwrite an existing environment
file.*

```bash filename="terminal"
vercel env rm [name] --yes
```

*Using the \`vercel env rm\` command with the
\`--yes\` option to skip the remove confirmation.*

```bash filename="terminal"
vercel env update API_TOKEN production --yes
```

*Using the \`vercel env update\` command with the
\`--yes\` option to skip the update confirmation.*

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel env` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--team`](/docs/cli/global-options#team)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you find anything wrong or missing or can't find something, submit feedback by reading https://vercel.com/feedback.md to improve Vercel.
