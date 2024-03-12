from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, authenticate
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser, AdPoster
from .serializers import CustomUserSerializer, CustomAuthenticationSerializer, AdPosterSerializer

def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('/login')  # Redirect to your home page
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('login')  # Redirect to your home page
    else:
        form = AuthenticationForm()
    return render(request, 'registration/login.html', {'form': form})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_ad_poster(request):
    if request.method == 'POST':
        serializer = AdPosterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET'])
def get_ads(request):
    if request.method == 'GET':
        ads = AdPoster.objects.all()
        serializer = AdPosterSerializer(ads, many=True)
        return Response(serializer.data)