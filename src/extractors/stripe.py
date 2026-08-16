import requests

class StripeExtractor:

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.url = "https://api.stripe.com/v1/payment_intents"

    def extract(self):
        headers = {"Authorization": f"Bearer {self.api_key}"}
        response = requests.get(self.url, headers = headers)
        response.raise_for_status()
        return response.json()