---
source: "https://raw.githubusercontent.com/openai/codex/main/codex-rs/tui/voice.md"
fetched_at: "2026-11-09T12:34:38.952Z"
sha256: "feaa8b1e8cdd4e061261e4ee860d38d0b6aec138d412749dc610fdbb19f81d95"
---

# Voice when the desktop locks

The TUI ends a voice call when it detects that your OS session has locked,
including while the call is connecting or retrying. Voice stays on through a
screen saver until the OS reports a lock. After unlocking, run `/voice` to
start a new call.

On Linux, the TUI follows the desktop's lock report to logind. KDE Plasma
can report a lock while its screen saver can still be dismissed without a
password, so voice may stop at the start of that grace period. In a
headless terminal or with a locker that never reports a lock, use `/voice`
to end the call before leaving.
