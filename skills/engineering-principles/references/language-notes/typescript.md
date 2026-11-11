# TypeScript and JavaScript

## Tooling and settings

- **`tsconfig.json` in strict mode.** `"strict": true` at minimum. `noUncheckedIndexedAccess` (indexing returns `T | undefined`), `exactOptionalPropertyTypes`, `noImplicitOverride` and `noFallthroughCasesInSwitch` catch more. Loosening any of these in a PR needs a reason.
- **ESLint with typescript-eslint's type-checked configs** (`recommended-type-checked` or `strict-type-checked`), or Biome. The rules that matter most in review: `no-floating-promises`, `no-misused-promises`, `no-explicit-any`, `switch-exhaustiveness-check`, `no-unnecessary-condition` and `consistent-type-imports`. React projects add `eslint-plugin-react-hooks` and `eslint-plugin-jsx-a11y`.
- **Prettier or Biome** for formatting, so style never reaches review.
- **Vitest or Jest** for unit and integration tests, React Testing Library for components, Playwright for end to end.
- **Node version** pinned (`.nvmrc` or `.node-version`, and `engines` in `package.json`), matching CI and the container image.

## Packages: npm, pnpm and Bun

- **The npm registry** is the public package index for JavaScript and TypeScript, used by all three tools. As with PyPI, anyone can publish, and package names can be typosquatted.
- **`package.json`** lists `dependencies` (shipped with the app), `devDependencies` (build, test and lint only) and sometimes `peerDependencies` (a library expects the host app to provide them, such as `react`). Version ranges use semver: `^1.2.3` allows minor and patch updates, `~1.2.3` patch only.
- **The lockfile** pins every installed version, transitive ones included: `package-lock.json` (npm), `pnpm-lock.yaml` (pnpm), `bun.lock` (Bun; older projects have the binary `bun.lockb`). Exactly one package manager and one lockfile per project; a PR that adds a second lockfile is a finding. The `packageManager` field in `package.json` records which tool and version the project uses.
- **npm** is bundled with Node and installs a flat `node_modules`. `npm ci` installs exactly what the lockfile says and fails if it doesn't match `package.json`.
- **pnpm** stores packages once in a content-addressed store and links them into each project. Its strict `node_modules` layout means code can only import what it declares, which surfaces missing dependencies early. Workspaces (`pnpm-workspace.yaml`) handle monorepos; `pnpm install --frozen-lockfile` is the CI install.
- **Bun** is a runtime and toolkit with a fast npm-compatible package manager. `bun install --frozen-lockfile` is the CI install. Check that the code actually runs on the runtime it will be deployed on: Node and Bun differ in places.
- **Install scripts.** Packages can run `preinstall` and `postinstall` scripts, which is arbitrary code on install. npm runs dependencies' scripts by default. pnpm (version 10 and later) doesn't run them unless the package is allowed: `onlyBuiltDependencies`, or `allowBuilds` in `pnpm-workspace.yaml` on newer versions (pnpm 11 uses it). Bun runs them only for trusted packages, but when a project sets no `trustedDependencies` it trusts a built-in default list of popular packages, so adding one of those can bring install-time code with no config change. Use `--ignore-scripts` (npm, pnpm, Bun) for an install that must not run any. A PR that allows a new package to run install scripts gets a closer look.
- **`package.json` scripts** (`build`, `test`, `lint`, `dev`) are the project's task runner; new scripts are reviewed like shell scripts.

In review:

- A `package.json` change comes with the matching lockfile change, made by the project's package manager, and the lock diff contains only what the change implies.
- New packages are in the right section: build and test tools in `devDependencies`, never shipped to production.
- CI and Dockerfiles install from the lockfile (`npm ci`, `pnpm install --frozen-lockfile`, `bun install --frozen-lockfile`).
- In monorepos, internal packages use the workspace protocol (`workspace:*`) and versions of shared dependencies don't diverge between packages without a reason.
- New dependencies get the dependencies playbook.

## How the principles show up

- **Parse, don't validate.** Data from outside (request bodies, `JSON.parse`, `fetch` responses, `process.env`, `localStorage`) is typed `unknown` until a schema parses it (`UserSchema.parse(data)`, with the type from `z.infer`). `JSON.parse(text) as User` is a finding: the cast is a promise the compiler can't check.
- **Make illegal states unrepresentable.** Discriminated unions instead of a bag of optional fields and booleans; an exhaustive `switch` whose `default` assigns to `never`, so adding a variant breaks the build until it's handled.
- **Explicit over implicit.** No `any`; use `unknown` and narrow. No non-null assertions (`value!`) to silence the compiler. `// @ts-expect-error` with a reason instead of `// @ts-ignore`, so it fails when the error goes away.
- **Fail fast.** No floating promises: every promise is awaited, returned, or explicitly handled. Errors in `catch` are `unknown` and narrowed before use; wrapped errors keep the original (`new Error(msg, { cause: err })`). No empty `catch` blocks.
- **Consumer-owned interfaces.** TypeScript is structural: any object with the right shape satisfies an interface, with or without `implements`. Declare the interface where it's used, narrow to what that code needs.
- **Encapsulation.** `private` is compile-time only; `#private` fields are private at runtime. `readonly`, `ReadonlyArray` and `as const` stop accidental mutation.
- **Distinct ids.** Branded types (`type UserId = string & { readonly __brand: "UserId" }`) keep a `UserId` from being passed where an `OrderId` is expected.
- **Composition over inheritance.** Same as anywhere: functions and modules first, small classes when there's state with invariants, deep class hierarchies rarely.

## Idioms

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `any` | `unknown` and narrowing, or the precise type | `any` switches off checking for everything it touches |
| `JSON.parse(x) as User` | `UserSchema.parse(JSON.parse(x))` | The cast is unchecked; the schema checks at runtime |
| `enum Status { ... }` | `type Status = "active" \| "suspended"` or an `as const` object | Unions erase cleanly and need no runtime code |
| `obj!.field` | Narrow first, or handle `undefined` explicitly | `!` hides the bug it should report |
| `{ isLoading, isError, data? }` | `{ status: "loading" } \| { status: "error"; error } \| { status: "ok"; data }` | Contradictory states become impossible |
| `==` | `===` | No coercion surprises |
| `items.forEach(async (x) => ...)` | `for (const x of items) await ...`, or `await Promise.all(items.map(...))` | `forEach` doesn't wait; errors are lost |
| `for (const i in array)` | `for (const x of array)` or array methods | `for...in` iterates keys as strings, including inherited ones |
| `x as unknown as T` | Fix the types | A double cast is a type error being hidden |
| A class with only static methods | A module of functions | Modules are already namespaces |
| `new Promise` wrapping a function that already returns a promise | `await` it directly | Extra wrapper, lost errors |
| `process.env.API_KEY!` scattered through code | One module that parses `process.env` with a schema at startup | Missing configuration fails at boot, not mid-request |
| Barrel files re-exporting whole folders | Import from the module that defines the thing | Barrels slow builds, defeat tree-shaking and hide cycles |

## TypeScript-specific smells

- **Floating promises** and `async` callbacks passed where nothing awaits them (event handlers, `forEach`, `setTimeout`).
- **Types that lie.** Casts on external data, `as` to make an error go away, and generics that default to `any`.
- **Optional everything.** Props or types where every field is optional, so no caller is ever wrong and no consumer can rely on anything.
- **Duplicated types** for the same shape on the server and client, instead of one schema both sides import.
- **Mixing module systems.** CommonJS `require` and ESM `import` in the same package, or `"type"` in `package.json` that doesn't match the build output.
- **Mutating arguments** passed in by callers, including arrays sorted in place with `.sort()` (use `.toSorted()` where the runtime supports it, or copy first).
- **Dates handled by hand.** Timestamps stored as local-time strings, or month arithmetic on `Date`. Store instants as UTC ISO 8601 and use a date library for calendar math.

