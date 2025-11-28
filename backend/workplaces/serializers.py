from rest_framework import serializers
from .models import Workplace

class WorkplaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Workplace
        fields = '__all__'

    def validate_ip_address(self, value):
        if value == "":
            return None
        return value