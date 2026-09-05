from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from src.config import Settings
from src.warehouse_models import Base

settings = Settings()

engine = create_engine(settings.database_url)

SessionLocal = sessionmaker(bind=engine)

Base.metadata.create_all(engine)