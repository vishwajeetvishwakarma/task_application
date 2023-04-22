from django.urls import path, include
from rest_framework_nested import routers
from .views import TaskViewSet, CommentViewSet

router = routers.SimpleRouter()
router.register("tasks", TaskViewSet, basename="tasks")

task_router = routers.NestedSimpleRouter(router, "tasks", lookup="task")
task_router.register("comments", CommentViewSet, basename="task-comments")

urlpatterns = [
    path("", include(router.urls)),
    path("", include(task_router.urls)),
]
