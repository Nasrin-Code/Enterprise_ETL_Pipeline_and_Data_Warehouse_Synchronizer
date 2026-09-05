import pandas as pd


def clean_stripe_data(records):
    df = pd.DataFrame(records)

    # Handle missing amounts
    df["amount"] = df["amount"].fillna(0)

    # Convert Unix timestamp to datetime
    df["created"] = pd.to_datetime(
        df["created"],
        unit="s"
    )

    # Standardize currency codes
    df["currency"] = df["currency"].str.upper()

    # Convert Stripe's smallest currency unit to standard amount
    df["amount"] = pd.to_numeric(df["amount"], errors = "coerce")
    df["amount"] = df["amount"]/100

    return df