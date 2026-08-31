from datetime import datetime

from src.transformations.cleaner import clean_stripe_data
from src.transformations.mapper import map_stripe_data
from src.loaders.database_loader import upsert_stripe_transaction

def test_stripe_etl_flow():
    records = [
              {
                  "id": "e2e_test_001",
                  "amount": 2500,
                  "currency": "usd",
                  "created": 1724155200,
                  "status": "succeeded"
              }
              ]

    cleaned_data = clean_stripe_data(records)

    cleaned_records = cleaned_data.to_dict("records")

    mapped_records = map_stripe_data(cleaned_records)

    record = mapped_records[0]

    assert record["record_id"] == "e2e_test_001"

    assert record["amount"] == 25.0

    assert record["currency"] == "USD"

    if isinstance(record["created_at"], str):
        record["created_at"] = datetime.fromisoformat(record["created_at"])

    upsert_stripe_transaction(record)