from rest_framework import serializers
from .models import CustomUser, AdPoster  # Import the AdPoster model

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['email', 'username', 'password']
        extra_kwargs = {'password': {'write_only': True}}

class CustomAuthenticationSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

# The AdPosterSerializer should come after the AdPoster model is imported
class AdPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdPoster
        fields = ['image']
