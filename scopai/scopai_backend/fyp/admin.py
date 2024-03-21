from django.contrib import admin
from .models import AppUser  # Import your AppUser model from models.py

# Register your models here.
admin.site.register(AppUser)  # Register the AppUser model with the admin
