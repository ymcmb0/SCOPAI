# api_views.py
from django.contrib.auth import login, authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import CustomUserSerializer
from .forms import CustomUserCreationForm, CustomAuthenticationForm
from .views import register, user_login
from .managers import CustomUserManager

@api_view(['POST'])
def api_register(request):
    if request.method == 'POST':
        # Use the custom manager to create a user with the form data
        manager = CustomUserManager()
        user = manager.create_user_with_form(request.data)
        if user:
            user_login(request, user)
            serializer = CustomUserSerializer(user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response({'error': 'Invalid form data'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['POST'])
def api_login(request):
    if request.method == 'POST':
        form = CustomAuthenticationForm(request, data=request.data)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                user_login(request, user)
                serializer = CustomUserSerializer(user)
                return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
