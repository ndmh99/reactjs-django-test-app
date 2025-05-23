# React + Django Command Cheatsheet

> **Prerequisites:** Make sure you have React (Node.js & npm) and Django (Python) installed on your system before running these commands.
> 
> **OS:** These commands are optimized for Windows PowerShell. For other shells, adjust accordingly.
> 
> **Last Updated:** May 22, 2025

---

## Django Backend (server/newproject)

### Initial Setup
```powershell
# Navigate to Django project
cd server/newproject

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows PowerShell)
.\venv\Scripts\Activate.ps1

# Upgrade pip (recommended)
python -m pip install --upgrade pip

# Install dependencies from requirements.txt
pip install -r requirements.txt

# OR install individual packages
pip install django djangorestframework django-cors-headers gunicorn psycopg2-binary python-decouple whitenoise
```

### Database Operations
```powershell
# Create migrations for model changes
python manage.py makemigrations

# Apply migrations to database
python manage.py migrate

# Reset migrations (use with caution)
python manage.py migrate --fake-initial

# Show migration status
python manage.py showmigrations

# Create database dump (SQLite)
python manage.py dumpdata > db_backup.json

# Load database dump
python manage.py loaddata db_backup.json
```

### User Management
```powershell
# Create admin superuser
python manage.py createsuperuser

# Create regular user (interactive)
python manage.py shell
# Then in shell: from django.contrib.auth.models import User; User.objects.create_user('username', 'email@example.com', 'password')

# Change user password
python manage.py changepassword <username>
```

### Development Server
```powershell
# Start development server (default port 8000)
python manage.py runserver

# Start on specific port
python manage.py runserver 8080

# Start on specific IP and port
python manage.py runserver 0.0.0.0:8000

# Run with specific settings
python manage.py runserver --settings=newproject.settings_dev
```

### Django Shell & Debugging
```powershell
# Open Django shell
python manage.py shell

# Open Django shell with IPython (if installed)
python manage.py shell_plus

# Check for problems
python manage.py check

# Validate models
python manage.py validate

# Show SQL for migrations
python manage.py sqlmigrate api 0001
```

### Static Files & Collectstatic
```powershell
# Collect static files for production
python manage.py collectstatic

# Collect static files without user input
python manage.py collectstatic --noinput

# Clear static files
python manage.py collectstatic --clear
```

### Testing
```powershell
# Run all tests
python manage.py test

# Run specific app tests
python manage.py test api

# Run with coverage (if installed)
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Production Preparation
```powershell
# Generate requirements.txt
pip freeze > requirements.txt

# Check deployment readiness
python manage.py check --deploy

# Create SECRET_KEY
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

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

## React Frontend (client/app)

### Initial Setup
```powershell
# Navigate to React project
cd client/app

# Install dependencies from package.json
npm install

# Install specific package
npm install <package-name>

# Install dev dependency
npm install --save-dev <package-name>

# Install package globally
npm install -g <package-name>

# Update all packages
npm update

# Check for outdated packages
npm outdated
```

### Development Server
```powershell
# Start development server (usually port 5173 for Vite)
npm run dev

# Start with specific port
npm run dev -- --port 3000

# Start with host binding
npm run dev -- --host 0.0.0.0
```

### Build Operations
```powershell
# Build for production
npm run build

# Preview production build locally
npm run preview

# Build with specific environment
npm run build -- --mode production

# Clean build directory
Remove-Item -Recurse -Force dist
```

### Package Management
```powershell
# List installed packages
npm list

# List global packages
npm list -g

# Uninstall package
npm uninstall <package-name>

# Install from package-lock.json (exact versions)
npm ci

# Audit for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix
```

### Linting & Formatting
```powershell
# Run ESLint
npm run lint

# Fix ESLint issues automatically
npm run lint -- --fix

# Run Prettier (if configured)
npx prettier --write src/

# Check TypeScript (if using TypeScript)
npx tsc --noEmit
```

---

## Git Commands

### Basic Operations
```powershell
# Initialize repository
git init

# Clone repository
git clone <repository-url>

# Check status
git status

# Add files to staging
git add .
git add <specific-file>

# Commit changes
git commit -m "Your commit message"

# Push to remote
git push origin main

# Pull from remote
git pull origin main
```

### Branching
```powershell
# Create new branch
git checkout -b feature-branch-name

# Switch to branch
git checkout main

# List branches
git branch
git branch -a  # include remote branches

# Delete branch
git branch -d feature-branch-name

# Merge branch
git checkout main
git merge feature-branch-name
```

### Remote Management
```powershell
# Add remote
git remote add origin <repository-url>

# View remotes
git remote -v

# Remove remote
git remote remove origin
```

---

## Environment & Dependencies

### Python Environment
```powershell
# Check Python version
python --version

# Check pip version
pip --version

# List installed packages
pip list

# Show package info
pip show <package-name>

# Uninstall package
pip uninstall <package-name>

# Install from requirements.txt
pip install -r requirements.txt

# Create requirements.txt
pip freeze > requirements.txt
```

### Node.js Environment
```powershell
# Check Node.js version
node --version

# Check npm version
npm --version

# Check npx version
npx --version

# Clear npm cache
npm cache clean --force

# Update npm
npm install -g npm@latest
```

---

## Development Workflow

### Daily Development
```powershell
# 1. Start backend
cd server/newproject
.\venv\Scripts\Activate.ps1
python manage.py runserver

# 2. Start frontend (new terminal)
cd client/app
npm run dev

# 3. Check both are running:
# - Django API: http://localhost:8000/
# - React App: http://localhost:5173/
```

### Before Committing
```powershell
# 1. Run tests
cd server/newproject
python manage.py test

# 2. Check linting
cd client/app
npm run lint

# 3. Build to ensure it works
npm run build

# 4. Update requirements if needed
cd server/newproject
pip freeze > requirements.txt
```

---

## Deployment Commands

### Render (Backend)
```powershell
# Install production dependencies
pip install gunicorn whitenoise

# Test production server locally
gunicorn newproject.wsgi:application

# Collect static files
python manage.py collectstatic --noinput

# Run migrations (on Render)
python manage.py migrate
```

### Vercel (Frontend)
```powershell
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from local
vercel

# Deploy to production
vercel --prod
```

---

## Troubleshooting Commands

### Django Issues
```powershell
# Check Django configuration
python manage.py check

# Debug database issues
python manage.py dbshell

# Reset database (SQLite only)
Remove-Item db.sqlite3
python manage.py migrate

# View Django logs with more detail
python manage.py runserver --verbosity=2
```

### React Issues
```powershell
# Clear node modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Clear npm cache
npm cache clean --force

# Check for dependency conflicts
npm ls
```

### Network Issues
```powershell
# Check if ports are in use
netstat -ano | findstr :8000  # Django
netstat -ano | findstr :5173  # Vite

# Kill process on port (replace PID)
taskkill /PID <PID> /F
```

---

## Useful One-liners

```powershell
# Quick project setup
git clone <repo> && cd <repo> && cd server/newproject && python -m venv venv && .\venv\Scripts\Activate.ps1 && pip install -r requirements.txt && python manage.py migrate

# Quick frontend setup
cd client/app && npm install && npm run dev

# Full reset (use with caution)
Remove-Item -Recurse -Force node_modules, venv, db.sqlite3, package-lock.json

# Check all running processes
Get-Process | Where-Object {$_.ProcessName -like "*python*" -or $_.ProcessName -like "*node*"}
```
