# Full-Stack React + Django + Amazon RDS Book Management Project: Study & Build Guide

This guide summarizes the key steps to build, configure, and deploy this project from scratch. Use it as a checklist for future reference.

---

## 1. Project Overview
- **Frontend:** React (Vite)
- **Backend:** Django + Django REST Framework
- **Database:** Amazon RDS PostgreSQL
- **Deployment:** Vercel (frontend), Render (backend)

---

## 2. Initial Setup
### a. Clone the Project
- Clone the repository from GitHub.

### b. Install Backend Dependencies
- Open terminal in `server/newproject/`.
- Run:
  ```powershell
  pip install -r requirements.txt
  ```

### c. Install Frontend Dependencies
- Open terminal in `client/app/`.
- Run:
  ```powershell
  npm install
  ```

---

## 3. Local Development
### a. Backend (Django)
- In `server/newproject/`, run:
  ```powershell
  python manage.py migrate
  python manage.py runserver
  ```
- API available at `http://127.0.0.1:8000/api/`

### b. Frontend (React)
- In `client/app/`, run:
  ```powershell
  npm run dev
  ```
- App available at `http://localhost:5173/`

---

## 4. Amazon RDS PostgreSQL Setup
- Create a PostgreSQL instance on AWS RDS.
- Note DB name, username, password, endpoint, and port.
- Update Django `settings.py` to use environment variables for DB config.
- On Render, set these environment variables:
  - `RDS_DB_NAME`, `RDS_USERNAME`, `RDS_PASSWORD`, `RDS_HOSTNAME`, `RDS_PORT`, `SECRET_KEY`, `DEBUG`

---

## 5. Deployment
### a. Backend (Render)
- Push code to GitHub.
- Create a new Web Service on Render, connect your repo.
- Set root directory to `server/newproject`.
- Set build command: `pip install -r requirements.txt`
- Set start command: `gunicorn newproject.wsgi`
- Add environment variables (see above).
- Deploy and wait for build.
- After deploy, open shell and run:
  ```powershell
  python manage.py migrate
  ```

### b. Frontend (Vercel)
- Push frontend code to GitHub.
- Create new project on Vercel, set root to `client/app`.
- Build command: `npm run build`
- Output directory: `dist`
- Deploy and note the public URL.

---

## 6. CORS & API URLs
- In Django `settings.py`, set `CORS_ALLOWED_ORIGINS` to your Vercel frontend URL.
- In React, set API base URL to your Render backend URL.

---

## 7. Common Troubleshooting
- **CORS errors:** Check allowed origins in Django.
- **DB errors:** Check RDS credentials, security group, and environment variables.
- **API not reachable:** Check URLs and deployment status.
- **Migrations:** Always run after deploying backend.

---

## 8. Useful Commands
- Backend install: `pip install -r requirements.txt`
- Backend run: `python manage.py runserver`
- Frontend install: `npm install`
- Frontend run: `npm run dev`
- Backend migrate: `python manage.py migrate`

---

## 9. Useful Links
- [Render Django Guide](https://render.com/docs/deploy-django)
- [Vercel React Guide](https://vercel.com/guides/deploying-react-with-vercel)
- [Amazon RDS Docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)

---

Keep this file for quick reference whenever you want to rebuild or study the project!
