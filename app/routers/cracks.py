from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from app.schemas import CrackAnalysisRequest, CrackAnalysisResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/cracks", tags=["Crack Detection & Structural Defect Analysis"])

@router.post("/analyze", response_model=CrackAnalysisResponse)
async def analyze_cracks(req: CrackAnalysisRequest, x_gemini_api_key: Optional[str] = Header(None)):
    """Analyze structural cracks in concrete, masonry, or beams with ACI repair procedures."""
    try:
        return await ai_engine.analyze_cracks(req, user_api_key=x_gemini_api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Crack inspection failed: {str(e)}")
