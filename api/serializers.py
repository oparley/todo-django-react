from rest_framework import serializers
from . import models
from datetime import date


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Task
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'completed' in validated_data and validated_data['completed']:
            instance.completed_at = date.today()
        else:
            instance.completed_at = None

        return super().update(instance, validated_data)


class TaskListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = models.TaskList
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = models.User
        fields = '__all__'
