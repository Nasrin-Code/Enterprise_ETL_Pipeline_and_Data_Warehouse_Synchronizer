from tenacity import retry
from tenacity import retry_if_exception_type
from tenacity import stop_after_attempt
from tenacity import wait_exponential


class RateLimitError(Exception):
    pass


def check_response(response):
    if response.status_code == 429:
        raise RateLimitError("API rate limit exceeded")

    return response


retry_on_rate_limit = retry(
    retry=retry_if_exception_type(RateLimitError),
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=1, max=8)
)