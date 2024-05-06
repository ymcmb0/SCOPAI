from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from .validations import custom_validation, validate_email, validate_username,validate_password
from .models import AdPoster
import datetime

UserModel = get_user_model()
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'username']  # Add other fields as needed


class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserModel
        fields = ['email', 'username', 'password']

    def validate(self, data):
        """
        Validate the serializer data.
        """
        data = custom_validation(data)
        data = validate_password(data)

        if UserModel.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError('This email is already in use.')

        if UserModel.objects.filter(username=data['username']).exists():
            raise serializers.ValidationError('This username is already in use.')

        return data

    def create(self, validated_data):
        """
        Create and return a new user instance, given the validated data.
        """
        password = validated_data.pop('password')
        user = UserModel.objects.create_user(password=password, **validated_data)
        return user

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, clean_data):
        user = authenticate(username=clean_data['email'], password=clean_data['password'])
        if user is None:
            raise serializers.ValidationError('Either User not Found or Account is Inactive, Please Activate it')
        # print("USERR",user)
        # if user.is_active is not False:
        #     raise serializers.ValidationError('User account is not active. Please verify your email address.')
        #
        # if user is not None:
        #     raise serializers.ValidationError('user not found')
        #     # Check if the user is active

        return user




class AdPosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdPoster
        fields = ['image', 'link', 'description']




def check_payment_method(value):
    payment_method = value.lower()
    if payment_method not in ["card"]:
        raise serializers.ValidationError("Invalid payment_method.")

class CardInformationSerializer(serializers.Serializer):
    pm_card_token = serializers.CharField(max_length=150, required=True)  
    selected_plan = serializers.ChoiceField(choices=('advertiser', 'developer', 'both'), required=True)
    email = serializers.EmailField(required=True)
    name = serializers.CharField(max_length=255, required=True)
    