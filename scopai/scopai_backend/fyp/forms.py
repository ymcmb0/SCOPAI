from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password1', 'password2', 'role')  # Add 'role' if it's needed during registration

class CustomAuthenticationForm(AuthenticationForm):
    class Meta:
        model = CustomUser
