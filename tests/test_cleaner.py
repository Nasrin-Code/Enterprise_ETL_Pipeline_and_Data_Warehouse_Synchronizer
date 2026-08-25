from src.transformations.cleaner import clean_stripe_data

def test_missing_amount_is_filled():
    records = [
              {
                "id": "pi_001",
                "amount": None,
                "currency": "usd",
                "created": 1724155200,
                "status": "succeeded"
               }
               ]
    result = clean_stripe_data(records)
    assert result["amount"].iloc[0] == 0

def test_created_is_converted_to_datetime():
    records = [
              {
                "id": "pi_001",
                "amount": 1500,
                "currency": "usd",
                "created": 1724155200,
                "status": "succeeded"      
              }
              ]
    result = clean_stripe_data(records)
    assert str(result["created"].dtype).startswith("datetime64")

def test_currency_is_uppercase():
    records = [
              {
                "id": "pi_001",
                "amount": 1500,
                "currency": "usd",
                "created": 1724155200,
                "status": "succeeded"
              }
              ]
    result = clean_stripe_data(records)
    assert result["currency"].iloc[0] == "USD"

def test_amount_is_converted_to_standard_unit():
    records = [
              {
                "id": "pi_001",
                "amount": 1500,
                "currency": "usd",
                "created": 1724155200,
                "status": "succeeded"
              }
              ]
    result = clean_stripe_data(records)
    assert result["amount"].iloc[0] == 15.0