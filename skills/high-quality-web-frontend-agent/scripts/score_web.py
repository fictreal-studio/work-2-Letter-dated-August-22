#!/usr/bin/env python3
"""Score website quality and enforce release decision rules."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


WEIGHTS = {
    "art_direction_owner_specificity": 14,
    "composition_visual_hierarchy": 12,
    "typography_editorial_rhythm": 10,
    "imagery_graphic_language": 8,
    "responsive_art_direction": 8,
    "detail_finish": 8,
    "trust_content_clarity": 8,
    "information_architecture_navigation": 7,
    "accessibility_interaction": 8,
    "css_maintainability": 5,
    "performance_operational_finish": 5,
    "release_readiness": 7,
}
DESIGN_CORE = tuple(list(WEIGHTS)[:6])
REQUIRED_CHECKS = {
    "viewport_320",
    "viewport_375",
    "viewport_768",
    "viewport_1024",
    "viewport_1440",
    "keyboard",
    "focus",
    "reduced_motion",
    "links",
    "console",
    "accessibility_structure",
    "production_font",
    "fallback_font",
}
STATUSES = {"open", "accepted", "fixed", "verified", "deferred"}
SEVERITIES = {"P0", "P1", "P2", "P3"}


def load_payload(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def validate(payload: dict) -> list[str]:
    errors = []
    scores = payload.get("scores", {})
    for name in WEIGHTS:
        value = scores.get(name)
        if not isinstance(value, (int, float)) or isinstance(value, bool) or not 0 <= value <= 5:
            errors.append(f"scores.{name} must be a number from 0 to 5")
    for index, finding in enumerate(payload.get("findings", [])):
        if finding.get("severity") not in SEVERITIES:
            errors.append(f"findings[{index}].severity must be P0-P3")
        if finding.get("status") not in STATUSES:
            errors.append(f"findings[{index}].status is invalid")
    checks = payload.get("checks", {})
    for name, value in checks.items():
        if not isinstance(value, bool):
            errors.append(f"checks.{name} must be boolean")
    return errors


def score(payload: dict) -> dict:
    errors = validate(payload)
    if errors:
        raise ValueError("; ".join(errors))

    scores = payload["scores"]
    points = {name: round(scores[name] / 5 * weight, 2) for name, weight in WEIGHTS.items()}
    total = round(sum(points.values()), 2)
    design_points = round(sum(points[name] for name in DESIGN_CORE), 2)
    design_scores = {name: scores[name] for name in DESIGN_CORE}
    minimum_design_score = min(design_scores.values())
    findings = payload.get("findings", [])
    blocking = [
        item for item in findings
        if item["severity"] in {"P0", "P1"} and item["status"] != "verified"
    ]
    material_p2 = [
        item for item in findings
        if item["severity"] == "P2" and item["status"] in {"open", "accepted", "fixed"}
    ]
    checks = payload.get("checks", {})
    missing_checks = sorted(REQUIRED_CHECKS - checks.keys())
    failed_checks = sorted(name for name in REQUIRED_CHECKS if checks.get(name) is False)
    critical_checks_complete = not missing_checks and not failed_checks

    if blocking or total < 60 or failed_checks:
        decision = "Not Releasable"
    elif total < 80 or material_p2 or minimum_design_score < 3:
        decision = "Needs Revision"
    elif (
        total < 90
        or missing_checks
        or design_points < 51
        or minimum_design_score < 4
    ):
        decision = "Conditional Release"
    else:
        decision = "Release Ready"

    if decision == "Conditional Release" and (
        design_points < 45 or minimum_design_score < 3.5
    ):
        decision = "Needs Revision"

    return {
        "mode": payload.get("mode", "core"),
        "weighted_points": points,
        "total_score": total,
        "design_core_score": design_points,
        "design_core_max": 60,
        "design_category_scores": design_scores,
        "minimum_design_category_score": minimum_design_score,
        "release_decision": decision,
        "blocking_findings": [item.get("id", "unidentified") for item in blocking],
        "material_p2_findings": [item.get("id", "unidentified") for item in material_p2],
        "missing_required_checks": missing_checks,
        "failed_required_checks": failed_checks,
        "critical_checks_complete": critical_checks_complete,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="JSON evidence file")
    args = parser.parse_args()
    try:
        result = score(load_payload(Path(args.input)))
    except (OSError, json.JSONDecodeError, ValueError) as error:
        parser.error(str(error))
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
