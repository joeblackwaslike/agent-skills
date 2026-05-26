# Terminal Demo Videos

Use this when the README needs the "little terminal video" common in high-polish developer projects. The goal is a short proof loop: install, run, see value.

## When to Use

Use a terminal demo as the hero proof for:

- CLIs
- dev tools
- agent skills
- MCP servers
- code generators
- GitHub Actions
- VS Code extensions with command-driven workflows
- libraries where the first value is visible in a terminal

Avoid terminal demos when the product is primarily visual UI; use screenshots or an annotated UI GIF instead.

## Recommended Tools

Pick based on output needs:

| Tool | Best for |
| --- | --- |
| VHS by Charmbracelet | Polished scripted terminal GIF/MP4 demos committed with source `.tape` |
| asciinema | Lightweight terminal recording, replayable casts, docs-friendly command sessions |
| terminalizer | Node-based terminal GIF generation when already in a JS toolchain |
| screen recording | UI plus terminal workflows, especially VS Code or browser plus CLI |

Prefer scripted demos over hand-recorded sessions for repeatability.

## Demo Script Shape

The demo should show one clear win:

```text
1. Start from a realistic problem.
2. Run the install or init command if short.
3. Run the primary command.
4. Show the result immediately.
5. End on proof: generated file, passing check, fixed output, dashboard, or summary.
```

Keep it tight. A great README terminal hero is usually 8-20 seconds, not a full tutorial.

## VHS Pattern

Store the source script next to the rendered asset:

```text
assets/readme/
  demo.tape
  demo.gif
  demo.mp4
```

Example `.tape` shape:

```text
Output assets/readme/demo.gif
Set FontSize 18
Set Width 1200
Set Height 720
Set Theme "Catppuccin Mocha"

Type "my-tool scan ."
Enter
Sleep 1s
Type "my-tool fix --apply"
Enter
Sleep 1s
```

Use real commands and real output where possible. If output is staged, keep it truthful and representative.

## README Embedding

For GIF:

```markdown
![Demo: one-command setup and result](assets/readme/demo.gif)
```

For MP4, GitHub supports uploaded videos in many contexts but repo-relative MP4 rendering can be inconsistent. Prefer a GIF for the hero and link MP4 as a sharper fallback:

```markdown
![Demo](assets/readme/demo.gif)

Prefer video? [Watch the MP4](assets/readme/demo.mp4).
```

For asciinema, link the cast unless the target README renderer supports embedding:

```markdown
[![asciicast](https://asciinema.org/a/CAST_ID.svg)](https://asciinema.org/a/CAST_ID)
```

## Visual Direction

- Use a large readable font.
- Keep terminal width close to GitHub README width.
- Avoid tiny prompts, noisy shell themes, or excessive animation.
- Use a clean prompt with minimal machine-specific path noise.
- Prefer dark terminal themes because most developer terminal demos use them, but check contrast.
- Do not show secrets, private paths, API keys, local usernames, or unreleased customer data.

## Content Rules

Good terminal demos show:

- a failing/painful state getting fixed
- a command turning input into output
- generated artifacts appearing
- tests/checks passing after the tool runs
- install-to-first-value in one short loop

Weak terminal demos show:

- long installation logs
- package manager noise
- multiple unrelated commands
- slow spinners
- "hello world" when the tool solves a deeper problem
- fake success without a visible artifact

## Verification Gate

Before shipping a terminal demo:

1. Re-run the scripted demo if possible.
2. Confirm commands match the README install/quickstart.
3. Check the rendered file path works from `README.md`.
4. Watch the asset at README size and confirm text is legible.
5. Confirm no secrets, private names, or misleading output appear.
