# Web Quality Rubric

Score observable rendered evidence from 0 to 100. Safety and correctness are mandatory gates, while visual design determines whether the result reaches a genuinely high standard. Read [design-excellence-rubric.md](design-excellence-rubric.md) before scoring.

| Category | Weight |
| --- | ---: |
| Art Direction And Owner Specificity | 14 |
| Composition And Visual Hierarchy | 12 |
| Typography And Editorial Rhythm | 10 |
| Imagery And Graphic Language | 8 |
| Responsive Art Direction | 8 |
| Detail And Finish | 8 |
| Trust And Content Clarity | 8 |
| Information Architecture And Navigation | 7 |
| Accessibility And Interaction | 8 |
| CSS Maintainability | 5 |
| Performance And Operational Finish | 5 |
| Release Readiness | 7 |

## Release Decision
- **Release Ready:** 90-100, no open P0/P1, all required checks complete, Design Core at least 51/60, and every Design Core category at least 4/5.
- **Conditional Release:** 80-89, no open P0/P1, Design Core at least 45/60, and no Design Core category below 3.5/5.
- **Needs Revision:** 60-79, or material P2 issues prevent the intended quality level.
- **Not Releasable:** below 60, any open P0/P1, broken essential flow, serious disclosure, or missing critical evidence.

## Severity
- **P0:** publication blocker, experience destruction, dangerous misrepresentation, or major information/spoiler leak.
- **P1:** major trust, navigation, responsive, accessibility, content, or conversion failure.
- **P2:** clear visual, maintainability, readability, or localized usability problem.
- **P3:** optional improvement with a documented benefit.

## Structured Evidence

Run `scripts/score_web.py` with a JSON object containing `mode`, `scores`, `findings`, and `checks`. Category scores use 0-5. Findings require `id`, `severity`, and `status`. Design Core is calculated from the first six categories. Required boolean checks are the five viewports, keyboard, focus, reduced motion, links, console, accessibility structure, production font, and fallback font.

An unverified P0/P1 or a failed required check forces `Not Releasable`. Missing required checks limit the decision to `Conditional Release`. Open P2 findings and weak Design Core prevent Release Ready. Functional correctness never compensates for generic or under-resolved design.
