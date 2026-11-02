#!/usr/bin/env python3
"""Lint SKILL.md frontmatter descriptions so the skill listing keeps them.

Claude Code drops descriptions (least-invoked skills first) once the whole listing
exceeds 1% of the context window, and caps each entry at 1,536 characters. Short,
trigger-first descriptions are the cheapest defence. See
skills/authoring-agent-skills/references/description-conventions.md.

Usage: python3 -I scripts/lint-descriptions.py [--skills-dir DIR] [--self-test]
Exit 1 on any FAIL. WARN lines never change the exit code.
"""

from __future__ import annotations

import argparse
import re
import sys
import tempfile
from pathlib import Path

import yaml

WARN_CHARS = 400
FAIL_CHARS = 1000
HARD_CAP_CHARS = 1536

_DELIM_RE = re.compile(r"^---\s*$", re.MULTILINE)


def read_description(skill_md: Path) -> tuple[str | None, str | None]:
    """Return (description, error). Exactly one of the two is None."""
    try:
        text = skill_md.read_text(encoding="utf-8")
    except (OSError, UnicodeDecodeError) as exc:
        return None, f"cannot read file: {exc}"
    delims = list(_DELIM_RE.finditer(text))
    if not delims or delims[0].start() != 0:
        return None, "no frontmatter"
    if len(delims) < 2:
        return None, "unterminated frontmatter"
    frontmatter = text[delims[0].end() : delims[1].start()]
    try:
        data = yaml.safe_load(frontmatter)
    except yaml.YAMLError as exc:
        return None, f"YAML parse error: {str(exc).splitlines()[0]}"
    description = data.get("description") if isinstance(data, dict) else None
    if not isinstance(description, str) or not description.strip():
        return None, "missing description"
    return " ".join(description.split()), None


def lint(skills_dir: Path) -> tuple[list[str], list[str], int]:
    fails: list[str] = []
    warns: list[str] = []
    total = 0
    for skill_md in sorted(skills_dir.glob("*/SKILL.md")):
        name = skill_md.parent.name
        description, error = read_description(skill_md)
        if error:
            fails.append(f"{name}: {error}")
            continue
        length = len(description)
        total += length
        if length > HARD_CAP_CHARS:
            fails.append(f"{name}: {length} chars exceeds the {HARD_CAP_CHARS} listing cap")
        elif length > FAIL_CHARS:
            fails.append(f"{name}: {length} chars exceeds {FAIL_CHARS}")
        elif length > WARN_CHARS:
            warns.append(f"{name}: {length} chars exceeds the {WARN_CHARS} target")
        if not description.startswith(("Use when", "Use before")):
            warns.append(f"{name}: does not start with 'Use when' / 'Use before'")
    return fails, warns, total


def _write_case(root: Path, name: str, body: str) -> None:
    (root / name).mkdir()
    (root / name / "SKILL.md").write_text(body, encoding="utf-8")


def self_test() -> int:
    errors: list[str] = []

    def check(condition: bool, message: str) -> None:
        if not condition:
            errors.append(message)

    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        cases = {
            "ok": "---\nname: ok\ndescription: Use when testing.\n---\n",
            "warn_prefix": '---\nname: warn_prefix\ndescription: "Run this for testing."\n---\n',
            "at_warn_boundary": "---\nname: at_warn_boundary\ndescription: " + "Use when " + ("x" * (WARN_CHARS - len("Use when "))) + "\n---\n",
            "over_warn_boundary": "---\nname: over_warn_boundary\ndescription: " + "Use when " + ("x" * (WARN_CHARS - len("Use when ") + 1)) + "\n---\n",
            "at_fail_boundary": "---\nname: at_fail_boundary\ndescription: " + "Use when " + ("x" * (FAIL_CHARS - len("Use when "))) + "\n---\n",
            "over_fail_boundary": "---\nname: over_fail_boundary\ndescription: " + "Use when " + ("x" * (FAIL_CHARS - len("Use when ") + 1)) + "\n---\n",
            "at_hard_cap": "---\nname: at_hard_cap\ndescription: " + "Use when " + ("x" * (HARD_CAP_CHARS - len("Use when "))) + "\n---\n",
            "over_hard_cap": "---\nname: over_hard_cap\ndescription: " + "Use when " + ("x" * (HARD_CAP_CHARS - len("Use when ") + 1)) + "\n---\n",
            "embedded_dashes": '---\nname: embedded_dashes\ndescription: "Use when comparing --- separators in text."\n---\n',
            "broken": "---\nname: broken\ndescription: Use when a: b\n  c: d\n---\n",
            "missing": "---\nname: missing\n---\n",
            "no_frontmatter": "# no frontmatter here\n",
            "unterminated": "---\nname: unterminated\ndescription: Use when testing.\n",
        }
        for name, body in cases.items():
            _write_case(root, name, body)

        fails, warns, _total = lint(root)
        fail_names = {line.split(":", 1)[0] for line in fails}
        warn_names = {line.split(":", 1)[0] for line in warns}

        expected_fails = {
            "over_fail_boundary",
            "at_hard_cap",
            "over_hard_cap",
            "broken",
            "missing",
            "no_frontmatter",
            "unterminated",
        }
        check(fail_names == expected_fails, f"fail set mismatch: {fail_names}")
        check("over_warn_boundary" in warn_names, "over_warn_boundary should warn")
        check("at_warn_boundary" not in warn_names, "at_warn_boundary should not warn on length")
        check("at_fail_boundary" in warn_names, "at_fail_boundary should warn (under FAIL_CHARS)")
        check("warn_prefix" in warn_names, "warn_prefix should warn for missing 'Use when/before'")
        check("ok" not in warn_names, "ok should not warn")
        check(
            "embedded_dashes" not in fail_names and "embedded_dashes" not in warn_names,
            "embedded_dashes description should parse intact and stay short",
        )

        empty_dir = root / "empty"
        empty_dir.mkdir()
        empty_fails, empty_warns, empty_total = lint(empty_dir)
        check(empty_fails == [] and empty_warns == [] and empty_total == 0, "empty dir should report nothing")

    nonexistent = Path(tmp) / "does-not-exist"
    rc = main(["--skills-dir", str(nonexistent)])
    check(rc != 0, "nonexistent --skills-dir should exit non-zero")

    if errors:
        for message in errors:
            print(f"SELF-TEST FAIL: {message}", file=sys.stderr)
        return 1
    print("self-test passed")
    return 0


def main(argv: list[str]) -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--skills-dir", type=Path, default=Path("skills"))
    parser.add_argument("--self-test", action="store_true")
    args = parser.parse_args(argv)

    if args.self_test:
        return self_test()

    if not args.skills_dir.is_dir():
        print(f"error: --skills-dir {args.skills_dir} is not a directory", file=sys.stderr)
        return 1

    fails, warns, total = lint(args.skills_dir)
    if not fails and not warns and total == 0 and not list(args.skills_dir.glob("*/SKILL.md")):
        print(f"error: no SKILL.md files found under {args.skills_dir}", file=sys.stderr)
        return 1

    for line in warns:
        print(f"WARN {line}")
    for line in fails:
        print(f"FAIL {line}")
    print(f"total description characters: {total}; {len(fails)} fail, {len(warns)} warn")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
