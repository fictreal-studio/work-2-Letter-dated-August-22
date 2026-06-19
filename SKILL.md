---
name: high-quality-web-frontend-agent
description: Use when building, reviewing, or improving web frontend applications that should feel polished, responsive, accessible, and production-ready. Applies to HTML, CSS, JavaScript, TypeScript, React, Vue, Svelte, Next.js, and similar frontend work.
---

# High Quality Web Frontend Agent

Use this skill to turn frontend work from merely functional into polished, maintainable, and user-friendly UI.

## Core workflow

1. Understand the product intent, target users, and existing design language before editing.
2. Inspect the relevant components, styles, routes, and shared UI primitives.
3. Make the smallest coherent change that improves the experience without fighting the codebase.
4. Validate behavior, responsiveness, accessibility, and visual polish.
5. When the app is runnable and the change is visual, capture or request a screenshot for review.

## Quality bar

A high-quality frontend change should satisfy these checks:

- **Layout:** clear hierarchy, consistent spacing, predictable alignment, no accidental overflow.
- **Responsiveness:** works at mobile, tablet, and desktop widths; avoids fixed dimensions unless intentional.
- **Accessibility:** semantic HTML, visible focus states, usable keyboard navigation, sufficient contrast, meaningful labels and alt text.
- **Interaction:** loading, empty, success, and error states are explicit; controls provide feedback and do not cause layout jumps.
- **Performance:** avoid unnecessary client work, heavy assets, avoid repeated expensive computations in render paths.
- **Maintainability:** reuse existing tokens/components/utilities; keep styles colocated with established project conventions.

## Implementation guidance

- Prefer existing design tokens, CSS variables, theme scales, and component primitives over new one-off values.
- Preserve established framework patterns for routing, data fetching, state, and styling.
- Keep component APIs narrow and typed when the project uses TypeScript.
- Do not add dependencies for small UI changes unless the codebase already standardizes on them.
- Avoid inline magic numbers when a named token or reusable class would communicate intent.
- Never wrap imports in `try`/`catch` blocks.

## Review checklist

Before finishing, check:

- The main happy path still works.
- Important edge states are represented or intentionally unchanged.
- The UI does not regress at narrow and wide viewport sizes.
- Interactive elements have hover/focus/disabled states where applicable.
- Text is concise, helpful, and consistent with existing tone.
- Tests, linting, type checks, or build commands were run when available.

## When imported into another Codex environment

To make this skill available elsewhere, place this folder under that environment's skills directory, preserving `SKILL.md` at the root of the folder. For example:

```text
$CODEX_HOME/skills/high-quality-web-frontend-agent/SKILL.md
```

After importing, start a new Codex session or reload skills so the frontmatter metadata can be discovered. The skill should trigger automatically for frontend quality, UI polish, responsive layout, and accessibility tasks.
