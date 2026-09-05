from sqlalchemy import Column, String, Numeric, DateTime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class StripeTransaction(Base):
    __tablename__ = "stripe_transactions"

    record_id = Column(String, primary_key = True)
    amount = Column(Numeric)
    currency = Column(String)
    created_at = Column(DateTime)
    status = Column(String)

class SalesforceCustomer(Base):
    __tablename__ = "salesforce_customers"

    customer_id = Column(String, primary_key=True)
    name = Column(String)
    email = Column(String)
