# urls.py
from django.urls import path
from .api_views import api_register, api_login
from .views import upload_ad_poster
urlpatterns = [
    path('register/', api_register, name='api_register'),
    path('login/', api_login, name='api_login'),
    path('api/upload-ad/', upload_ad_poster),
]
