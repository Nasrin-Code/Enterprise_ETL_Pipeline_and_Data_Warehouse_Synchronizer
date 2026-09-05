import boto3

s3 = boto3.client("s3")

def upload_json(bucket_name, object_key, json_data):
    s3.put_object(
        Bucket=bucket_name,
        Key=object_key,
        Body=json_data,
        ContentType="application/json"
    )