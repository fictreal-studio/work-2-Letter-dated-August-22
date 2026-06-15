import importlib.util
import unittest
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]


def load(name):
    spec = importlib.util.spec_from_file_location(name, ROOT / "scripts" / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


score_web = load("score_web")
validate_delivery = load("validate_delivery")
select_mode = load("select_mode")


def payload(value=5):
    return {
        "mode": "core",
        "scores": {name: value for name in score_web.WEIGHTS},
        "findings": [],
        "checks": {name: True for name in score_web.REQUIRED_CHECKS},
    }


class ScoreWebTests(unittest.TestCase):
    def test_release_ready(self):
        self.assertEqual(score_web.score(payload())["release_decision"], "Release Ready")

    def test_p1_forces_not_releasable(self):
        data = payload()
        data["findings"] = [{"id": "REV-001", "severity": "P1", "status": "fixed"}]
        self.assertEqual(score_web.score(data)["release_decision"], "Not Releasable")

    def test_verified_p1_does_not_block(self):
        data = payload()
        data["findings"] = [{"id": "REV-001", "severity": "P1", "status": "verified"}]
        self.assertEqual(score_web.score(data)["release_decision"], "Release Ready")

    def test_missing_check_is_conditional(self):
        data = payload()
        del data["checks"]["fallback_font"]
        self.assertEqual(score_web.score(data)["release_decision"], "Conditional Release")

    def test_score_boundaries(self):
        self.assertEqual(score_web.score(payload(3))["release_decision"], "Needs Revision")
        self.assertEqual(score_web.score(payload(4))["release_decision"], "Conditional Release")
        self.assertEqual(score_web.score(payload(4.5))["release_decision"], "Release Ready")

    def test_failed_required_check_forces_not_releasable(self):
        data = payload()
        data["checks"]["keyboard"] = False
        self.assertEqual(score_web.score(data)["release_decision"], "Not Releasable")

    def test_high_total_does_not_hide_weak_design(self):
        data = payload(5)
        data["scores"]["art_direction_owner_specificity"] = 2.5
        self.assertEqual(score_web.score(data)["release_decision"], "Needs Revision")

    def test_strong_but_not_excellent_design_is_conditional(self):
        data = payload(5)
        for name in score_web.DESIGN_CORE:
            data["scores"][name] = 3.8
        self.assertEqual(score_web.score(data)["release_decision"], "Conditional Release")

    def test_design_core_is_reported(self):
        result = score_web.score(payload(5))
        self.assertEqual(result["design_core_score"], 60)
        self.assertEqual(result["minimum_design_category_score"], 5)


class DeliveryTests(unittest.TestCase):
    def test_complete_package(self):
        package = {name: "complete" for name in validate_delivery.REQUIRED_FIELDS}
        package["quality_score"] = 90
        package["findings"] = [{"id": "NONE", "status": "verified"}]
        package["release_decision"] = "Release Ready"
        package["codex_correction_prompt"] = "Target. Objective. Constraints. Required behavior. Verification. Completion criteria."
        self.assertTrue(validate_delivery.validate(package)["valid"])

    def test_incomplete_prompt_fails(self):
        package = {name: "complete" for name in validate_delivery.REQUIRED_FIELDS}
        package["quality_score"] = 80
        package["findings"] = [{}]
        package["release_decision"] = "Conditional Release"
        package["codex_correction_prompt"] = "Fix it."
        self.assertFalse(validate_delivery.validate(package)["valid"])


class ModeTests(unittest.TestCase):
    def test_core(self):
        self.assertEqual(select_mode.select("Improve this landing page layout")["mode"], "core")

    def test_arg(self):
        self.assertEqual(select_mode.select("Build a fictional ARG from story canon and clues")["mode"], "arg")

    def test_corporate(self):
        self.assertEqual(select_mode.select("Audit a company recruitment site and inquiry CTA")["mode"], "corporate")

    def test_mixed(self):
        self.assertEqual(select_mode.select("A fictional company ARG needs a corporate inquiry path")["mode"], "mixed")


if __name__ == "__main__":
    unittest.main()
