from rest_framework import serializers
from ..models import User
from django.contrib.auth import authenticate

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "password"]
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validate_data):
        user = User.objects.create_user(username=validate_data['username'], email=validate_data['email'], password=validate_data['password'])
        return user


# Login Serializer

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")