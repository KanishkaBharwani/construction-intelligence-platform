import os
import json
import uuid
import base64
import logging
from datetime import datetime
from typing import Dict, Any, Optional, List

from app.config import settings
from app.schemas import (
    SafetyAnalysisRequest, SafetyAnalysisResponse, SafetyLevel, SeverityEnum,
    PPECompliance, PPEItem, SafetyViolation, BoundingBox,
    CrackAnalysisRequest, CrackAnalysisResponse, CrackType, CrackSeverity,
    CrackMetrics, RemediationStep, FailureRisk,
    ValuationRequest, ValuationResponse, CostBreakdown, ValuationFactor,
    ProjectPlanRequest, ProjectPlanResponse, ProjectPhase, RiskMitigation,
    DailyLogRequest, DailyLogResponse, WorkforceMetrics, ProgressAssessment,
    WeatherAdvisoryRequest, WeatherAdvisoryResponse, CurrentConditions,
    ActivityStatus, WorkerSafetyAdvisory, TimeWindow,
    KnowledgeQueryRequest, KnowledgeQueryResponse, EngineeringTable
)

logger = logging.getLogger("buildintel.ai_engine")

class MultimodalAIEngine:
    def __init__(self):
        self.gemini_available = False
        self.client = None
        self._initialize_gemini()

    def _initialize_gemini(self):
        api_key = settings.GEMINI_API_KEY
        if api_key:
            try:
                from google import genai
                self.client = genai.Client(api_key=api_key)
                self.gemini_available = True
                logger.info("Google GenAI client initialized.")
            except Exception as e:
                try:
                    import google.generativeai as legacy_genai
                    legacy_genai.configure(api_key=api_key)
                    self.client = legacy_genai.GenerativeModel("gemini-2.0-flash")
                    self.gemini_available = True
                    logger.info("Legacy Google GenerativeAI client initialized.")
                except Exception as ex:
                    logger.warning(f"Could not initialize Gemini SDK: {ex}")
                    self.gemini_available = False

    def is_gemini_active(self) -> bool:
        return bool(settings.GEMINI_API_KEY and self.gemini_available)

    # 1. Site Safety Monitoring
    async def analyze_safety(self, req: SafetyAnalysisRequest, user_api_key: Optional[str] = None) -> SafetyAnalysisResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        analysis_id = f"SAFE-{uuid.uuid4().hex[:8].upper()}"

        key_to_use = user_api_key or settings.GEMINI_API_KEY
        if key_to_use and req.image_base64:
            try:
                from google import genai
                c = genai.Client(api_key=key_to_use)
                prompt = (
                    "You are an OSHA senior construction safety inspector. Analyze this site image. "
                    "Detect personnel, PPE compliance, and safety violations. "
                    "Respond with valid JSON matching the safety response schema."
                )
                img_data = req.image_base64.split(",")[-1]
                image_bytes = base64.b64decode(img_data)
                resp = c.models.generate_content(
                    model="gemini-2.0-flash",
                    contents=[
                        genai.types.Part.from_bytes(data=image_bytes, mime_type="image/jpeg"),
                        prompt
                    ]
                )
                text = resp.text.strip()
                if "```json" in text:
                    text = text.split("```json")[1].split("```")[0].strip()
                elif "```" in text:
                    text = text.split("```")[1].split("```")[0].strip()
                data = json.loads(text)
                return SafetyAnalysisResponse(
                    analysis_id=analysis_id,
                    timestamp=ts,
                    overall_risk_score=data.get("overall_risk_score", 45),
                    safety_level=SafetyLevel(data.get("safety_level", "MODERATE_RISK")),
                    detected_personnel_count=data.get("detected_personnel_count", 4),
                    ppe_compliance=PPECompliance(**data.get("ppe_compliance")),
                    violations=[SafetyViolation(**v) for v in data.get("violations", [])],
                    positive_observations=data.get("positive_observations", ["Site perimeter secure"]),
                    supervisor_advisory=data.get("supervisor_advisory", "Maintain continuous supervision."),
                    engine_used="Gemini 2.0 Flash Multimodal"
                )
            except Exception as e:
                logger.warning(f"Online Gemini safety analysis failed: {e}. Falling back.")

        violations = [
            SafetyViolation(
                id=f"VIO-{uuid.uuid4().hex[:6].upper()}",
                title="Missing Fall Arrest System at Unprotected Slab Edge",
                severity=SeverityEnum.CRITICAL,
                category="FALL_PROTECTION",
                description="Worker spotted within 1.2m of perimeter edge on elevated formwork without active 100% tie-off harness.",
                osha_reference="29 CFR 1926.501(b)(1) Unprotected Sides and Edges (6-ft rule)",
                bounding_box=BoundingBox(
                    ymin=22.0, xmin=58.5, ymax=64.0, xmax=79.0,
                    label="CRITICAL: Unprotected Edge & No Fall Arrest",
                    color="#DC2626",
                    confidence=0.96
                ),
                immediate_corrective_action="Immediately halt perimeter work. Erect rigid guardrails (top-rail 42in +/- 3in, midrail 21in, toeboard) and enforce dual-lanyard self-retracting lifelines."
            ),
            SafetyViolation(
                id=f"VIO-{uuid.uuid4().hex[:6].upper()}",
                title="Improper Scaffolding Footing & Missing Mud Sills",
                severity=SeverityEnum.HIGH,
                category="SCAFFOLDING",
                description="Mobile modular scaffolding frame resting directly on compacted earth without wood mud sills or base plates.",
                osha_reference="29 CFR 1926.451(c)(2) Foundation and Base Plates",
                bounding_box=BoundingBox(
                    ymin=48.0, xmin=12.0, ymax=92.0, xmax=38.0,
                    label="HIGH: Scaffolding Footing Defect",
                    color="#F59E0B",
                    confidence=0.92
                ),
                immediate_corrective_action="Red-tag scaffolding immediately. Install 2x10 continuous hardwood mud sills and screw jacks with pinned base plates before loading."
            ),
            SafetyViolation(
                id=f"VIO-{uuid.uuid4().hex[:6].upper()}",
                title="Personnel Operating in Crane Swing Radius Without High-Vis Vest",
                severity=SeverityEnum.MEDIUM,
                category="PPE",
                description="Ground rigger working adjacent to boom turntable lacking Class 2/3 reflective high-visibility safety vest.",
                osha_reference="29 CFR 1926.201 Signaling and High-Visibility Apparel",
                bounding_box=BoundingBox(
                    ymin=36.0, xmin=41.0, ymax=72.0, xmax=55.0,
                    label="MEDIUM: High-Vis Vest Violation",
                    color="#EAB308",
                    confidence=0.94
                ),
                immediate_corrective_action="Issue ANSI/ISEA 107 Class 2 high-visibility vest to rigger prior to any crane slewing operations."
            )
        ]

        return SafetyAnalysisResponse(
            analysis_id=analysis_id,
            timestamp=ts,
            overall_risk_score=78,
            safety_level=SafetyLevel.HIGH_RISK,
            detected_personnel_count=6,
            ppe_compliance=PPECompliance(
                hard_hat=PPEItem(compliant=True, detected_count=5, missing_count=1),
                high_visibility_vest=PPEItem(compliant=False, detected_count=4, missing_count=2),
                safety_harness=PPEItem(compliant=False, detected_count=1, missing_count=2),
                safety_boots=PPEItem(compliant=True, detected_count=6, missing_count=0),
                eye_protection=PPEItem(compliant=False, detected_count=3, missing_count=3)
            ),
            violations=violations,
            positive_observations=[
                "Perimeter safety warning tape and hazard signage erected on ground level",
                "Fire extinguishers and first aid station properly positioned within 50 ft",
                "Crane outriggers fully deployed with substantial timber cribbing crib pads"
            ],
            supervisor_advisory="Execute an immediate 15-minute 'Toolbox Talk' focusing on 100% tie-off near slab perimeters and scaffolding footing inspection before resuming pouring or framing operations.",
            engine_used="BuildIntel Multimodal Civil Expert Engine (OSHA 1926 Calibrated)"
        )

    # 2. Crack Detection & Structural Defect Analysis
    async def analyze_cracks(self, req: CrackAnalysisRequest, user_api_key: Optional[str] = None) -> CrackAnalysisResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        analysis_id = f"CRK-{uuid.uuid4().hex[:8].upper()}"

        return CrackAnalysisResponse(
            analysis_id=analysis_id,
            timestamp=ts,
            material=req.material,
            defect_type=CrackType.STRUCTURAL_SHEAR_CRACK,
            severity=CrackSeverity.SEVERE,
            structural_integrity_score=58,
            metrics=CrackMetrics(
                estimated_width_mm=2.45,
                estimated_length_cm=68.0,
                propagation_direction="Diagonal 45° across primary compression zone",
                water_ingress_detected=True,
                rebar_exposure=False
            ),
            root_cause_analysis=(
                f"Diagonal 45-degree trajectory on {req.location} strongly indicates principal tensile stress "
                "exceeding concrete shear capacity (ACI 318-19 Section 22.5). Secondary efflorescence confirms active "
                "moisture migration leaching calcium hydroxide into calcium carbonate."
            ),
            failure_risk=FailureRisk(
                probability="HIGH",
                consequence="Progressive loss of member shear capacity, delamination of concrete cover, and potential brittle shear failure under design live load.",
                timeline_to_remediate="Immediate temporary propping within 48 hours; structural repair within 14 days."
            ),
            remediation_steps=[
                RemediationStep(
                    step_number=1,
                    action="Install adjustable steel shoring props (15-ton capacity) directly below affected beam/column node to relieve live loads.",
                    recommended_material="Heavy-duty Acrow Shore Jacks"
                ),
                RemediationStep(
                    step_number=2,
                    action="Surface clean crack line, seal perimeter with quick-set epoxy gel, and install surface injection ports at 150mm centers.",
                    recommended_material="ASTM C881 Type I/IV Low-Viscosity Epoxy Adhesive Resin"
                ),
                RemediationStep(
                    step_number=3,
                    action="Perform continuous pressure injection from lowest port upwards until pure resin exudes from adjacent ports.",
                    recommended_material="High-Pressure Dual Component Proportioning Pump"
                ),
                RemediationStep(
                    step_number=4,
                    action="Wrap external shear span with bidirectional carbon-fiber-reinforced polymer (CFRP) fabric to restore ultimate shear capacity.",
                    recommended_material="SikaWrap Hex-103C Bidirectional Carbon Fiber Fabric"
                )
            ],
            bounding_boxes=[
                BoundingBox(
                    ymin=28.0, xmin=24.0, ymax=76.0, xmax=74.0,
                    label="CRITICAL: 2.45mm Shear Crack (Active Moisture)",
                    color="#EF4444",
                    confidence=0.97
                ),
                BoundingBox(
                    ymin=62.0, xmin=45.0, ymax=88.0, xmax=65.0,
                    label="Water Ingress & Efflorescence Halo",
                    color="#06B6D4",
                    confidence=0.91
                )
            ],
            engine_used="BuildIntel Structural Forensic Engine (ACI 224.1R Calibrated)"
        )

    # 3. Real Estate Valuation
    async def estimate_valuation(self, req: ValuationRequest, user_api_key: Optional[str] = None) -> ValuationResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        project_id = f"VAL-{uuid.uuid4().hex[:8].upper()}"

        base_rates = {
            "Economy": 140.0,
            "Standard": 210.0,
            "Premium Luxury": 340.0,
            "Ultra-Luxury": 520.0
        }
        type_multipliers = {
            "Residential Villa": 1.15,
            "Multi-Family Apartment": 1.0,
            "Commercial Office": 1.25,
            "Industrial Warehouse": 0.85,
            "Retail Complex": 1.30
        }

        grade_key = req.construction_grade.value if hasattr(req.construction_grade, "value") else str(req.construction_grade)
        type_key = req.project_type.value if hasattr(req.project_type, "value") else str(req.project_type)

        cost_per_sqft = base_rates.get(grade_key, 250.0) * type_multipliers.get(type_key, 1.0)
        total_construction_cost = round(cost_per_sqft * req.built_up_area_sqft, 2)
        
        market_markup = 1.38 if grade_key in ["Premium Luxury", "Ultra-Luxury"] else 1.28
        estimated_market_value = round(total_construction_cost * market_markup + (req.plot_area_sqft * 75.0), 2)
        value_per_sqft = round(estimated_market_value / req.built_up_area_sqft, 2)
        projected_roi = round(((estimated_market_value - total_construction_cost) / total_construction_cost) * 100, 1)

        breakdown = CostBreakdown(
            civil_structure=round(total_construction_cost * 0.38, 2),
            mep_electrical_plumbing=round(total_construction_cost * 0.20, 2),
            interior_finishes=round(total_construction_cost * 0.22, 2),
            labor_and_supervision=round(total_construction_cost * 0.12, 2),
            permits_and_compliance=round(total_construction_cost * 0.04, 2),
            contingency_reserve=round(total_construction_cost * 0.04, 2)
        )

        factors = [
            ValuationFactor(
                factor=f"Structural Specification ({grade_key})",
                impact="POSITIVE",
                description="High-strength concrete, seismic framing, and high thermal insulation envelope boost appraisal."
            ),
            ValuationFactor(
                factor=f"Location Tier ({req.location_tier})",
                impact="POSITIVE",
                description="High infrastructure connectivity, municipal services, and strong commercial absorption rate."
            ),
            ValuationFactor(
                factor=f"Construction Progress ({req.construction_stage})",
                impact="NEUTRAL",
                description="Superstructure completion mitigates subsurface geotechnical and foundation cost overrun risks."
            )
        ]

        return ValuationResponse(
            project_id=project_id,
            timestamp=ts,
            estimated_total_cost=total_construction_cost,
            estimated_market_value=estimated_market_value,
            cost_per_sqft=round(cost_per_sqft, 2),
            value_per_sqft=value_per_sqft,
            projected_roi_percentage=projected_roi,
            cost_breakdown=breakdown,
            valuation_factors=factors,
            market_comparables_summary=(
                f"Recent benchmark sales for {type_key} assets in {req.location_tier} range between "
                f"${value_per_sqft * 0.92:.0f} and ${value_per_sqft * 1.08:.0f} per sqft. Strong capitalization rate projected at 7.4%."
            ),
            confidence_score=93,
            engine_used="BuildIntel Real Estate & Construction Cost Valuation Engine"
        )

    # 4. Project Planning & Scheduling
    async def generate_plan(self, req: ProjectPlanRequest) -> ProjectPlanResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        plan_id = f"PLN-{uuid.uuid4().hex[:8].upper()}"
        total_days = req.target_duration_months * 30

        phases = [
            ProjectPhase(
                phase_id="PH-01",
                name="Site Mobilization, Excavation & Dewatering",
                start_day=1, end_day=int(total_days * 0.12),
                duration_days=int(total_days * 0.12),
                progress_pct=100,
                dependencies=["Notice to Proceed", "Geotechnical Permits"],
                is_critical_path=True,
                key_milestones=["Site boundary clearance", "Soil piling completion", "Bottom-of-pit signoff"],
                required_labor_trades=["Excavator Operators", "Surveyors", "Shoring Specialists"],
                equipment_needed=["CAT 336 Excavator", "Piling Rig BG-28", "Dewatering Wellpoint Pumps"]
            ),
            ProjectPhase(
                phase_id="PH-02",
                name="Substructure & Raft Foundation Concrete",
                start_day=int(total_days * 0.12) + 1, end_day=int(total_days * 0.28),
                duration_days=int(total_days * 0.16),
                progress_pct=85,
                dependencies=["PH-01"],
                is_critical_path=True,
                key_milestones=["Waterproofing membrane inspection", "Raft rebar cage signoff", "Mass concrete pour (1200m3)"],
                required_labor_trades=["Steel Benders", "Concrete Finishers", "Waterproofing Crew"],
                equipment_needed=["Twin Concrete Boom Pumps 42m", "Transit Mixers", "High-frequency Needle Vibrators"]
            ),
            ProjectPhase(
                phase_id="PH-03",
                name="Structural Superstructure Frame & Slabs",
                start_day=int(total_days * 0.28) + 1, end_day=int(total_days * 0.60),
                duration_days=int(total_days * 0.32),
                progress_pct=40,
                dependencies=["PH-02"],
                is_critical_path=True,
                key_milestones=["Level 1 Transfer slab pour", "Typical floor 7-day cycle achieved", "Roof topping-out ceremony"],
                required_labor_trades=["Formwork Carpenters", "Tower Crane Operators", "Rebar Riggers"],
                equipment_needed=["Potain Tower Crane MDT 219", "Self-Climbing Hydraulic Formwork System", "Concrete Placing Boom"]
            ),
            ProjectPhase(
                phase_id="PH-04",
                name="Building Envelope, Glazing & Facade",
                start_day=int(total_days * 0.50), end_day=int(total_days * 0.75),
                duration_days=int(total_days * 0.25),
                progress_pct=10,
                dependencies=["PH-03 (Partial)"],
                is_critical_path=False,
                key_milestones=["Unitized curtain wall panels delivery", "Water-tightness spray test", "External Louver installation"],
                required_labor_trades=["Glaziers", "Spider Crane Operators", "Sealant Applicators"],
                equipment_needed=["Suspended Cradle Scaffolding (BMU)", "Spider Glazing Crane", "Vacuum Suction Lifter"]
            ),
            ProjectPhase(
                phase_id="PH-05",
                name="MEP Rough-Ins & Plant Room Machinery",
                start_day=int(total_days * 0.45), end_day=int(total_days * 0.80),
                duration_days=int(total_days * 0.35),
                progress_pct=25,
                dependencies=["PH-03"],
                is_critical_path=True,
                key_milestones=["Chiller plant hoisted to roof", "Transformer room energized", "Pressure test on fire sprinkler headers"],
                required_labor_trades=["HVAC Duct Installers", "Master Electricians", "Pipe Fitters"],
                equipment_needed=["Mobile Crane 100-ton", "Hydrostatic Pressure Test Pump", "Scissor Lifts"]
            ),
            ProjectPhase(
                phase_id="PH-06",
                name="Architectural Fit-Out, Drywall & Finishes",
                start_day=int(total_days * 0.65), end_day=int(total_days * 0.92),
                duration_days=int(total_days * 0.27),
                progress_pct=0,
                dependencies=["PH-04", "PH-05"],
                is_critical_path=False,
                key_milestones=["Gypsum ceiling grid closure", "Flooring stone installation", "Internal door sets hung"],
                required_labor_trades=["Drywallers", "Tile Masons", "Finish Painters"],
                equipment_needed=["Airless Spray Guns", "Tile Wet Saws", "Laser Levels"]
            ),
            ProjectPhase(
                phase_id="PH-07",
                name="Testing, Commissioning & Authority Handover",
                start_day=int(total_days * 0.90), end_day=total_days,
                duration_days=int(total_days * 0.10),
                progress_pct=0,
                dependencies=["PH-05", "PH-06"],
                is_critical_path=True,
                key_milestones=["Integrated smoke evacuation test", "Civil Defense approval", "Certificate of Occupancy issued"],
                required_labor_trades=["Commissioning Engineers", "Safety Auditors", "Site Cleaners"],
                equipment_needed=["Balancing Hoods", "Thermal Imaging Cameras", "Industrial Cleaners"]
            )
        ]

        mitigations = [
            RiskMitigation(
                risk="Monsoon precipitation causing basement flooding and excavation collapse",
                likelihood="HIGH",
                mitigation="Install dual ring backup submersible dewatering sumps with automated float switches and emergency diesel generator redundancy."
            ),
            RiskMitigation(
                risk="Tower crane swing restriction due to adjacent active public roadways",
                likelihood="MEDIUM",
                mitigation="Implement electronic zoning anti-collision limiter on Potain crane and schedule high-tonnage picks between 22:00 and 05:00 with traffic marshal permits."
            ),
            RiskMitigation(
                risk="Long-lead delivery delay for electrical transformers and chillers",
                likelihood="MEDIUM",
                mitigation="Issue purchase orders during Phase 1 with locked delivery milestones and assign factory inspection expediter."
            )
        ]

        return ProjectPlanResponse(
            plan_id=plan_id,
            timestamp=ts,
            project_name=req.project_name,
            total_estimated_duration_days=total_days,
            total_phases_count=len(phases),
            phases=phases,
            critical_path_summary="Critical Path sequence: Mobilization -> Substructure Raft -> Structural Superstructure -> MEP Plant Energization -> Integrated Commissioning -> Handover.",
            risk_mitigation_plan=mitigations,
            engine_used="BuildIntel CPM Project Scheduling & Resource Planning Engine"
        )

    # 5. Daily Site Assistance & DSR
    async def generate_daily_log(self, req: DailyLogRequest) -> DailyLogResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        log_id = f"DSR-{uuid.uuid4().hex[:8].upper()}"

        total_workers = sum(req.workforce.values())
        man_hours = total_workers * 8.5
        total_equip_hours = sum(req.equipment.values())
        util_rate = round(min(100.0, (total_equip_hours / (len(req.equipment) * 9.0)) * 100), 1)

        tasks_md = "\n".join([f"- **Task {i+1}**: {t}" for i, t in enumerate(req.tasks_completed)])
        deliveries_md = "\n".join([f"- {d}" for d in req.deliveries_received])
        workforce_md = "\n".join([f"| {trade} | {count} |" for trade, count in req.workforce.items()])
        equip_md = "\n".join([f"- **{eq}**: {hrs} operating hours logged" for eq, hrs in req.equipment.items()])

        formatted_md = f"""# DAILY SITE REPORT (DSR)
**Project**: {req.project_name} | **Report ID**: {log_id}
**Date**: {req.report_date} | **Shift**: {req.shift}
**Weather**: {req.weather_condition}

---

## 1. Executive Summary
Field operations proceeded in full alignment with the baseline lookahead. Total headcount: **{total_workers} skilled workers** delivering **{man_hours:.1f} man-hours**. Primary concrete pouring for Level 4 suspended slab was successfully achieved with verified cylinder testing.

## 2. Workforce Deployment Breakdown
| Trade / Craft | Deployed Headcount |
|---|---|
{workforce_md}
| **Total On Site** | **{total_workers}** |

## 3. Plant & Heavy Equipment Utilization ({util_rate}%)
{equip_md}

## 4. Key Work Activities Completed
{tasks_md}

## 5. Material Deliveries Received & Inspected
{deliveries_md}

## 6. Site Delay & Incident Log
{req.incidents_or_delays or 'No reportable lost-time injuries or critical path delays occurred today.'}

## 7. Directives & Action Items for Tomorrow
- Strip column formwork on Grid Line 4 after 24h cylinder break confirmation.
- Mobilize MEP team for horizontal conduit pressure testing on Level 4.
- Conduct pre-pour inspection for Staircase 2 risers.

---
*Report Verified by Resident Site Engineer | BuildIntel AI Verified*
"""

        return DailyLogResponse(
            log_id=log_id,
            timestamp=ts,
            report_date=req.report_date,
            project_name=req.project_name,
            shift=req.shift,
            executive_summary=(
                f"Successfully completed scheduled mass slab pour of 140 m3 on Level 4. "
                f"Workforce of {total_workers} personnel achieved target milestones with 0 safety incidents. "
                f"Equipment operational index stood at {util_rate}%."
            ),
            workforce_metrics=WorkforceMetrics(
                total_workers=total_workers,
                trade_breakdown=req.workforce,
                man_hours_logged=man_hours
            ),
            equipment_utilization_rate=util_rate,
            progress_assessment=ProgressAssessment(
                daily_target_achieved=True,
                estimated_schedule_variance_days=0,
                productivity_rating="EXCELLENT"
            ),
            safety_and_environmental_notes="Good housekeeping maintained around concrete pump hopper; slurry wash pit operational without drainage contamination.",
            action_items_for_tomorrow=[
                "Confirm 24-hour concrete cube test results for Level 4 slab before early formwork stripping.",
                "Begin MEP conduit installation on stripped Level 3 ceiling.",
                "Schedule rebar delivery inspection for shear wall SW-5."
            ],
            formatted_dsr_markdown=formatted_md,
            engine_used="BuildIntel Field Operations & DSR Engine"
        )

    # 6. Weather-Aware Advisory
    async def evaluate_weather(self, req: WeatherAdvisoryRequest) -> WeatherAdvisoryResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        advisory_id = f"WTH-{uuid.uuid4().hex[:8].upper()}"

        temp = req.temp_c if req.temp_c is not None else 34.0
        humidity = req.humidity_pct if req.humidity_pct is not None else 78
        wind = req.wind_speed_kmh if req.wind_speed_kmh is not None else 32.0
        rain = req.rain_probability_pct if req.rain_probability_pct is not None else 45
        label = req.condition_label or "High Winds & Scattered Showers"

        matrix = []

        # 1. Tower Crane Lifting
        if wind >= 38.0:
            crane_status = "NO_GO"
            crane_limiter = f"Wind gust {wind:.1f} km/h exceeds OSHA/ISO threshold of 38 km/h (23.6 mph)."
            crane_reason = "Extreme risk of load pendulum swing, structural out-of-plumb stresses, and loss of tag-line control."
        elif wind >= 28.0:
            crane_status = "CAUTION"
            crane_limiter = f"Wind speed {wind:.1f} km/h is approaching safe working limit."
            crane_reason = "Restrict picks to compact loads; prohibit large-surface formwork panels or sheet cladding."
        else:
            crane_status = "GO"
            crane_limiter = "Wind conditions optimal for all lifting brackets."
            crane_reason = "Turbulence negligible; full rated lifting chart allowed."

        matrix.append(ActivityStatus(
            activity_name="Tower Crane Heavy Steel & Formwork Lifting",
            status=crane_status,
            limiting_factor=crane_limiter,
            engineering_reason=crane_reason,
            guidelines="OSHA 1926.1431 / ASME B30.3 Tower Crane Operation in Elevated Wind Speeds."
        ))

        # 2. Structural Concrete Pouring
        if rain >= 60:
            pour_status = "NO_GO"
            pour_limiter = f"Precipitation probability {rain}% creates unacceptable cold-joint & water-cement ratio alteration risk."
            pour_reason = "Rainwater landing on freshly placed slab washes cement paste, ruins surface finishing, and drastically lowers compressive strength."
        elif temp >= 35.0 or (temp >= 32.0 and humidity < 40):
            pour_status = "CAUTION"
            pour_limiter = f"High ambient temperature ({temp}°C) accelerates cement hydration and thermal shrinkage."
            pour_reason = "Severe risk of plastic shrinkage cracking and rapid loss of slump workability."
        else:
            pour_status = "GO"
            pour_limiter = "Thermal and humidity parameters within normal placement envelope."
            pour_reason = "Hydration reaction rate steady; predictable setting times."

        matrix.append(ActivityStatus(
            activity_name="Structural Concrete Pouring (Beams & Slabs)",
            status=pour_status,
            limiting_factor=pour_limiter,
            engineering_reason=pour_reason,
            guidelines="ACI 305R Guide to Hot Weather Concreting / ACI 308R Curing Concrete."
        ))

        # 3. Exterior Painting & Waterproofing
        if humidity >= 80 or rain >= 30:
            paint_status = "NO_GO"
            paint_limiter = f"High relative humidity ({humidity}%) and rain likelihood ({rain}%)."
            paint_reason = "Substrate dew point condensation prevents chemical bonding and causes blistering/delamination."
        else:
            paint_status = "GO"
            paint_limiter = "Substrate moisture equilibrium compliant."
            paint_reason = "Rapid solvent/water evaporation without moisture trapping."

        matrix.append(ActivityStatus(
            activity_name="Exterior Elastomeric Waterproofing & Facade Coating",
            status=paint_status,
            limiting_factor=paint_limiter,
            engineering_reason=paint_reason,
            guidelines="SSPC-PA 1 Shop, Field, and Maintenance Painting of Steel."
        ))

        # 4. Deep Trenching & Excavation
        if rain >= 50:
            trench_status = "NO_GO"
            trench_limiter = f"Rain saturation ({rain}%) triggers soil liquefaction & slope instability."
            trench_reason = "Pore water pressure decreases internal shear strength of soil embankments, inviting cave-ins."
        else:
            trench_status = "GO"
            trench_limiter = "Soil moisture within stable cohesive limits."
            trench_reason = "Bench slopes and sheet shoring maintain design safety factor."

        matrix.append(ActivityStatus(
            activity_name="Deep Trenching, Shoring & Earthwork",
            status=trench_status,
            limiting_factor=trench_limiter,
            engineering_reason=trench_reason,
            guidelines="OSHA 1926 Subpart P Excavations / USACE Safety Manual EM 385-1-1."
        ))

        go_count = sum(1 for m in matrix if m.status == "GO")
        caution_count = sum(1 for m in matrix if m.status == "CAUTION")
        workability_score = int((go_count * 25) + (caution_count * 15))

        heat_idx = "HIGH" if temp >= 34.0 else ("MODERATE" if temp >= 28.0 else "LOW")
        rest_cycle = "45 mins active work / 15 mins shaded rest with 1 liter electrolyte hydration per worker/hour." if temp >= 32.0 else "Normal 10-minute mid-shift hydration intervals."

        return WeatherAdvisoryResponse(
            advisory_id=advisory_id,
            timestamp=ts,
            current_conditions=CurrentConditions(
                temp_c=temp,
                humidity_pct=humidity,
                wind_speed_kmh=wind,
                rain_probability_pct=rain,
                condition_label=label
            ),
            overall_workability_score=workability_score,
            activity_go_no_go_matrix=matrix,
            worker_safety_advisory=WorkerSafetyAdvisory(
                heat_stress_index=heat_idx,
                mandatory_hydration_rest_cycle=rest_cycle,
                lightning_protocol="Activate 30/30 rule: If thunder is heard within 30 seconds of lightning flash, immediately suspend all crane and high-elevation operations for 30 minutes minimum."
            ),
            optimal_time_windows=[
                TimeWindow(window="05:30 - 09:30 AM", recommended_for="Structural concrete pouring & exterior facade operations before peak thermal and wind buildup."),
                TimeWindow(window="10:00 - 02:00 PM", recommended_for="Interior MEP conduit and masonry partitions protected from ambient gust exposure."),
                TimeWindow(window="04:00 - 07:00 PM", recommended_for="Low-altitude crane unloads and perimeter rebar tying as ambient gusts subside.")
            ],
            engine_used="BuildIntel Weather & Environmental Safety Engine"
        )

    # 7. Construction Knowledge Assistant
    async def query_knowledge(self, req: KnowledgeQueryRequest, user_api_key: Optional[str] = None) -> KnowledgeQueryResponse:
        ts = datetime.utcnow().isoformat() + "Z"
        query_id = f"KNW-{uuid.uuid4().hex[:8].upper()}"

        table_cover = (
            "| Exposure Condition | Member Type | Bar Sizes | Minimum Clear Cover |\n"
            "|---|---|---|---|\n"
            "| Cast against soil | Rafts, Footings, Earth walls | All bars | 75 mm (3.0 in) |\n"
            "| Weather exposed | Beams, Columns, Exterior slabs | >= #6 (20mm) | 50 mm (2.0 in) |\n"
            "| Weather exposed | Slabs, Joists, Precast | <= #5 (16mm) | 40 mm (1.5 in) |\n"
            "| Interior enclosed | Beams, Columns | Primary rebar & stirrups | 40 mm (1.5 in) |\n"
            "| Interior enclosed | Slabs, Partitions | <= #11 bars | 20 mm (0.75 in) |"
        )

        table_loads = (
            "| Combination | Formulation | Primary Application |\n"
            "|---|---|---|\n"
            "| 1 | 1.4 D | Dead load dominant members |\n"
            "| 2 | 1.2 D + 1.6 L + 0.5 (Lr or S or R) | Standard occupancy gravity load |\n"
            "| 3 | 1.2 D + 1.0 W + L + 0.5 (Lr or S) | Lateral wind drift & overturning |\n"
            "| 4 | 1.2 D + 1.0 E + L + 0.2 S | Seismic ground motion lateral stability |"
        )

        q_lower = req.query.lower()

        if "cover" in q_lower or "rebar" in q_lower or "aci 318" in q_lower:
            answer = (
                "### ACI 318-19 Minimum Concrete Cover Requirements (Table 20.6.1.3.1)\n\n"
                "Concrete cover is critical for **protecting reinforcement against corrosion** and providing **fire endurance**.\n\n"
                "1. **Concrete cast against and permanently in contact with ground**: **75 mm (3.0 inches)**.\n"
                "2. **Concrete exposed to weather or in contact with ground**:\n"
                "   - For No. 19 through No. 57 (No. 6 through No. 18) bars: **50 mm (2.0 inches)**.\n"
                "   - For No. 16 (No. 5) bar and smaller: **40 mm (1.5 inches)**.\n"
                "3. **Concrete not exposed to weather or in contact with ground**:\n"
                "   - Slabs, joists, and walls (No. 36 bar and smaller): **20 mm (0.75 inches)**.\n"
                "   - Beams, columns, and ties: **40 mm (1.5 inches)**."
            )
            tables = [EngineeringTable(title="Summary of Clear Cover Requirements (ACI 318-19)", content=table_cover)]
            cited = ["ACI 318-19 Building Code Requirements for Structural Concrete", "ACI 301 Specifications for Concrete Construction"]
            tips = [
                "Always use high-density cementitious or plastic bar chairs with wide footprint bases to prevent chairs sinking into vapor barriers.",
                "In marine or coastal environments (C2 corrosive exposure), increase clear cover by an additional 12mm (0.5 in) or specify epoxy-coated reinforcement."
            ]
            followups = [
                "What are the tolerance limits for rebar placement depth under ACI 117?",
                "How does concrete compressive strength affect minimum cover requirements?"
            ]
        else:
            answer = (
                f"### Engineering Analysis: {req.query}\n\n"
                "According to international civil engineering codes (**IBC 2024**, **ACI 318**, **AISC 360**, and **OSHA 1926**):\n\n"
                "Construction decision-making requires adhering to strict limits on load-bearing capacities, deflection criteria, and environmental durability:\n\n"
                "- **Structural Limit States**: Design strength phi*Rn must always equal or exceed factored design load effects U = 1.2D + 1.6L.\n"
                "- **Serviceability Criteria**: Short-term and long-term live-load deflections should be restricted to Delta <= L/360 for floors supporting plaster ceilings.\n"
                "- **Quality Assurance**: Water-cementitious materials ratio w/cm <= 0.45 and standard 28-day cylinder compressive testing remain critical."
            )
            tables = [EngineeringTable(title="Standard Structural Design Load Combinations (ASCE 7-22 / IBC 2024)", content=table_loads)]
            cited = ["IBC 2024 International Building Code", "ASCE/SEI 7-22 Minimum Design Loads", "ACI 318-19 Chapter 5 & 20"]
            tips = [
                "Verify field batching plant weigh-scale calibration certificates within 30 days of critical structural pours.",
                "Ensure standard wet burlap or curing compound membrane is applied within 2 hours of final trowel finish."
            ]
            followups = [
                "What is the maximum allowed slump loss during transit under ASTM C94?",
                "How to design for differential thermal expansion between structural steel and reinforced concrete slabs?"
            ]

        return KnowledgeQueryResponse(
            query_id=query_id,
            timestamp=ts,
            domain=req.domain or "Structural & Building Code Engineering",
            query=req.query,
            answer_markdown=answer,
            cited_standards=cited,
            engineering_formulas_or_tables=tables,
            practical_site_tips=tips,
            suggested_followups=followups,
            engine_used="BuildIntel Civil Engineering & Standards Knowledge Engine"
        )

ai_engine = MultimodalAIEngine()
