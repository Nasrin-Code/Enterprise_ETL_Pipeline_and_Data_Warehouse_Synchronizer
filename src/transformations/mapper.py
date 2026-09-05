def map_stripe_data(records):
    mapped_records = []

    for record in records:
        mapped_record = {
            "record_id": record["id"],
            "amount": record["amount"],
            "currency": record["currency"],
            "created_at": record["created"],
            "status": record["status"]
        }

        mapped_records.append(mapped_record)

    return mapped_records

def map_salesforce_data(records):
    mapped_records = []

    for record in records:
        mapped_record = {
            "customer_id": record["Id"],
            "name": record["Name"],
            "email": record["Email"]
        }

        mapped_records.append(mapped_record)

    return mapped_records