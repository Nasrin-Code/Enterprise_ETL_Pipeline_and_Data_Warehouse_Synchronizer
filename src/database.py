from sqlalchemy import create_engine
from src.config import Settings

settings = Settings()
engine = create_engine(settings.database_url)