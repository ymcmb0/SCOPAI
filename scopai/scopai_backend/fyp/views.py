from django.conf import settings
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
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
from django.contrib.auth.tokens import default_token_generator
from .token import account_activation_token
from .models import AppUser
from .serializers import CardInformationSerializer
import stripe



class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                self.send_verification_email(user, request)  
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)

    def send_verification_email(self, user, request):
        try:
            current_site = get_current_site(request)
            subject = 'Activate Your Account'
            message = render_to_string('registration/email2.html', {
                'user': user,
                'domain': current_site.domain,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'token': default_token_generator.make_token(user),
            })
            plain_message = strip_tags(message)
            send_mail(subject, plain_message, settings.EMAIL_HOST_USER, [user.email], html_message=message)
        except Exception as e:
            print(f"Error sending verification email: {e}")

class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            subscription_status = user.subscription
            response_data = {
                'user': serializer.data,
                'subscription_status': subscription_status,
            }
        return Response(response_data, status=status.HTTP_200_OK)

class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)

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
        serializer = AdPosterSerializer(ads, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import CardInformationSerializer
import stripe

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



