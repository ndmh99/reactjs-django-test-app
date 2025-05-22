# How This Project Runs Online: Step-by-Step Guide

This guide explains how your full-stack Book Management project (React frontend + Django backend) runs online, using **Vercel** for the frontend and **Render** for the backend API server. It covers deployment, configuration, and how the two parts communicate.

---

## 1. Project Structure Recap

```
react-django/
├── client/app/         # React frontend (Vite)
└── server/newproject/  # Django backend (API)
```

---

## 2. Backend (Django API) Deployment on Render

### Step 1: Prepare Your Code
- Ensure your backend code is in `server/newproject/`.
- Add all necessary dependencies to `requirements.txt` (Django, djangorestframework, gunicorn, django-cors-headers).
- In `settings.py`, set:
  - `ALLOWED_HOSTS = ['reactjs-django-simple-crud-book-app.onrender.com', 'localhost', '127.0.0.1']`
  - Configure CORS to allow your frontend domain (see below).

### Step 2: Push to GitHub
- Commit and push your code to a GitHub repository.

### Step 3: Deploy to Render
1. Go to [Render.com](https://render.com/), sign up/log in.
2. Click **New Web Service** > **Connect your GitHub repo**.
3. Set **Root Directory** to `server/newproject`.
4. Set **Build Command** to:
   ```
   pip install -r requirements.txt
   ```
5. Set **Start Command** to:
   ```
   gunicorn newproject.wsgi
   ```
6. Add environment variables as needed (SECRET_KEY, DEBUG, etc.).
7. Click **Create Web Service** and wait for deployment.
8. After deployment, note your public backend URL (e.g., `https://your-backend.onrender.com`).

### Step 4: Configure CORS
- In `settings.py`, add:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "https://reactjs-django-test-app.vercel.app/"
  ]
  ```
  Replace with your actual frontend URL after deploying to Vercel.

---

## 3. Frontend (React) Deployment on Vercel

### Step 1: Prepare Your Code
- Ensure your React app is in `client/app/`.
- In your React code (e.g., `App.jsx`), set the API base URL to your Render backend:
  ```js
  const API_BASE_URL = "https://reactjs-django-simple-crud-book-app.onrender.com/api";
  ```

### Step 2: Push to GitHub
- Commit and push your frontend code to the same or a separate GitHub repo.

### Step 3: Deploy to Vercel
1. Go to [Vercel.com](https://vercel.com/), sign up/log in.
2. Click **New Project** > **Import GitHub Repo**.
3. Set **Root Directory** to `client/app`.
4. Vercel will auto-detect Vite and set build/output commands:
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click **Deploy** and wait for deployment.
6. After deployment, note your public frontend URL (e.g., `https://reactjs-django-test-app.vercel.app/`).

### Step 4: (Optional) Update CORS on Backend
- If your frontend URL changes, update `CORS_ALLOWED_ORIGINS` in your Django settings and redeploy the backend.

---

## 4. How the Project Works Online

- **User visits your Vercel frontend URL.**
- The React app loads in the browser and makes API requests to your Render backend (using the public API URL).
- The Django backend processes requests, interacts with the database, and returns JSON responses.
- The React frontend displays the data and allows users to add, update, or delete books.

---

## 5. Example Data Flow (Online)
1. User opens `https://reactjs-django-test-app.vercel.app`.
2. React fetches books from `https://reactjs-django-simple-crud-book-app.onrender.com/api/books/`.
3. User adds a book; React sends a POST request to `https://reactjs-django-simple-crud-book-app.onrender.com/api/books/create/`.
4. Django saves the book and returns the new data; React updates the UI.

---

## 6. Troubleshooting
- **CORS errors:**
  - Make sure `CORS_ALLOWED_ORIGINS` in Django includes your Vercel frontend URL.
- **Invalid Host errors:**
  - Add your Render backend domain to `ALLOWED_HOSTS` in Django settings.
- **API not reachable:**
  - Double-check the API base URL in your React code.

---

## 7. Useful Links
- [Render Django Deployment Guide](https://render.com/docs/deploy-django)
- [Vercel React Deployment Guide](https://vercel.com/guides/deploying-react-with-vercel)
- [Django CORS Headers](https://pypi.org/project/django-cors-headers/)

---

## 8. Summary Table
| Part      | Platform | Directory         | Public URL Example                                   |
|-----------|----------|-------------------|------------------------------------------------------|
| Backend   | Render   | server/newproject | https://reactjs-django-simple-crud-book-app.onrender.com |
| Frontend  | Vercel   | client/app        | https://reactjs-django-test-app.vercel.app           |

---

This setup allows you to run your full-stack project online, with a professional deployment workflow and clear separation between frontend and backend.
