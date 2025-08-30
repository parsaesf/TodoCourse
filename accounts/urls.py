
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,  
    TokenRefreshView, 
    TokenVerifyView    
)
from accounts.views import *

urlpatterns = [
    path("register/", RegisterView.as_view(), name="auth-register"),
    path("login/", TokenObtainPairView.as_view(), name="auth-login"),
    path("refresh/", TokenRefreshView.as_view(), name="auth-refresh"),
    path("me/", MeView.as_view(), name="auth-me"),

]
