from rest_framework import serializers
from . import models
from datetime import date


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}


class TaskSerializer(serializers.ModelSerializer):
    task_list = serializers.SlugRelatedField(read_only=True, slug_field='name')
    creator = serializers.SlugRelatedField(read_only=True, slug_field='username')
    assignee = UserSerializer()

    class Meta:
        model = models.Task
        fields = '__all__'

    def update(self, instance, validated_data):
        if 'completed' in validated_data and validated_data['completed']:
            instance.completed_at = date.today()
        else:
            instance.completed_at = None

        return super().update(instance, validated_data)

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
