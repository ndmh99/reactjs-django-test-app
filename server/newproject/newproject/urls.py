"""
urls.py

Main URL configuration for the Django project 'newproject'.

This file defines the root URL patterns for the project, including the admin interface and API endpoints.
It uses Django's 'include' function to delegate API routes to the api app's URL configuration.

For more information, see:
https://docs.djangoproject.com/en/5.2/topics/http/urls/
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),  # Admin interface

    # API endpoints: redirect all /api/ routes to the api app
    path('api/', include('api.urls')),
]

