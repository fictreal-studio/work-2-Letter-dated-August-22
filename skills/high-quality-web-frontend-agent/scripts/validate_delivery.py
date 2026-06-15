#!/usr/bin/env python3
"""Validate the structured high-quality web delivery package."""

from __future__ import annotations

import argparse
import json
from pathlib import Path


REQUIRED_FIELDS = (
    "current_state_diagnosis",
    "objective_and_audience",
    "quality_score",
    "findings",
    "repair_priority",
    "design_direction",
    "css_direction",
    "image_direction",
    "japanese_typography_direction",
    "responsive_direction",
    "navigation_direction",
    "codex_correction_prompt",
    "release_decision",
    "remaining_risks",
    "next_page_or_feature",
)
PROMPT_MARKERS = (
    "target",
    "objective",
    "constraints",
    "required behavior",
    "verification",
    "completion criteria",
)
DECISIONS = {"Release Ready", "Conditional Release", "Needs Revision", "Not Releasable"}


def nonempty(value: object) -> bool:
    if isinstance(value, str):
        return bool(value.strip())
    if isinstance(value, (list, dict)):
        return bool(value)
    return value is not None


def validate(package: dict) -> dict:
    missing = [name for name in REQUIRED_FIELDS if not nonempty(package.get(name))]
    prompt = str(package.get("codex_correction_prompt", "")).lower()
    missing_prompt_markers = [marker for marker in PROMPT_MARKERS if marker not in prompt]
    score = package.get("quality_score")
    errors = []
    if not isinstance(score, (int, float)) or isinstance(score, bool) or not 0 <= score <= 100:
        errors.append("quality_score must be a number from 0 to 100")
    if package.get("release_decision") not in DECISIONS:
        errors.append("release_decision is invalid")
    findings = package.get("findings")
    if not isinstance(findings, list) or not findings:
        errors.append("findings must be a non-empty list, including an explicit no-findings record when applicable")
    valid = not missing and not missing_prompt_markers and not errors
    return {
        "valid": valid,
        "missing_fields": missing,
        "missing_prompt_markers": missing_prompt_markers,
        "errors": errors,
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("input", help="Delivery package JSON")
    args = parser.parse_args()
    try:
        package = json.loads(Path(args.input).read_text(encoding="utf-8-sig"))
    except (OSError, json.JSONDecodeError) as error:
        parser.error(str(error))
    result = validate(package)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["valid"] else 1


if __name__ == "__main__":
    raise SystemExit(main())

