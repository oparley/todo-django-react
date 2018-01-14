from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
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

    @list_route()
    def report(self, request):
        user = request.user
        day = request.query_params['day']

        try:
            report = user.reports.get(created_at=day)
            return Response(report.text)
        except:
            return Response('No report available today')
