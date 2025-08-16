from rest_framework import serializers
from .models import Product, Banco

class Serializer(serializers.ModelSerializer):
    class Meta:
        model = Banco
        fields = "__all__"

class SerializerProduct(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"