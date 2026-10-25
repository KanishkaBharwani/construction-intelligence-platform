from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from enum import Enum
from datetime import datetime

# ==========================================
# 1. Site Safety Monitoring Contracts
# ==========================================

class SafetyLevel(str, Enum):
    SAFE = "SAFE"
    LOW_RISK = "LOW_RISK"
    MODERATE_RISK = "MODERATE_RISK"
    HIGH_RISK = "HIGH_RISK"
    CRITICAL = "CRITICAL"

class SeverityEnum(str, Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"

class BoundingBox(BaseModel):
    ymin: float = Field(..., description="Top boundary percentage 0-100")
    xmin: float = Field(..., description="Left boundary percentage 0-100")
    ymax: float = Field(..., description="Bottom boundary percentage 0-100")
    xmax: float = Field(..., description="Right boundary percentage 0-100")
    label: str = Field(..., description="Detected label or hazard")
    color: Optional[str] = Field("#EF4444", description="Hex color for box overlay")
    confidence: Optional[float] = Field(0.95, description="Detection confidence")

class PPEItem(BaseModel):
    compliant: bool
    detected_count: int
    missing_count: int

class PPECompliance(BaseModel):
    hard_hat: PPEItem
    high_visibility_vest: PPEItem
    safety_harness: PPEItem
    safety_boots: PPEItem
    eye_protection: PPEItem

class SafetyViolation(BaseModel):
    id: str
    title: str
    severity: SeverityEnum
    category: str
    description: str
    osha_reference: str
    bounding_box: Optional[BoundingBox] = None
    immediate_corrective_action: str

class SafetyAnalysisRequest(BaseModel):
    image_base64: Optional[str] = None
    zone_name: Optional[str] = "Main Structural Zone A"
    work_activities: Optional[List[str]] = ["Steel Erection", "Scaffolding Assembly", "Concrete Pouring"]

class SafetyAnalysisResponse(BaseModel):
    analysis_id: str
    timestamp: str
    overall_risk_score: int = Field(..., ge=0, le=100)
    safety_level: SafetyLevel
    detected_personnel_count: int
    ppe_compliance: PPECompliance
    violations: List[SafetyViolation]
    positive_observations: List[str]
    supervisor_advisory: str
    engine_used: str

# ==========================================
# 2. Crack & Structural Defect Contracts
# ==========================================

class CrackType(str, Enum):
    HAIRLINE_CRACK = "HAIRLINE_CRACK"
    STRUCTURAL_SHEAR_CRACK = "STRUCTURAL_SHEAR_CRACK"
    SETTLEMENT_CRACK = "SETTLEMENT_CRACK"
    SPALLING = "SPALLING"
    CRAZING = "CRAZING"
    EFFLORESCENCE = "EFFLORESCENCE"
    CORROSION_STAINING = "CORROSION_STAINING"

class CrackSeverity(str, Enum):
    NEGLIGIBLE = "NEGLIGIBLE"
    MONITOR_ONLY = "MONITOR_ONLY"
    MODERATE = "MODERATE"
    SEVERE = "SEVERE"
    IMMINENT_HAZARD = "IMMINENT_HAZARD"

class CrackMetrics(BaseModel):
    estimated_width_mm: float
    estimated_length_cm: float
    propagation_direction: str
    water_ingress_detected: bool
    rebar_exposure: bool

class RemediationStep(BaseModel):
    step_number: int
    action: str
    recommended_material: str

class FailureRisk(BaseModel):
    probability: str
    consequence: str
    timeline_to_remediate: str

class CrackAnalysisRequest(BaseModel):
    image_base64: Optional[str] = None
    material: str = "Reinforced Concrete"
    structure_age_years: int = 5
    location: str = "Exterior Structural Column"

class CrackAnalysisResponse(BaseModel):
    analysis_id: str
    timestamp: str
    material: str
    defect_type: CrackType
    severity: CrackSeverity
    structural_integrity_score: int = Field(..., ge=0, le=100)
    metrics: CrackMetrics
    root_cause_analysis: str
    failure_risk: FailureRisk
    remediation_steps: List[RemediationStep]
    bounding_boxes: List[BoundingBox]
    engine_used: str

# ==========================================
# 3. Real Estate Valuation Contracts
# ==========================================

class ProjectType(str, Enum):
    RESIDENTIAL_VILLA = "Residential Villa"
    MULTI_FAMILY_APARTMENT = "Multi-Family Apartment"
    COMMERCIAL_OFFICE = "Commercial Office"
    INDUSTRIAL_WAREHOUSE = "Industrial Warehouse"
    RETAIL_COMPLEX = "Retail Complex"

class ConstructionGrade(str, Enum):
    ECONOMY = "Economy"
    STANDARD = "Standard"
    PREMIUM_LUXURY = "Premium Luxury"
    ULTRA_LUXURY = "Ultra-Luxury"

class CostBreakdown(BaseModel):
    civil_structure: float
    mep_electrical_plumbing: float
    interior_finishes: float
    labor_and_supervision: float
    permits_and_compliance: float
    contingency_reserve: float

class ValuationFactor(BaseModel):
    factor: str
    impact: str  # POSITIVE, NEUTRAL, NEGATIVE
    description: str

class ValuationRequest(BaseModel):
    built_up_area_sqft: float = 3500.0
    plot_area_sqft: float = 5000.0
    number_of_floors: int = 2
    project_type: ProjectType = ProjectType.RESIDENTIAL_VILLA
    construction_grade: ConstructionGrade = ConstructionGrade.PREMIUM_LUXURY
    location_tier: str = "Tier 1 Prime Urban"
    construction_stage: str = "Superstructure Complete"
    image_base64: Optional[str] = None

class ValuationResponse(BaseModel):
    project_id: str
    timestamp: str
    estimated_total_cost: float
    estimated_market_value: float
    cost_per_sqft: float
    value_per_sqft: float
    projected_roi_percentage: float
    cost_breakdown: CostBreakdown
    valuation_factors: List[ValuationFactor]
    market_comparables_summary: str
    confidence_score: int = Field(..., ge=0, le=100)
    engine_used: str

# ==========================================
# 4. Project Planning & Scheduling Contracts
# ==========================================

class ProjectPhase(BaseModel):
    phase_id: str
    name: str
    start_day: int
    end_day: int
    duration_days: int
    progress_pct: int
    dependencies: List[str]
    is_critical_path: bool
    key_milestones: List[str]
    required_labor_trades: List[str]
    equipment_needed: List[str]

class RiskMitigation(BaseModel):
    risk: str
    likelihood: str
    mitigation: str

class ProjectPlanRequest(BaseModel):
    project_name: str = "Skyline Heights Residential Tower"
    project_type: str = "Multi-Family Residential"
    gross_sqft: float = 45000.0
    budget: float = 6500000.0
    target_duration_months: int = 18
    site_constraints: Optional[str] = "Dense urban area, limited crane swing zone, monsoon season in months 5-7"

class ProjectPlanResponse(BaseModel):
    plan_id: str
    timestamp: str
    project_name: str
    total_estimated_duration_days: int
    total_phases_count: int
    phases: List[ProjectPhase]
    critical_path_summary: str
    risk_mitigation_plan: List[RiskMitigation]
    engine_used: str

# ==========================================
# 5. Daily Site Assistance & DSR Contracts
# ==========================================

class WorkforceMetrics(BaseModel):
    total_workers: int
    trade_breakdown: Dict[str, int]
    man_hours_logged: float

class ProgressAssessment(BaseModel):
    daily_target_achieved: bool
    estimated_schedule_variance_days: int
    productivity_rating: str  # EXCELLENT, ON_TRACK, BEHIND_TARGET

class DailyLogRequest(BaseModel):
    report_date: str = "2026-10-25"
    shift: str = "Day Shift (07:00 - 16:00)"
    project_name: str = "Apex Commercial Center"
    weather_condition: str = "Clear, 28°C, Wind 12 km/h"
    workforce: Dict[str, int] = {
        "Civil Carpenters": 8,
        "Steel Fixers": 12,
        "Masons": 6,
        "MEP Technicians": 5,
        "General Laborers": 15,
        "Equipment Operators": 4,
        "Site Engineers": 3
    }
    equipment: Dict[str, float] = {
        "Tower Crane #1": 7.5,
        "Concrete Boom Pump": 6.0,
        "Excavator CAT 320": 8.0,
        "Diesel Generator 125kVA": 9.0
    }
    tasks_completed: List[str] = [
        "Poured 140 m3 M35 concrete for Level 4 suspended slab (Grid C1-F4)",
        "Tied reinforcing steel for shear walls SW-3 and SW-4",
        "Installed electrical conduit piping for Level 3 ceiling slab",
        "Completed formwork stripping on Level 2 perimeter columns"
    ]
    deliveries_received: List[str] = [
        "28 MT Grade 60 TMT Rebar (16mm & 20mm)",
        "300 bags Ordinary Portland Cement 53-Grade",
        "12 Bundles PVC Electrical Conduit Pipes"
    ]
    incidents_or_delays: Optional[str] = "Ready-mix truck #4 delayed by 40 mins due to traffic; no cold joint formed."
    photo_base64: Optional[str] = None

class DailyLogResponse(BaseModel):
    log_id: str
    timestamp: str
    report_date: str
    project_name: str
    shift: str
    executive_summary: str
    workforce_metrics: WorkforceMetrics
    equipment_utilization_rate: float
    progress_assessment: ProgressAssessment
    safety_and_environmental_notes: str
    action_items_for_tomorrow: List[str]
    formatted_dsr_markdown: str
    engine_used: str

# ==========================================
# 6. Weather-Aware Advisory Contracts
# ==========================================

class CurrentConditions(BaseModel):
    temp_c: float
    humidity_pct: int
    wind_speed_kmh: float
    rain_probability_pct: int
    condition_label: str

class ActivityStatus(BaseModel):
    activity_name: str
    status: str  # GO, CAUTION, NO_GO
    limiting_factor: str
    engineering_reason: str
    guidelines: str

class WorkerSafetyAdvisory(BaseModel):
    heat_stress_index: str
    mandatory_hydration_rest_cycle: str
    lightning_protocol: str

class TimeWindow(BaseModel):
    window: str
    recommended_for: str

class WeatherAdvisoryRequest(BaseModel):
    temp_c: Optional[float] = 34.0
    humidity_pct: Optional[int] = 78
    wind_speed_kmh: Optional[float] = 32.0
    rain_probability_pct: Optional[int] = 45
    condition_label: Optional[str] = "Scattered Thunderstorms & High Gusts"
    scheduled_activities: Optional[List[str]] = [
        "Tower Crane Heavy Steel Lifting",
        "Structural Concrete Pouring Level 5",
        "Exterior Facade Silicone Caulking",
        "Deep Basement Trenching & Shoring"
    ]

class WeatherAdvisoryResponse(BaseModel):
    advisory_id: str
    timestamp: str
    current_conditions: CurrentConditions
    overall_workability_score: int = Field(..., ge=0, le=100)
    activity_go_no_go_matrix: List[ActivityStatus]
    worker_safety_advisory: WorkerSafetyAdvisory
    optimal_time_windows: List[TimeWindow]
    engine_used: str

# ==========================================
# 7. Construction Knowledge Assistant Contracts
# ==========================================

class EngineeringTable(BaseModel):
    title: str
    content: str

class KnowledgeQueryRequest(BaseModel):
    query: str = "What are the minimum concrete cover requirements for cast-in-place concrete exposed to earth according to ACI 318?"
    domain: Optional[str] = "Structural Concrete & Materials"
    image_base64: Optional[str] = None

class KnowledgeQueryResponse(BaseModel):
    query_id: str
    timestamp: str
    domain: str
    query: str
    answer_markdown: str
    cited_standards: List[str]
    engineering_formulas_or_tables: List[EngineeringTable]
    practical_site_tips: List[str]
    suggested_followups: List[str]
    engine_used: str

# ==========================================
# Health & Status Contracts
# ==========================================

class HealthStatus(BaseModel):
    status: str
    version: str
    environment: str
    gemini_configured: bool
    active_engine: str
    modules_available: List[str]
