# Patches

Replacing a name at test time so the code under test uses a double. Covers P12. The language mechanics (the patch helper, how to spec the replacement, how undo is wired) live in the `testing-code` patching runbook.

## Prefer injection

If the code under test can receive its collaborator as an argument or constructor parameter, inject the double and do not patch anything (P12).

- Injection needs no global state, so nothing can leak into the next test (P13).
- It shows the dependency in the signature, which is design feedback (P18).
- It works the same in every language. Patching depends on the runtime's lookup rules.

If you reach for a patch because the code builds its own collaborator inline, consider moving that construction to a parameter. A thin facade over a third-party call gives you one clean place to inject (P18).

## Patch where the name is looked up

When injection is not available, replace the name in the place the code under test reads it, not the place where it was defined.

- If module A imports a helper from module B, A holds its own reference. Replacing the helper in B leaves A calling the original.
- Patch the reference in A, the lookup site.
- When a patch has no effect, the usual cause is a patch at the wrong end of the import. Check which module holds the name the code calls.

## Boundaries only

Patch what P8 says to double: network, clock, third-party services, slow stores, process-wide state like environment variables.

- Do not patch your own internal functions to make a test easier. That ties the test to the implementation (P2) and survives a refactor poorly.
- Do not patch the thing under test.
- Patching a private helper is a sign the code wants a seam. Add one, or test through the public interface.

## Always auto-undone

Every patch is removed when the test ends, pass or fail, by machinery and not by memory (P13).

- Use the form where the framework restores the original on exit. A manual "set then reset" can be skipped by an exception.
- A patch that leaks becomes a flaky test somewhere else, usually a different file and a different day (see `flakes/isolation-failures.md`).
- Module-level assignment of a replacement is a patch with no undo. Do not do it.

## Replace with something checkable

A patch swaps in a double, and the double follows the rules in `doubles.md`: built against the real object so a wrong call fails (a plain data record is the only exemption), asserted exactly if it is a mock (P10, P11). Put the patch and its double in one named fixture (see `fixtures.md`).

## Decision

Inject when the code can take the dependency as a parameter. Patch only when the dependency is a boundary, at the lookup site and auto-undone. If neither holds, add a seam to the code and inject through it.
