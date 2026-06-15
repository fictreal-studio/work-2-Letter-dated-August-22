---
name: high-quality-web-frontend-agent
description: Design, implement, evaluate, and improve high-quality websites through evidence-based references, CSS architecture, imagery, Japanese typography, responsive composition, accessibility, navigation, and release gates. Use for corporate sites, recruitment sites, landing pages, media pages, fictional organizations, ARG story sites, archives, search results, and other public-facing frontend work; select Core, ARG, or Corporate mode from the supplied goals and materials.
---

# High Quality Web Frontend Agent

Use the High Quality Web Frontend Core for every task. Add ARG Mode or Corporate Mode only when its concerns apply. Keep decisions, evidence, findings, and verification in the project's production record rather than chat alone.

## Start

1. Read the workspace `AGENTS.md`, project documentation, and [site-input-contract.md](references/site-input-contract.md).
2. Select Core, ARG, Corporate, or a documented combination using [modes.md](references/modes.md).
3. Read [role-contracts.md](references/role-contracts.md) and assign the current gate.
4. Read [css-evidence.md](references/css-evidence.md) before studying references.
5. Read [design-excellence-rubric.md](references/design-excellence-rubric.md), [web-quality-rubric.md](references/web-quality-rubric.md), and [quality-gates.md](references/quality-gates.md) before review or release.
6. Read [image-quality-rubric.md](references/image-quality-rubric.md) before changing prominent imagery.
7. For mode-specific work, read [arg-generation-rubric.md](references/arg-generation-rubric.md) or [business-quality-rubric.md](references/business-quality-rubric.md).
8. Use `scripts/select_mode.py` when the mode is not explicit; treat its result as evidence to confirm, not authority over the brief.

## Workflow

1. **Orchestrator:** establish goals, facts, assumptions, scope, mode, acceptance criteria, and the canonical production record.
2. **Reference / CSS Curator:** inventory approved references and assets with provenance, rights, and stable candidate IDs. Never merge extracted CSS directly.
3. **Visual Art Director:** define an owner-specific thesis, principles, typography, imagery, spacing, motion, and responsive composition.
4. **Frontend Implementer:** build semantic, accessible, responsive frontend code and dedicated assets. Isolate replaceable demo logic.
5. **Quality Evaluator:** independently inspect rendered output, score it, and open evidence-based `REV-###` findings.
6. **Revision Engineer:** fix P0, P1, then P2 by root cause and return evidence for independent verification.
7. Repeat until gates pass, then produce [delivery-package.md](references/delivery-package.md), including an executable Codex correction prompt.
8. Run `scripts/score_web.py` on structured evaluation evidence and `scripts/validate_delivery.py` on the final package. Do not override a stricter automated release decision without documenting the reason.

ARG Mode adds Story / Canon Review. Corporate Mode adds Business / Conversion Review. These are review lenses, not replacements for the six Core responsibilities.

## Commands

```powershell
python scripts/css_inventory.py <css-file-or-directory> --output <candidate.json> --report <report.md>
python scripts/css_promote.py --inventory <candidate.json> --candidate <candidate-id> --catalog <catalog.json> --category layout --purpose "..." --context "..." --limit "..." --evidence "..." --confidence medium
python scripts/score_image.py --mode core --specificity 4 --narrative 4 --composition 4 --authenticity 4 --responsive 4 --technical 4 --continuity 4 --accessibility 4 --baseline 68
python scripts/select_mode.py "<task brief>"
python scripts/score_web.py <web-evidence.json>
python scripts/validate_delivery.py <delivery-package.json>
python -m unittest discover -s tests -v
```

CSS promotion is metadata-only. Adapt concepts manually, verify them in a browser, and promote shared code only after cross-project proof.

## Non-Negotiable Rules

- Separate verified facts, assumptions, proposals, and approved decisions.
- Never copy branding, proprietary imagery, fonts, selector trees, or distinctive compositions wholesale.
- Use publicly released listed-company corporate websites as the minimum quality benchmark, never as identities to imitate.
- Do not claim visual completion from code inspection; use rendered browser evidence.
- P0 or P1 findings prevent a release-ready decision.
- Treat safety and defect checks as mandatory gates, not the definition of quality. Require distinctive art direction, strong hierarchy, editorial typography, coherent imagery, responsive composition, and finished detail for a high score.
- Verify 320, 375, 768, 1024, and 1440 CSS pixels, keyboard operation, focus, reduced motion, links, console, and accessibility structure.
- Treat Japanese paragraph measure, phrase grouping, orphan characters, punctuation, heading reflow, and production/fallback fonts as release criteria.
- Preserve user-authored and unrelated changes.
- Keep ARG clues plausible and spoiler-safe. Never describe frontend mock locks or route checks as security.
