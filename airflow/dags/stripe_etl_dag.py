import sys
sys.path.insert(0, "/mnt/c/NAS PYTHON DEVELOPMENT INTERNSHIP/ZAALIMA DEVELOPMENT INTERNSHIP/Enterprise_ETL_Pipeline_and_Data_Warehouse_Synchronizer")
import os
from datetime import datetime

from airflow.sdk import dag, task

from src.extractors.stripe import StripeExtractor
from src.transformations.cleaner import clean_stripe_data
from src.transformations.mapper import map_stripe_data
from src.loaders.database_loader import upsert_stripe_transaction
from utils.notifications import notify_failure

@dag(
    dag_id="stripe_etl_pipeline",
    start_date=datetime(2026, 8, 31),
    schedule="@daily",
    catchup=False,
    tags=["etl", "stripe", "postgresql"],
    on_failure_callback=notify_failure,
)
def stripe_etl_pipeline():

    @task
    def extract():
        return [
            {
                "id": "sample_001",
                "amount": 2500,
                "currency": "usd",
                "created": 1724155200,
                "status": "succeeded",
            },
            {
                "id": "sample_002",
                "amount": 5000,
                "currency": "eur",
                "created": 1724241600,
                "status": "succeeded",
            },
        ]

    @task
    def clean(records):
        cleaned_df = clean_stripe_data(records)
        cleaned_records = cleaned_df.to_dict("records")

        for record in cleaned_records:
            record["created"] = record["created"].isoformat()

        return cleaned_records

    @task
    def transform(records):
        return map_stripe_data(records)

    @task
    def load(records):
       for record in records:
         upsert_stripe_transaction(record)

    records = extract()
    cleaned_records = clean(records)
    mapped_records = transform(cleaned_records)
    load(mapped_records)


stripe_etl_pipeline()
