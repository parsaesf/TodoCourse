import pytest
from django.urls import reverse
from rest_framework.test import APIClient

@pytest.mark.django_db
def test_register_and_login_flow():
    client = APIClient()

    # 1) Register
    url_register = reverse("auth-register")
    payload = {
        "email": "user1@example.com",
        "password": "StrongPassw0rd!",
        "username": "user1",
    }
    r1 = client.post(url_register, payload, format="json")
    assert r1.status_code in (201, 200)

    # 2) Login
    url_login = reverse("auth-login")
    r2 = client.post(url_login, {"email": payload["email"], "password": payload["password"]}, format="json")
    assert r2.status_code == 200
    assert "access" in r2.data and "refresh" in r2.data

    # 3) Me (protected)
    access = r2.data["access"]
    client.credentials(HTTP_AUTHORIZATION=f"Bearer {access}")
    url_me = reverse("auth-me")
    r3 = client.get(url_me)
    assert r3.status_code == 200
    assert r3.data["email"] == payload["email"]

