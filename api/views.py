from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from .serializers import TaskSerializer, TaskListSerializer, UserSerializer
from . import models

class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = TaskSerializer

    @list_route()
    def reports(self, request):
        print(request.data)
        print(request.query_params)
        return Response()


class TaskListViewSet(viewsets.ModelViewSet):
    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.TaskList.objects.all()
    serializer_class = TaskListSerializer


class UserViewSet(viewsets.ModelViewSet):
    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.User.objects.all()
    serializer_class = UserSerializer
