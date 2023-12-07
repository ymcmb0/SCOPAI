# urls.py
from django.urls import path
from .api_views import api_register, api_login

urlpatterns = [
    path('api/register/', api_register, name='api_register'),
    path('api/login/', api_login, name='api_login'),
    # ... other URL patterns
]
