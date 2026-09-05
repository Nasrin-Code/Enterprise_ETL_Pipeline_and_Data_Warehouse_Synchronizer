from src.transformations.mapper import map_stripe_data

def test_stripe_mapping():
    records = [
              {
                "id": "pi_001",
                "amount": 15.0,
                "currency": "USD",
                "created": "2024-08-20 12:00:00",
                "status": "succeeded"
              }
              ]
    result = map_stripe_data(records)

    assert result[0]["record_id"] == "pi_001"
    assert result[0]["amount"] == 15.0
    assert result[0]["currency"] == "USD"
    assert result[0]["created_at"] == "2024-08-20 12:00:00"
    assert result[0]["status"] == "succeeded"

from src.transformations.mapper import map_salesforce_data

def test_salesforce_mapping():
    records=[
            {
              "Id": "C001",
              "Name": "Nasrin",
              "Email": "nasrin512003@gmail.com"
            }
            ]
    result = map_salesforce_data(records)

    assert result[0]["customer_id"] == "C001"
    assert result[0]["name"] == "Nasrin"
    assert result[0]["email"] == "nasrin512003@gmail.com"