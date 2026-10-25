import sys, os
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from fastapi.testclient import TestClient
from app.main import app
from sample_data.samples import SAMPLE_SITE_IMAGE, SAMPLE_CRACK_IMAGE, SAMPLE_BUILDING_IMAGE

client = TestClient(app)

def test_health_check():
    """Verify system health and module availability contract."""
    resp = client.get("/health")
    assert resp.status_code == 200
    data = resp.json()
    assert data["status"] == "HEALTHY"
    assert len(data["modules_available"]) == 7
    print("[PASS] Health check endpoint passed.")

def test_site_safety_contract():
    """Verify Site Safety Monitoring strict JSON data contract."""
    payload = {
        "image_base64": SAMPLE_SITE_IMAGE,
        "zone_name": "Grid B-2 High-Rise Frame",
        "work_activities": ["Scaffolding Installation", "Steel Rebar Tying"]
    }
    resp = client.post("/api/v1/safety/analyze", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "analysis_id" in data
    assert 0 <= data["overall_risk_score"] <= 100
    assert data["safety_level"] in ["SAFE", "LOW_RISK", "MODERATE_RISK", "HIGH_RISK", "CRITICAL"]
    assert "ppe_compliance" in data
    assert "hard_hat" in data["ppe_compliance"]
    assert len(data["violations"]) > 0
    # Check bounding box schema
    first_vio = data["violations"][0]
    assert "osha_reference" in first_vio
    assert "immediate_corrective_action" in first_vio
    if first_vio.get("bounding_box"):
        bbox = first_vio["bounding_box"]
        assert 0 <= bbox["ymin"] <= 100
        assert 0 <= bbox["xmin"] <= 100
    print("[PASS] Site safety monitoring contract passed.")

def test_crack_detection_contract():
    """Verify Crack Detection & Structural Defect Analysis strict JSON contract."""
    payload = {
        "image_base64": SAMPLE_CRACK_IMAGE,
        "material": "Reinforced Concrete",
        "structure_age_years": 8,
        "location": "Spandrel Beam Node 4"
    }
    resp = client.post("/api/v1/cracks/analyze", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "analysis_id" in data
    assert data["defect_type"] in ["STRUCTURAL_SHEAR_CRACK", "HAIRLINE_CRACK", "SETTLEMENT_CRACK", "SPALLING"]
    assert 0 <= data["structural_integrity_score"] <= 100
    assert data["metrics"]["estimated_width_mm"] > 0
    assert len(data["remediation_steps"]) >= 2
    assert "failure_risk" in data
    print("[PASS] Crack detection and structural defect contract passed.")

def test_valuation_contract():
    """Verify Real Estate & Construction Valuation contract."""
    payload = {
        "built_up_area_sqft": 4200.0,
        "plot_area_sqft": 6000.0,
        "number_of_floors": 2,
        "project_type": "Residential Villa",
        "construction_grade": "Premium Luxury",
        "location_tier": "Tier 1 Prime Urban",
        "construction_stage": "Superstructure Complete",
        "image_base64": SAMPLE_BUILDING_IMAGE
    }
    resp = client.post("/api/v1/valuation/estimate", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["estimated_total_cost"] > 0
    assert data["estimated_market_value"] > data["estimated_total_cost"]
    assert data["cost_per_sqft"] > 0
    assert data["projected_roi_percentage"] > 0
    assert "cost_breakdown" in data
    assert data["cost_breakdown"]["civil_structure"] > 0
    print("[PASS] Real estate and construction valuation contract passed.")

def test_project_planning_contract():
    """Verify Construction Project Planning & CPM Scheduling contract."""
    payload = {
        "project_name": "Horizon Commercial Plaza",
        "project_type": "Commercial Office",
        "gross_sqft": 55000.0,
        "budget": 8500000.0,
        "target_duration_months": 20,
        "site_constraints": "Limited laydown area, strict municipal noise curfew 20:00-06:00"
    }
    resp = client.post("/api/v1/planner/generate", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["total_phases_count"] >= 5
    assert len(data["phases"]) == data["total_phases_count"]
    first_phase = data["phases"][0]
    assert "is_critical_path" in first_phase
    assert len(first_phase["key_milestones"]) > 0
    assert len(data["risk_mitigation_plan"]) > 0
    print("[PASS] Project planning and CPM scheduling contract passed.")

def test_daily_site_log_contract():
    """Verify Daily Site Assistance & DSR contract."""
    payload = {
        "report_date": "2026-10-25",
        "shift": "Day Shift",
        "project_name": "Metro Tower Level 6",
        "weather_condition": "Clear, 30°C",
        "workforce": {"Carpenters": 10, "Masons": 8, "Steel Fixers": 14},
        "equipment": {"Tower Crane": 8.0, "Boom Pump": 5.5},
        "tasks_completed": ["Poured 120m3 slab concrete", "Installed edge protection"],
        "deliveries_received": ["30 MT Rebar"],
        "incidents_or_delays": "None"
    }
    resp = client.post("/api/v1/daily-log/generate", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert data["workforce_metrics"]["total_workers"] == 32
    assert data["equipment_utilization_rate"] > 0
    assert "formatted_dsr_markdown" in data
    assert "# DAILY SITE REPORT (DSR)" in data["formatted_dsr_markdown"]
    print("[PASS] Daily site log and DSR contract passed.")

def test_weather_advisory_contract():
    """Verify Weather-Aware Construction Advisory contract."""
    payload = {
        "temp_c": 36.5,
        "humidity_pct": 82,
        "wind_speed_kmh": 41.0,
        "rain_probability_pct": 65,
        "condition_label": "High Wind Gale & Thunderstorm"
    }
    resp = client.post("/api/v1/weather/evaluate", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert len(data["activity_go_no_go_matrix"]) >= 4
    # Crane lifting must be NO_GO because wind 41 km/h > 38 km/h limit
    crane_act = next(a for a in data["activity_go_no_go_matrix"] if "Crane" in a["activity_name"])
    assert crane_act["status"] == "NO_GO"
    assert "worker_safety_advisory" in data
    assert len(data["optimal_time_windows"]) > 0
    print("[PASS] Weather-aware advisory and Go/No-Go matrix contract passed.")

def test_knowledge_assistant_contract():
    """Verify Construction Knowledge Assistant contract."""
    payload = {
        "query": "What are minimum concrete cover requirements according to ACI 318?",
        "domain": "Structural Concrete"
    }
    resp = client.post("/api/v1/knowledge/query", json=payload)
    assert resp.status_code == 200
    data = resp.json()
    assert "answer_markdown" in data
    assert len(data["cited_standards"]) > 0
    assert len(data["engineering_formulas_or_tables"]) > 0
    assert len(data["practical_site_tips"]) > 0
    print("[PASS] Construction knowledge assistant contract passed.")

if __name__ == "__main__":
    test_health_check()
    test_site_safety_contract()
    test_crack_detection_contract()
    test_valuation_contract()
    test_project_planning_contract()
    test_daily_site_log_contract()
    test_weather_advisory_contract()
    test_knowledge_assistant_contract()
    print("\n=======================================================")
    print("ALL 8 API CONTRACT TEST SUITES PASSED FLAWLESSLY (100%)!")
    print("=======================================================")
