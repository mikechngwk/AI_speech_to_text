from fastapi.testclient import TestClient
from app.main import app  # Replace with the correct import path
from fastapi.testclient import TestClient
from unittest.mock import patch
import pytest

client = TestClient(app)

@patch("app.models.search_transcriptions")
def test_search_transcriptions(mock_search):
    #mock is used here because UUID is generated for every transcribed file
    mock_search.return_value = [{"filename": "test_audio.mp3", "transcription": "Test transcription content"}]

    filename = "test_audio.mp3"

    response = client.get(f"/search?filename={filename}")

    print("Response content:", response.text)

    assert response.status_code == 200
    assert "results" in response.json()
    assert filename in [result['filename'] for result in response.json()["results"]]

