# Accessibility

> Use when the diff: Adds or changes UI components, pages, styles, or standalone HTML files

*Leans on: least astonishment, Fail Fast, KISS.*

Accessibility bugs rarely show up in a screenshot, so review the markup and the interaction, not just the look. Target [WCAG 2.2](https://www.w3.org/TR/WCAG22/) level AA unless the project states otherwise.

- **Semantic HTML first.** `<button>` for actions, `<a href>` for navigation, headings in order, lists as lists, a `<label>` for every input, landmarks (`<main>`, `<nav>`). A `div` with an `onClick` is a finding: keyboards and screen readers can't use it.
- **ARIA only to fill gaps.** No ARIA is better than wrong ARIA. Roles and states (`aria-expanded`, `aria-selected`) match the behavior and update with it.
- **Keyboard.** Everything interactive is reachable and usable by keyboard, in a logical order, with a visible focus indicator. Dialogs move focus in, keep it there while open, close on Escape, and return focus when closed.
- **Names and text alternatives.** Icon-only buttons have an accessible name. Images have meaningful `alt` text, or `alt=""` when decorative.
- **Color and contrast.** Text contrast of at least 4.5:1 (3:1 for large text and UI components). Meaning is never carried by color alone.
- **Dynamic content.** Errors, toasts and async results are announced through live regions or by moving focus. Form errors are linked to their fields with `aria-describedby`.
- **Motion and zoom.** Animation respects `prefers-reduced-motion`, and the layout works at 200% zoom and at 320 px wide without horizontal scrolling.
- **Tooling, then a manual pass.** `eslint-plugin-jsx-a11y` and axe in component or end-to-end tests catch part of the problems. New interactive components also get a keyboard-only pass and a quick screen reader check.
