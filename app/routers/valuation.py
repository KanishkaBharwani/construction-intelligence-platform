from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from app.schemas import ValuationRequest, ValuationResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/valuation", tags=["Real Estate & Construction Valuation"])

@router.post("/estimate", response_model=ValuationResponse)
async def estimate_valuation(req: ValuationRequest, x_gemini_api_key: Optional[str] = Header(None)):
    """Generate comprehensive construction cost estimation and real estate market valuation."""
    try:
        return await ai_engine.estimate_valuation(req, user_api_key=x_gemini_api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Valuation calculation failed: {str(e)}")
