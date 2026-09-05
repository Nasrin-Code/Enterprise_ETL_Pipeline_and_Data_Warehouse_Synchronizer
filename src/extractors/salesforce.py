import requests

from src.utils.retry import retry_on_rate_limit, check_response


class SalesforceExtractor:

    def __init__(self, access_token: str, base_url: str):
        self.access_token = access_token
        self.base_url = base_url

    def get_headers(self):
        return {
            "Authorization": f"Bearer {self.access_token}"
        }

    def build_query_url(self, api_version: str):
        return f"{self.base_url}/services/data/{api_version}/query/"

    @retry_on_rate_limit
    def make_request(self, url, params):
        response = requests.get(
            url,
            headers=self.get_headers(),
            params=params
        )

        check_response(response)

        response.raise_for_status()

        return response

    def extract(self, soql_query: str, api_version: str):
        url = self.build_query_url(api_version)
        params = {
            "q": soql_query
        }

        all_records = []

        while True:
            response = self.make_request(url, params)

            data = response.json()
            records = data["records"]

            all_records.extend(records)

            if data["done"]:
                break

            url = f"{self.base_url}{data['nextRecordsUrl']}"
            params = {}

        return all_records