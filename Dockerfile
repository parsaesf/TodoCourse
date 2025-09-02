# مرحله ۱: base image
FROM python:3.11-slim

# جلوگیری از cache
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# نصب دیپندنسی‌ها
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# کپی پروژه
COPY . .

# اجرای gunicorn (یا برای dev می‌تونی manage.py runserver بذاری)
CMD ["gunicorn", "cortexsys_todo.wsgi:application", "--bind", "0.0.0.0:8000"]
