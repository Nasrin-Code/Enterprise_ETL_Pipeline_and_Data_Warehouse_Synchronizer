import sys

sys.path.insert(
    0,
    "/mnt/c/NAS PYTHON DEVELOPMENT INTERNSHIP/ZAALIMA DEVELOPMENT INTERNSHIP/Enterprise_ETL_Pipeline_and_Data_Warehouse_Synchronizer"
)

from datetime import datetime

from airflow.sdk import dag, task

from src.transformations.mapper import map_salesforce_data
from src.loaders.database_loader import upsert_salesforce_customer


@dag(
    dag_id="salesforce_etl_pipeline",
    start_date=datetime(2026, 8, 31),
    schedule="@daily",
    catchup=False,
    tags=["etl", "salesforce", "postgresql"],
)
def salesforce_etl_pipeline():

    @task
    def extract():
        return [
            {
                "Id": "C001",
                "Name": "Nasrin",
                "Email": "nasrin@example.com",
            },
            {
                "Id": "C002",
                "Name": "Ali",
                "Email": "ali@example.com",
            },
        ]

    @task
    def transform(records):
        return map_salesforce_data(records)

    @task
    def load(records):
        for record in records:
            upsert_salesforce_customer(record)

    records = extract()
    mapped_records = transform(records)
    load(mapped_records)


salesforce_etl_pipeline()
