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

import sys
import tempfile
from pathlib import Path

import yaml

WARN_CHARS = 400
FAIL_CHARS = 1000
HARD_CAP_CHARS = 1536


def read_description(skill_md: Path) -> tuple[str | None, str | None]:
    """Return (description, error). Exactly one of the two is None."""
    text = skill_md.read_text(encoding="utf-8")
    if not text.startswith("---"):
        return None, "no frontmatter"
    parts = text.split("---", 2)
    if len(parts) < 3:
        return None, "unterminated frontmatter"
    try:
        data = yaml.safe_load(parts[1])
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
        if not description.startswith("Use "):
            warns.append(f"{name}: does not start with 'Use when' / 'Use before'")
    return fails, warns, total


def self_test() -> int:
    with tempfile.TemporaryDirectory() as tmp:
        root = Path(tmp)
        cases = {
            "ok": "---\nname: ok\ndescription: Use when testing.\n---\n",
            "long": f"---\nname: long\ndescription: Use when {'x' * 1100}\n---\n",
            "broken": "---\nname: broken\ndescription: Use when a: b\n  c: d\n---\n",
            "missing": "---\nname: missing\n---\n",
        }
        for name, body in cases.items():
            (root / name).mkdir()
            (root / name / "SKILL.md").write_text(body, encoding="utf-8")
        fails, _, _ = lint(root)
        failed = {line.split(":", 1)[0] for line in fails}
        assert failed == {"long", "broken", "missing"}, failed
    print("self-test passed")
    return 0


def main(argv: list[str]) -> int:
    if "--self-test" in argv:
        return self_test()
    skills_dir = Path("skills")
    if "--skills-dir" in argv:
        skills_dir = Path(argv[argv.index("--skills-dir") + 1])
    fails, warns, total = lint(skills_dir)
    for line in warns:
        print(f"WARN {line}")
    for line in fails:
        print(f"FAIL {line}")
    print(f"total description characters: {total}; {len(fails)} fail, {len(warns)} warn")
    return 1 if fails else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
