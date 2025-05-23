# Full-Stack React + Django + Amazon RDS Book Management Project: Complete Build Guide

This is a brainless step-by-step guide to build a complete full-stack web application from scratch. Follow each numbered step exactly as written.

---

## What You'll Build
- **Frontend:** React app with book management features
- **Backend:** Django REST API
- **Database:** Amazon RDS PostgreSQL
- **Deployment:** Vercel (frontend) + Render (backend)

---

## Prerequisites You Need
1. Install Python 3.8+ from python.org
2. Install Node.js 18+ from nodejs.org
3. Install Git from git-scm.com
4. Create GitHub account
5. Create AWS account (free tier)
6. Create Vercel account (free)
7. Create Render account (free)

---

## PART 1: CREATE PROJECT STRUCTURE

1. Open terminal/command prompt

2. Create main project folder:
   ```powershell
   mkdir react-django-project
   cd react-django-project
   ```

3. Create folder structure:
   ```powershell
   mkdir server
   mkdir client
   mkdir docs
   ```

---

## PART 2: BUILD DJANGO BACKEND

4. Navigate to server folder:
   ```powershell
   cd server
   ```

5. Create Python virtual environment:
   ```powershell
   python -m venv venv
   ```

6. Activate virtual environment:
   ```powershell
   # Windows
   venv\Scripts\activate
   # Mac/Linux
   source venv/bin/activate
   ```

7. Install Django and required packages:
   ```powershell
   pip install django
   pip install djangorestframework
   pip install django-cors-headers
   pip install psycopg2-binary
   pip install gunicorn
   pip install python-decouple
   ```

8. Create Django project:
   ```powershell
   django-admin startproject newproject
   cd newproject
   ```

9. Create Django app:
   ```powershell
   python manage.py startapp api
   ```

10. Create requirements.txt file:
    ```powershell
    pip freeze > requirements.txt
    ```

11. Open newproject/settings.py and replace content with:
    ```python
    import os
    from decouple import config
    
    BASE_DIR = Path(__file__).resolve().parent.parent
    
    SECRET_KEY = config('SECRET_KEY', default='your-secret-key-here')
    DEBUG = config('DEBUG', default=True, cast=bool)
    
    ALLOWED_HOSTS = ['*']
    
    INSTALLED_APPS = [
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.staticfiles',
        'rest_framework',
        'corsheaders',
        'api',
    ]
    
    MIDDLEWARE = [
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.security.SecurityMiddleware',
        'django.contrib.sessions.middleware.SessionMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
    ]
    
    ROOT_URLCONF = 'newproject.urls'
    
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'DIRS': [],
            'APP_DIRS': True,
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.contrib.messages.context_processors.messages',
                ],
            },
        },
    ]
    
    WSGI_APPLICATION = 'newproject.wsgi.application'
    
    # Database configuration - automatically detects environment
    rds_db_name = config('RDS_DB_NAME', default=None)
    rds_username = config('RDS_USERNAME', default=None)
    rds_password = config('RDS_PASSWORD', default=None)
    rds_hostname = config('RDS_HOSTNAME', default=None)
    
    if all([rds_db_name, rds_username, rds_password, rds_hostname]):
        # Use PostgreSQL when RDS variables are available
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.postgresql',
                'NAME': rds_db_name,
                'USER': rds_username,
                'PASSWORD': rds_password,
                'HOST': rds_hostname,
                'PORT': config('RDS_PORT', default='5432'),
            }
        }
    else:
        # Use SQLite for local development
        DATABASES = {
            'default': {
                'ENGINE': 'django.db.backends.sqlite3',
                'NAME': BASE_DIR / 'db.sqlite3',
            }
        }
    
    LANGUAGE_CODE = 'en-us'
    TIME_ZONE = 'UTC'
    USE_I18N = True
    USE_TZ = True
    
    STATIC_URL = '/static/'
    DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
    
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]
    
    REST_FRAMEWORK = {
        'DEFAULT_PERMISSION_CLASSES': [
            'rest_framework.permissions.AllowAny',
        ]
    }
    ```

12. Open api/models.py and add:
    ```python
    from django.db import models
    
    class Book(models.Model):
        title = models.CharField(max_length=200, unique=True)
        author = models.CharField(max_length=100)
        isbn = models.CharField(max_length=13, unique=True)
        published_date = models.DateField()
        pages = models.IntegerField()
        
        def __str__(self):
            return self.title
    ```

13. Create api/serializer.py:
    ```python
    from rest_framework import serializers
    from .models import Book
    
    class BookSerializer(serializers.ModelSerializer):
        class Meta:
            model = Book
            fields = '__all__'
    ```

14. Open api/views.py and replace with:
    ```python
    from rest_framework import viewsets
    from .models import Book
    from .serializer import BookSerializer
    
    class BookViewSet(viewsets.ModelViewSet):
        queryset = Book.objects.all()
        serializer_class = BookSerializer
    ```

15. Create api/urls.py:
    ```python
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import BookViewSet
    
    router = DefaultRouter()
    router.register(r'books', BookViewSet)
    
    urlpatterns = [
        path('', include(router.urls)),
    ]
    ```

16. Open newproject/urls.py and replace with:
    ```python
    from django.contrib import admin
    from django.urls import path, include
    
    urlpatterns = [
        path('admin/', admin.site.urls),
        path('api/', include('api.urls')),
    ]
    ```

17. Run migrations:
    ```powershell
    python manage.py makemigrations
    python manage.py migrate
    ```

18. Create superuser:
    ```powershell
    python manage.py createsuperuser
    ```

19. Test Django server:
    ```powershell
    python manage.py runserver
    ```

20. Open browser and verify http://127.0.0.1:8000/api/books/ works

---

## PART 3: BUILD REACT FRONTEND

21. Open new terminal and navigate to client folder:
    ```powershell
    cd client
    ```

22. Create React app with Vite:
    ```powershell
    npm create vite@latest app -- --template react
    cd app
    ```

23. Install dependencies:
    ```powershell
    npm install
    npm install axios
    ```

24. Replace src/App.jsx with:
    ```jsx
    import { useState, useEffect } from 'react'
    import axios from 'axios'
    import './App.css'
    
    const API_URL = 'http://127.0.0.1:8000/api'
    
    function App() {
      const [books, setBooks] = useState([])
      const [form, setForm] = useState({
        title: '',
        author: '',
        isbn: '',
        published_date: '',
        pages: ''
      })
      const [editingId, setEditingId] = useState(null)
    
      useEffect(() => {
        fetchBooks()
      }, [])
    
      const fetchBooks = async () => {
        try {
          const response = await axios.get(`${API_URL}/books/`)
          setBooks(response.data)
        } catch (error) {
          console.error('Error fetching books:', error)
        }
      }
    
      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          if (editingId) {
            await axios.put(`${API_URL}/books/${editingId}/`, form)
            setEditingId(null)
          } else {
            await axios.post(`${API_URL}/books/`, form)
          }
          setForm({ title: '', author: '', isbn: '', published_date: '', pages: '' })
          fetchBooks()
        } catch (error) {
          console.error('Error saving book:', error)
        }
      }
    
      const handleEdit = (book) => {
        setForm(book)
        setEditingId(book.id)
      }
    
      const handleDelete = async (id) => {
        try {
          await axios.delete(`${API_URL}/books/${id}/`)
          fetchBooks()
        } catch (error) {
          console.error('Error deleting book:', error)
        }
      }
    
      return (
        <div className="App">
          <h1>Book Management System</h1>
          
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({...form, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({...form, author: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="ISBN"
              value={form.isbn}
              onChange={(e) => setForm({...form, isbn: e.target.value})}
              required
            />
            <input
              type="date"
              value={form.published_date}
              onChange={(e) => setForm({...form, published_date: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Pages"
              value={form.pages}
              onChange={(e) => setForm({...form, pages: e.target.value})}
              required
            />
            <button type="submit">
              {editingId ? 'Update Book' : 'Add Book'}
            </button>
          </form>
    
          <div className="books-list">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
                <p>ISBN: {book.isbn}</p>
                <p>Published: {book.published_date}</p>
                <p>Pages: {book.pages}</p>
                <button onClick={() => handleEdit(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )
    }
    
    export default App
    ```

25. Replace src/App.css with:
    ```css
    .App {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
      max-width: 400px;
      margin-bottom: 30px;
    }
    
    input, button {
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    button {
      background-color: #007bff;
      color: white;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #0056b3;
    }
    
    .books-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }
    
    .book-card {
      border: 1px solid #ddd;
      padding: 15px;
      border-radius: 8px;
      background-color: #f9f9f9;
    }
    
    .book-card h3 {
      margin-top: 0;
      color: #333;
    }
    
    .book-card button {
      margin-right: 10px;
      margin-top: 10px;
    }
    ```

26. Test React app:
    ```powershell
    npm run dev
    ```

27. Open browser and verify http://localhost:5173 works

---

## PART 4: SETUP AMAZON RDS DATABASE

28. Login to AWS Console

29. Search for "RDS" service

30. Click "Create database"

31. Choose "PostgreSQL"

32. Choose "Free tier"

33. Set DB instance identifier: "bookdb"

34. Set Master username: "postgres"

35. Set Master password: "yourpassword123"

36. Keep default VPC and subnet

37. Set "Public access" to "Yes"

38. Create new security group: "bookdb-sg"

39. Click "Create database"

40. Wait 5-10 minutes for database to be ready

41. Click on your database instance

42. Copy the "Endpoint" value (looks like: bookdb.xxxxx.us-east-1.rds.amazonaws.com)

43. Click on security group link

44. Click "Edit inbound rules"

45. Add rule: Type=PostgreSQL, Port=5432, Source=Anywhere (0.0.0.0/0)

46. Save rules

---

## PART 5: CONNECT DJANGO TO RDS

47. Go back to Django terminal

48. Create .env file in server/newproject/:
    ```
    SECRET_KEY=your-super-secret-key-here
    DEBUG=True
    RDS_DB_NAME=postgres
    RDS_USERNAME=postgres
    RDS_PASSWORD=yourpassword123
    RDS_HOSTNAME=your-rds-endpoint-here
    RDS_PORT=5432
    ```

49. Run migrations to RDS:
    ```powershell
    python manage.py migrate
    ```

50. Create superuser on RDS:
    ```powershell
    python manage.py createsuperuser
    ```

---

## PART 6: DEPLOY BACKEND TO RENDER

51. Create GitHub repository

52. Initialize git in project root:
    ```powershell
    cd ../../
    git init
    git add .
    git commit -m "Initial commit"
    ```

53. Push to GitHub:
    ```powershell
    git remote add origin https://github.com/yourusername/yourrepo.git
    git branch -M main
    git push -u origin main
    ```

54. Go to render.com

55. Click "New" → "Web Service"

56. Connect your GitHub repository

57. Set Name: "book-api"

58. Set Root Directory: "server/newproject"

59. Set Build Command: "pip install -r requirements.txt"

60. Set Start Command: "gunicorn newproject.wsgi"

61. Add environment variables:
    - SECRET_KEY: your-super-secret-key-here
    - DEBUG: False
    - RDS_DB_NAME: postgres
    - RDS_USERNAME: postgres
    - RDS_PASSWORD: yourpassword123
    - RDS_HOSTNAME: your-rds-endpoint
    - RDS_PORT: 5432

62. Click "Create Web Service"

63. Wait for deployment to complete

64. Copy your Render URL (like: https://book-api-xxx.onrender.com)

65. Open Render dashboard → Your service → Shell

66. Run in shell:
    ```powershell
    python manage.py migrate
    ```

---

## PART 7: DEPLOY FRONTEND TO VERCEL

67. Update React API URL in src/App.jsx:
    ```jsx
    const API_URL = 'https://your-render-url.onrender.com/api'
    ```

68. Update Django CORS settings with your future Vercel URL

69. Build React app:
    ```powershell
    cd client/app
    npm run build
    ```

70. Go to vercel.com

71. Click "Add New" → "Project"

72. Import your GitHub repository

73. Set Framework: "Vite"

74. Set Root Directory: "client/app"

75. Keep build command as "npm run build"

76. Keep output directory as "dist"

77. Click "Deploy"

78. Wait for deployment

79. Copy your Vercel URL

80. Update Django CORS_ALLOWED_ORIGINS in settings.py:
    ```python
    CORS_ALLOWED_ORIGINS = [
        "http://localhost:5173",
        "https://your-vercel-url.vercel.app",
    ]
    ```

81. Push changes to GitHub

82. Render will auto-redeploy

---

## PART 8: FINAL TESTING

83. Open your Vercel URL

84. Test adding a book

85. Test editing a book

86. Test deleting a book

87. Verify data persists in RDS

---

## Congratulations! 🎉

You've successfully built and deployed a full-stack web application with:
- React frontend on Vercel
- Django REST API on Render  
- PostgreSQL database on Amazon RDS
- Full CRUD operations
- Cloud deployment

Your app is now live and accessible from anywhere in the world!

---

## Useful Commands for Future Reference
- Start Django: `python manage.py runserver`
- Start React: `npm run dev`
- Deploy updates: `git add . && git commit -m "update" && git push`
- Check logs: Use Render dashboard logs section
