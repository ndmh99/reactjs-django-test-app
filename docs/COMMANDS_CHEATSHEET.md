# React + Django Command Cheatsheet

> **Warning:** Make sure you have React (Node.js & npm) and Django (Python) installed on your system before running these commands.

---

## Django Backend (server/newproject)

# Folder navigation
cd server/newproject

# Virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install all dependencies
pip install django djangorestframework django-cors-headers gunicorn psycopg2-binary

# Migrations
python manage.py makemigrations
python manage.py migrate

# Create admin user
python manage.py createsuperuser

# Start dev server
python manage.py runserver

# Django shell
python manage.py shell

---

## React Frontend (client/app)

# Folder navigation
cd client/app

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install a package
npm install <package-name>
