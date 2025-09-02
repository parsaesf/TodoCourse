
from rest_framework import viewsets, permissions
from .models import Task
from .serializers import TaskSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters





class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [
        DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    ]
    filterset_fields = {"status": ["exact",], "priority": ["exact",]}
    search_fields = ["title", "description"]
    ordering_fields = ["due_date"]
    def get_queryset(self):
        queryset = Task.objects.filter(user=self.request.user)
        return queryset


    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
