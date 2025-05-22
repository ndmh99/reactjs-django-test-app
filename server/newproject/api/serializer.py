"""
serializer.py

Defines the BookSerializer for converting Book model instances to and from JSON for API communication.
"""

from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    """
    Serializer for the Book model.
    Converts Book instances to JSON and validates input data for creating/updating books.
    """

    class Meta:
        model = Book
        fields = '__all__'  # Include all fields from the Book model