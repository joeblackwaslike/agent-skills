# Shell testing mechanics

How to write the tests the [runbooks](../runbooks/unit.md) describe for bash scripts, using bats-core, its helper libraries and shellcheck. Standards are in [testing-principles](../../../testing-principles/SKILL.md); the shape of a test body is the [test body template](../test-body-template.md). The thirteen sections match the [Python page](python.md) in order, but this page is shorter: shell has no mock library, so most of the space goes to the one technique that replaces it, stubbing commands through `PATH`.

## Toolchain and verified versions

Versions below were checked on 2026-11-13 against each project's latest GitHub release and the docs in its repository. Re-check before you pin.

| Tool | Version | Used for |
|---|---|---|
| bats-core | 1.14.0 (latest release 2026-07-21; the installed `bats --version` agrees) | test runner |
| bats-support | 0.3.0 | helper library that bats-assert and bats-file need |
| bats-assert | 2.2.4 | `assert_success`, `assert_output`, `assert_line` and friends |
| bats-file | 0.4.0 | file and directory assertions, `temp_make` |
| shellcheck | 0.11.0 | static check of scripts and `.bats` files |
| GNU parallel | not installed on the machine that ran the examples | needed by `bats --jobs` |
| kcov | not run; bats-core's own CI uses it (v42) | line coverage for shell |

The examples on this page (the stub test, the date stub, the parametrized cases, the skip, the conditional skip, the tag filters and the temp-directory test) were run with bats 1.14.0 against clones of the helper libraries, and every script and `.bats` file passed shellcheck. `bats --jobs` was not run successfully, because GNU parallel was absent (see Performance). The bats-file and kcov lines are the thinnest evidence: bats-file's `assert_file_exist` and `temp_make` were run once in a throwaway test, kcov was not run at all.

Install with your package manager (`brew install bats-core`) or clone the four repositories. Point `BATS_LIB_PATH` at the directory that holds the helper clones and load them by name:

```bash
setup() {
  bats_load_library bats-support
  bats_load_library bats-assert
}
```

Run the suite with `bats test/` (add `-r` to recurse). Run `shellcheck bin/*.sh test/*.bash test/*.bats` beside it. shellcheck is a static check that belongs in the same gate: it catches unquoted variables and word-splitting bugs that a happy-path test never exercises. It reads `.bats` files directly.

## Layout and naming

```text
bin/notify.sh
test/notify.bats
test/test_helper.bash
```

- One `.bats` file per script or per command of a script. Each file is a set of `@test "..."` blocks.
- Name each test for the behavior, as a sentence: `fails before any command runs when the url is missing`. The string is what the failure line prints.
- Shared helpers go in a `test_helper.bash`, pulled in with `load test_helper`. `load` resolves the path relative to the test file.
- Keep the script under test runnable as a file (`bin/notify.sh`) and have the test call it by path, through `run`. If the logic lives in functions, have the script check `[[ ${BASH_SOURCE[0]} == "$0" ]]` before running `main`, so a test can `source` it and call one function. Prefer calling the whole script; sourcing it to call one function is for logic that is hard to reach otherwise ([testing private internals](../code-smells.md#testing-private-internals)).
- Bats evaluates each test file once to count tests and then once per test, so keep code outside `@test`, `setup` and the helpers to a minimum. Printing there appears several times.

## Fixtures, setup, teardown

Bats gives you four hooks:

- `setup` and `teardown` run before and after every test, in the same process as the test body, so a variable or `export` set in `setup` is visible in the test.
- `setup_file` and `teardown_file` run once per file. Variables you `export` in `setup_file` are visible to all tests and hooks of the file.
- `setup_suite` and `teardown_suite` run once per run and must live in a file named `setup_suite.bash` beside the tests.

Bats describes `teardown` as failing the test if its last command returns non-zero, while a failing command in the middle does not fail it, because `errexit` is off there. End a teardown with an explicit `return 0` or a command you expect to succeed.

Bats also hands every test a temporary directory that is removed afterwards.

| Variable | Scope |
|---|---|
| `$BATS_TEST_TMPDIR` | one test |
| `$BATS_FILE_TMPDIR` | all tests in one file |
| `$BATS_SUITE_TMPDIR` | the whole run |

Use `$BATS_TEST_TMPDIR` for anything a test writes, which gives each test its own state by default (P13). Reach for the file-scoped directory only for read-only data that is expensive to build, and never let tests write into it.

Build what the test needs in the test or in `setup`, and keep the values it asserts on visible in the test body ([values defined far from the test](../code-smells.md#values-defined-far-from-the-test)). The [fixtures runbook](../runbooks/fixtures.md) has the steps for deciding what a fixture should build.

## Doubles: stub, mock, autospec equivalent, fake

Shell has no mock library and no autospec. The seam is the command name: bash looks a command up through `PATH`, so a directory of fake executables placed first in `PATH` replaces `git`, `curl` or `date` for the script under test. That is a patch at the seam where the code looks the name up (P12). It works for external commands. It does not intercept a call by absolute path (`/usr/bin/curl`) or through `command -p`, so run the script with a minimal `PATH` too.

Choose the double by what the test asserts (see [doubles](../../../testing-principles/references/doubles.md)).

### Stub

A stub supplies output and an exit status and records nothing the test checks. `make_stub NAME [STATUS] [STDOUT]` below writes an executable that prints a canned string and exits with a canned code. A stub that records its calls is a mock, covered next.

### Mock: record argv, assert the whole call list

Every stub the helper writes appends its name and its arguments to one calls file. One file for all stubs means the order across commands is kept, and the assertion can state the exact calls (P10): each call with its arguments, in the order made, and nothing else.

```bash
make_stub() {
  local name=$1 status=${2:-0} out=${3:-}
  cat >"$STUBS/$name" <<STUB
#!/usr/bin/env bash
{ printf '%s' '$name'; printf ' %q' "\$@"; printf '\n'; } >>"$CALLS"
printf '%s' '$out'
exit $status
STUB
  chmod +x "$STUBS/$name"
}
```

`printf %q` writes each argument shell-quoted, so an argument with a space stays one visible unit and the expected text in the test is unambiguous.

The script under test, `bin/notify.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail

url=${NOTIFY_URL:?NOTIFY_URL is required}
sha=$(git rev-parse --short HEAD)
stamp=${NOTIFY_NOW:-$(date -u +%Y-%m-%dT%H:%M:%SZ)}
curl --silent --fail --data "deployed $sha at $stamp" "$url"
```

The test:

```bash
bats_require_minimum_version 1.5.0

setup() {
  bats_load_library bats-support
  bats_load_library bats-assert
  load test_helper

  SCRIPT=$BATS_TEST_DIRNAME/../bin/notify.sh
  STUBS=$BATS_TEST_TMPDIR/stubs
  CALLS=$BATS_TEST_TMPDIR/calls
  mkdir -p "$STUBS" "$BATS_TEST_TMPDIR/home"
  : >"$CALLS"
  export STUBS CALLS
}

run_notify() {
  run env -i PATH="$STUBS:/usr/bin:/bin" HOME="$BATS_TEST_TMPDIR/home" \
    NOTIFY_URL=https://hooks.test/deploy "$@" "$SCRIPT"
}

@test "posts the short sha and the injected time, and calls nothing else" {
  make_stub git 0 abc1234
  make_stub curl 0

  run_notify NOTIFY_NOW=2026-01-01T00:00:00Z

  assert_success
  run cat "$CALLS"
  assert_output - <<'CALLS_EXPECTED'
git rev-parse --short HEAD
curl --silent --fail --data deployed\ abc1234\ at\ 2026-01-01T00:00:00Z https://hooks.test/deploy
CALLS_EXPECTED
}
```

`assert_output -` reads the expected text from stdin and compares the whole output, so a third, unexpected call fails the test. This was confirmed on this page by appending an extra `curl` line to the script: the test failed and printed expected and actual side by side. A test that only checked "curl was called" would have passed.

Notes on the pieces:

- `run` captures the command's combined stdout and stderr in `$output`, its exit code in `$status`, and the lines in the `${lines[@]}` array. `assert_success`, `assert_failure N`, `assert_output` and `assert_line` read those. The raw form works without the helper library: `[ "$status" -eq 0 ]`.
- `run` executes its command in a subshell, so a variable the script sets is gone afterwards. Assert on output, exit code and files.
- `run cmd | other` pipes `run`'s own output, not the command's. Use `run bats_pipe cmd \| other` when the pipeline is what you mean to test.
- Flags on `run` (`run ! cmd`, `run -N cmd`) and `run bats_pipe` need the file to call `bats_require_minimum_version 1.5.0` at the top, as the test above does. Without it bats 1.14.0 still runs the test but prints warning BW02; I reproduced the warning and confirmed that the call removes it.
- Prefer `run -0 cmd` or plain `cmd` when you only need success: bats runs tests with `set -e`. To assert failure use `run ! cmd` or `run -N cmd`; a bare `! cmd` does not fail the test unless it is the last command.
- `env -i` starts the script with an empty environment, so nothing in the developer's or CI's shell leaks into the test (more under Isolation).

### Fake

When the test cares about the outcome across several calls, write a fake instead: a stub script that keeps state in a file under `$BATS_TEST_TMPDIR` (a fake `git` that answers `rev-parse` from a fixture file, or a fake `ssh` that runs the command against a temp directory). Use it for the same reason as in any language, to avoid pinning call sequences that are not behavior ([change-detector tests](../code-smells.md#change-detector-tests)). There is no spec check, so a stub can drift from the real tool. Run one test against the real command in an integration test, or the stub goes stale ([stale doubles](../code-smells.md#stale-doubles)).

## Parametrization

Bats has no native parametrize decorator. A `for` loop around `@test` does not work, because bats rewrites `@test` blocks before the shell runs them, so the loop body is not what you think. The documented pattern is a body function plus `bats_test_function`, called in a loop to register one named test per row. It is the shell form of the loop-free table (P3).

```bash
curl_failure_propagates() {
  make_stub git 0 abc1234
  make_stub curl "$1"
  run_notify NOTIFY_NOW=2026-01-01T00:00:00Z
  assert_failure "$1"
}

for code in 7 22 28; do
  bats_test_function --description "exits $code when curl exits $code" \
    -- curl_failure_propagates "$code"
done
```

This ran and produced three separately named results. The registering loop sits outside any test, which is the one place a loop is right here: it builds tests, and none runs inside a test body. `setup` and `teardown` run for each generated test. Write the expected value into the description and the arguments, not as a computed value inside the body. `bats_test_function` also takes `--tags`, and `bats --filter-tags` selects by tag.

## Determinism: time, randomness, network, ordering

### Time

Two ways, in order of preference.

1. **Inject the clock** through an environment variable the script reads (`NOTIFY_NOW` above), defaulting to the real `date`. The test sets the variable and no stub is needed.
2. **Stub `date`** when the script cannot be changed: `make_stub date 0 2026-02-02T02:02:02Z`, then assert the call list included the `date` call you expect. This ran above. A stub returns the same string whatever the flags, so keep the flag-sensitive part of the script in one tested place.

### Randomness

Assigning to `RANDOM` seeds bash's generator, so `RANDOM=42` before reading it gives the same sequence each time (confirmed with two reads on this machine). Better, have the script take the value from a variable or argument and pass a fixed one. For `mktemp` or `$$`, assert on a pattern or on the structure, not on the name.

### Network

Put stubs for `curl`, `wget` and any other client first in `PATH`, and run the script under `env -i` with a minimal `PATH`, so nothing reaches the internet by accident. A default-deny stub makes an unexpected call fail loudly and show up in the calls file: `make_stub curl 99` for every client the script might use. A unit test that reaches the real network is a bug in the test.

### Ordering

Bats runs the tests of a file in the order they appear, but do not rely on that. A test that needs another test's output is broken ([shared mutable state](../code-smells.md#shared-mutable-state)). With `--jobs` the order is not guaranteed, which exposes hidden coupling.

## Isolation and cleanup

- Each test runs in its own process, and bats removes `$BATS_TEST_TMPDIR` afterwards. Write only under it (P13).
- Never let a script touch the real `$HOME`. Set `HOME` to a directory under the test's temp directory, as `run_notify` does, so a script that writes `~/.config/...` or reads real credentials cannot do either.
- `env -i` runs the script with no inherited variables. Pass only the ones the test names. This stops "passes on my machine" from a stray `AWS_PROFILE`, a different locale or an exported `PATH`. If the script needs `TZ` or `LC_ALL`, set them in the test.
- Wrap anything that changes global state of the shell itself (`cd`, `umask`, `set -o ...`) in a subshell, `( cd "$dir" && ... )`, or do it inside `run`, which already uses one.
- Clean up background processes in `teardown`. A process started with `&` inherits bats's file descriptor 3 and can make a run hang; close it for the launch with `cmd 3>&- &`.
- A failing test still runs `teardown`, which is the cleanup hook. `bats::on_failure` runs before it, only on failure, for printing diagnostics.

## Async

Shell is synchronous, so the async machinery of other languages has no counterpart. What applies is background jobs and waiting on them. Wait on a condition, not on time: poll for a file, a pid or a line of output with a bounded loop, and fail with a clear message if it never comes ([bare sleeps](../code-smells.md#bare-sleeps)). Use `wait "$pid"` and check its status for jobs the test started. Set a per-test timeout so a hang fails instead of stalling the job: bats documents `BATS_TEST_TIMEOUT` (seconds, set in `setup_file` at the latest, since later changes do not alter a running countdown). I read it in the docs and did not run it.

## Performance

Measure first ([slow tests runbook](../slow-tests.md)). The shell levers:

- Each test starts a process, and stubs start more. A test that runs ten commands in a loop is slower than ten small tests. A test of one command should take milliseconds.
- `bats --jobs N` runs tests in parallel. Bats' docs say it needs GNU parallel (or a compatible replacement) and that test order is not guaranteed. Without it, running `bats --jobs 2` on this machine printed `parallel: command not found`, executed zero of seven tests and exited 1, so a missing dependency fails the run.
- Before you turn `--jobs` on, each test must own its state, which `$BATS_TEST_TMPDIR`, `env -i` and a temp `HOME` provide. Fixed paths, a fixed port, and anything in `$BATS_FILE_TMPDIR` that tests write to will collide. Bats offers `--no-parallelize-within-files` and `BATS_NO_PARALLELIZE_WITHIN_FILE=true` (set in `setup_file`) to keep one file serial, and `--no-parallelize-across-files` for the reverse. After you first enable `--jobs`, run the suite repeatedly to find coupling the serial run hid.
- Do not `sleep` to wait. Stub the slow command, or poll with a bound.
- Run one file while iterating (`bats test/notify.bats`) or one test (`bats -f "posts the short"`), and the whole suite before you push.

## Coverage, mutation and property-based tools

**Coverage:** kcov can measure line coverage of a bats run; bats-core's own CI invokes `kcov` around `bats` (found in its workflow file). I did not run it, and shell coverage tooling is thinner than in other languages. Coverage shows what never ran, not whether it was checked (P7).

**Mutation:** there is no standard mutation tool for bash that I could verify. The manual version of the [mutation testing runbook](../runbooks/mutation-testing.md) still works: change a condition or delete a command in the script and see whether a test fails. The extra-`curl` change under Doubles was exactly that, and the exact-call assertion caught it.

**Property-based:** there is no standard property tool for bash. For a pure text-transforming function, loop a fixed list of awkward inputs (empty string, spaces, quotes, newlines, glob characters) through one registered test per input with `bats_test_function`, and assert an invariant such as "output has no spaces". That is a table, not shrinking or generation. The [property-based runbook](../runbooks/property-based.md) says when a property is worth it.

## Integration and data: factories, databases, rollbacks

For shell, integration means running the script against real files and real commands in a temporary directory. This is the kind where nothing is stubbed that is cheap and deterministic (P8).

The script under test, `bin/delete-old-logs.sh`, deletes `.log` files older than 30 days from the directory it is given:

```bash
#!/usr/bin/env bash
set -euo pipefail
find "$1" -name '*.log' -mtime +30 -delete
```

The test:

```bash
@test "deletes only .log files older than 30 days" {
  mkdir "$BATS_TEST_TMPDIR/logs" "$BATS_TEST_TMPDIR/elsewhere"
  touch -t 202001010000 "$BATS_TEST_TMPDIR/logs/old.log"
  touch -t 202001010000 "$BATS_TEST_TMPDIR/logs/old.txt"
  touch "$BATS_TEST_TMPDIR/logs/new.log"
  touch -t 202001010000 "$BATS_TEST_TMPDIR/elsewhere/old.log"

  run "$BATS_TEST_DIRNAME/../bin/delete-old-logs.sh" "$BATS_TEST_TMPDIR/logs"

  assert_success
  [ ! -e "$BATS_TEST_TMPDIR/logs/old.log" ]
  [ -f "$BATS_TEST_TMPDIR/logs/new.log" ]
  [ -f "$BATS_TEST_TMPDIR/logs/old.txt" ]
  [ -f "$BATS_TEST_TMPDIR/elsewhere/old.log" ]
}
```

The test checks both halves of "only": the old file is gone, and the new file, the old non-log file and an old log outside the target directory all survive. It passed on bats 1.14.0.

- A factory is a small helper that creates a directory tree, a fixture file or a git repository in the temp directory (`git init` in `$BATS_TEST_TMPDIR`, a commit with fixed author and date variables).
- bats-file adds `assert_file_exist`, `assert_file_not_exist`, `assert_dir_exist` and `temp_make`; they give readable failures. Plain `[ -f path ]` works without the library. Only assert on paths under the temp directory.
- Run the real tool when the point is its behavior (a `tar`, `sed` or `git` call). Stub it only to avoid cost or side effects.
- For databases, shell tests call the client (`psql`) against a disposable database. See the [SQL page](sql.md) for rollback and template databases.
- Tests that touch the real home directory, `/etc` or a shared path make the suite depend on the machine it runs on.

The [integration runbook](../runbooks/integration.md) has the steps.

## Anti-patterns

The shared list is in [code smells](../code-smells.md). The ones that show up most in shell suites:

- Asserting on the text of the script, with `grep` over its source, instead of running it and checking behavior ([change-detector tests](../code-smells.md#change-detector-tests)).
- `sleep` to wait for a background job ([bare sleeps](../code-smells.md#bare-sleeps)).
- Writing outside `$BATS_TEST_TMPDIR`, or reading the real `$HOME`, `/tmp/fixed-name` or a fixed port ([shared mutable state](../code-smells.md#shared-mutable-state)).
- A stub that records nothing, or an assertion that checks only that a command was called once and ignores the rest of the log (a gap against P10, [tests that cannot fail](../code-smells.md#tests-that-cannot-fail)).
- `! cmd` as the assertion that a command failed, which does not fail the test unless it is the last line. Use `run ! cmd`.
- `run cmd | grep text`, which greps `run`'s output, not the command's. Use `assert_output --partial text`.
- Stubs with logic inside (a stub that parses its arguments and branches) that grow into a second implementation ([logic in tests](../code-smells.md#logic-in-tests)).
- Many `[[ ... ]]` lines with no failure message, in a test that checks six things ([assertion roulette](../code-smells.md#assertion-roulette), [one test covering several behaviors](../code-smells.md#one-test-covering-several-behaviors)).
- Scripts that are only tested on the author's `PATH`, shell version or locale. macOS ships bash 3.2 and Linux images ship bash 5, so run a version your users run, and say which one the script targets.
- Disabling a shellcheck warning with a blanket `# shellcheck disable` instead of fixing the quoting.
- A `skip` with no reason, owner or date.

### Quarantining a flaky test

The [quarantine runbook](../flakes/quarantine.md) decides whether to quarantine and which mechanism to use. In bats the mechanism is `skip` with a reason. There is no expected-failure marker, so a skipped test does not run and does not report. The quarantine runbook's separate non-gating run therefore needs a way to run the skipped tests: make the skip conditional, so the gating job skips and the non-gating job runs.

```bash
@test "publishes the event after the worker starts" {
  if [ -z "${RUN_QUARANTINED:-}" ]; then
    skip "flaky: depends on worker startup order, tracked in OPS-412, owner ada, review 2026-12-01"
  fi
  # body unchanged
}
```

- The gating run (`bats test/`) shows the test as skipped with the reason. The non-gating job runs the same files with `RUN_QUARANTINED=1` and `continue-on-error` in CI, and its results are watched.
- The unconditional `skip "reason"` form was run and printed the reason in the result line. It silences the test everywhere, so use it only for a test that is being deleted or fixed, not for a flake you still want data on.
- Put owner, date and the tracking link in the reason string so a search finds them.
- Bats has `BATS_TEST_RETRIES`, which reruns a failing test. It hides a flake rather than quarantining it, so the runbook's tracking still applies. Bats documents the variable; I did not run it.
- Tags give a second route: put `# bats test_tags=quarantined` above the test, have the gate run `bats --filter-tags '!quarantined'` and the non-gating job run `--filter-tags quarantined`. Both filters ran and selected the expected tests. Unlike the environment variable, this runs the test without editing its body.

## Further reading

- There is no ECC shell testing skill. The nearest is [ECC tdd-workflow](https://github.com/affaan-m/ECC/blob/main/skills/tdd-workflow/SKILL.md), a general test-first workflow (MIT, Copyright Affaan Mustafa). Nothing on this page is copied from it.
- The sibling skill working-with-bash in this repository covers bash itself (quoting, `set -euo pipefail`, portability); it is named in plain text because it is not a testing page.
- [bats-core documentation](https://bats-core.readthedocs.io/en/stable/) and the [writing tests page](https://bats-core.readthedocs.io/en/stable/writing-tests.html)
- [bats-assert](https://github.com/bats-core/bats-assert), [bats-support](https://github.com/bats-core/bats-support) and [bats-file](https://github.com/bats-core/bats-file)
- [ShellCheck](https://www.shellcheck.net/) and its [wiki of checks](https://www.shellcheck.net/wiki/)
- [GNU parallel](https://www.gnu.org/software/parallel/) for `--jobs`
- [kcov](https://github.com/SimonKagstrom/kcov)

The exact-call rule and the test body order are this skill's house style. The rest is paraphrased from the documentation linked above and checked on 2026-11-13, with the examples run on bats 1.14.0 and shellcheck 0.11.0.
