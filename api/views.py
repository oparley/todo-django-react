from rest_framework import viewsets
from rest_framework.decorators import list_route, permission_classes
from rest_framework.response import Response
from .serializers import TaskSerializer, TaskListSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from . import models

class TaskViewSet(viewsets.ModelViewSet):
    queryset = models.Task.objects.all()
    serializer_class = TaskSerializer


class TaskListViewSet(viewsets.ModelViewSet):
    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.TaskList.objects.all()
    serializer_class = TaskListSerializer


class UserViewSet(viewsets.ModelViewSet):
    class UserPermission(IsAuthenticated):
        def has_permission(self, request, view):
            if view.action == 'create':
                return True
            return super().has_permission(request, view)


    tasks = TaskSerializer(many=True, read_only=True)

    queryset = models.User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [UserPermission, ]

    @list_route()
    def report(self, request):
        user = request.user
        day = request.query_params['day']

        try:
            report = user.reports.get(created_at=day)
            return Response(report.text)
        except:
            return Response('No report available today')

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)
