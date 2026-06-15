#!/usr/bin/env python3
"""Calculate image quality, generation eligibility, and approval status."""

from __future__ import annotations

import argparse
import json


WEIGHTS = {
    "specificity": 20,
    "narrative": 15,
    "composition": 15,
    "authenticity": 15,
    "responsive": 10,
    "technical": 10,
    "continuity": 10,
    "accessibility": 5,
}
CRITICAL = ("specificity", "narrative", "composition", "authenticity")


def bounded_score(value: str) -> float:
    score = float(value)
    if not 0 <= score <= 5:
        raise argparse.ArgumentTypeError("scores must be between 0 and 5")
    return score


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--mode", choices=("core", "arg", "corporate"), default="core")
    for name in WEIGHTS:
        parser.add_argument(f"--{name}", required=True, type=bounded_score)
    parser.add_argument("--baseline", type=float)
    parser.add_argument("--expected-gain", type=float, default=0)
    parser.add_argument("--hard-failure", action="store_true")
    parser.add_argument("--missing-required-subject", action="store_true")
    parser.add_argument("--responsive-source-failure", action="store_true")
    parser.add_argument("--alternatives-exhausted", action="store_true")
    args = parser.parse_args()

    scores = {name: getattr(args, name) for name in WEIGHTS}
    weighted = {name: round(scores[name] / 5 * weight, 2) for name, weight in WEIGHTS.items()}
    total = round(sum(weighted.values()), 2)
    baseline = args.baseline
    delta = None if baseline is None else round(total - baseline, 2)
    low_image_category = any(score <= 2 for score in scores.values())

    generation_trigger = (
        (args.hard_failure and args.alternatives_exhausted)
        or args.missing_required_subject
        or args.responsive_source_failure
        or (
            baseline is not None
            and baseline < 70
            and low_image_category
            and args.expected_gain >= 10
            and args.alternatives_exhausted
        )
    )

    critical_pass = all(scores[name] >= 4 for name in CRITICAL)
    delta_pass = (
        baseline is None
        or args.hard_failure
        or args.missing_required_subject
        or (delta is not None and delta >= 8)
    )
    approved = not args.hard_failure and total >= 80 and critical_pass and delta_pass
    status = "approved" if approved else "needs-revision" if not args.hard_failure and total >= 70 else "rejected"

    result = {
        "mode": args.mode,
        "fit_interpretation": {
            "core": "owner and content fit",
            "arg": "narrative and canon fit",
            "corporate": "business and brand fit",
        }[args.mode],
        "scores_0_to_5": scores,
        "weighted_points": weighted,
        "total_100": total,
        "baseline": baseline,
        "baseline_delta": delta,
        "generation_authorized": generation_trigger,
        "approval_status": status,
        "checks": {
            "no_hard_failure": not args.hard_failure,
            "total_at_least_80": total >= 80,
            "critical_categories_at_least_4": critical_pass,
            "baseline_delta_at_least_8_or_exception": delta_pass,
        },
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
