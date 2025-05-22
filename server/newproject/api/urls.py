"""
urls.py

Defines the URL patterns for the Book API endpoints.
Maps HTTP routes to the corresponding view functions.
"""

from django.urls import path
from .views import get_books, create_book, book_detail

urlpatterns = [
    path('books/', get_books, name='get_books'),  # GET: List all books
    path('books/create/', create_book, name='create_book'),  # POST: Create a new book
    path('books/<int:pk>/', book_detail, name='book_detail'),  # PUT/DELETE: Update or delete a book by ID
]

