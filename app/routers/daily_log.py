from fastapi import APIRouter, HTTPException
from app.schemas import DailyLogRequest, DailyLogResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/daily-log", tags=["Daily Site Assistance & Reporting"])

@router.post("/generate", response_model=DailyLogResponse)
async def generate_daily_log(req: DailyLogRequest):
    """Compile field operations data into a structured contractor Daily Site Report (DSR)."""
    try:
        return await ai_engine.generate_daily_log(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Daily log generation failed: {str(e)}")
