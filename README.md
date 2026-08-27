# Enterprise ETL Pipeline and Data Warehouse Synchronizer

## Project Overview

A Python-based ETL pipeline that extracts business data from external APIs, cleans and transforms the data into a unified structure, validates the data, and prepares it for loading into a centralized data warehouse.

## Project Objective

The project demonstrates an enterprise-style ETL workflow using multiple API data sources.

The pipeline supports:

- Extracting data from Stripe
- Extracting data from Salesforce
- Handling API pagination
- Handling API rate limits with retry logic
- Cleaning and standardizing Stripe data
- Mapping different API structures into unified fields
- Validating data using Pydantic
- Testing transformation logic using Pytest
- Preparing raw JSON storage using AWS S3

## ETL Architecture

Stripe API
    |
    v
Extraction
    |
    v
Transformation
   / \
  v   v
Cleaning  Mapping
   \     /
    v   v
   Validation
       |
       v
Data Warehouse

## Technologies Used

- Python
- Requests
- Pandas
- Pydantic
- Pydantic Settings
- Tenacity
- Boto3
- Pytest
- SQLAlchemy
- PostgreSQL

## Project Structure

Enterprise_ETL_Pipeline_and_Data_Warehouse_Synchronizer/
|
+-- src/
|   +-- extractors/
|   |   +-- stripe.py
|   |   +-- salesforce.py
|   |
|   +-- transformations/
|   |   +-- cleaner.py
|   |   +-- mapper.py
|   |
|   +-- utils/
|   |   +-- retry.py
|   |   +-- s3_storage.py
|   |
|   +-- config.py
|   +-- models.py
|
+-- tests/
|   +-- test_cleaner.py
|   +-- test_mapper.py
|
+-- .gitignore
+-- requirements.txt
+-- README.md

## Implemented Features

### 1. Stripe Data Extraction

The StripeExtractor retrieves Payment Intent data from the Stripe API.

Features include:

- Bearer-token authentication
- API requests using Requests
- Cursor-based pagination
- Collection of records across multiple pages
- Rate-limit retry handling

### 2. Salesforce Data Extraction

The SalesforceExtractor retrieves Salesforce records using SOQL queries.

Features include:

- Bearer-token authentication
- SOQL query support
- Salesforce pagination using nextRecordsUrl
- Collection of records across multiple pages
- Rate-limit retry handling

### 3. Rate-Limit Handling

The project uses Tenacity to retry requests when an API returns HTTP 429.

The retry configuration:

- Retries up to 3 attempts
- Uses exponential backoff
- Retries specifically for the custom RateLimitError

### 4. Stripe Data Cleaning

The clean_stripe_data() function performs the following transformations:

- Handles missing amounts
- Converts Unix timestamps to datetime values
- Converts currency codes to uppercase
- Converts amount values to numeric values
- Converts Stripe's smallest currency unit to the standard amount

Example:

1500 -> 15.0
usd  -> USD

### 5. Unified API Field Mapping

The project maps different API field names into a common internal structure.

#### Stripe

id       -> record_id
amount   -> amount
currency -> currency
created  -> created_at
status   -> status

#### Salesforce

Id       -> customer_id
Name     -> name
Email    -> email

### 6. Pydantic Validation

Pydantic models are used to define and validate expected data structures.

The customer model contains:

customer_id -> string
name        -> string
email       -> string

### 7. Unit Testing

Pytest is used to validate transformation and mapping logic.

Current tests cover:

- Missing amount handling
- Datetime conversion
- Currency standardization
- Amount conversion
- Stripe field mapping
- Salesforce field mapping

Current test result:

6 passed

Run all tests with:

python -m pytest tests

## Configuration

Sensitive configuration is stored using environment variables and .env.

The .env file is excluded from Git using .gitignore.

API credentials should never be committed to the repository.

## AWS S3 Raw Data Storage

The project contains an S3 storage utility using Boto3 for uploading raw JSON data.

The implementation uses:

boto3.client("s3")

and:

put_object()

The actual AWS S3 upload is currently pending because the AWS account activation/customer verification process is still incomplete.

## Data Warehouse

PostgreSQL has been configured locally as the current development data warehouse.

The project database is:

etl_warehouse

SQLAlchemy has been added as the Python database abstraction layer.

The SQLAlchemy-to-PostgreSQL connection and warehouse loading implementation are part of the Week 3 development phase.

## Current Project Status

### Completed

- Project setup
- Pydantic configuration
- Stripe extraction
- Salesforce extraction
- API pagination
- Rate-limit retry handling
- Pandas data cleaning
- Unified API field mapping
- Pydantic customer validation
- Pytest transformation tests
- PostgreSQL database setup
- SQLAlchemy dependency configuration

### Pending / Blocked

- Actual AWS S3 raw JSON upload is blocked by AWS account activation.
- SQLAlchemy database connection and data loading are part of the next development phase.

## Testing

Run the complete test suite:

python -m pytest tests

Expected result:

6 passed

## Security

The project does not store API credentials directly in source code.

Sensitive configuration should remain in .env, which is excluded from version control.

## Project Development Status

The project is being developed incrementally according to the ETL project timeline:

Extraction
    |
    v
Transformation
    |
    v
Validation
    |
    v
Data Warehouse Connection
    |
    v
Incremental Loading
    |
    v
End-to-End ETL
