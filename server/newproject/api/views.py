"""
views.py

This file contains the API views for the Book model using Django REST Framework.
It provides endpoints to list, create, update, and delete books.

Each view is documented for clarity and to help beginners understand how Django REST Framework works.
"""
from rest_framework.decorators import api_view  # Decorator to specify allowed HTTP methods for a view
from rest_framework.response import Response     # Used to return API responses (usually JSON)
from rest_framework import status                # Provides HTTP status codes for responses
from .models import Book                         # The Book model (database table)
from .serializer import BookSerializer           # Serializer to convert Book instances to/from JSON

# --- API Views ---

@api_view(['GET'])
def get_books(request):
    """
    Retrieve a list of all books in the database.
    Method: GET
    URL: /api/books/
    Returns: JSON list of all books
    """
    books = Book.objects.all()  # Query all Book objects from the database
    serializedData = BookSerializer(books, many=True).data  # Serialize the queryset to JSON
    return Response(serializedData)  # Return the serialized data as a JSON response

@api_view(['POST'])
def create_book(request):
    """
    Create a new book in the database.
    Method: POST
    URL: /api/books/create/
    Body: JSON with 'title' and 'release_year'
    Returns: JSON of the created book or errors
    """
    data = request.data  # Get data sent in the request body
    serializer = BookSerializer(data=data)  # Create serializer with the data
    if serializer.is_valid():  # Validate the data
        serializer.save()      # Save the new book to the database
        return Response(serializer.data, status=status.HTTP_201_CREATED)  # Return the created book
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors

@api_view(['PUT', 'DELETE'])
def book_detail(request, pk):
    """
    Update or delete a specific book by its primary key (ID).
    Methods: PUT (update), DELETE (delete)
    URL: /api/books/<pk>/
    - PUT: Body should include updated 'title' and 'release_year'.
    - DELETE: No body required.
    Returns: JSON of updated book, or status code for delete/not found/errors.
    """
    try:
        book = Book.objects.get(pk=pk)  # Try to get the book by primary key
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)  # Return 404 if not found

    if request.method == 'DELETE':
        book.delete()  # Delete the book from the database
        return Response(status=status.HTTP_204_NO_CONTENT)  # Return 204 No Content
    elif request.method == 'PUT':
        data = request.data  # Get updated data from request
        serializer = BookSerializer(book, data=data)  # Create serializer with existing book and new data
        if serializer.is_valid():
            serializer.save()  # Save the updated book
            return Response(serializer.data)  # Return the updated book data
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)  # Return validation errors