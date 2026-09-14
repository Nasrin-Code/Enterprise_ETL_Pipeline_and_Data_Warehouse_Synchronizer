# Enterprise ETL Pipeline and Data Warehouse Synchronizer

## Project Overview

A Python-based enterprise-style ETL pipeline that extracts business data from multiple external APIs, cleans and transforms the data into a unified structure, validates the data, and loads it into a centralized PostgreSQL data warehouse.

The project was developed according to the Zaalima Development Python Development Internship - Project 1 guideline.

## Project Objective

The objective of this project is to demonstrate a resilient and automated data-engineering pipeline capable of:

- Extracting data from multiple APIs
- Handling API pagination
- Handling API rate limits and retries
- Cleaning and standardizing source data
- Mapping different API structures into a unified schema
- Validating structured data using Pydantic
- Loading data into PostgreSQL
- Synchronizing records using PostgreSQL upsert logic
- Testing ETL components using Pytest
- Orchestrating ETL workflows using Apache Airflow
- Sending email notifications when pipeline failures occur
- Containerizing the application using Docker
- Running automated CI tests using GitHub Actions
- Preparing raw JSON storage using AWS S3

## ETL Architecture

```text
                    +-----------------+
                    |    Stripe API   |
                    +--------+--------+
                             |
                             |
                    +--------v--------+
                    |   Extraction    |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |     Cleaning    |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    | Transformation  |
                    |    / Mapping    |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |    Validation   |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |   SQLAlchemy    |
                    |   PostgreSQL    |
                    +--------+--------+
                             |
                             v
                    +-----------------+
                    |  Data Warehouse |
                    +-----------------+

                    +-----------------+
                    | Salesforce API  |
                    +--------+--------+
                             |
                             v
                       Extraction
                             |
                             v
                       Transformation
                             |
                             v
                        Validation
                             |
                             v
                        PostgreSQL

Apache Airflow is used to orchestrate the ETL workflow.

## Technologies Used

* Python
* Requests
* Pandas
* Pydantic
* Pydantic Settings
* Tenacity
* Boto3
* Pytest
* SQLAlchemy
* PostgreSQL
* Apache Airflow
* Docker
* GitHub Actions
* Gmail SMTP

## Project Structure

```text
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
|   +-- loaders/
|   |   +-- database_loader.py
|   |
|   +-- utils/
|   |   +-- retry.py
|   |   +-- s3_storage.py
|   |
|   +-- config.py
|   +-- database.py
|   +-- models.py
|   +-- warehouse_models.py
|
+-- tests/
|   +-- test_cleaner.py
|   +-- test_mapper.py
|   +-- test_etl_pipeline.py
|
+-- .github/
|   +-- workflows/
|       +-- ci.yml
|
+-- Dockerfile
+-- pytest.ini
+-- requirements.txt
+-- README.md
+-- .gitignore
```

Airflow DAGs are maintained in the Airflow DAG directory:

```text
airflow/
|
+-- dags/
    +-- stripe_etl_dag.py
    +-- salesforce_etl_dag.py
    +-- utils/
        +-- notifications.py
```

# Week 1 - API Integration and Data Extraction

## 1. Pydantic Configuration

Pydantic Settings is used to load configuration from environment variables and the `.env` file.

The configuration contains:

* STRIPE_API_KEY
* DATABASE_URL

Sensitive values are kept outside the source code and `.env` is excluded from Git.

## 2. Stripe Data Extraction

The `StripeExtractor` retrieves Payment Intent data from the Stripe API.

Features include:

* Bearer-token authentication
* HTTP requests using Requests
* Cursor-based pagination
* Collection of records across multiple pages
* Rate-limit handling

## 3. Salesforce Data Extraction

The `SalesforceExtractor` retrieves Salesforce records using SOQL queries.

Features include:

* Bearer-token authentication
* SOQL query support
* Salesforce pagination using `nextRecordsUrl`
* Collection of records across multiple pages
* Rate-limit handling

## 4. API Rate-Limit Handling

Tenacity is used to handle API rate limiting.

When an API returns HTTP `429`, the pipeline raises a custom `RateLimitError` and retries the request.

The retry configuration includes:

* Maximum of 3 attempts
* Exponential backoff
* Retry specifically for rate-limit errors

# Week 2 - Data Transformation and Validation

## 5. Stripe Data Cleaning

The `clean_stripe_data()` function performs:

* Missing amount handling
* Unix timestamp conversion
* Currency standardization
* Numeric amount conversion
* Conversion from Stripe's smallest currency unit to standard currency amount

Example:

```text
1500 -> 15.0
usd  -> USD
```

## 6. Unified API Field Mapping

Different APIs use different field names.

The pipeline maps them into a common internal structure.

### Stripe

```text
id       -> record_id
amount   -> amount
currency -> currency
created  -> created_at
status   -> status
```

### Salesforce

```text
Id       -> customer_id
Name     -> name
Email    -> email
```

This allows downstream processing to work with standardized fields.

## 7. Pydantic Validation

Pydantic models define the expected structure of customer data.

```text
customer_id -> string
name        -> string
email       -> string
```

This provides structured validation before data is loaded into the warehouse.

## 8. Automated Testing

Pytest is used to test transformation, mapping, and end-to-end ETL functionality.

Tests cover:

* Missing amount handling
* Datetime conversion
* Currency standardization
* Amount conversion
* Stripe field mapping
* Salesforce field mapping
* End-to-end Stripe ETL flow

Current test result:

```text
7 passed
```

Run the test suite with:

```powershell
python -m pytest tests
```

# Week 3 - Data Warehouse and Synchronization

## 9. PostgreSQL Data Warehouse

PostgreSQL is used as the local development data warehouse.

Database:

```text
etl_warehouse
```

SQLAlchemy provides the Python database abstraction layer.

The database connection is configured using:

```text
DATABASE_URL
```

The connection URL contains the PostgreSQL database type, driver, username, password, host, port, and database name.

## 10. SQLAlchemy Warehouse Models

The project defines warehouse models for Stripe transactions and Salesforce customers.

### Stripe Transactions

```text
Table: stripe_transactions

Columns:
- record_id
- amount
- currency
- created_at
- status
```

### Salesforce Customers

```text
Table: salesforce_customers

Columns:
- customer_id
- name
- email
```

Primary keys are used to uniquely identify records.

## 11. Database Loading

The database loader uses SQLAlchemy and PostgreSQL to load transformed records into the warehouse.

The loader supports:

* INSERT operations for new records
* UPDATE operations for existing records
* PostgreSQL conflict handling
* Transaction commits
* Database session cleanup

## 12. Upsert Synchronization

The pipeline uses PostgreSQL upsert logic.

Upsert means:

```text
New record
    |
    +--> INSERT

Existing record
    |
    +--> UPDATE
```

Stripe records use `record_id` as the primary and conflict-detection field.

Salesforce records use `customer_id` as the primary and conflict-detection field.

This prevents duplicate records and allows existing warehouse records to be synchronized with incoming data.

## 13. End-to-End ETL Testing

The project includes an end-to-end Stripe ETL test covering:

```text
Raw Stripe-style data
        |
        v
     Cleaning
        |
        v
      Mapping
        |
        v
Validation / Assertions
        |
        v
  Database Upsert
        |
        v
   PostgreSQL
```

The test verifies important transformations such as:

```text
2500 -> 25.0
usd  -> USD
id   -> record_id
```

# Week 4 - Orchestration, Monitoring and Deployment

## 14. Apache Airflow

Apache Airflow is used to orchestrate the ETL workflow.

The project contains:

```text
stripe_etl_dag.py
salesforce_etl_dag.py
```

The Stripe DAG follows:

```text
Extract
   |
   v
 Clean
   |
   v
Transform
   |
   v
 Load
```

The DAG is configured with:

```text
Schedule: @daily
Catchup: False
```

Airflow manages task dependencies and execution scheduling.

The current Stripe demonstration DAG uses sample Stripe records because live Stripe API credentials were not available for the demonstration environment.

## 15. Failure Monitoring and Email Alerts

An Airflow failure callback is implemented using:

```text
notify_failure()
```

When a configured ETL task fails:

```text
Airflow Task Failure
        |
        v
Failure Callback
        |
        v
notify_failure()
        |
        v
Gmail SMTP
        |
        v
Email Alert
```

The alert contains:

* DAG ID
* Task ID
* Logical execution date/time

Example subject:

```text
ETL Pipeline Failed: stripe_etl_pipeline
```

The failure notification workflow has been tested successfully.

## 16. Docker

The project is containerized using Docker.

The Docker image:

* Uses Python 3.12
* Installs project dependencies
* Copies source code
* Copies tests
* Runs the Pytest test suite

Docker provides a reproducible application environment.

The Docker image has been successfully built and tested.

## 17. Continuous Integration - GitHub Actions

GitHub Actions is used for Continuous Integration.

The CI workflow follows:

```text
Git Push / Pull Request
          |
          v
     GitHub Actions
          |
          v
   Build Docker Image
          |
          v
 Start PostgreSQL Service
          |
          v
       Run Tests
          |
          v
       Pass / Fail
```

The CI workflow automatically:

1. Checks out the repository
2. Starts a PostgreSQL service
3. Builds the Docker image
4. Runs the project's Pytest suite
5. Reports the test result

The latest CI run completed successfully.

### CI and CD

The implemented workflow demonstrates the Continuous Integration portion of CI/CD.

The current project does not claim production deployment automation.

# AWS S3 Raw Data Storage

The project includes an AWS S3 storage utility using Boto3 for raw JSON storage.

The implementation uses:

```python
boto3.client("s3")
```

and:

```python
put_object()
```

The intended raw-data architecture is:

```text
External API
     |
     v
 Raw JSON
     |
     v
  AWS S3
     |
     v
Transformation
     |
     v
Data Warehouse
```

## Current AWS S3 Status

The S3 utility has been implemented, but the live AWS S3 upload has not been executed because AWS account activation is still pending.

Therefore, live AWS S3 upload is not claimed as completed.

# Security

Sensitive credentials are not stored directly in source code.

Environment variables and `.env` are used for sensitive configuration.

The `.env` file is excluded from Git.

Sensitive configuration includes:

```text
STRIPE_API_KEY
DATABASE_URL
SMTP credentials
```

Credentials should never be committed to the repository.

# Testing

Run the complete test suite:

```powershell
python -m pytest tests
```

Current result:

```text
7 passed
```

The same test suite is also executed inside the Docker and GitHub Actions CI workflow.

# Project Status

## Completed

* Project setup
* Environment-based configuration
* Pydantic Settings
* Stripe extraction implementation
* Salesforce extraction implementation
* API pagination
* Rate-limit handling
* Tenacity retry logic
* Pandas data cleaning
* Unified API field mapping
* Pydantic validation
* Pytest unit tests
* End-to-end ETL test
* PostgreSQL data warehouse
* SQLAlchemy database integration
* Warehouse models
* Database loading
* PostgreSQL upsert synchronization
* Apache Airflow DAGs
* Daily ETL scheduling
* Airflow failure callback
* Gmail email failure notification
* Docker containerization
* GitHub Actions CI
* Automated test execution

## Pending / Blocked

* Live AWS S3 raw JSON upload

The S3 utility is implemented, but the live upload is blocked by AWS account activation.

# Final ETL Workflow

```text
                    +----------------+
                    |   Stripe API   |
                    +-------+--------+
                            |
                            v
                    +----------------+
                    | Salesforce API |
                    +-------+--------+
                            |
                            v
                       Extraction
                            |
                            v
                    Cleaning / Mapping
                            |
                            v
                       Validation
                            |
                            v
                    SQLAlchemy Layer
                            |
                            v
                       PostgreSQL
                            |
                            v
                     Data Warehouse
                            |
                            v
                       Upsert / Load
```

## Orchestration and Operations

```text
                 Apache Airflow
                        |
                        v
                  Daily Scheduling
                        |
                        v
                   ETL Orchestration
                        |
                        v
                  Failure Callback
                        |
                        v
                    Email Alert
                        |
                      Docker
                        |
                        v
               Reproducible Environment
                        |
                        v
                  GitHub Actions
                        |
                        v
                 Automated Testing
```

# Project Development Timeline

The project was developed incrementally according to the internship ETL project timeline.

```text
Week 1
API Integration and Data Extraction
        |
        v
Week 2
Data Transformation and Validation
        |
        v
Week 3
Data Warehouse and Synchronization
        |
        v
Week 4
Orchestration, Monitoring and Deployment
```

# Conclusion

This project demonstrates an enterprise-style ETL workflow that integrates multiple API sources, handles pagination and API rate limits, cleans and standardizes data, validates records, loads data into PostgreSQL, synchronizes records using upsert logic, orchestrates workflows using Airflow, monitors failures through email notifications, packages the application with Docker, and validates the application through GitHub Actions CI.

The AWS S3 raw JSON storage component is implemented but live upload remains blocked by AWS account activation.
