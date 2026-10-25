import os
from typing import Optional

class Settings:
    APP_NAME: str = os.getenv('APP_NAME', 'BuildIntel AI - Multimodal Construction Intelligence')
    APP_VERSION: str = '1.0.0'
    ENVIRONMENT: str = os.getenv('ENVIRONMENT', 'production')
    GEMINI_API_KEY: str = os.getenv('GEMINI_API_KEY', '')
    DEFAULT_GEMINI_MODEL: str = os.getenv('DEFAULT_GEMINI_MODEL', 'gemini-2.0-flash')
    HOST: str = os.getenv('HOST', '0.0.0.0')
    PORT: int = int(os.getenv('PORT', 8000))

settings = Settings()
