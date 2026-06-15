# Delivery Package

Every final package must contain:

1. Current-state diagnosis
2. Objective and audience
3. Quality score and category breakdown
4. P0-P3 findings with IDs, evidence, owner, and status
5. Repair priority
6. Design improvement direction
7. CSS improvement direction
8. Image improvement direction
9. Japanese typography improvement direction
10. Responsive improvement direction
11. Navigation and conversion improvement direction
12. Executable Codex correction prompt
13. Release decision
14. Remaining risks and skipped checks
15. Next page or feature

The correction prompt must name the target, objective, surfaces, constraints, required behavior, findings to close, verification widths and interactions, evidence to record, and completion criteria. Do not invent an API contract.

Represent the package as JSON using snake_case names matching the fifteen items, then run `scripts/validate_delivery.py`. When no findings remain, include an explicit verified no-findings record rather than an empty list. The validator requires the correction prompt to contain labeled target, objective, constraints, required behavior, verification, and completion criteria.
