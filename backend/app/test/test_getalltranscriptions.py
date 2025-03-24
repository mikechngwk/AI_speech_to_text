from fastapi.testclient import TestClient
from app.main import app  # Replace with the correct import path

client = TestClient(app)


def test_get_transcriptions():
    response = client.get("/transcriptions")

    print("Response content:", response.text)

    assert response.status_code == 200
    assert "transcriptions" in response.json()
    assert isinstance(response.json()["transcriptions"], list)
