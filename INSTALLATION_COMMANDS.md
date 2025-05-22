# Installation & Development Commands for React + Django Book Project

This file lists all the commands needed to set up and work with both the frontend (React) and backend (Django) parts of this project on Windows (PowerShell).

---

## Prerequisites
- [Node.js & npm](https://nodejs.org/) (for React frontend)
- [Python 3.10+](https://www.python.org/) (for Django backend)

---

## 1. Backend (Django) Setup

```powershell
# Navigate to the Django project folder
cd server/newproject

# (Optional but recommended) Create a virtual environment
python -m venv venv

# Activate the virtual environment
.\venv\Scripts\Activate.ps1

# Install Django and Django REST Framework
pip install django djangorestframework

# Run database migrations
python manage.py migrate

# (Optional) Create a superuser for the admin site
python manage.py createsuperuser

# Start the Django development server
python manage.py runserver
```

---

## 2. Frontend (React) Setup

```powershell
# (If you have not already created the React app with Vite, run this from the parent folder)
npm create vite@latest client/app -- --template react

# Then navigate to the React app folder
cd client/app

# Install dependencies
npm install

# Start the React development server
npm run dev
```

---

## 3. Common Development Commands

### Django (Backend)
- Run migrations: `python manage.py migrate`
- Create migrations: `python manage.py makemigrations`
- Start server: `python manage.py runserver`
- Create superuser: `python manage.py createsuperuser`
- Open Django shell: `python manage.py shell`

### React (Frontend)
- Start dev server: `npm run dev`
- Build for production: `npm run build`
- Preview production build: `npm run preview`
- Install a new package: `npm install <package-name>`

---

## 4. Useful Links
- Django Admin: http://127.0.0.1:8000/admin/
- API Root: http://127.0.0.1:8000/api/
- React App: http://localhost:5173/

---

## Notes
- Always activate your Python virtual environment before running backend commands.
- Make sure both servers (Django and React) are running for full functionality.
- If you change models.py, run `makemigrations` and `migrate` again.
- For Windows PowerShell, use `./venv/Scripts/Activate.ps1` to activate the virtual environment.
