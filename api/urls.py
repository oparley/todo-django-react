from rest_framework import routers
from .views import UserViewSet, TaskListViewSet, TaskViewSet

router = routers.SimpleRouter()

router.register(r'users', UserViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'lists', TaskListViewSet)

urlpatterns = router.urls
