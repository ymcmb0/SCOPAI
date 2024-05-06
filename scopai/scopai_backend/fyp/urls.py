from django.urls import path
from . import views

urlpatterns = [
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('adupload', views.AdUpload.as_view(), name='adupload'),
    path('adlist', views.AdList.as_view(), name='adlist'),
    path('make_payment', views.PaymentAPI.as_view(), name='make_payment'),
    path('updateprofile',views.UpdateProfile.as_view(),name='updateprofile'),
    path('activate', views.ActivateAccount.as_view(), name='activate_account'),
    path('password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/', views.PasswordResetView.as_view(), name='password_reset'),
    path('password/reset/confirm/', views.PasswordResetConfirm.as_view(), name='password_reset_confirm'),
    path('change-password', views.ChangePassword.as_view(), name='change_password'),
]
