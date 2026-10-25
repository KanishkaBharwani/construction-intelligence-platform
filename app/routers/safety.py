from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from app.schemas import SafetyAnalysisRequest, SafetyAnalysisResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/safety", tags=["Site Safety Monitoring"])

@router.post("/analyze", response_model=SafetyAnalysisResponse)
async def analyze_safety(req: SafetyAnalysisRequest, x_gemini_api_key: Optional[str] = Header(None)):
    """Analyze construction site imagery for PPE compliance, hazards, and OSHA violations."""
    try:
        return await ai_engine.analyze_safety(req, user_api_key=x_gemini_api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Safety analysis failed: {str(e)}")
