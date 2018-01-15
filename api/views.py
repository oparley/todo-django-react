from rest_framework import viewsets
from rest_framework.decorators import list_route, permission_classes
from rest_framework.response import Response
from .serializers import TaskSerializer, TaskListSerializer, UserSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Task, TaskList, User

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.none()
    serializer_class = TaskSerializer

    def get_queryset(self):
        user = self.request.user
        return Task.objects.filter(task_list__creator=user)


class TaskListViewSet(viewsets.ModelViewSet):
    queryset = TaskList.objects.none()
    serializer_class = TaskListSerializer

    tasks = TaskSerializer(many=True, read_only=True)

    def get_queryset(self):
        user = self.request.user
        return user.lists.all()

    def create(self, request, *args, **kwargs):
        request.data['creator'] = request.user.id
        return super().create(request, *args, **kwargs)


class UserViewSet(viewsets.ModelViewSet):
    class UserPermission(IsAuthenticated):
        def has_permission(self, request, view):
            if view.action == 'create':
                return True
            return super().has_permission(request, view)


    tasks = TaskSerializer(many=True, read_only=True)

    queryset = User.objects.all()
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
