from django.contrib import admin
from django.urls import path
from . import views
from rest_framework import permissions # Swagger
from drf_yasg.views import get_schema_view  #Swagger
from drf_yasg import openapi #Swagger
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views import ProtectedView, RegisterView
from .views import hero_image

schema_view = get_schema_view(
   openapi.Info(
      title="Minha API",
      default_version='v1',
      description="Documentação da API com Swagger",
      contact=openapi.Contact(email="fernando100@windowslive.com"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', views.Api),
    path('products/', views.ProductView),
    path('docs/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('mp/', views.api_mercadopago),
    #path('createuser/', views.CreateUserAuth.as_view()),
    #path('login/', views.Login.as_view()),

    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('createuser/', RegisterView.as_view()),
    path('protected/', ProtectedView.as_view()),

    path('api/hero/', hero_image),
]
