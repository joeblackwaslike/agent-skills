# Review Guide

> This repo is the source for this file. The principles it applies are in the `engineering-principles` skill.

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
- **Pick the playbooks.** Note which kinds of change the diff contains (an endpoint, a migration, a config file) and use the matching files listed in [playbooks/index.md](playbooks/index.md) alongside the general pass.

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

Leave magic-number rules (`PLR2004`, ESLint `no-magic-numbers`) off or loosely configured. They push self-explanatory literals into constants, which the "Constants for self-explanatory literals" discussion in the `engineering-principles` skill's `principles.md` treats as an anti-pattern. Each language's full toolchain and recommended settings are in the `engineering-principles` skill's `language-notes.md`. Some rules are preview-only or version-specific, so check them against the versions your project pins.

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

