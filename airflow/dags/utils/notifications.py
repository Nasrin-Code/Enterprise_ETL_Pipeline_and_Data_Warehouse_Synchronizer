import os
import smtplib
from email.message import EmailMessage


def notify_failure(context):
    dag_id = context["dag"].dag_id
    task_id = context["task_instance"].task_id
    execution_date = context["logical_date"]

    message = (
        f"🚨 ETL Pipeline Failed\n"
        f"DAG: {dag_id}\n"
        f"Task: {task_id}\n"
        f"Time: {execution_date}"
    )

    sender = os.getenv("AIRFLOW__SMTP__SMTP_MAIL_FROM")
    username = os.getenv("AIRFLOW__SMTP__SMTP_USER")
    password = os.getenv("AIRFLOW__SMTP__SMTP_PASSWORD")
    smtp_host = os.getenv("AIRFLOW__SMTP__SMTP_HOST", "smtp.gmail.com")
    smtp_port = int(os.getenv("AIRFLOW__SMTP__SMTP_PORT", "587"))
    recipient = os.getenv("AIRFLOW_ALERT_EMAIL", sender)

    email = EmailMessage()
    email["Subject"] = f"ETL Pipeline Failed: {dag_id}"
    email["From"] = sender
    email["To"] = recipient
    email.set_content(message)

    with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
        server.starttls()
        server.login(username, password)
        server.send_message(email)

    print(message)
