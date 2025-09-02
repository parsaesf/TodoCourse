from rest_framework import serializers
from tasks.models import Task

class TaskSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")  

    class Meta:
        model = Task
        fields = [
            "id", "title", "description", "status",
            "due_date", "priority", "user",
            "created_at", "updated_at",
        ]
        read_only_fields = ("id", "created_at", "updated_at", "user")
