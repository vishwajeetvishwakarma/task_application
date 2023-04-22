from rest_framework import serializers
from .models import Task, Comment


class CommentSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source="user.username")

    class Meta:
        model = Comment
        fields = ["id", "content", "created_date", "user_name"]


class TaskSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)

    class Meta:
        model = Task
        fields = ["id", "title", "description", "due_date", "status", "comments"]
