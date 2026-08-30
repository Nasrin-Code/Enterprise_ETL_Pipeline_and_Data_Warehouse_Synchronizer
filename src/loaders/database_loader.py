from sqlalchemy.dialects.postgresql import insert

from src.database import SessionLocal
from src.warehouse_models import StripeTransaction


def upsert_stripe_transaction(record):
    session = SessionLocal()

    try:
        statement = insert(StripeTransaction).values(
            record_id=record["record_id"],
            amount=record["amount"],
            currency=record["currency"],
            created_at=record["created_at"],
            status=record["status"],
        )

        statement = statement.on_conflict_do_update(
            index_elements=[StripeTransaction.record_id],
            set_={
                "amount": statement.excluded.amount,
                "currency": statement.excluded.currency,
                "created_at": statement.excluded.created_at,
                "status": statement.excluded.status,
            },
        )

        session.execute(statement)
        session.commit()

    finally:
        session.close()