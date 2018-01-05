from rest_framework import viewsets
from .serializers import TaskSerializer, TaskListSerializer, UserSerializer
from . import models

class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = TaskSerializer


class TaskListViewSet(viewsets.ModelViewSet):
    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.TaskList.objects.all()
    serializer_class = TaskListSerializer


class UserViewSet(viewsets.ModelViewSet):
    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.User.objects.all()
    serializer_class = UserSerializer
