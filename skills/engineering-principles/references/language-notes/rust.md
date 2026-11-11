# Rust

## Tooling and settings

- **rustfmt** formats; CI runs `cargo fmt --check`.
- **Clippy** lints; CI runs `cargo clippy --all-targets --all-features -- -D warnings`. Configure it in the `[lints]` tables of `Cargo.toml` (respected since Cargo 1.74) so the settings travel with the repo. In a workspace, put them in `[workspace.lints]` and opt each member in with `lints.workspace = true`. Turn on extra lints one at a time and justify each (`clippy::unwrap_used` and `clippy::expect_used` outside tests, `clippy::undocumented_unsafe_blocks`, `clippy::dbg_macro`, `clippy::todo`, `clippy::enum_glob_use`; most of these are in the opt-in restriction group). Don't deny all of `clippy::pedantic` wholesale. Set `unsafe_code = "forbid"` under `[lints.rust]` unless the crate needs unsafe.
- **The compiler is the type checker.** The borrow checker, exhaustiveness checks and `#[must_use]` do work that other languages need a separate tool for. `cargo check` is the fast loop.
- **Tests** run with `cargo test`, or `cargo nextest run` for speed and per-test isolation. nextest does not run doctests, so CI adds `cargo test --doc`. Run `cargo miri test` over code that uses `unsafe`.
- **Toolchain** pinned in `rust-toolchain.toml`, with `rust-version` (the minimum supported Rust version) in `Cargo.toml` and the same version in CI and the container image. New crates use edition 2024 (Rust 1.85 and later).

## Packages: Cargo and crates.io

- **crates.io** is the public registry. Anyone can publish to it, so a crate name is not a guarantee of who wrote it.
- **`Cargo.toml`** declares dependencies as version requirements (a bare `1.2` means `^1.2`). **`Cargo.lock`** pins the exact version of everything. Applications commit it. A library's lockfile pins CI and contributors, but downstream users resolve their own.
- **`--locked`** makes `cargo build` and `cargo test` fail when the lockfile is out of date instead of silently updating it, and makes `cargo install` use the crate's own `Cargo.lock`. CI and Dockerfiles use it.
- **Features** are additive: enabling one must never remove behavior. Use `default-features = false` and name the features you need, so a dependency doesn't pull in more than you use.
- **Build scripts (`build.rs`) and procedural macros** run arbitrary code on your machine at build time, like a Python sdist. A new dependency that has either gets a closer look.
- **cargo-deny** (`cargo deny check`) covers advisories, licenses, banned crates and allowed sources; `cargo audit` checks advisories only.

In review:

- A change to `Cargo.toml` comes with the matching `Cargo.lock` change, and the lock diff holds only what the change implies.
- New crates go in the right table: `[dev-dependencies]` for test tools, `[build-dependencies]` for `build.rs`.
- Requirements are sensible: no `*`, and no `=` pins in a library without a reason.
- New dependencies get the dependencies playbook.

## How the principles show up

- **Parse, don't validate.** Data from outside deserializes with serde into types whose fields are private and whose constructor checks them (`TryFrom`, `FromStr`, or `#[serde(try_from = "String")]`). `#[serde(deny_unknown_fields)]` on boundary types catches misspelled keys. Everything past the boundary takes the checked type.
- **Make illegal states unrepresentable.** Enums carry the data that belongs to each variant, instead of a `bool` plus `Option` fields that must agree. Match on enums you own without a `_` arm, so adding a variant breaks the build until it's handled. Public library enums that will grow get `#[non_exhaustive]`.
- **Explicit over implicit.** No `unwrap()` or `expect()` on data that can fail at runtime. `expect("reason")` is fine for a true invariant, and the message names it. Lossy `as` casts become `try_from` or `From`. Slices and indexes on untrusted input use `get`.
- **Fail fast.** Return `Result` and propagate with `?`. Libraries expose typed errors (`thiserror`); applications collect them at the top (`anyhow`, with `.context()` so the message says what was being attempted). Panic only for bugs, never for bad input.
- **Consumer-owned interfaces.** Define the trait where it's used, narrowed to what that code calls. Use generics when the caller picks the type and `dyn Trait` when one collection holds several.
- **Encapsulation.** Fields are private by default and `pub(crate)` beats `pub`. Ownership is part of the interface: take `&T` or `&mut T` unless the function needs to keep the value.
- **Distinct ids.** A newtype (`struct UserId(Uuid);`) costs nothing at runtime and stops a `UserId` going where an `OrderId` is expected.
- **Composition over inheritance.** Rust has no inheritance. Small structs plus traits cover the same ground, and `impl Trait` hides the concrete type.
- **Concurrency.** Don't hold a `std::sync::Mutex` guard across an `.await`. Run blocking work from async code with `spawn_blocking`. Prefer passing messages over sharing state, and keep a `JoinHandle` for every spawned task whose failure matters.

## Idioms

Idioms reduce astonishment because they are what a Rust reader expects to see. Flag code that compiles but fights the language:

| Non-idiomatic | Idiomatic | Why it matters |
| --- | --- | --- |
| `for i in 0..v.len() { use(v[i]) }` | `for x in &v`, with `iter().enumerate()` or `zip` when you need an index or a pairing | Avoids most bounds checks and off-by-one mistakes |
| `if x.is_some() { x.unwrap() }` | `if let Some(v) = x`, or `let Some(v) = x else { return ... };` | One check instead of two, and no panic path |
| `fn f(s: &String)`, `fn f(v: &Vec<T>)` | `fn f(s: &str)`, `fn f(v: &[T])` | Accepts more callers at no cost |
| `.clone()` to quiet the borrow checker | Restructure the borrows, or clone on purpose with a reason | A clone hides a design problem and costs an allocation |
| `Result<T, String>` | A typed error enum | Callers can match on the cause |
| `match opt { Some(v) => Some(g(v)), None => None }` | `opt.map(g)`, `ok_or`, `?` | Says the intent in one call |
| `let mut out = Vec::new(); for x in xs { out.push(f(x)); }` | `xs.iter().map(f).collect()` | Shorter; use the loop when the body is more than one step |
| `n as u8` | `u8::try_from(n)?` | `as` truncates silently |
| `v[i]` on untrusted input | `v.get(i)` | Out of range becomes `None` instead of a panic |
| `#[allow(clippy::x)]` | `#[expect(clippy::x, reason = "...")]` | Fails when the lint stops firing, so stale suppressions get removed |

## Rust-specific smells

- **`unwrap()`, `expect()`, indexing or slicing on runtime data** in non-test code. A panic is a crash in production.
- **`.clone()` scattered to satisfy the borrow checker**, or `Rc<RefCell<_>>` and `Arc<Mutex<_>>` as the default shape rather than a decision. Reconsider who owns the data first.
- **`unsafe` without a `// SAFETY:` comment** stating the invariant it relies on, or an `unsafe` block wider than the one operation that needs it. Clippy's `undocumented_unsafe_blocks` enforces the comment once enabled.
- **A lock guard held across `.await`,** or blocking calls (`std::fs`, `std::thread::sleep`, a sync database driver) inside an `async fn`. Both stall the runtime.
- **Swallowed results.** `let _ = fallible();` and dropped `JoinHandle`s turn failures into silence.
- **Stringly-typed errors,** or `Box<dyn Error>` in a library's public API, where callers can't match on the cause.
- **`#[allow]` without a reason,** and blanket `#![allow(warnings)]` at a crate root.
- **Glob imports** (`use foo::*`) outside preludes and test modules, and everything marked `pub`.
- **Premature generics and trait objects.** A trait with one implementation, or lifetime parameters spread through a type that would be simpler if it owned its data.
- **Dependencies pulled with default features** when one feature is needed.
