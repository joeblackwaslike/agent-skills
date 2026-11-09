---
title: vercel kms
product: vercel
url: /docs/cli/kms
canonical_url: "https://vercel.com/docs/cli/kms"
last_updated: 2018-10-20
type: reference
prerequisites:
  - /docs/cli
related:
  - /docs/kms
  - /docs/kms/ts-sdk-reference
  - /docs/cli/login
  - /docs/cli/global-options
  - /docs/kms/concepts/authentication
summary: Manage Vercel KMS issuers, rotate signing keys, and control which projects can sign tokens from the command line.
install_vercel_plugin: npx plugins add vercel/vercel-plugin
source: "https://vercel.com/docs/cli/kms.md"
fetched_at: "2026-11-09T12:41:22.042Z"
sha256: "cb11033f8f3c2a05bf651e33aa4cb91c26ed17ebb831e7ff7839939e563348e5"
---

# vercel kms

The `vercel kms` command manages [Vercel Key Management Service (KMS)](/docs/kms) issuers, signing keys, and project grants. The command is in beta. To sign tokens or messages from your application, use the [KMS SDK](/docs/kms/ts-sdk-reference).


<!-- docsgraph:related -->
## Related pages

> **For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below.

- [vercel tokens](https://vercel.com/docs/cli/tokens) — Manage your personal Vercel authentication tokens from the CLI: list, create, and revoke access tokens for use with the
- [vercel api](https://vercel.com/docs/cli/api) — Learn how to make authenticated HTTP requests to the Vercel API using the vercel api CLI command.
- [vercel global-config](https://vercel.com/docs/cli/global-config) — Manage Global Config stores from the Vercel CLI: list, create, inspect, update, delete, and manage items, read tokens, a
- [vercel rolling-release](https://vercel.com/docs/cli/rolling-release) — Learn how to manage your project's rolling releases using the vercel rolling-release CLI command.
- [vercel domains](https://vercel.com/docs/cli/domains) — Learn how to buy, transfer, and manage your domains using the vercel domains CLI command.

Full cross-link map for this page: [/docs/cli/kms.graph.md](/docs/cli/kms.graph.md)
<!-- /docsgraph:related -->

## Authentication and scope

Sign in with [`vercel login`](/docs/cli/login), or supply a [Vercel access token](/docs/cli/global-options#token). KMS management uses your Vercel account credentials, not the deployment OIDC token used for signing.

Use `--scope` to select the team that owns the issuer. In non-interactive mode, pass the scope explicitly:

```bash filename="terminal"
vercel kms list --scope my-team --non-interactive
```

*List issuers for a team without interactive prompts.*

Issuer commands don't require a linked project. `add-grant` accepts a project name or ID through `--project`, or uses the project linked to the current directory. See [KMS authentication](/docs/kms/concepts/authentication) for the distinction between management and signing access.

## List and inspect issuers

Running `vercel kms` without a subcommand runs `list`. Use `inspect` with an issuer ID to view its signing keys, grants, and claims schema:

```bash filename="terminal"
vercel kms list --scope my-team --json
vercel kms inspect iss_example --scope my-team --json
```

*Find an issuer ID, then inspect its configuration.*

| Command | Alias | Options |
| --- | --- | --- |
| `list` | `ls` | `--limit <NUMBER>` (`-n`), `--next <CURSOR>`, `--json` |
| `inspect <issuerId>` | `get` (deprecated) | `--json` |

The list limit defaults to 20 and has a maximum of 100. Pass the returned `pagination.next` cursor to `--next` to read another page. A `null` cursor means there are no more pages.

```bash filename="terminal"
vercel kms list --scope my-team --limit 10 --next your_cursor_here --json
```

*Continue listing issuers with the cursor from the previous response.*

Only team owners can see grants. An empty `policies` array can mean either that the issuer has no grants or that you don't have permission to read them.

## Create or import an issuer

Use `create` to generate a signing key on Vercel, or `import` to use an existing PEM private key:

```bash filename="terminal"
vercel kms create example-issuer --scope my-team --algorithm ES256
vercel kms import example-issuer --scope my-team --key ./private-key.pem
```

*Create a Vercel-generated issuer or import your own signing key.*

| Option | Commands | Description |
| --- | --- | --- |
| `--algorithm <ALGORITHM>` | `create`, `import` | One of `RS256`, `RS384`, `RS512`, `PS256`, `PS384`, `PS512`, `ES256`, `ES384`, `ES512`, or `EdDSA`. Defaults to `RS512` for `create`. Required for imported RSA keys; otherwise derived from the imported key. |
| `--claims-schema <JSON>` | `create`, `import` | A JSON Schema that validates token claims. Accepts inline JSON, `@<file>`, or `@-` for stdin. |
| `--key <FILE>` | `import` | Required path to a PEM private key, or `-` to read the key from stdin. |
| `--key-id <KID>` | `import` | The imported key's JWKS `kid`. Defaults to a server-generated value. |
| `--json` | `create`, `import` | Return structured output. |

Read private key material from a file or stdin, rather than passing it as an inline argument:

```bash filename="terminal"
cat private-key.pem | vercel kms import example-issuer --scope my-team --key - --algorithm RS256
```

*Import an RSA private key from stdin with an explicit algorithm.*

An issuer's key origin determines how you rotate it. Use `add-key` for an issuer created with Vercel-generated keys, and `import-key` for an issuer created from your own key. The CLI rejects mixing these key sources.

## Update an issuer

Use `update <issuerId>` to rename an issuer, replace its claims schema, or remove the schema:

```bash filename="terminal"
vercel kms update iss_example --scope my-team --name billing-tokens
vercel kms update iss_example --scope my-team --claims-schema '{"type":"object"}'
vercel kms update iss_example --scope my-team --remove-claims-schema
```

*Change an issuer's name or claims validation.*

`--claims-schema` also accepts `@<file>` or `@-`. Use either `--claims-schema` or `--remove-claims-schema`, not both. Removing the schema stops validating token claims against it. Add `--json` for structured output.

## Rotate signing keys

Use `add-key <issuerId>` to generate a replacement key or `import-key <issuerId> --key <FILE>` to supply one for an imported issuer:

```bash filename="terminal"
vercel kms add-key iss_example --scope my-team --activation manual
vercel kms activate-key iss_example key_example --scope my-team --revoke-previous-after-hours 24
```

*Stage a key, then activate it with a 24-hour grace period for the previous key.*

| Option | Commands | Description |
| --- | --- | --- |
| `--activation <MODE>` | `add-key`, `import-key` | `automatic` (default) or `manual`. Automatic activation waits for the public key to propagate. Manual activation leaves the key pending until you run `activate-key`. |
| `--revoke-previous-after-hours <HOURS>` | `add-key`, `import-key`, `activate-key` | Nonnegative number of hours the previous key keeps verifying after activation. Defaults to one hour; `0` retires the previous key immediately at activation. |
| `--key <FILE>` | `import-key` | Required PEM private key file, or `-` for stdin. |
| `--key-id <KID>` | `import-key` | The imported key's JWKS `kid`. Defaults to a server-generated value. |
| `--json` | `add-key`, `import-key`, `activate-key` | Return structured output. |

Use the `keyId` from the staged key's output as the second argument to `activate-key`. Choose a grace period at least as long as the lifetime of tokens signed by the previous key. See [Key rotation](/docs/kms/concepts/key-rotation) for propagation and verification behavior.

To end a retiring key's grace period early, run `revoke-key <issuerId> <keyId>`. Only keys already scheduled for revocation qualify; activate a replacement before revoking the previous key. See [Destructive operations](#destructive-operations) for confirmation requirements.

## Manage project grants

A [project grant](/docs/kms/concepts/project-grants) lets a project's deployments sign with an issuer in the environments you select:

```bash filename="terminal"
vercel kms add-grant iss_example --scope my-team --project prj_example --environment production --environment preview
vercel kms update-grant iss_example prj_example --scope my-team --environment production
```

*Grant signing access in Production and Preview, then restrict the grant to Production.*

| Option | Commands | Description |
| --- | --- | --- |
| `--project <NAME_OR_ID>` (`-p`) | `add-grant` | Project name or ID. Defaults to the linked project. `update-grant` takes the project ID as its second positional argument. |
| `--environment <ENVIRONMENT>` (`-e`) | `add-grant`, `update-grant` | Repeat for each environment. Accepts `production`, `preview`, `development`, or a custom environment ID such as `env_example`. Use IDs, not names, for custom environments. |
| `--token-claims <JSON>` | `add-grant`, `update-grant` | Claims to include in signed tokens. Accepts a JSON object inline, through `@<file>`, or through `@-` for stdin. |
| `--remove-token-claims` | `update-grant` | Remove the grant's token claims. Conflicts with `--token-claims`. |
| `--json` | `add-grant`, `update-grant` | Return structured output. |

`add-grant` requires at least one environment. On `update-grant`, the environments you pass replace the previous selection; omitted fields stay unchanged. Provide at least one change.

```bash filename="terminal"
vercel kms update-grant iss_example prj_example --scope my-team --token-claims '{"aud":"https://example.com"}'
vercel kms update-grant iss_example prj_example --scope my-team --remove-token-claims
```

*Set or remove claims supplied by a project grant.*

## Destructive operations

These commands ask for confirmation. Pass `--yes` (`-y`) to confirm without a prompt; non-interactive mode requires it:

| Command | Effect |
| --- | --- |
| `delete <issuerId>` | Delete the issuer and all its signing keys. |
| `revoke-key <issuerId> <keyId>` | End a retiring key's grace period and remove its public key from the issuer's JWKS. |
| `remove-grant <issuerId> <projectId>` | Stop the project from signing new tokens with the issuer. |

Relying parties may retain cached public keys until they refresh the issuer's JWKS. See [Key rotation](/docs/kms/concepts/key-rotation) for how published keys control verification.

```bash filename="terminal"
vercel kms remove-grant iss_example prj_example --scope my-team --yes
```

*Remove a project's signing access without an interactive prompt.*

`delete` also accepts `rm` and `del`. The older `remove`, `rm-grant`, and `delete-grant` forms are deprecated. Use the command names above in new scripts.

## Output for scripts and agents

Use `--json` on listing, inspection, creation, import, update, key activation, and grant creation or update commands. These commands also accept `--format=json`.

Non-interactive mode returns structured JSON on stdout, including a `status`, a `message`, and suggested `next` commands. Results include `issuers` and `pagination` for a listing, `issuer` for inspection and issuer changes, `signingKey` for key creation or activation, and `grant` for grant creation or updates. For example, to extract issuer IDs with [jq](https://jqlang.org/):

```bash filename="terminal"
vercel kms list --scope my-team --non-interactive | jq -r '.issuers[].id'
```

*Extract issuer IDs from a non-interactive listing.*

`delete`, `revoke-key`, and `remove-grant` use `--non-interactive --yes` for structured output. They don't expose a `--json` option.

## Global Options

The following [global options](/docs/cli/global-options) can be passed when using the `vercel kms` command:

- [`--cwd`](/docs/cli/global-options#current-working-directory)
- [`--debug`](/docs/cli/global-options#debug)
- [`--global-config`](/docs/cli/global-options#global-config)
- [`--help`](/docs/cli/global-options#help)
- [`--local-config`](/docs/cli/global-options#local-config)
- [`--no-color`](/docs/cli/global-options#no-color)
- [`--non-interactive`](/docs/cli/global-options#non-interactive)
- [`--scope`](/docs/cli/global-options#scope)
- [`--token`](/docs/cli/global-options#token)
- [`--version`](/docs/cli/global-options#version)

For more information on global options and their usage, refer to the [options section](/docs/cli/global-options).


---

[View full sitemap](/docs/sitemap)


If you encounter incorrect information, can’t find what you need, need a capability Vercel doesn’t currently offer, or have any other feedback to report, please do it by following the instructions at https://vercel.com/feedback.md.
