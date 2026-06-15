#!/usr/bin/env python3
"""Promote one analyzed CSS candidate into the evidence catalog."""

from __future__ import annotations

import argparse
import json
from datetime import datetime, timezone
from pathlib import Path


CATEGORIES = {"token", "typography", "layout", "component", "motion", "accessibility", "project-only"}
CONFIDENCE = {"high", "medium", "low"}


def load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def next_id(entries: list[dict]) -> str:
    used = []
    for entry in entries:
        try:
            used.append(int(entry["id"].split("-", 1)[1]))
        except (KeyError, ValueError, IndexError):
            continue
    return f"CSS-{max(used, default=0) + 1:04d}"


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--inventory", required=True)
    parser.add_argument("--candidate", required=True)
    parser.add_argument("--catalog", required=True)
    parser.add_argument("--category", required=True, choices=sorted(CATEGORIES))
    parser.add_argument("--purpose", required=True)
    parser.add_argument("--context", action="append", required=True)
    parser.add_argument("--limit", action="append", required=True)
    parser.add_argument("--evidence", action="append", required=True)
    parser.add_argument("--adaptation", action="append", default=[])
    parser.add_argument("--adoption-reason", default="")
    parser.add_argument("--confidence", required=True, choices=sorted(CONFIDENCE))
    parser.add_argument("--approved-by", default="Reference / CSS Curator")
    args = parser.parse_args()

    inventory = load_json(Path(args.inventory))
    candidates = {item["id"]: item for item in inventory.get("candidates", [])}
    if args.candidate not in candidates:
        parser.error(f"Candidate not found: {args.candidate}")
    candidate = candidates[args.candidate]

    catalog_path = Path(args.catalog)
    catalog = load_json(catalog_path) if catalog_path.exists() else {"schema_version": 1, "entries": []}
    entries = catalog.setdefault("entries", [])
    if any(item.get("candidate_id") == args.candidate for item in entries):
        parser.error(f"Candidate already promoted: {args.candidate}")

    entry = {
        "id": next_id(entries),
        "candidate_id": args.candidate,
        "status": "approved",
        "category": args.category,
        "purpose": args.purpose.strip(),
        "contexts": args.context,
        "limits": args.limit,
        "evidence": args.evidence,
        "adaptations": args.adaptation,
        "adoption_reason": args.adoption_reason.strip(),
        "confidence": args.confidence,
        "approved_by": args.approved_by,
        "approved_at": datetime.now(timezone.utc).isoformat(),
        "declaration_evidence": {
            "property": candidate["property"],
            "value": candidate["value"],
            "occurrences": candidate["occurrences"],
            "source_count": candidate["source_count"]
        },
        "implementation_state": "metadata-only"
    }
    entries.append(entry)
    catalog_path.parent.mkdir(parents=True, exist_ok=True)
    catalog_path.write_text(json.dumps(catalog, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps(entry, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
