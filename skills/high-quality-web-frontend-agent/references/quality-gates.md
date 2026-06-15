# Quality Gates

Use [web-quality-rubric.md](web-quality-rubric.md) as the scoring authority.

## Evidence Gate
The input contract, selected mode, facts, assumptions, scope, acceptance criteria, reference provenance, and asset rights are recorded.

## Direction Gate
The owner-specific thesis, three to five principles, role colors, typography, spacing, grid, surfaces, imagery, motion, Japanese line-breaking intent, responsive hierarchy, and mode-specific criteria are approved.

Reject directions that are merely clean, safe, trendy, or technically competent. Require a visual proposition that explains why the composition, typography, imagery, and details belong to this owner and could not be transferred unchanged to another project.

## Implementation Gate
Semantic structure, one clear `main`, heading order, skip link, named controls, visible focus, image alternatives, stable hooks, local links, and replaceable demo logic are present.

## Rendered Evaluation Gate
Inspect 320, 375, 768, 1024, and 1440 CSS pixels plus widths immediately around prominent heading line-count changes. Check overflow, crop, navigation density, reading order, keyboard operation, menu selection and Escape behavior, focus restoration, reduced motion, links, images, console, landmarks, names, alt text, and performance symptoms.

For Japanese text, verify readable measure near 35-45 full-width characters where practical, paragraph rhythm, strict line breaking, phrase grouping, production and fallback fonts, orphan characters, isolated punctuation, proper names, dates, accidental final lines, clipping, and fixed-height containers.

Score Design Core independently using [design-excellence-rubric.md](design-excellence-rubric.md). Inspect the first viewport and a content-heavy section at mobile and desktop. A clean but conventional result is 3/5, not 4/5. Record what creates or fails to create owner specificity, hierarchy, editorial rhythm, graphic language, responsive authorship, and finish.

## Release Gate
Record total score, release decision, open findings, skipped checks, remaining risks, and human review of brand specificity, visual hierarchy, typography, and mode-specific naturalness. P0 and P1 must be verified closed. Deliver the complete package defined in [delivery-package.md](delivery-package.md).
