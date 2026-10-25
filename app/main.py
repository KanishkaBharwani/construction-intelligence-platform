import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from app.config import settings
from app.routers import (
    safety, cracks, valuation, planner,
    daily_log, weather, knowledge, health
)

# Configure logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(name)s: %(message)s")
logger = logging.getLogger("buildintel.main")

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="Multimodal Artificial Intelligence decision-support platform for construction engineering, safety inspection, scheduling, and valuation.",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Enable CORS for cross-origin frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API routers
app.include_router(health.router)
app.include_router(safety.router)
app.include_router(cracks.router)
app.include_router(valuation.router)
app.include_router(planner.router)
app.include_router(daily_log.router)
app.include_router(weather.router)
app.include_router(knowledge.router)

# Mount frontend static directory
frontend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "frontend")

if os.path.exists(frontend_dir):
    app.mount("/static", StaticFiles(directory=frontend_dir), name="static")

    @app.get("/", include_in_schema=False)
    async def serve_index():
        return FileResponse(os.path.join(frontend_dir, "index.html"))

    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Don't intercept API or docs routes
        if full_path.startswith(("api/", "health", "docs", "redoc", "openapi.json")):
            return None
        candidate = os.path.join(frontend_dir, full_path)
        if os.path.exists(candidate) and os.path.isfile(candidate):
            return FileResponse(candidate)
        return FileResponse(os.path.join(frontend_dir, "index.html"))

logger.info(f"{settings.APP_NAME} v{settings.APP_VERSION} initialized successfully.")
