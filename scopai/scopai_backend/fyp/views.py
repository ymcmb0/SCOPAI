from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer, AdPosterSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from .models import AdPoster
from .serializers import CardInformationSerializer
import stripe

# JazzCash configuration
JAZZCASH_MERCHANT_ID = ""
JAZZCASH_PASSWORD = ""
JAZZCASH_RETURN_URL = "http://127.0.0.1:8000/success"
JAZZCASH_INTEGRITY_SALT = ""


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


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
            return Response(serializer.data, status=status.HTTP_200_OK)


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

PLAN_IDS = {
    'advertiser': 'prod_Pn8kwoLGc780dI',
    'developer': 'prod_Pn8hSeRuz1Tao4',
    'both': 'prod_Pn8jwuvUCpJJiQ',
}

class PaymentAPI(APIView):
    serializer_class = CardInformationSerializer

    PLAN_IDS = {
        'advertiser': 'price_1OxYSpJAEZblQ9ZUiGmQcwZm',
        'developer': 'price_1OxYQPJAEZblQ9ZUlNKIs37b',
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
            else:
                response = {'error': 'Invalid subscription plan selected.', 'status': status.HTTP_400_BAD_REQUEST}
        else:
            response = {'errors': serializer.errors, 'status': status.HTTP_400_BAD_REQUEST}
                
        return Response(response)

    def create_subscription(self, data_dict, plan_id):
        try:
            # Create a new customer in Stripe
            customer = stripe.Customer.create(
                source=data_dict['pm_card_token']  # Assuming pm_card_token is part of your CardInformationSerializer
            )

            # Create a subscription for the customer with a trial period
            subscription = stripe.Subscription.create(
                customer=customer.id,
                items=[
                    {
                        'price': plan_id,  # The ID of the price associated with the plan
                    },
                ],
                trial_end='now',  # Indicates the trial period ends immediately
            )

            return {'message': 'Subscription created successfully.', 'status': status.HTTP_201_CREATED}
        except stripe.error.StripeError as e:
            return {'error': str(e), 'status': status.HTTP_400_BAD_REQUEST}



