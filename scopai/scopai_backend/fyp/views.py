from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication,TokenAuthentication
from rest_framework.authtoken.models import Token
from django.utils.http import urlsafe_base64_decode
from django.utils.http import urlsafe_base64_decode
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
from django.core.exceptions import ValidationError
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, AdPosterSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import AdPoster
from django.contrib.sites.shortcuts import get_current_site
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.urls import reverse
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.contrib.auth.tokens import default_token_generator, PasswordResetTokenGenerator
from .token import account_activation_token
from .models import AppUser
from .serializers import CardInformationSerializer
import stripe
import random
from django.contrib.auth.hashers import check_password



class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                self.send_verification_email(user, request)
                return Response(
                    {'message': 'Registration successful. Please check your email for the activation link.'},
                    status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user, request):
        try:
            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_url = reverse('activate_account')  # Replace 'activate_account' with your activation URL name
            activation_link = f"http://{current_site.domain}{activation_url}?uid={uid}&token={token}"

            subject = 'Activate Your Account'
            message = render_to_string('registration/email2.html', {
                'user': user,
                'activation_link': activation_link,
            })
            plain_message = strip_tags(message)
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [user.email], html_message=message)

        except Exception as e:
            print(f"Error sending verification email: {e}")

class ActivateAccount(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        uidb64 = request.GET.get('uid')
        token = request.GET.get('token')
        print(uidb64,token)
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = AppUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, AppUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            current_site = get_current_site(request)
            reset_url = f"http://{current_site.domain}/password/reset/confirm/?uid={uidb64}&token={token}"
            activation_link = f"http://{current_site.domain}{reset_url}?uid={uid}&token={token}"
            subject = 'Successfully activated Account'
            message = render_to_string('registration/successfully_activated.html')
            plain_message = strip_tags(message)
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [user.email], html_message=message)
            return Response({'message': 'Your account has been activated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid activation link.'}, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication, TokenAuthentication)

    def post(self, request):
        data = request.data
        serializer = UserLoginSerializer(data=data)

        try:
            serializer.is_valid(raise_exception=True)
        except serializer.ValidationError as e:
            return Response({'message': e.detail}, status=status.HTTP_400_BAD_REQUEST)
        user = serializer.check_user(data)
        login(request, user)
        subscription_status = user.subscription

        # Generate token for the user
        token, _ = Token.objects.get_or_create(user=user)

        response_data = {
            'token': token.key,  # Include the token in the response
            'user': serializer.data,
            'subscription_status': subscription_status,
        }
        return Response(response_data, status=status.HTTP_200_OK)

class PasswordResetView(APIView):

    def post(self, request):
        email = request.data.get('email', None)
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = AppUser.objects.get(email=email)
        except AppUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

        # Generate token for password reset
        token_generator = PasswordResetTokenGenerator()
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = token_generator.make_token(user)
        current_site = get_current_site(request)
        # Send password reset email
        subject = 'Password Reset Request'
        reset_url = f"http://localhost:3000/password/reset/confirm/uidb64={uidb64}/token={token}"
        message = render_to_string('reset/password_reset_email.html', {
            'reset_url': reset_url,
        })
        plain_message = strip_tags(message)
        send_mail(subject, plain_message, settings.DEFAULT_FROM_EMAIL, [email],html_message=message)

        return Response({'detail': 'Password reset email sent'}, status=status.HTTP_200_OK)


class PasswordResetConfirm(APIView):
    def post(self, request):
        uidb64 = request.GET.get('uidb64', None)
        token = request.GET.get('token', None)
        newpassword = request.data.get('newpassword', None)
        if not uidb64 or not token:
            return Response({'error': 'uidb64 and token are required'}, status=status.HTTP_400_BAD_REQUEST)

        if not newpassword:
            return Response({'error': 'new_password is required in the request body'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = AppUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, AppUser.DoesNotExist):
            return Response({'error': 'Invalid user'}, status=status.HTTP_400_BAD_REQUEST)

        if not default_token_generator.check_token(user, token):
            return Response({'error': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        # Set the new password and save the user
        user.set_password(newpassword)
        user.save()
        current_site = get_current_site(request)
        subject = 'Password Reset Successfully'
        reset_url = f"http://{current_site.domain}/api/password/reset/confirm/?uidb64={uidb64}&token={token}"
        message = render_to_string('reset/password_reset_succesfull.html', {
            'reset_url': reset_url,
        })
        plain_message = strip_tags(message)
        send_mail(subject, plain_message, settings.DEFAULT_FROM_EMAIL, [user.email], html_message=message)
        return Response({'detail': 'Password reset successful email sent'}, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class UserActivation(APIView):
    permission_classes = (permissions.AllowAny,)  # Allow unauthenticated users

    def get(self, request, uidb64, token):
        try:
            uid = urlsafe_base64_decode(uidb64).decode()
            user = AppUser.objects.get(pk=uid)
        except (TypeError, ValueError, OverflowError, AppUser.DoesNotExist):
            user = None

        if user is not None and default_token_generator.check_token(user, token):
            user.is_active = True
            user.save()
            return Response({'message': 'Account activated successfully.'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Activation link is invalid.'}, status=status.HTTP_400_BAD_REQUEST)

class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,TokenAuthentication)

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


class AdUpload(APIView):
    def post(self, request):
        serializer = AdPosterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print(serializer.errors)  # Log serializer errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AdList(APIView):

    def get(self, request):
        ads = AdPoster.objects.all()
        if ads:
            advertisement = random.choice(ads)
            serializer = AdPosterSerializer(advertisement)
            return Response(serializer.data)
        else:
            return Response({"error": "No advertisements available"}, status=404)

# PLAN_IDS = {
#     'advertiser': 'prod_Pn8kwoLGc780dI',
#     'developer': 'prod_Pn8hSeRuz1Tao4',
#     'both': 'prod_Pn8jwuvUCpJJiQ',
# }

class PaymentAPI(APIView):
    serializer_class = CardInformationSerializer

    
    PLAN_IDS = {
        'advertiser': 'price_1OxYSpJAEZblQ9ZUiGmQcwZm',
        'developer': 'price_1OyfZaJAEZblQ9ZUmBwU5Non',
        'both': 'price_1OxYSAJAEZblQ9ZUfqeWQyrD',
    }

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        response = {}

        if serializer.is_valid():
            data_dict = serializer.validated_data
            stripe.api_key = 'sk_test_51OxRN4JAEZblQ9ZUXxKNHf8o745ZDtSbPCuuTTDlX5fvJpmw5LEMZzXCvmpwiHZOFKLA6dbEad9X7myLf56SJ0lj00V8Bhy1f7'
            selected_plan = data_dict.get('selected_plan', '')
            if selected_plan in self.PLAN_IDS:
                plan_id = self.PLAN_IDS[selected_plan]
                response = self.create_subscription(data_dict=data_dict, plan_id=plan_id)
                if response.get('status') == status.HTTP_201_CREATED:
                    # send email upon successful payment
                    self.send_payment_confirmation_email(data_dict['email'], selected_plan)
                    # update subscription field to True for the user
                    email = data_dict.get('email', '')
                    if email:
                        try:
                            user = AppUser.objects.get(email=email)
                            user.subscription = True
                            user.save()
                        except AppUser.DoesNotExist:
                            pass
            else:
                response = {'error': 'Invalid subscription plan selected.', 'status': status.HTTP_400_BAD_REQUEST}
        else:
            response = {'errors': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
                
        return Response(response)

    def create_subscription(self, data_dict, plan_id):
        try:
            customer = stripe.Customer.create(
                source=data_dict['pm_card_token'],
                email=data_dict['email'],
                name=data_dict['name']  
            )

            stripe.Subscription.create(
                customer=customer.id,
                items=[
                    {
                        'price': plan_id,
                        'quantity': 1,  
                    },
                ],
                collection_method='charge_automatically'
            )

            # update user subscription status
            user_email = data_dict['email']
            user = AppUser.objects.get(email=user_email)
            user.subscription = True
            user.save()

            return {'message': 'Subscription created successfully.', 'status': status.HTTP_201_CREATED}
        except stripe.error.StripeError as e:
            return {'error': str(e), 'status': status.HTTP_400_BAD_REQUEST}

    def send_payment_confirmation_email(self, email, plan):
        try:
            subject = 'Payment Confirmation'
            message = render_to_string('registration/email.html', {
                'plan': plan,
            })
            plain_message = strip_tags(message)
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [email], html_message=message)
        except Exception as e:
            print(f"Error sending payment confirmation email: {e}")

class UpdateProfile(APIView):
    serializer_class = UserSerializer
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    permission_classes = [permissions.IsAuthenticated, ]

    def put(self, request, *args, **kwargs):
        try:
            # Get the current user
            user = self.request.user
            # Get data from request
            new_username = request.data.get('new_username')
            new_email = request.data.get('new_email')
            password = request.data.get('password')
            # Check if the password matches
            if not check_password(password, user.password):
                return Response({'error': 'Password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)
            user.username = new_username
            user.email = new_email
            user.is_active = False
            current_site = get_current_site(request)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            token = default_token_generator.make_token(user)
            activation_url = reverse('activate_account')  # Replace 'activate_account' with your activation URL name
            activation_link = f"http://{current_site.domain}{activation_url}?uid={uid}&token{token}"
            subject = 'Activate Your Account'
            message = render_to_string('registration/email2.html', {
                'user': user,
                'activation_link': activation_link,
            })
            plain_message = strip_tags(message)
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [user.email], html_message=message)
            # Save the updated user object
            user.save()

            return Response({'message': 'Profile updated successfully.'}, status=status.HTTP_201_CREATED)
        except PermissionDenied as e:
                return Response({"error": str(e)}, status=status.HTTP_403_FORBIDDEN)

class ChangePassword(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication, TokenAuthentication)
    def put(self, request, *args, **kwargs):
            # Get the current user
            user = request.user

            # Check if the old password matches
            old_password = request.data.get('old_password')
            print(old_password)
            if not user.check_password(old_password):
                return Response({'message': 'Old password is incorrect.'}, status=status.HTTP_400_BAD_REQUEST)

            # Update the password
            new_password = request.data.get('new_password')
            confirm_password = request.data.get('confirm_password')
            if new_password != confirm_password:
                return Response({'message': 'Passwords do not match with each other .'}, status=status.HTTP_400_BAD_REQUEST)
            user.set_password(new_password)
            user.save()

            return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
