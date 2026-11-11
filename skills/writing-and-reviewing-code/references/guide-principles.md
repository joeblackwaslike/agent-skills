# Part 1: Code Review Guide

> Snapshot of [Code-Review-Guide-and-Playbooks.md](https://github.com/joeblackwaslike/ai-review-bot/blob/main/docs/Code-Review-Guide-and-Playbooks.md) in ai-review-bot, copied verbatim on 2026-11-07 (last source commit 6ea9ab3). Edit the source, not this copy.
>
> The guide is written for reviewing code, but every principle also says how to apply it when writing code. Use it in both directions: write to it, then read your own diff against it.


Nov 4, 2026 · @Joe Black

Code review is a small set of principles applied to someone else's change. The guide states the principles once. Sections 1 to 4 each take one group and turn it into what to look for in any diff, what a violation looks like, and what to suggest instead. The principles are language-neutral; the examples are mostly Python, with TypeScript alongside where the two differ. Section 5 points to Part 2, with playbooks for specific kinds of change such as an endpoint, a React component, a migration, a Dockerfile or a skill file. Part 3 covers Python, TypeScript, shell and SQL: tooling, package management, idioms and smells. The checklist at the end condenses all of it.

The review process follows the same rules as the code it checks: confirm the change is what was asked for and as small as it can be, get the design right before the details, and hand anything a rule can state to a tool.

## Principles

The principles fall into four groups. Each one says what it means and how to apply it, both when writing code and when reviewing it.

### Simplicity and scope

**KISS (Keep It Simple, Stupid)**

- **Means:** Minimize moving parts: few concepts, few indirections, and behavior you can predict from reading one place.
- **Apply:** Pick the plain solution first. A 40-line function with one clear path beats a 10-line one that leans on metaclasses or a registry. In review, ask "what's the dumbest thing that would work?" and flag layers, factories, or config that exist only to serve one caller.

**YAGNI (You Ain't Gonna Need It)**

- **Means:** Don't build for requirements you don't have yet.
- **Apply:** No plugin system, extra parameters, or abstract base class "in case." Build it when the second real need shows up. In review, flag speculative hooks, unused flags, and generalization with no current caller, and delete them.

**How they differ:** KISS limits the *complexity of what you build*. YAGNI limits *what you build at all*. Together they point at the same review question: what's the smallest change that solves the problem in front of us?

**DRY (Don't Repeat Yourself)**

- **Means:** Every piece of *knowledge* (a rule, a constant, a schema) has one authoritative home.
- **Apply:** Dedupe business rules, not code that merely looks alike. Two functions that coincidentally match today but change for different reasons are not duplication. In review, flag the same validation or business rule encoded in two places. Don't flag a repeated literal that already explains itself; see section 1, Simplicity and scope.

**Rule of Three (a.k.a. AHA: Avoid Hasty Abstractions)**

- **Means:** Tolerate duplication until the third occurrence, then abstract.
- **Apply:** Two data points can't tell you the right abstraction shape. In review, push back on a shared helper with a pile of boolean flags. That's a wrong abstraction fitted to two cases.

**Premature optimization is the root of all evil (Knuth)**

- **Means:** Don't optimize without a measurement showing where the time goes.
- **Apply:** Write the clear version, profile, then fix the hot path. In review, ask "where's the benchmark?" for any change justified by performance.

**Make it work, make it right, make it fast (Kent Beck)**

- **Means:** The order matters. Correct behavior, then clean structure, then speed.
- **Apply:** Don't refactor before a test proves behavior. Don't tune before the structure is stable.

**Gall's Law**

- **Means:** Working complex systems evolve from working simple ones. Complex systems built from scratch don't work.
- **Apply:** Ship the thin vertical slice first. Be suspicious of designs that need five services before the first request succeeds.

### Design and structure

**SOLID** (five principles, one line each; the design and structure section applies each one in review)

- **SRP (Single Responsibility):** A module has one reason to change. Split a handler that validates, persists, and sends email.
- **OCP (Open/Closed):** Extend behavior without editing existing code. Add a new strategy or handler instead of another `elif`.
- **LSP (Liskov Substitution):** Subtypes must be usable wherever the base type is. A subclass that raises on an inherited method is a violation.
- **ISP (Interface Segregation):** Don't force consumers to depend on methods they don't use. In Python, small `Protocol`s over one fat interface.
- **DIP (Dependency Inversion):** High-level policy depends on abstractions, not concrete details. Inject the repository protocol; don't import the SQLAlchemy session in domain code.

**Separation of Concerns**

- **Means:** Each part of the system addresses one distinct concern (transport, domain logic, persistence).
- **Apply:** No SQL in route handlers, no HTTP types in domain services. In review, flag layer-crossing imports.

**High Cohesion, Low Coupling**

- **Means:** Things that change together live together. Things that don't shouldn't know about each other.
- **Apply:** If a change to one feature touches six modules, coupling is too high. If a module's contents have nothing in common, cohesion is too low.

**Law of Demeter (Principle of Least Knowledge)**

- **Means:** Talk to your direct collaborators, not their internals.
- **Apply:** `order.customer.address.city` chains mean the caller knows too much. Expose `order.shipping_city` or pass what's needed.

**Tell, Don't Ask**

- **Means:** Tell objects what to do instead of pulling their state out and deciding for them.
- **Apply:** Replace `if account.balance >= amt: account.balance -= amt` in the caller with `account.withdraw(amt)`, where the invariant lives.

**Composition over Inheritance**

- **Means:** Assemble behavior from small collaborators instead of deep class hierarchies.
- **Apply:** Reach for injected dependencies or `Protocol`s before a base class. Be wary of any inheritance chain deeper than two.

**Command-Query Separation (CQS)**

- **Means:** A method either changes state or returns data, not both.
- **Apply:** It's the seed of CQRS. In review, flag `get_*` functions with side effects.

### Correctness and safety

**Fail Fast**

- **Means:** Surface errors at the earliest point, close to the cause.
- **Apply:** Validate at boundaries, raise on invalid state, and don't swallow exceptions or return `None` to defer the problem. In review, flag bare `except` and silent fallbacks.

**Parse, Don't Validate / Make Illegal States Unrepresentable**

- **Means:** Convert untrusted input into a type that can only hold valid values, instead of re-checking raw data everywhere.
- **Apply:** Pydantic models at the edge, `Literal`, enums and `NewType`s inside. A `status: str` that can only be three values should be a `StrEnum`.

**Principle of Least Privilege**

- **Means:** Give code, services, and credentials only the access they need.
- **Apply:** Scoped API tokens, read-only DB roles for query paths, and no god-object `Context` passed everywhere.

**Explicit is better than implicit (Zen of Python)**

- **Means:** Behavior should be visible at the call site, not hidden in magic.
- **Apply:** Prefer explicit dependency injection over global registries, and avoid import-time side effects and monkey-patching.

### Readability and review

**Principle of Least Astonishment (POLA)**

- **Means:** Code should behave the way a reader expects from its name and shape.
- **Apply:** A function named `get_user` shouldn't create one. In review, a surprised reviewer is a finding.

**Boy Scout Rule**

- **Means:** Leave the code a bit cleaner than you found it.
- **Apply:** Small adjacent cleanups are fine. Keep them in separate commits from behavior changes so review stays legible.

**Chesterton's Fence**

- **Means:** Don't remove something until you know why it was put there.
- **Apply:** Before deleting a weird guard or "pointless" retry, check `git blame` and the linked issue. This is the counterweight to over-eager simplification.

**Hyrum's Law**

- **Means:** With enough users, every observable behavior of your API becomes something someone depends on.
- **Apply:** Treat output ordering, error message text, and timing as part of the contract once they're public. In review, flag "harmless" behavior changes to widely used interfaces.

**Conway's Law**

- **Means:** System structure mirrors the communication structure of the organization that built it.
- **Apply:** If service boundaries don't match team boundaries, expect friction. Use it deliberately when drawing bounded contexts.

## How to run a review

A review is a small system of its own, and the principles apply to it directly. Gall's Law says to size the change before reading it. Beck's order says what to look at first. Explicit is better than implicit says the mechanical rules belong in tooling, not in a reviewer's head.

### Size the change before reading it

Gall's Law holds for pull requests as much as for systems: a working change grows out of a smaller working change, and a large one built in a single step can't be reviewed or bisected. Before opening the diff:

- **Restate the intent in one sentence.** Read the linked spec, plan or ticket first, so you know what was meant before seeing what was built. If there's no stated intent, the first comment is a question, not a note on line 40.
- **Let CI go first.** Tests, linters and type checks pass before a person spends time on the diff. A red build is the author's to fix, not the reviewer's to read around.
- **Check the size.** Past a few hundred changed lines, review quality drops sharply. Ask for a split along a seam: refactor vs. behavior change, schema vs. code, new module vs. call-site migration.
- **Separate mechanical edits.** The Boy Scout Rule is welcome, but renames, moves and formatting go in their own commits so the behavior change stays legible.
- **Read the tests first.** They are the author's statement of what "it works" means, and they tell you what the code is supposed to promise.
- **List the new public surface.** Names, endpoints, config keys, migrations, events, error messages. By Hyrum's Law each becomes a contract the moment it ships, so these get the closest look.
- **Pick the playbooks.** Note which kinds of change the diff contains (an endpoint, a migration, a config file) and use the matching playbooks in section 5 alongside the general pass.

### Review in the order of make it work, make it right, make it fast

Beck's order for writing code is also the order for reviewing it, weighted by how expensive each kind of problem is to fix after merge:

1. **Scope.** Is this the smallest change that solves the problem? (Simplicity and scope.)
2. **Design.** Are the boundaries, models and contracts right? This is the hardest thing to change later. (Design and structure.)
3. **Correctness.** Does it work, including on failure paths? (Correctness and safety.)
4. **Readability.** Can the next person understand and change it? (Readability and review.)
5. **Speed.** Only with a measurement in hand.

If scope or design is wrong, stop and say so before leaving line-level comments. Detailed feedback on code that is about to be restructured wastes both people's time. A large change can be reviewed in two rounds: scope and design first, then everything else once those are settled.

### Review locally, not only in the browser

The web diff shows changed lines and a few lines of context, and that often isn't the whole story. A diff that removes five lines doesn't show what called them, what they protected, or what else depends on them. Checking the branch out lets you read the change as code, with navigation, search and the test suite.

**Checking out a PR in VS Code**

With the [GitHub Pull Requests extension](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) ([docs](https://code.visualstudio.com/docs/sourcecontrol/github)):

1. Commit or stash your own work. Open the **Pull Requests** view and select the PR to open its **Description**.
2. Select **Checkout**. The extension switches to the PR's branch and enters review mode. **Changes in Pull Request** lists the changed files and commits.
3. Select a file there to see its diff and comment on lines, or use **Open File** to open the working copy with full language support.
4. Install the branch's dependencies (`uv sync`), or pnpm install, npm ci or bun install in Node projects, so navigation and tests reflect the PR, not your previous branch. Installing runs code from the PR (package install scripts, build hooks), and so do its tests. For a contributor you don't already trust, do this in a disposable, isolated environment (a dev container or VM) with no host credentials, no sensitive mounts and no privileged access, not in your authenticated workspace.
5. Submit comments and your verdict from the **Description**, then select **Exit Review Mode** to return to the branch you were on.

From a terminal, `gh pr checkout <number>` checks out the same branch for any editor.

**Navigating the change**

Shortcuts are for macOS; on Windows and Linux, Ctrl replaces Cmd. Function keys may need `fn`.

| Action | Shortcut | Use it to |
| --- | --- | --- |
| Go to Definition | Cmd+click, or F12 | Jump from a call to the code it runs |
| Open Definition to the Side | Cmd+Option+click | Read caller and callee side by side |
| Peek Definition | Option+F12 | Check a definition inline without losing your place |
| Go to Implementation | Cmd+F12 | Find the concrete classes behind a `Protocol` or ABC |
| Go to References | Shift+F12 | See every caller of a changed or removed symbol |
| Show Call Hierarchy | Shift+Option+H | Trace callers transitively, up to the entry points |
| Go to Symbol in File / in Workspace | Cmd+Shift+O / Cmd+T | Jump to a class or function by name |
| Search across files | Cmd+Shift+F | Find strings references can't: event names, config keys, SQL, templates |
| Go Back / Go Forward | Ctrl+- / Ctrl+Shift+- | Return after following a chain of definitions |

**Example: five lines removed**

The browser shows this, with a PR description that says "simplify charge":

```diff
     def charge(self, invoice: Invoice) -> Payment:
-        if invoice.status is InvoiceStatus.PAID:
-            raise InvoiceAlreadyPaid(invoice.id)
-        if invoice.total.amount_minor <= 0:
-            log.info("zero_invoice_skipped", invoice_id=invoice.id)
-            return Payment.skipped(invoice.id)
         return self._gateway.charge(invoice.customer.payment_method, invoice.total)
```

Checked out locally, the questions the diff can't answer take a minute each:

1. **Was the guard moved or dropped?** Search the branch for `InvoiceAlreadyPaid` (Cmd+Shift+F). If nothing raises it anymore, find what used to catch it; that handler is now dead code.
2. **Who relied on it?** Go to References on `charge` (Shift+F12). A retrying job that calls `charge` twice for one invoice would now charge the customer twice.
3. **What happens to zero amounts now?** Cmd+click `self._gateway.charge` through to the gateway client. If the provider rejects zero, a skip has become an error.
4. **What's left orphaned?** Go to References on `Payment.skipped`. If this was its only caller, the PR should delete it; if not, other callers still expect skips to exist.
5. **Why was it there?** Chesterton's Fence: open the file's Timeline or Git blame for the removed lines to find the commit and issue that added them.
6. **Is it tested?** Run the billing tests (`uv run pytest tests/billing`). If they still pass, the removed behavior was never tested. The comment is a `blocker`: restore the guards, or show where they now live and add a test for double payment.

**Run things, don't just read them.** Run the tests for the packages the PR touches. Start the app and call the new endpoint. Run the migration's upgrade and downgrade against a local database. Reproduce the bug the PR claims to fix, before and after. When a question is quicker to answer by trying than by asking, try it, and put what you found in the comment.

### Hand the mechanical rules to tools

A rule a linter can state is better made explicit in configuration than enforced by whoever happens to review. Linters, type checkers and formatters apply the standard the same way to everyone, and free human attention for design. If reviewers keep commenting on something a tool could catch, the config is the bug.

| Principle | What the tool catches | Python | TypeScript | Shell |
| --- | --- | --- | --- | --- |
| KISS | Functions that are too complex | Ruff `C901` | ESLint `complexity` | Keep scripts short |
| KISS | Too many branches, statements or nesting | `PLR0912`, `PLR0915` | `max-depth`, `max-statements` | n/a |
| Separation of concerns (a missing model) | Too many parameters | `PLR0913` | `max-params` | n/a |
| Least astonishment | Boolean positional parameters | `FBT001`, `FBT002` | Review by hand | n/a |
| Least astonishment | Mutable default arguments | `B006` | n/a | n/a |
| Fail fast | Swallowed errors and unhandled async failures | `E722`, `BLE001` | `no-empty`, `@typescript-eslint/no-floating-promises` | ShellCheck, `set -euo pipefail` |
| Law of Demeter | Reaching into another object's private members | `SLF001` | `private` and `#private`, enforced by `tsc` | n/a |
| Explicit over implicit | Missing or loose types | `ANN`, `mypy --strict` | `tsc --strict`, `@typescript-eslint/no-explicit-any` | n/a |
| Explicit over implicit | Unquoted expansions | n/a | n/a | ShellCheck `SC2086` |
| Idiomatic code | Non-idiomatic constructs and outdated syntax | `SIM`, `PERF`, `C4`, `PTH`, `UP` | typescript-eslint `strict-type-checked` | ShellCheck |
| Formatting | Layout and style | `ruff format` | Prettier or Biome | `shfmt` |

Leave magic-number rules (`PLR2004`, ESLint `no-magic-numbers`) off or loosely configured. They push self-explanatory literals into constants, which the next section treats as an anti-pattern. Each language's full toolchain and recommended settings are in Part 3. Some rules are preview-only or version-specific, so check them against the versions your project pins.

## 1. Simplicity and scope

The first review question is whether the change should be this big. KISS limits how complex the solution is. YAGNI limits whether it should exist at all. DRY and the Rule of Three decide when repetition should become an abstraction. Over-engineering survives review because the author can usually name a principle they were following, most often reuse or DRY, applied past the point where it helps. This section is about catching that.

### What to check

- **Is this the smallest change that solves the problem?** Ask what the dumbest working version would be, and whether each extra file, layer, type or option earns its place.
- **Does every abstraction have a current second user?** An interface with one implementation, a registry with one entry, or an option nobody sets is YAGNI.
- **Can you predict the behavior from one place?** Each indirection a reader must follow is a cost that has to buy something.
- **Is the duplication knowledge or text?** The same business rule in two places should be deduplicated. Similar-looking code that changes for different reasons should be left alone.
- **Is any optimization measured?** For a change justified by speed, ask where the benchmark is.
- **When simplifying, apply Chesterton's Fence.** Removing a strange guard or retry needs a reason, found with `git blame` and the linked issue, before it goes.

### Reuse and DRY taken too far

DRY is about knowledge: a rule that must stay consistent has one home. It is not about removing every repeated sequence of characters. The Rule of Three says to wait for the third real occurrence, because two cases can't show you the right shape of the abstraction. The anti-patterns below all come from ignoring one or both.

#### Scattering cohesive code for "reuse"

A small feature has its pieces spread across the codebase: the model in `models/`, a helper in `utils/`, a constant in `constants.py`, a type in `types.py`, a formatter in `common/`. Each piece is used in one place, plus the tests. Reviewing one method with a couple of collaborators means opening five or six files in distant corners of the repo just to learn the shape of what it calls.

It usually happens because the author wants the helper to be reusable, or needs it in both production code and tests, and assumes that means it must live somewhere shared. It breaks KISS and high cohesion at once: code that changes together should be read together, and scattering it means reviewers can't see the whole unit and maintainers miss pieces when changing it.

Keep closely related objects, functions and constants in the same module as the code that uses them. Tests import from that module directly; being used by a test is not a reason to move something to `utils`. Move code to a shared place only when a second, unrelated caller exists. In review, if understanding one function means opening more files than the diff touches, ask why each piece lives where it does.

#### Premature decomposition

A working 30-line function gets split into eight 4-line private helpers, each called once, often with names that restate their one line. The reasons given are testability or future reuse, before anyone knows whether the function will stay in the codebase at all.

This is premature optimization of structure. The reader now jumps between definitions to follow logic that used to read top to bottom, and every helper is a boundary that may be in the wrong place. Extract a piece when its name clarifies the caller, when it is used twice, or when it has real logic worth testing alone. Test the public function's behavior instead of splitting it so each fragment can be tested. A longer function that reads linearly beats a short one that reads like a table of contents.

#### Constants for self-explanatory literals

A string appears in a couple of places, so it gets assigned to a variable. It then spreads, so the variable becomes `RECTANGLE = "rectangle"` in a constants file, imported everywhere anyone wants to write the word. The imports pile up, and the reader has to resolve a name to see a value anyone could have typed.

This applies DRY to text instead of knowledge. The literal is often the clearest thing to write, especially for dictionary keys and URLs. Use a named constant when the name says something the value doesn't (`MAX_RETRIES = 5`, `SESSION_TTL = timedelta(hours=12)`), when the value is a configuration choice that may change, or when it belongs to a closed set where a typo would fail silently, in which case use an `Enum` or `Literal`.

#### Route constants instead of readable paths

Every API path is defined in `uris.py`, so `@app.post("/v1/users/client/refresh")` becomes `@app.post(V1UsersClientRefresh)`, and every test of that endpoint imports the same symbol.

The literal path is the most readable thing in the file. It tells you at a glance what the view handles, and you can pattern-match it against logs, docs, curl commands and client code. A constant replaces that with a name you must remember and import into every view and test, and the name is just a mangled copy of the path. The usual justification, "if it changes we only edit one place," saves almost nothing: a public route rarely changes, needs a deprecation plan when it does, and a project-wide search and replace handles the edit in seconds. The indirection, meanwhile, costs readability every day.

Write routes, URLs and similar identifiers inline. When code needs to build a URL, use the framework's reverse lookup (`url_for`, `request.url_for`) rather than a parallel constants file. Tests spell out the path, because that is what a client does.

#### Shared helpers that grow mode flags

Two similar call sites get merged into one helper. A third caller needs something slightly different, so the helper gains a flag, then another: `render(obj, compact=False, legacy=False, admin=None)`. The body becomes a set of `if` blocks reading the flags.

This is the wrong abstraction the Rule of Three warns about, fitted to cases that only looked alike. Each flag doubles the paths to test, and callers must know which combinations are valid. Inline the helper back into its callers, let them diverge, and extract again only what they genuinely share.

### Building for needs you don't have

These are YAGNI violations. Each adds code to read, test and keep consistent, built on guesses about the future that are usually wrong. When the real second case arrives, it rarely fits the abstraction built in advance.

- **Speculative generality.** A plugin registry with one plugin, a `BaseNotifier` ABC with only `EmailNotifier`, hooks and factories added "in case we swap it later." Write the concrete thing. A `Protocol` can be added later without touching callers.
- **Layers that only forward calls.** Controller to service to manager to repository, each passing the same arguments through. A layer earns its place by owning something: a transaction boundary, an authorization rule, a translation between models, a domain invariant. Simple CRUD can go straight from route to repository; keep command and query handlers for operations with real logic.
- **A framework built for one use.** A generic pipeline engine, a homegrown DI container or a YAML DSL serving a single feature. Use the standard library or an established dependency, or write the plain code, and revisit when three features share the shape.
- **Configuration for everything.** Every value is an environment variable, including ones that never differ between environments. Configuration has no tests or types, and each setting multiplies the states the system can be in. Make something configurable only when it actually varies between deployments.
- **The golden hammer.** Every problem gets the familiar tool: everything is a microservice, an event, a Redis key, a CQRS command. Ask what the simplest thing that fits this case would be.

## 2. Design and structure

After scope, design is the most expensive thing to get wrong, because it is the hardest to change once other code depends on it. The design principles all ask the same question from different angles: does each piece have one job, know as little as possible about the others, and offer a contract that a second implementation could satisfy? When new objects, classes or hierarchies appear, review the shape of the model before the code inside it.

### Separation of concerns and the domain model

Each part of the system handles one concern: transport, domain logic, or persistence. Within the domain, the types should come from the problem being solved, not from the database schema or the wire format. A model that mirrors tables leaks storage concerns into every caller.

- **Layer-crossing imports.** SQL or ORM sessions in route handlers, HTTP request types in domain services, settings imported directly by domain code.
- **Construction.** An object is valid as soon as `__init__` returns, with no separate `init()` or `connect()` step. `__init__` does no I/O. Alternate ways to build go in classmethods (`from_row`, `from_env`). Collaborators are passed in, not built inside, because collaborators built internally are hidden dependencies. Lifecycles of connections, sessions and file handles are expressed with context managers, not convention.
- **A missing model.** The most common design finding. Signs:
  - The same three or four parameters travel together through several functions.
  - A `dict` or tuple with an agreed set of keys or positions.
  - A `str` or `int` that carries meaning (`status: str`, or `amount: int` with its currency held somewhere else).
  - The same validation repeated at several call sites.
  - Functions sharing a name prefix (`order_total`, `order_discount`, `order_validate`) that want to be methods on a type.

```python
def apply_discount(amount: int, currency: str, code: str | None) -> int: ...
def format_price(amount: int, currency: str) -> str: ...
```

wants to be:

```python
@dataclass(frozen=True, slots=True)
class Money:
    amount_minor: int
    currency: str

    def apply(self, discount: Discount) -> Self: ...
    def format(self) -> str: ...
```

In TypeScript, the same model is a readonly type with functions that operate on it, or a small class when it has invariants to protect:

```typescript
type Money = Readonly<{ amountMinor: bigint; currency: CurrencyCode }>;

declare function applyDiscount(price: Money, discount: Discount): Money;
declare function formatMoney(price: Money): string;
```

#### Constructors that take too many arguments

The missing model shows up most clearly in constructors. Ten arguments, six of which are single facets of one thing (`customer_name`, `customer_email`, `customer_street`, and so on), and none of them thought through as a group: which are required, which belong together, which are really configuration. A shared prefix on parameter names is the giveaway. Callers must remember order and meaning, adding a field touches every call site, and validation of the group is repeated or missing.

Group the related arguments into an object and pass that object around instead. A frozen dataclass, or a Pydantic model when the data needs validating, is usually right. Check that the grouping is cohesive: a catch-all `Options` or `Config` holding unrelated settings is the same smell under a new name. Put optional behavior after a `*` so it is keyword-only.

```python
class Invoice:
    def __init__(
        self,
        customer_name: str,
        customer_email: str,
        customer_street: str,
        customer_city: str,
        customer_postal_code: str,
        customer_country: str,
        items: Sequence[LineItem],
        currency: str,
        due_date: date,
        notes: str | None = None,
    ) -> None: ...
```

becomes:

```python
@dataclass(frozen=True, slots=True)
class Address:
    street: str
    city: str
    postal_code: str
    country: str


@dataclass(frozen=True, slots=True)
class Customer:
    name: str
    email: str
    address: Address


class Invoice:
    def __init__(
        self,
        customer: Customer,
        items: Sequence[LineItem],
        due_date: date,
        *,
        notes: str | None = None,
    ) -> None: ...
```

The currency now travels inside each line item's `Money`, so it can no longer disagree with the amounts.

### Single responsibility and cohesion

Things that change together live together, and a class should be describable in one sentence without "and". Low cohesion looks like this:

- **God classes.** Dozens of methods and fields, a name ending in `Manager`, `Service` or `Processor`, touched by unrelated tickets.
- **Dumping-ground modules.** `utils.py`, `helpers.py`, `common.py`. A name that says nothing about purpose means there is no single reason for the module to change.
- **Split personalities.** One group of methods uses one subset of the fields and another group uses the rest. That is two classes.
- **Shotgun surgery and divergent change.** One conceptual change edits many files, or one file is edited for many unrelated reasons.

The boundaries between the parts of a composite matter as much as the composition itself. Sometimes an argument, property or field on one object belongs on another:

- A field that is `None` or unused for many instances belongs to a variant or a different object.
- Fields that always change together belong together in their own part.
- A method that mostly reads another object's attributes (feature envy) should move to that object.
- Data with a different lifecycle, rate of change or owner belongs elsewhere. Subscription state on `User`, or carrier credentials on `Order`, are typical.
- Two objects holding the same fact will drift apart. Pick one owner.

A useful question: if this field changed, which other fields would have to change with it, and which object owns the rule that connects them?

### Coupling: Law of Demeter and Tell, Don't Ask

Things that don't change together shouldn't know about each other. The Law of Demeter limits how much one object knows about another's structure, and Tell, Don't Ask keeps decisions with the object that owns the data. Check which objects know about which, and whether the arrows point the way the architecture says they should.

- **Reach-through chains.** `order.customer.address.city` couples the caller to the whole object graph. Expose `order.shipping_city`, or pass in what's needed.
- **Decisions made outside the owner.** `if account.balance >= amt: account.balance -= amt` in a caller belongs inside `account.withdraw(amt)`, where the invariant lives. If three call sites each check `if order.items:` before calling a method, the method should own that check.
- **Direction and cycles.** Lower-level modules don't import higher-level ones. An import inside a function, or a `TYPE_CHECKING` guard added only to dodge a circular import, hides the cycle without removing it.
- **Temporal coupling.** If method A must be called before method B, the type is hiding a state machine. Make the wrong order impossible: build the valid object in one step, or have A return a new type that has B.
- **Hidden dependencies.** Singletons, module-level mutable state, and a settings object imported directly by domain code. Work at import time (opening connections, reading the environment, registering handlers) is the same problem.
- **Encapsulation.** Everything public is a promise. Default to private (`_name`) and make the author justify each exposure. Attributes that carry an invariant should be changed through a method that enforces it. Don't return internal mutable collections; return a tuple, a copy, or a read-only `Sequence` or `Mapping`. Freeze value objects so equality and hashing stay stable. Keep `__all__` or the package `__init__` in step with the intended surface.

A practical measure: if testing a unit means patching five things, it is coupled to five things.

### Abstractions: dependency inversion and interface segregation

High-level policy should depend on abstractions it owns, and each consumer should depend only on the methods it uses. In Python that means small `Protocol`s defined by the code that consumes them. Reach for an ABC only when you need shared implementation or enforcement at instantiation.

```python
class UserRepository(Protocol):
    async def get(self, user_id: UserId) -> User | None: ...
    async def add(self, user: User) -> None: ...
```

TypeScript interfaces are structural already, so the consumer declares the shape it needs and any implementation that fits satisfies it, with or without `implements`:

```typescript
interface UserRepository {
  get(userId: UserId): Promise<User | null>;
  add(user: User): Promise<void>;
}
```

- **Leaky or sound.** An abstraction leaks when callers must know what's behind it. The test: could you write a second, different implementation without changing the interface or any caller? A repository exposing `get_session() -> AsyncSession` fails it, because every caller now depends on SQLAlchemy. Other leaks are vendor-specific exceptions, required call orders, and parameter names that mention the backend.
- **Fat interfaces.** Implementers stubbing out half the methods, and test doubles needing many attributes, mean the interface should be split.
- **Earned, not speculative.** YAGNI applies here too. An interface with one implementation, no test double and no second consumer is usually ceremony.
- **The missing abstraction.** The opposite failure: callers import a concrete vendor client and use five of its methods directly, so changing vendors touches every file.

### Composition over inheritance and Liskov substitution

Inheritance is the tightest coupling Python offers: a subclass depends on its parent's internals. Assemble behavior from injected collaborators instead, and keep inheritance for true is-a relationships with a base designed for extension, and for framework extension points such as exceptions, `Enum` and Pydantic models.

Signs inheritance is being used for code reuse:

- A subclass created to borrow methods rather than because it is a kind of its parent.
- Overrides that do nothing or raise `NotImplementedError` to switch off inherited behavior. This also breaks Liskov substitution: the subclass can't be used everywhere the base can.
- Callers checking `isinstance` to find out which subclass they were given.
- Names that stack behaviors (`RetryingLoggingEmailSender`), mixins that depend on attributes defined elsewhere, and behavior that depends on MRO order or when `super().__init__()` runs.
- Hierarchies deeper than two levels.

```python
class RetryingClient(HttpClient):
    def get(self, url: str) -> Response:
        for _ in range(3):
            try:
                return super().get(url)
            except TransportError:
                continue
        raise RetriesExhausted(url)
```

The composed version retries any client, including a fake in tests, and the retry policy becomes data:

```python
class RetryingClient:
    def __init__(self, inner: HttpClient, policy: RetryPolicy) -> None: ...

    def get(self, url: str) -> Response: ...
```

### Polymorphism: open/closed and explicit contracts

The open/closed principle says the next variant should be added, not edited in. Implicit polymorphism is the usual obstacle: different objects treated alike because they happen to share method names, or code that branches on what kind of thing it received. Explicit polymorphism names the contract, so both the type checker and the reader can see it.

Look for:

- `isinstance` ladders, or `if kind == "email"` branches on a string tag.
- `hasattr(obj, "send")` or `getattr(obj, "send", None)` probing for a capability.
- Several classes with the same method names and no declared shared contract.
- A parameter typed as a union of concrete classes, with the same branching repeated at more than one call site.
- A dict of callables keyed by a string that mirrors a type name.

```python
def notify(target: Email | Sms | Webhook, body: str) -> None:
    if isinstance(target, Email):
        smtp.send(target.address, body)
    elif isinstance(target, Sms):
        sms.send(target.number, body)
    else:
        http.post(target.url, json={"body": body})
```

becomes:

```python
class Channel(Protocol):
    def send(self, body: str) -> None: ...


def notify(channel: Channel, body: str) -> None:
    channel.send(body)
```

The two explicit forms trade off differently, so pick deliberately:

- **A `Protocol` or ABC** keeps the set of types open and the operations closed. A new channel touches no existing code; a new operation touches every channel.
- **A closed union with `match`**, using `assert_never` in the default branch, keeps the types closed and the operations open. A new operation is one function; a new variant is a type error everywhere it isn't handled. This fits a fixed, domain-defined set of variants.

In TypeScript, the open form is an interface like `Channel`. The closed form is a discriminated union with an exhaustive `switch`; assigning the leftover case to `never` makes the build fail when a variant is added and not handled:

```typescript
type Target =
  | { kind: "email"; address: string }
  | { kind: "sms"; number: string }
  | { kind: "webhook"; url: string };

function describe(target: Target): string {
  switch (target.kind) {
    case "email":
      return `email to ${target.address}`;
    case "sms":
      return `text to ${target.number}`;
    case "webhook":
      return `POST to ${target.url}`;
    default: {
      const unhandled: never = target;
      return unhandled;
    }
  }
}
```

Implicit is fine for two classes in one module with nothing crossing a boundary. Make it explicit when it crosses a module boundary, when a third implementer appears, or when the same branching shows up a second time.

### Signatures and command-query separation

The signature is the part of the design every caller sees, so read each one as if you had never seen the body. Command-query separation is the first test: a method either changes state or returns data, not both, and its name says which. A `get_*` with a side effect is a finding.

| Element | What to check |
| --- | --- |
| Constructors | Only what's needed to be valid; no I/O; dependencies injected; alternate constructors as classmethods. A long list of optional parameters means a missing model. |
| Methods | Commands return nothing meaningful, queries don't mutate. A boolean flag that switches behavior becomes two methods or an enum. |
| Functions | Pure where possible and obviously impure where not. Parameters ordered from most to least significant, with `*` before the options so they're keyword-only. |
| Parameter types | The narrowest type that works: a `Protocol`, `Sequence` or `Mapping` rather than `list` or `dict`. Passing a whole object when one field is used couples the function to that object. |
| Returns | One consistent type per function. `X \| None` and raising are both fine when chosen deliberately to match the codebase. A tuple of differing meanings is a named type waiting to happen. |
| Types | No `Any` without a reason. Every `# type: ignore` explains itself. `*args` and `**kwargs` pass-throughs hide the real contract. Private methods are annotated too. |

### Complexity in both directions

KISS catches designs that are too elaborate. Tell, Don't Ask and cohesion catch designs that are too thin. Reviewers tend to notice only the first.

- **Too complex.** A base class that exists to share three lines. Metaclasses, descriptors or dynamic attribute magic without a concrete need. A constructor with many parameters. Mode flags that turn one class into several.
- **Too simple.** Anemic models: data bags with all the logic in a separate service, so invariants live nowhere. Wrapper classes that only forward calls. A class with `__init__` and one method, which should be a function. Plain `dict` where a `TypedDict`, dataclass or model would make the shape checkable.

## 3. Correctness and safety

Fail Fast and Parse, Don't Validate together say where errors belong: caught once, at the boundary, as early as possible, and then never checked again inside. Least privilege limits the damage when something goes wrong anyway, and explicit is better than implicit keeps I/O and concurrency where a reader can see them. Hyrum's Law reminds the reviewer that "correct" includes not breaking whoever already depends on the current behavior.

### Parse at the boundary, trust the types inside

Untrusted input (request bodies, headers, queue messages, files, environment) is converted at the edge into a type that can only hold valid values. After that, the code relies on the type instead of re-checking.

- **Raw data travelling inward.** `dict[str, Any]` passed through several layers, or the same validation repeated at several call sites.
- **Primitive obsession and stringly typed values.** `str` or `int` standing in for emails, ids, money, durations or states. Use value types (`NewType` or a frozen dataclass) and `StrEnum` or `Literal` for closed sets, so illegal states can't be represented.
- **Defensive checks everywhere.** `if x is not None` on values the type already says can't be `None`, every function re-validating its inputs, or `try`/`except Exception` around code that can't reasonably fail. The noise hides the checks that matter. Validate once at the boundary and trust the types after that.
- **`assert` used for validation.** Asserts are stripped under `-O`. Use `assert` only for internal invariants that can't happen, and `raise` for anything that must hold in production.

In TypeScript the same pattern is a zod (or Valibot) schema parsed at the edge, with data typed `unknown` until then, branded types for ids, and string literal unions for closed sets. A cast such as `JSON.parse(body) as Order` is validation skipped, not done. In shell, arguments and required environment variables are checked at the top of the script, with a usage message and a non-zero exit.

### Fail fast on every path

Check the code against the description, then against the inputs the author didn't think about. Trace one realistic input end to end, including what happens to the data after it leaves this code.

- **Boundaries.** Empty collections, single items, `None`, zero, negatives, very large inputs, duplicate keys, unicode, timezone-naive datetimes, and off-by-one at range ends.
- **Every call that can fail.** Network, disk, parsing, database. Handle the failure where something sensible can be done; otherwise let it propagate to a handler that logs it.
- **Swallowed errors.** No bare `except:` or broad `except Exception:` returning a default. Catch narrowly, translate with `raise ... from err`, and log once at the boundary, not at every layer. A silent fallback turns a crash into a wrong result that is far harder to debug.
- **Absence vs. failure.** Return `X | None` when absence is a normal outcome, and raise a specific, domain-named exception when the caller can't proceed. Don't use exceptions for ordinary branching, don't return Go-style `(ok, error)` tuples, and don't return `None` for both "not found" and "failed".
- **Partial failure.** If step three of five fails, what state is left behind? Look for missing transactions, retries that aren't idempotent, and cleanup that runs only on the happy path. Resources are released on every path via `with` or `async with`.
- **Hidden inputs.** `datetime.now()` or `random` called inside logic makes behavior untestable. Pass in a clock or a seed. Datetimes are timezone-aware, in UTC.

The same rules in TypeScript: no empty `catch`, errors narrowed from `unknown` before use, the original kept with `new Error(message, { cause })`, and no floating promises, since an unawaited rejection fails silently. In shell: strict mode, an explicit check after any command whose failure `set -e` won't catch, and a `trap` for cleanup on every exit path.

### Concurrency and I/O, made explicit

Concurrency bugs are the hardest to reproduce, so look for them on paper. The common thread is implicit behavior: I/O, blocking or shared state that the reader can't see at the call site.

- **Match the codebase.** Don't introduce async into a synchronous path, or the reverse, without a reason. In async code, a blocking call stalls the whole event loop: in Python, a sync HTTP client or DB driver, `time.sleep` or heavy CPU work (use an async library or `asyncio.to_thread`); in Node, synchronous `fs` calls or a CPU-bound loop (use the async API or a worker thread).
- **Every async operation is awaited or deliberately scheduled.** Fire-and-forget tasks keep a reference and have their errors observed: `TaskGroup` in Python, an awaited `Promise.all` or an explicit `.catch` in TypeScript. Independent awaits that could run concurrently aren't run in sequence by accident.
- **Timeouts and cancellation.** Every outbound call has a timeout (`asyncio.timeout`, `AbortSignal.timeout`), and cancellation doesn't leave resources open or work half-done.
- **Shared mutable state.** What is mutated, by whom, under what lock or ownership rule? Module-level caches, class attributes and mutable defaults are the usual culprits.
- **Database races.** A read-modify-write in application code (read the balance, subtract, save) loses updates when two requests run at once. Use an atomic `UPDATE ... SET balance = balance - :amount`, `SELECT ... FOR UPDATE`, or optimistic locking with a version column. "Check, then insert" without a unique constraint creates duplicates; let the constraint reject them and handle the error.
- **Implicit queries.** Lazy loading under async SQLAlchemy either raises `MissingGreenlet` or hides an N+1 query; in Prisma or Drizzle, a relation fetched per row inside a loop does the same. Load explicitly, and keep slow or non-transactional calls out of open transactions.
- **Idempotency.** Anything that can be retried, such as queue consumers, webhooks and client retries, is safe to run twice.
- **I/O at the edges.** Domain logic that opens its own connections or reads environment variables directly is hard to test. Configuration arrives through one typed, validated settings object (`pydantic-settings`, or a zod schema over `process.env`), checked at startup.

### Data models that can't hold illegal states

Parse, Don't Validate applies to the schema as well as to request bodies. Column types, constraints and relationship shapes should make an illegal row impossible, whichever code path writes it, so an invariant enforced only in Python is a finding. The data modeling, queries and migrations playbooks in section 5 cover how to review each in detail.

### Least privilege and trust boundaries

- **Injection.** SQL built from strings, shell commands with interpolated input, templates rendering unescaped input, and deserialization of untrusted data (`pickle`, unsafe YAML).
- **Scope.** API tokens limited to what the code needs, read-only database roles for query paths, a service account per service, and no god-object `Context` that grants access to everything.
- **Secrets and personal data.** None in code, logs, error messages or fixtures. Logs carry ids, not payloads or tokens.
- **Dependencies.** A new package runs with your application's privileges, so it is a security decision as much as a design one.
- **Deeper passes.** Input validation, authentication and authorization, configuration, and new dependencies each have a playbook in section 5.

### Compatibility: Hyrum's Law

Once behavior is observable, someone depends on it. Treat these as contract changes even when the diff looks harmless:

- **Contracts.** Endpoint schemas, event payloads, public function signatures, config keys and database columns. Old callers and old data keep working during a rolling deploy. The schema-change, migrations and background-jobs playbooks give the mechanics.
- **Behavior that isn't in any schema.** Output ordering, default values, error message text, status codes and timing on widely used interfaces.
- **Libraries.** In a package others import, anything public by naming is public in practice. Deprecate with `warnings.warn(..., DeprecationWarning, stacklevel=2)` for at least one release before removing.

Risky changes go behind a flag, and rollback stays possible.

### Performance and observability

Knuth's rule cuts both ways in review. Ask for a measurement before accepting an optimization that costs readability, and still flag work clearly in the wrong place: queries in loops, unbounded result sets without pagination, repeated parsing, large objects held in memory. Fail Fast extends to production too: failures produce a log line or metric someone will see, with enough structured context to diagnose without a debugger.

## 4. Readability and review

The principle of least astonishment is readability in one line: code should behave the way its name and shape suggest. In practice that means writing the idiom a developer in that language expects, keeping behavior visible at the call site, and treating tests as the executable statement of intent. The same principles then govern how the review itself is written.

### Least astonishment

A surprised reviewer is a finding. Say what you expected and why, since the next reader will expect the same thing.

- **Names carry the domain.** A reader should know what a variable holds from its name and type together. Be suspicious of `data`, `result`, `info`, `handle`, `process` and `do_` prefixes.
- **Behavior matches the name.** `get_user` doesn't create a user. A `@property` is cheap and side-effect free; anything that does I/O or can fail is a method.
- **One return type per function.** Not a `str`, a `list` or `None` depending on the input, and not a `None` that means several different things.
- **No boolean traps.** `send(msg, True, False)` tells the reader nothing. Use keyword-only parameters, an enum, or two functions.
- **One level of abstraction per function.** Don't mix high-level steps with byte-level detail. Flatten deep nesting with guard clauses and early returns, and keep cyclomatic complexity at roughly ten or below.
- **Comments explain why, not what.** A comment that restates the code is noise; one that records a constraint, a workaround or a non-obvious decision is valuable. If code needs a comment to be understood, a better name or a smaller function usually fixes it. Commented-out code goes; version control remembers it.
- **Docstrings describe the contract** of public APIs: what it promises, raises and assumes, without repeating the type hints.

The best overall test is to use the package as an unfamiliar developer:

- Can I find the entry point from the layout and `__init__`?
- Can I make a first correct call from names, types and docstrings alone, without reading the source?
- Do similar things behave similarly: naming, argument order, return types, errors?
- Is there a required call order, hidden side effect or surprising default?
- Is there one obvious way to do each thing?
- Do error messages say what went wrong and what to do next?

When unsure, ask for a short usage example. If it is awkward to write, the API is awkward to use.

### Explicit over implicit

Behavior should be visible where it happens, not produced by machinery somewhere else.

- **Dynamic access and patching.** In Python, `getattr`, `setattr`, `__dict__`, `eval` and monkey-patching in production code; in TypeScript, index access by computed string keys on objects that should have a known shape, and modifying prototypes; in shell, `eval` and indirect expansion. Use explicit attributes or a dispatch table.
- **Global registries and import-time side effects** instead of explicit dependency injection.
- **Loose types.** `Any`, `cast` and unexplained `# type: ignore` in Python; `any`, `as` casts, non-null `!` and `@ts-ignore` in TypeScript. Each hides the contract from both the reader and the checker.
- **Implicit polymorphism** crossing a boundary. See the design section for when to make it explicit.

### Idiomatic code

Idioms reduce astonishment because they are what a reader of that language expects to see. Every language offers several ways to do any one thing; some are idiomatic and some are transliterated from another language. Flag code that works but fights its language, such as Java-style getters in Python, `any` and enums in TypeScript, or unquoted variables in shell.

When several idioms are acceptable, the one chosen should reflect how the behavior is meant to be used. A construct picked against its intent tells the reader something false: a list used for membership tests, a property that queries the database, a mutable type for a value that never changes.

Idioms can also be overdone. A comprehension or a chain of array methods stops being idiomatic once it needs re-reading, and a plain loop is clearer.

The idiom tables for each language, including which construct fits which intent, are in Part 3.

### Tests: make it work, provably

Beck's "make it work" means a test proves the behavior before anything is refactored or tuned. Tests are also the most precise statement of intent in the diff, so a reader should be able to learn what the code promises from them alone. Three questions apply to every test:

- **Would it fail if the behavior broke?** A passing suite only proves the tests pass.
- **Does it test behavior, not implementation?** Assertions on private calls and mock interactions break on every refactor and pass when behavior is wrong. Heavy patching of your own modules is a coupling finding, not a testing technique.
- **Is it obviously correct?** Test code has no logic of its own to get wrong, and its expected values are literals.

The two test playbooks in section 5 cover test levels, coverage, TDD, fixtures and helpers.

### Writing the review

The principles apply to the comments too. Keep feedback simple and unambiguous, respect what you don't yet understand, and improve the code without holding it hostage.

Label every comment, so the author knows at once what blocks the merge:

| Label | Meaning | Blocks merge |
| --- | --- | --- |
| `blocker` | Bug, security issue, broken contract, or a design problem that will be expensive later | Yes |
| `issue` | Real problem; expect a fix or a good reason not to | Usually |
| `suggestion` | A better approach, with the reasoning. The author decides. | No |
| `question` | You don't understand something; it may reveal a bug or a missing explanation | Until answered |
| `nit` | Minor preference; skip it if a linter could enforce it | No |
| `praise` | Something done well, so the author keeps doing it | No |

- **Chesterton's Fence applies to your own suggestions.** Ask before asserting when you may lack context: "What happens if `items` is empty here?" lands better than "This breaks on empty input," and is right more often.
- **Name the principle and the cost.** "This couples billing to the HTTP client, so changing vendors touches every call site" is actionable; "too coupled" is not.
- **Offer a concrete alternative** for design comments, ideally a short snippet.
- **Critique the code, not the person.** Say "this function" and "we", not "you".
- **Group findings.** One comment on a pattern with the other occurrences listed, not the same remark eight times.
- **Take design disagreements out of the thread.** A short call settles in minutes what a comment chain can't in days. Conway's Law is a hint here: disputes about where a boundary goes are often about which team owns it, so involve the owners.
- **Approve improvements, not perfection.** Approve when the change makes the codebase better and has no open blockers, even if you'd have written it differently. Request changes only for blockers and issues, and say which ones. Cleanups the Boy Scout Rule suggests can become a follow-up ticket.
- **Respond promptly.** A review within a few hours is worth more than a more thorough one a day later.

Authors apply the same principles before asking for review: re-read your own diff, keep the change small, write a description that states intent and what you chose not to do, and point reviewers at the parts you're least sure about.

### Worked example

A PR adds refunds: `POST /v1/orders/{order_id}/refunds`, a `refunds` table and its migration. The linked spec says support staff can issue full or partial refunds, never more than was paid, with an audit trail of who refunded what and why. An abridged excerpt:

```python
@router.post("/v1/orders/{order_id}/refunds", status_code=201)
async def create_refund(
    order_id: int,
    body: dict,
    session: AsyncSession = Depends(get_session),
    user: User = Depends(current_user),
) -> dict:
    order = await session.get(Order, order_id)
    if body["amount"] > order.total - order.refunded_total:
        raise HTTPException(400, "too much")
    refund = Refund(
        order_id=order_id,
        amount=body["amount"],
        reason=body.get("reason"),
        notify_customer=body.get("notify_customer", True),
    )
    session.add(refund)
    order.refunded_total += body["amount"]
    await session.commit()
    await payments.refund(order.payment_id, body["amount"])
    return refund.__dict__
```

```python
def upgrade() -> None:
    op.create_table(
        "refunds",
        sa.Column("id", sa.BigInteger, primary_key=True),
        sa.Column("order_id", sa.BigInteger, sa.ForeignKey("orders.id")),
        sa.Column("amount", sa.Float, nullable=False),
        sa.Column("reason", sa.Text),
        sa.Column("notify_customer", sa.Boolean),
        sa.Column("created_at", sa.DateTime),
    )
```

The review follows the guide's order: intent, scope and design, then correctness, then the rest. It opens with a summary, so the author knows what matters before reading individual comments.

**Summary comment**

> The happy path matches the spec, and the migration being its own commit made this easy to follow. Three blockers before this can merge: there's no authorization check, money is stored as a float, and the payment call runs after the commit, so a gateway failure leaves a refund recorded that never happened. Two spec gaps (audit trail, input validation) are marked `issue`. The `notify_customer` question is about scope. Happy to pair on the transaction part.

**Line comments**

- `blocker` on `user: User = Depends(current_user)`: Any logged-in user can refund any order. The spec limits refunds to support staff, and the order lookup isn't scoped to the caller's tenant. Suggest `Depends(require_role(Role.SUPPORT))` and a tenant-scoped query, plus tests for a customer, a support user from another tenant, and an anonymous caller.
- `blocker` on `order.refunded_total += ...` through `payments.refund(...)`: If the gateway call fails, the database already says the order was refunded. Two concurrent refunds can also both pass the limit check, because the read-modify-write isn't atomic. Suggest: accept an `Idempotency-Key` header and store it on the refund under a unique constraint, so a client or proxy retry returns the existing refund instead of creating a second one. Then reserve the amount in one transaction, inserting the refund as `pending` and applying the total with a guarded update (`UPDATE orders SET refunded_total = refunded_total + :amount WHERE id = :id AND refunded_total + :amount <= total`), and stop if no row was updated. Only then call the gateway, with an idempotency key derived from that stored refund. On success mark the refund `succeeded` and record the gateway's refund id; on a definite failure mark it `failed` and release the reservation; on an uncertain outcome such as a timeout, leave it `pending` and resolve it later by retrying the gateway call with the same idempotency key, which returns the original result instead of refunding twice.
- `blocker` on `sa.Column("amount", sa.Float, ...)`: Money as a float will accumulate rounding errors. `orders.total` uses `Numeric(12, 2)`; this column should match.
- `issue` on `body: dict`: A missing `amount` raises `KeyError` and returns a 500, and a negative amount passes the limit check. Suggest a `RefundRequest` model with a positive `Money` amount, a length-limited `reason`, and `extra="forbid"`.
- `issue` on `await session.get(Order, order_id)`: A missing order raises `AttributeError` on the next line. Return a 404 (or 404 for other tenants' orders too, so ids can't be probed).
- `issue` on the migration's `order_id` and `created_at`: `order_id` should be `nullable=False` and indexed, since PostgreSQL doesn't index the referencing side and every "refunds for this order" query will scan. `created_at` should be `DateTime(timezone=True)` with `server_default=sa.func.now()`.
- `issue` on the PR as a whole: The spec requires an audit trail of who issued each refund and why. I can't find one in the diff. A non-null `created_by` column and a required `reason` would cover it.
- `question` on `notify_customer`: The spec doesn't mention customer notifications. Is this needed for this release? If not, please leave it for a separate PR so this one matches the spec, no more and no less.
- `issue` on `return refund.__dict__`: This exposes every column plus SQLAlchemy's internal `_sa_instance_state`. Suggest a `RefundResponse` model declared as the route's `response_model`.
- `praise` on the migration's `downgrade`: Clean and complete, thanks.

**Verdict:** Request changes, naming the three blockers and the five issues as required. Everything else is the author's call.

Notice what the review doesn't contain: no comments on formatting or import order (the linter owns those), no rewrite of working code into the reviewer's style, and nothing about lines the PR didn't change.

## 5. Playbooks for specific kinds of change

Sections 1 to 4 apply to every diff. Some kinds of change also have their own failure modes and get a dedicated pass, using the playbooks in Part 2. They cover intent (code against its spec, design specs and plans), APIs (endpoints, schema changes and versioning, input validation, authentication and authorization), frontend (React components, Next.js, accessibility, CSS, HTML artifacts), data (modeling, queries and indexes, SQL files, migrations), runtime (the critical path, background jobs and events, logging), infrastructure (shell scripts, Dockerfiles, infrastructure as code, configuration), tests (levels, coverage and TDD, test code itself), supporting changes (documentation and Markdown, new dependencies), and agent and AI tooling (LLM prompts, skills and instruction files, rules files and subagents, hooks and commands, agent workflows, AI-generated code). Part 2 opens with an index of which playbook to use when. Use every playbook that matches the diff, on top of the general review.

## Checklist

The short version, in the same four groups and in review order.

**Simplicity and scope** (KISS, YAGNI, DRY, Rule of Three, Gall's Law)

- [ ] I can state the intent in one sentence, and the change implements its spec: every requirement covered, nothing extra.
- [ ] CI is green, the change is small enough to review, and mechanical edits are in separate commits.
- [ ] Every abstraction, layer, option and hook has a current user.
- [ ] Related code lives together; nothing moved to `utils` or a constants file only for reuse.
- [ ] Deduplication targets shared knowledge, readable literals stay literal, and no shared helper carries mode flags.
- [ ] Any optimization comes with a measurement.

**Design and structure** (SOLID, separation of concerns, cohesion and coupling, Demeter, Tell Don't Ask, composition, CQS)

- [ ] Each layer handles one concern, and the model comes from the domain, not the schema.
- [ ] No missing model is hiding in an argument cluster, a dict, or a meaningful primitive.
- [ ] Objects are valid once constructed, with collaborators injected.
- [ ] Dependencies point the right way, with no cycles and no reach-through chains.
- [ ] Objects enforce their own invariants, and the public surface is minimal.
- [ ] Interfaces are narrow, owned by their consumers, and don't leak.
- [ ] Inheritance is a true is-a, and subclasses substitute cleanly.
- [ ] Branching on type or tag that crosses a boundary is an explicit contract.
- [ ] Each method is a command or a query, and signatures are narrow and typed.

**Correctness and safety** (Fail Fast, Parse Don't Validate, least privilege, explicit over implicit, Hyrum's Law)

- [ ] Input is parsed into typed models at the boundary and trusted inside.
- [ ] Edge cases, failure paths and partial failure are handled; exceptions are caught narrowly.
- [ ] Async code doesn't block, tasks are owned, outbound calls have timeouts, and retries are idempotent.
- [ ] Concurrent writes can't lose updates or create duplicates.
- [ ] Schema types and relationship shapes match the data and its dominant queries.
- [ ] Access is scoped, and no secrets reach code or logs.
- [ ] Changes to observable behavior are intended and backward compatible.

**Readability and review** (least astonishment, explicit over implicit, Chesterton's Fence, Boy Scout Rule)

- [ ] Names and behavior match, and a newcomer could use the API from its signatures.
- [ ] The code is idiomatic for its language, with constructs chosen to fit the intended use.
- [ ] The tests would fail if the behavior broke.
- [ ] Docs, config and migrations changed along with the code that needs them.
- [ ] I've used the section 5 playbook for each kind of change in the diff.
- [ ] I know why anything I'm suggesting to remove was there.
- [ ] Every comment is labeled, and I've said which ones block.

## Appendix: pull request description template

Authors fill this in; reviewers use it as the map for the review. Delete the sections that don't apply. The requirements table is what makes reviewing against the spec quick.

```markdown
## What and why

One or two sentences: the problem, and how this change solves it.

Spec / ticket: <link>

## Requirements → implementation → tests

| Requirement (from the spec) | Where it's implemented | Test that proves it |
| --- | --- | --- |
| Support staff can refund up to the amount paid | `refunds/service.py::issue_refund` | `tests/refunds/test_service.py::test_refund_capped_at_paid` |

## Out of scope

What this PR deliberately doesn't do, and where that work is tracked.

## Public surface changes

New or changed endpoints, schemas, events, config keys and CLI flags.
Breaking change: no / yes (plan: ...)

## Data and migrations

Step: expand / backfill / read new / contract
Runtime and locks on production-sized data:
Rollback:

## Rollout

Feature flag, metrics to watch, and how to turn it off.

## How to review

Where to start, what I'm least sure about, and how to run it locally.

## Checklist

- [ ] Tests added or updated, and they fail without this change
- [ ] Docs and config updated
- [ ] New dependencies justified above, or none added
- [ ] Written with AI assistance: yes / no (I've reviewed every line)
```
