from fastapi import APIRouter, Header, HTTPException
from typing import Optional
from app.schemas import KnowledgeQueryRequest, KnowledgeQueryResponse
from app.services.ai_engine import ai_engine

router = APIRouter(prefix="/api/v1/knowledge", tags=["Construction Knowledge Assistant"])

@router.post("/query", response_model=KnowledgeQueryResponse)
async def query_knowledge(req: KnowledgeQueryRequest, x_gemini_api_key: Optional[str] = Header(None)):
    """Consult the civil engineering knowledge assistant for building codes, standards, and formulas."""
    try:
        return await ai_engine.query_knowledge(req, user_api_key=x_gemini_api_key)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Knowledge query failed: {str(e)}")
