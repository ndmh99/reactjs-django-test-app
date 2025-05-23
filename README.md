# React/Vite + Django + Amazon RDS Book Management Project

<p align="center">
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/react/react.png" alt="React" width="48" height="48"/>
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/django/django.png" alt="Django" width="48" height="48"/>
  <img src="https://vitejs.dev/logo.svg" alt="Vite" width="48" height="48"/>
  <img src="https://raw.githubusercontent.com/github/explore/main/topics/postgresql/postgresql.png" alt="PostgreSQL" width="48" height="48"/>
  <img src="https://static.wikia.nocookie.net/logopedia/images/a/a7/Vercel_favicon.svg" alt="Vercel" width="48" height="48"/>
  <img src="https://us1.discourse-cdn.com/flex016/uploads/render/original/2X/1/11352202c8503f736bea5efb59684f678d7c860c.svg" alt="Render" width="48" height="48"/>
</p>

A modern, beginner-friendly full-stack web application for managing a list of books. This project demonstrates how to build a robust RESTful API backend with **Django** and **Django REST Framework**, a fast and beautiful frontend with **React** (powered by **Vite**), and how to connect everything to a scalable **Amazon RDS PostgreSQL** cloud database. The app allows users to view, add, update, and delete books, and is ready for cloud deployment (Vercel FE + Render BE).

---

## Prerequisites
  <img src="https://nodejs.org/static/logos/nodejsDark.svg" alt="Nodejs" height="48"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/archive/c/c3/20220730085403%21Python-logo-notext.svg" alt="Nodejs" height="48"/>

- [Node.js & npm](https://nodejs.org/) (for React frontend)
- [Python 3.10+](https://www.python.org/) (for Django backend)
- **Make sure both are installed before running any commands!**

---

## Project Structure

```
react-django/
├── client/                # Frontend (React)
│   └── app/
│       ├── src/
│       │   ├── App.jsx    # Main React component (UI & API calls)
│       │   ├── App.css    # Styles for the app
│       │   └── ...        # Other React files/assets
│       └── ...            # Vite config, public assets, etc.
└── server/                # Backend (Django)
    └── newproject/
        ├── api/           # Django app for API
        │   ├── models.py      # Book model (database)
        │   ├── serializer.py  # BookSerializer (model <-> JSON)
        │   ├── views.py       # API views (CRUD logic)
        │   ├── urls.py        # API URL routes
        │   └── ...            # Admin, migrations, etc.
        ├── newproject/    # Django project config
        │   ├── settings.py    # Django settings
        │   ├── urls.py        # Main URL config (includes API)
        │   └── ...
        └── manage.py      # Django management script
```

---

## Action Flow: How the App Works

### 1. User Interacts with React Frontend
- The user opens the app in their browser (served by Vite/React).
- The main UI is in `client/app/src/App.jsx`.
- Users can:
  - View all books
  - Add a new book (title, release year)
  - Update a book's title
  - Delete a book

### 2. React Makes API Requests
- All actions (view, add, update, delete) trigger HTTP requests to the Django backend:
  - `GET /api/books/` — fetch all books
  - `POST /api/books/create/` — add a new book
  - `PUT /api/books/<id>/` — update a book
  - `DELETE /api/books/<id>/` — delete a book
- These endpoints are defined in `server/newproject/api/urls.py` and handled by views in `server/newproject/api/views.py`.

### 3. Django API Handles Requests
- **URL Routing:**
  - `server/newproject/newproject/urls.py` includes all `/api/` routes from the `api` app.
  - `server/newproject/api/urls.py` maps each API endpoint to a view function.
- **Views:**
  - `server/newproject/api/views.py` contains functions for each API action (get_books, create_book, book_detail).
- **Model & Serializer:**
  - `server/newproject/api/models.py` defines the `Book` model (fields: title, release_year).
  - `server/newproject/api/serializer.py` defines `BookSerializer` to convert between model instances and JSON.
- **Database:**
  - All book data is stored in the database (SQLite for local, Amazon RDS PostgreSQL for production).

### 4. Data Flow Example: Adding a Book
1. User fills out the form and clicks "Add Book" in the React UI.
2. React sends a `POST` request to `/api/books/create/` with the book data.
3. Django's `create_book` view receives the request, validates and saves the new book using `BookSerializer`.
4. The new book is saved in the database and returned as JSON.
5. React updates the UI to show the new book.

---

## How to Run the Project

### Backend (Django)
1. Open a terminal and navigate to `server/newproject/`.
2. Install dependencies:
   ```powershell
   pip install django djangorestframework django-cors-headers gunicorn psycopg2-binary
   ```
3. Run migrations:
   ```powershell
   python manage.py makemigrations
   python manage.py migrate
   ```
4. Start the server:
   ```powershell
   python manage.py runserver
   ```
   The API will be available at `http://127.0.0.1:8000/api/`.

### Frontend (React)
1. Open a new terminal and navigate to `client/app/`.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
   The app will be available at `http://localhost:5173/` (or as shown in your terminal).

---

## Key Files Explained

- **App.jsx** (React): Handles all UI and API calls. Well-commented for beginners.
- **models.py** (Django): Defines the Book model (database structure).
- **serializer.py** (Django): Converts Book objects to/from JSON for API communication.
- **views.py** (Django): Contains the logic for each API endpoint (CRUD operations).
- **urls.py** (Django): Maps URLs to views for both the project and the API app.

---

## Learning Resources
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite (React build tool)](https://vitejs.dev/)

---

## License
This project is for educational purposes.
