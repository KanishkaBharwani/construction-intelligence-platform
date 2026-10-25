from fastapi import APIRouter, HTTPException
from app.schemas import WeatherAdvisoryRequest, WeatherAdvisoryResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/weather", tags=["Weather-Aware Advisory"])

@router.post("/evaluate", response_model=WeatherAdvisoryResponse)
async def evaluate_weather(req: WeatherAdvisoryRequest):
    """Evaluate weather conditions and generate Activity Go/No-Go matrix for critical operations."""
    try:
        return await ai_engine.evaluate_weather(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Weather evaluation failed: {str(e)}")
