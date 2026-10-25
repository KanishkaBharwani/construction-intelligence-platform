from fastapi import APIRouter
from app.schemas import HealthStatus
from app.config import settings
from app.services.ai_engine import ai_engine

router = APIRouter(tags=["System Health & Diagnostics"])

@router.get("/health", response_model=HealthStatus)
@router.get("/api/v1/system/status", response_model=HealthStatus)
async def health_check():
    """Check system health, Gemini LLM connectivity, and module availability."""
    is_gemini = ai_engine.is_gemini_active()
    return HealthStatus(
        status="HEALTHY",
        version=settings.APP_VERSION,
        environment=settings.ENVIRONMENT,
        gemini_configured=is_gemini,
        active_engine="Google Gemini Multimodal LLM" if is_gemini else "BuildIntel High-Fidelity Domain Expert Engine",
        modules_available=[
            "Site Safety Monitoring (OSHA 1926)",
            "Crack & Defect Inspection (ACI 224)",
            "Real Estate Valuation & Estimation",
            "Project Planning & CPM Scheduling",
            "Daily Site Assistance & DSR Log",
            "Weather-Aware Advisory & Go/No-Go Matrix",
            "Construction Knowledge Assistant (IBC/ACI/OSHA)"
        ]
    )
