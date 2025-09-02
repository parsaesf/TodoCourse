import pytest
from django.urls import reverse
from rest_framework.test import APIClient
from accounts.models import User
from tasks.models import Task

@pytest.mark.django_db
def test_task_crud_flow():
    client = APIClient()
    user = User.objects.create_user(email="user2@example.com", password="Passw0rd!")
    client.force_authenticate(user=user)

    # Create
    url = reverse("task-list")
    resp = client.post(url, {"title": "Task1", "priority": "high"}, format="json")
    assert resp.status_code == 201
    task_id = resp.data["id"]

    # Read
    resp = client.get(url)
    assert resp.status_code == 200
    assert len(resp.data) == 1

    # Update
    url_detail = reverse("task-detail", args=[task_id])
    resp = client.put(url_detail, {"title": "Task1-updated", "priority": "low"}, format="json")
    assert resp.status_code == 200
    assert resp.data["title"] == "Task1-updated"

    # Delete
    resp = client.delete(url_detail)
    assert resp.status_code == 204
    assert Task.objects.count() == 0
