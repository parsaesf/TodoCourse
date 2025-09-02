from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "status", "priority", "user", "due_date", "created_at")
    list_filter = ("status", "priority", "due_date", "created_at")
    search_fields = ("title", "description", "user__email")
    ordering = ("-created_at",)
