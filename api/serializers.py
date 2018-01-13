from rest_framework import serializers
from . import models
from datetime import date


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password', 'email')
        extra_kwargs = {'password': {'write_only': True}}


class TaskSerializer(serializers.ModelSerializer):
    assignee = UserSerializer(required=False)

    class Meta:
        model = models.Task
        fields = '__all__'

    def to_internal_value(self, data):
        assignee = data.pop('assignee', None)
        if assignee:
            assignee = models.User.objects.get(**assignee)

        validated_data = super().to_internal_value(data)
        validated_data['assignee'] = assignee
        return validated_data



class TaskListSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)

    class Meta:
        model = models.TaskList
        fields = '__all__'
