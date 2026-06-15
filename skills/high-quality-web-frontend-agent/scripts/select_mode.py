#!/usr/bin/env python3
"""Suggest Core, ARG, Corporate, or mixed mode from a task brief."""

from __future__ import annotations

import argparse
import json


ARG_TERMS = {"arg", "canon", "scenario", "clue", "spoiler", "discovery level", "character voice", "fictional", "story"}
CORPORATE_TERMS = {"company", "corporate", "business", "recruitment", "inquiry", "conversion", "cta", "seo", "competitor", "proposal"}


def select(text: str) -> dict:
    normalized = text.lower()
    arg_matches = sorted(term for term in ARG_TERMS if term in normalized)
    corporate_matches = sorted(term for term in CORPORATE_TERMS if term in normalized)
    if arg_matches and corporate_matches:
        mode = "mixed"
    elif arg_matches:
        mode = "arg"
    elif corporate_matches:
        mode = "corporate"
    else:
        mode = "core"
    return {"mode": mode, "arg_evidence": arg_matches, "corporate_evidence": corporate_matches}


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("brief")
    args = parser.parse_args()
    print(json.dumps(select(args.brief), ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

