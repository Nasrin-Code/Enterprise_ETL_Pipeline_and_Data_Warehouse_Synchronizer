import requests

from src.utils.retry import RateLimitError, retry_on_rate_limit, check_response


class StripeExtractor:

    def __init__(self, api_key: str):
        self.api_key = api_key
        self.url = "https://api.stripe.com/v1/payment_intents"

    @retry_on_rate_limit
    def make_request(self, headers, params):
        response = requests.get(
            self.url,
            headers=headers,
            params=params
        )

        check_response(response)

        response.raise_for_status()

        return response

    def extract(self):
        headers = {
            "Authorization": f"Bearer {self.api_key}"
        }

        all_records = []
        starting_after = None

        while True:
            params = {
                "limit": 100
            }

            if starting_after:
                params["starting_after"] = starting_after

            response = self.make_request(headers, params)

            data = response.json()
            records = data["data"]

            all_records.extend(records)

            if not data["has_more"] or not records:
                break

            starting_after = records[-1]["id"]

        return all_records