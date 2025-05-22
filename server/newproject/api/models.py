"""
models.py

Defines the Book model for the application. This model represents a book with a title and release year.
"""

from django.db import models

class Book(models.Model):
    """
    Book model representing a book in the database.
    Fields:
        - title (CharField): The title of the book.
        - release_year (IntegerField): The year the book was released.
    """
    title = models.CharField(max_length=200)
    release_year = models.IntegerField()

    def __str__(self):
        """String representation of the Book object."""
        return f"{self.title} ({self.release_year})"
