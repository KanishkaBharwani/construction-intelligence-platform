from fastapi import APIRouter, HTTPException
from app.schemas import ProjectPlanRequest, ProjectPlanResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/planner", tags=["Construction Project Planning"])

@router.post("/generate", response_model=ProjectPlanResponse)
async def generate_project_plan(req: ProjectPlanRequest):
    """Generate multi-phase construction project schedule, Gantt milestones, and critical path."""
    try:
        return await ai_engine.generate_plan(req)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Project planning failed: {str(e)}")
