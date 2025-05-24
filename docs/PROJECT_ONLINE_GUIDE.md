# How This Project Runs Online: Step-by-Step Guide (ReactJS + Django + RDS Database)

This guide explains how your full-stack Book Management project (React frontend + Django backend) runs online. You can deploy using traditional methods (**Vercel** for frontend, **Render** for backend) or modern **Docker** containerization. The project supports **Amazon RDS PostgreSQL** as the database with automatic fallback to SQLite for local development.

## Deployment Options
1. **Traditional Deployment:** Vercel (frontend) + Render (backend) + RDS
2. **Docker Deployment:** Containerized application with Docker Compose or cloud container services
3. **Local Development:** Docker Compose with SQLite database

---

## 1. Project Structure Recap

```
react-django/
├── client/app/              # React frontend (Vite)
├── server/newproject/       # Django backend (API)
├── docker-compose.yml       # Docker orchestration
├── docs/                   # Documentation
└── README.md               # Project overview with Docker setup
```

## Development Approaches

### Option A: Docker Development (Recommended)
- **Advantages:** Consistent environment, easy setup, production-like setup
- **Requirements:** Docker Desktop installed
- **Database:** SQLite (automatic) with optional PostgreSQL
- **Ports:** React (5173), Django (8000)

### Option B: Manual Development
- **Advantages:** Direct access to tools, familiar workflow
- **Requirements:** Python, Node.js, package managers
- **Database:** SQLite locally, PostgreSQL in production

---

## 2. Docker Deployment (Recommended Modern Approach)

### Step 1: Local Docker Development
```bash
# Clone repository
git clone <your-repo-url>
cd react-django

# Start entire application
docker-compose up --build

# Access applications:
# Frontend: http://localhost:5173
# Backend: http://localhost:8000
# Database: SQLite (persisted in docker volume)
```

### Step 2: Docker Production Deployment

#### Option A: Docker Hub + Cloud Services
1. **Build and push images:**
   ```bash
   # Build images
   docker-compose build
   
   # Tag for Docker Hub
   docker tag react-django_client username/react-django-app:frontend
   docker tag react-django_server username/react-django-app:backend
   
   # Push to Docker Hub
   docker push username/react-django-app:frontend
   docker push username/react-django-app:backend
   ```

2. **Deploy to cloud platforms:**
   - **Railway:** Connect GitHub repo, auto-detect Docker Compose
   - **DigitalOcean App Platform:** Upload docker-compose.yml
   - **AWS ECS:** Use task definitions with your Docker images
   - **Google Cloud Run:** Deploy individual containers

#### Option B: VPS with Docker Compose
1. **Set up VPS (DigitalOcean, Linode, etc.):**
   ```bash
   # On VPS, install Docker and Docker Compose
   sudo apt update
   sudo apt install docker.io docker-compose
   
   # Clone your repository
   git clone <your-repo-url>
   cd react-django
   
   # Set environment variables for production
   export RDS_DB_NAME=your_db_name
   export RDS_USERNAME=your_username
   export RDS_PASSWORD=your_password
   export RDS_HOSTNAME=your_rds_endpoint
   export RDS_PORT=5432
   
   # Start in production mode
   docker-compose up -d --build
   ```

2. **Configure reverse proxy (Nginx):**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://localhost:5173;
       }
       
       location /api/ {
           proxy_pass http://localhost:8000;
       }
   }
   ```

### Step 3: Environment Variables for Docker Production
Create `.env` file:
```env
# Database (PostgreSQL for production)
RDS_DB_NAME=your_database_name
RDS_USERNAME=your_username
RDS_PASSWORD=your_secure_password
RDS_HOSTNAME=your-rds-endpoint.amazonaws.com
RDS_PORT=5432

# Django
SECRET_KEY=your_secret_key_here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,localhost

# React (build-time variables)
VITE_API_URL=https://your-domain.com/api
```

---

## 3. Traditional Backend (Django API) Deployment on Render (with Amazon RDS)

### Step 1: Prepare Your Code
- Ensure your backend code is in `server/newproject/`.
- Add all necessary dependencies to `requirements.txt` (Django, djangorestframework, gunicorn, django-cors-headers, psycopg2-binary).
- In `settings.py`, set:
  - `ALLOWED_HOSTS = ['reactjs-django-simple-crud-book-app.onrender.com', 'localhost', '127.0.0.1']`
  - Configure CORS to allow your frontend domain (see below).
  - **Database automatically detects environment:**
    - Uses PostgreSQL when all RDS environment variables are present
    - Uses SQLite for local development when RDS variables are missing
    - No manual switching required between environments
  - **Do NOT commit your RDS credentials. Use environment variables on Render.**

### Step 2: Set Up Amazon RDS PostgreSQL
1. Go to [AWS RDS Console](https://console.aws.amazon.com/rds/).
2. Create a new PostgreSQL instance (free tier if eligible).
3. Set DB name, username, and password. Note the endpoint (hostname), port, and credentials.
4. In the RDS security group, add an inbound rule to allow connections from Render's IP range (or 0.0.0.0/0 for testing, but restrict for production).
5. Wait for the DB to be available.

### Step 3: Push to GitHub
- Commit and push your code to a GitHub repository.

### Step 4: Deploy to Render
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
6. **Add environment variables** (in Render dashboard):
   - `RDS_DB_NAME` = your RDS database name
   - `RDS_USERNAME` = your RDS username
   - `RDS_PASSWORD` = your RDS password
   - `RDS_HOSTNAME` = your RDS endpoint (hostname)
   - `RDS_PORT` = 5432 (or your RDS port)
   - `SECRET_KEY`, `DEBUG`, etc. as needed
7. Click **Create Web Service** and wait for deployment.
8. After deployment, note your public backend URL (e.g., `https://your-backend.onrender.com`).

### Step 5: Run Migrations on Render
- In the Render dashboard, open the shell for your service and run:
  ```sh
  python manage.py migrate
  ```
- This will create the tables in your RDS PostgreSQL database.

### Step 6: Configure CORS
- In `settings.py`, add:
  ```python
  CORS_ALLOWED_ORIGINS = [
      "https://reactjs-django-test-app.vercel.app/"
  ]
  ```
  Replace with your actual frontend URL after deploying to Vercel.

---

## 4. Traditional Frontend (React) Deployment on Vercel

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

## 5. How the Project Works Online

### Docker Deployment
- **User visits your domain or VPS IP.**
- **Nginx** (if configured) routes requests to appropriate containers.
- React container serves the frontend on port 5173.
- Django container serves the API on port 8000.
- Both containers communicate through Docker network.
- Django connects to **Amazon RDS PostgreSQL** (production) or **SQLite** (development).

### Traditional Deployment

- **User visits your Vercel frontend URL.**
- The React app loads in the browser and makes API requests to your Render backend (using the public API URL).
- The Django backend processes requests, interacts with the **Amazon RDS PostgreSQL** database, and returns JSON responses.
- The React frontend displays the data and allows users to add, update, or delete books.

---

## 5. Example Data Flow (Online)
1. User opens `https://reactjs-django-test-app.vercel.app`.
2. React fetches books from `https://reactjs-django-simple-crud-book-app.onrender.com/api/books/`.
3. User adds a book; React sends a POST request to `https://reactjs-django-simple-crud-book-app.onrender.com/api/books/create/`.
4. Django saves the book to **Amazon RDS PostgreSQL** and returns the new data; React updates the UI.

---

## 6. Troubleshooting
- **CORS errors:**
  - Make sure `CORS_ALLOWED_ORIGINS` in Django includes your Vercel frontend URL.
- **Invalid Host errors:**
  - Add your Render backend domain to `ALLOWED_HOSTS` in Django settings.
- **API not reachable:**
  - Double-check the API base URL in your React code.
- **Database connection errors:**
  - Ensure your RDS credentials and endpoint are correct and set as environment variables on Render.
  - Check RDS security group rules to allow connections from Render.
  - Make sure `psycopg2-binary` is in `requirements.txt`.
- **Migrations not applied:**
  - Run `python manage.py migrate` on Render after deployment.
- **Local development:**
  - Simply run `python manage.py migrate` and `python manage.py runserver` - SQLite will be used automatically when RDS variables are not set.

---

## 7. Useful Links
- [Render Django Deployment Guide](https://render.com/docs/deploy-django)
- [Vercel React Deployment Guide](https://vercel.com/guides/deploying-react-with-vercel)
- [Django CORS Headers](https://pypi.org/project/django-cors-headers/)
- [Amazon RDS PostgreSQL Docs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html)

---

## 8. Summary Table
| Part      | Platform | Directory         | Public URL Example                                   | Database                |
|-----------|----------|-------------------|------------------------------------------------------|-------------------------|
| Backend   | Render   | server/newproject | https://reactjs-django-simple-crud-book-app.onrender.com | Amazon RDS PostgreSQL   |
| Frontend  | Vercel   | client/app        | https://reactjs-django-test-app.vercel.app           | -                       |

---

This setup allows you to run your full-stack project online, with a professional deployment workflow, secure cloud database, and clear separation between frontend, backend, and database.
